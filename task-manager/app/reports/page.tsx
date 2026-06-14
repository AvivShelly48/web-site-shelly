'use client';

import { useEffect, useState } from 'react';
import { Mail, MessageCircle } from 'lucide-react';
import type { Employee } from '@/lib/types';

type Frequency = 'all' | 'daily' | 'monthly';

interface WhatsappLink {
  employeeId: string;
  name: string;
  url: string;
}

export default function ReportsPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [frequency, setFrequency] = useState<Frequency>('all');
  const [employeeId, setEmployeeId] = useState('');
  const [report, setReport] = useState('');
  const [whatsappLinks, setWhatsappLinks] = useState<WhatsappLink[]>([]);
  const [emailStatus, setEmailStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch('/api/employees')
      .then((res) => res.json())
      .then(setEmployees);
  }, []);

  async function generateWhatsapp() {
    setBusy(true);
    setEmailStatus(null);
    const res = await fetch('/api/reports/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ channel: 'whatsapp', frequency, employeeId: employeeId || null }),
    });
    const data = await res.json();
    setReport(data.report);
    setWhatsappLinks(data.links ?? []);
    setBusy(false);
  }

  async function sendEmail() {
    setBusy(true);
    setWhatsappLinks([]);
    const res = await fetch('/api/reports/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ channel: 'email', frequency, employeeId: employeeId || null }),
    });
    const data = await res.json();
    setReport(data.report);
    setEmailStatus(
      data.sent
        ? `הדוח נשלח בהצלחה ל: ${data.recipients.join(', ')}`
        : data.message ?? 'אירעה שגיאה בשליחת הדוח.',
    );
    setBusy(false);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">דוחות</h1>
        <p className="text-[var(--muted)] mt-1">הפקת דוח התקדמות ושליחתו לעובדים בוואטסאפ או באימייל</p>
      </div>

      <div className="bg-white rounded-xl border border-[var(--border)] p-5 grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">סוג דוח</label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as Frequency)}
            className="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">כל המשימות</option>
            <option value="daily">משימות יומיות</option>
            <option value="monthly">משימות חודשיות</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">עובד</label>
          <select
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-sm"
          >
            <option value="">כל העובדים</option>
            {employees.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2 flex flex-wrap gap-3">
          <button
            disabled={busy}
            onClick={generateWhatsapp}
            className="flex items-center gap-1.5 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50"
          >
            <MessageCircle size={16} />
            הכנת דוח לוואטסאפ
          </button>
          <button
            disabled={busy}
            onClick={sendEmail}
            className="flex items-center gap-1.5 bg-[var(--brand)] text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50"
          >
            <Mail size={16} />
            שליחת דוח באימייל
          </button>
        </div>
      </div>

      {report && (
        <div className="bg-white rounded-xl border border-[var(--border)] p-5">
          <h2 className="font-semibold mb-3">תצוגה מקדימה של הדוח</h2>
          <pre className="whitespace-pre-wrap text-sm bg-[var(--bg)] rounded-lg p-4">{report}</pre>
        </div>
      )}

      {whatsappLinks.length > 0 && (
        <div className="bg-white rounded-xl border border-[var(--border)] p-5">
          <h2 className="font-semibold mb-3">שליחה בוואטסאפ</h2>
          <p className="text-sm text-[var(--muted)] mb-3">לחצו על שם העובד כדי לפתוח את וואטסאפ עם הדוח מוכן לשליחה.</p>
          <div className="flex flex-wrap gap-2">
            {whatsappLinks.map((link) => (
              <a
                key={link.employeeId}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-green-100"
              >
                <MessageCircle size={14} />
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}

      {emailStatus && (
        <div className="bg-white rounded-xl border border-[var(--border)] p-5">
          <h2 className="font-semibold mb-2">סטטוס שליחת אימייל</h2>
          <p className="text-sm text-[var(--muted)]">{emailStatus}</p>
        </div>
      )}
    </div>
  );
}
