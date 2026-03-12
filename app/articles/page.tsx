import Link from 'next/link';
import { getArticles } from '@/lib/articles';
import { ArticleCard } from '@/components/ArticleCard';
import { SearchForm } from '@/components/SearchForm';

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: { category?: string; q?: string };
}) {
  const articles = await getArticles();

  // Filter by category if provided
  let filteredArticles = articles;
  if (searchParams.category) {
    filteredArticles = articles.filter((article) =>
      article.categories.some(
        (cat) =>
          cat.toLowerCase() === searchParams.category?.toLowerCase() ||
          cat.includes(searchParams.category!)
      )
    );
  }

  // Filter by search query if provided
  if (searchParams.q) {
    const query = searchParams.q.toLowerCase();
    filteredArticles = filteredArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query)
    );
  }

  // Get all unique categories
  const allCategories = Array.from(
    new Set(articles.flatMap((article) => article.categories))
  ).sort();

  return (
    <>
      {/* Header */}
      <section className="py-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">المقالات</h1>
          <p className="text-text-secondary">
            اكتشف أحدث المقالات حول التقنية والأعمال في المملكة العربية السعودية
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 space-y-6">
          <SearchForm />

          <div className="flex flex-wrap gap-3">
            <Link
              href="/articles"
              className={`px-4 py-2 rounded-full transition-all ${
                !searchParams.category
                  ? 'gradient-bg text-white'
                  : 'bg-card border border-white/10 text-text-secondary hover:border-accent-pink/30'
              }`}
            >
              الكل
            </Link>
            {allCategories.slice(0, 8).map((category) => (
              <Link
                key={category}
                href={`/articles?category=${encodeURIComponent(category)}${searchParams.q ? `&q=${encodeURIComponent(searchParams.q)}` : ''}`}
                className={`px-4 py-2 rounded-full transition-all ${
                  searchParams.category === category
                    ? 'gradient-bg text-white'
                    : 'bg-card border border-white/10 text-text-secondary hover:border-accent-pink/30'
                }`}
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <ArticleCard
                key={article.slug}
                title={article.title}
                excerpt={article.excerpt}
                slug={article.slug}
                date={article.date}
                categories={article.categories}
                readingTime={article.readingTime}
              />
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-card flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-text-muted"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">لا توجد مقالات</h3>
              <p className="text-text-secondary mb-6">
                لم يتم العثور على مقالات تطابق معايير البحث
              </p>
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 text-accent-pink hover:text-accent-cyan"
              >
                عرض جميع المقالات
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
