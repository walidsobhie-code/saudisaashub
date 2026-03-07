import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SearchModal } from '@/components/SearchModal';
import { NewsletterPopup } from '@/components/NewsletterPopup';
import { BackToTop } from '@/components/BackToTop';
import { getArticles } from '@/lib/articles';

export async function generateMetadata(): Promise<Metadata> {
  const articles = await getArticles();
  // Get the most recent article date for homepage metadata
  const latestArticle = articles.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];
  const latestDate = latestArticle?.date || new Date().toISOString();

  return {
    title: {
      default: 'SaudiSaaSHub | مصدرك الأول لأخبار SaaS في السعودية',
      template: '%s | SaudiSaaSHub',
    },
    description: 'مصدرك الأول لأحدث أخبار وتقارير SaaS والشركات الناشئة في المملكة العربية السعودية. نقدم تحليلات السوق الشاملة، مراجعات الشركات التقنية، وأدلة عملية لنمو الأعمال والوصول للتحول الرقمي.',
    keywords: ['SaaS', 'startup', 'السعودية', 'التقنية', 'الأعمال', 'الفوترة الإلكترونية', 'ZATCA', 'PDPL', 'التحول الرقمي', 'رؤية 2030', 'SaaS السعودية', 'شركات ناشئة'],
    authors: [{ name: 'SaudiSaaSHub Team' }],
    creator: 'SaudiSaaSHub',
    publisher: 'SaudiSaaSHub',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://saudisaashub.pages.dev'),
    alternates: {
      canonical: 'https://saudisaashub.pages.dev',
      languages: {
        'ar': 'https://saudisaashub.pages.dev',
        'en': 'https://saudisaashub.pages.dev/en',
      },
    },
    openGraph: {
      title: 'SaudiSaaSHub - مصدرك الأول لـ SaaS في المملكة العربية السعودية',
      description: 'مصدرك الأول لأحدث أخبار وتقارير SaaS والشركات الناشئة في المملكة العربية السعودية. تحليلات السوق الشاملة، مراجعات الشركات التقنية، وأدلة عملية لنمو الأعمال.',
      url: 'https://saudisaashub.pages.dev',
      siteName: 'SaudiSaaSHub',
      locale: 'ar_SA',
      alternateLocale: 'en_US',
      type: 'website',
      publishedTime: latestDate,
      modifiedTime: latestDate,
      images: [
        {
          url: 'https://saudisaashub.pages.dev/og-image.png',
          width: 1200,
          height: 630,
          alt: 'SaudiSaaSHub - مصدرك الأول لـ SaaS في المملكة',
        },
      ],
    },
    other: {
      'article:published_time': latestDate,
      'article:modified_time': latestDate,
      'Impact-Site-Verification': '0650d577-f35c-4622-aa6d-c744ba42eb65',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'SaudiSaaSHub - مصدرك الأول لـ SaaS في المملكة',
      description: 'مصدرك الأول لأحدث أخبار وتقارير SaaS والشركات الناشئة في المملكة العربية السعودية.',
      creator: '@SaudiSaaSHub',
      site: '@SaudiSaaSHub',
      images: ['https://saudisaashub.pages.dev/og-image.png'],
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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SaudiSaaSHub',
    alternateName: 'سعودي ساس هب',
    url: 'https://saudisaashub.pages.dev',
    description: 'مصدرك الأول لأحدث أخبار وتقارير SaaS والشركات الناشئة في المملكة العربية السعودية',
    publisher: {
      '@type': 'Organization',
      name: 'SaudiSaaSHub',
      logo: {
        '@type': 'ImageObject',
        url: 'https://saudisaashub.pages.dev/og-image.png',
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://saudisaashub.pages.dev/articles?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    sameAs: [
      'https://twitter.com/SaudiSaaSHub',
      'https://www.linkedin.com/company/saudisaashub',
    ],
  };

  return (
    <html lang="ar" dir="rtl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Google Analytics 4 - Replace G-XXXXXXXXXX with your measurement ID */}
        {/* To get your ID: https://analytics.google.com/ */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />

        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/feed.xml" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#00D9A5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="SaudiSaaS" />

        {/* Explicit meta tags for LinkedIn */}
        <meta name="author" content="SaudiSaaSHub Team" />
        <meta name="image" content="https://saudisaashub.pages.dev/og-image.png" />
        <meta property="og:image" content="https://saudisaashub.pages.dev/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </head>
      <body className="min-h-screen flex flex-col">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent-green focus:text-background">
          _skip to content_
        </a>
        <Header />
        <SearchModal />
        <NewsletterPopup />
        <main id="main-content" className="flex-1 pt-16 md:pt-20">
          {children}
        </main>
        <BackToTop />
        <Footer />
      </body>
    </html>
  );
}
