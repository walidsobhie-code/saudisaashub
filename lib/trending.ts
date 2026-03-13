import { companies } from './companies';

// Static trending lists – can be updated manually or automated later
export const trendingCompanies: string[] = [
  'salla',
  'tabby',
  'absher',
  'unifonic',
  'flyah',
];

export const trendingArticles: string[] = [
  'state-of-saudi-saas-2026',
  'zatca-compliance-guide',
  'raise-seed-saudi',
  'top-10-saudi-saas',
];

// Helper to get trending company objects
export function getTrendingCompanies() {
  return companies.filter(c => trendingCompanies.includes(c.slug));
}

// Helper to get trending article slugs (would integrate with articles lib)
export function getTrendingArticleSlugs() {
  return trendingArticles;
}
