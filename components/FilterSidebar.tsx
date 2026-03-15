'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { X } from 'lucide-react';
import { Company } from '@/lib/db-companies';

interface FilterSidebarProps {
  companies: Company[];
  className?: string;
}

export default function FilterSidebar({ companies, className = '' }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedFundingStage, setSelectedFundingStage] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string[]>([]);
  const [selectedEmployeeCount, setSelectedEmployeeCount] = useState<string[]>([]);
  const [selectedFoundingYear, setSelectedFoundingYear] = useState<string[]>([]);
  const [selectedFundingAmount, setSelectedFundingAmount] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('');

  // Derive filter options from data
  const availableCities = useMemo(() => {
    const citySet = new Set<string>();
    companies.forEach(c => {
      if (c.city) citySet.add(c.city);
    });
    return Array.from(citySet).sort();
  }, [companies]);

  const availableFundingStages = useMemo(() => {
    const stageSet = new Set<string>();
    companies.forEach(c => {
      if (c.funding_stage) stageSet.add(c.funding_stage);
    });
    return Array.from(stageSet).sort();
  }, [companies]);

  // Initialize from URL params
  useEffect(() => {
    const city = searchParams.get('city');
    const fundingStage = searchParams.get('fundingStage');
    const empCount = searchParams.get('employeeCount');
    const foundingYear = searchParams.get('foundingYear');
    const fundingAmount = searchParams.get('fundingAmount');
    const sort = searchParams.get('sort');

    if (city) setSelectedCity(city.split(','));
    if (fundingStage) setSelectedFundingStage(fundingStage.split(','));
    if (empCount) setSelectedEmployeeCount(empCount.split(','));
    if (foundingYear) setSelectedFoundingYear(foundingYear.split(','));
    if (fundingAmount) setSelectedFundingAmount(fundingAmount.split(','));
    if (sort) setSortBy(sort);
  }, [searchParams]);

  const updateFilters = (filterType: string, values: string[]) => {
    const params = new URLSearchParams(searchParams.toString());

    if (values.length > 0) {
      params.set(filterType, values.join(','));
    } else {
      params.delete(filterType);
    }

    router.push(`/companies?${params.toString()}`);
  };

  const updateSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('sort', value);
    } else {
      params.delete('sort');
    }
    router.push(`/companies?${params.toString()}`);
  };

  const toggleFilter = (
    filterType: 'city' | 'fundingStage' | 'employeeCount' | 'foundingYear' | 'fundingAmount',
    value: string,
    currentValues: string[]
  ) => {
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    updateFilters(filterType, newValues);
  };

  const clearFilters = () => {
    const params = new URLSearchParams();
    const q = searchParams.get('q');
    if (q) params.set('q', q);
    router.push(`/companies?${params.toString()}`);

    setSelectedCity([]);
    setSelectedFundingStage([]);
    setSelectedEmployeeCount([]);
    setSelectedFoundingYear([]);
    setSelectedFundingAmount([]);
    setSortBy('');
  };

  const hasActiveFilters = selectedCity.length > 0 ||
    selectedFundingStage.length > 0 ||
    selectedEmployeeCount.length > 0 ||
    selectedFoundingYear.length > 0 ||
    selectedFundingAmount.length > 0 ||
    sortBy;

  return (
    <div className={`bg-cosmic-gray border border-cosmic-border rounded-xl p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">تصفية الشركات</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-cosmic-accent hover:text-cosmic-gold transition-colors flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            مسح الكل
          </button>
        )}
      </div>

      {/* Sorting */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-300 mb-3">ترتيب حسب</h4>
        <select
          value={sortBy}
          onChange={(e) => updateSort(e.target.value)}
          className="w-full bg-cosmic-dark border border-cosmic-border rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cosmic-accent"
        >
          <option value="">الأحدث أولاً</option>
          <option value="newest">الأحدث</option>
          <option value="oldest">الأقدم</option>
          <option value="mostFunded">الأكثر تمويلاً</option>
          <option value="alphabetical">أبجدي</option>
        </select>
      </div>

      {/* Funding Stage */}
      {availableFundingStages.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-300 mb-3">مرحلة التمويل</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {availableFundingStages.map((stage) => (
              <label
                key={stage}
                className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-colors duration-200 ${
                  selectedFundingStage.includes(stage)
                    ? 'bg-cosmic-accent/10 text-cosmic-accent'
                    : 'text-gray-400 hover:bg-cosmic-dark/50 hover:text-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedFundingStage.includes(stage)}
                  onChange={() => toggleFilter('fundingStage', stage, selectedFundingStage)}
                  className="w-4 h-4 rounded border-cosmic-border bg-cosmic-dark text-cosmic-accent focus:ring-cosmic-accent"
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
          <h4 className="text-sm font-medium text-gray-300 mb-3">المدينة</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {availableCities.map((city) => (
              <label
                key={city}
                className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-colors duration-200 ${
                  selectedCity.includes(city)
                    ? 'bg-cosmic-accent/10 text-cosmic-accent'
                    : 'text-gray-400 hover:bg-cosmic-dark/50 hover:text-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedCity.includes(city)}
                  onChange={() => toggleFilter('city', city, selectedCity)}
                  className="w-4 h-4 rounded border-cosmic-border bg-cosmic-dark text-cosmic-accent focus:ring-cosmic-accent"
                />
                <span className="text-sm">{city}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Employee Count Ranges */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-300 mb-3">عدد الموظفين</h4>
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
                selectedEmployeeCount.includes(range.value)
                  ? 'bg-cosmic-accent/10 text-cosmic-accent'
                  : 'text-gray-400 hover:bg-cosmic-dark/50 hover:text-gray-300'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedEmployeeCount.includes(range.value)}
                onChange={() => toggleFilter('employeeCount', range.value, selectedEmployeeCount)}
                className="w-4 h-4 rounded border-cosmic-border bg-cosmic-dark text-cosmic-accent focus:ring-cosmic-accent"
              />
              <span className="text-sm">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Founding Year Ranges */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-300 mb-3">سنة التأسيس</h4>
        <div className="space-y-2">
          {[
            { value: 'before2015', label: 'قبل 2015' },
            { value: '2015-2020', label: '2015-2020' },
            { value: '2021-2023', label: '2021-2023' },
            { value: '2024+', label: '2024+' },
          ].map((range) => (
            <label
              key={range.value}
              className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-colors duration-200 ${
                selectedFoundingYear.includes(range.value)
                  ? 'bg-cosmic-accent/10 text-cosmic-accent'
                  : 'text-gray-400 hover:bg-cosmic-dark/50 hover:text-gray-300'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedFoundingYear.includes(range.value)}
                onChange={() => toggleFilter('foundingYear', range.value, selectedFoundingYear)}
                className="w-4 h-4 rounded border-cosmic-border bg-cosmic-dark text-cosmic-accent focus:ring-cosmic-accent"
              />
              <span className="text-sm">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Funding Amount Ranges */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-300 mb-3">مبلغ التمويل</h4>
        <div className="space-y-2">
          {[
            { value: 'less1M', label: 'أقل من 1 مليون', min: 0, max: 1 },
            { value: '1-5M', label: '1-5 مليون', min: 1, max: 5 },
            { value: '5-10M', label: '5-10 مليون', min: 5, max: 10 },
            { value: '10M+', label: '10 مليون+', min: 10, max: Infinity },
          ].map((range) => (
            <label
              key={range.value}
              className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-colors duration-200 ${
                selectedFundingAmount.includes(range.value)
                  ? 'bg-cosmic-accent/10 text-cosmic-accent'
                  : 'text-gray-400 hover:bg-cosmic-dark/50 hover:text-gray-300'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedFundingAmount.includes(range.value)}
                onChange={() => toggleFilter('fundingAmount', range.value, selectedFundingAmount)}
                className="w-4 h-4 rounded border-cosmic-border bg-cosmic-dark text-cosmic-accent focus:ring-cosmic-accent"
              />
              <span className="text-sm">{range.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
