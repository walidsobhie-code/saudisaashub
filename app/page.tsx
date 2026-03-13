import Link from 'next/link';
import { getArticles } from '@/lib/articles';
import { ArticleCard } from '@/components/ArticleCard';
import { Newsletter } from '@/components/Newsletter';
import { Hero } from '@/components/Hero';
import { TrustedCompanies } from '@/components/TrustedCompanies';
import { SaudiSaaSCompanies } from '@/components/SaudiSaaSCompanies';
import { CompanyComparer } from '@/components/CompanyComparer';
import { UpcomingEvents } from '@/components/UpcomingEvents';

export default async function Home() {
  const articles = await getArticles();
  const featuredArticles = articles.slice(0, 6);

  // JSON-LD for Organization + Website
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Saudi SaaS Hub',
    url: 'https://saudisaashub.com',
    description: 'المصدر الأول لـ SaaS في المملكة العربية السعودية',
    publisher: {
      '@type': 'Organization',
      name: 'Saudi SaaS Hub',
      logo: {
        '@type': 'ImageObject',
        url: 'https://saudisaashub.com/logo.png',
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://saudisaashub.com/articles?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero />

      {/* Trusted Companies Section */}
      <TrustedCompanies />

      {/* Articles Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white">أحدث المقالات</h2>
            <Link
              href="/articles"
              className="text-accent-green hover:text-white transition-colors text-sm flex items-center gap-1"
            >
              عرض الكل
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredArticles.map((article) => (
              <ArticleCard
                key={article.slug}
                title={article.title}
                excerpt={article.excerpt}
                slug={article.slug}
                date={article.date}
                categories={article.categories}
                readingTime={article.readingTime}
                image={article.image}
              />
            ))}
          </div>

          {featuredArticles.length === 0 && (
            <div className="text-center py-20 text-text-muted">
              جاري تحميل المقالات...
            </div>
          )}
        </div>
      </section>

      {/* Saudi SaaS Companies Section */}
      <SaudiSaaSCompanies />

      {/* Upcoming Events Section */}
      <UpcomingEvents />

      {/* Company Comparer Section */}
      <CompanyComparer />

      {/* Categories */}
      <section className="py-16 bg-card/30">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white text-center mb-8">تصفح حسب الفئة</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {['SaaS', 'Startup', 'التسويق', 'التقنية', 'الأعمال', 'ZATCA', 'الفوترة الإلكترونية'].map((category) => (
              <Link
                key={category}
                href={`/articles?category=${encodeURIComponent(category)}`}
                className="px-5 py-2.5 rounded-xl bg-card border border-white/5 text-text-secondary hover:text-accent-green hover:border-accent-green/30 transition-all"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
