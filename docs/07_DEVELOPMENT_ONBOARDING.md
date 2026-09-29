# 07 — Hướng Dẫn Phát Triển & Onboarding Lập Trình Viên (Developer Guide)

Tài liệu này được thiết kế dành cho các lập trình viên mới tham gia dự án **LuxeEstate**. Hướng dẫn bao gồm từ bước thiết lập môi trường cục bộ, làm quen cấu trúc mã nguồn, đến các quy chuẩn lập trình nâng cao với Next.js 16 và React 19.

---

## 1. Yêu Cầu Môi Trường (Prerequisites)

* **Node.js:** Phiên bản $\ge 20.0.0$ LTS (Khuyến nghị sử dụng Node.js 22 LTS).
* **Trình quản lý gói:** `npm` (đi kèm Node.js) hoặc `pnpm`.
* **Hệ điều hành:** Windows 10/11, macOS, hoặc Linux.
* **Git:** Phiên bản $\ge 2.30$.
* **IDE Khuyến nghị:** VS Code hoặc Antigravity IDE với các tiện ích mở rộng: *Tailwind CSS IntelliSense, ESLint, Prettier*.

---

## 2. Khởi Động Dự Án Cục Bộ (Local Setup in 3 Minutes)

```bash
# 1. Di chuyển vào thư mục dự án
cd g:/Project/BĐS/luxury-estate

# 2. Cài đặt toàn bộ các gói phụ thuộc
npm install

# 3. Khởi chạy máy chủ phát triển cục bộ
npm run dev
```

Sau khi terminal hiển thị thông báo sẵn sàng, truy cập vào các đường dẫn sau trên trình duyệt:
* **Giao diện Khách hàng (Customer Web):** [http://localhost:3000](http://localhost:3000)
* **Giao diện Quản trị (Admin Portal):** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

---

## 3. Bản Đồ Cấu Trúc Mã Nguồn (Codebase Organization)

```
g:/Project/BĐS/
├── docs/                        # Toàn bộ tài liệu chuẩn hóa hệ thống (SRS, API, DB, Guide...)
└── luxury-estate/
    ├── public/                  # Tài nguyên tĩnh (ảnh demo, screenshots kiểm thử)
    ├── scripts/
    │   └── verify-admin.mjs     # Kịch bản kiểm thử E2E tự động Playwright
    ├── src/
    │   ├── app/                 # Next.js App Router (Routing Engine)
    │   │   ├── page.tsx         # Trang chủ khách hàng (Hero, 3D, Featured, About, CTA)
    │   │   ├── properties/      # Danh mục & Chi tiết BĐS cho thuê
    │   │   │   ├── page.tsx     # Danh sách + Bộ lọc đa tiêu chí
    │   │   │   └── [slug]/      # Chi tiết căn hộ, thông số thuê, 3D
    │   │   ├── admin/           # Phân hệ Quản trị viên (Decoupled, Fast, Clean)
    │   │   │   ├── layout.tsx   # Admin Auth Guard & Cookie Session Verification
    │   │   │   ├── login/       # Trang đăng nhập với nút 1-click demo
    │   │   │   ├── dashboard/   # Dashboard 4 KPI thẻ & Bảng lịch gần nhất
    │   │   │   ├── properties/  # CRUD Bất động sản (/new, /[id], /[id]/edit)
    │   │   │   ├── viewings/    # Lịch xem nhà 5 tab + Lịch Tháng (/calendar)
    │   │   │   ├── customers/   # Danh bạ khách hàng & Hồ sơ lịch sử xem nhà
    │   │   │   └── settings/    # Cấu hình hồ sơ admin & thông báo
    │   │   └── api/             # Next.js Route Handlers (REST API Layer)
    │   │       ├── bookings/    # API khách gửi lịch xem nhà
    │   │       └── admin/       # Các API nội bộ Admin (Properties, Viewings, Customers...)
    │   ├── components/          # Thư viện thành phần UI
    │   │   ├── 3d/              # Scene3D.tsx (Three.js WebGL Architecture Scene)
    │   │   ├── admin/           # AdminSidebar.tsx, AdminHeader.tsx
    │   │   ├── home/            # HeroSection, FeaturedResidences, AboutSection, CTASection
    │   │   ├── layout/          # Navbar.tsx, Footer.tsx (Tự động ẩn trên /admin)
    │   │   ├── properties/      # PropertyCard, ViewingModal, Filters
    │   │   ├── providers/       # SmoothScrollProvider (Lenis)
    │   │   └── ui/              # CustomCursor, IntroLoader
    │   ├── context/
    │   │   └── LanguageContext.tsx  # Quản lý trạng thái Song ngữ (VI/EN)
    │   └── lib/                 # Core Business Logic & Data Store
    │       ├── admin-auth.ts    # Helper xác thực Cookie và bảo vệ phiên Admin
    │       ├── admin-data.ts    # In-Memory Relational Engine & CRUD Store
    │       ├── data.ts          # Dữ liệu tĩnh danh mục BĐS cao cấp
    │       ├── translations.ts  # Từ điển song ngữ Tiếng Việt - English
    │       └── types.ts         # TypeScript Interfaces & Data Models
    ├── next.config.ts           # Cấu hình Next.js Turbopack & Image domains
    ├── package.json             # Khai báo thư viện & kịch bản lệnh
    ├── tsconfig.json            # Cấu hình TypeScript nghiêm ngặt (Strict Mode)
    └── vercel.json              # Cấu hình bảo mật & CDN Deployment
```

---

## 4. Các Quy Chuẩn Lập Trình Quan Trọng (Key Technical Patterns)

### 4.1. Quy Chuẩn React 19 & Next.js 16 Dynamic Parameters
Trong Next.js 16 / React 19, các tham số động `params` và `searchParams` được cung cấp dưới dạng Promise bất đồng bộ. Khi tạo trang động dạng `[id]` hoặc `[slug]`, bắt buộc sử dụng hook `use(params)` của React thay vì truy cập trực tiếp:

```tsx
'use client';

import React, { use } from 'react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function DetailPage({ params }: PageProps) {
  // Giải nén tham số Promise một cách an toàn theo chuẩn React 19
  const { id } = use(params);

  return <div>Chi tiết bản ghi ID: {id}</div>;
}
```

### 4.2. Nguyên Tắc Tách Rời Giao Diện Admin & Khách Hàng (Isolation Principle)
Không được đưa các hiệu ứng của trang khách hàng vào trang quản trị:
* **Tuyệt đối không** gọi `SmoothScrollProvider` hoặc gắn `CustomCursor` vào các trang `/admin`.
* Khi tạo component dùng chung, luôn kiểm tra đường dẫn với `usePathname()`:
  ```tsx
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) {
    return null; // Không render trên admin
  }
  ```

### 4.3. Quản Lý Trạng Thái & Dữ Liệu (`admin-data.ts`)
* Toàn bộ dữ liệu được quản lý tập trung tại [src/lib/admin-data.ts](file:///g:/Project/BĐS/luxury-estate/src/lib/admin-data.ts).
* Khi một hàm thao tác (Thêm BĐS, duyệt lịch, tạo khách mới) được thực thi, hàm này tự động cập nhật mảng trong bộ nhớ và tự động kích hoạt thông báo chuông tương ứng:
  ```typescript
  // Ví dụ hàm duyệt lịch hẹn xem nhà
  export function updateViewingStatus(id: string, status: ViewingStatus) {
    const item = viewingRequests.find(v => v.id === id);
    if (item) {
      item.status = status;
      item.updatedAt = new Date().toISOString();
      return item;
    }
    return null;
  }
  ```

---

## 5. Quy Trình Đóng Góp Tính Năng Mới (Contribution Checklist)

Mỗi khi phát triển một tính năng mới (Ví dụ: Thêm bộ lọc, thêm trường dữ liệu BĐS, xuất báo cáo):

- [ ] **1. Định nghĩa Type:** Khai báo đầy đủ kiểu dữ liệu trong `src/lib/types.ts`.
- [ ] **2. Cập nhật Store:** Thêm logic nghiệp vụ vào `src/lib/admin-data.ts`.
- [ ] **3. Viết API Route:** Tạo Route Handler tương ứng trong `src/app/api/admin/*`.
- [ ] **4. Xây dựng Giao diện:** Thiết kế giao diện tuân thủ bảng màu chuẩn (`#F7F7F5`, `#111111`, `#FFFFFF`, bo góc 12-16px).
- [ ] **5. Kiểm tra Build:** Chạy lệnh `npm run build` đảm bảo không có lỗi Type hoặc cú pháp.
- [ ] **6. Chạy Kiểm Thử E2E:** Chạy `node scripts/verify-admin.mjs` kiểm tra không làm hỏng các luồng nghiệp vụ hiện có.
- [ ] **7. Commit & Push:** Đẩy mã nguồn lên GitHub và kiểm tra Vercel deployment.
