'use client';

import Link from 'next/link';
import { getAllNews, getBreakingNews, newsItems } from '@/lib/news';
import { format } from 'date-fns';

export default function NewsPage() {
  const allNews = getAllNews();
  const breakingNews = getBreakingNews();

  // Get unique categories for filter
  const categories = Array.from(new Set(newsItems.map(item => item.category)));

  const shareTitle = 'Saudi SaaS Hub - News & Updates';
  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://saudisaashub.pages.dev/news';

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">News & Updates</h1>
          <p className="text-text-secondary text-lg">
            Breaking news, funding announcements, and analysis from the Saudi SaaS ecosystem.
          </p>
        </div>

        {/* Breaking News Section */}
        {breakingNews.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <h2 className="text-lg font-semibold text-red-400">Breaking News</h2>
            </div>
            <div className="space-y-4">
              {breakingNews.map(item => (
                <div key={item.id} className="bg-gradient-to-r from-red-900/20 to-transparent border-l-4 border-red-500 p-6 rounded-r-lg">
                  <Link href={`/news/${item.slug}`} className="block group">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent-green transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-text-secondary text-sm mb-2">
                      {format(new Date(item.publish_date), 'MMMM d, yyyy')} • {item.author}
                    </p>
                    <p className="text-text-secondary">{item.summary}</p>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-text-muted text-sm">Filter:</span>
            <select className="px-4 py-2 rounded-lg bg-card border border-white/10 text-white text-sm">
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <Link
            href="/rss.xml"
            className="px-4 py-2 rounded-lg bg-card/50 border border-white/10 text-white text-sm hover:border-accent-green transition-colors"
          >
            RSS Feed
          </Link>
        </div>

        {/* News Grid */}
        <div className="space-y-6">
          {allNews.map(item => (
            <article key={item.id} className="bg-card rounded-xl border border-white/5 p-6 hover:border-accent-green/30 transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  {/* Category Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-accent-green/10 text-accent-green text-xs font-semibold rounded uppercase">
                      {item.category.replace('-', ' ')}
                    </span>
                    {item.is_breaking && (
                      <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-semibold rounded uppercase">
                        Breaking
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <Link href={`/news/${item.slug}`} className="block group mb-2">
                    <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-accent-green transition-colors">
                      {item.title}
                    </h2>
                  </Link>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-text-muted mb-3">
                    <span>{format(new Date(item.publish_date), 'MMMM d, yyyy')}</span>
                    <span>•</span>
                    <span>{item.author}</span>
                  </div>

                  {/* Summary */}
                  <p className="text-text-secondary leading-relaxed mb-4">
                    {item.summary}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-white/5 text-text-muted text-xs rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* No News */}
        {allNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-secondary">No news items published yet.</p>
          </div>
        )}

        {/* Social Share Section */}
        <div className="mt-16 py-8 border-t border-white/10">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-2">شارك الأخبار</h3>
              <p className="text-text-secondary text-sm">انشر آخر أخبار SaaS في المملكة العربية السعودية</p>
            </div>
            <div className="flex justify-center gap-3 flex-wrap">
              {/* Twitter/X */}
              <button
                onClick={() => {
                  const url = encodeURIComponent(shareUrl);
                  const text = encodeURIComponent(shareTitle);
                  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'width=600,height=400,noopener,noreferrer');
                }}
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-[#1da1f2] hover:bg-[#1a8cd8] transition-all shadow-lg hover:shadow-[#1da1f2]/25"
                aria-label="شارك على X (تويتر)"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </button>

              {/* LinkedIn */}
              <button
                onClick={() => {
                  const url = encodeURIComponent(shareUrl);
                  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=400,noopener,noreferrer');
                }}
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-[#0077b5] hover:bg-[#006399] transition-all shadow-lg hover:shadow-[#0077b5]/25"
                aria-label="شارك على LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </button>

              {/* WhatsApp */}
              <button
                onClick={() => {
                  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`, '_blank', 'width=600,height=400,noopener,noreferrer');
                }}
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-[#25d366] hover:bg-[#20ba5a] transition-all shadow-lg hover:shadow-[#25d366]/25"
                aria-label="شارك على WhatsApp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </button>

              {/* Telegram */}
              <button
                onClick={() => {
                  window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`, '_blank', 'width=600,height=400,noopener,noreferrer');
                }}
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-[#0088cc] hover:bg-[#0077aa] transition-all shadow-lg hover:shadow-[#0088cc]/25"
                aria-label="شارك على Telegram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </button>

              {/* Copy Link */}
              <button
                onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
                  try {
                    await navigator.clipboard.writeText(shareUrl);
                    const btn = e.currentTarget;
                    const originalContent = btn.innerHTML;
                    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13l4 4L19 7"/></svg>`;
                    btn.classList.add('bg-accent-green', 'text-background');
                    setTimeout(() => {
                      btn.innerHTML = originalContent;
                      btn.classList.remove('bg-accent-green', 'text-background');
                    }, 2000);
                  } catch (err) {
                    console.error('Failed to copy:', err);
                    alert('فشل نسخ الرابط. يرجى المحاولة مرة أخرى.');
                  }
                }}
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-gray-300 hover:bg-white/20 hover:border-accent-green/50 hover:text-white transition-all shadow-sm"
                aria-label="نسخ الرابط"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
