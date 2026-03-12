import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SearchModal } from '@/components/SearchModal';

export const metadata: Metadata = {
  title: 'SaudiSaaSHub - المصدرك الأول لـ SaaS في المملكة العربية السعودية',
  description: 'اكتشف أحدث اتجاهات SaaS والشركات الناشئة والرؤى من المملكة العربية السعودية',
  keywords: 'SaaS, startup, السعودية, التقنية, الأعمال',
  openGraph: {
    title: 'SaudiSaaSHub - المصدرك الأول لـ SaaS في المملكة العربية السعودية',
    description: 'اكتشف أحدث اتجاهات SaaS والشركات الناشئة والرؤى من المملكة العربية السعودية',
    type: 'website',
    locale: 'ar_SA',
    siteName: 'SaudiSaaSHub',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SaudiSaaSHub',
    description: 'المصدرك الأول لـ SaaS في المملكة العربية السعودية',
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
