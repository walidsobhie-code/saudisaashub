'use client';

import { useState, useEffect } from 'react';
import CompanyCard from '@/components/CompanyCard';

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
  created_at: string;
  updated_at: string;
  // These may be empty arrays if relationships not loaded
  categories?: Array<{ id: string; name: string; slug: string }>;
  integrations?: Array<{ id: string; name: string; slug: string }>;
  certifications?: Array<{ id: string; name: string; slug: string; category?: string }>;
}

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
  const [companies, setCompanies] = useState<Company[]>(initialCompanies);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]);
  const [selectedEmployeeSize, setSelectedEmployeeSize] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 20;

  useEffect(() => {
    let filtered = initialCompanies;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (company) =>
          company.name.toLowerCase().includes(query) ||
          company.description.toLowerCase().includes(query)
      );
    }

    // Category filter (safe for empty categories)
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((company) => {
        const companyCats = company.categories || [];
        const catSlugs = companyCats.map((c) => c.slug);
        return selectedCategories.some((cat) => catSlugs.includes(cat));
      });
    }

    // Certification filter (safe for empty certifications)
    if (selectedCertifications.length > 0) {
      filtered = filtered.filter((company) => {
        const companyCerts = company.certifications || [];
        const certSlugs = companyCerts.map((cert) => cert.slug);
        return selectedCertifications.some((cert) => certSlugs.includes(cert));
      });
    }

    // Employee size filter
    if (selectedEmployeeSize) {
      filtered = filtered.filter((company) => company.employees === selectedEmployeeSize);
    }

    setCompanies(filtered);
    setCurrentPage(1); // Reset to page 1 on filter change
  }, [initialCompanies, searchQuery, selectedCategories, selectedCertifications, selectedEmployeeSize]);

  // Pagination
  const companiesPerPage = 20;
  const totalPages = Math.ceil(companies.length / companiesPerPage);
  const paginatedCompanies = companies.slice(
    (currentPage - 1) * companiesPerPage,
    currentPage * companiesPerPage
  );

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Filter Sidebar */}
        <aside className="w-1/4 float-left pr-8 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">فلاتر البحث</h2>

          {/* Search */}
          <div className="mb-6">
            <label className="block text-sm text-text-secondary mb-2">بحث</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن شركة..."
              className="w-full px-4 py-2 rounded-lg bg-card border border-white/10 text-white focus:border-accent-green focus:outline-none"
            />
          </div>

          {/* Employee Size */}
          <div className="mb-6">
            <label className="block text-sm text-text-secondary mb-2">عدد الموظفين</label>
            <select
              value={selectedEmployeeSize}
              onChange={(e) => setSelectedEmployeeSize(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-card border border-white/10 text-white focus:border-accent-green focus:outline-none"
            >
              <option value="">الكل</option>
              {employeeSizes.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          {/* Categories */}
          {categories.length > 0 ? (
            <div className="mb-6">
              <label className="block text-sm text-text-secondary mb-2">التصنيف</label>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label key={cat.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat.slug)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCategories([...selectedCategories, cat.slug]);
                        } else {
                          setSelectedCategories(selectedCategories.filter((c) => c !== cat.slug));
                        }
                      }}
                      className="ml-2 rounded border-white/10 text-accent-green focus:ring-accent-green"
                    />
                    <span className="text-sm text-white">{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>
          ) : (
            <div className="mb-6 text-text-muted text-sm">
              لا توجد تصنيفات متاحة حالياً
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 ? (
            <div className="mb-6">
              <label className="block text-sm text-text-secondary mb-2">الشهادات</label>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <label key={cert.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedCertifications.includes(cert.slug)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCertifications([...selectedCertifications, cert.slug]);
                        } else {
                          setSelectedCertifications(selectedCertifications.filter((c) => c !== cert.slug));
                        }
                      }}
                      className="ml-2 rounded border-white/10 text-accent-green focus:ring-accent-green"
                    />
                    <span className="text-sm text-white">{cert.name}</span>
                  </label>
                ))}
              </div>
            </div>
          ) : (
            <div className="mb-6 text-text-muted text-sm">
              لا توجد شهادات متاحة حالياً
            </div>
          )}
        </aside>

        {/* Company Grid */}
        <main className="w-3/4 float-left">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-white">دليل شركات SaaS السعودية</h1>
            <span className="text-text-secondary">
              {companies.length} شركة
            </span>
          </div>

          {companies.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-text-secondary">لا توجد شركات تطابق معايير البحث</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          )}
        </main>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8 mb-8">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-card border border-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:border-accent-green/30"
            >
              السابق
            </button>
            
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg ${
                    currentPage === page
                      ? 'bg-accent-green text-white'
                      : 'bg-card border border-white/10 text-white hover:border-accent-green/30'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-card border border-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:border-accent-green/30"
            >
              التالي
            </button>
          </div>
        )}

        <div className="clear-both" />
      </div>
    </div>
  );
}
