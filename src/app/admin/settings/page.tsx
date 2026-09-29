'use client';

import { useState } from 'react';

export default function AdminSettingsPage() {
  const [name, setName] = useState('Alexander Wright');
  const [email, setEmail] = useState('admin@luxeestate.vn');
  const [phone, setPhone] = useState('(+84) 28 8888 9999');

  const [notifNewBooking, setNotifNewBooking] = useState(true);
  const [notifConfirmed, setNotifConfirmed] = useState(true);
  const [notifCancelled, setNotifCancelled] = useState(true);

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-3xl pb-16">
      {/* Header */}
      <div>
        <h2 className="font-display text-2xl font-bold text-[#111111]">
          Cài Đặt Hệ Thống (Settings)
        </h2>
        <p className="text-xs text-[#6B6B6B] mt-0.5">
          Quản lý thông tin quản trị viên và cấu hình thông báo lịch hẹn
        </p>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-2xl flex items-center gap-2">
          <svg className="w-4 h-4 text-emerald-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Đã lưu cấu hình cài đặt thành công!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Admin Profile */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E8E5] shadow-sm space-y-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111] border-b border-[#E8E8E5] pb-3">
            1. Hồ Sơ Quản Trị Viên (Admin Profile)
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#111111] mb-1.5 uppercase tracking-wider">
                Họ và Tên (Full Name)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F7F5] border border-[#E8E8E5] text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#111111] mb-1.5 uppercase tracking-wider">
                Email Quản Trị (Admin Email)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F7F5] border border-[#E8E8E5] text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#111111] mb-1.5 uppercase tracking-wider">
                Số Điện Thoại Trực Hotline (Hotline Phone)
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F7F5] border border-[#E8E8E5] text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E8E5] shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111] border-b border-[#E8E8E5] pb-3">
            2. Cấu Hình Thông Báo (Notification Settings)
          </h3>

          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#F7F7F5] hover:bg-[#E8E8E5] cursor-pointer transition-colors border border-[#E8E8E5]">
              <input
                type="checkbox"
                checked={notifNewBooking}
                onChange={(e) => setNotifNewBooking(e.target.checked)}
                className="w-4 h-4 rounded text-[#111111] focus:ring-0 cursor-pointer"
              />
              <div>
                <span className="text-xs font-semibold text-[#111111] block">
                  New viewing request
                </span>
                <span className="text-[11px] text-[#6B6B6B]">
                  Nhận chuông và email ngay khi có khách hàng đặt lịch xem nhà từ website.
                </span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#F7F7F5] hover:bg-[#E8E8E5] cursor-pointer transition-colors border border-[#E8E8E5]">
              <input
                type="checkbox"
                checked={notifConfirmed}
                onChange={(e) => setNotifConfirmed(e.target.checked)}
                className="w-4 h-4 rounded text-[#111111] focus:ring-0 cursor-pointer"
              />
              <div>
                <span className="text-xs font-semibold text-[#111111] block">
                  Viewing confirmed
                </span>
                <span className="text-[11px] text-[#6B6B6B]">
                  Gửi thông báo nhắc nhở 2 giờ trước giờ hẹn tham quan thực tế.
                </span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#F7F7F5] hover:bg-[#E8E8E5] cursor-pointer transition-colors border border-[#E8E8E5]">
              <input
                type="checkbox"
                checked={notifCancelled}
                onChange={(e) => setNotifCancelled(e.target.checked)}
                className="w-4 h-4 rounded text-[#111111] focus:ring-0 cursor-pointer"
              />
              <div>
                <span className="text-xs font-semibold text-[#111111] block">
                  Viewing cancelled
                </span>
                <span className="text-[11px] text-[#6B6B6B]">
                  Thông báo cho chuyên viên quản lý khi có lịch hẹn bị hủy.
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#111111] hover:bg-black text-white text-xs font-semibold rounded-xl transition-all shadow-md"
          >
            Lưu Cài Đặt (Save Settings)
          </button>
        </div>
      </form>
    </div>
  );
}
