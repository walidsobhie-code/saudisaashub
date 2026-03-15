import { Hero } from '@/components/Hero';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* ========================================
          PRIORITIZED NAVIGATION - All Pages Accessible
          Organized by traffic priority
      ======================================== */}
      <section className="py-20 bg-background" aria-label="تصفح المنصة">
        <div className="max-w-7xl mx-auto px-4">

          {/* Priority 1: Core Navigation - Most Important */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <span className="w-2 h-8 rounded-full bg-accent-green"></span>
              الأقسام الرئيسية
            </h2>
            <p className="text-text-secondary mb-8">الأقسام الأكثر زيارة على المنصة</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Companies - Most Important */}
              <Link href="/companies" className="group p-8 rounded-3xl bg-gradient-to-br from-accent-green/10 to-transparent border border-accent-green/20 hover:border-accent-green/50 transition-all hover:-translate-y-2">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-2xl bg-accent-green/20 text-accent-green">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-accent-green transition-colors">شركات SaaS</h3>
                    <span className="text-accent-green text-sm font-medium">250+ شركة</span>
                  </div>
                </div>
                <p className="text-text-secondary">دليل شامل لجميع شركات البرمجيات كخدمة في السعودية</p>
              </Link>

              {/* Articles */}
              <Link href="/articles" className="group p-8 rounded-3xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 hover:border-purple-500/50 transition-all hover:-translate-y-2">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-400">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">المقالات</h3>
                    <span className="text-purple-400 text-sm font-medium">أدلة ومقالات</span>
                  </div>
                </div>
                <p className="text-text-secondary">تحليلات عميقة وأدلة عملية لقطاع SaaS</p>
              </Link>

              {/* News */}
              <Link href="/news" className="group p-8 rounded-3xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 hover:border-blue-500/50 transition-all hover:-translate-y-2">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-2xl bg-blue-500/20 text-blue-400">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">الأخبار</h3>
                    <span className="text-blue-400 text-sm font-medium">أحدث التحديثات</span>
                  </div>
                </div>
                <p className="text-text-secondary">أخبار الشركات الناشئة والتمويل والتطويرات</p>
              </Link>
            </div>
          </div>

          {/* Priority 2: Important Resources */}
          <div className="mb-16">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
              <span className="w-2 h-6 rounded-full bg-amber-400"></span>
              الموارد المهمة
            </h2>
            <p className="text-text-secondary mb-8">أدوات ومعلومات أساسية لرواد الأعمال</p>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <Link href="/about" className="group p-5 rounded-2xl bg-card/50 border border-white/5 hover:border-white/20 transition-all text-center">
                <span className="text-3xl mb-2 block">🏢</span>
                <span className="text-white font-medium text-sm">عن المنصة</span>
              </Link>
              <Link href="/funding" className="group p-5 rounded-2xl bg-card/50 border border-white/5 hover:border-white/20 transition-all text-center">
                <span className="text-3xl mb-2 block">💰</span>
                <span className="text-white font-medium text-sm">التمويل</span>
              </Link>
              <Link href="/reports" className="group p-5 rounded-2xl bg-card/50 border border-white/5 hover:border-white/20 transition-all text-center">
                <span className="text-3xl mb-2 block">📊</span>
                <span className="text-white font-medium text-sm">التقارير</span>
              </Link>
              <Link href="/zatca" className="group p-5 rounded-2xl bg-card/50 border border-white/5 hover:border-white/20 transition-all text-center">
                <span className="text-3xl mb-2 block">📋</span>
                <span className="text-white font-medium text-sm">ZATCA</span>
              </Link>
              <Link href="/events" className="group p-5 rounded-2xl bg-card/50 border border-white/5 hover:border-white/20 transition-all text-center">
                <span className="text-3xl mb-2 block">🎯</span>
                <span className="text-white font-medium text-sm">الفعاليات</span>
              </Link>
              <Link href="/search" className="group p-5 rounded-2xl bg-card/50 border border-white/5 hover:border-white/20 transition-all text-center">
                <span className="text-3xl mb-2 block">🔍</span>
                <span className="text-white font-medium text-sm">بحث</span>
              </Link>
            </div>
          </div>

          {/* Priority 3: Categories */}
          <div className="mb-16">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
              <span className="w-2 h-6 rounded-full bg-cyan-400"></span>
              الفئات
            </h2>
            <p className="text-text-secondary mb-8">تصفح حسب القطاع</p>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {['FinTech', 'HealthTech', 'E-commerce', 'EdTech', 'Logistics', 'Marketing', 'Security', 'HR', 'Analytics', 'Cloud'].map((cat) => (
                <Link
                  key={cat}
                  href={`/category/${cat.toLowerCase()}`}
                  className="group px-5 py-4 rounded-xl bg-card/30 border border-white/5 hover:border-cyan-400/30 hover:bg-cyan-400/5 transition-all text-center"
                >
                  <span className="text-white font-medium">{cat}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Priority 4: Additional Pages */}
          <div>
            <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-3">
              <span className="w-2 h-5 rounded-full bg-text-muted"></span>
              معلومات إضافية
            </h2>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/methodology" className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-text-secondary hover:text-white hover:border-white/30 transition-all text-sm">
                المنهجية
              </Link>
              <Link href="/guides" className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-text-secondary hover:text-white hover:border-white/30 transition-all text-sm">
                الأدلة
              </Link>
              <Link href="/contact" className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-text-secondary hover:text-white hover:border-white/30 transition-all text-sm">
                تواصل معنا
              </Link>
              <Link href="/advisory" className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-text-secondary hover:text-white hover:border-white/30 transition-all text-sm">
                الاستشارات
              </Link>
              <Link href="/news/digest" className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-text-secondary hover:text-white hover:border-white/30 transition-all text-sm">
                النشرة الأسبوعية
              </Link>
              <Link href="/en" className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-text-secondary hover:text-white hover:border-white/30 transition-all text-sm">
                English
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}