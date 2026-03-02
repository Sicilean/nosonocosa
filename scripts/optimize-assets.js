#!/usr/bin/env node

/**
 * Script per ottimizzare immagini e video del progetto
 * 
 * Prerequisiti:
 * npm install --save-dev sharp
 * 
 * Per il video, installa ffmpeg:
 * macOS: brew install ffmpeg
 * Linux: sudo apt-get install ffmpeg
 * Windows: scarica da https://ffmpeg.org/download.html
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configurazione ottimizzazione
const IMAGE_CONFIG = {
  jpeg: { quality: 85, progressive: true },
  png: { quality: 90, compressionLevel: 9 },
  maxWidth: 1920, // Larghezza massima per le immagini
  maxHeight: 1920, // Altezza massima per le immagini
};

const VIDEO_CONFIG = {
  maxWidth: 1920,
  maxHeight: 1080,
  bitrate: '2M', // Bitrate per il video
  fps: 30,
};

// Cartelle da ottimizzare
const OPTIMIZE_PATHS = {
  images: [
    'public/mostre',
    'public/edizioni/2025',
    'public/loghi',
    'public',
  ],
  video: [
    'public/video',
  ],
};

// Estensioni supportate
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png'];
const VIDEO_EXTENSIONS = ['.mp4'];

/**
 * Ottimizza un'immagine
 */
async function optimizeImage(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    const stats = fs.statSync(filePath);
    const originalSize = stats.size;

    console.log(`Ottimizzando: ${filePath} (${(originalSize / 1024 / 1024).toFixed(2)} MB)`);

    const image = sharp(filePath);
    const metadata = await image.metadata();

    // Calcola le dimensioni ottimizzate mantenendo l'aspect ratio
    let width = metadata.width;
    let height = metadata.height;

    if (width > IMAGE_CONFIG.maxWidth || height > IMAGE_CONFIG.maxHeight) {
      if (width > height) {
        width = IMAGE_CONFIG.maxWidth;
        height = Math.round((metadata.height / metadata.width) * IMAGE_CONFIG.maxWidth);
      } else {
        height = IMAGE_CONFIG.maxHeight;
        width = Math.round((metadata.width / metadata.height) * IMAGE_CONFIG.maxHeight);
      }
    }

    // Crea file temporaneo
    const tempPath = filePath + '.tmp';
    
    if (ext === '.jpg' || ext === '.jpeg') {
      await image
        .resize(width, height, { fit: 'inside', withoutEnlargement: true })
        .jpeg(IMAGE_CONFIG.jpeg)
        .toFile(tempPath);
    } else if (ext === '.png') {
      await image
        .resize(width, height, { fit: 'inside', withoutEnlargement: true })
        .png(IMAGE_CONFIG.png)
        .toFile(tempPath);
    }

    // Sostituisci il file originale con quello ottimizzato
    const newStats = fs.statSync(tempPath);
    const newSize = newStats.size;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);

    if (newSize < originalSize) {
      fs.renameSync(tempPath, filePath);
      console.log(`  ✓ Ottimizzato: ${(newSize / 1024 / 1024).toFixed(2)} MB (${savings}% riduzione)`);
      return { saved: originalSize - newSize, original: originalSize, optimized: newSize };
    } else {
      // Se non c'è miglioramento, elimina il file temporaneo
      fs.unlinkSync(tempPath);
      console.log(`  - Nessun miglioramento`);
      return { saved: 0, original: originalSize, optimized: originalSize };
    }
  } catch (error) {
    console.error(`  ✗ Errore ottimizzando ${filePath}:`, error.message);
    return { saved: 0, original: 0, optimized: 0 };
  }
}

/**
 * Ottimizza un video (richiede ffmpeg)
 */
async function optimizeVideo(filePath) {
  return new Promise((resolve) => {
    const { exec } = require('child_process');
    const stats = fs.statSync(filePath);
    const originalSize = stats.size;
    const tempPath = filePath.replace(/\.(mp4|mov|avi)$/i, '_optimized.mp4');

    console.log(`Ottimizzando video: ${filePath} (${(originalSize / 1024 / 1024).toFixed(2)} MB)`);

    // Comando ffmpeg per ottimizzare il video
    const command = `ffmpeg -i "${filePath}" -vf "scale='min(${VIDEO_CONFIG.maxWidth},iw)':'min(${VIDEO_CONFIG.maxHeight},ih)':force_original_aspect_ratio=decrease" -c:v libx264 -preset slow -crf 23 -maxrate ${VIDEO_CONFIG.bitrate} -bufsize ${VIDEO_CONFIG.bitrate} -c:a aac -b:a 128k -movflags +faststart "${tempPath}" -y`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`  ✗ Errore ottimizzando video ${filePath}:`, error.message);
        console.error(`  Nota: Assicurati che ffmpeg sia installato`);
        resolve({ saved: 0, original: originalSize, optimized: originalSize });
        return;
      }

      if (fs.existsSync(tempPath)) {
        const newStats = fs.statSync(tempPath);
        const newSize = newStats.size;
        const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);

        if (newSize < originalSize) {
          // Backup del file originale
          const backupPath = filePath + '.backup';
          fs.copyFileSync(filePath, backupPath);
          fs.renameSync(tempPath, filePath);
          console.log(`  ✓ Ottimizzato: ${(newSize / 1024 / 1024).toFixed(2)} MB (${savings}% riduzione)`);
          console.log(`  Backup salvato in: ${backupPath}`);
          resolve({ saved: originalSize - newSize, original: originalSize, optimized: newSize });
        } else {
          fs.unlinkSync(tempPath);
          console.log(`  - Nessun miglioramento`);
          resolve({ saved: 0, original: originalSize, optimized: originalSize });
        }
      } else {
        console.error(`  ✗ File ottimizzato non creato`);
        resolve({ saved: 0, original: originalSize, optimized: originalSize });
      }
    });
  });
}

/**
 * Trova tutti i file in una directory
 */
function findFiles(dir, extensions, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findFiles(filePath, extensions, fileList);
    } else if (extensions.some(ext => filePath.toLowerCase().endsWith(ext))) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Funzione principale
 */
async function main() {
  console.log('🚀 Inizio ottimizzazione asset...\n');

  let totalSaved = 0;
  let totalOriginal = 0;
  let totalOptimized = 0;

  // Ottimizza immagini
  console.log('📸 Ottimizzazione immagini...\n');
  for (const dir of OPTIMIZE_PATHS.images) {
    const dirPath = path.join(process.cwd(), dir);
    if (fs.existsSync(dirPath)) {
      const imageFiles = findFiles(dirPath, IMAGE_EXTENSIONS);
      for (const file of imageFiles) {
        const result = await optimizeImage(file);
        totalSaved += result.saved;
        totalOriginal += result.original;
        totalOptimized += result.optimized;
      }
    }
  }

  // Ottimizza video
  console.log('\n🎬 Ottimizzazione video...\n');
  for (const dir of OPTIMIZE_PATHS.video) {
    const dirPath = path.join(process.cwd(), dir);
    if (fs.existsSync(dirPath)) {
      const videoFiles = findFiles(dirPath, VIDEO_EXTENSIONS);
      for (const file of videoFiles) {
        const result = await optimizeVideo(file);
        totalSaved += result.saved;
        totalOriginal += result.original;
        totalOptimized += result.optimized;
      }
    }
  }

  // Riepilogo
  console.log('\n' + '='.repeat(50));
  console.log('📊 Riepilogo ottimizzazione:');
  console.log(`   Dimensione originale: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Dimensione ottimizzata: ${(totalOptimized / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Spazio risparmiato: ${(totalSaved / 1024 / 1024).toFixed(2)} MB (${((totalSaved / totalOriginal) * 100).toFixed(1)}%)`);
  console.log('='.repeat(50));
}

// Esegui lo script
main().catch(console.error);
