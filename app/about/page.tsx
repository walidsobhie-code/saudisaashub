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

      {/* Mission */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4 shadow-glow-pink">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">رؤيتنا</h2>
              <p className="text-text-secondary">
                نسعى لأن نكون المرجع الأول لكل ما يتعلق بقطاع البرمجيات كخدمة (SaaS) في المملكة العربية السعودية، ونقدم محتوى عربي مميز يساعد رواد الأعمال والمطورين على النجاح في هذا المجال.
              </p>
            </div>

            <div>
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4 shadow-glow-purple">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">مهمتنا</h2>
              <p className="text-text-secondary">
                تقديم محتوى عالي الجودة ومفيد حول البرمجيات كخدمة، الشركات الناشئة، والتسويق الرقمي، مع التركيز على السوق السعودي والخليجي.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-card/30">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">ما يميزنا</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '📚',
                title: 'محتوى موثق',
                description: 'جميع مقالاتنا موثقة ومدققة لضمان دقة المعلومات',
              },
              {
                icon: '🌍',
                title: 'تركيز محلي',
                description: 'محتوى مخصص للسوق السعودي والخليجي',
              },
              {
                icon: '⚡',
                title: 'تحديث مستمر',
                description: 'نقدم أحدث المعلومات والتحديثات في عالم التقنية',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="gradient-border p-6 rounded-2xl text-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-text-secondary text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-8">تواصل معنا</h2>
          <p className="text-text-secondary mb-8">
            يمكنك التواصل معنا عبر وسائل التواصل الاجتماعي
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://x.com/SaudiSaaSHub"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-card border border-white/10 flex items-center justify-center hover:border-accent-pink/30 transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/saudisaashub"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-card border border-white/10 flex items-center justify-center hover:border-accent-pink/30 transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/saudisaashub/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-card border border-white/10 flex items-center justify-center hover:border-accent-pink/30 transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61586893616132"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-card border border-white/10 flex items-center justify-center hover:border-accent-pink/30 transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
