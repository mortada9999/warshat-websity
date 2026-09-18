'use client';

import React, { useEffect } from 'react';
import FooterSection from '@/components/FooterSection';

const MENU_IMAGES = [
  '/cafe/0c640f_4a1428f8cd76456ab105391127061a70~mv2.jpg',
  '/cafe/0c640f_383352c4f5074869bfa338d8859b2c7f~mv2.jpg',
  '/cafe/0c640f_ddf2b39bed3543c683c6a5edb6d5af35~mv2.jpg',
  '/cafe/0c640f_afe872187c324f05afe10828f64ddb37~mv2.jpg',
  '/cafe/0c640f_127463e10eaf424f979ae7061274fd2d~mv2.jpg',
  '/cafe/0c640f_3341dbef4a5341dd98fffd16857f82ff~mv2.jpg',
];

export default function CafeMenuPage() {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lenis = (window as any).__lenis;
    if (lenis) lenis.stop();
    return () => { if (lenis) lenis.start(); };
  }, []);

  return (
    <>
      {/* Stack wrapper */}
      <div>
        {MENU_IMAGES.map((src, i) => (
          <div
            key={i}
            className="sticky top-0 w-full bg-[#f5f5f0]
                       lg:h-[100dvh] lg:flex lg:items-center lg:justify-center"
            style={{ zIndex: i + 1 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`menu ${i + 1}`}
              width={800}
              height={1131}
              className="w-full h-auto block
                         lg:h-full lg:max-w-3xl lg:object-contain"
              draggable={false}
              style={{ userSelect: 'none', pointerEvents: 'none' }}
            />
          </div>
        ))}

        {/* Desktop spacer: gives last image room to fully slide up */}
        <div className="hidden lg:block h-[100dvh]" aria-hidden="true" />
      </div>

      {/* Footer revealed at the very end */}
      <FooterSection />
    </>
  );
}
