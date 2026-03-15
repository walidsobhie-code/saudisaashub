import { Metadata } from 'next';
import CategoryPage from './[slug]';

export async function generateMetadata(): Promise<Metadata> {
  return CategoryPage.generateMetadata?.({ params: Promise.resolve({ slug: 'healthtech' }) }) || {
    title: 'شركات HealthTech السعودية',
  };
}

export default function HealthTechPage() {
  return CategoryPage({ params: Promise.resolve({ slug: 'healthtech' }) });
}
