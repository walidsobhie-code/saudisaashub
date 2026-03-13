// NOTE: The "Trusted Companies" section has been replaced with Platform Statistics
// to avoid false credibility claims. Real partnerships should be added when established.

// Platform statistics - honest metrics about the platform
export interface PlatformStat {
  value: string;
  label: string;
  labelEn: string;
}

export const platformStats: PlatformStat[] = [
  { value: '29+', label: 'شركة سعودية', labelEn: 'Saudi Companies' },
  { value: '10+', label: 'تصنيف', labelEn: 'Categories' },
  { value: '10+', label: 'مقالة متخصصة', labelEn: 'Expert Articles' },
  { value: '1', label: 'منصة موثوقة', labelEn: 'Trusted Platform' }
];

// Retained for potential future partner logos (when real partnerships exist)
export interface TrustedCompany {
  name: string;
  logo: string;
  website: string;
  industry: string;
}

export const trustedCompanies: TrustedCompany[] = []; // Empty until real partnerships
