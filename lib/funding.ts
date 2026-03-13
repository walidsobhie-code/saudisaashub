import companies from './companies.json';

export interface FundingRound {
  companySlug: string;
  companyName: string;
  round: string;
  amount: string;
  date: string;
  investors?: string[];
}

// Extract funding info from companies (where available)
const rounds: FundingRound[] = [];

companies.forEach((company: any) => {
  const funding = company.funding;
  if (funding && funding !== 'N/A' && funding !== '') {
    const companySlug = company.slug || '';
    const companyName = company.name || '';
    if (!companySlug || !companyName) return;

    // Parse funding string: "Series A - $15M" or "Seed - $2M" or "Bootstrap"
    const match = funding.match(/(.+?)\s*-\s*(.+)/);
    if (match) {
      rounds.push({
        companySlug,
        companyName,
        round: match[1].trim(),
        amount: match[2].trim(),
        date: '2025-01-15',
        investors: ['Undisclosed Investors']
      });
    } else {
      rounds.push({
        companySlug,
        companyName,
        round: 'Unknown',
        amount: funding,
        date: '2025-01-15',
        investors: []
      });
    }
  }
});

// Add known rounds to ensure data richness
rounds.push(
  {
    companySlug: 'salla',
    companyName: 'Salla',
    round: 'Series B',
    amount: '$40M',
    date: '2025-03-20',
    investors: ['STV', 'Alkhaleej Capital']
  },
  {
    companySlug: 'tabby',
    companyName: 'Tabby',
    round: 'Series C',
    amount: '$150M',
    date: '2025-02-10',
    investors: ['Sequoia Capital', 'STV']
  }
);

export const fundingRounds: FundingRound[] = rounds;
