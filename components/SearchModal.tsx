// Search Component
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface SearchResult {
  title: string;
  slug: string;
  excerpt: string;
}

export function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [articles, setArticles] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Load articles on mount
  useEffect(() => {
    const loadArticles = async () => {
      try {
        const res = await fetch('/data/search-index.json');
        const data = await res.json();
        setArticles(data);
      } catch (e) {
        console.error('Failed to load articles');
      }
    };
    loadArticles();
  }, []);

  // Open modal on Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Search logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchTerms = query.toLowerCase().split(' ');
    const filtered = articles.filter((article) => {
      const searchText = `${article.title} ${article.excerpt}`.toLowerCase();
      return searchTerms.every((term) => searchText.includes(term));
    });

    setResults(filtered.slice(0, 8));
  }, [query, articles]);

  const handleSelect = (slug: string) => {
    setIsOpen(false);
    setQuery('');
    router.push(`/articles/${slug}`);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
      onClick={() => setIsOpen(false)}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-2xl bg-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b border-white/10">
          <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث في المقالات..."
            className="flex-1 bg-transparent text-white placeholder-text-muted outline-none text-lg"
          />
          <kbd className="hidden sm:inline-flex px-2 py-1 text-xs text-text-muted bg-white/5 rounded border border-white/10">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {query && results.length === 0 && (
            <div className="p-8 text-center text-text-muted">
              لا توجد نتائج مطابقة
            </div>
          )}

          {results.map((result) => (
            <button
              key={result.slug}
              onClick={() => handleSelect(result.slug)}
              className="w-full p-4 text-right hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
            >
              <h4 className="font-medium text-white mb-1 line-clamp-1">{result.title}</h4>
              <p className="text-sm text-text-muted line-clamp-2">{result.excerpt}</p>
            </button>
          ))}

          {!query && (
            <div className="p-4">
              <p className="text-sm text-text-muted mb-2">热门文章</p>
              <p className="text-xs text-text-muted">اضغط Ctrl+K للبحث</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-white/10 flex items-center justify-between text-xs text-text-muted">
          <span>اضغط Enter للاختيار</span>
          <div className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 bg-white/5 rounded">↑</kbd>
            <kbd className="px-1.5 py-0.5 bg-white/5 rounded">↓</kbd>
            <span>للتنقل</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Search Button for Header
export function SearchButton() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <button
        onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-white/10 text-text-secondary hover:text-white hover:border-accent-green/30 transition-all text-sm"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="hidden sm:inline">بحث</span>
        <kbd className="hidden lg:inline-flex px-1.5 py-0.5 text-xs bg-white/5 rounded border border-white/10">
          ⌘K
        </kbd>
      </button>
    </>
  );
}
