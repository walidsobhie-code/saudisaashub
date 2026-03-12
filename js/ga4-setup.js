/**
 * SaudiSaaSHub - Google Analytics 4 Setup
 * Comprehensive tracking configuration with custom dimensions and events
 */

(function() {
  'use strict';

  // ============================================
  // CONFIGURATION
  // ============================================
  const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with actual GA4 ID
  const GA4_API_SECRET = ''; // Optional for Measurement Protocol

  // Custom Dimensions (configure in GA4 admin first)
  const CUSTOM_DIMENSIONS = {
    LANGUAGE: 'dimension1',
    CATEGORY: 'dimension2',
    COMPANY_TYPE: 'dimension3',
    USER_TYPE: 'dimension4',
    REGION: 'dimension5'
  };

  // Custom Events
  const EVENTS = {
    SEARCH: 'search',
    FILTER_APPLY: 'filter_apply',
    COMPANY_CLICK: 'company_click',
    CATEGORY_CLICK: 'category_click',
    COMPARISON_START: 'comparison_start',
    COMPARISON_COMPLETE: 'comparison_complete',
    NEWSLETTER_SIGNUP: 'newsletter_signup',
    COMPANY_SUBMIT: 'company_submit',
    SHARE_CLICK: 'share_click',
    EXTERNAL_LINK: 'external_link',
    SCROLL_DEPTH: 'scroll_depth',
    VIDEO_PLAY: 'video_play',
    DOWNLOAD_CLICK: 'download_click'
  };

  // ============================================
  // GTAG INITIALIZATION
  // ============================================
  window.dataLayer = window.dataLayer || [];

  function gtag() {
    window.dataLayer.push(arguments);
  }

  gtag('js', new Date());
  gtag('config', GA4_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href,
    page_path: window.location.pathname,
    // Enable debug mode in development
    debug_mode: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1',
    // Send user ID if available
    // user_id: getUserId()
  });

  // Expose gtag globally
  window.gtag = gtag;

  // ============================================
  // AUTO-EVENTS: Outbound link tracking
  // ============================================
  const trackOutboundLinks = () => {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;

      const url = new URL(href, window.location.origin);
      if (url.hostname !== window.location.hostname) {
        gtag('event', EVENTS.EXTERNAL_LINK, {
          event_category: 'outbound',
          event_label: url.href,
            link_url: url.href,
          page_path: window.location.pathname
        });
      }
    });
  };

  // ============================================
  // AUTO-EVENTS: File downloads
  // ============================================
  const trackDownloads = () => {
    const extensions = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.zip', '.exe', '.dmg'];
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;

      if (extensions.some(ext => href.toLowerCase().endsWith(ext))) {
        gtag('event', EVENTS.DOWNLOAD_CLICK, {
          event_category: 'download',
          event_label: href,
          file_type: href.split('.').pop().toLowerCase(),
          page_path: window.location.pathname
        });
      }
    });
  };

  // ============================================
  // AUTO-EVENTS: Scroll depth tracking
  // ============================================
  const trackScrollDepth = () => {
    const milestones = [25, 50, 75, 90, 100];
    const reached = new Set();

    const checkScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY + window.innerHeight) / document.body.scrollHeight * 100
      );

      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !reached.has(milestone)) {
          reached.add(milestone);
          gtag('event', EVENTS.SCROLL_DEPTH, {
            percent: milestone,
            page_title: document.title,
            page_path: window.location.pathname
          });
        }
      });
    };

    // Throttle scroll events
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
  };

  // ============================================
  // PUBLIC API: Enhanced track function
  // ============================================
  window.SaudiSaaSHubAnalytics = {
    track: function(eventName, params = {}) {
      gtag('event', eventName, {
        ...params,
        page_location: window.location.href,
        page_path: window.location.pathname,
        timestamp: Date.now()
      });
    },

    trackSearch: function(query, resultCount) {
      this.track(EVENTS.SEARCH, {
        search_term: query,
        result_count: resultCount || 0
      });
    },

    trackFilter: function(filterType, filterValue, resultCount) {
      this.track(EVENTS.FILTER_APPLY, {
        filter_type: filterType,
        filter_value: filterValue,
        result_count: resultCount || 0
      });
    },

    trackCompanyClick: function(companySlug, companyName, position) {
      this.track(EVENTS.COMPANY_CLICK, {
        company_id: companySlug,
        company_name: companyName,
        result_position: position || 0,
        page_path: window.location.pathname
      });
    },

    trackComparison: function(companyIds, count) {
      this.track(EVENTS.COMPARISON_COMPLETE, {
        company_ids: companyIds.join(','),
        comparison_count: count || companyIds.length
      });
    },

    trackConversion: function(conversionType, value = 1) {
      gtag('event', 'conversion', {
        send_to: GA4_MEASUREMENT_ID + '/event_name', // Configure conversion event in GA4
        value: value,
        currency: 'SAR'
      });
    },

    setUserProperties: function(properties) {
      gtag('set', 'user_properties', properties);
    },

    setUserId: function(userId) {
      gtag('config', GA4_MEASUREMENT_ID, {
        user_id: userId
      });
    },

    reset: function() {
      gtag('config', GA4_MEASUREMENT_ID, {
        'allow_ad_personalization_signals': false
      });
    }
  };

  // ============================================
  // INITIALIZE AUTO-TRACKING
  // ============================================
  document.addEventListener('DOMContentLoaded', () => {
    trackOutboundLinks();
    trackDownloads();
    trackScrollDepth();

    console.log('✅ GA4 Analytics initialized');
  });

  // ============================================
  // CONSENT MANAGEMENT (for GDPR compliance)
  // ============================================
  window.SaudiSaaSHubConsent = {
    hasConsent: false,

    init: function() {
      // Check for existing consent
      const consent = localStorage.getItem('saudisaashub_consent');
      if (consent) {
        this.hasConsent = JSON.parse(consent).analytics === true;
        if (this.hasConsent) {
          this.enableTracking();
        }
      } else {
        // Show consent banner
        this.showBanner();
      }
    },

    showBanner: function() {
      const banner = document.createElement('div');
      banner.id = 'consent-banner';
      banner.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: var(--color-neutral-800, #1f2937);
        color: white;
        padding: 1rem;
        z-index: 99999;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
      `;

      banner.innerHTML = `
        <p style="flex: 1; margin: 0; font-size: 0.875rem;">
          نحن نستخدم الكookies لتحسين تجربتك وتحليل أداء الموقع.
          <a href="/privacy" style="color: var(--color-accent, #c9a227);">معرفة المزيد</a>
        </p>
        <div style="display: flex; gap: 0.5rem;">
          <button id="consent-accept" class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
            قبول
          </button>
          <button id="consent-reject" class="btn" style="padding: 0.5rem 1rem; font-size: 0.875rem; background: var(--color-neutral-600, #4b5563);">
            رفض
          </button>
        </div>
      `;

      document.body.appendChild(banner);

      document.getElementById('consent-accept').addEventListener('click', () => {
        this.giveConsent(true);
      });

      document.getElementById('consent-reject').addEventListener('click', () => {
        this.giveConsent(false);
      });
    },

    giveConsent: function(analyticsConsent) {
      localStorage.setItem('saudisaashub_consent', JSON.stringify({
        analytics: analyticsConsent,
        timestamp: Date.now()
      }));

      this.hasConsent = analyticsConsent;
      document.getElementById('consent-banner')?.remove();

      if (analyticsConsent) {
        this.enableTracking();
      }
    },

    enableTracking: function() {
      // Re-enable GA4
      gtag('config', GA4_MEASUREMENT_ID, {
        'allow_ad_personalization_signals': true
      });
    }
  };

  // Auto-init consent if required (uncomment to enable)
  // window.SaudiSaaSHubConsent.init();

})();
