import { Property } from './types';
import { Language } from './translations';

export const properties: Property[] = [
  {
    id: '1',
    slug: 'lumina-residence-west-lake',
    title: 'Lumina Residence West Lake',
    titleVi: 'Căn Hộ Lumina Residence Tây Hồ',
    location: 'West Lake, Hanoi',
    locationVi: 'Quảng An, Tây Hồ, Hà Nội',
    address: '88 Quang An, Tay Ho, Hanoi',
    addressVi: '88 Quảng An, Phường Quảng An, Quận Tây Hồ, Hà Nội',
    price: 1200,
    monthlyRent: 1200,
    securityDeposit: '$2,400 (2 months)',
    securityDepositVi: '2 tháng tiền cọc',
    availableFrom: 'Available Now',
    availableFromVi: 'Còn trống dọn vào ngay',
    isAvailable: true,
    furnishing: 'Fully Furnished',
    furnishingVi: 'Đầy đủ nội thất cao cấp',
    floor: 'Floor 18',
    floorVi: 'Tầng 18',
    leaseTerm: 'Min. 1 year',
    leaseTermVi: 'Hợp đồng tối thiểu 1 năm',
    petFriendly: true,
    type: 'Apartment',
    typeVi: 'Căn Hộ Cao Cấp',
    bedrooms: 2,
    bathrooms: 2,
    area: 85,
    parking: 1,
    yearBuilt: 2024,
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    ],
    description:
      'Lumina Residence commands breathtaking sunset views over West Lake. Designed for discerning expats and executives, this residence comes fully outfitted with bespoke Italian minimalist furnishings, Bosch kitchen appliances, and Daikin central climate control. Residents enjoy private elevator access, rooftop infinity pool, 24/7 bilingual concierge, and secure basement parking.',
    descriptionVi:
      'Căn hộ cao cấp Lumina Residence sở hữu tầm nhìn trực diện hoàng hôn Hồ Tây lãng mạn. Căn hộ được trang bị đầy đủ nội thất nhập khẩu từ Ý, thiết bị bếp cao cấp Bosch, hệ thống điều hòa âm trần Daikin. Tận hưởng đặc quyền sảnh thang máy riêng, bể bơi vô cực trên tầng thượng, lễ tân giao tiếp song ngữ 24/7 và chỗ đỗ xe định danh.',
    features: [
      'Direct West Lake View',
      'Fully Furnished Italian Decor',
      'Rooftop Infinity Swimming Pool',
      'Technogym Fitness Center',
      'High-Speed 500Mbps Fiber Internet',
      'Housekeeping Service Included',
      '24/7 Security & Concierge',
      'Private Balcony & Wine Chiller',
      'Pet Friendly Building',
      'Secure Covered Parking',
    ],
    featuresVi: [
      'Tầm nhìn trực diện Hồ Tây',
      'Nội thất cao cấp phong cách Ý',
      'Bể bơi vô cực chân mây tầng thượng',
      'Phòng tập gym cao cấp Technogym',
      'Internet cáp quang tốc độ cao 500Mbps',
      'Dịch vụ dọn phòng 2 lần/tuần',
      'Bảo vệ & Lễ tân 24/7',
      'Ban công rộng thoáng & tủ ướp rượu vang',
      'Chấp nhận thú cưng',
      'Chỗ đỗ xe tầng hầm an toàn',
    ],
    coordinates: { lat: 21.0602, lng: 105.8285 },
    featured: true,
  },
  {
    id: '2',
    slug: 'the-metropolitan-penthouse',
    title: 'The Metropolitan Sky Penthouse',
    titleVi: 'Duplex Penthouse Metropolitan Quận 1',
    location: 'District 1, Ho Chi Minh City',
    locationVi: 'Quận 1, TP. Hồ Chí Minh',
    address: '2 Hai Trieu, Ben Nghe, District 1, Ho Chi Minh City',
    addressVi: 'Số 2 Hải Triều, Phường Bến Nghé, Quận 1, TP. HCM',
    price: 2500,
    monthlyRent: 2500,
    securityDeposit: '$5,000 (2 months)',
    securityDepositVi: '2 tháng tiền cọc',
    availableFrom: 'Available Now',
    availableFromVi: 'Còn trống dọn vào ngay',
    isAvailable: true,
    furnishing: 'Fully Furnished',
    furnishingVi: 'Đầy đủ nội thất cao cấp',
    floor: 'Floor 42-43 (Duplex)',
    floorVi: 'Tầng 42-43 (Duplex)',
    leaseTerm: 'Min. 1 year',
    leaseTermVi: 'Hợp đồng tối thiểu 1 năm',
    petFriendly: true,
    type: 'Penthouse',
    typeVi: 'Duplex Penthouse',
    bedrooms: 4,
    bathrooms: 4,
    area: 310,
    parking: 2,
    yearBuilt: 2024,
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80',
    ],
    description:
      'Perched on the top floors of District 1’s crown jewel tower, this sky duplex offers 360-degree panoramic views of the Saigon River and bustling city skyline. Features dramatic 6-meter ceiling heights, double-glazed acoustic glass, Bulthaup open kitchen, and a private sky garden terrace.',
    descriptionVi:
      'Tọa lạc tại đỉnh tháp biểu tượng Quận 1, căn duplex penthouse mang đến tầm nhìn 360 độ ngắm trọn sông Sài Gòn và thành phố rực rỡ ánh đèn. Trần cao thông tầng 6 mét, kính cách âm hai lớp, bếp Bulthaup tiện nghi và sân vườn chân mây riêng tư.',
    features: [
      'Private Direct High-Speed Elevator',
      'Rooftop Sky Garden Terrace',
      'Double Height Ceiling (6m)',
      'Bulthaup Kitchen & Miele Appliances',
      'Private Finnish Sauna & Jacuzzi',
      'Dedicated 24/7 VIP Butler Support',
      'Two Dedicated Parking Spaces',
      'Acoustic Triple-Glazed Glass',
    ],
    featuresVi: [
      'Thang máy riêng tốc độ cao vào căn hộ',
      'Sân vườn chân mây riêng tư',
      'Thiết kế thông tầng cao 6m thoáng đãng',
      'Bếp đảo Bulthaup & thiết bị Miele Đức',
      'Phòng xông hơi Sauna & bồn sục Jacuzzi',
      'Hỗ trợ quản gia cá nhân 24/7',
      '2 vị trí đỗ ô tô riêng',
      'Hệ kính cách âm tiêu chuẩn quốc tế',
    ],
    coordinates: { lat: 10.7719, lng: 106.7048 },
    featured: true,
  },
  {
    id: '3',
    slug: 'luxury-riverside-villa',
    title: 'Waterfront Estate Thao Dien',
    titleVi: 'Dinh Thự Ven Sông Sài Gòn Thảo Điền',
    location: 'Thao Dien, Ho Chi Minh City',
    locationVi: 'Thảo Điền, TP. Thủ Đức, TP. HCM',
    address: '28 Xuan Thuy, Thao Dien, Thu Duc, Ho Chi Minh City',
    addressVi: '28 Xuân Thủy, Phường Thảo Điền, TP. Thủ Đức, TP. HCM',
    price: 3500,
    monthlyRent: 3500,
    securityDeposit: '$7,000 (2 months)',
    securityDepositVi: '2 tháng tiền cọc',
    availableFrom: 'Available Now',
    availableFromVi: 'Còn trống dọn vào ngay',
    isAvailable: true,
    furnishing: 'Fully Furnished',
    furnishingVi: 'Đầy đủ nội thất cao cấp',
    floor: '3 Floors + Garden Pool',
    floorVi: '3 Tầng + Vườn Hồ Bơi',
    leaseTerm: 'Min. 1 year',
    leaseTermVi: 'Hợp đồng tối thiểu 1 năm',
    petFriendly: true,
    type: 'Villa',
    typeVi: 'Biệt Thự Ven Sông',
    bedrooms: 5,
    bathrooms: 5,
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
      'A rare sanctuary for lease along the banks of the Saigon River in Thao Dien. Featuring lush landscaped tropical gardens, private 15-meter lap pool, expansive outdoor entertaining terrace, and separate staff quarters. Fully furnished with custom teakwood and natural stone craftsmanship.',
    descriptionVi:
      'Biệt thự ven sông hiếm có cho thuê tại bán đảo Thảo Điền. Sở hữu khuôn viên vườn nhiệt đới xanh mát, hồ bơi riêng dài 15 mét, khu BBQ ngoài trời thoáng đãng và phòng cho gia nhân riêng biệt. Toàn bộ nội thất làm từ gỗ tếch và đá tự nhiên sang trọng.',
    features: [
      'Private 15m Lap Swimming Pool',
      'Direct Riverfront Access & Dock',
      'Lush Landscaped Tropical Garden',
      'Outdoor BBQ Dining Pavilion',
      'Separate Maid & Driver Quarters',
      '3-Car Covered Garage',
      'Smart Home Security & CCTV 24/7',
      'Backup Power Generator 100%',
    ],
    featuresVi: [
      'Hồ bơi riêng dài 15m tiêu chuẩn resort',
      'Mặt tiền sông Sài Gòn thoáng mát',
      'Khuôn viên vườn cảnh quan nhiệt đới',
      'Khu ẩm thực ngoài trời BBQ tiệc tối',
      'Phòng riêng cho người giúp việc/lái xe',
      'Gara có mái che cho 3 ô tô',
      'Camera an ninh & Smart Home 24/7',
      'Máy phát điện dự phòng 100% công suất',
    ],
    coordinates: { lat: 10.8031, lng: 106.7339 },
    featured: true,
  },
  {
    id: '4',
    slug: 'skyline-executive-apartment',
    title: 'Metropolis Executive Residence',
    titleVi: 'Căn Hộ Executive Metropolis Ba Đình',
    location: 'Ba Dinh, Hanoi',
    locationVi: 'Liễu Giai, Ba Đình, Hà Nội',
    address: '29 Lieu Giai, Ngoc Khanh, Ba Dinh, Hanoi',
    addressVi: '29 Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Hà Nội',
    price: 1000,
    monthlyRent: 1000,
    securityDeposit: '$2,000 (2 months)',
    securityDepositVi: '2 tháng tiền cọc',
    availableFrom: 'Available Now',
    availableFromVi: 'Còn trống dọn vào ngay',
    isAvailable: true,
    furnishing: 'Fully Furnished',
    furnishingVi: 'Đầy đủ nội thất cao cấp',
    floor: 'Floor 26',
    floorVi: 'Tầng 26',
    leaseTerm: 'Min. 1 year',
    leaseTermVi: 'Hợp đồng tối thiểu 1 năm',
    petFriendly: false,
    type: 'Apartment',
    typeVi: 'Căn Hộ Cao Cấp',
    bedrooms: 2,
    bathrooms: 2,
    area: 95,
    parking: 1,
    yearBuilt: 2024,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    ],
    description:
      'Situated in the diplomatic hub of Hanoi, this contemporary 2-bedroom residence provides rapid access to international embassies and corporate headquarters. Featuring expansive double-glazed windows, a dedicated work station, and a master bath with soaking tub.',
    descriptionVi:
      'Nằm tại trung tâm ngoại giao Ba Đình, căn hộ 2 phòng ngủ hiện đại kết nối nhanh chóng tới các đại sứ quán và tòa nhà văn phòng hạng A. Cửa kính Low-E cách âm cách nhiệt, không gian làm việc chuyên nghiệp và bồn tắm thư giãn cao cấp.',
    features: [
      'Prime Diplomatic Quarter Location',
      'Double-Glazed Low-E Glass',
      'Dedicated Ergonomic Work Desk',
      'Japanese Deep Soaking Tub',
      'Direct Access to Vincom Center Mall',
      'Heated Indoor Four-Season Pool',
      'Electronic Keycard & Video Doorbell',
      'Weekly Cleaning & Linen Change',
    ],
    featuresVi: [
      'Vị trí trung tâm khu Ngoại giao đoàn',
      'Kính Low-E cách nhiệt, chống tia UV',
      'Góc làm việc công thái học tiện nghi',
      'Bồn tắm nằm phong cách Nhật',
      'Kết nối trực tiếp trung tâm thương mại',
      'Bể bơi nước nóng bốn mùa trong nhà',
      'Khóa vân tay & chuông hình thông minh',
      'Dịch vụ dọn phòng & thay ga giường định kỳ',
    ],
    coordinates: { lat: 21.0322, lng: 105.8152 },
    featured: true,
  },
  {
    id: '5',
    slug: 'serene-garden-townhouse',
    title: 'An Phu Modern Garden Townhouse',
    titleVi: 'Nhà Phố Sân Vườn An Phú Sang Trọng',
    location: 'Thu Duc, Ho Chi Minh City',
    locationVi: 'An Phú, TP. Thủ Đức, TP. HCM',
    address: '15 Song Hanh, An Phu, Thu Duc, Ho Chi Minh City',
    addressVi: '15 Song Hành, Phường An Phú, TP. Thủ Đức, TP. HCM',
    price: 1500,
    monthlyRent: 1500,
    securityDeposit: '$3,000 (2 months)',
    securityDepositVi: '2 tháng tiền cọc',
    availableFrom: 'Available Now',
    availableFromVi: 'Còn trống dọn vào ngay',
    isAvailable: true,
    furnishing: 'Fully Furnished',
    furnishingVi: 'Đầy đủ nội thất cao cấp',
    floor: '3 Floors + Rooftop',
    floorVi: '3 Tầng + Sân Thượng',
    leaseTerm: 'Min. 1 year',
    leaseTermVi: 'Hợp đồng tối thiểu 1 năm',
    petFriendly: true,
    type: 'Townhouse',
    typeVi: 'Nhà Phố Sân Vườn',
    bedrooms: 3,
    bathrooms: 3,
    area: 180,
    parking: 2,
    yearBuilt: 2023,
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
    ],
    description:
      'A serene, gated family residence nestled in a quiet cul-de-sac in An Phu. Features a private leafy rear garden, modern Scandinavian furniture package, expansive open-plan kitchen with breakfast bar, and a tranquil rooftop yoga terrace.',
    descriptionVi:
      'Nhà phố khép kín yên bình trong khu dân cư an ninh cao cấp An Phú. Sở hữu khu vườn sau xanh mát, nội thất phong cách Bắc Âu ấm cúng, không gian bếp mở kết hợp quầy bar hiện đại và sân thượng rộng lý tưởng để tập yoga hoặc ngắm hoàng hôn.',
    features: [
      'Private Landscaped Backyard Garden',
      'Gated Community with 24/7 Guards',
      'Scandinavian Designer Furnishing',
      'Rooftop BBQ & Yoga Deck',
      'Direct Walk to International Schools',
      'Double Gara for 2 Vehicles',
      'Solar Water Heating System',
      'High-Speed Mesh Wi-Fi 6',
    ],
    featuresVi: [
      'Khu vườn riêng sau nhà nhiều cây xanh',
      'Khu compound an ninh bảo vệ 24/7',
      'Nội thất phong cách Scandinavian',
      'Sân thượng thư giãn tiệc BBQ & Yoga',
      'Đi bộ tới các trường quốc tế uy tín',
      'Gara để được 2 ô tô và xe máy',
      'Hệ thống nước nóng năng lượng mặt trời',
      'Mạng Wi-Fi 6 phủ sóng toàn bộ các tầng',
    ],
    coordinates: { lat: 10.8015, lng: 106.7451 },
    featured: true,
  },
  {
    id: '6',
    slug: 'lakeview-studio-loft',
    title: 'Heritage Lakeview Studio Loft',
    titleVi: 'Studio Loft Phố Cổ View Hồ Hoàn Kiếm',
    location: 'Hoan Kiem, Hanoi',
    locationVi: 'Hoàn Kiếm, Hà Nội',
    address: '12 Dinh Tien Hoang, Hang Trong, Hoan Kiem, Hanoi',
    addressVi: '12 Đinh Tiên Hoàng, Phường Hàng Trống, Quận Hoàn Kiếm, Hà Nội',
    price: 500,
    monthlyRent: 500,
    securityDeposit: '$500 (1 month)',
    securityDepositVi: '1 tháng tiền cọc',
    availableFrom: 'Available Now',
    availableFromVi: 'Còn trống dọn vào ngay',
    isAvailable: true,
    furnishing: 'Fully Furnished',
    furnishingVi: 'Đầy đủ nội thất cao cấp',
    floor: 'Floor 4',
    floorVi: 'Tầng 4',
    leaseTerm: 'Min. 6 months',
    leaseTermVi: 'Hợp đồng tối thiểu 6 tháng',
    petFriendly: false,
    type: 'Studio',
    typeVi: 'Căn Hộ Studio',
    bedrooms: 1,
    bathrooms: 1,
    area: 48,
    parking: 1,
    yearBuilt: 2023,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80',
    ],
    description:
      'Charming Parisian-inspired studio loft in the heart of Hanoi Old Quarter. High ceilings, exposed brick details, custom kitchenette, and a Juliet balcony overlooking tree-lined streets near Sword Lake. Perfect for solo professionals or creative digital nomads.',
    descriptionVi:
      'Căn hộ Studio gác lửng mang hơi thở Paris giữa trung tâm phố cổ Hà Nội. Trần cao thoáng đạt, tường gạch mộc nghệ thuật, bếp nấu thông minh và ban công ngắm nhìn những hàng cây xanh mát gần Hồ Gươm. Lựa chọn lý tưởng cho chuyên gia độc thân.',
    features: [
      'Heart of Hanoi Old Quarter',
      'Charming Juliet Balcony',
      'High Ceilings with Industrial Loft Feel',
      'Fully Equipped Induction Kitchenette',
      'Smart TV with Netflix & Soundbar',
      'Washer & Dryer in Unit',
      'Secure Electronic Keypad Entry',
      'All Utilities & Wi-Fi Included',
    ],
    featuresVi: [
      'Trung tâm phố cổ Hoàn Kiếm',
      'Ban công ngắm phố ngập tràn hoa lá',
      'Thiết kế trần cao phong cách loft',
      'Bếp từ âm và lò vi sóng tiện lợi',
      'Smart TV giải trí và loa âm thanh vòm',
      'Máy giặt và sấy tích hợp sẵn',
      'Khóa mã số điện tử bảo mật',
      'Bao gồm nước sinh hoạt và Wi-Fi tốc độ cao',
    ],
    coordinates: { lat: 21.0315, lng: 105.8523 },
    featured: false,
  },
  {
    id: '7',
    slug: 'coastal-breeze-condo',
    title: 'Sunlit Urban Suite Phu My Hung',
    titleVi: 'Căn Hộ Đô Thị Sinh Thái Phú Mỹ Hưng',
    location: 'District 7, Ho Chi Minh City',
    locationVi: 'Phú Mỹ Hưng, Quận 7, TP. HCM',
    address: '88 Nguyen Duc Canh, Tan Phong, District 7, Ho Chi Minh City',
    addressVi: '88 Nguyễn Đức Cảnh, Phường Tân Phong, Quận 7, TP. HCM',
    price: 750,
    monthlyRent: 750,
    securityDeposit: '$1,500 (2 months)',
    securityDepositVi: '2 tháng tiền cọc',
    availableFrom: 'Available Now',
    availableFromVi: 'Còn trống dọn vào ngay',
    isAvailable: true,
    furnishing: 'Semi-Furnished',
    furnishingVi: 'Nội thất cơ bản',
    floor: 'Floor 12',
    floorVi: 'Tầng 12',
    leaseTerm: 'Min. 1 year',
    leaseTermVi: 'Hợp đồng tối thiểu 1 năm',
    petFriendly: true,
    type: 'Apartment',
    typeVi: 'Căn Hộ Cao Cấp',
    bedrooms: 2,
    bathrooms: 1,
    area: 68,
    parking: 1,
    yearBuilt: 2023,
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
    ],
    description:
      'Bright and airy modern corner suite in green Phu My Hung. Features cross-ventilation breezes, fitted kitchen cabinets with induction hob, built-in wardrobes, and scenic river-park views. Steps from Crescent Mall and international dining.',
    descriptionVi:
      'Căn hộ góc 2 phòng ngủ ngập tràn ánh sáng tự nhiên tại khu đô thị sinh thái kiểu mẫu Phú Mỹ Hưng. Gió mát quanh năm, tủ bếp hiện đại, tủ âm tường tiện dụng và tầm nhìn thoáng đãng ra công viên bờ sông. Chỉ vài bước chân tới Crescent Mall.',
    features: [
      'Scenic River Park Views',
      'Olympic-Size Swimming Pool Access',
      'Modern Kitchen Cabinets Installed',
      'Daikin Inverter AC in All Rooms',
      'Crescent Mall 3-Minute Walk',
      'Children Playground & Tennis Courts',
      '24/7 Security Patrol',
      'Motorbike & Car Parking Slot',
    ],
    featuresVi: [
      'Tầm nhìn công viên và hồ bán nguyệt',
      'Bể bơi tiêu chuẩn Olympic tại tòa nhà',
      'Hệ tủ bếp hiện đại và bếp từ âm',
      'Điều hòa Daikin Inverter tiết kiệm điện',
      '3 phút đi bộ tới trung tâm Crescent Mall',
      'Khu vui chơi trẻ em và sân tennis',
      'Tuần tra an ninh bảo vệ nghiêm ngặt 24/7',
      'Chỗ đỗ xe máy và ô tô thuận tiện',
    ],
    coordinates: { lat: 10.7292, lng: 106.7088 },
    featured: false,
  },
  {
    id: '8',
    slug: 'heritage-colonial-villa',
    title: 'French Heritage Garden Villa',
    titleVi: 'Biệt Thự Kiến Trúc Pháp Cổ Điển Tây Hồ',
    location: 'Tay Ho, Hanoi',
    locationVi: 'Tây Hồ, Hà Nội',
    address: '45 Dang Thai Mai, Quang An, Tay Ho, Hanoi',
    addressVi: '45 Đặng Thai Mai, Phường Quảng An, Quận Tây Hồ, Hà Nội',
    price: 2000,
    monthlyRent: 2000,
    securityDeposit: '$4,000 (2 months)',
    securityDepositVi: '2 tháng tiền cọc',
    availableFrom: 'Available Now',
    availableFromVi: 'Còn trống dọn vào ngay',
    isAvailable: true,
    furnishing: 'Fully Furnished',
    furnishingVi: 'Đầy đủ nội thất cao cấp',
    floor: '2 Floors Villa',
    floorVi: 'Biệt Thự 2 Tầng',
    leaseTerm: 'Min. 1 year',
    leaseTermVi: 'Hợp đồng tối thiểu 1 năm',
    petFriendly: true,
    type: 'Villa',
    typeVi: 'Biệt Thự Vườn',
    bedrooms: 4,
    bathrooms: 3,
    area: 260,
    parking: 2,
    yearBuilt: 2022,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
    ],
    description:
      'An exquisite colonial-style villa surrounded by private ancient frangipani trees and bamboo courtyards. Handcrafted encaustic cement tiles, authentic wooden louvre shutters, working fireplace, and sun-drenched sunroom conservatory. A peaceful sanctuary tailored for ambassadorial and executive leasing.',
    descriptionVi:
      'Biệt thự phong cách thuộc địa Pháp cổ điển tọa lạc trong ngõ yên tĩnh đường Đặng Thai Mai, Tây Hồ. Bao quanh bởi vườn hoa đại cổ thụ và rặng tre xanh. Nền gạch bông thủ công tinh xảo, cửa chớp gỗ truyền thống, lò sưởi ấm cúng và phòng đọc sách kính ngập tràn nắng mai.',
    features: [
      'Classic French Indochine Architecture',
      'Private Frangipani Courtyard Garden',
      'Original Wood Fireplace',
      'Sunroom & Conservatory Reading Nook',
      'Hardwood Teak Flooring',
      'Quiet Diplomatic Enclave',
      '2-Car Gated Driveway',
      'Full Kitchen with Dishwasher & Oven',
    ],
    featuresVi: [
      'Kiến trúc Đông Dương Indochine hoài niệm',
      'Sân vườn hoa đại và tiểu cảnh thư thái',
      'Lò sưởi củi sưởi ấm mùa đông',
      'Phòng đọc sách tràn ngập ánh sáng tự nhiên',
      'Sàn gỗ teak tự nhiên sang trọng',
      'Khu dân cư ngoại giao quốc tế văn minh',
      'Sân đỗ xe ô tô có cổng tự động',
      'Bếp đầy đủ lò nướng và máy rửa bát',
    ],
    coordinates: { lat: 21.0664, lng: 105.8239 },
    featured: true,
  },
];

export const locations = [
  'All Locations',
  'West Lake, Hanoi',
  'Ba Dinh, Hanoi',
  'Hoan Kiem, Hanoi',
  'District 1, Ho Chi Minh City',
  'Thao Dien, Ho Chi Minh City',
  'District 7, Ho Chi Minh City',
  'Thu Duc, Ho Chi Minh City',
];

export const propertyTypes = [
  'All Types',
  'Apartment',
  'Penthouse',
  'Villa',
  'Townhouse',
  'Studio',
];

export const priceRanges = [
  { label: 'All Rental Prices', labelVi: 'Tất cả mức giá thuê', min: 0, max: Infinity },
  { label: '$500 — $1,000 / mo', labelVi: '$500 — $1,000 / tháng (~12-25 Tr)', min: 500, max: 1000 },
  { label: '$1,000 — $1,500 / mo', labelVi: '$1,000 — $1,500 / tháng (~25-38 Tr)', min: 1000, max: 1500 },
  { label: '$1,500 — $2,500 / mo', labelVi: '$1,500 — $2,500 / tháng (~38-63 Tr)', min: 1500, max: 2500 },
  { label: '$2,500+ / mo', labelVi: 'Trên $2,500 / tháng (> 63 Tr)', min: 2500, max: Infinity },
];

export const bedroomOptions = [
  { label: 'Any', labelVi: 'Bất kỳ', value: 0 },
  { label: '1+', labelVi: '1+ Phòng', value: 1 },
  { label: '2+', labelVi: '2+ Phòng', value: 2 },
  { label: '3+', labelVi: '3+ Phòng', value: 3 },
  { label: '4+', labelVi: '4+ Phòng', value: 4 },
  { label: '5+', labelVi: '5+ Phòng', value: 5 },
];

export const furnishingOptions = [
  { value: '', label: 'All Furnishing', labelVi: 'Tất cả nội thất' },
  { value: 'Fully Furnished', label: 'Fully Furnished', labelVi: 'Đầy đủ nội thất cao cấp' },
  { value: 'Semi-Furnished', label: 'Semi-Furnished', labelVi: 'Nội thất cơ bản' },
  { value: 'Unfurnished', label: 'Unfurnished', labelVi: 'Không nội thất' },
];

export const availabilityOptions = [
  { value: '', label: 'All Availability', labelVi: 'Tất cả tình trạng' },
  { value: 'Available Now', label: 'Available Now', labelVi: 'Còn trống dọn vào ngay' },
  { value: 'Available Soon', label: 'Available Soon', labelVi: 'Sắp trống' },
];

export function getLocalizedProperty(property: Property, lang: Language): Property {
  if (lang === 'vi') {
    return {
      ...property,
      title: property.titleVi || property.title,
      location: property.locationVi || property.location,
      address: property.addressVi || property.address,
      type: property.typeVi || property.type,
      description: property.descriptionVi || property.description,
      features: property.featuresVi || property.features,
      furnishing: (property.furnishingVi as any) || property.furnishing,
      securityDeposit: property.securityDepositVi || property.securityDeposit,
      availableFrom: property.availableFromVi || property.availableFrom,
      floor: property.floorVi || property.floor,
      leaseTerm: property.leaseTermVi || property.leaseTerm,
    };
  }
  return property;
}

export function getPropertyBySlug(slug: string, lang?: Language): Property | undefined {
  const property = properties.find((p) => p.slug === slug);
  if (!property) return undefined;
  return lang ? getLocalizedProperty(property, lang) : property;
}

export function getFeaturedProperties(lang?: Language): Property[] {
  const featured = properties.filter((p) => p.featured);
  return lang ? featured.map((p) => getLocalizedProperty(p, lang)) : featured;
}

export function filterProperties(
  filters: {
    location?: string;
    type?: string;
    priceRange?: { min: number; max: number };
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    bathrooms?: number;
    furnishing?: string;
    availability?: string;
  },
  lang?: Language
): Property[] {
  const filtered = properties.filter((p) => {
    if (filters.location && filters.location !== 'All Locations' && filters.location !== 'Tất cả vị trí') {
      const matchLocation =
        p.location.toLowerCase().includes(filters.location.toLowerCase()) ||
        (p.locationVi && p.locationVi.toLowerCase().includes(filters.location.toLowerCase()));
      if (!matchLocation) return false;
    }
    if (filters.type && filters.type !== 'All Types' && filters.type !== 'Tất cả loại hình') {
      const matchType =
        p.type.toLowerCase() === filters.type.toLowerCase() ||
        (p.typeVi && p.typeVi.toLowerCase() === filters.type.toLowerCase());
      if (!matchType) return false;
    }
    // Filter by priceRange object
    if (filters.priceRange) {
      if (p.monthlyRent < filters.priceRange.min || p.monthlyRent > filters.priceRange.max) return false;
    }
    // Filter by min/max monthly rent
    if (filters.minPrice !== undefined && p.monthlyRent < filters.minPrice) return false;
    if (filters.maxPrice !== undefined && p.monthlyRent > filters.maxPrice) return false;

    // Filter by bedrooms
    if (filters.bedrooms && filters.bedrooms > 0) {
      if (p.bedrooms < filters.bedrooms) return false;
    }
    // Filter by bathrooms
    if (filters.bathrooms && filters.bathrooms > 0) {
      if (p.bathrooms < filters.bathrooms) return false;
    }
    // Filter by furnishing
    if (filters.furnishing) {
      if (p.furnishing !== filters.furnishing && p.furnishingVi !== filters.furnishing) return false;
    }
    // Filter by availability
    if (filters.availability) {
      if (filters.availability === 'Available Now' && !p.isAvailable) return false;
    }

    return true;
  });

  return lang ? filtered.map((p) => getLocalizedProperty(p, lang)) : filtered;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price) + ' / mo';
}

export function formatPriceFull(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price) + ' / month';
}
