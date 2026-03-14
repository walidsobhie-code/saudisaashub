'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, TrendingUp, Users, Globe, Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import ParallaxLayer from '@/components/ParallaxLayer';

export default function Hero() {
  const { t, isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [tiltStyle, setTiltStyle] = useState({ transform: '' });
  const heroRef = useRef<HTMLElement>(null);
  const particlesRef = useRef<HTMLCanvasElement>(null);

  // Arabic content
  const arabicContent = {
    headline: 'المصدر الأول لـ SaaS في المملكة العربية السعودية',
    subheadline: 'اكتشف أفضل حلول البرمجيات المتوافقة مع متطلبات هيئة الزكاة والضرائب والجمارك (ZATCA). انضم إلى أكثر من 250 شركة سعودية رائدة.',
    searchPlaceholder: 'ابحث عن شركة أو فئة...',
    ctaBrowse: 'تصفح الشركات',
    ctaAdd: 'أضف شركتك',
  };

  // Stats with 3D card configuration
  const stats = [
    { icon: Users, value: '250+', label: 'شركة سعودية', color: 'from-blue-500 to-blue-600' },
    { icon: Globe, value: '15+', label: 'فئة', color: 'from-purple-500 to-purple-600' },
    { icon: Shield, value: 'ZATCA', label: 'متوافق', color: 'from-emerald-500 to-emerald-600' },
  ];

  const quickCategories = [
    'التمويل',
    'التجارة الإلكترونية',
    'الصحة',
    'التعليم',
    'الخدمات اللوجستية',
  ];

  // Initialize particles system
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setIsLoading(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Mouse tracking for 3D tilt effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;

      const rect = heroRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const x = (e.clientX - centerX) / 50;
      const y = (e.clientY - centerY) / 50;

      setMousePosition({ x, y });

      // Apply subtle tilt to hero content
      const tilt = `perspective(1000px) rotateY(${x * 0.5}deg) rotateX(${-y * 0.5}deg)`;
      setTiltStyle({ transform: tilt });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Interactive particle system
  useEffect(() => {
    const canvas = particlesRef.current;
    if (!canvas || isLoading) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    // Particle configuration
    const particleCount = 40;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    // Animation loop with requestAnimationFrame
    let animationId: number;
    let lastTime = 0;

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Mouse interaction - gentle attraction/repulsion
        if (mousePosition.x !== 0 && mousePosition.y !== 0) {
          const dx = mousePosition.x - (particle.x - canvas.width / 2);
          const dy = mousePosition.y - (particle.y - canvas.height / 2);
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const force = (150 - distance) / 150;
            particle.vx += dx * force * 0.0001;
            particle.vy += dy * force * 0.0001;

            // Limit velocity
            const maxV = 0.8;
            particle.vx = Math.max(-maxV, Math.min(maxV, particle.vx));
            particle.vy = Math.max(-maxV, Math.min(maxV, particle.vy));
          }
        }

        // Damping
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${particle.opacity})`;
        ctx.fill();

        // Draw connections to nearby particles
        for (let j = index + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isLoading, mousePosition]);

  // 3D Card tilt effect handler
  const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = (e.clientX - centerX) / 20;
    const y = (e.clientY - centerY) / 20;

    card.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) scale3d(1.02, 1.02, 1.02)`;
  }, []);

  const handleCardMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
  }, []);

  // Loading skeleton state
  if (isLoading) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 py-16 sm:py-24 lg:py-32" dir="rtl">
        <div className="absolute inset-0 mesh-gradient-advanced"></div>
        <div className="noise-overlay"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto">
            <div className="skeleton h-24 w-3/4 mx-auto mb-6 rounded-2xl"></div>
            <div className="skeleton h-8 w-full mx-auto mb-4 rounded-lg"></div>
            <div className="skeleton h-8 w-5/6 mx-auto mb-10 rounded-lg"></div>
            <div className="skeleton h-16 w-full max-w-3xl mx-auto mb-10 rounded-2xl"></div>
            <div className="skeleton h-14 w-48 mx-auto mb-8 rounded-2xl"></div>
            <div className="grid grid-cols-3 gap-6 skeleton h-32 rounded-xl"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={heroRef}
      className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 py-16 sm:py-24 lg:py-32" 
      dir="rtl"
    >
      {/* Advanced Mesh Gradient Background */}
      <ParallaxLayer speed={-0.3} className="absolute inset-0">
        <div className="absolute inset-0 mesh-gradient-advanced"></div>
      </ParallaxLayer>

      {/* Noise Texture Overlay */}
      <div className="noise-overlay"></div>

      {/* Interactive Particle Canvas */}
      <canvas ref={particlesRef} id="particle-canvas" />

      {/* Floating Geometric Shapes - Mid Ground */}
      <ParallaxLayer speed={0.4} className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="geo-shape cube" style={{ top: '15%', left: '10%', animationDelay: '0s' }}></div>
        <div className="geo-shape cube" style={{ top: '70%', right: '15%', animationDelay: '5s' }}></div>
        <div className="geo-shape cube" style={{ top: '40%', left: '60%', animationDelay: '10s' }}></div>
        <div className="geo-shape" style={{ 
          width: '40px', 
          height: '40px',
          top: '25%', 
          right: '30%',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(139, 92, 246, 0.15))',
          animation: 'floatGeo 25s ease-in-out infinite'
        }}></div>
        <div className="geo-shape" style={{ 
          width: '50px', 
          height: '50px',
          top: '75%', 
          left: '20%',
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          background: 'rgba(16, 185, 129, 0.12)',
          animation: 'floatGeo 30s ease-in-out infinite reverse'
        }}></div>
      </ParallaxLayer>

      {/* Main Content with Parallax */}
      <ParallaxLayer speed={0.2} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto">
          {/* Main Headline with 3D Extrusion */}
          <div className="staggered-enter stagger-1" style={tiltStyle}>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent text-3d-extruded animate-gradient">
                {arabicContent.headline}
              </span>
            </h1>
          </div>

          {/* Subheadline with gradient stroke */}
          <div className="staggered-enter stagger-2">
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed gradient-stroke-animated inline-block px-4 py-2">
              {arabicContent.subheadline}
            </p>
          </div>

          {/* Search Bar with 3D effect */}
          <div className="staggered-enter stagger-3 relative max-w-3xl mx-auto mb-10">
            <div className="relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={arabicContent.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-14 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-right shadow-lg hover:shadow-blue-500/10"
                style={{ textAlign: 'right' }}
              />
            </div>
          </div>

          {/* Primary CTAs with 3D button effect */}
          <div className="staggered-enter stagger-4 flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/companies"
              className="button-3d group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:scale-105 glossy-highlight"
            >
              <span>{arabicContent.ctaBrowse}</span>
              <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''} transition-transform group-hover:translate-x-1`} />
            </Link>

            <Link
              href="/contact"
              className="button-3d group inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-semibold rounded-2xl hover:bg-white/20 hover:border-white/50 transition-all duration-300"
            >
              <span>{arabicContent.ctaAdd}</span>
            </Link>
          </div>

          {/* Social Share Buttons */}
          <div className="staggered-enter stagger-5 w-full max-w-2xl mx-auto mb-12">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
              <p className="text-sm text-gray-300 mb-4">شارك هذه المنصة مع الآخرين</p>
              <div className="flex justify-center gap-3 flex-wrap">
                {/* Twitter */}
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

                {/* Copy Link */}
                <button
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(window.location.href);
                      // Could add toast notification here
                      alert('تم نسخ الرابط!');
                    } catch (err) {
                      console.error('Failed to copy:', err);
                      alert('فشل نسخ الرابط. يرجى المحاولة مرة أخرى.');
                    }
                  }}
                  className="px-4 py-2 sm:px-6 sm:py-2.5 bg-white/10 border border-white/20 rounded-full text-sm text-gray-300 hover:bg-white/20 hover:border-blue-500/50 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
                  aria-label="نسخ الرابط"
                >
                  نسخ الرابط
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards with 3D Tilt Effect */}
          <div className="staggered-enter stagger-5 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="glass-card-3d dynamic-shadow glossy-highlight p-6 text-center cursor-pointer"
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                style={{ 
                  transformStyle: 'preserve-3d',
                  willChange: 'transform'
                }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl mb-4 border border-white/10 shadow-lg" style={{ transform: 'translateZ(20px)' }}>
                  <stat.icon className="w-8 h-8 text-blue-400" />
                </div>
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent mb-2" style={{ transform: 'translateZ(15px)' }}>
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-gray-300 font-medium" style={{ transform: 'translateZ(10px)' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Quick Category Filters with 3D effect */}
          <div className="staggered-enter stagger-6 mt-12 pt-8 border-t border-white/10">
            <p className="text-sm text-gray-400 mb-4">فئات سريعة:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {quickCategories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => {/* Handle category selection */}}
                  className="button-3d px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 hover:bg-white/10 hover:border-blue-500/50 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </ParallaxLayer>

      {/* Reflection Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-emerald-500/5 via-transparent to-transparent pointer-events-none"></div>
    </section>
  );
}