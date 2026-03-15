import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'التطبيب عن بعد في السعودية 2026 | SaudiSaaSHub',
  description: 'دليل شامل للتطبيب عن بعد في السعودية 2026. قارن أفضل منصات الاستشارة الطبية عن بعد.',
  keywords: 'التطبيب عن بعد السعودية, استشارة طبية عن بعد, telemedicine, سيها, طبيبك',
};

export default function Page() {
  return (
    <>
      <section className="py-10 md:py-14 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <Breadcrumb items={[{ label: 'الرئيسية', href: '/' }, { label: 'المقالات', href: '/articles' }, { label: 'التطبيب عن بعد', href: '/articles/telemedicine-saudi-2026' }]} />
          <div className="flex flex-wrap gap-2 mb-5">
            <Link href="/articles?category=صحة_رقمية" className="px-3 py-1 text-sm rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">صحة رقمية</Link>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white">التطبيب عن بعد في السعودية 2026: دليل اختيار المنصة الأفضل لعيادتك</h1>
          <div className="flex items-center gap-4 text-text-muted text-sm"><span>مارس 2026</span><span>•</span><span>10 دقائق</span></div>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 md:px-6 prose prose-invert">
          <blockquote><p>ساعة ونص انتظار في العicula عشان تبغى وصفة لدواء مزمن تاخذه من سنتين. يا تُرى.. ما كان ممكن هذا يصير عن بعد؟</p></blockquote>
          <p>يُقدَّر حجم الطلب على خدمات الرعاية الصحية عن بعد بـ <strong>415 مليون دولار</strong> — ومعدل النمو السنوي يتجاوز 24%.</p>
          <h2>من يستخدم التطبيب عن بعد؟</h2>
          <ul><li><strong>المرضى في المناطق النائية:</strong> يصلون لأطباء متخصصين دون سفر</li><li><strong>متابعو الأمراض المزمنة:</strong> السكري وارتفاع الضغط</li><li><strong>المرضى النفسيون:</strong> الخصوصية تزيل عائقاً اجتماعياً</li></ul>
          <h2>أبرز المنصات</h2>
          <ul><li><strong>مستشفى سيها الافتراضي:</strong> الأضخم في القطاع الحكومي</li><li><strong>طبيبك:</strong> منصة سعودية للاستشارات الفورية</li><li><strong>Altibbi:</strong> منصة عربية واسعة الانتشار</li></ul>
        </div>
      </section>
    </>
  );
}