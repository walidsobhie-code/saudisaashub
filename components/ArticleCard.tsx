'use client';

import React from 'react';
import Link from 'next/link';

interface ArticleCardProps {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  categories: string[];
  readingTime: number;
}

export function ArticleCard({ title, excerpt, slug, date, categories, readingTime }: ArticleCardProps) {
  return (
    <article className="group bg-card rounded-xl border border-white/5 hover:border-accent-green/30 transition-all overflow-hidden">
      <Link href={`/articles/${slug}`}>
        <div className="p-5">
          {/* Category */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs px-2 py-1 rounded-full bg-accent-green/10 text-accent-green border border-accent-green/20">
              {categories[0] || 'مقال'}
            </span>
            <span className="text-text-muted text-xs">•</span>
            <span className="text-text-muted text-xs">{readingTime} دقيقة</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-accent-green transition-colors">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-text-secondary text-sm line-clamp-2 mb-4">
            {excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span>SaudiSaaSHub</span>
            <span>مؤخراً</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
