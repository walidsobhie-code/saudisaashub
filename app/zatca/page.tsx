import { Metadata } from 'next';
import { ArticleCard } from '@/components/ArticleCard';
import { getArticles } from '@/lib/articles';
import { SocialShare } from '@/components/SocialShare';

export const metadata: Metadata = {
  title: 'ZATCA Compliance & E-Invoicing Guide - Saudi SaaS Hub',
  description: 'Complete guide to ZATCA e-invoicing (Fatoora) compliance in Saudi Arabia. Understand phases, requirements, and how to prepare your business.',
  keywords: 'ZATCA, e-invoicing, Fatoora, Saudi Arabia, compliance, VAT, ERP integration',
  openGraph: {
    title: 'ZATCA Compliance Hub',
    description: 'Your complete resource for ZATCA e-invoicing and Fatoora compliance in Saudi Arabia',
    type: 'website',
    url: 'https://saudisaashub.pages.dev/zatca',
  },
};

export default async function ZatcaPage() {
  const articles = await getArticles();
  const zatcaArticles = articles.filter(a =>
    a.categories.some(c => c.toLowerCase().includes('zatca') || c.toLowerCase().includes('compliance') || c.toLowerCase().includes('e-invoicing'))
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-accent-cyan/10 to-background">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ZATCA Compliance Hub
          </h1>
          <p className="text-xl text-text-secondary mb-8 leading-relaxed">
            Everything you need to know about e-invoicing (Fatoora) and ZATCA compliance in Saudi Arabia.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-card rounded-xl border border-white/5 p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">About ZATCA E-Invoicing</h2>
            <p className="text-text-secondary mb-4">
              The Zakat, Tax and Customs Authority (ZATCA) has mandated electronic invoicing for all taxable persons in Saudi Arabia. The Fatoora initiative requires businesses to generate, transmit, and store invoices electronically through an integrated system.
            </p>
            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Phases of Implementation</h3>
            <ul className="space-y-2 text-text-secondary">
              <li className="flex items-start gap-3">
                <span className="text-accent-cyan font-bold">Phase 1:</span>
                <span>Integration with ZATCA's e-invoicing portal for generation of compliant invoices (QR code requirements).</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-cyan font-bold">Phase 2:</span>
                <span>Real-time reporting to ZATCA's FATOORA platform – invoices must be submitted and approved before being issued to customers.</span>
              </li>
            </ul>
          </div>

          {/* Checklist */}
          <div className="bg-card rounded-xl border border-white/5 p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Compliance Checklist</h2>
            <div className="space-y-4">
              {[
                'Register for VAT with ZATCA',
                'Choose an accredited e-invoicing solution provider',
                'Ensure your system generates QR codes with required data',
                'Integrate with ZATCA\'s API for Phase 2 reporting',
                'Test in ZATCA\'s sandbox environment',
                'Train staff on new invoicing workflows',
                'Monitor compliance updates and changes'
              ].map((item, idx) => (
                <label key={idx} className="flex items-start gap-3 cursor-pointer group">
                  <input type="checkbox" className="mt-1 w-5 h-5 rounded border-gray-600 text-accent-cyan bg-gray-700 focus:ring-accent-cyan" />
                  <span className="text-text-secondary group-hover:text-white transition-colors">{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Articles */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Latest Articles</h2>
            {zatcaArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {zatcaArticles.slice(0, 6).map(article => (
                  <ArticleCard key={article.slug} {...article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-card rounded-xl border border-white/5">
                <p className="text-text-muted">Articles coming soon.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <SocialShare title="ZATCA والامتثال" description="انشر معلومات ZATCA والامتثال مع الآخرين" />
    </div>
  );
}