'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('');
  const [visible, setVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Mouse tracking for 3D parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      setMousePosition({ x, y });
    };
    const hero = heroRef.current;
    hero?.addEventListener('mousemove', handleMouseMove);
    return () => hero?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Initialize particles on client side
  useEffect(() => {
    const canvas = document.getElementById('hero-particles') as HTMLCanvasElement;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    
    // Create particles
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];
    
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
    
    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${p.opacity})`;
        ctx.fill();
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const categories = [
    { name: 'FinTech', slug: 'fintech', icon: '💳' },
    { name: 'HealthTech', slug: 'healthtech', icon: '🏥' },
    { name: 'E-commerce', slug: 'e-commerce', icon: '🛒' },
    { name: 'Education', slug: 'edtech', icon: '🎓' },
    { name: 'Logistics', slug: 'logistics', icon: '🚚' },
  ];

  // Calculate 3D transforms based on mouse position
  const heroTransform = `perspective(1000px) rotateY(${mousePosition.x * 2}deg) rotateX(${-mousePosition.y * 2}deg)`;
  const statsCardTransform = (index: number) => 
    `perspective(1000px) rotateY(${mousePosition.x * (3 + index * 0.5)}deg) rotateX(${-mousePosition.y * (3 + index * 0.5)}deg)`;
  const ctaTransform = `perspective(1000px) rotateY(${mousePosition.x * 4}deg) rotateX(${-mousePosition.y * 4}deg)`;

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden transition-transform duration-100 ease-out"
      style={{ transform: heroTransform }}
    >
      {/* Advanced Mesh Gradient Background with Noise */}
      <div className="absolute inset-0 bg-background">
        {/* Animated Mesh Gradient */}
        <div className="absolute inset-0 mesh-gradient-advanced opacity-60" />
        
        {/* Floating 3D Geometric Shapes */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96">
          <div className="w-full h-full border-2 border-accent-green/10 rounded-full animate-float" style={{ animationDuration: '20s', transform: 'rotate3d(1, 1, 1, 45deg)' }} />
        </div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80">
          <div className="w-full h-full border-2 border-purple-500/15 transform rotate-45 animate-float" style={{ animationDuration: '25s', animationDelay: '5s' }} />
        </div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72">
          <div className="w-full h-full border border-cyan-500/10 transform rotate-12 animate-float" style={{ animationDuration: '18s', animationDelay: '10s', transform: 'rotate3d(1, 0, 1, 30deg)' }} />
        </div>
        
        {/* Subtle Noise Texture */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Particle Canvas - Interactive */}
      <canvas 
        id="hero-particles" 
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.6 }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
        {/* Badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-[var(--color-primary)]/30 mb-8 transition-all duration-1000 ease-out ${visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}>
          <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
          <span className="text-text-secondary text-sm">المصدر الأول لـ SaaS في المملكة العربية السعودية</span>
        </div>

        {/* Main Headline - 3D Extrusion */}
        <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight transition-all duration-1000 ease-out delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{
              textShadow: `
                0 1px 0 #ccc,
                0 2px 0 #c9c9c9,
                0 3px 0 #bbb,
                0 4px 0 #b9b9b9,
                0 5px 0 #aaa,
                0 6px 1px rgba(0,0,0,.1),
                0 0 5px rgba(0,0,0,.1),
                0 1px 3px rgba(0,0,0,.3),
                0 3px 5px rgba(0,0,0,.2),
                0 5px 10px rgba(0,0,0,.25),
                0 10px 10px rgba(0,0,0,.2),
                0 20px 20px rgba(0,0,0,.15)
              `,
            }}>
          <span className="block text-white">Saudi</span>
          <span className="block gradient-headline">SaaS Hub</span>
        </h1>

        {/* Subheadline - Clean white news ticker in recessed pit */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className={`relative transition-all duration-1000 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ animationDelay: '0.5s' }}>
            {/* Recessed pit container with 3D depth */}
            <div className="relative h-20 md:h-24 rounded-xl overflow-hidden bg-gradient-to-b from-black/60 via-[#0A0A0A] to-black/60 border border-white/5 shadow-[inset_0_2px_8px_rgba(0,0,0,0.8),0_10px_30px_rgba(0,0,0,0.5)]">
              {/* Scrolling Marquee Wrapper */}
              <div className="absolute inset-0 flex items-center perspective-500" style={{ perspective: '1000px' }}>
                <div className="animate-marquee whitespace-nowrap" style={{ transform: 'translateZ(50px)' }}>
                  <span className="text-lg md:text-2xl font-medium text-white">
                    🚀 اكتشف أكثر من 250 شركة SaaS سعودية • Discover 250+ Saudi SaaS companies • ZATCA Compliance Guide • Funding Tracker Live • أفضل 10 شركات SaaS • Top 10 Companies • اشترك في النشرة البريدية • Subscribe to Newsletter
                  </span>
                </div>
              </div>
              
              {/* Inner glow for depth */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-t from-accent-green/20 to-transparent" />
              {/* Glossy highlight */}
              <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-white/5 to-transparent" />
            </div>
            
            {/* Clean separator line */}
            <div className="w-16 h-0.5 bg-gradient-to-r from-accent-green via-accent-cyan to-purple-400 mx-auto mt-3 rounded-full" />
          </div>
        </div>

        {/* Primary CTAs with 3D Press Effect */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-1000 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '0.8s', transform: ctaTransform }}>
          <Link
            href="/companies"
            className="group px-8 py-4 rounded-xl bg-gradient-to-r from-accent-green to-accent-green/80 text-background font-bold text-lg hover:shadow-glow-green transition-all hover:scale-105 active:scale-95 relative overflow-hidden"
            style={{
              boxShadow: '0 10px 40px rgba(16, 185, 129, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              تصفح الشركات
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>
          <Link
            href="/contact"
            className="group px-8 py-4 rounded-xl bg-card/60 backdrop-blur-sm border border-white/10 text-white font-semibold text-lg hover:border-accent-green/50 transition-all hover:scale-105 active:scale-95 relative overflow-hidden"
            style={{
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              أضف شركتك
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </span>
          </Link>
        </div>

        {/* Stats Row - 3D Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-16">
          {[
            { value: '250+', label: 'Saudi Companies', color: 'text-accent-green' },
            { value: '15+', label: 'Categories', color: 'text-accent-cyan' },
            { value: '10+', label: 'Articles', color: 'text-purple-400' },
            { value: '1', label: 'Platform', color: 'text-white' },
          ].map((stat, index) => (
            <div 
              key={stat.label}
              className="relative bg-card/40 backdrop-blur-sm rounded-xl border border-[var(--color-border)] p-6 transition-all duration-300 hover:scale-105 hover:border-accent-green/30 group"
              style={{ 
                transform: statsCardTransform(index),
                boxShadow: '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)'
              }}
            >
              {/* Glossy highlight */}
              <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-white/10 to-transparent rounded-t-xl" />
              <div className={`text-4xl font-bold mb-2 ${stat.color}`}>{stat.value}</div>
              <div className="text-text-secondary text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Search & Categories */}
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ animationDelay: '1.3s', transform: `perspective(1000px) translateZ(30px)` }}>
          {/* Search */}
          <div className="relative mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن شركة، فئة، أو خدمة..."
              className="w-full px-6 py-4 rounded-2xl bg-card/80 backdrop-blur-sm border border-white/10 text-white placeholder:text-text-muted focus:border-accent-green focus:outline-none focus:ring-2 focus:ring-accent-green/20 text-lg shadow-lg"
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
                className="px-4 py-2 rounded-full bg-card/50 border border-white/5 text-text-secondary hover:text-white hover:border-accent-green/30 transition-all text-sm flex items-center gap-2 hover:scale-105"
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Reflection */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-accent-green/5 to-transparent" />
      
      {/* Subtle ambient glow under hero */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-accent-green/20 to-transparent" />
    </section>
  );
}
