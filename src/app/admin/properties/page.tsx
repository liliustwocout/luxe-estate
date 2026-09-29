'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (typeFilter !== 'all') params.set('type', typeFilter);

      const res = await fetch(`/api/admin/properties?${params.toString()}`);
      const data = await res.json();
      setProperties(data.properties || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchProperties, 250);
    return () => clearTimeout(timer);
  }, [search, statusFilter, typeFilter]);

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'Available' ? 'Rented' : 'Available';
    try {
      const res = await fetch(`/api/admin/properties/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (res.ok) {
        setProperties((prev) =>
          prev.map((p) => (p.id === id ? { ...p, status: nextStatus } : p))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Bạn có chắc muốn xóa bất động sản "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/properties/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProperties((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-[#111111]">
            Quản Lý Bất Động Sản (Properties)
          </h2>
          <p className="text-xs text-[#6B6B6B] mt-0.5">
            Danh mục các căn hộ, penthouse và biệt thự cho thuê trong hệ thống
          </p>
        </div>

        <Link
          href="/admin/properties/new"
          className="px-5 py-2.5 bg-[#111111] hover:bg-black text-white text-xs font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          <svg className="w-4 h-4 text-[#C9A96E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>+ Add Property</span>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E8E8E5] shadow-sm flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tên BĐS, vị trí, địa chỉ..."
            className="w-full pl-9 pr-4 py-2.5 bg-[#F7F7F5] border border-[#E8E8E5] rounded-xl text-xs text-[#111111] focus:outline-none focus:border-[#111111] transition-colors"
          />
          <svg className="w-4 h-4 text-[#6B6B6B] absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 bg-[#F7F7F5] border border-[#E8E8E5] rounded-xl text-xs text-[#111111] font-medium focus:outline-none"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="Available">Available (Còn trống)</option>
            <option value="Rented">Rented (Đã thuê)</option>
            <option value="Draft">Draft (Bản nháp)</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2.5 bg-[#F7F7F5] border border-[#E8E8E5] rounded-xl text-xs text-[#111111] font-medium focus:outline-none"
          >
            <option value="all">Tất cả loại hình</option>
            <option value="Apartment">Căn Hộ (Apartment)</option>
            <option value="Villa">Biệt Thự (Villa)</option>
            <option value="Penthouse">Penthouse / Duplex</option>
            <option value="Townhouse">Townhouse</option>
          </select>
        </div>
      </div>

      {/* Properties Table */}
      <div className="bg-white rounded-3xl border border-[#E8E8E5] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F7F5] border-b border-[#E8E8E5] uppercase text-[10px] tracking-wider text-[#6B6B6B] font-semibold">
              <tr>
                <th className="py-3 px-6">Hình Ảnh</th>
                <th className="py-3 px-6">Bất Động Sản</th>
                <th className="py-3 px-6">Vị Trí & Loại Hình</th>
                <th className="py-3 px-6">Giá Thuê / Tháng</th>
                <th className="py-3 px-6">Trạng Thái</th>
                <th className="py-3 px-6 text-right">Hành Động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E5]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#6B6B6B]">
                    Đang tải danh sách bất động sản...
                  </td>
                </tr>
              ) : properties.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#6B6B6B]">
                    Không tìm thấy bất động sản nào phù hợp.
                  </td>
                </tr>
              ) : (
                properties.map((p) => (
                  <tr key={p.id} className="hover:bg-[#F7F7F5]/80 transition-colors">
                    <td className="py-4 px-6">
                      <div className="relative w-16 h-12 rounded-xl overflow-hidden bg-gray-100 border border-[#E8E8E5] flex-shrink-0">
                        {p.images && p.images[0] ? (
                          <Image src={p.images[0]} alt={p.title} fill className="object-cover" sizes="64px" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-muted">No IMG</div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Link
                        href={`/admin/properties/${p.id}`}
                        className="font-semibold text-sm text-[#111111] hover:text-[#C9A96E] transition-colors block line-clamp-1"
                      >
                        {p.titleVi || p.title}
                      </Link>
                      <span className="text-[11px] text-[#6B6B6B] block">
                        {p.bedrooms} PN · {p.bathrooms} PT · {p.area} m²
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-[#111111] font-medium">{p.locationVi || p.location}</div>
                      <div className="text-[11px] text-[#6B6B6B]">{p.typeVi || p.type}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-display font-bold text-sm text-[#111111]">
                        ${p.monthlyRent?.toLocaleString()}
                        <span className="text-[10px] font-normal text-muted"> / mo</span>
                      </div>
                      <div className="text-[10px] text-[#C9A96E] font-medium">
                        {p.furnishingVi || p.furnishing}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(p.id, p.status)}
                        title="Click để đổi trạng thái"
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border transition-all ${
                          p.status === 'Available'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                            : p.status === 'Rented'
                            ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                            : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {p.status}
                      </button>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/admin/properties/${p.id}`}
                          title="Xem chi tiết"
                          className="p-2 rounded-lg bg-[#F7F7F5] hover:bg-white text-[#111111] border border-[#E8E8E5] transition-colors"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </Link>
                        <Link
                          href={`/admin/properties/${p.id}/edit`}
                          title="Chỉnh sửa"
                          className="p-2 rounded-lg bg-[#F7F7F5] hover:bg-white text-[#111111] border border-[#E8E8E5] transition-colors"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                          </svg>
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(p.id, p.titleVi || p.title)}
                          title="Xóa bất động sản"
                          className="p-2 rounded-lg bg-[#F7F7F5] hover:bg-rose-50 hover:text-rose-600 text-[#6B6B6B] border border-[#E8E8E5] transition-colors"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
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
