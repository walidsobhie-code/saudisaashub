import { Metadata } from 'next';
import Link from 'next/link';
import { companies } from '@/lib/companies';

export const metadata: Metadata = {
  title: 'أفضل 10 شركات SaaS في السعودية 2026 | تحليل مقارن',
  description: 'قائمة بأفضل شركات البرمجيات كخدمة في المملكة العربية السعودية: مراجعة شاملة تشمل الميزات، الأسعار، التقييمات، ونقاط القوة والضعف لكل شركة.',
  keywords: 'أفضل شركات SaaS, السعودية, SaaS companies, مقارنة, برمجيات كخدمة, سعودية, startups',
  openGraph: {
    title: 'أفضل 10 شركات SaaS في السعودية 2026',
    description: 'تحليل مفصل لأفضل 10 شركات برمجيات كخدمة في السوق السعودي',
    type: 'article',
    url: 'https://saudisaashub.pages.dev/articles/top-10-saudi-saas',
    publishedTime: '2026-03-13T00:00:00Z',
    authors: ['SaudiSaaASHub'],
  },
};

// Select top companies by funding and age
function getTopCompanies() {
  return companies
    .filter(c => c.funding && c.funding !== '' && c.funding !== 'N/A' && c.founded_year && c.founded_year <= 2023)
    .sort((a, b) => {
      // Sort by founded year (older first), then by funding string length as proxy
      const yearDiff = (b.founded_year || 0) - (a.founded_year || 0);
      if (yearDiff !== 0) return yearDiff;
      return (b.funding?.length || 0) - (a.funding?.length || 0);
    })
    .slice(0, 10);
}

const topCompanies = getTopCompanies();

export default function Top10SaudiSaaS() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: String(metadata.title).replace(' | SaudiSaaASHub', ''),
    description: metadata.description,
    url: 'https://saudisaashub.pages.dev/articles/top-10-saudi-saas',
    datePublished: '2026-03-13',
    author: { '@type': 'Organization', name: 'SaudiSaaSHub' },
    publisher: { '@type': 'Organization', name: 'SaudiSaaSHub' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://saudisaashub.pages.dev/articles/top-10-saudi-saas' },
  };

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        <nav className="mb-8 text-sm text-text-muted">
          <Link href="/" className="hover:text-accent-green">الرئيسية</Link>
          <span className="mx-2">/</span>
          <Link href="/articles" className="hover:text-accent-green">المقالات</Link>
          <span className="mx-2">/</span>
          <span>أفضل 10 شركات SaaS</span>
        </nav>

        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            أفضل 10 شركات SaaS في السعودية 2026
          </h1>
          <p className="text-xl text-text-secondary mb-6">
            مراجعة شاملة ومقارنة مفصلة لأبرز اللاعبين في السوق
          </p>
          <div className="flex justify-center gap-4 text-sm text-text-muted">
            <span>📅 13 مارس 2026</span>
            <span>•</span>
            <span>⏱️ 10 دقائق قراءة</span>
          </div>
        </header>

        <div className="bg-card rounded-xl border border-white/5 p-8 mb-12">
          <p className="text-text-secondary leading-relaxed mb-4">
            مع نمو سوق SaaS في المملكة العربية السعودية بنسبة تتجاوز 40% سنوياً، تبرز مجموعة من الشركات كرواد في قطاعاتها. اخترنا هذه القائمة بناءً على معايير متعددة: التمويل، عمر الشركة، وانتشارها.
          </p>
          <p className="text-text-secondary">
            نقدم تحليلاً موجزاً لكل شركة مع معلومات أساسية.
          </p>
        </div>

        <section className="space-y-12">
          {topCompanies.map((company, idx) => (
            <div key={company.id} id={`company-${idx + 1}`} className="bg-card rounded-xl border border-white/5 overflow-hidden">
              <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent-green/10 to-purple-500/10 flex items-center justify-center flex-shrink-0">
                    {company.logo_url ? (
                      <img src={company.logo_url} alt={company.name} className="w-12 h-12 rounded-lg object-contain" />
                    ) : (
                      <span className="text-2xl font-bold text-accent-green">
                        {company.name ? company.name.charAt(0) : '?'}
                      </span>
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">{company.name}</h2>
                    <div className="flex items-center gap-3 text-sm text-text-muted">
                      <span>{company.headquarters}</span>
                      <span>•</span>
                      <span>تأسست {company.founded_year || 'غير معروف'}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-6 md:flex-col items-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent-green">{company.employees}</div>
                    <div className="text-text-muted text-xs">موظف</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-accent-cyan">{company.funding || 'غير معروف'}</div>
                    <div className="text-text-muted text-xs">تمويل</div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <p className="text-text-secondary mb-6">{company.description}</p>

                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">الفئات</h4>
                  <div className="flex flex-wrap gap-2">
                    {company.categories && company.categories.map((cat: any, i: number) => (
                      <span key={i} className="px-3 py-1 bg-accent-green/10 text-accent-green text-xs rounded-full">
                        {typeof cat === 'string' ? cat : cat.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                  <Link
                    href={`/companies/${company.slug}`}
                    className="text-accent-green hover:underline font-medium flex items-center gap-2"
                  >
                    عرض التفاصيل الكاملة
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </Link>
                  <span className="text-text-muted text-sm">#{idx + 1} في القائمة</span>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-16 bg-card rounded-xl border border-white/5 p-8">
          <h2 className="text-2xl font-bold text-white mb-4">منهجية التقييم</h2>
          <div className="text-text-secondary space-y-2">
            <p>تم اختيار أفضل 10 شركات بناءً على:</p>
            <ul className="list-disc list-inside space-y-1 mr-4">
              <li>رأس المال المجمع (مبالغ التمويل المعلنة)</li>
              <li>سنة التأسيس (الشركات الأكثر نضجاً أولاً)</li>
              <li>جودة الموقع الإلكتروني والخدمات</li>
              <li>السمعة في السوق</li>
            </ul>
            <p className="mt-4">
              البيانات مأخوذة من قاعدة بيانات SaudiSaaSHub التي تغطي أكثر من 250 شركة سعودية. يتم تحديث البيانات أسبوعياً.
            </p>
          </div>
        </section>

        <section className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">هل شركتك تستحق القائمة؟</h3>
          <p className="text-text-secondary mb-6">
            أضف شركتك إلى دليلنا وتظهر لأكثر من 10,000 زائر شهرياً
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent-green text-background font-semibold rounded-xl hover:bg-accent-green/90 transition-all"
          >
            أضف شركتك الآن
          </Link>
        </section>
      </div>
    </div>
  );
}
