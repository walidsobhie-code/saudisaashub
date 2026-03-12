# SaudiSaaSHub PWA Documentation

## 📱 Installation Instructions

### Android (Chrome, Edge, Opera)
1. Open SaudiSaaSHub in your browser
2. Tap the **menu icon** (three dots) in the top right
3. Select **"Add to Home screen"** or **"Install app"**
4. The app will be installed on your home screen with the SaudiSaaSHub icon

**Alternative:** Scan the QR code provided in the app for direct installation

### iOS (Safari)
1. Open SaudiSaaSHub in Safari
2. Tap the **Share button** (box with arrow)
3. Scroll down and tap **"Add to Home Screen"**
4. Tap **"Add"** to confirm

**Note:** iOS doesn't support automatic install prompts. Use the QR code or manual add.

### Desktop (Chrome, Edge, Opera)
1. Look for the **install icon** (plus sign) in the address bar
2. Click it and select **"Install"**
3. The app will be installed as a standalone window

## ✅ PWA Features Checklist

### Core PWA Requirements ✅
- [x] Web App Manifest with all required fields
- [x] Service Worker with caching strategies
- [x] HTTPS/secure origin
- [x] Installability criteria met

### Performance 🚀
- [x] **Service Worker Caching**
  - Cache-first for static assets (7 days TTL)
  - Network-first for HTML (fresh content)
  - Stale-while-revalidate for API searches
  - Logo caching (30 days, cache-first)
- [x] **Offline Support**
  - Complete offline fallback page
  - App shell architecture
  - Offline analytics queue
- [x] **Fast Loading**
  - Critical CSS inlined
  - Font preloading
  - Resource hints (preconnect, dns-prefetch, prefetch)
- [x] **Smooth Animations**
  - Skeleton loading states
  - CSS animations with reduced-motion support
  - 60fps canvas starfield

### Mobile Experience 📱
- [x] **Touch-Optimized**
  - All buttons ≥ 44×44px
  - Touch-friendly tap targets
- [x] **iOS Meta Tags**
  - `apple-touch-icon` (all sizes)
  - `viewport-fit=cover` for notch support
  - Safe area insets
- [x] **Theme Integration**
  - Status bar theme color
  - Dark theme (#0A0A0F background, #F5C542 accent)
- [x] **Install UI**
  - Custom banner (shows after 3 visits or 30 seconds)
  - QR code modal for easy install
  - Native prompt fallback
  - Dismissible with localStorage

### Notifications 🔔
- [x] **Push Notifications**
  - Push event handler
  - Notification click handler
  - Custom actions (open, dismiss)
  - Vibration patterns
  - Badge icon support
- [x] **Background Sync**
  - Newsletter form sync
  - Analytics queue flush
  - Periodic content refresh (optional)

### Accessibility ♿
- [x] ARIA labels on interactive elements
- [x] Keyboard navigation support
- [x] Screen reader optimizations
- [x] Reduced motion support (`@media (prefers-reduced-motion)`)
- [x] High contrast ready (CSS custom properties)
- [x] Focus indicators (visible on all controls)

### SEO & Discovery 🔍
- [x] Structured data (JSON-LD)
- [x] Proper canonical URLs
- [x] hreflang tags (ar, en, x-default)
- [x] Open Graph / Twitter Cards (optional)
- [x] Sitemap generation
- [x] Robots.txt optimized

### Reliability 🔧
- [x] **Graceful Degradation**
  - All fetch failures handled
  - Offline fallback page
  - Network error retry logic
- [x] **Cache Management**
  - Automatic cleanup of old caches
  - Versioned cache names (v3)
  - Size limits (maxEntries) to prevent overflow
- [x] **Update Strategy**
  - SkipWaiting on install
  - ClientsClaim on activate
  - Version detection via messaging

## 🛠️ Troubleshooting

### Issue: "Add to Home Screen" option not available
**Android:** Ensure you're using Chrome, Edge, or Opera. Firefox on Android doesn't support PWA install.
**iOS:** Safari only. Use Share → "Add to Home Screen".
**Desktop:** Check that DevTools → Application → Manifest has no errors.

### Issue: App not working offline
1. Open DevTools → Application → Service Workers
2. Ensure service worker is active and not in "stopped" state
3. Check Cache Storage for cached assets
4. Verify offline.html is cached (visit it while online first)
5. Test with DevTools → Network → Offline mode

### Issue: Push notifications not showing
- HTTPS required (or localhost for dev)
- User must grant notification permission
- Check DevTools → Application → Service Workers → "Push" testing
- Vibration requires user interaction first on some browsers

### Issue: Icons not showing on home screen
- Ensure all icon sizes exist (72x72 to 512x512)
- Icons must be accessible via HTTPS
- Clear site data and reinstall
- Check manifest for proper `purpose` attribute (any maskable)

### Issue: Stale content showing
- HTML pages use network-first strategy (should be fresh)
- Clear cache: DevTools → Application → Clear storage
- Or call: `navigator.serviceWorker.controller.postMessage({ type: 'CLEAR_CACHE' })`
- Force update: DevTools → Application → Service Workers → Update

### Issue: Background sync not working
- Requires user gesture (form submission) first
- Works only when page is closed (browser handles it)
- Check `navigator.serviceWorker.ready.then(reg => reg.sync.register('tag'))`
- Inspect in Chrome: `chrome://serviceworker-internals/`

## 📊 Monitoring & Debugging

### DevTools – Application Panel
- **Manifest:** Validate manifest.json
- **Service Workers:** Check status, updates, messages
- **Cache Storage:** Inspect cached files
- **Background Sync:** View pending sync registrations
- **Storage:** Quota usage, localStorage

### Console Commands
```javascript
// View service worker cache contents
caches.keys().then(keys => Promise.all(keys.map(k => caches.open(k).then(c => c.keys()))))

// Force skip waiting
navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' })

// Clear all caches
navigator.serviceWorker.controller.postMessage({ type: 'CLEAR_CACHE' })

// Get current version
navigator.serviceWorker.controller.postMessage({ type: 'GET_VERSION' })
  .then(e => console.log(e.data.version))
```

### Network Analysis
- Look for `(from ServiceWorker)` in Network tab
- Check `Size` column for `(cached)` vs `(network)`
- Test offline mode: DevTools → Network → Offline

## 📱 Known Limitations

### Browser Support
- **Full PWA:** Chrome 67+, Edge 79+, Opera 54+, Safari 11.1+ (partial), Firefox (no install)
- **Push Notifications:** Chrome, Edge, Safari (partial), Firefox (no)
- **Background Sync:** Chrome, Edge (not Safari/Firefox)
- **WebAPK (Android):** Chrome only, auto-installs after 3 visits

### iOS Limitations
- No automatic install prompt
- No background sync
- Limited push notification features
- Cache size limited (~50MB)
- No service worker update on tab close (needs revisit)

### Storage Quotas
- **Chrome:** 6% of disk space (heuristic, usually unlimited on desktop)
- **Safari:** 50MB per domain (can be exceeded with user permission)
- **Firefox:** No hard limit but eviction based on usage

### Performance Notes
- First load without cache: ~2-3s on 3G (with critical CSS inlined)
- Subsequent loads: <500ms from cache
- Skeleton screens show until content loads
- Starfield animation: ~5ms/frame on modern devices

## 🔄 Update Process

### Automatic Updates
1. New service worker detected on page load
2. Old SW continues serving until no clients
3. New SW installs in background
4. Call `skipWaiting()` via message or reload
5. New SW activates and takes over

### Manual Update Trigger
```javascript
if (navigator.serviceWorker.controller) {
  navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
}
```

### Cache Versioning
- Static cache: `saudisaashub-static-vX`
- Dynamic cache: `saudisaashub-dynamic-vX`
- Logo cache: `saudisaashub-logos-vX`
- Old caches auto-deleted on activate

## 🧪 Testing Checklist

### Installability Test
- [ ] Manifest loads without errors
- [ ] Service worker registers successfully
- [ ] App passes Lighthouse PWA audit (>90)
- [ ] Can add to home screen on Android & iOS
- [ ] Standalone mode works (no browser UI)

### Offline Test
- [ ] Load app while online
- [ ] Go offline (DevTools → Network → Offline)
- [ ] Refresh: offline.html appears
- [ ] Navigate to cached pages: they work
- [ ] Search works with cached data
- [ ] Forms queue for background sync

### Performance Test
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] Lighthouse Performance > 90
- [ ] No layout shifts (CLS < 0.1)
- [ ] Smooth animations (60fps)

### Mobile Test
- [ ] Safe area insets respected
- [ ] Touch targets ≥ 44×44px
- [ ] Status bar themed correctly
- [ ] Install banner appears after threshold
- [ ] QR modal opens and displays properly

## 📞 Support

For issues or feature requests, please contact:
- **GitHub Issues:** https://github.com/saudisaashub/saudisaashub/issues
- **Email:** support@saudisaashub.com
- **Telegram:** @saudisaashub_support

---

**Last Updated:** 2026-03-12
**PWA Version:** v3
**Compatible with:** Chrome 67+, Edge 79+, Opera 54+, Safari 11.1+
