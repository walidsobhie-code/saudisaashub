'use client';

import { useState, useEffect, useRef } from 'react';
import { HeroBackground } from './Hero/HeroBackground';
import { Hero3D } from './Hero/Hero3D';
import { HeroContent } from './Hero/HeroContent';

// Check for reduced motion preference
const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

export function Hero() {
  const [visible, setVisible] = useState(false);
  const [statsAnimated, setStatsAnimated] = useState(false);
  const [companiesCount, setCompaniesCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [articlesCount, setArticlesCount] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Fetch real stats from API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/stats');
        if (res.ok) {
          const data = await res.json();
          setCompaniesCount(data.companies || 0);
          setCategoriesCount(data.categories || 0);
          setArticlesCount(data.articles || 0);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        // Fallback to hardcoded values
        setCompaniesCount(252);
        setCategoriesCount(15);
        setArticlesCount(10);
      }
    };
    fetchStats();
  }, []);

  // Track mouse for parallax effect (throttled)
  useEffect(() => {
    if (prefersReducedMotion) return;
    if (typeof window === 'undefined') return;

    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 20,
          y: (e.clientY / window.innerHeight - 0.5) * 20,
        });
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion]);

  // Count-up animation
  useEffect(() => {
    if (!statsAnimated) return;
    const duration = 2000;
    const companiesEnd = 250;
    const categoriesEnd = 15;
    const articlesEnd = 10;
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCompaniesCount(Math.floor(easeOutQuart * companiesEnd));
      setCategoriesCount(Math.floor(easeOutQuart * categoriesEnd));
      setArticlesCount(Math.floor(easeOutQuart * articlesEnd));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [statsAnimated]);

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Background Layer */}
      <HeroBackground mousePosition={mousePosition} />

      {/* 3D Elements (replaces heavy Spline) */}
      <Hero3D visible={visible} />

      {/* Main Content */}
      <HeroContent
        visible={visible}
        statsAnimated={statsAnimated}
        setStatsAnimated={setStatsAnimated}
        companiesCount={companiesCount}
        categoriesCount={categoriesCount}
        articlesCount={articlesCount}
      />
    </section>
  );
}