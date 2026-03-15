// Professional Author/Publisher Card Component
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface PublisherCardProps {
  compact?: boolean;
}

export function PublisherCard({ compact = false }: PublisherCardProps) {
  const [stats, setStats] = useState({ readers: 0, articles: 0, followers: 0 });
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        readers: 50,
        articles: 200,
        followers: 15
      });
      setAnimated(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const formatNumber = (num: number, suffix = 'K') => {
    if (num >= 1000) return (num / 1000).toFixed(1) + suffix;
    return num + '+';
  };

  if (compact) {
    return (
      <div className="p-4 rounded-xl bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] border border-white/10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img src="/logo.png" alt="Saudi SaaS Hub" className="w-10 h-10 rounded-lg object-contain bg-white" />
            {/* Green verified badge */}
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-accent-green rounded-full flex items-center justify-center border-2 border-[#0f0f1a]">
              <svg className="w-2 h-2 text-[#0f0f1a]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white text-sm">Saudi SaaS Hub</span>
            </div>
            <span className="text-xs text-text-muted">Tech & Business</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#16213e] border border-white/10 relative overflow-hidden">
      {/* Gradient border effect */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-green via-purple-500 to-accent-pink" />

      {/* Glow effect */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent-green/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Avatar & Name with Logo */}
        <div className="flex flex-col items-center text-center mb-4">
          <div className="relative mb-3">
            <img
              src="/logo.png"
              alt="Saudi SaaS Hub"
              className="w-16 h-16 rounded-xl object-contain bg-white border-2 border-accent-green/30"
            />
            {/* Green verified badge */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent-green rounded-full flex items-center justify-center border-2 border-[#0f0f1a]">
              <svg className="w-3 h-3 text-[#0f0f1a]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-1.5 mb-1">
            <span className="font-bold text-white text-lg">Saudi SaaS Hub</span>
          </div>

          <span className="text-xs px-3 py-1 rounded-full bg-accent-green/10 text-accent-green border border-accent-green/20">
            Tech & Business
          </span>
        </div>

        {/* Bio */}
        <p className="text-xs text-text-muted text-center mb-3 leading-relaxed pb-3 border-b border-accent-green/20">
          مصدرك الأول لأحدث أخبار التقنية والأعمال في المملكة العربية السعودية. نقدم محتوى عربي متخصص في ريادة الأعمال والتجارة الإلكترونية.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center">
            <div className="text-lg font-bold text-accent-green">
              {animated ? formatNumber(stats.readers) : '0'}
            </div>
            <div className="text-[10px] text-text-muted uppercase tracking-wider">Readers</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-accent-green">
              {animated ? formatNumber(stats.articles, '+') : '0'}
            </div>
            <div className="text-[10px] text-text-muted uppercase tracking-wider">Articles</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-accent-green">
              {animated ? formatNumber(stats.followers) : '0'}
            </div>
            <div className="text-[10px] text-text-muted uppercase tracking-wider">Followers</div>
          </div>
        </div>

        {/* Social Links */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          <a href="https://twitter.com/@SaudiSaaSHub" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-9 rounded-lg bg-white/5 border border-white/10 hover:bg-accent-green/20 hover:border-accent-green/30 transition-all">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a href="https://instagram.com/saudisaashub" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-9 rounded-lg bg-white/5 border border-white/10 hover:bg-accent-green/20 hover:border-accent-green/30 transition-all">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.979-6.98-1.281-.059-1.69.78-6-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a href="https://linkedin.com/company/saudisaashub" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-9 rounded-lg bg-white/5 border border-white/10 hover:bg-accent-green/20 hover:border-accent-green/30 transition-all">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a href="mailto:saudisaashub@outlook.com" className="flex items-center justify-center h-9 rounded-lg bg-white/5 border border-white/10 hover:bg-accent-green/20 hover:border-accent-green/30 transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>

        {/* Newsletter CTA */}
        <Link
          href="/contact?type=newsletter"
          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-accent-green/10 text-accent-green border border-accent-green/20 hover:bg-accent-green hover:text-[#0f0f1a] transition-all text-sm font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          النشرة الأسبوعية
        </Link>
      </div>
    </div>
  );
}
