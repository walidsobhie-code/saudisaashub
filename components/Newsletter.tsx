'use client';

import { useState } from 'react';
import Link from 'next/link';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

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

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message);
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'حدث خطأ');
      }
    } catch {
      setStatus('error');
      setMessage('حدث خطأ في الاتصال');
    }
  };

  return (
    <section className="py-20 bg-card/50">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-3">اشترك في النشرة البريدية</h2>
        <p className="text-text-secondary mb-6">احصل على أحدث المقالات والتحديثات في بريدك</p>

        {status === 'success' ? (
          <div className="bg-accent-green/10 border border-accent-green/30 rounded-xl p-4 text-accent-green">
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <label htmlFor="newsletter-email" className="sr-only">بريدك الإلكتروني</label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="بريدك الإلكتروني"
              aria-required="true"
              className="flex-1 px-4 py-3 rounded-xl bg-background border border-white/10 text-white focus:border-accent-green focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              aria-disabled={status === 'loading'}
              className="px-6 py-3 rounded-xl bg-accent-green text-background font-semibold hover:shadow-glow-green transition-all disabled:opacity-50"
            >
              {status === 'loading' ? 'جاري...' : 'اشتراك'}
            </button>
          </form>
        )}
        {status === 'error' && <p className="mt-3 text-red-400 text-sm">{message}</p>}
      </div>
    </section>
  );
}
