import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'دليل الامتثال لضوابط NCA و PDPL للشركات السعودية 2026 | SaudiSaaSHub',
  description: 'دليل شامل لمتطلبات الامتثال لهيئة الأمن السيبراني NCA ونظام PDPL للشركات السعودية في 2026. اعرف ما الذي تفرضه الدولة على منشأتك بالضبط.',
  keywords: 'امتثال NCA السعودية, PDPL الأمن السيبراني, ضوابط ECC 2026, هيئة الأمن السيبراني, حماية البيانات الشخصية',
};

export default function Page() {
  return (
    <>
      <section className="py-10 md:py-14 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <Breadcrumb items={[{ label: 'الرئيسية', href: '/' }, { label: 'المقالات', href: '/articles' }, { label: 'دليل الامتثال لـ NCA و PDPL 2026', href: '/articles/nca-pdpl-compliance-2026' }]} />
          <div className="flex flex-wrap gap-2 mb-5">
            <Link href="/articles?category=أمن_سيبراني" className="px-3 py-1 text-sm rounded-full bg-red-500/10 text-red-400 border border-red-500/20">أمن سيبراني</Link>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white">دليل الامتثال لضوابط NCA و PDPL للشركات السعودية 2026</h1>
          <p className="text-xl text-text-secondary mb-8">دليل شامل لمتطلبات الامتثال لهيئة الأمن السيبراني NCA ونظام PDPL للشركات السعودية في 2026.</p>
          <div className="flex items-center gap-4 text-text-muted text-sm"><span>مارس 2026</span><span>•</span><span>12 دقيقة</span></div>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 md:px-6 prose prose-invert">
          <blockquote><p>موظف IT في شركة متوسطة كلّمني: "والله ما أدري وش تبغانا NCA بالضبط. كل ما نسأل يقولون ارجعوا للضوابط — والضوابط وثيقة 80 صفحة." الامتثال مو لغز — بس محتاج ترجمة عملية.</p></blockquote>
          <h2>ما الذي تفرضه NCA على شركتك؟</h2>
          <ul><li><strong>إدارة الهوية والوصول (IAM):</strong> كل موظف يجب أن يملك صلاحيات تتناسب مع دوره فقط. تطبيق المصادقة الثنائية (MFA) إلزامي.</li><li><strong>مراقبة الأحداث الأمنية:</strong> نظام لتسجيل الأحداث وتحليلها. الاحتفاظ بسجلات لمدة سنة.</li><li><strong>أمن نقاط النهاية:</strong> حماية جميع الأجهزة المتصلة بالشبكة.</li><li><strong>إدارة الثغرات:</strong> فحص دوري ومعالجة خلال فترة محددة.</li><li><strong>الاستجابة للحوادث:</strong> خطة موثّقة واضحة.</li></ul>
          <h2>ما الذي يفرضه PDPL؟</h2>
          <p>جمع البيانات بموافقة صريحة. تحديد الغرض. حق المستخدم في طلب حذف بياناته. الإبلاغ عن أي اختراق خلال 72 ساعة.</p>
          <p><strong>العقوبات:</strong> غرامات تصل إلى 5 ملايين ريال للمخالفات الجسيمة.</p>
          <h2>خطة عملية للامتثال في 30 يوماً</h2>
          <p><strong>الأسبوع الأول:</strong> جرد كامل للأنظمة والبيانات.</p>
          <p><strong>الأسبوع الثاني:</strong> تطبيق MFA على جميع الحسابات.</p>
          <p><strong>الأسبوع الثالث:</strong> مراجعة سياسة الخصوصية.</p>
          <p><strong>الأسبوع الرابع:</strong> توثيق خطة الاستجابة للحوادث.</p>
        </div>
      </section>
    </>
  );
}