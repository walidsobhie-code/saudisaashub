import { Metadata } from 'next';
import { getAllCompaniesDB } from '@/lib/db-companies';
import FundingTrackerClient from './FundingTrackerClient';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Funding Tracker | Saudi SaaS Hub',
    description: 'Interactive funding tracker for Saudi SaaS companies. Filter by date, company, stage, and category.',
    keywords: 'SaaS funding Saudi Arabia, startup funding KSA, SaaS investments, Saudi tech funding',
    openGraph: {
      title: 'Funding Tracker',
      description: 'Track funding across Saudi SaaS companies',
      type: 'website',
      url: 'https://saudisaashub.pages.dev/tools/funding-tracker',
    },
    alternates: {
      canonical: 'https://saudisaashub.pages.dev/tools/funding-tracker',
    },
  };
}

export default async function FundingTrackerPage() {
  const companies = await getAllCompaniesDB();

  // Filter companies with funding data
  const fundedCompanies = companies.filter(c => c.funding_amount && c.funding_amount > 0);

  // Calculate totals
  const totalFunding = fundedCompanies.reduce((sum, c) => sum + (c.funding_amount || 0), 0);
  const avgFunding = fundedCompanies.length > 0 ? (totalFunding / fundedCompanies.length).toFixed(1) : 0;

  // Get unique categories and stages
  const categories = Array.from(new Set(fundedCompanies.flatMap(c => c.categories?.map(cat => cat.slug) || [])));
  const stages = Array.from(new Set(fundedCompanies.map(c => c.funding_stage).filter((s): s is string => s != null))) as string[];

  // Top companies by funding
  const topCompanies = [...fundedCompanies]
    .sort((a, b) => (b.funding_amount || 0) - (a.funding_amount || 0))
    .slice(0, 10);

  // Funding by category
  const categoryFunding: Record<string, number> = {};
  fundedCompanies.forEach(c => {
    c.categories?.forEach(cat => {
      const slug = cat.slug;
      categoryFunding[slug] = (categoryFunding[slug] || 0) + (c.funding_amount || 0);
    });
  });

  // Funding by stage
  const stageFunding: Record<string, number> = {};
  fundedCompanies.forEach(c => {
    const stage = c.funding_stage;
    if (stage) {
      stageFunding[stage] = (stageFunding[stage] || 0) + (c.funding_amount || 0);
    }
  });

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Funding Tracker</h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            تحليل تمويل شركات SaaS السعودية. تصفية وتصفّح البيانات.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-white/5 text-center">
            <div className="text-3xl font-bold text-accent-green mb-2">{fundedCompanies.length}</div>
            <div className="text-text-muted text-sm">شركة ممولة</div>
          </div>
          <div className="bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-white/5 text-center">
            <div className="text-3xl font-bold text-accent-cyan mb-2">${totalFunding.toFixed(0)}M</div>
            <div className="text-text-muted text-sm">إجمالي التمويل</div>
          </div>
          <div className="bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-white/5 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">${avgFunding}M</div>
            <div className="text-text-muted text-sm">متوسط التمويل</div>
          </div>
          <div className="bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-white/5 text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">{categories.length}</div>
            <div className="text-text-muted text-sm">فئة التمويل</div>
          </div>
        </div>

        {/* Client Component with Filters & Charts */}
        <FundingTrackerClient
          companies={fundedCompanies}
          categories={categories}
          stages={stages}
          topCompanies={topCompanies}
          categoryFunding={categoryFunding}
          stageFunding={stageFunding}
        />
      </div>
    </div>
  );
}
