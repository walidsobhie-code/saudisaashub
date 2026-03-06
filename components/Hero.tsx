'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [animatedStats, setAnimatedStats] = useState({ articles: 0, companies: 0, market: 0 });

  // Animate numbers on mount
  useEffect(() => {
    const targets = { articles: 17, companies: 225, market: 6.49 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic

      setAnimatedStats({
        articles: Math.round(targets.articles * eased),
        companies: Math.round(targets.companies * eased),
        market: parseFloat((targets.market * eased).toFixed(2)),
      });

      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{x: number; y: number; vx: number; vy: number; size: number; color: string}> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const particleCount = Math.floor(window.innerWidth / 8);
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 1,
          color: Math.random() > 0.5 ? '#00D9A5' : '#8B5CF6',
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.5;
        ctx.fill();

        particles.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = '#00D9A5';
            ctx.globalAlpha = 0.08 * (1 - dist / 120);
            ctx.stroke();
          }
        });
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();

    window.addEventListener('resize', () => { resize(); createParticles(); });
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/articles?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0A0A14] via-[#0F0F1A] to-[#0A0A14]">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Gradient Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[600px] h-[600px] rounded-full blur-[180px] opacity-40 bg-gradient-to-r from-emerald-500/30 to-transparent" />
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] rounded-full blur-[150px] opacity-30 bg-gradient-to-r from-purple-500/30 to-transparent" />
        <div className="absolute bottom-[10%] left-[20%] w-[400px] h-[400px] rounded-full blur-[120px] opacity-25 bg-gradient-to-r from-pink-500/30 to-transparent" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-8">
          <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
          <span className="text-white/80 text-sm">المصدر الأول لـ SaaS في السعودية</span>
          <span className="text-accent-green text-xs mr-2">✓</span>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
          <span className="block text-white">Saudi</span>
          <span className="block bg-gradient-to-r from-emerald-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">SaaS Hub</span>
        </h1>

        <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-8">
          مصدرك الأول لأحدث أخبار التقنية والأعمال في المملكة العربية السعودية
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-10">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن مقال، شركة، أو موضوع..."
              className="w-full px-6 py-4 pr-12 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-white/40 backdrop-blur-md focus:outline-none focus:border-accent-green/50 focus:ring-2 focus:ring-accent-green/20 transition-all"
            />
            <button
              type="submit"
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-accent-green text-background hover:bg-emerald-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link href="/articles" className="px-8 py-4 rounded-xl bg-gradient-to-r from-accent-green to-emerald-400 text-background font-bold hover:shadow-[0_0_30px_rgba(0,217,165,0.3)] transition-all">
            استكشف المقالات
          </Link>
          <Link href="/about" className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold backdrop-blur-sm hover:bg-white/10 transition-all">
            عن المنصة
          </Link>
        </div>

        {/* Animated Stats */}
        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-12">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="text-3xl md:text-4xl font-bold text-accent-green mb-1">{animatedStats.articles}+</div>
            <div className="text-white/40 text-sm">مقال متخصص</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-1">{animatedStats.companies}+</div>
            <div className="text-white/40 text-sm">شركة SaaS</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="text-3xl md:text-4xl font-bold text-pink-500 mb-1">${animatedStats.market}B</div>
            <div className="text-white/40 text-sm">حجم السوق 2030</div>
          </div>
        </div>

        {/* Logo Marquee */}
        <div className="mb-8">
          <p className="text-white/30 text-xs mb-4 uppercase tracking-widest">شركات رائدة في المملكة</p>
          <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap opacity-50">
            <div className="text-white/40 font-bold text-lg">stc</div>
            <div className="text-white/40 font-bold text-lg">Aws</div>
            <div className="text-white/40 font-bold text-lg">Microsoft</div>
            <div className="text-white/40 font-bold text-lg">Google</div>
            <div className="text-white/40 font-bold text-lg">Oracle</div>
          </div>
        </div>

        {/* Latest Articles */}
        <div>
          <p className="text-white/40 text-sm mb-4">أحدث المقالات</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/articles/launch-saas-company-saudi-2026" className="group px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-accent-green/50 transition-all text-sm">
              <span className="text-white/60 group-hover:text-white transition-colors">كيف تطلق SaaS</span>
              <span className="text-accent-green mr-2">→</span>
            </Link>
            <Link href="/articles/zatca-e-invoice-2026" className="group px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-purple-400/50 transition-all text-sm">
              <span className="text-white/60 group-hover:text-white transition-colors">الفوترة الإلكترونية</span>
              <span className="text-purple-400 mr-2">→</span>
            </Link>
            <Link href="/articles/pdpl-guide-saudi-2026" className="group px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-pink-500/50 transition-all text-sm">
              <span className="text-white/60 group-hover:text-white transition-colors">دليل PDPL</span>
              <span className="text-pink-500 mr-2">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
