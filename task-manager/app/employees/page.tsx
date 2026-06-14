'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { Employee } from '@/lib/types';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', phone: '', email: '' });

  async function loadData() {
    setLoading(true);
    const res = await fetch('/api/employees');
    setEmployees(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function addEmployee(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) return;

    await fetch('/api/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    setForm({ name: '', phone: '', email: '' });
    setShowForm(false);
    loadData();
  }

  async function deleteEmployee(id: string) {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    await fetch(`/api/employees/${id}`, { method: 'DELETE' });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">עובדים</h1>
          <p className="text-[var(--muted)] mt-1">ניהול רשימת עובדי המשרד לצורך שיוך משימות ושליחת דוחות</p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-1.5 bg-[var(--brand)] text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:opacity-90"
        >
          <Plus size={16} />
          עובד חדש
        </button>
      </div>

      {showForm && (
        <form onSubmit={addEmployee} className="app-card p-5 grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">שם מלא</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">טלפון (כולל קידומת מדינה, לדוגמה 9725...)</label>
            <input
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="972501234567"
              className="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">אימייל</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div className="md:col-span-3 flex justify-end">
            <button type="submit" className="bg-[var(--brand)] text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:opacity-90">
              הוספת עובד
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-sm text-[var(--muted)]">טוען...</p>
      ) : employees.length === 0 ? (
        <p className="text-sm text-[var(--muted)]">אין עובדים מוגדרים.</p>
      ) : (
        <>
          {/* mobile: card list */}
          <div className="md:hidden space-y-3">
            {employees.map((emp) => (
              <div key={emp.id} className="app-card p-4 flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium">{emp.name}</p>
                  <p className="text-xs text-[var(--muted)] mt-1">{emp.phone}</p>
                  <p className="text-xs text-[var(--muted)]">{emp.email}</p>
                </div>
                <button onClick={() => deleteEmployee(emp.id)} className="text-gray-400 hover:text-red-500 shrink-0">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* desktop: table */}
          <div className="hidden md:block app-card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[var(--bg)] text-[var(--muted)] text-xs">
                <tr>
                  <th className="text-right px-4 py-3">שם</th>
                  <th className="text-right px-4 py-3">טלפון</th>
                  <th className="text-right px-4 py-3">אימייל</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {employees.map((emp) => (
                  <tr key={emp.id}>
                    <td className="px-4 py-3 font-medium">{emp.name}</td>
                    <td className="px-4 py-3">{emp.phone}</td>
                    <td className="px-4 py-3">{emp.email}</td>
                    <td className="px-4 py-3 text-left">
                      <button onClick={() => deleteEmployee(emp.id)} className="text-gray-400 hover:text-red-500">
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
