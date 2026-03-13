import { getArticles } from '@/lib/articles';

export default async function sitemap() {
  const articles = await getArticles();
  // Use environment variable for base URL, defaults to Cloudflare Pages subdomain
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://saudisaashub.pages.dev';

  const staticPages = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/en`, lastModified: new Date() },
    { url: `${baseUrl}/companies`, lastModified: new Date() },
    { url: `${baseUrl}/search`, lastModified: new Date() },
    { url: `${baseUrl}/zatca`, lastModified: new Date() },
    { url: `${baseUrl}/funding`, lastModified: new Date() },
    { url: `${baseUrl}/reports/state-of-saudi-saas-2026`, lastModified: new Date() },
    { url: `${baseUrl}/articles`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
  ];

  const articlePages = articles.map((article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date(article.date),
  }));

  return [...staticPages, ...articlePages];
}
