'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface QuestionHookProps {
  title: string;
  category?: string;
}

export function QuestionHook({ title, category }: QuestionHookProps) {
  const questions = [
    "هل تبحث عن أفضل الحلول؟",
    "هل تريد النجاح في مجال التقنية؟",
    "هل أنت مستعد للخطوة التالية؟",
    "هل تريد معرفة المزيد؟",
    "هل حان وقت التغيير؟",
  ];

  const [currentQuestion] = useState(() =>
    questions[Math.floor(Math.random() * questions.length)]
  );

  return (
    <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-accent-pink/10 via-accent-purple/10 to-accent-cyan/10 border border-white/10">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0 shadow-glow-pink">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-bold text-white mb-2">
            {currentQuestion}
          </h3>
          <p className="text-text-secondary text-sm">
            في هذا المقال، سنستكشف كل ما تحتاج معرفته حول <strong>{title}</strong>
            {category && <> في مجال <span className="text-accent-cyan">{category}</span></>}
          </p>
        </div>
      </div>
    </div>
  );
}

// Quick Question CTA
export function QuestionCTA() {
  return (
    <div className="mt-8 p-6 rounded-2xl bg-card border border-accent-pink/30">
      <div className="text-center">
        <h4 className="text-lg font-bold mb-2">هل لديك سؤال؟</h4>
        <p className="text-text-secondary text-sm mb-4">
          تواصل معنا للحصول على إجابة لجميع استفساراتك
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/articles"
            className="px-4 py-2 rounded-lg gradient-bg text-white text-sm font-medium"
          >
            تصفح المقالات
          </Link>
          <a
            href="https://x.com/SaudiSaaSHub"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-elevated border border-white/10 text-white text-sm font-medium hover:border-accent-pink/30 transition-colors"
          >
            سؤال على X
          </a>
        </div>
      </div>
    </div>
  );
}
