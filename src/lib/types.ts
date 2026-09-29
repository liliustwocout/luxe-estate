import { StaticImageData } from 'next/image';

export type Property = {
  id: string;
  slug: string;
  title: string;
  location: string;
  address: string;
  price: number;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  parking: number;
  yearBuilt: number;
  images: string[];
  description: string;
  features: string[];
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
  date: string;
  time: string;
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
  minArea?: number;
  maxArea?: number;
};
