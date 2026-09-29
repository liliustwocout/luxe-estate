/**
 * LuxeEstate - Luxury HTML Email Templates
 * Thiết kế giao diện email chuẩn cao cấp, responsive, tối ưu hiển thị trên Gmail, Apple Mail, Outlook.
 */

interface PropertyInfo {
  id?: string;
  title: string;
  location: string;
  address?: string;
  monthlyRent: number;
}

interface BookingInfo {
  id?: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  date: string;
  time: string;
  message?: string;
}

const BRAND_GOLD = '#C9A96E';
const BRAND_DARK = '#111111';
const BG_COLOR = '#F7F7F5';
const CARD_BG = '#FFFFFF';
const TEXT_MUTED = '#6B6B6B';
const BORDER_COLOR = '#E8E8E5';

function baseEmailWrapper(content: string, previewText: string = ''): string {
  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LuxeEstate Notification</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    body { margin: 0; padding: 0; background-color: ${BG_COLOR}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: ${BRAND_DARK}; }
    table { border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; }
    td { font-family: inherit; font-size: 14px; vertical-align: top; }
    .container { display: block; margin: 0 auto !important; max-width: 600px; padding: 32px 16px; width: 600px; }
    .content-box { background: ${CARD_BG}; border-radius: 16px; border: 1px solid ${BORDER_COLOR}; padding: 36px 32px; box-shadow: 0 4px 20px rgba(0,0,0,0.04); }
    .btn-gold { background-color: ${BRAND_GOLD}; color: #000000 !important; font-weight: 700; text-decoration: none; padding: 14px 28px; border-radius: 10px; display: inline-block; font-size: 14px; letter-spacing: 0.5px; }
    .btn-dark { background-color: ${BRAND_DARK}; color: #FFFFFF !important; font-weight: 600; text-decoration: none; padding: 12px 24px; border-radius: 8px; display: inline-block; font-size: 13px; }
    .badge-gold { background: rgba(201, 169, 110, 0.15); color: ${BRAND_GOLD}; font-weight: 700; font-size: 11px; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px; display: inline-block; }
    .divider { height: 1px; background-color: ${BORDER_COLOR}; margin: 24px 0; }
  </style>
</head>
<body>
  <span style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">${previewText}</span>
  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
    <tr>
      <td>&nbsp;</td>
      <td class="container">
        <!-- Header Logo -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
          <tr>
            <td align="center">
              <div style="font-size: 20px; font-weight: 800; letter-spacing: 3px; color: ${BRAND_DARK}; text-transform: uppercase;">
                LUXE<span style="color: ${BRAND_GOLD};">ESTATE</span>
              </div>
              <div style="font-size: 10px; letter-spacing: 2px; color: ${TEXT_MUTED}; text-transform: uppercase; margin-top: 4px;">
                Luxury Real Estate Concierge
              </div>
            </td>
          </tr>
        </table>

        <!-- Main Card -->
        <div class="content-box">
          ${content}
        </div>

        <!-- Footer -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-top: 24px;">
          <tr>
            <td align="center" style="font-size: 12px; color: ${TEXT_MUTED}; line-height: 18px;">
              <div>LuxeEstate Vietnam — Dịch Vụ Cho Thuê Bất Động Sản Thượng Lưu</div>
              <div>Hotline Trực Ban: (+84) 28 8888 9999 | Email: concierge@luxeestate.vn</div>
              <div style="margin-top: 10px; font-size: 11px; color: #A3A3A3;">
                Đây là email tự động từ hệ thống quản lý LuxeEstate Portal.
              </div>
            </td>
          </tr>
        </table>
      </td>
      <td>&nbsp;</td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * 1. Email thông báo cho Admin khi có khách đặt lịch mới
 */
export function renderAdminNewBookingEmail(booking: BookingInfo, property: PropertyInfo): string {
  const preview = `Lịch xem nhà mới từ ${booking.customerName} - ${property.title}`;
  const content = `
    <div style="text-align: center; margin-bottom: 24px;">
      <span class="badge-gold">YÊU CẦU ĐẶT LỊCH MỚI (NEW VIEWING REQUEST)</span>
      <h1 style="font-size: 22px; font-weight: 800; color: ${BRAND_DARK}; margin: 16px 0 6px 0;">Khách Hàng Đặt Lịch Xem Nhà</h1>
      <p style="color: ${TEXT_MUTED}; font-size: 14px; margin: 0;">Vui lòng kiểm tra và bấm xác nhận để hệ thống gửi thư đón tiếp cho khách.</p>
    </div>

    <!-- Thông tin BĐS -->
    <table role="presentation" style="background: ${BG_COLOR}; border-radius: 12px; padding: 18px 20px; margin-bottom: 20px;">
      <tr>
        <td>
          <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: ${BRAND_GOLD}; font-weight: 700; margin-bottom: 4px;">BẤT ĐỘNG SẢN QUAN TÂM</div>
          <div style="font-size: 16px; font-weight: 700; color: ${BRAND_DARK};">${property.title}</div>
          <div style="font-size: 13px; color: ${TEXT_MUTED}; margin-top: 2px;">📍 ${property.location}</div>
          <div style="font-size: 14px; font-weight: 700; color: ${BRAND_GOLD}; margin-top: 6px;">$${property.monthlyRent.toLocaleString()}/tháng (~${(property.monthlyRent * 25.4 / 1000).toFixed(0)} Triệu VNĐ)</div>
        </td>
      </tr>
    </table>

    <!-- Chi tiết cuộc hẹn & Khách hàng -->
    <table role="presentation" style="margin-bottom: 24px;">
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px dashed ${BORDER_COLOR}; width: 40%; color: ${TEXT_MUTED};">Khách Hàng:</td>
        <td style="padding: 8px 0; border-bottom: 1px dashed ${BORDER_COLOR}; font-weight: 700; color: ${BRAND_DARK};">${booking.customerName}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px dashed ${BORDER_COLOR}; color: ${TEXT_MUTED};">Số Điện Thoại:</td>
        <td style="padding: 8px 0; border-bottom: 1px dashed ${BORDER_COLOR}; font-weight: 700; color: ${BRAND_DARK}; font-family: monospace;">${booking.customerPhone}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px dashed ${BORDER_COLOR}; color: ${TEXT_MUTED};">Email Khách:</td>
        <td style="padding: 8px 0; border-bottom: 1px dashed ${BORDER_COLOR}; color: ${BRAND_DARK};">${booking.customerEmail || '—'}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px dashed ${BORDER_COLOR}; color: ${TEXT_MUTED};">Thời Gian Hẹn:</td>
        <td style="padding: 8px 0; border-bottom: 1px dashed ${BORDER_COLOR}; font-weight: 700; color: #16A34A;">${booking.date} lúc ${booking.time}</td>
      </tr>
      ${booking.message ? `
      <tr>
        <td style="padding: 8px 0; color: ${TEXT_MUTED};">Lời Nhắn:</td>
        <td style="padding: 8px 0; color: ${BRAND_DARK}; font-style: italic;">"${booking.message}"</td>
      </tr>` : ''}
    </table>

    <div style="text-align: center; margin-top: 28px;">
      <a href="https://luxury-estate-self.vercel.app/admin/viewings" class="btn-dark">
        Mở Admin Dashboard Để Xác Nhận →
      </a>
    </div>
  `;
  return baseEmailWrapper(content, preview);
}

/**
 * 2. Email xác nhận gửi cho Khách Hàng khi Admin bấm "Confirm"
 */
export function renderCustomerConfirmationEmail(booking: BookingInfo, property: PropertyInfo): string {
  const preview = `Xác nhận lịch xem nhà: ${property.title} vào ${booking.date} lúc ${booking.time}`;
  const content = `
    <div style="text-align: center; margin-bottom: 24px;">
      <span class="badge-gold">LỊCH HẸN ĐÃ ĐƯỢC XÁC NHẬN</span>
      <h1 style="font-size: 22px; font-weight: 800; color: ${BRAND_DARK}; margin: 16px 0 6px 0;">Kính chào Quý khách ${booking.customerName}</h1>
      <p style="color: ${TEXT_MUTED}; font-size: 14px; margin: 0; line-height: 22px;">
        Đội ngũ LuxeEstate xin trân trọng thông báo lịch hẹn tham quan bất động sản của Quý khách đã được chuyên viên tiếp đón xác nhận thành công.
      </p>
    </div>

    <!-- Thẻ cuộc hẹn -->
    <div style="background: linear-gradient(135deg, #111111 0%, #1c1c1c 100%); border-radius: 14px; padding: 24px; color: #FFFFFF; margin-bottom: 24px;">
      <div style="font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: ${BRAND_GOLD}; font-weight: 700;">THÔNG TIN BUỔI THAM QUAN</div>
      <div style="font-size: 18px; font-weight: 800; margin: 8px 0 4px 0;">${property.title}</div>
      <div style="font-size: 13px; color: #D4D4D4;">📍 ${property.address || property.location}</div>
      
      <div class="divider" style="background: rgba(255,255,255,0.15); margin: 16px 0;"></div>

      <table role="presentation">
        <tr>
          <td style="width: 50%;">
            <div style="font-size: 11px; color: #A3A3A3; text-transform: uppercase;">NGÀY THAM QUAN</div>
            <div style="font-size: 16px; font-weight: 700; color: ${BRAND_GOLD}; margin-top: 4px;">${booking.date}</div>
          </td>
          <td style="width: 50%;">
            <div style="font-size: 11px; color: #A3A3A3; text-transform: uppercase;">GIỜ ĐÓN TIẾP</div>
            <div style="font-size: 16px; font-weight: 700; color: ${BRAND_GOLD}; margin-top: 4px;">${booking.time}</div>
          </td>
        </tr>
      </table>
    </div>

    <!-- Hướng dẫn đón tiếp -->
    <div style="background: ${BG_COLOR}; border-radius: 12px; padding: 18px 20px; margin-bottom: 24px;">
      <div style="font-weight: 700; color: ${BRAND_DARK}; margin-bottom: 6px; font-size: 14px;">🛎️ Quy Trình Tiếp Đón:</div>
      <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: ${TEXT_MUTED}; line-height: 20px;">
        <li>Chuyên viên Concierge riêng sẽ có mặt tại sảnh đón trước 15 phút để chuẩn bị thẻ thang máy và chìa khóa căn hộ.</li>
        <li>Chuyên viên sẽ liên hệ với Quý khách qua số điện thoại <strong>${booking.customerPhone}</strong> trước giờ hẹn.</li>
        <li>Kèm theo email này là file lịch hẹn <strong>.ics</strong> giúp Quý khách lưu nhanh vào điện thoại.</li>
      </ul>
    </div>

    <div style="text-align: center; margin-top: 24px;">
      <a href="tel:+842888889999" class="btn-gold">
        Liên Hệ Hotline Concierge: (+84) 28 8888 9999
      </a>
    </div>
  `;
  return baseEmailWrapper(content, preview);
}

/**
 * 3. Email thông báo Dời Lịch Hẹn (Rescheduled)
 */
export function renderCustomerRescheduledEmail(
  booking: BookingInfo,
  property: PropertyInfo,
  newDate: string,
  newTime: string,
  reason?: string
): string {
  const preview = `Thông báo điều chỉnh lịch xem nhà: ${property.title}`;
  const content = `
    <div style="text-align: center; margin-bottom: 24px;">
      <span class="badge-gold">ĐIỀU CHỈNH LỊCH HẸN (RESCHEDULED)</span>
      <h1 style="font-size: 22px; font-weight: 800; color: ${BRAND_DARK}; margin: 16px 0 6px 0;">Kính chào Quý khách ${booking.customerName}</h1>
      <p style="color: ${TEXT_MUTED}; font-size: 14px; margin: 0; line-height: 22px;">
        Lịch hẹn tham quan căn hộ <strong>${property.title}</strong> đã được điều chỉnh sang khung giờ mới theo thỏa thuận.
      </p>
    </div>

    <table role="presentation" style="background: ${BG_COLOR}; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
      <tr>
        <td style="color: ${TEXT_MUTED}; width: 45%;">Lịch hẹn cũ:</td>
        <td style="text-decoration: line-through; color: #EF4444; font-weight: 600;">${booking.date} lúc ${booking.time}</td>
      </tr>
      <tr>
        <td style="color: ${TEXT_MUTED}; padding-top: 10px;">Lịch hẹn mới:</td>
        <td style="color: #16A34A; font-weight: 800; font-size: 16px; padding-top: 10px;">${newDate} lúc ${newTime}</td>
      </tr>
      ${reason ? `
      <tr>
        <td style="color: ${TEXT_MUTED}; padding-top: 10px;">Lý do điều chỉnh:</td>
        <td style="color: ${BRAND_DARK}; padding-top: 10px; font-style: italic;">"${reason}"</td>
      </tr>` : ''}
    </table>

    <div style="text-align: center; margin-top: 24px;">
      <p style="font-size: 13px; color: ${TEXT_MUTED};">Nếu khung giờ mới chưa thực sự thuận tiện, Quý khách vui lòng gọi ngay hotline để chúng tôi sắp xếp lại.</p>
      <a href="tel:+842888889999" class="btn-dark">
        Gọi Hotline Hỗ Trợ: (+84) 28 8888 9999
      </a>
    </div>
  `;
  return baseEmailWrapper(content, preview);
}

/**
 * 4. Email thông báo Hủy Lịch Hẹn (Cancelled)
 */
export function renderCustomerCancelledEmail(
  booking: BookingInfo,
  property: PropertyInfo,
  reason?: string
): string {
  const preview = `Lịch xem nhà ${property.title} đã được hủy`;
  const content = `
    <div style="text-align: center; margin-bottom: 24px;">
      <span style="background: rgba(239, 68, 68, 0.15); color: #EF4444; font-weight: 700; font-size: 11px; padding: 4px 10px; border-radius: 20px; text-transform: uppercase;">
        LỊCH HẸN ĐÃ HỦY
      </span>
      <h1 style="font-size: 22px; font-weight: 800; color: ${BRAND_DARK}; margin: 16px 0 6px 0;">Kính chào Quý khách ${booking.customerName}</h1>
      <p style="color: ${TEXT_MUTED}; font-size: 14px; margin: 0; line-height: 22px;">
        Lịch hẹn xem căn hộ <strong>${property.title}</strong> vào ngày ${booking.date} lúc ${booking.time} đã được hủy bỏ trên hệ thống.
      </p>
    </div>

    ${reason ? `
    <div style="background: ${BG_COLOR}; border-radius: 12px; padding: 16px 20px; font-size: 13px; color: ${TEXT_MUTED}; margin-bottom: 20px;">
      <strong>Ghi chú:</strong> ${reason}
    </div>` : ''}

    <p style="font-size: 13px; color: ${TEXT_MUTED}; text-align: center;">
      Quý khách luôn có thể tham khảo thêm các bất động sản cao cấp khác hoặc đặt lịch hẹn mới bất kỳ lúc nào trên website của chúng tôi.
    </p>

    <div style="text-align: center; margin-top: 24px;">
      <a href="https://luxury-estate-self.vercel.app/properties" class="btn-gold">
        Khám Phá Các Căn Hộ Khác →
      </a>
    </div>
  `;
  return baseEmailWrapper(content, preview);
}

/**
 * 5. Email kiểm tra cấu hình Test Email
 */
export function renderTestEmail(adminEmail: string): string {
  const preview = `Kiểm tra kết nối email hệ thống LuxeEstate`;
  const content = `
    <div style="text-align: center; margin-bottom: 20px;">
      <span class="badge-gold">KIỂM TRA CẤU HÌNH THÀNH CÔNG</span>
      <h1 style="font-size: 22px; font-weight: 800; color: ${BRAND_DARK}; margin: 16px 0 6px 0;">Hệ Thống Email LuxeEstate Đang Hoạt Động</h1>
      <p style="color: ${TEXT_MUTED}; font-size: 14px; margin: 0;">
        Email này xác nhận kênh kết nối gửi thư tự động (Transactional Email) của bạn đã được thiết lập chính xác.
      </p>
    </div>

    <div style="background: ${BG_COLOR}; border-radius: 12px; padding: 18px 20px; font-size: 13px; color: ${BRAND_DARK}; margin-bottom: 20px;">
      <div>• <strong>Email nhận:</strong> ${adminEmail}</div>
      <div style="margin-top: 6px;">• <strong>Thời gian kiểm tra:</strong> ${new Date().toLocaleString('vi-VN')}</div>
      <div style="margin-top: 6px;">• <strong>Hạ tầng:</strong> Resend API / SMTP Engine (Next.js Serverless)</div>
    </div>
  `;
  return baseEmailWrapper(content, preview);
}
