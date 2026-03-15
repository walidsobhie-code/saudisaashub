'use client';

import { useState, useMemo } from 'react';
import { Company } from '@/lib/db-companies';

interface FundingTrackerClientProps {
  companies: Company[];
  categories: string[];
  stages: string[];
  topCompanies: Company[];
  categoryFunding: Record<string, number>;
  stageFunding: Record<string, number>;
}

export default function FundingTrackerClient({
  companies,
  categories,
  stages,
  topCompanies,
  categoryFunding,
  stageFunding,
}: FundingTrackerClientProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStages, setSelectedStages] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<{ min: number; max: number }>({ min: 0, max: 2100 });
  const [searchQuery, setSearchQuery] = useState('');

  // Filter companies
  const filteredCompanies = useMemo(() => {
    return companies.filter(c => {
      // Category filter
      if (selectedCategories.length > 0) {
        const hasCategory = c.categories?.some(cat => selectedCategories.includes(cat.slug));
        if (!hasCategory) return false;
      }
      // Stage filter
      if (selectedStages.length > 0) {
        if (!c.funding_stage || !selectedStages.includes(c.funding_stage)) return false;
      }
      // Date filter (founded year)
      if (c.founded_year) {
        if (c.founded_year < dateRange.min || c.founded_year > dateRange.max) return false;
      }
      // Search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [companies, selectedCategories, selectedStages, dateRange, searchQuery]);

  // Recalculate aggregated data based on filtered companies
  const filteredCategoryFunding = useMemo(() => {
    const data: Record<string, number> = {};
    filteredCompanies.forEach(c => {
      c.categories?.forEach(cat => {
        const slug = cat.slug;
        data[slug] = (data[slug] || 0) + (c.funding_amount || 0);
      });
    });
    return data;
  }, [filteredCompanies]);

  const filteredStageFunding = useMemo(() => {
    const data: Record<string, number> = {};
    filteredCompanies.forEach(c => {
      const stage = c.funding_stage;
      if (stage) {
        data[stage] = (data[stage] || 0) + (c.funding_amount || 0);
      }
    });
    return data;
  }, [filteredCompanies]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleStage = (stage: string) => {
    setSelectedStages(prev =>
      prev.includes(stage) ? prev.filter(s => s !== stage) : [...prev, stage]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedStages([]);
    setDateRange({ min: 0, max: 2100 });
    setSearchQuery('');
  };

  const maxFunding = Math.max(
    ...Object.values(filteredCategoryFunding),
    ...Object.values(filteredStageFunding),
    1 // avoid divide by zero
  );

  const formatAmount = (amount: number) => `$${amount.toFixed(1)}M`;

  return (
    <div className="space-y-12">
      {/* Filters */}
      <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-6 border border-white/5">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">تصفية البيانات</h3>
          <button
            onClick={clearFilters}
            className="text-sm text-accent-green hover:text-accent-cyan transition-colors"
          >
            مسح الكل
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <label className="block text-sm text-text-secondary mb-2">بحث</label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن شركة..."
            className="w-full px-4 py-2 rounded-lg bg-cosmic-dark border border-cosmic-border text-white focus:border-accent-green focus:outline-none"
          />
        </div>

        {/* Categories */}
        <div className="mb-6">
          <label className="block text-sm text-text-secondary mb-2">التصنيفات</label>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedCategories.includes(cat)
                    ? 'bg-accent-green text-black'
                    : 'bg-cosmic-dark border border-cosmic-border text-gray-300 hover:border-accent-green/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Stages */}
        <div className="mb-6">
          <label className="block text-sm text-text-secondary mb-2">مرحلة التمويل</label>
          <div className="flex flex-wrap gap-2">
            {stages.map(stage => {
              const labels: Record<string, string> = {
                'pre-seed': 'ما قبل البذرة',
                'seed': 'البذرة',
                'series-a': 'السلسلة أ',
                'series-b': 'السلسلة ب',
                'series-c': 'السلسلة ج',
                'undisclosed': 'غير معلن',
              };
              return (
                <button
                  key={stage}
                  onClick={() => toggleStage(stage)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedStages.includes(stage)
                      ? 'bg-accent-green text-black'
                      : 'bg-cosmic-dark border border-cosmic-border text-gray-300 hover:border-accent-green/50'
                  }`}
                >
                  {labels[stage] || stage}
                </button>
              );
            })}
          </div>
        </div>

        {/* Founded year range */}
        <div className="mb-6">
          <label className="block text-sm text-text-secondary mb-2">سنة التأسيس</label>
          <div className="flex items-center gap-4">
            <input
              type="number"
              min="2000"
              max="2025"
              value={dateRange.min}
              onChange={(e) => setDateRange(r => ({ ...r, min: parseInt(e.target.value) || 2000 }))}
              placeholder="من"
              className="w-24 px-3 py-2 rounded-lg bg-cosmic-dark border border-cosmic-border text-white text-center"
            />
            <span className="text-gray-500">إلى</span>
            <input
              type="number"
              min="2000"
              max="2025"
              value={dateRange.max}
              onChange={(e) => setDateRange(r => ({ ...r, max: parseInt(e.target.value) || 2025 }))}
              placeholder="إلى"
              className="w-24 px-3 py-2 rounded-lg bg-cosmic-dark border border-cosmic-border text-white text-center"
            />
          </div>
        </div>
      </div>

      {/* Sharing */}
      <div className="bg-card/30 backdrop-blur-sm rounded-xl p-4 border border-white/5 text-center">
        <p className="text-text-muted text-sm mb-2">شارك هذه التحليل</p>
        <div className="flex justify-center gap-2">
          <ShareButton platform="twitter" url={typeof window !== 'undefined' ? window.location.href : ''} title="Funding Tracker - Saudi SaaS Hub" />
          <ShareButton platform="linkedin" url={typeof window !== 'undefined' ? window.location.href : ''} title="Funding Tracker" />
          <ShareButton platform="whatsapp" url={typeof window !== 'undefined' ? window.location.href : ''} title="Funding Tracker" />
          <ShareButton platform="telegram" url={typeof window !== 'undefined' ? window.location.href : ''} title="Funding Tracker" />
          <CopyButton url={typeof window !== 'undefined' ? window.location.href : ''} />
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Funding by Category */}
        <ChartCard title="التمويل حسب التصنيف">
          <div className="space-y-3">
            {Object.entries(filteredCategoryFunding)
              .sort(([,a], [,b]) => b - a)
              .map(([cat, amount]) => (
                <div key={cat}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">{cat}</span>
                    <span className="text-accent-cyan font-mono">{formatAmount(amount)}</span>
                  </div>
                  <div className="h-2 bg-cosmic-dark rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent-cyan to-accent-green transition-all duration-500"
                      style={{ width: `${(amount / maxFunding) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </ChartCard>

        {/* Funding by Stage */}
        <ChartCard title="التمويل حسب المرحلة">
          <div className="space-y-3">
            {Object.entries(filteredStageFunding)
              .sort(([,a], [,b]) => b - a)
              .map(([stage, amount]) => (
                <div key={stage}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">
                      {stage === 'pre-seed' && 'ما قبل البذرة'}
                      {stage === 'seed' && 'البذرة'}
                      {stage === 'series-a' && 'السلسلة أ'}
                      {stage === 'series-b' && 'السلسلة ب'}
                      {stage === 'series-c' && 'السلسلة ج'}
                      {stage === 'undisclosed' && 'غير معلن'}
                      {!['pre-seed','seed','series-a','series-b','series-c','undisclosed'].includes(stage) && stage}
                    </span>
                    <span className="text-accent-green font-mono">{formatAmount(amount)}</span>
                  </div>
                  <div className="h-2 bg-cosmic-dark rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent-green to-emerald-400 transition-all duration-500"
                      style={{ width: `${(amount / maxFunding) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </ChartCard>

        {/* Top Companies */}
        <ChartCard title="أعلى 10 شركات تمويلاً" className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topCompanies.slice(0, 10).map((company, idx) => (
              <div key={company.id} className="flex items-center gap-4 p-3 bg-cosmic-dark/50 rounded-xl border border-white/5">
                <div className="w-8 h-8 rounded-full bg-accent-cyan/20 flex items-center justify-center text-accent-cyan font-bold text-sm">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium truncate">{company.name}</h4>
                  <p className="text-text-muted text-xs truncate">
                    {(company.categories || []).map(c => c.name).join(' • ')}
                  </p>
                </div>
                <div className="text-accent-green font-mono font-bold">
                  ${(company.funding_amount || 0).toFixed(1)}M
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Count */}
      <div className="text-center text-text-muted text-sm mt-8">
        عرض {filteredCompanies.length} من {companies.length} شركة
      </div>
    </div>
  );
}

function ChartCard({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-card/30 backdrop-blur-sm rounded-2xl p-6 border border-white/5 ${className}`}>
      <h3 className="text-xl font-bold text-white mb-6">{title}</h3>
      {children}
    </div>
  );
}

function ShareButton({ platform, url, title }: { platform: string; url: string; title: string }) {
  const shareUrl = encodeURIComponent(url);
  const shareTitle = encodeURIComponent(title);

  const handles: Record<string, () => void> = {
    twitter: () => window.open(`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`, '_blank', 'width=600,height=400'),
    linkedin: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, '_blank', 'width=600,height=400'),
    whatsapp: () => window.open(`https://api.whatsapp.com/send?text=${shareTitle}%20${shareUrl}`, '_blank', 'width=600,height=400'),
    telegram: () => window.open(`https://t.me/share/url?url=${shareUrl}&text=${shareTitle}`, '_blank', 'width=600,height=400'),
  };

  const icons: Record<string, React.ReactNode> = {
    twitter: <><svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></>,
    linkedin: <><svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></>,
    whatsapp: <><svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></>,
    telegram: <><svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg></>,
  };

  return (
    <button
      onClick={handles[platform]}
      className={`w-10 h-10 flex items-center justify-center rounded-full transition-all shadow-lg ${
        platform === 'twitter' ? 'bg-[#1da1f2] hover:bg-[#1a8cd8] text-white' :
        platform === 'linkedin' ? 'bg-[#0077b5] hover:bg-[#006399] text-white' :
        platform === 'whatsapp' ? 'bg-[#25d366] hover:bg-[#20ba5a] text-white' :
        'bg-[#0088cc] hover:bg-[#0077aa] text-white'
      }`}
      aria-label={`شارك على ${platform}`}
    >
      {icons[platform]}
    </button>
  );
}

function CopyButton({ url }: { url: string }) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert('تم نسخ الرابط!');
    } catch {
      alert('فشل النسخ');
    }
  };

  return (
    <button
      onClick={copy}
      className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-gray-300 hover:bg-white/20 transition-all shadow-sm"
      aria-label="نسخ الرابط"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    </button>
  );
}
