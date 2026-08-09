'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function FooterSection() {
  return (
    <footer 
      className="sticky bottom-0 w-full h-[70vh] md:h-[80vh] bg-stone-900 flex flex-col justify-between z-0"
      aria-label="تذييل الصفحة"
      suppressHydrationWarning
    >
      {/* Main Content (Center) with massive negative space */}
      <div className="flex flex-col items-center justify-center w-full flex-1 px-4 py-20 md:py-32">
          
          <h1 style={{ fontFamily: "'Inter', sans-serif" }} className="font-black text-4xl md:text-8xl lg:text-[10rem] text-[#E8F3E8] leading-none uppercase tracking-tighter mb-4 text-center max-w-full overflow-hidden text-ellipsis">
            LET'S MAKE ART
          </h1>
          
          <h2 style={{ fontFamily: "'Inter', sans-serif" }} className="font-black text-3xl md:text-7xl text-[#E8F3E8] leading-none text-center mb-16">
            لنصنع فن
          </h2>

          <p style={{ fontFamily: "'Inter', sans-serif" }} className="text-xs md:text-sm uppercase tracking-widest text-gray-400 mb-8">
            Visit Our Branches
          </p>

          {/* Location Buttons - Small, elegant circles (w-14 h-14) */}
          <div className="flex gap-4">
            {/* Zayouna Branch */}
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              title="فرع الزيونة"
              className="flex items-center justify-center w-14 h-14 rounded-full bg-[#c95c55] hover:bg-[#e8f3e8] hover:text-stone-900 text-white transition-colors shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </a>
            
            {/* Yarmouk Branch */}
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              title="فرع اليرموك"
              className="flex items-center justify-center w-14 h-14 rounded-full bg-[#c95c55] hover:bg-[#e8f3e8] hover:text-stone-900 text-white transition-colors shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </a>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center px-8 py-6 border-t border-stone-800 gap-4 md:gap-0 bg-stone-900">
          
          <div className="text-xs text-gray-300" style={{ fontFamily: "'Inter', sans-serif" }}>
            © 2024 Warshat Fan Studio
          </div>
          
          <div className="text-xs text-gray-300" style={{ fontFamily: "'Inter', sans-serif" }}>
            صُنع بحب وشغف فني
          </div>
          
          <div className="flex items-center gap-4 text-xs text-gray-300" style={{ fontFamily: "'Inter', sans-serif" }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/courses" className="hover:text-white transition-colors">Work</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
    </footer>
  );
}
