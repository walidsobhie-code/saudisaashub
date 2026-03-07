'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { articles as allArticles } from '../lib/articles-data';
import { Newsletter } from '../components/Newsletter';

const rotatingHeadlines = [
  { title: 'سوق البرمجيات السحابية في المملكة — وين وصل؟', category: 'تقارير السوق' },
  { title: 'لماذا تتسابق عمالقة التقنية للدخول إلى السوق السعودي؟', category: 'أخبار السوق' },
  { title: 'أبرز شركات SaaS الناشئة في المملكة العربية السعودية 2026', category: 'شركات ناشئة' },
  { title: 'نظام حماية البيانات الشخصية (PDPL) — ما يجب أن يعرفه كل مزوّد SaaS', category: 'امتثال' },
  { title: 'كيف تطلق شركة SaaS ناجحة في السعودية؟', category: 'دليل عملي' },
];

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
        <p className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto mb-4 font-light">
          مصدرك الأول لأحدث أخبار التقنية والأعمال في المملكة العربية السعودية
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
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
  const [currentHeadline, setCurrentHeadline] = useState(0);

  // Rotate headlines
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadline((prev) => (prev + 1) % rotatingHeadlines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Hero />

      {/* Latest Headlines Ticker */}
      <section className="py-5 bg-gradient-to-r from-emerald-500/5 via-purple-500/5 to-pink-500/5 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-8 overflow-hidden h-14">
            {/* Animated Badge */}
            <span className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 text-[#0A0A14] text-sm font-bold shadow-lg shadow-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-[#0A0A14] animate-ping"></span>
              جديد
            </span>

            {/* Rotating Headlines */}
            <div className="relative flex-1 overflow-hidden h-full">
              {rotatingHeadlines.map((item, index) => (
                <Link
                  key={index}
                  href="/articles"
                  className={`absolute inset-0 flex items-center gap-4 transition-all duration-700 ease-out ${
                    index === currentHeadline
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                >
                  <span className="shrink-0 px-3 py-1 rounded-full bg-white/10 text-white/60 text-sm font-medium border border-white/10">
                    {item.category}
                  </span>
                  <span className="text-xl md:text-2xl font-bold text-white tracking-wide hover:text-emerald-400 transition-colors truncate">
                    {item.title}
                  </span>
                </Link>
              ))}
            </div>

            {/* View All Link */}
            <Link href="/articles" className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-emerald-400 hover:border-emerald-500/30 transition-all text-sm font-medium">
              عرض الكل
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
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

      {/* Saudi SaaS Market Stats */}
      <section className="py-16 bg-gradient-to-b from-[#0A0A14] via-[#0F0F1A] to-[#0A0A14] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full blur-[150px] opacity-20 bg-gradient-to-r from-emerald-500 to-transparent" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[150px] opacity-20 bg-gradient-to-r from-purple-500 to-transparent" />
        </div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <h3 className="text-xl font-bold text-white/80">سوق SaaS السعودي في أرقام</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: '$6.49B', label: 'حجم السوق المتوقع 2030', color: 'from-emerald-400 to-cyan-400', icon: '📈' },
              { num: '14.63%', label: 'معدل النمو السنوي', color: 'from-purple-400 to-pink-400', icon: '🚀' },
              { num: '225+', label: 'شركة SaaS نشطة', color: 'from-blue-400 to-indigo-400', icon: '🏢' },
              { num: '$604M', label: 'تمويل تراكمي', color: 'from-amber-400 to-orange-400', icon: '💰' },
            ].map((stat, i) => (
              <div key={i} className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/8 backdrop-blur-sm hover:border-white/20 transition-all hover:scale-105">
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                <div className="relative z-10 text-center">
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>{stat.num}</div>
                  <div className="text-white/50 text-sm mt-2">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Insights Stats */}
      <section className="py-16 bg-gradient-to-b from-[#0A0A14] to-[#0F0F1A]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h3 className="text-lg font-medium text-white/60">Saudi SaaS Market Insights 2026</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: '$6.49B', label: 'Market Size by 2030', color: 'from-emerald-400 to-cyan-400' },
              { num: '14.63%', label: 'Annual Growth Rate', color: 'from-purple-400 to-pink-400' },
              { num: '225+', label: 'Active SaaS Companies', color: 'from-blue-400 to-indigo-400' },
              { num: '$604M', label: 'Cumulative Funding', color: 'from-amber-400 to-orange-400' },
            ].map((stat, i) => (
              <div key={i} className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-white/20 transition-all">
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                <div className="relative text-center">
                  <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                    {stat.num}
                  </div>
                  <div className="text-white/50 text-sm">{stat.label}</div>
                </div>
              </div>
            ))}
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
              <p className="text-white/40 mt-2 text-lg font-light">أحدث التحليلات والتقارير التقنية</p>
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

      {/* Newsletter Section */}
      <Newsletter />

      {/* Partners/Stats Section */}
      <section className="py-16 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-white/40 text-sm mb-8">شركاؤنا في النجاح</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50">
            {['NVIDIA', 'Google', 'Microsoft', 'AWS', 'Oracle', 'Salesforce'].map((brand, i) => (
              <div key={i} className="text-white/30 font-bold text-xl">{brand}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Calendar Section */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#0A0A14] via-[#0F0F1A] to-[#0A0A14]">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-[180px] opacity-10 bg-gradient-to-r from-pink-500 to-purple-500" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] opacity-10 bg-gradient-to-r from-emerald-500 to-cyan-500" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm mb-4">
              <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
              الفعاليات القادمة
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              أحداث <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">المملكة</span>
            </h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto">أهم الفعاليات التقنية وريادة الأعمال في السعودية</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: 'saas-summit', month: 'مارس', day: '15', title: 'SaaS Summit Riyadh', location: 'الرياض', type: 'مؤتمر', color: 'from-pink-500 to-rose-500' },
              { id: 'techcrunch', month: 'أبريل', day: '8', title: 'TechCrunch Disrupt', location: 'جدة', type: 'فعالية', color: 'from-purple-500 to-violet-500' },
              { id: 'startup-grind', month: 'مايو', day: '22', title: 'Startup Grind KSA', location: 'الدمام', type: 'منتدى', color: 'from-emerald-500 to-teal-500' },
              { id: 'cloud-expo', month: 'يونيو', day: '5', title: 'Cloud Expo Saudi', location: 'الرياض', type: 'معرض', color: 'from-blue-500 to-cyan-500' },
            ].map((event, i) => (
              <div key={i} className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/8 backdrop-blur-sm hover:border-pink-500/30 transition-all duration-500 hover:scale-[1.02]">
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${event.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                <div className="relative z-10 text-center">
                  <div className={`inline-flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${event.color} mb-4`}>
                    <span className="text-white font-bold text-lg">{event.day}</span>
                    <span className="text-white/80 text-xs">{event.month}</span>
                  </div>

                  <span className={`inline-block px-3 py-1 rounded-full text-xs bg-gradient-to-r ${event.color} text-white/90 mb-3`}>
                    {event.type}
                  </span>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">{event.title}</h3>
                  <p className="text-white/50 text-sm flex items-center justify-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.location}
                  </p>

                  <Link href={`/events?id=${event.id}`} className="mt-4 w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-semibold hover:bg-pink-500 hover:border-pink-500 transition-all text-center block">
                    تسجيل
                  </Link>
                </div>

                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${event.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold hover:shadow-[0_0_30px_rgba(236,72,153,0.3)] transition-all">
              أضف فعاليتك
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Company Directory Section */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#0A0A14] to-[#12121F]">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[180px] opacity-10 bg-gradient-to-r from-cyan-500 to-blue-500" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-4">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              دليل الشركات
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              أبرز شركات <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">SaaS</span> السعودية
            </h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto">تعرف على أبرز شركات البرمجيات السحابية في المملكة</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Monshaat', sector: 'ريادة الأعمال', employees: '500+', location: 'الرياض', logo: 'M', color: 'from-blue-500 to-cyan-500', url: 'https://monshaat.gov.sa' },
              { name: 'SaudiCloud', sector: 'سحابة', employees: '200+', location: 'الرياض', logo: 'SC', color: 'from-purple-500 to-pink-500', url: 'https://saudicloud.com' },
              { name: 'Teal', sector: 'محاسبة', employees: '50+', location: 'جدة', logo: 'T', color: 'from-emerald-500 to-teal-500', url: 'https://teal.sa' },
              { name: 'Salla', sector: 'تجارة إلكترونية', employees: '100+', location: 'الرياض', logo: 'S', color: 'from-orange-500 to-amber-500', url: 'https://salla.sa' },
              { name: 'Madar', sector: 'تعليم', employees: '75+', location: 'الدمام', logo: 'M', color: 'from-violet-500 to-purple-500', url: 'https://madar.education' },
              { name: 'Bayt.com', sector: 'موارد بشرية', employees: '1000+', location: 'جدة', logo: 'B', color: 'from-red-500 to-pink-500', url: 'https://bayt.com' },
            ].map((company, i) => (
              <div key={i} className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/8 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-500 hover:scale-[1.02]">
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${company.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                <div className="relative z-10 flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${company.color} flex items-center justify-center text-white font-bold text-lg shrink-0`}>
                    {company.logo}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{company.name}</h3>
                    <p className="text-white/50 text-sm mb-3">{company.sector}</p>

                    <div className="flex items-center gap-4 text-white/40 text-xs">
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {company.employees}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {company.location}
                      </span>
                    </div>
                  </div>

                  <a href={company.url} target="_blank" rel="noopener noreferrer" className="mt-4 w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-semibold hover:bg-cyan-500 hover:border-cyan-500 transition-all text-center block">
                    زر الموقع
                  </a>
                </div>

                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${company.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all">
              أضف شركتك
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* SaaS Calculators Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-purple-500/5 to-pink-500/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[150px] opacity-10 bg-gradient-to-r from-emerald-500 via-purple-500 to-pink-500" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              حاسبات SaaS
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              احسب مؤشرات <span className="bg-gradient-to-r from-emerald-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">أعمالك</span>
            </h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto">أدوات مجانية لحساب أهم_metricس في مجال SaaS</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: 'mrr', title: 'حساب MRR', description: 'احسب الإيرادات الشهرية المتكررة', icon: '💰', color: 'from-emerald-500 to-green-500' },
              { id: 'churn', title: 'حساب churn Rate', description: 'احسب معدل فقدان العملاء', icon: '📉', color: 'from-red-500 to-orange-500' },
              { id: 'ltv', title: 'حساب LTV', description: 'احسب قيمة العميلLifetime', icon: '👤', color: 'from-purple-500 to-violet-500' },
              { id: 'cac', title: 'حساب CAC', description: 'احسب تكلفة اكتساب العميل', icon: '🎯', color: 'from-blue-500 to-cyan-500' },
              { id: 'roi', title: 'حساب ROI', description: 'احسب العائد على الاستثمار', icon: '📈', color: 'from-pink-500 to-rose-500' },
              { id: 'burn', title: 'حساب Burn Rate', description: 'احسب معدل حرق التمويل', icon: '🔥', color: 'from-amber-500 to-orange-500' },
            ].map((calc, i) => (
              <div key={i} className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/8 backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-500 hover:scale-[1.02]">
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${calc.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                <div className="relative z-10 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${calc.color} mb-4 text-3xl`}>
                    {calc.icon}
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">{calc.title}</h3>
                  <p className="text-white/50 text-sm mb-4">{calc.description}</p>

                  <Link href={`/calculators?type=${calc.id}`} className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-emerald-500 hover:border-emerald-500 transition-all duration-300 text-center block">
                    احسب الآن
                  </Link>
                </div>

                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${calc.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Visualizations Section */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#0A0A14] via-[#0F0F1A] to-[#0A0A14]">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[180px] opacity-15 bg-gradient-to-r from-violet-500 to-purple-500" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[150px] opacity-15 bg-gradient-to-r from-pink-500 to-rose-500" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm mb-4">
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
              إحصائيات السوق
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              أرقام قطاع <span className="bg-gradient-to-r from-violet-400 to-pink-500 bg-clip-text text-transparent">SaaS</span> السعودي
            </h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto">استعرض أهم الإحصائيات والبيانات</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Market Size Chart */}
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/8 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-6">حجم السوق المتوقع (مليار $)</h3>
              <div className="space-y-4">
                {[
                  { year: '2024', value: 2.1, percent: 32 },
                  { year: '2025', value: 3.2, percent: 49 },
                  { year: '2026', value: 4.5, percent: 69 },
                  { year: '2027', value: 5.8, percent: 89 },
                  { year: '2030', value: 6.49, percent: 100 },
                ].map((item, i) => (
                  <div key={i} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white/70">{item.year}</span>
                      <span className="text-emerald-400 font-bold">{item.value}B$</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all duration-1000 group-hover:opacity-80"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Company Distribution */}
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/8 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-6">توزيع الشركات حسب القطاع</h3>
              <div className="space-y-4">
                {[
                  { sector: 'Finance', percent: 28, color: 'from-purple-500 to-violet-500' },
                  { sector: 'Healthcare', percent: 22, color: 'from-pink-500 to-rose-500' },
                  { sector: 'E-Commerce', percent: 18, color: 'from-blue-500 to-cyan-500' },
                  { sector: 'Education', percent: 15, color: 'from-amber-500 to-orange-500' },
                  { sector: 'Logistics', percent: 10, color: 'from-green-500 to-emerald-500' },
                  { sector: 'Other', percent: 7, color: 'from-gray-500 to-slate-500' },
                ].map((item, i) => (
                  <div key={i} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white/70">{item.sector}</span>
                      <span className="text-purple-400 font-bold">{item.percent}%</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000 group-hover:opacity-80`}
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Funding Stats */}
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/8 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-6">إجمالي التمويل (مليون $)</h3>
              <div className="flex items-end justify-between h-48">
                {[
                  { year: '2021', value: 45 },
                  { year: '2022', value: 120 },
                  { year: '2023', value: 180 },
                  { year: '2024', value: 95 },
                  { year: '2025', value: 164 },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center flex-1 group">
                    <div
                      className="w-8 md:w-12 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-md transition-all duration-500 group-hover:from-purple-400 group-hover:to-pink-400"
                      style={{ height: `${(item.value / 180) * 100}%` }}
                    />
                    <span className="text-white/50 text-xs mt-2">{item.year}</span>
                    <span className="text-white/70 text-xs">{item.value}M</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Growth Rate */}
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/8 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-6">معدل النمو السنوي حسب المدينة</h3>
              <div className="space-y-4">
                {[
                  { city: 'الرياض', rate: 16.2, color: 'from-emerald-500 to-cyan-500' },
                  { city: 'جدة', rate: 14.8, color: 'from-blue-500 to-indigo-500' },
                  { city: 'الدمام', rate: 12.5, color: 'from-purple-500 to-violet-500' },
                  { city: 'مكة', rate: 10.2, color: 'from-pink-500 to-rose-500' },
                ].map((item, i) => (
                  <div key={i} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white/70">{item.city}</span>
                      <span className="text-emerald-400 font-bold">{item.rate}%</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000 group-hover:opacity-80`}
                        style={{ width: `${(item.rate / 20) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
