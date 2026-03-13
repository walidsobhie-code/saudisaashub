'use client';

interface TrustedCompaniesProps {
  lang?: 'ar' | 'en';
}

import { platformStats } from '@/lib/trusted-companies';

export function TrustedCompanies({ lang = 'ar' }: TrustedCompaniesProps) {
  return (
    <section className="py-16 border-y border-white/5 bg-card/20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {lang === 'en' ? 'Platform in Numbers' : 'منصتنا في أرقام'}
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            {lang === 'en'
              ? 'Real metrics that reflect the growth and expansion of the SaaS ecosystem in Saudi Arabia'
              : 'أرقام حقيقية تعكس نمو وتوسع منظومة SaaS في المملكة العربية السعودية'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {platformStats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-6 rounded-xl bg-card/50 border border-white/5 hover:border-accent-green/30 transition-all"
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent-green to-purple-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <p className="text-text-secondary text-sm text-center">
                {lang === 'en' ? stat.labelEn : stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
