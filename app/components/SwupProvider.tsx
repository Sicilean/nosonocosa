"use client";

import { useEffect, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { animateOverlayOut, animateOverlayIn } from "../utils/overlayTransition";

/**
 * Gestisce le transizioni tra pagine con animazione overlay.
 *
 * Architettura corretta:
 * - Next.js router.push() gestisce la navigazione → React re-renderizza → event handler sempre attaccati
 * - Le animazioni overlay (nero + arancione) sono gestite manualmente in sync con il router
 * - NON si usa Swup per il DOM replacement (causa fondamentale del problema: Swup bypassava React)
 *
 * Flusso:
 *   click link → animateOverlayOut() → router.push(url) → pathname cambia
 *   → animateOverlayIn() → navigazione completa
 */
export function SwupProvider() {
  const router = useRouter();
  const pathname = usePathname();
  const isNavigatingRef = useRef(false);
  // true quando abbiamo avviato noi la navigazione e aspettiamo il pathname change
  const pendingOverlayInRef = useRef(false);
  // Timeout di sicurezza per evitare che il lock rimanga stuck
  const safetyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Quando il pathname cambia per effetto del nostro router.push(), esegue l'overlay-in
  useEffect(() => {
    if (!pendingOverlayInRef.current) return;
    pendingOverlayInRef.current = false;

    if (safetyTimeoutRef.current) {
      clearTimeout(safetyTimeoutRef.current);
      safetyTimeoutRef.current = null;
    }

    // Notifica i componenti che il contenuto è cambiato (es. Header aggiorna il logo)
    window.dispatchEvent(new CustomEvent("swup:contentReplaced"));
    window.dispatchEvent(new CustomEvent("swup:pageView"));

    animateOverlayIn().then(() => {
      isNavigatingRef.current = false;
      // Se l'URL contiene un hash (es. /#programma), scrolla all'elemento target
      // dopo che l'overlay è scomparso e la pagina è visibile
      if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) target.scrollIntoView({ behavior: "smooth" });
      }
    });
  }, [pathname]);

  const navigateTo = useCallback(
    (url: string) => {
      if (isNavigatingRef.current) return;

      // Stessa pagina senza hash: niente da fare
      const urlObj = new URL(url, window.location.origin);
      if (
        urlObj.pathname === window.location.pathname &&
        !urlObj.hash
      ) return;

      isNavigatingRef.current = true;
      pendingOverlayInRef.current = true;

      // Safety timeout: se dopo 4s pathname non è cambiato, sblocca tutto
      safetyTimeoutRef.current = setTimeout(() => {
        isNavigatingRef.current = false;
        pendingOverlayInRef.current = false;
        safetyTimeoutRef.current = null;
        // Nascondi overlay se rimasto visibile
        const overlayB = document.querySelector(".swup-overlay-black") as HTMLDivElement | null;
        const overlayO = document.querySelector(".swup-overlay-orange") as HTMLDivElement | null;
        if (overlayB) overlayB.style.display = "none";
        if (overlayO) overlayO.style.display = "none";
      }, 4000);

      animateOverlayOut().then(() => {
        router.push(url);
      });
    },
    [router]
  );

  useEffect(() => {
    // Espone un'API compatibile con il codice esistente nell'Header
    (window as any).swup = {
      loadPage: ({ url }: { url: string }) => navigateTo(url),
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Escludi pulsanti menu (non devono mai essere intercettati)
      if (target.closest("button[data-menu-button]")) return;
      if (target.closest(".menu-overlay")) return;
      if (
        target.closest(
          "button[aria-label*='menu'], button[aria-label*='Menu'], button[aria-label*='Apri'], button[aria-label*='Chiudi']"
        )
      ) return;

      // Escludi pulsanti nell'header
      const headerEl = target.closest("header");
      if (headerEl) {
        const btn = target.closest("button");
        if (btn && headerEl.contains(btn)) return;
      }

      // Cerca il link più vicino che sia interno e non escluso
      const link = target.closest(
        'a[href^="/"]:not([data-no-swup]):not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"]):not([target="_blank"])'
      ) as HTMLAnchorElement | null;

      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      // Link che puntano a un anchor sulla stessa pagina: lascia scorrere il browser
      const urlObj = new URL(href, window.location.origin);
      if (urlObj.pathname === window.location.pathname && href.includes("#")) return;

      event.preventDefault();

      // Blocca nuovi click durante la navigazione
      if (isNavigatingRef.current) {
        event.stopPropagation();
        return;
      }

      navigateTo(href);
    };

    // Sblocca il lock quando richiesto da altri componenti (es. apertura menu)
    const handleForceUnlock = () => {
      isNavigatingRef.current = false;
      pendingOverlayInRef.current = false;
      if (safetyTimeoutRef.current) {
        clearTimeout(safetyTimeoutRef.current);
        safetyTimeoutRef.current = null;
      }
    };

    document.addEventListener("click", handleClick, true);
    window.addEventListener("swup:forceUnlock", handleForceUnlock);

    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("swup:forceUnlock", handleForceUnlock);
      if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
    };
  }, [navigateTo]);

  return null;
}
