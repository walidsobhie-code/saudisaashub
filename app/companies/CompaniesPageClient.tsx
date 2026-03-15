'use client';

import { useState, useEffect, useMemo } from 'react';
import CompanyCard from '@/components/CompanyCard';
import { Company } from '@/lib/db-companies';

interface Props {
  initialCompanies: Company[];
  categories: Array<{ id: string; name: string; slug: string }>;
  certifications: Array<{ id: string; name: string; slug: string; category?: string }>;
  employeeSizes: string[];
}

export default function CompaniesPageClient({
  initialCompanies,
  categories,
  certifications,
  employeeSizes,
}: Props) {
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]);
  const [selectedEmployeeSizes, setSelectedEmployeeSizes] = useState<string[]>([]);
  const [selectedFundingStages, setSelectedFundingStages] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedFoundingYears, setSelectedFoundingYears] = useState<string[]>([]);
  const [selectedFundingAmounts, setSelectedFundingAmounts] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>(''); // '', 'newest', 'oldest', 'mostFunded', 'alphabetical'
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 20;

  // Derive filter options from data
  const availableCities = useMemo(() => {
    const citySet = new Set<string>();
    initialCompanies.forEach(c => {
      if (c.city) citySet.add(c.city);
    });
    return Array.from(citySet).sort();
  }, [initialCompanies]);

  const availableFundingStages = useMemo(() => {
    const stageSet = new Set<string>();
    initialCompanies.forEach(c => {
      if (c.funding_stage) stageSet.add(c.funding_stage);
    });
    return Array.from(stageSet).sort();
  }, [initialCompanies]);

  const foundingYearRanges = useMemo(() => [
    { value: 'before2015', label: 'قبل 2015', min: 0, max: 2014 },
    { value: '2015-2020', label: '2015-2020', min: 2015, max: 2020 },
    { value: '2021-2023', label: '2021-2023', min: 2021, max: 2023 },
    { value: '2024+', label: '2024+', min: 2024, max: Infinity },
  ], []);

  const fundingAmountRanges = useMemo(() => [
    { value: 'less1M', label: 'أقل من 1 مليون', min: 0, max: 1 },
    { value: '1-5M', label: '1-5 مليون', min: 1, max: 5 },
    { value: '5-10M', label: '5-10 مليون', min: 5, max: 10 },
    { value: '10M+', label: '10 مليون+', min: 10, max: Infinity },
  ], []);

  // Filter logic
  useEffect(() => {
    let filtered = initialCompanies;

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query)
      );
    }

    // Categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(c =>
        c.categories?.some(cat => selectedCategories.includes(cat.slug))
      );
    }

    // Certifications
    if (selectedCertifications.length > 0) {
      filtered = filtered.filter(c =>
        c.certifications?.some(cert => selectedCertifications.includes(cert.slug))
      );
    }

    // Employee sizes (multi-select)
    if (selectedEmployeeSizes.length > 0) {
      filtered = filtered.filter(c => c.employees && selectedEmployeeSizes.includes(c.employees));
    }

    // Funding stage
    if (selectedFundingStages.length > 0) {
      filtered = filtered.filter(c => c.funding_stage && selectedFundingStages.includes(c.funding_stage));
    }

    // City
    if (selectedCities.length > 0) {
      filtered = filtered.filter(c => c.city && selectedCities.includes(c.city));
    }

    // Founding year ranges
    if (selectedFoundingYears.length > 0) {
      filtered = filtered.filter(c => {
        if (!c.founded_year) return false;
        return selectedFoundingYears.some(rangeValue => {
          const range = foundingYearRanges.find(r => r.value === rangeValue);
          if (!range) return false;
          return c.founded_year! >= range.min && c.founded_year! <= range.max;
        });
      });
    }

    // Funding amount ranges
    if (selectedFundingAmounts.length > 0) {
      filtered = filtered.filter(c => {
        if (!c.funding_amount) return false;
        return selectedFundingAmounts.some(rangeValue => {
          const range = fundingAmountRanges.find(r => r.value === rangeValue);
          if (!range) return false;
          return c.funding_amount! >= range.min && c.funding_amount! <= range.max;
        });
      });
    }

    // Sorting
    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case 'newest':
            return (b.founded_year || 0) - (a.founded_year || 0);
          case 'oldest':
            return (a.founded_year || 0) - (b.founded_year || 0);
          case 'mostFunded':
            return (b.funding_amount || 0) - (a.funding_amount || 0);
          case 'alphabetical':
            return a.name.localeCompare(b.name, 'ar'); // Arabic locale
          default:
            return 0;
        }
      });
    }

    setCompanies(filtered);
    setCurrentPage(1);
  }, [
    initialCompanies,
    searchQuery,
    selectedCategories,
    selectedCertifications,
    selectedEmployeeSizes,
    selectedFundingStages,
    selectedCities,
    selectedFoundingYears,
    selectedFundingAmounts,
    sortBy,
    foundingYearRanges,
    fundingAmountRanges,
  ]);

  const [companies, setCompanies] = useState<Company[]>(initialCompanies);

  // Pagination
  const totalPages = Math.ceil(companies.length / companiesPerPage);
  const paginatedCompanies = companies.slice(
    (currentPage - 1) * companiesPerPage,
    currentPage * companiesPerPage
  );

  // Toggle helper for multi-select
  const toggleMulti = (value: string, current: string[], setter: (v: string[]) => void) => {
    if (current.includes(value)) {
      setter(current.filter(v => v !== value));
    } else {
      setter([...current, value]);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">دليل شركات SaaS السعودية</h1>
          <p className="text-text-secondary">استكشف 250+ شركة سعودية في مجال البرمجيات كخدمة</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-cosmic-gray border border-cosmic-border rounded-xl p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">تصفية الشركات</h3>
                {(searchQuery || selectedCategories.length > 0 || selectedCertifications.length > 0 ||
                  selectedEmployeeSizes.length > 0 || selectedFundingStages.length > 0 ||
                  selectedCities.length > 0 || selectedFoundingYears.length > 0 || selectedFundingAmounts.length > 0 || sortBy) && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategories([]);
                      setSelectedCertifications([]);
                      setSelectedEmployeeSizes([]);
                      setSelectedFundingStages([]);
                      setSelectedCities([]);
                      setSelectedFoundingYears([]);
                      setSelectedFundingAmounts([]);
                      setSortBy('');
                    }}
                    className="text-sm text-cosmic-accent hover:text-cosmic-gold transition-colors flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    مسح الكل
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm text-text-secondary mb-2">بحث</label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث عن شركة..."
                  className="w-full px-4 py-2 rounded-lg bg-cosmic-dark border border-cosmic-border text-white focus:border-accent-green focus:outline-none text-sm"
                />
              </div>

              {/* Sorting */}
              <div className="mb-6">
                <label className="block text-sm text-text-secondary mb-2">ترتيب حسب</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-cosmic-dark border border-cosmic-border text-white focus:border-accent-green focus:outline-none text-sm"
                >
                  <option value="">الافتراضي</option>
                  <option value="newest">الأحدث أولاً</option>
                  <option value="oldest">الأقدم أولاً</option>
                  <option value="mostFunded">الأكثر تمويلاً</option>
                  <option value="alphabetical">أبجدي</option>
                </select>
              </div>

              {/* Funding Stage */}
              {availableFundingStages.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm text-text-secondary mb-2">مرحلة التمويل</label>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                    {availableFundingStages.map((stage) => (
                      <label
                        key={stage}
                        className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-colors duration-200 ${
                          selectedFundingStages.includes(stage)
                            ? 'bg-accent-green/10 text-accent-green border border-accent-green/20'
                            : 'text-gray-400 hover:bg-cosmic-dark/50 hover:text-gray-300 border border-transparent'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedFundingStages.includes(stage)}
                          onChange={() => toggleMulti(stage, selectedFundingStages, setSelectedFundingStages)}
                          className="w-4 h-4 rounded border-cosmic-border bg-cosmic-dark text-accent-green focus:ring-accent-green"
                        />
                        <span className="text-sm">
                          {stage === 'pre-seed' && 'ما قبل البذرة'}
                          {stage === 'seed' && 'البذرة'}
                          {stage === 'series-a' && 'السلسلة أ'}
                          {stage === 'series-b' && 'السلسلة ب'}
                          {stage === 'series-c' && 'السلسلة ج'}
                          {stage === 'undisclosed' && 'غير معلن'}
                          {!['pre-seed', 'seed', 'series-a', 'series-b', 'series-c', 'undisclosed'].includes(stage)
                            ? stage
                            : null}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* City */}
              {availableCities.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm text-text-secondary mb-2">المدينة</label>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                    {availableCities.map((city) => (
                      <label
                        key={city}
                        className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-colors duration-200 ${
                          selectedCities.includes(city)
                            ? 'bg-accent-green/10 text-accent-green border border-accent-green/20'
                            : 'text-gray-400 hover:bg-cosmic-dark/50 hover:text-gray-300 border border-transparent'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedCities.includes(city)}
                          onChange={() => toggleMulti(city, selectedCities, setSelectedCities)}
                          className="w-4 h-4 rounded border-cosmic-border bg-cosmic-dark text-accent-green focus:ring-accent-green"
                        />
                        <span className="text-sm">{city}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Employee Count Ranges */}
              <div className="mb-6">
                <label className="block text-sm text-text-secondary mb-2">عدد الموظفين</label>
                <div className="space-y-2">
                  {[
                    { value: '1-10', label: '1-10' },
                    { value: '11-50', label: '11-50' },
                    { value: '51-200', label: '51-200' },
                    { value: '201-1000', label: '201-1000' },
                    { value: '1000+', label: '1000+' },
                  ].map((range) => (
                    <label
                      key={range.value}
                      className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-colors duration-200 ${
                        selectedEmployeeSizes.includes(range.value)
                          ? 'bg-accent-green/10 text-accent-green border border-accent-green/20'
                          : 'text-gray-400 hover:bg-cosmic-dark/50 hover:text-gray-300 border border-transparent'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedEmployeeSizes.includes(range.value)}
                        onChange={() => toggleMulti(range.value, selectedEmployeeSizes, setSelectedEmployeeSizes)}
                        className="w-4 h-4 rounded border-cosmic-border bg-cosmic-dark text-accent-green focus:ring-accent-green"
                      />
                      <span className="text-sm">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Founding Year Ranges */}
              <div className="mb-6">
                <label className="block text-sm text-text-secondary mb-2">سنة التأسيس</label>
                <div className="space-y-2">
                  {foundingYearRanges.map((range) => (
                    <label
                      key={range.value}
                      className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-colors duration-200 ${
                        selectedFoundingYears.includes(range.value)
                          ? 'bg-accent-green/10 text-accent-green border border-accent-green/20'
                          : 'text-gray-400 hover:bg-cosmic-dark/50 hover:text-gray-300 border border-transparent'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedFoundingYears.includes(range.value)}
                        onChange={() => toggleMulti(range.value, selectedFoundingYears, setSelectedFoundingYears)}
                        className="w-4 h-4 rounded border-cosmic-border bg-cosmic-dark text-accent-green focus:ring-accent-green"
                      />
                      <span className="text-sm">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Funding Amount Ranges */}
              <div className="mb-6">
                <label className="block text-sm text-text-secondary mb-2">مبلغ التمويل</label>
                <div className="space-y-2">
                  {fundingAmountRanges.map((range) => (
                    <label
                      key={range.value}
                      className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-colors duration-200 ${
                        selectedFundingAmounts.includes(range.value)
                          ? 'bg-accent-green/10 text-accent-green border border-accent-green/20'
                          : 'text-gray-400 hover:bg-cosmic-dark/50 hover:text-gray-300 border border-transparent'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedFundingAmounts.includes(range.value)}
                        onChange={() => toggleMulti(range.value, selectedFundingAmounts, setSelectedFundingAmounts)}
                        className="w-4 h-4 rounded border-cosmic-border bg-cosmic-dark text-accent-green focus:ring-accent-green"
                      />
                      <span className="text-sm">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {/* Results Count */}
            <div className="mb-6 text-text-secondary text-sm">
              عرض {paginatedCompanies.length} من {companies.length} شركة
            </div>

            {/* Companies Grid */}
            {paginatedCompanies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                {paginatedCompanies.map((company) => (
                  <a
                    key={company.id}
                    href={`/companies/${company.slug}`}
                    className="block"
                  >
                    <CompanyCard company={company} />
                  </a>
                ))}
              </div>
            ) : (
              <div className="bg-cosmic-gray rounded-xl border border-cosmic-border p-12 text-center">
                <p className="text-text-muted text-lg">لا توجد شركات تطابق معايير البحث</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-cosmic-gray border border-cosmic-border text-white disabled:opacity-50 disabled:cursor-not-allowed hover:border-accent-green/30 transition-all text-sm"
                >
                  السابق
                </button>

                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg transition-all text-sm ${
                        currentPage === page
                          ? 'bg-accent-green text-white'
                          : 'bg-cosmic-gray border border-cosmic-border text-white hover:border-accent-green/30'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-cosmic-gray border border-cosmic-border text-white disabled:opacity-50 disabled:cursor-not-allowed hover:border-accent-green/30 transition-all text-sm"
                >
                  التالي
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
