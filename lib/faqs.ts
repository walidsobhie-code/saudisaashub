export interface FAQ {
  question: string;
  answer: string;
}

// Generate sample FAQs based on article content
export function generateSampleFAQs(title: string, content: string): FAQ[] {
  // Extract key phrases from title
  const words = title.split(/[\s،,و]/).filter(w => w.length > 3);

  const baseFAQs: FAQ[] = [
    {
      question: `ما هو ${words[0] || 'هذا الموضوع'}؟`,
      answer: `${words[0] || 'هذا الموضوع'} هو مفهوم مهم في مجال التقنية والأعمال في المملكة العربية السعودية، يساعد الشركات على تحسين أداءها وتطوير خدماتها.`,
    },
    {
      question: `كيف يمكنني الاستفادة من ${words[0] || 'هذا الموضوع'}؟`,
      answer: 'يمكنك الاستفادة من خلال تطبيق الاستراتيجيات والأدوات المذكورة في هذا المقال، والتي تم تصميمها خصيصاً للسوق السعودي.',
    },
    {
      question: 'هل هذا مناسب للشركات الناشئة في السعودية؟',
      answer: 'نعم، جميع المعلومات والاستراتيجيات المذكورة مناسبة للشركات الناشئة في المملكة العربية السعودية وتتوافق مع رؤية 2030.',
    },
    {
      question: 'ما هي أفضل الممارسات للبدء؟',
      answer: 'ابدأ بتحديد أهدافك واضحة، ثم ضع خطة تنفيذية، واستخدم الأدوات والتقنيات المذكورة في هذا الدليل لتحقيق أفضل النتائج.',
    },
  ];

  return baseFAQs;
}
