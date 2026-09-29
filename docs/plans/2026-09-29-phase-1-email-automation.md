# Phase 1: Email Automation & Calendar Integration Implementation Plan

> **For Agent:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Triển khai hoàn chỉnh hệ thống tự động hóa Email thông báo cho Admin khi có lượt đặt lịch mới, gửi email xác nhận kèm file lịch `.ics` cho Khách hàng khi được duyệt, và thông báo khi dời/hủy lịch hẹn; hỗ trợ cả Resend API, Gmail SMTP và chế độ Simulation Dev Mode.

**Architecture:** Xây dựng module dịch vụ `src/lib/email.ts` độc lập với kiến trúc Multi-Provider (Resend REST API / SMTP / Simulator), tạo các mẫu email HTML responsive nhận diện thương hiệu LuxeEstate (Black & Gold), bộ sinh file chuẩn iCalendar `.ics` (RFC 5545), và tích hợp vào các API route (`/api/bookings`, `/api/admin/viewings/[id]`, `/api/admin/test-email`).

**Tech Stack:** Next.js 16 App Router, Resend API / SMTP, iCalendar RFC 5545, HTML Email Templates, TypeScript.

---

### Task 1: Thiết Kế Bộ Mẫu Email HTML & Bộ Sinh File Lịch .ics (RFC 5545)

**Files:**
- Create: `src/lib/email-templates.ts`
- Create: `src/lib/calendar-ics.ts`

**Step 1: Tạo bộ sinh file lịch iCalendar `.ics` chuẩn quốc tế**
Hàm `generateICalendar({ title, description, location, date, time, durationMinutes })` tạo chuỗi định dạng text/calendar dùng để đính kèm hoặc tạo link tải thêm lịch vào Apple/Google/Outlook Calendar.

**Step 2: Tạo các mẫu email HTML sang trọng chuẩn LuxeEstate**
- `renderAdminNewBookingEmail(booking, property)`: Gửi cho Admin khi có khách đặt lịch.
- `renderCustomerConfirmationEmail(booking, property)`: Gửi cho khách kèm nút Thêm vào Lịch & địa chỉ đón tiếp.
- `renderCustomerRescheduledEmail(booking, property, newDate, newTime, reason)`: Gửi khi dời lịch.
- `renderCustomerCancelledEmail(booking, property, reason)`: Gửi khi hủy lịch.

---

### Task 2: Xây Dựng Email Service Engine Với Cơ Chế Multi-Provider

**Files:**
- Create: `src/lib/email.ts`
- Modify: `.env.example` (hướng dẫn cấu hình)

**Step 1: Xây dựng hàm `sendEmail({ to, subject, html, icsContent, icsFileName })`**
- Hỗ trợ Provider 1: **Resend API** (gửi qua `https://api.resend.com/emails` với `RESEND_API_KEY`).
- Hỗ trợ Provider 2: **SMTP** (nếu cấu hình `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`).
- Hỗ trợ Provider 3: **Dev Simulation Mode** (nếu chưa cấu hình key, tự động log preview ra console mà không crash, trả về `simulated: true` để giao diện phản hồi thành công).

---

### Task 3: Tích Hợp Gửi Email Vào Các API Nghiệp Vụ

**Files:**
- Modify: `src/app/api/bookings/route.ts` (kích hoạt gửi email cho Admin khi khách submit)
- Modify: `src/app/api/admin/viewings/[id]/route.ts` (kích hoạt gửi email cho Khách khi Admin Confirm, Reschedule, Cancel)
- Create: `src/app/api/admin/test-email/route.ts` (API test cấu hình email từ Admin Settings)

---

### Task 4: Nâng Cấp Giao Diện Admin Settings Cho Phép Kiểm Tra Email

**Files:**
- Modify: `src/app/admin/settings/page.tsx`
Thêm panel "Cấu Hình & Kiểm Tra Email (Email Integration Status)":
- Hiển thị trạng thái kết nối hiện tại (Đã kết nối Resend / Đã kết nối SMTP / Đang chạy Chế độ Mô phỏng Simulation).
- Form gửi email thử nghiệm (Test Email) để kiểm tra hoạt động trực tiếp trên giao diện.

---

### Task 5: Kiểm Thử E2E, Đóng Gói Build & Xuất Bản Vercel

**Files:**
- Test: Chạy build `npm run build`
- Git commit & push
- Deploy Vercel Production
