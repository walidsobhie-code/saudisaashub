import { articles as generatedArticles, getAllCategories as getGeneratedCategories, Article } from './generated-articles';
import { newArticles } from './new-articles';

export function getArticles() {
  return [...newArticles, ...generatedArticles];
}

export function getAllCategories(): string[] {
  const generatedCats = getGeneratedCategories();
  const newCats = newArticles.flatMap((a: any) => a.categories);
  const combined = [...generatedCats, ...newCats];
  return Array.from(new Set(combined));
}

export type { Article };