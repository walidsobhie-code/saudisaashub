'use client';

import { useRef } from 'react';

const companies = [
  { name: 'Absher', color: 'from-blue-500 to-blue-600' },
  { name: 'Salla', color: 'from-purple-500 to-purple-600' },
  { name: 'Tabby', color: 'from-green-500 to-green-600' },
  { name: 'Mada', color: 'from-orange-500 to-orange-600' },
  { name: 'STC', color: 'from-red-500 to-red-600' },
  { name: 'Zain', color: 'from-yellow-500 to-yellow-600' },
  { name: 'Jarir', color: 'from-cyan-500 to-cyan-600' },
  { name: 'Noon', color: 'from-yellow-400 to-orange-400' },
  { name: 'Souq', color: 'from-blue-400 to-blue-500' },
  { name: 'Mumzworld', color: 'from-pink-500 to-pink-600' },
  { name: 'Fetchr', color: 'from-indigo-500 to-indigo-600' },
  { name: 'URWay', color: 'from-teal-500 to-teal-600' },
];

export function LogoTicker() {
  const tickerRef = useRef<HTMLDivElement>(null);

  // Duplicate companies for seamless loop
  const allCompanies = [...companies, ...companies, ...companies];

  return (
    <section className="py-8 bg-card/30 border-y border-white/5 overflow-hidden">
      <div className="text-center mb-6">
        <p className="text-text-muted text-sm uppercase tracking-widest">Trusted by 250+ Saudi Companies</p>
      </div>

      <div className="relative">
        {/* Gradient fade left */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />

        {/* Gradient fade right */}
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

        {/* Scrolling ticker */}
        <div
          ref={tickerRef}
          className="flex gap-8 animate-marquee-hover"
          style={{
            animation: 'marquee 30s linear infinite',
            width: 'fit-content',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.animationPlayState = 'paused';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.animationPlayState = 'running';
          }}
        >
          {allCompanies.map((company, index) => (
            <div
              key={`${company.name}-${index}`}
              className="flex-shrink-0 px-6 py-3 rounded-xl bg-gradient-to-r from-white/5 to-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3">
                {/* Logo placeholder with gradient */}
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${company.color} flex items-center justify-center`}>
                  <span className="text-white font-bold text-sm">
                    {company.name.charAt(0)}
                  </span>
                </div>
                <span className="text-white font-medium text-sm group-hover:text-accent-green transition-colors">
                  {company.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}