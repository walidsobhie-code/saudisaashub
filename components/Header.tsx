'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const navLinks = [
  { href: '/', label: 'الرئيسية' },
  { href: '/companies', label: 'شركات SaaS' },
  // Research is a mega-menu, not a simple link
  { href: '/events', label: 'الفعاليات' },
  { href: '/news', label: 'الأخبار' },
  { href: '/about', label: 'عن المنصة' },
  { href: '/methodology', label: 'المنهجية' },
];

const researchItems = {
  articles: [
    { href: '/articles/zatca-compliance-guide', label: 'ZATCA Compliance' },
    { href: '/articles/raise-seed-saudi', label: 'Raising Seed' },
    { href: '/articles/top-10-saudi-saas', label: 'Top 10 Companies' },
  ],
  reports: [
    { href: '/reports/state-of-saudi-saas-2026', label: 'State of SaaS 2026' },
    { href: '/reports', label: 'All Reports' },
  ],
  guides: [
    { href: '/zatca', label: 'ZATCA Hub' },
    { href: '/funding', label: 'Funding Tracker' },
  ],
  tools: [
    { href: '/search', label: 'Search' },
    { href: '/companies?comparison=true', label: 'Comparator' },
  ],
};

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [researchOpen, setResearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Scroll detection for transparent-to-solid effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-background/95 backdrop-blur-xl border-b border-white/10 shadow-lg'
        : 'bg-transparent border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              <Image
                src="/logo.png"
                alt="SaudiSaaSHub"
                width={40}
                height={40}
                className="rounded-xl object-contain bg-white border-2 border-transparent"
                priority
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent-green rounded-full flex items-center justify-center border-2 border-background">
                <svg className="w-2.5 h-2.5 text-background" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-white via-accent-green to-purple-400 bg-clip-text text-transparent">
              Saudi SaaS Hub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-accent-green'
                    : 'text-text-secondary hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Research Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => setResearchOpen(true)}
              onMouseLeave={() => setResearchOpen(false)}
            >
              <button
                className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                  pathname.startsWith('/articles') || pathname.startsWith('/reports') || pathname.startsWith('/zatca') || pathname.startsWith('/funding')
                    ? 'text-accent-green'
                    : 'text-text-secondary hover:text-white'
                }`}
              >
                Research
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Mega Menu */}
              {researchOpen && (
                <div className="absolute top-full left-0 mt-2 w-screen max-w-4xl bg-card border border-white/10 rounded-xl shadow-2xl p-6 grid grid-cols-4 gap-6 z-50">
                  <div>
                    <h4 className="text-accent-green font-semibold mb-3 text-sm uppercase tracking-wider">Articles</h4>
                    <ul className="space-y-2">
                      {researchItems.articles.map(item => (
                        <li key={item.href}>
                          <Link href={item.href} className="text-text-secondary hover:text-white text-sm transition-colors">
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-accent-green font-semibold mb-3 text-sm uppercase tracking-wider">Reports</h4>
                    <ul className="space-y-2">
                      {researchItems.reports.map(item => (
                        <li key={item.href}>
                          <Link href={item.href} className="text-text-secondary hover:text-white text-sm transition-colors">
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-accent-green font-semibold mb-3 text-sm uppercase tracking-wider">Guides</h4>
                    <ul className="space-y-2">
                      {researchItems.guides.map(item => (
                        <li key={item.href}>
                          <Link href={item.href} className="text-text-secondary hover:text-white text-sm transition-colors">
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-accent-green font-semibold mb-3 text-sm uppercase tracking-wider">Tools</h4>
                    <ul className="space-y-2">
                      {researchItems.tools.map(item => (
                        <li key={item.href}>
                          <Link href={item.href} className="text-text-secondary hover:text-white text-sm transition-colors">
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <Link
              href="/en"
              className="flex items-center px-3 py-1.5 rounded-lg bg-card border border-white/10 text-text-secondary hover:text-white hover:border-accent-green/30 transition-all text-sm"
            >
              🇺🇸 EN
            </Link>

            {/* Search Button */}
            <Link
              href="/search"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-white/10 text-text-secondary hover:text-white hover:border-accent-green/30 transition-all text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              بحث
            </Link>

            {/* CTA Button */}
            <Link
              href="/contact"
              className="hidden sm:flex items-center px-4 py-2 rounded-lg bg-accent-green text-background font-medium hover:bg-accent-green/90 transition-all text-sm"
            >
              أضف شركتك
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-text-secondary hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/5">
            <div className="space-y-2">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg ${
                    pathname === link.href
                      ? 'bg-accent-green/10 text-accent-green'
                      : 'text-text-secondary hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {/* Research in mobile */}
              <div className="px-4 py-2 font-medium text-white">Research</div>
              <div className="pr-4 space-y-1">
                {[
                  ...researchItems.articles,
                  ...researchItems.reports,
                  ...researchItems.guides,
                  ...researchItems.tools,
                ].map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-8 py-2 text-text-secondary hover:text-white text-sm"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
