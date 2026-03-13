'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface SearchResult {
  title: string;
  url: string;
  content: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(true);
      fetch('/data/search-index.json')
        .then(res => res.json())
        .then((entries: any[]) => {
          const q = query.toLowerCase();
          const filtered = entries
            .filter(entry => 
              entry.title.toLowerCase().includes(q) ||
              entry.content.toLowerCase().includes(q)
            )
            .slice(0, 20);
          setResults(filtered);
          setLoading(false);
        })
        .catch(() => {
          setResults([]);
          setLoading(false);
        });
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Search</h1>
        
        {/* Search Input */}
        <div className="relative mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search companies, articles..."
            className="w-full px-6 py-4 rounded-xl bg-card border border-white/10 text-white text-lg focus:border-accent-green focus:outline-none"
          />
          {loading && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <div className="w-6 h-6 border-2 border-accent-green border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="space-y-4">
          {results.map((result, idx) => (
            <a
              key={idx}
              href={result.url}
              className="block bg-card rounded-xl border border-white/5 p-6 hover:border-accent-green/30 transition-all"
            >
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent-green">
                {result.title}
              </h3>
              <p className="text-text-secondary line-clamp-2">
                {result.content}
              </p>
            </a>
          ))}
        </div>

        {query && !loading && results.length === 0 && (
          <div className="text-center py-12 text-text-muted">
            No results found for "{query}"
          </div>
        )}

        {!query && (
          <div className="text-center py-12 text-text-muted">
            Start typing to search
          </div>
        )}
      </div>
    </div>
  );
}
