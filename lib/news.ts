export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string; // Markdown or HTML
  publish_date: string; // ISO date
  author: string;
  category: 'funding' | 'regulation' | 'company-news' | 'partnership' | 'analysis';
  tags: string[];
  source_url?: string;
  is_breaking?: boolean;
}

// Sample news data - can be expanded manually or via API later
export const newsItems: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Salla Secures $50M Series B to Expand Across MENA',
    slug: 'salla-secures-50m-series-b',
    summary: 'Leading Saudi e-commerce platform raises significant funding to accelerate regional expansion and product development.',
    content: `# Salla Raises $50M Series B

The Jeddah-based SaaS e-commerce platform has secured a $50 million Series B round led by top regional investors. This brings Salla's total funding to over $90M.

## Key Highlights

- **Valuation**: $350M post-money
- **Investors**: Saudi Venture Capital Company, Rua Growth Fund, existing investors
- **Use of funds**: Regional expansion, product development, talent acquisition
- **Current metrics**: 100,000+ active stores, processing billions in GMV annually

"This funding validates Saudi Arabia's SaaS ecosystem," said CEO Abdullah Al-Otaibi. "We're committed to empowering entrepreneurs across the region."

## Market Impact

Saudi's e-commerce sector has seen explosive growth post-Vision 2030 reforms. The platform's focus on Arabic-first experiences and ZATCA compliance has made it a preferred choice for local merchants.

*Source: Company press release, March 10, 2026*`,
    publish_date: '2026-03-10T09:00:00Z',
    author: 'Nova Al-Saud',
    category: 'funding',
    tags: ['Salla', 'Series B', 'E-commerce', 'MENA'],
    is_breaking: true,
  },
  {
    id: 'news-2',
    title: 'ZATCA Extends Fatoora Phase 2 Deadline by 6 Months',
    slug: 'zatca-extends-fatoora-phase-2-deadline',
    summary: 'Saudi tax authority announces extended transition period for Phase 2 e-invoicing requirements, giving businesses more time to comply.',
    content: `# ZATCA Extends Fatoora Phase 2 Deadline

The Saudi Tax Authority (ZATCA) has officially extended the Phase 2 implementation deadline by six months, now setting the new cutoff for **September 30, 2026**.

## What This Means

- Original deadline: March 31, 2026
- New deadline: **September 30, 2026**
- Applies to all VAT-registered businesses with turnover above SAR 40M
- Smaller businesses get additional grace period

## Why the Extension?

ZATCA cited feedback from the private sector regarding technical integration challenges, particularly for SaaS providers needing to update their systems.

## Next Steps for SaaS Companies

1. **Immediate**: Review your e-invoicing implementation status
2. **Within 30 days**: Engage with your SaaS provider to confirm compliance roadmap
3. **By June 2026**: Complete Phase 2 testing and certification
4. **By September 2026**: Full live deployment

Our ZATCA Compliance Hub tracks all updates and provides a checklist for SaaS developers.

*Source: ZATCA Official Circular, March 8, 2026*`,
    publish_date: '2026-03-08T14:30:00Z',
    author: 'Nova Al-Saud',
    category: 'regulation',
    tags: ['ZATCA', 'Fatoora', 'Compliance', 'Deadline'],
    source_url: 'https://zatca.gov.sa/en/announcements/fatoora-phase2-extension',
  },
  {
    id: 'news-3',
    title: 'Tabby Launches New B2B SaaS Payment Solutions',
    slug: 'tabby-launches-b2b-saas-payments',
    summary: 'Buy Now Pay Later giant expands into B2B SaaS payment infrastructure with recurring billing and installment management.',
    content: `# Tabby Launches B2B SaaS Payments

Tabby, the leading BNPL provider in the region, has announced a new B2B payment infrastructure product specifically designed for SaaS companies.

## Product Features

- Recurring billing with flexible installment plans
- Multi-currency support
- ZATCA-compliant invoicing
- API-first integration
- Same-day settlement

## Target Market

Saudi SaaS companies selling to other businesses can now offer their customers flexible payment terms without taking on credit risk.

"B2B SaaS has unique payment needs that traditional BNPL doesn't address," said Tabby's CPO. "This product bridges that gap."

## Early Adopters

Several Saudi SaaS companies are already in beta testing, including a major HR tech platform and a B2B logistics provider.

*Source: Tabby Press Release, March 5, 2026*`,
    publish_date: '2026-03-05T11:00:00Z',
    author: 'Nova Al-Saud',
    category: 'company-news',
    tags: ['Tabby', 'Payments', 'B2B', 'BNPL', 'Fintech'],
    source_url: 'https://tabby.ai/news/b2b-saas-launch',
  },
  {
    id: 'news-4',
    title: 'Vision 2030 Fund Leads $30M Investment in Local SaaS Startup',
    slug: 'vision-2030-fund-invests-30m-saas-startup',
    summary: 'The Public Investment Fund-backed Vision 2030 fund invests in a promising Saudi SaaS startup developing AI-powered customer service solutions.',
    content: `# Vision 2030 Fund Invests in Saudi AI SaaS

The Vision 2030 fund has led a $30 million Series A investment in **ServiceAI**, a Riyadh-based startup building AI-powered customer service automation for Arabic-speaking markets.

## Investment Details

- **Round size**: $30M
- **Lead investor**: Vision 2030 Fund (PIF)
- **Co-investors**: STV, Raed Ventures
- **Pre-money valuation**: $120M
- **Customer base**: 200+ Saudi enterprises

## Technology

ServiceAI's platform specializes in Arabic natural language processing, enabling businesses to automate customer support while maintaining cultural nuance.

"The Saudi AI ecosystem is maturing rapidly," said the fund's managing director. "ServiceAI demonstrates the depth of local technical talent."

## Use of Funds

- R&D: 40%
- Sales & Marketing: 35%
- Talent hiring: 25%

*Source: PIF Announcement, March 3, 2026*`,
    publish_date: '2026-03-03T08:00:00Z',
    author: 'Nova Al-Saud',
    category: 'funding',
    tags: ['ServiceAI', 'AI', 'PIF', 'Series A', 'Vision 2030'],
    source_url: 'https://pif.gov.sa/en/news/service-ai-investment',
  },
  {
    id: 'news-5',
    title: 'Saudi SaaS Funding Landscape: Q1 2026 Report',
    slug: 'saudi-saas-funding-q1-2026-analysis',
    summary: 'Quarterly analysis reveals 35% increase in SaaS funding, with fintech and e-commerce leading the charge.',
    content: `# Q1 2026 Saudi SaaS Funding Report

The first quarter of 2026 has shown remarkable growth in Saudi SaaS financing, with total investment reaching **$285M across 22 deals**, representing a 35% increase from Q4 2025.

## Key Metrics

| Metric | Q1 2026 | Q4 2025 | Change |
|--------|---------|---------|--------|
| Total Funding | $285M | $211M | +35% |
| Number of Deals | 22 | 18 | +22% |
| Average Deal Size | $12.9M | $11.7M | +10% |
| Seed/Pre-Seed | 8 deals | 6 deals | ↑ |
| Series A/B | 12 deals | 10 deals | ↑ |

## Sector Breakdown

1. **Fintech SaaS**: $98M (34%)
2. **E-commerce SaaS**: $67M (24%)
3. **HR Tech**: $42M (15%)
4. **HealthTech**: $28M (10%)
5. **Other**: $50M (17%)

## Notable Trends

- **Foreign investor participation** increased to 45% of deals (from 30% in Q4)
- **Government-linked funds** remain active, particularly through PIF vehicles
- **Series A rounds** getting larger, showing maturation
- **ZATCA compliance** cited as key driver for enterprise SaaS adoption

## Outlook

Q2 2026 is expected to be even stronger, with several large rounds already in pipeline.

*This analysis compiled from Crunchbase, MAGNiT, and Saudi SaaS Hub tracking.*`,
    publish_date: '2026-03-01T06:00:00Z',
    author: 'Saudi SaaS Hub Research Team',
    category: 'analysis',
    tags: ['Funding', 'Quarterly Report', 'Market Analysis', 'Q1 2026'],
    source_url: 'https://saudisaashub.pages.dev/reports/q1-2026-funding',
  },
  // Add more news items as needed...
];

// Query functions
export function getAllNews(): NewsItem[] {
  return [...newsItems].sort((a, b) => 
    new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime()
  );
}

export function getBreakingNews(): NewsItem[] {
  return newsItems.filter(item => item.is_breaking);
}

export function getNewsByCategory(category: NewsItem['category']): NewsItem[] {
  return newsItems.filter(item => item.category === category);
}

export function getNewsByDateRange(startDate: string, endDate: string): NewsItem[] {
  return newsItems.filter(item => {
    const date = new Date(item.publish_date);
    return date >= new Date(startDate) && date <= new Date(endDate);
  });
}

export function getNewsByTag(tag: string): NewsItem[] {
  return newsItems.filter(item => item.tags.includes(tag));
}

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return newsItems.find(item => item.slug === slug);
}
