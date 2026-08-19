'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function KidsPage() {
  return (
    <main dir="rtl" className="relative min-h-screen overflow-x-hidden text-stone-800">
      <section className="relative z-10 flex min-h-screen items-center justify-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 120, damping: 14 }}
          className="font-handwritten text-4xl text-[#E4572E] sm:text-6xl"
        >
          ورش واشتراكات الأطفال
        </motion.h1>
      </section>
    </main>
  );
}
