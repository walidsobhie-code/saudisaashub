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
          href="/news"
          className="group px-10 py-5 rounded-2xl glass text-white font-semibold text-xl hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95 border border-white/10 hover:border-accent-green/50 relative overflow-hidden"
        >
          <span className="flex items-center gap-3 relative z-10">
            الأخبار
            <span className="group-hover:translate-x-1 transition-transform">{icons.arrow}</span>
          </span>
          {/* Subtle border glow on hover */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: '0 0 30px rgba(16, 185, 129, 0.3)' }} />
        </Link>
      </div>

      {/* ========================================
          SOCIAL SHARE BUTTONS
      ======================================== */}
      <div className={`max-w-2xl mx-auto mb-16 transition-all duration-1000 ease-out delay-600 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="bg-card/30 backdrop-blur-sm border border-white/5 rounded-2xl p-6 text-center">
          <p className="text-text-secondary text-sm mb-4">شارك هذه المنصة مع الآخرين</p>
          <div className="flex justify-center gap-3 flex-wrap">
            {/* Twitter/X */}
            <button
              onClick={() => {
                const url = encodeURIComponent(window.location.href);
                const text = encodeURIComponent(document.title);
                window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'width=600,height=400,noopener,noreferrer');
              }}
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-[#1da1f2] hover:bg-[#1a8cd8] transition-all shadow-lg hover:shadow-[#1da1f2]/25"
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
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-[#0077b5] hover:bg-[#006399] transition-all shadow-lg hover:shadow-[#0077b5]/25"
              aria-label="شارك على LinkedIn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </button>

            {/* WhatsApp */}
            <button
              onClick={() => {
                const url = window.location.href;
                const text = document.title;
                window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`, '_blank', 'width=600,height=400,noopener,noreferrer');
              }}
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-[#25d366] hover:bg-[#20ba5a] transition-all shadow-lg hover:shadow-[#25d366]/25"
              aria-label="شارك على WhatsApp"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </button>

            {/* Telegram */}
            <button
              onClick={() => {
                const url = window.location.href;
                const text = document.title;
                window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank', 'width=600,height=400,noopener,noreferrer');
              }}
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-[#0088cc] hover:bg-[#0077aa] transition-all shadow-lg hover:shadow-[#0088cc]/25"
              aria-label="شارك على Telegram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </button>

            {/* Facebook */}
            <button
              onClick={() => {
                const url = encodeURIComponent(window.location.href);
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400,noopener,noreferrer');
              }}
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-[#1877f2] hover:bg-[#166fe5] transition-all shadow-lg hover:shadow-[#1877f2]/25"
              aria-label="شارك على Facebook"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>

            {/* Copy Link */}
            <button
              onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
                try {
                  await navigator.clipboard.writeText(window.location.href);
                  // Simple feedback - could enhance with custom toast
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