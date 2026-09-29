'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);

      const res = await fetch(`/api/admin/customers?${params.toString()}`);
      const data = await res.json();
      setCustomers(data.customers || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchCustomers, 200);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-[#111111]">
            Quản Lý Khách Hàng (Customer Directory)
          </h2>
          <p className="text-xs text-[#6B6B6B] mt-0.5">
            Danh bạ khách hàng tiềm năng và lịch sử các lần tham quan bất động sản
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tên khách hàng, số điện thoại..."
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#E8E8E5] rounded-xl text-xs text-[#111111] focus:outline-none focus:border-[#111111] shadow-sm"
          />
          <svg className="w-4 h-4 text-[#6B6B6B] absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-3xl border border-[#E8E8E5] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F7F5] border-b border-[#E8E8E5] uppercase text-[10px] tracking-wider text-[#6B6B6B] font-semibold">
              <tr>
                <th className="py-3.5 px-6">Khách Hàng (Customer)</th>
                <th className="py-3.5 px-6">Số Điện Thoại (Phone)</th>
                <th className="py-3.5 px-6">Email</th>
                <th className="py-3.5 px-6">Lượt Xem (Viewings)</th>
                <th className="py-3.5 px-6">Lần Xem Gần Nhất</th>
                <th className="py-3.5 px-6 text-right">Lịch Sử</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E5]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#6B6B6B]">
                    Đang tải danh sách khách hàng...
                  </td>
                </tr>
              ) : customers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#6B6B6B]">
                    Không tìm thấy khách hàng nào.
                  </td>
                </tr>
              ) : (
                customers.map((c) => (
                  <tr key={c.id} className="hover:bg-[#F7F7F5]/80 transition-colors">
                    <td className="py-4 px-6">
                      <Link href={`/admin/customers/${c.id}`} className="font-semibold text-sm text-[#111111] hover:text-[#C9A96E] block">
                        {c.name}
                      </Link>
                      {c.notes && (
                        <span className="text-[11px] text-[#6B6B6B] line-clamp-1 italic mt-0.5">
                          {c.notes}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 font-mono text-xs text-[#111111]">
                      <a href={`tel:${c.phone}`} className="hover:text-[#C9A96E]">
                        {c.phone}
                      </a>
                    </td>
                    <td className="py-4 px-6 text-[#6B6B6B]">
                      {c.email ? (
                        <a href={`mailto:${c.email}`} className="hover:text-[#111111]">
                          {c.email}
                        </a>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-[#C9A96E]/15 text-[#C9A96E]">
                        {c.viewingCount} căn hộ
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-[#111111] font-medium">
                      {c.lastViewingDate || '—'}
                    </td>
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <Link
                        href={`/admin/customers/${c.id}`}
                        className="px-3.5 py-1.5 rounded-lg bg-[#F7F7F5] hover:bg-[#111111] hover:text-white text-[#111111] text-xs font-semibold border border-[#E8E8E5] transition-colors inline-flex items-center"
                      >
                        Hồ Sơ & Lịch Sử →
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
