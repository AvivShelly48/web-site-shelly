import React, { useEffect, useState, useMemo } from "react";
import { Plus, Trash2, Send, MessageCircle, Mail, BellRing } from "lucide-react";
// ישויות קיימות באפליקציה + הישות החדשה Task (ראו entities/Task.json)
import { Task, Project, Contact } from "@/api/entities";
// אינטגרציית מייל מובנית של Base44
import { SendEmail } from "@/api/integrations";

import {
  STATUS_LABELS,
  FREQUENCY_LABELS,
  STAGE_LABELS,
  STAGE_ORDER,
  STATUS_OPTIONS,
  FREQUENCY_OPTIONS,
  contactName,
  projectName,
  buildReminders,
  buildReportText,
  progress,
  todayStr,
} from "@/components/tasks/taskUtils"; // העבירו את taskUtils.js לנתיב הזה (או עדכנו את הייבוא)

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // פילטרים
  const [fProject, setFProject] = useState("all");
  const [fStage, setFStage] = useState("all");
  const [fFrequency, setFFrequency] = useState("all");

  // תזכורות
  const [scope, setScope] = useState("today"); // today | week | overdue

  const [form, setForm] = useState({
    title: "",
    description: "",
    project_id: "",
    stage: "licensing",
    contact_id: "",
    frequency: "daily",
    due_date: todayStr(),
    status: "pending",
  });

  async function loadData() {
    setLoading(true);
    const [t, p, c] = await Promise.all([
      Task.list("-created_date"),
      Project.list(),
      Contact.list(),
    ]);
    setTasks(t);
    setProjects(p);
    setContacts(c);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function addTask(e) {
    e.preventDefault();
    if (!form.title.trim()) return;
    await Task.create({
      ...form,
      project_id: form.project_id || null,
      contact_id: form.contact_id || null,
    });
    setForm({
      title: "",
      description: "",
      project_id: "",
      stage: "licensing",
      contact_id: "",
      frequency: "daily",
      due_date: todayStr(),
      status: "pending",
    });
    setShowForm(false);
    loadData();
  }

  async function updateTask(id, patch) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
    await Task.update(id, patch);
  }

  async function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    await Task.delete(id);
  }

  // ----- סינון -----
  const filtered = useMemo(
    () =>
      tasks.filter(
        (t) =>
          (fProject === "all" || t.project_id === fProject) &&
          (fStage === "all" || t.stage === fStage) &&
          (fFrequency === "all" || t.frequency === fFrequency),
      ),
    [tasks, fProject, fStage, fFrequency],
  );

  // ----- קיבוץ: פרויקט -> שלב -----
  const grouped = useMemo(() => {
    const byProject = {};
    for (const t of filtered) {
      const pid = t.project_id || "none";
      byProject[pid] = byProject[pid] || {};
      const stage = t.stage || "other";
      byProject[pid][stage] = byProject[pid][stage] || [];
      byProject[pid][stage].push(t);
    }
    return byProject;
  }, [filtered]);

  const overall = progress(filtered);
  const reminders = useMemo(
    () => buildReminders({ tasks, contacts, scope }),
    [tasks, contacts, scope],
  );

  // ----- שליחת התראות -----
  async function sendEmailReminder(reminder) {
    const to = reminder.contact.email;
    if (!to) {
      alert("לאיש קשר זה אין כתובת מייל");
      return;
    }
    await SendEmail({
      to,
      subject: "תזכורת משימות",
      body: reminder.message,
    });
    alert(`נשלח מייל ל-${reminder.contact.name || to}`);
  }

  function sendWhatsApp(reminder) {
    if (reminder.whatsappUrl) window.open(reminder.whatsappUrl, "_blank");
  }

  // ----- מזהי פרויקטים שיש להם משימות, בסדר -----
  const projectIds = Object.keys(grouped);

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6" dir="rtl">
      {/* כותרת */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">משימות</h1>
          <p className="text-gray-500 mt-1">ניהול משימות לפי פרויקט ושלב, עם תזכורות במייל ובוואטסאפ</p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:opacity-90"
        >
          <Plus size={16} /> משימה חדשה
        </button>
      </div>

      {/* דשבורד התקדמות */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold">התקדמות כללית</span>
          <span className="text-sm text-gray-500">
            {overall.done}/{overall.total} ({overall.pct}%)
          </span>
        </div>
        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600" style={{ width: `${overall.pct}%` }} />
        </div>
      </div>

      {/* טופס הוספה */}
      {showForm && (
        <form onSubmit={addTask} className="bg-white rounded-2xl shadow-sm p-5 grid md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">כותרת המשימה</label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">תיאור</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={2}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">פרויקט</label>
            <select
              value={form.project_id}
              onChange={(e) => setForm({ ...form, project_id: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
            >
              <option value="">ללא פרויקט</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name || p.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">שלב</label>
            <select
              value={form.stage}
              onChange={(e) => setForm({ ...form, stage: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
            >
              {STAGE_ORDER.map((s) => (
                <option key={s} value={s}>
                  {STAGE_LABELS[s]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">איש קשר אחראי</label>
            <select
              value={form.contact_id}
              onChange={(e) => setForm({ ...form, contact_id: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
            >
              <option value="">לא משויך</option>
              {contacts.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name || c.full_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">תדירות</label>
            <select
              value={form.frequency}
              onChange={(e) => setForm({ ...form, frequency: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
            >
              {FREQUENCY_OPTIONS.map((f) => (
                <option key={f} value={f}>
                  {FREQUENCY_LABELS[f]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">תאריך יעד</label>
            <input
              type="date"
              value={form.due_date}
              onChange={(e) => setForm({ ...form, due_date: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:opacity-90">
              הוספת משימה
            </button>
          </div>
        </form>
      )}

      {/* פילטרים */}
      <div className="flex flex-wrap gap-2">
        <select value={fProject} onChange={(e) => setFProject(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white">
          <option value="all">כל הפרויקטים</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>{p.name || p.title}</option>
          ))}
        </select>
        <select value={fStage} onChange={(e) => setFStage(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white">
          <option value="all">כל השלבים</option>
          {STAGE_ORDER.map((s) => (
            <option key={s} value={s}>{STAGE_LABELS[s]}</option>
          ))}
        </select>
        <select value={fFrequency} onChange={(e) => setFFrequency(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white">
          <option value="all">כל התדירויות</option>
          {FREQUENCY_OPTIONS.map((f) => (
            <option key={f} value={f}>{FREQUENCY_LABELS[f]}</option>
          ))}
        </select>
      </div>

      {/* רשימת משימות מקובצת: פרויקט -> שלב */}
      {loading ? (
        <p className="text-sm text-gray-500">טוען...</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-gray-500">אין משימות להצגה.</p>
      ) : (
        <div className="space-y-6">
          {projectIds.map((pid) => (
            <div key={pid} className="space-y-3">
              <h2 className="text-lg font-bold">
                {pid === "none" ? "ללא פרויקט" : projectName(projects, pid)}
              </h2>
              {STAGE_ORDER.concat(["other"]).map((stage) => {
                const items = grouped[pid][stage];
                if (!items || items.length === 0) return null;
                return (
                  <div key={stage} className="space-y-2">
                    <p className="text-sm font-medium text-blue-600">
                      {STAGE_LABELS[stage] || "ללא שלב"}
                    </p>
                    {items.map((task) => (
                      <div key={task.id} className="bg-white rounded-2xl shadow-sm p-4 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-medium">{task.title}</p>
                            {task.description && (
                              <p className="text-xs text-gray-500 mt-0.5">{task.description}</p>
                            )}
                          </div>
                          <button onClick={() => deleteTask(task.id)} className="text-gray-400 hover:text-red-500 shrink-0">
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{FREQUENCY_LABELS[task.frequency]}</span>
                          <span>יעד: {task.due_date || "-"}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <select
                            value={task.contact_id || ""}
                            onChange={(e) => updateTask(task.id, { contact_id: e.target.value || null })}
                            className="w-full border border-gray-200 rounded-lg px-2 py-2 text-xs"
                          >
                            <option value="">לא משויך</option>
                            {contacts.map((c) => (
                              <option key={c.id} value={c.id}>{c.name || c.full_name}</option>
                            ))}
                          </select>
                          <select
                            value={task.status}
                            onChange={(e) => updateTask(task.id, { status: e.target.value })}
                            className="w-full border border-gray-200 rounded-lg px-2 py-2 text-xs"
                          >
                            {STATUS_OPTIONS.map((s) => (
                              <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* תזכורות מרוכזות */}
      <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
        <div className="flex items-center gap-2">
          <BellRing size={18} className="text-blue-600" />
          <h2 className="text-lg font-bold">תזכורות</h2>
        </div>
        <div className="flex gap-2">
          {[
            ["today", "להיום"],
            ["week", "לשבוע"],
            ["overdue", "באיחור"],
          ].map(([val, label]) => (
            <button
              key={val}
              onClick={() => setScope(val)}
              className={`px-3.5 py-2 rounded-xl text-sm font-medium ${
                scope === val ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {reminders.length === 0 ? (
          <p className="text-sm text-gray-500">אין תזכורות פתוחות לטווח הזה.</p>
        ) : (
          reminders.map((r) => (
            <div key={r.contact.id} className="border border-gray-100 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{r.contact.name || r.contact.full_name}</p>
                  <p className="text-xs text-gray-500">
                    {r.tasks.length} משימות פתוחות{r.overdue > 0 ? ` · ${r.overdue} באיחור` : ""}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => sendWhatsApp(r)}
                    disabled={!r.whatsappUrl}
                    className="flex items-center gap-1 bg-green-600 disabled:opacity-40 text-white px-3 py-1.5 rounded-lg text-xs"
                  >
                    <MessageCircle size={14} /> וואטסאפ
                  </button>
                  <button
                    onClick={() => sendEmailReminder(r)}
                    className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs"
                  >
                    <Mail size={14} /> מייל
                  </button>
                </div>
              </div>
              <pre className="text-xs text-gray-600 whitespace-pre-wrap font-sans bg-gray-50 rounded-lg p-2">{r.message}</pre>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
