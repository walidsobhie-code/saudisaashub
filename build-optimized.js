/**
 * SaudiSaaSHub - Enhanced Production Build Script
 * Full optimization for maximum performance and Lighthouse scores
 */

const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

// ============================================
// CONFIGURATION
// ============================================
const config = {
  root: __dirname,
  entryPoints: {
    app: 'js/app.js',
    'structured-data': 'js/structured-data.js',
    'ga4-setup': 'js/ga4-setup.js',
    'perf-monitor': 'performance/perf.js'
  },
  outdir: 'dist',
  cssEntryPoints: [
    'css/design-system.css',
    'css/components.css',
    'css/utilities.css'
  ],
  assetsDir: 'dist/assets',
  publicPath: '/',

  // Performance budgets (bytes)
  budgets: {
    html: 50 * 1024,
    css: 50 * 1024,
    jsMain: 30 * 1024,
    jsTotal: 60 * 1024,
    font: 100 * 1024,
    total: 200 * 1024
  },

  minify: true,
  sourcemap: false,
  target: ['es2017'],
  format: 'esm'
};

// ============================================
// UTILITIES
// ============================================
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const checkBudget = (name, size) => {
  const budgetKey = name.includes('html') ? 'html' :
                    name.includes('css') ? 'css' :
                    name.includes('js') ? 'jsMain' : null;
  if (budgetKey && config.budgets[budgetKey] && size > config.budgets[budgetKey]) {
    console.warn(`⚠️  ${name} exceeds budget: ${(size/1024).toFixed(2)}KB`);
    return false;
  }
  return true;
};

// ============================================
// BUILD: JAVASCRIPT
// ============================================
async function buildJavaScript() {
  console.log('\n🔨 Building JavaScript bundles...\n');

  const buildPromises = Object.entries(config.entryPoints).map(([name, entryPoint]) => {
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
      define: { 'process.env.NODE_ENV': '"production"' },
      treeShaking: true,
      chunkNames: 'chunks/[name]-[hash]',
      splitting: true,
      metafile: path.join(config.root, config.outdir, `meta-${name}.json`),
      banner: { js: `/*! SaudiSaaSHub v1.0.0 | (c) 2026 | https://saudisaashub.com */` }
    }).then(result => {
      const outfile = path.join(config.root, config.outdir, `${name}.js`);
      const stats = fs.statSync(outfile);
      console.log(`   ✅ ${name}.js: ${(stats.size/1024).toFixed(2)} KB`);
      checkBudget(name, stats.size);
      return result;
    }).catch(err => {
      console.error(`   ❌ Failed to build ${name}:`, err.message);
      throw err;
    });
  });

  await Promise.all(buildPromises);
}

// ============================================
// BUILD: CSS
// ============================================
async function buildCSS() {
  console.log('\n🎨 Building CSS...\n');

  try {
    const postcss = require('postcss');
    const autoprefixer = require('autoprefixer');
    const cssnano = require('cssnano');

    let cssContent = '';
    config.cssEntryPoints.forEach(file => {
      const filepath = path.join(config.root, file);
      if (fs.existsSync(filepath)) {
        cssContent += fs.readFileSync(filepath, 'utf-8') + '\n';
      }
    });

    const result = await postcss([
      autoprefixer({
        overrideBrowserslist: ['> 0.5%', 'last 2 versions', 'not dead', 'not IE 11'],
        cascade: false,
        grid: true
      }),
      cssnano({
        preset: 'advanced',
        autoprefixer: false,
        minifyFontValues: true,
        minifySelectors: true
      })
    ]).process(cssContent, { from: undefined });

    fs.writeFileSync(path.join(config.root, config.outdir, 'styles.css'), result.css);
    const stats = fs.statSync(path.join(config.root, config.outdir, 'styles.css'));
    console.log(`   ✅ styles.css: ${(stats.size/1024).toFixed(2)} KB`);
    checkBudget('styles.css', stats.size);

  } catch (error) {
    console.log('   ⚠️  PostCSS not available, copying CSS as-is...');
    let cssContent = '';
    config.cssEntryPoints.forEach(file => {
      const filepath = path.join(config.root, file);
      if (fs.existsSync(filepath)) {
        cssContent += fs.readFileSync(filepath, 'utf-8') + '\n';
      }
    });
    fs.writeFileSync(path.join(config.root, config.outdir, 'styles.css'), cssContent);
  }
}

// ============================================
// BUILD: HTML
// ============================================
async function processHTML() {
  console.log('\n📄 Processing HTML...\n');

  const htmlPath = path.join(config.root, 'index.html');
  if (!fs.existsSync(htmlPath)) {
    console.log('   ⚠️  index.html not found');
    return;
  }

  let html = fs.readFileSync(htmlPath, 'utf-8');

  // Add resource hints
  if (!html.includes('rel="preconnect"')) {
    const headEnd = '</head>';
    const hints = `
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="dns-prefetch" href="https://www.google-analytics.com">
`;
    html = html.replace(headEnd, hints + headEnd);
    console.log('   ✅ Added resource hints');
  }

  // Replace CSS references
  html = html.replace(
    /<link rel="stylesheet" href="\/css\/(.*\.css)">/g,
    '<link rel="stylesheet" href="/dist/styles.css">'
  );

  // Replace JS references
  html = html.replace(
    /<script defer src="\/js\/(.*\.js)"><\/script>/g,
    (match, p1) => {
      const map = {
        'app.js': '/dist/app.js',
        'structured-data.js': '/dist/structured-data.js',
        'ga4-setup.js': '/dist/ga4-setup.js'
      };
      return map[p1] || match;
    }
  );

  // Add prefetch
  if (!html.includes('rel="prefetch"')) {
    html = html.replace('</head>', '<link rel="prefetch" href="/companies">\n<link rel="prefetch" href="/categories">\n</head>');
  }

  fs.writeFileSync(path.join(config.root, config.outdir, 'index.html'), html);
  const stats = fs.statSync(path.join(config.root, config.outdir, 'index.html'));
  console.log(`   ✅ index.html: ${(stats.size/1024).toFixed(2)} KB`);
}

// ============================================
// BUILD: SERVICE WORKER
// ============================================
function generateServiceWorker() {
  console.log('\n⚙️  Generating Service Worker...\n');

  const sw = `const CACHE_NAME = 'saudisaashub-v1';
const STATIC_ASSETS = ['/','/index.html','/offline.html','/dist/styles.css','/dist/app.js','/dist/structured-data.js','/dist/ga4-setup.js','/dist/perf-monitor.js','/manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(names => Promise.all(names.map(name => {
    if (!name.startsWith('saudisaashub-')) return caches.delete(name);
  }))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (!url.protocol.startsWith('http')) return;

  const ext = url.pathname.match(/\\.[a-z]+$/)?.[0] || '';
  let strategy = 'network-first';

  if (['.css', '.js'].includes(ext)) strategy = 'cache-first';
  else if (['.png','.jpg','.jpeg','.gif','.webp','.svg','.ico'].includes(ext)) strategy = 'cache-first';
  else if (['.woff','.woff2','.ttf','.eot'].includes(ext)) strategy = 'cache-first';
  else if (url.pathname.startsWith('/api/')) strategy = 'stale-while-revalidate';

  e.respondWith(handleRequest(e.request, strategy));
});

async function handleRequest(request, strategy) {
  const cache = await caches.open(strategy === 'stale-while-revalidate' ? 'saudisaashub-api-v1' : 'saudisaashub-static-v1');

  switch (strategy) {
    case 'cache-first':
      return cache.match(request).then(r => r || fetchAndCache(request, cache));
    case 'network-first':
      return fetch(request).then(r => {
        if (r.ok) cache.put(request, r.clone());
        return r;
      }).catch(() => cache.match(request) || caches.match('/offline.html'));
    case 'stale-while-revalidate':
      return cache.match(request).then(async cached => {
        const fetchPromise = fetch(request).then(r => {
          if (r.ok) cache.put(request, r.clone());
          return r;
        });
        return cached || fetchPromise;
      });
    default:
      return fetch(request).catch(() => caches.match('/offline.html'));
  }
}

async function fetchAndCache(request, cache) {
  try {
    const r = await fetch(request);
    if (r.ok) cache.put(request, r.clone());
    return r;
  } catch (e) {
    return caches.match('/offline.html');
  }
}
`;

  fs.writeFileSync(path.join(config.root, config.outdir, 'sw.js'), sw);
  const stats = fs.statSync(path.join(config.root, config.outdir, 'sw.js'));
  console.log(`   ✅ sw.js: ${(stats.size/1024).toFixed(2)} KB`);
}

// ============================================
// BUILD: SUPPORTING FILES
// ============================================
function copySupportingFiles() {
  console.log('\n📦 Copying supporting files...\n');

  const files = ['manifest.json', 'offline.html', 'robots.txt', 'sitemap.xml'];
  files.forEach(file => {
    const src = path.join(config.root, file);
    const dest = path.join(config.root, config.outdir, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      console.log(`   ✅ ${file} copied`);
    }
  });
}

function generateNoJekyll() {
  fs.writeFileSync(path.join(config.root, config.outdir, '.nojekyll'), '');
  console.log('   ✅ .nojekyll created');
}

function generate404() {
  const html = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>Redirecting...</title>
<script>window.location.href = window.location.origin + '/?from=404';</script>
</head><body><p>Redirecting...</p></body></html>`;
  fs.writeFileSync(path.join(config.root, config.outdir, '404.html'), html);
  console.log('   ✅ 404.html created');
}

// ============================================
// BUILD: REPORT
// ============================================
function generateReport() {
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
        const size = fs.statSync(fullPath).size;
        totalSize += size;

        const ext = path.extname(entry.name).toLowerCase();
        let category = 'Other';
        if (['.html'].includes(ext)) category = 'HTML';
        else if (['.css'].includes(ext)) category = 'CSS';
        else if (['.js', '.mjs'].includes(ext)) category = 'JavaScript';
        else if (['.png','.jpg','.jpeg','.gif','.webp','.svg','.ico'].includes(ext)) category = 'Images';
        else if (['.woff','.woff2','.ttf','.eot'].includes(ext)) category = 'Fonts';

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

  if (totalSize > config.budgets.total) {
    console.warn(`\n   ⚠️  Build exceeds total budget of ${(config.budgets.total/1024).KB}`);
  } else {
    console.log(`\n   ✅ Within total budget of ${(config.budgets.total/1024).KB}`);
  }
}

// ============================================
// MAIN
// ============================================
async function build() {
  console.log('\n🚀 SaudiSaaSHub Enhanced Build\n');
  console.log('='.repeat(50));

  try {
    if (fs.existsSync(path.join(config.root, config.outdir))) {
      fs.rmSync(path.join(config.root, config.outdir), { recursive: true });
      console.log('🧹 Cleaned dist directory');
    }

    ensureDir(path.join(config.root, config.outdir));
    ensureDir(path.join(config.root, config.assetsDir));

    await buildJavaScript();
    await buildCSS();
    processHTML();
    generateServiceWorker();
    copySupportingFiles();
    generateNoJekyll();
    generate404();
    generateReport();

    console.log('\n✅ Build Complete!\n');
    console.log(`Output: ${config.outdir}/`);
    console.log('\nServe locally: npx serve dist\n');

  } catch (error) {
    console.error('\n❌ Build failed:', error);
    process.exit(1);
  }
}

if (require.main === module) build();

module.exports = { build, config };
