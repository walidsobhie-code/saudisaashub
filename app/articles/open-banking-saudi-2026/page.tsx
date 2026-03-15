import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'دليل Open Banking في السعودية 2026 | SaudiSaaSHub',
  description: 'دليل شامل لـ Open Banking في السعودية 2026. تعرّف على مبادرة ساما، وكيف تستفيد شركتك من API البنوك المفتوح.',
  keywords: 'Open Banking السعودية, بنكية مفتوحة, API البنوك, ساما',
};

export default function Page() {
  return (
    <>
      <section className="py-10 md:py-14 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <Breadcrumb items={[{ label: 'الرئيسية', href: '/' }, { label: 'المقالات', href: '/articles' }, { label: 'Open Banking في السعودية', href: '/articles/open-banking-saudi-2026' }]} />
          <div className="flex flex-wrap gap-2 mb-5">
            <Link href="/articles?category=تقنية_مالية" className="px-3 py-1 text-sm rounded-full bg-green-500/10 text-green-400 border border-green-500/20">تقنية مالية</Link>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white">دليل Open Banking في السعودية 2026: كيف يفيد شركتك؟</h1>
          <div className="flex items-center gap-4 text-text-muted text-sm"><span>مارس 2026</span><span>•</span><span>8 دقائق</span></div>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 md:px-6 prose prose-invert">
          <blockquote><p>تخيّل تفتح تطبيق محاسبة واحد — وتشوف فيه كل حساباتك في البنوك الخمسة، ومدفوعاتك، وفواتيرك — كلها في مكان واحد. هذا ما يتيحه Open Banking — وهو متاح الآن في السعودية.</p></blockquote>
          <h2>ما الذي يتيحه Open Banking؟</h2>
          <h3>للأفراد:</h3><p>تجميع كل حساباتك في تطبيق واحد. الحصول على توصيات مالية مخصصة.</p>
          <h3>للمنشآت الصغيرة:</h3><p>ربط بيانات المبيعات مع الحسابات البنكية لتقارير نقدية فورية.</p>
          <h3>لشركات FinTech:</h3><p>بناء خدماتayments وتمويل مبتكرة على قاعدة Open Banking.</p>
        </div>
      </section>
    </>
  );
}