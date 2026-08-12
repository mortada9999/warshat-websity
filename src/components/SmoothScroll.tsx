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
      // normalizeScroll is REQUIRED on real Android Chrome for GSAP pins to work.
      // Without it, the address bar show/hide changes viewport height mid-scroll,
      // breaking all pin position calculations. This call is safe WITHOUT Lenis.
      // GSAP docs: "Do not use normalizeScroll with Lenis" — we only call it here
      // on the touch branch where Lenis is NOT active.
      ScrollTrigger.normalizeScroll(true);

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

      return () => {
        window.removeEventListener('load', onLoad);
      };
    }

    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.1,
      syncTouch: false,
    });

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

