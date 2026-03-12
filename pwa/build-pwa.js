#!/usr/bin/env node

/**
 * SaudiSaaSHub - PWA Build Script
 * One-click build process for production-ready PWA
 *
 * Usage: node build-pwa.js [options]
 *   --production   Build for production (default)
 *   --dev          Build for development (skips minification)
 *   --clean        Clean dist folder before building
 *   --push         Push to production after build (requires git)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Configuration
const config = {
  // Source directories
  srcDir: path.join(__dirname, '..'), // Project root
  pwaDir: __dirname, // Current pwa/ directory

  // Output directory
  distDir: path.join(__dirname, 'dist'),

  // Files to process
  htmlFile: 'index.html',
  manifestFile: 'manifest.json',
  serviceWorkerFile: 'sw.js',
  offlineFile: 'offline.html',

  // Assets
  iconsDir: 'assets/icons',
  screenshotsDir: 'assets/screenshots',

  // Scripts to inject
  installBannerScript: 'install-banner.js',
  installPromptScript: 'install-prompt.js',

  // Build flags
  production: true,
  clean: false,
  push: false
};

// Parse command line arguments
const args = process.argv.slice(2);
config.production = !args.includes('--dev');
config.clean = args.includes('--clean');
config.push = args.includes('--push');

console.log(`🔨 Building SaudiSaaSHub PWA...`);
console.log(`📁 Source: ${config.srcDir}`);
console.log(`📦 Output: ${config.distDir}`);
console.log(`⚙️  Mode: ${config.production ? 'production' : 'development'}`);

// ============================================
// STEP 1: Clean dist directory
// ============================================
if (config.clean && fs.existsSync(config.distDir)) {
  console.log('🧹 Cleaning dist directory...');
  fs.rmSync(config.distDir, { recursive: true, force: true });
}

// Create dist directory if it doesn't exist
if (!fs.existsSync(config.distDir)) {
  fs.mkdirSync(config.distDir, { recursive: true });
}

// ============================================
// STEP 2: Copy directories
// ============================================
const copyDir = (src, dest) => {
  if (!fs.existsSync(src)) {
    console.log(`⚠️  Skipping ${src} (not found)`);
    return;
  }

  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        copyDir(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
        console.log(`  ✓ Copied ${entry.name}`);
      }
    }
  } else {
    fs.copyFileSync(src, dest);
  }
};

console.log('📦 Copying assets...');

// Copy CSS
if (fs.existsSync(path.join(config.srcDir, 'css'))) {
  copyDir(path.join(config.srcDir, 'css'), path.join(config.distDir, 'css'));
}

// Copy JS
if (fs.existsSync(path.join(config.srcDir, 'js'))) {
  copyDir(path.join(config.srcDir, 'js'), path.join(config.distDir, 'js'));
}

// Copy PWA assets (icons, screenshots)
const assetsSrc = path.join(config.pwaDir, 'assets');
if (fs.existsSync(assetsSrc)) {
  copyDir(assetsSrc, path.join(config.distDir, 'assets'));
}

// Copy PWA files
fs.copyFileSync(
  path.join(config.pwaDir, 'manifest.json'),
  path.join(config.distDir, 'manifest.json')
);
fs.copyFileSync(
  path.join(config.pwaDir, 'sw.js'),
  path.join(config.distDir, 'sw.js')
);
fs.copyFileSync(
  path.join(config.pwaDir, 'offline.html'),
  path.join(config.distDir, 'offline.html')
);
console.log('  ✓ Copied manifest.json, sw.js, offline.html');

// ============================================
// STEP 3: Process HTML with service worker injection
// ============================================
console.log('🔧 Processing HTML...');

const htmlPath = path.join(config.srcDir, config.htmlFile);
const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

// Service worker registration script
const swScript = `
<script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .then((registration) => {
          console.log('✅ Service Worker registered: ', registration.scope);

          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('🔄 New content is available; please refresh.');
              }
            });
          });
        })
        .catch((registrationError) => {
          console.error('❌ Service Worker registration failed: ', registrationError);
        });

      // Installation prompt logic
      if (typeof InstallBanner !== 'undefined') {
        InstallBanner.init();
      }
    });
  }
</script>`;

// PWA scripts (install banner + QR modal)
const installScripts = `
<script src="/pwa/install-banner.js" defer></script>
<script src="/pwa/install-prompt.js" defer></script>`;

// Inject service worker registration before closing body tag
let processedHtml = htmlContent;

// Remove any existing service worker registration
processedHtml = processedHtml.replace(/<script[\s\S]*?serviceWorker[\s\S]*?<\/script>/gi, '');

// Inject before </body>
if (processedHtml.includes('</body>')) {
  processedHtml = processedHtml.replace('</body>', swScript + installScripts + '\n</body>');
} else {
  processedHtml += swScript + installScripts;
}

// Add viewport-fit=cover if not present
if (!processedHtml.includes('viewport-fit=cover')) {
  processedHtml = processedHtml.replace(
    /<meta name="viewport"/,
    '<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"'
  );
}

// Ensure manifest link is present
if (!processedHtml.includes('/manifest.json')) {
  processedHtml = processedHtml.replace(
    /<head>/,
    `<head>\n  <link rel="manifest" href="/manifest.json">`
  );
}

// Add Apple touch icons if not present (from manifest icons)
const appleTouchIcons = `
<!-- Apple Touch Icons -->
<link rel="apple-touch-icon" href="/assets/icons/icon-72x72.svg">
<link rel="apple-touch-icon" href="/assets/icons/icon-96x96.svg" sizes="96x96">
<link rel="apple-touch-icon" href="/assets/icons/icon-128x128.svg" sizes="128x128">
<link rel="apple-touch-icon" href="/assets/icons/icon-192x192.svg" sizes="192x192">
<link rel="apple-touch-icon" href="/assets/icons/icon-512x512.svg" sizes="512x512">
<link rel="apple-touch-startup-image" href="/offline.html">`;

if (!processedHtml.includes('apple-touch-icon')) {
  processedHtml = processedHtml.replace(
    /<link rel="manifest"/,
    appleTouchIcons + '\n  <link rel="manifest"'
  );
}

// Add safe area insets CSS if not present
if (!processedHtml.includes('env(safe-area-inset')) {
  const safeAreaStyles = `
    <style>
      :root {
        --sat-top: env(safe-area-inset-top, 0px);
        --sat-bottom: env(safe-area-inset-bottom, 0px);
        --sat-left: env(safe-area-inset-left, 0px);
        --sat-right: env(safe-area-inset-right, 0px);
      }
      body {
        padding-top: var(--sat-top);
        padding-bottom: var(--sat-bottom);
        padding-left: var(--sat-left);
        padding-right: var(--sat-right);
      }
    </style>`;
  processedHtml = processedHtml.replace(
    '</head>',
    safeAreaStyles + '\n</head>'
  );
}

// Write processed HTML
fs.writeFileSync(
  path.join(config.distDir, config.htmlFile),
  processedHtml
);
console.log('  ✓ Processed index.html with SW registration and PWA scripts');

// ============================================
// STEP 4: Minify CSS (if production)
// ============================================
if (config.production) {
  console.log('🗜️  Minifying CSS...');
  const minifyCSS = (css) => {
    return css
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
      .replace(/\s+/g, ' ') // Collapse whitespace
      .replace(/\s?([\{\}\:;\,])\s?/g, '$1') // Remove space around operators
      .replace(/;\}/g, '}') // Remove last semicolon
      .trim();
  };

  const cssFiles = [
    'design-system.css',
    'components.css',
    'utilities.css'
  ];

  for (const cssFile of cssFiles) {
    const cssPath = path.join(config.distDir, 'css', cssFile);
    if (fs.existsSync(cssPath)) {
      const minified = minifyCSS(fs.readFileSync(cssPath, 'utf-8'));
      fs.writeFileSync(cssPath, minified);
      console.log(`  ✓ Minified ${cssFile}`);
    }
  }

  // Minify JS (simple uglify)
  console.log('🗜️  Minifying JavaScript...');
  const minifyJS = (js) => {
    return js
      .replace(/\/\/[\s\S]*?\n/g, '') // Remove single-line comments
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
      .replace(/\s+/g, ' ') // Collapse whitespace
      .replace(/\s?([\,\;\{\}])\s?/g, '$1') // Remove space around operators
      .trim();
  };

  const jsFiles = [
    'app.js',
    'structured-data.js',
    'ga4-setup.js'
  ];

  for (const jsFile of jsFiles) {
    const jsPath = path.join(config.distDir, 'js', jsFile);
    if (fs.existsSync(jsPath)) {
      // Skip minifying app.js if it's too complex (could break)
      if (jsFile === 'app.js') {
        console.log(`  ⚠️  Skipping ${jsFile} (complex, may break)`);
      } else {
        const minified = minifyJS(fs.readFileSync(jsPath, 'utf-8'));
        fs.writeFileSync(jsPath, minified);
        console.log(`  ✓ Minified ${jsFile}`);
      }
    }
  }
}

// ============================================
// STEP 5: Generate hashed filenames for cache busting (optional)
// ============================================
console.log('🔢 Generating content hashes...');

const hashFile = (filePath) => {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('md5').update(content).digest('hex').substring(0, 8);
};

const manifestPath = path.join(config.distDir, 'manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

// Add hash to manifest for cache busting
manifest['hash'] = Date.now().toString();
manifest['version'] = '3.0.0';

// Recalculate file hashes for icons
for (const icon of manifest.icons) {
  const iconPath = path.join(config.distDir, icon.src);
  if (fs.existsSync(iconPath)) {
    icon['hash'] = hashFile(iconPath);
  }
}

fs.writeFileSync(
  manifestPath,
  JSON.stringify(manifest, null, config.production ? 0 : 2)
);
console.log('  ✓ Updated manifest.json with version hash');

// ============================================
// STEP 6: Generate service worker config
// ============================================
console.log('🔧 Generating service worker config...');

const swConfig = {
  cacheVersion: `v${Date.now()}`,
  buildDate: new Date().toISOString(),
  production: config.production,
  features: {
    cacheFirst: true,
    networkFirst: true,
    staleWhileRevalidate: true,
    backgroundSync: true,
    pushNotifications: true,
    offlineMode: true
  }
};

fs.writeFileSync(
  path.join(config.distDir, 'sw-config.json'),
  JSON.stringify(swConfig, null, 2)
);
console.log('  ✓ Created sw-config.json');

// ============================================
// STEP 7: Create build manifest
// ============================================
console.log('📋 Creating build manifest...');

const buildManifest = {
  version: '3.0.0',
  buildDate: new Date().toISOString(),
  production: config.production,
  files: {},
  sizes: {}
};

// Calculate file sizes and hashes
const collectFiles = (dir, base = '') => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(base, entry.name);

    if (entry.isDirectory()) {
      collectFiles(fullPath, relativePath);
    } else {
      const stats = fs.statSync(fullPath);
      buildManifest.files[relativePath] = {
        size: stats.size,
        hash: hashFile(fullPath)
      };
    }
  }
};

collectFiles(config.distDir);

// Calculate total size
let totalSize = 0;
for (const file of Object.values(buildManifest.files)) {
  totalSize += file.size;
}
buildManifest.totalSize = totalSize;

fs.writeFileSync(
  path.join(config.distDir, 'build-manifest.json'),
  JSON.stringify(buildManifest, null, 2)
);

console.log(`  ✓ Created build-manifest.json (${(totalSize / 1024).toFixed(1)} KB total)`);

// ============================================
// STEP 8: Create .nojekyll file for GitHub Pages
// ============================================
fs.writeFileSync(path.join(config.distDir, '.nojekyll'), '');
console.log('  ✓ Created .nojekyll');

// ============================================
// STEP 9: Validate manifest
// ============================================
console.log('🔍 Validating PWA manifest...');
const validation = {
  valid: true,
  errors: [],
  warnings: []
};

// Check required fields
const requiredFields = ['name', 'short_name', 'start_url', 'display', 'icons'];
for (const field of requiredFields) {
  if (!manifest[field]) {
    validation.valid = false;
    validation.errors.push(`Missing required field: ${field}`);
  }
}

// Check icon sizes
const requiredSizes = ['72x72', '96x96', '128x128', '192x192', '512x512'];
const existingSizes = manifest.icons.map(i => i.sizes);
for (const size of requiredSizes) {
  if (!existingSizes.includes(size)) {
    validation.warnings.push(`Missing icon size: ${size}`);
  }
}

if (validation.errors.length > 0) {
  console.error('❌ Manifest validation failed:');
  for (const error of validation.errors) {
    console.error(`   - ${error}`);
  }
} else {
  console.log('  ✓ Manifest validation passed');
  if (validation.warnings.length > 0) {
    console.log('  ⚠️  Warnings:');
    for (const warning of validation.warnings) {
      console.log(`    - ${warning}`);
    }
  }
}

// ============================================
// STEP 10: Summary
// ============================================
console.log('\n' + '='.repeat(60));
console.log('✅ Build Complete!');
console.log('='.repeat(60));
console.log(`📦 Output: ${config.distDir}`);
console.log(`📊 Total Size: ${(totalSize / 1024).toFixed(1)} KB`);
console.log(`📁 Files: ${Object.keys(buildManifest.files).length}`);
console.log('\n📋 Next Steps:');
console.log('   1. Test locally: npx serve dist/');
console.log('   2. Run Lighthouse audit on dist/');
console.log('   3. Deploy to your hosting provider');
console.log('   4. Verify service worker registration in browser DevTools');
console.log('\n🔧 Commands:');
console.log(`   ${config.production ? '--dev' : '--production'}    Build for development`);
console.log('   --clean           Clean dist before building');
console.log('   --push            Git push after build');
console.log('='.repeat(60));

// ============================================
// OPTIONAL: Git push
// ============================================
if (config.push) {
  console.log('\n🚀 Pushing to git...');
  try {
    const gitCommands = [
      'git add dist/',
      'git commit -m "build: update PWA dist"',
      'git push'
    ];

    for (const cmd of gitCommands) {
      console.log(`  $ ${cmd}`);
      const result = require('child_process').execSync(cmd, { encoding: 'utf-8' });
      if (result) console.log(`    ${result.trim()}`);
    }
    console.log('  ✅ Pushed to git');
  } catch (error) {
    console.error('  ❌ Git push failed:', error.message);
  }
}

process.exit(0);
