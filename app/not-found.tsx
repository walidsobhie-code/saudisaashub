'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SearchModal } from '@/components/SearchModal';

export default function NotFound() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <SearchModal />
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        {/* 404 Number */}
        <h1 className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-br from-accent-green to-purple-500 mb-6">
          404
        </h1>

        {/* Message */}
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          عذراً، الصفحة غير موجودة
        </h2>
        <p className="text-text-secondary text-lg max-w-md mb-10">
          الصفحة التي تبحث عنها قد تم حذفها أو تغيير رابطها أو قد تكون غير موجودة.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <button
            onClick={() => setSearchOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-accent-green text-background font-bold hover:shadow-glow-green transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            بحث في المقالات
          </button>
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-card border border-white/10 text-white font-semibold hover:border-accent-green/30 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            الصفحة الرئيسية
          </Link>
        </div>

        {/* Popular Links */}
        <div className="mt-12 pt-8 border-t border-white/10 w-full max-w-2xl">
          <p className="text-text-secondary text-sm mb-4">روابط سريعة:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/articles" className="px-4 py-2 rounded-full bg-card/50 border border-white/5 text-text-secondary hover:text-white hover:border-accent-green/30 transition-all text-sm">
              المقالات
            </Link>
            <Link href="/about" className="px-4 py-2 rounded-full bg-card/50 border border-white/5 text-text-secondary hover:text-white hover:border-accent-green/30 transition-all text-sm">
              عن المنصة
            </Link>
            <Link href="/contact" className="px-4 py-2 rounded-full bg-card/50 border border-white/5 text-text-secondary hover:text-white hover:border-accent-green/30 transition-all text-sm">
              اتصل بنا
            </Link>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
          onClick={() => setSearchOpen(false)}>
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          <div className="relative w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute left-4 top-4 text-text-secondary hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* SearchModal component inline */}
            <div className="bg-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex items-center gap-3 p-4 border-b border-white/10">
                <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  autoFocus
                  placeholder="ابحث في المقالات..."
                  className="flex-1 bg-transparent text-white placeholder:text-text-muted outline-none text-lg"
                  id="not-found-search"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
