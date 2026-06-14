import { NextRequest, NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const db = readDb();
  const task = db.tasks.find((t) => t.id === id);

  if (!task) {
    return NextResponse.json({ error: 'משימה לא נמצאה' }, { status: 404 });
  }

  if (body.title !== undefined) task.title = body.title;
  if (body.description !== undefined) task.description = body.description;
  if (body.frequency !== undefined) task.frequency = body.frequency;
  if (body.assigneeId !== undefined) task.assigneeId = body.assigneeId;
  if (body.status !== undefined) task.status = body.status;
  if (body.dueDate !== undefined) task.dueDate = body.dueDate;

  writeDb(db);
  return NextResponse.json(task);
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = readDb();
  const index = db.tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return NextResponse.json({ error: 'משימה לא נמצאה' }, { status: 404 });
  }

  db.tasks.splice(index, 1);
  writeDb(db);

  return NextResponse.json({ ok: true });
}
