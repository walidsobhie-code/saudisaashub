// Featured Image Component with lazy loading and blur placeholder
'use client';

import { useState } from 'react';
import Image from 'next/image';

interface FeaturedImageProps {
  src: string;
  alt: string;
  caption?: string;
}

export function FeaturedImage({ src, alt, caption }: FeaturedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Generate a gradient placeholder based on the slug
  const placeholderGradient = 'linear-gradient(135deg, rgba(0,217,165,0.1) 0%, rgba(139,92,246,0.1) 100%)';

  return (
    <figure className="my-8">
      <div
        className="relative w-full aspect-video rounded-2xl overflow-hidden bg-card"
        style={{ background: placeholderGradient }}
      >
        {/* Placeholder */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-accent-green/30 border-t-accent-green rounded-full animate-spin" />
          </div>
        )}

        {/* Image - Optimized for CLS */}
        <img
          src={src}
          alt={alt}
          width={800}
          height={450}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
          decoding="async"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent pointer-events-none" />
      </div>

      {caption && (
        <figcaption className="mt-3 text-center text-text-muted text-sm">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// Generate a featured image URL based on article title/slug
export function getFeaturedImageUrl(slug: string, title: string): string {
  // Use a placeholder service for now
  // In production, you'd have actual featured images
  const encodedTitle = encodeURIComponent(title.slice(0, 50));
  return `https://source.unsplash.com/1200x675/?technology,business,saudi-arabia&text=${encodedTitle}`;
}
