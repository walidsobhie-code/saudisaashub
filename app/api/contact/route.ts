import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

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

    // Save message to file
    const dataDir = path.join(process.cwd(), 'data');
    const messagesFile = path.join(dataDir, 'contact-messages.json');

    // Create data directory if it doesn't exist
    if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true });
    }

    // Read existing messages or create empty array
    let messages: Array<{ name: string; email: string; message: string; date: string }> = [];
    try {
      const { readFile } = await import('fs/promises');
      if (existsSync(messagesFile)) {
        const fileContent = await readFile(messagesFile, 'utf-8');
        messages = JSON.parse(fileContent);
      }
    } catch {
      messages = [];
    }

    // Add new message
    messages.push({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      date: new Date().toISOString(),
    });

    await writeFile(messagesFile, JSON.stringify(messages, null, 2));

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
