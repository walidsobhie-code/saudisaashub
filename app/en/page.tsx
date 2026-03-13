import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { TrustedCompanies } from '@/components/TrustedCompanies';
import { Newsletter } from '@/components/Newsletter';
import { saudiSaaSCompanies } from '@/lib/saudi-saas-companies';
import { upcomingEvents } from '@/lib/upcoming-events';

export default async function HomeEN() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Saudi SaaS Hub',
            url: 'https://saudisaashub.com',
            description: 'Your source for SaaS and startup news in Saudi Arabia',
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
            inLanguage: 'en-US',
          }),
        }}
      />

      {/* Language Switcher */}
      <div className="fixed top-20 left-4 z-40">
        <Link
          href="/"
          className="px-3 py-1.5 rounded-lg bg-card/90 border border-white/10 text-sm text-text-secondary hover:text-white transition-all"
        >
          🇸🇦 العربية
        </Link>
      </div>

      <Hero />

      {/* Intro Section - English */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Your Gateway to Saudi's SaaS Ecosystem
          </h2>
          <p className="text-xl text-text-secondary mb-8 leading-relaxed">
            Saudi SaaS Hub is the premier source for SaaS and startup news, market analysis,
            and company reviews in Saudi Arabia. We provide comprehensive insights to help
            entrepreneurs, investors, and tech enthusiasts navigate the rapidly evolving
            Saudi technology landscape.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/companies"
              className="px-8 py-4 rounded-xl bg-accent-green text-background font-bold hover:shadow-glow-green transition-all"
            >
              Browse Companies
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 rounded-xl bg-card border border-white/10 text-white font-semibold hover:border-accent-green/30 transition-all"
            >
              About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Platform Stats - English */}
      <TrustedCompanies />

      {/* Featured Saudi Companies - English */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Top Saudi SaaS Companies
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Explore the leading Saudi companies in the Software-as-a-Service space - inspiring success stories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {saudiSaaSCompanies.slice(0, 6).map((company) => (
              <Link
                key={company.slug}
                href={`/companies/${company.slug}`}
                className="group bg-card rounded-xl border border-white/5 hover:border-accent-green/30 transition-all overflow-hidden block"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent-green/10 to-purple-500/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl font-bold text-accent-green">
                        {company.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-accent-green transition-colors">
                        {company.name}
                      </h3>
                      <p className="text-sm text-accent-green">{company.category}</p>
                    </div>
                  </div>

                  <p className="text-text-secondary text-sm mb-4 line-clamp-3">
                    {company.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                    <div className="p-2 rounded-lg bg-white/5">
                      <div className="text-text-muted mb-1">Employees</div>
                      <div className="text-white font-medium">{company.employees}</div>
                    </div>
                    <div className="p-2 rounded-lg bg-white/5">
                      <div className="text-text-muted mb-1">Funding</div>
                      <div className="text-white font-medium line-clamp-2">{company.funding}</div>
                    </div>
                    <div className="p-2 rounded-lg bg-white/5">
                      <div className="text-text-muted mb-1">Headquarters</div>
                      <div className="text-white font-medium">{company.headquarters}</div>
                    </div>
                    <div className="p-2 rounded-lg bg-white/5">
                      <div className="text-text-muted mb-1">Founded</div>
                      <div className="text-white font-medium">{company.founded}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <span className="text-xs text-text-muted">View Profile</span>
                    <span className="text-accent-green group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/companies"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-green/10 text-accent-green border border-accent-green/20 hover:bg-accent-green/20 transition-all"
            >
              View All Companies
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events - English */}
      <section className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Upcoming Tech Events
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Don't miss the biggest tech conferences and startup events in Saudi Arabia and the MENA region
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.slice(0, 3).map((event) => (
              <div
                key={event.slug}
                className="bg-card rounded-xl border border-white/5 p-6 hover:border-accent-green/30 transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-accent-green/10 flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-xs text-accent-green font-medium">{event.date.split(',')[0]}</span>
                    <span className="text-lg font-bold text-accent-green">{event.date.split(',')[1]?.trim()}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{event.name}</h3>
                    <p className="text-sm text-text-secondary">{event.location}</p>
                  </div>
                </div>
                <p className="text-text-secondary text-sm mb-4">{event.description}</p>
                <a
                  href={event.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-accent-green hover:underline"
                >
                  Learn More
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />

      {/* Footer CTA */}
      <section className="py-16 bg-card/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
          <p className="text-text-secondary mb-8">
            Get the latest SaaS news and startup insights from Saudi Arabia delivered to your inbox.
          </p>
        </div>
      </section>
    </>
  );
}
