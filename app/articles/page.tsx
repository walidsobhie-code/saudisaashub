'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { getArticles, getAllCategories } from '@/lib/articles';
import { ArticleCard } from '@/components/ArticleCard';
import { SearchForm } from '@/components/SearchForm';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [allCategories, setAllCategories] = useState<string[]>([]);

  useEffect(() => {
    // Load articles data from generated module
    const loadedArticles = getArticles();
    setArticles(loadedArticles);
    setAllCategories(getAllCategories());

    // Parse URL params on mount
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category') || '';
    const q = params.get('q') || '';
    setSelectedCategory(category);
    setSearchQuery(q);
  }, []);

  const filteredArticles = useMemo(() => {
    let result = articles;

    if (selectedCategory) {
      result = result.filter((article) =>
        article.categories.some(
          (cat: string) =>
            cat.toLowerCase() === selectedCategory.toLowerCase() ||
            cat.includes(selectedCategory)
        )
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.excerpt.toLowerCase().includes(query)
      );
    }

    return result;
  }, [articles, selectedCategory, searchQuery]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const params = new URLSearchParams(window.location.search);
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    window.history.pushState({}, '', `/articles?${params.toString()}`);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const params = new URLSearchParams(window.location.search);
    if (query) {
      params.set('q', query);
    } else {
      params.delete('q');
    }
    window.history.pushState({}, '', `/articles?${params.toString()}`);
  };

  return (
    <>
      {/* Header */}
      <section className="py-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">المقالات</h1>
          <p className="text-text-secondary">
            اكتشف أحدث المقالات حول التقنية والأعمال في المملكة العربية السعودية
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 space-y-6">
          <SearchForm onSearch={handleSearch} initialValue={searchQuery} />

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleCategoryChange('')}
              className={`px-4 py-2 rounded-full transition-all ${
                !selectedCategory
                  ? 'gradient-bg text-white'
                  : 'bg-card border border-white/10 text-text-secondary hover:border-accent-pink/30'
              }`}
            >
              الكل
            </button>
            {allCategories.slice(0, 8).map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedCategory === category
                    ? 'gradient-bg text-white'
                    : 'bg-card border border-white/10 text-text-secondary hover:border-accent-pink/30'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <ArticleCard
                key={article.slug}
                title={article.title}
                excerpt={article.excerpt}
                slug={article.slug}
                date={article.date}
                categories={article.categories}
                readingTime={article.readingTime}
                image={article.image}
              />
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-card flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-text-muted"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">لا توجد مقالات</h3>
              <p className="text-text-secondary mb-6">
                لم يتم العثور على مقالات تطابق معايير البحث
              </p>
              <button
                onClick={() => {
                  handleCategoryChange('');
                  handleSearch('');
                }}
                className="inline-flex items-center gap-2 text-accent-pink hover:text-accent-cyan"
              >
                عرض جميع المقالات
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
