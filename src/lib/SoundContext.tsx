'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import useSound from 'use-sound';

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playSwoosh: () => void;
  playRustle: () => void;
  stopRustle: () => void;
}

const SoundContext = createContext<SoundContextType>({
  isMuted: false,
  toggleMute: () => {},
  playSwoosh: () => {},
  playRustle: () => {},
  stopRustle: () => {},
});

export const useSoundContext = () => useContext(SoundContext);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  // Global mute state, defaults to false
  const [isMuted, setIsMuted] = useState(false);

  // Initialize sounds
  const [playClick] = useSound('/sounds/click.mp3', { 
    soundEnabled: !isMuted,
    volume: 0.5 
  });
  
  const [playSwoosh] = useSound('/sounds/swoosh.mp3', { 
    soundEnabled: !isMuted,
    volume: 0.3 
  });
  
  const [playRustle, { stop: stopRustleSound }] = useSound('/sounds/rustle.mp3', { 
    soundEnabled: !isMuted,
    volume: 0.15,
  });

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const playRustleSafe = useCallback(() => {
    if (!isMuted) playRustle();
  }, [isMuted, playRustle]);

  const stopRustleSafe = useCallback(() => {
    stopRustleSound();
  }, [stopRustleSound]);

  const playSwooshSafe = useCallback(() => {
    if (!isMuted) playSwoosh();
  }, [isMuted, playSwoosh]);

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
      toggleMute, 
      playSwoosh: playSwooshSafe, 
      playRustle: playRustleSafe, 
      stopRustle: stopRustleSafe 
    }}>
      {children}
    </SoundContext.Provider>
  );
}
