'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const MENU_IMAGES = [
  '/cafe/0c640f_4a1428f8cd76456ab105391127061a70~mv2.jpg',
  '/cafe/0c640f_383352c4f5074869bfa338d8859b2c7f~mv2.jpg',
  '/cafe/0c640f_ddf2b39bed3543c683c6a5edb6d5af35~mv2.jpg',
  '/cafe/0c640f_afe872187c324f05afe10828f64ddb37~mv2.jpg',
  '/cafe/0c640f_127463e10eaf424f979ae7061274fd2d~mv2.jpg',
  '/cafe/0c640f_3341dbef4a5341dd98fffd16857f82ff~mv2.jpg',
];

export default function CafeMenuPage() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MENU_IMAGES.map((src, i) => (
            <div
              key={i}
              className="cursor-zoom-in"
              onClick={() => setLightbox(src)}
            >
              <Image
                src={src}
                alt={`menu ${i + 1}`}
                width={800}
                height={1100}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setLightbox(null)}
        >
          <Image
            src={lightbox}
            alt="menu"
            width={900}
            height={1200}
            className="max-w-[95vw] max-h-[95vh] w-auto h-auto rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
