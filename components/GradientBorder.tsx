'use client';

interface GradientBorderProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
}

export function GradientBorder({ children, className = '', gradient = 'from-accent-green via-accent-purple to-accent-green' }: GradientBorderProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Gradient border */}
      <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r gradient-border-bg" style={{
        background: `linear-gradient(135deg, #00D9A5 0%, #8B5CF6 50%, #00D9A5 100%)`,
      }}>
        <div className="absolute inset-[2px] rounded-[14px] bg-card" />
      </div>
      {/* Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
}
