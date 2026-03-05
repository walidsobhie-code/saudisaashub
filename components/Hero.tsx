'use client';

import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background">
        {/* Green Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] opacity-30" style={{ background: 'radial-gradient(circle, rgba(0,217,165,0.4) 0%, transparent 70%)' }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] opacity-20" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[80px] opacity-15" style={{ background: 'radial-gradient(circle, rgba(255,107,157,0.3) 0%, transparent 70%)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 border border-accent-green/20 mb-10">
          <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
          <span className="text-text-secondary text-sm">المصدر الأول لـ SaaS في السعودية</span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
          <span className="block text-white">Saudi</span>
          <span className="block gradient-text">SaaS Hub</span>
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto mb-10">
          مصدرك الأول لأحدث أخبار التقنية والأعمال في المملكة العربية السعودية
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/articles"
            className="px-8 py-4 rounded-xl bg-accent-green text-background font-bold hover:shadow-glow-green transition-all hover:scale-105"
          >
            استكشف المقالات
          </Link>
          <Link
            href="/about"
            className="px-8 py-4 rounded-xl bg-card border border-white/10 text-white font-semibold hover:border-accent-green/30 transition-all"
          >
            عن المنصة
          </Link>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-3">
          {['المقالات', 'عن المنصة', 'اتصل بنا'].map((link, i) => (
            <Link
              key={link}
              href={i === 0 ? '/articles' : i === 1 ? '/about' : '/contact'}
              className="px-4 py-2 rounded-full bg-card/50 border border-white/5 text-text-secondary hover:text-white hover:border-accent-green/30 transition-all text-sm"
            >
              {link}
            </Link>
          ))}
        </div>
      </div>

      {/* Scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
