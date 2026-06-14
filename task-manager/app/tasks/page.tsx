'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { FREQUENCY_LABELS, STATUS_LABELS, type Employee, type Task, type TaskFrequency, type TaskStatus } from '@/lib/types';

type Filter = 'all' | TaskFrequency;

const STATUS_OPTIONS: TaskStatus[] = ['pending', 'in_progress', 'done'];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: '',
    description: '',
    frequency: 'daily' as TaskFrequency,
    assigneeId: '',
    dueDate: new Date().toISOString().slice(0, 10),
  });

  async function loadData() {
    setLoading(true);
    const [tasksRes, employeesRes] = await Promise.all([fetch('/api/tasks'), fetch('/api/employees')]);
    setTasks(await tasksRes.json());
    setEmployees(await employeesRes.json());
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function addTask(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) return;

    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, assigneeId: form.assigneeId || null }),
    });

    setForm({ title: '', description: '', frequency: 'daily', assigneeId: '', dueDate: new Date().toISOString().slice(0, 10) });
    setShowForm(false);
    loadData();
  }

  async function updateStatus(id: string, status: TaskStatus) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
    await fetch(`/api/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
  }

  async function updateAssignee(id: string, assigneeId: string) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, assigneeId: assigneeId || null } : t)));
    await fetch(`/api/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ assigneeId: assigneeId || null }),
    });
  }

  async function deleteTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
  }

  const filtered = tasks.filter((t) => filter === 'all' || t.frequency === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">משימות</h1>
          <p className="text-[var(--muted)] mt-1">רשימת משימות יומיות וחודשיות</p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-1.5 bg-[var(--brand)] text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:opacity-90"
        >
          <Plus size={16} />
          משימה חדשה
        </button>
      </div>

      {showForm && (
        <form onSubmit={addTask} className="app-card p-5 grid md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">כותרת המשימה</label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">תיאור</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-sm"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">תדירות</label>
            <select
              value={form.frequency}
              onChange={(e) => setForm({ ...form, frequency: e.target.value as TaskFrequency })}
              className="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-sm"
            >
              <option value="daily">יומית</option>
              <option value="weekly">שבועית</option>
              <option value="monthly">חודשית</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">תאריך יעד</label>
            <input
              type="date"
              required
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              className="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">שיוך לעובד</label>
            <select
              value={form.assigneeId}
              onChange={(e) => setForm({ ...form, assigneeId: e.target.value })}
              className="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-sm"
            >
              <option value="">לא משויך</option>
              {employees.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button type="submit" className="bg-[var(--brand)] text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:opacity-90">
              הוספת משימה
            </button>
          </div>
        </form>
      )}

      <div className="flex gap-2">
        {(['all', 'daily', 'weekly', 'monthly'] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3.5 py-2 rounded-xl text-sm font-medium ${
              filter === f ? 'bg-[var(--brand)] text-white' : 'bg-white text-[var(--muted)] shadow-sm'
            }`}
          >
            {f === 'all' ? 'הכל' : FREQUENCY_LABELS[f]}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-sm text-[var(--muted)]">טוען...</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-[var(--muted)]">אין משימות להצגה.</p>
      ) : (
        <>
          {/* mobile: card list */}
          <div className="md:hidden space-y-3">
            {filtered.map((task) => (
              <div key={task.id} className="app-card p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium">{task.title}</p>
                    {task.description && <p className="text-xs text-[var(--muted)] mt-0.5">{task.description}</p>}
                  </div>
                  <button onClick={() => deleteTask(task.id)} className="text-gray-400 hover:text-red-500 shrink-0">
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="flex items-center justify-between text-xs text-[var(--muted)]">
                  <span>{FREQUENCY_LABELS[task.frequency]}</span>
                  <span>יעד: {task.dueDate}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={task.assigneeId ?? ''}
                    onChange={(e) => updateAssignee(task.id, e.target.value)}
                    className="w-full border border-[var(--border)] rounded-lg px-2 py-2 text-xs"
                  >
                    <option value="">לא משויך</option>
                    {employees.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.name}
                      </option>
                    ))}
                  </select>
                  <select
                    value={task.status}
                    onChange={(e) => updateStatus(task.id, e.target.value as TaskStatus)}
                    className="w-full border border-[var(--border)] rounded-lg px-2 py-2 text-xs"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {STATUS_LABELS[s]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>

          {/* desktop: table */}
          <div className="hidden md:block app-card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[var(--bg)] text-[var(--muted)] text-xs">
                <tr>
                  <th className="text-right px-4 py-3">משימה</th>
                  <th className="text-right px-4 py-3">תדירות</th>
                  <th className="text-right px-4 py-3">יעד</th>
                  <th className="text-right px-4 py-3">עובד</th>
                  <th className="text-right px-4 py-3">סטטוס</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {filtered.map((task) => (
                  <tr key={task.id}>
                    <td className="px-4 py-3">
                      <p className="font-medium">{task.title}</p>
                      {task.description && <p className="text-xs text-[var(--muted)] mt-0.5">{task.description}</p>}
                    </td>
                    <td className="px-4 py-3">{FREQUENCY_LABELS[task.frequency]}</td>
                    <td className="px-4 py-3">{task.dueDate}</td>
                    <td className="px-4 py-3">
                      <select
                        value={task.assigneeId ?? ''}
                        onChange={(e) => updateAssignee(task.id, e.target.value)}
                        className="border border-[var(--border)] rounded-lg px-2 py-1 text-xs"
                      >
                        <option value="">לא משויך</option>
                        {employees.map((e) => (
                          <option key={e.id} value={e.id}>
                            {e.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={task.status}
                        onChange={(e) => updateStatus(task.id, e.target.value as TaskStatus)}
                        className="border border-[var(--border)] rounded-lg px-2 py-1 text-xs"
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {STATUS_LABELS[s]}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-left">
                      <button onClick={() => deleteTask(task.id)} className="text-gray-400 hover:text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
