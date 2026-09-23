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
      // We removed normalizeScroll(true) because it hijacks touch events 
      // and completely breaks native pull-to-refresh on mobile devices.
      // Instead, we rely on minHeight: '100dvh' in our sections.

      // Use window.load instead of setTimeout: ensures all images are loaded
      // before ScrollTrigger measures element positions (critical for hero-hand.png)
      const onLoad = () => {
        ScrollTrigger.refresh();
        // Second refresh after a tick in case layout shifted during first paint
        requestAnimationFrame(() => ScrollTrigger.refresh());
      };

      if (document.readyState === 'complete') {
        // Page already loaded (e.g. client-side navigation)
        onLoad();
      } else {
        window.addEventListener('load', onLoad, { once: true });
      }

      // Pinch-to-zoom fires resize/scroll on window.visualViewport (not window),
      // so re-measure ScrollTrigger once the zoom gesture settles.
      let vvTimer: ReturnType<typeof setTimeout>;
      const onViewportChange = () => {
        clearTimeout(vvTimer);
        vvTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
      };
      window.visualViewport?.addEventListener('resize', onViewportChange);
      window.visualViewport?.addEventListener('scroll', onViewportChange);

      return () => {
        window.removeEventListener('load', onLoad);
        window.visualViewport?.removeEventListener('resize', onViewportChange);
        window.visualViewport?.removeEventListener('scroll', onViewportChange);
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

