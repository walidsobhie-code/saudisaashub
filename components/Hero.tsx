'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

export function Hero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [visible, setVisible] = useState(false);
  const [statsAnimated, setStatsAnimated] = useState(false);
  const [companiesCount, setCompaniesCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [articlesCount, setArticlesCount] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Track mouse for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Count-up animation
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
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCompaniesCount(Math.floor(easeOutQuart * companiesEnd));
      setCategoriesCount(Math.floor(easeOutQuart * categoriesEnd));
      setArticlesCount(Math.floor(easeOutQuart * articlesEnd));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [statsAnimated]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsAnimated) {
            setStatsAnimated(true);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    return () => observer.disconnect();
  }, [statsAnimated]);

  const stats = [
    { value: 250, suffix: '+', label: 'شركة سعودية', link: '/companies', color: 'accent-green' },
    { value: 15, suffix: '+', label: 'فئة', link: '/companies', color: 'accent-cyan' },
    { value: 10, suffix: '+', label: 'مقال', link: '/articles', color: 'purple-400' },
    { value: 1, suffix: '', label: 'منصة', link: '/about', color: 'white' },
  ];

  // SVG Icons (no emojis)
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

  // Featured companies for social proof
  const featuredCompanies = [
    { name: 'Absher', color: 'from-blue-500/20 to-blue-600/10 border-blue-500/30' },
    { name: 'Salla', color: 'from-purple-500/20 to-purple-600/10 border-purple-500/30' },
    { name: 'Tabby', color: 'from-green-500/20 to-green-600/10 border-green-500/30' },
  ];

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* ========================================
          BACKGROUND LAYERS
      ======================================== */}
      <div className="absolute inset-0 bg-background">
        {/* Animated Mesh Gradient */}
        <div
          className="absolute top-0 left-0 w-full h-full opacity-60"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 20% 40%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 80% 60%, rgba(139, 92, 246, 0.12) 0%, transparent 50%),
              radial-gradient(ellipse 50% 30% at 50% 80%, rgba(0, 217, 165, 0.08) 0%, transparent 40%)
            `,
            animation: 'gradient-shift 15s ease infinite',
            backgroundSize: '200% 200%',
          }}
        />

        {/* Floating Blobs with Parallax */}
        <div
          className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)',
            transform: `translate(${mousePosition.x * 0.8}px, ${mousePosition.y * 0.8}px)`,
            transition: 'transform 0.4s ease-out',
            animation: 'float 12s ease-in-out infinite',
          }}
        />
        <div
          className="absolute top-[30%] right-[5%] w-[400px] h-[400px] rounded-full blur-[100px]"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, transparent 70%)',
            transform: `translate(${-mousePosition.x * 0.5}px, ${-mousePosition.y * 0.5}px)`,
            transition: 'transform 0.4s ease-out',
            animation: 'float 15s ease-in-out infinite',
            animationDelay: '2s',
          }}
        />
        <div
          className="absolute bottom-[20%] left-[20%] w-[350px] h-[350px] rounded-full blur-[80px]"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 70%)',
            transform: `translate(${mousePosition.x * 0.3}px, ${-mousePosition.y * 0.3}px)`,
            transition: 'transform 0.4s ease-out',
            animation: 'float 14s ease-in-out infinite',
            animationDelay: '4s',
          }}
        />

        {/* Geometric Shapes Grid */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />

        {/* Floating geometric elements */}
        <div className="absolute top-24 left-[15%] w-3 h-3 bg-accent-green/40 rotate-45 animate-float" style={{ animationDuration: '8s' }} />
        <div className="absolute top-48 right-[20%] w-4 h-4 rounded-full border border-purple-400/40 animate-float" style={{ animationDuration: '10s', animationDelay: '1s' }} />
        <div className="absolute bottom-48 left-[25%] w-2 h-2 bg-cyan-400/30 rotate-12 animate-float" style={{ animationDuration: '7s', animationDelay: '2s' }} />
        <div className="absolute bottom-32 right-[15%] w-3 h-3 border border-amber-400/30 rounded-full animate-float" style={{ animationDuration: '9s', animationDelay: '3s' }} />
        <div className="absolute top-[40%] left-[8%] w-1 h-12 bg-gradient-to-t from-accent-green/50 to-transparent rounded-full animate-float" style={{ animationDuration: '11s' }} />
        <div className="absolute top-[35%] right-[12%] w-2 h-2 bg-purple-400/30 rotate-45 animate-float" style={{ animationDuration: '8s', animationDelay: '4s' }} />

        {/* Riyadh Skyline Silhouette */}
        <div className="absolute bottom-0 left-0 right-0 h-40 md:h-56 pointer-events-none opacity-20">
          <svg viewBox="0 0 1200 300" preserveAspectRatio="xMidYMax slice" className="w-full h-full">
            <defs>
              <linearGradient id="skylineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(16,185,129,0.2)" />
                <stop offset="100%" stopColor="rgba(16,185,129,0)" />
              </linearGradient>
            </defs>
            <path d="M0,300 L0,250 L40,250 L40,200 L80,200 L80,180 L100,180 L100,220 L120,220 L120,180 L140,180 L140,150 L160,150 L160,180 L180,180 L180,200 L200,200 L200,160 L220,160 L220,120 L240,120 L240,180 L260,180 L260,200 L280,200 L280,220 L300,220 L300,250 L320,250 L320,200 L340,200 L340,150 L360,150 L360,180 L380,180 L380,220 L400,220 L400,200 L420,200 L420,160 L440,160 L440,120 L460,120 L460,180 L480,180 L480,200 L500,200 L500,220 L520,220 L520,250 L540,250 L540,200 L560,200 L560,160 L580,160 L580,120 L600,120 L600,180 L620,180 L620,220 L640,220 L640,250 L660,250 L660,200 L680,200 L680,150 L700,150 L700,180 L720,180 L720,220 L740,220 L740,200 L760,200 L760,160 L780,160 L780,120 L800,120 L800,180 L820,180 L820,220 L840,220 L840,250 L860,250 L860,200 L880,200 L880,150 L900,150 L900,180 L920,180 L920,220 L940,220 L940,200 L960,200 L960,160 L980,160 L980,120 L1000,120 L1000,180 L1020,180 L1020,220 L1040,220 L1040,250 L1060,250 L1060,200 L1080,200 L1080,150 L1100,150 L1100,180 L1120,180 L1120,220 L1140,220 L1140,200 L1160,200 L1160,160 L1180,160 L1180,120 L1200,120 L1200,300 Z" fill="url(#skylineGradient)" />
          </svg>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* ========================================
          3D SPLINE EMBED (Optional - Saudi-themed)
      ======================================== */}
      {visible && (
        <div
          className="absolute right-0 top-[20%] w-[400px] h-[500px] hidden xl:block pointer-events-none opacity-40"
          style={{
            transform: `translate(${-mousePosition.x * 0.3}px, ${mousePosition.y * 0.2}px)`,
            transition: 'transform 0.5s ease-out',
          }}
        >
          {/* Decorative 3D-like elements (CSS only for reliability) */}
          <div className="relative w-full h-full">
            {/* Floating cube-like shapes */}
            <div className="absolute top-1/4 right-1/4 w-32 h-32 border-2 border-accent-green/30 rotate-12 animate-float-shadow rounded-lg" style={{ animationDuration: '8s' }} />
            <div className="absolute top-1/2 right-1/3 w-24 h-24 border-2 border-purple-400/30 -rotate-6 animate-float-shadow rounded-lg" style={{ animationDuration: '10s', animationDelay: '1s' }} />
            <div className="absolute top-1/3 right-1/2 w-16 h-16 bg-gradient-to-br from-accent-green/20 to-purple-400/20 animate-float-shadow rounded-lg" style={{ animationDuration: '12s', animationDelay: '2s' }} />

            {/* Glowing orbs */}
            <div className="absolute top-[15%] right-[30%] w-4 h-4 bg-accent-green rounded-full animate-pulse" />
            <div className="absolute top-[45%] right-[15%] w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-[60%] right-[40%] w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
          </div>
        </div>
      )}

      {/* ========================================
          MAIN CONTENT
      ======================================== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 text-center">
        {/* Badge */}
        <div className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass mb-10 transition-all duration-1000 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-green"></span>
          </span>
          <span className="text-text-secondary text-sm font-medium">المصدر الأول لـ SaaS في المملكة العربية السعودية</span>
        </div>

        {/* Main Headline */}
        <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight transition-all duration-1000 ease-out delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="block text-white">Saudi</span>
          <span className="block gradient-headline animate-gradient bg-clip-text text-transparent bg-gradient-to-r from-accent-green via-cyan-400 to-purple-500">
            SaaS Hub
          </span>
        </h1>

        {/* Subtitle */}
        <p className={`text-xl md:text-2xl text-text-secondary mb-10 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 ease-out delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          بوابتك الشاملة لـ{' '}
          <span className="text-accent-green font-bold">أخبار SaaS</span>،{' '}
          <span className="text-accent-cyan font-bold">رؤى السوق</span>، و{' '}
          <span className="text-purple-400 font-bold">قواعد البيانات</span> في المملكة العربية السعودية
        </p>

        {/* Quick Stats Row */}
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

        {/* Primary CTAs */}
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
          </Link>
          <Link
            href="/contact"
            className="group px-10 py-5 rounded-2xl glass text-white font-semibold text-xl hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95 border border-white/10 hover:border-accent-green/50"
          >
            <span className="flex items-center gap-3">
              أضف شركتك
              <span className="group-hover:translate-x-1 transition-transform">{icons.arrow}</span>
            </span>
          </Link>
        </div>

        {/* Social Proof - Company Tags */}
        <div className={`mb-16 transition-all duration-1000 ease-out delay-600 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-text-muted text-sm mb-4">شركات رائدة تثق بنا</p>
          <div className="flex flex-wrap justify-center gap-3">
            {featuredCompanies.map((company, index) => (
              <div
                key={company.name}
                className={`px-5 py-2.5 rounded-full bg-gradient-to-r ${company.color} text-white/80 text-sm font-medium`}
              >
                {company.name}
              </div>
            ))}
            <div className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm font-medium">
              +247 المزيد
            </div>
          </div>
        </div>

        {/* Featured Links as Interactive Cards */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16 stagger-children transition-all duration-1000 ease-out ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <Link href="/zatca" className="group p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 hover:border-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                {icons.zatca}
              </div>
              <span className="text-amber-200 font-semibold">ZATCA</span>
            </div>
            <p className="text-text-secondary text-sm">حلال vat السعودي</p>
          </Link>
          <Link href="/funding" className="group p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 hover:border-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                {icons.funding}
              </div>
              <span className="text-emerald-200 font-semibold">تمويل</span>
            </div>
            <p className="text-text-secondary text-sm">آخر라운دات التمويل</p>
          </Link>
          <Link href="/reports" className="group p-5 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 hover:border-purple-400 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                {icons.report}
              </div>
              <span className="text-purple-200 font-semibold">تقارير</span>
            </div>
            <p className="text-text-secondary text-sm">State of SaaS 2026</p>
          </Link>
          <Link href="/companies" className="group p-5 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border border-cyan-500/20 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                {icons.companies}
              </div>
              <span className="text-cyan-200 font-semibold">قاعدة البيانات</span>
            </div>
            <p className="text-text-secondary text-sm">250+ شركة سعودية</p>
          </Link>
        </div>

        {/* Stats Row */}
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

        {/* Search & Categories */}
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

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/companies?category=${cat.slug}`}
                className="px-5 py-2.5 rounded-full bg-card/50 border border-white/5 text-text-secondary hover:text-white hover:border-accent-green/30 hover:shadow-glow-green hover:scale-105 active:scale-95 transition-all text-sm font-medium"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================
          SCROLL INDICATOR
      ======================================== */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <Link href="#content" className="flex flex-col items-center gap-2 text-text-muted hover:text-accent-green cursor-pointer transition-colors group">
          <span className="text-xs uppercase tracking-widest group-hover:tracking-wider transition-all">استكشف</span>
          <div className="w-8 h-14 rounded-full border-2 border-current flex items-start justify-center p-2 scroll-indicator">
            <div className="w-1.5 h-3 rounded-full bg-current" />
          </div>
        </Link>
      </div>

      {/* ID for scroll anchor */}
      <div id="content" />
    </section>
  );
}