export interface EditorialPick {
  type: 'article' | 'report' | 'company' | 'event';
  id: string;
  headline: string;
  excerpt: string;
  reason: string; // Why this was picked
  link: string;
  imageUrl?: string;
}

// Manual curation – edit this array to update the Editorial Spotlight
export const editorialPicks: EditorialPick[] = [
  {
    type: 'report',
    id: 'state-of-saudi-saas-2026',
    headline: 'State of Saudi SaaS 2026',
    excerpt: 'Comprehensive market analysis covering 252 companies, funding trends, and ZATCA impact.',
    reason: ' cornerstone research report establishing platform authority',
    link: '/reports/state-of-saudi-saas-2026',
    imageUrl: '/images/report-2026-og.png',
  },
  {
    type: 'article',
    id: 'zatca-compliance-guide',
    headline: 'The Ultimate ZATCA E-Invoicing Guide',
    excerpt: 'Everything Saudi SaaS companies need to know about Fatoora compliance.',
    reason: 'High-demand practical guide with immediate utility',
    link: '/articles/zatca-compliance-guide',
  },
  {
    type: 'company',
    id: 'salla',
    headline: 'Salla',
    excerpt: 'Leading e-commerce platform powering 100,000+ stores in MENA',
    reason: 'Flagship Saudi SaaS success story',
    link: '/companies/salla',
    imageUrl: '/logos/salla.png',
  },
];
