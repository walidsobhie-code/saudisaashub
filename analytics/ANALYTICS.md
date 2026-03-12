# SaudiSaaSHub Analytics Setup Guide

Complete guide for implementing and managing Google Analytics 4 tracking for SaudiSaaSHub.

---

## 📋 Table of Contents

1. [Quick Setup](#quick-setup)
2. [GA4 Measurement ID Configuration](#ga4-measurement-id-configuration)
3. [Verifying Events in DebugView](#verifying-events-in-debugview)
4. [Exporting Data to BigQuery](#exporting-data-to-bigquery)
5. [Custom Dimensions & Metrics](#custom-dimensions--metrics)
6. [Privacy Compliance Checklist](#privacy-compliance-checklist)
7. [Implementation Guide](#implementation-guide)
8. [Testing & Troubleshooting](#testing--troubleshooting)
9. [Advanced Configuration](#advanced-configuration)
10. [Reference](#reference)

---

## Quick Setup

1. **Create a GA4 Property**
   - Go to [Google Analytics](https://analytics.google.com/)
   - Click "Admin" → "Create Property"
   - Select "Web" and enter your website details
   - Copy your Measurement ID (format: `G-XXXXXXXXXX`)

2. **Configure the Analytics Module**
   - Open `analytics/ga4.js`
   - Replace `'G-XXXXXXXXXX'` with your Measurement ID
   - Set `debug: true` temporarily for testing
   - Upload `ga4.js` to your website

3. **Add Script to Your Website**
   ```html
   <script src="/path/to/analytics/ga4.js"></script>
   ```

4. **Verify Setup**
   - Open your website
   - Open browser console (F12)
   - You should see `[GA4]` logs
   - Check Realtime report in GA4

---

## GA4 Measurement ID Configuration

### Where to Find Your Measurement ID

1. Sign in to [Google Analytics](https://analytics.google.com/)
2. Navigate to **Admin** (gear icon in bottom left)
3. Under **Property**, select **Data Streams**
4. Click on your Web stream
5. Copy the **Measurement ID** from the top of the page
   - Format: `G-XXXXXXXXXX`
   - Example: `G-WX1K2L3M4N`

### How to Update the Measurement ID

Open `analytics/ga4.js` and modify line 20:

```javascript
const CONFIG = {
    measurementId: 'G-XXXXXXXXXX', // ← Replace this
    // ... other config
};
```

**Important:**
- Use the exact ID from GA4 (case-sensitive)
- No commas, spaces, or extra characters
- The ID should start with `G-`

### Multiple Environments Support

For different environments (development, staging, production):

```javascript
const ENVIRONMENT = window.location.hostname.includes('localhost') ? 'dev' : 'prod';
const MEASUREMENT_IDS = {
    dev: 'G-DEVELOPMENTID',
    staging: 'G-STAGINGID',
    prod: 'G-PRODUCTIONID'
};

const CONFIG = {
    measurementId: MEASUREMENT_IDS[ENVIRONMENT],
    debug: ENVIRONMENT === 'dev'
};
```

---

## Verifying Events in DebugView

### Step 1: Enable Debug Mode

In `ga4.js`, set `debug: true`:

```javascript
const CONFIG = {
    debug: true,
    // ...
};
```

Or pass as option during initialization:

```javascript
ssAnalytics.init({ debug: true });
```

### Step 2: Open DebugView in GA4

1. Go to **Google Analytics** → **Admin**
2. Under **Property**, select **DebugView**
3. Keep this tab open
4. Navigate to your website in another tab

### Step 3: Trigger Events

Interact with your website to generate events:
- Perform a search
- Click on a company card
- Use the comparison tool
- Toggle language
- Subscribe to newsletter

### Step 4: Verify Events Appear

In DebugView, you should see:
- **Events** on the left sidebar
- **Event parameters** when you click an event
- **User properties** including:
  - `language` (ar/en)
  - `region`
  - `category`
  - `company_type`

### Verified Events Checklist

| Event | Required Parameters | Expected in DebugView |
|-------|-------------------|----------------------|
| `search` | `search_term`, `results_count` | ✅ |
| `filter_used` | `filter_type`, `filter_value` | ✅ |
| `company_card_click` | `company_id`, `company_name`, `card_position` | ✅ |
| `comparison_tool` | `companies_count`, `comparison_action` | ✅ |
| `newsletter_signup` | `email_domain`, `signup_success` | ✅ |
| `language_toggle` | `language_from`, `language_to` | ✅ |
| `category_navigation` | `category_name`, `click_count` | ✅ |
| `page_view` | `page_path`, `page_title` | ✅ |

### Console Debugging

Open browser console (F12) and check for logs:

```
[GA4] GA4 initialized with Measurement ID: G-XXXXXXXX
[GA4] DataLayer push: search {search_term: "CRM", results_count: 15}
[GA4] Page view tracked: /companies
```

Test manually:

```javascript
// Run in console
ssAnalytics.track('search', { search_term: 'test query', results_count: 5 });
ssAnalytics.track('company_card_click', {
    company_id: 'test_123',
    company_name: 'Test Company',
    card_position: 1
});
```

---

## Exporting Data to BigQuery

GA4 can export raw event data to BigQuery for advanced analysis.

### Prerequisites

1. **Google Cloud Project** with billing enabled
2. **BigQuery** API enabled
3. **GA4 Property** owner permissions

### Setup Steps

#### 1. Link BigQuery to GA4

1. In GA4 Admin, go to **BigQuery Linking**
2. Click **Create Link**
3. Select your Google Cloud Project
4. Choose export frequency:
   - **Daily** (recommended): Exports once per day
   - **Streaming**: Real-time export (increased cost)
5. Select data location (region)
6. Click **Create Link**

#### 2. Configure Export

Select which data to export:
- ✅ **Events** (required)
- ✅ **User properties**
- ✅ **Event parameters**

#### 3. Verify Export Location

BigQuery dataset will be created as:
```
analytics_XXXXX.events_YYYYMMDD
```
Where:
- `analytics_XXXXX` = your GA4 property ID
- `events_YYYYMMDD` = daily partitioned tables

### Querying Exported Data

#### Basic Event Query

```sql
SELECT
  event_name,
  COUNT(*) as event_count,
  DATE(TIMESTAMP_SECONDS(event_timestamp)) as event_date
FROM `your-project.analytics_XXXXX.events_*`
WHERE _TABLE_SUFFIX BETWEEN '20240101' AND '20240131'
GROUP BY event_name, event_date
ORDER BY event_date DESC, event_count DESC;
```

#### Search Queries Analysis

```sql
SELECT
  (SELECT value.string_value FROM UNNEST(event_params)
   WHERE key = 'search_term') as search_term,
  COUNT(*) as search_count,
  APPROX_QUANTILES(
    CAST((SELECT value.int_value FROM UNNEST(event_params)
          WHERE key = 'results_count') AS INT64), 4
  )[OFFSET(2)] as median_results
FROM `your-project.analytics_XXXXX.events_*`
WHERE event_name = 'search'
  AND _TABLE_SUFFIX BETWEEN '20240101' AND '20240131'
GROUP BY search_term
ORDER BY search_count DESC
LIMIT 100;
```

#### Conversion Funnel Analysis

```sql
WITH user_journeys AS (
  SELECT
    user_pseudo_id,
    event_name,
    TIMESTAMP_SECONDS(event_timestamp) as event_time,
    (SELECT value.int_value FROM UNNEST(event_params)
     WHERE key = 'companies_count') as companies_count,
    (SELECT value.string_value FROM UNNEST(event_params)
     WHERE key = 'search_term') as search_term
  FROM `your-project.analytics_XXXXX.events_*`
  WHERE _TABLE_SUFFIX BETWEEN '20240101' AND '20240131'
    AND event_name IN ('search', 'company_card_click', 'comparison_tool', 'newsletter_signup')
),
funnel AS (
  SELECT
    user_pseudo_id,
    MIN(CASE WHEN event_name = 'search' THEN event_time END) as search_time,
    MIN(CASE WHEN event_name = 'company_card_click' THEN event_time END) as view_time,
    MIN(CASE WHEN event_name = 'comparison_tool' THEN event_time END) as compare_time,
    MIN(CASE WHEN event_name = 'newsletter_signup' THEN event_time END) as signup_time
  FROM user_journeys
  GROUP BY user_pseudo_id
)
SELECT
  COUNT(DISTINCT user_pseudo_id) as total_users,
  COUNT(search_time) as searches,
  COUNT(view_time) as views,
  COUNT(compare_time) as comparisons,
  COUNT(signup_time) as signups,
  ROUND(COUNT(view_time) * 100.0 / COUNT(search_time), 2) as search_to_view_pct,
  ROUND(COUNT(compare_time) * 100.0 / COUNT(view_time), 2) as view_to_compare_pct,
  ROUND(COUNT(signup_time) * 100.0 / COUNT(compare_time), 2) as compare_to_signup_pct
FROM funnel;
```

#### Dashboard Integration with Data Studio

To create dashboards with BigQuery data:

1. Go to [Looker Studio](https://lookerstudio.google.com/)
2. Create new report
3. Add **BigQuery** as data source
4. Select your dataset and tables
5. Create visualizations:
   - Time series for page views
   - Bar charts for top companies
   - Funnel charts for conversion
   - Tables for search queries

---

## Custom Dimensions & Metrics

### 1. Create Custom Dimensions in GA4

1. In GA4 Admin, go to **Custom Definitions**
2. Click **Create Custom Dimension**
3. Configure each dimension:

#### a. Language

- **Dimension name**: `language`
- **Scope**: `User`
- **Description**: User's preferred language (ar/en)
- **Event parameter**: `custom_dim_language`

#### b. Category

- **Dimension name**: `category`
- **Scope**: `Event`
- **Description**: Company/main category
- **Event parameter**: `custom_dim_category`

#### c. Company Type

- **Dimension name**: `company_type`
- **Scope**: `User`
- **Description**: Type of company (Startup/Enterprise)
- **Event parameter**: `custom_dim_company_type`

#### d. Region

- **Dimension name**: `region`
- **Scope**: `User`
- **Description**: User's region/kingdom city
- **Event parameter**: `custom_dim_region`

### 2. Update ga4.js to Send Custom Dimensions

The module already includes automatic dimension sending. For manual setting:

```javascript
// When user logs in or changes preferences
ssAnalytics.track('event_name', {
    custom_dim_language: 'ar',
    custom_dim_category: 'CRM',
    custom_dim_company_type: 'Startup',
    custom_dim_region: 'Riyadh'
});
```

### 3. Register Dimensions in Data Layer

In `ga4.js` line 27 (Custom Dimensions Setup):

```javascript
customDimensions: {
    language: 'custom_dim_language',
    category: 'custom_dim_category',
    company_type: 'custom_dim_company_type',
    region: 'custom_dim_region'
}
```

---

## Privacy Compliance Checklist

### GDPR Requirements

#### ✅ Cookie Consent Banner

Implement a cookie consent banner before initializing analytics:

```html
<!-- Place before analytics script -->
<div id="cookie-banner" style="position:fixed;bottom:0;left:0;right:0;background:#fff;padding:20px;border-top:1px solid #ddd;z-index:10000;">
    <p>We use cookies to improve your experience. <button onclick="acceptCookies()">Accept</button> <button onclick="rejectCookies()">Reject</button></p>
</div>

<script>
    function acceptCookies() {
        ssAnalytics.grantConsent({
            analytics_storage: true,
            ad_storage: false
        });
        document.getElementById('cookie-banner').style.display = 'none';
    }
    function rejectCookies() {
        ssAnalytics.grantConsent({
            analytics_storage: false,
            ad_storage: false
        });
        document.getElementById('cookie-banner').style.display = 'none';
    }
</script>
```

#### ✅ IP Anonymization

Already enabled in GA4 config:
```javascript
gtag('config', CONFIG.measurementId, {
    anonymize_ip: true
});
```

#### ✅ Data Deletion Support

Provide a mechanism for users to request data deletion:

```javascript
// API endpoint for data deletion requests
app.post('/api/delete-analytics-data', async (req, res) => {
    const { userId } = req.body;

    // Use GA4 API to delete user data
    // See: https://developers.google.com/analytics/devguides/config/user-deletion

    res.json({ success: true, message: 'Data deletion requested' });
});
```

#### ✅ Data Processing Agreement (DPA)

- Google is a Data Processor under GDPR
- The DPA is automatically accepted when you create GA4 property
- Document this in your privacy policy

### Saudi Data Privacy Law (PDPL) Compliance

#### ✅ Saudi Data Localization

PDPL may require data to be stored within Saudi Arabia.

- **GA4 Data Residency**: GA4 data centers are global
- Consider: Use a Middle East cloud provider (AWS Bahrain, etc.)
- Document: If using GA4, acknowledge cross-border data transfer in privacy policy

#### ✅ User Rights

Ensure your privacy policy covers:

1. **Right to Access**: Users can request their data
2. **Right to Rectification**: Users can correct inaccurate data
3. **Right to Erasure**: Implement deletion endpoint
4. **Right to Restrict Processing**: Allow users to opt-out
5. **Right to Data Portability**: Not typically needed for analytics

### Implementation Checklist

- [x] Anonymize IP enabled
- [x] Consent management implemented
- [x] Cookie consent banner GDPR-compliant
- [x] User can reject cookies
- [x] Data deletion endpoint created
- [x] Privacy policy updated with:
  - What data is collected
  - How it's used
  - Retention period (GA4 default: 2 months, extended to 50 months for standard, up to 14 months for streaming)
  - Third-party sharing (Google)
  - User rights & contact
- [ ] Data localization assessed (PDPL)
- [ ] Data processing agreement signed (automatic with Google)
- [ ] Cross-border transfer mechanism documented (if applicable)

---

## Implementation Guide

### 1. File Structure

```
saudisaashub/
├── analytics/
│   ├── ga4.js              # Main analytics module
│   ├── analytics.html      # Dashboard mockup
│   └── ANALYTICS.md        # This file
└── public/
    └── js/
        └── analytics.js    # (optional) frontend wrapper
```

### 2. Include in Your HTML

Add before closing `</body>` tag:

```html
<!-- Analytics -->
<script src="/analytics/ga4.js"></script>
<script>
    // Optional: Initialize with custom options
    ssAnalytics.init({
        debug: false,
        measurementId: 'G-XXXXXXXXXX' // Override if needed
    });

    // Set user properties if logged in
    if (window.currentUser) {
        ssAnalytics.setUser({
            user_id: window.currentUser.id,
            language: window.currentUser.language,
            company_type: window.currentUser.companyType,
            region: window.currentUser.region
        });
    }
</script>
```

### 3. Automatic Event Tracking

Events are tracked automatically via `data-track` attributes:

```html
<!-- Search form -->
<form data-track="search">
    <input type="text" name="q" placeholder="Search...">
    <button type="submit">Search</button>
</form>

<!-- Company card -->
<div class="company-card"
     data-track="company"
     data-company-id="cmp_123"
     data-company-name="SaaS Company"
     data-position="1">
</div>

<!-- Comparison button -->
<button data-track="comparison"
        data-companies-count="3"
        data-action="export">
    Export Comparison
</button>

<!-- Newsletter form -->
<form data-track="newsletter">
    <input type="email" name="email">
    <button type="submit">Subscribe</button>
</form>

<!-- Language toggle -->
<button data-track="language"
        data-from="en"
        data-to="ar">
    العربية
</button>
```

### 4. Manual Event Tracking

For events not covered by auto-tracking:

```javascript
// Search
ssAnalytics.track('search', {
    search_term: query,
    results_count: count
});

// Filter usage
ssAnalytics.track('filter_used', {
    filter_type: 'region',
    filter_value: 'Riyadh'
});

// Custom events
ssAnalytics.track('custom_event_name', {
    param1: 'value1',
    param2: 123
});
```

---

## Testing & Troubleshooting

### Common Issues

#### Events not appearing in GA4

1. **Check Measurement ID**
   - Open DevTools Console
   - Run: `ssAnalytics.init()`
   - Check for errors about invalid Measurement ID

2. **Verify DebugMode**
   ```javascript
   ssAnalytics.setDebug(true);
   ```
   - Look for `[GA4]` logs in console

3. **Check Ad Blocker**
   - Some ad blockers prevent GA from loading
   - Use incognito mode for testing

4. **Verify Consent**
   ```javascript
   console.log(ssAnalytics.getConsent());
   ```
   - Ensure `analytics_storage: true`

#### Duplicate Events

- Ensure `ga4.js` is not loaded multiple times
- Check for duplicate script tags

#### Custom Dimensions not showing

- Verify custom dimensions are created in GA4 Admin BEFORE data arrives
- It can take 24-48 hours for dimensions to become active
- Check event parameters match exactly (case-sensitive)

#### DebugView empty

- Ensure you're in DebugView (not Realtime)
- The DebugView only shows events from devices with debug mode enabled OR from Firebase DebugView
- For web: append `?gtm_debug=x` to URL OR set debug mode in code

### Debugging Commands

```javascript
// Check GA4 is loaded
console.log(typeof ga !== 'undefined'); // Should be true

// Check dataLayer exists
console.log(window.dataLayer);

// Check analytics module
console.log(ssAnalytics);

// Manually trigger test event
ssAnalytics.track('test_event', { test_param: 'value' });

// View all events in last 30 seconds (DevTools)
getEventCounts = () => {
    const counts = {};
    window.dataLayer.forEach(item => {
        if (item.event) {
            counts[item.event] = (counts[item.event] || 0) + 1;
        }
    });
    return counts;
};
```

### Using GA4 DebugView Extension

Install: [GA4 DebugView Chrome Extension](https://chrome.google.com/webstore/detail/ga4-debug-view/)

1. Install extension
2. Click icon to enable debugging
3. Refresh your website
4. Events appear in extension popup instantly

---

## Advanced Configuration

### 1. Session Management

By default, session ID is stored in `sessionStorage`. To customize:

```javascript
// Override session ID generation
ssAnalytics.setUser({
    session_id: 'custom_session_id'
});
```

### 2. User Identification

For logged-in users, set user ID:

```javascript
ssAnalytics.setUser({
    user_id: 'user_12345',
    language: 'ar',
    region: 'Riyadh'
});
```

**Important:** Do not send personally identifiable information (PII) like email addresses, names, or phone numbers.

### 3. Enhanced Measurement

GA4 automatically tracks:
- Page views
- Scrolls (90% threshold)
- Outbound clicks
- Site search
- Video engagement
- File downloads

Disable unwanted auto-tracking in GA4 Admin → Data Streams → Enhanced Measurement.

### 4. Google Tag Manager (GTM) Integration

The module supports GTM via dataLayer. To use GTM:

1. Remove direct GA4 initialization from ga4.js
2. Add GTM snippet AFTER ga4.js:

```html
<script src="/analytics/ga4.js"></script>
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
```

3. Create GA4 Configuration tag in GTM:
   - Tag Type: Google Analytics: GA4 Configuration
   - Measurement ID: `G-XXXXXXXXXX`
   - Trigger: All Pages

4. Create GA4 Event tags for custom events:
   - Tag Type: Google Analytics: GA4 Event
   - Event Name: `search` (match ea ch event)
   - Parameters: Map from dataLayer variables

### 5. Custom Metrics

To track quantitative measurements:

1. Create custom metric in GA4 Admin:
   - Name: `result_count`
   - Scope: `Event`
   - Event parameter: `results_count`

2. Update ga4.js to include metric values:

```javascript
ssAnalytics.track('search', {
    search_term: query,
    results_count: count  // This maps to custom metric
});
```

---

## Reference

### Events Reference

| Event Name | Parameters | Description | Trigger |
|-----------|------------|-------------|---------|
| `search` | `search_term` (string)<br>`results_count` (int) | User performed search | Search form submit |
| `filter_used` | `filter_type` (string)<br>`filter_value` (string) | User applied filter | Filter change |
| `company_card_click` | `company_id` (string)<br>`company_name` (string)<br>`card_position` (int) | User clicked company | Company card click |
| `comparison_tool` | `companies_count` (int)<br>`comparison_action` (string: open/export) | User used comparison | Compare button |
| `newsletter_signup` | `email_domain` (string)<br>`signup_success` (boolean) | Newsletter subscription | Form submit |
| `language_toggle` | `language_from` (string)<br>`language_to` (string) | Language switched | Language button |
| `category_navigation` | `category_name` (string)<br>`click_count` (int) | Category navigation | Category link |
| `page_view` | `page_path`, `page_title` | Page loaded | Auto |

### Custom Dimensions Reference

| Dimension Name | Parameter Name | Scope | Description |
|---------------|----------------|-------|-------------|
| `language` | `custom_dim_language` | User | User's language preference |
| `category` | `custom_dim_category` | Event | Company category being viewed |
| `company_type` | `custom_dim_company_type` | User | Startup/Enterprise/Other |
| `region` | `custom_dim_region` | User | Geographic region (city) |

### Data Layer Variables

The module automatically pushes to `dataLayer`:

```javascript
window.dataLayer.push({
    event: 'search',
    search_term: 'CRM',
    results_count: 15,
    custom_dim_language: 'ar',
    custom_dim_category: 'CRM Software'
});
```

---

## Support & Resources

### Official Documentation

- [GA4 Web Setup Guide](https://support.google.com/analytics/answer/9411735)
- [DebugView Guide](https://support.google.com/analytics/answer/7201382)
- [BigQuery Export](https://support.google.com/analytics/answer/9358801)
- [Custom Dimensions](https://support.google.com/analytics/answer/10075209)

### SaudiSaaSHub-Specific Notes

- Language codes: `ar` (Arabic), `en` (English)
- Regions: Riyadh, Jeddah, Dammam, Mecca, Medina, Eastern Province, etc.
- Categories match your SaaS taxonomy (CRM, Finance, HR, etc.)

### Contact

For issues with this implementation:
1. Check DebugView for event delivery
2. Review browser console for errors
3. Verify Measurement ID matches GA4 property
4. Ensure custom dimensions are defined in GA4 Admin

---

**Last Updated:** 2024-03-12
**Version:** 1.0.0
**Compatible with:** GA4, BigQuery, GTM
