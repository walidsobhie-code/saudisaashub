import Link from 'next/link';
import { getArticles } from '@/lib/articles';
import { editorialPicks } from '@/lib/editorial-picks';
import { getTrendingCompanies, getTrendingArticleSlugs } from '@/lib/trending';
import { companies } from '@/lib/companies';
import ArticleCard from '@/components/ArticleCard';
import CompanyCard from '@/components/CompanyCard';
import { Hero } from '@/components/Hero';
import Newsletter from '@/components/Newsletter';

export default async function Home() {
  const articles = await getArticles();
  const featuredArticles = articles.slice(0, 3);
  const trendingCompanies = getTrendingCompanies();
  const trendingArticleSlugs = getTrendingArticleSlugs();
  const trendingArticles = articles.filter(a => trendingArticleSlugs.includes(a.slug));

  // Get editorial spotlight items
  const spotlight = editorialPicks.slice(0, 2);

  // Get deep dives (reports)
  const reports = [
    {
      slug: 'state-of-saudi-saas-2026',
      title: 'State of Saudi SaaS 2026',
      description: 'Comprehensive market analysis covering 252 companies, funding trends, and ZATCA impact.',
      date: '2026-03-13',
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
                className="group bg-card rounded-xl border border-white/5 p-8 hover:border-accent-green/30 transition-all"
              >
                <div className="text-4xl font-bold text-yellow-400 mb-4">📈</div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-green transition-colors">
                  {report.title}
                </h3>
                <p className="text-text-secondary text-sm mb-4">{report.description}</p>
                <div className="flex items-center gap-2 text-accent-green font-medium">
                  Explore Report <span>→</span>
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
            {companies.slice(0, 6).map(company => (
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
