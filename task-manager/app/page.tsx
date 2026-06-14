import { readDb } from '@/lib/db';
import { FREQUENCY_LABELS } from '@/lib/types';
import ProgressBar from '@/components/ProgressBar';
import StatusBadge from '@/components/StatusBadge';

export default function DashboardPage() {
  const db = readDb();
  const { tasks, employees } = db;

  const total = tasks.length;
  const done = tasks.filter((t) => t.status === 'done').length;
  const inProgress = tasks.filter((t) => t.status === 'in_progress').length;
  const pending = tasks.filter((t) => t.status === 'pending').length;
  const progressPct = total === 0 ? 0 : (done / total) * 100;

  const today = new Date().toISOString().slice(0, 10);
  const dueToday = tasks.filter((t) => t.dueDate <= today && t.status !== 'done');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">דשבורד</h1>
        <p className="text-[var(--muted)] mt-1">סיכום התקדמות המשימות במשרד</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="סה״כ משימות" value={total} />
        <StatCard label="הושלמו" value={done} accent="text-green-600" />
        <StatCard label="בתהליך" value={inProgress} accent="text-amber-600" />
        <StatCard label="ממתינות" value={pending} accent="text-gray-600" />
      </div>

      <div className="app-card p-5">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold">התקדמות כללית</h2>
          <span className="text-sm text-[var(--muted)]">{Math.round(progressPct)}%</span>
        </div>
        <ProgressBar value={progressPct} />
      </div>

      <div className="app-card p-5">
        <h2 className="font-semibold mb-4">התקדמות לפי עובד</h2>
        <div className="space-y-4">
          {employees.map((employee) => {
            const empTasks = tasks.filter((t) => t.assigneeId === employee.id);
            const empDone = empTasks.filter((t) => t.status === 'done').length;
            const pct = empTasks.length === 0 ? 0 : (empDone / empTasks.length) * 100;

            return (
              <div key={employee.id}>
                <div className="flex items-center justify-between mb-1 text-sm">
                  <span className="font-medium">{employee.name}</span>
                  <span className="text-[var(--muted)]">
                    {empDone}/{empTasks.length} משימות
                  </span>
                </div>
                <ProgressBar value={pct} />
              </div>
            );
          })}
          {employees.length === 0 && <p className="text-[var(--muted)] text-sm">אין עובדים מוגדרים.</p>}
        </div>
      </div>

      <div className="app-card p-5">
        <h2 className="font-semibold mb-4">משימות שטרם הושלמו (יעד עד היום)</h2>
        {dueToday.length === 0 ? (
          <p className="text-[var(--muted)] text-sm">אין משימות באיחור - כל הכבוד!</p>
        ) : (
          <ul className="divide-y divide-[var(--border)]">
            {dueToday.map((task) => {
              const assignee = employees.find((e) => e.id === task.assigneeId);
              return (
                <li key={task.id} className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-xs text-[var(--muted)] mt-0.5">
                      {FREQUENCY_LABELS[task.frequency]} · יעד: {task.dueDate} ·{' '}
                      {assignee ? assignee.name : 'לא משויך'}
                    </p>
                  </div>
                  <StatusBadge status={task.status} />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, accent }: { label: string; value: number; accent?: string }) {
  return (
    <div className="app-card p-5">
      <p className="text-sm text-[var(--muted)]">{label}</p>
      <p className={`text-3xl font-bold mt-2 ${accent ?? ''}`}>{value}</p>
    </div>
  );
}
