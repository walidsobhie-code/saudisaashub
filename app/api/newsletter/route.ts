import { NextResponse } from 'next/server';
import { isNewsletterSubscriber, addNewsletterSubscriber } from '@/lib/database';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'يرجى إدخال بريد إلكتروني صحيح' },
        { status: 400 }
      );
    }

    if (isNewsletterSubscriber(email)) {
      return NextResponse.json(
        { message: 'هذا البريد الإلكتروني مشترك بالفعل' },
        { status: 200 }
      );
    }

    addNewsletterSubscriber(email);

    return NextResponse.json(
      { message: 'تم الاشتراك بنجاح!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في الخادم. يرجى المحاولة لاحقاً.' },
      { status: 500 }
    );
  }
}
