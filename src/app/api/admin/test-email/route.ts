import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, getEmailConfigStatus } from '@/lib/email';
import { renderTestEmail } from '@/lib/email-templates';

export async function GET() {
  const config = getEmailConfigStatus();
  return NextResponse.json({
    success: true,
    config: {
      provider: config.provider,
      isConfigured: config.isConfigured,
      senderEmail: config.senderEmail,
      adminEmail: config.adminEmail,
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { targetEmail } = body;

    const emailToSend = targetEmail || process.env.ADMIN_NOTIFICATION_EMAIL || 'admin@luxeestate.vn';

    const testHtml = renderTestEmail(emailToSend);

    const result = await sendEmail({
      to: emailToSend,
      subject: `[LuxeEstate] Kiểm Tra Kết Nối Email — ${new Date().toLocaleTimeString('vi-VN')}`,
      html: testHtml,
    });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || 'Lỗi gửi email kiểm tra',
          provider: result.provider,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.simulated
        ? `Đã kích hoạt chế độ mô phỏng thành công (Xem log console máy chủ).`
        : `Email thử nghiệm đã được gửi thành công tới ${emailToSend}!`,
      provider: result.provider,
      simulated: result.simulated || false,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Lỗi xử lý gửi email test' },
      { status: 500 }
    );
  }
}
