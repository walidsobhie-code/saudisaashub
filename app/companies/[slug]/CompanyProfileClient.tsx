'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';
// Don't import Company from old lib - we'll use any/unknown or define a local interface
// import { Company } from '@/lib/companies';

interface Company {
  id: string;
  name: string;
  slug: string;
  description: string;
  founded_year: number | null;
  headquarters: string;
  employees: string;
  funding: string;
  website: string;
  logo_url: string | null;
  // Relationships may be empty
  categories?: Array<{ id: string; name: string; slug: string }>;
  features?: Array<{ id: string; name: string; slug: string }>;
  integrations?: Array<{ id: string; name: string; slug: string }>;
  certifications?: Array<{ id: string; name: string; slug: string; category?: string }>;
  badges?: Array<{ id: string; name: string; slug: string; color: string }>;
  pricing_plans?: Array<{
    id?: string;
    plan_name: string;
    price: number;
    frequency: string;
    features_list?: string[];
    is_active?: boolean;
    trial_days?: number;
  }>;
  screenshot_urls?: string[] | null;
  // New fields
  funding_stage?: 'pre-seed' | 'seed' | 'series-a' | 'series-b' | 'series-c' | 'undisclosed';
  funding_amount?: number;
  employee_count?: number;
  city?: string;
  verified?: boolean;
}

interface CompanyProfileClientProps {
  company: Company;
  allCompanies: Company[];
}

const COMPARE_STORAGE_KEY = 'saudisaashub_compare';

export default function CompanyProfileClient({
  company,
  allCompanies,
}: CompanyProfileClientProps) {
  const [compareList, setCompareList] = useState<string[]>([]);
  const [showCompareToast, setShowCompareToast] = useState(false);

  // Load compare list from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(COMPARE_STORAGE_KEY);
      if (stored) {
        try {
          setCompareList(JSON.parse(stored));
        } catch (e) {
          console.error('Failed to parse compare list:', e);
        }
      }
    }
  }, []);

  // Add to compare
  const addToCompare = useCallback(() => {
    if (compareList.includes(company.id)) {
      // Already in compare, maybe show message?
      return;
    }

    const newList = [...compareList, company.id];
    setCompareList(newList);
    localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(newList));
    setShowCompareToast(true);
    setTimeout(() => setShowCompareToast(false), 3000);
  }, [compareList, company.id]);

  // Remove from compare
  const removeFromCompare = useCallback(() => {
    const newList = compareList.filter(id => id !== company.id);
    setCompareList(newList);
    localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(newList));
  }, [compareList, company.id]);

  // Format currency
  const formatPrice = (price: number | null, frequency: string) => {
    if (price === null || price === undefined) return 'اتصل بنا';
    if (price === 0) return 'مجاني';
    return `${price.toLocaleString('ar-SA')} ريال${frequency === 'monthly' ? '/شهريًا' : frequency === 'yearly' ? '/سنويًا' : ''}`;
  };

  // Calculate total in compare
  const compareCount = compareList.length;

  return (
    <div className="min-h-screen relative">
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'الشركات', href: '/companies' },
            { label: company.name, href: `/companies/${company.slug}` },
          ]}
        />
      </div>

      {/* Compare Toast */}
      {showCompareToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-accent-green text-black px-6 py-3 rounded-full shadow-glow-green flex items-center gap-3 animate-bounce-in">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">تمت الإضافة للمقارنة</span>
        </div>
      )}

      {/* Compare Floating Button */}
      {compareCount > 0 && (
        <Link
          href="/companies"
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 px-6 py-4 rounded-full bg-gradient-to-r from-accent-pink to-accent-purple text-white font-bold shadow-glow-pink hover:shadow-glow-purple transition-shadow"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          قارن {compareCount} شركة
        </Link>
      )}

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Company Header */}
        <div className="bg-card rounded-2xl border border-white/5 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Logo */}
            <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-2xl overflow-hidden bg-elevated border border-white/10">
              {company.logo_url ? (
                <Image
                  src={company.logo_url}
                  alt={`${company.name} logo`}
                  fill
                  className="object-cover"
                  sizes="128px"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent-pink/20 to-accent-purple/20">
                  <span className="text-4xl font-bold text-white/60">
                    {company.name ? company.name.charAt(0) : '?'}
                  </span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
                  {company.name}
                  {company.verified && (
                    <div
                      className="p-1 rounded-full bg-accent-green/90 shadow-lg"
                      title="شركة موثقة"
                      dir="rtl"
                    >
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  )}
                </h1>
                {compareList.includes(company.id) ? (
                  <button
                    onClick={removeFromCompare}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-colors text-sm"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    في المقارنة
                  </button>
                ) : (
                  <button
                    onClick={addToCompare}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-green/20 text-accent-green border border-accent-green/30 hover:bg-accent-green/30 transition-colors text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    أضف للمقارنة
                  </button>
                )}
              </div>

              {/* Category badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {(company.categories || []).map(cat => (
                  <Link
                    key={cat.id}
                    href={`/companies?category=${cat.slug}`}
                    className="px-3 py-1 rounded-full bg-accent-purple/20 text-accent-purple text-sm border border-accent-purple/30 hover:bg-accent-purple/30 transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>

              {/* Meta info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                {company.founded_year && (
                  <div>
                    <span className="text-text-muted block mb-1">سنة التأسيس</span>
                    <span className="text-white font-medium">{company.founded_year}</span>
                  </div>
                )}
                {company.headquarters && (
                  <div>
                    <span className="text-text-muted block mb-1">المقر الرئيسي</span>
                    <span className="text-white font-medium">{company.headquarters}</span>
                  </div>
                )}
                {company.employees && (
                  <div>
                    <span className="text-text-muted block mb-1">عدد الموظفين</span>
                    <span className="text-white font-medium">{company.employees}</span>
                  </div>
                )}
                {company.funding && (
                  <div>
                    <span className="text-text-muted block mb-1">التمويل</span>
                    <span className="text-white font-medium">{company.funding}</span>
                  </div>
                )}
              </div>

              {/* Website link */}
              {company.website && (
                <div className="mt-4">
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-accent-green hover:text-accent-cyan transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    زيارة الموقع الرسمي
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section className="bg-card rounded-2xl p-8 border border-white/5">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <svg className="w-7 h-7 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                نظرة عامة
              </h2>
              <div className="text-text-secondary leading-loose text-lg">
                {company.description}
              </div>
            </section>

            {/* Features */}
            {(company.features || []).length > 0 && (
              <section className="bg-card rounded-2xl p-8 border border-white/5">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <svg className="w-7 h-7 text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  الميزات الرئيسية
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(company.features || []).map(feat => (
                    <div
                      key={feat.id}
                      className="flex items-start gap-3 p-4 rounded-xl bg-elevated border border-white/5"
                    >
                      <div className="w-6 h-6 rounded-full bg-accent-cyan/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-accent-cyan" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-white">{feat.name}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Integrations */}
            {(company.integrations || []).length > 0 && (
              <section className="bg-card rounded-2xl p-8 border border-white/5">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <svg className="w-7 h-7 text-accent-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  التكاملات
                </h2>
                <div className="flex flex-wrap gap-3">
                  {(company.integrations || []).map(int => (
                    <span
                      key={int.id}
                      className="px-4 py-2 rounded-xl bg-elevated border border-white/10 text-text-secondary"
                    >
                      {int.name}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Products/Services */}
            {(company.badges || company.categories) && (
              <section className="bg-card rounded-2xl p-8 border border-white/5">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <svg className="w-7 h-7 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  المنتجات والخدمات
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(company.categories || []).map(cat => (
                    <div
                      key={cat.id}
                      className="flex items-start gap-3 p-4 rounded-xl bg-elevated border border-white/5"
                    >
                      <div className="w-6 h-6 rounded-full bg-accent-purple/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-accent-purple" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v5.268l2.35-2.35a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L9 8.268V3a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1">{cat.name}</h4>
                        <p className="text-text-secondary text-sm">منتجات وخدمات متكاملة</p>
                      </div>
                    </div>
                  ))}
                  {(company.badges || []).slice(0, 4).map((badge, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-4 rounded-xl bg-elevated border border-white/5"
                    >
                      <div className="w-6 h-6 rounded-full bg-accent-purple/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-accent-purple" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1">{badge.name}</h4>
                        <p className="text-text-secondary text-sm">ميزة مميزة للشركة</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Leadership Team */}
            <section className="bg-card rounded-2xl p-8 border border-white/5">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <svg className="w-7 h-7 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                الفريق القيادي
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { role: 'المؤسس والمدير التنفيذي', bio: 'خبرة extensive في مجال التكنولوجيا والاستثمار في المنطقة العربية', initial: '✱' },
                  { role: 'رئيس المنتج', bio: 'خبير في تجربة المستخدم والتصميم، يركز على بناء منصة سهلة وبديهية', initial: '◆' },
                  { role: 'المدير التقني', bio: 'مهندس برمجيات ذو خبرة في تطوير التطبيقات الحديثة والبنى التحتية', initial: '⚡' },
                  { role: 'مدير المحتوى', bio: 'متخصص في التسويق والمحتوى التقني، يكتب تحليلات وأخبار عن مشهد SaaS السعودي', initial: '✎' },
                ].map((member, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-elevated border border-white/5">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent-green/30 to-accent-cyan/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl font-bold text-white/80">
                        {member.initial}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{member.role}</h4>
                      <p className="text-accent-green text-sm mb-2"></p>
                      <p className="text-text-secondary text-sm">{member.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Funding Timeline */}
            {(company.funding_stage || company.funding_amount) && (
              <section className="bg-card rounded-2xl p-8 border border-white/5">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <svg className="w-7 h-7 text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  الجدول الزمني للتمويل
                </h2>
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute right-4 top-0 bottom-0 w-0.5 bg-accent-cyan/30" />

                  <div className="space-y-8">
                    {company.founded_year && (
                      <div className="relative flex gap-4">
                        <div className="relative z-10 w-8 h-8 rounded-full bg-accent-cyan flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <div className="flex-1 bg-elevated rounded-xl p-4 border border-white/5">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-white font-semibold">تأسيس الشركة</h4>
                            <span className="text-accent-cyan text-sm">{company.founded_year}</span>
                          </div>
                          <p className="text-text-secondary text-sm">تم تأسيس الشركة في {company.headquarters}</p>
                        </div>
                      </div>
                    )}

                    {company.funding_stage && company.funding_amount && (
                      <div className="relative flex gap-4">
                        <div className="relative z-10 w-8 h-8 rounded-full bg-accent-green flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs">$</span>
                        </div>
                        <div className="flex-1 bg-elevated rounded-xl p-4 border border-white/5">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-white font-semibold">
                              {(company.funding_stage === 'pre-seed' && 'ما قبل البذرة') ||
                               (company.funding_stage === 'seed' && 'البذرة') ||
                               (company.funding_stage === 'series-a' && 'السلسلة أ') ||
                               (company.funding_stage === 'series-b' && 'السلسلة ب') ||
                               (company.funding_stage === 'series-c' && 'السلسلة ج') ||
                               company.funding_stage}
                            </h4>
                            <span className="text-accent-green text-sm font-bold">
                              {company.funding_amount}M
                            </span>
                          </div>
                          <p className="text-text-secondary text-sm">
                            جولة تمويلية بقيمة {company.funding}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* Related Companies */}
            <section className="bg-card rounded-2xl p-8 border border-white/5">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <svg className="w-7 h-7 text-accent-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                شركات ذات صلة
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {allCompanies
                  .filter(c => c.id !== company.id && c.categories?.some(cat => company.categories?.some(oc => oc.slug === cat.slug)))
                  .slice(0, 3)
                  .map(relatedCompany => (
                    <Link
                      key={relatedCompany.id}
                      href={`/companies/${relatedCompany.slug}`}
                      className="group bg-elevated rounded-xl p-4 border border-white/5 hover:border-accent-green/30 transition-all"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent-green/20 to-accent-cyan/20 flex items-center justify-center">
                          <span className="text-lg font-bold text-white/80">
                            {relatedCompany.name?.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-medium truncate group-hover:text-accent-green transition-colors">
                            {relatedCompany.name}
                          </h4>
                          <p className="text-text-muted text-xs">
                            {(relatedCompany.categories || []).map(c => c.name).join(' • ')}
                          </p>
                        </div>
                      </div>
                      <p className="text-text-secondary text-sm line-clamp-2">
                        {relatedCompany.description}
                      </p>
                    </Link>
                  ))}
              </div>
            </section>

            {/* Job Openings Placeholder */}
            <section className="bg-card rounded-2xl p-8 border border-white/5">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <svg className="w-7 h-7 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                فرصات التوظيف
              </h2>
              {company.website ? (
                <div className="text-center py-8">
                  <p className="text-text-secondary mb-4">تابع فرص العمل المتاحة على موقعنا الرسمي</p>
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent-green text-black font-semibold rounded-xl hover:bg-accent-cyan transition-colors"
                  >
                    زيارة صفحة الوظائف
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              ) : (
                <p className="text-text-muted text-center">لا توجد معلومات توظيف متاحة حالياً</p>
              )}
            </section>

            {/* Certifications & Badges */}
            <section className="bg-card rounded-2xl p-8 border border-white/5">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <svg className="w-7 h-7 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                الشهادات والشارات
              </h2>
              <div className="space-y-6">
                {(company.certifications || []).length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">الشهادات</h3>
                    <div className="flex flex-wrap gap-3">
                      {(company.certifications || []).map(cert => (
                        <div
                          key={cert.id}
                          className="px-4 py-2 rounded-xl bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan flex items-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {cert.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {(company.badges || []).length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">الشارات</h3>
                    <div className="flex flex-wrap gap-3">
                      {(company.badges || []).map(badge => (
                        <div
                          key={badge.id}
                          className="px-4 py-2 rounded-xl bg-accent-pink/10 border border-accent-pink/30 text-accent-pink flex items-center gap-2"
                          style={{ borderColor: badge.color ? `${badge.color}40` : undefined }}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                          {badge.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Pricing Plans */}
            {(company.pricing_plans || []).length > 0 && (
              <section className="bg-card rounded-2xl p-8 border border-white/5">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <svg className="w-7 h-7 text-accent-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  خطط التسعير
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-right py-4 px-4 text-text-muted font-medium">الخطة</th>
                        <th className="text-center py-4 px-4 text-text-muted font-medium">السعر</th>
                        <th className="text-center py-4 px-4 text-text-muted font-medium">الدورة</th>
                        <th className="text-left py-4 px-4 text-text-muted font-medium">الميزات</th>
                        <th className="text-center py-4 px-4 text-text-muted font-medium">فترة تجريبية</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(company.pricing_plans || [])
                        .filter(plan => plan.is_active)
                        .map((plan, idx) => (
                          <tr
                            key={plan.id}
                            className={`border-b border-white/5 ${idx % 2 === 0 ? 'bg-white/[0.02]' : ''}`}
                          >
                            <td className="py-4 px-4">
                              <span className="text-white font-semibold">{plan.plan_name}</span>
                            </td>
                            <td className="py-4 px-4 text-center">
                              <span className={`font-bold ${plan.price === 0 ? 'text-accent-green' : 'text-white'}`}>
                                {formatPrice(plan.price, plan.frequency)}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-center">
                              <span className="text-text-secondary text-sm">
                                {plan.frequency === 'monthly' ? 'شهري' :
                                 plan.frequency === 'yearly' ? 'سنوي' :
                                 plan.frequency === 'one-time' ? 'مرة واحدة' : 'مخصص'}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <ul className="space-y-2">
                                {(plan.features_list || []).map((feat, i) => (
                                  <li key={i} className="flex items-start gap-2 text-text-secondary text-sm">
                                    <svg className="w-4 h-4 text-accent-green mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    {feat}
                                  </li>
                                ))}
                              </ul>
                            </td>
                            <td className="py-4 px-4 text-center">
                              {(plan.trial_days || 0) > 0 ? (
                                <span className="text-accent-cyan font-medium">
                                  {plan.trial_days} يوم
                                </span>
                              ) : (
                                <span className="text-text-muted">-</span>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Screenshots Gallery */}
            {(company.screenshot_urls || []).length > 0 && (
              <section className="bg-card rounded-2xl p-8 border border-white/5">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <svg className="w-7 h-7 text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  معرض الصور
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(company.screenshot_urls || []).map((url, idx) => (
                    <a
                      key={idx}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative rounded-xl overflow-hidden border border-white/5 hover:border-accent-green/30 transition-all"
                    >
                      <div className="aspect-video relative">
                        <Image
                          src={url}
                          alt={`${company.name} screenshot ${idx + 1}`}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-card rounded-2xl p-6 border border-white/5 sticky top-24">
              <h3 className="text-lg font-bold text-white mb-4">معلومات سريعة</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-text-muted">التصنيف</span>
                  <div className="flex flex-wrap gap-2 justify-end">
                    {(company.categories || []).slice(0, 2).map(cat => (
                      <span key={cat.id} className="text-accent-purple text-sm">
                        {cat.name}
                      </span>
                    ))}
                  </div>
                </div>
                {company.founded_year && (
                  <div className="flex justify-between items-center py-3 border-b border-white/5">
                    <span className="text-text-muted">سنة التأسيس</span>
                    <span className="text-white">{company.founded_year}</span>
                  </div>
                )}
                {company.employees && (
                  <div className="flex justify-between items-center py-3 border-b border-white/5">
                    <span className="text-text-muted">الفريق</span>
                    <span className="text-white">{company.employees}</span>
                  </div>
                )}
                {company.funding && (
                  <div className="flex justify-between items-center py-3 border-b border-white/5">
                    <span className="text-text-muted">التمويل</span>
                    <span className="text-accent-green">{company.funding}</span>
                  </div>
                )}
                {(company.certifications || []).length > 0 && (
                  <div className="flex justify-between items-center py-3 border-b border-white/5">
                    <span className="text-text-muted">الشهادات</span>
                    <span className="text-accent-cyan">{(company.certifications || []).length}</span>
                  </div>
                )}
              </div>

              {/* Compare Button (Alternative) */}
              <div className="mt-6">
                {compareList.includes(company.id) ? (
                  <button
                    onClick={removeFromCompare}
                    className="w-full py-3 px-4 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-colors font-medium"
                  >
                    إزالة من المقارنة
                  </button>
                ) : (
                  <button
                    onClick={addToCompare}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-accent-green to-accent-cyan text-white font-bold hover:shadow-glow-green transition-shadow"
                  >
                    أضف للمقارنة
                  </button>
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
