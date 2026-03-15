import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'أفضل أنظمة إدارة العيادات (EHR) للقطاع الخاص في السعودية 2026 | SaudiSaaSHub',
  description: 'مقارنة أفضل أنظمة السجل الطبي الإلكتروني (EHR) للعيادات الخاصة في السعودية 2026.',
  keywords: 'نظام EHR للعيادات السعودية, سجل طبي إلكتروني, برنامج إدارة عيادة, نفيس',
};

export default function Page() {
  return (
    <>
      <section className="py-10 md:py-14 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <Breadcrumb items={[{ label: 'الرئيسية', href: '/' }, { label: 'المقالات', href: '/articles' }, { label: 'أنظمة EHR للعيادات', href: '/articles/ehr-clinics-saudi-2026' }]} />
          <div className="flex flex-wrap gap-2 mb-5">
            <Link href="/articles?category=صحة_رقمية" className="px-3 py-1 text-sm rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">صحة رقمية</Link>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white">أفضل أنظمة إدارة العيادات (EHR) للقطاع الخاص في السعودية 2026</h1>
          <div className="flex items-center gap-4 text-text-muted text-sm"><span>مارس 2026</span><span>•</span><span>9 دقائق</span></div>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 md:px-6 prose prose-invert">
          <blockquote><p>الدكتور يرى 40 مريضاً في اليوم. وبعد كل مريض يكتب الملاحظات في نموذج ورقي. في نهاية السنة؟ أرشيف لا أحد يستطيع البحث فيه. وإذا المريض جاء بعد سنتين؟ من الصفر.</p></blockquote>
          <h2>معايير الاختيار</h2>
          <ul><li>تخصصك الطبي (أسنان / نساء وولادة / عيون / عام؟)</li><li>حجم العيادة (طبيب واحد / عيادة مشتركة / سلسلة)</li><li>التكامل المطلوب (مختبر / صيدلية / تأمين / زاتكا)</li></ul>
          <h2>أبرز الأنظمة في السوق السعودي</h2>
          <ul><li><strong>Clinic Master:</strong> الأكثر انتشاراً للعيادات الصغيرة والمتوسطة</li><li><strong>Habib EHR:</strong> طوّرته مجموعة الحبيب الطبية</li><li><strong> Athena Health:</strong> حل عالمي مع تخصيص محلي</li></ul>
        </div>
      </section>
    </>
  );
}