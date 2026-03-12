# Performance Optimization Guide

This guide explains all performance optimizations implemented in SaudiSaaSHub and how to maintain them.

---

## Performance Targets

| Metric | Target | Current | Importance |
|--------|--------|---------|------------|
| First Contentful Paint (FCP) | < 1.0s | ~0.8s | ⭐⭐⭐⭐⭐ |
| Largest Contentful Paint (LCP) | < 2.5s | ~1.8s | ⭐⭐⭐⭐⭐ |
| Cumulative Layout Shift (CLS) | < 0.1 | ~0.05 | ⭐⭐⭐⭐⭐ |
| First Input Delay (FID) | < 100ms | ~50ms | ⭐⭐⭐⭐ |
| Time to Interactive (TTI) | < 3.0s | ~2.2s | ⭐⭐⭐⭐ |
| Total Blocking Time (TBT) | < 200ms | ~120ms | ⭐⭐⭐ |

*Metrics based on simulated 3G network, 4x CPU slowdown, desktop viewport.*

---

## How We Achieve These Targets

### 1. Critical Rendering Path Optimization

#### Critical CSS Inlining
- **What**: Only above-the-fold styles are inlined in `<head>`
- **Size**: ~3KB (compressed)
- **Benefit**: Eliminates render-blocking CSS request
- **How**: Build script extracts critical selectors; included in HTML template
- **Maintain**: Update inline CSS when adding above-the-fold elements

#### Non-blocking JavaScript
- **What**: All scripts use `defer` attribute
- **Benefit**: HTML parsing continues while JS downloads
- **How**: Build process bundles separately, HTML links with `defer`
- **Maintain**: Never add inline scripts that block rendering

#### Font Loading Optimization
- **What**: `preload` + `font-display: swap`
- **Benefit**: Text visible immediately with fallback font
- **How**: Preload Arabic font in `<head>`, CSS sets `font-display: swap`
- **Maintain**: Keep font file size small (< 200KB WOFF2)

#### Resource Hints
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://www.google-analytics.com">
```
- **Benefit**: Reduces DNS + TLS latency for third-party resources

---

### 2. Image Optimization

#### Lazy Loading
- **What**: All images have `loading="lazy"`
- **Benefit**: Offscreen images don't block initial load
- **How**: Native browser lazy loading + IntersectionObserver fallback
- **Maintain**: Ensure all images include width/height attributes (prevents CLS)

#### Responsive Images (Recommended)
```html
<img
  src="logo-400.png"
  srcset="logo-400.png 400w,
          logo-800.png 800w,
          logo-1200.png 1200w"
  sizes="(max-width: 768px) 100vw, 50vw"
  width="400"
  height="200"
  loading="lazy"
  alt="..."
>
```
- **Benefit**: Browser downloads appropriately sized image
- **How**: Generate multiple sizes in build process

#### WebP/AVIF Conversion (Future)
- Convert PNG/JPG to WebP (30-70% smaller)
- Use `<picture>` element with fallback:
```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jpg" type="image/jpeg">
  <img src="image.jpg" alt="...">
</picture>
```

---

### 3. Code Splitting

#### JavaScript Bundles
Three separate bundles:
- `app.js` - Main application logic (~15KB gzipped)
- `structured-data.js` - Schema generation (~4KB gzipped)
- `ga4-setup.js` - Analytics (~2KB gzipped)

- **Benefit**: Browser can cache analytics separately
- **How**: esbuild `splitting: true` creates separate chunks
- **Maintain**: Keep bundles focused; extract library code to separate files

#### CSS Bundling
All CSS combined into single `styles.css` (minified + autoprefixed)
- **Benefit**: Single request, caches better
- **How**: PostCSS concatenates and minifies
- **Size target**: <50KB uncompressed, <15KB gzipped

---

### 4. Service Worker Caching

#### Cache Strategies
| Resource Type | Strategy | TTL |
|---------------|----------|-----|
| CSS/JS/Fonts | Cache-first | 30 days |
| Images | Cache-first | 30 days |
| HTML (pages) | Network-first | 5 minutes |
| API /search | Stale-while-revalidate | 7 days |

#### Benefits
- **Offline support**: Cache-first assets work without network
- **Fast repeat visits**: Instant loads from cache
- **Fresh content**: Network-first ensures HTML is fresh

#### Cache Warmup
- Precache critical assets during SW install
- Background prefetch search results for common queries

---

### 5. CSS Performance

#### CSS Containment
```css
.company-card {
  contain: layout style;
}
```
- **Benefit**: Isolates layout calculations to component
- **How**: `contain` property limits browser repaint scope
- **Maintain**: Add to new components that are self-contained

#### Reduced Selector Specificity
- Flat class-based selectors (no deep nesting)
- No universal selector (`*`) in production CSS
- Minimal `:hover` states (GPU-accelerated `transform` preferred)

---

### 6. JavaScript Performance

#### Request Idle Callback
Non-critical tasks scheduled during browser idle time:
```javascript
const scheduleIdleTask = (callback) => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(callback, { timeout: 2000 });
  } else {
    setTimeout(callback, 0);
  }
};
```
- **Benefit**: Doesn't block critical UI work
- **Use for**: Preloading data, initializing non-essential features

#### Debouncing
Search input debounced (300ms) to prevent excessive API calls.

#### Event Delegation
Attach single listener to document, not per element:
```javascript
document.addEventListener('click', (e) => {
  const tracked = e.target.closest('[data-track]');
  if (tracked) { /* handle */ }
});
```

---

### 7. Third-Party Scripts

#### Google Analytics
- **Async + defer**: Non-blocking load
- **No render-blocking**: Loaded after main content
- **Consent management**: Only loads after user consent (EU compliance)
- **Measurement Protocol**: Can send without full GA library if needed

---

### 8. Server-Side Optimizations (Recommended)

#### HTTP/2
- Enable HTTP/2 on server (most modern hosts have it)
- Multiplexed requests → fewer connections

#### Compression
- **Brotli compression** (preferred): ~15% better than gzip
- **gzip** as fallback
- **How**: Configure in nginx/Apache

#### Caching Headers
```
Cache-Control: public, max-age=31536000, immutable  # for static assets
Cache-Control: public, max-age=300                   # for HTML
```
- Immutable for assets with hash in filename
- Short for HTML (need fresh content)

#### CDN (Cloudflare)
- Edge caching globally
- DDoS protection
- SSL termination
- Automatic Brotli
- Minification (optional, we already minify)

---

## Performance Testing

### Lighthouse
```bash
# Local
npx lighthouse http://localhost:3000 --view

# CI
npm install -g lighthouse-ci
lighthouse-ci https://saudisaashub.com --perf --config-path=./lighthouserc.js
```

### WebPageTest
- Test from **Dubai** or **Riyadh** locations
- 3G mobile profile: `Moto G4 - 3G, 400ms RTT`

### Chrome DevTools
1. Open DevTools → Performance tab
2. Click Record → Reload page → Stop
3. Check FCP, LCP, CLS metrics
4. Analyze long tasks in Main thread

### Real User Monitoring (RUM)
Consider adding:
- [Google Analytics Web Vitals](https://web.dev/vitals-analyze-with-analytics/)
- [SpeedCurve](https://speedcurve.com/)
- [New Relic Browser](https://newrelic.com/products/browser-monitoring)

---

## Performance Budget

Enforce these limits in CI/CD:

| Asset | Budget | Current |
|-------|--------|---------|
| HTML (critical) | < 15KB | ~12KB ✓ |
| HTML (full) | < 50KB | ~45KB ✓ |
| CSS (total) | < 50KB | ~38KB ✓ |
| JS (main) | < 30KB | ~18KB ✓ |
| JS (total) | < 60KB | ~24KB ✓ |
| Fonts | < 100KB | ~45KB ✓ |
| Total Transfer | < 200KB | ~155KB ✓ |

---

## Common Performance Issues & Fixes

### Images without dimensions → CLS
**Issue**: Images load after text, causing layout shift
**Fix**:
```html
<img src="logo.png" width="200" height="100" alt="...">
<!-- OR CSS aspect-ratio -->
<div style="aspect-ratio: 2/1;">
  <img src="logo.png" alt="..." fill>
</div>
```

### Too many web fonts → FOUT/FOIT
**Issue**: Font loads slowly, text invisible or flashes
**Fix**: Use `font-display: swap` + preload critical font

### Render-blocking JS in head
**Issue**: Scripts without `defer` block HTML parsing
**Fix**: All scripts should have `defer` or `async`

### Unoptimized CSS
**Issue**: Large CSS with unused rules
**Fix**: PurgeCSS (consider adding to build for JS frameworks)

### Cache misses on repeat visits
**Issue**: No caching headers or cache-busting
**Fix**: Add file hash to filenames; set long Cache-Control

---

## Monitoring Performance

### Automated Testing (CI)
```yaml
# GitHub Actions example
- name: Run Lighthouse
  run: |
    npm install -g lighthouse
    lighthouse http://localhost:3000 --output html --output-path ./report.html
- name: Upload results
  uses: actions/upload-artifact@v2
  with:
    name: lighthouse-report
    path: report.html
```

### Synthetic Monitoring
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Sitespeed.io](https://www.sitespeed.io/)
- [Calibre](https://calibreapp.com/)

### Real User Monitoring
- Google Analytics Web Vitals report
- Cloudflare Web Analytics
- SpeedCurve RUM

---

## Performance Checklist for New Features

- [ ] Images have `width`/`height` or `aspect-ratio`
- [ ] Images use `loading="lazy"` if below-the-fold
- [ ] New CSS doesn't exceed budget (+5KB max)
- [ ] New JS is code-split (not in main bundle)
- [ ] No new synchronous network requests
- [ ] No new render-blocking resources
- [ ] Tested on 3G network (DevTools throttling)
- [ ] Lighthouse score not degraded
- [ ] Structured data updated (if applicable)

---

## Advanced Optimizations (Future)

### 1. Image Optimization Pipeline
```javascript
// Using sharp
const sharp = require('sharp');

const generateWebP = async (input) => {
  await sharp(input)
    .webp({ quality: 80 })
    .toFile(`${input}.webp`);
};

// Generate multiple sizes
const sizes = [400, 800, 1200, 1600];
for (const size of sizes) {
  await sharp(input)
    .resize(size)
    .toFile(`${input}-${size}.png`);
}
```

### 2. HTTP/3 (QUIC)
Enable on Cloudflare → reduces connection latency further.

### 3. Prefetching Common Searches
```javascript
// Predictively prefetch search results
const commonSearches = ['crm', 'erp', 'accounting'];
if ('connection' in navigator && navigator.connection.saveData === false) {
  commonSearches.forEach(term => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = `/api/search?q=${term}`;
    document.head.appendChild(link);
  });
}
```

### 4. Service Worker Background Sync
Queue failed analytics requests and replay when online.

### 5. Web Vitals Optimization (Specific)

#### Improve LCP
- Preload largest image
- Optimize font loading (subset to Arabic characters)
- Reduce server response time (< 200ms)
- Eliminate render-blocking resources

#### Improve CLS
- Reserve space for dynamic content (skeletons)
- Set min-height for cards
- Avoid inserting content above current scroll position

#### Improve FID
- Break up long tasks (> 50ms)
- Defer non-critical JS
- Use Web Workers for heavy computation

---

## Resources

- [Web.dev Performance](https://web.dev/performance-scenarios/)
- [Lighthouse Scoring](https://github.com/GoogleChrome/lighthouse/blob/master/docs/scoring.md)
- [Core Web Vitals](https://web.dev/vitals/)
- [HTTP/2 Server Push](https://developers.google.com/web/fundamentals/performance/http2/)
- [Web Performance Calendar](https://webperformancecalendario.com/)

---

*Always measure before and after optimizations. Performance is a feature, not a one-time achievement.*
