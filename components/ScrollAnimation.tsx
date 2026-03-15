'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  animation?: 'up' | 'down' | 'left' | 'right' | 'scale';
  delay?: number;
  threshold?: number;
}

export function ScrollAnimation({
  children,
  className = '',
  animation = 'up',
  delay = 0,
  threshold = 0.1,
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  const animationClasses = {
    up: 'scroll-animate-up',
    down: 'scroll-animate-down',
    left: 'scroll-animate-left',
    right: 'scroll-animate-right',
    scale: 'scroll-animate-scale',
  };

  const style = delay > 0 ? { transitionDelay: `${delay}s` } : undefined;

  return (
    <div
      ref={ref}
      className={`${animationClasses[animation]} ${className} ${isVisible ? 'is-visible' : ''}`}
      style={style}
    >
      {children}
    </div>
  );
}

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
}

export function StaggerChildren({ children, className = '' }: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div ref={ref} className={`scroll-animate-children ${className} ${isVisible ? 'is-visible' : ''}`}>
      {children}
    </div>
  );
}