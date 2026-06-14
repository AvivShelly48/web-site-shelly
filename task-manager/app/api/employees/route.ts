import { NextRequest, NextResponse } from 'next/server';
import { readDb, writeDb, generateId } from '@/lib/db';
import type { Employee } from '@/lib/types';

export async function GET() {
  const db = readDb();
  return NextResponse.json(db.employees);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body.name || !body.phone || !body.email) {
    return NextResponse.json({ error: 'חוסרים שדות חובה' }, { status: 400 });
  }

  const db = readDb();
  const employee: Employee = {
    id: generateId('e'),
    name: body.name,
    phone: body.phone,
    email: body.email,
  };

  db.employees.push(employee);
  writeDb(db);

  return NextResponse.json(employee, { status: 201 });
}
