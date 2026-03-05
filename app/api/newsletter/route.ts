import { NextResponse } from 'next/server';
import { writeFile, appendFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'يرجى إدخال بريد إلكتروني صحيح' },
        { status: 400 }
      );
    }

    const dataDir = path.join(process.cwd(), 'data');
    const newsletterFile = path.join(dataDir, 'newsletter.json');

    // Create data directory if it doesn't exist
    if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true });
    }

    let emails: string[] = [];

    // Read existing emails
    try {
      if (existsSync(newsletterFile)) {
        const fileContent = await readFile(newsletterFile, 'utf-8');
        emails = JSON.parse(fileContent);
      }
    } catch {
      emails = [];
    }

    // Check if email already exists
    if (emails.includes(email)) {
      return NextResponse.json(
        { message: 'هذا البريد الإلكتروني مشترك بالفعل' },
        { status: 200 }
      );
    }

    // Add new email
    emails.push(email);
    await writeFile(newsletterFile, JSON.stringify(emails, null, 2));

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
