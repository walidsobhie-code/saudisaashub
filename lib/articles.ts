export interface Article {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  categories: string[];
  author: string;
  readingTime: number;
}

export interface ParsedArticle {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  categories: string[];
  author: string;
  readingTime: number;
}

export async function getArticles(): Promise<ParsedArticle[]> {
  const { articles } = await import('./articles-data');
  return articles as ParsedArticle[];
}

export function getArticleBySlug(slug: string): ParsedArticle | undefined {
  const { articles } = require('./articles-data');
  return articles.find((article: ParsedArticle) => article.slug === slug);
}

export function getRelatedArticles(currentSlug: string, categories: string[], limit: number = 3): ParsedArticle[] {
  const { articles } = require('./articles-data');
  return articles.filter((article: ParsedArticle) => 
    article.slug !== currentSlug && 
    article.categories.some(cat => categories.includes(cat))
  ).slice(0, limit);
}

export function getAllCategories(): string[] {
  const { articles } = require('./articles-data');
  const categories = new Set<string>();
  for (const article of articles) {
    for (const cat of article.categories) categories.add(cat);
  }
  return Array.from(categories).sort();
}
