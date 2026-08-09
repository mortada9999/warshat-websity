import type { Metadata, Viewport } from 'next';
import './tailwind.css';
import './globals.css';
import { LanguageProvider } from '@/components/LanguageProvider';
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
        <script dangerouslySetInnerHTML={{ __html: `
          // RAW JS TEST - runs before React hydration
          window.__rawJsWorks = true;
          window.__jsErrors = [];
          window.addEventListener('error', function(e) {
            window.__jsErrors.push(e.message);
            var d = document.getElementById('raw-js-debug');
            if (d) d.textContent = 'ERR: ' + e.message;
          });
          window.addEventListener('load', function() {
            var d = document.getElementById('raw-js-debug');
            if (d) d.textContent = 'JS:OK | Errors:' + window.__jsErrors.length + (window.__jsErrors.length ? ' | ' + window.__jsErrors[0] : '');
          });
          setTimeout(function() {
            var d = document.getElementById('raw-js-debug');
            if (d && d.textContent === 'loading...') {
              d.textContent = 'JS:OK but load event not fired after 5s | Errors:' + window.__jsErrors.length + (window.__jsErrors.length ? ' | ' + window.__jsErrors[0] : '');
            }
          }, 5000);
        `}} />
        <div id="raw-js-debug" style={{ position: 'fixed', bottom: 50, left: 0, right: 0, zIndex: 99999, backgroundColor: '#1e40af', color: '#fff', fontSize: 13, padding: '8px', fontFamily: 'monospace', direction: 'ltr', textAlign: 'left', pointerEvents: 'none' }}>loading...</div>
        <LanguageProvider>
          <Header />
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
