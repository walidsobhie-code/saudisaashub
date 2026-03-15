import { articles as generatedArticles, getAllCategories as getGeneratedCategories, Article } from './generated-articles';
import { newArticles, moreArticles } from './new-articles';

export function getArticles() {
  return [...newArticles, ...moreArticles, ...generatedArticles];
}

export function getAllCategories(): string[] {
  const generatedCats = getGeneratedCategories();
  const newCats = newArticles.flatMap((a: any) => a.categories);
  const moreCats = moreArticles.flatMap((a: any) => a.categories);
  const combined = [...generatedCats, ...newCats, ...moreCats];
  return Array.from(new Set(combined));
}

export type { Article };