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
  image?: string; // Optional featured image URL
}

export function ArticleCard({ title, excerpt, slug, date, categories, readingTime, image }: ArticleCardProps) {
  return (
    <article className="group bg-card rounded-xl border border-white/5 hover:border-accent-green/30 transition-all overflow-hidden flex flex-col">
      <Link href={`/articles/${slug}`} className="flex flex-col h-full">
        {/* Featured Image */}
        {image && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {/* Category Badge Overlay */}
            <div className="absolute top-3 right-3">
              <span className="text-xs px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white border border-white/10">
                {categories[0] || 'مقال'}
              </span>
            </div>
          </div>
        )}

        <div className="p-5 flex flex-col flex-1">
          {/* Title */}
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-accent-green transition-colors">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-text-secondary text-sm line-clamp-2 mb-4 flex-1">
            {excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between text-xs text-text-muted mt-auto">
            <span>SaudiSaaSHub</span>
            <span>{readingTime} دقيقة</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
