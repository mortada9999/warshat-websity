'use client';

import React from 'react';
import { useSoundContext } from '@/lib/SoundContext';

export default function SoundMuteButton() {
  const { isMuted, toggleMute } = useSoundContext();

  return (
    <button
      onClick={toggleMute}
      className="fixed bottom-6 left-6 z-[100] flex items-center justify-center w-12 h-12 rounded-full bg-[#4A5830] text-[#F6F6F4] shadow-lg hover:bg-[#34401F] hover:scale-110 transition-all duration-300"
      aria-label={isMuted ? 'تفعيل الصوت' : 'كتم الصوت'}
      title={isMuted ? 'تفعيل الصوت' : 'كتم الصوت'}
    >
      {isMuted ? (
        // Volume Off Icon
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <line x1="23" y1="9" x2="17" y2="15"></line>
          <line x1="17" y1="9" x2="23" y2="15"></line>
        </svg>
      ) : (
        // Volume On Icon
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
        </svg>
      )}
    </button>
  );
}
