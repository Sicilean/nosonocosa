"use client";

import { useEffect, useState, useRef } from "react";

/**
 * Componente "Back to top" con indicatore di progresso circolare
 * Mostra un pulsante che appare quando si scrolla verso il basso
 * e indica visivamente il progresso dello scroll con un cerchio SVG animato
 */
export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const progressPathRef = useRef<SVGPathElement | null>(null);
  const pathLengthRef = useRef<number>(0);

  useEffect(() => {
    const progressPath = progressPathRef.current;
    if (!progressPath) return;

    // Calcola la lunghezza del path SVG
    const pathLength = progressPath.getTotalLength();
    pathLengthRef.current = pathLength;

    // Inizializza il path SVG
    progressPath.style.transition = "none";
    progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
    progressPath.style.strokeDashoffset = `${pathLength}`;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = "stroke-dashoffset 10ms linear";

    // Funzione per aggiornare il progresso
    const updateProgress = () => {
      const scroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = pathLength - (scroll * pathLength) / height;
      
      if (progressPath) {
        progressPath.style.strokeDashoffset = `${progress}`;
      }
    };

    // Funzione per mostrare/nascondere il pulsante
    const handleScroll = () => {
      const offset = 50;
      setIsVisible(window.scrollY > offset);
      updateProgress();
    };

    // Aggiorna il progresso iniziale
    updateProgress();

    // Aggiungi listener per lo scroll
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Funzione per scrollare verso l'alto
  const scrollToTop = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const duration = 550;
    const start = window.scrollY;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-in-out)
      const easeInOut = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      window.scrollTo(0, start * (1 - easeInOut));

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  return (
    <div
      className={`progress-wrap ${isVisible ? "active-progress" : ""}`}
      onClick={scrollToTop}
      aria-label="Torna all'inizio"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          scrollToTop(e as any);
        }
      }}
    >
      <svg
        className="progress-circle svg-content"
        width="100%"
        height="100%"
        viewBox="-1 -1 102 102"
      >
        <path
          ref={progressPathRef}
          d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
        />
      </svg>
      {/* Icona freccia verso l'alto */}
      <svg
        className="arrow-icon"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 11V3M7 3L3 7M7 3L11 7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
