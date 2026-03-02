#!/usr/bin/env node

/**
 * Script per generare il PDF della liberatoria dall'HTML
 * 
 * Prerequisiti:
 * npm install --save-dev puppeteer
 * 
 * Uso:
 * node scripts/generate-liberatoria-pdf.js
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generatePDF() {
  const htmlPath = path.join(__dirname, '../public/liberatoria.html');
  const pdfPath = path.join(__dirname, '../public/liberatoria.pdf');

  // Verifica che il file HTML esista
  if (!fs.existsSync(htmlPath)) {
    console.error('Errore: liberatoria.html non trovato in public/');
    process.exit(1);
  }

  const htmlContent = fs.readFileSync(htmlPath, 'utf8');

  console.log('🚀 Generazione PDF della liberatoria...');

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    
    // Carica il contenuto HTML
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0'
    });

    // Genera il PDF
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm'
      }
    });

    await browser.close();

    console.log('✅ PDF generato con successo: public/liberatoria.pdf');
  } catch (error) {
    console.error('❌ Errore durante la generazione del PDF:', error);
    process.exit(1);
  }
}

generatePDF();
