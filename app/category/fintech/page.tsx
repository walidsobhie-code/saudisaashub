import { Metadata } from 'next';
import CategoryPage from './[slug]';

export async function generateMetadata(): Promise<Metadata> {
  return CategoryPage.generateMetadata?.({ params: Promise.resolve({ slug: 'fintech' }) }) || {
    title: 'شركات FinTech السعودية',
  };
}

export default function FinTechPage() {
  return CategoryPage({ params: Promise.resolve({ slug: 'fintech' }) });
}
