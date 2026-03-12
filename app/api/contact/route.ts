import { NextResponse } from 'next/server';
import { addContactMessage } from '@/lib/database';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Validation
    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'يرجى إدخال اسم صحيح' },
        { status: 400 }
      );
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'يرجى إدخال بريد إلكتروني صحيح' },
        { status: 400 }
      );
    }

    if (!message || message.trim().length < 10) {
      return NextResponse.json(
        { error: 'يرجى إدخال رسالة تحتوي على 10 أحرف على الأقل' },
        { status: 400 }
      );
    }

    // Save message to database
    addContactMessage(name.trim(), email.trim(), message.trim());

    return NextResponse.json(
      { message: 'تم إرسال رسالتك بنجاح. سنتواصل معك قريباً!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في الخادم. يرجى المحاولة لاحقاً.' },
      { status: 500 }
    );
  }
}
