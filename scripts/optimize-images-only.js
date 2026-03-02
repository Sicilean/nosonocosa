#!/usr/bin/env node

/**
 * Script per ottimizzare SOLO le immagini (non richiede ffmpeg)
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configurazione ottimizzazione
const IMAGE_CONFIG = {
  jpeg: { quality: 85, progressive: true, mozjpeg: true },
  png: { quality: 90, compressionLevel: 9 },
  maxWidth: 1920,
  maxHeight: 1920,
};

// Cartelle da ottimizzare
const OPTIMIZE_PATHS = [
  'public/mostre',
  'public/edizioni/2025',
  'public/loghi',
  'public/giuria',
  'public',
];

// Estensioni supportate
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png'];

/**
 * Ottimizza un'immagine
 */
async function optimizeImage(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    const stats = fs.statSync(filePath);
    const originalSize = stats.size;

    // Salta se è già piccolo (< 100KB)
    if (originalSize < 100 * 1024) {
      console.log(`⏭️  Saltato (già piccolo): ${filePath} (${(originalSize / 1024).toFixed(2)} KB)`);
      return { saved: 0, original: originalSize, optimized: originalSize };
    }

    console.log(`🖼️  Ottimizzando: ${path.relative(process.cwd(), filePath)} (${(originalSize / 1024 / 1024).toFixed(2)} MB)`);

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
      // Backup del file originale
      const backupPath = filePath + '.backup';
      if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(filePath, backupPath);
      }
      
      fs.renameSync(tempPath, filePath);
      console.log(`   ✅ Ottimizzato: ${(newSize / 1024 / 1024).toFixed(2)} MB (${savings}% riduzione)`);
      return { saved: originalSize - newSize, original: originalSize, optimized: newSize };
    } else {
      // Se non c'è miglioramento, elimina il file temporaneo
      fs.unlinkSync(tempPath);
      console.log(`   ⚠️  Nessun miglioramento`);
      return { saved: 0, original: originalSize, optimized: originalSize };
    }
  } catch (error) {
    console.error(`   ❌ Errore: ${error.message}`);
    return { saved: 0, original: 0, optimized: 0 };
  }
}

/**
 * Trova tutti i file in una directory
 */
function findFiles(dir, extensions, fileList = []) {
  if (!fs.existsSync(dir)) {
    return fileList;
  }
  
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findFiles(filePath, extensions, fileList);
    } else if (extensions.some(ext => filePath.toLowerCase().endsWith(ext))) {
      // Salta file di backup e temporanei
      if (!filePath.includes('.backup') && !filePath.includes('.tmp')) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

/**
 * Funzione principale
 */
async function main() {
  console.log('🚀 Inizio ottimizzazione immagini...\n');

  let totalSaved = 0;
  let totalOriginal = 0;
  let totalOptimized = 0;
  let filesProcessed = 0;
  let filesOptimized = 0;

  // Ottimizza immagini
  for (const dir of OPTIMIZE_PATHS) {
    const dirPath = path.join(process.cwd(), dir);
    if (fs.existsSync(dirPath)) {
      const imageFiles = findFiles(dirPath, IMAGE_EXTENSIONS);
      console.log(`📁 Cartella: ${dir} (${imageFiles.length} immagini trovate)\n`);
      
      for (const file of imageFiles) {
        const result = await optimizeImage(file);
        totalSaved += result.saved;
        totalOriginal += result.original;
        totalOptimized += result.optimized;
        filesProcessed++;
        if (result.saved > 0) {
          filesOptimized++;
        }
      }
      console.log('');
    }
  }

  // Riepilogo
  console.log('='.repeat(60));
  console.log('📊 Riepilogo ottimizzazione:');
  console.log(`   File processati: ${filesProcessed}`);
  console.log(`   File ottimizzati: ${filesOptimized}`);
  console.log(`   Dimensione originale: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Dimensione ottimizzata: ${(totalOptimized / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Spazio risparmiato: ${(totalSaved / 1024 / 1024).toFixed(2)} MB (${totalOriginal > 0 ? ((totalSaved / totalOriginal) * 100).toFixed(1) : 0}%)`);
  console.log('='.repeat(60));
  console.log('\n💡 Nota: I backup sono salvati con estensione .backup');
  console.log('   Puoi eliminarli dopo aver verificato che tutto funzioni correttamente.\n');
}

// Esegui lo script
main().catch(console.error);
