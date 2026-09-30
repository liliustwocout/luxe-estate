import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { LanguageProvider } from '@/context/LanguageContext';
import { DisplayModeProvider } from '@/context/DisplayModeContext';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import CustomCursor from '@/components/ui/CustomCursor';
import IntroLoader from '@/components/ui/IntroLoader';
import DisplayModeToast from '@/components/ui/DisplayModeToast';

const playfair = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LuxeEstate — Cho Thuê Bất Động Sản Thượng Lưu | Luxury Rental Vietnam',
  description:
    'Tuyển tập biệt thự, penthouse và căn hộ cho thuê hạng sang tại Việt Nam. Giá thuê theo tháng minh bạch, đầy đủ tiện ích và lịch xem nhà linh hoạt.',
  keywords: [
    'cho thuê bất động sản cao cấp',
    'luxury rental vietnam',
    'penthouse for rent saigon',
    'căn hộ cao cấp hà nội cho thuê',
    'west lake rental hanoi',
    'luxe estate rental',
    'đặt lịch xem nhà',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-body bg-ivory text-charcoal antialiased selection:bg-navy selection:text-white">
        <LanguageProvider>
          <DisplayModeProvider>
            <SmoothScrollProvider>
              <IntroLoader />
              <CustomCursor />
              <DisplayModeToast />
              <Navbar />
              <main className="min-h-screen">{children}</main>
              <Footer />
            </SmoothScrollProvider>
          </DisplayModeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
