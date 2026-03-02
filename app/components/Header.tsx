"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { animateMenuOpen, animateMenuClose } from "../utils/overlayTransition";

// Costanti per l'animazione del menu (importate per ottimizzazione)
const DURATION_IN = 200; // Durata per la fase di scopertura
const EASING = "cubic-bezier(0.25, 0.1, 0.25, 1)"; // Curva naturale

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Concept", href: "/#programma" },
  { label: "Mostre", href: "/#mostre" },
  { label: "Opencall", href: "/open-call" },
  { label: "Info e orari", href: "/info-e-orari" },
  { label: "Edizione 2025", href: "/edizioni/2025" },
];

type HeaderProps = {
  logoType?: "primary" | "secondary";
};

export function Header({ logoType: propLogoType }: HeaderProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLightBackground, setIsLightBackground] = useState(false);
  const [currentLogoType, setCurrentLogoType] = useState<"primary" | "secondary">("primary");
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Determina il tipo di logo in base alla pagina corrente
  useEffect(() => {
    const determineLogoType = () => {
      const pathname = window.location.pathname;
      // Homepage usa primary, tutte le altre pagine usano secondary
      const logoType = pathname === '/' ? 'primary' : 'secondary';
      setCurrentLogoType(logoType);
    };

    // Determina all'inizio
    determineLogoType();

    // Aggiorna quando Swup naviga
    const handleSwupNavigation = () => {
      setTimeout(() => {
        determineLogoType();
      }, 50);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('swup:contentReplaced', handleSwupNavigation);
      window.addEventListener('swup:pageView', handleSwupNavigation);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('swup:contentReplaced', handleSwupNavigation);
        window.removeEventListener('swup:pageView', handleSwupNavigation);
      }
    };
  }, []);

  // Usa propLogoType se fornito, altrimenti usa currentLogoType
  const logoType = propLogoType ?? currentLogoType;

  // Determina quale logo usare in base allo stato dello scroll
  const logoSrc = isLightBackground
    ? "/loghi/logo-scrolled.svg"
    : logoType === "secondary"
    ? "/loghi/logo secondario.svg"
    : "/loghi/logo primario.svg";

  // Cambia l'header in bianco quando si scrolla (funziona su tutte le pagine)
  useEffect(() => {
    let scrollHandler: (() => void) | null = null;
    let resizeHandler: (() => void) | null = null;

    const checkScroll = () => {
      const scrollY = window.scrollY;
      
      // Nella homepage: l'header diventa bianco quando si raggiunge la metà della hero section
      // Su altre pagine: l'header diventa bianco dopo 50px di scroll
      const isHomepage = window.location.pathname === '/';
      
      if (isHomepage) {
        // Trova la hero section e calcola quando raggiunge la metà
        const heroSection = document.getElementById('hero-section');
        if (heroSection) {
          const heroTop = heroSection.offsetTop;
          const heroHeight = heroSection.offsetHeight;
          const heroMidpoint = heroTop + heroHeight / 2;
          // L'header diventa bianco quando lo scroll raggiunge la metà della hero section
          // La transizione è gestita dal CSS (transition-colors duration-300)
          setIsLightBackground(scrollY >= heroMidpoint);
        } else {
          // Fallback: usa la soglia standard se la hero section non è trovata
          setIsLightBackground(scrollY > 50);
        }
      } else {
        // Su altre pagine: soglia standard di 50px
        const threshold = 50;
        setIsLightBackground(scrollY > threshold);
      }
    };

    // Funzione per inizializzare gli event listener
    const initScrollListeners = () => {
      // Rimuovi i listener esistenti se ci sono
      if (scrollHandler) {
        window.removeEventListener('scroll', scrollHandler);
      }
      if (resizeHandler) {
        window.removeEventListener('resize', resizeHandler);
      }

      // Controlla all'inizio
      checkScroll();

      // Ascolta lo scroll con throttling
      let ticking = false;
      scrollHandler = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            checkScroll();
            ticking = false;
          });
          ticking = true;
        }
      };

      resizeHandler = checkScroll;

      window.addEventListener('scroll', scrollHandler, { passive: true });
      window.addEventListener('resize', resizeHandler);
    };

    // Inizializza gli event listener
    initScrollListeners();

    // Ascolta quando Swup completa la navigazione per aggiornare lo stato
    const handleSwupPageView = () => {
      setTimeout(() => {
        checkScroll();
        initScrollListeners();
      }, 100);
    };

    // Ascolta eventi personalizzati che Swup potrebbe emettere
    if (typeof window !== 'undefined') {
      window.addEventListener('swup:pageView', handleSwupPageView);
      window.addEventListener('swup:contentReplaced', handleSwupPageView);
      window.addEventListener('load', checkScroll);
    }

    return () => {
      if (scrollHandler) {
        window.removeEventListener('scroll', scrollHandler);
      }
      if (resizeHandler) {
        window.removeEventListener('resize', resizeHandler);
      }
      if (typeof window !== 'undefined') {
        window.removeEventListener('swup:pageView', handleSwupPageView);
        window.removeEventListener('swup:contentReplaced', handleSwupPageView);
        window.removeEventListener('load', checkScroll);
      }
    };
  }, [currentLogoType]); // Re-esegui quando cambia la pagina

  // Re-inizializza il menu quando Swup naviga
  useEffect(() => {
    // Quando Swup naviga, assicurati che il menu sia chiuso e lo stato sia resettato
    if (typeof window !== 'undefined') {
      const handleSwupNavigation = () => {
        // Chiudi il menu se è aperto
        if (isOpen) {
          setIsOpen(false);
          setIsAnimating(false);
          document.body.classList.remove("menu-open");
        }
      };

      window.addEventListener('swup:contentReplaced', handleSwupNavigation);
      window.addEventListener('swup:pageView', handleSwupNavigation);

      return () => {
        window.removeEventListener('swup:contentReplaced', handleSwupNavigation);
        window.removeEventListener('swup:pageView', handleSwupNavigation);
      };
    }
  }, [isOpen, currentLogoType]);

  // Assicura che il pulsante del menu funzioni sempre
  useEffect(() => {
    const menuButton = document.querySelector('button[data-menu-button="open"]') as HTMLButtonElement;
    if (!menuButton) return;

    const handleMenuClick = (e: MouseEvent) => {
      e.stopPropagation();
      // Forza il rilascio del lock di Swup
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('swup:forceUnlock'));
      }
      
      if (!isAnimating && !isOpen) {
        setIsOpen(true);
      }
    };

    // Aggiungi listener diretto sul pulsante in fase di capture per avere massima priorità
    menuButton.addEventListener('click', handleMenuClick, true);

    return () => {
      menuButton.removeEventListener('click', handleMenuClick, true);
    };
  }, [isOpen, isAnimating]);

  // Anima il menu quando si apre
  useEffect(() => {
    if (isOpen && menuOverlayRef.current) {
      setIsAnimating(true);
      // Previeni lo scroll del body quando il menu è aperto
      document.body.classList.add("menu-open");
      animateMenuOpen().then(() => {
        setIsAnimating(false);
      });
    } else {
      // Rimuovi la classe quando il menu è chiuso
      document.body.classList.remove("menu-open");
    }
    
    // Cleanup: rimuovi la classe quando il componente si smonta
    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [isOpen]);

  return (
    <header 
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-[10000] pointer-events-none transition-colors duration-300 ${
        isLightBackground 
          ? 'bg-white/95 backdrop-blur-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-6 pb-6 sm:px-10 sm:pb-8 lg:px-16 lg:pb-8 pointer-events-auto">
        <Link 
          href="/" 
          className={`flex items-center gap-3 transition-colors pl-2 ${
            isLightBackground ? 'text-[#1f1c1a]' : 'text-white'
          }`} 
          data-no-swup
          data-no-swup-animation
          onClick={(e) => {
            // Assicura che il link funzioni sempre, anche se Swup cerca di intercettarlo
            // Usa window.location per navigare direttamente alla homepage
            if (window.location.pathname !== '/') {
              e.preventDefault();
              window.location.href = '/';
            }
          }}
        >
          <Image
            src={logoSrc}
            alt="Nonsonocosa"
            className="h-10 w-auto transition-opacity duration-300"
            width={140}
            height={28}
            priority
            key={isLightBackground ? 'scrolled' : 'default'}
          />
        </Link>
        <button
          type="button"
          className={`flex h-10 w-10 items-center justify-center transition-colors cursor-pointer relative z-[10001] ${
            isLightBackground 
              ? 'text-[#1f1c1a] hover:text-[#ff5a43]' 
              : 'text-[#ff5a43] hover:text-white'
          }`}
          aria-label="Apri menu"
          aria-expanded={isOpen}
          data-menu-button="open"
          onClick={(e) => {
            // IMPORTANTE: Non chiamare preventDefault qui, altrimenti il click potrebbe non funzionare
            // stopPropagation è sufficiente per evitare che altri listener interferiscano
            e.stopPropagation();
            
            // Forza il rilascio del lock di Swup se è ancora attivo
            // Questo assicura che il menu funzioni anche durante la navigazione
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('swup:forceUnlock'));
            }
            
            if (isAnimating) return;
            setIsOpen(true);
          }}
        >
          <span className="relative h-3.5 w-7 grid gap-1">
            <span className="h-0.75 w-full rounded-full bg-current" />
            <span className="h-0.75 w-full rounded-full bg-current" />
            <span className="h-0.75 w-full rounded-full bg-current" />
          </span>
        </button>
      </div>
      {isOpen ? (
        <div ref={menuOverlayRef} className="fixed inset-0 z-[10002] bg-[#ff5a43] menu-overlay w-screen h-screen" style={{ transform: "translateY(100%)" }}>
          <div className="flex h-full w-full flex-col items-center justify-between px-6 pb-16 pt-8 sm:px-10 lg:px-16">
            <div className="relative flex w-full items-center justify-end">
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center text-white transition hover:text-[#1f1c1a] cursor-pointer"
                aria-label="Chiudi menu"
                data-menu-button="close"
                onClick={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (isAnimating) return;
                  setIsAnimating(true);
                  // Anima il menu verso il basso
                  await animateMenuClose();
                  setIsOpen(false);
                  setIsAnimating(false);
                }}
              >
                <span className="relative h-5 w-5">
                  <span className="absolute left-1/2 top-1/2 h-[3px] w-6 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-current" />
                  <span className="absolute left-1/2 top-1/2 h-[3px] w-6 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-current" />
                </span>
              </button>
            </div>
            <nav className="font-heading flex flex-1 flex-col items-center justify-center gap-6 text-center text-5xl font-semibold uppercase tracking-[0.02em] text-white sm:text-6xl lg:text-7xl">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="transition hover:text-[#1f1c1a] cursor-pointer"
                  onClick={async (e) => {
                    // Ottimizzazione: chiudi il menu velocemente e coordina con Swup
                    if (isAnimating) {
                      e.preventDefault();
                      return;
                    }
                    
                    // Previeni temporaneamente la navigazione per chiudere il menu
                    e.preventDefault();
                    setIsAnimating(true);
                    
                    // Chiudi il menu immediatamente senza animazione per non interferire con Swup
                    // Swup gestirà la sua animazione overlay che coprirà tutto
                    setIsOpen(false);
                    document.body.classList.remove("menu-open");
                    
                    const menuOverlay = document.querySelector(".menu-overlay") as HTMLDivElement;
                    if (menuOverlay) {
                      // Nascondi immediatamente il menu senza animazione
                      menuOverlay.style.display = "none";
                      menuOverlay.style.transform = "translateY(100%)";
                    }
                    
                    // Reset dello stato
                    setTimeout(() => {
                      setIsAnimating(false);
                    }, 50);
                    
                    // Naviga usando Swup immediatamente dopo aver chiuso il menu
                    // Usa un piccolo delay per assicurarsi che il menu sia chiuso
                    requestAnimationFrame(() => {
                      requestAnimationFrame(() => {
                        const swupInstance = (window as any).swup;
                        if (swupInstance) {
                          // Usa l'API di Swup per navigare programmaticamente
                          // Swup 4 usa loadPage() con un oggetto di opzioni
                          if (typeof swupInstance.loadPage === 'function') {
                            swupInstance.loadPage({ url: link.href });
                          } else {
                            // Fallback: crea un link temporaneo e cliccalo per permettere a Swup di intercettarlo
                            const tempLink = document.createElement('a');
                            tempLink.href = link.href;
                            tempLink.style.display = 'none';
                            document.body.appendChild(tempLink);
                            tempLink.click();
                            setTimeout(() => {
                              document.body.removeChild(tempLink);
                            }, 100);
                          }
                        } else {
                          // Fallback: naviga normalmente
                          window.location.href = link.href;
                        }
                      });
                    });
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-6 pb-8">
              <a
                href="https://www.instagram.com/nonsonocosa_/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition hover:text-[#1f1c1a] cursor-pointer"
                aria-label="Instagram"
                data-no-swup
                onClick={(e) => {
                  // Previeni il comportamento predefinito per evitare che il browser apra l'app
                  e.preventDefault();
                  const url = new URL("https://www.instagram.com/nonsonocosa_/");
                  url.searchParams.set('utm_source', 'web');
                  url.searchParams.set('utm_medium', 'website');
                  window.open(url.toString(), '_blank', 'noopener,noreferrer');
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                >
                  <path
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.07 1.646.07 4.85 0 3.204-.012 3.584-.07 4.85-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.646.07-4.85.07-3.204 0-3.584-.012-4.85-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.646-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.22 1.664-4.771 4.919-4.919 1.266-.057 1.646-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61587359586094"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition hover:text-[#1f1c1a] cursor-pointer"
                aria-label="Facebook"
                data-no-swup
                onClick={(e) => {
                  // Previeni il comportamento predefinito per evitare che il browser apra l'app
                  e.preventDefault();
                  const url = new URL("https://www.facebook.com/profile.php?id=61587359586094");
                  url.searchParams.set('utm_source', 'web');
                  url.searchParams.set('utm_medium', 'website');
                  window.open(url.toString(), '_blank', 'noopener,noreferrer');
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                >
                  <path
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

