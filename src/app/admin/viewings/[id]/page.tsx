'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ViewingData {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertySlug: string;
  propertyLocation: string;
  propertyRent: number;
  propertyImage?: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  date?: string;
  time?: string;
  notes?: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
  updatedAt: string;
}

export default function ViewingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [viewing, setViewing] = useState<ViewingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Form states for scheduling
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('14:00');
  const [scheduleNotes, setScheduleNotes] = useState('');
  const [actionFeedback, setActionFeedback] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const fetchViewing = async () => {
    try {
      const res = await fetch(`/api/admin/viewings/${id}`);
      const data = await res.json();
      if (data.viewing) {
        setViewing(data.viewing);
        // Default to saved date or tomorrow
        const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];
        setScheduleDate(data.viewing.date || tomorrowStr);
        setScheduleTime(data.viewing.time || '14:00');
        setScheduleNotes(data.viewing.notes || '');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchViewing();
  }, [id]);

  // Handle scheduling and confirmation (Sends email with .ics file)
  const handleConfirmSchedule = async () => {
    if (!scheduleDate) {
      setActionFeedback({
        type: 'error',
        message: 'Vui lòng chọn ngày hẹn đón tiếp trước khi xác nhận.',
      });
      return;
    }
    if (!scheduleTime) {
      setActionFeedback({
        type: 'error',
        message: 'Vui lòng chọn khung giờ đón tiếp trước khi xác nhận.',
      });
      return;
    }

    setUpdating(true);
    setActionFeedback(null);

    try {
      const res = await fetch(`/api/admin/viewings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'Confirmed',
          date: scheduleDate,
          time: scheduleTime,
          notes: scheduleNotes,
        }),
      });

      const data = await res.json();
      if (res.ok && data.viewing) {
        setViewing(data.viewing);
        setActionFeedback({
          type: 'success',
          message: `Đã xác nhận lịch hẹn thành công vào ngày ${scheduleDate} lúc ${scheduleTime}! Hệ thống đã gửi email thư mời chính thức kèm file lịch (.ics) đến hộp thư: ${data.viewing.customerEmail || 'khách hàng'}.`,
        });
      } else {
        setActionFeedback({
          type: 'error',
          message: data.error || 'Có lỗi xảy ra khi xác nhận lịch hẹn.',
        });
      }
    } catch (err: any) {
      setActionFeedback({
        type: 'error',
        message: err.message || 'Lỗi kết nối máy chủ khi cập nhật.',
      });
    } finally {
      setUpdating(false);
    }
  };

  // Status updates like Completed or Cancelled
  const handleUpdateStatus = async (status: string) => {
    setUpdating(true);
    setActionFeedback(null);

    try {
      const res = await fetch(`/api/admin/viewings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          date: scheduleDate,
          time: scheduleTime,
          notes: scheduleNotes,
        }),
      });

      const data = await res.json();
      if (res.ok && data.viewing) {
        setViewing(data.viewing);
        setActionFeedback({
          type: 'success',
          message:
            status === 'Completed'
              ? 'Đã đánh dấu buổi xem nhà hoàn thành thành công.'
              : status === 'Cancelled'
              ? 'Đã hủy lịch hẹn và gửi email thông báo hủy cho khách hàng.'
              : `Đã cập nhật trạng thái: ${status}`,
        });
      } else {
        setActionFeedback({
          type: 'error',
          message: data.error || 'Có lỗi xảy ra khi cập nhật trạng thái.',
        });
      }
    } catch (err: any) {
      setActionFeedback({
        type: 'error',
        message: err.message || 'Lỗi kết nối máy chủ.',
      });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-xs text-[#6B6B6B]">
        Đang tải thông tin lịch hẹn #{id}...
      </div>
    );
  }

  if (!viewing) {
    return (
      <div className="py-20 text-center space-y-4">
        <p className="text-sm font-semibold text-[#111111]">Không tìm thấy lịch hẹn này.</p>
        <Link href="/admin/viewings" className="text-xs text-[#C9A96E] hover:underline">
          ← Quay lại danh sách lịch hẹn
        </Link>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Pending':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Completed':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  // Date and Time Helpers
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];
  const tomorrowStr = new Date(now.getTime() + 86400000).toISOString().split('T')[0];
  const dayAfterStr = new Date(now.getTime() + 172800000).toISOString().split('T')[0];
  const in3DaysStr = new Date(now.getTime() + 259200000).toISOString().split('T')[0];

  const quickDates = [
    { label: 'Hôm nay', value: todayStr },
    { label: 'Ngày mai', value: tomorrowStr },
    { label: 'Ngày kia', value: dayAfterStr },
    { label: '3 ngày tới', value: in3DaysStr },
  ];

  const quickTimes = [
    { label: '09:00', period: 'Sáng' },
    { label: '10:30', period: 'Trưa' },
    { label: '14:00', period: 'Đầu chiều' },
    { label: '15:30', period: 'Giữa chiều' },
    { label: '17:00', period: 'Cuối chiều' },
    { label: '18:30', period: 'Tối' },
  ];

  const cleanPhone = (viewing.customerPhone || '').replace(/[^0-9]/g, '');

  return (
    <div className="space-y-8 max-w-4xl pb-20">
      {/* Top Navigation & Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#E8E8E5] shadow-sm">
        <div>
          <Link
            href="/admin/viewings"
            className="text-xs text-[#6B6B6B] hover:text-[#111111] transition-colors mb-1.5 inline-flex items-center gap-1.5"
          >
            <span>←</span> Quay lại danh sách lịch hẹn
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-display text-2xl font-bold text-[#111111]">
              Yêu Cầu Xem Nhà #{viewing.id}
            </h2>
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(viewing.status)}`}>
              {viewing.status === 'Pending' && 'Chờ Duyệt & Xếp Lịch'}
              {viewing.status === 'Confirmed' && 'Đã Xác Nhận'}
              {viewing.status === 'Completed' && 'Đã Xem Xong'}
              {viewing.status === 'Cancelled' && 'Đã Hủy'}
            </span>
          </div>
        </div>

        {/* Quick Contact Bar for Admin */}
        <div className="flex flex-wrap items-center gap-2">
          {cleanPhone && (
            <a
              href={`https://zalo.me/${cleanPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 bg-[#0068FF] hover:bg-[#0054cc] text-white text-xs font-semibold rounded-xl transition-all shadow-sm inline-flex items-center gap-1.5"
              title="Nhắn tin Zalo trực tiếp với khách"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.08L2 22l5.08-1.34C8.54 21.52 10.23 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
              </svg>
              <span>Nhắn Zalo</span>
            </a>
          )}

          <a
            href={`tel:${viewing.customerPhone}`}
            className="px-3.5 py-2 bg-white hover:bg-[#F7F7F5] text-[#111111] border border-[#E8E8E5] text-xs font-semibold rounded-xl transition-colors shadow-sm inline-flex items-center gap-1.5"
          >
            <span>📞</span> Gọi Điện
          </a>

          {viewing.status === 'Confirmed' && (
            <button
              type="button"
              disabled={updating}
              onClick={() => handleUpdateStatus('Completed')}
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-all shadow-sm inline-flex items-center gap-1.5"
            >
              <span>✓</span> Đã Xem Xong
            </button>
          )}

          {viewing.status !== 'Cancelled' && viewing.status !== 'Completed' && (
            <button
              type="button"
              disabled={updating}
              onClick={() => {
                if (confirm('Bạn có chắc chắn muốn hủy lịch hẹn này không? Khách hàng sẽ nhận được email thông báo hủy.')) {
                  handleUpdateStatus('Cancelled');
                }
              }}
              className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold rounded-xl transition-colors"
            >
              Hủy Lịch
            </button>
          )}

          {viewing.status === 'Cancelled' && (
            <button
              type="button"
              disabled={updating}
              onClick={() => handleUpdateStatus('Pending')}
              className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-semibold rounded-xl transition-colors"
            >
              Khôi Phục Lịch Hẹn
            </button>
          )}
        </div>
      </div>

      {/* Action Feedback Banner (Success / Error) */}
      {actionFeedback && (
        <div
          className={`p-4 rounded-2xl border text-xs leading-relaxed flex items-start gap-3 shadow-sm transition-all ${
            actionFeedback.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}
        >
          <span className="text-base font-bold shrink-0">
            {actionFeedback.type === 'success' ? '✓' : '⚠️'}
          </span>
          <div className="flex-1">
            <span className="font-semibold block mb-0.5">
              {actionFeedback.type === 'success' ? 'Cập Nhật Thành Công:' : 'Không Thể Cập Nhật:'}
            </span>
            <p>{actionFeedback.message}</p>
          </div>
          <button
            type="button"
            onClick={() => setActionFeedback(null)}
            className="text-xs opacity-60 hover:opacity-100 font-bold shrink-0 ml-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* CORE FEATURE: Interactive Appointment Scheduling & Confirmation Card */}
      <div className="bg-white rounded-3xl border border-[#E8E8E5] shadow-sm overflow-hidden">
        {/* Header of Scheduling Card */}
        <div className="p-6 sm:p-7 border-b border-[#E8E8E5] bg-gradient-to-r from-amber-50/50 via-white to-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100/70 border border-amber-200/80 flex items-center justify-center text-amber-800 text-lg">
              📅
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-[#111111]">
                Thiết Lập Ngày Giờ Đón Tiếp & Gửi Thư Mời Cho Khách
              </h3>
              <p className="text-xs text-[#6B6B6B] mt-0.5">
                Chỉnh sửa ngày giờ sau khi đã trao đổi với khách, sau đó ấn xác nhận để gửi email
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F7F7F5] text-[#111111] border border-[#E8E8E5]">
              <span className="w-2 h-2 rounded-full bg-[#C9A96E]" />
              {viewing.date ? `Lịch hiện tại: ${viewing.date} lúc ${viewing.time}` : 'Chưa chốt thời gian'}
            </span>
          </div>
        </div>

        {/* Content of Scheduling Card */}
        <div className="p-6 sm:p-7 space-y-6">
          {/* Step-by-step guidance banner */}
          <div className="bg-[#FAF8F5] border border-[#EADBCE] rounded-2xl p-4 flex items-start gap-3 text-xs text-[#705638] leading-relaxed">
            <span className="text-lg shrink-0">💬</span>
            <div className="space-y-1">
              <span className="font-bold text-[#4A3820] block">
                Quy trình chốt lịch thượng lưu:
              </span>
              <p>
                1. Chủ động nhắn Zalo (<strong>{viewing.customerPhone}</strong>) hoặc gọi điện với khách để thống nhất ngày & giờ thuận tiện nhất.
              </p>
              <p>
                2. Chọn ngày và giờ đã thỏa thuận ở form bên dưới.
              </p>
              <p>
                3. Bấm <strong>&ldquo;Xác Nhận Lịch Hẹn & Gửi Email Cho Khách&rdquo;</strong>. Hệ thống sẽ tự động gửi thư mời trang trọng kèm file lịch <strong>.ics</strong> vào email khách để khách lưu vào điện thoại/Google Calendar.
              </p>
            </div>
          </div>

          {/* Date & Time Picker Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* 1. Date Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#111111] uppercase tracking-wider">
                  1. Ngày Hẹn Gặp (Date) <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] text-[#6B6B6B]">Định dạng: YYYY-MM-DD</span>
              </div>

              <input
                type="date"
                value={scheduleDate}
                min={todayStr}
                onChange={(e) => setScheduleDate(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-white border border-[#D4D4D0] focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/20 text-sm font-semibold text-[#111111] transition-all outline-none"
              />

              {/* Quick Date Chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] text-[#6B6B6B] mr-1">Chọn nhanh:</span>
                {quickDates.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setScheduleDate(item.value)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors border ${
                      scheduleDate === item.value
                        ? 'bg-[#111111] text-white border-[#111111]'
                        : 'bg-[#F7F7F5] hover:bg-[#E8E8E5] text-[#111111] border-[#E8E8E5]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Time Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#111111] uppercase tracking-wider">
                  2. Khung Giờ Đón Tiếp (Time) <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] text-[#6B6B6B]">Định dạng: 24 Giờ</span>
              </div>

              <input
                type="time"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-white border border-[#D4D4D0] focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/20 text-sm font-semibold text-[#111111] transition-all outline-none font-mono"
              />

              {/* Quick Time Chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] text-[#6B6B6B] mr-1">Khung giờ:</span>
                {quickTimes.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setScheduleTime(item.label)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors border ${
                      scheduleTime === item.label
                        ? 'bg-[#111111] text-white border-[#111111]'
                        : 'bg-[#F7F7F5] hover:bg-[#E8E8E5] text-[#111111] border-[#E8E8E5]'
                    }`}
                  >
                    {item.label} <span className="opacity-60 text-[9px]">({item.period})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Internal Concierge Notes */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#111111] uppercase tracking-wider">
                3. Ghi Chú Đón Tiếp / Nội Bộ (Internal Concierge Note)
              </label>
              <span className="text-[11px] text-[#6B6B6B]">Không bắt buộc</span>
            </div>
            <textarea
              rows={2}
              value={scheduleNotes}
              onChange={(e) => setScheduleNotes(e.target.value)}
              placeholder="Ví dụ: Đã chốt qua Zalo, khách đi 2 người, hẹn đón tại sảnh B tháp Landmark..."
              className="w-full px-4 py-2.5 rounded-2xl bg-[#F7F7F5] border border-[#E8E8E5] focus:border-[#C9A96E] focus:bg-white text-xs text-[#111111] transition-all outline-none resize-none"
            />
          </div>

          {/* Email Preview & Confirmation Trigger */}
          <div className="pt-4 border-t border-[#E8E8E5] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FBFBFA] p-5 rounded-2xl border">
            <div className="text-xs space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#111111]">Thư mời sẽ được gửi tới:</span>
                <span className="font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {viewing.customerEmail || 'Chưa có email khách hàng'}
                </span>
              </div>
              <p className="text-[11px] text-[#6B6B6B]">
                Nội dung bao gồm: Thông tin căn hộ, địa chỉ chính xác, thời gian hẹn (<strong>{scheduleDate}</strong> lúc <strong>{scheduleTime}</strong>) và đính kèm file <strong>.ics</strong>.
              </p>
            </div>

            <button
              type="button"
              disabled={updating}
              onClick={handleConfirmSchedule}
              className={`px-6 py-3.5 rounded-2xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 shrink-0 ${
                viewing.status === 'Pending'
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                  : 'bg-[#111111] hover:bg-[#C9A96E] hover:text-black text-white shadow-black/10'
              }`}
            >
              {updating ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  <span>Đang gửi email & lưu lịch...</span>
                </>
              ) : viewing.status === 'Pending' ? (
                <>
                  <span className="text-sm">🛎️</span>
                  <span>Xác Nhận Lịch Hẹn & Gửi Email Cho Khách</span>
                </>
              ) : (
                <>
                  <span className="text-sm">🔄</span>
                  <span>Cập Nhật Ngày Giờ & Gửi Lại Email</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Details Cards (Customer & Property) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Information Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E8E5] shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
              Khách Hàng (Customer)
            </h3>
            <Link
              href={`/admin/customers/${viewing.customerId}`}
              className="text-[11px] text-[#C9A96E] font-semibold hover:underline"
            >
              Xem hồ sơ khách →
            </Link>
          </div>

          <div className="space-y-3.5 text-xs">
            <div>
              <span className="text-[#6B6B6B] block mb-0.5">Họ & Tên khách:</span>
              <span className="font-semibold text-sm text-[#111111]">{viewing.customerName}</span>
            </div>

            <div>
              <span className="text-[#6B6B6B] block mb-0.5">Số điện thoại liên hệ:</span>
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${viewing.customerPhone}`}
                  className="font-semibold text-sm text-[#111111] hover:text-[#C9A96E] font-mono"
                >
                  {viewing.customerPhone}
                </a>
                {cleanPhone && (
                  <a
                    href={`https://zalo.me/${cleanPhone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-semibold text-[#0068FF] bg-blue-50 px-2 py-0.5 rounded border border-blue-200 hover:bg-blue-100"
                  >
                    Mở Zalo
                  </a>
                )}
              </div>
            </div>

            <div>
              <span className="text-[#6B6B6B] block mb-0.5">Hộp thư Email:</span>
              {viewing.customerEmail ? (
                <a
                  href={`mailto:${viewing.customerEmail}`}
                  className="font-semibold text-xs text-[#111111] hover:text-[#C9A96E]"
                >
                  {viewing.customerEmail}
                </a>
              ) : (
                <span className="text-amber-700 italic">Khách chưa để lại email</span>
              )}
            </div>

            {viewing.notes && (
              <div className="pt-2 border-t border-[#E8E8E5]">
                <span className="text-[#6B6B6B] block mb-1">Lời nhắn khi đặt hẹn trên web:</span>
                <p className="p-3 bg-[#F7F7F5] rounded-xl text-xs text-[#111111] leading-relaxed italic border border-[#E8E8E5]">
                  &ldquo;{viewing.notes}&rdquo;
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Property Information Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E8E5] shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
              Bất Động Sản Quan Tâm
            </h3>
            <div className="flex items-center gap-2">
              <Link
                href={`/properties/${viewing.propertySlug || viewing.propertyId}`}
                target="_blank"
                className="text-[11px] text-[#6B6B6B] hover:text-[#111111]"
              >
                Xem web ↗
              </Link>
              <Link
                href={`/admin/properties/${viewing.propertyId}`}
                className="text-[11px] text-[#C9A96E] font-semibold hover:underline"
              >
                Quản lý căn hộ →
              </Link>
            </div>
          </div>

          {viewing.propertyImage && (
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-[#E8E8E5]">
              <Image
                src={viewing.propertyImage}
                alt={viewing.propertyTitle}
                fill
                className="object-cover"
                sizes="400px"
              />
            </div>
          )}

          <div className="space-y-2 text-xs">
            <h4 className="font-semibold text-sm text-[#111111]">
              {viewing.propertyTitle}
            </h4>
            <p className="text-[#6B6B6B]">
              📍 {viewing.propertyLocation}
            </p>
            <div className="pt-2 border-t border-[#E8E8E5] flex items-center justify-between">
              <span className="text-[#6B6B6B]">Giá thuê niêm yết:</span>
              <span className="font-display font-bold text-sm text-[#111111]">
                ${viewing.propertyRent?.toLocaleString()} / tháng
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Timeline Summary Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E8E5] shadow-sm space-y-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111] border-b border-[#E8E8E5] pb-3">
          Thông Tin Cuộc Hẹn Đã Lưu Trong Hệ Thống
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-[#F7F7F5] rounded-2xl border border-[#E8E8E5]">
            <span className="text-[10px] text-[#6B6B6B] uppercase font-semibold block mb-1">
              Ngày Hẹn Gặp
            </span>
            <span className="font-display font-bold text-base text-[#111111]">
              {viewing.date || 'Chưa chốt ngày'}
            </span>
          </div>

          <div className="p-4 bg-[#F7F7F5] rounded-2xl border border-[#E8E8E5]">
            <span className="text-[10px] text-[#6B6B6B] uppercase font-semibold block mb-1">
              Khung Giờ Đón Tiếp
            </span>
            <span className="font-display font-bold text-base text-[#C9A96E]">
              {viewing.time || 'Chưa chốt giờ'}
            </span>
          </div>

          <div className="p-4 bg-[#F7F7F5] rounded-2xl border border-[#E8E8E5]">
            <span className="text-[10px] text-[#6B6B6B] uppercase font-semibold block mb-1">
              Thời Điểm Đặt Lịch
            </span>
            <span className="font-mono text-xs text-[#111111]">
              {new Date(viewing.createdAt).toLocaleString('vi-VN')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
