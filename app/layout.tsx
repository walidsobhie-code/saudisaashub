import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SearchModal } from '@/components/SearchModal';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Inter, Cairo } from 'next/font/google';

const SITE_URL = 'https://saudisaashub.pages.dev';
const OG_IMAGE = `${SITE_URL}/logo-og.png`;
const NOW = new Date().toISOString();

// Optimized font loading with next/font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

const cairo = Cairo({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-cairo',
  preload: true,
});

export async function generateMetadata(): Promise<Metadata> {
  const now = new Date().toISOString();

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
      'article:published_time': now,
      'article:author': 'Saudi SaaS Hub Team',
      'article:publisher': 'Saudi SaaS Hub',
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Saudi SaaS Hub',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: 'المصدر الأول لـ SaaS في المملكة العربية السعودية',
    sameAs: [
      'https://x.com/SaudiSaaSHub',
      'https://instagram.com/saudisaashub',
      'https://linkedin.com/company/saudisaashub',
      'https://facebook.com/profile.php?id=61586893616132',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      availableLanguage: ['Arabic', 'English'],
    },
  };

  return (
    <html lang="ar" dir="rtl" className={`${inter.variable} ${cairo.variable}`}>
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />

        {/* JSON-LD Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        {/* Skip Navigation Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-accent-green text-background font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-green focus:ring-offset-2 focus:ring-offset-background"
        >
          انتقل إلى المحتوى الرئيسي
        </a>

        <Header />
        <SearchModal />
        <main id="main-content" className="flex-1 pt-16 md:pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
