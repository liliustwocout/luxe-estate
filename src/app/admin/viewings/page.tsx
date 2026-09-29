'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminViewingsPage() {
  const [viewings, setViewings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all');
  const [search, setSearch] = useState('');

  const fetchViewings = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeTab !== 'all') params.set('status', activeTab);
      if (search) params.set('search', search);

      const res = await fetch(`/api/admin/viewings?${params.toString()}`);
      const data = await res.json();
      setViewings(data.viewings || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchViewings, 200);
    return () => clearTimeout(timer);
  }, [activeTab, search]);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/viewings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setViewings((prev) =>
          prev.map((v) => (v.id === id ? { ...v, status: newStatus } : v))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

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

  // Tab counts
  const countAll = viewings.length;
  const countPending = viewings.filter((v) => v.status === 'Pending').length;
  const countConfirmed = viewings.filter((v) => v.status === 'Confirmed').length;
  const countCompleted = viewings.filter((v) => v.status === 'Completed').length;
  const countCancelled = viewings.filter((v) => v.status === 'Cancelled').length;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-[#111111]">
            Quản Lý Lịch Xem Nhà (Viewing Requests)
          </h2>
          <p className="text-xs text-[#6B6B6B] mt-0.5">
            Duyệt lịch hẹn, điều phối chuyên viên đưa đón và quản lý trạng thái khách tham quan
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/viewings/calendar"
            className="px-4 py-2 bg-white hover:bg-[#F7F7F5] text-charcoal border border-[#E8E8E5] text-xs font-semibold rounded-xl transition-colors shadow-sm flex items-center gap-2"
          >
            <svg className="w-4 h-4 text-[#C9A96E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6.75 3v2.25M17.25 3v2.253M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            <span>Lịch Tháng (Calendar View)</span>
          </Link>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="bg-white p-4 rounded-3xl border border-[#E8E8E5] shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {[
              { id: 'all', label: 'Tất Cả (All)' },
              { id: 'pending', label: 'Chờ Duyệt (Pending)' },
              { id: 'confirmed', label: 'Đã Xác Nhận (Confirmed)' },
              { id: 'completed', label: 'Đã Xem Xong (Completed)' },
              { id: 'cancelled', label: 'Đã Hủy (Cancelled)' },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#111111] text-white shadow-sm'
                      : 'text-[#6B6B6B] hover:bg-[#F7F7F5] hover:text-[#111111]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm theo tên khách, SĐT, BĐS..."
              className="w-full pl-9 pr-4 py-2 bg-[#F7F7F5] border border-[#E8E8E5] rounded-xl text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
            />
            <svg className="w-4 h-4 text-[#6B6B6B] absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Viewings Table */}
      <div className="bg-white rounded-3xl border border-[#E8E8E5] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F7F5] border-b border-[#E8E8E5] uppercase text-[10px] tracking-wider text-[#6B6B6B] font-semibold">
              <tr>
                <th className="py-3 px-6">Mã Lịch Hẹn</th>
                <th className="py-3 px-6">Khách Hàng (Customer)</th>
                <th className="py-3 px-6">Bất Động Sản (Property)</th>
                <th className="py-3 px-6">Lịch Hẹn (Schedule)</th>
                <th className="py-3 px-6">Trạng Thái (Status)</th>
                <th className="py-3 px-6 text-right">Hành Động Nhanh</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E5]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#6B6B6B]">
                    Đang tải danh sách lịch hẹn...
                  </td>
                </tr>
              ) : viewings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#6B6B6B]">
                    Không có lịch hẹn nào phù hợp bộ lọc.
                  </td>
                </tr>
              ) : (
                viewings.map((v) => (
                  <tr key={v.id} className="hover:bg-[#F7F7F5]/80 transition-colors">
                    <td className="py-4 px-6 font-mono text-[11px] text-muted">
                      #{v.id}
                    </td>
                    <td className="py-4 px-6">
                      <Link href={`/admin/viewings/${v.id}`} className="font-semibold text-sm text-[#111111] hover:text-[#C9A96E] block">
                        {v.customerName}
                      </Link>
                      <a href={`tel:${v.customerPhone}`} className="text-[11px] text-[#6B6B6B] hover:text-[#111111] block font-mono">
                        {v.customerPhone}
                      </a>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-[#111111] line-clamp-1">{v.propertyTitle}</div>
                      <div className="text-[11px] text-[#6B6B6B]">{v.propertyLocation}</div>
                    </td>
                    <td className="py-4 px-6">
                      {v.date ? (
                        <>
                          <div className="font-medium text-[#111111]">{v.date}</div>
                          {v.time && <div className="text-[11px] text-[#C9A96E] font-semibold">{v.time}</div>}
                        </>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
                          Chờ liên hệ xếp lịch
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border ${getStatusBadge(v.status)}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {v.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {v.status === 'Pending' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(v.id, 'Confirmed')}
                            className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-[11px] font-semibold border border-emerald-200 transition-colors"
                          >
                            Xác Nhận
                          </button>
                        )}
                        {v.status === 'Confirmed' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(v.id, 'Completed')}
                            className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-[11px] font-semibold border border-blue-200 transition-colors"
                          >
                            Hoàn Thành
                          </button>
                        )}
                        <Link
                          href={`/admin/viewings/${v.id}`}
                          className="px-3 py-1 bg-[#F7F7F5] hover:bg-[#111111] hover:text-white text-[#111111] rounded-lg text-[11px] font-semibold border border-[#E8E8E5] transition-colors"
                        >
                          Chi Tiết
                        </Link>
                      </div>
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
