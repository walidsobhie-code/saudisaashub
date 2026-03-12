import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SearchModal } from '@/components/SearchModal';

const SITE_URL = 'https://saudisaashub.pages.dev';
const OG_IMAGE = `${SITE_URL}/logo-og.png`;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'SaudiSaaSHub - المصدرك الأول لـ SaaS في المملكة العربية السعودية',
    description: 'اكتشف أحدث اتجاهات SaaS والشركات الناشئة والرؤى من المملكة العربية السعودية. نقدم تحليلات السوق الشاملة، مراجعات الشركات التقنية، وأدلة عملية لنمو أعمالك في قطاع التقنية والتمويل.',
    authors: [{ name: 'Saudi SaaS Hub Team' }],
    creator: 'Saudi SaaS Hub',
    publisher: 'Saudi SaaS Hub',
    alternates: {
      canonical: SITE_URL,
      languages: {
        'ar-SA': SITE_URL,
        'en-US': `${SITE_URL}/en`,
      },
    },
    openGraph: {
      title: 'SaudiSaaSHub - المصدرك الأول لـ SaaS في المملكة العربية السعودية',
      description: 'اكتشف أحدث اتجاهات SaaS والشركات الناشئة والرؤى من المملكة العربية السعودية. نقدم تحليلات السوق الشاملة، مراجعات الشركات التقنية، وأدلة عملية لنمو أعمالك في قطاع التقنية والتمويل.',
      type: 'website',
      locale: 'ar_SA',
      siteName: 'Saudi SaaS Hub',
      url: SITE_URL,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: 'Saudi SaaS Hub - SaaS News Saudi Arabia',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'SaudiSaaSHub - تقنية وأعمال السعودية',
      description: 'مصدرك للمقالات التقنية والشركات الناشئة في السعودية',
      images: [OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'script:plausible': `<script async defer data-domain="saudisaashub.pages.dev" src="https://plausible.io/js/plausible.js"></script>`,
      'script:ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Saudi SaaS Hub',
        url: SITE_URL,
        description: 'مصدرك الأول لأخبار SaaS في السعودية',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_URL}/articles?search={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
        inLanguage: 'ar-SA',
      }),
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen flex flex-col">
        <Header />
        <SearchModal />
        <main className="flex-1 pt-16 md:pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
