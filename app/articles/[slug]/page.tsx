import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticles } from '@/lib/articles';
import { VerifiedBadge } from '@/components/VerifiedBadge';
import { ArticleCard } from '@/components/ArticleCard';
import { ShareButtons } from '@/components/ShareButtons';
import { VerifiedContentBadge } from '@/components/VerifiedContentBadge';
import { ArticleFAQ } from '@/components/ArticleFAQ';
import { generateSampleFAQs } from '@/lib/faqs';
import { QuestionHook, ArticleHashtags } from '@/components/ArticleHooks';
import { ArticleContent } from '@/components/ArticleContent';
import { PublisherCard } from '@/components/PublisherCard';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const articles = await getArticles();
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    return { title: 'المقال غير موجود - SaudiSaaSHub' };
  }

  const url = `https://saudisaashub.com/articles/${article.slug}`;

  return {
    title: `${article.title} | SaudiSaaSHub`,
    description: article.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.date,
      url: url,
      images: article.image ? [article.image] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: article.image ? [article.image] : [],
    },
    other: {
      'script:ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.excerpt,
        author: { '@type': 'Organization', name: 'Saudi SaaS Hub' },
        publisher: {
          '@type': 'Organization',
          name: 'Saudi SaaS Hub',
          logo: {
            '@type': 'ImageObject',
            url: 'https://saudisaashub.com/logo.png',
          },
        },
        datePublished: article.date,
        dateModified: article.date,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url,
        },
        keywords: article.categories.join(', '),
        wordCount: article.content.split(/\s+/).filter(w => w.length > 0).length,
        articleSection: article.categories[0] || 'مقالات',
        inLanguage: 'ar-SA',
      }),
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const articles = await getArticles();
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  // Get related articles
  const relatedArticles = articles
    .filter((a) => a.slug !== article.slug)
    .filter((a) => a.categories.some((cat) => article.categories.includes(cat)))
    .slice(0, 3);

  const formattedDate = 'مؤخراً';

  // Generate FAQs based on article
  const faqs = generateSampleFAQs(article.title, article.content);

  return (
    <>
      {/* Article Header - Professional Style */}
      <section className="py-10 md:py-14 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-text-muted mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              الرئيسية
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/articles" className="hover:text-white transition-colors">
              المقالات
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-text-secondary truncate max-w-[200px]">{article.title}</span>
          </nav>

          {/* Featured Image */}
          {article.image && (
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8 shadow-2xl">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
          )}

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-5">
            {article.categories.map((category) => (
              <Link
                key={category}
                href={`/articles?category=${encodeURIComponent(category)}`}
                className="px-3 py-1 text-sm rounded-full bg-accent-green/10 text-accent-green border border-accent-green/20 hover:bg-accent-green/20 transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white">
            {article.title}
          </h1>

          {/* Excerpt/Led paragraph */}
          {article.excerpt && (
            <p className="text-xl text-text-secondary mb-6 leading-relaxed max-w-3xl">
              {article.excerpt}
            </p>
          )}

          {/* Meta - Clean layout */}
          <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-sm text-text-muted">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-green/20 to-purple-500/20 flex items-center justify-center">
                <span className="text-accent-green text-sm font-bold">S</span>
              </div>
              <span className="text-white font-medium">Saudi SaaS Hub</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{article.readingTime} دقيقة قراءة</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Body with Sidebar */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Main Content */}
            <div className="flex-1 lg:max-w-[800px]">
              {/* Question Hook */}
              <QuestionHook title={article.title} />

              {/* Main Content */}
              <ArticleContent content={article.content} relatedArticles={relatedArticles} slug={article.slug} />

              {/* Hashtags */}
              <ArticleHashtags categories={article.categories} />

              {/* Share & Badge */}
              <div className="mt-10 pt-8 border-t border-white/10 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">مشاركة المقال</h3>
                  <ShareButtons
                    title={article.title}
                    url={`https://saudisaashub.com/articles/${article.slug}`}
                  />
                </div>
                <VerifiedContentBadge />
              </div>

              {/* FAQs */}
              <div className="mt-10">
                <ArticleFAQ faqs={faqs} />
              </div>
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-24 space-y-4">
                {/* Publisher Card */}
                <PublisherCard />

                {/* Table of Contents */}
                <div className="p-5 rounded-xl bg-card/50 border border-white/10">
                  <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                    المحتويات
                  </h3>
                  <nav className="space-y-1">
                    {article.categories.slice(0, 5).map((cat, i) => (
                      <a
                        key={cat}
                        href={`/articles?category=${encodeURIComponent(cat)}`}
                        className="block py-2 px-3 rounded-lg text-sm text-text-secondary hover:text-white hover:bg-white/5 transition-colors"
                      >
                        {cat}
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Quick stats */}
                <div className="mt-4 p-5 rounded-xl bg-gradient-to-br from-accent-green/10 to-purple-500/10 border border-accent-green/20">
                  <h4 className="font-semibold text-white mb-3">معلومات المقال</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-muted">وقت القراءة</span>
                      <span className="text-white">{article.readingTime} دقيقة</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">الفئات</span>
                      <span className="text-white">{article.categories.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-12 bg-card/30">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">مقالات ذات صلة</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <ArticleCard
                  key={related.slug}
                  title={related.title}
                  excerpt={related.excerpt}
                  slug={related.slug}
                  date={related.date}
                  categories={related.categories}
                  readingTime={related.readingTime}
                  image={related.image}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
