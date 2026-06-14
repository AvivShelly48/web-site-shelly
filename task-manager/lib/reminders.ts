import { readDb } from './db';
import { FREQUENCY_LABELS, type Employee, type Task } from './types';

export type ReminderScope = 'today' | 'week' | 'overdue';

export interface EmployeeReminder {
  employee: Employee;
  tasks: Task[];
  overdue: number;
  message: string;
  whatsappUrl: string | null;
}

function endOfWeek(from: Date): Date {
  // שבוע עבודה: עד סוף השבוע הקרוב (שבת)
  const date = new Date(from);
  const day = date.getDay(); // 0 = ראשון ... 6 = שבת
  const daysUntilSaturday = 6 - day;
  date.setDate(date.getDate() + daysUntilSaturday);
  date.setHours(23, 59, 59, 999);
  return date;
}

function isInScope(task: Task, scope: ReminderScope, todayStr: string, weekEndStr: string): boolean {
  switch (scope) {
    case 'today':
      return task.dueDate <= todayStr;
    case 'overdue':
      return task.dueDate < todayStr;
    case 'week':
    default:
      return task.dueDate <= weekEndStr;
  }
}

export function buildEmployeeReminders(scope: ReminderScope = 'week'): EmployeeReminder[] {
  const db = readDb();
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  const weekEndStr = endOfWeek(now).toISOString().slice(0, 10);

  return db.employees
    .map((employee) => {
      const openTasks = db.tasks.filter(
        (t) =>
          t.assigneeId === employee.id &&
          t.status !== 'done' &&
          isInScope(t, scope, todayStr, weekEndStr),
      );
      openTasks.sort((a, b) => a.dueDate.localeCompare(b.dueDate));

      const overdue = openTasks.filter((t) => t.dueDate < todayStr).length;
      const message = buildReminderMessage(employee, openTasks, todayStr);
      const whatsappUrl =
        employee.phone && openTasks.length > 0
          ? `https://wa.me/${employee.phone}?text=${encodeURIComponent(message)}`
          : null;

      return { employee, tasks: openTasks, overdue, message, whatsappUrl };
    })
    .filter((r) => r.tasks.length > 0);
}

export function buildReminderMessage(employee: Employee, tasks: Task[], todayStr: string): string {
  const lines: string[] = [];
  lines.push(`שלום ${employee.name},`);
  lines.push(`להלן תזכורת למשימות הפתוחות שלך (${new Date().toLocaleDateString('he-IL')}):`);
  lines.push('');

  for (const task of tasks) {
    const late = task.dueDate < todayStr ? ' ⚠️ באיחור' : '';
    lines.push(`• ${task.title} — ${FREQUENCY_LABELS[task.frequency]}, יעד: ${task.dueDate}${late}`);
  }

  lines.push('');
  lines.push('בהצלחה! 🙏');
  return lines.join('\n');
}
