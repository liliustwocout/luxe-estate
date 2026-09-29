import { StaticImageData } from 'next/image';

export type Property = {
  id: string;
  slug: string;
  title: string;
  titleVi?: string;
  location: string;
  locationVi?: string;
  address: string;
  addressVi?: string;
  price: number; // Monthly rent in USD (e.g. 1200)
  monthlyRent: number; // Monthly rent in USD
  securityDeposit?: string; // e.g. '$2,400 (2 months)'
  securityDepositVi?: string; // e.g. '2 tháng tiền cọc'
  availableFrom?: string; // e.g. 'Available Now'
  availableFromVi?: string; // e.g. 'Còn trống ngay'
  isAvailable?: boolean;
  furnishing: 'Fully Furnished' | 'Semi-Furnished' | 'Unfurnished';
  furnishingVi: string; // e.g. 'Đầy đủ nội thất cao cấp'
  floor?: string; // e.g. 'Floor 28'
  floorVi?: string; // e.g. 'Tầng 28'
  leaseTerm?: string; // e.g. 'Min. 1 year'
  leaseTermVi?: string; // e.g. 'Hợp đồng tối thiểu 1 năm'
  petFriendly?: boolean;
  type: string;
  typeVi?: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  parking: number;
  yearBuilt: number;
  images: string[];
  description: string;
  descriptionVi?: string;
  features: string[];
  featuresVi?: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
  featured: boolean;
};

export type ViewingRequest = {
  id: string;
  propertyId: string;
  propertyTitle: string;
  customerName: string;
  phone: string;
  email?: string;
  date?: string;
  time?: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: Date;
};

export type PropertyFilterParams = {
  location?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  minArea?: number;
  maxArea?: number;
  furnishing?: string;
  availability?: string;
};
