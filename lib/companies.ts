// Comprehensive data for Saudi SaaS companies directory
// This data structure matches the PostgreSQL schema

export interface Company {
  id: string;
  name: string;
  slug: string;
  description: string;
  founded_year: number;
  headquarters: string;
  employees: string;
  funding: string;
  website: string;
  logo_url: string | null;
  categories: Category[];
  features: Feature[];
  integrations: Integration[];
  certifications: Certification[];
  badges: Badge[];
  pricing_plans: PricingPlan[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Feature {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Integration {
  id: string;
  name: string;
  slug: string;
  description?: string;
  category?: string;
}

export interface Certification {
  id: string;
  name: string;
  slug: string;
  description?: string;
  category?: string;
}

export interface Badge {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color: string;
}

export interface PricingPlan {
  id: string;
  company_id: string;
  plan_name: string;
  price: number;
  frequency: 'monthly' | 'yearly' | 'one-time' | 'custom';
  features_list: string[];
  billing_cycle?: number;
  trial_days: number;
  is_active: boolean;
}

// Sample categories
export const categories: Category[] = [
  { id: 'cat-1', name: 'GovTech', slug: 'govtech', description: 'Government Technology' },
  { id: 'cat-2', name: 'HR Tech', slug: 'hr-tech', description: 'Human Resources Technology' },
  { id: 'cat-3', name: 'E-commerce', slug: 'e-commerce', description: 'Electronic Commerce' },
  { id: 'cat-4', name: 'Fintech', slug: 'fintech', description: 'Financial Technology' },
  { id: 'cat-5', name: 'Logistics', slug: 'logistics', description: 'Supply Chain & Logistics' },
  { id: 'cat-6', name: 'Restaurant Tech', slug: 'restaurant-tech', description: 'Restaurant Technology' },
  { id: 'cat-7', name: 'Food Delivery', slug: 'food-delivery', description: 'Food Delivery Services' },
  { id: 'cat-8', name: 'EdTech', slug: 'edtech', description: 'Education Technology' },
  { id: 'cat-9', name: 'HealthTech', slug: 'healthtech', description: 'Healthcare Technology' },
  { id: 'cat-10', name: 'PropTech', slug: 'proptech', description: 'Property Technology' },
];

// Sample features
export const featuresList: Feature[] = [
  { id: 'feat-1', name: 'API Access', slug: 'api-access' },
  { id: 'feat-2', name: 'Mobile App', slug: 'mobile-app' },
  { id: 'feat-3', name: 'Analytics Dashboard', slug: 'analytics-dashboard' },
  { id: 'feat-4', name: 'Multi-language Support', slug: 'multi-language-support' },
  { id: 'feat-5', name: 'Cloud Storage', slug: 'cloud-storage' },
  { id: 'feat-6', name: 'AI/ML Capabilities', slug: 'ai-ml-capabilities' },
  { id: 'feat-7', name: 'Payment Integration', slug: 'payment-integration' },
  { id: 'feat-8', name: 'CRM Integration', slug: 'crm-integration' },
  { id: 'feat-9', name: '24/7 Support', slug: '247-support' },
  { id: 'feat-10', name: 'Custom Workflows', slug: 'custom-workflows' },
];

// Sample integrations
export const integrationsList: Integration[] = [
  { id: 'int-1', name: 'Stripe', slug: 'stripe', category: 'Payment' },
  { id: 'int-2', name: 'PayPal', slug: 'paypal', category: 'Payment' },
  { id: 'int-3', name: 'Salesforce', slug: 'salesforce', category: 'CRM' },
  { id: 'int-4', name: 'HubSpot', slug: 'hubspot', category: 'CRM' },
  { id: 'int-5', name: 'Shopify', slug: 'shopify', category: 'E-commerce' },
  { id: 'int-6', name: 'WooCommerce', slug: 'woocommerce', category: 'E-commerce' },
  { id: 'int-7', name: 'Slack', slug: 'slack', category: 'Communication' },
  { id: 'int-8', name: 'Microsoft Teams', slug: 'microsoft-teams', category: 'Communication' },
  { id: 'int-9', name: 'Google Workspace', slug: 'google-workspace', category: 'Productivity' },
  { id: 'int-10', name: 'Microsoft 365', slug: 'microsoft-365', category: 'Productivity' },
];

// Sample certifications (focus on Saudi-relevant ones)
export const certificationsList: Certification[] = [
  { id: 'cert-1', name: 'PDPL', slug: 'pdpl', description: 'Saudi Data Protection Law', category: 'Privacy' },
  { id: 'cert-2', name: 'SOC2', slug: 'soc2', description: 'Service Organization Control 2', category: 'Security' },
  { id: 'cert-3', name: 'ISO 27001', slug: 'iso27001', description: 'Information Security Management', category: 'Security' },
  { id: 'cert-4', name: 'ISO 9001', slug: 'iso9001', description: 'Quality Management System', category: 'Quality' },
  { id: 'cert-5', name: 'PCI DSS', slug: 'pci-dss', description: 'Payment Card Industry Data Security Standard', category: 'Security' },
  { id: 'cert-6', name: 'GDPR', slug: 'gdpr', description: 'General Data Protection Regulation', category: 'Privacy' },
];

// Sample badges
export const badgesList: Badge[] = [
  { id: 'badge-1', name: 'Saudi Made', slug: 'saudi-made', description: 'Products and services developed in Saudi Arabia', color: '#00D9A5' },
  { id: 'badge-2', name: 'Vision 2030', slug: 'vision-2030', description: 'Aligned with Saudi Vision 2030 goals', color: '#00A859' },
  { id: 'badge-3', name: 'Fast-Growing', slug: 'fast-growing', description: 'High growth company', color: '#FF6B9D' },
  { id: 'badge-4', name: 'Top 100', slug: 'top-100', description: 'Ranked among top 100 SaaS companies', color: '#8B5CF6' },
  { id: 'badge-5', name: 'Remote-First', slug: 'remote-first', description: 'Supports remote work culture', color: '#3B82F6' },
  { id: 'badge-6', name: 'Women-Led', slug: 'women-led', description: 'Founded/led by women', color: '#EC4899' },
];

// Sample companies with full relational data
export const companies: Company[] = [
  {
    id: 'comp-1',
    name: 'Absher',
    slug: 'absher',
    description: 'Ministry of Interior comprehensive digital platform providing 200+ government services to citizens and residents. Streamlines everything from visa processing to traffic violations with secure authentication.',
    founded_year: 2015,
    headquarters: 'الرياض',
    employees: '1,000-5,000',
    funding: 'صندوق التنمية الوطني (تمويل حكومي)',
    website: 'https://absher.sa',
    logo_url: 'https://placehold.co/200x200/12122A/FFFFFF?text=Absher',
    categories: [categories[0]], // GovTech
    features: [featuresList[2], featuresList[3], featuresList[8]],
    integrations: [],
    certifications: [certificationsList[0], certificationsList[2]],
    badges: [badgesList[0], badgesList[1]],
    pricing_plans: [
      {
        id: 'plan-1',
        company_id: 'comp-1',
        plan_name: 'حكومي - مجاني',
        price: 0,
        frequency: 'monthly',
        features_list: [
          '200+ خدمة حكومية',
          'دعم على مدار الساعة',
          'طباعة الشهادات',
          'التتبع المباشر',
        ],
        trial_days: 0,
        is_active: true,
      },
      {
        id: 'plan-2',
        company_id: 'comp-1',
        plan_name: 'مميز للأعمال',
        price: 499,
        frequency: 'monthly',
        features_list: [
          'كل خدمات الباقة الأساسية',
          'واجهة برمجية (API)',
          'تقارير متقدمة',
          'دعم الأولوية',
          'تدريب فريقك',
        ],
        trial_days: 14,
        is_active: true,
      },
    ],
  },
  {
    id: 'comp-2',
    name: 'Taqat',
    slug: 'taqat',
    description: 'Advanced employment and human resources platform connecting job seekers with companies using intelligent matching algorithms. Comprehensive talent management solution.',
    founded_year: 2018,
    headquarters: 'الرياض',
    employees: '100-500',
    funding: 'سلسلة A - 15 مليون دولار',
    website: 'https://taqat.sa',
    logo_url: 'https://placehold.co/200x200/12122A/FFFFFF?text=Taqat',
    categories: [categories[1]], // HR Tech
    features: [featuresList[0], featuresList[2], featuresList[6], featuresList[9]],
    integrations: [integrationsList[2], integrationsList[3]],
    certifications: [certificationsList[2]],
    badges: [badgesList[2]],
    pricing_plans: [
      {
        id: 'plan-3',
        company_id: 'comp-2',
        plan_name: 'Starter',
        price: 299,
        frequency: 'monthly',
        features_list: [
          'حتى 50 وظيفة مفتوحة',
          'بحث ذكي عنCV',
          'لوحة تحكم أساسية',
          'دعم بريدي إلكتروني',
        ],
        trial_days: 7,
        is_active: true,
      },
      {
        id: 'plan-4',
        company_id: 'comp-2',
        plan_name: 'Professional',
        price: 799,
        frequency: 'monthly',
        features_list: [
          'وظائف غير محدودة',
          'تقييم المهارات',
          'منصة تدريب',
          'تكامل HRIS',
          'تحليلات متقدمة',
          'دعم 24/7',
        ],
        trial_days: 14,
        is_active: true,
      },
    ],
  },
  {
    id: 'comp-3',
    name: 'Salla',
    slug: 'salla',
    description: 'Leading Saudi e-commerce platform empowering entrepreneurs to create online stores. Complete solution with payment processing, social media integration, and analytics.',
    founded_year: 2016,
    headquarters: 'جدة',
    employees: '500-1,000',
    funding: 'سلسلة B - 40 مليون دولار',
    website: 'https://salla.sa',
    logo_url: 'https://placehold.co/200x200/12122A/FFFFFF?text=Salla',
    categories: [categories[2]], // E-commerce
    features: [featuresList[0], featuresList[1], featuresList[4], featuresList[6], featuresList[7]],
    integrations: [integrationsList[4], integrationsList[5], integrationsList[0], integrationsList[1]],
    certifications: [certificationsList[2], certificationsList[4]],
    badges: [badgesList[0], badgesList[3]],
    pricing_plans: [
      {
        id: 'plan-5',
        company_id: 'comp-3',
        plan_name: 'مجاني',
        price: 0,
        frequency: 'monthly',
        features_list: [
          'متجر أساسي',
          'منتجات غير محدودة',
          'دعم عبر البريد',
          'إعدادات أساسية',
        ],
        trial_days: 0,
        is_active: true,
      },
      {
        id: 'plan-6',
        company_id: 'comp-3',
        plan_name: 'Pro',
        price: 149,
        frequency: 'monthly',
        features_list: [
          'كل مميزات الباقة المجانية',
          'عملاء 24/7',
          'إزالة branded',
          'تقارير متقدمة',
          'تكاملات متقدمة',
        ],
        trial_days: 14,
        is_active: true,
      },
    ],
  },
  {
    id: 'comp-4',
    name: 'HyperPay',
    slug: 'hyperpay',
    description: 'Comprehensive payment gateway providing secure payment solutions for e-commerce stores and applications. Offers digital wallets, subscription billing, and fraud prevention.',
    founded_year: 2014,
    headquarters: 'الرياض',
    employees: '200-500',
    funding: 'سلسلة B - 30 مليون دولار',
    website: 'https://hyperpay.com',
    logo_url: 'https://placehold.co/200x200/12122A/FFFFFF?text=HyperPay',
    categories: [categories[3]], // Fintech
    features: [featuresList[6], featuresList[9], featuresList[5]],
    integrations: [integrationsList[0], integrationsList[1], integrationsList[4], integrationsList[5]],
    certifications: [certificationsList[2], certificationsList[3], certificationsList[4]],
    badges: [badgesList[2]],
    pricing_plans: [
      {
        id: 'plan-7',
        company_id: 'comp-4',
        plan_name: 'Start',
        price: 0,
        frequency: 'monthly',
        features_list: [
          'بوابة دفع واحدة',
          'معاملات 1000/شهر',
          'دعم أساسي',
          'إعداد آمن',
        ],
        trial_days: 0,
        is_active: true,
      },
      {
        id: 'plan-8',
        company_id: 'comp-4',
        plan_name: 'Scale',
        price: 199,
        frequency: 'monthly',
        features_list: [
          'بوابات متعددة',
          'معاملات غير محدودة',
          'مكافحة احتيال متقدمة',
          'تكامل API كامل',
          'دعم مخصص',
        ],
        trial_days: 30,
        is_active: true,
      },
    ],
  },
  {
    id: 'comp-5',
    name: 'Ajmotly',
    slug: 'ajmotly',
    description: 'Smart shipment tracking and logistics management platform for businesses and individuals. Real-time tracking, commercial management, carrier integration, and delivery predictions.',
    founded_year: 2019,
    headquarters: 'الرياض',
    employees: '50-100',
    funding: 'سلسلة A - 10 مليون دولار',
    website: 'https://ajmotly.com',
    logo_url: 'https://placehold.co/200x200/12122A/FFFFFF?text=Ajmotly',
    categories: [categories[4]], // Logistics
    features: [featuresList[0], featuresList[2], featuresList[9]],
    integrations: [],
    certifications: [certificationsList[2]],
    badges: [badgesList[2]],
    pricing_plans: [
      {
        id: 'plan-9',
        company_id: 'comp-5',
        plan_name: 'Individual',
        price: 29,
        frequency: 'monthly',
        features_list: [
          'تتبع 20 شحنة/شهر',
          'إشعارات فورية',
          'تقرير بسيط',
          'دعم بريدي',
        ],
        trial_days: 7,
        is_active: true,
      },
      {
        id: 'plan-10',
        company_id: 'comp-5',
        plan_name: 'Business',
        price: 199,
        frequency: 'monthly',
        features_list: [
          'شحنات غير محدودة',
          'واجهة برمجية',
          'لوحة تحكم فريق',
          'تكامل مع شركات شحن',
          'تنبؤات التسليم',
          'دعم VIP',
        ],
        trial_days: 14,
        is_active: true,
      },
    ],
  },
  {
    id: 'comp-6',
    name: 'Foodics',
    slug: 'foodics',
    description: 'AI-powered comprehensive Point of Sale (POS) system for restaurants and cafes. Order management, data analytics, and Deliveroo integration.',
    founded_year: 2014,
    headquarters: 'جدة',
    employees: '500-1,000',
    funding: 'سلسلة B - 21 مليون دولار',
    website: 'https://foodics.com',
    logo_url: 'https://placehold.co/200x200/12122A/FFFFFF?text=Foodics',
    categories: [categories[5]], // Restaurant Tech
    features: [featuresList[1], featuresList[2], featuresList[5], featuresList[9]],
    integrations: [],
    certifications: [certificationsList[2], certificationsList[3]],
    badges: [badgesList[0], badgesList[3]],
    pricing_plans: [
      {
        id: 'plan-11',
        company_id: 'comp-6',
        plan_name: 'Basic',
        price: 199,
        frequency: 'monthly',
        features_list: [
          'نظام نقاط بيع',
          'إدارة الطلبات',
          'تقارير أساسية',
          'دعم هاتفي',
        ],
        trial_days: 14,
        is_active: true,
      },
      {
        id: 'plan-12',
        company_id: 'comp-6',
        plan_name: 'Enterprise',
        price: 499,
        frequency: 'monthly',
        features_list: [
          'كل مميزات Basic',
          'تحليلات ذكية AI',
          'إدارة فروع متعددة',
          'مвала مخصصة',
          'تدريب شامل',
          'دعم 24/7',
        ],
        trial_days: 30,
        is_active: true,
      },
    ],
  },
  {
    id: 'comp-7',
    name: 'Nana',
    slug: 'nana',
    description: 'Comprehensive shopping and grocery delivery app. Same-day delivery from local stores, subscription services, and cloud warehousing solutions.',
    founded_year: 2016,
    headquarters: 'جدة',
    employees: '200-500',
    funding: 'سلسلة C - 135 مليون دولار',
    website: 'https://nana.sa',
    logo_url: 'https://placehold.co/200x200/12122A/FFFFFF?text=Nana',
    categories: [categories[2]], // E-commerce
    features: [featuresList[1], featuresList[4], featuresList[9]],
    integrations: [],
    certifications: [certificationsList[0], certificationsList[2]],
    badges: [badgesList[2], badgesList[3]],
    pricing_plans: [
      {
        id: 'plan-13',
        company_id: 'comp-7',
        plan_name: 'نان سو',
        price: 0,
        frequency: 'monthly',
        features_list: [
          'توصيل مجاني فوق 100 ريال',
          'عروض حصرية',
          'برنامج نقاط',
        ],
        trial_days: 0,
        is_active: true,
      },
      {
        id: 'plan-14',
        company_id: 'comp-7',
        plan_name: 'نان برimo',
        price: 49,
        frequency: 'monthly',
        features_list: [
          'توصيل مجاني بدون حد أدنى',
          'خصومات 10%',
          'توصيل في ساعة',
          'إرجاع مجاني',
        ],
        trial_days: 30,
        is_active: true,
      },
    ],
  },
  {
    id: 'comp-8',
    name: 'Jahez',
    slug: 'jahez',
    description: 'Leading food delivery platform connecting restaurants with customers via fast delivery. Owns cloud kitchens, loyalty programs, and restaurant cloud services.',
    founded_year: 2016,
    headquarters: 'جدة',
    employees: '1,000-5,000',
    funding: 'سلسلة B - 36.5 مليون دولار',
    website: 'https://jahez.net',
    logo_url: 'https://placehold.co/200x200/12122A/FFFFFF?text=Jahez',
    categories: [categories[6]], // Food Delivery
    features: [featuresList[1], featuresList[2], featuresList[9]],
    integrations: [],
    certifications: [certificationsList[2]],
    badges: [badgesList[0], badgesList[3]],
    pricing_plans: [
      {
        id: 'plan-15',
        company_id: 'comp-8',
        plan_name: 'Customer - Free',
        price: 0,
        frequency: 'monthly',
        features_list: [
          'توصيل غير محدود',
          'خصومات على المطاعم',
          'برنامج ولاء Jahez Points',
        ],
        trial_days: 0,
        is_active: true,
      },
      {
        id: 'plan-16',
        company_id: 'comp-8',
        plan_name: 'Restaurant Cloud',
        price: 299,
        frequency: 'monthly',
        features_list: [
          'نظام إording',
          'إدارة القائمة',
          'تحليلات المبيعات',
          'إدارة several مخازن',
          'دعم فني',
        ],
        trial_days: 14,
        is_active: true,
      },
    ],
  },
  {
    id: 'comp-9',
    name: 'Tabby',
    slug: 'tabby',
    description: 'Buy Now Pay Later (BNPL) solution enabling customers to split payments without interest. Offers cards, merchant solutions, and wallet app.',
    founded_year: 2019,
    headquarters: 'الرياض',
    employees: '200-500',
    funding: 'سلسلة C - 150 مليون دولار',
    website: 'https://tabby.ai',
    logo_url: 'https://placehold.co/200x200/12122A/FFFFFF?text=Tabby',
    categories: [categories[3]], // Fintech
    features: [featuresList[0], featuresList[4], featuresList[6], featuresList[5]],
    integrations: [integrationsList[0], integrationsList[1], integrationsList[4], integrationsList[5]],
    certifications: [certificationsList[2], certificationsList[4]],
    badges: [badgesList[2], badgesList[3]],
    pricing_plans: [
      {
        id: 'plan-17',
        company_id: 'comp-9',
        plan_name: 'Individual - Free',
        price: 0,
        frequency: 'monthly',
        features_list: [
          'تقسيط 4 دفعات بدون فوائد',
          'حد ائ乙اني مرن',
          'تطبيق المحفظة',
          'دعم 24/7',
        ],
        trial_days: 0,
        is_active: true,
      },
    ],
  },
  {
    id: 'comp-10',
    name: 'Tamara',
    slug: 'tamara',
    description: 'Credit cards and Buy Now Pay Later solutions - innovative financial products for customers and merchants. Digital wallet and integrated payment solutions.',
    founded_year: 2018,
    headquarters: 'الرياض',
    employees: '100-200',
    funding: 'سلسلة B - 110 مليون دولار',
    website: 'https://tamara.co',
    logo_url: 'https://placehold.co/200x200/12122A/FFFFFF?text=Tamara',
    categories: [categories[3]], // Fintech
    features: [featuresList[0], featuresList[4], featuresList[6]],
    integrations: [integrationsList[0], integrationsList[1]],
    certifications: [certificationsList[0], certificationsList[2]],
    badges: [badgesList[2]],
    pricing_plans: [
      {
        id: 'plan-18',
        company_id: 'comp-10',
        plan_name: 'Tamara Card',
        price: 0,
        frequency: 'custom',
        features_list: [
          'بطاقة ائ乙انية',
          'تقسيط حتى 12 شهر',
          '0% فوائد',
          'نقاط مكافأة',
          'تأمين على المشتريات',
        ],
        trial_days: 0,
        is_active: true,
      },
      {
        id: 'plan-19',
        company_id: 'comp-10',
        plan_name: 'Merchant Solutions',
        price: 0,
        frequency: 'custom',
        features_list: [
          'Tabby مدمج',
          'زيادة التحويل 25%',
          'تقارير متقدمة',
          'إدارة risk',
          'دعم مخصص',
        ],
        trial_days: 0,
        is_active: true,
      },
    ],
  },
];

// Helper functions for filtering and searching
export function getAllCompanies(): Company[] {
  return companies;
}

export function getCompanyBySlug(slug: string): Company | undefined {
  return companies.find(c => c.slug === slug);
}

export function getCompaniesByCategory(categorySlug: string): Company[] {
  return companies.filter(c =>
    c.categories.some(cat => cat.slug === categorySlug)
  );
}

export function searchCompanies(query: string): Company[] {
  const lowerQuery = query.toLowerCase();
  return companies.filter(c =>
    c.name.toLowerCase().includes(lowerQuery) ||
    c.description.toLowerCase().includes(lowerQuery) ||
    c.categories.some(cat => cat.name.toLowerCase().includes(lowerQuery)) ||
    c.features.some(f => f.name.toLowerCase().includes(lowerQuery))
  );
}

export function filterCompaniesByCertification(certSlug: string): Company[] {
  return companies.filter(c =>
    c.certifications.some(cert => cert.slug === certSlug)
  );
}

export function filterCompaniesByEmployeeSize(size: string): Company[] {
  return companies.filter(c => c.employees === size);
}

export function filterCompaniesByPricing(pricing: string): Company[] {
  return companies.filter(c =>
    c.pricing_plans.some(plan => {
      if (pricing === 'Free') return plan.price === 0;
      if (pricing === 'Freemium') return plan.price > 0 && plan.price < 50;
      if (pricing === 'Subscription') return plan.frequency === 'monthly' || plan.frequency === 'yearly';
      if (pricing === 'Custom') return plan.frequency === 'custom';
      return false;
    })
  );
}

export function getAllCategories(): Category[] {
  return categories;
}

export function getAllCertifications(): Certification[] {
  return certificationsList;
}

export function getUniqueEmployeeSizes(): string[] {
  const sizes = new Set(companies.map(c => c.employees));
  return Array.from(sizes).sort();
}
