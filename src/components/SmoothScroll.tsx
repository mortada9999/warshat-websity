'use client';

import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Enabled Lenis on mobile to ensure GSAP ScrollTrigger transitions (pinning, scrub) work correctly.
    // if (typeof window !== 'undefined' && window.innerWidth < 768) return;

    // إعداد Lenis ومزامنته مع GSAP Ticker
    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.1,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return <>{children}</>;
}
