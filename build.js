#!/usr/bin/env node

/**
 * SaudiSaaSHub Build Script
 * Optimizes HTML, CSS, JS and generates service worker for GitHub Pages
 * Usage: node build.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  inputFile: 'index.html',
  outputFile: 'index.min.html',
  swFile: 'sw.js',
  nojekyllFile: '.nojekyll',
  cnameFile: 'CNAME',
  ghPagesBranch: 'gh-pages'
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  red: '\x1b[31m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function minifyCSS(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
    .replace(/\s+/g, ' ') // Collapse whitespace
    .replace(/\s?([\{\}\:;\,])\s?/g, '$1') // Remove space around operators
    .replace(/;}/g, '}') // Remove last semicolon
    .replace(/#([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])/g, '#$1$3$5') // Shorten hex colors
    .replace(/#([0-9a-f])([0-9a-f])([0-9a-f])/g, '#$1$2$3') // Shorten 3-digit hex
    .trim();
}

function minifyJS(js) {
  return js
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
    .replace(/\/\/.*$/gm, '') // Remove single-line comments
    .replace(/\s+/g, ' ') // Collapse whitespace
    .replace(/\s?([\{\}\(\)\[\]\;\,])\s?/g, '$1') // Remove space around operators
    .replace(/;\}/g, '}') // Remove last semicolon
    .replace(/var /g, '') // Optional: remove var keyword
    .replace(/let /g, '') // Optional: remove let keyword
    .replace(/const /g, '') // Optional: remove const keyword
    .trim();
}

function minifyHTML(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, '') // Remove HTML comments
    .replace(/\s+/g, ' ') // Collapse whitespace
    .replace(/>\s+</g, '><') // Remove whitespace between tags
    .replace(/\s?=\s?/g, '=') // Remove spaces around equals
    .replace(/<!--(.*?)-->/g, '') // Remove conditional comments
    .replace(/<meta[^>]*>/g, match => match.trim()) // Clean meta tags
    .replace(/<link[^>]*>/g, match => match.trim()) // Clean link tags
    .replace(/<script[^>]*>/g, match => match.trim()) // Clean script open tags
    .replace(/<\/script>/g, match => match.trim()) // Clean script close tags
    .trim();
}

function extractStylesAndScripts(html) {
  const styles = [];
  const scripts = [];
  
  // Extract inline styles
  html = html.replace(/<style[^>]*>([\s\S]*?)<\/style>/g, (match, css) => {
    styles.push(minifyCSS(css));
    return '';
  });
  
  // Extract inline scripts
  html = html.replace(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/g, (match, js) => {
    scripts.push(minifyJS(js));
    return '';
  });
  
  return { html, styles, scripts };
}

function generateServiceWorker() {
  const swCode = `/**
 * Service Worker for SaudiSaaSHub
 * Provides offline support and caching
 * Generated: ${new Date().toISOString()}
 */

const CACHE_NAME = 'saudisaashub-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  'https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;700&display=swap',
  'https://fonts.gstatic.com/s/notosansarabic/v27/nwpTtKz1CJkTUACbsFHgklK5p6v6m7w3mjxo.woff2'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        log('[SW] Caching assets');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests or chrome-extension requests
  if (request.method !== 'GET' || url.protocol === 'chrome-extension:') {
    return;
  }
  
  event.respondWith(
    caches.match(request)
      .then(cachedResponse => {
        if (cachedResponse) {
          // Return cached version
          return cachedResponse;
        }
        
        // Fetch from network
        return fetch(request)
          .then(response => {
            // Don't cache if not successful
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone response to cache
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(request, responseToCache);
            });
            
            return response;
          })
          .catch(() => {
            // Return offline fallback for HTML pages
            if (request.headers.get('accept').includes('text/html')) {
              return caches.match('/index.html');
            }
          });
      })
  );
});

function log(...args) {
  // Only log in development
  if (location.hostname === 'localhost') {
    console.log('[SW]', ...args);
  }
}
`;
  return swCode;
}

function main() {
  try {
    log('\n🚀 SaudiSaaSHub Build Process\n', 'cyan');
    
    // Read input HTML
    const inputPath = path.join(__dirname, CONFIG.inputFile);
    if (!fs.existsSync(inputPath)) {
      log(`❌ Error: ${CONFIG.inputFile} not found`, 'red');
      process.exit(1);
    }
    
    const html = fs.readFileSync(inputPath, 'utf8');
    log(`✓ Read ${CONFIG.inputFile}`, 'green');
    
    // Extract and minify
    const { html: cleanHTML, styles, scripts } = extractStylesAndScripts(html);
    
    // Reconstruct HTML with minified inline code
    let optimizedHTML = cleanHTML;
    
    // Check if there were any styles extracted
    if (styles.length > 0) {
      const minifiedStyles = minifyCSS(styles.join(' '));
      optimizedHTML = optimizedHTML.replace(
        '<style></style>',
        `<style>${minifiedStyles}</style>`
      );
    }
    
    // Check if there were any scripts extracted
    if (scripts.length > 0) {
      const minifiedScripts = minifyJS(scripts.join(' '));
      optimizedHTML = optimizedHTML.replace(
        '<script></script>',
        `<script>${minifiedScripts}</script>`
      );
    }
    
    // Final minification of entire HTML
    const finalHTML = minifyHTML(optimizedHTML);
    
    // Write optimized HTML
    const outputPath = path.join(__dirname, CONFIG.outputFile);
    fs.writeFileSync(outputPath, finalHTML);
    log(`✓ Wrote ${CONFIG.outputFile}`, 'green');
    
    // Generate service worker
    const swCode = generateServiceWorker();
    const swPath = path.join(__dirname, CONFIG.swFile);
    fs.writeFileSync(swPath, swCode);
    log(`✓ Generated ${CONFIG.swFile}`, 'green');
    
    // Create .nojekyll for GitHub Pages (prevents Jekyll processing)
    const nojekyllPath = path.join(__dirname, CONFIG.nojekyllFile);
    fs.writeFileSync(nojekyllPath, '');
    log(`✓ Created ${CONFIG.nojekyllFile}`, 'green');
    
    // Create CNAME file for custom domain (optional)
    // User can edit this file to add their custom domain
    const cnamePath = path.join(__dirname, CONFIG.cnameFile);
    if (!fs.existsSync(cnamePath)) {
      fs.writeFileSync(cnamePath, 'saudisaashub.pages.dev\n');
      log(`✓ Created ${CONFIG.cnameFile} (edit for custom domain)`, 'green');
    }
    
    // Calculate savings
    const originalSize = Buffer.byteLength(html, 'utf8');
    const optimizedSize = Buffer.byteLength(finalHTML, 'utf8');
    const swSize = Buffer.byteLength(swCode, 'utf8');
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
    
    log('\n📊 Build Summary:', 'cyan');
    log(`  Original HTML:     ${(originalSize / 1024).toFixed(2)} KB`, 'yellow');
    log(`  Optimized HTML:   ${(optimizedSize / 1024).toFixed(2)} KB (${savings}% smaller)`, 'yellow');
    log(`  Service Worker:   ${(swSize / 1024).toFixed(2)} KB`, 'yellow');
    log(`  Total added:      ~${((swSize + 64) / 1024).toFixed(2)} KB (SW + .nojekyll)`, 'yellow');
    log('\n✅ Build complete!', 'green');
    log('\n📝 Next steps:', 'cyan');
    log('  1. Deploy optimized index.min.html as index.html to GitHub Pages', 'yellow');
    log('  2. Commit and push sw.js, .nojekyll, CNAME', 'yellow');
    log('  3. Configure repository GitHub Pages from main/gh-pages branch', 'yellow');
    log('  4. Run Lighthouse audit to verify 100 scores\n', 'yellow');
    
  } catch (error) {
    log(`\n❌ Build failed: ${error.message}`, 'red');
    console.error(error);
    process.exit(1);
  }
}

// Run build
main();
