# Saudi SaaS Hub

 Saudi Arabia's leading directory of Software-as-a-Service companies. Built with Next.js 14, static export, and deployed on Cloudflare Pages.

## Features

- **Company Directory**: Browse 29+ Saudi SaaS companies with filters (categories, certifications, employee size)
- **Company Profiles**: Detailed pages with descriptions, pricing plans, and features
- **Articles**: 10+ expert articles on Saudi tech landscape (Arabic)
- **Comparison Tool**: Compare up to 3 companies side-by-side
- **Bilingual**: Arabic (primary) + English landing page (`/en`)
- **Static Export**: Fully static site (HTML + JS) – fast, secure, cheap to host

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Data**: Static JSON (`lib/companies.json`)
- **Build**: Static export (`next build` → `out/`)
- **Hosting**: Cloudflare Pages

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
# Open http://localhost:3000

# Build for production
npm run build
# Output goes to ./out

# Serve built site locally
npx serve out
```

## Deployment

### Cloudflare Pages

1. Push to GitHub (this repo)
2. In Cloudflare Pages, create project → connect GitHub repo
3. Build settings:
   - **Build command**: `npm run build`
   - **Output directory**: `out`
4. Environment variables (add in dashboard):
   - `NEXT_PUBLIC_FORMSPRARE_ENDPOINT` = your Formspree endpoint (contact form)
   - `NEXT_PUBLIC_FORMSPRARE_NEWSLETTER` = your Formspree newsletter endpoint
   - `NEXT_PUBLIC_SITE_URL` = `https://saudisaashub.pages.dev`
5. Save and deploy

**Note**: The site is fully static – no database required at runtime.

### Vercel (alternative)

```bash
vercel --prod
```

## Project Structure

```
app/                     # Next.js app router pages
  page.tsx              # Arabic homepage
  en/page.tsx           # English landing page
  companies/            # Company directory & profiles
  articles/             # Blog articles
  contact/              # Contact form
  about/               # About page
components/             # Reusable UI components
lib/                    # Data & utilities
  companies.json        # Static company data (29 entries)
  saudi-saas-companies.ts  # Featured companies (English page)
  upcoming-events.ts    # Tech events
  trusted-companies.ts  # Platform statistics
public/                 # Static assets (images, fonts)
```

## Environment Variables

| Variable | Purpose | Required? |
|----------|---------|-----------|
| `NEXT_PUBLIC_FORMSPRARE_ENDPOINT` | Contact form submission URL | Yes |
| `NEXT_PUBLIC_FORMSPRARE_NEWSLETTER` | Newsletter signup URL | Yes |
| `NEXT_PUBLIC_SITE_URL` | Base site URL for sitemap & links | Yes |

## Current Limitations (Phase 1)

- **No admin panel** – static site, no write capability
- **No database** – all data is in JSON files
- **Placeholder external links** – some event URLs need verification
- **Limited company data** – 29 companies only (expanding in Phase 2)

## Roadmap

### Phase 1: Foundation (Critical – Weeks 1-4) ✅ COMPLETE
- [x] Convert to static export (removed DB)
- [x] Fix trust signals (realistic stats)
- [x] Complete English translation
- [x] Fix comparison tool
- [x] Accessibility & SEO basics
- [x] Deploy to Cloudflare Pages

### Phase 2: Data Moat (High – Months 1-3)
- [ ] Expand to 200+ companies
- [ ] Add funding rounds tracking
- [ ] ZATCA compliance hub
- [ ] Automated data updates

### Phase 3: Authority Content (High – Months 2-6)
- [ ] Founder interviews
- [ ] "State of Saudi SaaS" reports
- [ ] SEO-optimized comparisons
- [ ] Weekly newsletter

### Phase 4: Monetization (Medium – Months 3-6)
- [ ] Featured listings
- [ ] Sponsored content
- [ ] Job board

## Contributing

This is a private project. For questions or partnerships, contact [walidsobhi@example.com](mailto:walidsobhi@example.com).

## License

Proprietary. All rights reserved.
