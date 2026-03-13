'use client';

import { useEffect, useRef, useState } from 'react';

interface SplineEmbedProps {
  scene?: string; // Spline scene URL or embed code
}

export function SplineEmbed({ scene }: SplineEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 10,
        y: (e.clientY / window.innerHeight - 0.5) * 10,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Default Saudi-themed 3D scene (using Spline's free interactive scene)
  const defaultScene = "https://my.spline.design/calmwatercloneme-a787928b4b16f2b78e74a5a7f5e36c43/";

  return (
    <div
      ref={containerRef}
      className="absolute right-0 top-1/2 -translate-y-1/2 w-[45%] max-w-[550px] h-full hidden xl:block pointer-events-none"
      style={{
        transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        transition: 'transform 0.3s ease-out',
      }}
    >
      {/* Spline iframe embed */}
      <iframe
        src={scene || defaultScene}
        className="w-full h-full opacity-70"
        frameBorder="0"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        loading="lazy"
        title="3D Scene"
      />

      {/* Fallback: CSS 3D shapes if iframe doesn't load */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-64 h-64">
          {/* Floating 3D-like cubes */}
          <div
            className="absolute top-0 right-0 w-32 h-32 border-2 border-accent-green/40 rotate-12 rounded-lg"
            style={{
              animation: 'float 8s ease-in-out infinite',
              boxShadow: '0 0 30px rgba(16, 185, 129, 0.2), inset 0 0 20px rgba(16, 185, 129, 0.1)',
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-28 h-28 border-2 border-purple-400/40 -rotate-6 rounded-lg"
            style={{
              animation: 'float 10s ease-in-out infinite',
              animationDelay: '1s',
              boxShadow: '0 0 30px rgba(139, 92, 246, 0.2), inset 0 0 20px rgba(139, 92, 246, 0.1)',
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-accent-green/20 to-purple-400/20 rotate-45 rounded-lg backdrop-blur-sm"
            style={{
              animation: 'float 12s ease-in-out infinite',
              animationDelay: '2s',
            }}
          />

          {/* Glowing orbs */}
          <div className="absolute top-[10%] right-[20%] w-4 h-4 bg-accent-green rounded-full animate-pulse" />
          <div className="absolute top-[40%] left-[10%] w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-[30%] right-[30%] w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </div>
    </div>
  );
}