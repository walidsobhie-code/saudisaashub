import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCompaniesByCategoryDB, getAllCategoriesDB } from '@/lib/db-companies';
import CompanyCard from '@/components/CompanyCard';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Category descriptions and SEO data
const categoryData: Record<string, { title: string; description: string; keywords: string[] }> = {
  fintech: {
    title: 'شركات FinTech السعودية | دليل القطاع المالي',
    description: 'اكتشف أفضل شركات التكنولوجيا المالية في السعودية. تشمل البنوك الرقمية، حلول الدفع، التمويل alternatives، والاستثمار.',
    keywords: ['FinTech السعودية', 'شركات مالية', 'تقنية مالية', 'البنوك الرقمية', 'حلول الدفع'],
  },
  healthtech: {
    title: 'شركات HealthTech السعودية | الرعاية الصحية التقنية',
    description: 'دليل شامل لشركات الصحة التقنية في المملكة. أنظمة المستشفيات، التطبيب عن بعد، الإلكتروني health records، والمراقبة.',
    keywords: ['HealthTech السعودية', 'الصحة التقنية', 'الطب الإلكتروني', 'مستشفيات ذكية', 'Rx tech'],
  },
  edtech: {
    title: 'شركات EdTech السعودية | التعليم التقني',
    description: 'استكشف شركات التكنولوجيا التعليمية في السعودية. منصات التعلم، إدارة التعلم، التدريب about, والاستشارات.',
    keywords: ['EdTech السعودية', 'التعليم التقني', 'منصات التعلم', 'e-learning', 'التدريب about'],
  },
};

export async function generateStaticParams() {
  const categories = await getAllCategoriesDB();
  // Only generate for our pillar categories
  const pillarSlugs = ['fintech', 'healthtech', 'edtech'];
  const pillarCategories = categories.filter(cat => pillarSlugs.includes(cat.slug));
  return pillarCategories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = categoryData[slug];

  if (!data) {
    return {
      title: 'التصنيف غير موجود',
    };
  }

  const siteUrl = 'https://saudisaashub.pages.dev';
  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords.join(', '),
    openGraph: {
      title: data.title,
      description: data.description,
      type: 'website',
      url: `${siteUrl}/category/${slug}`,
    },
    alternates: {
      canonical: `${siteUrl}/category/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const categoryInfo = categoryData[slug];

  if (!categoryInfo) {
    notFound();
  }

  const companies = await getCompaniesByCategoryDB(slug);

  // Calculate stats
  const totalCompanies = companies.length;
  const totalFunding = companies.reduce((sum, c) => sum + (c.funding_amount || 0), 0);
  const avgFunding = totalCompanies > 0 ? (totalFunding / totalCompanies).toFixed(1) : 0;
  const topCity = companies.reduce((acc, c) => {
    if (!c.city) return acc;
    acc[c.city] = (acc[c.city] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const topCityName = Object.keys(topCity).reduce((a, b) => topCity[a] > topCity[b] ? a : b, '');
  const avgFounded = companies.length > 0
    ? Math.round(companies.reduce((sum, c) => sum + (c.founded_year || 0), 0) / companies.length)
    : 0;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero */}
        <section className="text-center py-16 mb-12">
          <h1 className="text-5xl font-bold text-white mb-6">
            {(slug === 'fintech' && 'شركات FinTech السعودية') ||
             (slug === 'healthtech' && 'شركات HealthTech السعودية') ||
             (slug === 'edtech' && 'شركات EdTech السعودية') ||
             'الشركات'}
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            {categoryInfo.description}
          </p>
        </section>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-white/5 text-center">
            <div className="text-3xl font-bold text-accent-green mb-2">{totalCompanies}</div>
            <div className="text-text-muted text-sm">شركة</div>
          </div>
          <div className="bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-white/5 text-center">
            <div className="text-3xl font-bold text-accent-cyan mb-2">{avgFunding}M</div>
            <div className="text-text-muted text-sm">متوسط التمويل</div>
          </div>
          <div className="bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-white/5 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">{topCityName || 'N/A'}</div>
            <div className="text-text-muted text-sm">أبرز مدينة</div>
          </div>
          <div className="bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-white/5 text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">{avgFounded}</div>
            <div className="text-text-muted text-sm">متوسط سنة التأسيس</div>
          </div>
        </div>

        {/* Companies Grid */}
        {companies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
            {companies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        ) : (
          <div className="bg-card rounded-xl border border-white/5 p-12 text-center">
            <p className="text-text-muted text-lg">لا توجد شركات في هذا التصنيف حالياً</p>
          </div>
        )}
      </div>
    </div>
  );
}
