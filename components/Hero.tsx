'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animations after mount
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

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

        {/* Subheadline - News-style colorful animated ticker */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className={`transform transition-all duration-1500 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ animationDelay: '0.5s' }}>
            <p className="text-lg md:text-2xl font-medium leading-relaxed relative">
              {/* Animated gradient background */}
              <span className="absolute inset-0 bg-gradient-to-r from-accent-green via-accent-cyan via-purple-400 to-pink-400 bg-[length:200%_100%] animate-gradient-shift opacity-20 rounded-lg blur-sm" />
              
              {/* Text with gradient clip */}
              <span className="relative inline-block bg-clip-text text-transparent bg-gradient-to-r from-accent-green via-accent-cyan to-pink-400 animate-gradient-x">
                اكتشف أكثر من 250 شركة SaaS سعودية، ابحث عن حلول متوافقة مع ZATCA، وكن على اطلاع بأحدث التمويل والمقالات
              </span>
            </p>
            <p className="text-xl md:text-2xl font-medium leading-relaxed relative mt-3">
              <span className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-accent-green bg-[length:200%_100%] animate-gradient-shift-2 opacity-20 rounded-lg blur-sm" />
              <span className="relative inline-block bg-clip-text text-transparent bg-gradient-to-r from-accent-cyan via-pink-400 to-accent-green animate-gradient-x-2">
                Discover 250+ Saudi SaaS companies, find ZATCA-compliant solutions, and stay updated with funding and articles
              </span>
            </p>
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

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-16">
          <div className="bg-card/40 backdrop-blur-sm rounded-xl border border-[var(--color-border)] p-6">
            <div className="text-4xl font-bold text-[var(--color-primary)] mb-2">250+</div>
            <div className="text-text-secondary text-sm">Saudi Companies</div>
          </div>
          <div className="bg-card/40 backdrop-blur-sm rounded-xl border border-[var(--color-border)] p-6">
            <div className="text-4xl font-bold text-accent-cyan mb-2">15+</div>
            <div className="text-text-secondary text-sm">Categories</div>
          </div>
          <div className="bg-card/40 backdrop-blur-sm rounded-xl border border-[var(--color-border)] p-6">
            <div className="text-4xl font-bold text-purple-400 mb-2">10+</div>
            <div className="text-text-secondary text-sm">Articles</div>
          </div>
          <div className="bg-card/40 backdrop-blur-sm rounded-xl border border-[var(--color-border)] p-6">
            <div className="text-4xl font-bold text-white mb-2">1</div>
            <div className="text-text-secondary text-sm">Platform</div>
          </div>
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

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/companies?category=${cat.slug}`}
                className="px-4 py-2 rounded-full bg-card/50 border border-white/5 text-text-secondary hover:text-white hover:border-accent-green/30 transition-all text-sm flex items-center gap-2"
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
