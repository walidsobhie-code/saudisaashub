import Link from 'next/link';

export default function GuidesPage() {
  const guides = [
    {
      slug: 'zatca-compliance-guide',
      title: 'ZATCA E-Invoicing Guide',
      description: 'Complete guide to Fatoora compliance for Saudi SaaS companies.',
      icon: '⚖️',
      color: 'text-accent-cyan',
    },
    {
      slug: 'raise-seed-saudi',
      title: 'How to Raise Seed Funding',
      description: 'Step-by-step guide to securing investment in Saudi Arabia.',
      icon: '💰',
      color: 'text-yellow-400',
    },
  ];

  return (
    <div className="min-h-screen bg-background py-24">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-4">Guides & Resources</h1>
        <p className="text-text-secondary text-lg mb-12">Practical guides to help you navigate compliance, funding, and growth.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link
            href="/zatca"
            className="group bg-card rounded-xl border border-white/5 p-8 hover:border-accent-green/30 transition-all"
          >
            <div className="text-4xl font-bold text-accent-cyan mb-4">📋</div>
            <h2 className="text-xl font-bold text-white mb-3 group-hover:text-accent-green transition-colors">
              ZATCA Compliance Hub
            </h2>
            <p className="text-text-secondary text-sm mb-4">
              Regulations, checklists, and solutions for e-invoicing compliance.
            </p>
            <div className="text-accent-green font-medium flex items-center gap-2">
              Visit Hub <span>→</span>
            </div>
          </Link>

          <Link
            href="/funding"
            className="group bg-card rounded-xl border border-white/5 p-8 hover:border-accent-green/30 transition-all"
          >
            <div className="text-4xl font-bold text-blue-400 mb-4">📈</div>
            <h2 className="text-xl font-bold text-white mb-3 group-hover:text-accent-green transition-colors">
              Funding Tracker
            </h2>
            <p className="text-text-secondary text-sm mb-4">
              Track investment rounds and funding activity across the ecosystem.
            </p>
            <div className="text-accent-green font-medium flex items-center gap-2">
              View Data <span>→</span>
            </div>
          </Link>

          {guides.map(guide => (
            <Link
              key={guide.slug}
              href={`/articles/${guide.slug}`}
              className="group bg-card rounded-xl border border-white/5 p-8 hover:border-accent-green/30 transition-all"
            >
              <div className={`text-4xl font-bold mb-4 ${guide.color}`}>{guide.icon}</div>
              <h2 className="text-xl font-bold text-white mb-3 group-hover:text-accent-green transition-colors">
                {guide.title}
              </h2>
              <p className="text-text-secondary text-sm mb-4">{guide.description}</p>
              <div className="text-accent-green font-medium flex items-center gap-2">
                Read Guide <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
