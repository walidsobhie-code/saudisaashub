'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const navLinks = [
  { href: '/', label: 'الرئيسية' },
  { href: '/companies', label: 'شركات SaaS' },
  { href: '/search', label: 'بحث' },
  { href: '/articles', label: 'المقالات' },
  { href: '/about', label: 'عن المنصة' },
  { href: '/contact', label: 'اتصل بنا' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo with Verified Badge - Professional Style */}
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
              {/* Green verified badge */}
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

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6">
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

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-text-secondary hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-white/5">
          <nav className="flex flex-col px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`py-2 px-4 rounded-lg transition-colors ${
                  pathname === link.href
                    ? 'bg-accent-green/10 text-accent-green'
                    : 'text-text-secondary hover:text-white hover:bg-white/5'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
