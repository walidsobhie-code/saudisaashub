import { Metadata } from 'next';
import { fundingRounds } from '@/lib/funding';
import ShareButtons from '@/components/ShareButtons/ShareButtons';

export const metadata: Metadata = {
  title: 'Saudi SaaS Funding Tracker | Saudi SaaS Hub',
  description: 'Track funding rounds, investments, and financial milestones of Saudi SaaS companies.',
  keywords: 'SaaS funding, Saudi Arabia, venture capital, investment rounds, startups',
  openGraph: {
    title: 'Saudi SaaS Funding Tracker',
    description: 'Track the latest funding rounds in the Saudi SaaS ecosystem',
    type: 'website',
    url: 'https://saudisaashub.pages.dev/funding',
  },
};

export default async function FundingPage() {
  const rounds = fundingRounds.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen bg-background">
      <section className="py-20 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-4">SaaS Funding Tracker</h1>
          <p className="text-xl text-text-secondary">
            Discover the latest investments and financial growth of Saudi SaaS companies
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="overflow-x-auto bg-card rounded-xl border border-white/5">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5 bg-white/5">
                  <th className="p-4 text-right text-text-muted text-sm font-medium">Company</th>
                  <th className="p-4 text-right text-text-muted text-sm font-medium">Round</th>
                  <th className="p-4 text-right text-text-muted text-sm font-medium">Amount</th>
                  <th className="p-4 text-right text-text-muted text-sm font-medium">Date</th>
                  <th className="p-4 text-right text-text-muted text-sm font-medium">Investors</th>
                </tr>
              </thead>
              <tbody>
                {rounds.map((round, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/5">
                    <td className="p-4">
                      <a href={`/companies/${round.companySlug}`} className="text-accent-green hover:underline font-medium">
                        {round.companyName}
                      </a>
                    </td>
                    <td className="p-4 text-white">{round.round}</td>
                    <td className="p-4 text-white font-bold">{round.amount}</td>
                    <td className="p-4 text-text-secondary">{round.date}</td>
                    <td className="p-4 text-text-secondary text-sm">
                      {round.investors?.join(', ') || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Social Sharing */}
      <ShareButtons />
    </div>
  );
}
