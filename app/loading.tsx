export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full gradient-bg flex items-center justify-center animate-pulse">
          <span className="text-white font-bold text-2xl">S</span>
        </div>
        <p className="text-text-secondary">جاري التحميل...</p>
      </div>
    </div>
  );
}
