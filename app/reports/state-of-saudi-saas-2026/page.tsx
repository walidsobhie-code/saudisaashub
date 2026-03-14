import { Metadata } from 'next';
import dynamic from 'next/dynamic';

// Load the report page client-side only to avoid static generation timeout
const ReportPageClient = dynamic(() => import('@/app/reports/state-of-saudi-saas-2026/ReportPageClient'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-accent-green border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-text-secondary">Loading report...</p>
      </div>
    </div>
  ),
});

export const metadata: Metadata = {
  title: 'State of Saudi SaaS 2026 - Comprehensive Market Analysis',
  description: 'Comprehensive analysis of 252 Saudi SaaS companies, funding trends, ZATCA compliance, and market insights.',
  openGraph: {
    title: 'State of Saudi SaaS 2026',
    description: 'Comprehensive market analysis covering 252 companies, funding trends, and ZATCA impact.',
    type: 'article',
    publishedTime: '2026-03-13',
  },
};

export default function StateOfSaudiSaaS2026() {
  return <ReportPageClient />;
}