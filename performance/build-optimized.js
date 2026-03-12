/**
 * SaudiSaaSHub - Enhanced Production Build Script
 * Full optimization for maximum performance and Lighthouse scores
 */

const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');
const { optimize } = require('svgo'); // Optional: for SVG optimization

// ============================================
// CONFIGURATION
// ============================================
const config = {
  root: __dirname.replace(/\/performance$/, ''), // Project root
  outdir: 'dist',
  assetsDir: 'dist/assets',
  publicPath: '/',

  // Performance budgets (in bytes)
  budgets: {
    html: 50 * 1024,        // 50KB
    css: 50 * 1024,         // 50KB
    jsMain: 30 * 1024,      // 30KB per main bundle
    jsTotal: 60 * 1024,     // 60KB total JS
    font: 100 * 1024,       // 100KB per font
    image: 200 * 1024,      // 200KB per image
    total: 200 * 1024       // 200KB total transfer
  },

  // Build options
  minify: true,
  sourcemap: false,
  target: ['es2017'],
  format: 'esm'
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Check if file meets budget
function checkBudget(name, size) {
  const budgetKey = name.toLowerCase().includes('html') ? 'html' :
                    name.toLowerCase().includes('css') ? 'css' :
                    name.toLowerCase().includes('js') ? 'jsMain' : null;

  if (budgetKey && config.budgets[budgetKey] && size > config.budgets[budgetKey]) {
    console.warn(`⚠️  ${name} exceeds budget: ${(size/1024).toFixed(2)}KB > ${(config.budgets[budgetKey]/1024).KB}`);
    return false;
  }
  return true;
}

// Ensure directory exists
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// ============================================
// BUILD: JAVASCRIPT
// ============================================
async function buildJavaScript() {
  console.log('\n🔨 Building JavaScript bundles...\n');

  const entryPoints = {
    app: 'js/app.js',
    'structured-data': 'js/structured-data.js',
    'ga4-setup': 'js/ga4-setup.js',
    'perf-monitor': 'performance/perf.js' // Include performance monitor
  };

  let totalJsSize = 0;
  const buildPromises = Object.entries(entryPoints).map(([name, entryPoint]) => {
    const entryPath = path.join(config.root, entryPoint);
    if (!fs.existsSync(entryPath)) {
      console.log(`   ⚠️  Skipping ${name}: file not found`);
      return Promise.resolve();
    }

    return esbuild.build({
      entryPoints: [entryPath],
      bundle: true,
      minify: config.minify,
      sourcemap: config.sourcemap,
      target: config.target,
      format: config.format,
      outfile: path.join(config.root, config.outdir, `${name}.js`),
      define: {
        'process.env.NODE_ENV': '"production"',
        'process.env.NODE_DEBUG': 'false'
      },
      treeShaking: true,
      chunkNames: 'chunks/[name]-[hash]',
      splitting: true,
      external: [], // Keep external imports dynamic
      // Metafile for analysis
      metafile: path.join(config.root, config.outdir, `meta-${name}.json`),
      // Banner for copyright
      banner: {
        js: `/*! SaudiSaaSHub v1.0.0 | (c) 2026 | https://saudisaashub.com */`
      }
    }).then(result => {
      const outfile = path.join(config.root, config.outdir, `${name}.js`);
      const stats = fs.statSync(outfile);
      const sizeKB = stats.size / 1024;

      console.log(`   ✅ ${name}.js: ${sizeKB.toFixed(2)} KB`);

      if (!checkBudget(name, stats.size)) {
        console.warn(`   Warning: ${name}.js exceeds budget!`);
      }

      totalJsSize += stats.size;
      return result;
    }).catch(err => {
      console.error(`   ❌ Failed to build ${name}:`, err.message);
      throw err;
    });
  });

  await Promise.all(buildPromises);

  console.log(`\n   Total JavaScript: ${(totalJsSize/1024).toFixed(2)} KB`);
  if (totalJsSize > config.budgets.jsTotal) {
    console.warn(`   ⚠️  Total JS exceeds budget of ${(config.budgets.jsTotal/1024).KB}\n`);
  }
}

// ============================================
// BUILD: CSS
// ============================================
async function buildCSS() {
  console.log('\n🎨 Building CSS...\n');

  const cssFiles = [
    'css/design-system.css',
    'css/components.css',
    'css/utilities.css'
  ];

  try {
    const postcss = require('postcss');
    const autoprefixer = require('autoprefixer');
    const cssnano = require('cssnano');

    // Read all CSS
    let cssContent = '';
    cssFiles.forEach(file => {
      const filepath = path.join(config.root, file);
      if (fs.existsSync(filepath)) {
        cssContent += fs.readFileSync(filepath, 'utf-8') + '\n';
      } else {
        console.log(`   ⚠️  Skipping ${file}: not found`);
      }
    });

    // Process with PostCSS
    const result = await postcss([
      autoprefixer({
        overrideBrowserslist: ['> 0.5%', 'last 2 versions', 'not dead', 'not IE 11'],
        cascade: false,
        grid: true
      }),
      cssnano({
        preset: 'advanced',
        autoprefixer: false,
        colormin: false, // Keep colors for debugging if needed
        minifyFontValues: true,
        minifySelectors: true,
        normalizeWhitespace: true,
        reduceTransforms: true,
        svgo: false // Handle SVGs separately
      })
    ]).process(cssContent, { from: undefined });

    // Write combined CSS
    const cssOutPath = path.join(config.root, config.outdir, 'styles.css');
    fs.writeFileSync(cssOutPath, result.css);

    const stats = fs.statSync(cssOutPath);
    console.log(`   ✅ styles.css: ${(stats.size/1024).toFixed(2)} KB`);

    if (!checkBudget('styles.css', stats.size)) {
      console.warn(`   Warning: styles.css exceeds budget!`);
    }

    // Extract critical CSS for inline
    await extractCriticalCSS(result.css);

  } catch (error) {
    console.log('   ⚠️  PostCSS not available, falling back to simple concat...');

    let cssContent = '';
    cssFiles.forEach(file => {
      const filepath = path.join(config.root, file);
      if (fs.existsSync(filepath)) {
        cssContent += fs.readFileSync(filepath, 'utf-8') + '\n';
      }
    });

    const cssOutPath = path.join(config.root, config.outdir, 'styles.css');
    fs.writeFileSync(cssOutPath, cssContent);

    const stats = fs.statSync(cssOutPath);
    console.log(`   ✅ styles.css: ${(stats.size/1024).toFixed(2)} KB (unminified)`);
  }
}

// Extract critical CSS for inline in HTML
async function extractCriticalCSS(fullCSS) {
  console.log('\n✂️  Extracting critical CSS...');

  // Critical selectors (above-the-fold)
  const criticalSelectors = [
    ':root',
    '*',
    'html',
    'body',
    'nav', '.nav', '.header',
    '.hero',
    '.search-box', '.search-input', '.search-btn',
    '.logo',
    '.btn', '.btn-primary', '.btn-secondary',
    '.section-title',
    '@keyframes',
    '@media (prefers-reduced-motion)'
  ];

  // For now, just minify and keep a copy as critical
  // In production, use critical library or penthouse to extract actual critical CSS
  let critical = fullCSS;

  // Simple heuristic: first ~3KB minified
  if (critical.length > 3000) {
    critical = critical.substring(0, 3000);
    // Cut at last complete rule
    const lastBrace = critical.lastIndexOf('}');
    if (lastBrace > 0) {
      critical = critical.substring(0, lastBrace + 1);
    }
  }

  fs.writeFileSync(
    path.join(config.root, config.outdir, 'critical.css'),
    critical
  );

  console.log(`   ✅ critical.css: ${(critical.length/1024).toFixed(2)} KB`);
}

// ============================================
// BUILD: HTML
// ============================================
async function processHTML() {
  console.log('\n📄 Processing HTML...\n');

  const htmlPath = path.join(config.root, 'index.html');
  if (!fs.existsSync(htmlPath)) {
    console.log('   ⚠️  index.html not found, skipping');
    return;
  }

  let html = fs.readFileSync(htmlPath, 'utf-8');

  // 1. Add resource hints if missing
  if (!html.includes('rel="preconnect"')) {
    const headEnd = '</head>';
    const hints = `
    <!-- Performance: Resource Hints -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="dns-prefetch" href="https://www.google-analytics.com">
    <link rel="dns-prefetch" href="https://api.saudisaashub.com">
`;
    html = html.replace(headEnd, hints + headEnd);
    console.log('   ✅ Added resource hints');
  }

  // 2. Inline critical CSS if not already
  if (!html.includes('<style id="critical-css">') && fs.existsSync(path.join(config.root, config.outdir, 'critical.css'))) {
    const criticalCSS = fs.readFileSync(path.join(config.root, config.outdir, 'critical.css'), 'utf-8');
    const styleTag = `<style id="critical-css">${criticalCSS}</style>\n  `;
    const headEnd = '</head>';
    html = html.replace(headEnd, styleTag + headEnd);
    console.log('   ✅ Inlined critical CSS');
  }

  // 3. Replace script/link references with bundled versions
  // CSS
  html = html.replace(
    /<link rel="stylesheet" href="\/css\/(.*\.css)">/g,
    '<link rel="stylesheet" href="/dist/styles.css">'
  );

  // JS with defer
  html = html.replace(
    /<script defer src="\/js\/(.*\.js)"><\/script>/g,
    (match, p1) => {
      const map = {
        'app.js': '/dist/app.js',
        'structured-data.js': '/dist/structured-data.js',
        'ga4-setup.js': '/dist/ga4-setup.js'
      };
      return map[p1] ? `<script defer src="${map[p1]}"></script>` : match;
    }
  );

  // 4. Add lazy loading to images if not present
  html = html.replace(
    /<img (?!.*loading=)([^>]*?)src="([^"]+)"([^>]*?)>/g,
    '<img $1src="$2" $3loading="lazy">'
  );

  // 5. Ensure width/height on images (prevent CLS)
  // Note: This is a heuristic - better to fix in source
  html = html.replace(
    /<img([^>]*?)src="[^"]+"([^>]*?)>(?!.*width|height)/g,
    '<img$1src="$2" width="64" height="64"$3>'
  );

  // 6. Add prefetch for likely-next pages
  if (!html.includes('rel="prefetch"')) {
    const prefetchLinks = `
    <!-- Prefetch likely pages -->
    <link rel="prefetch" href="/companies">
    <link rel="prefetch" href="/categories">
`;
    html = html.replace('</head>', prefetchLinks + '</head>');
  }

  // Write processed HTML
  const outHtmlPath = path.join(config.root, config.outdir, 'index.html');
  fs.writeFileSync(outHtmlPath, html);

  const stats = fs.statSync(outHtmlPath);
  console.log(`   ✅ index.html: ${(stats.size/1024).toFixed(2)} KB`);

  if (!checkBudget('index.html', stats.size)) {
    console.warn(`   Warning: index.html exceeds budget!`);
  }
}

// ============================================
// BUILD: SERVICE WORKER
// ============================================
function generateServiceWorker() {
  console.log('\n⚙️  Generating Service Worker...\n');

  const sw = `// SaudiSaaSHub Service Worker v1.0.0
const CACHE_VERSION = 'v1';
const STATIC_CACHE = \`saudisaashub-static-\${CACHE_VERSION}\`;
const API_CACHE = \`saudisaashub-api-\${CACHE_VERSION}\`;

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/dist/styles.css',
  '/dist/app.js',
  '/dist/structured-data.js',
  '/dist/ga4-setup.js',
  '/dist/perf-monitor.js',
  '/manifest.json'
];

// Cache strategies
const CACHE_STRATEGIES = {
  'css': 'cache-first',
  'js': 'cache-first',
  'images': 'cache-first',
  'html': 'network-first',
  'api': 'stale-while-revalidate',
  'fonts': 'cache-first'
};

self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('[SW] Pre-caching static assets');
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== API_CACHE) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip chrome-extension and other non-http(s)
  if (!url.protocol.startsWith('http')) return;

  // Determine resource type
  const ext = pathExt(url.pathname);
  let strategy = 'network-first';

  if (['.css', '.js'].includes(ext)) {
    strategy = CACHE_STRATEGIES.css;
  } else if (['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.ico'].includes(ext)) {
    strategy = CACHE_STRATEGIES.images;
  } else if (['.woff', '.woff2', '.ttf', '.eot'].includes(ext)) {
    strategy = CACHE_STRATEGIES.fonts;
  } else if (url.pathname.startsWith('/api/')) {
    strategy = CACHE_STRATEGIES.api;
  }

  event.respondWith(
    handleRequest(request, strategy)
  );
});

function pathExt(pathname) {
  const match = pathname.match(/\.[a-zA-Z0-9]+$/);
  return match ? match[0].toLowerCase() : '';
}

async function handleRequest(request, strategy) {
  const cache = await caches.open(
    strategy === CACHE_STRATEGIES.api ? API_CACHE : STATIC_CACHE
  );

  switch (strategy) {
    case 'cache-first':
      return cache.match(request).then(response => {
        if (response) return response;
        return fetchAndCache(request, cache);
      });

    case 'network-first':
      return fetch(request)
        .then(response => {
          if (response.ok) cache.put(request, response.clone());
          return response;
        })
        .catch(() => cache.match(request))
        .then(response => {
          return response || caches.match('/offline.html');
        });

    case 'stale-while-revalidate':
      return cache.match(request).then(async (cachedResponse) => {
        const fetchPromise = fetch(request)
          .then(response => {
            if (response.ok) cache.put(request, response.clone());
            return response;
          });

        return cachedResponse || fetchPromise;
      });

    default:
      return fetch(request).catch(() => caches.match('/offline.html'));
  }
}

async function fetchAndCache(request, cache) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('[SW] Fetch failed:', error);
    return caches.match('/offline.html');
  }
}

// Background sync for failed analytics
self.addEventListener('sync', (event) => {
  if (event.tag === 'analytics-sync') {
    event.waitUntil(syncAnalytics());
  }
});

async function syncAnalytics() {
  // Retrieve queued analytics from IndexedDB and send
  console.log('[SW] Syncing analytics...');
}
`;

  fs.writeFileSync(
    path.join(config.root, config.outdir, 'sw.js'),
    sw
  );

  const stats = fs.statSync(path.join(config.root, config.outdir, 'sw.js'));
  console.log(`   ✅ sw.js: ${(stats.size/1024).toFixed(2)} KB`);
}

// ============================================
// BUILD: SUPPORTING FILES
// ============================================
function copySupportingFiles() {
  console.log('\n📦 Copying supporting files...\n');

  const files = [
    'manifest.json',
    'offline.html',
    'robots.txt',
    'sitemap.xml'
  ];

  files.forEach(file => {
    const src = path.join(config.root, file);
    const dest = path.join(config.root, config.outdir, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      console.log(`   ✅ ${file} copied`);

      // Update references in copied files if needed
      if (file === 'offline.html') {
        let content = fs.readFileSync(dest, 'utf-8');
        content = content.replace(
          /<link rel="stylesheet" href="\/css\/(.*\.css)">/g,
          '<link rel="stylesheet" href="/dist/styles.css">'
        );
        content = content.replace(
          /<script src="\/js\/(.*\.js)"><\/script>/g,
          '<script src="/dist/app.js"></script>'
        );
        fs.writeFileSync(dest, content);
      }
    } else {
      console.log(`   ⚠️  ${file} not found, skipping`);
    }
  });
}

// Generate .nojekyll for GitHub Pages
function generateNoJekyll() {
  fs.writeFileSync(
    path.join(config.root, config.outdir, '.nojekyll'),
    ''
  );
  console.log('   ✅ .nojekyll created');
}

// Generate CNAME if custom domain exists
function generateCNAME() {
  const cnamePath = path.join(config.root, 'CNAME');
  if (fs.existsSync(cnamePath)) {
    fs.copyFileSync(cnamePath, path.join(config.root, config.outdir, 'CNAME'));
    console.log('   ✅ CNAME copied');
  }
}

// Generate 404.html for SPA fallback
function generate404() {
  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>صفحة غير موجودة - سعودي ساس هب</title>
    <link rel="stylesheet" href="/dist/styles.css">
    <script>
      // Redirect to home for SPA routing
      window.location.href = window.location.origin + '/?from=404';
    </script>
  </head>
  <body>
    <div style="text-align: center; padding: 50px;">
      <h1>جاري إعادة التوجيه...</h1>
      <p>إذا لم تتم إعادة التوجيه تلقائياً، <a href="/">اضغط هنا</a></p>
    </div>
  </body>
</html>`;

  fs.writeFileSync(
    path.join(config.root, config.outdir, '404.html'),
    html
  );
  console.log('   ✅ 404.html created');
}

// ============================================
// BUILD: PERFORMANCE REPORT
// ============================================
function generateBuildReport() {
  console.log('\n📊 Build Report\n' + '─'.repeat(50));

  const distPath = path.join(config.root, config.outdir);
  let totalSize = 0;
  const categories = {};

  function analyzeDir(dirPath, baseName = '') {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      const name = baseName ? `${baseName}/${entry.name}` : entry.name;

      if (entry.isDirectory()) {
        analyzeDir(fullPath, name);
      } else if (entry.isFile()) {
        const stats = fs.statSync(fullPath);
        const size = stats.size;
        totalSize += size;

        // Categorize
        const ext = path.extname(entry.name).toLowerCase();
        let category = 'Other';
        if (['.html'].includes(ext)) category = 'HTML';
        else if (['.css'].includes(ext)) category = 'CSS';
        else if (['.js', '.mjs'].includes(ext)) category = 'JavaScript';
        else if (['.png', '.jpg', '.jpeg', 'gif', 'webp', 'svg', 'ico'].includes(ext)) category = 'Images';
        else if (['.woff', '.woff2', '.ttf', '.eot'].includes(ext)) category = 'Fonts';
        else if (['.json', '.xml', '.txt'].includes(ext)) category = 'Data';

        if (!categories[category]) categories[category] = { count: 0, size: 0 };
        categories[category].count++;
        categories[category].size += size;
      }
    }
  }

  analyzeDir(distPath);

  console.log('\n   File Categories:');
  for (const [cat, info] of Object.entries(categories)) {
    console.log(`   ${cat.padEnd(12)} ${info.count} files, ${(info.size/1024).toFixed(2)} KB`);
  }

  console.log(`\n   Total Build Size: ${(totalSize/1024).toFixed(2)} KB`);
  console.log('   ' + '─'.repeat(50));

  // Budget check
  if (totalSize > config.budgets.total) {
    console.warn(`\n   ⚠️  Build exceeds total budget of ${(config.budgets.total/1024).KB}\n`);
  } else {
    console.log(`\n   ✅ Within total budget of ${(config.budgets.total/1024).KB}\n`);
  }
}

// ============================================
// MAIN BUILD FUNCTION
// ============================================
async function build() {
  console.log('\n🚀 SaudiSaaSHub Enhanced Build\n');
  console.log('='.repeat(50));

  try {
    // Clean output directory
    if (fs.existsSync(path.join(config.root, config.outdir))) {
      fs.rmSync(path.join(config.root, config.outdir), { recursive: true });
      console.log('🧹 Cleaned dist directory');
    }

    ensureDir(path.join(config.root, config.outdir));
    ensureDir(path.join(config.root, config.assetsDir));

    // Build steps
    await buildJavaScript();
    await buildCSS();
    processHTML();
    generateServiceWorker();
    copySupportingFiles();
    generateNoJekyll();
    generateCNAME();
    generate404();
    generateBuildReport();

    console.log('\n✅ Build Complete!\n');
    console.log(`Output directory: ${config.outdir}/`);
    console.log('\nTo test locally: npx serve dist\n');

  } catch (error) {
    console.error('\n❌ Build failed:', error);
    process.exit(1);
  }
}

// ============================================
// RUN
// ============================================
if (require.main === module) {
  build();
}

module.exports = { build, config };
