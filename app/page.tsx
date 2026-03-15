import Link from 'next/link';
import Image from 'next/image';
import { getArticles } from '@/lib/articles';
import { editorialPicks } from '@/lib/editorial-picks';
import { getTrendingCompanies, getTrendingArticleSlugs } from '@/lib/trending';
import { getAllCompaniesDB } from '@/lib/db-companies';
import { ArticleCard } from '@/components/ArticleCard';
import CompanyCard from '@/components/CompanyCard';
import { Hero } from '@/components/Hero';
import { LogoTicker } from '@/components/LogoTicker';
import { Newsletter } from '@/components/Newsletter';

export default async function Home() {
  const articles = await getArticles();
  const featuredArticles = articles.slice(0, 3);
  const trendingCompanies = await getTrendingCompanies();
  const trendingArticleSlugs = getTrendingArticleSlugs();
  const trendingArticles = articles.filter(a => trendingArticleSlugs.includes(a.slug));
  const allCompanies = await getAllCompaniesDB();

  // Get editorial spotlight items
  const spotlight = editorialPicks.slice(0, 2);

  // Get deep dives (reports) with unique Saudi-themed images
  const reports = [
    {
      slug: 'state-of-saudi-saas-2026',
      title: 'State of Saudi SaaS 2026',
      description: 'Comprehensive market analysis covering 252 companies, funding trends, and ZATCA impact.',
      date: '2026-03-13',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80', // Business/charts
    },
  ];

  // JSON-LD (keep minimal)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Saudi SaaS Hub',
    url: 'https://saudisaashub.pages.dev',
    description: 'المصدر الأول لـ SaaS في المملكة العربية السعودية',
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <link rel="alternate" hrefLang="ar" href="https://saudisaashub.pages.dev/" />
      <link rel="alternate" hrefLang="en" href="https://saudisaashub.pages.dev/en" />
      <link rel="alternate" hrefLang="x-default" href="https://saudisaashub.pages.dev/" />

      <Hero />

      {/* Logo Ticker - Trusted Companies */}
      <LogoTicker />

      {/* Featured Companies Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-green/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-green/10 rounded-full text-accent-green text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-accent-green rounded-full animate-pulse" />
              Editor's Picks
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">الشركات المميزة</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              مختارات فريق التحرير من أفضل شركات SaaS السعودية
            </p>
          </div>

          {/* Select top 6 verified companies by funding amount as featured */}
          {
            (() => {
              const featuredCompanies = allCompanies
                .filter(c => c.verified && c.categories && c.categories.length > 0)
                .sort((a, b) => (b.funding_amount || 0) - (a.funding_amount || 0))
                .slice(0, 6);

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredCompanies.map((company, idx) => {
                    const category = company.categories?.[0]?.name || '';
                    const reasonSnippets = [
                      `شركة رائدة في مجال ${category} مع تمويل قوي ونمو مستمر`,
                      `من أبرز اللاعبين في ${category} وتتميز بمنتجات مبتكرة`,
                      `نجحت في جذب استثمارات كبيرة وتقدم حلولاً متميزة`,
                      `تم اختيارها لجودة بياناتها وتأثيرها في السوق`,
                      `شركة ذات تقييم عالٍ و nombreux عملاء`,
                    ];
                    const reason = reasonSnippets[idx % reasonSnippets.length];

                    return (
                      <div
                        key={company.id}
                        className="group bg-card/30 backdrop-blur-sm rounded-2xl p-6 border border-accent-green/20 hover:border-accent-green/40 transition-all duration-300 relative overflow-hidden"
                      >
                        {/* Featured badge corner */}
                        <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-accent-green to-accent-cyan rounded-full opacity-20 blur-xl" />

                        {/* Logo card */}
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-elevated border border-white/10 mb-4">
                          {company.logo_url ? (
                            <Image
                              src={company.logo_url}
                              alt={`${company.name} logo`}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent-green/30 to-accent-cyan/30">
                              <span className="text-xl font-bold text-white/80">
                                {company.name?.charAt(0) || '?'}
                              </span>
                            </div>
                          )}
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent-green transition-colors">
                          {company.name}
                        </h3>

                        <p className="text-accent-cyan text-sm font-medium mb-3">
                          {category}
                        </p>

                        <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                          {company.description}
                        </p>

                        {/* Why featured */}
                        <div className="flex items-start gap-2 text-xs text-accent-green/80 mb-4">
                          <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                          <p>{reason}</p>
                        </div>

                        <Link
                          href={`/companies/${company.slug}`}
                          className="inline-flex items-center gap-2 text-accent-green hover:text-accent-cyan transition-colors text-sm font-medium"
                        >
                          عرض التفاصيل
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              );
            })()
          }

          <div className="text-center mt-12">
            <Link
              href="/companies"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-accent-green to-accent-cyan text-black font-bold hover:shadow-lg hover:shadow-accent-green/20 transition-all"
            >
              عرض جميع الشركات
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Editorial Spotlight */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-accent-green rounded-full" />
            <h2 className="text-3xl font-bold text-white">Editorial Spotlight</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {spotlight.map(pick => (
              <Link
                key={pick.id}
                href={pick.link}
                className="group bg-card rounded-xl border border-white/5 overflow-hidden hover:border-accent-green/30 transition-all"
              >
                {pick.imageUrl && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={pick.imageUrl}
                      alt={pick.headline}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                )}
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-accent-green/10 text-accent-green text-xs font-semibold rounded-full uppercase">
                      {pick.type}
                    </span>
                    <span className="text-text-muted text-sm">• Editor's Pick</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-accent-green transition-colors">
                    {pick.headline}
                  </h3>
                  <p className="text-text-secondary mb-6">{pick.excerpt}</p>
                  <div className="flex items-center gap-2 text-accent-green font-medium">
                    Read More <span>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Now */}
      <section className="py-24 bg-gradient-to-b from-accent-green/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-accent-cyan rounded-full" />
              <h2 className="text-3xl font-bold text-white">Trending Now</h2>
            </div>
            <Link href="/companies" className="text-accent-cyan hover:underline text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingCompanies.slice(0, 4).map(company => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Insights (Articles) */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-purple-400 rounded-full" />
              <h2 className="text-3xl font-bold text-white">Latest Insights</h2>
            </div>
            <Link href="/articles" className="text-purple-400 hover:underline text-sm font-medium">
              All Articles
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArticles.map(article => (
              <ArticleCard key={article.slug} {...article} />
            ))}
          </div>
        </div>
      </section>

      {/* Deep Dives (Reports) */}
      <section className="py-24 bg-card/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-yellow-400 rounded-full" />
            <h2 className="text-3xl font-bold text-white">Deep Dives</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reports.map(report => (
              <Link
                key={report.slug}
                href={`/reports/${report.slug}`}
                className="group bg-card rounded-xl border border-white/5 overflow-hidden hover:border-accent-green/30 transition-all"
              >
                {report.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={report.image}
                      alt={report.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                )}
                <div className="p-6">
                  <div className="text-sm font-semibold text-yellow-400 mb-2">Reports</div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-green transition-colors">
                    {report.title}
                  </h3>
                  <p className="text-text-secondary text-sm mb-4">{report.description}</p>
                  <div className="flex items-center gap-2 text-accent-green font-medium">
                    Explore Report <span>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Browse Companies */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-accent-green rounded-full" />
              <h2 className="text-3xl font-bold text-white">Browse Companies</h2>
            </div>
            <Link href="/companies" className="text-accent-green hover:underline text-sm font-medium">
              View All 250+
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Stats */}
            <div className="bg-card/40 backdrop-blur-sm rounded-xl border border-white/5 p-8 text-center">
              <div className="text-5xl font-bold text-accent-green mb-2">250+</div>
              <div className="text-text-secondary">Saudi Companies</div>
            </div>
            <div className="bg-card/40 backdrop-blur-sm rounded-xl border border-white/5 p-8 text-center">
              <div className="text-5xl font-bold text-accent-cyan mb-2">15+</div>
              <div className="text-text-secondary">Categories</div>
            </div>
            <div className="bg-card/40 backdrop-blur-sm rounded-xl border border-white/5 p-8 text-center">
              <div className="text-5xl font-bold text-purple-400 mb-2">ZATCA</div>
              <div className="text-text-secondary">Compliant Solutions</div>
            </div>
          </div>
          {/* Featured Companies */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {allCompanies.slice(0, 6).map(company => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        </div>
      </section>

      {/* Tools CTA */}
      <section className="py-24 bg-gradient-to-b from-purple-900/20 to-transparent">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Powerful Tools</h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Compare companies side-by-side, search across the entire database, and find the perfect SaaS solution for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/companies?comparison=true"
              className="px-8 py-4 bg-accent-green text-background font-semibold rounded-xl hover:bg-accent-green/90 transition-all"
            >
              Start Comparison
            </Link>
            <Link
              href="/search"
              className="px-8 py-4 bg-card border border-white/20 text-white font-medium rounded-xl hover:border-accent-green transition-all"
            >
              Search Companies
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <Newsletter />
        </div>
      </section>
    </>
  );
}
