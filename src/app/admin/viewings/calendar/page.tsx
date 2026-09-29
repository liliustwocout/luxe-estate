'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminViewingCalendarPage() {
  const [viewings, setViewings] = useState<any[]>([]);
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(8); // 8 is September (0-indexed)
  const [selectedDateStr, setSelectedDateStr] = useState('2026-09-29');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadViewings() {
      try {
        const res = await fetch('/api/admin/viewings');
        const data = await res.json();
        setViewings(data.viewings || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadViewings();
  }, []);

  // Calendar math
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay(); // 0 is Sunday
  // Shift so Monday is index 0
  const startOffset = (firstDayOfWeek + 6) % 7;

  const monthNames = [
    'Tháng 1 (January)',
    'Tháng 2 (February)',
    'Tháng 3 (March)',
    'Tháng 4 (April)',
    'Tháng 5 (May)',
    'Tháng 6 (June)',
    'Tháng 7 (July)',
    'Tháng 8 (August)',
    'Tháng 9 (September)',
    'Tháng 10 (October)',
    'Tháng 11 (November)',
    'Tháng 12 (December)',
  ];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const getViewingsForDate = (dateStr: string) => {
    return viewings.filter((v) => v.date === dateStr);
  };

  const selectedDayViewings = getViewingsForDate(selectedDateStr);

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-[#111111]">
            Lịch Hẹn Xem Nhà (Calendar Schedule)
          </h2>
          <p className="text-xs text-[#6B6B6B] mt-0.5">
            Theo dõi phân bổ lịch hẹn theo ngày trong tháng và điều phối chuyên viên
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/viewings"
            className="px-4 py-2 bg-white hover:bg-[#F7F7F5] text-charcoal border border-[#E8E8E5] text-xs font-semibold rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
          >
            <svg className="w-4 h-4 text-[#6B6B6B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <span>Dạng Bảng (List View)</span>
          </Link>
        </div>
      </div>

      {/* Main Grid: Calendar on Left (8 cols), Selected Day Schedule on Right (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Month Calendar Grid (8 cols) */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E8E5] shadow-sm space-y-6">
          {/* Calendar Header Controls */}
          <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-4">
            <h3 className="font-display text-xl font-bold text-[#111111]">
              {monthNames[currentMonth]} {currentYear}
            </h3>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="w-9 h-9 rounded-xl border border-[#E8E8E5] hover:bg-[#F7F7F5] flex items-center justify-center text-charcoal transition-colors"
                aria-label="Previous month"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                className="w-9 h-9 rounded-xl border border-[#E8E8E5] hover:bg-[#F7F7F5] flex items-center justify-center text-charcoal transition-colors"
                aria-label="Next month"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">
            <span>T2 (Mon)</span>
            <span>T3 (Tue)</span>
            <span>T4 (Wed)</span>
            <span>T5 (Thu)</span>
            <span>T6 (Fri)</span>
            <span className="text-[#C9A96E]">T7 (Sat)</span>
            <span className="text-[#C9A96E]">CN (Sun)</span>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Blank offset days */}
            {Array.from({ length: startOffset }).map((_, idx) => (
              <div key={`offset-${idx}`} className="h-20 sm:h-24 rounded-2xl bg-[#F7F7F5]/50 border border-transparent" />
            ))}

            {/* Days in month */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const dayNum = idx + 1;
              const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
              const dayViewings = getViewingsForDate(dateStr);
              const isSelected = selectedDateStr === dateStr;
              const hasEvents = dayViewings.length > 0;

              return (
                <button
                  key={dateStr}
                  type="button"
                  onClick={() => setSelectedDateStr(dateStr)}
                  className={`h-20 sm:h-24 p-2 rounded-2xl border text-left flex flex-col justify-between transition-all select-none ${
                    isSelected
                      ? 'border-[#111111] bg-[#111111] text-white shadow-md ring-2 ring-[#C9A96E]/40'
                      : hasEvents
                      ? 'border-amber-200 bg-amber-50/40 text-[#111111] hover:border-amber-400'
                      : 'border-[#E8E8E5] bg-[#F7F7F5]/40 text-[#111111] hover:bg-[#F7F7F5]'
                  }`}
                >
                  <span className={`text-xs font-bold ${isSelected ? 'text-[#C9A96E]' : ''}`}>
                    {dayNum}
                  </span>

                  {hasEvents && (
                    <div className="space-y-1">
                      <span
                        className={`inline-block px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                          isSelected
                            ? 'bg-[#C9A96E] text-black'
                            : 'bg-amber-200/80 text-amber-900'
                        }`}
                      >
                        {dayViewings.length} lịch hẹn
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Day Schedule Sidebar (4 cols) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-[#E8E8E5] shadow-sm space-y-5">
          <div className="border-b border-[#E8E8E5] pb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A96E] block mb-1">
              Chi Tiết Lịch Hẹn Trong Ngày
            </span>
            <h3 className="font-display text-lg font-bold text-[#111111]">
              {selectedDateStr}
            </h3>
            <p className="text-xs text-[#6B6B6B] mt-0.5">
              {selectedDayViewings.length} cuộc hẹn xem nhà đã xếp lịch
            </p>
          </div>

          {selectedDayViewings.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#6B6B6B] space-y-2">
              <svg className="w-8 h-8 text-muted mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 3v2.25M17.25 3v2.253M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              <p>Không có lịch hẹn nào trong ngày này.</p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {selectedDayViewings.map((v) => (
                <div
                  key={v.id}
                  className="p-4 rounded-2xl bg-[#F7F7F5] border border-[#E8E8E5] space-y-2.5 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-sm text-[#C9A96E]">
                      ⏰ {v.time}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(v.status)}`}>
                      {v.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-semibold text-xs text-[#111111]">{v.customerName}</h4>
                    <a href={`tel:${v.customerPhone}`} className="text-[11px] text-[#6B6B6B] font-mono hover:text-[#111111]">
                      {v.customerPhone}
                    </a>
                  </div>

                  <div className="text-[11px] text-slate line-clamp-1 border-t border-[#E8E8E5] pt-2">
                    🏠 {v.propertyTitle}
                  </div>

                  <Link
                    href={`/admin/viewings/${v.id}`}
                    className="block text-center py-1.5 px-3 bg-white hover:bg-[#111111] hover:text-white text-[#111111] rounded-lg text-xs font-semibold border border-[#E8E8E5] transition-colors"
                  >
                    Xem Chi Tiết Lịch Hẹn →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
