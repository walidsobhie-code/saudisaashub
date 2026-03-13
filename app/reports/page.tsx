import Link from 'next/link';

export default function ReportsPage() {
  const reports = [
    {
      slug: 'state-of-saudi-saas-2026',
      title: 'State of Saudi SaaS 2026',
      description: 'Comprehensive market analysis covering 252 companies, funding trends, and ZATCA impact.',
      date: '2026-03-13',
    },
  ];

  return (
    <div className="min-h-screen bg-background py-24">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-4">Reports & Research</h1>
        <p className="text-text-secondary text-lg mb-12">In-depth analysis of the Saudi SaaS market.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reports.map(report => (
            <Link
              key={report.slug}
              href={`/reports/${report.slug}`}
              className="group bg-card rounded-xl border border-white/5 p-8 hover:border-accent-green/30 transition-all"
            >
              <div className="text-4xl font-bold text-yellow-400 mb-4">📈</div>
              <h2 className="text-xl font-bold text-white mb-3 group-hover:text-accent-green transition-colors">
                {report.title}
              </h2>
              <p className="text-text-secondary text-sm mb-4">{report.description}</p>
              <div className="text-accent-green font-medium flex items-center gap-2">
                Read Report <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
