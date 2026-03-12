import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const socialLinks = [
  { name: 'X', url: 'https://x.com/SaudiSaaSHub', icon: 'X' },
  { name: 'Instagram', url: 'https://instagram.com/saudisaashub', icon: 'IG' },
  { name: 'LinkedIn', url: 'https://linkedin.com/company/saudisaashub', icon: 'IN' },
  { name: 'Facebook', url: 'https://facebook.com/profile.php?id=61586893616132', icon: 'FB' },
];

const quickLinks = [
  { name: 'الرئيسية', href: '/' },
  { name: 'المقالات', href: '/articles' },
  { name: 'عن المنصة', href: '/about' },
  { name: 'اتصل بنا', href: '/contact' },
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10">
                <Image
                  src="/logo.png"
                  alt="SaudiSaaSHub"
                  width={40}
                  height={40}
                  className="rounded-xl object-contain bg-white"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent-green rounded-full flex items-center justify-center border-2 border-card">
                  <svg className="w-2.5 h-2.5 text-background" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-white via-accent-green to-purple-400 bg-clip-text text-transparent">
                Saudi SaaS Hub
              </span>
            </Link>
            <p className="text-text-secondary text-sm mb-6">
              المصدرك الأول لأحدث أخبار التقنية والأعمال في المملكة العربية السعودية
            </p>
            <div className="flex items-center gap-2 mb-6">
              <Link
                href="/en"
                className="px-3 py-1.5 rounded-lg bg-card border border-white/10 text-sm text-text-secondary hover:text-white hover:border-accent-green/30 transition-all"
              >
                🇺🇸 English
              </Link>
            </div>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${social.name}`}
                  className="w-10 h-10 rounded-full bg-elevated flex items-center justify-center text-text-secondary hover:text-accent-green hover:bg-accent-green/10 transition-all text-xs font-bold focus:outline-none focus:ring-2 focus:ring-accent-green focus:ring-offset-2 focus:ring-offset-background"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-text-secondary hover:text-accent-green transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">الفئات</h3>
            <ul className="space-y-3 text-text-secondary text-sm">
              <li>SaaS</li>
              <li>Startup</li>
              <li>التسويق</li>
              <li>التقنية</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-text-muted text-sm">© 2026 SaudiSaaSHub. جميع الحقوق محفوظة.</p>
            <div className="flex items-center gap-2 text-text-muted text-sm">
              <div className="w-4 h-4 bg-accent-green rounded-full flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-background" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span>الرياض، المملكة العربية السعودية</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
