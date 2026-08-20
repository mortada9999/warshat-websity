import type { Metadata, Viewport } from 'next';
import './tailwind.css';
import './globals.css';
import { LanguageProvider } from '@/components/LanguageProvider';
import { WorkshopStoreProvider } from '@/lib/workshopStore';
import { LoyaltyProvider } from '@/lib/loyaltyStore';
import { AdminProvider } from '@/components/AdminProvider';
import WorkshopEditorModal from '@/components/WorkshopEditorModal';
import SmoothScroll from '@/components/SmoothScroll';
import Header from '@/components/Header';

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
    <html lang="ar" dir="rtl" className="bg-[#F6F6F4]">
      <head />
      <body>
        <WorkshopStoreProvider>
          <LoyaltyProvider>
            <AdminProvider>
              <LanguageProvider>
                <Header />
                <SmoothScroll>
                  {children}
                </SmoothScroll>
                <WorkshopEditorModal />
              </LanguageProvider>
            </AdminProvider>
          </LoyaltyProvider>
        </WorkshopStoreProvider>
      </body>
    </html>
  );
}
