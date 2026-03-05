// Table of Contents Component
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Extract headings from article content
    const articleContent = document.querySelector('.article-content');
    if (!articleContent) return;

    const elements = articleContent.querySelectorAll('h2, h3');
    const items: TocItem[] = [];

    elements.forEach((el) => {
      const text = el.textContent || '';
      const level = parseInt(el.tagName.charAt(1));
      const id = text
        .toLowerCase()
        .replace(/[^\u0600-\u06FF\w\s]/g, '')
        .replace(/\s+/g, '-');

      el.id = id;
      items.push({ id, text, level });
    });

    setHeadings(items);

    // Intersection Observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -66%' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (headings.length < 2) return null;

  return (
    <>
      {/* Toggle Button (Mobile) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-40 w-12 h-12 rounded-full bg-accent-green text-background flex items-center justify-center shadow-lg"
        aria-label="Table of Contents"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </button>

      {/* TOC Sidebar */}
      <nav className={`
        fixed right-0 top-20 w-72 max-h-[calc(100vh-120px)] overflow-y-auto bg-card/80 backdrop-blur-xl border-r border-white/5 p-4 z-30
        transform transition-transform duration-300 lg:translate-x-0
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white">المحتويات</h3>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-text-muted">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <ul className="space-y-2">
          {headings.map((item) => (
            <li key={item.id}>
              <Link
                href={`#${item.id}`}
                className={`
                  block text-sm py-1.5 px-3 rounded-lg transition-all duration-200
                  ${item.level === 3 ? 'mr-4' : ''}
                  ${activeId === item.id
                    ? 'bg-accent-green/10 text-accent-green border-r-2 border-accent-green'
                    : 'text-text-secondary hover:text-white hover:bg-white/5'
                  }
                `}
                onClick={() => setIsOpen(false)}
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
