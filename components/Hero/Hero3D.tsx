'use client';

import { useState, useEffect, useRef } from 'react';

interface Hero3DProps {
  visible: boolean;
}

export function Hero3D({ visible }: Hero3DProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Track mouse for parallax
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
        setMousePosition({ x, y });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    // Delay load for smooth transition
    const timer = setTimeout(() => setIsLoaded(true), 500);

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
      clearTimeout(timer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="absolute right-0 top-1/2 -translate-y-1/2 w-[50%] max-w-[650px] h-full hidden xl:block pointer-events-none select-none"
      style={{
        transform: `translateY(-50%) translateX(${mousePosition.x}px)`,
        transition: 'transform 0.2s ease-out',
        opacity: isLoaded ? 1 : 0,
      }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* 3D Scene Container */}
        <div
          className="relative w-80 h-80 md:w-96 md:h-96"
          style={{
            transform: `rotateY(${mousePosition.x * 0.5}deg) rotateX(${-mousePosition.y * 0.5}deg)`,
            transition: 'transform 0.3s ease-out',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* ========================================
              FLOATING 3D CUBES
          ======================================== */}

          {/* Main cube - Green */}
          <div
            className="absolute top-0 right-0 w-32 h-32 md:w-40 md:h-40"
            style={{
              transform: 'rotate(15deg) translateZ(20px)',
              animation: 'cube-float-1 10s ease-in-out infinite',
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="absolute inset-0 border-2 border-accent-green/50 rounded-lg bg-accent-green/5 backdrop-blur-sm"
              style={{ boxShadow: '0 0 40px rgba(16, 185, 129, 0.2), inset 0 0 30px rgba(16, 185, 129, 0.1)' }}
            />
            <div className="absolute inset-0 border-2 border-accent-green/30 rounded-lg"
              style={{ transform: 'translateZ(30px)' }}
            />
            <div className="absolute inset-0 border-2 border-accent-green/20 rounded-lg"
              style={{ transform: 'rotateY(90deg) translateZ(64px)' }}
            />
          </div>

          {/* Secondary cube - Purple */}
          <div
            className="absolute bottom-10 left-0 w-28 h-28 md:w-36 md:h-36"
            style={{
              transform: 'rotate(-10deg) translateZ(10px)',
              animation: 'cube-float-2 12s ease-in-out infinite',
              animationDelay: '-3s',
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="absolute inset-0 border-2 border-purple-400/50 rounded-lg bg-purple-400/5 backdrop-blur-sm"
              style={{ boxShadow: '0 0 35px rgba(139, 92, 246, 0.2), inset 0 0 25px rgba(139, 92, 246, 0.1)' }}
            />
            <div className="absolute inset-0 border-2 border-purple-400/30 rounded-lg"
              style={{ transform: 'translateZ(25px)' }}
            />
            <div className="absolute inset-0 border-2 border-purple-400/20 rounded-lg"
              style={{ transform: 'rotateY(90deg) translateZ(56px)' }}
            />
          </div>

          {/* Tertiary cube - Cyan */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24"
            style={{
              transform: 'rotate(25deg) translateZ(40px)',
              animation: 'cube-float-3 8s ease-in-out infinite',
              animationDelay: '-5s',
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="absolute inset-0 border-2 border-cyan-400/50 rounded-lg bg-cyan-400/5 backdrop-blur-sm"
              style={{ boxShadow: '0 0 30px rgba(6, 182, 212, 0.2), inset 0 0 20px rgba(6, 182, 212, 0.1)' }}
            />
            <div className="absolute inset-0 border-2 border-cyan-400/30 rounded-lg"
              style={{ transform: 'translateZ(20px)' }}
            />
          </div>

          {/* ========================================
              FLOATING ORBS
          ======================================== */}
          <div
            className="absolute top-[5%] right-[15%] w-4 h-4"
            style={{ animation: 'orb-pulse-1 4s ease-in-out infinite' }}
          >
            <div className="absolute inset-0 bg-accent-green rounded-full animate-pulse" />
            <div className="absolute inset-0 bg-accent-green rounded-full blur-md opacity-50" />
          </div>

          <div
            className="absolute top-[25%] left-[10%] w-3 h-3"
            style={{ animation: 'orb-pulse-2 5s ease-in-out infinite', animationDelay: '-1s' }}
          >
            <div className="absolute inset-0 bg-purple-400 rounded-full" />
            <div className="absolute inset-0 bg-purple-400 rounded-full blur-md opacity-50" />
          </div>

          <div
            className="absolute bottom-[30%] right-[25%] w-2.5 h-2.5"
            style={{ animation: 'orb-pulse-3 4.5s ease-in-out infinite', animationDelay: '-2s' }}
          >
            <div className="absolute inset-0 bg-cyan-400 rounded-full" />
            <div className="absolute inset-0 bg-cyan-400 rounded-full blur-md opacity-50" />
          </div>

          <div
            className="absolute top-[65%] left-[30%] w-2 h-2"
            style={{ animation: 'orb-pulse-1 3.5s ease-in-out infinite', animationDelay: '-0.5s' }}
          >
            <div className="absolute inset-0 bg-amber-400 rounded-full" />
            <div className="absolute inset-0 bg-amber-400 rounded-full blur-md opacity-50" />
          </div>

          {/* ========================================
              CONNECTING LINES (SaaS Network)
          ======================================== */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(16, 185, 129, 0.8)" />
                <stop offset="100%" stopColor="rgba(139, 92, 246, 0.8)" />
              </linearGradient>
            </defs>
            {/* Animated dashed lines connecting cubes */}
            <path
              d="M120 60 L200 180"
              stroke="url(#lineGradient)"
              strokeWidth="1"
              strokeDasharray="5 5"
              className="animate-dash"
              style={{ opacity: 0.5 }}
            />
            <path
              d="M60 200 L160 160"
              stroke="url(#lineGradient)"
              strokeWidth="1"
              strokeDasharray="5 5"
              className="animate-dash"
              style={{ opacity: 0.4, animationDelay: '-1s' }}
            />
            <path
              d="M180 150 L140 80"
              stroke="url(#lineGradient)"
              strokeWidth="1"
              strokeDasharray="5 5"
              className="animate-dash"
              style={{ opacity: 0.3, animationDelay: '-2s' }}
            />
          </svg>

          {/* ========================================
              RING ACCENTS
          ======================================== */}
          <div
            className="absolute top-[15%] right-[5%] w-16 h-16 border border-accent-green/30 rounded-full"
            style={{
              animation: 'ring-rotate 15s linear infinite',
            }}
          />
          <div
            className="absolute bottom-[15%] left-[0%] w-20 h-20 border border-purple-400/25 rounded-full"
            style={{
              animation: 'ring-rotate 20s linear infinite reverse',
            }}
          />
        </div>

        {/* Reflection / Shadow */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 h-4 bg-gradient-to-r from-transparent via-accent-green/10 to-transparent blur-xl rounded-full"
          style={{
            transform: 'scaleX(0.8)',
          }}
        />
      </div>
    </div>
  );
}