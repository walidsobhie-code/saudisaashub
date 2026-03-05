'use client';

import React, { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

interface ArticleFAQProps {
  faqs: FAQ[];
}

export function ArticleFAQ({ faqs }: ArticleFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="mt-12 pt-8 border-t border-white/10">
      <h2 className="text-2xl font-bold mb-6">الأسئلة الشائعة</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="gradient-border rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 flex items-center justify-between text-right bg-card hover:bg-elevated transition-colors"
            >
              <span className="font-semibold text-white">{faq.question}</span>
              <svg
                className={`w-5 h-5 text-accent-pink transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === index && (
              <div className="px-6 py-4 bg-elevated/50 border-t border-white/5">
                <p className="text-text-secondary">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
