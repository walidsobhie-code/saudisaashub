# SaudiSaaSHub Analytics - Usage Examples

Quick examples for implementing tracking in SaudiSaaSHub.

---

## Quick Start

```html
<!-- Add before </body> -->
<script src="/analytics/ga4.js"></script>
<script>
    ssAnalytics.init({
        debug: false  // Set true for testing
    });
</script>
```

---

## Automatic Tracking (Recommended)

### Add data attributes to HTML elements:

```html
<!-- Search form -->
<form data-track="search">
    <input type="search" name="query" placeholder="Search SaaS tools...">
    <button type="submit">Search</button>
</form>

<!-- Company card -->
<div class="company-card"
     data-track="company"
     data-company-id="cmp_123"
     data-company-name="Zoho CRM"
     data-position="1">
</div>

<!-- Comparison tool -->
<button data-track="comparison"
        data-companies-count="2"
        data-action="open">
    Compare Companies
</button>

<button data-track="comparison"
        data-companies-count="2"
        data-action="export">
    Export to PDF
</button>

<!-- Newsletter signup -->
<form data-track="newsletter">
    <input type="email" name="email" placeholder="your@email.com">
    <button type="submit">Subscribe</button>
</form>

<!-- Language toggle -->
<button data-track="language"
        data-from="en"
        data-to="ar">
    العربية
</button>

<!-- Category navigation -->
<a href="/category/crm"
   data-track="category"
   data-category-name="CRM Software"
   data-click-count="1">
    CRM Software
</a>
```

---

## Manual Tracking

### Track a search query

```javascript
const searchTerm = document.querySelector('#search-input').value;
const resultsCount = 15; // Get from your backend

ssAnalytics.track('search', {
    search_term: searchTerm,
    results_count: resultsCount
});
```

### Track filter usage

```javascript
// Region filter
ssAnalytics.track('filter_used', {
    filter_type: 'region',
    filter_value: 'Riyadh'
});

// Category filter
ssAnalytics.track('filter_used', {
    filter_type: 'category',
    filter_value: 'CRM'
});
```

### Track company card click

```javascript
const companyCard = event.currentTarget;
ssAnalytics.track('company_card_click', {
    company_id: companyCard.dataset.companyId,
    company_name: companyCard.dataset.companyName,
    card_position: companyCard.dataset.position
});
```

### Track comparison tool

```javascript
// Open comparison
const selectedCompanies = getSelectedCompanies(); // Your logic
ssAnalytics.track('comparison', {
    companies_count: selectedCompanies.length,
    comparison_action: 'open'
});

// Export comparison
ssAnalytics.track('comparison', {
    companies_count: selectedCompanies.length,
    comparison_action: 'export'
});
```

### Track newsletter signup

```javascript
fetch('/api/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email: userEmail })
})
.then(res => res.json())
.then(data => {
    const domain = userEmail.split('@')[1];
    ssAnalytics.track('newsletter_signup', {
        email_domain: domain,
        signup_success: data.success
    });
});
```

### Track language toggle

```javascript
const currentLang = document.documentElement.lang;
const newLang = currentLang === 'ar' ? 'en' : 'ar';

ssAnalytics.track('language_toggle', {
    language_from: currentLang,
    language_to: newLang
});
```

### Track category navigation

```javascript
const categoryEl = event.currentTarget;
ssAnalytics.track('category_navigation', {
    category_name: categoryEl.dataset.category,
    click_count: 1
});
```

---

## User Properties

Set user properties for logged-in users:

```javascript
if (window.currentUser) {
    ssAnalytics.setUser({
        user_id: window.currentUser.id,
        language: window.currentUser.language,
        company_type: window.currentUser.companyType || 'Unknown',
        region: window.currentUser.region || 'Unknown'
    });
}
```

**Important:** Never send PII (email, name, phone) as user properties.

---

## Consent Management

### Check current consent

```javascript
const consent = ssAnalytics.getConsent();
console.log(consent);
// { analytics_storage: true, ad_storage: false, ... }
```

### Grant consent (for your consent banner)

```javascript
// User clicks "Accept"
ssAnalytics.grantConsent({
    analytics_storage: true,
    ad_storage: false,
    functionality_storage: true,
    personalization_storage: false
});
```

### Check if analytics is enabled

```javascript
if (ssAnalytics.isAnalyticsAllowed()) {
    // Track events
    ssAnalytics.track('page_view');
}
```

---

## Debug Mode

### Enable debug mode

```javascript
// In code
ssAnalytics.init({
    debug: true
});

// Or after initialization
ssAnalytics.setDebug(true);
```

### Debug output

In browser console, you'll see:

```
[GA4] GA4 initialized with Measurement ID: G-XXXXXXXXXX
[GA4] Consent loaded: {analytics_storage: true}
[GA4] DataLayer push: search {search_term: "CRM", results_count: 15}
[GA4] Page view tracked: /companies/zoho-crm
```

---

## Testing Checklist

- [ ] Measurement ID replaced in ga4.js
- [ ] Script loads without errors (check Network tab)
- [ ] Console shows `[GA4]` logs
- [ ] DebugView shows events (with ?gtm_debug=x or debug=true)
- [ ] Custom dimensions are registered in GA4 Admin
- [ ] Events appear in GA4 Realtime report
- [ ] Consent banner works correctly
- [ ] No PII is sent in any event

---

## Examples by Page Type

### Homepage

```javascript
// Category click on homepage
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
        ssAnalytics.track('category_navigation', {
            category_name: card.dataset.category,
            click_count: 1
        });
    });
});
```

### Search Results Page

```javascript
// Track search results click
document.querySelectorAll('.result-item').forEach((item, index) => {
    item.addEventListener('click', () => {
        ssAnalytics.track('filter_used', {
            filter_type: 'search_result',
            filter_value: `position_${index + 1}`
        });

        ssAnalytics.track('company_card_click', {
            company_id: item.dataset.companyId,
            company_name: item.dataset.companyName,
            card_position: index + 1
        });
    });
});
```

### Company Detail Page

```javascript
// Track page view with context
ssAnalytics.track('page_view', {
    page_path: window.location.pathname,
    page_title: document.title
});

// Set dimensions based on page content
ssAnalytics.setUser({
    custom_dim_category: document.querySelector('[data-category]')?.textContent,
    custom_dim_region: document.querySelector('[data-region]')?.dataset.region
});
```

### Comparison Page

```javascript
// Track when comparison opens
ssAnalytics.track('comparison', {
    companies_count: selectedCompanies.length,
    comparison_action: 'open'
});

// Track export
document.getElementById('export-btn').addEventListener('click', () => {
    ssAnalytics.track('comparison', {
        companies_count: selectedCompanies.length,
        comparison_action: 'export'
    });
});
```

---

## Troubleshooting

### Events not appearing?

1. Check browser console for errors
2. Verify Measurement ID is correct
3. Enable `debug: true` and check for `[GA4]` logs
4. Add `?gtm_debug=x` to URL and check DebugView
5. Ensure consent is granted
6. Check that custom dimensions are created in GA4 Admin

### Duplicate events?

- Ensure `ga4.js` is included only once
- Check for multiple event bindings on same elements
- Remove duplicate script tags

### Custom dimensions not showing?

- Dimensions must be created in GA4 Admin BEFORE data arrives
- Wait 24-48 hours after creating dimension
- Check parameter names match exactly (case-sensitive)
- Verify scope (User vs Event) matches usage

### Can't see events in DebugView?

1. Append `?gtm_debug=x` to URL
2. Open DevTools Console and manually trigger: `gtag('config', 'G-XXXXXXXXXX');`
3. Clear cookies and try incognito mode
4. Disable ad blockers temporarily

---

## BigQuery Queries

### Top search queries

```sql
SELECT
  (SELECT value.string_value FROM UNNEST(event_params)
   WHERE key = 'search_term') as search_term,
  COUNT(*) as searches,
  AVG((SELECT value.int_value FROM UNNEST(event_params)
       WHERE key = 'results_count')) as avg_results
FROM `project.analytics_XXXX.events_*`
WHERE event_name = 'search'
  AND _TABLE_SUFFIX BETWEEN FORMAT_DATE('%Y%m%d', DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY))
  AND FORMAT_DATE('%Y%m%d', CURRENT_DATE())
GROUP BY search_term
ORDER BY searches DESC
LIMIT 50;
```

### Conversion funnel

```sql
WITH funnel AS (
  SELECT
    user_pseudo_id,
    MAX(CASE WHEN event_name = 'search' THEN 1 ELSE 0 END) as searched,
    MAX(CASE WHEN event_name = 'company_card_click' THEN 1 ELSE 0 END) as viewed,
    MAX(CASE WHEN event_name = 'comparison_tool' THEN 1 ELSE 0 END) as compared,
    MAX(CASE WHEN event_name = 'newsletter_signup' THEN 1 ELSE 0 END) as signed_up
  FROM `project.analytics_XXXX.events_*`
  WHERE _TABLE_SUFFIX BETWEEN '20240301' AND '20240331'
  GROUP BY user_pseudo_id
)
SELECT
  COUNT(*) as users,
  SUM(searched) as searches,
  SUM(viewed) as views,
  SUM(compared) as comparisons,
  SUM(signed_up) as signups,
  ROUND(SUM(viewed) * 100.0 / NULLIF(SUM(searched), 0), 2) as view_rate,
  ROUND(SUM(compared) * 100.0 / NULLIF(SUM(viewed), 0), 2) as compare_rate,
  ROUND(SUM(signed_up) * 100.0 / NULLIF(SUM(compared), 0), 2) as signup_rate
FROM funnel;
```

---

## Next Steps

1. ✅ Integrate `ga4.js` into your website
2. ✅ Add `data-track` attributes to interactive elements
3. ✅ Replace Measurement ID in `ga4.js`
4. ✅ Verify events in DebugView
5. ✅ Set up BigQuery export (optional but recommended)
6. ✅ Create custom dimensions in GA4 Admin
7. ✅ Build dashboards using the provided `analytics.html` template or Data Studio

---

**Questions?** See `ANALYTICS.md` for comprehensive documentation.
