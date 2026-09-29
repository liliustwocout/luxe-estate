import { NextRequest, NextResponse } from 'next/server';
import { getCustomerById, getCustomerViewings } from '@/lib/admin-data';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const customer = getCustomerById(id);
  if (!customer) {
    return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
  }
  const viewings = getCustomerViewings(id);
  return NextResponse.json({ customer, viewings });
}
