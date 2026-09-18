'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from './LanguageProvider';

export default function FooterSection() {
  const { t, lang } = useLanguage();

  const arFont = "var(--font-dg-forsha), 'Amiri', serif";
  const enFont = "'Inter', sans-serif";

  return (
    <>
      {/* Spacer div to allow scrolling past main content for the reveal effect */}
      <div className="w-full h-[70vh] md:h-[80vh] pointer-events-none" aria-hidden="true" />
      
      {/* Fixed footer that sits behind main content (z-0) and is revealed as we scroll into the spacer */}
      <footer 
        className="fixed bottom-0 left-0 w-full h-[70vh] md:h-[80vh] bg-stone-900 flex flex-col justify-between z-0"
        style={{ willChange: 'transform' }}
        aria-label="تذييل الصفحة"
        suppressHydrationWarning
      >
      {/* Main Content (Center) with massive negative space */}
      <div className="flex flex-col items-center justify-center w-full flex-1 px-4 py-20 md:py-32">
          
          {/* h1: Arabic text when AR, English text when EN */}
          <h1 
            style={{ fontFamily: lang === 'ar' ? arFont : enFont }} 
            className={`${lang === 'ar' ? 'font-normal' : 'font-black'} text-4xl md:text-8xl lg:text-[10rem] text-[#E8F3E8] leading-none uppercase tracking-tighter mb-4 text-center max-w-full overflow-hidden text-ellipsis`}
          >
            {t('لنصنع فن', "LET'S MAKE ART")}
          </h1>
          
          {/* h2: English text when AR, Arabic text when EN */}
          <h2 
            style={{ fontFamily: lang === 'ar' ? enFont : arFont }} 
            className={`${lang === 'ar' ? 'font-black' : 'font-normal'} text-3xl md:text-7xl text-[#E8F3E8] leading-none text-center mb-16`}
          >
            {t("LET'S MAKE ART", 'لنصنع فن')}
          </h2>

        </div>

        {/* Bottom Footer */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center px-8 py-6 border-t border-stone-800 gap-4 md:gap-0 bg-stone-900">
          
          <div className="text-xs text-gray-300" style={{ fontFamily: lang === 'ar' ? arFont : enFont }}>
            {t('© 2024 استوديو ورشة فن', '© 2024 Warshat Fan Studio')}
          </div>
          
          <div className="text-xs text-gray-300" style={{ fontFamily: lang === 'ar' ? arFont : enFont }}>
            {t('صُنع بحب وشغف فني', 'Made with love & artistic passion')}
          </div>
          
          <div className="flex items-center gap-4 text-xs text-gray-300" style={{ fontFamily: enFont }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/courses" className="hover:text-white transition-colors">Work</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>

        {/* Overscroll blocker: Prevents the background flash when rubber-banding past the bottom on iOS Safari */}
        <div className="absolute top-full left-0 w-full h-[100vh] bg-stone-900 pointer-events-none" aria-hidden="true" />
      </footer>
    </>
  );
}
