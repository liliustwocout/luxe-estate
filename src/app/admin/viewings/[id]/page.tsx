'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ViewingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const [viewing, setViewing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Reschedule state
  const [showReschedule, setShowReschedule] = useState(false);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  const fetchViewing = async () => {
    try {
      const res = await fetch(`/api/admin/viewings/${id}`);
      const data = await res.json();
      if (data.viewing) {
        setViewing(data.viewing);
        setNewDate(data.viewing.date);
        setNewTime(data.viewing.time);
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

  const handleUpdateStatus = async (status: string) => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/viewings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setViewing((prev: any) => ({ ...prev, status }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const handleReschedule = async () => {
    if (!newDate || !newTime) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/viewings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reschedule', date: newDate, time: newTime }),
      });
      if (res.ok) {
        setViewing((prev: any) => ({ ...prev, date: newDate, time: newTime }));
        setShowReschedule(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-xs text-[#6B6B6B]">
        Đang tải thông tin lịch hẹn...
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
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Completed':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-8 max-w-4xl pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#E8E8E5] shadow-sm">
        <div>
          <Link
            href="/admin/viewings"
            className="text-xs text-[#6B6B6B] hover:text-[#111111] transition-colors mb-1 inline-block"
          >
            ← Danh sách lịch hẹn
          </Link>
          <div className="flex items-center gap-3">
            <h2 className="font-display text-2xl font-bold text-[#111111]">
              Yêu Cầu Xem Nhà #{viewing.id}
            </h2>
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(viewing.status)}`}>
              {viewing.status}
            </span>
          </div>
        </div>

        {/* Workflow Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {viewing.status === 'Pending' && (
            <>
              {(!viewing.date || !viewing.time) ? (
                <button
                  type="button"
                  onClick={() => setShowReschedule(true)}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-xl transition-all shadow-sm flex items-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Ấn Định Ngày Giờ & Xác Nhận</span>
                </button>
              ) : (
                <button
                  type="button"
                  disabled={updating}
                  onClick={() => handleUpdateStatus('Confirmed')}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-all shadow-sm flex items-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Xác Nhận (Confirm)</span>
                </button>
              )}
            </>
          )}

          {viewing.status === 'Confirmed' && (
            <button
              type="button"
              disabled={updating}
              onClick={() => handleUpdateStatus('Completed')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-all shadow-sm flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Đã Xem Xong (Mark Completed)</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setShowReschedule(!showReschedule)}
            className="px-3.5 py-2 bg-white hover:bg-[#F7F7F5] text-charcoal border border-[#E8E8E5] text-xs font-semibold rounded-xl transition-colors shadow-sm"
          >
            {viewing.date ? 'Đổi Lịch (Reschedule)' : 'Đặt Lịch Hẹn'}
          </button>

          {viewing.status !== 'Cancelled' && viewing.status !== 'Completed' && (
            <button
              type="button"
              disabled={updating}
              onClick={() => handleUpdateStatus('Cancelled')}
              className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold rounded-xl transition-colors"
            >
              Hủy Lịch (Cancel)
            </button>
          )}
        </div>
      </div>

      {/* Reschedule Drawer/Box */}
      {showReschedule && (
        <div className="bg-amber-50/70 border border-amber-200 rounded-3xl p-6 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
            Dời Lịch Hẹn Sang Thời Gian Mới
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-amber-950 mb-1">Ngày Mới (Date)</label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-amber-300 text-xs text-[#111111] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-amber-950 mb-1">Khung Giờ Mới (Time)</label>
              <input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-amber-300 text-xs text-[#111111] focus:outline-none"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowReschedule(false)}
              className="px-3 py-1.5 bg-white text-xs font-semibold rounded-lg border border-amber-300 text-amber-900"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleReschedule}
              disabled={updating}
              className="px-4 py-1.5 bg-amber-900 hover:bg-black text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Cập Nhật Lịch Hẹn
            </button>
          </div>
        </div>
      )}

      {/* Main Details Cards */}
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

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-[#6B6B6B] block mb-0.5">Họ & Tên:</span>
              <span className="font-semibold text-sm text-[#111111]">{viewing.customerName}</span>
            </div>

            <div>
              <span className="text-[#6B6B6B] block mb-0.5">Số điện thoại:</span>
              <a href={`tel:${viewing.customerPhone}`} className="font-semibold text-sm text-[#111111] hover:text-[#C9A96E] font-mono">
                {viewing.customerPhone}
              </a>
            </div>

            {viewing.customerEmail && (
              <div>
                <span className="text-[#6B6B6B] block mb-0.5">Email:</span>
                <a href={`mailto:${viewing.customerEmail}`} className="font-semibold text-xs text-[#111111] hover:text-[#C9A96E]">
                  {viewing.customerEmail}
                </a>
              </div>
            )}

            {viewing.notes && (
              <div className="pt-2 border-t border-[#E8E8E5]">
                <span className="text-[#6B6B6B] block mb-1">Ghi chú từ khách:</span>
                <p className="p-3 bg-[#F7F7F5] rounded-xl text-xs text-[#111111] leading-relaxed italic">
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
              Bất Động Sản (Property)
            </h3>
            <Link
              href={`/admin/properties/${viewing.propertyId}`}
              className="text-[11px] text-[#C9A96E] font-semibold hover:underline"
            >
              Chi tiết căn hộ →
            </Link>
          </div>

          {viewing.propertyImage && (
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-[#E8E8E5]">
              <Image src={viewing.propertyImage} alt={viewing.propertyTitle} fill className="object-cover" sizes="400px" />
            </div>
          )}

          <div className="space-y-2 text-xs">
            <h4 className="font-semibold text-sm text-[#111111]">
              {viewing.propertyTitle}
            </h4>
            <p className="text-[#6B6B6B]">
              {viewing.propertyLocation}
            </p>
            <div className="pt-2 border-t border-[#E8E8E5] flex items-center justify-between">
              <span className="text-[#6B6B6B]">Giá thuê tháng:</span>
              <span className="font-display font-bold text-sm text-[#111111]">
                ${viewing.propertyRent?.toLocaleString()} / mo
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Timeline & Workflow Summary */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E8E5] shadow-sm space-y-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111] border-b border-[#E8E8E5] pb-3">
          Thời Gian Lịch Hẹn & Quy Trình
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-[#F7F7F5] rounded-2xl border border-[#E8E8E5]">
            <span className="text-[10px] text-[#6B6B6B] uppercase font-semibold block mb-1">Ngày Hẹn Gặp</span>
            <span className="font-display font-bold text-base text-[#111111]">
              {viewing.date || 'Chờ liên hệ xếp lịch'}
            </span>
          </div>

          <div className="p-4 bg-[#F7F7F5] rounded-2xl border border-[#E8E8E5]">
            <span className="text-[10px] text-[#6B6B6B] uppercase font-semibold block mb-1">Khung Giờ Đón Tiếp</span>
            <span className="font-display font-bold text-base text-[#C9A96E]">
              {viewing.time || 'Chưa ấn định'}
            </span>
          </div>

          <div className="p-4 bg-[#F7F7F5] rounded-2xl border border-[#E8E8E5]">
            <span className="text-[10px] text-[#6B6B6B] uppercase font-semibold block mb-1">Thời Điểm Gửi Yêu Cầu</span>
            <span className="font-mono text-xs text-[#111111]">
              {new Date(viewing.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
