import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getNewsBySlug, getAllNews } from '@/lib/news';
import { format } from 'date-fns';
import { ArticleContent } from '@/components/ArticleContent';
import { Breadcrumb } from '@/components/Breadcrumb';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const allNews = getAllNews();
  return allNews.map(item => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);

  if (!article) return {};

  return {
    title: article.title,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      type: 'article',
      publishedTime: article.publish_date,
      authors: [article.author],
      tags: article.tags,
    },
  };
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);

  if (!article) {
    notFound();
  }

  // Get related news (same category, excluding current)
  const relatedNews = getAllNews()
    .filter(item => item.category === article.category && item.id !== article.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'News', href: '/news' },
            { label: article.category, href: `/news/${slug}` },
          ]}
        />

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-accent-green/10 text-accent-green text-xs font-semibold rounded uppercase">
              {article.category.replace('-', ' ')}
            </span>
            {article.is_breaking && (
              <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-semibold rounded uppercase">
                Breaking
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 text-text-muted text-sm mb-6">
            <span>{format(new Date(article.publish_date), 'MMMM d, yyyy')}</span>
            <span>•</span>
            <span>By {article.author}</span>
          </div>

          {article.source_url && (
            <a
              href={article.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent-green text-sm hover:underline"
            >
              Source Original
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </header>

        {/* Article Content */}
        <article className="article-content mb-12">
          <ArticleContent 
            content={article.content} 
            relatedArticles={relatedNews.map(item => ({ title: item.title, slug: item.slug }))}
            slug={slug}
          />
        </article>

        {/* Newsletter CTA */}
        <div className="bg-card rounded-xl border border-white/5 p-8 text-center mb-12">
          <h3 className="text-2xl font-bold text-white mb-2">Stay Updated</h3>
          <p className="text-text-secondary mb-6">
            Get weekly insights on Saudi SaaS companies, funding rounds, and compliance updates.
          </p>
          <Link
            href="/contact?type=newsletter"
            className="inline-block px-8 py-3 bg-accent-green text-background font-semibold rounded-lg hover:bg-accent-green/90 transition-all"
          >
            Subscribe to Newsletter
          </Link>
        </div>

        {/* Related News */}
        {relatedNews.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Related News</h2>
            <div className="space-y-4">
              {relatedNews.map(item => (
                <Link
                  key={item.id}
                  href={`/news/${item.slug}`}
                  className="block bg-card/50 rounded-lg p-4 hover:bg-card transition-colors group"
                >
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-accent-green transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary text-sm">
                    {format(new Date(item.publish_date), 'MMMM d, yyyy')}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'NewsArticle',
              headline: article.title,
              datePublished: article.publish_date,
              author: { '@type': 'Person', name: article.author },
              description: article.summary,
              publisher: {
                '@type': 'Organization',
                name: 'Saudi SaaS Hub',
                logo: { '@type': 'ImageObject', url: 'https://saudisaashub.pages.dev/logo.png' },
              },
            }),
          }}
        />
      </div>
    </div>
  );
}
