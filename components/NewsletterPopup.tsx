'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if already subscribed or dismissed
    const dismissed = localStorage.getItem('newsletter_dismissed');
    const subscribed = localStorage.getItem('newsletter_subscribed');
    
    if (!dismissed && !subscribed) {
      // Show popup after 5 seconds
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        localStorage.setItem('newsletter_subscribed', 'true');
        setTimeout(() => setIsVisible(false), 2000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem('newsletter_dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleDismiss}
      />
      
      {/* Popup */}
      <div className="relative w-full max-w-md bg-card border border-white/10 rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in duration-300">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 left-4 text-text-muted hover:text-white transition-colors"
          aria-label="إغلاق"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="text-center">
          {/* Icon */}
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent-green/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <h3 className="text-xl font-bold text-white mb-2">
            اشترك في النشرة البريدية
          </h3>
          <p className="text-text-secondary mb-6">
            احصل على أحدث مقالات SaaS والتحديثات مباشرة في بريدك الإلكتروني
          </p>

          {status === 'success' ? (
            <div className="bg-accent-green/10 border border-accent-green/30 rounded-xl p-4 text-accent-green">
              ✅ شكراً لك! تم اشتراكك بنجاح
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="popup-email" className="sr-only">البريد الإلكتروني</label>
                <input
                  id="popup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="بريدك الإلكتروني"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-background border border-white/10 text-white placeholder-text-muted focus:border-accent-green focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3 rounded-xl bg-accent-green text-background font-semibold hover:shadow-glow-green transition-all disabled:opacity-50"
              >
                {status === 'loading' ? 'جاري الإرسال...' : 'اشترك الآن'}
              </button>
            </form>
          )}

          <p className="text-xs text-text-muted mt-4">
            by subscribing you agree to our{' '}
            <Link href="/privacy" className="text-accent-green hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
