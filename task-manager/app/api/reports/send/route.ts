import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { readDb } from '@/lib/db';
import { buildReport } from '@/lib/report';
import type { TaskFrequency } from '@/lib/types';

interface SendBody {
  channel: 'whatsapp' | 'email';
  frequency: TaskFrequency | 'all';
  employeeId?: string | null;
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as SendBody;
  const report = buildReport({ frequency: body.frequency, employeeId: body.employeeId ?? null });

  if (body.channel === 'whatsapp') {
    const db = readDb();
    const employee = body.employeeId ? db.employees.find((e) => e.id === body.employeeId) : null;

    if (body.employeeId && !employee) {
      return NextResponse.json({ error: 'עובד לא נמצא' }, { status: 404 });
    }

    const targets = employee ? [employee] : db.employees;
    const links = targets
      .filter((e) => e.phone)
      .map((e) => ({
        employeeId: e.id,
        name: e.name,
        url: `https://wa.me/${e.phone}?text=${encodeURIComponent(report)}`,
      }));

    return NextResponse.json({ report, links });
  }

  if (body.channel === 'email') {
    const db = readDb();
    const employee = body.employeeId ? db.employees.find((e) => e.id === body.employeeId) : null;

    if (body.employeeId && !employee) {
      return NextResponse.json({ error: 'עובד לא נמצא' }, { status: 404 });
    }

    const targets = employee ? [employee] : db.employees;
    const recipients = targets.map((e) => e.email).filter(Boolean);

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      return NextResponse.json({
        report,
        recipients,
        sent: false,
        message: 'הגדרות SMTP לא מוגדרות בסביבה - הדוח הוכן אך לא נשלח אוטומטית.',
      });
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT ?? 587),
      secure: Number(SMTP_PORT ?? 587) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: SMTP_FROM ?? SMTP_USER,
      to: recipients,
      subject: 'דוח משימות',
      text: report,
    });

    return NextResponse.json({ report, recipients, sent: true });
  }

  return NextResponse.json({ error: 'ערוץ שליחה לא תקין' }, { status: 400 });
}
