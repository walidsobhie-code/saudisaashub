'use client';

import React from 'react';

interface SkeletonCardProps {
  className?: string;
}

export function SkeletonCard({ className = '' }: SkeletonCardProps) {
  return (
    <div className={`bg-card rounded-xl border border-white/5 overflow-hidden flex flex-col ${className}`}>
      {/* Image skeleton */}
      <div className="h-48 bg-gray-800 animate-pulse relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
      </div>
      {/* Content skeleton */}
      <div className="p-5 flex flex-col flex-1 space-y-3">
        {/* Category badge */}
        <div className="h-5 w-16 bg-gray-800 rounded-full animate-pulse" />
        {/* Title */}
        <div className="h-6 bg-gray-800 rounded animate-pulse" />
        <div className="h-6 w-3/4 bg-gray-800 rounded animate-pulse" />
        {/* Excerpt */}
        <div className="space-y-2 flex-1">
          <div className="h-3 bg-gray-800 rounded animate-pulse" />
          <div className="h-3 bg-gray-800 rounded animate-pulse" />
          <div className="h-3 w-2/3 bg-gray-800 rounded animate-pulse" />
        </div>
        {/* Meta */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <div className="h-4 w-24 bg-gray-800 rounded animate-pulse" />
          <div className="h-4 w-16 bg-gray-800 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
