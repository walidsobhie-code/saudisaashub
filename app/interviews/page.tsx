import { Metadata } from 'next';
import Link from 'next/link';
import { getAllInterviews } from '@/lib/interviews';
import { ShareButtons } from '@/components/ShareButtons';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs'; // Explicitly use Node.js runtime

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Interviews | Saudi SaaS Hub',
    description: 'Read interviews with Saudi SaaS founders and executives. Insights, advice, and success stories.',
    keywords: 'SaaS interviews Saudi Arabia, founder stories, tech leadership KSA',
    openGraph: {
      title: 'SaaS Leader Interviews',
      description: 'Discover success journeys of SaaS leaders in Saudi Arabia',
      type: 'website',
      url: 'https://saudisaashub.pages.dev/interviews',
    },
    alternates: {
      canonical: 'https://saudisaashub.pages.dev/interviews',
    },
  };
}

export default async function InterviewsPage() {
  const interviews = await getAllInterviews();

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">مقابلات قادة SaaS</h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            قصص نجاح وتجارب ملهمة لرواد الأعمال والexecutives في قطاع SaaS السعودي
          </p>
        </div>

        {/* Sharing */}
        <div className="text-center mb-8">
          <p className="text-text-muted text-sm mb-2">شارك هذه المقابلات</p>
          <ShareButtons title="SaaS Leader Interviews" url="https://saudisaashub.pages.dev/interviews" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {interviews.map(interview => (
            <Link
              key={interview.slug}
              href={`/interviews/${interview.slug}`}
              className="group bg-card/30 backdrop-blur-sm rounded-2xl p-6 border border-white/5 hover:border-accent-green/30 transition-all"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-accent-green/20 to-accent-cyan/20 flex items-center justify-center">
                <span className="text-2xl font-bold text-white/80">{interview.interviewee.initials}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 text-center group-hover:text-accent-green transition-colors">
                {interview.interviewee.role}
              </h3>
              <p className="text-accent-cyan text-sm text-center mb-3">{interview.interviewee.company}</p>
              <p className="text-text-secondary text-sm text-center line-clamp-3">
                {interview.excerpt}
              </p>
              <div className="text-center mt-4">
                <span className="text-accent-green text-sm font-medium">قراءة المقابلة &larr;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}


