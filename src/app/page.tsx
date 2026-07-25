'use client';

import React from 'react';
import ScrollSection from '@/components/ScrollSection';
import HeroSection from '@/components/HeroSection';
import { motion } from 'framer-motion';

import RecreationalSection from '@/components/RecreationalSection';
import TrainingSection from '@/components/TrainingSection';

const TOTAL_SECTIONS = 6;

/* ── Placeholder Section Content ── */
function PlaceholderSection({
  title,
  subtitle,
  emoji,
  accent,
}: {
  title: string;
  subtitle: string;
  emoji: string;
  accent: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-6xl md:text-7xl mb-6"
      >
        {emoji}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl md:text-5xl mb-3"
        style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 700,
          color: accent,
        }}
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-base md:text-lg max-w-md"
        style={{
          fontFamily: 'var(--font-body)',
          color: 'var(--clr-text-muted)',
        }}
      >
        {subtitle}
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 px-4 py-2 rounded-full text-sm"
        style={{
          fontFamily: 'var(--font-body)',
          border: `1px solid ${accent}`,
          color: accent,
        }}
      >
        قريباً — المحتوى قيد الإنشاء
      </motion.div>
    </div>
  );
}

/* ── Main Page ── */
export default function HomePage() {
  return (
    <>
      {/* ── Section 1: Hero ── */}
      <ScrollSection
        sectionIndex={0}
        totalSections={TOTAL_SECTIONS}
        bgColor="var(--clr-bg)"
      >
        <HeroSection />
      </ScrollSection>

      {/* ── Section 2: Recreational Activities ── */}
      <ScrollSection
        sectionIndex={1}
        totalSections={TOTAL_SECTIONS}
        bgColor="#F0EBD8"
      >
        <RecreationalSection />
      </ScrollSection>

      {/* ── Section 3: Training Workshops ── */}
      <ScrollSection
        sectionIndex={2}
        totalSections={TOTAL_SECTIONS}
        bgColor="#2C3319"
      >
        <TrainingSection />
      </ScrollSection>

      {/* ── Section 4: Courses ── */}
      <ScrollSection
        sectionIndex={3}
        totalSections={TOTAL_SECTIONS}
        bgColor="#F6F0E2"
      >
        <PlaceholderSection
          emoji="📚"
          title="الكورسات"
          subtitle="دورات متخصصة في الحياكة والفنون اليدوية"
          accent="var(--clr-coral)"
        />
      </ScrollSection>

      {/* ── Section 5: Kids Workshops ── */}
      <ScrollSection
        sectionIndex={4}
        totalSections={TOTAL_SECTIONS}
        bgColor="#FFF5EB"
      >
        <PlaceholderSection
          emoji="🌟"
          title="ورش و اشتراكات الأطفال"
          subtitle="أنشطة إبداعية ممتعة مصممة خصيصاً للأطفال"
          accent="var(--clr-honey)"
        />
      </ScrollSection>

      {/* ── Section 6: Footer / "Let's Make Art" ── */}
      <ScrollSection
        sectionIndex={5}
        totalSections={TOTAL_SECTIONS}
        bgColor="#1A1A1A"
      >
        <div className="flex flex-col items-center justify-center h-full w-full px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl mb-4"
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              color: '#F6F0E2',
            }}
          >
            خلّينا نصنع فن ✨
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-base md:text-lg mb-8"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'rgba(246, 240, 226, 0.6)',
            }}
          >
            تابعونا على وسائل التواصل الاجتماعي
          </motion.p>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-5 mb-10"
          >
            {['Instagram', 'TikTok', 'Pinterest', 'Facebook'].map((name) => (
              <motion.a
                key={name}
                href="#"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full flex items-center justify-center text-lg"
                style={{
                  background: 'rgba(246, 240, 226, 0.1)',
                  color: '#F6F0E2',
                  border: '1px solid rgba(246, 240, 226, 0.15)',
                  transition: 'background 0.2s ease',
                }}
                aria-label={name}
              >
                {name === 'Instagram' && '📷'}
                {name === 'TikTok' && '🎵'}
                {name === 'Pinterest' && '📌'}
                {name === 'Facebook' && '👤'}
              </motion.a>
            ))}
          </motion.div>

          {/* Login Placeholder */}
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.45 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold cursor-pointer"
            style={{
              fontFamily: 'var(--font-body)',
              background: '#F6F0E2',
              color: '#1A1A1A',
              border: 'none',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            تسجيل الدخول
          </motion.button>

          {/* Footer Credit */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.3 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 text-xs"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'rgba(246, 240, 226, 0.4)',
            }}
          >
            © ورشة فن ٢٠٢٥ — جميع الحقوق محفوظة
          </motion.p>
        </div>
      </ScrollSection>
    </>
  );
}
