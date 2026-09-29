import { properties as initialRentalProperties } from './data';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  avatar?: string;
}

export type PropertyStatus = 'Available' | 'Rented' | 'Draft';

export interface AdminProperty {
  id: string;
  title: string;
  titleVi: string;
  slug: string;
  location: string;
  locationVi: string;
  address: string;
  type: string;
  typeVi: string;
  monthlyRent: number;
  securityDeposit: string;
  securityDepositVi: string;
  availableFrom: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  floor: string;
  floorVi: string;
  furnishing: 'Fully Furnished' | 'Semi-Furnished' | 'Unfurnished';
  furnishingVi: string;
  leaseTerm: string;
  leaseTermVi: string;
  description: string;
  descriptionVi: string;
  amenities: string[];
  amenitiesVi: string[];
  images: string[];
  status: PropertyStatus;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ViewingStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';

export interface ViewingRequest {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertySlug: string;
  propertyLocation: string;
  propertyRent: number;
  propertyImage: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  notes?: string;
  status: ViewingStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  notes?: string;
  viewingCount: number;
  lastViewingDate: string;
  createdAt: string;
}

export interface AdminNotification {
  id: string;
  type: 'new_booking' | 'confirmed' | 'cancelled';
  title: string;
  message: string;
  link: string;
  isRead: boolean;
  createdAt: string;
}

// Global in-memory storage for development and runtime persistence
declare global {
  // eslint-disable-next-line no-var
  var __luxeAdminStore: {
    properties: AdminProperty[];
    viewings: ViewingRequest[];
    customers: Customer[];
    notifications: AdminNotification[];
    initialized: boolean;
  } | undefined;
}

function getInitialStore() {
  const properties: AdminProperty[] = initialRentalProperties.map((p, idx) => ({
    id: p.id,
    title: p.title,
    titleVi: p.titleVi || p.title,
    slug: p.slug,
    location: p.location,
    locationVi: p.locationVi || p.location,
    address: p.address,
    type: p.type,
    typeVi: p.typeVi || p.type,
    monthlyRent: p.monthlyRent || p.price,
    securityDeposit: p.securityDeposit || '2 months rent',
    securityDepositVi: p.securityDepositVi || '2 tháng tiền cọc',
    availableFrom: p.availableFrom || 'Available immediately',
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    area: p.area,
    floor: p.floor || 'Floor 15',
    floorVi: p.floorVi || 'Tầng 15',
    furnishing: (p.furnishing as any) || 'Fully Furnished',
    furnishingVi: p.furnishingVi || 'Đầy đủ nội thất cao cấp',
    leaseTerm: p.leaseTerm || 'Minimum 1 year',
    leaseTermVi: p.leaseTermVi || 'Hợp đồng tối thiểu 1 năm',
    description: p.description,
    descriptionVi: p.descriptionVi || p.description,
    amenities: p.features || [],
    amenitiesVi: p.featuresVi || p.features || [],
    images: p.images,
    status: idx === 1 ? 'Rented' : idx === 6 ? 'Draft' : 'Available',
    featured: p.featured,
    createdAt: new Date(Date.now() - (idx + 1) * 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - idx * 86400000).toISOString(),
  }));

  const customers: Customer[] = [
    {
      id: 'cust-1',
      name: 'Nguyễn Văn An',
      phone: '0901234567',
      email: 'an.nguyen@vinacapital.com',
      notes: 'Khách VIP tìm penthouse Tây Hồ, dự kiến chuyển vào tháng 10.',
      viewingCount: 3,
      lastViewingDate: '2026-09-29',
      createdAt: '2026-09-10T08:30:00Z',
    },
    {
      id: 'cust-2',
      name: 'Trần Minh Bình',
      phone: '0918889999',
      email: 'minhbinh.tran@techcombank.com.vn',
      notes: 'Quan tâm biệt thự Thảo Điền có hồ bơi riêng cho gia đình 4 người.',
      viewingCount: 2,
      lastViewingDate: '2026-09-29',
      createdAt: '2026-09-15T10:00:00Z',
    },
    {
      id: 'cust-3',
      name: 'Alexandre Dupont',
      phone: '0933445566',
      email: 'a.dupont@embassy-france.org',
      notes: 'Chuyên gia đại sứ quán Pháp, cần hợp đồng thuê công ty xuất VAT.',
      viewingCount: 1,
      lastViewingDate: '2026-09-30',
      createdAt: '2026-09-20T14:20:00Z',
    },
    {
      id: 'cust-4',
      name: 'Lê Hoàng Nam',
      phone: '0988776655',
      email: 'nam.le@vng.com.vn',
      notes: 'Giám đốc công nghệ tìm duplex view Landmark 81.',
      viewingCount: 2,
      lastViewingDate: '2026-09-28',
      createdAt: '2026-09-05T09:15:00Z',
    },
    {
      id: 'cust-5',
      name: 'Phạm Thu Hương',
      phone: '0909998877',
      email: 'huong.pham@investor.vn',
      notes: 'Tìm căn hộ 3 phòng ngủ đầy đủ nội thất tại Ba Đình.',
      viewingCount: 1,
      lastViewingDate: '2026-09-27',
      createdAt: '2026-09-22T11:45:00Z',
    },
    {
      id: 'cust-6',
      name: 'Marcus Weber',
      phone: '0945678901',
      email: 'm.weber@siemens.de',
      notes: 'Quản lý dự án Siemens, cần căn hộ yên tĩnh gần Hồ Tây.',
      viewingCount: 1,
      lastViewingDate: '2026-10-02',
      createdAt: '2026-09-25T16:00:00Z',
    },
  ];

  const viewings: ViewingRequest[] = [
    {
      id: 'view-1',
      propertyId: properties[0]?.id || '1',
      propertyTitle: 'Lumina Residence Tây Hồ',
      propertySlug: 'lumina-residence-west-lake',
      propertyLocation: 'Quảng An, Tây Hồ, Hà Nội',
      propertyRent: 1200,
      propertyImage: properties[0]?.images[0] || '',
      customerId: 'cust-1',
      customerName: 'Nguyễn Văn An',
      customerPhone: '0901234567',
      customerEmail: 'an.nguyen@vinacapital.com',
      date: '2026-09-29',
      time: '14:00',
      notes: 'Khách muốn xem căn tầng cao ngắm hoàng hôn Hồ Tây.',
      status: 'Pending',
      createdAt: '2026-09-29T07:15:00Z',
      updatedAt: '2026-09-29T07:15:00Z',
    },
    {
      id: 'view-2',
      propertyId: properties[2]?.id || '3',
      propertyTitle: 'Biệt Thự Ven Sông Thảo Điền',
      propertySlug: 'luxury-riverside-villa',
      propertyLocation: 'Thảo Điền, TP. Thủ Đức',
      propertyRent: 3500,
      propertyImage: properties[2]?.images[0] || '',
      customerId: 'cust-2',
      customerName: 'Trần Minh Bình',
      customerPhone: '0918889999',
      customerEmail: 'minhbinh.tran@techcombank.com.vn',
      date: '2026-09-29',
      time: '16:00',
      notes: 'Gia đình cùng đi xem hồ bơi và khu vườn nhiệt đới.',
      status: 'Confirmed',
      createdAt: '2026-09-28T10:30:00Z',
      updatedAt: '2026-09-28T14:00:00Z',
    },
    {
      id: 'view-3',
      propertyId: properties[1]?.id || '2',
      propertyTitle: 'The Metropolitan Duplex Penthouse',
      propertySlug: 'the-metropolitan-penthouse',
      propertyLocation: 'Bến Nghé, Quận 1, TP. HCM',
      propertyRent: 2500,
      propertyImage: properties[1]?.images[0] || '',
      customerId: 'cust-3',
      customerName: 'Alexandre Dupont',
      customerPhone: '0933445566',
      customerEmail: 'a.dupont@embassy-france.org',
      date: '2026-09-30',
      time: '10:30',
      notes: 'Cần kiểm tra tiện ích an ninh và thang máy riêng.',
      status: 'Pending',
      createdAt: '2026-09-29T08:00:00Z',
      updatedAt: '2026-09-29T08:00:00Z',
    },
    {
      id: 'view-4',
      propertyId: properties[3]?.id || '4',
      propertyTitle: 'Skyline Executive Apartment',
      propertySlug: 'skyline-executive-apartment',
      propertyLocation: 'Bình Thạnh, TP. HCM',
      propertyRent: 1500,
      propertyImage: properties[3]?.images[0] || '',
      customerId: 'cust-4',
      customerName: 'Lê Hoàng Nam',
      customerPhone: '0988776655',
      customerEmail: 'nam.le@vng.com.vn',
      date: '2026-09-28',
      time: '15:00',
      notes: 'Khách đã xem xong và rất hài lòng, đang đợi thương lượng điều khoản.',
      status: 'Completed',
      createdAt: '2026-09-26T09:00:00Z',
      updatedAt: '2026-09-28T16:30:00Z',
    },
    {
      id: 'view-5',
      propertyId: properties[4]?.id || '5',
      propertyTitle: 'Serene Garden Townhouse',
      propertySlug: 'serene-garden-townhouse',
      propertyLocation: 'Ba Đình, Hà Nội',
      propertyRent: 2000,
      propertyImage: properties[4]?.images[0] || '',
      customerId: 'cust-5',
      customerName: 'Phạm Thu Hương',
      customerPhone: '0909998877',
      customerEmail: 'huong.pham@investor.vn',
      date: '2026-09-27',
      time: '11:00',
      notes: 'Khách bận lịch công tác đột xuất, hủy hẹn xem nhà.',
      status: 'Cancelled',
      createdAt: '2026-09-25T14:10:00Z',
      updatedAt: '2026-09-27T08:00:00Z',
    },
    {
      id: 'view-6',
      propertyId: properties[5]?.id || '6',
      propertyTitle: 'Lakeview Studio Loft',
      propertySlug: 'lakeview-studio-loft',
      propertyLocation: 'Tây Hồ, Hà Nội',
      propertyRent: 750,
      propertyImage: properties[5]?.images[0] || '',
      customerId: 'cust-6',
      customerName: 'Marcus Weber',
      customerPhone: '0945678901',
      customerEmail: 'm.weber@siemens.de',
      date: '2026-10-02',
      time: '09:00',
      notes: 'Khách nước ngoài đi cùng trợ lý.',
      status: 'Confirmed',
      createdAt: '2026-09-28T16:20:00Z',
      updatedAt: '2026-09-29T06:00:00Z',
    },
    {
      id: 'view-7',
      propertyId: properties[0]?.id || '1',
      propertyTitle: 'Lumina Residence Tây Hồ',
      propertySlug: 'lumina-residence-west-lake',
      propertyLocation: 'Quảng An, Tây Hồ, Hà Nội',
      propertyRent: 1200,
      propertyImage: properties[0]?.images[0] || '',
      customerId: 'cust-4',
      customerName: 'Lê Hoàng Nam',
      customerPhone: '0988776655',
      customerEmail: 'nam.le@vng.com.vn',
      date: '2026-10-03',
      time: '14:30',
      notes: 'Xem thêm phương án căn hộ Tây Hồ để so sánh.',
      status: 'Pending',
      createdAt: '2026-09-29T09:10:00Z',
      updatedAt: '2026-09-29T09:10:00Z',
    },
  ];

  const notifications: AdminNotification[] = [
    {
      id: 'notif-1',
      type: 'new_booking',
      title: 'Yêu cầu xem nhà mới',
      message: 'Nguyễn Văn An vừa đặt lịch xem Lumina Residence Tây Hồ.',
      link: '/admin/viewings/view-1',
      isRead: false,
      createdAt: '2026-09-29T07:15:00Z',
    },
    {
      id: 'notif-2',
      type: 'new_booking',
      title: 'Yêu cầu xem nhà mới',
      message: 'Alexandre Dupont vừa đặt lịch xem The Metropolitan Duplex Penthouse.',
      link: '/admin/viewings/view-3',
      isRead: false,
      createdAt: '2026-09-29T08:00:00Z',
    },
    {
      id: 'notif-3',
      type: 'confirmed',
      title: 'Lịch xem nhà sắp diễn ra',
      message: 'Lịch xem nhà cùng Trần Minh Bình lúc 16:00 chiều nay.',
      link: '/admin/viewings/view-2',
      isRead: false,
      createdAt: '2026-09-29T08:30:00Z',
    },
  ];

  return { properties, viewings, customers, notifications, initialized: true };
}

if (!globalThis.__luxeAdminStore) {
  globalThis.__luxeAdminStore = getInitialStore();
}

export const adminStore = globalThis.__luxeAdminStore;

// Helpers
export function getAdminProperties(): AdminProperty[] {
  return adminStore.properties;
}

export function getAdminPropertyById(id: string): AdminProperty | undefined {
  return adminStore.properties.find((p) => p.id === id);
}

export function addAdminProperty(data: Omit<AdminProperty, 'id' | 'createdAt' | 'updatedAt'>): AdminProperty {
  const newProp: AdminProperty = {
    ...data,
    id: `prop-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  adminStore.properties.unshift(newProp);
  return newProp;
}

export function updateAdminProperty(id: string, updates: Partial<AdminProperty>): AdminProperty | null {
  const idx = adminStore.properties.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  adminStore.properties[idx] = {
    ...adminStore.properties[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  return adminStore.properties[idx];
}

export function deleteAdminProperty(id: string): boolean {
  const initialLength = adminStore.properties.length;
  adminStore.properties = adminStore.properties.filter((p) => p.id !== id);
  return adminStore.properties.length < initialLength;
}

export function getViewings(): ViewingRequest[] {
  return adminStore.viewings;
}

export function getViewingById(id: string): ViewingRequest | undefined {
  return adminStore.viewings.find((v) => v.id === id);
}

export function updateViewingStatus(
  id: string,
  status: ViewingStatus,
  notes?: string,
  appointmentDate?: string,
  appointmentTime?: string
): ViewingRequest | null {
  const idx = adminStore.viewings.findIndex((v) => v.id === id);
  if (idx === -1) return null;
  adminStore.viewings[idx] = {
    ...adminStore.viewings[idx],
    status,
    notes: notes !== undefined ? notes : adminStore.viewings[idx].notes,
    date: appointmentDate !== undefined && appointmentDate !== '' ? appointmentDate : adminStore.viewings[idx].date,
    time: appointmentTime !== undefined && appointmentTime !== '' ? appointmentTime : adminStore.viewings[idx].time,
    updatedAt: new Date().toISOString(),
  };

  // Add notification
  adminStore.notifications.unshift({
    id: `notif-${Date.now()}`,
    type: status === 'Confirmed' ? 'confirmed' : status === 'Cancelled' ? 'cancelled' : 'new_booking',
    title: `Lịch hẹn #${id} đã cập nhật`,
    message: `Trạng thái mới: ${status}`,
    link: `/admin/viewings/${id}`,
    isRead: false,
    createdAt: new Date().toISOString(),
  });

  return adminStore.viewings[idx];
}

export function rescheduleViewing(id: string, date: string, time: string): ViewingRequest | null {
  const idx = adminStore.viewings.findIndex((v) => v.id === id);
  if (idx === -1) return null;
  adminStore.viewings[idx] = {
    ...adminStore.viewings[idx],
    date,
    time,
    updatedAt: new Date().toISOString(),
  };
  return adminStore.viewings[idx];
}

export function addViewingFromCustomer(data: {
  propertyId: string;
  propertyTitle: string;
  customerName: string;
  phone: string;
  email?: string;
  date?: string;
  time?: string;
  message?: string;
}): ViewingRequest {
  const prop = adminStore.properties.find((p) => p.id === data.propertyId || p.title === data.propertyTitle) || adminStore.properties[0];
  
  // Find or create customer
  let customer = adminStore.customers.find((c) => c.phone === data.phone);
  if (!customer) {
    customer = {
      id: `cust-${Date.now()}`,
      name: data.customerName,
      phone: data.phone,
      email: data.email || '',
      notes: data.message || '',
      viewingCount: 1,
      lastViewingDate: data.date || new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
    };
    adminStore.customers.unshift(customer);
  } else {
    customer.viewingCount += 1;
    customer.lastViewingDate = data.date || new Date().toISOString().split('T')[0];
  }

  const viewing: ViewingRequest = {
    id: `view-${Date.now().toString().slice(-6)}`,
    propertyId: prop.id,
    propertyTitle: prop.titleVi || prop.title,
    propertySlug: prop.slug,
    propertyLocation: prop.locationVi || prop.location,
    propertyRent: prop.monthlyRent,
    propertyImage: prop.images[0] || '',
    customerId: customer.id,
    customerName: data.customerName,
    customerPhone: data.phone,
    customerEmail: data.email || customer.email || '',
    date: data.date || '',
    time: data.time || '',
    notes: data.message,
    status: 'Pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  adminStore.viewings.unshift(viewing);

  // Add unread notification
  adminStore.notifications.unshift({
    id: `notif-${Date.now()}`,
    type: 'new_booking',
    title: 'Yêu cầu xem nhà mới',
    message: `${data.customerName} vừa đặt lịch xem ${viewing.propertyTitle}.`,
    link: `/admin/viewings/${viewing.id}`,
    isRead: false,
    createdAt: new Date().toISOString(),
  });

  return viewing;
}

export function getCustomers(): Customer[] {
  return adminStore.customers;
}

export function getCustomerById(id: string): Customer | undefined {
  return adminStore.customers.find((c) => c.id === id);
}

export function getCustomerViewings(customerId: string): ViewingRequest[] {
  return adminStore.viewings.filter((v) => v.customerId === customerId);
}

export function getNotifications(): AdminNotification[] {
  return adminStore.notifications;
}

export function markNotificationAsRead(id: string) {
  const notif = adminStore.notifications.find((n) => n.id === id);
  if (notif) notif.isRead = true;
}

export function markAllNotificationsAsRead() {
  adminStore.notifications.forEach((n) => (n.isRead = true));
}
