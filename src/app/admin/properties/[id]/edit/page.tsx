'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const DEFAULT_AMENITIES = [
  'Swimming Pool',
  'Parking Spaces',
  'Fitness Gym',
  'Private Balcony',
  'Security 24/7',
  'Air Conditioning',
  'Private Elevator',
  'Smart Home System',
  'River View',
  'Wine Cellar',
  'Concierge Service',
  'Tropical Garden',
];

export default function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Apartment');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');

  const [monthlyRent, setMonthlyRent] = useState('');
  const [securityDeposit, setSecurityDeposit] = useState('');
  const [availableFrom, setAvailableFrom] = useState('');

  const [bedrooms, setBedrooms] = useState('2');
  const [bathrooms, setBathrooms] = useState('2');
  const [area, setArea] = useState('95');
  const [floor, setFloor] = useState('Floor 12');
  const [furnishing, setFurnishing] = useState('Fully Furnished');

  const [description, setDescription] = useState('');
  const [amenities, setAmenities] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [status, setStatus] = useState<'Available' | 'Rented' | 'Draft'>('Available');
  const [newImageUrl, setNewImageUrl] = useState('');

  useEffect(() => {
    async function loadProperty() {
      try {
        const res = await fetch(`/api/admin/properties/${id}`);
        const data = await res.json();
        if (data.property) {
          const p = data.property;
          setTitle(p.titleVi || p.title);
          setType(p.type);
          setLocation(p.locationVi || p.location);
          setAddress(p.address || '');
          setMonthlyRent(String(p.monthlyRent));
          setSecurityDeposit(p.securityDepositVi || p.securityDeposit || '');
          setAvailableFrom(p.availableFrom || '');
          setBedrooms(String(p.bedrooms));
          setBathrooms(String(p.bathrooms));
          setArea(String(p.area));
          setFloor(p.floorVi || p.floor || '');
          setFurnishing(p.furnishing);
          setDescription(p.descriptionVi || p.description || '');
          setAmenities(p.amenities || []);
          setImages(p.images || []);
          setStatus(p.status || 'Available');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProperty();
  }, [id]);

  const handleToggleAmenity = (item: string) => {
    setAmenities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setImages((prev) => [...prev, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSetCover = (idx: number) => {
    setImages((prev) => {
      const selected = prev[idx];
      const rest = prev.filter((_, i) => i !== idx);
      return [selected, ...rest];
    });
  };

  const handleSubmit = async (targetStatus?: 'Available' | 'Draft' | 'Rented') => {
    if (!title || !monthlyRent) {
      alert('Vui lòng điền tên bất động sản và giá thuê theo tháng.');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/admin/properties/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          type,
          location,
          address,
          monthlyRent: Number(monthlyRent),
          securityDeposit,
          availableFrom,
          bedrooms: Number(bedrooms),
          bathrooms: Number(bathrooms),
          area: Number(area),
          floor,
          furnishing,
          description,
          amenities,
          images,
          status: targetStatus || status,
        }),
      });

      if (res.ok) {
        router.push(`/admin/properties/${id}`);
      } else {
        const err = await res.json();
        alert(err.error || 'Có lỗi xảy ra.');
      }
    } catch (err) {
      console.error(err);
      alert('Không thể lưu cập nhật.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-xs text-[#6B6B6B]">
        Đang tải thông tin chỉnh sửa...
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl pb-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href={`/admin/properties/${id}`}
            className="text-xs text-[#6B6B6B] hover:text-[#111111] transition-colors mb-1 inline-block"
          >
            ← Quay lại chi tiết
          </Link>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#111111]">
            Chỉnh Sửa Bất Động Sản (Edit Property)
          </h2>
          <p className="text-xs text-[#6B6B6B] mt-0.5">
            Cập nhật giá thuê, thông số và hình ảnh của căn hộ
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/admin/properties/${id}`}
            className="px-4 py-2 bg-white hover:bg-[#F7F7F5] text-charcoal border border-[#E8E8E5] text-xs font-semibold rounded-xl transition-colors shadow-sm"
          >
            Hủy
          </Link>
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSubmit()}
            className="px-5 py-2 bg-[#111111] hover:bg-black text-white text-xs font-semibold rounded-xl transition-all shadow-md flex items-center gap-1.5"
          >
            <span>Lưu Thay Đổi</span>
          </button>
        </div>
      </div>

      {/* Section 1: Basic Information */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E8E5] shadow-sm space-y-5">
        <div className="border-b border-[#E8E8E5] pb-3 flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111]">
            1. Thông Tin Cơ Bản
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#6B6B6B]">Trạng thái:</span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="px-3 py-1 bg-[#F7F7F5] border border-[#E8E8E5] text-xs rounded-lg font-semibold"
            >
              <option value="Available">Available (Còn trống)</option>
              <option value="Rented">Rented (Đã thuê)</option>
              <option value="Draft">Draft (Bản nháp)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-[#111111] mb-1.5 uppercase tracking-wider">
              Tên Bất Động Sản *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F7F5] border border-[#E8E8E5] text-xs text-[#111111] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#111111] mb-1.5 uppercase tracking-wider">
              Loại Hình *
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F7F5] border border-[#E8E8E5] text-xs text-[#111111] focus:outline-none"
            >
              <option value="Apartment">Căn Hộ Cao Cấp (Apartment)</option>
              <option value="Villa">Biệt Thự Sang Trọng (Villa)</option>
              <option value="Penthouse">Duplex / Penthouse</option>
              <option value="Studio">Studio Loft</option>
              <option value="Townhouse">Townhouse</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#111111] mb-1.5 uppercase tracking-wider">
              Khu Vực *
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F7F5] border border-[#E8E8E5] text-xs text-[#111111] focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-[#111111] mb-1.5 uppercase tracking-wider">
              Địa Chỉ Chi Tiết
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F7F5] border border-[#E8E8E5] text-xs text-[#111111] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Rental Information */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E8E5] shadow-sm space-y-5">
        <div className="border-b border-[#E8E8E5] pb-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111]">
            2. Thông Tin Cho Thuê
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#111111] mb-1.5 uppercase tracking-wider">
              Giá Thuê / Tháng (USD) *
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-muted">$</span>
              <input
                type="number"
                required
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(e.target.value)}
                className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-[#F7F7F5] border border-[#E8E8E5] text-xs text-[#111111] font-semibold focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#111111] mb-1.5 uppercase tracking-wider">
              Tiền Đặt Cọc
            </label>
            <input
              type="text"
              value={securityDeposit}
              onChange={(e) => setSecurityDeposit(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F7F5] border border-[#E8E8E5] text-xs text-[#111111] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#111111] mb-1.5 uppercase tracking-wider">
              Thời Điểm Dọn Vào
            </label>
            <input
              type="text"
              value={availableFrom}
              onChange={(e) => setAvailableFrom(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F7F5] border border-[#E8E8E5] text-xs text-[#111111] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Section 3: Property Details */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E8E5] shadow-sm space-y-5">
        <div className="border-b border-[#E8E8E5] pb-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111]">
            3. Chi Tiết Căn Hộ
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#111111] mb-1.5 uppercase tracking-wider">
              Phòng Ngủ
            </label>
            <input
              type="number"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F7F5] border border-[#E8E8E5] text-xs text-[#111111] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#111111] mb-1.5 uppercase tracking-wider">
              Phòng Tắm
            </label>
            <input
              type="number"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F7F5] border border-[#E8E8E5] text-xs text-[#111111] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#111111] mb-1.5 uppercase tracking-wider">
              Diện Tích (m²)
            </label>
            <input
              type="number"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F7F5] border border-[#E8E8E5] text-xs text-[#111111] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#111111] mb-1.5 uppercase tracking-wider">
              Tầng
            </label>
            <input
              type="text"
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F7F5] border border-[#E8E8E5] text-xs text-[#111111] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#111111] mb-1.5 uppercase tracking-wider">
              Nội Thất
            </label>
            <select
              value={furnishing}
              onChange={(e) => setFurnishing(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#F7F7F5] border border-[#E8E8E5] text-xs text-[#111111] focus:outline-none"
            >
              <option value="Fully Furnished">Fully Furnished</option>
              <option value="Semi-Furnished">Semi Furnished</option>
              <option value="Unfurnished">Unfurnished</option>
            </select>
          </div>
        </div>
      </div>

      {/* Section 4: Description */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E8E5] shadow-sm space-y-4">
        <div className="border-b border-[#E8E8E5] pb-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111]">
            4. Mô Tả Chi Tiết
          </h3>
        </div>

        <textarea
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-3 rounded-2xl bg-[#F7F7F5] border border-[#E8E8E5] text-xs text-[#111111] leading-relaxed focus:outline-none"
        />
      </div>

      {/* Section 5: Amenities */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E8E5] shadow-sm space-y-4">
        <div className="border-b border-[#E8E8E5] pb-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111]">
            5. Tiện Ích Độc Quyền
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {DEFAULT_AMENITIES.map((item) => {
            const checked = amenities.includes(item);
            return (
              <label
                key={item}
                onClick={() => handleToggleAmenity(item)}
                className={`p-3 rounded-xl border text-xs font-medium cursor-pointer transition-all flex items-center gap-2 select-none ${
                  checked
                    ? 'bg-[#111111] text-white border-[#111111]'
                    : 'bg-[#F7F7F5] text-slate border-[#E8E8E5] hover:bg-[#E8E8E5]'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center border ${
                    checked ? 'bg-[#C9A96E] border-[#C9A96E] text-black' : 'border-[#6B6B6B] bg-white'
                  }`}
                >
                  {checked && (
                    <svg className="w-3 h-3 text-black font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span>{item}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Section 6: Images */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E8E5] shadow-sm space-y-5">
        <div className="border-b border-[#E8E8E5] pb-3 flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111]">
            6. Hình Ảnh
          </h3>
          <span className="text-xs text-[#6B6B6B]">{images.length} hình ảnh</span>
        </div>

        <div className="flex gap-2 max-w-md">
          <input
            type="text"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            placeholder="Dán đường dẫn ảnh HTTPS..."
            className="flex-1 px-3 py-2 rounded-xl bg-[#F7F7F5] border border-[#E8E8E5] text-xs focus:outline-none"
          />
          <button
            type="button"
            onClick={handleAddImage}
            className="px-4 py-2 bg-[#111111] text-white text-xs font-semibold rounded-xl hover:bg-black transition-colors"
          >
            + Thêm Ảnh
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {images.map((url, idx) => (
            <div
              key={idx}
              className={`relative aspect-[4/3] rounded-2xl overflow-hidden border-2 group ${
                idx === 0 ? 'border-[#C9A96E] ring-2 ring-[#C9A96E]/20' : 'border-[#E8E8E5]'
              }`}
            >
              <Image src={url} alt="" fill className="object-cover" sizes="200px" />
              {idx === 0 && (
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#C9A96E] text-black font-bold text-[9px] uppercase tracking-wider shadow">
                  Ảnh bìa
                </span>
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {idx !== 0 && (
                  <button
                    type="button"
                    onClick={() => handleSetCover(idx)}
                    className="p-1.5 rounded-full bg-white text-charcoal hover:bg-[#C9A96E] hover:text-black transition-colors text-[10px] font-bold"
                    title="Đặt làm ảnh bìa"
                  >
                    ★ Bìa
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="p-1.5 rounded-full bg-white text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Xóa ảnh"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E8E8E5]">
        <Link
          href={`/admin/properties/${id}`}
          className="px-5 py-2.5 rounded-xl border border-[#E8E8E5] bg-white text-xs font-semibold text-[#6B6B6B] hover:bg-[#F7F7F5] transition-colors"
        >
          Hủy bỏ
        </Link>
        <button
          type="button"
          disabled={saving}
          onClick={() => handleSubmit()}
          className="px-7 py-2.5 bg-[#111111] hover:bg-black text-white text-xs font-semibold rounded-xl transition-all shadow-md flex items-center gap-2"
        >
          <span>{saving ? 'Đang lưu...' : 'Lưu Thay Đổi (Save Changes)'}</span>
        </button>
      </div>
    </div>
  );
}
