import { NextRequest, NextResponse } from 'next/server';
import { getViewings } from '@/lib/admin-data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status') || '';
  const search = searchParams.get('search')?.toLowerCase() || '';
  const date = searchParams.get('date') || '';

  let list = getViewings();

  if (status && status !== 'all') {
    list = list.filter((v) => v.status.toLowerCase() === status.toLowerCase());
  }

  if (search) {
    list = list.filter(
      (v) =>
        v.customerName.toLowerCase().includes(search) ||
        v.customerPhone.includes(search) ||
        v.propertyTitle.toLowerCase().includes(search) ||
        v.propertyLocation.toLowerCase().includes(search)
    );
  }

  if (date) {
    list = list.filter((v) => v.date === date);
  }

  return NextResponse.json({ viewings: list });
}
