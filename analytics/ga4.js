/**
 * SaudiSaaSHub Analytics - GA4 Configuration Module
 *
 * This module provides comprehensive tracking for SaudiSaaSHub with:
 * - GA4 event tracking
 * - Custom dimensions and metrics
 * - GDPR consent management
 * - dataLayer integration for GTM
 *
 * Setup: Replace 'G-XXXXXXXXXX' with your actual GA4 Measurement ID
 */

(function() {
    'use strict';

    // ============================================
    // CONFIGURATION
    // ============================================

    const CONFIG = {
        // ⚠️ REPLACE THIS WITH YOUR GA4 MEASUREMENT ID
        measurementId: 'G-XXXXXXXXXX',

        // Enable debug mode (logs events to console)
        debug: false,

        // GDPR Consent defaults (false until user consents)
        consent: {
            analytics_storage: false,
            ad_storage: false,
            functionality_storage: false,
            personalization_storage: false
        },

        // Custom Dimensions Setup (configure in GA4 UI first)
        customDimensions: {
            language: 'custom_dim_language',      // e.g., 'ar', 'en'
            category: 'custom_dim_category',      // e.g., ' SaaS', 'Dev Tools'
            company_type: 'custom_dim_company_type', // e.g., 'Startup', 'Enterprise'
            region: 'custom_dim_region'           // e.g., 'Riyadh', 'Jeddah'
        },

        // DataLayer name (for GTM integration)
        dataLayerName: 'dataLayer'
    };

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================

    const utils = {
        /**
         * Check if analytics is allowed based on consent
         */
        isAnalyticsAllowed: function() {
            return CONFIG.consent.analytics_storage;
        },

        /**
         * Generate a unique session identifier
         */
        getSessionId: function() {
            let sessionId = sessionStorage.getItem('ss_ga_session_id');
            if (!sessionId) {
                sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                sessionStorage.setItem('ss_ga_session_id', sessionId);
            }
            return sessionId;
        },

        /**
         * Log debug messages
         */
        log: function(...args) {
            if (CONFIG.debug) {
                console.log('[GA4]', ...args);
            }
        },

        /**
         * Sanitize event parameters (remove undefined, limit string lengths)
         */
        sanitizeParams: function(params) {
            const sanitized = {};
            for (const [key, value] of Object.entries(params)) {
                if (value === undefined || value === null) continue;

                // GA4 parameter limits
                if (typeof value === 'string' && value.length > 100) {
                    sanitized[key] = value.substring(0, 100);
                } else if (typeof value === 'number' && !isFinite(value)) {
                    sanitized[key] = 0;
                } else {
                    sanitized[key] = value;
                }
            }
            return sanitized;
        }
    };

    // ============================================
    // GDPR CONSENT MANAGEMENT
    // ============================================

    const consentManager = {
        /**
         * Initialize consent management
         */
        init: function() {
            this.loadStoredConsent();
            this.bindConsentCallbacks();
            utils.log('Consent manager initialized');
        },

        /**
         * Load consent from localStorage
         */
        loadStoredConsent: function() {
            try {
                const stored = localStorage.getItem('saudisaashub_consent');
                if (stored) {
                    const consent = JSON.parse(stored);
                    CONFIG.consent = { ...CONFIG.consent, ...consent };
                    utils.log('Consent loaded:', consent);
                }
            } catch (e) {
                utils.log('Failed to load consent:', e);
            }
        },

        /**
         * Save consent to localStorage
         */
        saveConsent: function(consent) {
            try {
                localStorage.setItem('saudisaashub_consent', JSON.stringify(consent));
                CONFIG.consent = { ...CONFIG.consent, ...consent };
                utils.log('Consent saved:', consent);

                // Reinitialize GA if consent given
                if (consent.analytics_storage && typeof ga !== 'undefined') {
                    this.enableAnalytics();
                }
            } catch (e) {
                utils.log('Failed to save consent:', e);
            }
        },

        /**
         * Bind consent UI callbacks
         */
        bindConsentCallbacks: function() {
            // Expose global callback for consent banner
            window.ssConsentGranted = (consent) => {
                this.saveConsent(consent);
            };

            // Listen for consent updates from GTM if present
            window.addEventListener('message', (event) => {
                if (event.data && event.data.consent) {
                    this.saveConsent(event.data.consent);
                }
            });
        },

        /**
         * Enable analytics after consent
         */
        enableAnalytics: function() {
            if (typeof ga === 'undefined') return;

            ga('set', 'allow_ad_personalization_signals', CONFIG.consent.ad_storage);
            ga('set', 'allow_google_signals', CONFIG.consent.ad_storage);
            utils.log('Analytics enabled with consent:', CONFIG.consent);
        },

        /**
         * Get current consent status
         */
        getConsent: function() {
            return { ...CONFIG.consent };
        }
    };

    // ============================================
    // DATA LAYER & GTM INTEGRATION
    // ============================================

    const dataLayer = {
        /**
         * Push event to dataLayer (for GTM)
         */
        push: function(eventName, parameters = {}) {
            const data = {
                event: eventName,
                ...utils.sanitizeParams(parameters)
            };

            // Push to global dataLayer if it exists
            if (typeof window[CONFIG.dataLayerName] !== 'undefined') {
                window[CONFIG.dataLayerName].push(data);
            }

            // Also push directly to GA4 if available and consent given
            if (utils.isAnalyticsAllowed()) {
                this.pushToGA4(eventName, parameters);
            }

            utils.log('DataLayer push:', eventName, parameters);
        },

        /**
         * Push event directly to GA4
         */
        pushToGA4: function(eventName, parameters) {
            if (typeof ga !== 'undefined') {
                ga('send', 'event', eventName, utils.sanitizeParams(parameters));
            }
        }
    };

    // ============================================
    // GA4 EVENT TRACKING
    // ============================================

    const tracker = {
        /**
         * Initialize GA4
         */
        init: function() {
            if (CONFIG.measurementId === 'G-XXXXXXXXXX') {
                utils.log('WARNING: Please set your GA4 Measurement ID');
                return;
            }

            // Load GA4 script
            const script = document.createElement('script');
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtag/js?id=${CONFIG.measurementId}`;
            document.head.appendChild(script);

            // Initialize GA4
            window.dataLayer = window.dataLayer || [];
            window.gtag = function() {
                window.dataLayer.push(arguments);
            };

            gtag('js', new Date());
            gtag('config', CONFIG.measurementId, {
                // Set custom dimensions as user properties
                user_properties: {
                    language: { value: 'unknown' },
                    region: { value: 'unknown' }
                },
                // Anonymize IP for GDPR
                anonymize_ip: true
            });

            // Configure consent mode
            gtag('consent', 'default', {
                ad_storage: 'denied',
                analytics_storage: 'denied',
                wait_for_update: 500
            });

            utils.log('GA4 initialized with Measurement ID:', CONFIG.measurementId);
        },

        /**
         * Track page view
         */
        pageview: function(path = window.location.pathname, title = document.title) {
            if (!utils.isAnalyticsAllowed()) return;

            gtag('event', 'page_view', {
                page_path: path,
                page_title: title,
                page_location: window.location.href
            });
            utils.log('Page view tracked:', path);
        },

        /**
         * Track search query
         */
        search: function(searchTerm, resultsCount) {
            if (!utils.isAnalyticsAllowed()) return;

            dataLayer.push('search', {
                search_term: searchTerm,
                results_count: resultsCount,
                // Set custom dimension for category if available
                ...this.getCurrentContext()
            });

            // Also send to GA4 directly
            gtag('event', 'search', {
                search_term: searchTerm,
                results_count: resultsCount
            });
        },

        /**
         * Track filter usage
         */
        filter: function(filterType, filterValue) {
            if (!utils.isAnalyticsAllowed()) return;

            dataLayer.push('filter_used', {
                filter_type: filterType,
                filter_value: filterValue
            });
        },

        /**
         * Track company card click
         */
        companyCardClick: function(companyId, companyName, position) {
            if (!utils.isAnalyticsAllowed()) return;

            dataLayer.push('company_card_click', {
                company_id: companyId,
                company_name: companyName,
                card_position: position
            });
        },

        /**
         * Track comparison tool usage
         */
        comparison: function(companiesCount, action) {
            if (!utils.isAnalyticsAllowed()) return;

            dataLayer.push('comparison_tool', {
                companies_count: companiesCount,
                comparison_action: action // 'open' or 'export'
            });
        },

        /**
         * Track newsletter signup
         */
        newsletterSignup: function(emailDomain, success) {
            if (!utils.isAnalyticsAllowed()) return;

            dataLayer.push('newsletter_signup', {
                email_domain: emailDomain,
                signup_success: success
            });
        },

        /**
         * Track language toggle
         */
        languageToggle: function(from, to) {
            if (!utils.isAnalyticsAllowed()) return;

            dataLayer.push('language_toggle', {
                language_from: from,
                language_to: to
            });

            // Update user property
            gtag('set', {
                user_properties: {
                    language: { value: to }
                }
            });
        },

        /**
         * Track category navigation
         */
        categoryNav: function(categoryName, clickCount) {
            if (!utils.isAnalyticsAllowed()) return;

            dataLayer.push('category_navigation', {
                category_name: categoryName,
                click_count: clickCount
            });

            // Update custom dimension
            gtag('set', {
                custom_dim_category: categoryName
            });
        },

        /**
         * Get current context (language, category, etc.)
         */
        getCurrentContext: function() {
            // Extract from DOM or global state
            return {
                custom_dim_language: document.documentElement.lang || 'unknown',
                custom_dim_category: this.getCurrentCategory() || 'unknown',
                custom_dim_company_type: this.getCompanyType() || 'unknown',
                custom_dim_region: this.getCurrentRegion() || 'unknown'
            };
        },

        /**
         * Get current category from page
         */
        getCurrentCategory: function() {
            // Try to extract from URL or data attributes
            const categoryEl = document.querySelector('[data-category], .category-badge, .breadcrumb-current');
            if (categoryEl) {
                return categoryEl.textContent.trim();
            }
            return null;
        },

        /**
         * Get company type (would come from backend)
         */
        getCompanyType: function() {
            // Placeholder - would be populated from backend data
            return null;
        },

        /**
         * Get current region (from geolocation or user settings)
         */
        getCurrentRegion: function() {
            // Could be from URL, data attribute, or geolocation API
            const regionEl = document.querySelector('[data-region]');
            if (regionEl) {
                return regionEl.dataset.region;
            }
            return null;
        },

        /**
         * Set user properties (for logged-in users)
         */
        setUserProperties: function(properties) {
            if (!utils.isAnalyticsAllowed()) return;

            gtag('set', {
                user_properties: utils.sanitizeParams(properties)
            });
        }
    };

    // ============================================
    // AUTOMATIC TRACKING
    // ============================================

    const autoTracker = {
        init: function() {
            this.setupClickTracking();
            this.setupSearchTracking();
            utils.log('Auto-tracker initialized');
        },

        /**
         * Set up automatic click tracking for interactive elements
         */
        setupClickTracking: function() {
            document.addEventListener('click', (e) => {
                const target = e.target.closest('[data-track]');
                if (!target) return;

                const trackType = target.dataset.track;
                const params = {};

                // Extract data attributes
                for (let i = 0; i < target.attributes.length; i++) {
                    const attr = target.attributes[i];
                    if (attr.name.startsWith('data-') && attr.name !== 'data-track') {
                        const key = attr.name.replace('data-', '').replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                        params[key] = attr.value;
                    }
                }

                // Track based on type
                switch (trackType) {
                    case 'company':
                        tracker.companyCardClick(
                            params.companyId || target.dataset.companyId,
                            params.companyName || target.dataset.companyName,
                            params.position || target.dataset.position
                        );
                        break;
                    case 'comparison':
                        tracker.comparison(
                            params.companiesCount || 1,
                            params.action || 'open'
                        );
                        break;
                    case 'newsletter':
                        tracker.newsletterSignup(
                            params.emailDomain || '',
                            params.success !== 'false'
                        );
                        break;
                    case 'language':
                        tracker.languageToggle(params.from, params.to);
                        break;
                    case 'category':
                        tracker.categoryNav(params.categoryName, params.clickCount || 1);
                        break;
                }
            }, true);
        },

        /**
         * Set up search form tracking
         */
        setupSearchTracking: function() {
            // Track search form submissions
            document.addEventListener('submit', (e) => {
                if (e.target.matches('form[data-track="search"]')) {
                    const input = e.target.querySelector('input[type="text"], input[type="search"]');
                    if (input) {
                        const term = input.value.trim();
                        if (term) {
                            // Results count would come from backend - using placeholder
                            tracker.search(term, 0);
                        }
                    }
                }
            });

            // Also track search input with debounce if real-time needed
            const searchInputs = document.querySelectorAll('input[data-track="search-realtime"]');
            searchInputs.forEach(input => {
                let timeout;
                input.addEventListener('input', (e) => {
                    clearTimeout(timeout);
                    timeout = setTimeout(() => {
                        const term = e.target.value.trim();
                        if (term && term.length >= 2) {
                            // Would need AJAX to get real results count
                            tracker.search(term, 0);
                        }
                    }, 500);
                });
            });
        }
    };

    // ============================================
    // INITIALIZATION
    // ============================================

    const SaudiSaaSHubAnalytics = {
        /**
         * Initialize analytics module
         */
        init: function(options = {}) {
            // Apply options
            if (options.measurementId) CONFIG.measurementId = options.measurementId;
            if (typeof options.debug === 'boolean') CONFIG.debug = options.debug;
            if (options.consent) consentManager.saveConsent(options.consent);

            // Initialize components
            consentManager.init();
            tracker.init();
            autoTracker.init();

            // Track initial pageview
            setTimeout(() => {
                tracker.pageview();
            }, 1000);

            utils.log('SaudiSaaSHub Analytics initialized');
        },

        /**
         * Manually grant consent
         */
        grantConsent: function(consent) {
            consentManager.saveConsent(consent);
        },

        /**
         * Get consent status
         */
        getConsent: function() {
            return consentManager.getConsent();
        },

        /**
         * Track custom event
         */
        track: function(eventName, parameters = {}) {
            tracker[eventName] ? tracker[eventName](...Object.values(parameters)) : dataLayer.push(eventName, parameters);
        },

        /**
         * Set user properties
         */
        setUser: function(properties) {
            tracker.setUserProperties(properties);
        },

        /**
         * Get debug status
         */
        isDebug: function() {
            return CONFIG.debug;
        },

        /**
         * Set debug mode
         */
        setDebug: function(enabled) {
            CONFIG.debug = enabled;
        }
    };

    // Expose globally
    window.ssAnalytics = SaudiSaaSHubAnalytics;

    // Auto-initialize on DOM ready if not already loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            SaudiSaaSHubAnalytics.init();
        });
    } else {
        SaudiSaaSHubAnalytics.init();
    }

})();
