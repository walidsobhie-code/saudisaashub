'use client';

import { useState, useMemo } from 'react';
import { saudiSaaSCompanies } from '@/lib/saudi-saas-companies';

// Comparison criteria (features)
const criteria = [
  { key: 'pricing', label: 'نموذج التسعير' },
  { key: 'support', label: 'الدعم الفني' },
  { key: 'integration', label: 'التكاملات' },
  { key: 'language', label: 'اللغة' },
];

// Mock comparison data based on company category (simplified)
const getCompanyScore = (company: any, criterion: string): string => {
  const scores: Record<string, Record<string, string>> = {
    pricing: {
      'GovTech': 'Exclusive',
      'HR Tech': 'اشتراك شهري',
      'E-commerce': 'Freemium',
      'Fintech': 'اشتراك شهري',
      'Logistics': 'Houly based',
      'Restaurant Tech': 'اشتراك شهري',
      'Food Delivery': 'Freemium'
    },
    support: {
      'GovTech': '24/7',
      'HR Tech': 'ساعات العمل',
      'E-commerce': '24/7',
      'Fintech': '24/7',
      'Logistics': 'تذاكر',
      'Restaurant Tech': 'ساعات العمل',
      'Food Delivery': 'تذاكر'
    },
    integration: {
      'GovTech': 'API',
      'HR Tech': 'متوسط',
      'E-commerce': 'كثير',
      'Fintech': 'API',
      'Logistics': 'متوسط',
      'Restaurant Tech': 'كثير',
      'Food Delivery': 'كثير'
    },
    language: {
      'GovTech': 'عربية فقط',
      'HR Tech': 'الإنجليزية والعربية',
      'E-commerce': 'الإنجليزية والعربية',
      'Fintech': 'الإنجليزية والعربية',
      'Logistics': 'الإنجليزية والعربية',
      'Restaurant Tech': 'الإنجليزية والعربية',
      'Food Delivery': 'الإنجليزية والعربية'
    }
  };
  return scores[criterion]?.[company.category] || 'غير معروف';
};

export function CompanyComparer() {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const toggleCompany = (slug: string) => {
    setSelectedCompanies(prev => {
      if (prev.includes(slug)) {
        return prev.filter(s => s !== slug);
      } else if (prev.length < 3) {
        return [...prev, slug];
      }
      return prev; // Max 3 companies
    });
  };

  const selectedData = useMemo(() => {
    return saudiSaaSCompanies.filter(c => selectedCompanies.includes(c.slug));
  }, [selectedCompanies]);

  const handleCompare = () => {
    if (selectedCompanies.length >= 2) {
      setShowComparison(true);
    }
  };

  const resetComparison = () => {
    setShowComparison(false);
    setSelectedCompanies([]);
  };

  return (
    <section className="py-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">قارن بين شركات السعودية SaaS</h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            اختر ما يصل إلى 3 شركات لمقارنة ميزاتها وتقييماتها
          </p>
        </div>

        {/* Company Selection */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">اختر الشركات:</h3>
          <div className="flex flex-wrap gap-3">
            {saudiSaaSCompanies.map((company) => (
              <button
                key={company.slug}
                onClick={() => toggleCompany(company.slug)}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedCompanies.includes(company.slug)
                    ? 'bg-accent-green text-background'
                    : 'bg-card border border-white/10 text-text-secondary hover:border-accent-green/30'
                }`}
              >
                {company.name}
              </button>
            ))}
          </div>
          <p className="text-text-muted text-sm mt-2">
            {selectedCompanies.length}/3 محددة
          </p>
        </div>

        {/* Compare Button */}
        <div className="text-center mb-12">
          <button
            onClick={handleCompare}
            disabled={selectedCompanies.length < 2}
            className="px-8 py-3 rounded-xl bg-accent-green text-background font-bold hover:shadow-glow-green transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            قارن الآن
          </button>
        </div>

        {/* Comparison Table */}
        {showComparison && selectedData.length >= 2 && (
          <div className="bg-card rounded-xl border border-white/5 overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="p-4 text-right text-text-secondary text-sm">الميزة</th>
                    {selectedData.map(company => (
                      <th key={company.slug} className="p-4 text-center">
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-green/10 to-purple-500/10 flex items-center justify-center mb-2">
                            <span className="font-bold text-accent-green">
                              {company.name.charAt(0)}
                            </span>
                          </div>
                          <span className="text-white font-semibold">{company.name}</span>
                          <span className="text-xs text-text-muted">{company.category}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {criteria.map((criterion) => (
                    <tr key={criterion.key} className="border-b border-white/5 hover:bg-white/5">
                      <td className="p-4 text-text-secondary text-sm">{criterion.label}</td>
                      {selectedData.map(company => (
                        <td key={company.slug} className="p-4 text-center text-white text-sm">
                          {getCompanyScore(company, criterion.key)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Description Comparison */}
            <div className="p-6 border-t border-white/5">
              <h4 className="text-lg font-semibold text-white mb-4">الوصف</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {selectedData.map(company => (
                  <div key={company.slug} className="bg-background/50 rounded-lg p-4">
                    <h5 className="font-bold text-accent-green mb-2">{company.name}</h5>
                    <p className="text-text-secondary text-sm">{company.description}</p>
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-accent-green hover:underline text-sm"
                    >
                      زيارة الموقع
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {showComparison && (
          <div className="text-center">
            <button
              onClick={resetComparison}
              className="px-6 py-2 rounded-xl bg-card border border-white/10 text-text-secondary hover:text-white transition-all"
            >
              إعادة الاختيار
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
