// Notable SaaS companies in Saudi Arabia
export interface SaudiSaaSCompany {
  name: string;
  slug: string;
  description: string;
  category: string;
  founded: number;
  website: string;
  logo: string;
  employees: string;
  funding: string;
  headquarters: string;
  keyProducts: string[];
  investors?: string[];
}

export const saudiSaaSCompanies: SaudiSaaSCompany[] = [
  {
    name: 'Absher',
    slug: 'absher',
    description: 'حكومة إلكترونية - منصة خدمات حكومية رقمية متكاملة توفر أكثر من 200 خدمة للمواطنين والمقيمين',
    category: 'GovTech',
    founded: 2015,
    website: 'https://absher.sa',
    logo: 'https://placehold.co/80x80?text=Absher',
    employees: '1,000-5,000',
    funding: 'صندوق التنمية الوطني (تمويل حكومي)',
    headquarters: 'الرياض',
    keyProducts: [
      'خدمات التأشيرات والمellan',
      'الخدمات المرورية',
      'الخدمات المدنية',
      'التحقق من الصلاحية'
    ],
    investors: ['الصندوق السعودي للتنمية']
  },
  {
    name: 'Taqat',
    slug: 'taqat',
    description: 'منصة توظيف وموارد بشرية متطورة تربط بين الباحثين عن العمل والشركات بمهارات ذكية',
    category: 'HR Tech',
    founded: 2018,
    website: 'https://taqat.sa',
    logo: 'https://placehold.co/80x80?text=Taqat',
    employees: '100-500',
    funding: 'سلسلة A - 15 مليون دولار',
    headquarters: 'الرياض',
    keyProducts: [
      'محرك بحث الوظائف الذكي',
      'نظام تقييم المهارات',
      'منصة التدريب الإلكتروني',
      'خدمات التوظيف المتميز'
    ],
    investors: ['STV', 'Riyadh Innovation']
  },
  {
    name: 'Salla',
    slug: 'salla',
    description: 'تمكين رواد الأعمال من إنشاء متاجر إلكترونية - منصة تجارة إلكترونية سعودية رائدة',
    category: 'E-commerce',
    founded: 2016,
    website: 'https://salla.sa',
    logo: 'https://placehold.co/80x80?text=Salla',
    employees: '500-1,000',
    funding: 'سلسلة B - 40 مليون دولار',
    headquarters: 'جدة',
    keyProducts: [
      'منصة المتاجر الإلكترونية',
      'نظام الدفع الإلكتروني',
      'التكامل مع وسائل التواصل',
      'تحليلات المتجر'
    ],
    investors: ['Venture Capital', 'البنك السعودي للاستثمار']
  },
  {
    name: 'HyperPay',
    slug: 'hyperpay',
    description: 'بوابة دفع إلكتروني متكاملة توفر حلول دفع آمنة للمتاجر الإلكترونية والتطبيقات',
    category: 'Fintech',
    founded: 2014,
    website: 'https://hyperpay.com',
    logo: 'https://placehold.co/80x80?text=HyperPay',
    employees: '200-500',
    funding: 'سلسلة B - 30 مليون دولار',
    headquarters: 'الرياض',
    keyProducts: [
      'بوابة الدفع الموحدة',
      'محافظ رقمية',
      'حلول الاشتراكات',
      'مكافحة الغش'
    ],
    investors: ['Mastercard', ' Saudi Payments']
  },
  {
    name: 'Ajmotly',
    slug: 'ajmotly',
    description: 'منصة إدارة وتتبع الشحنات - خدمات لوجستية ذكية للشركات والأفراد',
    category: 'Logistics',
    founded: 2019,
    website: 'https://ajmotly.com',
    logo: 'https://placehold.co/80x80?text=Ajmotly',
    employees: '50-100',
    funding: 'سلسلة A - 10 مليون دولار',
    headquarters: 'الرياض',
    keyProducts: [
      'تتبع الشحنات المباشر',
      'إدارةmercial',
      'التكامل مع شركات الشحن',
      'تنبؤات التسليم'
    ],
    investors: ['مستثمرون ملائكيون', 'صناديق الاستثمار']
  },
  {
    name: 'Foodics',
    slug: 'foodics',
    description: 'نظام نقاط بيع (POS) متكامل لإدارة المطاعم والمقاهي王安، يعمل بالذكاء الاصطناعي',
    category: 'Restaurant Tech',
    founded: 2014,
    website: 'https://foodics.com',
    logo: 'https://placehold.co/80x80?text=Foodics',
    employees: '500-1,000',
    funding: 'سلسلة B - 21 مليون دولار',
    headquarters: 'جدة',
    keyProducts: [
      'نظام نقاط البيع (POS)',
      'إدارة الطلبات',
      'تحليل البيانات',
      'التكامل مع Deliveroo'
    ],
    investors: ['Saudi Aramco', 'Entrepreneur First']
  },
  {
    name: 'Nana',
    slug: 'nana',
    description: 'تطبيق تسوق وخدمات غذائية شامل - توصيل البقالة والأطعمة الطازجة للمنازل',
    category: 'E-commerce',
    founded: 2016,
    website: 'https://nana.sa',
    logo: 'https://placehold.co/80x80?text=Nana',
    employees: '200-500',
    funding: 'سلسلة C - 135 مليون دولار',
    headquarters: 'جدة',
    keyProducts: [
      'توصيل البقالة',
      'التسوق من المتاجر',
      'خدمة الاشتراك الشهري',
      'المخازن السحابية'
    ],
    investors: ['STV', 'Global Founders Capital', 'Mubadala']
  },
  {
    name: 'Jahez',
    slug: 'jahez',
    description: 'منصة توصيل الطعام الرائدة - ربط المطاعم بالمستخدمين مع خدمة التوصيل السريع',
    category: 'Food Delivery',
    founded: 2016,
    website: 'https://jahez.net',
    logo: 'https://placehold.co/80x80?text=Jahez',
    employees: '1,000-5,000',
    funding: 'سلسلة B - 36.5 مليون دولار',
    headquarters: 'جدة',
    keyProducts: [
      'توصيل الطعام',
      'Jahez Kitchen',
      'برنامج الولاء',
      'خدمات المطاعم السحابية'
    ],
    investors: ['Alkhaleej Capital', 'Venture Capital']
  },
  {
    name: 'Tabby',
    slug: 'tabby',
    description: 'حلول دفع بالتقسيط - تمكين العملاء من الشراء الآن والدفع لاحقاً بدون فوائد',
    category: 'Fintech',
    founded: 2019,
    website: 'https://tabby.ai',
    logo: 'https://placehold.co/80x80?text=Tabby',
    employees: '200-500',
    funding: 'سلسلة C - 150 مليون دولار',
    headquarters: 'الرياض',
    keyProducts: [
      'الدفع بالتقسيط',
      'Tabby Plus',
      'تطبيق المحفظة',
      'حلول المالكين'
    ],
    investors: ['STV', 'Sequoia Capital', 'Mubadala']
  },
  {
    name: 'Tamara',
    slug: 'tamara',
    description: 'بطاقات ائتمان وشكل دفع بالتقسيط - حلول مالية مبتكرة للعملاء والتجار',
    category: 'Fintech',
    founded: 2018,
    website: 'https://tamara.co',
    logo: 'https://placehold.co/80x80?text=Tamara',
    employees: '100-200',
    funding: 'سلسلة B - 110 مليون دولار',
    headquarters: 'الرياض',
    keyProducts: [
      'بطاقات الائتمان',
      'الدفع بالتقسيط',
      'حلول التجار',
      'تطبيق المحفظة الرقمية'
    ],
    investors: ['Visa', ' Saudi Central Bank']
  }
];
