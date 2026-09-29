import { Property } from './types';

export const properties: Property[] = [
  {
    id: '1',
    slug: 'luxury-riverside-villa',
    title: 'Luxury Riverside Villa',
    location: 'Thao Dien, Ho Chi Minh City',
    address: '28 Xuan Thuy, Thao Dien, Thu Duc, Ho Chi Minh City',
    price: 850000,
    type: 'Villa',
    bedrooms: 5,
    bathrooms: 4,
    area: 420,
    parking: 3,
    yearBuilt: 2023,
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
    ],
    description:
      'An extraordinary riverside villa offering panoramic water views and resort-style living. This architectural masterpiece features soaring ceilings, floor-to-ceiling windows, and seamless indoor-outdoor flow. The gourmet kitchen, private infinity pool, and lush tropical gardens create an unparalleled living experience in the heart of Thao Dien.',
    features: [
      'Swimming Pool',
      'Private Garden',
      'Smart Home',
      'Parking Garage',
      '24/7 Security',
      'Air Conditioning',
      'River View',
      'Fully Furnished',
      'Home Theater',
      'Wine Cellar',
    ],
    coordinates: { lat: 10.8031, lng: 106.7339 },
    featured: true,
  },
  {
    id: '2',
    slug: 'the-metropolitan-penthouse',
    title: 'The Metropolitan Penthouse',
    location: 'District 1, Ho Chi Minh City',
    address: '2 Hai Trieu, Ben Nghe, District 1, Ho Chi Minh City',
    price: 1200000,
    type: 'Penthouse',
    bedrooms: 4,
    bathrooms: 3,
    area: 310,
    parking: 2,
    yearBuilt: 2024,
    images: [
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80',
    ],
    description:
      'Perched atop one of District 1\'s most prestigious towers, this duplex penthouse commands breathtaking 360-degree views of the Saigon skyline. Designed by an award-winning architect, every detail — from the imported Italian marble to the custom millwork — speaks to an uncompromising standard of luxury.',
    features: [
      'Rooftop Terrace',
      'Private Elevator',
      'Smart Home',
      'Concierge Service',
      '24/7 Security',
      'Air Conditioning',
      'City View',
      'Fully Furnished',
      'Gym Access',
      'Sky Lounge',
    ],
    coordinates: { lat: 10.7721, lng: 106.7037 },
    featured: true,
  },
  {
    id: '3',
    slug: 'zen-garden-townhouse',
    title: 'Zen Garden Townhouse',
    location: 'An Phu, Ho Chi Minh City',
    address: '15 Song Hanh, An Phu, Thu Duc, Ho Chi Minh City',
    price: 520000,
    type: 'Townhouse',
    bedrooms: 4,
    bathrooms: 3,
    area: 240,
    parking: 2,
    yearBuilt: 2022,
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6981cf81f0?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=1200&q=80',
    ],
    description:
      'A harmonious blend of Japanese-inspired minimalism and Vietnamese warmth. This townhouse wraps around a central zen garden, flooding every room with natural light and greenery. The open-plan living area flows through sliding glass walls to a private courtyard — ideal for families seeking tranquility without leaving the city.',
    features: [
      'Zen Garden',
      'Courtyard',
      'Smart Home',
      'Parking',
      '24/7 Security',
      'Air Conditioning',
      'Balcony',
      'Semi-Furnished',
    ],
    coordinates: { lat: 10.7955, lng: 106.7413 },
    featured: true,
  },
  {
    id: '4',
    slug: 'skyline-modern-apartment',
    title: 'Skyline Modern Apartment',
    location: 'Binh Thanh, Ho Chi Minh City',
    address: '90 Nguyen Huu Canh, Ward 22, Binh Thanh, Ho Chi Minh City',
    price: 320000,
    type: 'Apartment',
    bedrooms: 3,
    bathrooms: 2,
    area: 145,
    parking: 1,
    yearBuilt: 2024,
    images: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80',
      'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=1200&q=80',
      'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1200&q=80',
    ],
    description:
      'High above the Saigon River, this sleek three-bedroom apartment combines clean Scandinavian lines with warm tropical materials. Floor-to-ceiling windows frame golden sunsets, while the open kitchen island becomes the social heart of the home. Residents enjoy a sky pool, co-working lounge, and rooftop running track.',
    features: [
      'Sky Pool',
      'Gym',
      'Smart Home',
      'Parking',
      '24/7 Security',
      'Air Conditioning',
      'River View',
      'Co-working Space',
    ],
    coordinates: { lat: 10.7952, lng: 106.7183 },
    featured: true,
  },
  {
    id: '5',
    slug: 'colonial-heritage-villa',
    title: 'Colonial Heritage Villa',
    location: 'District 3, Ho Chi Minh City',
    address: '45 Vo Van Tan, Ward 6, District 3, Ho Chi Minh City',
    price: 1800000,
    type: 'Villa',
    bedrooms: 6,
    bathrooms: 5,
    area: 580,
    parking: 4,
    yearBuilt: 1945,
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    ],
    description:
      'A rare opportunity to own a piece of Saigon history. This meticulously restored French colonial villa sits on a tree-lined boulevard in District 3. Original mosaic floors, arched doorways, and plantation shutters blend with modern comforts including a chef\'s kitchen and climate-controlled wine room. The mature garden with century-old banyan trees provides unmatched privacy.',
    features: [
      'Heritage Architecture',
      'Mature Garden',
      'Wine Room',
      'Parking',
      'Security System',
      'Air Conditioning',
      'Library',
      'Staff Quarters',
      'Outdoor Dining',
      'Fountain',
    ],
    coordinates: { lat: 10.7805, lng: 106.6902 },
    featured: true,
  },
  {
    id: '6',
    slug: 'minimalist-loft-studio',
    title: 'Minimalist Loft Studio',
    location: 'District 2, Ho Chi Minh City',
    address: '18 Tran Nao, An Khanh, Thu Duc, Ho Chi Minh City',
    price: 185000,
    type: 'Apartment',
    bedrooms: 1,
    bathrooms: 1,
    area: 68,
    parking: 1,
    yearBuilt: 2025,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
      'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
    ],
    description:
      'A double-height loft designed for the modern creative professional. Raw concrete ceilings meet warm oak floors, and a mezzanine bedroom overlooks the open living space below. The industrial-chic kitchen features a waterfall quartz island, and the private balcony is large enough for morning yoga. Perfect as a pied-à-terre or investment property.',
    features: [
      'Double Height Ceiling',
      'Mezzanine',
      'Balcony',
      'Parking',
      'Security',
      'Air Conditioning',
      'Gym Access',
      'Rooftop Pool',
    ],
    coordinates: { lat: 10.7885, lng: 106.7387 },
    featured: false,
  },
  {
    id: '7',
    slug: 'lakeside-contemporary-home',
    title: 'Lakeside Contemporary Home',
    location: 'District 9, Ho Chi Minh City',
    address: '7 Lakeview Boulevard, District 9, Ho Chi Minh City',
    price: 680000,
    type: 'House',
    bedrooms: 4,
    bathrooms: 3,
    area: 320,
    parking: 2,
    yearBuilt: 2023,
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
    ],
    description:
      'Set on the banks of a private lake in the city\'s newest master-planned community, this contemporary home is built for indoor-outdoor living. A cantilevered deck stretches over the water, the living room opens entirely to the garden, and a detached art studio provides a quiet creative retreat. Cycling paths and international schools are minutes away.',
    features: [
      'Lake View',
      'Private Garden',
      'Art Studio',
      'Parking',
      'Community Pool',
      'Air Conditioning',
      'BBQ Area',
      'Smart Home',
      'Cycling Paths',
      'Playground',
    ],
    coordinates: { lat: 10.8413, lng: 106.8293 },
    featured: true,
  },
  {
    id: '8',
    slug: 'ocean-breeze-penthouse',
    title: 'Ocean Breeze Penthouse',
    location: 'Vung Tau City',
    address: '12 Tran Phu, Ward 1, Vung Tau City',
    price: 950000,
    type: 'Penthouse',
    bedrooms: 3,
    bathrooms: 3,
    area: 280,
    parking: 2,
    yearBuilt: 2024,
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80',
    ],
    description:
      'Wake up to the sound of waves in this beachfront penthouse with unobstructed views of the East Sea. The wraparound terrace is ideal for sunset entertaining, while the spa-inspired master bath features a freestanding soaking tub overlooking the ocean. A private beach elevator provides direct sand access — the ultimate coastal luxury.',
    features: [
      'Ocean View',
      'Wraparound Terrace',
      'Private Beach Access',
      'Parking',
      '24/7 Security',
      'Air Conditioning',
      'Spa Bathroom',
      'Fully Furnished',
      'Beach Elevator',
      'Infinity Pool',
    ],
    coordinates: { lat: 10.3460, lng: 107.0843 },
    featured: false,
  },
];

export const locations = [
  'All Locations',
  'District 1, Ho Chi Minh City',
  'District 2, Ho Chi Minh City',
  'District 3, Ho Chi Minh City',
  'District 9, Ho Chi Minh City',
  'Binh Thanh, Ho Chi Minh City',
  'Thao Dien, Ho Chi Minh City',
  'An Phu, Ho Chi Minh City',
  'Vung Tau City',
];

export const propertyTypes = [
  'All Types',
  'Villa',
  'Apartment',
  'Penthouse',
  'Townhouse',
  'House',
];

export const priceRanges = [
  { label: 'Any Price', min: 0, max: Infinity },
  { label: 'Under $300K', min: 0, max: 300000 },
  { label: '$300K – $500K', min: 300000, max: 500000 },
  { label: '$500K – $800K', min: 500000, max: 800000 },
  { label: '$800K – $1.2M', min: 800000, max: 1200000 },
  { label: 'Over $1.2M', min: 1200000, max: Infinity },
];

export const bedroomOptions = [
  { label: 'Any', value: 0 },
  { label: '1+', value: 1 },
  { label: '2+', value: 2 },
  { label: '3+', value: 3 },
  { label: '4+', value: 4 },
  { label: '5+', value: 5 },
];

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function getFeaturedProperties(): Property[] {
  return properties.filter((p) => p.featured);
}

export function filterProperties(filters: {
  location?: string;
  type?: string;
  priceRange?: { min: number; max: number };
  bedrooms?: number;
}): Property[] {
  return properties.filter((p) => {
    if (filters.location && filters.location !== 'All Locations') {
      if (!p.location.includes(filters.location.replace(', Ho Chi Minh City', ''))) return false;
    }
    if (filters.type && filters.type !== 'All Types') {
      if (p.type !== filters.type) return false;
    }
    if (filters.priceRange) {
      if (p.price < filters.priceRange.min || p.price > filters.priceRange.max) return false;
    }
    if (filters.bedrooms && filters.bedrooms > 0) {
      if (p.bedrooms < filters.bedrooms) return false;
    }
    return true;
  });
}

export function formatPrice(price: number): string {
  if (price >= 1000000) {
    return `$${(price / 1000000).toFixed(1)}M`;
  }
  return `$${(price / 1000).toFixed(0)}K`;
}

export function formatPriceFull(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);
}
