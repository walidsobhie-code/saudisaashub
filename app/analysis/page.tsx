import { Metadata } from 'next';
import { getArticles } from '@/lib/articles';
import { ArticleCard } from '@/components/ArticleCard';
import dynamic from 'next/dynamic';

const ShareButtons = dynamic(() => import('@/components/ShareButtons'), {
  ssr: false,
  loading: () => <div className="h-10" />,
});

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Market Analysis | Saudi SaaS Hub',
    description: 'Deep market analysis, trend reports, and insights on Saudi SaaS ecosystem.',
    keywords: 'Saudi SaaS analysis, market trends, tech insights KSA',
    openGraph: {
      title: 'Market Analysis',
      description: 'Market insights and trend reports for Saudi SaaS',
      type: 'website',
      url: 'https://saudisaashub.pages.dev/analysis',
    },
    alternates: {
      canonical: 'https://saudisaashub.pages.dev/analysis',
    },
  };
}

export default async function AnalysisPage() {
  const articles = await getArticles();

  // Treat all articles as analysis content
  const analysisArticles = articles.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Get unique categories for filter
  const categories = Array.from(new Set(articles.flatMap(a => a.categories)));

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">الرؤى وتحليل السوق</h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            تحليل عميق لاتجاهات السوق، وأنماط الاستثمار، وتبني التقنية عبر السعودية
          </p>
        </div>

        {/* Sharing */}
        <div className="text-center mb-8">
          <p className="text-text-muted text-sm mb-2">شارك هذه التحليلات</p>
          <ShareButtons title="Market Analysis" url="https://saudisaashub.pages.dev/analysis" />
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {analysisArticles.map(article => (
            <ArticleCard
              key={article.slug}
              title={article.title}
              excerpt={article.excerpt}
              slug={`/articles/${article.slug}`}
              date={article.date}
              categories={article.categories}
              readingTime={article.readingTime}
              image={article.image}
            />
          ))}
        </div>

        {analysisArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-muted text-lg">لا توجد مقالات تحليلية حالياً</p>
          </div>
        )}
      </div>
    </div>
  );
}


