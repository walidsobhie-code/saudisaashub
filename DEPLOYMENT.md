# Deployment Guide

This guide covers deploying SaudiSaaSHub to production with best practices for performance, SEO, and reliability.

---

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment)
2. [Domain & DNS Setup](#dns)
3. [Hosting Options](#hosting)
4. [CI/CD Pipeline](#cicd)
5. [SSL/TLS Configuration](#ssl)
6. [CDN Setup](#cdn)
7. [Search Console & SEO](#seo)
8. [Monitoring & Alerts](#monitoring)
9. [Post-Deployment Verification](#verification)
10. [Rollback Plan](#rollback)

---

## Pre-Deployment Checklist <a name="pre-deployment"></a>

### Configuration
- [ ] Update `GA4_MEASUREMENT_ID` in `js/ga4-setup.js`
- [ ] Set `API_BASE_URL` in `js/app.js` to production endpoint
- [ ] Update canonical URLs in `index.html` to production domain
- [ ] Configure sitemap.xml with all production URLs
- [ ] Update robots.txt with staging paths (if any)
- [ ] Verify hreflang tags point to production domain

### Content
- [ ] Review all placeholder content (lorem ipsum → real Arabic)
- [ ] Upload company logos (WebP + PNG fallback)
- [ ] Optimize all images (compress, generate WebP)
- [ ] Verify all links work (internal & external)
- [ ] Check meta descriptions (unique, 120-160 chars)
- [ ] Add alt attributes to all meaningful images

### Build Verification
- [ ] Run `npm run build` without errors
- [ ] Inspect `dist/` output (all files present)
- [ ] Test production build locally: `npm run serve`
- [ ] Verify service worker registration
- [ ] Check offline mode works

### SEO Validation
- [ ] Validate structured data: https://validator.schema.org/
- [ ] Test rich results: https://search.google.com/test/rich-results
- [ ] Check mobile-friendly: https://search.google.com/test/mobile-friendly
- [ ] Verify sitemap.xml syntax: https://www.xml-sitemaps.com/validate-xml-sitemap.html
- [ ] Test robots.txt: https://www.robotsvalidator.com/

### Performance Budget
| Asset | Budget | Actual | Status |
|-------|--------|--------|--------|
| HTML | <50KB | | |
| CSS | <50KB | | |
| JS | <60KB | | |
| Total | <200KB | | |

**Lighthouse targets:**
- Performance ≥ 95
- Accessibility ≥ 95
- Best Practices ≥ 95
- SEO ≥ 95

---

## Domain & DNS Setup <a name="dns"></a>

### A Records (Recommended)
```
saudisaashub.com   A     192.0.2.1  # Your server IP
www                CNAME saudisaashub.com
```

### Cloudflare (Recommended)
1. Add site to Cloudflare
2. Change nameservers to Cloudflare
3. Enable:
   - ✅ SSL/TLS (Full strict)
   - ✅ Always Use HTTPS
   - ✅ Auto Minify (CSS/JS/HTML) - optional (we already minify)
   - ✅ Rocket Loader - disable (conflicts with SW)
   - ✅ Browser Cache TTL: 1 month
   - ✅ Development Mode (off after launch)

---

## Hosting Options <a name="hosting"></a>

### Option 1: Vercel (Easiest) ⭐ Recommended

**Pros:**
- Zero config deployment
- Automatic HTTPS
- Edge caching (Global CDN)
- Serverless functions (for API)
- Preview deployments for PRs

**Steps:**
```bash
npm i -g vercel
vercel --prod
```

Or use GitHub integration:
1. Push to GitHub
2. Import repo in Vercel
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy

**Environment Variables:**
Add in Vercel dashboard:
- `GA4_MEASUREMENT_ID`
- `API_BASE_URL` (or deploy backend separately)

---

### Option 2: Netlify (Similar to Vercel)

```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

Or GitHub integration:
1. Push to GitHub
2. Import in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

**Functions:**
- Netlify Functions for API routes (if using)
- Environment variables in dashboard

---

### Option 3: AWS S3 + CloudFront (More Control)

#### S3 Setup
```bash
# Create bucket
aws s3 mb s3://saudisaashub.com

# Sync build output
aws s3 sync dist/ s3://saudisaashub.com \
  --delete \
  --acl public-read \
  --content-type "text/html" \
  --content-encoding "gzip" \
  --cache-control "max-age=31536000,public" \
  --exclude "*.html"

# HTML with shorter cache
aws s3 sync dist/ s3://saudisaashub.com \
  --delete \
  --acl public-read \
  --content-type "text/html" \
  --cache-control "max-age=300,public" \
  --include "*.html"
```

#### CloudFront Distribution
1. Create CloudFront distribution
2. Origin: S3 bucket REST endpoint
3. Enable: HTTP/2, Automatic compression
4. Cache behavior:
   - Path pattern: `*.html` → TTL 5 minutes
   - Path pattern: `*` → TTL 1 year (immutable)
5. Alternate domain: `saudisaashub.com`
6. SSL certificate: Request from ACM

---

### Option 4: Traditional VPS (Ubuntu + Nginx)

#### Install & Configure
```bash
# 1. Install nginx
sudo apt update && sudo apt install nginx

# 2. Upload dist/ to /var/www/saudisaashub
sudo mkdir -p /var/www/saudisaashub
sudo cp -r dist/* /var/www/saudisaashub/
sudo chown -R www-data:www-data /var/www/saudisaashub

# 3. Nginx config (/etc/nginx/sites-available/saudisaashub)
server {
    listen 80;
    server_name saudisaashub.com www.saudisaashub.com;
    root /var/www/saudisaashub;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;
    gzip_min_length 1024;

    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header Referrer-Policy strict-origin-when-cross-origin;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:";

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2|woff|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # HTML - no cache
    location ~* \.html$ {
        expires 5m;
        add_header Cache-Control "public, must-revalidate";
    }

    # API proxy (if backend on same server)
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Service worker
    location = /sw.js {
        add_header Cache-Control "no-cache";
    }

    # Fallback to index.html (SPA)
    location / {
        try_files $uri $uri/ /index.html;
    }
}

# 4. Enable site
sudo ln -s /etc/nginx/sites-available/saudisaashub /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# 5. Get SSL (Let's Encrypt)
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d saudisaashub.com -d www.saudisaashub.com
```

---

## CI/CD Pipeline <a name="cicd"></a>

### GitHub Actions Example

```yaml
name: Deploy SaudiSaaSHub

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - name: Run Lighthouse
        uses: treosh/lighthouse-ci-action@v9
        with:
          urls: 'http://localhost:3000'
          uploadArtifacts: true

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## SSL/TLS Configuration <a name="ssl"></a>

### Let's Encrypt (Free, Automated)
```bash
sudo certbot certonly --nginx -d saudisaashub.com -d www.saudisaashub.com
# Auto-renewal added to crontab
```

### Cloudflare SSL (Recommended)
1. SSL/TLS → Overview: **Full (strict)**
2. Origin Certificate (install on server)
3. Always Use HTTPS: **On**
4. Minimum TLS Version: **TLS 1.2**

---

## CDN Setup <a name="cdn"></a>

### Cloudflare
1. Enable proxy (orange cloud) for DNS records
2. Caching → Configuration:
   - Caching Level: **Standard** (notIgnore Query String)
   - Browser Cache TTL: **1 month**
   - Always Online: **Off** (to respect service worker)
3. Speed → Optimization:
   - Auto Minify: **Off** (we already minify)
   - Rocket Loader: **Off** (conflicts with SW)
   - Brotli: **On** (Automatic)
4. Rules:
   - Cache Level: Cache Everything for `/api/search` (short TTL: 5 min)
   - Browser Cache TTL: Override for static assets (1 year)

---

## Search Console & SEO <a name="seo"></a>

### Google Search Console
1. Add property: `https://saudisaashub.com`
2. Verify ownership (HTML file or DNS record)
3. Submit sitemap: `https://saudisaashub.com/sitemap.xml`
4. Set preferred domain: `https://saudisaashub.com` (www → non-www or vice versa)
5. Submit to **URL Inspection** for homepage

### Bing Webmaster Tools
1. Add site to Bing Webmaster Tools
2. Import sitemap
3. Submit URL

### Yandex Webmaster (Optional for Arabic)
1. Add site to Yandex.Webmaster
2. Verify ownership
3. Submit sitemap

### Hreflang Tags
Already implemented in HTML:
```html
<link rel="alternate" hreflang="ar" href="https://saudisaashub.com/">
<link rel="alternate" hreflang="en" href="https://saudisaashub.com/en/">
<link rel="alternate" hreflang="x-default" href="https://saudisaashub.com/">
```

Add alternate URLs for every translated page.

---

## Monitoring & Alerts <a name="monitoring"></a>

### Uptime Monitoring
- **UptimeRobot** (free): Monitor every 5 minutes
- **Pingdom**: Synthetic transactions
- **StatusCake**: Multiple locations

### Performance Monitoring
- **Google Analytics Web Vitals** (built-in)
- **Cloudflare Web Analytics** (free, privacy-focused)
- **SpeedCurve** (paid, detailed RUM)

### Error Monitoring
- **Sentry** (free tier): JavaScript errors
- **LogRocket**: Session replay
- **Cloudflare Logpush**: Error logs to S3/Datadog

### Alerts
Set up notifications for:
- HTTP errors (5xx)
- Performance degradation (LCP > 2.5s)
- SSL certificate expiry
- DNS changes

---

## Post-Deployment Verification <a name="verification"></a>

### 24-48 Hours After Launch

#### SEO
- [ ] Sitemap indexed (Search Console shows "Success")
- [ ] Homepage crawled & indexed (check URL Inspection)
- [ ] Structured data errors resolved
- [ ] Mobile usability issues fixed
- [ ] Core Web Vitals report showing data

#### Performance
- [ ] Lighthouse scores ≥95 on production
- [ ] Real user Web Vitals in GA4 (not just lab data)
- [ ] Service worker working (check Application tab in DevTools)
- [ ] CDN caching headers correct (check Network tab)
- [ ] Images lazy loading (scroll down, check Network)

#### Functionality
- [ ] All CTAs work (newsletter signup, company submit)
- [ ] Search returns results
- [ ] Filters work
- [ ] Pagination works (and has correct rel=prev/next)
- [ ] Language switch works (if applicable)
- [ ] Offline mode shows fallback

#### Analytics
- [ ] Real-time report shows active users
- [ ] Events fire (search, clicks, etc.)
- [ ] Custom dimensions populated
- [ ] Conversions tracked

#### Security
- [ ] HTTPS works (no mixed content warnings)
- [ ] Security headers present (check securityheaders.com)
- [ ] Rate limiting enabled
- [ ] No console errors

---

## Rollback Plan <a name="rollback"></a>

### Vercel/Netlify
- Easy: Redeploy previous version from Git history
- Can instant-rollback to previous production deployment

### AWS S3 + CloudFront
1. Upload previous version to S3
2. Invalidate CloudFront cache:
```bash
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```
3. Wait for invalidation (usually < 10 minutes)

### Manual Server
```bash
# Deploy to /tmp first
cp -r previous_build/* /var/www/saudisaashub/
# Then symlink switch (zero downtime)
ln -sfn /var/www/saudisaashub /var/www/current
systemctl reload nginx
```

### Database Rollback
- Backup database before migration
- Keep rollback scripts ready

---

## Go-Live Timeline

### T-1 Week
- [ ] Complete performance testing
- [ ] Validate SEO on staging
- [ ] Submit sitemap for staging (optional, `noindex` if needed)

### T-1 Day
- [ ] Final build & verification
- [ ] Deploy to production **without traffic**
- [ ] Run smoke tests
- [ ] Cache priming (warm up CDN)
- [ ] Update DNS TTL to 300 seconds (5 min)

### T-0 (Go-Live)
- [ ] Update DNS A record to new IP
- [ ] Wait for propagation (or use Cloudflare instant switch)
- [ ] Verify production is live (curl -I)
- [ ] Check monitoring dashboards

### T+1 Hour
- [ ] Check error logs
- [ ] Verify HTTPS/SSL working
- [ ] Test core user flows
- [ ] Check Search Console for crawl errors

### T+24 Hours
- [ ] Review Search Console indexing status
- [ ] Check Web Vitals GA4 report
- [ ] Validate structured data on sample pages
- [ ] Monitor error rates

---

## Troubleshooting

### Service Worker not updating
- Users may be stuck on old SW → Add version check
- Use `skipWaiting()` on activate
- Consider forced update prompt

### Mixed Content Errors
- All resources must use `https://`
- Update API_BASE_URL to HTTPS
- Use protocol-relative URLs: `//fonts.googleapis.com`

### Sitemap not indexing
- Ensure sitemap accessible at `https://saudisaashub.com/sitemap.xml`
- Submit manually in Search Console
- Wait 24-48 hours for initial crawl

### GA4 not receiving data
- Check browser console for errors
- Verify Measurement ID matches property
- Use GA4 DebugView: add `?gtm_debug=x` to URL
- Check ad blocker interference

---

## Support Contacts

- **Cloudflare Support**: https://support.cloudflare.com/
- **Google Search Central**: https://support.google.com/webmasters/
- **Vercel Support**: support@vercel.com

---

*Last updated: 2024-03-12*
