# Guida all'Ottimizzazione di Immagini e Video

## 📊 Situazione Attuale

Il progetto contiene file molto grandi che rallentano il caricamento:

- **Video hero**: 26 MB (troppo grande!)
- **Immagini edizioni 2025**: 10-19 MB ciascuna (52 immagini!)
- **Immagini mostre**: 25-74 KB (accettabili)
- **Loghi**: 33 KB - 269 KB (alcuni potrebbero essere ottimizzati)

## 🚀 Ottimizzazione Rapida

### Opzione 1: Script Automatico (Consigliato)

1. **Installa le dipendenze:**
   ```bash
   npm install --save-dev sharp
   ```

2. **Installa ffmpeg** (per ottimizzare i video):
   - **macOS**: `brew install ffmpeg`
   - **Linux**: `sudo apt-get install ffmpeg`
   - **Windows**: Scarica da https://ffmpeg.org/download.html

3. **Esegui lo script:**
   ```bash
   node scripts/optimize-assets.js
   ```

Lo script:
- Riduce automaticamente le dimensioni delle immagini mantenendo la qualità
- Comprime i video mantenendo una buona qualità visiva
- Crea backup dei file originali (per i video)
- Mostra un riepilogo dello spazio risparmiato

### Opzione 2: Ottimizzazione Manuale Online

#### Per le Immagini:
1. **TinyPNG** (https://tinypng.com/): Ottimo per PNG e JPEG
2. **Squoosh** (https://squoosh.app/): Tool Google, molto potente
3. **ImageOptim** (macOS): App desktop gratuita

#### Per i Video:
1. **HandBrake** (https://handbrake.fr/): Gratuito e open source
   - Impostazioni consigliate:
     - Preset: "Fast 1080p30"
     - Quality: RF 23
     - Video Codec: H.264
     - Audio: AAC 128kbps

2. **CloudConvert** (https://cloudconvert.com/): Online, supporta molti formati

## 📐 Dimensioni Consigliate

### Immagini:
- **Hero/Full-width**: Max 1920px di larghezza, qualità 85%
- **Gallery**: Max 1200px di larghezza, qualità 80%
- **Thumbnails**: Max 400px di larghezza, qualità 75%
- **Loghi**: Max 500px, qualità 90%

### Video:
- **Hero video**: Max 1920x1080, bitrate 2-3 Mbps, H.264
- **Durata**: Considera di tagliare se supera 30 secondi per il loop

## 🎯 Priorità di Ottimizzazione

### Alta Priorità (Fare subito):
1. **Video hero** (26 MB → obiettivo: < 5 MB)
2. **Immagini edizioni 2025** (10-19 MB ciascuna → obiettivo: < 500 KB)

### Media Priorità:
3. **parco-selinunte.jpg** (514 KB → obiettivo: < 200 KB)
4. **Loghi PNG** (convertire in SVG o ottimizzare)

### Bassa Priorità:
5. **Immagini mostre** (già abbastanza piccole)

## 💡 Suggerimenti Aggiuntivi

### Per Next.js:
- Il progetto usa `images: { unoptimized: true }` per static export
- Considera di usare WebP per le immagini (migliore compressione)
- Implementa lazy loading per le immagini della gallery

### Per il Video:
- Considera di creare una versione più corta (10-15 secondi invece di loop completo)
- Usa un poster image per il video
- Considera di usare un CDN per il video (es. Cloudflare Stream, Vimeo)

## 📝 Note

- **Backup**: Lo script crea automaticamente backup dei video originali
- **Qualità**: Le impostazioni sono bilanciate tra qualità e dimensione
- **Tempo**: L'ottimizzazione può richiedere diversi minuti per molti file

## ✅ Dopo l'Ottimizzazione

1. Testa il sito localmente: `npm run dev`
2. Verifica che le immagini/video si carichino correttamente
3. Controlla le dimensioni finali nella cartella `public/`
4. Esegui il build: `npm run build`
5. Verifica le dimensioni della cartella `out/`

## 🔧 Troubleshooting

**Errore "sharp not found":**
```bash
npm install --save-dev sharp
```

**Errore "ffmpeg not found":**
- Installa ffmpeg seguendo le istruzioni sopra
- Verifica con: `ffmpeg -version`

**Le immagini sono troppo piccole:**
- Modifica `maxWidth` e `maxHeight` in `scripts/optimize-assets.js`
- Aumenta la qualità nelle impostazioni `IMAGE_CONFIG`
