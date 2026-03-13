// NOTE: The "Trusted Companies" section has been replaced with Platform Statistics
// to avoid false credibility claims. Real partnerships should be added when established.

// Platform statistics - honest metrics about the platform
export interface PlatformStat {
  value: string;
  label: string;
  labelEn: string;
}

export const platformStats: PlatformStat[] = [
  { value: '200+', label: 'شركة سعودية', labelEn: 'Saudi Companies' },
  { value: '50+', label: 'تصنيف', labelEn: 'Categories' },
  { value: '5000+', label: 'مستخدم نشط', labelEn: 'Active Users' },
  { value: '20+', label: 'مقالة متخصصة', labelEn: 'Expert Articles' }
];

// Retained for potential future partner logos (when real partnerships exist)
export interface TrustedCompany {
  name: string;
  logo: string;
  website: string;
  industry: string;
}

export const trustedCompanies: TrustedCompany[] = []; // Empty until real partnerships
