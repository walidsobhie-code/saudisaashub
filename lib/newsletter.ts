/**
 * Newsletter content calendar for SaudiSaaSHub
 * Weekly issues sent to subscribers
 */

export interface NewsletterIssue {
  week: number;
  date: string; // ISO date
  subject: string;
  headline: string;
  featuredCompany?: {
    name: string;
    slug: string;
    reason: string;
  };
  articleLink?: {
    title: string;
    slug: string;
  };
  sections: {
    title: string;
    content: string;
  }[];
  callToAction: {
    text: string;
    url: string;
  };
}

export const newsletterCalendar: NewsletterIssue[] = [
  // Week 1
  {
    week: 1,
    date: '2026-03-20',
    subject: 'مرحباً بك في النشرة الأسبوعية لـ SaudiSaaSHub',
    headline: 'أخبار SaaS السعودية – العدد الأول',
    featuredCompany: {
      name: 'Salla',
      slug: 'salla',
      reason: 'أكبر منصة تجارة إلكترونية سعودية، recent expansion into new markets',
    },
    articleLink: {
      title: 'State of Saudi SaaS 2026 – التقرير السنوي',
      slug: '/reports/state-of-saudi-saas-2026',
    },
    sections: [
      {
        title: 'من نحن',
        content: 'نقدم لكم النشرة الأسبوعية التي تغطي آخر أخبار وتحركات سوق SaaS في المملكة.',
      },
      {
        title: 'أبرز الأخبار',
        content: '• ZATCA تعلن عن موعد نهائي جديد للمرحلة 2.\n• STV يعلن صندوق جديد بقيمة 500 مليون ريال.\n• LEAP 2026 shatter attendance records.',
      },
      {
        title: 'شركة الأسبوع',
        content: 'Salla: منصة متكاملة لإدارة المتاجر الإلكترونية، أكثر من 100,000 متجر.',
      },
    ],
    callToAction: {
      text: 'تصفح دليل الشركات',
      url: '/companies',
    },
  },

  // Week 2
  {
    week: 2,
    date: '2026-03-27',
    subject: 'التقارير: ZATCA والتوسع في التمويل',
    headline: 'امتثال ZATCA وصفقات الاستثمار الجديدة',
    featuredCompany: {
      name: 'Tabby',
      slug: 'tabby',
      reason: 'حلول الدفع بالتقسيط، recent Series C funding of $150M',
    },
    articleLink: {
      title: 'كيفية جمع التمويل المبدئي في السعودية',
      slug: '/articles/raise-seed-saudi',
    },
    sections: [
      {
        title: 'أخبار ZATCA',
        content: 'تحديثات مهمة في متطلبات المرحلة 2. تعرف على الجدول الزمني الجديد.',
      },
      {
        title: 'صفقة الأسبوع',
        content: 'Tabby يجمع 150 مليون دولار في Series C بقيادة Sequoia Capital.',
      },
      {
        title: 'مقال مميز',
        content: 'دليل عملي للشركات الناشئة لجمع التمويل المبدئي.',
      },
    ],
    callToAction: {
      text: 'تابع التمويل',
      url: '/funding',
    },
  },

  // Week 3
  {
    week: 3,
    date: '2026-04-03',
    subject: 'مقارنة: أفضل 10 حلول SaaS في السعودية',
    headline: 'من هو الأفضل؟ تحليل مفصل',
    featuredCompany: {
      name: 'Absher',
      slug: 'absher',
      reason: 'منصة الخدمات الحكومية الرقمية، الأكثر استخداماً في المملكة',
    },
    articleLink: {
      title: 'أفضل 10 شركات SaaS في السعودية 2026',
      slug: '/articles/top-10-saudi-saas',
    },
    sections: [
      {
        title: 'المقارنة',
        content: 'نقارن بين أفضل 10 شركات من حيث السعر، الميزات، AMD rating.',
      },
      {
        title: 'شركة حكومية رائدة',
        content: 'Absher: أكثر من 200 خدمة حكومية إلكترونية.',
      },
      {
        title: 'نصيحة الأسبوع',
        content: 'كيف تختار حل SaaS المناسب لعملك؟ اقرأ مقارنتنا.',
      },
    ],
    callToAction: {
      text: 'اقرأ المقارنة',
      url: '/articles/top-10-saudi-saas',
    },
  },

  // Week 4-8 (placeholders)
  {
    week: 4,
    date: '2026-04-10',
    subject: 'الأخبار والتحديثات من عالم SaaS',
    headline: 'تطورات جديدة في السوق السعودي',
    featuredCompany: {
      name: 'Taqat',
      slug: 'taqat',
      reason: 'حلول التوظيف والموارد البشرية',
    },
    sections: [
      {
        title: 'تحديثات السوق',
        content: 'أهم الأحداث والأخبار من الأسبوع الماضي.',
      },
    ],
    callToAction: {
      text: 'تصفح الدليل',
      url: '/companies',
    },
  },
];

export function getCurrentIssue(): NewsletterIssue | null {
  const now = new Date();
  const currentWeek = Math.floor(now.getTime() / (7 * 24 * 60 * 60 * 1000));
  const issue = newsletterCalendar.find(i => i.week === currentWeek % 8 + 1);
  return issue || newsletterCalendar[0];
}
