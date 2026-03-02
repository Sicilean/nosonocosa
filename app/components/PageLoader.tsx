"use client";

import { useEffect, useState } from "react";

/**
 * Componente di pre-caricamento con effetto Codrops PageLoadingEffects
 * Mostra la forma diagonale che si riempie da bianco ad arancione durante il caricamento
 * Alla fine fa zoom per rivelare la homepage
 */
export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isZooming, setIsZooming] = useState(false);

  useEffect(() => {
    // Verifica se le animazioni sono ridotte
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setIsLoading(false);
      sessionStorage.setItem('pageLoaderShown', 'true');
      window.dispatchEvent(new CustomEvent('pageLoaderComplete'));
      return;
    }

    // PRIORITÀ 1: Controlla se il loader è già stato mostrato in questa sessione
    const loaderShown = sessionStorage.getItem('pageLoaderShown');
    if (loaderShown === 'true') {
      setIsLoading(false);
      window.dispatchEvent(new CustomEvent('pageLoaderComplete'));
      return;
    }

    // PRIORITÀ 2: Controlla se c'è un referrer interno (navigazione tra pagine)
    // Se c'è un referrer interno, significa che l'utente sta navigando tra pagine
    const hasInternalReferrer = 
      document.referrer && 
      document.referrer.includes(window.location.origin) &&
      document.referrer !== window.location.href;

    if (hasInternalReferrer) {
      setIsLoading(false);
      sessionStorage.setItem('pageLoaderShown', 'true');
      window.dispatchEvent(new CustomEvent('pageLoaderComplete'));
      return;
    }

    // PRIORITÀ 3: Controlla se Swup è attivo o se la pagina è stata caricata da Swup
    const isSwupActive = document.documentElement.classList.contains('is-changing');
    const hasSwupHistory = (window.history.state as any)?.swup;

    if (isSwupActive || hasSwupHistory) {
      setIsLoading(false);
      sessionStorage.setItem('pageLoaderShown', 'true');
      window.dispatchEvent(new CustomEvent('pageLoaderComplete'));
      return;
    }

    // PRIORITÀ 4: Controlla il tipo di navigazione usando performance.navigation
    // performance.navigation.type === 0 = TYPE_NAVIGATE (primo caricamento)
    // performance.navigation.type === 1 = TYPE_RELOAD
    // performance.navigation.type === 2 = TYPE_BACK_FORWARD
    const navigationType = (performance as any).navigation?.type ?? 
      (performance as any).getEntriesByType?.('navigation')?.[0]?.type;
    
    // Se è un back/forward o un reload, non mostrare il loader
    if (navigationType === 'back_forward' || navigationType === 2 || 
        navigationType === 'reload' || navigationType === 1) {
      setIsLoading(false);
      sessionStorage.setItem('pageLoaderShown', 'true');
      window.dispatchEvent(new CustomEvent('pageLoaderComplete'));
      return;
    }

    // Se arriviamo qui, è un vero primo atterraggio sul sito
    // Mostra il loader solo se è un primo caricamento (TYPE_NAVIGATE o 0)
    const isFirstLoad = navigationType === 'navigate' || navigationType === 0;

    if (!isFirstLoad) {
      setIsLoading(false);
      sessionStorage.setItem('pageLoaderShown', 'true');
      window.dispatchEvent(new CustomEvent('pageLoaderComplete'));
      return;
    }

    // Delay iniziale per assicurarsi che il loader sia visibile
    let loadTimer: NodeJS.Timeout | null = null;
    let fallbackTimer: NodeJS.Timeout | null = null;
    let zoomTimer: NodeJS.Timeout | null = null;
    let zoomEndTimer: NodeJS.Timeout | null = null;

    const initialDelay = setTimeout(() => {
      // Caricamento da 0 a 100% - velocità moderata
      loadTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            if (loadTimer) {
              clearInterval(loadTimer);
              loadTimer = null;
            }
            // Quando raggiunge 100%, inizia lo zoom
            zoomTimer = setTimeout(() => {
              setIsZooming(true);
              // Dopo lo zoom, nascondi il loader e emetti evento per far partire il video
              zoomEndTimer = setTimeout(() => {
                setIsLoading(false);
                // Salva che il loader è stato mostrato in questa sessione
                sessionStorage.setItem('pageLoaderShown', 'true');
                // Emetti evento custom per segnalare che il caricamento è completato
                window.dispatchEvent(new CustomEvent('pageLoaderComplete'));
              }, 600); // Durata dello zoom
            }, 100);
            return 100;
          }
          // Incremento più lento per caricamento più visibile
          return prev + 1.2;
        });
      }, 30); // Intervallo leggermente più lungo

      // Fallback: nascondi il loader dopo 4 secondi massimo
      fallbackTimer = setTimeout(() => {
        setIsLoading(false);
        if (loadTimer) {
          clearInterval(loadTimer);
          loadTimer = null;
        }
        // Salva che il loader è stato mostrato
        sessionStorage.setItem('pageLoaderShown', 'true');
        // Emetti evento anche in caso di fallback
        window.dispatchEvent(new CustomEvent('pageLoaderComplete'));
      }, 4000);
    }, 100); // Delay iniziale di 100ms per assicurarsi che il loader sia renderizzato

    return () => {
      clearTimeout(initialDelay);
      if (loadTimer) {
        clearInterval(loadTimer);
      }
      if (fallbackTimer) {
        clearTimeout(fallbackTimer);
      }
      if (zoomTimer) {
        clearTimeout(zoomTimer);
      }
      if (zoomEndTimer) {
        clearTimeout(zoomEndTimer);
      }
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div 
      className="fixed inset-0 z-[99999] bg-[#1f1c1a]"
      data-page-loader
      data-loading={isLoading.toString()}
      style={{
        transform: isZooming ? 'scale(30)' : 'scale(1)',
        opacity: isZooming ? 0 : 1,
        transition: isZooming ? 'transform 0.7s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.7s ease-out' : 'none',
        transformOrigin: 'center center',
        willChange: isZooming ? 'transform, opacity' : 'auto',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
    >
      {/* Forma diagonale con animazione di riempimento */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="relative" style={{ width: 'clamp(150px, 15vw, 250px)' }}>
          <svg
            viewBox="0 0 867.95 1186.78"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            style={{
              pointerEvents: 'none',
            }}
          >
            <defs>
              {/* Clip path per l'animazione di riempimento dal basso verso l'alto */}
              <clipPath id="loadingClip">
                <rect
                  x="0"
                  y={`${100 - progress}%`}
                  width="100%"
                  height={`${progress}%`}
                  style={{
                    transition: 'height 0.1s linear, y 0.1s linear',
                  }}
                />
              </clipPath>
            </defs>
            
            {/* Forma base bianca (sempre visibile) */}
            <polygon
              points="0 1186.77 0 1185.86 601.01 .01 867.95 0 267.17 1186.78 0 1186.77"
              fill="#ffffff"
              opacity="0.3"
            />
            
            {/* Forma arancione con clip-path per animazione di riempimento */}
            <polygon
              points="0 1186.77 0 1185.86 601.01 .01 867.95 0 267.17 1186.78 0 1186.77"
              fill="#ff5a43"
              clipPath="url(#loadingClip)"
              style={{
                transition: 'clip-path 0.1s linear',
              }}
            />
          </svg>
        </div>
        
        {/* Indicatore di progresso X/100 */}
        {!isZooming && (
          <div className="mt-16 text-white/60 text-sm font-mono tracking-wider">
            {Math.round(progress)}/100
          </div>
        )}
      </div>
    </div>
  );
}
