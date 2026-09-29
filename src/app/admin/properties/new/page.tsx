'use client';

import { useState } from 'react';
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

const SAMPLE_LUXURY_IMAGES = [
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80',
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
];

export default function AddPropertyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Apartment');
  const [location, setLocation] = useState('West Lake, Hanoi');
  const [address, setAddress] = useState('');

  const [monthlyRent, setMonthlyRent] = useState('');
  const [securityDeposit, setSecurityDeposit] = useState('2 months rent');
  const [availableFrom, setAvailableFrom] = useState('Available immediately');

  const [bedrooms, setBedrooms] = useState('2');
  const [bathrooms, setBathrooms] = useState('2');
  const [area, setArea] = useState('95');
  const [floor, setFloor] = useState('Floor 12');
  const [furnishing, setFurnishing] = useState('Fully Furnished');

  const [description, setDescription] = useState('');
  const [amenities, setAmenities] = useState<string[]>([
    'Security 24/7',
    'Air Conditioning',
    'Parking Spaces',
  ]);

  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
  ]);
  const [newImageUrl, setNewImageUrl] = useState('');

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

  const handleSubmit = async (targetStatus: 'Available' | 'Draft') => {
    if (!title || !monthlyRent) {
      alert('Vui lòng điền tên bất động sản và giá thuê theo tháng.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/admin/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          type,
          location,
          address: address || `${location}, Vietnam`,
          monthlyRent: Number(monthlyRent),
          securityDeposit,
          availableFrom,
          bedrooms: Number(bedrooms),
          bathrooms: Number(bathrooms),
          area: Number(area),
          floor,
          furnishing,
          description: description || 'Căn hộ cho thuê cao cấp tiêu chuẩn thượng lưu.',
          amenities,
          images: images.length > 0 ? images : [SAMPLE_LUXURY_IMAGES[0]],
          status: targetStatus,
          featured: false,
        }),
      });

      if (res.ok) {
        router.push('/admin/properties');
      } else {
        const err = await res.json();
        alert(err.error || 'Có lỗi xảy ra.');
      }
    } catch (err) {
      console.error(err);
      alert('Không thể lưu bất động sản.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl pb-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/admin/properties"
            className="text-xs text-[#6B6B6B] hover:text-[#111111] transition-colors mb-1 inline-block"
          >
            ← Quay lại danh sách
          </Link>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#111111]">
            Thêm Bất Động Sản Mới (Add Property)
          </h2>
          <p className="text-xs text-[#6B6B6B] mt-0.5">
            Điền các thông tin chi tiết dưới đây để đăng niêm yết cho thuê
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={loading}
            onClick={() => handleSubmit('Draft')}
            className="px-4 py-2 bg-white hover:bg-[#F7F7F5] text-charcoal border border-[#E8E8E5] text-xs font-semibold rounded-xl transition-colors shadow-sm"
          >
            Save Draft
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => handleSubmit('Available')}
            className="px-5 py-2 bg-[#111111] hover:bg-black text-white text-xs font-semibold rounded-xl transition-all shadow-md flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
            <span>Publish Property</span>
          </button>
        </div>
      </div>

      {/* Section 1: Basic Information */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E8E5] shadow-sm space-y-5">
        <div className="border-b border-[#E8E8E5] pb-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111]">
            1. Thông Tin Cơ Bản (Basic Information)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-[#111111] mb-1.5 uppercase tracking-wider">
              Tên Bất Động Sản (Property Name) *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ví dụ: Lumina Residence West Lake"
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F7F5] border border-[#E8E8E5] text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#111111] mb-1.5 uppercase tracking-wider">
              Loại Hình (Property Type) *
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
              Khu Vực / Địa Điểm (Location) *
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ví dụ: West Lake, Hanoi hoặc Thảo Điền, TP. HCM"
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F7F5] border border-[#E8E8E5] text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-[#111111] mb-1.5 uppercase tracking-wider">
              Địa Chỉ Chi Tiết (Full Address)
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Ví dụ: 88 Quảng An, Phường Quảng An, Quận Tây Hồ, Hà Nội"
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F7F5] border border-[#E8E8E5] text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Rental Information */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E8E5] shadow-sm space-y-5">
        <div className="border-b border-[#E8E8E5] pb-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111]">
            2. Thông Tin Cho Thuê (Rental Information)
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
                placeholder="1200"
                className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-[#F7F7F5] border border-[#E8E8E5] text-xs text-[#111111] font-semibold focus:outline-none focus:border-[#111111]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#111111] mb-1.5 uppercase tracking-wider">
              Tiền Đặt Cọc (Security Deposit)
            </label>
            <input
              type="text"
              value={securityDeposit}
              onChange={(e) => setSecurityDeposit(e.target.value)}
              placeholder="2 tháng tiền cọc"
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F7F5] border border-[#E8E8E5] text-xs text-[#111111] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#111111] mb-1.5 uppercase tracking-wider">
              Thời Điểm Dọn Vào (Available From)
            </label>
            <input
              type="text"
              value={availableFrom}
              onChange={(e) => setAvailableFrom(e.target.value)}
              placeholder="Còn trống dọn vào ngay"
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F7F5] border border-[#E8E8E5] text-xs text-[#111111] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Section 3: Property Details */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E8E5] shadow-sm space-y-5">
        <div className="border-b border-[#E8E8E5] pb-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111]">
            3. Chi Tiết Căn Hộ (Property Details)
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
              Tầng (Floor)
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
            4. Mô Tả Chi Tiết (Description)
          </h3>
        </div>

        <textarea
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Mô tả không gian, tầm nhìn, nội thất và các điểm đặc biệt của bất động sản..."
          className="w-full px-4 py-3 rounded-2xl bg-[#F7F7F5] border border-[#E8E8E5] text-xs text-[#111111] leading-relaxed focus:outline-none focus:border-[#111111]"
        />
      </div>

      {/* Section 5: Amenities */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E8E5] shadow-sm space-y-4">
        <div className="border-b border-[#E8E8E5] pb-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111]">
            5. Tiện Ích Độc Quyền (Amenities)
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
            6. Hình Ảnh Bất Động Sản (Images)
          </h3>
          <span className="text-xs text-[#6B6B6B]">{images.length} hình ảnh</span>
        </div>

        {/* Drag & drop / Upload Zone */}
        <div className="border-2 border-dashed border-[#E8E8E5] hover:border-[#C9A96E] transition-colors rounded-2xl p-6 text-center bg-[#F7F7F5]">
          <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto mb-3 text-[#C9A96E]">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          <p className="text-xs font-semibold text-[#111111]">Thêm hình ảnh URL hoặc chọn ảnh mẫu cao cấp</p>
          <div className="flex gap-2 max-w-md mx-auto mt-3">
            <input
              type="text"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              placeholder="Dán đường dẫn ảnh HTTPS..."
              className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-[#E8E8E5] text-xs focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddImage}
              className="px-3 py-1.5 bg-[#111111] text-white text-xs font-semibold rounded-lg hover:bg-black transition-colors"
            >
              + Thêm
            </button>
          </div>
        </div>

        {/* Image Grid Previews */}
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
                  Ảnh bìa (Cover)
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
          href="/admin/properties"
          className="px-5 py-2.5 rounded-xl border border-[#E8E8E5] bg-white text-xs font-semibold text-[#6B6B6B] hover:bg-[#F7F7F5] transition-colors"
        >
          Hủy bỏ
        </Link>
        <button
          type="button"
          disabled={loading}
          onClick={() => handleSubmit('Draft')}
          className="px-5 py-2.5 bg-white hover:bg-[#F7F7F5] text-charcoal border border-[#E8E8E5] text-xs font-semibold rounded-xl transition-colors shadow-sm"
        >
          Save Draft (Lưu Nháp)
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={() => handleSubmit('Available')}
          className="px-7 py-2.5 bg-[#111111] hover:bg-black text-white text-xs font-semibold rounded-xl transition-all shadow-md flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
          <span>Publish Property (Đăng Ngay)</span>
        </button>
      </div>
    </div>
  );
}
