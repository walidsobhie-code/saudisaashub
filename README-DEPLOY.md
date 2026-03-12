# SaudiSaaSHub - Deployment Guide & Pre-Launch Checklist

This guide provides step-by-step instructions for deploying SaudiSaaSHub to production, with a comprehensive pre-launch checklist to ensure everything is properly configured.

---

## 📋 Table of Contents

1. [Pre-Deployment Preparation](#pre-deployment-preparation)
2. [Domain & DNS Configuration](#domain--dns-configuration)
3. [Hosting Setup (GitHub Pages)](#hosting-setup-github-pages)
4. [Build & Optimization](#build--optimization)
5. [Content Configuration](#content-configuration)
6. [Analytics & Tracking](#analytics--tracking)
7. [SEO & Structured Data](#seo--structured-data)
8. [Security & HTTPS](#security--https)
9. [Testing](#testing)
10. [Launch](#launch)
11. [Post-Launch Monitoring](#post-launch-monitoring)

---

## Pre-Deployment Preparation

### 1.1 Environment Configuration

1. Copy `.env.example` to `.env` (if using any server-side functionality)
   ```bash
   cp .env.example .env
   ```

2. Fill in required environment variables:
   - `GA4_MEASUREMENT_ID`: Your Google Analytics 4 measurement ID
   - `SITE_URL`: Your production domain (e.g., https://saudisaashub.com)
   - Other configuration as needed

**Note:** For static hosting on GitHub Pages, most backend configs are not applicable.

### 1.2 Choose Color Theme

SaudiSaaSHub comes with two color themes:

- **Gold/Cyan** (`/`): Premium gold and cyan gradient
- **Purple** (`/saudisaashub-purple/`): Modern purple theme

Choose one for your main production deployment, or deploy both as separate sites.

---

## Domain & DNS Configuration

### 2.1 Domain Registration

1. Register your domain (e.g., `saudisaashub.com`)
2. Ensure you have access to DNS settings

### 2.2 DNS Configuration for GitHub Pages

For GitHub Pages, configure your DNS as follows:

**Using A Records (recommended for apex domain):**

```
Type: A
Name: @ (or your domain)
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
TTL: 3600 (or default)
```

**Using CNAME (for subdomain like www):**

```
Type: CNAME
Name: www
Value: your-username.github.io
TTL: 3600
```

If using a custom CNAME file, update it with your domain:

```bash
echo "saudisaashub.com" > CNAME
```

---

## Hosting Setup (GitHub Pages)

### 3.1 Repository Setup

1. Create a new GitHub repository or use existing
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/saudisaashub.git
   git branch -M main
   git push -u origin main
   ```

### 3.2 Enable GitHub Pages

1. Go to your repository Settings
2. Navigate to "Pages" in the sidebar
3. Under "Build and deployment":
   - Source: Select `Deploy from a branch`
   - Branch: `main` (or `gh-pages` if you use that)
   - Folder: `/ (root)`
4. Click "Save"

Your site will be published at: `https://yourusername.github.io/saudisaashub/`

### 3.3 Custom Domain (Optional)

1. In Pages settings, under "Custom domain":
   - Enter your domain (e.g., `saudisaashub.com`)
   - Check "Enforce HTTPS"
2. Add the CNAME file to your repo root:
   ```bash
   echo "saudisaashub.com" > CNAME
   git add CNAME
   git commit -m "Add CNAME for custom domain"
   git push
   ```

GitHub will automatically provision an SSL certificate (may take up to 24 hours).

---

## Build & Optimization

### 4.1 Install Dependencies

```bash
npm install
```

### 4.2 Generate Sitemap

Generate a fresh sitemap from your content data:

```bash
npm run sitemap
```

This creates `sitemap.xml` based on `sample-data.json`.

### 4.3 Build for Production

Run the build script to optimize assets:

```bash
npm run build
```

The build process:
- Minifies HTML, CSS, and inline JavaScript
- Generates optimized service worker (`sw.js`)
- Creates `.nojekyll` file (prevents Jekyll processing on GitHub Pages)
- Creates/updates `CNAME` file if not present
- Outputs `index.min.html`

### 4.4 Deploy Built Version

For GitHub Pages, you can either:
1. Deploy the optimized `index.min.html` as `index.html`
2. Or configure GitHub Actions for automatic builds

**Manual deployment:**
```bash
# If using index.min.html, rename it
cp index.min.html index.html

# Commit and push
git add index.html sitemap.xml sw.js .nojekyll CNAME
git commit -m "Deploy optimized production build"
git push
```

---

## Content Configuration

### 5.1 Update Sample Data

Edit `sample-data.json` with your actual SaaS companies, categories, and articles.

Structure:
```json
{
  "categories": [...],
  "featured_companies": [...],
  "articles": [...],
  "events": [...]
}
```

After updating, regenerate the sitemap:
```bash
npm run sitemap
```

### 5.2 Prepare Images

1. Company logos: Place in `public/logos/` or `assets/images/companies/`
   - Recommended size: 200x200px
   - Format: PNG with transparent background or SVG
   - Optimize for web (use tools like ImageOptim or Squoosh)

2. Open Graph image: Create `assets/images/og-image.png`
   - Size: 1200x630px
   - Include site name and tagline
   - Add branding

3. Favicon and icons: Ensure all icons exist in `assets/icons/`

---

## Analytics & Tracking

### 6.1 Google Analytics 4

1. Create a GA4 property in Google Analytics
2. Get your Measurement ID (format: `G-XXXXXXXXXX`)
3. Update the GA4 Measurement ID:

   In `js/ga4-setup.js`:
   ```javascript
   const GA4_MEASUREMENT_ID = 'G-YOUR_ACTUAL_ID'; // Replace placeholder
   ```

   Or if using build-time injection, set it in your environment.

4. (Optional) Configure custom dimensions in GA4 admin to match the ones in `ga4-setup.js`:
   - dimension1: Language
   - dimension2: Category
   - dimension3: Company Type
   - dimension4: User Type
   - dimension5: Region

5. Test deployment: Visit your site and check GA4 real-time reports

### 6.2 Event Tracking

The following events are automatically tracked:
- `search` - When users perform searches
- `company_click` - When clicking on a company
- `category_click` - When clicking on a category
- `external_link` - When clicking external links
- `scroll_depth` - When scrolling through pages
- `download_click` - When downloading files

No additional setup required unless you want custom events.

---

## SEO & Structured Data

### 7.1 Verify Structured Data

1. Test your homepage with Google Rich Results Test:
   https://search.google.com/test/rich-results

2. Check for:
   - Organization schema
   - WebSite with SearchAction
   - No errors or warnings

3. For individual pages (categories, companies, articles), additional schemas may be added:
   - `Software` for company pages
   - `Article` for blog posts
   - `Event` for events

### 7.2 Hreflang Tags

Current setup:
- Arabic: `https://saudisaashub.com/`
- English: `https://saudisaashub.com/en/`
- x-default: `https://saudisaashub.com/`

If you don't have an English version, either:
1. Create English versions of all pages, OR
2. Remove the English hreflang tags from index.html

### 7.3 Meta Tags

All pages should include:
- Title (unique per page)
- Meta description (unique, 150-160 characters)
- Canonical URL
- Open Graph tags (og:title, og:description, og:image, og:url)
- Twitter Card tags
- Theme color

Verify with: https://metatags.io/

### 7.4 Submit Sitemap

1. Google Search Console:
   - Add your property (URL prefix or domain)
   - Verify ownership (HTML file, DNS, or other method)
   - Go to "Sitemaps"
   - Enter `sitemap.xml`
   - Click "Submit"

2. Bing Webmaster Tools:
   - Add site and verify
   - Submit sitemap.xml

---

## Security & HTTPS

### 8.1 SSL Certificate

- GitHub Pages provides free automatic SSL (via Let's Encrypt)
- For custom domains, enable "Enforce HTTPS" in Pages settings
- Wait for certificate provisioning (up to 24 hours)

### 8.2 Security Headers (Optional)

If using a custom server or Cloudflare, add these headers:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:;
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

For GitHub Pages, use Cloudflare Workers or similar to add headers.

---

## Testing

### 9.1 Local Testing

Start local development server:
```bash
npm run dev
```

Visit: http://localhost:3000

**Test checklist:**
- [ ] All pages load correctly
- [ ] Navigation works (internal links)
- [ ] Search functionality works
- [ ] Language toggle works (if implementing)
- [ ] PWA install banner appears (if service worker is active)
- [ ] Offline page shows when offline
- [ ] 404 page works (test by visiting non-existent URL)
- [ ] All images load
- [ ] Fonts load correctly
- [ ] No console errors

### 9.2 Link Validation

Test all internal links:
```bash
# Simple check with curl
curl -I https://saudisaashub.com/
curl -I https://saudisaashub.com/categories
curl -I https://saudisaashub.com/companies
curl -I https://saudisaashub.com/articles
curl -I https://saudisaashub.com/404
```

Or use a link checker tool:
- https://validator.w3.org/checklink
- Screaming Frog SEO Spider (desktop)

**Ensure:**
- [ ] No broken links (404s)
- [ ] All pages return HTTP 200 (except 404 page returns 404)
- [ ] Redirects are properly configured (if any)

### 9.3 Mobile Responsiveness

Test on:
- [ ] Mobile (375px, 414px widths)
- [ ] Tablet (768px, 1024px widths)
- [ ] Desktop (1280px+ widths)

Use Chrome DevTools device toolbar.

### 9.4 Performance Testing

Run Lighthouse audit:
1. Open Chrome DevTools > Lighthouse
2. Select all categories (Performance, SEO, PWA, Accessibility)
3. Generate report

**Target scores:**
- Performance: 90+
- SEO: 100
- Accessibility: 90+
- PWA: 90+

If scores are low, review and optimize:
- Image sizes
- JavaScript bundle size
- CSS critical path
- Lazy loading implementation

### 9.5 Cross-Browser Testing

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## Launch

### 10.1 Final Pre-Launch Checklist

See the detailed [Pre-Launch Checklist](#appendix-pre-launch-checklist) section below.

### 10.2 Deploy to Production

1. Push final optimized build to main branch:
   ```bash
   npm run predeploy  # Runs sitemap + build
   git add .
   git commit -m "Production ready build"
   git push origin main
   ```

2. Wait for GitHub Pages to deploy (usually 1-2 minutes)

3. Verify live site:
   - Visit your domain
   - Check that all pages load
   - Verify analytics is receiving data (check GA4 real-time)
   - Test a few internal links

### 10.3 Post-Deploy Verification

1. **GA4:** Check real-time traffic in Google Analytics
2. **Search Console:** Submit sitemap if not already done
3. **SSDLabs:** Test SSL configuration: https://www.ssllabs.com/ssltest/
4. **PageSpeed Insights:** https://pagespeed.web.dev/

---

## Post-Launch Monitoring

### 11.1 Daily Monitoring (First Week)

- [ ] Check for 404 errors (Google Search Console)
- [ ] Monitor Core Web Vitals
- [ ] Check for crawl errors
- [ ] Verify analytics are tracking properly

### 11.2 Weekly Monitoring

- [ ] Review search performance (Search Console)
- [ ] Check for new backlinks
- [ ] Monitor site speed (Lighthouse or similar)
- [ ] Review user engagement metrics (GA4)

### 11.3 Monthly Maintenance

- [ ] Update content (add new companies, articles, events)
- [ ] Regenerate sitemap: `npm run sitemap`
- [ ] Rebuild if content changes significantly
- [ ] Review and update SEO meta tags
- [ ] Check for broken links
- [ ] Review and update privacy policy/terms if needed

---

## Appendix: Pre-Launch Checklist

### Domain & DNS
- [ ] Domain registered and verified
- [ ] DNS records configured (A records or CNAME)
- [ ] SSL certificate active (check https://)
- [ ] Custom domain set in GitHub Pages (if using custom domain)
- [ ] CNAME file contains correct domain
- [ ] Domain verifies in Google Search Console

### Build & Optimization
- [ ] `npm install` completes without errors
- [ ] `npm run sitemap` generates sitemap.xml successfully
- [ ] `npm run build` completes without errors
- [ ] `index.min.html` is generated and smaller than original
- [ ] Service worker (`sw.js`) is generated
- [ ] `.nojekyll` file exists
- [ ] Build process is documented (package.json scripts)

### Content & Meta Tags
- [ ] All pages have unique `<title>` tags
- [ ] All pages have unique meta descriptions (150-160 chars)
- [ ] Canonical URLs are correct on all pages
- [ ] Open Graph tags present on all pages
- [ ] Twitter Card tags present on all pages
- [ ] Hreflang tags are correct (Arabic/English)
- [ ] OG image exists at specified URL (1200x630px)
- [ ] Favicon and icons are present
- [ ] 404.html page exists and tested

### Structured Data
- [ ] JSON-LD Organization schema present on homepage
- [ ] JSON-LD WebSite schema with SearchAction present
- [ ] Company pages have Software schema (if applicable)
- [ ] Article pages have Article schema (if applicable)
- [ ] Event pages have Event schema (if applicable)
- [ ] Validate with Google Rich Results Test (no errors)

### Analytics & Tracking
- [ ] GA4 Measurement ID is set correctly in `js/ga4-setup.js`
- [ ] GA4 is receiving data (check real-time reports)
- [ ] GTM container (if used) is configured
- [ ] Event tracking is working (test search, clicks)
- [ ] Consent management (if required for GDPR)

### SEO
- [ ] Sitemap.xml exists and is valid (https://saudisaashub.com/sitemap.xml)
- [ ] Sitemap submitted to Google Search Console
- [ ] Sitemap submitted to Bing Webmaster Tools
- [ ] robots.txt exists and allows crawling important pages
- [ ] robots.txt disallows private/admin paths
- [ ] No `noindex` on important pages
- [ ] Proper heading hierarchy (H1, H2, H3)
- [ ] Images have alt attributes
- [ ] Internal linking is logical

### Performance
- [ ] Lighthouse Performance score >= 90
- [ ] Lighthouse SEO score = 100
- [ ] Lighthouse Accessibility score >= 90
- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] First Input Delay < 100ms
- [ ] Images are optimized (compressed, proper format)
- [ ] CSS is minified and critical CSS inlined
- [ ] JavaScript is minified
- [ ] Gzip/Brotli compression enabled on server
- [ ] Browser caching headers configured

### Accessibility
- [ ] All interactive elements have focus states
- [ ] All images have alt text
- [ ] Proper heading hierarchy (no skipped levels)
- [ ] Sufficient color contrast (WCAG AA minimum)
- [ ] Touch targets are at least 44x44px
- [ ] Form inputs have labels
- [ ] Skip links (if needed)
- [ ] Reduced motion preferences respected

### PWA
- [ ] Web app manifest exists and is valid
- [ ] Service worker registers successfully
- [ ] Offline page works (test with DevTools > Offline mode)
- [ ] Install banner appears (Chrome/Edge)
- [ ] App icons are correct sizes
- [ ] Theme color is set
- [ ] Apple touch icons are present

### Security
- [ ] HTTPS is enforced (HTTP redirects to HTTPS)
- [ ] No mixed content warnings
- [ ] No sensitive data in client-side code
- [ ] API endpoints secured (if applicable)
- [ ] Rate limiting configured (if applicable)
- [ ] No exposed environment variables in frontend

### Legal & Compliance
- [ ] Privacy policy page exists and is accessible
- [ ] Terms of service page exists and is accessible
- [ ] Contact information is provided
- [ ] GDPR compliance (if targeting EU users):
  - [ ] Cookie consent banner (if using non-essential cookies)
  - [ ] Data processing agreement (if using third parties)
- [ ] Saudi data protection compliance (if applicable)

### Functionality
- [ ] Search works correctly
- [ ] Language toggle works (if applicable)
- [ ] Category filtering works
- [ ] Company cards display correctly
- [ ] Pagination works
- [ ] Navigation menu is functional
- [ ] Offline mode works
- [ ] 404 page displays for non-existent URLs
- [ ] All modals/interactive elements work

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Cross-Device Testing
- [ ] iPhone (various sizes)
- [ ] Android phone (various sizes)
- [ ] iPad / Android tablet
- [ ] Desktop (Chrome, Firefox, Safari, Edge)

---

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Google Search Central](https://developers.google.com/search)
- [MDN Web Performance](https://developer.mozilla.org/en-US/docs/Web/Performance)
- [Web.dev SEO Checklist](https://web.dev/seo-checklist/)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)

---

## Support

For issues or questions:
1. Check existing documentation in the repository
2. Review GitHub Issues
3. Contact: contact@saudisaashub.com

---

**Last Updated:** 2026-03-12
**Version:** 1.0
