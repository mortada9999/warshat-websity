'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './AnimatedTapedButton.module.css';

// Ensure plugins are registered only on the client side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface AnimatedTapedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  tapeStyle?: 'tape1' | 'tape2' | 'tape3'; // variations for tape positioning
}

export default function AnimatedTapedButton({
  text,
  tapeStyle = 'tape1',
  className = '',
  ...props
}: AnimatedTapedButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tapeRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !tapeRef.current || !buttonRef.current) return;

    // Create a timeline mapped to the scroll progress (scrub: true)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%', // Starts animation when button enters the bottom 20% of the screen
        end: 'top 40%',   // Ends when button reaches 40% from the top
        scrub: 1,      // Smooth scrubbing with 1 second lag
      }
    });

    // 1. The Tape Peeling off Animation
    tl.to(tapeRef.current, {
      y: -50,          // Flies upwards
      x: 30,           // Moves slightly right
      rotate: 35,      // Peels off at an angle
      skewX: 15,       // Distorts to simulate peeling
      opacity: 0,      // Fades out
      duration: 1,
      ease: 'power1.inOut'
    }, 0);

    // 2. The Button Flying Up freely Animation
    // Starts shortly after tape starts peeling (at 0.2s relative timeline time)
    tl.to(buttonRef.current, {
      y: -15,          // Flies up slightly
      rotate: -1,      // Very slight tilt
      duration: 1,
      ease: 'power2.out'
    }, 0.2);

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={`${styles.container} ${className}`}>
      {/* Tape Element - absolute positioned */}
      <div
        ref={tapeRef}
        className={`${styles.tape} ${styles[tapeStyle]}`}
        aria-hidden="true"
      />
      
      {/* Actual Clickable Button */}
      <button
        ref={buttonRef}
        className={styles.button}
        {...props}
      >
        {text}
      </button>
    </div>
  );
}
