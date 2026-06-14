import { NextRequest, NextResponse } from 'next/server';
import { readDb, writeDb, generateId } from '@/lib/db';
import type { Task } from '@/lib/types';

export async function GET() {
  const db = readDb();
  return NextResponse.json(db.tasks);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body.title || !body.frequency || !body.dueDate) {
    return NextResponse.json({ error: 'חוסרים שדות חובה' }, { status: 400 });
  }

  const db = readDb();
  const task: Task = {
    id: generateId('t'),
    title: body.title,
    description: body.description ?? '',
    frequency: body.frequency,
    assigneeId: body.assigneeId ?? null,
    status: body.status ?? 'pending',
    dueDate: body.dueDate,
    createdAt: new Date().toISOString(),
  };

  db.tasks.push(task);
  writeDb(db);

  return NextResponse.json(task, { status: 201 });
}
