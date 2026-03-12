import type { Metadata } from 'next';
import '../globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SearchModal } from '@/components/SearchModal';

export const metadata: Metadata = {
  title: 'Saudi SaaS Hub - Your Source for Saudi SaaS News',
  description: 'Discover the latest SaaS trends, startups, and insights from Saudi Arabia. Comprehensive market analysis, tech company reviews, and practical guides.',
  keywords: 'SaaS, Saudi Arabia, startup, technology, business, tech articles, startups',
  openGraph: {
    title: 'Saudi SaaS Hub - Your Source for Saudi SaaS News',
    description: 'Discover the latest SaaS trends, startups, and insights from Saudi Arabia. Comprehensive market analysis, tech company reviews, and practical guides to grow your business.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Saudi SaaS Hub',
    url: 'https://saudisaashub.com/en',
    images: [
      {
        url: 'https://saudisaashub.com/logo.png',
        width: 1200,
        height: 630,
        alt: 'Saudi SaaS Hub - Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saudi SaaS Hub',
    description: 'Your source for SaaS and startup news in Saudi Arabia',
    images: ['https://saudisaashub.com/logo.png'],
  },
  alternates: {
    canonical: 'https://saudisaashub.com/en',
    languages: {
      'en-US': 'https://saudisaashub.com/en',
      'ar-SA': 'https://saudisaashub.com',
    },
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
