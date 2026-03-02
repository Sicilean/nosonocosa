"use client";

import { useEffect, useRef } from "react";
import Swup from "swup";
import { animateOverlayOut, animateOverlayIn } from "../utils/overlayTransition";

/**
 * Componente che inizializza Swup con il theme overlay implementato manualmente.
 * 
 * Swup intercetta i click sui link e gestisce le transizioni tra pagine
 * usando un overlay full-screen che copre e rivela la nuova pagina.
 * 
 * Funzionalità implementate:
 * - Overlay full-screen con animazione scaleY
 * - Lock anti multi-click per evitare glitch
 * - Supporto per prefers-reduced-motion
 * - Gestione corretta di back/forward e navigazione veloce
 */
export function SwupProvider() {
  const swupRef = useRef<Swup | null>(null);
  const isNavigatingRef = useRef(false);
  const shouldAnimateRef = useRef(true); // Flag per controllare se animare

  useEffect(() => {
    // Verifica se le animazioni sono ridotte
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Inizializza Swup solo se non è già stato inizializzato
    if (!swupRef.current) {
      const swup = new Swup({
        // Seleziona il contenitore principale (deve corrispondere a quello nel layout)
        containers: ["#swup"],
        // Animazione più veloce se l'utente preferisce motion ridotto
        animateHistoryBrowsing: !prefersReducedMotion,
        // Cache delle pagine per performance
        cache: true,
        // Selettore per i link da gestire (solo link interni)
        linkSelector: 'a[href^="/"]:not([data-no-swup]):not([data-no-swup-animation]):not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"]):not([target="_blank"])',
      });

      // Usa le funzioni utility per le animazioni overlay

      // Controlla se la navigazione è indietro (popstate) o click sul logo
      swup.hooks.on("visit:start", (visit: any) => {
        // Reset del flag all'inizio di ogni visita
        shouldAnimateRef.current = true;
        
        // Disabilita animazioni per navigazione indietro (popstate)
        // Swup 4 usa visit.trigger.type per identificare il tipo di trigger
        if (visit.trigger && visit.trigger.type === "popstate") {
          shouldAnimateRef.current = false;
          return;
        }
        
        // Disabilita animazioni se il link ha l'attributo data-no-swup-animation
        // o se punta alla homepage (logo)
        if (visit.trigger && visit.trigger.el) {
          const link = visit.trigger.el as HTMLElement;
          
          // Controlla se è un link con data-no-swup-animation
          if (link.hasAttribute('data-no-swup-animation')) {
            shouldAnimateRef.current = false;
            return;
          }
          
          // Controlla se è il logo (link alla homepage)
          const href = link.getAttribute('href');
          if (href === '/' || href === '/#' || href === '#/') {
            shouldAnimateRef.current = false;
            return;
          }
          
          // Controlla anche se il link è dentro un elemento che punta alla homepage
          const parentLink = link.closest('a[href="/"]');
          if (parentLink) {
            shouldAnimateRef.current = false;
            return;
          }
        }
      });

      // Hook Swup: inizia l'animazione in uscita quando parte la navigazione
      swup.hooks.on("animation:out:start", async () => {
        // Anima solo se il flag è true
        if (!shouldAnimateRef.current) {
          return;
        }
        
        try {
          await animateOverlayOut();
        } catch (error) {
          console.error("Errore animazione overlay out:", error);
        }
      });

      // Hook Swup: inizia l'animazione in entrata quando la nuova pagina è pronta
      swup.hooks.on("animation:in:start", async () => {
        // Anima solo se il flag è true
        if (!shouldAnimateRef.current) {
          return;
        }
        
        try {
          await animateOverlayIn();
        } catch (error) {
          console.error("Errore animazione overlay in:", error);
        }
      });

      // Lock anti multi-click: previene click multipli durante la navigazione
      const handleClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        
        // PRIORITÀ 1: Escludi SEMPRE i pulsanti del menu usando l'attributo data
        // Controlla sia il target che tutti i parent - questo deve avere la massima priorità
        const menuButton = target.closest("button[data-menu-button]");
        if (menuButton) {
          // Non interferire MAI con i click sul menu, anche durante la navigazione
          // IMPORTANTE: NON chiamare preventDefault o stopPropagation qui,
          // perché vogliamo che il click arrivi normalmente al pulsante
          return;
        }

        // PRIORITÀ 2: Escludi tutto ciò che è dentro il menu overlay
        const menu = target.closest(".menu-overlay");
        if (menu) {
          // Il menu gestisce i suoi click - non interferire
          return;
        }

        // PRIORITÀ 3: Escludi anche usando aria-label come fallback
        const menuButtonByAria = target.closest("button[aria-label*='menu'], button[aria-label*='Menu'], button[aria-label*='Apri'], button[aria-label*='Chiudi']");
        if (menuButtonByAria) {
          return;
        }

        // PRIORITÀ 4: Escludi elementi dentro l'header (potrebbero essere pulsanti del menu)
        const headerElement = target.closest("header");
        if (headerElement) {
          // Controlla se è un pulsante dentro l'header
          const buttonInHeader = target.closest("button");
          if (buttonInHeader && headerElement.contains(buttonInHeader)) {
            // Se è un pulsante nell'header, non interferire (potrebbe essere il menu)
            return;
          }
        }

        // Controlla se si clicca sul logo (link alla homepage)
        const logoLink = target.closest('a[href="/"]');
        if (logoLink) {
          // Aggiungi attributo per disabilitare animazioni
          logoLink.setAttribute('data-no-swup-animation', 'true');
        }

        // Se già in navigazione, previeni solo i click su link (non sui pulsanti o altri elementi interattivi)
        // IMPORTANTE: Non bloccare pulsanti, input, o altri elementi interattivi - solo i link di navigazione
        if (isNavigatingRef.current) {
          const link = target.closest("a[href]");
          if (link) {
            event.preventDefault();
            event.stopPropagation();
          }
          // NON fare return qui - permette ai click su pulsanti e altri elementi di procedere normalmente
        }
      };

      // Gestione navigazione veloce: previene navigazioni multiple simultanee
      // Lock attivo durante tutta la transizione
      swup.hooks.on("visit:start", () => {
        isNavigatingRef.current = true;
      });

      // Rilascia il lock dopo che l'animazione è completata
      swup.hooks.on("animation:in:end", () => {
        setTimeout(() => {
          isNavigatingRef.current = false;
        }, 100);
      });

      // IMPORTANTE: Rilascia il lock quando Swup completa il rimpiazzo del contenuto
      // Questo assicura che il menu funzioni subito dopo la navigazione
      swup.hooks.on("content:replace", () => {
        // Rilascia immediatamente il lock quando il contenuto è stato rimpiazzato
        isNavigatingRef.current = false;
        
        // Emetti un evento custom per notificare che il contenuto è stato rimpiazzato
        // Questo permette ad altri componenti (come Header) di riattivare i loro event listener
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('swup:contentReplaced'));
        }
      });

      // Hook aggiuntivo: quando la pagina è completamente caricata e renderizzata
      swup.hooks.on("page:view", () => {
        // Rilascia il lock
        isNavigatingRef.current = false;
        
        // Emetti evento per forzare re-inizializzazione dei componenti
        if (typeof window !== 'undefined') {
          // Usa un delay per assicurarsi che il DOM sia completamente pronto
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('swup:pageView'));
            window.dispatchEvent(new CustomEvent('swup:contentReplaced'));
          }, 50);
        }
      });

      // Fallback: timeout di sicurezza per rilasciare il lock se qualcosa va storto
      let fallbackTimeout: NodeJS.Timeout | null = null;

      // Gestione errori e rilascio lock: usa visit:end per controllare lo status
      swup.hooks.on("visit:end", (visit: any) => {
        // Pulisci il timeout di fallback se esiste
        if (fallbackTimeout) {
          clearTimeout(fallbackTimeout);
          fallbackTimeout = null;
        }

        // Rilascia sempre il lock alla fine della visita (fallback)
        setTimeout(() => {
          isNavigatingRef.current = false;
        }, 100);

        // Se c'è un errore (404, 500, network error, etc.), gestiscilo
        if (visit && visit.status && visit.status >= 400) {
          console.error("Errore Swup:", visit.status, visit.url);
          
          // Nascondi gli overlay in caso di errore
          const overlayBlack = document.querySelector(".swup-overlay-black") as HTMLDivElement;
          const overlayOrange = document.querySelector(".swup-overlay-orange") as HTMLDivElement;
          if (overlayBlack) {
            overlayBlack.style.display = "none";
          }
          if (overlayOrange) {
            overlayOrange.style.display = "none";
          }

          // In caso di errore 404 o altri errori, fai un reload completo della pagina
          // Questo è necessario per Next.js static export
          if (visit.url) {
            setTimeout(() => {
              window.location.href = visit.url;
            }, 100);
          }
        }
      });

      // Timeout di sicurezza: rilascia il lock dopo 2 secondi se la navigazione non finisce
      swup.hooks.on("visit:start", () => {
        fallbackTimeout = setTimeout(() => {
          isNavigatingRef.current = false;
          fallbackTimeout = null;
        }, 2000);
      });

      // Ascolta eventi custom per forzare il rilascio del lock
      const handleForceUnlock = () => {
        isNavigatingRef.current = false;
      };
      
      if (typeof window !== 'undefined') {
        window.addEventListener('swup:forceUnlock', handleForceUnlock);
      }

      // Aggiungi listener per i click
      // IMPORTANTE: Il listener viene aggiunto in fase di capture (true)
      // ma restituisce immediatamente se trova un pulsante del menu
      document.addEventListener("click", handleClick, true);

      // Esponi l'istanza di Swup globalmente per permettere ad altri componenti di usarla
      if (typeof window !== 'undefined') {
        (window as any).swup = swup;
      }

      swupRef.current = swup;

      // Cleanup al dismount
      return () => {
        document.removeEventListener("click", handleClick, true);
        if (typeof window !== 'undefined') {
          window.removeEventListener('swup:forceUnlock', handleForceUnlock);
        }
        if (swupRef.current) {
          swupRef.current.destroy();
          swupRef.current = null;
        }
      };
    }
  }, []);

  // Questo componente non renderizza nulla, gestisce solo l'inizializzazione
  return null;
}
