# SaudiSaaSHub Analytics Implementation

Comprehensive Google Analytics 4 tracking implementation with custom events, GDPR compliance, and analytics dashboard.

---

## 📁 Files

| File | Description |
|------|-------------|
| `ga4.js` | Main analytics module with GA4 configuration, custom event tracking, consent management, and dataLayer integration |
| `analytics.html` | Interactive dashboard mockup with charts for page views, top companies, search queries, language usage, and conversion funnel |
| `ANALYTICS.md` | Comprehensive setup guide covering GA4 configuration, DebugView, BigQuery export, custom dimensions, and GDPR compliance |
| `USAGE.md` | Quick implementation examples for all tracking scenarios |

---

## 🚀 Quick Start

1. **Set up GA4 Property**
   - Create property in [Google Analytics](https://analytics.google.com/)
   - Copy Measurement ID (format: `G-XXXXXXXXXX`)

2. **Configure the Module**
   - Open `ga4.js`, line 20
   - Replace `G-XXXXXXXXXX` with your Measurement ID

3. **Add to Your Website**
   ```html
   <script src="/analytics/ga4.js"></script>
   ```

4. **Verify Setup**
   - Open your site with `?gtm_debug=x` appended to URL
   - Check DebugView in GA4 for events
   - See browser console for `[GA4]` logs

5. **Test Events**
   - Perform searches
   - Click company cards
   - Use comparison tool
   - Toggle language
   - Sign up for newsletter

---

## ✨ Features

### Custom Events Tracked

- 🔍 **Search queries** (`search_term`, `results_count`)
- 🎛 **Filter usage** (`filter_type`, `filter_value`)
- 🏢 **Company card clicks** (`company_id`, `company_name`, `position`)
- ⚖️ **Comparison tool** (`companies_count`, `action: open/export`)
- 📧 **Newsletter signups** (`email_domain`, `success`)
- 🌐 **Language toggle** (`from`, `to`)
- 📂 **Category navigation** (`category_name`, `click_count`)

### Custom Dimensions

- `language` (User) - ar/en
- `category` (Event) - SaaS category
- `company_type` (User) - Startup/Enterprise
- `region` (User) - Saudi city/region

### GDPR & PDPL Compliance

- ✅ Cookie consent management
- ✅ IP anonymization
- ✅ Data deletion support
- ✅ No PII collection
- ✅ Optional ad storage consent

---

## 📊 Dashboard

Open `analytics.html` in a browser to see a mockup dashboard with:

- Page views over time (line chart)
- Top companies by clicks (bar chart)
- Search query frequency (line chart)
- Language usage stats (doughnut chart)
- Conversion funnel (search → view → compare → signup)
- Real-time events table

The dashboard uses mock data; connect to BigQuery or GA4 API for real data.

---

## 📖 Documentation

| Document | Purpose |
|----------|---------|
| [ANALYTICS.md](ANALYTICS.md) | Complete setup guide, DebugView, BigQuery export, compliance checklist |
| [USAGE.md](USAGE.md) | Quick implementation examples and testing guide |

---

## 🔧 Integration

### Automatic Tracking

Add `data-track` attributes to your HTML:

```html
<form data-track="search">...</form>
<div data-track="company" data-company-id="123" data-company-name="Company"></div>
<button data-track="comparison" data-companies-count="2" data-action="open">Compare</button>
```

### Manual Tracking

```javascript
ssAnalytics.track('search', {
    search_term: query,
    results_count: count
});
```

### User Properties

```javascript
ssAnalytics.setUser({
    user_id: 'user_123',
    language: 'ar',
    region: 'Riyadh'
});
```

---

## 🧪 Testing

1. Enable debug mode: `ssAnalytics.init({ debug: true })`
2. Open site with `?gtm_debug=x` in URL
3. Go to GA4 Admin → DebugView
4. Interact with site; events appear in real-time
5. Check browser console for `[GA4]` logs

---

## 🗄️ BigQuery Export

Link GA4 to BigQuery for advanced analytics:

1. GA4 Admin → BigQuery Linking
2. Select project and create link
3. Use SQL queries from [ANALYTICS.md](ANALYTICS.md) for analysis
4. Build dashboards in Looker Studio

---

## 🤝 Support

- GA4 DebugView: [official guide](https://support.google.com/analytics/answer/7201382)
- BigQuery Export: [official guide](https://support.google.com/analytics/answer/9358801)
- GDPR Compliance: See [ANALYTICS.md](ANALYTICS.md#privacy-compliance-checklist)

---

## 📄 License

Internal use for SaudiSaaSHub project.

---

**Implemented:** March 2024
**Status:** ✅ Ready for integration
