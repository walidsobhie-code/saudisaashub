import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'الدليل الشامل لامتثال ZATCA للفواتير الإلكترونية | SaudiSaaSHub',
  description: 'كل ما تحتاج معرفته عن نظام الفاتورة الإلكترونية (Fatoora) في السعودية: المراحل، المتطلبات، الجداول الزمنية، الإجراءات، وأفضل الممارسات للشركات.',
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
            <span>📅 13 مارس 2026</span>
            <span>•</span>
            <span>⏱️ 15 دقيقة قراءة</span>
          </div>
        </header>

        <div className="bg-card rounded-xl border border-white/5 p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">الملخص التنفيذي</h2>
          <p className="text-text-secondary leading-relaxed">
            نظام الفاتورة الإلكترونية (Fatoora) هو مبادرة من ZATCA لفرض الفواتير الإلكترونية مع رمز QR. يتعين على جميع الشركات الخاضعة للضريبة التكامل مع النظام. يتضمن ذلك إنشاء الفواتير إلكترونياً، التوقيع الرقمي، الأرشفة، وفي المرحلة الثانية الإبلاغ في الوقت الحقيقي.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-white mb-6">مراحل التطبيق</h2>
        <div className="space-y-6 mb-12">
          <div className="bg-card rounded-xl border border-white/5 p-6">
            <h3 className="text-xl font-semibold text-white mb-2">المرحلة 1 (2024-2025)</h3>
            <p className="text-text-secondary mb-4">إصدار الفواتير إلكترونياً مع رمز QR يتضمن البيانات الضريبية.</p>
            <ul className="list-disc list-inside text-text-secondary">
              <li>توليد رمز QR لكل فاتورة</li>
              <li>التوقيع الإلكتروني</li>
              <li>الأرشفة لمدة 6 سنوات</li>
            </ul>
          </div>
          <div className="bg-card rounded-xl border border-white/5 p-6">
            <h3 className="text-xl font-semibold text-white mb-2">المرحلة 2 (2026-2027)</h3>
            <p className="text-text-secondary mb-4">الإبلاغ الفوري للفواتير إلى ZATCA للحصول على موافقة قبل الإصدار.</p>
            <ul className="list-disc list-inside text-text-secondary">
              <li>الاتصال المباشر عبر API</li>
              <li>الحصول على رقم موافقة فريد</li>
              <li>معالجة حالات الفشل</li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-6">خطوات البدء</h2>
        <ol className="list-decimal list-inside space-y-4 text-text-secondary mb-12">
          <li><strong>تقييم الوضع الحالي</strong> – مراجعة أنظمة الفوترة</li>
          <li><strong>اختيار الحل</strong> – حل جاهز أو تطوير خاص</li>
          <li><strong>الترخيص</strong> – شهادة التشفير من ZATCA</li>
          <li><strong>التكامل</strong> – ربط النظام مع API</li>
          <li><strong>الاختبار</strong> – استخدام sandbox</li>
          <li><strong>التدريب</strong> – تدريب الفريق</li>
        </ol>

        <section className="bg-card rounded-xl border border-white/5 p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">تبحث عن حل متوافق؟</h3>
          <p className="text-text-secondary mb-6">تصفح دليلنا للشركات السعودية التي توفر حلول فوترة متوافقة مع ZATCA.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/zatca" className="px-8 py-4 bg-accent-green text-background font-semibold rounded-xl hover:bg-accent-green/90">
              الحلول المتوافقة
            </Link>
            <Link href="/contact" className="px-8 py-4 bg-card border border-white/20 text-white font-medium rounded-xl hover:border-accent-green">
              استشارة مجانية
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
