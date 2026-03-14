'use client';

import { reportStats } from '@/lib/report-stats';

export default function ReportPageClient() {
  const { totalCompanies, categoryCounts, fundingStats, topLocations, avgFounded, newestFounded } = reportStats;

  const colors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1'];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-green/10 rounded-full text-accent-green text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-accent-green rounded-full animate-pulse" />
                Research Report
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
                State of Saudi SaaS
                <br />
                <span className="text-accent-green">2026</span>
              </h1>
              <p className="text-xl text-text-secondary mb-8 leading-relaxed">
                Comprehensive analysis of {totalCompanies} Saudi SaaS companies, funding trends, ZATCA compliance, and market insights.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="px-4 py-3 bg-card/50 rounded-xl border border-white/5">
                  <div className="text-2xl font-bold text-accent-green">{totalCompanies}+</div>
                  <div className="text-sm text-text-muted">شركة سعودية</div>
                </div>
                <div className="px-4 py-3 bg-card/50 rounded-xl border border-white/5">
                  <div className="text-2xl font-bold text-accent-cyan">{fundingStats.percentage}%</div>
                  <div className="text-sm text-text-muted">ممولة</div>
                </div>
                <div className="px-4 py-3 bg-card/50 rounded-xl border border-white/5">
                  <div className="text-2xl font-bold text-purple-400">{avgFounded}</div>
                  <div className="text-sm text-text-muted">متوسط التأسيس</div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 border border-white/5 sticky top-32">
                <h3 className="text-xl font-bold text-white mb-6">التصنيفات الرئيسية</h3>
                <div className="space-y-4">
                  {categoryCounts.slice(0, 6).map((cat, idx) => (
                    <div key={cat.name} className="flex items-center gap-4">
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: colors[idx % colors.length] }}
                      />
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-white">{cat.name}</span>
                          <span className="text-text-muted">{cat.count}</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{
                              width: `${(cat.count / totalCompanies) * 100}%`,
                              backgroundColor: colors[idx % colors.length],
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Insights */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Key Insights</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              What the data tells us about Saudi Arabia's SaaS landscape
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 border border-white/5 hover:border-accent-green/30 transition-all">
              <div className="w-16 h-16 rounded-2xl bg-accent-green/10 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Riyadh Dominates</h3>
              <p className="text-text-secondary mb-4">
                {(topLocations[0]?.count / totalCompanies * 100).toFixed(1)}% of all Saudi SaaS companies are based in {topLocations[0]?.city}.
              </p>
              <p className="text-text-muted text-sm">
                Top cities: {topLocations.map(l => l.city).join(', ')}
              </p>
            </div>

            <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 border border-white/5 hover:border-accent-green/30 transition-all">
              <div className="w-16 h-16 rounded-2xl bg-accent-cyan/10 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Funding Gap</h3>
              <p className="text-text-secondary mb-4">
                Only {fundingStats.percentage}% of SaaS companies in our database have disclosed funding information.
              </p>
              <p className="text-text-muted text-sm">
                {fundingStats.total} companies reported funding out of {totalCompanies}
              </p>
            </div>

            <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 border border-white/5 hover:border-accent-green/30 transition-all">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">SaaS Growth</h3>
              <p className="text-text-secondary mb-4">
                Average company founded in {avgFounded}, with newest in {newestFounded}.
              </p>
              <p className="text-text-muted text-sm">
                Most companies are 5-8 years old, showing maturing ecosystem
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Breakdown */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent to-card/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-1 h-8 bg-accent-green rounded-full" />
            <h2 className="text-3xl font-bold text-white">Categories Breakdown</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categoryCounts.slice(0, 10).map((cat, idx) => (
              <div
                key={cat.name}
                className="bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-white/5 hover:border-accent-green/20 transition-all text-center"
              >
                <div
                  className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: `${colors[idx % colors.length]}20` }}
                >
                  <span className="text-xl font-bold" style={{ color: colors[idx % colors.length] }}>
                    {cat.count}
                  </span>
                </div>
                <h4 className="text-white font-semibold mb-2">{cat.name}</h4>
                <p className="text-text-muted text-sm">
                  {((cat.count / totalCompanies) * 100).toFixed(1)}% of total
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Funding Stages */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-1 h-8 bg-accent-cyan rounded-full" />
            <h2 className="text-3xl font-bold text-white">Funding Stages</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Object.entries(fundingStats.byStage).map(([stage, count]) => (
              <div
                key={stage}
                className="bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-white/5 hover:border-accent-cyan/20 transition-all text-center"
              >
                <div className="text-3xl font-bold text-accent-cyan mb-2">{count}</div>
                <div className="text-white font-medium mb-2">{stage}</div>
                <div className="text-text-muted text-sm">
                  {((count / fundingStats.total) * 100).toFixed(0)}% of funded
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent to-card/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-1 h-8 bg-purple-400 rounded-full" />
            <h2 className="text-3xl font-bold text-white">Top Locations</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topLocations.map((loc, idx) => (
              <div
                key={loc.city}
                className="bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-white/5 hover:border-purple-400/20 transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
                    style={{
                      backgroundColor: `${colors[idx % colors.length]}20`,
                      color: colors[idx % colors.length],
                    }}
                  >
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{loc.city}</h4>
                    <p className="text-text-muted text-sm">{loc.count} companies</p>
                  </div>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(loc.count / totalCompanies) * 100}%`,
                      backgroundColor: colors[idx % colors.length],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-1 h-8 bg-yellow-400 rounded-full" />
            <h2 className="text-3xl font-bold text-white">Methodology</h2>
          </div>

          <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 border border-white/5">
            <ul className="space-y-4 text-text-secondary">
              <li><strong>Data Source:</strong> SaudiSaaS Hub database as of March 2026</li>
              <li><strong>Companies Analyzed:</strong> {totalCompanies} Saudi-based SaaS providers</li>
              <li><strong>Categories:</strong> {categoryCounts.length} distinct categories</li>
              <li><strong>Geographic Coverage:</strong> Companies across {topLocations.length} Saudi cities</li>
              <li><strong>Verification:</strong> All listings manually reviewed</li>
              <li><strong>Funding Data:</strong> Self-reported by companies</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Social Share Section */}
      <section className="py-12 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-white mb-2">شارك هذا التقرير</h3>
            <p className="text-text-secondary text-sm">انشر تحليل سوق SaaS السعودي مع شبكتك</p>
          </div>
          <div className="flex justify-center gap-3 flex-wrap">
            {/* Twitter/X */}
            <button
              onClick={() => {
                const url = encodeURIComponent(window.location.href);
                const text = encodeURIComponent(document.title);
                window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'width=600,height=400,noopener,noreferrer');
              }}
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-[#1da1f2] hover:bg-[#1a8cd8] transition-all shadow-lg"
              aria-label="شارك على X (تويتر)"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </button>

            {/* LinkedIn */}
            <button
              onClick={() => {
                const url = encodeURIComponent(window.location.href);
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=400,noopener,noreferrer');
              }}
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-[#0077b5] hover:bg-[#006399] transition-all shadow-lg"
              aria-label="شارك على LinkedIn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </button>

            {/* WhatsApp */}
            <button
              onClick={() => {
                window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(document.title + ' ' + window.location.href)}`, '_blank', 'width=600,height=400,noopener,noreferrer');
              }}
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-[#25d366] hover:bg-[#20ba5a] transition-all shadow-lg"
              aria-label="شارك على WhatsApp"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </button>

            {/* Telegram */}
            <button
              onClick={() => {
                window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(document.title)}`, '_blank', 'width=600,height=400,noopener,noreferrer');
              }}
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-[#0088cc] hover:bg-[#0077aa] transition-all shadow-lg"
              aria-label="شارك على Telegram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </button>

            {/* Copy Link */}
            <button
              onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
                try {
                  await navigator.clipboard.writeText(window.location.href);
                  const btn = e.currentTarget;
                  const originalContent = btn.innerHTML;
                  btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13l4 4L19 7"/></svg>`;
                  btn.classList.add('bg-accent-green', 'text-background');
                  setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.classList.remove('bg-accent-green', 'text-background');
                  }, 2000);
                } catch (err) {
                  console.error('Failed to copy:', err);
                  alert('فشل نسخ الرابط. يرجى المحاولة مرة أخرى.');
                }
              }}
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-gray-300 hover:bg-white/20 hover:border-accent-green/50 hover:text-white transition-all shadow-sm"
              aria-label="نسخ الرابط"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
