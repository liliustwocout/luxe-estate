import { NextRequest, NextResponse } from 'next/server';
import { getNotifications, markNotificationAsRead, markAllNotificationsAsRead } from '@/lib/admin-data';

export async function GET() {
  const notifications = getNotifications();
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  return NextResponse.json({ notifications, unreadCount });
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    if (body.all) {
      markAllNotificationsAsRead();
    } else if (body.id) {
      markNotificationAsRead(body.id);
    }
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
