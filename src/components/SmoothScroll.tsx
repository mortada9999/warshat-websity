'use client';

import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Skip Lenis on touch devices (Android Chrome + iOS Safari).
    // Touch devices use native scroll — Lenis is for desktop smooth scroll only.
    // Detection covers Xiaomi, Realme, and all Android devices.
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) {
      // On touch devices: use native scroll. Lenis causes jitter on fast swipes.
      // Force GSAP to use 'transform' pinning instead of 'fixed' to avoid
      // iOS address bar causing pinned elements to jump up/down.
      ScrollTrigger.defaults({ pinType: 'transform' });

      const refresh = () => {
        // Stagger refreshes to capture layout after fonts, images, and address-bar settle
        ScrollTrigger.refresh();
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
          setTimeout(() => ScrollTrigger.refresh(), 300);
        });
      };

      if (document.readyState === 'complete') {
        refresh();
      } else {
        window.addEventListener('load', refresh, { once: true });
      }

      return () => {
        window.removeEventListener('load', refresh);
      };
    }

    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.1,
      syncTouch: false,
    });

    // Expose globally so modals can stop/start scroll
    (window as unknown as Record<string, unknown>).__lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return <>{children}</>;
}

