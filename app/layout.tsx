import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SearchModal } from '@/components/SearchModal';

export const metadata: Metadata = {
  title: 'SaudiSaaSHub - المصدرك الأول لـ SaaS في المملكة العربية السعودية',
  description: 'اكتشف أحدث اتجاهات SaaS والشركات الناشئة والرؤى من المملكة العربية السعودية. نقدم تحليلات السوق الشاملة، مراجعات الشركات التقنية، وأدلة عملية لنمو أعمالك في قطاع التقنية والتمويل.',
  keywords: 'SaaS, startup, السعودية, التقنية, الأعمال, ZATCA, الفوترة الإلكترونية, مقالات تقنية, شركات ناشئة',
  openGraph: {
    title: 'SaudiSaaSHub - المصدرك الأول لـ SaaS في المملكة العربية السعودية',
    description: 'اكتشف أحدث اتجاهات SaaS والشركات الناشئة والرؤى من المملكة العربية السعودية. نقدم تحليلات السوق الشاملة، مراجعات الشركات التقنية، وأدلة عملية لنمو أعمالك.',
    type: 'website',
    locale: 'ar_SA',
    siteName: 'Saudi SaaS Hub',
    url: 'https://saudisaashub.com',
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
    title: 'SaudiSaaSHub - تقنية وأعمال السعودية',
    description: 'مصدرك للمقالات التقنية والشركات الناشئة في السعودية',
    images: ['https://saudisaashub.com/logo.png'],
  },
  alternates: {
    canonical: 'https://saudisaashub.com',
    languages: {
      'ar-SA': 'https://saudisaashub.com',
      'en-US': 'https://saudisaashub.com/en',
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
  other: {
    'script:plausible': `<script async defer data-domain="saudisaashub.com" src="https://plausible.io/js/plausible.js"></script>`,
  },
};

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
