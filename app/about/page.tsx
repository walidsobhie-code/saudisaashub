import Link from 'next/link';
import { VerifiedBadge } from '@/components/VerifiedBadge';

export const metadata = {
  title: 'عن المنصة - SaudiSaaSHub',
  description: 'تعرف على SaudiSaaSHub - المصدرك الأول لـ SaaS في المملكة العربية السعودية',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <img src="/logo.png" alt="SaudiSaaSHub" className="w-20 h-20 rounded-xl object-contain bg-white" />
            <h1 className="text-4xl md:text-5xl font-bold gradient-text flex items-center gap-3">
              Saudi SaaS Hub
              <VerifiedBadge size="lg" />
            </h1>
          </div>

          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            المصدرك الأول لأحدث أخبار التقنية والأعمال في المملكة العربية السعودية
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="gradient-border p-8 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-accent-green/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-white">رؤيتنا</h2>
              <p className="text-text-secondary leading-relaxed">
                نسعى لأن نكون المرجع الأول لكل ما يتعلق بقطاع البرمجيات كخدمة (SaaS) في المملكة العربية السعودية. نحن نؤمن بأن المحتوى العربي المميز يمكن أن يغير من مستقبل الشركات الناشئة والرواد في المنطقة.
              </p>
            </div>

            <div className="gradient-border p-8 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-white">مهمتنا</h2>
              <p className="text-text-secondary leading-relaxed">
                تقديم محتوى عالي الجودة ومفيد حول البرمجيات كخدمة، الشركات الناشئة، والتسويق الرقمي، مع التركيز على السوق السعودي والخليجي. نساعد الشركات على النمو من خلال التحليلات والتوصيات العملية.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 bg-card/30">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-12 text-center">ما نقدمه</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                ),
                title: 'مقالات متخصصة',
                description: 'محتوانا يغطي SaaS، التسويق الرقمي، التقنية، والأعمال مع تركيز على السوق السعودي',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                ),
                title: 'بحث ذكي',
                description: 'محرك بحث متقدم يتيح لك العثور على الشركات، المقالات، والأحداث بسهولة',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'دليل الشركات',
                description: 'قائمة شاملة لأهم شركات SaaS السعودية مع التفاصيل والمراجعات',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
                title: 'فعاليات تقنية',
                description: 'آخر الفعاليات التقنية في السعودية والمنطقة مع روابط التسجيل',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                title: 'تحليلات السوق',
                description: 'رؤى وتقارير عن اتجاهات SaaS والفرص في السوق السعودي',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: 'مجتمع',
                description: 'انضم إلى مجتمعنا من رواد الأعمال والمطورين في السعودية',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-xl border border-white/5 p-6 hover:border-accent-green/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-green/10 to-purple-500/10 flex items-center justify-center mb-4 text-accent-green">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">{feature.title}</h3>
                <p className="text-text-secondary text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-12 text-center">الفريق</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'فريق التحرير',
                role: 'المحررون',
                bio: 'نخبة من الكتاب والمحررين المتخصصين في التقنية والأعمال',
                icon: '✍️',
              },
              {
                name: 'المساهمون',
                role: 'كتاب الضيوف',
                bio: 'خبراء ومحللون منIndustry يساهمون بمحتوى متخصص',
                icon: '🤝',
              },
              {
                name: 'المجتمع',
                role: 'أنتم',
                bio: 'رواد الأعمال والمطورين الذين يشاركوننا الرؤية',
                icon: '👥',
              },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-card rounded-xl border border-white/5 p-6 text-center hover:border-accent-green/30 transition-all"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-accent-green/10 to-purple-500/10 flex items-center justify-center text-3xl">
                  {member.icon}
                </div>
                <h3 className="text-xl font-bold mb-1 text-white">{member.name}</h3>
                <p className="text-accent-green text-sm mb-3">{member.role}</p>
                <p className="text-text-secondary text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-b from-transparent to-accent-green/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">هل تريد المساهمة معنا؟</h2>
          <p className="text-text-secondary mb-8">
            نحن نرحبب الكتاب الضيوف والمحررين المتخصصين. إذا كان لديك خبرة في SaaS أو التقنية، تواصل معنا.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-accent-green text-background font-bold hover:shadow-glow-green transition-all"
          >
            تواصل معنا
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
