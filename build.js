/**
 * SaudiSaaSHub - Build Script
 * Optimizes assets for production using esbuild
 */

const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  root: __dirname,
  entryPoints: {
    app: 'js/app.js',
    'structured-data': 'js/structured-data.js',
    'ga4-setup': 'js/ga4-setup.js'
  },
  outdir: 'dist',
  cssEntryPoints: [
    'css/design-system.css',
    'css/components.css',
    'css/utilities.css'
  ],
  assetsDir: 'dist/assets',
  publicPath: '/'
};

// Ensure output directory exists
fs.mkdirSync(config.outdir, { recursive: true });
fs.mkdirSync(config.assetsDir, { recursive: true });

// Build JavaScript bundles
const buildJS = async () => {
  console.log('🔨 Building JavaScript bundles...');

  const buildPromises = Object.entries(config.entryPoints).map(([name, entryPoint]) => {
    return esbuild.build({
      entryPoints: [path.join(config.root, entryPoint)],
      bundle: true,
      minify: true,
      sourcemap: false, // Set to true for debugging
      target: ['es2017'], // Good compatibility with modern browsers
      format: 'esm',
      outfile: path.join(config.root, config.outdir, `${name}.js`),
      define: {
        'process.env.NODE_ENV': '"production"'
      },
      treeShaking: true,
      chunkNames: 'chunks/[name]-[hash]',
      splitting: true, // Code splitting
      // Optimize for performance
      compression: true,
      /* metafile: path.join(config.root, config.outdir, 'meta.json') */
    });
  });

  await Promise.all(buildPromises);
  console.log('✅ JavaScript bundles built');
};

// Build CSS bundles
const buildCSS = async () => {
  console.log('🎨 Building CSS bundles...');

  // If cssnano is available, use it; otherwise just copy
  try {
    const postcss = require('postcss');
    const autoprefixer = require('autoprefixer');
    const cssnano = require('cssnano');

    // Read all CSS files and combine
    const cssContent = config.cssEntryPoints.map(file => {
      return fs.readFileSync(path.join(config.root, file), 'utf-8');
    }).join('\n');

    // Process with PostCSS
    const result = await postcss([
      autoprefixer({
        overrideBrowserslist: ['> 0.5%', 'last 2 versions', 'not dead', 'not IE 11'],
        cascade: false
      }),
      cssnano({
        preset: 'default',
        autoprefixer: false // Already handled above
      })
    ]).process(cssContent, { from: undefined });

    // Write combined CSS
    fs.writeFileSync(
      path.join(config.root, config.outdir, 'styles.css'),
      result.css
    );

    console.log('✅ CSS bundles built and minified');
  } catch (error) {
    console.log('⚠️  PostCSS not available, copying CSS files as-is...');

    // Fallback: just copy and concat
    const cssContent = config.cssEntryPoints.map(file => {
      return fs.readFileSync(path.join(config.root, file), 'utf-8');
    }).join('\n');

    fs.writeFileSync(
      path.join(config.root, config.outdir, 'styles.css'),
      cssContent
    );

    console.log('✅ CSS files copied (not minified)');
  }
};

// Copy assets
const copyAssets = async () => {
  console.log('📦 Copying assets...');

  const assetsDir = path.join(config.root, 'assets');
  if (fs.existsSync(assetsDir)) {
    const copyRecursive = (src, dest) => {
      const stats = fs.statSync(src);
      if (stats.isDirectory()) {
        fs.mkdirSync(dest, { recursive: true });
        const entries = fs.readdirSync(src);
        entries.forEach(entry => {
          copyRecursive(path.join(src, entry), path.join(dest, entry));
        });
      } else {
        fs.copyFileSync(src, dest);
      }
    };

    copyRecursive(assetsDir, path.join(config.root, config.assetsDir));
  }

  // Copy manifest, service worker, and other root files
  const rootFiles = [
    'manifest.json',
    'sw.js',
    'robots.txt',
    'sitemap.xml'
  ];

  rootFiles.forEach(file => {
    const src = path.join(config.root, file);
    const dest = path.join(config.root, config.outdir, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
    }
  });

  console.log('✅ Assets copied');
};

// Generate critical CSS file (for inline in HTML)
const generateCriticalCSS = async () => {
  console.log('✂️  Generating critical CSS...');

  try {
    // Extract critical CSS from the combined file
    const fullCSS = fs.readFileSync(
      path.join(config.root, config.outdir, 'styles.css'),
      'utf-8'
    );

    // Critical selectors: above-the-fold styles
    const criticalSelectors = [
      ':root',
      '*',
      'body',
      '.header',
      '.nav-container',
      '.logo',
      '.nav-links',
      '.nav-link',
      '.hero',
      '.hero h1',
      '.hero p',
      '.search-container',
      '.search-input',
      '.search-btn',
      '.btn',
      '.btn-primary',
      '.categories',
      '.section-title',
      '.category-grid',
      '.category-card',
      '.category-icon',
      '.category-card h3',
      '.category-card p',
      '.skip-link',
      '.skeleton',
      '@keyframes skeleton-loading',
      '@keyframes slide-up'
    ];

    // Simple regex-based extraction (for demo; consider critical in production)
    let criticalCSS = fullCSS;

    // Minify and compress further
    criticalCSS = criticalCSS
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
      .replace(/\s+/g, ' ') // Collapse whitespace
      .replace(/\s?([{:;,])\s?/g, '$1') // Remove spaces around punctuation
      .replace(/;(})/g, '}') // Remove trailing semicolons
      .trim();

    fs.writeFileSync(
      path.join(config.root, config.outdir, 'critical.css'),
      criticalCSS
    );

    console.log('✅ Critical CSS generated');
  } catch (error) {
    console.log('⚠️  Could not generate critical CSS:', error.message);
  }
};

// Create manifest for PWA
const generateManifest = () => {
  console.log('📱 Generating Web App Manifest...');

  const manifest = {
    name: 'سعودي ساس هب',
    short_name: 'ساس هب',
    description: 'الدليل الشامل لأفضل حلول SaaS في السعودية',
    start_url: '/?utm_source=pwa',
    display: 'standalone',
    background_color: '#f9fafb',
    theme_color: '#1e3a5f',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/assets/icons/icon-72x72.png',
        sizes: '72x72',
        type: 'image/png'
      },
      {
        src: '/assets/icons/icon-96x96.png',
        sizes: '96x96',
        type: 'image/png'
      },
      {
        src: '/assets/icons/icon-128x128.png',
        sizes: '128x128',
        type: 'image/png'
      },
      {
        src: '/assets/icons/icon-144x144.png',
        sizes: '144x144',
        type: 'image/png'
      },
      {
        src: '/assets/icons/icon-152x152.png',
        sizes: '152x152',
        type: 'image/png'
      },
      {
        src: '/assets/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable'
      },
      {
        src: '/assets/icons/icon-256x256.png',
        sizes: '256x256',
        type: 'image/png'
      },
      {
        src: '/assets/icons/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png'
      },
      {
        src: '/assets/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable'
      }
    ],
    categories: ['business', 'productivity', 'utilities'],
    lang: 'ar-SA',
    dir: 'rtl',
    scope: '/',
    id: '/?source=pwa'
  };

  fs.writeFileSync(
    path.join(config.root, config.outdir, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );

  console.log('✅ Manifest generated');
};

// Copy and optimize index.html
const processHTML = async () => {
  console.log('📄 Processing HTML...');

  const htmlPath = path.join(config.root, 'index.html');
  let html = fs.readFileSync(htmlPath, 'utf-8');

  // Replace script and link references with bundled versions
  html = html.replace(
    /<link rel="stylesheet" href="\/css\/(.*\.css)">/g,
    (match, p1) => {
      if (p1 === 'critical.css') return match; // Keep critical inline
      return `<link rel="stylesheet" href="/dist/styles.css">`;
    }
  );

  html = html.replace(
    /<script defer src="\/js\/(.*\.js)"><\/script>/g,
    (match, p1) => {
      if (p1 === 'app.js') {
        return `<script defer src="/dist/app.js"></script>`;
      }
      if (p1 === 'structured-data.js') {
        return `<script defer src="/dist/structured-data.js"></script>`;
      }
      if (p1 === 'ga4-setup.js') {
        return `<script defer src="/dist/ga4-setup.js"></script>`;
      }
      return '';
    }
  );

  // Add resource hints if not present
  if (!html.includes('preconnect')) {
    const headEnd = '</head>';
    const hints = `
    <!-- Performance: Resource hints -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="dns-prefetch" href="https://www.google-analytics.com">
`;
    html = html.replace(headEnd, hints + headEnd);
  }

  // Write processed HTML
  fs.writeFileSync(
    path.join(config.root, config.outdir, 'index.html'),
    html
  );

  console.log('✅ HTML processed');
};

// Generate performance report
const generateReport = () => {
  console.log('\n📊 Build Report');
  console.log('---------------');

  const jsFiles = ['app.js', 'structured-data.js', 'ga4-setup.js'];
  jsFiles.forEach(file => {
    const filepath = path.join(config.root, config.outdir, file);
    if (fs.existsSync(filepath)) {
      const stats = fs.statSync(filepath);
      console.log(`   ${file}: ${(stats.size / 1024).toFixed(2)} KB`);
    }
  });

  const cssPath = path.join(config.root, config.outdir, 'styles.css');
  if (fs.existsSync(cssPath)) {
    const stats = fs.statSync(cssPath);
    console.log(`   styles.css: ${(stats.size / 1024).toFixed(2)} KB`);
  }

  const htmlPath = path.join(config.root, config.outdir, 'index.html');
  if (fs.existsSync(htmlPath)) {
    const stats = fs.statSync(htmlPath);
    console.log(`   index.html: ${(stats.size / 1024).toFixed(2)} KB`);
  }

  const totalSize = fs.readdirSync(config.outdir).reduce((total, file) => {
    const filepath = path.join(config.root, config.outdir, file);
    if (fs.statSync(filepath).isFile()) {
      return total + fs.statSync(filepath).size;
    }
    return total;
  }, 0);

  console.log(`\n   Total build size: ${(totalSize / 1024).toFixed(2)} KB`);
  console.log('✅ Build complete!\n');
};

// Main build function
const build = async () => {
  console.log('\n🚀 Starting SaudiSaaSHub build...\n');

  try {
    await buildJS();
    await buildCSS();
    await copyAssets();
    await generateCriticalCSS();
    generateManifest();
    await processHTML();
    generateReport();

    // Create a simple .nojekyll file for GitHub Pages
    fs.writeFileSync(path.join(config.root, config.outdir, '.nojekyll'), '');
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
};

// Run build
build();
