import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'FinTech الإسلامي في السعودية 2026: الفرص والأدوات والأنظمة | SaudiSaaSHub',
  description: 'دليل شامل لـ FinTech الإسلامي في السعودية 2026. اكتشف أفضل حلول التمويل الشرعي، BNPL الإسلامي، والاستثمار المتوافق مع الشريعة.',
  keywords: 'FinTech إسلامي السعودية, تقنية مالية متوافقة الشريعة, BNPL السعودية, تمارا, تابي',
};

export default function Page() {
  return (
    <>
      <section className="py-10 md:py-14 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <Breadcrumb items={[{ label: 'الرئيسية', href: '/' }, { label: 'المقالات', href: '/articles' }, { label: 'FinTech الإسلامي في السعودية', href: '/articles/islamic-fintech-saudi-2026' }]} />
          <div className="flex flex-wrap gap-2 mb-5">
            <Link href="/articles?category=تقنية_مالية" className="px-3 py-1 text-sm rounded-full bg-green-500/10 text-green-400 border border-green-500/20">تقنية مالية</Link>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white">FinTech الإسلامي في السعودية 2026: الفرص والأدوات والأنظمة</h1>
          <div className="flex items-center gap-4 text-text-muted text-sm"><span>مارس 2026</span><span>•</span><span>10 دقائق</span></div>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 md:px-6 prose prose-invert">
          <blockquote><p>فتحت تطبيق استثمار وطلب منك "موافق على الفائدة." قفّلته. لأنك — زي معظم السعوديين — تبغى استثمار حلال بدون ما تتنازل عن عائد جيد. هل في خيارات فعلية؟ الجواب: أيوه — وأكثر مما تتخيل.</p></blockquote>
          <h2>لماذا FinTech الإسلامي؟</h2>
          <ul><li><strong>حجم السوق:</strong> السوق المالي الإسلامي يتجاوز 3.5 تريليون دولار</li><li><strong>الطلب المحلي:</strong> 95%+ من المستهلكين يُفضّلون المنتجات المتوافقة مع الشريعة</li></ul>
          <h2>القطاعات الأسرع نمواً</h2>
          <ol><li><strong>BNPL الإسلامي:</strong> تمارا وتابي تجاوزت قاعدة عملاء 10 ملايين</li><li><strong>الاستثمار الرقمي الشرعي:</strong> منصات تُصمّم محافظ استثمارية متوافقة</li><li><strong>التكافل الرقمي:</strong> التأمين التعاوني عبر تطبيقات رقمية</li></ol>
          <h2>البيئة التنظيمية</h2>
          <p><strong>ساما</strong> تمتلك بيئة Sandbox التنظيمية. تجاوز عدد شركات التقنية المالية المرخّصة <strong>207 شركات</strong> بنهاية 2023.</p>
        </div>
      </section>
    </>
  );
}