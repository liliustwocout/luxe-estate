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

- **Quản Trị Viên Tập Trung (Decoupled High-Speed Admin Portal)**:
  - **Dashboard 4 KPI**: Tổng BĐS, Căn hộ trống (Available), Lịch xem nhà (Viewing Requests), Chờ duyệt (Pending).
  - **Quản lý Bất Động Sản**: CRUD, bộ lọc tìm kiếm, công tắc Publish/Unpublish, chuyển đổi trạng thái Available/Rented, form 6 mục chuẩn hóa, chọn cover image.
  - **Quản lý Lịch Xem Nhà**: Flow chuẩn hóa (Pending → Confirmed → Completed / Cancelled), màn hình chi tiết với đầy đủ action (Confirm, Reschedule, Cancel, Complete).
  - **Lịch Tháng (Calendar View)**: Lưới lịch tháng trực quan với badge số lượng lịch hẹn và panel chi tiết theo giờ.
  - **Quản lý Khách Hàng**: Danh bạ khách hàng, hồ sơ và Viewing History Timeline chi tiết.
  - **Chuông thông báo (🔔 3)** & Cài đặt hệ thống.

---

## 📚 Tài Liệu Kỹ Thuật Hệ Thống (Comprehensive Documentation)

Hệ thống được tài liệu hóa bài bản và chuyên sâu theo chuẩn Enterprise tại thư mục [`docs/`](./docs/README.md):

1. [**01_ARCHITECTURE.md**](./docs/01_ARCHITECTURE.md) — Kiến trúc tổng thể, mô hình C4, nguyên tắc Decoupling giữa Customer Web và Admin.
2. [**02_REQUIREMENTS_SPEC.md**](./docs/02_REQUIREMENTS_SPEC.md) — Đặc tả yêu cầu phần mềm (SRS), phân tích phạm vi 100% cho thuê cao cấp.
3. [**03_API_REFERENCE.md**](./docs/03_API_REFERENCE.md) — Đặc tả toàn bộ RESTful API (Bookings, Properties, Viewings, Customers, Notifications).
4. [**04_DATABASE_SCHEMA.md**](./docs/04_DATABASE_SCHEMA.md) — Thiết kế CSDL quan hệ, sơ đồ ERD, DDL Script PostgreSQL & Prisma schema.
5. [**05_USER_GUIDE.md**](./docs/05_USER_GUIDE.md) — Sổ tay vận hành: Hướng dẫn trải nghiệm cho khách và cẩm nang vận hành cho Admin.
6. [**06_DEPLOYMENT_DEVOPS.md**](./docs/06_DEPLOYMENT_DEVOPS.md) — Triển khai Vercel, quy trình CI/CD GitHub & kiểm thử tự động Playwright.
7. [**07_DEVELOPMENT_ONBOARDING.md**](./docs/07_DEVELOPMENT_ONBOARDING.md) — Hướng dẫn Onboarding lập trình viên mới & quy chuẩn React 19/Next.js 16.

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, React 19, Turbopack)
- **3D & WebGL**: [Three.js](https://threejs.org/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scrolling**: [Lenis](https://lenis.darkroom.engineering/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **E2E Testing**: [Playwright](https://playwright.dev/)
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

Mở trình duyệt tại:
- **Customer Portal**: [http://localhost:3000](http://localhost:3000)
- **Admin Portal**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login) *(Tài khoản: `admin@luxeestate.vn` / `admin123`)*

---

## 🌐 Production Deployment

Dự án hiện đã được triển khai trực tiếp trên Vercel:

- **Official Customer Portal**: [https://luxury-estate-self.vercel.app](https://luxury-estate-self.vercel.app)
- **Official Admin Portal**: [https://luxury-estate-self.vercel.app/admin/login](https://luxury-estate-self.vercel.app/admin/login)
- **GitHub Repository**: [https://github.com/liliustwocout/luxe-estate](https://github.com/liliustwocout/luxe-estate)

