'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) {
      params.set('q', query.trim());
    }
    if (searchParams.get('category')) {
      params.set('category', searchParams.get('category')!);
    }
    router.push(`/articles${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث في المقالات..."
          className="w-full px-4 py-3 pr-12 rounded-xl bg-card border border-white/10 text-white placeholder:text-text-muted focus:border-accent-pink focus:outline-none"
        />
        <button
          type="submit"
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 text-text-secondary hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
      {query && (
        <button
          type="button"
          onClick={() => {
            setQuery('');
            const params = new URLSearchParams();
            if (searchParams.get('category')) {
              params.set('category', searchParams.get('category')!);
            }
            router.push(`/articles${params.toString() ? `?${params.toString()}` : ''}`);
          }}
          className="absolute left-14 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </form>
  );
}
