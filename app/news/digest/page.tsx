import Link from 'next/link';
import { getAllDigests } from '@/lib/digest';
import { format } from 'date-fns';

export default function DigestPage() {
  const digests = getAllDigests();

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">This Week in Saudi SaaS</h1>
          <p className="text-text-secondary text-lg">
            Weekly digest of funding rounds, regulation updates, and ecosystem news.
          </p>
        </div>

        {/* Subscribe CTA */}
        <div className="bg-card rounded-xl border border-white/5 p-6 mb-12 text-center">
          <h2 className="text-xl font-bold text-white mb-2">Never Miss an Update</h2>
          <p className="text-text-secondary mb-4">
            Get the weekly digest delivered to your inbox every Monday morning.
          </p>
          <Link
            href="/contact?type=newsletter"
            className="inline-block px-6 py-3 bg-accent-green text-background font-semibold rounded-lg hover:bg-accent-green/90 transition-all"
          >
            Subscribe Now
          </Link>
        </div>

        {/* Digest List */}
        <div className="space-y-6">
          {digests.map(digest => (
            <div key={digest.id} className="bg-card rounded-xl border border-white/5 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">
                    Week of {format(new Date(digest.week_of), 'MMMM d, yyyy')}
                  </h2>
                  <p className="text-text-muted text-sm">
                    Published {format(new Date(digest.publish_date), 'MMMM d, yyyy')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`/api/digest/${digest.id}?format=html`}
                    target="_blank"
                    className="px-4 py-2 bg-accent-green/10 text-accent-green text-sm rounded-lg hover:bg-accent-green/20 transition-colors"
                  >
                    View HTML
                  </a>
                  <a
                    href={`/api/digest/${digest.id}?format=txt`}
                    target="_blank"
                    className="px-4 py-2 bg-card border border-white/20 text-white text-sm rounded-lg hover:border-accent-green transition-colors"
                  >
                    Download TXT
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {digest.top_funding_rounds.length > 0 && (
                  <div>
                    <h3 className="text-accent-green font-semibold mb-2 flex items-center gap-2">
                      <span>💰</span> Top Funding Rounds
                    </h3>
                    <ul className="space-y-2">
                      {digest.top_funding_rounds.map((round, idx) => (
                        <li key={idx} className="text-text-secondary text-sm">
                          <Link href={round.link} className="hover:text-accent-green transition-colors">
                            {round.title}
                          </Link>
                          <span className="text-accent-cyan"> • {round.amount}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {digest.regulation_updates.length > 0 && (
                  <div>
                    <h3 className="text-accent-green font-semibold mb-2 flex items-center gap-2">
                      <span>⚖️</span> Regulation Updates
                    </h3>
                    <ul className="space-y-2">
                      {digest.regulation_updates.map((update, idx) => (
                        <li key={idx} className="text-text-secondary text-sm">
                          <Link href={update.link} className="hover:text-accent-green transition-colors">
                            {update.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* No Digests */}
        {digests.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-secondary">No digests published yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
