'use client';

import { trustedCompanies } from '@/lib/trusted-companies';

export function TrustedCompanies() {
  return (
    <section className="py-16 border-y border-white/5 bg-card/20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">الشركات التي تثق بنا</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            نعمل مع أفضل الشركات التقنية والمستثمرين في المملكة العربية السعودية
          </p>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {trustedCompanies.map((company) => (
            <a
              key={company.name}
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center p-6 rounded-xl bg-card/50 border border-white/5 hover:border-accent-green/30 transition-all"
            >
              {/* Logo placeholder - replace with actual logos */}
              <div className="w-20 h-20 mb-4 rounded-full bg-gradient-to-br from-accent-green/10 to-purple-500/10 flex items-center justify-center overflow-hidden">
                <span className="text-2xl font-bold text-accent-green">
                  {company.name.charAt(0)}
                </span>
              </div>
              <h3 className="text-white font-medium text-sm text-center mb-1">{company.name}</h3>
              <p className="text-text-muted text-xs text-center">{company.industry}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
