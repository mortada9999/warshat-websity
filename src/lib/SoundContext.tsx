'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import useSound from 'use-sound';

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
}

const SoundContext = createContext<SoundContextType>({
  isMuted: false,
  toggleMute: () => {},
});

export const useSoundContext = () => useContext(SoundContext);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  // Global mute state, defaults to false
  const [isMuted, setIsMuted] = useState(false);

  // Initialize click sound
  const [playClick] = useSound('/sounds/click.mp3', { 
    soundEnabled: !isMuted,
    volume: 0.5 
  });

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  // Global click listener for buttons and links
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (isMuted) return;

      // Find if the clicked element or any of its parents is a button or link
      const target = e.target as HTMLElement;
      const clickableElement = target.closest('button, a, [role="button"]');
      
      if (clickableElement) {
        playClick();
      }
    };

    document.addEventListener('click', handleGlobalClick, { capture: true });
    return () => {
      document.removeEventListener('click', handleGlobalClick, { capture: true });
    };
  }, [isMuted, playClick]);

  return (
    <SoundContext.Provider value={{ 
      isMuted, 
      toggleMute
    }}>
      {children}
    </SoundContext.Provider>
  );
}
