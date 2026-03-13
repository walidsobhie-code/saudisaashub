'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('');
  const [visible, setVisible] = useState(false);
  const [statsAnimated, setStatsAnimated] = useState(false);
  const [companiesCount, setCompaniesCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [articlesCount, setArticlesCount] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Count-up animation effect
  useEffect(() => {
    if (!statsAnimated) return;

    const duration = 2000;
    const companiesEnd = 250;
    const categoriesEnd = 15;
    const articlesEnd = 10;

    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      setCompaniesCount(Math.floor(progress * companiesEnd));
      setCategoriesCount(Math.floor(progress * categoriesEnd));
      setArticlesCount(Math.floor(progress * articlesEnd));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [statsAnimated]);

  // Count-up animation for stats
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsAnimated) {
            setStatsAnimated(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [statsAnimated]);

  const stats = [
    { value: 250, suffix: '+', label: 'Saudi Companies', link: '/companies', color: 'accent-green' },
    { value: 15, suffix: '+', label: 'Categories', link: '/companies', color: 'accent-cyan' },
    { value: 10, suffix: '+', label: 'Articles', link: '/articles', color: 'purple-400' },
    { value: 1, suffix: '', label: 'Platform', link: '/about', color: 'white' },
  ];

  const highlights = [
    { text: 'ZATCA Compliance', icon: '📋', link: '/zatca' },
    { text: 'Funding Tracker', icon: '💰', link: '/funding' },
    { text: '250+ Companies', icon: '🏢', link: '/companies' },
    { text: 'Expert Guides', icon: '📚', link: '/guides' },
  ];

  const categories = [
    { name: 'FinTech', slug: 'fintech', icon: '💳' },
    { name: 'HealthTech', slug: 'healthtech', icon: '🏥' },
    { name: 'E-commerce', slug: 'e-commerce', icon: '🛒' },
    { name: 'Education', slug: 'edtech', icon: '🎓' },
    { name: 'Logistics', slug: 'logistics', icon: '🚚' },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0 bg-background">
        {/* Floating Blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-accent-green/20 to-accent-green/5 blur-3xl animate-float" style={{ animationDuration: '12s' }} />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-500/5 blur-3xl animate-float" style={{ animationDuration: '15s', animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-500/5 blur-3xl animate-float" style={{ animationDuration: '14s', animationDelay: '4s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
        {/* Badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-[var(--color-primary)]/30 mb-8 transition-all duration-1000 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
          <span className="text-text-secondary text-sm">المصدر الأول لـ SaaS في المملكة العربية السعودية</span>
        </div>

        {/* Main Headline */}
        <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight transition-all duration-1000 ease-out delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="block text-white">Saudi</span>
          <span className="block gradient-headline">SaaS Hub</span>
        </h1>

        {/* Subheadline - Clean static with featured highlights */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className={`transition-all duration-1000 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ animationDelay: '0.5s' }}>
            {/* Main description */}
            <p className="text-xl md:text-2xl text-text-secondary mb-8 leading-relaxed">
              اكتشف أكثر من <span className="text-accent-green font-semibold">250 شركة SaaS</span> سعودية في مكان واحد
            </p>

            {/* Featured highlights as interactive badges */}
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/zatca" className="group px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-600/10 border border-amber-500/30 hover:border-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all flex items-center gap-2">
                <span className="text-amber-400">📋</span>
                <span className="text-amber-200 text-sm font-medium">ZATCA Compliance</span>
                <svg className="w-4 h-4 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/funding" className="group px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center gap-2">
                <span className="text-emerald-400">💰</span>
                <span className="text-emerald-200 text-sm font-medium">Funding Tracker</span>
                <svg className="w-4 h-4 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/reports" className="group px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500/20 to-purple-600/10 border border-purple-500/30 hover:border-purple-400 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all flex items-center gap-2">
                <span className="text-purple-400">📊</span>
                <span className="text-purple-200 text-sm font-medium">State of SaaS 2026</span>
                <svg className="w-4 h-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/companies" className="group px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-cyan-600/10 border border-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all flex items-center gap-2">
                <span className="text-cyan-400">🏆</span>
                <span className="text-cyan-200 text-sm font-medium">Top 10 Companies</span>
                <svg className="w-4 h-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Separator line */}
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-accent-green to-transparent mx-auto mt-10 rounded-full" />
          </div>
        </div>

        {/* Primary CTAs */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-1000 ease-out delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Link
            href="/companies"
            className="group px-8 py-4 rounded-xl bg-gradient-to-r from-accent-green to-accent-green/80 text-background font-bold text-lg hover:shadow-glow-green transition-all hover:scale-105 active:scale-95"
          >
            <span className="flex items-center gap-2">
              تصفح الشركات
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>
          <Link
            href="/contact"
            className="group px-8 py-4 rounded-xl bg-card/60 backdrop-blur-sm border border-white/10 text-white font-semibold text-lg hover:border-accent-green/50 transition-all hover:scale-105 active:scale-95"
          >
            <span className="flex items-center gap-2">
              أضف شركتك
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </span>
          </Link>
        </div>

        {/* Stats Row - Animated & Clickable */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-16">
          {stats.map((stat, index) => (
            <Link
              key={stat.label}
              href={stat.link}
              className={`group bg-card/40 backdrop-blur-sm rounded-xl border border-[var(--color-border)] p-6 hover:border-accent-green/50 hover:shadow-glow-green hover:-translate-y-1 transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ animationDelay: `${0.6 + index * 0.1}s` }}
            >
              <div className={`text-4xl font-bold mb-2 ${stat.color === 'accent-green' ? 'text-[var(--color-primary)]' : stat.color === 'accent-cyan' ? 'text-accent-cyan' : stat.color === 'purple-400' ? 'text-purple-400' : 'text-white'}`}>
                {stat.value === 250 ? `${companiesCount}+` :
                 stat.value === 15 ? `${categoriesCount}+` :
                 stat.value === 10 ? `${articlesCount}+` :
                 stat.value}
                {stat.suffix}
              </div>
              <div className="text-text-secondary text-sm group-hover:text-white transition-colors">{stat.label}</div>
            </Link>
          ))}
        </div>

        {/* Quick Search & Categories */}
        <div className="max-w-4xl mx-auto">
          {/* Search */}
          <div className="relative mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن شركة، فئة، أو خدمة..."
              className="w-full px-6 py-4 rounded-2xl bg-card/80 backdrop-blur-sm border border-white/10 text-white placeholder:text-text-muted focus:border-accent-green focus:outline-none focus:ring-2 focus:ring-accent-green/20 text-lg"
            />
            <button className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-accent-green/10 text-accent-green hover:bg-accent-green/20 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* Category Pills - Enhanced Hover */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/companies?category=${cat.slug}`}
                className="px-4 py-2 rounded-full bg-card/50 border border-white/5 text-text-secondary hover:text-white hover:border-accent-green/30 hover:shadow-glow-green hover:scale-105 active:scale-95 transition-all text-sm flex items-center gap-2 group"
              >
                <span className="group-hover:scale-110 transition-transform">{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="flex flex-col items-center gap-2 text-text-muted hover:text-accent-green cursor-pointer transition-colors">
          <span className="text-xs uppercase tracking-widest">Explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-1">
            <div className="w-1.5 h-3 rounded-full bg-current animate-bounce" />
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
