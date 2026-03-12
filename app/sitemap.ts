import { getArticles } from '@/lib/articles';

export default async function sitemap() {
  const articles = await getArticles();
  const baseUrl = 'https://saudisaashub.com';

  const staticPages = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/en`, lastModified: new Date() },
    { url: `${baseUrl}/articles`, lastModified: new Date() },
    { url: `${baseUrl}/en/articles`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/en/about`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    { url: `${baseUrl}/en/contact`, lastModified: new Date() },
  ];

  const articlePages = articles.map((article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date(article.date),
  }));

  // English article pages (point to same articles but /en prefix)
  const enArticlePages = articles.map((article) => ({
    url: `${baseUrl}/en/articles/${article.slug}`,
    lastModified: new Date(article.date),
  }));

  return [...staticPages, ...articlePages, ...enArticlePages];
}
