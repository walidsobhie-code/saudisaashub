import type { Metadata } from 'next';
import '../globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SearchModal } from '@/components/SearchModal';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Inter, Cairo } from 'next/font/google';

const SITE_URL = 'https://saudisaashub.pages.dev';
const EN_URL = 'https://saudisaashub.pages.dev/en';
const OG_IMAGE = `${SITE_URL}/logo-og.png`;

// Optimized font loading
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
    title: 'Saudi SaaS Hub - Your Source for Saudi SaaS News',
    description: 'Discover the latest SaaS trends, startups, and insights from Saudi Arabia. Comprehensive market analysis, tech company reviews, and practical guides.',
    authors: [{ name: 'Saudi SaaS Hub Team' }],
    creator: 'Saudi SaaS Hub',
    publisher: 'Saudi SaaS Hub',
    alternates: {
      canonical: `${SITE_URL}/en`,
      languages: {
        'en-US': `${SITE_URL}/en`,
        'ar-SA': SITE_URL,
      },
    },
    openGraph: {
      title: 'Saudi SaaS Hub - Your Source for Saudi SaaS News',
      description: 'Discover the latest SaaS trends, startups, and insights from Saudi Arabia. Comprehensive market analysis, tech company reviews, and practical guides.',
      type: 'website',
      locale: 'en_US',
      siteName: 'Saudi SaaS Hub',
      url: `${SITE_URL}/en`,
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
      title: 'Saudi SaaS Hub',
      description: 'Your source for SaaS and startup news in Saudi Arabia',
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
    url: EN_URL,
    logo: `${SITE_URL}/logo.png`,
    description: 'Your source for SaaS and startup news in Saudi Arabia',
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
    <html lang="en" dir="ltr" className={`${inter.variable} ${cairo.variable}`}>
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
          Skip to main content
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
