'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminDashboardPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [viewings, setViewings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [propsRes, viewsRes] = await Promise.all([
          fetch('/api/admin/properties'),
          fetch('/api/admin/viewings'),
        ]);
        const propsData = await propsRes.json();
        const viewsData = await viewsRes.json();

        setProperties(propsData.properties || []);
        setViewings(viewsData.viewings || []);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Compute Statistics
  const totalProps = properties.length;
  const availableProps = properties.filter((p) => p.status === 'Available').length;
  const totalViewings = viewings.length;
  const pendingViewings = viewings.filter((v) => v.status === 'Pending').length;
  const confirmedViewings = viewings.filter((v) => v.status === 'Confirmed').length;

  const recentViewings = viewings.slice(0, 6);

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
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E8E5] shadow-sm">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A96E] block mb-1">
            Tổng Quan Điều Hành
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#111111]">
            Chào mừng trở lại, Alexander!
          </h2>
          <p className="text-sm text-[#6B6B6B] mt-1">
            Hôm nay có <strong className="text-[#111111]">{pendingViewings} yêu cầu xem nhà đang chờ xác nhận</strong> và {confirmedViewings} lịch hẹn đã lên lịch.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/properties/new"
            className="px-4 py-2.5 bg-[#111111] hover:bg-black text-white text-xs font-semibold rounded-xl transition-all shadow-sm flex items-center gap-2"
          >
            <svg className="w-4 h-4 text-[#C9A96E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span>+ Thêm Bất Động Sản</span>
          </Link>
          <Link
            href="/admin/viewings/calendar"
            className="px-4 py-2.5 bg-[#F7F7F5] hover:bg-[#E8E8E5] text-[#111111] text-xs font-semibold rounded-xl transition-colors border border-[#E8E8E5] flex items-center gap-2"
          >
            <svg className="w-4 h-4 text-[#6B6B6B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6.75 3v2.25M17.25 3v2.253M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            <span>Xem Lịch Hẹn</span>
          </Link>
        </div>
      </div>

      {/* 4 Main KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Properties */}
        <div className="bg-white p-6 rounded-2xl border border-[#E8E8E5] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">
              Total Properties
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#F7F7F5] flex items-center justify-center text-[#111111]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-display text-3xl sm:text-4xl font-bold text-[#111111]">
              {loading ? '...' : totalProps}
            </span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              Danh mục VIP
            </span>
          </div>
        </div>

        {/* Card 2: Available */}
        <div className="bg-white p-6 rounded-2xl border border-[#E8E8E5] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">
              Available Now
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-display text-3xl sm:text-4xl font-bold text-emerald-700">
              {loading ? '...' : availableProps}
            </span>
            <span className="text-xs text-[#6B6B6B]">
              sẵn sàng cho thuê
            </span>
          </div>
        </div>

        {/* Card 3: Viewing Requests */}
        <div className="bg-white p-6 rounded-2xl border border-[#E8E8E5] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">
              Viewing Requests
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#F7F7F5] flex items-center justify-center text-[#111111]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-display text-3xl sm:text-4xl font-bold text-[#111111]">
              {loading ? '...' : totalViewings}
            </span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
              +18% tháng này
            </span>
          </div>
        </div>

        {/* Card 4: Pending */}
        <div className="bg-white p-6 rounded-2xl border border-[#E8E8E5] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">
              Pending Approval
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-display text-3xl sm:text-4xl font-bold text-amber-600">
              {loading ? '...' : pendingViewings}
            </span>
            <Link
              href="/admin/viewings?status=pending"
              className="text-xs font-semibold text-amber-800 hover:underline"
            >
              Duyệt ngay →
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Viewing Requests Table */}
      <div className="bg-white rounded-3xl border border-[#E8E8E5] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#E8E8E5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-lg font-semibold text-[#111111]">
              Yêu Cầu Xem Nhà Gần Đây (Recent Viewings)
            </h3>
            <p className="text-xs text-[#6B6B6B] mt-0.5">
              Danh sách khách hàng đăng ký đi xem thực tế căn hộ
            </p>
          </div>
          <Link
            href="/admin/viewings"
            className="text-xs font-semibold text-charcoal hover:text-[#C9A96E] transition-colors flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Xem tất cả ({totalViewings})</span>
            <span>→</span>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F7F5] border-b border-[#E8E8E5] uppercase text-[10px] tracking-wider text-[#6B6B6B] font-semibold">
              <tr>
                <th className="py-3 px-6">Khách Hàng (Customer)</th>
                <th className="py-3 px-6">Bất Động Sản (Property)</th>
                <th className="py-3 px-6">Ngày & Giờ (Appointment)</th>
                <th className="py-3 px-6">Trạng Thái (Status)</th>
                <th className="py-3 px-6 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E5]">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-[#6B6B6B]">
                    Đang tải dữ liệu lịch hẹn...
                  </td>
                </tr>
              ) : recentViewings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-[#6B6B6B]">
                    Chưa có lịch hẹn xem nhà nào.
                  </td>
                </tr>
              ) : (
                recentViewings.map((v) => (
                  <tr key={v.id} className="hover:bg-[#F7F7F5]/80 transition-colors">
                    <td className="py-4 px-6 font-medium text-[#111111]">
                      <div className="font-semibold text-sm">{v.customerName}</div>
                      <div className="text-[11px] text-[#6B6B6B]">{v.customerPhone}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-[#111111] line-clamp-1">{v.propertyTitle}</div>
                      <div className="text-[11px] text-[#6B6B6B]">{v.propertyLocation}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-[#111111]">
                        {v.date}
                      </div>
                      <div className="text-[11px] text-[#C9A96E] font-semibold">{v.time}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${getStatusBadge(v.status)}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {v.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link
                        href={`/admin/viewings/${v.id}`}
                        className="px-3 py-1.5 rounded-lg bg-[#F7F7F5] hover:bg-[#111111] hover:text-white text-[#111111] font-semibold transition-colors border border-[#E8E8E5]"
                      >
                        Chi Tiết
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
