export type TaskFrequency = 'daily' | 'weekly' | 'monthly';
export type TaskStatus = 'pending' | 'in_progress' | 'done';

export interface Employee {
  id: string;
  name: string;
  phone: string;
  email: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  frequency: TaskFrequency;
  assigneeId: string | null;
  status: TaskStatus;
  dueDate: string;
  createdAt: string;
}

export interface Database {
  employees: Employee[];
  tasks: Task[];
}

export const STATUS_LABELS: Record<TaskStatus, string> = {
  pending: 'ממתינה',
  in_progress: 'בתהליך',
  done: 'הושלמה',
};

export const FREQUENCY_LABELS: Record<TaskFrequency, string> = {
  daily: 'יומית',
  weekly: 'שבועית',
  monthly: 'חודשית',
};
