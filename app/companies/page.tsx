import { Metadata } from 'next';
import CompaniesPageClient from './CompaniesPageClient';
import { getAllCompaniesDB, getAllCategoriesDB, getAllCertificationsDB, getUniqueEmployeeSizesDB } from '@/lib/db-companies';

export const dynamic = 'force-dynamic';
export const dynamicParams = false;

export const metadata: Metadata = {
  title: 'دليل شركات SaaS السعودية | Saudi SaaS Hub',
  description: 'اكتشف أفضل شركات البرمجيات كخدمة في المملكة العربية السعودية. تصفح الأدلة الموثقة مع الفلاتر حسب التصنيف، الشهادات، الحجم، ونموذج التسعير.',
  keywords: 'SaaS السعودية, شركات برمجيات, تكنولوجيا, بدء أعمال, رقمنة, تقنية',
  openGraph: {
    title: 'دليل شركات SaaS السعودية - Saudi SaaS Hub',
    description: 'اكتشف أفضل شركات البرمجيات كخدمة في المملكة العربية السعودية',
    type: 'website',
    url: 'https://saudisaashub.pages.dev/companies',
  },
  alternates: {
    canonical: 'https://saudisaashub.pages.dev/companies',
  },
};

export default async function CompaniesPage() {
  // Server-side data fetching from database
  const [initialCompanies, categories, certifications, employeeSizes] = await Promise.all([
    getAllCompaniesDB(),
    getAllCategoriesDB(),
    getAllCertificationsDB(),
    getUniqueEmployeeSizesDB(),
  ]);

  return (
    <CompaniesPageClient
      initialCompanies={initialCompanies}
      categories={categories}
      certifications={certifications}
      employeeSizes={employeeSizes}
    />
  );
}
