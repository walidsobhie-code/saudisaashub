/**
 * SaudiSaaSHub - Enhanced Service Worker
 * Full-featured PWA with offline support, caching, background sync, and push notifications
 */

const CACHE_VERSION = 'v3';
const STATIC_CACHE = `saudisaashub-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `saudisaashub-dynamic-${CACHE_VERSION}`;
const LOGO_CACHE = `saudisaashub-logos-${CACHE_VERSION}`;

// Asset lists
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/css/design-system.css',
  '/css/components.css',
  '/css/utilities.css',
  '/js/app.js',
  '/js/structured-data.js',
  '/js/ga4-setup.js',
  '/assets/icons/icon-72x72.svg',
  '/assets/icons/icon-96x96.svg',
  '/assets/icons/icon-128x128.svg',
  '/assets/icons/icon-144x144.svg',
  '/assets/icons/icon-152x152.svg',
  '/assets/icons/icon-192x192.svg',
  '/assets/icons/icon-256x256.svg',
  '/assets/icons/icon-384x384.svg',
  '/assets/icons/icon-512x512.svg',
  '/assets/icons/badge-72x72.svg',
  '/assets/icons/search-96x96.svg',
  '/assets/icons/category-96x96.svg',
  '/assets/icons/add-96x96.svg'
];

// Cache strategies configuration
const CACHE_STRATEGIES = {
  // Static assets: cache-first (7 days)
  static: {
    cacheName: STATIC_CACHE,
    maxEntries: 60,
    maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
    strategy: 'cache-first'
  },
  // Company logos: cache-first (30 days)
  logos: {
    cacheName: LOGO_CACHE,
    maxEntries: 100,
    maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
    strategy: 'cache-first'
  },
  // Dynamic content: network-first (3 days)
  dynamic: {
    cacheName: DYNAMIC_CACHE,
    maxEntries: 100,
    maxAgeSeconds: 60 * 60 * 24 * 3, // 3 days
    strategy: 'network-first'
  }
};

// ============================================
// INSTALL: Precaching and setup
// ============================================
self.addEventListener('install', (event) => {
  console.log('🛠️ Service Worker installing...');

  event.waitUntil(
    Promise.all([
      // Open all caches
      caches.open(STATIC_CACHE),
      caches.open(LOGO_CACHE),
      caches.open(DYNAMIC_CACHE)
    ]).then(([staticCache, logoCache, dynamicCache]) => {
      console.log('📦 Pre-caching static assets...');

      // Cache static assets with cache-first strategy
      return staticCache.addAll(
        STATIC_ASSETS.map(asset => new Request(asset, { cache: 'no-cache' }))
      ).then(() => {
        console.log('✅ Static assets cached');
        return self.skipWaiting();
      });
    }).catch((error) => {
      console.error('❌ Installation failed:', error);
    })
  );
});

// ============================================
// ACTIVATE: Cleanup old caches
// ============================================
self.addEventListener('activate', (event) => {
  console.log('✅ Service Worker activating...');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Keep only current version caches
          if (
            cacheName !== STATIC_CACHE &&
            cacheName !== DYNAMIC_CACHE &&
            cacheName !== LOGO_CACHE &&
            (cacheName.startsWith('saudisaashub-') || cacheName.startsWith('push-'))
          ) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Claim all clients immediately
      return self.clients.claim();
    })
  );
});

// ============================================
// FETCH: Advanced caching strategies
// ============================================
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip chrome-extension and other non-http(s) schemes
  if (!url.protocol.startsWith('http')) return;

  // Skip analytics and tracking requests
  if (
    url.pathname.includes('/analytics') ||
    url.pathname.includes('/gtag') ||
    url.pathname.includes('/gtm') ||
    request.url.includes('google-analytics.com') ||
    request.url.includes('googletagmanager.com')
  ) {
    return;
  }

  // Don't cache API calls except search
  if (url.pathname.startsWith('/api/') && !url.pathname.includes('/search')) {
    return; // Let API requests go to network
  }

  // Determine strategy based on resource type
  const strategy = determineStrategy(request, url);

  event.respondWith(
    handleRequest(request, strategy)
      .catch((error) => {
        console.error('Fetch error:', error);

        // Fallback for navigation requests
        if (request.mode === 'navigate') {
          return caches.match('/offline.html');
        }

        // Return cached version if available for network errors
        return caches.match(request);
      })
  );
});

// ============================================
// STRATEGY DETERMINATION
// ============================================
const determineStrategy = (request, url) => {
  const pathname = url.pathname.toLowerCase();

  // Logo images: cache-first (30 days)
  if (
    pathname.includes('/assets/logos/') ||
    pathname.match(/\/assets\/icons\/.*logo.*\.(png|jpg|jpeg|svg|webp|ico)/i) ||
    request.destination === 'image'
  ) {
    return CACHE_STRATEGIES.logos;
  }

  // Static assets (CSS, JS, fonts, manifest): cache-first (7 days)
  if (
    pathname.endsWith('.css') ||
    pathname.endsWith('.js') ||
    pathname.includes('.woff') ||
    pathname.includes('.woff2') ||
    pathname.includes('.ttf') ||
    pathname.includes('.otf') ||
    pathname.endsWith('.json') ||
    pathname.endsWith('.svg') ||
    pathname.endsWith('/manifest.json')
  ) {
    return CACHE_STRATEGIES.static;
  }

  // Search API: stale-while-revalidate
  if (pathname.includes('/api/search')) {
    return { ...CACHE_STRATEGIES.static, strategy: 'stale-while-revalidate' };
  }

  // HTML pages: network-first (for fresh content)
  if (
    request.mode === 'navigate' ||
    pathname.endsWith('.html') ||
    !pathname.includes('.')
  ) {
    return CACHE_STRATEGIES.dynamic;
  }

  // Default: use static caching
  return CACHE_STRATEGIES.static;
};

// ============================================
// REQUEST HANDLER
// ============================================
const handleRequest = async (request, strategy) => {
  const { cacheName, strategy: cacheStrategy, maxAgeSeconds } = strategy;

  switch (cacheStrategy) {
    case 'cache-first':
      return cacheFirst(request, cacheName);

    case 'network-first':
      return networkFirst(request, cacheName);

    case 'stale-while-revalidate':
      return staleWhileRevalidate(request, cacheName);

    default:
      return networkFirst(request, cacheName);
  }
};

// ============================================
// CACHE-FIRST STRATEGY
// ============================================
const cacheFirst = async (request, cacheName) => {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  if (cached) {
    return cached;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      await cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    throw error;
  }
};

// ============================================
// NETWORK-FIRST STRATEGY
// ============================================
const networkFirst = async (request, cacheName) => {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      await cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // Network failed, try cache
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    throw error;
  }
};

// ============================================
// STALE-WHILE-REVALIDATE STRATEGY
// ============================================
const staleWhileRevalidate = async (request, cacheName) => {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  // Fetch in background to update cache
  const fetchPromise = fetch(request)
    .then((response) => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
    })
    .catch(() => {
      // Silently fail - we have cached version
    });

  // Return cached version immediately or wait for network
  if (cached) {
    return cached;
  }

  return fetchPromise;
};

// ============================================
// BACKGROUND SYNC: Newsletter signups
// ============================================
self.addEventListener('sync', (event) => {
  if (event.tag === 'newsletter-sync') {
    console.log('🔄 Background sync: newsletter signup');
    event.waitUntil(
      syncNewsletterSignups()
    );
  }

  if (event.tag === 'analytics-sync') {
    console.log('🔄 Background sync: analytics');
    event.waitUntil(
      flushAnalyticsQueue()
    );
  }
});

const syncNewsletterSignups = async () => {
  const queue = await getNewsletterQueue();
  const results = [];

  for (const item of queue) {
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item.data)
      });

      if (response.ok) {
        results.push({ ...item, status: 'synced' });
      } else {
        results.push({ ...item, status: 'failed', error: `HTTP ${response.status}` });
      }
    } catch (error) {
      results.push({ ...item, status: 'failed', error: error.message });
    }
  }

  // Update queue with results
  await updateNewsletterQueue(results);
  return results;
};

const getNewsletterQueue = async () => {
  try {
    const data = await localStorage.getItem('newsletter_queue');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const updateNewsletterQueue = async (items) => {
  try {
    await localStorage.setItem('newsletter_queue', JSON.stringify(items));
  } catch (error) {
    console.error('Failed to update newsletter queue:', error);
  }
};

// Analytics queue
const flushAnalyticsQueue = async () => {
  const queue = await getAnalyticsQueue();
  const results = [];

  for (const item of queue) {
    try {
      await fetch('/api/analytics/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      results.push({ ...item, status: 'synced' });
    } catch (error) {
      results.push({ ...item, status: 'failed', error: error.message });
    }
  }

  // Remove synced items
  const pending = results.filter(item => item.status === 'failed');
  await localStorage.setItem('analytics_queue', JSON.stringify(pending));
  return results;
};

const getAnalyticsQueue = async () => {
  try {
    const data = await localStorage.getItem('analytics_queue');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

// ============================================
// PUSH NOTIFICATIONS
// ============================================
self.addEventListener('push', (event) => {
  if (!event.data) return;

  try {
    const data = event.data.json();
    const options = {
      body: data.body || data.message || 'تحديث جديد من سعودي ساس هب',
      icon: '/assets/icons/icon-192x192.svg',
      badge: '/assets/icons/badge-72x72.svg',
      vibrate: [100, 50, 100],
      data: {
        url: data.url || '/',
        category: data.category || 'general',
        timestamp: Date.now()
      },
      actions: [
        {
          action: 'open',
          title: 'فتح',
          icon: '/assets/icons/icon-72x72.svg'
        },
        {
          action: 'dismiss',
          title: 'تجاهل',
          icon: '/assets/icons/badge-72x72.svg'
        }
      ],
      tag: data.tag || 'saudisaashub-notification',
      renotify: data.renotify || false,
      requireInteraction: data.requireInteraction || false
    };

    // Add image if provided
    if (data.image) {
      options.image = data.image;
    }

    event.waitUntil(
      self.registration.showNotification(data.title || 'سعودي ساس هب', options)
    );
  } catch (error) {
    console.error('Push notification error:', error);
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const action = event.action || 'open';
  const url = event.notification.data.url || '/';
  const category = event.notification.data.category;

  if (action === 'open') {
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
        // Check if there's already a window with the same URL
        for (const client of clientList) {
          if (client.url === url && 'focus' in client) {
            return client.focus();
          }
        }

        // Open new window
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
    );

    // Track notification click
    trackNotificationClick(category, data);
  }

  if (action === 'dismiss') {
    // Just close the notification
    event.waitUntil(
      Promise.resolve()
    );
  }
});

const trackNotificationClick = async (category, data) => {
  try {
    await fetch('/api/analytics/notification-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        category,
        ...data,
        timestamp: Date.now()
      })
    });
  } catch (error) {
    // Silently fail - tracking is not critical
  }
};

// ============================================
// MESSAGING: Communication with main thread
// ============================================
self.addEventListener('message', (event) => {
  const { data } = event;

  if (!data) return;

  switch (data.type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;

    case 'GET_CACHE_STATUS':
      event.ports[0].postMessage({
        status: 'ready',
        caches: getCacheInfo()
      });
      break;

    case 'CLEAR_CACHE':
      event.waitUntil(
        clearAllCaches().then(() => {
          event.ports[0].postMessage({ success: true });
        })
      );
      break;

    case 'PUSH_NOTIFICATION':
      // Allow main thread to trigger notifications
      if (self.registration.showNotification) {
        self.registration.showNotification(data.title, data.options);
      }
      break;

    case 'NEWSLETTER_SYNC':
      // Trigger background sync for newsletter
      if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
        self.registration.sync.register('newsletter-sync');
      }
      break;

    case 'GET_VERSION':
      event.ports[0].postMessage({ version: CACHE_VERSION });
      break;
  }
});

const getCacheInfo = async () => {
  const cacheNames = await caches.keys();
  const info = {};

  for (const name of cacheNames) {
    const cache = await caches.open(name);
    const requests = await cache.keys();
    info[name] = {
      entries: requests.length,
      size: 'unknown' // Size calculation requires IndexedDB
    };
  }

  return info;
};

const clearAllCaches = async () => {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames.map(name => caches.delete(name))
  );
};

// ============================================
// PERIODIC BACKGROUND SYNC (optional)
// ============================================
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'content-refresh') {
    event.waitUntil(
      refreshContent()
    );
  }
});

const refreshContent = async () => {
  // Update content in the background
  try {
    await fetch('/api/content/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Periodic refresh failed:', error);
  }
};

// ============================================
// ERROR HANDLING
// ============================================
self.addEventListener('error', (event) => {
  console.error('Service Worker error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

console.log('✅ Enhanced Service Worker loaded (v' + CACHE_VERSION + ')');
