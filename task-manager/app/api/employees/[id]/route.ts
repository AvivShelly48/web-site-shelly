import { NextRequest, NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const db = readDb();
  const employee = db.employees.find((e) => e.id === id);

  if (!employee) {
    return NextResponse.json({ error: 'עובד לא נמצא' }, { status: 404 });
  }

  if (body.name !== undefined) employee.name = body.name;
  if (body.phone !== undefined) employee.phone = body.phone;
  if (body.email !== undefined) employee.email = body.email;

  writeDb(db);
  return NextResponse.json(employee);
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = readDb();
  const index = db.employees.findIndex((e) => e.id === id);

  if (index === -1) {
    return NextResponse.json({ error: 'עובד לא נמצא' }, { status: 404 });
  }

  db.employees.splice(index, 1);
  db.tasks.forEach((t) => {
    if (t.assigneeId === id) t.assigneeId = null;
  });
  writeDb(db);

  return NextResponse.json({ ok: true });
}
