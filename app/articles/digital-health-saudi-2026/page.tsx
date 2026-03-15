import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'الصحة الرقمية في السعودية 2026 | SaudiSaaSHub',
  description: 'تقرير شامل عن سوق الصحة الرقمية في السعودية 2026. أحجام السوق، الاتجاهات، والأنظمة الحكومية.',
  keywords: 'صحة رقمية السعودية 2026, HealthTech, نفيس, مستشفى سيها, رؤية 2030 صحة',
};

export default function Page() {
  return (
    <>
      <section className="py-10 md:py-14 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <Breadcrumb items={[{ label: 'الرئيسية', href: '/' }, { label: 'المقالات', href: '/articles' }, { label: 'الصحة الرقمية في السعودية', href: '/articles/digital-health-saudi-2026' }]} />
          <div className="flex flex-wrap gap-2 mb-5">
            <Link href="/articles?category=صحة_رقمية" className="px-3 py-1 text-sm rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">صحة رقمية</Link>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white">الصحة الرقمية في السعودية 2026: نظرة شاملة على السوق والفرص</h1>
          <div className="flex items-center gap-4 text-text-muted text-sm"><span>مارس 2026</span><span>•</span><span>11 دقيقة</span></div>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 md:px-6 prose prose-invert">
          <blockquote><p>دخلت مستشفى خاصاً كبيراً. قالوك: "الملف ما عندنا — فين عملت آخر زيارة؟" 2026 — وملفك الطبي لسا ورقة في درج مهجور.</p></blockquote>
          <p>تُقدّر <strong>إيرادات سوق الصحة الرقمية</strong> بالمملكة بمليار دولار أمريكي في 2026، بمعدل نمو سنوي 9.94%.</p>
          <h2>المحركات الرئيسية للنمو</h2>
          <ul><li><strong>نظام نفيس:</strong> السجل الصحي الموحّد على مستوى المملكة</li><li><strong>مستشفى سيها الافتراضي:</strong> أكبر مستشفى رقمي في المنطقة</li><li><strong>20 مليون مسجّل:</strong> في مراكز الرعاية الأولية</li></ul>
          <h2>أبرز فرص SaaS في القطاع الصحي</h2>
          <ul><li>أنظمة إدارة المستشفيات (HIS)</li><li>EHR للعيادات الخاصة (90%+ لا تزال تستخدم نظاماً ورقياً)</li><li>منصات التطبيب عن بعد</li><li>تطبيقات إدارة الأمراض المزمنة</li></ul>
        </div>
      </section>
    </>
  );
}