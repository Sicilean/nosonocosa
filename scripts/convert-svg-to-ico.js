const fs = require('fs');
const path = require('path');

async function convertSvgToIco() {
  const svgPath = path.join(__dirname, '../out/icon.svg');
  const icoPath = path.join(__dirname, '../out/favicon.ico');
  
  if (!fs.existsSync(svgPath)) {
    console.error('File icon.svg non trovato in out/');
    process.exit(1);
  }

  try {
    const sharp = require('sharp');
    const toIco = require('to-ico');
    
    // Crea PNG in diverse dimensioni per ICO multi-size
    const sizes = [16, 32, 48];
    const buffers = [];
    
    for (const size of sizes) {
      const buffer = await sharp(svgPath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toBuffer();
      buffers.push(buffer);
    }
    
    // Converti i PNG in formato ICO
    const ico = await toIco(buffers);
    
    // Salva il file ICO
    fs.writeFileSync(icoPath, ico);
    
    console.log('✓ favicon.ico creato con successo!');
    console.log(`  Dimensioni incluse: ${sizes.join('x')}px`);
    
  } catch (error) {
    console.error('Errore durante la conversione:', error.message);
    if (error.code === 'MODULE_NOT_FOUND') {
      console.log('\nInstalla le dipendenze necessarie:');
      console.log('  npm install --save-dev sharp to-ico');
    }
    process.exit(1);
  }
}

convertSvgToIco();
