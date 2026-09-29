'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function AdminPropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const [property, setProperty] = useState<any>(null);
  const [viewings, setViewings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [propRes, viewsRes] = await Promise.all([
          fetch(`/api/admin/properties/${id}`),
          fetch('/api/admin/viewings'),
        ]);

        const propData = await propRes.json();
        const viewsData = await viewsRes.json();

        if (propData.property) {
          setProperty(propData.property);
        }

        if (viewsData.viewings) {
          const relevant = viewsData.viewings.filter((v: any) => v.propertyId === id);
          setViewings(relevant);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  const handleToggleStatus = async () => {
    if (!property) return;
    const nextStatus = property.status === 'Available' ? 'Rented' : 'Available';
    try {
      const res = await fetch(`/api/admin/properties/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (res.ok) {
        setProperty((prev: any) => ({ ...prev, status: nextStatus }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Bạn có chắc chắn muốn xóa vĩnh viễn bất động sản này?')) return;
    try {
      const res = await fetch(`/api/admin/properties/${id}`, { method: 'DELETE' });
      if (res.ok) {
        router.push('/admin/properties');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-xs text-[#6B6B6B]">
        Đang tải thông tin bất động sản...
      </div>
    );
  }

  if (!property) {
    return (
      <div className="py-20 text-center space-y-4">
        <p className="text-sm font-semibold text-[#111111]">Không tìm thấy bất động sản.</p>
        <Link href="/admin/properties" className="text-xs text-[#C9A96E] hover:underline">
          ← Quay lại danh sách
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl pb-16">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#E8E8E5] shadow-sm">
        <div>
          <Link
            href="/admin/properties"
            className="text-xs text-[#6B6B6B] hover:text-[#111111] transition-colors mb-1 inline-block"
          >
            ← Danh sách bất động sản
          </Link>
          <h2 className="font-display text-2xl font-bold text-[#111111] line-clamp-1">
            {property.titleVi || property.title}
          </h2>
          <p className="text-xs text-[#6B6B6B] flex items-center gap-1.5 mt-0.5">
            <span>{property.locationVi || property.location}</span>
            <span>·</span>
            <span>{property.typeVi || property.type}</span>
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href={`/admin/properties/${id}/edit`}
            className="px-4 py-2 bg-[#F7F7F5] hover:bg-[#E8E8E5] text-[#111111] text-xs font-semibold rounded-xl border border-[#E8E8E5] transition-colors"
          >
            Chỉnh Sửa (Edit)
          </Link>

          <button
            type="button"
            onClick={handleToggleStatus}
            className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-colors ${
              property.status === 'Available'
                ? 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            {property.status === 'Available' ? 'Đánh Dấu Đã Thuê (Mark Rented)' : 'Đánh Dấu Còn Trống (Mark Available)'}
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-xl border border-rose-200 transition-colors"
          >
            Xóa (Delete)
          </button>
        </div>
      </div>

      {/* Main Grid: Preview on Left, Quick Stats & Viewings on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Customer-like Preview (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main Gallery */}
          <div className="bg-white p-4 rounded-3xl border border-[#E8E8E5] shadow-sm space-y-3 overflow-hidden">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
              <Image
                src={property.images[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80'}
                alt={property.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 bg-black/80 backdrop-blur text-white text-[11px] font-semibold rounded-full">
                  FOR RENT
                </span>
                <span className="px-3 py-1 bg-white/90 text-charcoal text-[11px] font-semibold rounded-full shadow-sm">
                  {property.typeVi || property.type}
                </span>
              </div>
            </div>

            {property.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {property.images.slice(1, 5).map((img: string, idx: number) => (
                  <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#E8E8E5]">
                    <Image src={img} alt="" fill className="object-cover" sizes="20vw" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Specifications */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E8E5] shadow-sm space-y-6">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#C9A96E] mb-2">
                Thông Số Kỹ Thuật
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-[#F7F7F5] rounded-xl border border-[#E8E8E5]">
                  <span className="font-bold text-sm text-[#111111]">{property.bedrooms}</span>
                  <span className="block text-[10px] text-[#6B6B6B] uppercase">Phòng Ngủ</span>
                </div>
                <div className="p-3 bg-[#F7F7F5] rounded-xl border border-[#E8E8E5]">
                  <span className="font-bold text-sm text-[#111111]">{property.bathrooms}</span>
                  <span className="block text-[10px] text-[#6B6B6B] uppercase">Phòng Tắm</span>
                </div>
                <div className="p-3 bg-[#F7F7F5] rounded-xl border border-[#E8E8E5]">
                  <span className="font-bold text-sm text-[#111111]">{property.area} m²</span>
                  <span className="block text-[10px] text-[#6B6B6B] uppercase">Diện Tích</span>
                </div>
                <div className="p-3 bg-[#F7F7F5] rounded-xl border border-[#E8E8E5]">
                  <span className="font-bold text-sm text-[#111111]">{property.floorVi || property.floor}</span>
                  <span className="block text-[10px] text-[#6B6B6B] uppercase">Vị Trí Tầng</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="pt-4 border-t border-[#E8E8E5]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-2">
                Mô Tả Không Gian
              </h4>
              <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed whitespace-pre-line">
                {property.descriptionVi || property.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="pt-4 border-t border-[#E8E8E5]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-3">
                Tiện Ích Đi Kèm
              </h4>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((a: string) => (
                  <span
                    key={a}
                    className="px-3 py-1 bg-[#F7F7F5] border border-[#E8E8E5] text-[#111111] text-xs font-medium rounded-full"
                  >
                    ✓ {a}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Quick Insights & Viewing Requests (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card: Quick Snapshot */}
          <div className="bg-white p-6 rounded-3xl border border-[#E8E8E5] shadow-sm space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
              Tình Trạng Niêm Yết
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E5]">
                <span className="text-xs text-[#6B6B6B]">Trạng thái:</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    property.status === 'Available'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : property.status === 'Rented'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-gray-100 text-gray-700 border-gray-200'
                  }`}
                >
                  {property.status}
                </span>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E5]">
                <span className="text-xs text-[#6B6B6B]">Giá thuê tháng:</span>
                <span className="font-display text-lg font-bold text-[#111111]">
                  ${property.monthlyRent?.toLocaleString()}
                  <span className="text-xs font-normal text-muted"> / mo</span>
                </span>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E5]">
                <span className="text-xs text-[#6B6B6B]">Đặt cọc:</span>
                <span className="text-xs font-semibold text-[#111111]">
                  {property.securityDepositVi || property.securityDeposit}
                </span>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E5]">
                <span className="text-xs text-[#6B6B6B]">Lượt đặt lịch xem:</span>
                <span className="px-2.5 py-0.5 bg-[#C9A96E]/15 text-[#C9A96E] font-bold text-xs rounded-full">
                  {viewings.length} yêu cầu
                </span>
              </div>
            </div>

            <Link
              href={`/properties/${property.slug}`}
              target="_blank"
              className="w-full py-2.5 px-4 bg-[#F7F7F5] hover:bg-[#E8E8E5] text-charcoal text-xs font-semibold rounded-xl transition-colors border border-[#E8E8E5] flex items-center justify-center gap-1.5"
            >
              <span>Xem trên Website Khách Hàng</span>
              <span>↗</span>
            </Link>
          </div>

          {/* Card: Associated Viewings */}
          <div className="bg-white p-6 rounded-3xl border border-[#E8E8E5] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                Lịch Hẹn Căn Này ({viewings.length})
              </h3>
            </div>

            {viewings.length === 0 ? (
              <p className="text-xs text-[#6B6B6B] py-4 text-center">
                Chưa có khách đặt lịch xem căn này.
              </p>
            ) : (
              <div className="space-y-3">
                {viewings.map((v) => (
                  <Link
                    key={v.id}
                    href={`/admin/viewings/${v.id}`}
                    className="block p-3.5 rounded-2xl bg-[#F7F7F5] hover:bg-white border border-[#E8E8E5] transition-all"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-xs text-[#111111]">{v.customerName}</span>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        {v.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#6B6B6B] flex items-center justify-between">
                      <span>{v.date} lúc {v.time}</span>
                      <span className="font-mono text-[10px] text-muted">{v.customerPhone}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
