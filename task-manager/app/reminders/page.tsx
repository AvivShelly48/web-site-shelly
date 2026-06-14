'use client';

import { useCallback, useEffect, useState } from 'react';
import { AlertTriangle, Copy, MessageCircle, Send } from 'lucide-react';
import { FREQUENCY_LABELS, type Employee, type Task } from '@/lib/types';

type Scope = 'today' | 'week' | 'overdue';

interface EmployeeReminder {
  employee: Employee;
  tasks: Task[];
  overdue: number;
  message: string;
  whatsappUrl: string | null;
}

const SCOPE_LABELS: Record<Scope, string> = {
  today: 'להיום',
  week: 'השבוע',
  overdue: 'באיחור',
};

export default function RemindersPage() {
  const [scope, setScope] = useState<Scope>('week');
  const [reminders, setReminders] = useState<EmployeeReminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/reminders?scope=${scope}`);
    const data = await res.json();
    setReminders(data.reminders ?? []);
    setLoading(false);
  }, [scope]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function copyMessage(reminder: EmployeeReminder) {
    await navigator.clipboard.writeText(reminder.message);
    setCopiedId(reminder.employee.id);
    setTimeout(() => setCopiedId(null), 1500);
  }

  function sendAll() {
    reminders.forEach((r, index) => {
      if (r.whatsappUrl) {
        setTimeout(() => window.open(r.whatsappUrl!, '_blank'), index * 400);
      }
    });
  }

  const totalTasks = reminders.reduce((sum, r) => sum + r.tasks.length, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">תזכורות</h1>
          <p className="text-[var(--muted)] mt-1">
            תזכורת אישית לכל עובד על המשימות הפתוחות שלו — שליחה בלחיצה אחת בוואטסאפ
          </p>
        </div>
        {reminders.length > 0 && (
          <button
            onClick={sendAll}
            className="flex items-center gap-1.5 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90"
          >
            <Send size={16} />
            שליחה לכל העובדים
          </button>
        )}
      </div>

      <div className="flex gap-2">
        {(['today', 'week', 'overdue'] as Scope[]).map((s) => (
          <button
            key={s}
            onClick={() => setScope(s)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
              scope === s ? 'bg-[var(--brand)] text-white' : 'bg-white border border-[var(--border)] text-[var(--muted)]'
            }`}
          >
            {SCOPE_LABELS[s]}
          </button>
        ))}
      </div>

      {!loading && reminders.length > 0 && (
        <p className="text-sm text-[var(--muted)]">
          {reminders.length} עובדים · {totalTasks} משימות פתוחות {SCOPE_LABELS[scope]}
        </p>
      )}

      {loading ? (
        <p className="text-sm text-[var(--muted)]">טוען...</p>
      ) : reminders.length === 0 ? (
        <div className="bg-white rounded-xl border border-[var(--border)] p-8 text-center">
          <p className="text-[var(--muted)]">אין משימות פתוחות {SCOPE_LABELS[scope]} — אין צורך בתזכורות. 🎉</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {reminders.map((reminder) => (
            <div key={reminder.employee.id} className="bg-white rounded-xl border border-[var(--border)] p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="font-semibold">{reminder.employee.name}</h2>
                  <p className="text-xs text-[var(--muted)]">{reminder.employee.phone}</p>
                </div>
                {reminder.overdue > 0 && (
                  <span className="flex items-center gap-1 text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-full">
                    <AlertTriangle size={12} />
                    {reminder.overdue} באיחור
                  </span>
                )}
              </div>

              <ul className="space-y-1.5 mb-4">
                {reminder.tasks.map((task) => (
                  <li key={task.id} className="text-sm flex items-start gap-2">
                    <span className="text-[var(--brand)] mt-1">•</span>
                    <span>
                      {task.title}
                      <span className="text-[var(--muted)]">
                        {' '}— {FREQUENCY_LABELS[task.frequency]}, יעד: {task.dueDate}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex gap-2">
                {reminder.whatsappUrl && (
                  <a
                    href={reminder.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:opacity-90"
                  >
                    <MessageCircle size={15} />
                    שליחת תזכורת
                  </a>
                )}
                <button
                  onClick={() => copyMessage(reminder)}
                  className="flex items-center gap-1.5 border border-[var(--border)] text-[var(--muted)] px-3 py-2 rounded-lg text-sm font-medium hover:bg-[var(--bg)]"
                >
                  <Copy size={15} />
                  {copiedId === reminder.employee.id ? 'הועתק!' : 'העתקת הודעה'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
