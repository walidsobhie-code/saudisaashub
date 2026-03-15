import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'مليون سعودي في الذكاء الاصطناعي: الفرص الوظيفية والتقنية في 2026 | SaudiSaaSHub',
  description: 'مبادرة "مليون سعودي في الذكاء الاصطناعي" من سدايا — ما الفرص الحقيقية؟ دليل شامل للوظائف والأدوات والبرامج التدريبية المتاحة للسعوديين في 2026.',
  keywords: 'مليون سعودي في الذكاء الاصطناعي, وظائف AI السعودية 2026, سدايا تدريب AI, برامج AI بالعربي, مهارات الذكاء الاصطناعي السعودية',
};

export default function Page() {
  return (
    <>
      <section className="py-10 md:py-14 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <Breadcrumb
            items={[
              { label: 'الرئيسية', href: '/' },
              { label: 'المقالات', href: '/articles' },
              { label: 'مليون سعودي في الذكاء الاصطناعي', href: '/articles/million-saudi-ai' },
            ]}
          />

          <div className="flex flex-wrap gap-2 mb-5">
            <Link href="/articles?category=الذكاء_الاصطناعي" className="px-3 py-1 text-sm rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20 transition-colors">
              الذكاء الاصطناعي
            </Link>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white">
            مليون سعودي في الذكاء الاصطناعي: الفرص الوظيفية والتقنية في 2026
          </h1>

          <p className="text-xl text-text-secondary mb-8 leading-relaxed">
            مبادرة "مليون سعودي في الذكاء الاصطناعي" من سدايا — ما الفرص الحقيقية؟ دليل شامل للوظائف والأدوات والبرامج التدريبية المتاحة للسعوديين في 2026.
          </p>

          <div className="flex items-center gap-4 text-text-muted text-sm">
            <span>مارس 2026</span>
            <span>•</span>
            <span>9 دقائق قراءة</span>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-text-secondary prose-a:text-accent-green prose-strong:text-white">
            <blockquote>
              <p>خريج جامعي سألني: "أبغى أشتغل في AI — بس ما عندي خلفية برمجة. هل في فرصة لي؟"</p>
              <p>والله — ما توقعت هالسؤال يكون بهالبساطة.</p>
              <p>الجواب: <strong>نعم. والفرصة أكبر مما تتخيل.</strong></p>
            </blockquote>

            <p>أطلقت <strong>هيئة البيانات والذكاء الاصطناعي (سدايا)</strong> مبادرة طموحة تستهدف تأهيل مليون سعودي في مجال الذكاء الاصطناعي ضمن مساعي رؤية 2030.</p>

            <h2>الوظائف الأعلى طلباً في AI بالسعودية 2026</h2>

            <h3>Prompt Engineer (مهندس الأوامر)</h3>
            <p>مهارة لا تتطلب برمجة. تعلّم كيف "تتحدث" مع نماذج AI بدقة للحصول على نتائج مثالية.</p>
            <p><strong>الرواتب:</strong> تبدأ من 12,000 ريال وترتفع لـ 25,000+ للمتخصصين.</p>

            <h3>AI Product Manager</h3>
            <p>مدير منتج يفهم قدرات وقيود الذكاء الاصطناعي ويترجمها لمتطلبات الأعمال. الأكثر طلباً في شركات التقنية والبنوك والجهات الحكومية.</p>

            <h3>Data Analyst بمهارات AI</h3>
            <p>المحلل الذي يستخدم Python وأدوات AI لاستخراج رؤى من البيانات. متاح لخريجي المالية والإدارة مع 6 أشهر تدريب إضافي.</p>

            <h3>AI Trainer / Quality Reviewer</h3>
            <p>دور جديد كلياً: يراجع مخرجات نماذج AI ويصحح أخطاءها. مناسب للغويين والمتخصصين في الشريعة والقانون.</p>

            <h2>البرامج التدريبية المتاحة للسعوديين الآن</h2>

            <h3>المجانية:</h3>
            <ul>
              <li><strong>منصة Coursera</strong> — بدعم كورسيرا لمؤسسات سعودية، وصل التسجيل لـ 6 ملايين متعلم. دورات Google AI Essentials وIBM AI Fundamentals متاحة بالعربي.</li>
              <li><strong>منصة رواق</strong> — محتوى عربي أصيل في البرمجة والذكاء الاصطناعي بالتعاون مع جامعات سعودية.</li>
            </ul>

            <h3>المدفوعة بدعم حكومي:</h3>
            <ul>
              <li><strong>برامج هدف</strong> تدعم تدريب السعوديين في شركات التقنية وتُسدد جزءاً من التكلفة.</li>
              <li><strong>برامج الجامعات:</strong> جامعة الملك عبدالله للعلوم والتقنية (كاوست) تقدم برامج ماجستير متخصصة في AI مع منح بحثية.</li>
            </ul>

            <h2>كيف تبدأ من الصفر في 90 يوماً؟</h2>

            <p><strong>الشهر الأول:</strong> أتقن استخدام ChatGPT وClaude في مهامك اليومية. ليس نظرياً — بالتطبيق الفعلي في عملك الحالي.</p>

            <p><strong>الشهر الثاني:</strong> تعلّم Prompt Engineering المتقدم + أساسيات Python من Coursera.</p>

            <p><strong>الشهر الثالث:</strong> ابنِ مشروعاً صغيراً يحل مشكلة حقيقية في مجال تخصصك. هذا هو CV الجديد في سوق AI.</p>

            <h2>الخاتمة</h2>
            <p>المملكة تبني منظومة AI من الصفر، وهذا يعني أن المبكرين يحصلون على أفضل الفرص. من يبدأ التعلم اليوم يجد نفسه بعد عام في موقع تنافسي لا يقدر عليه القادمون لاحقاً.</p>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-wrap gap-2">
              <span className="text-text-muted">الوسوم:</span>
              <span className="px-3 py-1 text-sm rounded-full bg-purple-500/10 text-purple-400">#وظائف_AI</span>
              <span className="px-3 py-1 text-sm rounded-full bg-purple-500/10 text-purple-400">#الذكاء_الاصطناعي</span>
              <span className="px-3 py-1 text-sm rounded-full bg-purple-500/10 text-purple-400">#سدايا</span>
              <span className="px-3 py-1 text-sm rounded-full bg-purple-500/10 text-purple-400">#رؤية2030</span>
              <span className="px-3 py-1 text-sm rounded-full bg-purple-500/10 text-purple-400">#مليون_سعودي</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}