/**
 * SaudiSaaSHub - Main Application JavaScript
 * Performance-optimized, modular, and SEO-friendly
 */

// Module pattern to avoid global scope pollution
const App = (() => {
  'use strict';

  // Configuration
  const config = {
    apiBase: '/api',
    itemsPerPage: 20,
    lazyLoadThreshold: 0.1,
    searchDebounceMs: 300,
    analyticsEnabled: true
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
              img.src = src;
              img.removeAttribute('data-src');
              img.classList.add('loaded');
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
      // Fallback for older browsers
      document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
      });
    }
  };

  // ============================================
  // PERFORMANCE: Debounce for search input
  // ============================================
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
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
  // CORE: Fetch data from API with caching
  // ============================================
  const fetchWithCache = async (key, fetchFn, ttl = 300000) => {
    const cached = localStorage.getItem(key);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < ttl) {
        return data;
      }
    }

    try {
      const data = await fetchFn();
      localStorage.setItem(key, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      // Return cached version if available even if expired
      if (cached) {
        return JSON.parse(cached).data;
      }
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
      // Load fallback data
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
        180000 // 3 minutes cache
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
        <div style="margin-top: auto; padding-top: var(--space-3); font-size: var(--text-sm); color: var(--color-neutral-500);">
          ${cat.count} أداة
        </div>
      </a>
    `).join('');

    container.innerHTML = html;
  };

  // ============================================
  // RENDER: Company cards
  // ============================================
  const renderCompanies = (companies, containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (companies.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: var(--space-16);">
          <h3 style="color: var(--color-neutral-600); margin-bottom: var(--space-4);">لا توجد نتائج</h3>
          <p style="color: var(--color-neutral-500);">جرب البحث بكلمات مختلفة أو تصفح التصنيفات.</p>
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
          loading="lazy"
          width="64"
          height="64"
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

    // Previous button
    html += `
      <a
        href="#"
        class="pagination-button"
        aria-label="الصفحة السابقة"
        ${currentPage === 1 ? 'disabled' : ''}
        data-page="${currentPage - 1}"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </a>
    `;

    // Page numbers
    const range = getPageRange(currentPage, totalPages);
    range.forEach(page => {
      if (page === '...') {
        html += '<span class="pagination-ellipsis">...</span>';
      } else {
        html += `
          <a
            href="#"
            class="pagination-button ${page === currentPage ? 'active' : ''}"
            aria-label="الصفحة ${page}"
            aria-current="${page === currentPage ? 'page' : 'false'}"
            data-page="${page}"
          >
            ${page}
          </a>
        `;
      }
    });

    // Next button
    html += `
      <a
        href="#"
        class="pagination-button"
        aria-label="الصفحة التالية"
        ${currentPage === totalPages ? 'disabled' : ''}
        data-page="${currentPage + 1}"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </a>
    `;

    container.innerHTML = html;

    // Attach event listeners
    container.querySelectorAll('.pagination-button:not(:disabled)').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const page = parseInt(btn.dataset.page);
        state.page = page;
        searchCompanies(state.searchQuery, page, state.filters);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  };

  // Helper: Get page range for pagination
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
        if (i - prev === 2) {
          rangeWithDots.push(prev + 1);
        } else if (i - prev !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      prev = i;
    }

    return rangeWithDots;
  };

  // Helper: Generate star rating HTML
  const generateStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    let html = '';
    for (let i = 0; i < fullStars; i++) {
      html += '★';
    }
    if (hasHalfStar) {
      html += '⯨';
    }
    for (let i = 0; i < emptyStars; i++) {
      html += '☆';
    }
    return html;
  };

  // ============================================
  // ANALYTICS: Track events (GA4 compatible)
  // ============================================
  const trackEvent = (eventName, parameters = {}) => {
    if (!config.analyticsEnabled) return;

    // Push to dataLayer for GTM
    if (window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ...parameters
      });
    }

    // Direct GA4 tracking if gtag is available
    if (window.gtag) {
      window.gtag('event', eventName, parameters);
    }

    // Send to custom analytics endpoint
    if (navigator.sendBeacon) {
      const payload = JSON.stringify({
        event: eventName,
        parameters,
        url: window.location.href,
        timestamp: Date.now(),
        userAgent: navigator.userAgent
      });
      navigator.sendBeacon('/api/analytics/event', payload);
    }
  };

  // ============================================
  // ANALYTICS: Track page view
  // ============================================
  const trackPageView = () => {
    trackEvent('page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname
    });
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
        const query = document.getElementById('search-input').value.trim();
        if (query.length >= 2) {
          state.searchQuery = query;
          state.page = 1;
          searchCompanies(query, 1, state.filters);
          trackEvent('search', { search_term: query });
        }
      });
    }

    // Search input with debounce
    const searchInput = document.getElementById('search-input');
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

    // Track clicks on filtered elements
    document.addEventListener('click', (e) => {
      const tracked = e.target.closest('[data-track]');
      if (tracked) {
        const action = tracked.dataset.track;
        const params = {
          element: tracked.tagName.toLowerCase(),
          text: tracked.textContent.trim().slice(0, 50)
        };

        // Add custom data attributes
        ['category', 'company', 'type'].forEach(attr => {
          if (tracked.dataset[attr]) {
            params[attr] = tracked.dataset[attr];
          }
        });

        trackEvent(action, params);
      }

      // Track external links
      if (e.target.tagName === 'A' && e.target.hostname !== window.location.hostname) {
        trackEvent('external_link_click', {
          url: e.target.href,
          text: e.target.textContent.trim().slice(0, 50)
        });
      }
    });

    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', debounce(() => {
      const scrollPercent = Math.round(
        (window.scrollY + window.innerHeight) / document.body.scrollHeight * 100
      );
      if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
        maxScroll = scrollPercent;
        trackEvent('scroll_depth', { percent: scrollPercent });
      }
    }, 250));

    // Track comparison tool usage
    const compareButtons = document.querySelectorAll('[data-compare]');
    compareButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const companyIds = Array.from(
          document.querySelectorAll('.compare-checkbox:checked')
        ).map(cb => cb.dataset.companyId);
        trackEvent('compare_companies', {
          count: companyIds.length,
          ids: companyIds.join(',')
        });
      });
    });
  };

  // ============================================
  // CORE: Initialize application
  // ============================================
  const init = async () => {
    console.log('🚀 SaudiSaaSHub Initializing...');

    // Load initial data
    await Promise.all([
      loadCategories(),
      loadFeaturedCompanies()
    ]);

    // Setup analytics
    trackPageView();

    // Initialize event listeners
    initEventListeners();

    // Perform non-critical tasks during idle time
    scheduleIdleTask(() => {
      // Preload next page of results in background
      if (state.searchQuery) {
        fetch(`${config.apiBase}/search?q=${encodeURIComponent(state.searchQuery)}&page=2`)
          .then(r => r.json())
          .then(data => {
            // Cache for faster subsequent loads
            sessionStorage.setItem('preloaded_search', JSON.stringify(data));
          })
          .catch(() => {}); // Silent fail
      }
    });

    console.log('✅ SaudiSaaSHub Ready');
  };

  // Public API
  return {
    init,
    trackEvent,
    searchCompanies,
    config
  };
})();

// Start the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', App.init);
} else {
  App.init();
}

// Export for external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = App;
}
