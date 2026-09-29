import { NextRequest, NextResponse } from 'next/server';
import { getViewingById, updateViewingStatus, rescheduleViewing } from '@/lib/admin-data';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const viewing = getViewingById(id);
  if (!viewing) {
    return NextResponse.json({ error: 'Viewing request not found' }, { status: 404 });
  }
  return NextResponse.json({ viewing });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const { action, status, date, time, notes } = body;

    let updated = null;

    if (action === 'reschedule' && date && time) {
      updated = rescheduleViewing(id, date, time);
    } else if (status) {
      updated = updateViewingStatus(id, status, notes);
    }

    if (!updated) {
      return NextResponse.json({ error: 'Failed to update viewing request' }, { status: 400 });
    }

    return NextResponse.json({ success: true, viewing: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
