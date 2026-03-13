import Link from 'next/link';
import { getAllNews, getBreakingNews, newsItems } from '@/lib/news';
import { format } from 'date-fns';

export default function NewsPage() {
  const allNews = getAllNews();
  const breakingNews = getBreakingNews();

  // Get unique categories for filter
  const categories = Array.from(new Set(newsItems.map(item => item.category)));

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
      </div>
    </div>
  );
}
