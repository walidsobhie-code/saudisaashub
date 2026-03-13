'use client';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`animate-pulse bg-gray-700/50 rounded ${className}`} />;
}

export function ArticleCardSkeleton() {
  return (
    <article className="bg-card rounded-xl border border-white/5 overflow-hidden flex flex-col">
      {/* Image skeleton */}
      <div className="h-48 bg-gray-700/50 animate-pulse" />
      
      {/* Content skeleton */}
      <div className="p-5 flex flex-col flex-1 space-y-3">
        {/* Categories */}
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
        </div>
        
        {/* Title */}
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
        
        {/* Excerpt */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        
        {/* Footer */}
        <div className="mt-auto pt-4 flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </article>
  );
}

export function CompanyCardSkeleton() {
  return (
    <div className="bg-card rounded-xl border border-white/5 p-5 space-y-4">
      {/* Logo + name */}
      <div className="flex items-start gap-4">
        <Skeleton className="h-16 w-16 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      
      {/* Description */}
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      
      {/* Meta grid */}
      <div className="grid grid-cols-2 gap-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
      
      {/* Actions */}
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-20" />
      </div>
    </div>
  );
}
