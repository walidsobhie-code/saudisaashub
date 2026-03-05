'use client';

import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm">
        <li>
          <Link 
            href="/" 
            className="text-text-muted hover:text-accent-green transition-colors"
          >
            الرئيسية
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <span className="text-text-muted">/</span>
            {item.href ? (
              <Link 
                href={item.href} 
                className="text-text-muted hover:text-accent-green transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-white" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
