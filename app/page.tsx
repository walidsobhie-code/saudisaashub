'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { articles as allArticles } from '../lib/articles-data';

interface Article {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  categories: string[];
  author: string;
  readingTime: number;
}

const categories = [
  { name: 'SaaS', icon: '💻', count: 5, color: 'from-green-500 to-emerald-500' },
  { name: 'FinTech', icon: '💰', count: 3, color: 'from-purple-500 to-violet-500' },
  { name: 'Cyber Security', icon: '🔒', count: 2, color: 'from-red-500 to-orange-500' },
  { name: 'Healthcare', icon: '🏥', count: 2, color: 'from-pink-500 to-rose-500' },
  { name: 'E-Commerce', icon: '🛒', count: 2, color: 'from-blue-500 to-cyan-500' },
  { name: 'EdTech', icon: '🎓', count: 1, color: 'from-yellow-500 to-amber-500' },
  { name: 'IoT', icon: '📡', count: 1, color: 'from-cyan-500 to-teal-500' },
  { name: 'Logistics', icon: '🚚', count: 1, color: 'from-indigo-500 to-blue-500' },
];

function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Array<{x: number; y: number; vx: number; vy: number; size: number; color: string}> = [];
    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      for (let i = 0; i < Math.floor(window.innerWidth / 8); i++) {
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
        p.x += p.vx; p.y += p.vy;
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
          const dx = p.x - p2.x, dy = p.y - p2.y, dist = Math.sqrt(dx * dx + dy * dy);
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
      animationId = requestAnimationFrame(animate);
    };

    resize(); createParticles(); animate();
    window.addEventListener('resize', () => { resize(); createParticles(); });
    return () => cancelAnimationFrame(animationId);
  }, []);

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
      <div className="absolute inset-0 z-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-12">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white/80 text-sm font-medium">المصدر الأول لـ SaaS في السعودية</span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          <span className="block text-white">Saudi</span>
          <span className="block bg-gradient-to-r from-emerald-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">SaaS Hub</span>
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto mb-10 font-light">
          مصدرك الأول لأحدث أخبار التقنية والأعمال في المملكة العربية السعودية
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link href="/articles" className="group px-8 py-4.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 text-[#0A0A14] font-bold text-lg hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] transition-all duration-300 hover:scale-105">
            <span className="flex items-center gap-2">
              استكشف المقالات
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </span>
          </Link>
          <Link href="/contact" className="group px-8 py-4.5 rounded-2xl bg-white/5 border border-white/10 text-white font-semibold text-lg backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300">
            <span className="flex items-center gap-2">
              تواصل معنا
              <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </span>
          </Link>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {[
            { number: '17+', label: 'مقال متخصص', color: 'text-emerald-400' },
            { number: '8+', label: 'قطاع صناعي', color: 'text-purple-400' },
            { number: '2026', label: 'أحدث التحديثات', color: 'text-pink-400' },
            { number: 'مجاني', label: 'المحتوى', color: 'text-white/60' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-1`}>{stat.number}</div>
              <div className="text-white/40 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
      </div>
    </section>
  );
}

export default function Home() {
  const articles = allArticles;
  const featuredArticles = articles.slice(0, 6);

  return (
    <>
      <Hero />

      {/* Stats Banner */}
      <section className="py-12 bg-gradient-to-r from-emerald-500/10 via-purple-500/10 to-pink-500/10 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: '$6.49B', label: 'حجم السوق المتوقع 2030' },
              { num: '14.63%', label: 'معدل النمو السنوي' },
              { num: '225+', label: 'شركة SaaS نشطة' },
              { num: '$604M', label: 'تمويل تراكمي' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">{stat.num}</div>
                <div className="text-white/50 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles - Unique Showcase */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-green/5 via-purple-500/5 to-pink-500/5" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-green/10 border border-accent-green/20 text-accent-green text-sm mb-4">
              <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
              جديد على المنصة
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              أحدث <span className="bg-gradient-to-r from-emerald-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">المقالات</span>
            </h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto">ابقَ على اطلاع بأحدث التحليلات والتقارير</p>
          </div>

          {/* Article Cards with Glow Effect */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'كيف تطلق شركة SaaS في السعودية 2026', category: 'دليل عملي', color: 'from-emerald-400 to-green-600', slug: 'launch-saas-company-saudi-2026' },
              { title: 'الأمن السيبراني للشركات السعودية', category: 'أمن سيبراني', color: 'from-red-500 to-orange-500', slug: 'cybersecurity-saudi-arabia-2026' },
              { title: 'الصحة الرقمية في المملكة 2026', category: 'رعاية صحية', color: 'from-pink-500 to-rose-500', slug: 'digital-health-saudi-2026' },
              { title: 'الفوترة الإلكترونية زاتكا', category: 'امتثال ضريبي', color: 'from-purple-500 to-violet-600', slug: 'zatca-e-invoice-2026' },
              { title: 'منصات التعليم الإلكتروني', category: 'تعليم تقني', color: 'from-yellow-500 to-amber-600', slug: 'edtech-lms-saudi-2026' },
              { title: 'تجارة الإلكترونية السعودية', category: 'تجارة إلكترونية', color: 'from-blue-500 to-cyan-600', slug: 'ecommerce-platforms-saudi-2026' },
            ].map((article, i) => (
              <Link
                key={i}
                href={`/articles/${article.slug}`}
                className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/8 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(0,217,165,0.1)]"
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${article.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-gradient-to-br ${article.color} flex items-center justify-center text-white font-bold text-sm opacity-80">
                  {i + 1}
                </div>
                <div className="relative z-10 mt-8">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs bg-gradient-to-r ${article.color} text-white/90 mb-3`}>
                    {article.category}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-accent-green transition-colors duration-300 line-clamp-2">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-4 text-white/40 text-sm group-hover:text-accent-green transition-colors">
                    <span>اقرأ المزيد</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${article.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/articles" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-accent-green to-emerald-400 text-background font-bold hover:shadow-[0_0_30px_rgba(0,217,165,0.3)] transition-all">
              عرض جميع المقالات
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.01] via-transparent to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                أحدث <span className="bg-gradient-to-r from-emerald-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">المقالات</span>
              </h2>
              <p className="text-white/40 mt-2">Stay ahead with latest insights</p>
            </div>
            <Link href="/articles" className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-emerald-500/30 transition-all">
              عرض الكل
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>

          {articles.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (<div key={i} className="animate-pulse"><div className="bg-white/[0.02] rounded-2xl border border-white/5 p-6"><div className="h-4 bg-white/10 rounded w-1/3 mb-4" /><div className="h-6 bg-white/10 rounded w-3/4 mb-2" /><div className="h-4 bg-white/10 rounded w-1/2" /></div></div>))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  className="group bg-white/[0.02] rounded-2xl border border-white/8 hover:border-emerald-500/30 transition-all duration-300 overflow-hidden backdrop-blur-sm"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      {article.categories.slice(0, 1).map((cat) => (<span key={cat} className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/20 to-purple-500/20 text-emerald-400 border border-emerald-500/20">{cat}</span>))}
                      <span className="text-white/30">•</span>
                      <span className="text-white/40 text-xs">{article.readingTime} min</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-emerald-400 transition-colors duration-300">{article.title}</h3>
                    <p className="text-white/50 text-sm line-clamp-2 mb-4">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-white/30 pt-4 border-t border-white/5">
                      <span>{article.author}</span>
                      <span>{new Date(article.date).toLocaleDateString('ar')}</span>
                    </div>
                  </div>
                  <div className="h-1 bg-gradient-to-r from-emerald-400 via-purple-400 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-12 md:hidden">
            <Link href="/articles" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 text-[#0A0A14] font-bold">عرض كل المقالات</Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[180px] opacity-20 bg-gradient-to-r from-purple-500 via-pink-500 to-emerald-500" />
        </div>
        
        <div className="max-w-3xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            هل تريد <span className="bg-gradient-to-r from-emerald-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">المزيد؟</span>
          </h2>
          <p className="text-xl text-white/50 mb-10 max-w-xl mx-auto">
            تواصل معنا للحصول على تقارير مخصصة وحلول بحثية متخصصة لاحتياجاتك
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="px-10 py-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 text-[#0A0A14] font-bold text-lg hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] transition-all duration-300 hover:scale-105">
              تواصل معنا
            </Link>
            <Link href="/about" className="px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-semibold text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              عن المنصة
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
