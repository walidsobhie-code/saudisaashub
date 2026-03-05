// Auto-insert visual components into article content
import React from 'react';
import { StatCard, ComparisonTable, BarChart, PieChart, Timeline, StepsGuide, HighlightBox } from './ArticleCharts';

interface ArticleContentProps {
  content: string;
  relatedArticles: { title: string; slug: string }[];
  slug?: string;
}

// Sample data that can be auto-inserted based on article topics
const topicData: Record<string, {
  stats?: { label: string; value: string; change?: string }[];
  chart?: { label: string; value: number }[];
  steps?: { title: string; content: string }[];
  timeline?: { title: string; description: string; date?: string }[];
  highlight?: { title: string; content: string; type: 'tip' | 'warning' | 'info' }[];
}> = {
  'marketing': {
    stats: [
      { label: 'نمو التسويق الرقمي', value: '+45%', change: 'سنوي' },
      { label: 'معدل التحويل', value: '3.2%', change: 'متوسط' },
      { label: 'الاستثمار في SaaS', value: '$2.4B', change: '2024' },
    ],
    chart: [
      { label: 'وسائل التواصل', value: 35 },
      { label: 'البحث العضوي', value: 28 },
      { label: 'البريد الإلكتروني', value: 18 },
      { label: 'الإعلانات المدفوعة', value: 12 },
      { label: '其他', value: 7 },
    ],
    highlight: [
      { title: 'نصيحة ذهبية', content: ' ركز على جودة المحتوى بدلاً من الكمية', type: 'tip' },
    ]
  },
  'zatca': {
    stats: [
      { label: 'المواعيد النهائية', value: '2026', change: 'قادم' },
      { label: 'نسبة الامتثال', value: '78%', change: 'حالي' },
    ],
    steps: [
      { title: 'تسجيل في ZATCA', content: 'أنشئ حسابك في منصة الزاتكا الرسمية' },
      { title: 'إصدار الفواتير', content: 'ابدأ بإصدار فواتير إلكترونية متوافقة' },
      { title: 'التكامل', content: 'اربط نظامك مع بوابة الزاتكا' },
    ],
  },
  'saudi': {
    chart: [
      { label: 'الرياض', value: 45 },
      { label: 'جدة', value: 28 },
      { label: 'الدمام', value: 15 },
      { label: 'المدينة', value: 8 },
      { label: 'أخرى', value: 4 },
    ],
  },
  'ecommerce': {
    stats: [
      { label: 'نمو التجارة', value: '+32%', change: 'سنوي' },
      { label: 'المستهلكين', value: '15M', change: 'نشط' },
    ],
    highlight: [
      { title: 'نصيحة مهمة', content: 'استخدم بوابات دفع محلية للسوق السعودي', type: 'tip' },
    ]
  }
};

// Detect topic from slug/categories
function detectTopic(slug: string, content: string): string | null {
  const combined = (slug + ' ' + content).toLowerCase();

  for (const topic of Object.keys(topicData)) {
    if (combined.includes(topic)) return topic;
  }
  return null;
}

export function ArticleContent({ content, relatedArticles, slug = '' }: ArticleContentProps) {
  // Detect topic
  const topic = detectTopic(slug, content);

  // Process HTML content
  let processedContent = content;

  // Add anchor links to headings
  processedContent = processedContent.replace(
    /<h2([^>]*)>(.*?)<\/h2>/gi,
    (match, attrs, text) => {
      const anchorId = text.toLowerCase().replace(/[^a-z0-9أ-ي\s]/g, '').replace(/\s+/g, '-');
      return `<h2${attrs} id="${anchorId}" class="group flex items-center gap-3 text-2xl md:text-3xl font-bold text-white mt-14 mb-6 pb-3 border-b border-white/10">
        <a href="#${anchorId}" class="opacity-0 group-hover:opacity-100 transition-opacity text-accent-green flex-shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
        </a>${text}
      </h2>`;
    }
  );

  processedContent = processedContent.replace(
    /<h3([^>]*)>(.*?)<\/h3>/gi,
    (match, attrs, text) => {
      const anchorId = text.toLowerCase().replace(/[^a-z0-9أ-ي\s]/g, '').replace(/\s+/g, '-');
      return `<h3${attrs} id="${anchorId}" class="group flex items-center gap-2 text-xl font-bold text-white mt-10 mb-4">
        <a href="#${anchorId}" class="opacity-0 group-hover:opacity-100 transition-opacity text-accent-green flex-shrink-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" /></svg>
        </a>${text}
      </h3>`;
    }
  );

  // Lists
  processedContent = processedContent.replace(/<ul/gi, '<ul class="list-disc list-inside space-y-2 my-5"');
  processedContent = processedContent.replace(/<ol/gi, '<ol class="list-decimal list-inside space-y-2 my-5"');
  processedContent = processedContent.replace(/<li>(?!<)/gi, '<li class="text-text-secondary mb-2 leading-relaxed">');

  // Tables
  processedContent = processedContent.replace(/<table/gi, '<div class="my-8 rounded-xl overflow-hidden border border-white/10"><table class="w-full"');
  processedContent = processedContent.replace(/<\/table>/gi, '</table></div>');
  processedContent = processedContent.replace(/<thead/gi, '<thead class="bg-card"');
  processedContent = processedContent.replace(/<th/gi, '<th class="px-5 py-4 text-right text-white font-semibold text-sm border-b border-white/10"');
  processedContent = processedContent.replace(/<tbody/gi, '<tbody class="divide-y divide-white/5"');
  processedContent = processedContent.replace(/<td/gi, '<td class="px-5 py-4 text-text-secondary border-b border-white/5"');
  processedContent = processedContent.replace(/<tr/gi, '<tr class="hover:bg-white/5">');

  // Paragraphs
  processedContent = processedContent.replace(/<p/gi, '<p class="text-text-secondary leading-8 mb-6 text-[17px]"');

  // Bold
  processedContent = processedContent.replace(/<strong>([^<]*)<\/strong>/gi, '<strong class="text-white font-semibold bg-accent-green/10 px-1.5 py-0.5 rounded">$1</strong>');

  // Links
  processedContent = processedContent.replace(/<a /gi, '<a class="text-accent-green hover:text-white underline underline-offset-2" ');

  // Blockquotes
  processedContent = processedContent.replace(/<blockquote/gi, '<blockquote class="border-l-4 border-accent-green bg-card/50 p-5 my-6 rounded-r-xl"');

  // Code
  processedContent = processedContent.replace(/<pre/gi, '<pre class="bg-card border border-white/10 rounded-xl p-5 my-5 overflow-x-auto text-sm"');
  processedContent = processedContent.replace(/<code/gi, '<code class="text-accent-green font-mono text-sm"');

  // Images
  processedContent = processedContent.replace(/<img/gi, '<img class="rounded-xl my-8 w-full shadow-lg"');

  // HR
  processedContent = processedContent.replace(/<hr\s*\/?>/gi, '<hr class="my-10 border-white/10" />');

  // Internal links
  for (const related of relatedArticles.slice(0, 2)) {
    const keywords = related.title.split(/[\s،,و]/).filter(w => w.length > 3).slice(0, 3);
    for (const keyword of keywords) {
      const regex = new RegExp(`(${keyword})(?![^<]*>)`, 'gi');
      processedContent = processedContent.replace(regex, `<a href="/articles/${related.slug}" class="text-accent-green hover:text-white underline">$1</a>`);
    }
  }

  return (
    <article className="article-content">
      <div dangerouslySetInnerHTML={{ __html: processedContent }} />

      {/* Auto-insert visual elements based on topic */}
      {topic && topicData[topic] && (
        <div className="mt-10">
          {/* Stats Grid */}
          {topicData[topic].stats && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
              {topicData[topic].stats!.map((stat, i) => (
                <StatCard key={i} {...stat} />
              ))}
            </div>
          )}

          {/* Chart */}
          {topicData[topic].chart && (
            <BarChart data={topicData[topic].chart!} title="إحصائيات" />
          )}

          {/* Steps */}
          {topicData[topic].steps && (
            <StepsGuide steps={topicData[topic].steps!} />
          )}

          {/* Highlights */}
          {topicData[topic].highlight?.map((h, i) => (
            <HighlightBox key={i} title={h.title} type={h.type as any}>
              {h.content}
            </HighlightBox>
          ))}
        </div>
      )}
    </article>
  );
}
