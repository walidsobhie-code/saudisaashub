import { Metadata } from 'next';
import CompaniesPageClient from './CompaniesPageClient';
import { getAllCompaniesDB, getAllCategoriesDB, getAllCertificationsDB, getUniqueEmployeeSizesDB } from '@/lib/db-companies';

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
  // Server-side data fetching from JSON
  const [initialCompanies, categories, certifications, employeeSizes] = await Promise.all([
    getAllCompaniesDB(),
    getAllCategoriesDB(),
    getAllCertificationsDB(),
    getUniqueEmployeeSizesDB(),
  ]);

  // Defensive: ensure arrays are not undefined
  const safeCategories = categories || [];
  const safeCertifications = certifications || [];
  const safeEmployeeSizes = employeeSizes || [];

  return (
    <CompaniesPageClient
      initialCompanies={initialCompanies}
      categories={safeCategories}
      certifications={safeCertifications}
      employeeSizes={safeEmployeeSizes}
    />
  );
}
