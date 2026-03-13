// Upcoming tech and SaaS events in Saudi Arabia and Middle East
export interface TechEvent {
  name: string;
  slug: string;
  date: string; // ISO date string
  location: string;
  description: string;
  website: string;
  type: 'conference' | 'meetup' | 'workshop' | 'hackathon';
  region: 'Saudi' | 'Middle East' | 'Global';
}

export const upcomingEvents: TechEvent[] = [
  {
    name: 'LEAP Tech Event',
    slug: 'leap-2026',
    date: '2026-04-15',
    location: 'الرياض، المملكة العربية السعودية',
    description: 'أكبر حدث تقني في الشرق الأوسط - يجمع رواد الأعمال والمستثمرين والشركات التقنية',
    website: 'https://leap.sa', // TODO: Verify URL
    type: 'conference',
    region: 'Saudi'
  },
  {
    name: 'SaaS Summit KSA',
    slug: 'saas-summit-ksa-2026',
    date: '2026-05-20',
    location: 'جدة، المملكة العربية السعودية',
    description: 'قمة متخصصة في حلول SaaS - استراتيجيات النمو والتحول الرقمي',
    website: 'https://saassummit.com/saudi-arabia', // TODO: Verify URL
    type: 'conference',
    region: 'Saudi'
  },
  {
    name: 'Riyadh Tech Week',
    slug: 'riyadh-tech-week-2026',
    date: '2026-06-10',
    location: 'الرياض، المملكة العربية السعودية',
    description: 'أسبوع التقنية في الرياض - ورش عمل وجلسات حوارية',
    website: 'https://riyadhtech.sa', // TODO: Verify URL
    type: 'workshop',
    region: 'Saudi'
  },
  {
    name: 'GITEX Saudi',
    slug: 'gitex-saudi-2026',
    date: '2026-10-01',
    location: 'الرياض، المملكة العربية السعودية',
    description: 'معرض التقنية العالمي - أحدث الابتكارات والحلول التقنية',
    website: 'https://gitex.sa', // TODO: Verify URL
    type: 'conference',
    region: 'Saudi'
  },
  {
    name: 'Fintech Saudi',
    slug: 'fintech-saudi-2026',
    date: '2026-03-25',
    location: 'الرياض، المملكة العربية السعودية',
    description: 'مؤتمر التكنولوجيا المالية - مستقبل المدفوعات والخدمات المالية',
    website: 'https://fintech.sa', // TODO: Verify URL
    type: 'conference',
    region: 'Saudi'
  },
  {
    name: 'Dubai AI Summit',
    slug: 'dubai-ai-summit-2026',
    date: '2026-04-28',
    location: 'دبي، الإمارات العربية المتحدة',
    description: 'قمة الذكاء الاصطناعي - تحديثات وتطبيقات AI في المنطقة',
    website: 'https://dubaiaisummit.ae', // TODO: Verify URL
    type: 'conference',
    region: 'Middle East'
  },
  {
    name: 'Abu Dhabi Fintech',
    slug: 'abudhabi-fintech-2026',
    date: '2026-05-15',
    location: 'أبوظبي، الإمارات العربية المتحدة',
    description: 'مهرجان التكنولوجيا المالية في أبوظبي - الابتكار في الخدمات المالية',
    website: 'https://adfintech.ae', // TODO: Verify URL
    type: 'conference',
    region: 'Middle East'
  },
  {
    name: 'Qatar Tech Week',
    slug: 'qatar-tech-week-2026',
    date: '2026-09-20',
    location: 'الدوحة، قطر',
    description: 'أسبوع التقنية في قطر -focus على الاستدامة والتقنية الحديثة',
    website: 'https://qatartech.qa', // TODO: Verify URL
    type: 'meetup',
    region: 'Middle East'
  }
];
