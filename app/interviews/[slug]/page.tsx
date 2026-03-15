import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllInterviews } from '@/lib/interviews';
import { ShareButtons } from '@/components/ShareButtons';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const interviews = getAllInterviews();
  return interviews.map((interview) => ({
    slug: interview.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const interviews = getAllInterviews();
  const { slug } = await params;
  const interview = interviews.find(i => i.slug === slug);

  if (!interview) {
    return { title: 'المقابلة غير موجودة' };
  }

  const url = `https://saudisaashub.pages.dev/interviews/${slug}`;

  return {
    title: `مقابلة: ${interview.interviewee.role} في ${interview.interviewee.company}`,
    description: interview.excerpt,
    openGraph: {
      title: `مقابلة مع ${interview.interviewee.role}`,
      description: interview.excerpt,
      type: 'article',
      url: url,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function InterviewPage({ params }: PageProps) {
  const interviews = getAllInterviews();
  const { slug } = await params;
  const interview = interviews.find(i => i.slug === slug);

  if (!interview) {
    notFound();
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back link */}
        <Link
          href="/interviews"
          className="inline-flex items-center gap-2 text-accent-green hover:text-accent-cyan mb-8"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          جميع المقابلات
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-accent-green/20 to-accent-cyan/20 flex items-center justify-center border border-white/10">
            <span className="text-4xl font-bold text-white/80">{interview.interviewee.initials}</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">{interview.interviewee.role}</h1>
          <p className="text-accent-cyan text-lg">{interview.interviewee.company}</p>
        </div>

        {/* Sharing */}
        <div className="text-center mb-8">
          <p className="text-text-muted text-sm mb-2">شارك هذه المقابلة</p>
          <ShareButtons
            title={`مقابلة مع ${interview.interviewee.role} - ${interview.interviewee.company}`}
            url={`https://saudisaashub.pages.dev/interviews/${slug}`}
          />
        </div>

        {/* Content */}
        <article className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 border border-white/5">
          <div className="prose prose-invert max-w-none">
            {/* Render simple markdown-like content */}
            {interview.content.split('\n').map((line, idx) => {
              if (line.startsWith('## ')) {
                return <h2 key={idx} className="text-2xl font-bold text-white mt-8 mb-4">{line.replace('## ', '')}</h2>;
              }
              if (line.startsWith('**س:') && line.includes('ج:')) {
                const [q, a] = line.split('ج:');
                return (
                  <div key={idx} className="mb-6">
                    <p className="text-accent-green font-semibold mb-2">{q.replace('**س:', '')}؟</p>
                    <p className="text-text-secondary">{a}</p>
                  </div>
                );
              }
              if (line.startsWith('**س:')) {
                return <p key={idx} className="text-accent-green font-semibold mb-2">{line.replace('**س:', '')}؟</p>;
              }
              if (line.startsWith('**ج:')) {
                return <p key={idx} className="text-text-secondary mb-4">{line.replace('**ج:', '')}</p>;
              }
              if (line.match(/^\*\*+\s*$/)) {
                return <hr key={idx} className="border-white/10 my-8" />;
              }
              if (line.startsWith('* * *')) {
                return <hr key={idx} className="border-white/10 my-8" />;
              }
              if (line.trim() === '') {
                return <br key={idx} />;
              }
              // Bold inline
              const parts = line.split(/(\*\*[^*]+\*\*)/);
              if (parts.length > 1) {
                return (
                  <p key={idx} className="mb-4">
                    {parts.map((part, i) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={i} className="text-accent-green">{part.slice(2, -2)}</strong>;
                      }
                      return part;
                    })}
                  </p>
                );
              }
              return <p key={idx} className="mb-4">{line}</p>;
            })}
          </div>
        </article>

        {/* Related interviews */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-white mb-6">مقابلات ذات صلة</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {getAllInterviews()
              .filter(i => i.slug !== slug)
              .slice(0, 2)
              .map(related => (
                <Link
                  key={related.slug}
                  href={`/interviews/${related.slug}`}
                  className="bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-white/5 hover:border-accent-green/30 transition-all"
                >
                  <h4 className="text-lg font-bold text-white mb-2">{related.interviewee.role}</h4>
                  <p className="text-accent-cyan text-sm mb-3">{related.interviewee.company}</p>
                  <p className="text-text-secondary text-sm line-clamp-2">{related.excerpt}</p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
