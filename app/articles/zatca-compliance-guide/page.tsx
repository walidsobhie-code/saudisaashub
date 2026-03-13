import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'الدليل الشامل لامتثال ZATCA للفواتير الإلكترونية | SaudiSaaSHub',
  description: 'كل ما تحتاج معرفته عن نظام الفاتورة الإلكترونية (Fatoora) في السعودية: المراحل، المتطلبات، الجداول الزمنية،thouseil;k الإجراءات، وأفضل الممارسات للشركات.',
  keywords: 'ZATCA, Fatoora, الفاتورة الإلكترونية, امتثال, ضريبة القيمة المضافة, VAT, السعودية, e-invoicing, SaaS',
  openGraph: {
    title: 'الدليل الشامل لامتثال ZATCA للفواتير الإلكترونية',
    description: 'دليل عملي للشركات السعودية لفهم وتطبيق متطلبات ZATCA للفواتير الإلكترونية',
    type: 'article',
    url: 'https://saudisaashub.pages.dev/articles/zatca-compliance-guide',
    publishedTime: '2026-03-13T00:00:00Z',
    authors: ['SaudiSaaSHub'],
  },
};

export default function ZatcaComplianceGuide() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: metadata.title?.replace(' | SaudiSaaSHub', ''),
    description: metadata.description,
    url: 'https://saudisaashub.pages.dev/articles/zatca-compliance-guide',
    datePublished: '2026-03-13',
    author: { '@type': 'Organization', name: 'SaudiSaaSHub' },
    publisher: { '@type': 'Organization', name: 'SaudiSaaSHub' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://saudisaashub.pages.dev/articles/zatca-compliance-guide' },
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-text-muted">
          <Link href="/" className="hover:text-accent-green">الرئيسية</Link>
          <span className="mx-2">/</span>
          <Link href="/articles" className="hover:text-accent-green">المقالات</Link>
          <span className="mx-2">/</span>
          <span>دليل امتثال ZATCA</span>
        </nav>

        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            الدليل الشامل لامتثال ZATCA للفواتير الإلكترونية
          </h1>
          <p className="text-xl text-text-secondary mb-6">
            خطوة بخطوة: من الفهم الأساسي إلى التطبيق الكامل لنظام Fatoora
          </p>
          <div className="flex justify-center gap-4 text-sm text-text-muted">
            <span>📅 13 مارس 2026</span>
            <span>•</span>
            <span>⏱️ 15 دقيقة قراءة</span>
          </div>
        </header>

        {/* Table of Contents */}
        <div className="bg-card rounded-xl border border-white/5 p-6 mb-12">
          <h2 className="text-lg font-bold text-white mb-4">المحتويات</h2>
          <ul className="space-y-2 text-text-secondary">
            {[
              'ما هو نظام الفاتورة الإلكترونية (Fatoora)؟',
              'مراحل التطبيق',
              'المتطلبات الفنية',
              'خطوات التنفيذ',
              'العقوبات والغرامات',
              'أفضل الممارسات',
              'الأسئلة الشائعة',
            ].map((item, idx) => (
              <li key={item}>
                <a href={`#section-${idx}`}`} className="hover:text-accent-green flex items-center gap-2">
                  <span className="text-accent-green">{idx + 1}.</span> {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Content */}
        <article className="prose prose-invert max-w-none">
          {/* Section 1 */}
          <section id="section-0" className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">ما هو نظام الفاتورة الإلكترونية (Fatoora)؟</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              نظام الفاتورة الإلكترونية (Fatoora) هو مبادرة أطلقتها هيئة الزكاة والضرائب والجمارك (ZATCA) لتحويل عملية إصدار الفواتير إلى نظام إلكتروني متكامل. يهدف النظام إلى مكافحة التهرب الضريبي وزيادة الشفافية في المعاملات التجارية.
            </p>
            <div className="bg-background/50 rounded-xl p-6 border-r-4 border-accent-green">
              <h4 className="text-white font-semibold mb-2">النقاط الرئيسية:</h4>
              <ul className="list-disc list-inside space-y-2 text-text-secondary">
                <li>إصدار الفواتير إلكترونياً مع رمز QR فريد</li>
                <li>ربط أنظمة الفوترة مباشرة مع منصة ZATCA</li>
                <li>تشفير البيانات وضمان عدم Alteration</li>
                <li>التقارير في الوقت الحقيقي للسلطات الضريبية</li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section id="section-1" className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">مراحل التطبيق</h2>
            <div className="space-y-6">
              {[
                {
                  phase: 'المرحلة 1',
                  title: 'التكامل للفاتورة الإلكترونية (E-Invoicing)',
                  period: '2024 - 2025',
                  desc: 'إصدار الفواتير إلكترونياً مع تضمين رمز QR يتضمن البيانات الضريبية المطلوبة.',
                  requirements: [
                    'توليد رمز QR لكل فاتورة',
                    'تضمين بيانات التاجر والعميل',
                    'التوقيع الإلكتروني للفاتورة',
                    'الأرشفة الإلكترونية لمدة 6 سنوات',
                  ],
                },
                {
                  phase: 'المرحلة 2',
                  title: 'الإبلاغ في الوقت الحقيقي (Real-Time Reporting)',
                  period: '2026 - 2027',
                  desc: 'إرسال الفواتير إلى منصة ZATCA للحصول على موافقة قبل إصدارها للعميل.',
                  requirements: [
                    'الاتصال المباشر مع واجهة برمجة التطبيقات (API) لـ ZATCA',
                    'الحصول على رقم موافقة فريد لكل فاتورة',
                    'التعامل مع حالات الفشل وإعادة المحاولة',
                    'التكامل مع الأنظمة المحاسبية',
                  ],
                },
              ].map((stage, idx) => (
                <div key={idx} className="bg-card rounded-xl border border-white/5 p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-accent-green/20 flex items-center justify-center text-accent-green font-bold">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{stage.phase}: {stage.title}</h3>
                      <p className="text-accent-green text-sm">{stage.period}</p>
                    </div>
                  </div>
                  <p className="text-text-secondary mb-4">{stage.desc}</p>
                  <div className="bg-background/30 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-white mb-2">المتطلبات:</h4>
                    <ul className="list-disc list-inside space-y-1 text-text-secondary text-sm">
                      {stage.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3 */}
          <section id="section-2" className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">المتطلبات الفنية</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'هيكل الفاتورة', desc: 'JSON أو XML dengan كافة الحقول المطلوبة (اسم التاجر، الرقم الضريبي، التاريخ، المبلغ، إلخ).' },
                { title: 'تشفير البيانات', desc: 'استخدام خوارزميات التشفير المعتمدة من ZATCA (RSA-2048, SHA-256).' },
                { title: '二维码 (QR Code)', desc: 'إنشاء QR code يحتوي على (اسم التاجر، الرقم الضريبي، الطابع الزمني، إجمالي المبلغ، ضريبة القيمة المضافة).' },
                { title: 'التوقيع الإلكتروني', desc: 'Digital signature باستخدام شهادة موثوقة من هيئة الحكومة الرقمية.' },
                { title: 'حفظ السجلات', desc: 'أرشفة الفواتير إلكترونياً لمدة 6 سنوات على الأقل مع إمكانية الاسترجاع.' },
                { title: 'التكامل مع الأنظمة', desc: 'Interface مع أنapons المحاسبة Point-of-Sale (POS)، والمبيعات.' },
              ].map((item, idx) => (
                <div key={idx} className="bg-card rounded-xl border border-white/5 p-6">
                  <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                  <p className="text-text-secondary">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4 */}
          <section id="section-3" className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">خطوات التنفيذ</h2>
            <ol className="list-decimal list-inside space-y-4 text-text-secondary">
              <li><strong className="text-white">تقييم الوضع الحالي:</strong> مراجعة أنظمة الفوترة الحالية وتحديد الفجوات gegenüber متطلبات ZATCA.</li>
              <li><strong className="text-white">اختيار الحل:</strong> إما تطوير خاص أو استخدام حل جاهز متوافق (مثل модули لـ SAP, Oracle, أو حلول SaaS محلية).</li>
              <li><strong className="text-white">الترخيص والاشتراك:</strong> الحصول على شهادة التشفير والترخيص من ZATCA للبوابة الإلكترونية.</li>
              <li><strong className="text-white">التكامل الفني:</strong> ربط النظام مع واجهة برمجة التطبيقات (API) الخاصة بـ ZATCA.</li>
              <li><strong className="text-white">الاختبار:</strong> تشغيل في بيئة sandbox للتأكد من صحة الفواتير و QR codes.</li>
              <li><strong className="text-white">التدريب:</strong> تدريب فريق المبيعات والمالية على النظام الجديد.</li>
              <li><strong className="text-white">الانتقال:</strong> التبديل إلى النظام الجديد مع مراقبة الأداء وتصحيح الأخطاء.</li>
            </ol>
          </section>

          {/* Section 5 */}
          <section id="section-4" className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">العقوبات والغرامات</h2>
            <div className="bg-red-900/20 border border-red-500/20 rounded-xl p-6 mb-6">
              <h3 className="text-red-400 font-semibold mb-4">العقوبات على عدم الامتثال</h3>
              <ul className="space-y-3 text-text-secondary">
                <li>• غرامة مالية تصل إلى 10,000 ريال سعودي للمخالفة الأولى.</li>
                <li>• تضاعف الغرامة في حالة التكرار.</li>
                <li>• إمكانية إيقاف التصاريح الضريبية.</li>
                <li>• نجمة التقييم الضريبي (Tax rating)تأثر سلباً.</li>
              </ul>
            </div>
            <p className="text-text-secondary">
              من المهم البدء في التطبيق قبل الموعد النهائي لتجنب هذه العقوبات. Tate Solutions offers deployment assistance.
            </p>
          </section>

          {/* Section 6 */}
          <section id="section-5" className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">أفضل الممارسات</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: '✅', title: 'ابدأ مبكراً', desc: 'لا تنتظر الموعد النهائي، ابدأ التخطيط والتقييم الآن.' },
                { icon: '🔗', title: 'اخترvendor موثوق', desc: 'تعاون مع مزود حلول متوافق مع ZATCA ولديه شهادات معتمدة.' },
                { icon: '📚', title: 'درب فريقك', desc: 'تدريب الموظفين الماليين والمبيعات على النظام الجديد.' },
                { icon: '🧪', title: 'اختبر في Sandbox', desc: 'استخدم بيئة الاختبار من ZATCA قبل الانتقال للإنتاج.' },
                { icon: '📈', title: 'راقب الأداء', desc: 'مراقبة metrics مثل وقت الاستجابة ومعدل النجاح.' },
                { icon: '🔄', title: 'خطط للاستمرارية', desc: '-have backup procedures عند انقطاع الاتصال بـ ZATCA.' },
              ].map((item, idx) => (
                <div key={idx} className="bg-card rounded-xl border border-white/5 p-6">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-text-secondary text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section id="section-6" className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">الأسئلة الشائعة</h2>
            <div className="space-y-4">
              {[
                {
                  q: 'هل جميع الشركات السعودية ملزمة بتطبيق ZATCA؟',
                  a: 'نعم، جميع tallaxable persons (الشركات والأفراد) المسجلين في ضريبة القيمة المضافة ملزمون.',
                },
                {
                  q: 'ما هي تكلفة التطبيق؟',
                  a: 'تختلف حسب الحل المختار. الحلول السحابية تبدأ من 500 ريال/شهر، بينما التطوير الداخلي قد يصل إلى 100,000+ ريال.',
                },
                {
                  q: 'كم من الوقت يحتاج التطبيق؟',
                  a: 'عادة من 2 إلى 6 أشهر حسب تعقيد الأنظمة الحالية وحجم الشركة.',
                },
                {
                  q: 'هل يمكنني استخدام حل جاهز؟',
                  a: 'نعم، هناك العديد من المزودين المعتمدين من ZATCA مثل SAP, Oracle, Ed彦',
                },
              ].map((faq, idx) => (
                <div key={idx} className="bg-card rounded-xl border border-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
                  <p className="text-text-secondary">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        </article>

        {/* CTA */}
        <section className="mt-16 bg-card rounded-xl border border-white/5 p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">ابحث عن حل متوافق مع ZATCA</h3>
          <p className="text-text-secondary mb-6">
            تصفح دليلنا للشركات السعودية التي تقدم حلول فوترة متوافقة مع ZATCA
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/zatca"
              className="px-8 py-4 bg-accent-green text-background font-semibold rounded-xl hover:bg-accent-green/90 transition-all"
            >
              تصفح حلول ZATCA
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-card border border-white/20 text-white font-medium rounded-xl hover:border-accent-green transition-all"
            >
              تواصل معنا
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
