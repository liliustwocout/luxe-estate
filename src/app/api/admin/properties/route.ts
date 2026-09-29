import { NextRequest, NextResponse } from 'next/server';
import { getAdminProperties, addAdminProperty } from '@/lib/admin-data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search')?.toLowerCase() || '';
  const status = searchParams.get('status') || '';
  const location = searchParams.get('location') || '';
  const type = searchParams.get('type') || '';

  let list = getAdminProperties();

  if (search) {
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(search) ||
        p.titleVi.toLowerCase().includes(search) ||
        p.location.toLowerCase().includes(search) ||
        p.locationVi.toLowerCase().includes(search) ||
        p.address.toLowerCase().includes(search)
    );
  }

  if (status && status !== 'all') {
    list = list.filter((p) => p.status.toLowerCase() === status.toLowerCase());
  }

  if (location && location !== 'all') {
    list = list.filter(
      (p) => p.location.toLowerCase().includes(location.toLowerCase()) || p.locationVi.toLowerCase().includes(location.toLowerCase())
    );
  }

  if (type && type !== 'all') {
    list = list.filter((p) => p.type.toLowerCase() === type.toLowerCase());
  }

  return NextResponse.json({ properties: list });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.title || !body.location || !body.monthlyRent) {
      return NextResponse.json({ error: 'Title, location and monthly rent are required.' }, { status: 400 });
    }

    const newProp = addAdminProperty({
      title: body.title,
      titleVi: body.titleVi || body.title,
      slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      location: body.location,
      locationVi: body.locationVi || body.location,
      address: body.address || '',
      type: body.type || 'Apartment',
      typeVi: body.typeVi || 'Căn Hộ Cao Cấp',
      monthlyRent: Number(body.monthlyRent),
      securityDeposit: body.securityDeposit || '2 months rent',
      securityDepositVi: body.securityDepositVi || '2 tháng tiền cọc',
      availableFrom: body.availableFrom || 'Available immediately',
      bedrooms: Number(body.bedrooms) || 1,
      bathrooms: Number(body.bathrooms) || 1,
      area: Number(body.area) || 50,
      floor: body.floor || 'Floor 1',
      floorVi: body.floorVi || 'Tầng 1',
      furnishing: body.furnishing || 'Fully Furnished',
      furnishingVi: body.furnishingVi || 'Đầy đủ nội thất cao cấp',
      leaseTerm: body.leaseTerm || 'Minimum 1 year',
      leaseTermVi: body.leaseTermVi || 'Hợp đồng tối thiểu 1 năm',
      description: body.description || '',
      descriptionVi: body.descriptionVi || '',
      amenities: body.amenities || ['Security 24/7', 'Air Conditioning'],
      amenitiesVi: body.amenitiesVi || ['Bảo vệ 24/7', 'Điều hòa âm trần'],
      images: body.images && body.images.length > 0 ? body.images : ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80'],
      status: body.status || 'Available',
      featured: Boolean(body.featured),
    });

    return NextResponse.json({ success: true, property: newProp });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
