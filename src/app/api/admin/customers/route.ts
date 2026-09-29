import { NextRequest, NextResponse } from 'next/server';
import { getCustomers } from '@/lib/admin-data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search')?.toLowerCase() || '';

  let list = getCustomers();

  if (search) {
    list = list.filter(
      (c) =>
        c.name.toLowerCase().includes(search) ||
        c.phone.includes(search) ||
        c.email.toLowerCase().includes(search)
    );
  }

  return NextResponse.json({ customers: list });
}
