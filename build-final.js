#!/usr/bin/env node

/**
 * SaudiSaaSHub Final Build Script
 * Creates production-ready optimized HTML with all performance features
 */

const fs = require('fs');
const path = require('path');

const CONFIG = {
  inputFile: 'index-optimized.html',
  outputFile: 'index.html',
  swFile: 'sw.js',
  nojekyllFile: '.nojekyll',
  cnameFile: 'CNAME'
};

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function minifyHTML(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')
    .replace(/\s?=\s?/g, '=')
    .replace(/<!--(.*?)-->/g, '')
    .trim();
}

function generateServiceWorker() {
  return `/**
 * Service Worker for SaudiSaaSHub
 * Cache-first strategy for static assets
 */
const CACHE_NAME = 'saudisaashub-v1';
const ASSETS = ['/','/index.html','https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;700&display=swap','https://fonts.gstatic.com/s/notosansarabic/v27/nwpTtKz1CJkTUACbsFHgklK5p6v6m7w3mjxo.woff2'];

self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});

self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(n=>Promise.all(n.filter(n=>n!==CACHE_NAME).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});

self.addEventListener('fetch',e=>{e.request.method!=='GET'||e.request.url.startsWith('chrome-extension:')||e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(n=>n.ok?caches.open(CACHE_NAME).then(c=>{c.put(e.request,n.clone());return n}):n).catch(()=>e.request.headers.get('accept')?.includes('text/html')?caches.match('/index.html'):void 0)))});
}

function main() {
  try {
    log('\n🚀 SaudiSaaSHub Final Production Build\n', 'cyan');
    
    const inputPath = path.join(__dirname, CONFIG.inputFile);
    if (!fs.existsSync(inputPath)) {
      log(`❌ Input file not found: ${CONFIG.inputFile}`, 'red');
      log('   Make sure index-optimized.html exists.\n', 'yellow');
      process.exit(1);
    }
    
    const html = fs.readFileSync(inputPath, 'utf8');
    log(`✓ Loaded ${CONFIG.inputFile} (${(html.length/1024).toFixed(1)} KB)\n`, 'green');
    
    // Minify
    const minified = minifyHTML(html);
    const outputPath = path.join(__dirname, CONFIG.outputFile);
    fs.writeFileSync(outputPath, minified);
    log(`✓ Created ${CONFIG.outputFile} (${(minified.length/1024).toFixed(1)} KB)\n`, 'green');
    
    // Generate service worker
    const sw = generateServiceWorker();
    fs.writeFileSync(path.join(__dirname, CONFIG.swFile), sw);
    log(`✓ Generated ${CONFIG.swFile} (${(sw.length/1024).toFixed(1)} KB)\n`, 'green');
    
    // Support files
    fs.writeFileSync(path.join(__dirname, CONFIG.nojekyllFile), '');
    if (!fs.existsSync(path.join(__dirname, CONFIG.cnameFile))) {
      fs.writeFileSync(path.join(__dirname, CONFIG.cnameFile), 'saudisaashub.pages.dev\n');
    }
    
    log('📊 Production Ready Assets:', 'yellow');
    log(`   ${CONFIG.outputFile}: ${(minified.length/1024).toFixed(1)} KB`, 'green');
    log(`   ${CONFIG.swFile}: ${(sw.length/1024).toFixed(1)} KB`, 'green');
    log(`   ${CONFIG.nojekyllFile}: 0 KB (flag file)`, 'green');
    log(`   ${CONFIG.cnameFile}: 0 KB (config)\n`, 'green');
    
    log('✅ Build complete! Deploy these files to GitHub Pages.\n', 'green');
    log('📤 Deployment:', 'cyan');
    log('   git add index.html sw.js .nojekyll CNAME', 'yellow');
    log('   git commit -m "Deploy optimized v1.0"', 'yellow');
    log('   git push origin main\n', 'yellow');
    log('🎯 Then run Lighthouse to verify 100 scores!\n', 'cyan');
    
  } catch (e) {
    log(`\n❌ Error: ${e.message}`, 'red');
    process.exit(1);
  }
}

main();
