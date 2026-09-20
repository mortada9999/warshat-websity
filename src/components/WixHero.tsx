'use client';

import React from 'react';
import Link from 'next/link';
import ClickSpark from './ClickSpark';
import styles from './WixHero.module.css';

export default function WixHero() {
  return (
    <ClickSpark
      sparkColor="#E85D04"
      sparkSize={10}
      sparkRadius={40}
      sparkCount={12}
      duration={600}
    >
      <div className={styles.heroContainer}>
        {/* Right Side - Pink Background with Text */}
        <div className={styles.textSide}>
          <div className={styles.blobYellow}></div>
          <div className={styles.blobGreen1}></div>
          <div className={styles.blobGreen2}></div>
          
          <div className={styles.content}>
            <img src="/images/figma/1logo.png" alt="ورشة فن" className={styles.logo} />
            <h1 className={styles.title}>المكان المثالي للترفيه عن طريق الفن</h1>
            <p className={styles.subtitle}>و لتعلم مختلف الفنون بأحترافية!</p>
            <Link href="#menu" className={styles.button}>
              our menu
            </Link>
          </div>

          <div className={styles.blobBrush}></div>
        </div>

        {/* Left Side - Image */}
        <div className={styles.imageSide}>
          {/* Placeholder for the canvas image from the screenshot */}
          <img 
            src="https://images.unsplash.com/photo-1560421711-8f5eb53d2657?auto=format&fit=crop&q=80&w=1000" 
            alt="Canvas" 
            className={styles.image} 
          />
          <div className={styles.blobYellowLeft}></div>
        </div>
      </div>
    </ClickSpark>
  );
}
