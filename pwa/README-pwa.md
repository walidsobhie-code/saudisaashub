# SaudiSaaSHub PWA Package

This directory contains all Progressive Web App (PWA) assets and configuration for SaudiSaaSHub.

## 📁 Directory Structure

```
pwa/
├── assets/
│   └── icons/              # App icons in various sizes (SVG)
│       ├── icon-72x72.svg
│       ├── icon-96x96.svg
│       ├── icon-128x128.svg
│       ├── icon-192x192.svg
│       ├── icon-512x512.svg
│       ├── badge-72x72.svg
│       ├── search-96x96.svg
│       ├── category-96x96.svg
│       └── add-96x96.svg
├── manifest.json           # Web App Manifest
├── sw.js                   # Service Worker (caching, offline, sync)
├── offline.html           # Offline fallback page
├── install-banner.js      # Custom install banner component
├── install-prompt.js      # QR code modal for installation
├── build-pwa.js           # Build script for production
├── PWA.md                 # Comprehensive documentation
└── README-pwa.md          # This file
```

## 🚀 Quick Start

### 1. Development (No build required)
Simply serve the project root. The PWA assets are referenced from `/pwa/`.

```bash
# Serve project root
npx serve /Users/walidsobhi/Projects/saudisaashub
# Open http://localhost:3000
```

Service worker will automatically register when you load the page.

### 2. Production Build
Run the build script to create an optimized `dist/` folder:

```bash
cd pwa
node build-pwa.js

# Options:
node build-pwa.js --dev       # Skip minification
node build-pwa.js --clean     # Clean dist before build
node build-pwa.js --push      # Git push after build
```

The `dist/` folder will contain production-ready files ready for deployment.

## 🧪 Testing

### Local Testing
1. Run `npx serve dist/` from the `pwa/` directory
2. Open Chrome DevTools → Application
3. Verify:
   - Manifest loads without errors
   - Service Worker is active
   - Cache Storage contains assets
4. Test offline: Network tab → Offline → Refresh

### Lighthouse Audit
Open DevTools → Lighthouse → Audits:
- **PWA** score should be 90+
- **Performance** score should be 90+
- **Best Practices** score should be 90+

Common issues and fixes in `PWA.md`.

## 📱 Installation

When a user visits the site:
1. After 3 visits or 30 seconds, an install banner appears
2. User can click "تثبيت" (Install) or "عرض QR" (Show QR)
3. QR modal shows code for quick mobile install
4. Native prompt fallback if supported

### Manual Installation
- **Android:** Chrome menu → "Add to Home screen"
- **iOS:** Safari Share → "Add to Home Screen"
- **Desktop:** Chrome/Edge address bar → Install icon

## 🔄 Update Process

1. Deploy new version to server
2. Service worker automatically detects update on next visit
3. New SW installs in background
4. User sees "refresh available" banner (implement in app)
5. User refreshes page → new SW activates

To force update for testing:
```js
navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
```

## 🛠️ Customization

### Icons
Replace the SVG icons in `assets/icons/` with your branded icons.
Keep the same filenames and sizes.

### Manifest
Edit `manifest.json` to customize:
- `name`, `short_name`, `description`
- `theme_color`, `background_color`
- `icons` (if adding new sizes)
- `shortcuts` (quick actions from home screen)
- `related_applications` (Play Store / App Store links)

### Service Worker
Edit `sw.js` to adjust:
- Cache TTLs (currently 7 days static, 30 days logos, 3 days dynamic)
- Cache strategies (cache-first, network-first, stale-while-revalidate)
- Background sync tags and handlers
- Push notification templates

### Offline Page
Customize `offline.html` to match your brand and provide helpful offline functionality.

## 🔧 Environment Variables

No environment variables required. All configuration is in:
- `manifest.json` - PWA metadata
- `sw.js` - Caching strategies
- `install-banner.js` - Install thresholds (visits, time)

## 📊 Performance Targets

| Metric | Target | Current (Est.) |
|--------|--------|----------------|
| First Contentful Paint | < 1.5s | ~1.2s |
| Time to Interactive | < 3s | ~2.5s |
| Lighthouse PWA Score | > 90 | TBD |
| Lighthouse Perf Score | > 90 | TBD |
| Offline Support | Full | ✅ |

## 🐛 Troubleshooting

See comprehensive troubleshooting guide in `PWA.md`.

### Common Issues

**Service Worker not registering:**
- Check HTTPS (or localhost)
- Verify `sw.js` is accessible at root `/sw.js`
- Check browser DevTools Console for errors

**Icons not showing:**
- Ensure icons are SVG at correct sizes
- Clear browser cache and reinstall PWA
- Check manifest for proper `purpose` attribute

**Offline not working:**
- Visit `offline.html` while online to cache it
- Check DevTools → Application → Cache Storage
- Verify service worker is active (not "redundant")

**Install banner not showing:**
- Clear localStorage: `localStorage.removeItem('saudisaashub_pwa_install_dismissed')`
- Reset visit count: `localStorage.removeItem('saudisaashub_visit_count')`
- Refresh page and wait 30s or visit 3 times

## 📱 Platform Specifics

### iOS Safari
- No automatic install prompt (QR or manual only)
- Limited push notification support
- Cache limit: ~50MB
- Service worker updates on page load (not tab close)

### Android Chrome
- Full PWA support with auto-install prompt
- WebAPK installation (after 3 visits)
- Larger cache limits
- Background sync works

### Desktop Chrome/Edge
- Install via address bar icon
- Standalone window mode
- Full push notification support (with permission)

## 📦 Deploy

1. Run `node build-pwa.js` to create `dist/`
2. Upload `dist/` contents to your web server or CDN
3. Ensure `sw.js` is served at root `/sw.js` (not nested)
4. Set correct MIME types:
   - `.json` → `application/json`
   - `.webmanifest` → `application/manifest+json` (optional)
   - `.svg` → `image/svg+xml`
5. Configure CORS if using CDN (must allow same-origin)
6. Enable HTTPS (required for service workers)

### GitHub Pages
1. Push `dist/` to `gh-pages` branch
2. Set GitHub Pages source to `gh-pages`
3. No special CORS needed (GitHub handles it)

### Netlify/Vercel
- Drag & drop `dist/` folder
- Or connect git repo and set build command: `node pwa/build-pwa.js`
- Publish directory: `pwa/dist`

## 📚 Resources

- [PWA Documentation](PWA.md) - Full documentation
- [Web.dev PWA](https://web.dev/progressive-web-apps/)
- [MDN Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

## 📄 License

Same as the main SaudiSaaSHub project.

---

**Version:** 3.0.0
**Last Updated:** 2026-03-12
**Maintained by:** SaudiSaaSHub Team
