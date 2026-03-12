/**
 * SaudiSaaSHub - Main Application JavaScript (Optimized)
 * Performance-optimized, modular, and SEO-friendly
 */

const App = (() => {
  'use strict';

  // Configuration
  const config = {
    apiBase: '/api',
    itemsPerPage: 20,
    lazyLoadThreshold: 0.1,
    searchDebounceMs: 300,
    scrollThrottleMs: 100,
    analyticsEnabled: true,
    perfMonitoring: true
  };

  // State
  let state = {
    page: 1,
    totalPages: 1,
    filters: {},
    searchQuery: '',
    sortBy: 'rating'
  };

  // ============================================
  // UTILITY: Throttle function for frequent events
  // ============================================
  const throttle = (func, limit) => {
    let inThrottle;
    return (...args) => {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };

  // ============================================
  // UTILITY: Debounce for search input
  // ============================================
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  // ============================================
  // PERFORMANCE: Request Idle Callback for non-critical tasks
  // ============================================
  const scheduleIdleTask = (callback, timeout = 2000) => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(callback, { timeout });
    } else {
      setTimeout(callback, 0);
    }
  };

  // ============================================
  // PERFORMANCE: Intersection Observer for Lazy Loading
  // ============================================
  const lazyLoadImages = () => {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.dataset.src;
            if (src) {
              // Fade-in effect
              img.style.opacity = '0';
              img.onload = () => {
                img.style.transition = 'opacity 0.3s ease';
                img.style.opacity = '1';
              };
              img.src = src;
              img.removeAttribute('data-src');
              img.loading = 'lazy'; // Ensure native lazy loading
              observer.unobserve(img);
            }
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    } else {
      // Fallback for older browsers: load immediately
      document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }
  };

  // ============================================
  // PERFORMANCE: Web Worker Starfield
  // ============================================
  const initStarfield = () => {
    const canvas = document.getElementById('starfield');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let stars = [];
    let animationId;

    // Check if Web Worker is supported
    if (window.Worker) {
      try {
        const worker = new Worker('/js/starfield-worker.js');

        worker.onmessage = (e) => {
          stars = e.data.stars;
          animate();
        };

        const resize = () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          worker.postMessage({
            type: 'resize',
            width: canvas.width,
            height: canvas.height
          });
        };

        // Initialize
        resize();
        window.addEventListener('resize', throttle(resize, 250));

        // Cleanup on page hide
        document.addEventListener('visibilitychange', () => {
          if (document.hidden) {
            cancelAnimationFrame(animationId);
            worker.terminate();
          } else {
            resize();
          }
        });

      } catch (e) {
        // Fallback to main thread animation
        console.warn('Web Worker failed, falling back to main thread starfield');
        initStarfieldMainThread(canvas, ctx);
      }
    } else {
      // Fallback for browsers without Worker support
      initStarfieldMainThread(canvas, ctx);
    }
  };

  const initStarfieldMainThread = (canvas, ctx) => {
    let stars = [];
    let animationId;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = [];
      for (let i = 0; i < 150; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2,
          speed: Math.random() * 0.5 + 0.1,
          alpha: Math.random()
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
        ctx.fill();
        star.y -= star.speed;
        if (star.y < 0) star.y = canvas.height;
      });
      animationId = requestAnimationFrame(animate);
    };

    init();
    const throttledResize = throttle(() => {
      init();
    }, 250);
    window.addEventListener('resize', throttledResize);
    animate();
  };

  // ============================================
  // CORE: Fetch data with caching
  // ============================================
  const fetchWithCache = async (key, fetchFn, ttl = 300000) => {
    try {
      const cached = localStorage.getItem(key);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < ttl) {
          return data;
        }
      }

      const data = await fetchFn();
      localStorage.setItem(key, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      if (cached) return JSON.parse(cached).data;
      throw error;
    }
  };

  // ============================================
  // DATA: Load categories
  // ============================================
  const loadCategories = async () => {
    try {
      const categories = await fetchWithCache(
        'categories_v1',
        () => fetch(`${config.apiBase}/categories`).then(r => r.json())
      );
      renderCategories(categories);
      return categories;
    } catch (error) {
      console.error('Failed to load categories:', error);
      const fallback = getFallbackCategories();
      renderCategories(fallback);
      return fallback;
    }
  };

  // ============================================
  // DATA: Load featured companies
  // ============================================
  const loadFeaturedCompanies = async () => {
    try {
      const companies = await fetchWithCache(
        'featured_companies_v1',
        () => fetch(`${config.apiBase}/companies/featured`).then(r => r.json()),
        180000 // 3 minutes
      );
      renderCompanies(companies, 'featured-grid');
      return companies;
    } catch (error) {
      console.error('Failed to load featured companies:', error);
      return [];
    }
  };

  // ============================================
  // DATA: Search companies
  // ============================================
  const searchCompanies = async (query, page = 1, filters = {}) => {
    const params = new URLSearchParams({
      q: query,
      page: page.toString(),
      limit: config.itemsPerPage.toString(),
      sort: state.sortBy,
      ...filters
    });

    try {
      const response = await fetch(`${config.apiBase}/search?${params}`);
      const data = await response.json();
      state.totalPages = Math.ceil(data.total / config.itemsPerPage);
      renderCompanies(data.companies, 'search-results');
      renderPagination(page, state.totalPages);
      return data;
    } catch (error) {
      console.error('Search failed:', error);
      return { companies: [], total: 0 };
    }
  };

  // ============================================
  // RENDER: Category cards
  // ============================================
  const renderCategories = (categories) => {
    const container = document.getElementById('category-grid');
    if (!container) return;

    const html = categories.map(cat => `
      <a href="/category/${cat.slug}" class="category-card" data-track="category_click" data-category="${cat.slug}">
        <div class="category-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" aria-hidden="true">
            ${cat.icon || '<circle cx="12" cy="12" r="10"></circle>'}
          </svg>
        </div>
        <h3>${cat.name}</h3>
        <p>${cat.description || `${cat.count} أداة متاحة`}</p>
        <div style="margin-top: auto; padding-top: 12px; font-size: 14px; color: var(--text-muted);">
          ${cat.count} أداة
        </div>
      </a>
    `).join('');

    container.innerHTML = html;
  };

  // ============================================
  // RENDER: Company cards with lazy loading
  // ============================================
  const renderCompanies = (companies, containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (companies.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 64px;">
          <h3 style="color: var(--text-muted); margin-bottom: 16px;">لا توجد نتائج</h3>
          <p style="color: var(--text-muted);">جرب البحث بكلمات مختلفة أو تصفح التصنيفات.</p>
        </div>
      `;
      return;
    }

    const html = companies.map(company => `
      <article class="card company-card" itemscope itemtype="https://schema.org/Software">
        <meta itemprop="name" content="${company.name}">
        <meta itemprop="description" content="${company.shortDescription}">
        <meta itemprop="category" content="${company.category}">
        ${company.rating ? `<meta itemprop="aggregateRating" itemscope itemtype="https://schema.org/AggregateRating"
          content="${company.rating}">` : ''}

        ${company.featured ? '<span class="company-card__badge">مميز</span>' : ''}

        <img
          src="${company.logo || '/assets/images/logo-placeholder.png'}"
          alt="${company.name} logo"
          class="company-card__logo"
          width="64"
          height="64"
          loading="lazy"
          decoding="async"
          itemprop="logo"
        >

        <div>
          <h3 class="company-card__name" itemprop="name">${company.name}</h3>
          <p class="company-card__category">${company.categoryName}</p>
        </div>

        <p class="company-card__description" itemprop="description">
          ${company.shortDescription}
        </p>

        <div class="company-card__rating" itemprop="aggregateRating" itemscope itemtype="https://schema.org/AggregateRating">
          <div class="stars" aria-label="التقييم: ${company.rating || 0} من 5 نجوم">
            ${generateStars(company.rating || 0)}
          </div>
          <span class="rating-count">${company.reviewCount || 0} تقييم</span>
        </div>

        <div class="company-card__cta">
          <a href="/company/${company.slug}" class="btn" style="width: 100%; justify-content: center;" data-track="company_click" data-company="${company.slug}">
            عرض التفاصيل
          </a>
        </div>
      </article>
    `).join('');

    container.innerHTML = html;

    // Re-initialize lazy loading for new images
    lazyLoadImages();
  };

  // ============================================
  // RENDER: Pagination
  // ============================================
  const renderPagination = (currentPage, totalPages) => {
    const container = document.getElementById('pagination');
    if (!container || totalPages <= 1) {
      if (container) container.innerHTML = '';
      return;
    }

    let html = '';
    const range = getPageRange(currentPage, totalPages);

    // Previous button
    html += `
      <a href="#" class="pagination-button" aria-label="الصفحة السابقة"
         ${currentPage === 1 ? 'disabled' : ''} data-page="${currentPage - 1}">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </a>
    `;

    // Page numbers
    range.forEach(page => {
      if (page === '...') {
        html += '<span class="pagination-ellipsis">...</span>';
      } else {
        html += `
          <a href="#" class="pagination-button ${page === currentPage ? 'active' : ''}"
             aria-label="الصفحة ${page}" aria-current="${page === currentPage ? 'page' : 'false'}"
             data-page="${page}">${page}</a>
        `;
      }
    });

    // Next button
    html += `
      <a href="#" class="pagination-button" aria-label="الصفحة التالية"
         ${currentPage === totalPages ? 'disabled' : ''} data-page="${currentPage + 1}">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </a>
    `;

    container.innerHTML = html;

    // Attach throttled click handler
    container.querySelectorAll('.pagination-button:not(:disabled)').forEach(btn => {
      btn.addEventListener('click', throttle((e) => {
        e.preventDefault();
        const page = parseInt(btn.dataset.page);
        state.page = page;
        searchCompanies(state.searchQuery, page, state.filters);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 300));
    });
  };

  const getPageRange = (current, total) => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = 1; i <= total; i++) {
      if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
        range.push(i);
      }
    }

    let prev = null;
    for (const i of range) {
      if (prev) {
        if (i - prev === 2) rangeWithDots.push(prev + 1);
        else if (i - prev !== 1) rangeWithDots.push('...');
      }
      rangeWithDots.push(i);
      prev = i;
    }

    return rangeWithDots;
  };

  const generateStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    let html = '';
    for (let i = 0; i < fullStars; i++) html += '★';
    if (hasHalfStar) html += '⯨';
    for (let i = 0; i < emptyStars; i++) html += '☆';
    return html;
  };

  // ============================================
  // ANALYTICS: Track events
  // ============================================
  const trackEvent = (eventName, parameters = {}) => {
    if (!config.analyticsEnabled) return;

    if (window.dataLayer) window.dataLayer.push({ event: eventName, ...parameters });
    if (window.gtag) window.gtag('event', eventName, parameters);

    if (navigator.sendBeacon) {
      const payload = JSON.stringify({
        event: eventName,
        parameters,
        url: window.location.href,
        timestamp: Date.now()
      });
      navigator.sendBeacon('/api/analytics/event', payload);
    }
  };

  const trackPageView = () => {
    trackEvent('page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname
    });
  };

  const trackScrollDepth = () => {
    let maxScroll = 0;
    window.addEventListener('scroll', throttle(() => {
      const scrollPercent = Math.round(
        (window.scrollY + window.innerHeight) / document.body.scrollHeight * 100
      );
      if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
        maxScroll = scrollPercent;
        trackEvent('scroll_depth', { percent: scrollPercent });
      }
    }, 250));
  };

  // ============================================
  // INIT: Setup event listeners
  // ============================================
  const initEventListeners = () => {
    // Search form
    const searchForm = document.querySelector('form[role="search"]');
    if (searchForm) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = document.getElementById('search-input')?.value.trim() || document.getElementById('search')?.value.trim();
        if (query && query.length >= 2) {
          state.searchQuery = query;
          state.page = 1;
          searchCompanies(query, 1, state.filters);
          trackEvent('search', { search_term: query });
        }
      });
    }

    // Search input with debounce
    const searchInput = document.getElementById('search-input') || document.getElementById('search');
    if (searchInput) {
      const debouncedSearch = debounce((value) => {
        if (value.length >= 2) {
          state.searchQuery = value;
          state.page = 1;
          searchCompanies(value, 1, state.filters);
          trackEvent('search_suggestion', { search_term: value });
        }
      }, config.searchDebounceMs);

      searchInput.addEventListener('input', (e) => {
        debouncedSearch(e.target.value.trim());
      });
    }

    // Track clicks on tracked elements
    document.addEventListener('click', (e) => {
      const tracked = e.target.closest('[data-track]');
      if (tracked) {
        const action = tracked.dataset.track;
        const params = {
          element: tracked.tagName.toLowerCase(),
          text: tracked.textContent.trim().slice(0, 50)
        };

        ['category', 'company', 'type'].forEach(attr => {
          if (tracked.dataset[attr]) params[attr] = tracked.dataset[attr];
        });

        trackEvent(action, params);
      }

      // External links
      if (e.target.tagName === 'A' && e.target.hostname !== window.location.hostname) {
        trackEvent('external_link_click', {
          url: e.target.href,
          text: e.target.textContent.trim().slice(0, 50)
        });
      }
    });

    // Track scroll depth
    trackScrollDepth();
  };

  // ============================================
  // FALLBACK DATA
  // ============================================
  const getFallbackCategories = () => [
    { id: 1, name: 'Fintech', slug: 'fintech', description: 'حلول مالية وبنكية', count: 45, icon: '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>' },
    { id: 2, name: 'E-commerce', slug: 'ecommerce', description: 'منصات التجارة الإلكترونية', count: 38, icon: '<circle cx="12" cy="12" r="10"/>' },
    { id: 3, name: 'Healthcare', slug: 'healthcare', description: 'الرعاية الصحية الرقمية', count: 24, icon: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>' },
    { id: 4, name: 'Logistics', slug: 'logistics', description: 'إدارة سلسلة التوريد', count: 31, icon: '<rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle>' }
  ];

  // ============================================
  // INITIALIZE
  // ============================================
  const init = async () => {
    console.log('🚀 SaudiSaaSHub Initializing...');

    // Initialize starfield with Web Worker
    initStarfield();

    // Load initial data
    await Promise.all([
      loadCategories(),
      loadFeaturedCompanies()
    ]);

    // Fill in skeleton stats with animation
    const statsContainer = document.getElementById('stats-container');
    if (statsContainer) {
      setTimeout(() => {
        statsContainer.innerHTML = `
          <div class="stat">
            <span class="stat-number" data-count="500">0</span>
            <span class="stat-label">شركة SaaS</span>
          </div>
          <div class="stat">
            <span class="stat-number" data-count="12">0</span>
            <span class="stat-label">فئة</span>
          </div>
          <div class="stat">
            <span class="stat-number" data-count="5000">0</span>
            <span class="stat-label">مستخدم</span>
          </div>
        `;

        // Animate counters
        const counters = statsContainer.querySelectorAll('[data-count]');
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const target = parseInt(entry.target.dataset.count);
              let current = 0;
              const inc = target / 50;
              const timer = setInterval(() => {
                current += inc;
                if (current >= target) {
                  entry.target.textContent = target;
                  clearInterval(timer);
                } else {
                  entry.target.textContent = Math.floor(current);
                }
              }, 30);
              observer.unobserve(entry.target);
            }
          });
        });
        counters.forEach(c => observer.observe(c));
      }, 500); // Small delay to show skeleton briefly
    }

    // Setup analytics
    trackPageView();
    initEventListeners();

    // Idle tasks
    scheduleIdleTask(() => {
      if (state.searchQuery) {
        fetch(`${config.apiBase}/search?q=${encodeURIComponent(state.searchQuery)}&page=2`)
          .then(r => r.json())
          .then(data => sessionStorage.setItem('preloaded_search', JSON.stringify(data)))
          .catch(() => {});
      }
    });

    console.log('✅ SaudiSaaSHub Ready');
  };

  return {
    init,
    trackEvent,
    searchCompanies,
    config
  };
})();

// Start the app
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', App.init);
} else {
  App.init();
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = App;
}
