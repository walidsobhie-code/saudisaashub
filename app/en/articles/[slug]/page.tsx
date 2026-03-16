import { Metadata } from 'next';
import { redirect } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  return {
    title: 'Article Redirect',
    description: 'Redirecting to Arabic article',
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
