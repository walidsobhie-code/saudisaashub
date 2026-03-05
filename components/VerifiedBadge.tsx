'use client';

import React, { useState } from 'react';

interface VerifiedBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
}

export function VerifiedBadge({ size = 'md', showTooltip = true }: VerifiedBadgeProps) {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };

  const wrapperSizes = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-7 h-7',
  };

  return (
    <span
      className="relative inline-flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        className={`${wrapperSizes[size]} relative flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-400`}
      >
        <svg
          className={`${sizeClasses[size]} text-white`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </span>

      {showTooltip && (
        <span
          className={`
            absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5
            bg-elevated text-white text-xs rounded-lg shadow-lg
            whitespace-nowrap opacity-0 transition-opacity pointer-events-none
            ${isHovered ? 'opacity-100' : ''}
          `}
        >
          محتوى موثق
          <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-elevated" />
        </span>
      )}
    </span>
  );
}
