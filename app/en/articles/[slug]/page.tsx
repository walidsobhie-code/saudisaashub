import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { articles } from '@/lib/generated-articles';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map(article => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find(a => a.slug === slug);
  
  return {
    title: article?.title || 'Article',
    description: article?.excerpt || 'Redirecting to Arabic article',
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function EnArticleRedirectPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Redirect to Arabic version
  redirect(`/articles/${slug}`);
}
