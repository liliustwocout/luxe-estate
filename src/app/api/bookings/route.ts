import { NextRequest, NextResponse } from 'next/server';
import { addViewingFromCustomer } from '@/lib/admin-data';

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

    // Format date for email (if provided)
    const formattedDate = date
      ? new Date(date).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : 'Arranged via direct contact';

    // Send email notification
    const adminEmail = process.env.ADMIN_EMAIL;
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey && adminEmail) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'LuxeEstate <onboarding@resend.dev>',
            to: [adminEmail],
            subject: `New Viewing Request — ${propertyTitle || 'Property'}`,
            html: `
              <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
                <div style="background: #111111; padding: 32px; text-align: center;">
                  <h1 style="color: #C9A96E; font-size: 24px; font-weight: 500; margin: 0;">
                    LuxeEstate
                  </h1>
                </div>

                <div style="padding: 40px 32px;">
                  <p style="color: #1B3A4B; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 8px;">
                    New Viewing Request
                  </p>
                  <h2 style="color: #111111; font-size: 22px; font-weight: 500; margin: 0 0 24px;">
                    ${propertyTitle || 'Property Viewing'}
                  </h2>

                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #999; font-size: 13px; width: 120px;">Customer</td>
                      <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #111; font-size: 14px; font-weight: 500;">${customerName}</td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #999; font-size: 13px;">Phone</td>
                      <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #111; font-size: 14px; font-weight: 500;">
                        <a href="tel:${phone}" style="color: #1B3A4B; text-decoration: none;">${phone}</a>
                      </td>
                    </tr>
                    ${email ? `
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #999; font-size: 13px;">Email</td>
                      <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #111; font-size: 14px; font-weight: 500;">
                        <a href="mailto:${email}" style="color: #1B3A4B; text-decoration: none;">${email}</a>
                      </td>
                    </tr>
                    ` : ''}
                    ${date ? `
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #999; font-size: 13px;">Date</td>
                      <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #111; font-size: 14px; font-weight: 500;">${formattedDate}</td>
                    </tr>
                    ` : `
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #999; font-size: 13px;">Schedule</td>
                      <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #111; font-size: 14px; font-weight: 500;">Direct callback to arrange viewing time</td>
                    </tr>
                    `}
                    ${time ? `
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #999; font-size: 13px;">Time</td>
                      <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #111; font-size: 14px; font-weight: 500;">${time}</td>
                    </tr>
                    ` : ''}
                    ${message ? `
                    <tr>
                      <td style="padding: 12px 0; color: #999; font-size: 13px; vertical-align: top;">Message</td>
                      <td style="padding: 12px 0; color: #111; font-size: 14px; line-height: 1.5;">${message}</td>
                    </tr>
                    ` : ''}
                  </table>
                </div>

                <div style="padding: 24px 32px; background: #F7F7F5; text-align: center;">
                  <p style="color: #999; font-size: 12px; margin: 0;">
                    This is an automated notification from LuxeEstate.
                  </p>
                </div>
              </div>
            `,
          }),
        });
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
        // Don't fail the request if email fails
      }
    }

    // Save viewing request to Admin store
    const newViewing = addViewingFromCustomer({
      propertyId: propertyId || '',
      propertyTitle: propertyTitle || 'Luxe Residence',
      customerName,
      phone,
      email,
      date,
      time,
      message,
    });

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
