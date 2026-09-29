import { NextRequest, NextResponse } from 'next/server';
import { getViewingById, updateViewingStatus, rescheduleViewing } from '@/lib/admin-data';
import { sendEmail } from '@/lib/email';
import {
  renderCustomerConfirmationEmail,
  renderCustomerRescheduledEmail,
  renderCustomerCancelledEmail,
} from '@/lib/email-templates';
import { generateICalendar } from '@/lib/calendar-ics';

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
    const { action, status, date, time, notes, reason } = body;

    const currentViewing = getViewingById(id);
    if (!currentViewing) {
      return NextResponse.json({ error: 'Viewing request not found' }, { status: 404 });
    }

    let updated = null;

    if (action === 'reschedule' && date && time) {
      const oldDate = currentViewing.date;
      const oldTime = currentViewing.time;
      updated = rescheduleViewing(id, date, time);

      // Gửi email thông báo dời lịch cho khách hàng
      if (updated && currentViewing.customerEmail) {
        try {
          const emailHtml = renderCustomerRescheduledEmail(
            {
              customerName: currentViewing.customerName,
              customerPhone: currentViewing.customerPhone,
              date: oldDate,
              time: oldTime,
            },
            {
              title: currentViewing.propertyTitle,
              location: currentViewing.propertyLocation,
              monthlyRent: currentViewing.propertyRent,
            },
            date,
            time,
            notes || reason || 'Điều chỉnh theo thỏa thuận đôi bên'
          );

          await sendEmail({
            to: currentViewing.customerEmail,
            subject: `[LuxeEstate] Thông Báo Điều Chỉnh Lịch Hẹn — ${currentViewing.propertyTitle}`,
            html: emailHtml,
          });
        } catch (mailErr) {
          console.error('Failed to send reschedule email:', mailErr);
        }
      }
    } else if (status) {
      updated = updateViewingStatus(id, status, notes);

      // Gửi email khi Admin Confirm (Xác nhận lịch)
      if (updated && status === 'Confirmed' && currentViewing.customerEmail) {
        try {
          // Tạo file .ics iCalendar
          const icsContent = generateICalendar({
            title: `LuxeEstate: Xem Căn Hộ ${currentViewing.propertyTitle}`,
            description: `Cuộc hẹn tham quan thực tế căn hộ ${currentViewing.propertyTitle} cùng chuyên viên LuxeEstate Concierge. Quý khách vui lòng có mặt đúng giờ. Hotline hỗ trợ: (+84) 28 8888 9999.`,
            location: currentViewing.propertyLocation,
            date: currentViewing.date,
            time: currentViewing.time,
            durationMinutes: 60,
          });

          const emailHtml = renderCustomerConfirmationEmail(
            {
              customerName: currentViewing.customerName,
              customerPhone: currentViewing.customerPhone,
              customerEmail: currentViewing.customerEmail,
              date: currentViewing.date,
              time: currentViewing.time,
            },
            {
              title: currentViewing.propertyTitle,
              location: currentViewing.propertyLocation,
              monthlyRent: currentViewing.propertyRent,
            }
          );

          await sendEmail({
            to: currentViewing.customerEmail,
            subject: `[LuxeEstate] Xác Nhận Lịch Hẹn Xem Nhà: ${currentViewing.propertyTitle}`,
            html: emailHtml,
            icsContent,
            icsFileName: `LuxeEstate-LichHen-${currentViewing.date}.ics`,
          });
        } catch (mailErr) {
          console.error('Failed to send confirmation email:', mailErr);
        }
      }

      // Gửi email khi Admin Cancel (Hủy lịch)
      if (updated && status === 'Cancelled' && currentViewing.customerEmail) {
        try {
          const emailHtml = renderCustomerCancelledEmail(
            {
              customerName: currentViewing.customerName,
              customerPhone: currentViewing.customerPhone,
              date: currentViewing.date,
              time: currentViewing.time,
            },
            {
              title: currentViewing.propertyTitle,
              location: currentViewing.propertyLocation,
              monthlyRent: currentViewing.propertyRent,
            },
            notes || reason || 'Lịch hẹn đã được hủy theo yêu cầu'
          );

          await sendEmail({
            to: currentViewing.customerEmail,
            subject: `[LuxeEstate] Thông Báo Hủy Lịch Hẹn: ${currentViewing.propertyTitle}`,
            html: emailHtml,
          });
        } catch (mailErr) {
          console.error('Failed to send cancellation email:', mailErr);
        }
      }
    }

    if (!updated) {
      return NextResponse.json({ error: 'Failed to update viewing request' }, { status: 400 });
    }

    return NextResponse.json({ success: true, viewing: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
