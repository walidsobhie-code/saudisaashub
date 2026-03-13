import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CompanyProfileClient from './CompanyProfileClient';
import { getCompanyBySlugDB, getAllCompaniesDB } from '@/lib/db-companies';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const company = await getCompanyBySlugDB(slug);

  if (!company) {
    return {
      title: 'الشركة غير موجودة | Saudi SaaS Hub',
    };
  }

  const siteUrl = 'https://saudisaashub.pages.dev';
  const ogImage = company.logo_url || `${siteUrl}/logo-og.png`;

  return {
    title: `${company.name} - دليل شركات SaaS السعودية`,
    description: company.description?.substring(0, 160) || `تعرف على ${company.name} - ${company.headquarters || ''}`,
    keywords: [
      company.name,
      'SaaS السعودية',
      'شركات برمجيات',
      company.headquarters || '',
    ].filter(Boolean).join(', '),
    openGraph: {
      title: company.name,
      description: company.description?.substring(0, 160) || company.name,
      type: 'website',
      url: `${siteUrl}/companies/${slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: company.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: company.name,
      description: company.description?.substring(0, 160) || company.name,
      images: [ogImage],
    },
    alternates: {
      canonical: `${siteUrl}/companies/${slug}`,
    },
  };
}

export default async function CompanyProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const company = await getCompanyBySlugDB(slug);

  if (!company) {
    notFound();
  }

  // Get all companies for comparison
  const allCompanies = await getAllCompaniesDB();

  return (
    <CompanyProfileClient
      company={company}
      allCompanies={allCompanies}
    />
  );
}
