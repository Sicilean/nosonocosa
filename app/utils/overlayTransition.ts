/**
 * Funzione utility per gestire le transizioni overlay (box nero + box arancione)
 * Può essere usata sia per Swup che per il menu
 */

// Durate ottimizzate per movimento veloce e passaggio fluido
const DURATION_OUT = 250; // Durata per la fase di copertura (dal basso) - più veloce per passaggio rapido
const DURATION_IN = 200; // Durata per la fase di scopertura (verso l'alto) - più veloce
const TOTAL_DURATION = DURATION_OUT + DURATION_IN; // Durata totale del movimento continuo
const DELAY_BETWEEN = 50; // Delay tra box nero e arancione - ridotto per passaggio più rapido
// Easing con curva iniziale morbida che accelera: inizia lento, poi accelera fluidamente
const EASING = "cubic-bezier(0.25, 0.1, 0.25, 1)"; // Curva naturale: inizia lento, accelera, finisce dolcemente

/**
 * Verifica se l'utente preferisce animazioni ridotte
 */
function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Ottiene o crea gli elementi overlay
 */
function getOverlays() {
  let overlayBlack = document.querySelector(".swup-overlay-black") as HTMLDivElement;
  let overlayOrange = document.querySelector(".swup-overlay-orange") as HTMLDivElement;

  if (!overlayBlack) {
    overlayBlack = document.createElement("div");
    overlayBlack.className = "swup-overlay-black";
    overlayBlack.setAttribute("aria-hidden", "true");
    document.body.appendChild(overlayBlack);
  }

  if (!overlayOrange) {
    overlayOrange = document.createElement("div");
    overlayOrange.className = "swup-overlay-orange";
    overlayOrange.setAttribute("aria-hidden", "true");
    document.body.appendChild(overlayOrange);
  }

  return { overlayBlack, overlayOrange };
}

/**
 * Animazione in uscita: box partono dal basso e coprono la pagina
 * Movimento continuo dal basso verso l'alto
 */
export function animateOverlayOut(): Promise<void> {
  return new Promise((resolve) => {
    if (prefersReducedMotion()) {
      const { overlayBlack, overlayOrange } = getOverlays();
      overlayBlack.style.display = "none";
      overlayOrange.style.display = "none";
      resolve();
      return;
    }

    const { overlayBlack, overlayOrange } = getOverlays();

    // Prepara overlay nero - parte dal basso
    overlayBlack.style.display = "block";
    overlayBlack.style.transform = "translateY(100%)"; // Inizia dal basso (fuori schermo)
    overlayBlack.style.willChange = "transform";
    overlayBlack.style.transition = `transform ${DURATION_OUT}ms ${EASING}`;
    overlayBlack.style.backfaceVisibility = "hidden";
    overlayBlack.style.perspective = "1000px";
    // IMPORTANTE: Disabilita pointer-events durante l'animazione per non bloccare i click
    overlayBlack.style.pointerEvents = "none";

    // Prepara overlay arancione - parte dal basso
    overlayOrange.style.display = "block";
    overlayOrange.style.transform = "translateY(100%)"; // Inizia dal basso (fuori schermo)
    overlayOrange.style.willChange = "transform";
    overlayOrange.style.transition = `transform ${DURATION_OUT}ms ${EASING}`;
    overlayOrange.style.backfaceVisibility = "hidden";
    overlayOrange.style.perspective = "1000px";
    // IMPORTANTE: Disabilita pointer-events durante l'animazione per non bloccare i click
    overlayOrange.style.pointerEvents = "none";

    // Doppio requestAnimationFrame per movimento fluido e curvo
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Anima box nero dal basso verso il centro (copre la pagina)
        // L'easing crea una curva iniziale morbida che accelera fluidamente
        overlayBlack.style.transform = "translateY(0)";

        // Dopo delay minimo, anima box arancione dal basso
        // Il movimento è continuo e fluido grazie all'easing curvo
        setTimeout(() => {
          overlayOrange.style.transform = "translateY(0)";
          // Risolvi rapidamente per passaggio veloce - il box arancione non deve rimanere troppo
          setTimeout(() => {
            resolve();
          }, DURATION_OUT - 50); // Risolvi molto prima per passaggio più veloce
        }, DELAY_BETWEEN);
      });
    });
  });
}

/**
 * Animazione in entrata: box continuano a salire verso l'alto e scompaiono
 * Movimento continuo che continua dal punto in cui si erano fermati
 */
export function animateOverlayIn(): Promise<void> {
  return new Promise((resolve) => {
    if (prefersReducedMotion()) {
      const { overlayBlack, overlayOrange } = getOverlays();
      overlayBlack.style.display = "none";
      overlayOrange.style.display = "none";
      resolve();
      return;
    }

    const { overlayBlack, overlayOrange } = getOverlays();

    // Assicurati che gli overlay siano visibili e nella posizione corretta
    overlayBlack.style.display = "block";
    overlayOrange.style.display = "block";
    
    // IMPORTANTE: Disabilita pointer-events durante l'animazione per non bloccare i click
    // Anche se gli overlay sono fuori schermo, potrebbero comunque intercettare i click
    overlayBlack.style.pointerEvents = "none";
    overlayOrange.style.pointerEvents = "none";
    
    // Gli overlay sono già a translateY(0) dalla fase precedente
    // Ora continuano il movimento verso l'alto (fuori schermo)
    overlayOrange.style.transition = `transform ${DURATION_IN}ms ${EASING}`;
    overlayOrange.style.willChange = "transform";
    overlayOrange.style.backfaceVisibility = "hidden";
    overlayOrange.style.perspective = "1000px";

    overlayBlack.style.transition = `transform ${DURATION_IN}ms ${EASING}`;
    overlayBlack.style.willChange = "transform";
    overlayBlack.style.backfaceVisibility = "hidden";
    overlayBlack.style.perspective = "1000px";

    // Doppio requestAnimationFrame per movimento fluido continuo con curva naturale
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Box arancione continua a salire verso l'alto (scompare)
        // L'easing mantiene la curva iniziale morbida anche nella fase di uscita
        overlayOrange.style.transform = "translateY(-100%)";
        
        // Box nero continua a salire con delay ridotto per movimento più fluido
        setTimeout(() => {
          overlayBlack.style.transform = "translateY(-100%)";
        }, 40); // Delay ridotto per movimento più continuo
      });
    });

    // Nascondi e pulisci dopo che entrambi sono scomparsi - più veloce per passaggio rapido
    setTimeout(() => {
      overlayBlack.style.display = "none";
      overlayOrange.style.display = "none";
      overlayBlack.style.pointerEvents = "none";
      overlayOrange.style.pointerEvents = "none";
      overlayBlack.style.willChange = "auto";
      overlayOrange.style.willChange = "auto";
      resolve();
    }, DURATION_IN + 30); // Timeout ridotto per movimento più veloce
  });
}

/**
 * Animazione apertura menu: menu overlay sale dal basso
 * Stesso stile delle transizioni tra pagine
 */
export function animateMenuOpen(): Promise<void> {
  return new Promise((resolve) => {
    if (prefersReducedMotion()) {
      resolve();
      return;
    }

    const menuOverlay = document.querySelector(".menu-overlay") as HTMLDivElement;
    if (!menuOverlay) {
      resolve();
      return;
    }

    // Prepara il menu overlay - parte dal basso
    menuOverlay.style.transform = "translateY(100%)"; // Inizia dal basso (fuori schermo)
    menuOverlay.style.willChange = "transform";
    menuOverlay.style.transition = `transform ${DURATION_OUT}ms ${EASING}`;
    menuOverlay.style.backfaceVisibility = "hidden";
    menuOverlay.style.perspective = "1000px";

    // Doppio requestAnimationFrame per movimento fluido e curvo
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Anima il menu dal basso verso l'alto (copre lo schermo)
        menuOverlay.style.transform = "translateY(0)";
        
        // Risolvi quando il menu ha coperto lo schermo
        setTimeout(() => {
          resolve();
        }, DURATION_OUT);
      });
    });
  });
}

/**
 * Animazione chiusura menu: menu overlay scende verso il basso
 * Stesso stile delle transizioni tra pagine
 */
export function animateMenuClose(): Promise<void> {
  return new Promise((resolve) => {
    if (prefersReducedMotion()) {
      resolve();
      return;
    }

    const menuOverlay = document.querySelector(".menu-overlay") as HTMLDivElement;
    if (!menuOverlay) {
      resolve();
      return;
    }

    // Il menu è già visibile a translateY(0)
    // Ora anima verso il basso (fuori schermo)
    menuOverlay.style.transition = `transform ${DURATION_IN}ms ${EASING}`;
    menuOverlay.style.willChange = "transform";
    menuOverlay.style.backfaceVisibility = "hidden";
    menuOverlay.style.perspective = "1000px";

    // Doppio requestAnimationFrame per movimento fluido continuo
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Menu scende verso il basso (scompare)
        menuOverlay.style.transform = "translateY(100%)";
      });
    });

    // Risolvi dopo che il menu è scomparso
    setTimeout(() => {
      menuOverlay.style.willChange = "auto";
      resolve();
    }, DURATION_IN + 60);
  });
}
