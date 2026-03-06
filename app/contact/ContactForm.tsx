'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message);
        setFormData({ name: '', email: '', message: '' });
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
    <>
      <section className="py-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">اتصل بنا</h1>
          <p className="text-text-secondary">
            نحن هنا للإجابة على استفساراتك ومساعدتك
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-xl font-semibold mb-6">معلومات التواصل</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-accent-pink">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-text-secondary text-sm">البريد الإلكتروني</p>
                    <p className="text-white">saudisaashub@outlook.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-white/5">
              {status === 'success' ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">تم إرسال رسالتك</h3>
                  <p className="text-text-secondary">{message}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-background border border-white/10 text-white placeholder:text-text-muted focus:border-accent-pink focus:outline-none"
                      placeholder="اسمك"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-background border border-white/10 text-white placeholder:text-text-muted focus:border-accent-pink focus:outline-none"
                      placeholder="بريدك@الإلكتروني.com"
                    />
                  </div>
                  <div>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-white/10 text-white placeholder:text-text-muted focus:border-accent-pink focus:outline-none resize-none"
                      placeholder="كيف يمكننا مساعدتك؟"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full px-6 py-3 rounded-xl gradient-bg text-white font-semibold hover:shadow-glow-pink transition-all disabled:opacity-50"
                  >
                    {status === 'loading' ? 'جاري الإرسال...' : 'إرسال الرسالة'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
