'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';

/**
 * CustomCursor — replaces the default browser cursor with a smooth,
 * GSAP-driven dot that matches Warshat Fan's artisan identity.
 *
 * • Smooth trailing via gsap.quickTo
 * • Expands on hover over interactive elements (a, button, [role="button"], .cursor-pointer)
 * • Auto-disabled on touch-only devices
 */
export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const isTouch = useRef(false);

  /* ── Hover handlers ───────────────────────────────────── */
  const onEnterInteractive = useCallback(() => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, {
      scale: 2.2,
      opacity: 0.45,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, []);

  const onLeaveInteractive = useCallback(() => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, []);

  useEffect(() => {
    /* ── Touch detection ── */
    const checkTouch = () => { isTouch.current = true; };
    window.addEventListener('touchstart', checkTouch, { once: true, passive: true });

    /* Skip setup entirely on touch-only (will re-run if touch detected later) */
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      isTouch.current = true;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    /* Hide on mobile / show on desktop */
    if (isTouch.current) {
      cursor.style.display = 'none';
      document.body.classList.remove('custom-cursor-active');
      return;
    }

    /* Activate cursor-none on body */
    document.body.classList.add('custom-cursor-active');

    /* ── GSAP quickTo for silky-smooth tracking ── */
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3.out' });

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    /* Show/hide when mouse enters/leaves viewport */
    const onMouseEnter = () => { gsap.to(cursor, { opacity: 1, duration: 0.2 }); };
    const onMouseLeave = () => { gsap.to(cursor, { opacity: 0, duration: 0.2 }); };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    /* ── Attach hover listeners to interactive elements ── */
    const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select, label, .cursor-pointer, [data-cursor-hover]';

    const attachHoverListeners = () => {
      const targets = document.querySelectorAll(INTERACTIVE_SELECTOR);
      targets.forEach((el) => {
        el.addEventListener('mouseenter', onEnterInteractive);
        el.addEventListener('mouseleave', onLeaveInteractive);
      });
      return targets;
    };

    /* Initial attach */
    let targets = attachHoverListeners();

    /* Re-attach on DOM mutations (SPA navigation, modals, etc.) */
    const observer = new MutationObserver(() => {
      // Detach old
      targets.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterInteractive);
        el.removeEventListener('mouseleave', onLeaveInteractive);
      });
      // Re-attach
      targets = attachHoverListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    /* ── Cleanup ── */
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('touchstart', checkTouch);

      targets.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterInteractive);
        el.removeEventListener('mouseleave', onLeaveInteractive);
      });

      observer.disconnect();
      document.body.classList.remove('custom-cursor-active');
    };
  }, [onEnterInteractive, onLeaveInteractive]);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed z-[9999] top-0 left-0 w-4 h-4 rounded-full bg-[#34401F] opacity-0"
      style={{
        transform: 'translate(-50%, -50%)',
        willChange: 'transform, opacity',
        mixBlendMode: 'exclusion',
      }}
    />
  );
}
