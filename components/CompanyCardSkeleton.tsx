'use client';

import React from 'react';

export function CompanyCardSkeleton() {
  return (
    <div className="group bg-card rounded-xl border border-white/5 overflow-hidden animate-pulse">
      <div className="p-6">
        {/* Logo & Name skeleton */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent-green/10 to-purple-500/10 flex items-center justify-center flex-shrink-0">
            <div className="h-8 w-8 bg-gray-800 rounded" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="h-6 bg-gray-800 rounded w-3/4" />
            <div className="h-4 w-1/3 bg-gray-800 rounded" />
          </div>
        </div>

        {/* Description skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-3 bg-gray-800 rounded" />
          <div className="h-3 bg-gray-800 rounded" />
          <div className="h-3 w-2/3 bg-gray-800 rounded" />
        </div>

        {/* Meta Grid skeleton */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-2 rounded-lg bg-white/5">
            <div className="h-3 w-full bg-gray-800 rounded mb-1" />
            <div className="h-4 w-3/4 bg-gray-800 rounded" />
          </div>
          <div className="p-2 rounded-lg bg-white/5">
            <div className="h-3 w-full bg-gray-800 rounded mb-1" />
            <div className="h-4 w-2/3 bg-gray-800 rounded" />
          </div>
          <div className="p-2 rounded-lg bg-white/5 col-span-2">
            <div className="h-3 w-full bg-gray-800 rounded mb-1" />
            <div className="h-4 w-1/2 bg-gray-800 rounded" />
          </div>
        </div>

        {/* Key Products skeleton */}
        <div className="mb-4">
          <div className="flex gap-1.5">
            <div className="h-5 w-16 bg-gray-800 rounded-md" />
            <div className="h-5 w-20 bg-gray-800 rounded-md" />
            <div className="h-5 w-14 bg-gray-800 rounded-md" />
          </div>
        </div>

        {/* Actions skeleton */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <div className="h-4 w-24 bg-gray-800 rounded" />
          <div className="h-4 w-16 bg-gray-800 rounded" />
        </div>
      </div>
    </div>
  );
}
