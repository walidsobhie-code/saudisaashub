'use client';

import { useEffect, useState } from 'react';
import { upcomingEvents, TechEvent } from '@/lib/upcoming-events';

export function UpcomingEvents() {
  const [events, setEvents] = useState<TechEvent[]>(upcomingEvents);

  useEffect(() => {
    // Sort events by date (upcoming first)
    const sorted = [...upcomingEvents].sort((a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    setEvents(sorted);
  }, []);

  // Check if event is upcoming or past
  const isUpcoming = (event: TechEvent) => {
    return new Date(event.date) >= new Date();
  };

  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-accent-green/5">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">الفعاليات القادمة</h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            لا تفوت أحدث الفعاليات التقنية في السعودية والشرق الأوسط - احجز مقعدك الآن
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.filter(event => isUpcoming(event)).slice(0, 4).map((event) => (
            <a
              key={event.slug}
              href={event.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-card rounded-xl border border-white/5 hover:border-accent-green/30 transition-all overflow-hidden"
            >
              {/* Card Image/Placeholder */}
              <div className="relative h-32 bg-gradient-to-br from-accent-green/20 to-purple-500/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent-green mb-1">
                    {new Date(event.date).getDate()}
                  </div>
                  <div className="text-sm text-white">
                    {new Date(event.date).toLocaleDateString('ar-SA', { month: 'short' })}
                  </div>
                </div>
                {/* Region Badge */}
                <div className="absolute top-2 left-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    event.region === 'Saudi'
                      ? 'bg-accent-green/20 text-accent-green'
                      : 'bg-purple-500/20 text-purple-400'
                  }`}>
                    {event.region === 'Saudi' ? '🇸🇦 السعودية' : '🌏 الشرق الأوسط'}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent-green transition-colors line-clamp-1">
                  {event.name}
                </h3>
                <p className="text-text-secondary text-sm mb-3 line-clamp-2">
                  {event.description}
                </p>
                <div className="flex items-center text-xs text-text-muted mb-4">
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {event.location}
                </div>
                {/* Registration CTA */}
                <div className="mt-4">
                  <span className="block w-full py-2 px-4 text-center text-sm font-semibold rounded-lg bg-accent-green text-background hover:shadow-glow-green transition-all">
                    احجز مقعدك الآن
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {events.filter(isUpcoming).length === 0 && (
          <div className="text-center py-12 text-text-secondary">
            لا توجد فعاليات قادمة في الوقت الحالي
          </div>
        )}

        {/* View All Link */}
        <div className="text-center mt-12">
          <a
            href="https://google.com/search?q=tech+events+saudi+arabia+2026"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent-green hover:text-white transition-colors"
          >
            عرض كل الفعاليات
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
