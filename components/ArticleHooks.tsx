import React from 'react';

interface QuestionHookProps {
  title: string;
}

export function QuestionHook({ title }: QuestionHookProps) {
  // Generate engaging questions based on article title
  const hooks = [
    'هل تبحث عن طريقة لتطوير عملك في السعودية؟',
    'هل تريد معرفة أحدث التطورات في مجال التقنية؟',
    'هل أنت مستعد للمستقبل الرقمي في المملكة؟',
  ];

  // Select a hook based on title hash for consistency
  const titleHash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const selectedHook = hooks[titleHash % hooks.length];

  return (
    <div className="mb-8 p-6 rounded-2xl bg-gradient-to-l from-accent-purple/10 to-card border border-white/10">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-accent-purple/20 to-pink-500/20 flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-bold text-white mb-2">هل تسأل نفسك؟</h3>
          <p className="text-text-secondary">{selectedHook}</p>
        </div>
      </div>
    </div>
  );
}

interface ArticleHashtagsProps {
  categories: string[];
}

export function ArticleHashtags({ categories }: ArticleHashtagsProps) {
  // Generate relevant hashtags based on categories
  const hashtagMap: Record<string, string[]> = {
    'ZATCA - الفوترة الإلكترونية': ['#ZATCA', '#فوترة_إلكترونية', '#ضريبة_القيمة_المضافة', '#الاقتصاد_السعودي'],
    'SaaS': ['#SaaS', '#برمجيات_كخدمة', '#التقنية', '#الشركات_الناشئة'],
    'Startup': ['#Startup', '#شركة_ناشئة', '#ريادة_الأعمال', '#السعودية'],
    'التسويق': ['#تسويق', '#التسويق_الرقمي', '#التسويق_في_السعودية'],
    'التقنية': ['#تقنية', '#تكنولوجيا', '#التحول_الرقمي'],
    'الأعمال': ['#أعمال', '#تجارة', '#السوق_السعودي'],
  };

  // Build hashtags from categories
  const hashtags = new Set<string>([
    '#SaudiSaaSHub',
    '#المملكة_العربية_السعودية',
    '#رؤية_2030',
  ]);

  for (const category of categories) {
    if (hashtagMap[category]) {
      hashtagMap[category].forEach(tag => hashtags.add(tag));
    }
    // Add category as hashtag
    hashtags.add(`#${category.replace(/[^a-zA-Zأ-ي0-9_]/g, '_')}`);
  }

  return (
    <div className="mt-8 pt-8 border-t border-white/10">
      <div className="flex flex-wrap gap-2">
        {Array.from(hashtags).slice(0, 10).map((tag) => (
          <span
            key={tag}
            className="px-3 py-1.5 text-sm rounded-full bg-card border border-white/10 text-accent-cyan hover:border-accent-cyan/50 hover:text-accent-pink transition-colors cursor-pointer"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
