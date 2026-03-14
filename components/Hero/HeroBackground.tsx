'use client';

import { useEffect, useState, useRef } from 'react';

interface HeroBackgroundProps {
  mousePosition: { x: number; y: number };
}

export function HeroBackground({ mousePosition }: HeroBackgroundProps) {
  const [mounted, setMounted] = useState(false);
  const blobsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent SSR mismatch
  if (!mounted) return null;

  return (
    <div className="absolute inset-0 bg-background overflow-hidden">
      {/* ========================================
          ANIMATED MESH GRADIENT
      ======================================== */}
      <div
        className="absolute top-0 left-0 w-full h-full opacity-60"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 40%, rgba(16, 185, 129, 0.18) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 60%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 50% 30% at 50% 80%, rgba(0, 217, 165, 0.1) 0%, transparent 40%)
          `,
          animation: 'gradient-shift 15s ease infinite',
          backgroundSize: '200% 200%',
        }}
      />

      {/* ========================================
          PARALLAX FLOATING BLOBS
      ======================================== */}
      {/* Primary green blob */}
      <div
        ref={(el) => { if (el) blobsRef.current[0] = el; }}
        className="absolute top-[5%] left-[0%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.35) 0%, transparent 70%)',
          transform: `translate(${mousePosition.x * 1.2}px, ${mousePosition.y * 1.2}px)`,
          transition: 'transform 0.3s ease-out',
          animation: 'blob-float-1 20s ease-in-out infinite',
          filter: 'blur(60px)',
        }}
      />

      {/* Purple blob */}
      <div
        className="absolute top-[25%] right-[0%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
          transform: `translate(${-mousePosition.x * 0.8}px, ${-mousePosition.y * 0.8}px)`,
          transition: 'transform 0.3s ease-out',
          animation: 'blob-float-2 25s ease-in-out infinite',
          animationDelay: '-5s',
          filter: 'blur(50px)',
        }}
      />

      {/* Cyan blob */}
      <div
        className="absolute bottom-[10%] left-[15%] w-[450px] h-[450px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, transparent 70%)',
          transform: `translate(${mousePosition.x * 0.5}px, ${-mousePosition.y * 0.5}px)`,
          transition: 'transform 0.3s ease-out',
          animation: 'blob-float-3 22s ease-in-out infinite',
          animationDelay: '-10s',
          filter: 'blur(45px)',
        }}
      />

      {/* Golden accent blob */}
      <div
        className="absolute top-[50%] left-[40%] w-[300px] h-[300px] rounded-full pointer-events-none hidden lg:block"
        style={{
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%)',
          transform: `translate(${-mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
          transition: 'transform 0.3s ease-out',
          animation: 'blob-float-1 18s ease-in-out infinite',
          animationDelay: '-7s',
          filter: 'blur(40px)',
        }}
      />

      {/* ========================================
          GEOMETRIC SHAPES GRID
      ======================================== */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />

      {/* ========================================
          FLOATING GEOMETRIC ELEMENTS
      ======================================== */}
      {/* Diamond shapes */}
      <div
        className="absolute top-20 left-[10%] w-4 h-4 bg-accent-green/30 rotate-45"
        style={{
          animation: 'geo-float-1 12s ease-in-out infinite',
        }}
      />
      <div
        className="absolute top-40 right-[15%] w-3 h-3 border border-purple-400/40 rotate-45"
        style={{
          animation: 'geo-float-2 14s ease-in-out infinite',
          animationDelay: '-2s',
        }}
      />

      {/* Circle shapes */}
      <div
        className="absolute top-[60%] left-[5%] w-5 h-5 rounded-full border border-cyan-400/30"
        style={{
          animation: 'geo-float-3 10s ease-in-out infinite',
          animationDelay: '-4s',
        }}
      />
      <div
        className="absolute top-[30%] right-[8%] w-2 h-2 bg-amber-400/40 rounded-full"
        style={{
          animation: 'geo-float-1 8s ease-in-out infinite',
          animationDelay: '-1s',
        }}
      />

      {/* Line accents */}
      <div
        className="absolute top-[45%] left-[12%] w-1 h-16 bg-gradient-to-t from-accent-green/60 to-transparent rounded-full"
        style={{
          animation: 'geo-float-2 15s ease-in-out infinite',
          animationDelay: '-3s',
        }}
      />
      <div
        className="absolute top-[20%] right-[25%] w-1.5 h-10 bg-gradient-to-b from-purple-400/50 to-transparent rounded-full"
        style={{
          animation: 'geo-float-3 11s ease-in-out infinite',
          animationDelay: '-5s',
        }}
      />

      {/* Additional decorative elements */}
      <div
        className="absolute bottom-[30%] right-[20%] w-3 h-3 bg-accent-cyan/30 rotate-12"
        style={{
          animation: 'geo-float-1 9s ease-in-out infinite',
          animationDelay: '-6s',
        }}
      />
      <div
        className="absolute bottom-[50%] left-[30%] w-2 h-2 border border-accent-green/30 rounded-full"
        style={{
          animation: 'geo-float-2 13s ease-in-out infinite',
          animationDelay: '-8s',
        }}
      />

      {/* ========================================
          RIYADH SKYLINE SILHOUETTE
      ======================================== */}
      <div className="absolute bottom-0 left-0 right-0 h-32 md:h-48 pointer-events-none opacity-25">
        <svg viewBox="0 0 1200 300" preserveAspectRatio="xMidYMax slice" className="w-full h-full">
          <defs>
            <linearGradient id="skylineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(16,185,129,0.3)" />
              <stop offset="50%" stopColor="rgba(16,185,129,0.15)" />
              <stop offset="100%" stopColor="rgba(16,185,129,0)" />
            </linearGradient>
            {/* Building windows - blinking lights */}
            <g id="building-lights">
              <rect x="45" y="230" width="4" height="4" fill="rgba(16,185,129,0.6)" className="blink-1" />
              <rect x="55" y="225" width="4" height="4" fill="rgba(16,185,129,0.4)" className="blink-2" />
              <rect x="145" y="180" width="4" height="4" fill="rgba(139,92,246,0.5)" className="blink-3" />
              <rect x="155" y="170" width="4" height="4" fill="rgba(16,185,129,0.6)" className="blink-1" />
              <rect x="165" y="185" width="4" height="4" fill="rgba(6,182,212,0.4)" className="blink-2" />
              <rect x="245" y="160" width="4" height="4" fill="rgba(16,185,129,0.5)" className="blink-3" />
              <rect x="255" y="150" width="4" height="4" fill="rgba(139,92,246,0.6)" className="blink-1" />
              <rect x="265" y="165" width="4" height="4" fill="rgba(16,185,129,0.4)" className="blink-2" />
              <rect x="445" y="140" width="4" height="4" fill="rgba(6,182,212,0.5)" className="blink-3" />
              <rect x="455" y="130" width="4" height="4" fill="rgba(16,185,129,0.6)" className="blink-1" />
              <rect x="585" y="145" width="4" height="4" fill="rgba(139,92,246,0.4)" className="blink-2" />
              <rect x="695" y="170" width="4" height="4" fill="rgba(16,185,129,0.5)" className="blink-3" />
              <rect x="785" y="155" width="4" height="4" fill="rgba(6,182,212,0.6)" className="blink-1" />
              <rect x="885" y="175" width="4" height="4" fill="rgba(16,185,129,0.4)" className="blink-2" />
              <rect x="985" y="160" width="4" height="4" fill="rgba(139,92,246,0.5)" className="blink-3" />
              <rect x="1085" y="145" width="4" height="4" fill="rgba(16,185,129,0.6)" className="blink-1" />
            </g>
          </defs>
          {/* Buildings */}
          <path
            d="M0,300 L0,250 L40,250 L40,200 L80,200 L80,180 L100,180 L100,220 L120,220 L120,180 L140,180 L140,150 L160,150 L160,180 L180,180 L180,200 L200,200 L200,160 L220,160 L220,120 L240,120 L240,180 L260,180 L260,200 L280,200 L280,220 L300,220 L300,250 L320,250 L320,200 L340,200 L340,150 L360,150 L360,180 L380,180 L380,220 L400,220 L400,200 L420,200 L420,160 L440,160 L440,120 L460,120 L460,180 L480,180 L480,200 L500,200 L500,220 L520,220 L520,250 L540,250 L540,200 L560,200 L560,160 L580,160 L580,120 L600,120 L600,180 L620,180 L620,220 L640,220 L640,250 L660,250 L660,200 L680,200 L680,150 L700,150 L700,180 L720,180 L720,220 L740,220 L740,200 L760,200 L760,160 L780,160 L780,120 L800,120 L800,180 L820,180 L820,220 L840,220 L840,250 L860,250 L860,200 L880,200 L880,150 L900,150 L900,180 L920,180 L920,220 L940,220 L940,200 L960,200 L960,160 L980,160 L980,120 L1000,120 L1000,180 L1020,180 L1020,220 L1040,220 L1040,250 L1060,250 L1060,200 L1080,200 L1080,150 L1100,150 L1100,180 L1120,180 L1120,220 L1140,220 L1140,200 L1160,200 L1160,160 L1180,160 L1180,120 L1200,120 L1200,300 Z"
            fill="url(#skylineGradient)"
          />
          {/* Add blinking lights */}
          <use href="#building-lights" />
        </svg>
      </div>

      {/* ========================================
          BOTTOM GRADIENT FADE
      ======================================== */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/80 to-transparent" />

      {/* ========================================
          NOISE TEXTURE OVERLAY
      ======================================== */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}