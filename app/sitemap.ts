import { getArticles } from '@/lib/articles';

export default async function sitemap() {
  const articles = await getArticles();
  const baseUrl = 'https://f35cdfe3.f249971c.saudisaashub.pages.dev';

  const staticPages = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/articles`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
  ];

  const articlePages = articles.map((article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date(article.date),
  }));

  return [...staticPages, ...articlePages];
}
