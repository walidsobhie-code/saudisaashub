import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'نظام آسا والدفع الفوري في السعودية 2026 | SaudiSaaSHub',
  description: 'دليل شامل لنظام آسا للدفع الفوري في السعودية 2026. كيف يعمل، كيف يتكامل مع متجرك.',
  keywords: 'نظام آسا السعودية, الدفع الفوري, دفع لحظي, Asa Saudi',
};

export default function Page() {
  return (
    <>
      <section className="py-10 md:py-14 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <Breadcrumb items={[{ label: 'الرئيسية', href: '/' }, { label: 'المقالات', href: '/articles' }, { label: 'نظام آسا للدفع الفوري', href: '/articles/asa-payment-saudi-2026' }]} />
          <div className="flex flex-wrap gap-2 mb-5">
            <Link href="/articles?category=تقنية_مالية" className="px-3 py-1 text-sm rounded-full bg-green-500/10 text-green-400 border border-green-500/20">تقنية مالية</Link>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white">نظام آسا والدفع الفوري في السعودية: ما يحتاج كل تاجر معرفته في 2026</h1>
          <div className="flex items-center gap-4 text-text-muted text-sm"><span>مارس 2026</span><span>•</span><span>8 دقائق</span></div>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 md:px-6 prose prose-invert">
          <blockquote><p>عميلك دفع الساعة 11 مساءً. استيقظت الصبح والفلوس في حسابك. بدون انتظار. بدون رسوم تحويل. هذا هو نظام آسا — وكثير من التجار لم يستغلوه بعد.</p></blockquote>
          <p>أطلق <strong>البنك المركزي السعودي (ساما)</strong> نظام <strong>آسا</strong> — نظام التسويات الفورية — لإتمام الدفع في ثوانٍ معدودة، 24/7.</p>
          <h2>كيف يختلف آسا؟</h2>
          <ul><li><strong>آسا مقابل SADAD:</strong> SADAD للفواتير الحكومية، آسا للمدفوعات الفورية</li><li><strong>آسا مقابل بطاقة مدى:</strong> آسا يعمل بـ QR Code بدون بنية تحتية إضافية</li></ul>
          <h2>كيف تستفيد كتاجر؟</h2>
          <ul><li><strong>للمتاجر الإلكترونية:</strong> تكامل عبر بوابات الدفع (HyperPay, Moyasar)</li><li><strong>للمتاجر الفيزيائية:</strong> QR Code ديناميكي يُولَّد لكل فاتورة</li></ul>
        </div>
      </section>
    </>
  );
}