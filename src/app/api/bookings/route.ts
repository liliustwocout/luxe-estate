import { NextRequest, NextResponse } from 'next/server';
import { addViewingFromCustomer } from '@/lib/admin-data';
import { sendEmail } from '@/lib/email';
import { renderAdminNewBookingEmail } from '@/lib/email-templates';

// Simple in-memory rate limiting
const rateLimit = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 requests per minute per IP

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now - entry.lastReset > RATE_LIMIT_WINDOW) {
    rateLimit.set(ip, { count: 1, lastReset: now });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-().]/g, '');
  return /^((\+84|0)[35789]\d{8}|\+?[1-9]\d{7,14})$/.test(cleaned);
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { propertyId, propertyTitle, customerName, phone, email, date, time, message } = body;

    // Validation
    if (!customerName || typeof customerName !== 'string' || !customerName.trim()) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
    }
    if (!phone || typeof phone !== 'string' || !validatePhone(phone)) {
      return NextResponse.json({ error: 'Valid phone number is required.' }, { status: 400 });
    }

    // Format date for display
    const formattedDate = date || 'Thỏa thuận trực tiếp';

    // Save viewing request to Admin store (Không tự sinh ngày giờ giả lập)
    const newViewing = addViewingFromCustomer({
      propertyId: propertyId || '',
      propertyTitle: propertyTitle || 'Luxe Residence',
      customerName,
      phone,
      email,
      date: date || '',
      time: time || '',
      message,
    });

    // Send Admin Notification Email via LuxeEstate Universal Email Engine
    const adminNotificationEmail = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL || 'admin@luxeestate.vn';
    try {
      const emailHtml = renderAdminNewBookingEmail(
        {
          id: newViewing.id,
          customerName,
          customerPhone: phone,
          customerEmail: email,
          date: date || '',
          time: time || '',
          message,
        },
        {
          id: propertyId,
          title: propertyTitle || 'Luxe Residence',
          location: 'Việt Nam',
          monthlyRent: newViewing.propertyRent || 1500,
        }
      );

      await sendEmail({
        to: adminNotificationEmail,
        subject: `[LuxeEstate] Yêu Cầu Xem Nhà Mới — ${customerName} (${propertyTitle || 'BĐS'})`,
        html: emailHtml,
      });
    } catch (emailErr) {
      console.error('Failed to trigger admin notification email:', emailErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Viewing request submitted successfully.',
      viewingId: newViewing.id,
    });
  } catch (error) {
    console.error('Booking API error:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
