import { Metadata } from 'next';
import CategoryPage from './[slug]';

export async function generateMetadata(): Promise<Metadata> {
  return CategoryPage.generateMetadata?.({ params: Promise.resolve({ slug: 'edtech' }) }) || {
    title: 'شركات EdTech السعودية',
  };
}

export default function EdTechPage() {
  return CategoryPage({ params: Promise.resolve({ slug: 'edtech' }) });
}
