'use client';

import React from 'react';

export function VerifiedContentBadge() {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-r from-card to-card/50 border border-white/10">
      <div className="flex items-start gap-4">
        {/* Icon - Star instead of checkmark */}
        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>

        {/* Content */}
        <div>
          <h3 className="text-lg font-bold text-white mb-2">
            محتوى موثق
          </h3>
          <p className="text-text-secondary text-sm">
            هذا المحتوى موثق من قبل SaudiSaaSHub، نضمن دقة المعلومات وموثوقيتها
          </p>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs text-text-muted">
              Powered by
            </span>
            <span className="text-sm font-medium text-white">
              SaudiSaaSHub
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
