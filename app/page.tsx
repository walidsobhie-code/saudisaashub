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

  // JSON-LD for Organization + Website (Arabic)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Saudi SaaS Hub',
    url: 'https://saudisaashub.pages.dev',
    description: 'المصدر الأول لـ SaaS في المملكة العربية السعودية',
    publisher: {
      '@type': 'Organization',
      name: 'Saudi SaaS Hub',
      logo: {
        '@type': 'ImageObject',
        url: 'https://saudisaashub.pages.dev/logo.png',
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://saudisaashub.pages.dev/articles?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'ar-SA',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hreflang alternates */}
      <link rel="alternate" hrefLang="ar" href="https://saudisaashub.pages.dev/" />
      <link rel="alternate" hrefLang="en" href="https://saudisaashub.pages.dev/en" />
      <link rel="alternate" hrefLang="x-default" href="https://saudisaashub.pages.dev/" />

      <Hero />

      {/* Featured Reports & Guides */}
      <section className="py-20 bg-gradient-to-b from-accent-green/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">تقرير ومقالات مميزة</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              اكتشف أبحاثنا الشاملة وأدلةنا العملية لمساعدتك على فهم سوق SaaS السعودي
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* State of Saudi SaaS 2026 */}
            <Link
              href="/reports/state-of-saudi-saas-2026"
              className="group bg-card rounded-xl border border-white/5 overflow-hidden hover:border-accent-green/30 transition-all"
            >
              <div className="p-8 bg-gradient-to-br from-accent-green/10 to-transparent">
                <div className="text-4xl font-bold text-accent-green mb-4">📊</div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-green transition-colors">
                  حالة سوق SaaS السعودية 2026
                </h3>
                <p className="text-text-secondary text-sm mb-4">
                  تقرير سنوي شامل يحلل حجم السوق، الاتجاهات، التمويل، وتأثير ZATCA
                </p>
                <div className="flex items-center gap-2 text-accent-green text-sm font-medium">
                  اقرأ التقرير
                  <span>→</span>
                </div>
              </div>
            </Link>

            {/* ZATCA Compliance Guide */}
            <Link
              href="/articles/zatca-compliance-guide"
              className="group bg-card rounded-xl border border-white/5 overflow-hidden hover:border-accent-green/30 transition-all"
            >
              <div className="p-8 bg-gradient-to-br from-accent-cyan/10 to-transparent">
                <div className="text-4xl font-bold text-accent-cyan mb-4">⚖️</div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-green transition-colors">
                  دليل امتثال ZATCA للفواتير الإلكترونية
                </h3>
                <p className="text-text-secondary text-sm mb-4">
                  كل ما تحتاج معرفته about نظام Fatoora: المراحل، المتطلبات، والعقوبات
                </p>
                <div className="flex items-center gap-2 text-accent-green text-sm font-medium">
                  اقرأ الدليل
                  <span>→</span>
                </div>
              </div>
            </Link>

            {/* Raise Seed Funding */}
            <Link
              href="/articles/raise-seed-saudi"
              className="group bg-card rounded-xl border border-white/5 overflow-hidden hover:border-accent-green/30 transition-all"
            >
              <div className="p-8 bg-gradient-to-br from-purple-500/10 to-transparent">
                <div className="text-4xl font-bold text-purple-400 mb-4">💰</div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-green transition-colors">
                  كيفية جمع التمويل المبدئي في السعودية
                </h3>
                <p className="text-text-secondary text-sm mb-4">
                  دليل عملي خطوة بخطوة: من التحضير إلى إبرام الصفقة مع المستثمرين
                </p>
                <div className="flex items-center gap-2 text-accent-green text-sm font-medium">
                  اقرأ الدليل
                  <span>→</span>
                </div>
              </div>
            </Link>

            {/* Top 10 SaaS Companies */}
            <Link
              href="/articles/top-10-saudi-saas"
              className="group bg-card rounded-xl border border-white/5 overflow-hidden hover:border-accent-green/30 transition-all"
            >
              <div className="p-8 bg-gradient-to-br from-pink-500/10 to-transparent">
                <div className="text-4xl font-bold text-pink-400 mb-4">🏆</div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-green transition-colors">
                  أفضل 10 شركات SaaS في السعودية
                </h3>
                <p className="text-text-secondary text-sm mb-4">
                  تحليل مقارن مفصل لأبرز الشركات مع نقاط القوة والضعف
                </p>
                <div className="flex items-center gap-2 text-accent-green text-sm font-medium">
                  عرض القائمة
                  <span>→</span>
                </div>
              </div>
            </Link>

            {/* ZATCA Hub */}
            <Link
              href="/zatca"
              className="group bg-card rounded-xl border border-white/5 overflow-hidden hover:border-accent-green/30 transition-all"
            >
              <div className="p-8 bg-gradient-to-br from-yellow-500/10 to-transparent">
                <div className="text-4xl font-bold text-yellow-400 mb-4">📋</div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-green transition-colors">
                  مركز ZATCA للامتثال
                </h3>
                <p className="text-text-secondary text-sm mb-4">
                  قائمة بالشركات المتوافقة، متطلبات، وآخر التحديثات
                </p>
                <div className="flex items-center gap-2 text-accent-green text-sm font-medium">
                  تصفح المركز
                  <span>→</span>
                </div>
              </div>
            </Link>

            {/* Funding Tracker */}
            <Link
              href="/funding"
              className="group bg-card rounded-xl border border-white/5 overflow-hidden hover:border-accent-green/30 transition-all"
            >
              <div className="p-8 bg-gradient-to-br from-blue-500/10 to-transparent">
                <div className="text-4xl font-bold text-blue-400 mb-4">📈</div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-green transition-colors">
                  تتبع التمويل
                </h3>
                <p className="text-text-secondary text-sm mb-4">
                 腺 أعمق الجولات الاستثمارية وصفقات الشركات السعودية
                </p>
                <div className="flex items-center gap-2 text-accent-green text-sm font-medium">
                  تصفح البيانات
                  <span>→</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

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
