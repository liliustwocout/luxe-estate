# 03 — Tài Liệu Tham Chiếu API (RESTful API Specification)

Tài liệu này cung cấp đặc tả chi tiết toàn bộ các điểm cuối API (Endpoints) của hệ thống **LuxeEstate**, bao gồm phương thức HTTP, cấu trúc Header, tham số truy vấn (Query Parameters), định dạng Payload đầu vào và phản hồi mẫu chuẩn JSON.

---

## 1. Quy Chuẩn Kỹ Thuật Chung (General Specifications)

* **Base URL Production:** `https://luxury-estate-self.vercel.app`
* **Base URL Local:** `http://localhost:3000`
* **Content-Type:** `application/json; charset=utf-8`
* **Mã Trạng Thái Chuẩn (HTTP Status Codes):**
  * `200 OK`: Yêu cầu thành công, trả về dữ liệu.
  * `201 Created`: Tạo mới tài nguyên thành công.
  * `400 Bad Request`: Thiếu trường bắt buộc hoặc dữ liệu không hợp lệ.
  * `401 Unauthorized`: Chưa đăng nhập hoặc phiên làm việc đã hết hạn.
  * `404 Not Found`: Không tìm thấy tài nguyên tương ứng.
  * `500 Internal Server Error`: Lỗi xử lý từ máy chủ.

---

## 2. Điểm Cuối Dành Cho Khách Hàng (Public Customer APIs)

### 2.1. Đặt Lịch Đi Xem Nhà (Book a Viewing)
Khách hàng ngoài website gửi thông tin đặt lịch tham quan căn hộ. Hệ thống sẽ tự động tạo hồ sơ khách hàng (nếu chưa có), ghi nhận lịch hẹn và đẩy thông báo tới Admin Portal.

* **Endpoint:** `POST /api/bookings`
* **Quyền truy cập:** Công khai (Public, không yêu cầu Token).
* **Request Headers:**
  ```http
  Content-Type: application/json
  ```
* **Request Body:**
  ```json
  {
    "propertyId": "1",
    "name": "Nguyễn Văn An",
    "phone": "0901234567",
    "email": "an.nguyen@vinacapital.com",
    "date": "2026-09-29",
    "time": "14:00",
    "message": "Cần xem nhà vào buổi chiều, gia đình có xe hơi cần xem chỗ đậu xe."
  }
  ```
* **Chi Tiết Các Trường:**
  | Trường | Kiểu Dữ Liệu | Bắt Buộc | Mô Tả |
  | :--- | :--- | :--- | :--- |
  | `propertyId` | String | Có | ID hoặc Slug của bất động sản khách muốn xem |
  | `name` | String | Có | Họ và tên khách hàng |
  | `phone` | String | Có | Số điện thoại liên hệ (10-11 chữ số) |
  | `email` | String | Không | Email của khách hàng |
  | `date` | String | Có | Ngày hẹn tham quan (Định dạng YYYY-MM-DD) |
  | `time` | String | Có | Khung giờ hẹn (Ví dụ: `14:00`) |
  | `message` | String | Không | Ghi chú hoặc yêu cầu đặc biệt |

* **Response Success (200 OK):**
  ```json
  {
    "success": true,
    "message": "Viewing booked successfully",
    "data": {
      "bookingId": "view-1727618400000",
      "propertyId": "1",
      "customerName": "Nguyễn Văn An",
      "appointment": {
        "date": "2026-09-29",
        "time": "14:00"
      },
      "status": "pending",
      "createdAt": "2026-09-29T07:00:00.000Z"
    }
  }
  ```

---

## 3. Điểm Cuối Dành Cho Quản Trị Viên (Admin APIs)

> [!NOTE]
> Mọi yêu cầu tới các API phân hệ `/api/admin/*` đều yêu cầu xác thực phiên quản trị viên thông qua Cookie `luxe_admin_session=active` hoặc tiêu đề xác thực tương ứng.

---

### 3.1. Quản Lý Bất Động Sản (Properties APIs)

#### A. Lấy Danh Sách Bất Động Sản
* **Endpoint:** `GET /api/admin/properties`
* **Query Parameters:**
  * `search` (String, tùy chọn): Tìm kiếm theo tên căn hộ hoặc địa điểm.
  * `status` (String, tùy chọn): Lọc theo trạng thái (`all`, `available`, `rented`, `draft`).
  * `type` (String, tùy chọn): Lọc theo loại hình (`apartment`, `penthouse`, `villa`, `loft`).
* **Response (200 OK):**
  ```json
  {
    "success": true,
    "total": 6,
    "properties": [
      {
        "id": "1",
        "title": "Lumina Residence Tây Hồ",
        "slug": "lumina-residence-tay-ho",
        "location": "Quảng An, Tây Hồ, Hà Nội",
        "type": "Căn Hộ Cao Cấp",
        "monthlyRent": 1200,
        "bedrooms": 2,
        "bathrooms": 2,
        "area": 115,
        "status": "available",
        "isPublished": true,
        "coverImage": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        "viewingCount": 12,
        "createdAt": "2026-09-01T00:00:00.000Z"
      }
    ]
  }
  ```

#### B. Thêm Mới Bất Động Sản
* **Endpoint:** `POST /api/admin/properties`
* **Request Body:**
  ```json
  {
    "title": "Sky Villa Serenity Saigon",
    "location": "Thảo Điền, TP. Thủ Đức",
    "address": "12 Đường Song Hành, Thảo Điền",
    "type": "Penthouse",
    "monthlyRent": 3200,
    "deposit": "3 tháng tiền thuê",
    "availableFrom": "Dọn vào ngay",
    "bedrooms": 4,
    "bathrooms": 4,
    "area": 280,
    "floor": "32",
    "furnishing": "fully",
    "description": "Penthouse với sân vườn riêng và hồ bơi vô cực view trực diện sông Sài Gòn.",
    "amenities": ["Bể Bơi Riêng", "Sân Vườn", "Phòng Gym", "Bảo Vệ 24/7"],
    "images": [
      { "id": "img-1", "url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200", "isCover": true },
      { "id": "img-2", "url": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200", "isCover": false }
    ],
    "isPublished": true
  }
  ```
* **Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "Property created successfully",
    "property": { "id": "prop-1727618999", "title": "Sky Villa Serenity Saigon", ... }
  }
  ```

#### C. Lấy Chi Tiết Bất Động Sản
* **Endpoint:** `GET /api/admin/properties/[id]`
* **Response (200 OK):** Trả về đối tượng Property hoàn chỉnh bao gồm danh sách ảnh, tiện ích và số lượt khách đã đặt lịch.

#### D. Cập Nhật Bất Động Sản
* **Endpoint:** `PUT /api/admin/properties/[id]`
* **Request Body:** Truyền các trường cần cập nhật (Hỗ trợ Partial Update):
  ```json
  {
    "status": "rented",
    "monthlyRent": 3500
  }
  ```
* **Response (200 OK):** Trả về đối tượng sau khi đã cập nhật thành công.

#### E. Xóa Bất Động Sản
* **Endpoint:** `DELETE /api/admin/properties/[id]`
* **Response (200 OK):**
  ```json
  { "success": true, "message": "Property deleted successfully" }
  ```

---

### 3.2. Quản Lý Lịch Hẹn Xem Nhà (Viewing Requests APIs)

#### A. Lấy Danh Sách Lịch Hẹn
* **Endpoint:** `GET /api/admin/viewings`
* **Query Parameters:**
  * `status`: `all` | `pending` | `confirmed` | `completed` | `cancelled`
  * `date`: `YYYY-MM-DD` (Lọc theo một ngày cụ thể trên Calendar)
  * `search`: Tìm theo tên khách hàng, số điện thoại hoặc tên BĐS.
* **Response (200 OK):**
  ```json
  {
    "success": true,
    "total": 7,
    "viewings": [
      {
        "id": "view-1",
        "customer": {
          "id": "cust-1",
          "name": "Nguyễn Văn An",
          "phone": "0901234567",
          "email": "an.nguyen@vinacapital.com"
        },
        "property": {
          "id": "1",
          "title": "Lumina Residence Tây Hồ",
          "location": "Quảng An, Tây Hồ, Hà Nội",
          "monthlyRent": 1200
        },
        "appointment": {
          "date": "2026-09-29",
          "time": "14:00"
        },
        "status": "pending",
        "message": "Muốn xem kỹ hướng ban công và chỗ đậu xe.",
        "createdAt": "2026-09-28T09:30:00.000Z"
      }
    ]
  }
  ```

#### B. Cập Nhật Trạng Thái & Dời Lịch Hẹn
* **Endpoint:** `PUT /api/admin/viewings/[id]`
* **Request Body 1 (Xác nhận lịch):**
  ```json
  {
    "status": "confirmed"
  }
  ```
* **Request Body 2 (Dời lịch hẹn - Reschedule):**
  ```json
  {
    "status": "confirmed",
    "date": "2026-09-30",
    "time": "16:30",
    "notes": "Khách xin dời sang ngày 30 do bận công tác đột xuất."
  }
  ```
* **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Viewing request updated successfully",
    "viewing": { ... }
  }
  ```

---

### 3.3. Quản Lý Khách Hàng (Customers APIs)

#### A. Lấy Danh Bạ Khách Hàng
* **Endpoint:** `GET /api/admin/customers`
* **Query Parameters:**
  * `search` (String): Tìm theo họ tên, số điện thoại hoặc email.
* **Response (200 OK):**
  ```json
  {
    "success": true,
    "total": 6,
    "customers": [
      {
        "id": "cust-1",
        "name": "Nguyễn Văn An",
        "phone": "0901234567",
        "email": "an.nguyen@vinacapital.com",
        "viewingCount": 3,
        "lastViewingDate": "2026-09-29",
        "notes": "Khách VIP tìm penthouse Tây Hồ, dự kiến chuyển vào tháng 10.",
        "createdAt": "2026-09-10T08:00:00.000Z"
      }
    ]
  }
  ```

#### B. Lấy Hồ Sơ Khách Hàng & Toàn Bộ Lịch Sử Xem Nhà
* **Endpoint:** `GET /api/admin/customers/[id]`
* **Response (200 OK):**
  ```json
  {
    "success": true,
    "customer": {
      "id": "cust-1",
      "name": "Nguyễn Văn An",
      "phone": "0901234567",
      "email": "an.nguyen@vinacapital.com",
      "notes": "Khách VIP tìm penthouse Tây Hồ, dự kiến chuyển vào tháng 10.",
      "createdAt": "2026-09-10T08:00:00.000Z"
    },
    "viewingHistory": [
      {
        "id": "view-1",
        "propertyTitle": "Lumina Residence Tây Hồ",
        "propertyLocation": "Quảng An, Tây Hồ, Hà Nội",
        "date": "2026-09-29",
        "time": "14:00",
        "status": "pending"
      },
      {
        "id": "view-past-1",
        "propertyTitle": "Biệt Thự Vườn Ba Đình",
        "propertyLocation": "Liễu Giai, Ba Đình, Hà Nội",
        "date": "2026-09-15",
        "time": "16:00",
        "status": "completed"
      }
    ]
  }
  ```

---

### 3.4. Quản Lý Thông Báo Chuông (Notifications APIs)

#### A. Lấy Danh Sách Thông Báo
* **Endpoint:** `GET /api/admin/notifications`
* **Response (200 OK):**
  ```json
  {
    "success": true,
    "unreadCount": 3,
    "notifications": [
      {
        "id": "notif-1",
        "title": "Yêu cầu xem nhà mới",
        "message": "Khách hàng Nguyễn Văn An vừa đặt lịch xem căn Lumina Residence Tây Hồ",
        "type": "viewing_request",
        "targetUrl": "/admin/viewings/view-1",
        "isRead": false,
        "createdAt": "2026-09-29T06:55:00.000Z"
      }
    ]
  }
  ```

#### B. Đánh Dấu Đã Đọc Thông Báo
* **Endpoint:** `PUT /api/admin/notifications`
* **Request Body:**
  ```json
  {
    "id": "notif-1",
    "markAll": false
  }
  ```
* **Response (200 OK):**
  ```json
  {
    "success": true,
    "unreadCount": 2
  }
  ```
