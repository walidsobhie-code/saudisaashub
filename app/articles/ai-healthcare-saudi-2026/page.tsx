import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'الذكاء الاصطناعي في الرعاية الصحية السعودية 2026 | SaudiSaaSHub',
  description: 'كيف يُحوّل الذكاء الاصطناعي قطاع الرعاية الصحية في السعودية 2026؟ تطبيقات AI في التشخيص والإدارة.',
  keywords: 'ذكاء اصطناعي في الصحة, AI الرعاية الصحية, HealthTech AI, تشخيص AI',
};

export default function Page() {
  return (
    <>
      <section className="py-10 md:py-14 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <Breadcrumb items={[{ label: 'الرئيسية', href: '/' }, { label: 'المقالات', href: '/articles' }, { label: 'AI في الرعاية الصحية', href: '/articles/ai-healthcare-saudi-2026' }]} />
          <div className="flex flex-wrap gap-2 mb-5">
            <Link href="/articles?category=صحة_رقمية" className="px-3 py-1 text-sm rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">صحة رقمية</Link>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white">الذكاء الاصطناعي في الرعاية الصحية السعودية 2026: التطبيقات والفرص والتحديات</h1>
          <div className="flex items-center gap-4 text-text-muted text-sm"><span>مارس 2026</span><span>•</span><span>10 دقائق</span></div>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 md:px-6 prose prose-invert">
          <blockquote><p>طبيب أشعة شاطر يراجع 80 صورة في اليوم. نظام AI يراجع 80 صورة في الدقيقة — بدقة 94%. السؤال الأصح: "كيف يُضاعف AI كفاءة الطبيب؟"</p></blockquote>
          <h2>التطبيقات الأكثر تأثيراً</h2>
          <ol><li><strong>AI في تحليل الأشعة:</strong> يكتشف أورام الثدي وسرطانات الرئة بدقة تضاهي الخبراء</li><li><strong>التنبؤ بإعادة الدخول المستشفى:</strong> يتنبأ بالمرضى الأكثر عرضة للعودة</li><li><strong>المساعدون الافتراضيون:</strong> يردون على أسئلة المرضى ويُذكّرون بالأدوية</li></ol>
          <h2>التحديات</h2>
          <ul><li><strong>جودة البيانات:</strong> أنظمة EHR الموزعة تعني بيانات غير منظّمة</li><li><strong>الاعتماد:</strong> AI التشخيصي يحتاج اعتماداً من وزارة الصحة</li></ul>
        </div>
      </section>
    </>
  );
}