// Comments Section using Giscus
'use client';

import { useState, useEffect } from 'react';

interface CommentsProps {
  articleSlug: string;
}

export function Comments({ articleSlug }: CommentsProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="mt-12 pt-8 border-t border-white/10">
        <h3 className="text-lg font-semibold mb-6">التعليقات</h3>
        <div className="animate-pulse space-y-4">
          <div className="h-32 bg-card rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 pt-8 border-t border-white/10">
      <h3 className="text-lg font-semibold mb-6">التعليقات</h3>
      <script
        src="https://giscus.app/client.js"
        data-repo="saudisaashub/saudisaashub.com"
        data-repo-id="R_kgDO..."
        data-category="Comments"
        data-category-id="DIC_kwDO..."
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="top"
        data-theme="dark"
        data-lang="ar"
        data-loading="lazy"
        crossOrigin="anonymous"
        async
      />
      <div
        className="giscus"
        data-theme="dark"
        data-lang="ar"
      />
    </div>
  );
}
