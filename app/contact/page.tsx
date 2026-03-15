'use client';

import { useState } from 'react';

const FORMNSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPRARE_ENDPOINT || 'https://formspree.io/f/your-form-id';
const COMPANY_FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPRARE_ENDPOINT || 'https://formspree.io/f/your-form-id';

const MIN_MESSAGE_LENGTH = 10;
const MAX_MESSAGE_LENGTH = 500;

// Company categories
const COMPANY_CATEGORIES = [
  'FinTech', 'HealthTech', 'E-commerce', 'EdTech', 'Logistics',
  'Marketing', 'Security', 'HR', 'Analytics', 'Cloud', 'PropTech',
  'GovTech', 'Restaurant Tech', 'Food Delivery', 'Other'
];

// Employee size options
const EMPLOYEE_SIZES = ['1-10', '11-50', '51-200', '201-500', '500+', 'غير محدد'];

// Funding stages
const FUNDING_STAGES = ['Bootstrapped', 'Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C+', 'Govt funded', 'غير محدد'];

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<'contact' | 'company'>('contact');

  // General contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  // Company submission form state
  const [companyData, setCompanyData] = useState({
    companyName: '',
    website: '',
    email: '',
    phone: '',
    category: '',
    description: '',
    foundedYear: '',
    employees: '',
    funding: '',
  });
  const [companyErrors, setCompanyErrors] = useState<Record<string, string>>({});
  const [companyStatus, setCompanyStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [companyMessage, setCompanyMessage] = useState('');

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'الاسم مطلوب';
        if (value.trim().length < 2) return 'الاسم قصير جداً (حد أدنى حرفين)';
        if (value.trim().length > 100) return 'الاسم طويل جداً (حد أقصى 100 حرف)';
        return undefined;
      case 'email':
        if (!value.trim()) return 'البريد الإلكتروني مطلوب';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'صيغة البريد الإلكتروني غير صحيحة';
        return undefined;
      case 'message':
        if (!value.trim()) return 'الرسالة مطلوبة';
        if (value.trim().length < MIN_MESSAGE_LENGTH) return `الرسالة قصيرة جداً (${MIN_MESSAGE_LENGTH} أحرف كحد الأدنى)`;
        if (value.trim().length > MAX_MESSAGE_LENGTH) return `الرسالة طويلة جداً (${MAX_MESSAGE_LENGTH} أحرف كحد الأقصى)`;
        return undefined;
      default:
        return undefined;
    }
  };

  const validateCompanyField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'companyName':
        if (!value.trim()) return 'اسم الشركة مطلوب';
        if (value.trim().length < 2) return 'اسم الشركة قصير جداً';
        return undefined;
      case 'website':
        if (!value.trim()) return 'الموقع الإلكتروني مطلوب';
        const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        if (!urlRegex.test(value)) return 'صيغة الموقع غير صحيحة';
        return undefined;
      case 'email':
        if (!value.trim()) return 'البريد الإلكتروني مطلوب';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'صيغة البريد الإلكتروني غير صحيحة';
        return undefined;
      case 'category':
        if (!value) return 'يرجى اختيار التصنيف';
        return undefined;
      case 'description':
        if (!value.trim()) return 'الوصف مطلوب';
        if (value.trim().length < 20) return 'الوصف قصير جداً (20 حرف كحد أدنى)';
        return undefined;
      default:
        return undefined;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Real-time validation
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCompanyData(prev => ({ ...prev, [name]: value }));

    // Real-time validation
    const error = validateCompanyField(name, value);
    setCompanyErrors(prev => ({ ...prev, [name]: error || '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: typeof errors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key as keyof typeof errors] = error;
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setStatus('loading');

    try {
      const response = await fetch(FORMNSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setMessage('تم إرسال رسالتك بنجاح. سنتواصل معك قريباً!');
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
      } else {
        setStatus('error');
        setMessage('حدث خطأ. يرجى المحاولة مرة أخرى.');
      }
    } catch {
      setStatus('error');
      setMessage('حدث خطأ في الاتصال');
    }
  };

  const handleCompanySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    const newErrors: Record<string, string> = {};
    const requiredFields = ['companyName', 'website', 'email', 'category', 'description'];
    requiredFields.forEach(field => {
      const error = validateCompanyField(field, companyData[field as keyof typeof companyData]);
      if (error) newErrors[field] = error;
    });
    setCompanyErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setCompanyStatus('loading');

    try {
      const response = await fetch(COMPANY_FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...companyData,
          type: 'company_submission',
        }),
      });

      if (response.ok) {
        setCompanyStatus('success');
        setCompanyMessage('تم إرسال بيانات شركتك بنجاح! سنراجعها ونضيفها للمنصة قريباً.');
        setCompanyData({
          companyName: '',
          website: '',
          email: '',
          phone: '',
          category: '',
          description: '',
          foundedYear: '',
          employees: '',
          funding: '',
        });
        setCompanyErrors({});
      } else {
        setCompanyStatus('error');
        setCompanyMessage('حدث خطأ. يرجى المحاولة مرة أخرى.');
      }
    } catch {
      setCompanyStatus('error');
      setCompanyMessage('حدث خطأ في الاتصال');
    }
  };

  const messageLength = formData.message.length;
  const remainingChars = MAX_MESSAGE_LENGTH - messageLength;
  const isMessageValid = !errors.message && messageLength >= MIN_MESSAGE_LENGTH && messageLength <= MAX_MESSAGE_LENGTH;
  const showCharCount = messageLength > 0;

  return (
    <>
      {/* Header */}
      <section className="py-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">اتصل بنا</h1>
          <p className="text-text-secondary">
            نحن هنا للإجابة على استفساراتك ومساعدتك
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-white/10">
            <button
              onClick={() => setActiveTab('contact')}
              className={`px-6 py-3 font-medium transition-colors relative ${
                activeTab === 'contact'
                  ? 'text-accent-green'
                  : 'text-text-secondary hover:text-white'
              }`}
            >
              تواصل عام
              {activeTab === 'contact' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-green"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('company')}
              className={`px-6 py-3 font-medium transition-colors relative ${
                activeTab === 'company'
                  ? 'text-accent-green'
                  : 'text-text-secondary hover:text-white'
              }`}
            >
              أضف شركتك
              {activeTab === 'company' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-green"></span>
              )}
            </button>
          </div>

          {activeTab === 'contact' ? (
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
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

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-accent-pink">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-text-secondary text-sm">الموقع</p>
                      <p className="text-white">الرياض، المملكة العربية السعودية</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-accent-pink">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-text-secondary text-sm">الفريق</p>
                      <p className="text-white">فريقنا موزع في جميع أنحاء المملكة العربية السعودية</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-accent-pink">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-text-secondary text-sm">أوقات العمل</p>
                      <p className="text-white">السبت - الخميس: 9ص - 6م</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">تابعنا</h2>
                  <div className="flex gap-3">
                    <a
                      href="https://x.com/SaudiSaaSHub"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-text-secondary hover:text-white hover:gradient-bg transition-all"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.linkedin.com/company/saudisaashub/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-text-secondary hover:text-white hover:gradient-bg transition-all"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.instagram.com/saudisaashub"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-text-secondary hover:text-white hover:gradient-bg transition-all"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-card rounded-2xl p-6 border border-white/5">
                {status === 'success' ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center">
                      <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">تم إرسال رسالتك</h3>
                    <p className="text-text-secondary">{message}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-sm text-text-secondary mb-2">
                        الاسم <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.name ? 'border-red-500' : 'border-white/10'} text-white placeholder:text-text-muted focus:border-accent-pink focus:outline-none`}
                        placeholder="اسمك"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm text-text-secondary mb-2">
                        البريد الإلكتروني <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.email ? 'border-red-500' : 'border-white/10'} text-white placeholder:text-text-muted focus:border-accent-pink focus:outline-none`}
                        placeholder="بريدك@الإلكتروني.com"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Message Field */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label htmlFor="message" className="block text-sm text-text-secondary">
                          الرسالة <span className="text-red-400">*</span>
                        </label>
                        {showCharCount && (
                          <span className={`text-sm ${remainingChars < 0 ? 'text-red-400' : remainingChars <= 20 ? 'text-yellow-400' : 'text-text-muted'}`}>
                            {remainingChars >= 0 ? `${remainingChars} حرف متبقي` : `الحد الأقصى تجاوزت بـ ${Math.abs(remainingChars)} حرف`}
                          </span>
                        )}
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.message ? 'border-red-500' : 'border-white/10'} text-white placeholder:text-text-muted focus:border-accent-pink focus:outline-none resize-none`}
                        placeholder="كيف يمكننا مساعدتك؟"
                      />
                      {errors.message && (
                        <p className="text-red-400 text-sm mt-1">{errors.message}</p>
                      )}
                    </div>

                    {status === 'error' && message && (
                      <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                        <p className="text-red-400 text-sm text-center">{message}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading' || Object.keys(errors).some(key => !!errors[key as keyof typeof errors])}
                      className="w-full px-6 py-3 rounded-xl gradient-bg text-white font-semibold hover:shadow-glow-pink transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === 'loading' ? 'جاري الإرسال...' : 'إرسال الرسالة'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          ) : (
            /* Company Submission Form */
            <div className="bg-card rounded-2xl p-6 border border-white/5">
              {companyStatus === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">تم إرسال بيانات الشركة</h3>
                  <p className="text-text-secondary">{companyMessage}</p>
                </div>
              ) : (
                <form onSubmit={handleCompanySubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Company Name */}
                    <div>
                      <label htmlFor="companyName" className="block text-sm text-text-secondary mb-2">
                        اسم الشركة <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={companyData.companyName}
                        onChange={handleCompanyChange}
                        required
                        className={`w-full px-4 py-3 rounded-xl bg-background border ${companyErrors.companyName ? 'border-red-500' : 'border-white/10'} text-white placeholder:text-text-muted focus:border-accent-green focus:outline-none`}
                        placeholder="اسم شركتك"
                      />
                      {companyErrors.companyName && (
                        <p className="text-red-400 text-sm mt-1">{companyErrors.companyName}</p>
                      )}
                    </div>

                    {/* Website */}
                    <div>
                      <label htmlFor="website" className="block text-sm text-text-secondary mb-2">
                        الموقع الإلكتروني <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="url"
                        id="website"
                        name="website"
                        value={companyData.website}
                        onChange={handleCompanyChange}
                        required
                        className={`w-full px-4 py-3 rounded-xl bg-background border ${companyErrors.website ? 'border-red-500' : 'border-white/10'} text-white placeholder:text-text-muted focus:border-accent-green focus:outline-none`}
                        placeholder="https://yourcompany.sa"
                      />
                      {companyErrors.website && (
                        <p className="text-red-400 text-sm mt-1">{companyErrors.website}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm text-text-secondary mb-2">
                        البريد الإلكتروني <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={companyData.email}
                        onChange={handleCompanyChange}
                        required
                        className={`w-full px-4 py-3 rounded-xl bg-background border ${companyErrors.email ? 'border-red-500' : 'border-white/10'} text-white placeholder:text-text-muted focus:border-accent-green focus:outline-none`}
                        placeholder="contact@company.sa"
                      />
                      {companyErrors.email && (
                        <p className="text-red-400 text-sm mt-1">{companyErrors.email}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm text-text-secondary mb-2">
                        رقم الهاتف
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={companyData.phone}
                        onChange={handleCompanyChange}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-white/10 text-white placeholder:text-text-muted focus:border-accent-green focus:outline-none"
                        placeholder="+966 50 123 4567"
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label htmlFor="category" className="block text-sm text-text-secondary mb-2">
                        التصنيف <span className="text-red-400">*</span>
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={companyData.category}
                        onChange={handleCompanyChange}
                        required
                        className={`w-full px-4 py-3 rounded-xl bg-background border ${companyErrors.category ? 'border-red-500' : 'border-white/10'} text-white focus:border-accent-green focus:outline-none`}
                      >
                        <option value="" className="bg-card">اختر التصنيف</option>
                        {COMPANY_CATEGORIES.map(cat => (
                          <option key={cat} value={cat} className="bg-card">{cat}</option>
                        ))}
                      </select>
                      {companyErrors.category && (
                        <p className="text-red-400 text-sm mt-1">{companyErrors.category}</p>
                      )}
                    </div>

                    {/* Founded Year */}
                    <div>
                      <label htmlFor="foundedYear" className="block text-sm text-text-secondary mb-2">
                        سنة التأسيس
                      </label>
                      <input
                        type="number"
                        id="foundedYear"
                        name="foundedYear"
                        value={companyData.foundedYear}
                        onChange={handleCompanyChange}
                        min="1990"
                        max="2026"
                        className="w-full px-4 py-3 rounded-xl bg-background border border-white/10 text-white placeholder:text-text-muted focus:border-accent-green focus:outline-none"
                        placeholder="2020"
                      />
                    </div>

                    {/* Employees */}
                    <div>
                      <label htmlFor="employees" className="block text-sm text-text-secondary mb-2">
                        عدد الموظفين
                      </label>
                      <select
                        id="employees"
                        name="employees"
                        value={companyData.employees}
                        onChange={handleCompanyChange}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-white/10 text-white focus:border-accent-green focus:outline-none"
                      >
                        <option value="" className="bg-card">اختر الحجم</option>
                        {EMPLOYEE_SIZES.map(size => (
                          <option key={size} value={size} className="bg-card">{size}</option>
                        ))}
                      </select>
                    </div>

                    {/* Funding */}
                    <div>
                      <label htmlFor="funding" className="block text-sm text-text-secondary mb-2">
                        مرحلة التمويل
                      </label>
                      <select
                        id="funding"
                        name="funding"
                        value={companyData.funding}
                        onChange={handleCompanyChange}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-white/10 text-white focus:border-accent-green focus:outline-none"
                      >
                        <option value="" className="bg-card">اختر المرحلة</option>
                        {FUNDING_STAGES.map(stage => (
                          <option key={stage} value={stage} className="bg-card">{stage}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm text-text-secondary mb-2">
                      وصف الشركة <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={companyData.description}
                      onChange={handleCompanyChange}
                      required
                      rows={4}
                      className={`w-full px-4 py-3 rounded-xl bg-background border ${companyErrors.description ? 'border-red-500' : 'border-white/10'} text-white placeholder:text-text-muted focus:border-accent-green focus:outline-none resize-none`}
                      placeholder="اكتب وصفاً مختصراً عن شركتك ومنتجها..."
                    />
                    {companyErrors.description && (
                      <p className="text-red-400 text-sm mt-1">{companyErrors.description}</p>
                    )}
                  </div>

                  {companyStatus === 'error' && companyMessage && (
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                      <p className="text-red-400 text-sm text-center">{companyMessage}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={companyStatus === 'loading'}
                    className="w-full px-6 py-3 rounded-xl bg-accent-green text-background font-semibold hover:bg-accent-green/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {companyStatus === 'loading' ? 'جاري الإرسال...' : 'إرسال طلب إضافة الشركة'}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}