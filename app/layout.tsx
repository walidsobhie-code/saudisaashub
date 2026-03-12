import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SearchModal } from '@/components/SearchModal';

export const metadata: Metadata = {
  title: 'SaudiSaaSHub - المصدرك الأول لـ SaaS في المملكة العربية السعودية',
  description: 'اكتشف أحدث اتجاهات SaaS والشركات الناشئة والرؤى من المملكة العربية السعودية. مقالات شاملة حول التسويق، التقنية، ZATCA، والفوترة الإلكترونية.',
  keywords: 'SaaS, startup, السعودية, التقنية, الأعمال, ZATCA, الفوترة الإلكترونية, مقالات تقنية, شركات ناشئة',
  openGraph: {
    title: 'SaudiSaaSHub - المصدرك الأول لـ SaaS في المملكة العربية السعودية',
    description: 'اكتشف أحدث اتجاهات SaaS والشركات الناشئة والرؤى من المملكة العربية السعودية',
    type: 'website',
    locale: 'ar_SA',
    siteName: 'SaudiSaaSHub',
    url: 'https://saudisaashub.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SaudiSaaSHub - تقنية وأعمال السعودية',
    description: 'مصدرك للمقالات التقنية والشركات الناشئة في السعودية',
    images: ['https://saudisaashub.com/logo.png'],
  },
  alternates: {
    canonical: 'https://saudisaashub.com',
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
