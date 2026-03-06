'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-background">
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      
      {/* Gradient Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] opacity-30 bg-gradient-to-r from-accent-green to-transparent" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-25 bg-gradient-to-r from-purple-500 to-transparent" />
        <div className="absolute bottom-1/4 left-1/3 w-[350px] h-[350px] rounded-full blur-[100px] opacity-20 bg-gradient-to-r from-pink-500 to-transparent" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-10">
          <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
          <span className="text-white/80 text-sm">المصدر الأول لـ SaaS في السعودية</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
          <span className="block text-white">Saudi</span>
          <span className="block bg-gradient-to-r from-accent-green via-purple-400 to-pink-500 bg-clip-text text-transparent">SaaS Hub</span>
        </h1>

        <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-10">
          مصدرك الأول لأحدث أخبار التقنية والأعمال في المملكة العربية السعودية
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link href="/articles" className="px-8 py-4 rounded-xl bg-gradient-to-r from-accent-green to-emerald-400 text-background font-bold hover:shadow-[0_0_30px_rgba(0,217,165,0.3)] transition-all">
            استكشف المقالات
          </Link>
          <Link href="/about" className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold backdrop-blur-sm hover:bg-white/10 transition-all">
            عن المنصة
          </Link>
        </div>

        {/* Latest Articles Preview */}
        <div className="mb-8">
          <p className="text-white/40 text-sm mb-4">أحدث المقالات</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/articles/how-to-launch-saas-company-saudi-arabia-2026" className="group px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-accent-green/50 transition-all text-sm">
              <span className="text-white/60 group-hover:text-white transition-colors">كيف تطلق SaaS في السعودية</span>
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
        <svg className="w-6 h-6 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
