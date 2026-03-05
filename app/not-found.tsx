import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        {/* 404 Animation */}
        <div className="relative mb-8">
          <span className="text-[150px] md:text-[200px] font-bold gradient-text leading-none">404</span>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full gradient-bg blur-3xl opacity-30" />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold mb-4">الصفحة غير موجودة</h1>
        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى مكان آخر
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-8 py-3 rounded-xl gradient-bg text-white font-semibold hover:shadow-glow-pink transition-all"
          >
            العودة للرئيسية
          </Link>
          <Link
            href="/articles"
            className="px-8 py-3 rounded-xl bg-card border border-white/10 text-white font-semibold hover:border-accent-pink/30 transition-all"
          >
            تصفح المقالات
          </Link>
        </div>
      </div>
    </div>
  );
}
