import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'الدليل الشامل لامتثال ZATCA للفواتير الإلكترونية | SaudiSaaSHub',
  description: 'كل ما تحتاج معرفته عن نظام الفاتورة الإلكترونية (Fatoora) في السعودية: المراحل، المتطلبات، الإجراءات، وأفضل الممارسات للشركات.',
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

export default function ZatcaComplianceGuidePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: String(metadata.title).replace(' | SaudiSaaSHub', ''),
    description: metadata.description,
    url: 'https://saudisaashub.pages.dev/articles/zatca-compliance-guide',
    datePublished: '2026-03-13',
    author: { '@type': 'Organization', name: 'SaudiSaaSHub' },
    publisher: { '@type': 'Organization', name: 'SaudiSaaSHub' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://saudisaashub.pages.dev/articles/zatca-compliance-guide' },
  };

  const jsonLdString = JSON.stringify(jsonLd);

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString }} />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <nav className="mb-8 text-sm text-text-muted">
          <Link href="/" className="hover:text-accent-green">الرئيسية</Link>
          <span className="mx-2">/</span>
          <Link href="/articles" className="hover:text-accent-green">المقالات</Link>
          <span className="mx-2">/</span>
          <span>دليل امتثال ZATCA</span>
        </nav>

        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            الدليل الشامل لامتثال ZATCA للفواتير الإلكترونية
          </h1>
          <p className="text-xl text-text-secondary mb-6">
            خطوة بخطوة: من الفهم الأساسي إلى التطبيق الكامل لنظام Fatoora
          </p>
          <div className="flex justify-center gap-4 text-sm text-text-muted">
            <span>13 مارس 2026</span>
            <span>•</span>
            <span>⏱️ 15 دقيقة قراءة</span>
          </div>
        </header>

        <div className="bg-card rounded-xl border border-white/5 p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">الملخص التنفيذي</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            نظام الفاتورة الإلكترونية (Fatoora) هو مبادرة أطلقتها هيئة الزكاة والضرائب والجمارك (ZATCA) لتحويل عملية إصدار الفواتير إلى نظام إلكتروني متكامل. يهدف النظام إلى مكافحة التهرب الضريبي وزيادة الشفافية في المعاملات التجارية.
          </p>
          <div className="bg-background/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">النقاط الرئيسية:</h3>
            <ul className="space-y-2 text-text-secondary">
              <li>إصدار الفواتير إلكترونياً مع رمز QR فريد</li>
              <li>ربط أنظمة الفوترة مباشرة مع منصة ZATCA</li>
              <li>تشفير البيانات وضمان عدم التلاعب</li>
              <li>التقارير في الوقت الحقيقي للسلطات الضريبية</li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-6">مراحل التطبيق</h2>
        <div className="space-y-6 mb-12">
          <div className="bg-card rounded-xl border border-white/5 p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-accent-green/20 flex items-center justify-center text-accent-green font-bold">1</div>
              <div>
                <h3 className="text-lg font-semibold text-white">المرحلة 1: التكامل للفاتورة الإلكترونية</h3>
                <p className="text-accent-green text-sm">2024 - 2025</p>
              </div>
            </div>
            <p className="text-text-secondary mb-4">إصدار الفواتير إلكترونياً مع تضمين رمز QR يتضمن البيانات الضريبية المطلوبة.</p>
            <div className="bg-background/30 rounded-lg p-4">
              <h4 className="text-sm font-medium text-white mb-2">المتطلبات:</h4>
              <ul className="list-disc list-inside space-y-1 text-text-secondary text-sm">
                <li>توليد رمز QR لكل فاتورة</li>
                <li>تضمين بيانات التاجر والعميل</li>
                <li>التوقيع الإلكتروني للفاتورة</li>
                <li>الأرشفة الإلكترونية لمدة 6 سنوات</li>
              </ul>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-white/5 p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-accent-green/20 flex items-center justify-center text-accent-green font-bold">2</div>
              <div>
                <h3 className="text-lg font-semibold text-white">المرحلة 2: الإبلاغ في الوقت الحقيقي</h3>
                <p className="text-accent-green text-sm">2026 - 2027</p>
              </div>
            </div>
            <p className="text-text-secondary mb-4">إرسال الفواتير إلى منصة ZATCA للحصول على موافقة قبل إصدارها للعميل.</p>
            <div className="bg-background/30 rounded-lg p-4">
              <h4 className="text-sm font-medium text-white mb-2">المتطلبات:</h4>
              <ul className="list-disc list-inside space-y-1 text-text-secondary text-sm">
                <li>الاتصال المباشر مع واجهة برمجة التطبيقات (API) لـ ZATCA</li>
                <li>الحصول على رقم موافقة فريد لكل فاتورة</li>
                <li>التعامل مع حالات الفشل وإعادة المحاولة</li>
                <li>التكامل مع الأنظمة المحاسبية</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-6">خطوات التنفيذ</h2>
        <ol className="list-decimal list-inside space-y-4 text-text-secondary mb-12">
          <li><strong>تقييم الوضع الحالي</strong> – مراجعة أنظمة الفوترة الحالية وتحديد الفجوات</li>
          <li><strong>اختيار الحل</strong> – إما تطوير خاص أو استخدام حل جاهز متوافق</li>
          <li><strong>الترخيص والاشتراك</strong> – الحصول على شهادة التشفير من ZATCA</li>
          <li><strong>التكامل الفني</strong> – ربط النظام مع واجهة برمجة التطبيقات (API)</li>
          <li><strong>الاختبار</strong> – تشغيل في بيئة sandbox للتأكد من صحة الفواتير</li>
          <li><strong>التدريب</strong> – تدريب فريق المبيعات والمالية على النظام الجديد</li>
          <li><strong>الانتقال</strong> – التبديل إلى النظام الجديد مع مراقبة الأداء</li>
        </ol>

        <section className="bg-card rounded-xl border border-white/5 p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">ابحث عن حل متوافق مع ZATCA</h3>
          <p className="text-text-secondary mb-6">تصفح دليلنا للشركات السعودية التي تقدم حلول فوترة متوافقة مع ZATCA</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/zatca" className="px-8 py-4 bg-accent-green text-background font-semibold rounded-xl hover:bg-accent-green/90 transition-all">
              تصفح حلول ZATCA
            </Link>
            <Link href="/contact" className="px-8 py-4 bg-card border border-white/20 text-white font-medium rounded-xl hover:border-accent-green transition-all">
              تواصل معنا
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
