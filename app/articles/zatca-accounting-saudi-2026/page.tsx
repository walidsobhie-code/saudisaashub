import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'أفضل برامج المحاسبة السحابية المتوافقة مع زاتكا 2026 | SaudiSaaSHub',
  description: 'مقارنة أفضل برامج محاسبة سحابية متوافقة مع زاتكا للفاتورة الإلكترونية في السعودية 2026.',
  keywords: 'برنامج محاسبة سحابي زاتكا, فاتورة إلكترونية, محاسبة SaaS, زاتكا المرحلة الثانية',
};

export default function Page() {
  return (
    <>
      <section className="py-10 md:py-14 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <Breadcrumb items={[{ label: 'الرئيسية', href: '/' }, { label: 'المقالات', href: '/articles' }, { label: 'المحاسبة السحابية مع زاتكا', href: '/articles/zatca-accounting-saudi-2026' }]} />
          <div className="flex flex-wrap gap-2 mb-5">
            <Link href="/articles?category=تقنية_مالية" className="px-3 py-1 text-sm rounded-full bg-green-500/10 text-green-400 border border-green-500/20">تقنية مالية</Link>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white">أفضل برامج المحاسبة السحابية المتوافقة مع زاتكا للشركات السعودية 2026</h1>
          <div className="flex items-center gap-4 text-text-muted text-sm"><span>مارس 2026</span><span>•</span><span>9 دقائق</span></div>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 md:px-6 prose prose-invert">
          <blockquote><p>محاسب الشركة كلّمني: "زاتكا طلبت منا نعدّل كل فواتيرنا القديمة — والنظام القديم ما يدعم المرحلة الثانية." ثلاثة أشهر والحل لسا ما اتخذ.</p></blockquote>
          <p>مع دخول <strong>المرحلة الثانية من الفاتورة الإلكترونية (زاتكا)</strong> حيز التطبيق، برنامج المحاسبة القديم أصبح <strong>غير كافٍ قانونياً</strong>.</p>
          <h2>أفضل الحلول حسب الحجم</h2>
          <h3>للمنشآت الصغيرة:</h3><ul><li><strong>Zoho Books:</strong> يدعم زاتكا بالكامل، من $15/شهر</li><li><strong>Wave:</strong> مجاني للأساسيات</li></ul>
          <h3>للمنشآت المتوسطة:</h3><ul><li><strong>QuickBooks Online:</strong> الأشهر مع تكامل زاتكا</li><li><strong>Odoo:</strong> منصة شاملة (ERP + محاسبة)</li></ul>
        </div>
      </section>
    </>
  );
}