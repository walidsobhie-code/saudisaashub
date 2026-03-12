import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { TrustedCompanies } from '@/components/TrustedCompanies';
import { SaudiSaaSCompanies } from '@/components/SaudiSaaSCompanies';
import { UpcomingEvents } from '@/components/UpcomingEvents';
import { Newsletter } from '@/components/Newsletter';

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
              href="/articles"
              className="px-8 py-4 rounded-xl bg-accent-green text-background font-bold hover:shadow-glow-green transition-all"
            >
              Browse Articles (Arabic)
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

      {/* Trusted Companies Section */}
      <TrustedCompanies />

      {/* Saudi SaaS Companies Section */}
      <SaudiSaaSCompanies />

      {/* Upcoming Events Section */}
      <UpcomingEvents />

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
