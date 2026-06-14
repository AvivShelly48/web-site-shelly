import { STATUS_LABELS, type TaskStatus } from '@/lib/types';

const COLORS: Record<TaskStatus, string> = {
  pending: 'bg-gray-100 text-gray-600',
  in_progress: 'bg-amber-100 text-amber-700',
  done: 'bg-green-100 text-green-700',
};

export default function StatusBadge({ status }: { status: TaskStatus }) {
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${COLORS[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}
