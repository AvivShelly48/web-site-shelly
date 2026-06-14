// לוגיקה מסגרת-עצמאית למשימות (עובד על מערכים רגילים, ללא תלות ב-DB מסוים).
// מומר מ-task-manager/lib (report.ts + reminders.ts) להתאמה ל-Base44:
// employee -> contact, ותוספת project + stage.

export const STATUS_LABELS = {
  pending: 'ממתינה',
  in_progress: 'בתהליך',
  done: 'הושלמה',
};

export const FREQUENCY_LABELS = {
  daily: 'יומית',
  weekly: 'שבועית',
  monthly: 'חודשית',
};

export const STAGE_LABELS = {
  licensing: 'רישוי',
  construction: 'בנייה',
  form4: 'טופס 4',
  occupancy: 'אכלוס',
};

// סדר השלבים לתצוגה
export const STAGE_ORDER = ['licensing', 'construction', 'form4', 'occupancy'];

export const STATUS_OPTIONS = ['pending', 'in_progress', 'done'];
export const FREQUENCY_OPTIONS = ['daily', 'weekly', 'monthly'];

// ----- עזרי שמות -----
// project_id / contact_id מצביעים על Project.id / Contact.id הקיימים באפליקציה.
// אם שמות השדות אצלך שונים (למשל full_name במקום name) — עדכנו כאן בלבד.
export function contactName(contacts, id) {
  const c = contacts.find((x) => x.id === id);
  return c ? (c.name || c.full_name || c.email) : 'לא משויך';
}

export function projectName(projects, id) {
  const p = projects.find((x) => x.id === id);
  return p ? (p.name || p.title) : 'ללא פרויקט';
}

// ----- תאריכים -----
export function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function endOfWeekStr(from = new Date()) {
  // עד סוף השבוע הקרוב (שבת)
  const date = new Date(from);
  const daysUntilSaturday = 6 - date.getDay(); // 0=ראשון ... 6=שבת
  date.setDate(date.getDate() + daysUntilSaturday);
  date.setHours(23, 59, 59, 999);
  return date.toISOString().slice(0, 10);
}

function isInScope(task, scope, today, weekEnd) {
  const due = task.due_date || '';
  switch (scope) {
    case 'today':
      return due && due <= today;
    case 'overdue':
      return due && due < today;
    case 'week':
    default:
      return due && due <= weekEnd;
  }
}

// ----- תזכורות מרוכזות לכל איש קשר -----
// scope: 'today' | 'week' | 'overdue'
export function buildReminders({ tasks, contacts, scope = 'week' }) {
  const today = todayStr();
  const weekEnd = endOfWeekStr();

  return contacts
    .map((contact) => {
      const openTasks = tasks
        .filter(
          (t) =>
            t.contact_id === contact.id &&
            t.status !== 'done' &&
            isInScope(t, scope, today, weekEnd),
        )
        .sort((a, b) => (a.due_date || '').localeCompare(b.due_date || ''));

      const overdue = openTasks.filter((t) => (t.due_date || '') < today).length;
      const message = buildReminderMessage(contact, openTasks, today);
      const phone = contact.phone || contact.phone_number;
      const whatsappUrl =
        phone && openTasks.length > 0
          ? `https://wa.me/${String(phone).replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
          : null;

      return { contact, tasks: openTasks, overdue, message, whatsappUrl };
    })
    .filter((r) => r.tasks.length > 0);
}

export function buildReminderMessage(contact, tasks, today = todayStr()) {
  const name = contact.name || contact.full_name || '';
  const lines = [];
  lines.push(`שלום ${name},`);
  lines.push(`להלן תזכורת למשימות הפתוחות שלך (${new Date().toLocaleDateString('he-IL')}):`);
  lines.push('');
  for (const task of tasks) {
    const late = (task.due_date || '') < today ? ' ⚠️ באיחור' : '';
    lines.push(`• ${task.title} — ${FREQUENCY_LABELS[task.frequency] || ''}, יעד: ${task.due_date || '-'}${late}`);
  }
  lines.push('');
  lines.push('בהצלחה! 🙏');
  return lines.join('\n');
}

// ----- דוח משימות (לוואטסאפ / מייל) -----
// frequency: 'all' | 'daily' | 'weekly' | 'monthly'
export function buildReportText({ tasks, contacts, projects, frequency = 'all', projectId = null, contactId = null }) {
  let list = tasks;
  if (frequency !== 'all') list = list.filter((t) => t.frequency === frequency);
  if (projectId) list = list.filter((t) => t.project_id === projectId);
  if (contactId) list = list.filter((t) => t.contact_id === contactId);

  const total = list.length;
  const done = list.filter((t) => t.status === 'done').length;
  const inProgress = list.filter((t) => t.status === 'in_progress').length;
  const pending = list.filter((t) => t.status === 'pending').length;

  const title = frequency === 'all' ? 'דוח משימות כללי' : `דוח משימות ${FREQUENCY_LABELS[frequency]}`;

  const lines = [];
  lines.push(`*${title}*`);
  if (projectId) lines.push(`פרויקט: ${projectName(projects, projectId)}`);
  lines.push(`תאריך: ${new Date().toLocaleDateString('he-IL')}`);
  lines.push('');
  lines.push(`סה"כ משימות: ${total}`);
  lines.push(`הושלמו: ${done} | בתהליך: ${inProgress} | ממתינות: ${pending}`);
  lines.push('');

  if (total === 0) {
    lines.push('לא נמצאו משימות.');
  } else {
    for (const task of list) {
      lines.push(
        `• ${task.title} - ${STATUS_LABELS[task.status]} (${contactName(contacts, task.contact_id)}, ${STAGE_LABELS[task.stage] || ''}, יעד: ${task.due_date || '-'})`,
      );
    }
  }
  return lines.join('\n');
}

// ----- חישובי התקדמות לדשבורד -----
export function progress(tasks) {
  const total = tasks.length;
  const done = tasks.filter((t) => t.status === 'done').length;
  return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
}
