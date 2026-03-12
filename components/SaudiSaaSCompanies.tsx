'use client';

import Link from 'next/link';
import { saudiSaaSCompanies } from '@/lib/saudi-saas-companies';

export function SaudiSaaSCompanies() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">أبرز شركات السعودية SaaS</h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            استكشف أبرز الشركات السعودية الناشئة في مجال البرمجيات كخدمة - نماذج نجارة ملهمة
          </p>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {saudiSaaSCompanies.slice(0, 6).map((company) => (
            <div
              key={company.slug}
              className="group bg-card rounded-xl border border-white/5 hover:border-accent-green/30 transition-all overflow-hidden"
            >
              <div className="p-6">
                {/* Logo & Name */}
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

                {/* Description */}
                <p className="text-text-secondary text-sm mb-4 line-clamp-3">
                  {company.description}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-text-muted">
                  <span>تأسست {company.founded}</span>
                  <Link
                    href={`/articles?q=${encodeURIComponent(company.name)}`}
                    className="text-accent-green hover:underline flex items-center gap-1"
                  >
                    مقالات عن الشركة
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-green/10 text-accent-green border border-accent-green/20 hover:bg-accent-green/20 transition-all"
          >
            عرض جميع المقالات
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
