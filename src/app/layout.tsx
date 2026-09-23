import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './tailwind.css';
import './globals.css';
import { LanguageProvider } from '@/components/LanguageProvider';
import { WorkshopStoreProvider } from '@/lib/workshopStore';
import { LoyaltyProvider } from '@/lib/loyaltyStore';
import { AdminProvider } from '@/components/AdminProvider';
import { SoundProvider } from '@/lib/SoundContext';
import WorkshopEditorModal from '@/components/WorkshopEditorModal';
import SmoothScroll from '@/components/SmoothScroll';
import Header from '@/components/Header';
import SoundMuteButton from '@/components/SoundMuteButton';
import ScrollToTop from '@/components/ScrollToTop';

// Load DG Forsha font
const dgForsha = localFont({
  src: [
    {
      path: './fonts/DG Forsha Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/DG Forsha Scribble.ttf',
      weight: '700', // Using scribble as bold for now or as an alternate
      style: 'normal',
    },
  ],
  variable: '--font-dg-forsha',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ورشة فن — مساحة الإبداع والتعلم',
  description:
    'ورشة فن — اكتشف ورش العمل والدورات والفعاليات الإبداعية في بغداد. فرعا الزيونة واليرموك.',
  keywords: ['ورشة', 'دورات', 'أطفال', 'نشاط', 'بغداد', 'الزيونة', 'اليرموك'],
  openGraph: {
    title: 'ورشة فن',
    description: 'مساحة الإبداع والتعلم في بغداد',
    locale: 'ar_IQ',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#F6F6F4',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`bg-[#F6F6F4] w-full max-w-full overflow-x-clip ${dgForsha.variable}`}>
      <head />
      <body className="w-full max-w-full overflow-x-clip">
        <SoundProvider>
          <WorkshopStoreProvider>
            <LoyaltyProvider>
              <AdminProvider>
                <LanguageProvider>
                  <Header />
                  <SoundMuteButton />
                  <ScrollToTop />
                  <SmoothScroll>
                    {children}
                  </SmoothScroll>
                  <WorkshopEditorModal />
                </LanguageProvider>
              </AdminProvider>
            </LoyaltyProvider>
          </WorkshopStoreProvider>
        </SoundProvider>
      </body>
    </html>
  );
}
