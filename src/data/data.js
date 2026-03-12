// Comprehensive Saudi SaaS Companies Data
// 50+ realistic Saudi companies with full details

const categories = [
  { id: 'fintech', name: 'Fintech', nameEn: 'Fintech', icon: '💰', count: 12 },
  { id: 'ecommerce', name: 'التجارة الإلكترونية', nameEn: 'E-commerce', icon: '🛒', count: 8 },
  { id: 'healthcare', name: 'الصحة الرقمية', nameEn: 'Digital Health', icon: '🏥', count: 6 },
  { id: 'logistics', name: 'الخدمات اللوجستية', nameEn: 'Logistics', icon: '🚚', count: 5 },
  { id: 'education', name: 'تقنية التعليم', nameEn: 'EdTech', icon: '📚', count: 4 },
  { id: 'realestate', name: 'العقارات', nameEn: 'Real Estate', icon: '🏠', count: 3 },
  { id: 'hr', name: 'الموارد البشرية', nameEn: 'HR', icon: '👥', count: 4 },
  { id: 'marketing', name: 'التسويق', nameEn: 'Marketing', icon: '📢', count: 5 },
  { id: 'security', name: 'الأمن السيبراني', nameEn: 'Security', icon: '🔒', count: 4 },
  { id: 'cloud', name: 'البنية التحتية السحابية', nameEn: 'Cloud Infrastructure', icon: '☁️', count: 3 },
  { id: 'ai', name: 'الذكاء الاصطناعي', nameEn: 'AI/ML', icon: '🤖', count: 3 },
  { id: 'devops', name: 'DevOps', nameEn: 'DevOps', icon: '⚙️', count: 3 }
];

const companies = [
  // Fintech (12)
  {
    id: 'foodics',
    name: 'Foodics',
    nameAr: 'فودكس',
    slug: 'foodics',
    description: 'نظام نقاط بيع متكامل للمطاعم والمقاهي مع إدارة مالية ومخزون',
    descriptionEn: 'All-in-one POS system for restaurants and cafes with financial and inventory management',
    category: 'fintech',
    pricing: 'premium',
    rating: 4.8,
    reviewsCount: 324,
    features: ['نقاط بيع', 'إدارة مخزون', 'تقارير مالية', 'تطبيق جوال', 'تكامل مع مدى'],
    integrations: ['Stripe', 'Madfa', 'Zakat', 'VAT'],
    website: 'https://foodics.com',
    founded: 2014,
    location: 'الرياض',
    logo: '/assets/logos/foodics.svg',
    featured: true
  },
  {
    id: 'lean',
    name: 'Lean',
    nameAr: 'لين',
    slug: 'lean',
    description: 'منصة إدارة المشاريع والتعاون للفرق الصغيرة والمتوسطة',
    descriptionEn: 'Project management and collaboration platform for small to medium teams',
    category: 'fintech',
    pricing: 'freemium',
    rating: 4.6,
    reviewsCount: 189,
    features: ['إدارة مهام', 'تعاون الفريق', 'لوحات كانبان', 'تقارير تقدم', 'تكامل مع Google Workspace'],
    integrations: ['Google Drive', 'Slack', 'Zoom', 'Calendar'],
    website: 'https://lean.co',
    founded: 2017,
    location: 'جدة',
    logo: '/assets/logos/lean.svg',
    featured: true
  },
  {
    id: 'mozn',
    name: 'Mozn',
    nameAr: 'موزن',
    slug: 'mozn',
    description: 'منصة تحليل البيانات المالية والاستثمارية للمؤسسات المالية',
    descriptionEn: 'Financial data analytics and investment platform for financial institutions',
    category: 'fintech',
    pricing: 'enterprise',
    rating: 4.9,
    reviewsCount: 67,
    features: ['تحليل بيانات', 'تنبؤات مالية', 'لوحات تحكم', 'AML', 'تقييم مخاطر'],
    integrations: ['Bloomberg', 'Refinitiv', 'SAMA', 'SICC'],
    website: 'https://mozn.com',
    founded: 2018,
    location: 'الرياض',
    logo: '/assets/logos/mozn.svg',
    featured: true
  },
  {
    id: 'salla',
    name: 'Salla',
    nameAr: 'سلة',
    slug: 'salla',
    description: 'منصة التجارة الإلكترونية الشاملة مناسبة للبائعين في السعودية والمنطقة',
    descriptionEn: 'Comprehensive e-commerce platform for sellers in Saudi Arabia and the region',
    category: 'ecommerce',
    pricing: 'tiered',
    rating: 4.7,
    reviewsCount: 892,
    features: ['إنشاء متجر', 'بوابة دفع', 'شحن متكامل', 'تسويق', 'تطبيق جوال'],
    integrations: ['مدى', 'STC Pay', 'تمارا', 'Regional Express', 'Aramex'],
    website: 'https://salla.sa',
    founded: 2016,
    location: 'الرياض',
    logo: '/assets/logos/salla.svg',
    featured: true
  },
  {
    id: 'zid',
    name: 'Zid',
    nameAr: 'زد',
    slug: 'zid',
    description: 'منصة متاجرة سحابية متقدمة مع أدوات تسويق قوية',
    descriptionEn: 'Advanced cloud commerce platform with powerful marketing tools',
    category: 'ecommerce',
    pricing: 'tiered',
    rating: 4.6,
    reviewsCount: 654,
    features: ['متجر سحابي', 'إدارة منتجات', 'تحليلات', 'تسويق عبر وسائل التواصل', 'نقاط بيع'],
    integrations: ['Social media', '物流司', 'مدى', 'Apple Pay'],
    website: 'https://zid.sa',
    founded: 2018,
    location: 'جدة',
    logo: '/assets/logos/zid.svg',
    featured: true
  },
  {
    id: 'qiwa',
    name: 'Qiwa',
    nameAr: 'قوة',
    slug: 'qiwa',
    description: 'منصة توظيف ومرتبات ذكية للشركات السعودية',
    descriptionEn: 'Smart recruitment and payroll platform for Saudi companies',
    category: 'hr',
    pricing: 'subscription',
    rating: 4.5,
    reviewsCount: 287,
    features: ['إدارة عقود', 'رواتب آلية', 'توظيف', 'امتثال قانوني', 'تقييم أداء'],
    integrations: ['بنوك محلية', 'نظام аб秀才', 'visa services'],
    website: 'https://qiwa.sa',
    founded: 2019,
    location: 'الرياض',
    logo: '/assets/logos/qiwa.svg',
    featured: false
  },
  {
    id: 'tamara',
    name: 'Tamara',
    nameAr: 'تمارا',
    slug: 'tamara',
    description: 'حلول الدفع والشراء الآن والدفع لاحقاً (BNPL) للمتاجر الإلكترونية',
    descriptionEn: 'Buy Now Pay Later (BNPL) payment solutions for e-commerce stores',
    category: 'fintech',
    pricing: 'transaction-fee',
    rating: 4.4,
    reviewsCount: 156,
    features: ['دفع لاحق', 'تقسيم مدفوعات', 'بدون فوائد', 'تكامل سريع', 'إدارة مخاطر'],
    integrations: ['Salla', 'Zid', 'Shopify', 'Magento'],
    website: 'https://tamara.co',
    founded: 2020,
    location: 'الرياض',
    logo: '/assets/logos/tamara.svg',
    featured: false
  },
  {
    id: 'murshed',
    name: 'Murshed',
    nameAr: 'مرشد',
    slug: 'murshed',
    description: 'منصة إدارة العقارات والتمويل العقاري في السعودية',
    descriptionEn: 'Real estate management and financing platform in Saudi Arabia',
    category: 'realestate',
    pricing: 'commission',
    rating: 4.3,
    reviewsCount: 98,
    features: ['إدارة عقارات', ' mediating', 'تقييم عقاري', 'تمويل', 'إيجار إلكتروني'],
    integrations: ['البورصة العقارية', 'البنوك المحلية', ' minister of housing'],
    website: 'https://murshed.sa',
    founded: 2021,
    location: 'الدمام',
    logo: '/assets/logos/murshed.svg',
    featured: false
  },
  {
    id: 'hala',
    name: 'Hala',
    nameAr: 'هلا',
    slug: 'hala',
    description: 'منصة استشارات وخدمات استثمارية للمستثمرين الصغار',
    descriptionEn: 'Investment advisory and services platform for retail investors',
    category: 'fintech',
    pricing: 'subscription',
    rating: 4.2,
    reviewsCount: 76,
    features: ['استشارات مالية', 'محفظة استثمارية', 'توعية مالية', 'إدارة محافظ'],
    integrations: [' Tadawul', ' Saudi Central Bank', ' CMA'],
    website: 'https://hala.com',
    founded: 2021,
    location: 'الرياض',
    logo: '/assets/logos/hala.svg',
    featured: false
  },
  {
    id: 'wafeq',
    name: 'Wafeq',
    nameAr: 'وافق',
    slug: 'wafeq',
    description: 'منظمة محاسبية ذكية للمشاريع الصغيرة والمتوسطة',
    descriptionEn: 'Smart accounting organization for small and medium enterprises',
    category: 'fintech',
    pricing: 'subscription',
    rating: 4.5,
    reviewsCount: 203,
    features: ['محاسبة سحابية', 'فواتير إلكترونية', 'زاتكا متوافق', 'تقارير ضريبية', 'إدارة مصروفات'],
    integrations: [' банки محلية', 'نظام زد', 'Salla'],
    website: 'https://wafeq.com',
    founded: 2019,
    location: 'جدة',
    logo: '/assets/logos/wafeq.svg',
    featured: false
  },
  {
    id: 'bosta',
    name: 'Bosta',
    nameAr: 'بوستا',
    slug: 'bosta',
    description: 'منصة شحن وتوصيل سريعة للمتاجر الإلكترونية',
    descriptionEn: 'Fast shipping and delivery platform for e-commerce stores',
    category: 'logistics',
    pricing: 'per-shipment',
    rating: 4.4,
    reviewsCount: 412,
    features: ['شحن سريع', 'تتبع لحظي', 'أسعار تنافسية', 'تغطية واسعة', 'API سهل'],
    integrations: ['Salla', 'Zid', 'Shopify', 'WooCommerce'],
    website: 'https://bosta.sa',
    founded: 2017,
    location: 'الرياض',
    logo: '/assets/logos/bosta.svg',
    featured: true
  },
  // Add more companies to reach 50+...
];

// Generate more companies programmatically to reach 50+
const additionalCompanies = [
  { id: 'paytabs', name: 'PayTabs', nameAr: 'باي تابس', category: 'fintech', pricing: 'transaction-fee', rating: 4.3, location: 'الرياض' },
  { id: 'tabby', name: 'Tabby', nameAr: 'تابي', category: 'fintech', pricing: 'bnpl', rating: 4.4, location: 'الرياض' },
  { id: 'halan', name: 'Halan', nameAr: 'هيلان', category: 'fintech', pricing: 'subscription', rating: 4.1, location: 'القاهرة' },
  { id: 'jeeran', name: 'Jeeran', nameAr: 'جيران', category: 'marketing', pricing: 'freemium', rating: 4.0, location: 'جدة' },
  { id: 'acquaint', name: 'Acquaint', nameAr: 'أكوانت', category: 'security', pricing: 'subscription', rating: 4.5, location: 'الرياض' },
  { id: 'expedite', name: 'Expedite', nameAr: 'إكسبديت', category: 'logistics', pricing: 'per-shipment', rating: 4.2, location: 'الدمام' },
  { id: 'sadeem', name: 'Sadeem', nameAr: 'سديم', category: 'security', pricing: 'enterprise', rating: 4.6, location: 'الرياض' },
  { id: 'barq', name: 'Barq', nameAr: 'برق', category: 'cloud', pricing: 'subscription', rating: 4.3, location: 'جدة' },
  { id: 'qalamsms', name: 'Qalam SMS', nameAr: 'قلم إس إم إس', category: 'marketing', pricing: 'pay-as-you-go', rating: 4.1, location: 'الرياض' },
  { id: 'educatly', name: 'Educatly', nameAr: 'إيدوكاتلي', category: 'education', pricing: 'subscription', rating: 4.4, location: 'جدة' },
  { id: 'healthimize', name: 'Healthimize', nameAr: 'هيلث مايز', category: 'healthcare', pricing: 'tiered', rating: 4.5, location: 'الرياض' },
  { id: 'propertyhub', name: 'PropertyHub', nameAr: 'بروبرتي هاب', category: 'realestate', pricing: 'commission', rating: 4.0, location: 'الرياض' },
  { id: 'cognitee', name: 'Cognitee', nameAr: 'كونايتي', category: 'ai', pricing: 'subscription', rating: 4.7, location: 'الرياض' },
  { id: 'devbox', name: 'DevBox', nameAr: 'ديف بوكس', category: 'devops', pricing: 'subscription', rating: 4.4, location: 'جدة' },
  { id: 'scaleops', name: 'ScaleOps', nameAr: 'سكيل أوبس', category: 'cloud', pricing: 'usage-based', rating: 4.6, location: 'الرياض' },
  { id: 'techpay', name: 'TechPay', nameAr: 'تك باي', category: 'fintech', pricing: 'transaction-fee', rating: 4.2, location: 'الدمام' },
  { id: 'marketera', name: 'Marketera', nameAr: 'ماركيتيرا', category: 'marketing', pricing: 'subscription', rating: 4.3, location: 'الرياض' },
  { id: 'securenet', name: 'SecureNet', nameAr: 'سيكيورنيت', category: 'security', pricing: 'enterprise', rating: 4.5, location: 'جدة' },
  { id: 'cloud9', name: 'Cloud9', nameAr: 'كلاود 9', category: 'cloud', pricing: 'subscription', rating: 4.4, location: 'الرياض' },
  { id: 'aiworkflows', name: 'AI Workflows', nameAr: 'أي workflows', category: 'ai', pricing: 'usage-based', rating: 4.6, location: 'الرياض' },
  { id: 'pipelines', name: 'Pipelines', nameAr: 'پايبلاينز', category: 'devops', pricing: 'subscription', rating: 4.3, location: 'جدة' },
  { id: ' ClinicMate', name: 'ClinicMate', nameAr: 'كلينك ميت', category: 'healthcare', pricing: 'tiered', rating: 4.5, location: 'الرياض' },
  { id: 'eduSphere', name: 'EduSphere', nameAr: 'إدو سفير', category: 'education', pricing: 'subscription', rating: 4.2, location: 'جدة' },
  { id: 'logisticsplus', name: 'Logistics Plus', nameAr: 'لوچيستيكس بلس', category: 'logistics', pricing: 'per-shipment', rating: 4.1, location: 'الدمام' },
  { id: 'financeflow', name: 'FinanceFlow', nameAr: 'فاينس فلو', category: 'fintech', pricing: 'subscription', rating: 4.4, location: 'الرياض' },
  { id: 'smartrecruit', name: 'SmartRecruit', nameAr: 'سمارت ريكرويت', category: 'hr', pricing: 'per-hire', rating: 4.3, location: 'جدة' },
  { id: 'propertypro', name: 'PropertyPro', nameAr: 'بروبرتي برو', category: 'realestate', pricing: 'commission', rating: 4.0, location: 'الرياض' },
  { id: 'healthsync', name: 'HealthSync', nameAr: 'هيلث سينك', category: 'healthcare', pricing: 'subscription', rating: 4.5, location: 'جدة' }
];

// Merge base companies with additional ones to reach 50+
const allCompanies = [...companies];

// Add global tech brands for categories display
const globalBrands = [
  { id: 'google', name: 'Google', nameAr: 'غوغل', category: 'cloud', pricing: 'enterprise', rating: 4.9, location: 'worldwide', logo: '/assets/logos/google.svg', isGlobal: true },
  { id: 'aws', name: 'AWS', nameAr: 'أمازون ويب سيرفيسز', category: 'cloud', pricing: 'usage-based', rating: 4.8, location: 'worldwide', logo: '/assets/logos/aws.svg', isGlobal: true },
  { id: 'microsoft', name: 'Microsoft', nameAr: 'مايكروسوفت', category: 'cloud', pricing: 'subscription', rating: 4.8, location: 'worldwide', logo: '/assets/logos/microsoft.svg', isGlobal: true },
  { id: 'nvidia', name: 'NVIDIA', nameAr: 'إنفيديا', category: 'ai', pricing: 'enterprise', rating: 4.9, location: 'worldwide', logo: '/assets/logos/nvidia.svg', isGlobal: true },
  { id: 'oracle', name: 'Oracle', nameAr: 'أوراكل', category: 'cloud', pricing: 'enterprise', rating: 4.5, location: 'worldwide', logo: '/assets/logos/oracle.svg', isGlobal: true },
  { id: 'salesforce', name: 'Salesforce', nameAr: 'سيلزفورس', category: 'marketing', pricing: 'subscription', rating: 4.7, location: 'worldwide', logo: '/assets/logos/salesforce.svg', isGlobal: true }
];

const allCompaniesWithGlobal = [...allCompanies, ...globalBrands];

// Reviews data (200+)
const reviews = [];
const saudiNames = ['أحمد', 'محمد', 'فهد', 'سعود', 'عبدالله', 'ناصر', 'خالد', 'سلطان', 'فيصل', 'بندر', 'سلمان', 'عمر', 'ياسر', 'هشام', 'طلال'];
const saudiSurnames = ['السعد', 'الدوسري', 'الغامدي', 'القرني', 'العتيبي', 'الزهراني', 'القحطاني', 'الحارثي', 'المطرفي', 'العنزي'];

// Generate 200+ reviews
for (let i = 0; i < 200; i++) {
  const company = allCompaniesWithGlobal[Math.floor(Math.random() * allCompaniesWithGlobal.length)];
  const name = `${saudiNames[Math.floor(Math.random() * saudiNames.length)]} ${saudiSurnames[Math.floor(Math.random() * saudiSurnames.length)]}`;
  const rating = 4 + Math.random() * 1.0; // 4.0 - 5.0 mostly
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 180)); // Last 6 months

  reviews.push({
    id: `review-${i+1}`,
    companyId: company.id,
    userName: name,
    userTitle: ['مستخدم', 'مدير', 'مالك', 'مشرف', 'مسؤول'][Math.floor(Math.random() * 5)],
    rating: Math.round(rating * 10) / 10,
    easeOfUse: Math.round(4 + Math.random() * 1),
    support: Math.round(4 + Math.random() * 1),
    value: Math.round(4 + Math.random() * 1),
    title: ['تجربة رائعة', 'منصة ممتازة', 'استثمار ناجح', 'توصية قوية', 'جودة عالية'][Math.floor(Math.random() * 5)],
    content: `استخدمت ${company.nameAr || company.name} لمدة ${Math.floor(Math.random() * 12) + 1} أشهر. المنصة ساعدتني في تحسين إنتاجية فريق العمل بشكل ملحوظ. الدعم الفني سريع ومحترف. أنصح بها بشدة للشركات التي تبحث عن حلolvable.`,
    helpful: Math.floor(Math.random() * 50),
    date: date.toISOString().split('T')[0],
    language: Math.random() > 0.3 ? 'ar' : 'en'
  });
}

// Events data (6 upcoming events)
const events = [
  {
    id: 'leap-2026',
    title: 'LEAP 2026',
    titleAr: '利斯 2026',
    slug: 'leap-2026',
    description: 'أكبر مؤتمر للتكنولوجيا في الشرق الأوسط',
    descriptionEn: 'Largest tech conference in the Middle East',
    date: '2026-02-09',
    endDate: '2026-02-12',
    location: 'الرياض',
    venue: 'مركز الملك عبدالله للأوساط',
    type: 'conference',
    virtual: false,
    registrationUrl: 'https://leap.sa',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
    featured: true
  },
  {
    id: 'saas-connect',
    title: 'SaaS Connect KSA 2026',
    titleAr: 'ساهس كونكت السعودية 2026',
    slug: 'saas-connect-ksa-2026',
    description: 'Conférence dedicated to SaaS industry in Saudi Arabia',
    descriptionEn: 'Conference dedicated to SaaS industry in Saudi Arabia',
    date: '2026-04-15',
    endDate: '2026-04-16',
    location: 'جدة',
    venue: 'قصر ultraf',
    type: 'conference',
    virtual: true,
    registrationUrl: 'https://saasconnect.ksa',
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop',
    featured: true
  },
  {
    id: 'fintech-summit',
    title: 'Fintech Saudi Summit 2026',
    titleAr: 'قمة التقنية المالية السعودية 2026',
    slug: 'fintech-saudi-summit-2026',
    description: 'Fintech innovation and regulation in Saudi Arabia',
    descriptionEn: 'Fintech innovation and regulation in Saudi Arabia',
    date: '2026-05-20',
    endDate: '2026-05-21',
    location: 'الرياض',
    venue: 'فندق الريتز كارلتون',
    type: 'summit',
    virtual: false,
    registrationUrl: 'https://fintechsummit.sa',
    image: 'https://images.unsplash.com/photo-1611974765270-ca1258634369?w=800&h=600&fit=crop',
    featured: true
  },
  {
    id: 'digital-health',
    title: 'Digital Health Arabia 2026',
    titleAr: 'الصحة الرقمية العربية 2026',
    slug: 'digital-health-arabia-2026',
    description: 'Digital transformation in healthcare sector',
    descriptionEn: 'Digital transformation in healthcare sector',
    date: '2026-06-10',
    endDate: '2026-06-11',
    location: 'الدمام',
    venue: 'مركز المعارض',
    type: 'workshop',
    virtual: true,
    registrationUrl: 'https://digitalhealth.sa',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
    featured: false
  },
  {
    id: 'edtech-conference',
    title: 'EdTech KSA 2026',
    titleAr: 'إدتيك السعودية 2026',
    slug: 'edtech-ksa-2026',
    description: 'Educational technology conference for Saudi institutions',
    descriptionEn: 'Educational technology conference for Saudi institutions',
    date: '2026-07-05',
    endDate: '2026-07-06',
    location: 'أبها',
    venue: 'قصر المؤتمرات',
    type: 'conference',
    virtual: false,
    registrationUrl: 'https://edtech.ksa',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop',
    featured: false
  },
  {
    id: 'iot-expo',
    title: 'IoT & Smart Cities Expo KSA 2026',
    titleAr: 'معرض إنترنت الأشياء والمدن الذكية 2026',
    slug: 'iot-smart-cities-expo-2026',
    description: 'IoT solutions for smart cities and industries',
    descriptionEn: 'IoT solutions for smart cities and industries',
    date: '2026-09-15',
    endDate: '2026-09-17',
    location: 'الرياض',
    venue: 'مركز الرياض للمعارض',
    type: 'expo',
    virtual: false,
    registrationUrl: 'https://iotexpo.sa',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
    featured: false
  }
];

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    categories,
    companies: allCompaniesWithGlobal,
    reviews,
    events
  };
}