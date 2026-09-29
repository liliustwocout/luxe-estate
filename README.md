# LuxeEstate — Luxury Real Estate Rental Platform

> Nền tảng tuyển chọn biệt thự, penthouse và căn hộ cho thuê thượng lưu tại Việt Nam.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://luxury-estate-self.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

---

## 🌟 Tính Năng Nổi Bật (Key Features)

- **Định Hướng Cho Thuê Cao Cấp (100% Rental Focused)**:
  - Giá thuê minh bạch theo tháng (`$ / month` và quy đổi `~Triệu / tháng`).
  - Thông số chi tiết: Tầng, diện tích, phòng ngủ, phòng tắm, tiền đặt cọc (*Security Deposit*), thời điểm dọn vào (*Available From*), thời hạn hợp đồng (*Lease Term*).
  - Tình trạng nội thất: *Fully Furnished*, *Semi-Furnished*, *Unfurnished*.
  - Quy trình xem nhà riêng tư (*Schedule a Viewing*).
- **Trải Nghiệm Thị Giác & 3D Interactive**:
  - **Three.js 3D Background**: Các khối kiến trúc lơ lửng, lăng kính thủy tinh và hạt bụi vàng kim tương tác theo chuột và độ cuộn trang.
  - **Cinematic Hero**: Typography nghệ thuật cỡ lớn với hiệu ứng masked staggered reveal.
  - **Featured Residences Showcase**: Trượt ngang với bộ đếm `01 / 06`, thẻ tương tác 3D tilt và zoom ảnh cinematic.
  - **Magnetic Custom Cursor**: Vòng hào quang tự động nhận diện và tương tác các thành phần clickable (tự động tắt trên thiết bị cảm ứng).
  - **Smooth Scroll**: Trải nghiệm cuộn mượt mà với Lenis.
  - **Bilingual (Song Ngữ)**: Chuyển đổi mượt mà giữa Tiếng Việt (VI) và English (EN).
- **Bộ Lọc Đa Tiêu Chí (Advanced Rental Filters)**:
  - Vị trí (*Hà Nội, TP. Hồ Chí Minh, Đà Nẵng, Quảng Ninh*).
  - Loại hình BĐS (*Căn hộ, Biệt thự ven sông, Penthouse, Duplex, Studio Loft*).
  - **Slider khoảng giá thuê theo tháng** ($500 — $3,500+ / tháng).
  - Số phòng ngủ, tình trạng nội thất và tình trạng phòng trống.

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, React 19)
- **3D & WebGL**: [Three.js](https://threejs.org/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scrolling**: [Lenis](https://lenis.darkroom.engineering/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Typography**: Playfair Display (Serif) & Inter (Sans-serif)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Khởi Chạy Dự Án (Getting Started)

Cài đặt các gói phụ thuộc:

```bash
npm install
```

Khởi chạy môi trường phát triển cục bộ:

```bash
npm run dev
```

Mở trình duyệt tại [http://localhost:3000](http://localhost:3000) để trải nghiệm.

Kiểm tra build production:

```bash
npm run build
```

---

## 🌐 Production Deployment

Dự án hiện đã được triển khai trực tiếp trên Vercel:

- **Official URL**: [https://luxury-estate-self.vercel.app](https://luxury-estate-self.vercel.app)
- **Repository**: [https://github.com/liliustwocout/luxe-estate](https://github.com/liliustwocout/luxe-estate)
