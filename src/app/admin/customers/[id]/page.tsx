'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';

export default function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [customer, setCustomer] = useState<any>(null);
  const [viewings, setViewings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCustomer() {
      try {
        const res = await fetch(`/api/admin/customers/${id}`);
        const data = await res.json();
        if (data.customer) {
          setCustomer(data.customer);
          setViewings(data.viewings || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadCustomer();
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 text-center text-xs text-[#6B6B6B]">
        Đang tải thông tin khách hàng...
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="py-20 text-center space-y-4">
        <p className="text-sm font-semibold text-[#111111]">Không tìm thấy khách hàng.</p>
        <Link href="/admin/customers" className="text-xs text-[#C9A96E] hover:underline">
          ← Quay lại danh sách khách hàng
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#E8E8E5] shadow-sm">
        <div>
          <Link
            href="/admin/customers"
            className="text-xs text-[#6B6B6B] hover:text-[#111111] transition-colors mb-1 inline-block"
          >
            ← Danh sách khách hàng
          </Link>
          <div className="flex items-center gap-3">
            <h2 className="font-display text-2xl font-bold text-[#111111]">
              {customer.name}
            </h2>
            <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-[#C9A96E]/15 text-[#C9A96E]">
              Khách VIP
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${customer.phone}`}
            className="px-4 py-2 bg-[#111111] hover:bg-black text-white text-xs font-semibold rounded-xl transition-all shadow-sm flex items-center gap-2"
          >
            <svg className="w-3.5 h-3.5 text-[#C9A96E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            <span>Gọi Điện: {customer.phone}</span>
          </a>
        </div>
      </div>

      {/* Customer Info Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E8E5] shadow-sm space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111] border-b border-[#E8E8E5] pb-3">
          Thông Tin Liên Hệ & Nhu Cầu
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-[#6B6B6B] block mb-1">Số điện thoại:</span>
            <span className="font-semibold text-sm text-[#111111] font-mono">{customer.phone}</span>
          </div>

          <div>
            <span className="text-[#6B6B6B] block mb-1">Email:</span>
            <span className="font-semibold text-sm text-[#111111]">{customer.email || 'Chưa cung cấp'}</span>
          </div>

          <div>
            <span className="text-[#6B6B6B] block mb-1">Tổng số lần đặt xem:</span>
            <span className="font-semibold text-sm text-[#C9A96E]">{viewings.length} lần</span>
          </div>
        </div>

        {customer.notes && (
          <div className="pt-3 border-t border-[#E8E8E5]">
            <span className="text-xs text-[#6B6B6B] block mb-1">Ghi chú nhu cầu tìm nhà:</span>
            <p className="p-4 bg-[#F7F7F5] rounded-2xl text-xs text-[#111111] leading-relaxed">
              {customer.notes}
            </p>
          </div>
        )}
      </div>

      {/* Viewing History Timeline */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E8E5] shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
            Lịch Sử Xem Nhà Của Khách (Viewing History)
          </h3>
          <span className="text-xs text-[#6B6B6B]">{viewings.length} cuộc hẹn</span>
        </div>

        {viewings.length === 0 ? (
          <p className="text-xs text-[#6B6B6B] py-6 text-center">
            Khách hàng chưa có lịch hẹn xem nhà nào được ghi nhận.
          </p>
        ) : (
          <div className="space-y-4">
            {viewings.map((v, idx) => (
              <div
                key={v.id}
                className="p-5 rounded-2xl bg-[#F7F7F5] border border-[#E8E8E5] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white hover:shadow-sm transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#111111]">
                      {v.date} · {v.time}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(v.status)}`}>
                      {v.status}
                    </span>
                  </div>
                  <h4 className="font-display font-semibold text-sm text-[#111111]">
                    {v.propertyTitle}
                  </h4>
                  <p className="text-xs text-[#6B6B6B]">{v.propertyLocation}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/viewings/${v.id}`}
                    className="px-3.5 py-1.5 bg-white hover:bg-[#111111] hover:text-white text-[#111111] rounded-xl text-xs font-semibold border border-[#E8E8E5] transition-colors"
                  >
                    Xem Chi Tiết Lịch Hẹn →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
