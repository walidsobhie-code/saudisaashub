import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'عن Saudi SaaS Hub | فريقنا ورسالتنا',
  description: 'تعرف على فريق Saudi SaaS Hub ورسالتنا في توفير دليل شامل لأفضل شركات SaaS في المملكة العربية السعودية',
  keywords: 'Saudi SaaS Hub, فريق, منصة, SaaS, السعودية, الشركات الناشئة',
  openGraph: {
    title: 'عن Saudi SaaS Hub',
    description: 'تعرف على فريقنا ورسالتنا',
    type: 'website',
    url: 'https://saudisaashub.pages.dev/about',
  },
  alternates: {
    canonical: 'https://saudisaashub.pages.dev/about',
  },
};

const teamMembers = [
  {
    role: 'المؤسس والمدير التنفيذي',
    bio: 'خبرة extensive في مجال التكنولوجيا والاستثمار في المنطقة العربية',
    initial: '✱',
  },
  {
    role: 'رئيس المنتج',
    bio: 'خبير في تجربة المستخدم والتصميم، يركز على بناء منصة سهلة وبديهية',
    initial: '◆',
  },
  {
    role: 'المدير التقني',
    bio: 'مهندس برمجيات ذو خبرة في تطوير التطبيقات الحديثة والبنى التحتية',
    initial: '⚡',
  },
  {
    role: 'مدير المحتوى',
    bio: 'متخصص في التسويق والمحتوى التقني، يكتب تحليلات وأخبار عن مشهد SaaS السعودي',
    initial: '✎',
  },
  {
    role: 'مهندس البيانات',
    bio: 'مسؤول عن جمع، تحليل، وضمان دقة بيانات الشركات',
    initial: '📊',
  },
  {
    role: 'مصمم UI/UX',
    bio: 'يهتم بتصميم الواجهات وتجربة المستخدم، ويحرص على جعلها جميلة وسهلة',
    initial: '◈',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hreflang */}
      <link rel="alternate" hrefLang="ar" href="https://saudisaashub.pages.dev/about" />
      <link rel="alternate" hrefLang="en" href="https://saudisaashub.pages.dev/en/about" />
      <link rel="alternate" hrefLang="x-default" href="https://saudisaashub.pages.dev/about" />

      <div className="min-h-screen bg-background py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Hero */}
          <section className="text-center py-16 mb-12">
            <h1 className="text-5xl font-bold text-white mb-6">عن Saudi SaaS Hub</h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              منصة شاملة تعرض أفضل شركات البرمجيات كخدمة في المملكة العربية السعودية.
              نحن نربط الشركات الناشئة بالمستثمرين والعملاء، ونساهم في نمو القطاع التقني.
            </p>
          </section>

          {/* Mission */}
          <section className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 border border-white/5 mb-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-6">رسالتنا</h2>
              <p className="text-text-secondary text-lg leading-loose mb-6">
                مهمتنا هي توفير دليل شامل وموثوق لأفضل شركات SaaS في المملكة العربية السعودية.
                نؤمن بأن الشفافية والبيانات الدقيقة تساعد في بناء ثقة بين الشركات والعملاء، ونساهم في تحويل السعودية إلى وجهة رائدة للتقنية والابتكار.
              </p>
              <p className="text-text-secondary text-lg leading-loose">
                نسعى إلى أن نكون المصدر الأول للمعلومات عن قطاع SaaS في المنطقة، ونساعد رواد الأعمال على اتخاذ قرارات مستنيرة من خلال البيانات والتحليلات.
              </p>
            </div>
          </section>

          {/* Team */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">الفريق</h2>
              <p className="text-text-secondary">تعرف على الأشخاص الذين يقفون وراء Saudi SaaS Hub</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, idx) => (
                <div
                  key={idx}
                  className="bg-card/30 backdrop-blur-sm rounded-2xl p-6 border border-white/5 hover:border-accent-green/30 transition-all text-center group"
                >
                  <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-accent-green/20 via-accent-cyan/20 to-accent-purple/20 flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform">
                    <span className="text-4xl font-bold text-white/80">{member.initial}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{member.role}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 border border-white/5 mb-12">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-6">تواصل معنا</h2>
              <p className="text-text-secondary mb-8">
                هل لديك سؤال أو اقتراح؟ نود معرفة رأيك!
              </p>
              <a
                href="mailto:saudisaashub@outlook.com"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-accent-green to-accent-cyan text-black font-bold hover:shadow-lg hover:shadow-accent-green/20 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                أرسل لنا رسالة
              </a>
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t border-white/10 pt-8 text-center text-text-muted text-sm">
            <p>© 2026 Saudi SaaS Hub. جميع الحقوق محفوظة.</p>
            <div className="mt-4 flex justify-center gap-6">
              <Link href="/" className="hover:text-accent-green transition-colors">الرئيسية</Link>
              <Link href="/companies" className="hover:text-accent-green transition-colors">دليل الشركات</Link>
              <Link href="/articles" className="hover:text-accent-green transition-colors">المقالات</Link>
              <Link href="/about" className="hover:text-accent-green transition-colors">عنّا</Link>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
