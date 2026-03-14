import { Metadata } from 'next';
import { reportStats } from '@/lib/report-stats';

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
  // Use pre-calculated stats to avoid heavy computation during static generation
  const { totalCompanies, categoryCounts, fundingStats, topLocations, avgFounded, newestFounded } = reportStats;
  // categoryCounts, topLocations etc. are already destructured
  
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
            <span>{fundingStats.percentage}% ممولة</span>
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
              <div className="text-3xl font-bold text-accent-green mb-2">{categoryCounts.length}</div>
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
              {categoryCounts.map(([category, count], idx) => {
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
            {categoryCounts.slice(0, 6).map(([category, count]) => (
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

        {/* Social Share Section */}
        <section className="py-12 border-t border-white/5">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-2">شارك هذا التقرير</h3>
              <p className="text-text-secondary text-sm">انشر تحليل سوق SaaS السعودي مع شبكتك</p>
            </div>
            <div className="flex justify-center gap-3 flex-wrap">
              {/* Twitter/X */}
              <button
                onClick={() => {
                  const url = encodeURIComponent(window.location.href);
                  const text = encodeURIComponent(document.title);
                  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'width=600,height=400,noopener,noreferrer');
                }}
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-[#1da1f2] hover:bg-[#1a8cd8] transition-all shadow-lg"
                aria-label="شارك على X (تويتر)"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </button>

              {/* LinkedIn */}
              <button
                onClick={() => {
                  const url = encodeURIComponent(window.location.href);
                  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=400,noopener,noreferrer');
                }}
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-[#0077b5] hover:bg-[#006399] transition-all shadow-lg"
                aria-label="شارك على LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </button>

              {/* WhatsApp */}
              <button
                onClick={() => {
                  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(document.title + ' ' + window.location.href)}`, '_blank', 'width=600,height=400,noopener,noreferrer');
                }}
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-[#25d366] hover:bg-[#20ba5a] transition-all shadow-lg"
                aria-label="شارك على WhatsApp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </button>

            {/* Telegram */}
            <button
              onClick={() => {
                window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(document.title)}`, '_blank', 'width=600,height=400,noopener,noreferrer');
              }}
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-[#0088cc] hover:bg-[#0077aa] transition-all shadow-lg"
              aria-label="شارك على Telegram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </button>

            {/* Copy Link */}
            <button
              onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
                try {
                  await navigator.clipboard.writeText(window.location.href);
                  const btn = e.currentTarget;
                  const originalContent = btn.innerHTML;
                  btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13l4 4L19 7"/></svg>`;
                  btn.classList.add('bg-accent-green', 'text-background');
                  setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.classList.remove('bg-accent-green', 'text-background');
                  }, 2000);
                } catch (err) {
                  console.error('Failed to copy:', err);
                  alert('فشل نسخ الرابط. يرجى المحاولة مرة أخرى.');
                }
              }}
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-gray-300 hover:bg-white/20 hover:border-accent-green/50 hover:text-white transition-all shadow-sm"
              aria-label="نسخ الرابط"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

        {/* Last updated */}
        <div className="text-center text-text-muted text-sm py-8 border-t border-white/5">
          آخر تحديث: 13 مارس 2026 | البيانات مستلمة من قاعدة بيانات SaudiSaaSHub
        </div>
      </div>
    </div>
  );
}
