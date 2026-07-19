import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/components/LanguageProvider';
import SmoothScroll from '@/components/SmoothScroll';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" style={{ backgroundColor: '#EFE7D6' }}>
      <head />
      <body>
        <LanguageProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
