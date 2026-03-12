import { parseArticlesFromXML } from './xml-parser';

const articles = await parseArticlesFromXML();

// Generate static search index
const searchIndex = articles.map(article => ({
  title: article.title,
  slug: article.slug,
  excerpt: article.excerpt,
  content: article.content,
  categories: article.categories
}));

// Save as JSON for client-side search
import { writeFileSync, mkdirSync } from 'fs';
const outDir = './public/data';
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/search-index.json`, JSON.stringify(searchIndex, null, 2));

console.log(`Generated search index with ${searchIndex.length} articles`);
