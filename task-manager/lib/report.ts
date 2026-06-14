import { readDb } from './db';
import { FREQUENCY_LABELS, STATUS_LABELS, type Task, type TaskFrequency } from './types';

export interface ReportOptions {
  frequency: TaskFrequency | 'all';
  employeeId?: string | null;
}

export function buildReport({ frequency, employeeId }: ReportOptions): string {
  const db = readDb();
  let tasks: Task[] = db.tasks;

  if (frequency !== 'all') {
    tasks = tasks.filter((t) => t.frequency === frequency);
  }
  if (employeeId) {
    tasks = tasks.filter((t) => t.assigneeId === employeeId);
  }

  const total = tasks.length;
  const done = tasks.filter((t) => t.status === 'done').length;
  const inProgress = tasks.filter((t) => t.status === 'in_progress').length;
  const pending = tasks.filter((t) => t.status === 'pending').length;

  const title =
    frequency === 'all'
      ? 'דוח משימות כללי'
      : `דוח משימות ${FREQUENCY_LABELS[frequency]}`;

  const lines: string[] = [];
  lines.push(`*${title}*`);
  lines.push(`תאריך: ${new Date().toLocaleDateString('he-IL')}`);
  lines.push('');
  lines.push(`סה"כ משימות: ${total}`);
  lines.push(`הושלמו: ${done} | בתהליך: ${inProgress} | ממתינות: ${pending}`);
  lines.push('');

  if (tasks.length === 0) {
    lines.push('לא נמצאו משימות.');
  } else {
    for (const task of tasks) {
      const assignee = db.employees.find((e) => e.id === task.assigneeId);
      lines.push(
        `• ${task.title} - ${STATUS_LABELS[task.status]} (${assignee ? assignee.name : 'לא משויך'}, יעד: ${task.dueDate})`,
      );
    }
  }

  return lines.join('\n');
}
