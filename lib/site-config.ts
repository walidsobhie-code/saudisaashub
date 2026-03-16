/**
 * Site configuration using environment variables
 * Falls back to Cloudflare Pages subdomain for backward compatibility
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://saudisaashub.pages.dev';

// Helper to construct article URLs
export function getArticleUrl(slug: string): string {
  return `${SITE_URL}/articles/${slug}`;
}

// Helper to construct company URLs
export function getCompanyUrl(slug: string): string {
  return `${SITE_URL}/companies/${slug}`;
}

// Helper to construct category URLs
export function getCategoryUrl(slug: string): string {
  return `${SITE_URL}/category/${slug}`;
}
