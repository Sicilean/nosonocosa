#!/bin/bash

# Script per ottimizzare il video hero
# Richiede ffmpeg installato

VIDEO_INPUT="public/video/herovideo.mp4"
VIDEO_OUTPUT="public/video/herovideo_optimized.mp4"
VIDEO_BACKUP="public/video/herovideo.backup.mp4"

echo "🎬 Ottimizzazione video hero..."
echo ""

# Verifica se ffmpeg è installato
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ ffmpeg non è installato!"
    echo ""
    echo "Installa ffmpeg:"
    echo "  macOS: brew install ffmpeg"
    echo "  Linux: sudo apt-get install ffmpeg"
    echo "  Windows: https://ffmpeg.org/download.html"
    exit 1
fi

# Crea backup
if [ ! -f "$VIDEO_BACKUP" ]; then
    echo "📦 Creazione backup..."
    cp "$VIDEO_INPUT" "$VIDEO_BACKUP"
    echo "✅ Backup creato: $VIDEO_BACKUP"
    echo ""
fi

# Ottimizza il video
echo "🔄 Ottimizzazione in corso..."
echo "   Input: $VIDEO_INPUT"
echo "   Output: $VIDEO_OUTPUT"
echo ""

ffmpeg -i "$VIDEO_INPUT" \
  -vf "scale='min(1920,iw)':'min(1080,ih)':force_original_aspect_ratio=decrease" \
  -c:v libx264 \
  -preset slow \
  -crf 23 \
  -maxrate 2M \
  -bufsize 4M \
  -c:a aac \
  -b:a 128k \
  -movflags +faststart \
  -y \
  "$VIDEO_OUTPUT"

if [ $? -eq 0 ]; then
    # Confronta le dimensioni
    ORIGINAL_SIZE=$(stat -f%z "$VIDEO_INPUT" 2>/dev/null || stat -c%s "$VIDEO_INPUT" 2>/dev/null)
    NEW_SIZE=$(stat -f%z "$VIDEO_OUTPUT" 2>/dev/null || stat -c%s "$VIDEO_OUTPUT" 2>/dev/null)
    
    ORIGINAL_MB=$(echo "scale=2; $ORIGINAL_SIZE / 1024 / 1024" | bc)
    NEW_MB=$(echo "scale=2; $NEW_SIZE / 1024 / 1024" | bc)
    SAVINGS=$(echo "scale=1; ($ORIGINAL_SIZE - $NEW_SIZE) / $ORIGINAL_SIZE * 100" | bc)
    
    echo ""
    echo "✅ Ottimizzazione completata!"
    echo "   Dimensione originale: ${ORIGINAL_MB} MB"
    echo "   Dimensione ottimizzata: ${NEW_MB} MB"
    echo "   Spazio risparmiato: ${SAVINGS}%"
    echo ""
    echo "💡 Sostituisci il file originale con quello ottimizzato:"
    echo "   mv $VIDEO_OUTPUT $VIDEO_INPUT"
else
    echo ""
    echo "❌ Errore durante l'ottimizzazione"
    exit 1
fi
