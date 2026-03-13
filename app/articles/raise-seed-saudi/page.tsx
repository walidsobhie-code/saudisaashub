import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'كيفية جمع التمويل المبدئي في السعودية 2026 | دليل عملي',
  description: 'دليل شامل لجمع التمويل المبدئي (Seed) للشركات الناشئة السعودية: أبرز المستثمرين، نصائح pitch deck، التقييمات، والمتطلبات القانونية.',
  keywords: 'تمويل مبدئي, seed funding, استثمار, الشركات الناشئة, Venture Capital, السعودية, startups, STV, Raed Ventures',
  openGraph: {
    title: 'كيفية جمع التمويل المبدئي في السعودية 2026',
    description: 'دليل عملي خطوة بخطوة لجمع التمويل المبدئي للشركات الناشئة السعودية',
    type: 'article',
    url: 'https://saudisaashub.pages.dev/articles/raise-seed-saudi',
    publishedTime: '2026-03-13T00:00:00Z',
    authors: ['SaudiSaaSHub'],
  },
};

export default function RaiseSeedSaudi() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: String(metadata.title).replace(' | SaudiSaaSHub', ''),
    description: metadata.description,
    url: 'https://saudisaashub.pages.dev/articles/raise-seed-saudi',
    datePublished: '2026-03-13',
    author: { '@type': 'Organization', name: 'SaudiSaaSHub' },
    publisher: { '@type': 'Organization', name: 'SaudiSaaSHub' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://saudisaashub.pages.dev/articles/raise-seed-saudi' },
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
          <span>كيفية جمع التمويل المبدئي</span>
        </nav>

        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            كيفية جمع التمويل المبدئي في السعودية 2026
          </h1>
          <p className="text-xl text-text-secondary mb-6">
            دليل عملي خطوة بخطوة: من التحضير إلى إبرام الصفقة
          </p>
          <div className="flex justify-center gap-4 text-sm text-text-muted">
            <span>📅 13 مارس 2026</span>
            <span>•</span>
            <span>⏱️ 12 دقيقة قراءة</span>
          </div>
        </header>

        {/* Introduction */}
        <section className="mb-12">
          <div className="bg-card rounded-xl border border-white/5 p-8">
            <p className="text-text-secondary leading-relaxed mb-4">
              يعد جمع التمويل المبدئي (Seed Stage) من أصعب التحديات التي تواجه الشركات الناشئة في Saudi Arabia. لكن مع التحولات الاقتصادية التي تشهدها المملكة ضمن رؤية 2030، أصبح الحصول على استثمار مبدئي أسهل من أي وقت مضى بفضل وجود صناديق استثمارية متخصصة وبرامج دعم حكومي.
            </p>
            <p className="text-text-secondary leading-relaxed">
              في هذا الدليل، نغطي كل ما تحتاج معرفته: من الإعداد الأولي إلى اختيار المستثمر المناسب، مع نصائح حقيقية من مؤسسين ناجحين.
            </p>
          </div>
        </section>

        {/* Step 1 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">الخطوة 1: التحضير</h2>
          <div className="space-y-4">
            <div className="bg-card rounded-xl border border-white/5 p-6">
              <h3 className="text-lg font-semibold text-white mb-2">1.1 بناء الفريق</h3>
              <p className="text-text-secondary">
                مستثمرو السعودية يفضلون الفرق ذات الخلفيات المتنوعة (تقني، تجاري، مالي). تأكد من وجود مؤسسين كاملين الوقت (not just consultants).
              </p>
            </div>
            <div className="bg-card rounded-xl border border-white/5 p-6">
              <h3 className="text-lg font-semibold text-white mb-2">1.2 تطوير MVP</h3>
              <p className="text-text-secondary">
                حتى لو كان	buffer minimal، dimensionless مطلوب. العرض التوضيحي (Demo) أهم من خطة العمل الطويلة.
              </p>
            </div>
            <div className="bg-card rounded-xl border border-white/5 p-6">
              <h3 className="text-lg font-semibold text-white mb-2">1.3 أبحاث السوق</h3>
              <p className="text-text-secondary">
                اعرض data عن حجم السوق، المنافسين، وفجوة المنتج. الأرقام الواقعية importants.
              </p>
            </div>
          </div>
        </section>

        {/* Step 2 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">الخطوة 2: إعداد مستندات fundraising</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Pitch Deck', desc: 'عرض تقديمي 10-15 slide يغطي: المشكلة، الحل، السوق، النموذج، الفريق، التمويل المطلوب، الخطة.' },
              { title: 'Financial Model', desc: 'توقعات مالية لـ 3 سنوات: الإيرادات، النفقات، points الت secured، and所需 رأس المال.' },
              { title: 'Executive Summary', desc: 'ملخص 1-2 صفحة للتواصل الأولي بالمستثمرين.' },
              { title: 'Term Sheet', desc: 'فهم بنود صفقة الاستثمار (valuation، حصة، مجلس إدارة، إلخ).' },
            ].map(doc => (
              <div key={doc.title} className="bg-card rounded-xl border border-white/5 p-6">
                <h3 className="text-lg font-semibold text-white mb-2">{doc.title}</h3>
                <p className="text-text-secondary text-sm">{doc.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Step 3 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">الخطوة 3: اختيار المستثمر المناسب</h2>
          <p className="text-text-secondary mb-6">
            ليس كل صناديق restoration متشابهة. في السعودية، لدينا أنواع متعددة:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full bg-card rounded-xl border border-white/5">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="p-4 text-right text-text-muted text-sm">النوع</th>
                  <th className="p-4 text-right text-text-muted text-sm">حجم الاستثمار</th>
                  <th className="p-4 text-right text-text-muted text-sm">التركيز</th>
                  <th className="p-4 text-right text-text-muted text-sm">أمثلة</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { type: 'صندوق سكرتاج', amount: '500K - 5M SAR', focus: 'All stages', examples: 'STV, Alkhaleej Capital' },
                  { type: 'أنجيل إنديفيدوال', amount: '100K - 1M SAR', focus: 'Seed, Pre-seed', examples: 'Raed Ventures, Waed' },
                  { type: 'حاضنة/مسرع', amount: '100K - 500K SAR', focus: 'Pre-seed', examples: 'Badir, KAUST HTC' },
                  { type: 'حكومي/وزاري', amount: '500K - 10M SAR', focus: 'Strategic sectors', examples: 'KAFD, Saudi Venture Capital' },
                ].map(row => (
                  <tr key={row.type} className="border-b border-white/5">
                    <td className="p-4 text-white">{row.type}</td>
                    <td className="p-4 text-white">{row.amount}</td>
                    <td className="p-4 text-white">{row.focus}</td>
                    <td className="p-4 text-white">{row.examples}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Step 4 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">الخطوة 4: عملية fundraising</h2>
          <ol className="list-decimal list-inside space-y-4 text-text-secondary">
            <li><strong className="text-white">البحث عن المستثمرين:</strong> استخدم databases مثل SaudiVentureCapital.com أو attend فعاليات مثل LEAP، Future Investment Initiative (FII).</li>
            <li><strong className="text-white">التواصل الأولي:</strong> أرسل بريداً إلكترونياً مختصراً (100-150 كلمة) مع pitch deck مرفق.</li>
            <li><strong className="text-white">الاجتماع الأول:</strong> ركز على المشكلة والحل والنمو. كن مستعداً للأسئلة التقنية والعملية.</li>
            <li><strong className="text-white">الاجتماعات المتتالية:</strong> قد تحتاج 3-5 اجتماعات قبل الحصول على term sheet.</li>
            <li><strong className="text-white">العناية الواجبة (Due Diligence):</strong> المستثمر سيراجع: financials, legal docs, IP, team backgrounds.</li>
            <li><strong className="text-white">الإغلاق (Closing):</strong> توقيع paperwork وتحويل الأموال (عادة 30-60 يوماً بعد term sheet).</li>
          </ol>
        </section>

        {/* Tips */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">نصائح من مؤسسين ناجحين</h2>
          <div className="bg-card rounded-xl border border-white/5 p-8">
            <blockquote className="border-r-4 border-accent-green pr-4 italic text-text-secondary mb-6">
              "لا تبدأ fundraising قبل أن يكون لديك traction حقيقي. حتى لو كان 10 عملاء فقط، هذا أقوى من أي pitch."
            </blockquote>
            <blockquote className="border-r-4 border-accent-green pr-4 italic text-text-secondary mb-6">
              "اختر مستثمراً يضيف قيمة، ليس مجرد فلوس. المستثمر الاستراتيجي يمكنه فتح أبواب عملاء وشراكات."
            </blockquote>
            <blockquote className="border-r-4 border-accent-green pr-4 italic text-text-secondary">
              "كن شفافاً جداً around التحديات. المستثمرون يقدرون الصدق ويتفادون المفاجآت لاحقاً."
            </blockquote>
          </div>
        </section>

        {/* Legal Requirements */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">المتطلبات القانونية</h2>
          <ul className="list-disc list-inside space-y-3 text-text-secondary bg-card rounded-xl border border-white/5 p-6">
            <li>تسجيل الشركة ككيان قانوني (LLC أو شركة ذات مسؤولية محدودة).</li>
            <li>الحصول على شهادة السجل التجاري (CR).</li>
            <li>تسجيل في الضريبة (VAT) إذا تجاوزت الإيرادات حد registration.</li>
            <li>عقد استثمار (Investment Agreement) يجب أن يكون.site بمحامٍ متخصص في venture.</li>
            <li>التزامات المن monarchs (stock options) للموظفين.</li>
          </ul>
        </section>

        {/* Common Mistakes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">الأخطاء الشائعة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { mistake: 'التقييم المبالغ فيه', solution: 'ابحث عن valuations مماثلة في منطقتك وزمنك.' },
              { mistake: 'التفريط في حصة كبيرة', solution: 'احتفظ بـ 20%+ بعد الجولة الأولى.' },
              { mistake: 'اختيار المستثمر الخطأ', solution: 'factor السيرة الذاتية للمستثمرين previous investments.' },
              { mistake: 'التسرع في القبول', solution: 'خذ وقتاً لمراجعة term sheet مع محامٍ.' },
            ].map(item => (
              <div key={item.mistake} className="bg-red-900/20 border border-red-500/20 rounded-xl p-6">
                <h3 className="text-red-400 font-semibold mb-2">{item.mistake}</h3>
                <p className="text-text-secondary text-sm">{item.solution}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Resources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">موارد مفيدة</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: 'Saudi Venture Capital', url: 'https://saudivc.com', desc: 'قاعدة بيانات صناديق الاستثمار السعودية' },
              { name: 'Monsha\'at', url: 'https://monshaat.gov.sa', desc: 'الهيئة العامة للمنشآت الصغيرة والمتوسطة' },
              { name: 'FII', url: 'https://fii.sa', desc: 'منتدى الاستثمار العالمي – فرص التواصل' },
              { name: 'BADIR Program', url: 'https://badir.org.sa', desc: 'برنامج بادر للشركات الناشئة' },
            ].map(res => (
              <a
                key={res.name}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-card rounded-xl border border-white/5 p-6 hover:border-accent-green/50 transition-all"
              >
                <h4 className="text-white font-semibold mb-1">{res.name}</h4>
                <p className="text-text-secondary text-sm">{res.desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <section className="text-center py-12 bg-card rounded-xl border border-white/5">
          <h3 className="text-2xl font-bold text-white mb-4">جمع التمويل ليس سهلاً ولكن يمكنك إنجازه</h3>
          <p className="text-text-secondary mb-6">
            استخدم أدواتنا للعثور على المستثمرين المناسبين وبناء pitch deck ناجح
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/funding"
              className="px-8 py-4 bg-accent-green text-background font-semibold rounded-xl hover:bg-accent-green/90 transition-all"
            >
              تصدر ممولي الشركات
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-card border border-white/20 text-white font-medium rounded-xl hover:border-accent-green transition-all"
            >
              استشارة مجانية
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
