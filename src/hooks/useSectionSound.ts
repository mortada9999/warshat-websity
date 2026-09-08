'use client';

import { useEffect, useRef } from 'react';
import { useSoundContext } from '@/lib/SoundContext';

/**
 * Hook to play a swoosh sound when a section scrolls into view.
 * 
 * @param threshold The intersection ratio required to trigger the sound (0 to 1)
 * @returns A ref to attach to the `<section>` element
 */
export function useSectionSound<T extends HTMLElement>(
  threshold = 0.3,
  externalRef?: React.RefObject<T | null>
) {
  const { playSwoosh } = useSoundContext();
  const internalRef = useRef<T>(null);
  const ref = externalRef || internalRef;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Track if it has been played to avoid spamming if scrolling slowly
    let hasPlayed = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!hasPlayed) {
              playSwoosh();
              hasPlayed = true;
            }
          } else {
            // Reset when it completely leaves the viewport
            // so it can play again when user scrolls back
            if (entry.intersectionRatio === 0) {
              hasPlayed = false;
            }
          }
        });
      },
      {
        threshold,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [playSwoosh, threshold]);

  return ref;
}
