'use client';

import React from 'react';

export function EventCardSkeleton() {
  return (
    <div className="group block bg-card rounded-xl border border-white/5 overflow-hidden animate-pulse">
      {/* Card Image/Placeholder */}
      <div className="relative h-32 bg-gray-800">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-green/20 to-purple-500/20">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
        </div>
        {/* Region Badge skeleton */}
        <div className="absolute top-2 left-2">
          <div className="h-5 w-20 bg-gray-700 rounded-full" />
        </div>
        {/* Date skeleton */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="h-8 w-8 bg-gray-700 rounded mx-auto mb-1" />
            <div className="h-3 w-12 bg-gray-700 rounded mx-auto" />
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 space-y-3">
        {/* Title skeleton */}
        <div className="h-6 bg-gray-800 rounded w-3/4" />
        <div className="h-4 w-1/2 bg-gray-800 rounded" />
        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-800 rounded" />
          <div className="h-3 bg-gray-800 rounded w-5/6" />
        </div>
        {/* Location skeleton */}
        <div className="flex items-center gap-2 mt-3">
          <div className="h-4 w-4 bg-gray-800 rounded" />
          <div className="h-3 w-32 bg-gray-800 rounded" />
        </div>
        {/* CTA skeleton */}
        <div className="mt-4">
          <div className="h-9 w-full bg-gray-800 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
