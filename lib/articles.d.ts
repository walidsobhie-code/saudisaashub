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

export function getArticles(): Article[];
export function getArticleBySlug(slug: string): Article | undefined;
export function getRelatedArticles(currentSlug: string, categories: string[], limit?: number): Article[];
export function getAllCategories(): string[];
