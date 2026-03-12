/**
 * SaudiSaaSHub - Service Worker
 * Offline caching, performance optimization, and PWA support
 */

const CACHE_NAME = 'saudisaashub-v1';
const STATIC_CACHE = 'saudisaashub-static-v1';
const DYNAMIC_CACHE = 'saudisaashub-dynamic-v1';

// Assets to cache immediately on install (precache)
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/css/design-system.css',
  '/css/components.css',
  '/css/utilities.css',
  '/js/app.js',
  '/js/structured-data.js',
  '/js/ga4-setup.js',
  '/manifest.json',
  '/assets/images/logo-placeholder.png',
  '/assets/fonts/arabic-font.woff2'
];

// Cache configuration
const CACHE_CONFIG = {
  static: {
    maxEntries: 50,
    maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
  },
  dynamic: {
    maxEntries: 100,
    maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
  }
};

// ============================================
// INSTALL: Precache critical assets
// ============================================
self.addEventListener('install', (event) => {
  console.log('🛠️ Service Worker installing...');

  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('📦 Pre-caching static assets');
      return cache.addAll(PRECACHE_ASSETS.map(asset => {
        // Handle relative URLs
        return asset.startsWith('http') ? asset : new Request(asset, { cache: 'no-cache' });
      }));
    }).then(() => {
      // Activate immediately
      return self.skipWaiting();
    }).catch((error) => {
      console.error('❌ Pre-cache failed:', error);
    })
  );
});

// ============================================
// ACTIVATE: Clean up old caches
// ============================================
self.addEventListener('activate', (event) => {
  console.log('✅ Service Worker activating...');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete old caches
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE && !cacheName.startsWith(CACHE_NAME)) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Take control of all clients immediately
      return self.clients.claim();
    })
  );
});

// ============================================
// FETCH: Network-first with cache fallback
// ============================================
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip Chrome extension requests
  if (url.protocol === 'chrome-extension:') return;

  // Skip analytics requests
  if (url.pathname.includes('/analytics') || url.pathname.includes('/gtag')) return;

  // Skip API calls that should go to network
  if (url.pathname.startsWith('/api/') && !url.pathname.startsWith('/api/search')) {
    return; // Let API requests go to network
  }

  // Determine caching strategy based on resource type
  const strategy = getCacheStrategy(request, url);

  event.respondWith(
    handleFetch(request, strategy)
  );
});

// ============================================
// CACHE STRATEGY DETERMINATION
// ============================================
const getCacheStrategy = (request, url) => {
  // Static assets - cache first
  if (
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.woff2') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.webp') ||
    url.pathname.endsWith('.ico') ||
    url.pathname.endsWith('/manifest.json')
  ) {
    return 'cache-first';
  }

  // HTML pages - network first (for fresh content)
  if (url.pathname.endsWith('.html') || !url.pathname.includes('.')) {
    return 'network-first';
  }

  // API search requests - stale-while-revalidate (fast first response, then update)
  if (url.pathname.includes('/api/search')) {
    return 'stale-while-revalidate';
  }

  // Default: network first
  return 'network-first';
};

// ============================================
// FETCH HANDLER
// ============================================
const handleFetch = async (request, strategy) => {
  const cacheName = strategy === 'cache-first' || strategy === 'stale-while-revalidate'
    ? STATIC_CACHE
    : DYNAMIC_CACHE;

  try {
    switch (strategy) {
      case 'cache-first':
        return await cacheFirst(request, cacheName);

      case 'network-first':
        return await networkFirst(request, cacheName);

      case 'stale-while-revalidate':
        return await staleWhileRevalidate(request, cacheName);

      default:
        return await networkFirst(request, cacheName);
    }
  } catch (error) {
    console.error('Fetch error:', error);

    // Fallback to cache for network-first strategy
    if (strategy === 'network-first') {
      const cached = await caches.match(request);
      if (cached) return cached;
    }

    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match('/offline.html') || new Response('Offline', { status: 503 });
    }

    throw error;
  }
};

// ============================================
// STRATEGY: Cache First
// ============================================
const cacheFirst = async (request, cacheName) => {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    throw error;
  }
};

// ============================================
// STRATEGY: Network First
// ============================================
const networkFirst = async (request, cacheName) => {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    throw error;
  }
};

// ============================================
// STRATEGY: Stale While Revalidate
// ============================================
const staleWhileRevalidate = async (request, cacheName) => {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  // Fetch in background for cache update
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
  }).catch(() => {
    // Silently fail - we have cached version
  });

  // Return cached version immediately if available, otherwise wait for network
  if (cached) {
    return cached;
  }

  return await fetchPromise;
};

// ============================================
// BACKGROUND SYNC: Queue failed requests
// ============================================
self.addEventListener('sync', (event) => {
  if (event.tag === 'analytics-queue') {
    event.waitUntil(
      flushAnalyticsQueue()
    );
  }
});

const flushAnalyticsQueue = async () => {
  const queue = await getAnalyticsQueue();
  for (const item of queue) {
    try {
      await fetch('/api/analytics/event', {
        method: 'POST',
        body: JSON.stringify(item),
        headers: { 'Content-Type': 'application/json' }
      });
      await removeFromQueue(item.id);
    } catch (error) {
      console.error('Failed to send queued analytics:', error);
    }
  }
};

const getAnalyticsQueue = async () => {
  const result = await localStorage.getItem('analytics_queue');
  return result ? JSON.parse(result) : [];
};

const removeFromQueue = async (id) => {
  const queue = await getAnalyticsQueue();
  const filtered = queue.filter(item => item.id !== id);
  await localStorage.setItem('analytics_queue', JSON.stringify(filtered));
};

// ============================================
// PUSH NOTIFICATIONS (optional)
// ============================================
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body || data.message,
    icon: '/assets/icons/icon-192x192.png',
    badge: '/assets/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/',
      category: data.category || 'general'
    },
    actions: [
      {
        action: 'open',
        title: 'فتح'
      },
      {
        action: 'close',
        title: 'إغلاق'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'سعودي ساس هب', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'open' || !event.action) {
    const url = event.notification.data.url;
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then((clientList) => {
        for (const client of clientList) {
          if (client.url === url && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
    );
  }
});

// ============================================
// MESSAGING: Communicate with main thread
// ============================================
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'GET_CACHE_SIZE') {
    event.ports[0].postMessage({
      cacheSize: getCacheSize()
    });
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.keys().then((names) => {
      return Promise.all(names.map(name => caches.delete(name)));
    }).then(() => {
      event.ports[0].postMessage({ success: true });
    });
  }
});

const getCacheSize = async () => {
  const cache = await caches.open(STATIC_CACHE);
  const requests = await cache.keys();
  return requests.length;
};

console.log('✅ Service Worker loaded');
