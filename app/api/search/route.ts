import { NextResponse } from 'next/server';
import { getArticles } from '@/lib/articles';

export async function GET() {
  try {
    const articles = await getArticles();

    // Return simplified article data for search
    const searchData = articles.map((article) => ({
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      categories: article.categories,
    }));

    return NextResponse.json(searchData);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json([]);
  }
}
