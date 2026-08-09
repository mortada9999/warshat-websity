'use client';

import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Temporary debug overlay to diagnose why animations aren't working on mobile.
 * Shows real-time GSAP/Lenis/scroll status directly on the phone screen.
 * DELETE THIS FILE after debugging is complete.
 */
export default function MobileDebugOverlay() {
  const [info, setInfo] = useState({
    gsapLoaded: false,
    stCount: 0,
    scrollY: 0,
    lenisActive: false,
    touchEvents: 0,
    lastError: '',
    testAnimRan: false,
  });
  const touchCountRef = useRef(0);
  const testBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Track touch events
    const onTouch = () => {
      touchCountRef.current += 1;
    };
    window.addEventListener('touchstart', onTouch, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });

    // Track errors
    const onError = (e: ErrorEvent) => {
      setInfo(prev => ({ ...prev, lastError: e.message?.slice(0, 60) || 'unknown' }));
    };
    window.addEventListener('error', onError);

    // Track unhandled promise rejections
    const onUnhandled = (e: PromiseRejectionEvent) => {
      setInfo(prev => ({ ...prev, lastError: `Promise: ${String(e.reason).slice(0, 50)}` }));
    };
    window.addEventListener('unhandledrejection', onUnhandled);

    // Run a test GSAP animation on the test box
    let testAnimRan = false;
    try {
      if (testBoxRef.current) {
        gsap.fromTo(testBoxRef.current, 
          { x: 0, backgroundColor: '#ef4444' },
          { 
            x: 100, 
            backgroundColor: '#22c55e',
            duration: 2, 
            repeat: -1, 
            yoyo: true,
            onStart: () => { testAnimRan = true; }
          }
        );
      }
    } catch (e: any) {
      setInfo(prev => ({ ...prev, lastError: `GSAP: ${e.message?.slice(0, 50)}` }));
    }

    // Poll status every 500ms
    const interval = setInterval(() => {
      setInfo({
        gsapLoaded: typeof gsap !== 'undefined' && typeof gsap.to === 'function',
        stCount: ScrollTrigger?.getAll?.()?.length || 0,
        scrollY: Math.round(window.scrollY),
        lenisActive: !!(window as any).__lenis,
        touchEvents: touchCountRef.current,
        lastError: info.lastError || '',
        testAnimRan,
      });
    }, 500);

    return () => {
      clearInterval(interval);
      window.removeEventListener('touchstart', onTouch);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onUnhandled);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 99999,
      backgroundColor: 'rgba(0,0,0,0.9)',
      color: '#fff',
      fontSize: '11px',
      padding: '8px 12px',
      fontFamily: 'monospace',
      lineHeight: 1.6,
      direction: 'ltr',
      textAlign: 'left',
      pointerEvents: 'none',
    }}>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
        <span>GSAP: {info.gsapLoaded ? '✅' : '❌'}</span>
        <span>ST: {info.stCount}</span>
        <span>scrollY: {info.scrollY}</span>
        <span>touch: {info.touchEvents}</span>
        <span>anim: {info.testAnimRan ? '✅' : '❌'}</span>
        {/* Test animation box */}
        <div 
          ref={testBoxRef}
          style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: '#ef4444', flexShrink: 0 }} 
        />
      </div>
      {info.lastError && (
        <div style={{ color: '#f87171', marginTop: 4 }}>ERR: {info.lastError}</div>
      )}
    </div>
  );
}
