'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

interface HeroContentProps {
  visible: boolean;
  statsAnimated: boolean;
  setStatsAnimated: (value: boolean) => void;
  companiesCount: number;
  categoriesCount: number;
  articlesCount: number;
}

export function HeroContent({
  visible,
  statsAnimated,
  setStatsAnimated,
  companiesCount,
  categoriesCount,
  articlesCount,
}: HeroContentProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const statsRef = useRef<HTMLDivElement>(null);

  // Stats animation when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsAnimated) {
            setStatsAnimated(true);
          }
        });
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    return () => observer.disconnect();
  }, [statsAnimated, setStatsAnimated]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const stats = [
    { value: 250, suffix: '+', label: 'شركة سعودية', link: '/companies', color: 'accent-green' },
    { value: 15, suffix: '+', label: 'فئة', link: '/companies', color: 'accent-cyan' },
    { value: 10, suffix: '+', label: 'مقال', link: '/articles', color: 'purple-400' },
    { value: 1, suffix: '', label: 'منصة', link: '/about', color: 'white' },
  ];

  // SVG Icons
  const icons = {
    zatca: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    funding: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    report: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    companies: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    search: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    arrow: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    ),
    star: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  };

  const categories = [
    { name: 'FinTech', slug: 'fintech' },
    { name: 'HealthTech', slug: 'healthtech' },
    { name: 'E-commerce', slug: 'e-commerce' },
    { name: 'Education', slug: 'edtech' },
    { name: 'Logistics', slug: 'logistics' },
  ];

  const featuredCompanies = [
    { name: 'Absher', color: 'from-blue-500/20 to-blue-600/10 border-blue-500/30' },
    { name: 'Salla', color: 'from-purple-500/20 to-purple-600/10 border-purple-500/30' },
    { name: 'Tabby', color: 'from-green-500/20 to-green-600/10 border-green-500/30' },
  ];

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 text-center">
      {/* ========================================
          BADGE
      ======================================== */}
      <div className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass mb-10 transition-all duration-1000 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-green"></span>
        </span>
        <span className="text-text-secondary text-sm font-medium">المصدر الأول لـ SaaS في المملكة العربية السعودية</span>
      </div>

      {/* ========================================
          MAIN HEADLINE WITH ANIMATED GRADIENT
      ======================================== */}
      <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight transition-all duration-1000 ease-out delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <span className="block text-white">Saudi</span>
        <span className="block relative">
          <span className="relative z-10 animate-gradient bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary)] via-accent-cyan to-[var(--color-accent)] bg-200%">
            SaaS Hub
          </span>
          {/* Glow effect behind text */}
          <span className="absolute inset-0 blur-2xl opacity-50 bg-gradient-to-r from-[var(--color-primary)] via-accent-cyan to-[var(--color-accent)] bg-200% animate-gradient" style={{ filter: 'blur(30px)' }} />
        </span>
      </h1>

      {/* ========================================
          SUBTITLE
      ======================================== */}
      <p className={`text-xl md:text-2xl text-text-secondary mb-10 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 ease-out delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        بوابتك الشاملة لـ{' '}
        <span className="text-accent-green font-bold">أخبار SaaS</span>،{' '}
        <span className="text-accent-cyan font-bold">رؤى السوق</span>، و{' '}
        <span className="text-purple-400 font-bold">قواعد البيانات</span> في المملكة العربية السعودية
      </p>

      {/* ========================================
          QUICK STATS ROW
      ======================================== */}
      <div className={`flex flex-wrap justify-center gap-4 mb-10 transition-all duration-1000 ease-out delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full glass">
          {icons.star}
          <span className="text-white font-semibold">250+ شركة</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full glass">
          {icons.star}
          <span className="text-white font-semibold">15+ فئة</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full glass">
          {icons.star}
          <span className="text-white font-semibold">تغطية شاملة</span>
        </div>
      </div>

      {/* ========================================
          PRIMARY CTAS WITH ENHANCED EFFECTS
      ======================================== */}
      <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-1000 ease-out delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <Link
          href="/companies"
          className="group relative px-10 py-5 rounded-2xl bg-gradient-to-r from-accent-green to-emerald-400 text-background font-bold text-xl overflow-hidden hover:shadow-glow-green transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <span className="relative z-10 flex items-center gap-3">
            تصفح الشركات
            <span className="group-hover:translate-x-1 transition-transform">{icons.arrow}</span>
          </span>
          <div className="absolute inset-0 hero-shine" />
          {/* Glow overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent-green/0 via-white/20 to-accent-green/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>
        <Link
          href="/contact"
          className="group px-10 py-5 rounded-2xl glass text-white font-semibold text-xl hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95 border border-white/10 hover:border-accent-green/50 relative overflow-hidden"
        >
          <span className="flex items-center gap-3 relative z-10">
            أضف شركتك
            <span className="group-hover:translate-x-1 transition-transform">{icons.arrow}</span>
          </span>
          {/* Subtle border glow on hover */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: '0 0 30px rgba(16, 185, 129, 0.3)' }} />
        </Link>
      </div>

      {/* ========================================
          SOCIAL PROOF - COMPANY TAGS
      ======================================== */}
      <div className={`mb-16 transition-all duration-1000 ease-out delay-600 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <p className="text-text-muted text-sm mb-4">شركات رائدة تثق بنا</p>
        <div className="flex flex-wrap justify-center gap-3">
          {featuredCompanies.map((company, index) => (
            <div
              key={company.name}
              className={`px-5 py-2.5 rounded-full bg-gradient-to-r ${company.color} text-white/80 text-sm font-medium cursor-default`}
              style={{ animationDelay: `${0.7 + index * 0.1}s` }}
            >
              {company.name}
            </div>
          ))}
          <div className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm font-medium">
            +247 المزيد
          </div>
        </div>
      </div>

      {/* ========================================
          FEATURED LINKS AS INTERACTIVE CARDS
      ======================================== */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16 stagger-children transition-all duration-1000 ease-out ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <Link href="/zatca" className="group p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 hover:border-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
              {icons.zatca}
            </div>
            <span className="text-amber-200 font-semibold">ZATCA</span>
          </div>
          <p className="text-text-secondary text-sm">حلال vat السعودي</p>
        </Link>
        <Link href="/funding" className="group p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 hover:border-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
              {icons.funding}
            </div>
            <span className="text-emerald-200 font-semibold">تمويل</span>
          </div>
          <p className="text-text-secondary text-sm">آخر الجولات التمويلية</p>
        </Link>
        <Link href="/reports" className="group p-5 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 hover:border-purple-400 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
              {icons.report}
            </div>
            <span className="text-purple-200 font-semibold">تقارير</span>
          </div>
          <p className="text-text-secondary text-sm">State of SaaS 2026</p>
        </Link>
        <Link href="/companies" className="group p-5 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border border-cyan-500/20 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
              {icons.companies}
            </div>
            <span className="text-cyan-200 font-semibold">قاعدة البيانات</span>
          </div>
          <p className="text-text-secondary text-sm">250+ شركة سعودية</p>
        </Link>
      </div>

      {/* ========================================
          STATS ROW WITH ANIMATED COUNTERS
      ======================================== */}
      <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-16">
        {stats.map((stat, index) => (
          <Link
            key={stat.label}
            href={stat.link}
            className={`group bg-card/40 backdrop-blur-sm rounded-2xl border border-[var(--color-border)] p-6 hover:border-accent-green/50 hover:shadow-glow-green hover:-translate-y-2 transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ animationDelay: `${0.7 + index * 0.1}s` }}
          >
            <div className={`text-4xl md:text-5xl font-bold mb-2 ${stat.color === 'accent-green' ? 'text-[var(--color-primary)]' : stat.color === 'accent-cyan' ? 'text-accent-cyan' : stat.color === 'purple-400' ? 'text-purple-400' : 'text-white'}`}>
              {stat.value === 250 ? `${companiesCount}+` :
               stat.value === 15 ? `${categoriesCount}+` :
               stat.value === 10 ? `${articlesCount}+` :
               stat.value}
            </div>
            <div className="text-text-secondary text-sm group-hover:text-white transition-colors">{stat.label}</div>
          </Link>
        ))}
      </div>

      {/* ========================================
          SEARCH & CATEGORIES
      ======================================== */}
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSearch} className="relative mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن شركة، فئة، أو خدمة..."
            className="w-full px-6 py-5 rounded-2xl glass border border-white/10 text-white placeholder:text-text-muted focus:border-accent-green focus:outline-none focus:ring-2 focus:ring-accent-green/20 text-lg transition-all"
          />
          <button type="submit" className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-accent-green/10 text-accent-green hover:bg-accent-green/20 transition-colors">
            {icons.search}
          </button>
        </form>

        {/* Category Pills with hover effects */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat, index) => (
            <Link
              key={cat.slug}
              href={`/companies?category=${cat.slug}`}
              className="px-5 py-2.5 rounded-full bg-card/50 border border-white/5 text-text-secondary hover:text-white hover:border-accent-green/30 hover:shadow-glow-green hover:scale-105 active:scale-95 transition-all text-sm font-medium"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* ========================================
          SCROLL INDICATOR WITH WAVE ANIMATION
      ======================================== */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <Link href="#content" className="flex flex-col items-center gap-2 text-text-muted hover:text-accent-green cursor-pointer transition-colors group">
          <span className="text-xs uppercase tracking-widest group-hover:tracking-wider transition-all">استكشف</span>
          <div className="w-8 h-14 rounded-full border-2 border-current flex items-start justify-center p-2">
            <div className="w-1.5 h-3 rounded-full bg-current animate-scroll-dot" />
          </div>
        </Link>
      </div>

      {/* ID for scroll anchor */}
      <div id="content" />
    </div>
  );
}