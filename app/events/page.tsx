import Link from 'next/link';
import { upcomingEvents } from '@/lib/upcoming-events';
import { format } from 'date-fns';
import { arSA, enUS } from 'date-fns/locale';

export default function EventsPage() {
  // Sort events by date
  const sortedEvents = [...upcomingEvents].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Get unique types and regions for filters
  const types = Array.from(new Set(sortedEvents.map(e => e.type)));
  const regions = Array.from(new Set(sortedEvents.map(e => e.region)));

  return (
    <div className="min-h-screen bg-background py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Upcoming Events</h1>
          <p className="text-text-secondary text-lg">
            Discover tech conferences, meetups, and workshops in Saudi Arabia and the Middle East.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-text-muted text-sm">Filter by:</span>
            <select className="px-4 py-2 rounded-lg bg-card border border-white/10 text-white text-sm">
              <option value="">All Types</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <select className="px-4 py-2 rounded-lg bg-card border border-white/10 text-white text-sm">
              <option value="">All Regions</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
          <Link
            href="/contact?type=event"
            className="px-4 py-2 rounded-lg bg-accent-green/10 text-accent-green text-sm font-medium hover:bg-accent-green/20 transition-colors"
          >
            + Submit Your Event
          </Link>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedEvents.map(event => (
            <Link
              key={event.slug}
              href={event.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-card rounded-xl border border-white/5 p-6 hover:border-accent-green/30 transition-all"
            >
              {/* Event Type Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  event.region === 'Saudi' 
                    ? 'bg-accent-green/10 text-accent-green' 
                    : 'bg-accent-cyan/10 text-accent-cyan'
                }`}>
                  {event.type}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs ${
                  event.region === 'Saudi'
                    ? 'bg-purple-400/10 text-purple-400'
                    : 'bg-blue-400/10 text-blue-400'
                }`}>
                  {event.region}
                </span>
              </div>

              {/* Event Name */}
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent-green transition-colors line-clamp-2">
                {event.name}
              </h3>

              {/* Date & Location */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-text-secondary text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{format(new Date(event.date), 'MMMM d, yyyy', { locale: enUS })}</span>
                </div>
                <div className="flex items-center gap-2 text-text-secondary text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{event.location}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
                {event.description}
              </p>

              {/* CTA */}
              <div className="flex items-center gap-2 text-accent-green font-medium text-sm">
                Visit Website
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* No events message */}
        {sortedEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-secondary">No upcoming events at the moment. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
