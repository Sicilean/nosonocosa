# Integrazione Swup Overlay Theme

Questo documento descrive l'integrazione di Swup con il theme "overlay" nel progetto Next.js, che gestisce le transizioni tra pagine con un overlay full-screen.

## 📦 Installazione Dipendenze

Prima di utilizzare l'integrazione, installa le dipendenze necessarie:

```bash
npm install swup
```

oppure

```bash
yarn add swup
```

**Nota:** L'overlay è implementato manualmente nel componente `SwupProvider`, quindi non è necessario installare `@swup/overlay-theme`.

## 🏗️ Struttura dell'Integrazione

### File Modificati/Creati

1. **`app/components/SwupProvider.tsx`**
   - Componente client che inizializza Swup con il theme overlay implementato manualmente
   - Gestisce l'overlay full-screen con animazioni JavaScript
   - Gestisce il lock anti multi-click
   - Supporta `prefers-reduced-motion`

2. **`app/layout.tsx`**
   - Integrato `SwupProvider` nel layout root
   - Aggiunto container `#swup` per il contenuto delle pagine

3. **`app/globals.css`**
   - Stili CSS per l'overlay con animazioni fluide
   - Supporto per `prefers-reduced-motion`

4. **`package.json`**
   - Aggiunta dipendenza `swup` (l'overlay è implementato manualmente, non serve pacchetto esterno)

## 🧪 Test della Transizione

### Test Base

1. **Avvia il server di sviluppo:**
   ```bash
   npm run dev
   ```

2. **Naviga tra le pagine:**
   - Clicca su qualsiasi link interno (es. "Mostre", "Open Call", "Info e orari")
   - Dovresti vedere un overlay nero che copre la pagina dall'alto
   - Dopo il caricamento, l'overlay si ritira dal basso rivelando la nuova pagina

3. **Test navigazione veloce:**
   - Clicca rapidamente su più link in sequenza
   - Il lock anti multi-click dovrebbe prevenire glitch e navigazioni multiple

4. **Test back/forward:**
   - Usa i pulsanti del browser (indietro/avanti)
   - La transizione dovrebbe funzionare correttamente anche con la navigazione del browser

### Test `prefers-reduced-motion`

1. **Su macOS:**
   - Apri "Preferenze di Sistema" → "Accessibilità" → "Display"
   - Attiva "Riduci movimento"
   - Ricarica la pagina e naviga tra le pagine
   - Le animazioni dovrebbero essere disabilitate (transizione istantanea)

2. **Su Chrome/Edge (Windows/Linux):**
   - Apri DevTools (F12)
   - Vai su "Rendering" → "Emulate CSS media feature `prefers-reduced-motion`"
   - Seleziona "reduce"
   - Naviga tra le pagine per verificare che le animazioni siano disabilitate

3. **Via CSS:**
   ```css
   @media (prefers-reduced-motion: reduce) {
     /* Le animazioni sono automaticamente disabilitate */
   }
   ```

### Test Link Esterni e Speciali

I seguenti tipi di link **non** attivano la transizione Swup:
- Link esterni (`target="_blank"`)
- Link email (`mailto:`)
- Link telefono (`tel:`)
- Link con anchor (`#section`)
- Link con attributo `data-no-swup`

Esempio per disabilitare Swup su un link specifico:
```tsx
<Link href="/pagina" data-no-swup>
  Link senza transizione
</Link>
```

## 🎨 Personalizzazione

### Modificare il Colore dell'Overlay

Modifica il colore nel file `app/globals.css`:

```css
.swup-overlay-theme {
  background-color: #1f1c1a; /* Cambia questo colore */
}
```

### Modificare la Durata dell'Animazione

Modifica la durata nel file `app/components/SwupProvider.tsx`:

```typescript
const duration = prefersReducedMotion ? 0 : 600; // Cambia questo valore (in millisecondi)
```

### Modificare l'Easing

Modifica l'easing nel file `app/components/SwupProvider.tsx`:

```typescript
const easing = "cubic-bezier(0.4, 0, 0.2, 1)"; // Cambia questo valore
```

Opzioni di easing comuni:
- `"ease"` - Inizio e fine lenti
- `"ease-in"` - Inizio lento
- `"ease-out"` - Fine lenta
- `"ease-in-out"` - Inizio e fine lenti
- `"cubic-bezier(0.4, 0, 0.2, 1)"` - Material Design easing (attuale)

Opzioni di easing comuni:
- `ease` - Inizio e fine lenti
- `ease-in` - Inizio lento
- `ease-out` - Fine lenta
- `ease-in-out` - Inizio e fine lenti
- `cubic-bezier(0.4, 0, 0.2, 1)` - Material Design easing (attuale)

## 🔧 Estensione con Overlay Custom (SVG)

Per implementare un overlay con forma curva o personalizzata usando SVG:

### 1. Crea un Componente Overlay Custom

Crea un nuovo file `app/components/CustomOverlay.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";

export function CustomOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Inizializza l'overlay custom quando Swup è pronto
    const swup = (window as any).swup;
    if (!swup) return;

    // SVG path per forma curva personalizzata
    const svgPath = "M0,0 Q50,50 100,0 T200,0 T300,0 T400,0 T500,0 T600,0 T700,0 T800,0 T900,0 T1000,0 L1000,100 L0,100 Z";

    // Hook personalizzato per le transizioni
    swup.hooks.on("animation:out:start", () => {
      if (overlayRef.current) {
        overlayRef.current.style.display = "block";
        // Anima l'overlay SVG
        overlayRef.current.classList.add("is-revealing");
      }
    });

    swup.hooks.on("animation:in:start", () => {
      if (overlayRef.current) {
        // Anima l'overlay SVG per ritirarsi
        overlayRef.current.classList.add("is-hiding");
      }
    });

    swup.hooks.on("animation:in:end", () => {
      if (overlayRef.current) {
        overlayRef.current.style.display = "none";
        overlayRef.current.classList.remove("is-revealing", "is-hiding");
      }
    });
  }, []);

  return (
    <div
      ref={overlayRef}
      className="swup-custom-overlay"
      style={{ display: "none" }}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 Q50,50 100,0 T200,0 T300,0 T400,0 T500,0 T600,0 T700,0 T800,0 T900,0 T1000,0 L1000,100 L0,100 Z"
          fill="#1f1c1a"
          className="overlay-path"
        />
      </svg>
    </div>
  );
}
```

### 2. Aggiungi gli Stili CSS

Aggiungi al file `app/globals.css`:

```css
.swup-custom-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  pointer-events: none;
}

.swup-custom-overlay .overlay-path {
  transform: translateY(-100%);
  transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
}

.swup-custom-overlay.is-revealing .overlay-path {
  transform: translateY(0);
}

.swup-custom-overlay.is-hiding .overlay-path {
  transform: translateY(100%);
}

@media (prefers-reduced-motion: reduce) {
  .swup-custom-overlay .overlay-path {
    transition: none;
  }
}
```

### 3. Integra il Componente

Aggiungi il componente al layout (`app/layout.tsx`):

```tsx
import { CustomOverlay } from "./components/CustomOverlay";

// ... nel return:
<SwupProvider />
<CustomOverlay />
<div id="swup">
  {children}
</div>
```

### 4. Disabilita il Theme Overlay Predefinito

Modifica `app/components/SwupProvider.tsx` per rimuovere il plugin overlay predefinito:

```typescript
const swup = new Swup({
  containers: ["#swup"],
  animateHistoryBrowsing: !prefersReducedMotion,
  cache: true,
  preload: true,
  // Rimuovi o commenta questa riga:
  // plugins: [new SwupOverlayTheme({ ... })],
});
```

## 🐛 Risoluzione Problemi

### L'overlay non appare

1. Verifica che le dipendenze siano installate:
   ```bash
   npm list swup
   ```

2. Controlla la console del browser per errori JavaScript

3. Verifica che il container `#swup` esista nel DOM

4. Verifica che l'elemento overlay sia stato creato nel DOM (dovrebbe avere la classe `swup-overlay-theme`)

### Le animazioni sono scattose

1. Verifica che non ci siano conflitti CSS con altre animazioni
2. Assicurati che `will-change: transform` sia presente negli stili
3. Controlla le performance con DevTools

### Il lock anti multi-click non funziona

1. Verifica che gli event listener siano correttamente registrati
2. Controlla la console per eventuali errori
3. Assicurati che i link abbiano l'attributo `href` corretto

### Conflitti con CSS Globali

Se ci sono conflitti con CSS esistenti:

1. **Scoping CSS:** Aggiungi un prefisso specifico agli stili Swup
2. **Import differito:** Carica gli stili Swup solo quando necessario
3. **Specificity:** Aumenta la specificità degli stili Swup usando `!important` se necessario (da usare con cautela)

Esempio di scoping:
```css
/* Invece di .swup-overlay-theme */
#swup ~ .swup-overlay-theme {
  /* stili */
}
```

## 📚 Risorse Aggiuntive

- [Documentazione Swup](https://swup.js.org/)
- [Swup Overlay Theme](https://swup.js.org/plugins/themes/overlay)
- [GitHub: Swup Demos](https://github.com/swup/demos)

## ✅ Checklist di Verifica

- [x] Dipendenze installate
- [x] SwupProvider integrato nel layout
- [x] Container `#swup` presente
- [x] Stili CSS aggiunti
- [x] Lock anti multi-click funzionante
- [x] Supporto `prefers-reduced-motion` implementato
- [x] Test navigazione base completati
- [x] Test back/forward completati
- [x] Test link esterni completati
