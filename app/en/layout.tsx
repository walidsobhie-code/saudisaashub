import type { Metadata } from 'next';
import '../globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SearchModal } from '@/components/SearchModal';

const SITE_URL = 'https://saudisaashub.pages.dev';
const EN_URL = 'https://saudisaashub.pages.dev/en';
const OG_IMAGE = `${SITE_URL}/logo-og.png`;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Saudi SaaS Hub - Your Source for Saudi SaaS News',
    description: 'Discover the latest SaaS trends, startups, and insights from Saudi Arabia. Comprehensive market analysis, tech company reviews, and practical guides.',
    authors: [{ name: 'Saudi SaaS Hub Team' }],
    creator: 'Saudi SaaS Hub',
    publisher: 'Saudi SaaS Hub',
    alternates: {
      canonical: EN_URL,
      languages: {
        'en-US': EN_URL,
        'ar-SA': SITE_URL,
      },
    },
    openGraph: {
      title: 'Saudi SaaS Hub - Your Source for Saudi SaaS News',
      description: 'Discover the latest SaaS trends, startups, and insights from Saudi Arabia. Comprehensive market analysis, tech company reviews, and practical guides to grow your business.',
      type: 'website',
      locale: 'en_US',
      siteName: 'Saudi SaaS Hub',
      url: EN_URL,
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
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
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
