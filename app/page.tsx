import Hero from '@/components/Hero';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Quick Links - match Hero theme */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">استكشف المنصة</h2>
            <p className="text-text-secondary">اختر من بين أقسامنا المتعددة</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {[
              { title: 'عن المنصة', href: '/about', icon: '🏢' },
              { title: 'التمويل', href: '/tools/funding-tracker', icon: '💰' },
              { title: 'المقابلات', href: '/interviews', icon: '🎤' },
              { title: 'التحليلات', href: '/analysis', icon: '📊' },
              { title: 'FinTech', href: '/category/fintech', icon: '🏦' },
              { title: 'HealthTech', href: '/category/healthtech', icon: '🏥' },
              { title: 'EdTech', href: '/category/edtech', icon: '🎓' },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex flex-col items-center justify-center p-6 rounded-2xl bg-card/30 border border-white/5 hover:border-accent-green/30 transition-all"
              >
                <span className="text-4xl mb-3">{link.icon}</span>
                <span className="text-lg font-medium text-white text-center">{link.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
