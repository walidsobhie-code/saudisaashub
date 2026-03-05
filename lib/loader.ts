import { getArticles } from './articles';

// This is a server-side module that loads articles
let articlesCache: any[] | null = null;

export async function loadArticles() {
  if (articlesCache) {
    return articlesCache;
  }

  try {
    articlesCache = await getArticles();
    return articlesCache;
  } catch (error) {
    console.error('Error loading articles:', error);
    return [];
  }
}
