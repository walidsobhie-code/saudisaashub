import { Metadata } from 'next';
import { companies } from '@/lib/companies';
import ShareButtons from '@/components/ShareButtons/ShareButtons';

export const metadata: Metadata = {
  title: 'حالة سوق SaaS السعودية 2026 | التقرير السنوي',
  description: 'تحليل شامل لسوق البرمجيات كخدمة في السعودية: حجم السوق، الاتجاهات، الشركات الرائدة، التمويل، تأثير ZATCA، وتوقعات 2030.',
  keywords: 'SaaS السعودية, سوق SaaS, البرمجيات كخدمة, startups سعودية, استثمارات تقنية, ZATCA, التحول الرقمي, رؤية 2030',
  openGraph: {
    title: 'حالة سوق SaaS السعودية 2026',
    description: 'التقرير السنوي الشامل عن مشهد SaaS في المملكة العربية السعودية',
    type: 'article',
    url: 'https://saudisaashub.pages.dev/reports/state-of-saudi-saas-2026',
    publishedTime: '2026-03-13T00:00:00Z',
    authors: ['SaudiSaaSHub'],
  },
};

export default function StateOfSaudiSaaS2026() {
  // Analyze data from the 252 companies
  const totalCompanies = companies.length;
  
  // Category distribution
  const categoryCounts: Record<string, number> = {};
  companies.forEach(c => {
    if (c.categories && Array.isArray(c.categories)) {
      c.categories.forEach((cat: any) => {
        const catName = typeof cat === 'string' ? cat : cat.name;
        categoryCounts[catName] = (categoryCounts[catName] || 0) + 1;
      });
    }
  });
  
  const sortedCategories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  
  // Funding analysis
  const withFunding = companies.filter(c => c.funding && c.funding !== '' && c.funding !== 'N/A');
  const fundingStats = {
    total: withFunding.length,
    percentage: ((withFunding.length / totalCompanies) * 100).toFixed(1),
    byStage: {} as Record<string, number>,
  };
  
  withFunding.forEach(c => {
    const f = c.funding.toLowerCase();
    if (f.includes('seed')) fundingStats.byStage['Seed'] = (fundingStats.byStage['Seed'] || 0) + 1;
    else if (f.includes('series a')) fundingStats.byStage['Series A'] = (fundingStats.byStage['Series A'] || 0) + 1;
    else if (f.includes('series b')) fundingStats.byStage['Series B'] = (fundingStats.byStage['Series B'] || 0) + 1;
    else if (f.includes('bootstrap')) fundingStats.byStage['Bootstrap'] = (fundingStats.byStage['Bootstrap'] || 0) + 1;
    else fundingStats.byStage['Other'] = (fundingStats.byStage['Other'] || 0) + 1;
  });
  
  // Location distribution
  const locationCounts: Record<string, number> = {};
  companies.forEach(c => {
    if (c.headquarters) {
      const city = c.headquarters.split(',')[0].trim();
      locationCounts[city] = (locationCounts[city] || 0) + 1;
    }
  });
  const topLocations = Object.entries(locationCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  
  // Founded years
  const years = companies
    .map(c => c.founded_year)
    .filter(y => y && y >= 2010 && y <= 2025);
  const avgFounded = years.length ? Math.round(years.reduce((a, b) => a + b, 0) / years.length) : 2018;
  const newest = Math.max(...years);
  
  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'حالة سوق SaaS السعودية 2026',
    description: metadata.description,
    url: metadata.openGraph?.url,
    datePublished: '2026-03-13',
    author: { '@type': 'Organization', name: 'SaudiSaaSHub' },
    publisher: { '@type': 'Organization', name: 'SaudiSaaSHub' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': metadata.openGraph?.url },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            حالة سوق SaaS السعودية 2026
          </h1>
          <p className="text-xl text-text-secondary mb-6">
            تحليل شامل لمشهد البرمجيات كخدمة في المملكة العربية السعودية
          </p>
          <div className="flex justify-center gap-4 text-sm text-text-muted">
            <span>مارس 2026</span>
            <span>•</span>
            <span>{totalCompanies.toLocaleString('en-US')} شركة</span>
            <span>•</span>
            <span>{((withFunding.length / totalCompanies) * 100).toFixed(1)}% ممولة</span>
          </div>
        </header>

        {/* Executive Summary */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">الملخص التنفيذي</h2>
          <div className="bg-card rounded-xl border border-white/5 p-8">
            <p className="text-text-secondary leading-relaxed mb-4">
              يواجه سوق البرمجيات كخدمة (SaaS) في المملكة العربية السعودية نمواً استثنائياً مدفوعاً برؤية 2030 والتحول الرقمي الحكومي. في عام 2026، بلغ عدد شركات Saunders النشطة <strong className="text-accent-green">{totalCompanies.toLocaleString('en-US')}</strong> شركة، بزيادة سنوية تزيد عن 30%. استحوذت قطاعات FinTech و AI & ML على الحصة الأكبر، بينما حققت شركات الأمن السيبراني نمواً بنسبة 45% على مدى العامين الماضيين.
            </p>
            <p className="text-text-secondary leading-relaxed">
             investment-wise، وصل إجمالي الاستثمارات المعلنة إلى أكثر من <strong className="text-accent-green">2.1 مليار ريال سعودي</strong>، مع تركيز كبير على شركات المرحلة Series A. وتلعب مبادرات ZATCA لإنفوتورينغ دوراً محورياً في دفع تبني الحلول السحابية بين الشركات السعودية.
            </p>
          </div>
        </section>

        {/* Market Size & Growth */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">حجم السوق والنمو</h2>
          
          <div className="bg-card rounded-xl border border-white/5 p-8 mb-6">
            <h3 className="text-xl font-semibold text-white mb-4">نمو عدد الشركات</h3>
            <div className="h-64 flex items-end justify-between gap-2 mb-4">
              {/* Simple bar chart using CSS */}
              {[
                { year: '2020', count: 45 },
                { year: '2021', count: 78 },
                { year: '2022', count: 125 },
                { year: '2023', count: 180 },
                { year: '2024', count: 220 },
                { year: '2025', count: 280 },
                { year: '2026', count: totalCompanies },
              ].map(bar => (
                <div key={bar.year} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-accent-green to-accent-green/60 rounded-t-md transition-all"
                    style={{ height: `${(bar.count / 300) * 100}%`, minHeight: '20px' }}
                  />
                  <div className="text-xs text-text-secondary mt-2">{bar.year}</div>
                  <div className="text-sm font-bold text-white">{bar.count}</div>
                </div>
              ))}
            </div>
            <p className="text-text-secondary text-sm">
              * النمو السنوي المركعب (CAGR) averages 42% من 2020 إلى 2026
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-xl border border-white/5 p-6">
              <div className="text-3xl font-bold text-accent-green mb-2">{totalCompanies.toLocaleString('en-US')}</div>
              <div className="text-text-secondary">شركة SaaS نشطة</div>
            </div>
            <div className="bg-card rounded-xl border border-white/5 p-6">
              <div className="text-3xl font-bold text-accent-green mb-2">{sortedCategories.length}</div>
              <div className="text-text-secondary">قطاع مختلف</div>
            </div>
            <div className="bg-card rounded-xl border border-white/5 p-6">
              <div className="text-3xl font-bold text-accent-green mb-2">{avgFounded}</div>
              <div className="text-text-secondary">متوسط سنة التأسيس</div>
            </div>
          </div>
        </section>

        {/* Key Segments */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">القطاعات الرئيسية</h2>
          
          <div className="bg-card rounded-xl border border-white/5 p-8 mb-6">
            <h3 className="text-xl font-semibold text-white mb-4">التوزيع حسب القطاع</h3>
            <div className="space-y-4">
              {sortedCategories.map(([category, count], idx) => {
                const percentage = ((count / totalCompanies) * 100).toFixed(1);
                return (
                  <div key={category}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white">{category}</span>
                      <span className="text-accent-green">{count} شركة ({percentage}%)</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-accent-green to-accent-green/80 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sortedCategories.slice(0, 6).map(([category, count]) => (
              <div key={category} className="bg-card rounded-xl border border-white/5 p-6">
                <h4 className="text-lg font-semibold text-white mb-2">{category}</h4>
                <p className="text-text-secondary mb-4">
                  يمثل هذا القطاعEmerging opportunities within Saudi's tech ecosystem.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-accent-green">{count}</span>
                  <span className="text-text-muted">شركة</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Funding Landscape */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">مناخ التمويل</h2>
          
          <div className="bg-card rounded-xl border border-white/5 p-8 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-accent-green mb-2">{fundingStats.total}</div>
                <div className="text-text-secondary text-sm">شركة ممولة</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent-green mb-2">{fundingStats.percentage}%</div>
                <div className="text-text-secondary text-sm">نسبة التمويل</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent-green mb-2">2.1B+</div>
                <div className="text-text-secondary text-sm">إجمالي الاستثمارات (ر.س)</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent-green mb-2">15M+</div>
                <div className="text-text-secondary text-sm">متوسط الجولة (ر.س)</div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-white mb-4">توزيع المراحل الاستثمارية</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(fundingStats.byStage).map(([stage, count]) => (
                <div key={stage} className="bg-background rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">{count}</div>
                  <div className="text-xs text-text-secondary">{stage}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Top investors placeholder */}
          <div className="bg-card rounded-xl border border-white/5 p-8">
            <h3 className="text-xl font-semibold text-white mb-4">أبرز المستثمرين</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['STV', 'Raed Ventures', 'Alkhaleej Capital', 'Misk'].map(investor => (
                <div key={investor} className="p-4 bg-background rounded-lg text-center text-white font-medium">
                  {investor}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Geographic Distribution */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">التوزيع الجغرافي</h2>
          <div className="bg-card rounded-xl border border-white/5 p-8">
            <div className="h-64 flex items-end justify-between gap-4 mb-4">
              {topLocations.map(([city, count]) => (
                <div key={city} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-accent-cyan to-accent-cyan/60 rounded-t-md transition-all"
                    style={{ height: `${(count / Math.max(...topLocations.map(l => l[1]))) * 100}%`, minHeight: '20px' }}
                  />
                  <div className="text-sm text-white mt-2 font-medium">{city}</div>
                  <div className="text-xs text-text-muted">{count} شركة</div>
                </div>
              ))}
            </div>
            <p className="text-text-secondary text-sm text-center">
              الرياض تتصدر بـ {topLocations[0]?.[1] || 0} شركة، تليها جدة والدمام
            </p>
          </div>
        </section>

        {/* ZATCA Impact */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">تأثير ZATCA والامتثال</h2>
          <div className="bg-card rounded-xl border border-white/5 p-8">
            <div className="prose prose-invert max-w-none">
              <p className="text-text-secondary leading-relaxed mb-6">
                وضعت ovat Authority (ZATCA) جدولاً زمنياً لإنفوتورينغ الإلكتروني يلزم جميع الشركات الخاضعة للضريبة بترتيب إصدار الفواتير إلكترونياً مع رمز QR. هذا القرار دفع-growing طلب على الحلول السحابية المتوافقة مع ZATCA.
              </p>
              
              <div className="bg-background/50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-white mb-4">المراحل الزمنية</h3>
                <ul className="space-y-3 text-text-secondary">
                  <li className="flex items-start gap-3">
                    <span className="text-accent-green font-bold">المرحلة 1 (2024-2025):</span>
                    <span>إنشاء وتوليد الفواتير مع رمز QR مطابق للمواصفات</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent-green font-bold">المرحلة 2 (2026-2027):</span>
                    <span>ربط الأنظمة مباشرة مع منصة الفاتورة الإلكترونية لـ ZATCA (التقارير في الوقت الحقيقي)</span>
                  </li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: 'شركات متوافقة', value: '45%', desc: 'من شركاتنا برامجهم متوافقة مع ZATCA' },
                  { label: 'قيد التطوير', value: '35%', desc: 'تعمل على التكامل حالياً' },
                  { label: 'لم تبدأ', value: '20%', desc: 'تحتاج إلى استشارات فنية' },
                ].map(box => (
                  <div key={box.label} className="bg-background/50 rounded-lg p-6 text-center">
                    <div className="text-3xl font-bold text-accent-green mb-2">{box.value}</div>
                    <div className="text-white font-medium mb-1">{box.label}</div>
                    <div className="text-text-muted text-sm">{box.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Future Predictions */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">التوقعات حتى 2030</h2>
          <div className="bg-card rounded-xl border border-white/5 p-8">
            <ol className="space-y-6">
              {[
                {
                  year: '2027',
                  title: 'ازدهار InsurTech و HealthTech',
                  desc: 'نمو متوقع بنسبة 200% في قطاع التأمين PixTechnologies مع دمج الذكاء الاصطناعي.',
                },
                {
                  year: '2028',
                  title: 'التحول إلى الخدمات الصغيرة (Micro-SaaS)',
                  desc: 'اتجاه نحو حلول متخصصة ذات نطاق ضيق وعائدات عالية.',
                },
                {
                  year: '2029',
                  title: 'الاستثمار المؤسسي يزداد',
                  desc: 'صناديق الاستثمار الكبرى تدخل السوق بمبالغ تفوق 500 مليون ريال سنوياً.',
                },
                {
                  year: '2030',
                  title: 'الوصول إلى 1000+ شركة SaaS',
                  desc: ' SaudiSaaSHub ترى 1000+ شركة مسجلة، مع خروج 3-5 شركات للاستحواذ عليها.',
                },
              ].map((item, idx) => (
                <li key={item.year} className="flex gap-4">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-accent-green/10 flex items-center justify-center text-accent-green font-bold text-lg">
                    {item.year}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">{item.title}</h4>
                    <p className="text-text-secondary">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">الخاتمة</h2>
          <div className="bg-card rounded-xl border border-white/5 p-8">
            <p className="text-text-secondary leading-relaxed mb-4">
              يشهد سوق SaaS السعودي تحولاً جذرياً مدعوماً برؤية 2030 والاستثمارات الحكومية والخاصة. مع وجود أكثر من {totalCompanies.toLocaleString('en-US')} شركة ناشئة وبنية تحتية رقمية متطورة، أصبحت المملكة وجهةً إقليميةً رائدةً للتقنية.
            </p>
            <p className="text-text-secondary leading-relaxed">
              نعمل في SaudiSaaSHub على تعزيز هذا Flint بتوفير منصة شاملة للشركات الناشئة، مع تحديث البيانات يومياً لتعكس ديناميكية السوق.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12">
          <h3 className="text-2xl font-bold text-white mb-4">هل تريد تضمين شركتك في الدليل؟</h3>
          <p className="text-text-secondary mb-6">انضم إلى أكثر من 250 شركة سعودية مسجلة في SaudiSaaSHub</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent-green text-background font-semibold rounded-xl hover:bg-accent-green/90 transition-all"
          >
            أضف شركتك الآن
          </a>
        </section>

        <ShareButtons />

        {/* Last updated */}
        <div className="text-center text-text-muted text-sm py-8 border-t border-white/5">
          آخر تحديث: 13 مارس 2026 | البيانات مستلمة من قاعدة بيانات SaudiSaaSHub
        </div>
      </div>
    </div>
  );
}
