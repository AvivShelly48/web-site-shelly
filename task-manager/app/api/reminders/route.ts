import { NextRequest, NextResponse } from 'next/server';
import { buildEmployeeReminders, type ReminderScope } from '@/lib/reminders';

export async function GET(request: NextRequest) {
  const scopeParam = request.nextUrl.searchParams.get('scope');
  const scope: ReminderScope =
    scopeParam === 'today' || scopeParam === 'overdue' || scopeParam === 'week' ? scopeParam : 'week';

  const reminders = buildEmployeeReminders(scope);
  return NextResponse.json({ scope, reminders });
}
