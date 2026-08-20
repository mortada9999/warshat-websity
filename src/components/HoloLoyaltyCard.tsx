'use client';

// HoloLoyaltyCard — Holographic train-ticket loyalty card for Warshat Fan
// Tilt-reactive foil with olive/gold spectrum, perforation, QR code stub.
// Works with pointer (desktop) AND touch (mobile) for smooth interaction.

import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import {
  Follow,
  Kick,
  fromPointer,
  fromTouch,
  applyFoil,
  applyFrame,
  WARSHAT_FOIL,
} from '@/lib/holoEngine';
import type { LoyaltyMember } from '@/lib/loyaltyStore';
import styles from './HoloLoyaltyCard.module.css';

/* ── Star component ─────────────────────────────────────────────────────── */

function Star({ filled, color }: { filled: boolean; color: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill={filled ? color : 'none'}
      stroke={filled ? color : 'rgba(74,82,64,0.2)'}
      strokeWidth="1.5"
      aria-hidden="true"
      className={styles.starSvg}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

/* ── Main component ─────────────────────────────────────────────────────── */

interface HoloLoyaltyCardProps {
  member: LoyaltyMember;
}

export default function HoloLoyaltyCard({ member }: HoloLoyaltyCardProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [qrSrc, setQrSrc] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  // Track client mount
  useEffect(() => { setMounted(true); }, []);

  // Generate QR code as data URL (client-side only)
  useEffect(() => {
    if (!mounted) return;
    const url = `${window.location.origin}/staff/rewards?member=${member.code}`;
    QRCode.toDataURL(url, {
      width: 160,
      margin: 1,
      color: {
        dark: '#374a00',
        light: '#00000000',
      },
      errorCorrectionLevel: 'M',
    })
      .then((dataUrl: string) => setQrSrc(dataUrl))
      .catch(() => {});
  }, [member.code, mounted]);

  // Apply static foil properties
  useEffect(() => {
    if (cardRef.current) applyFoil(cardRef.current, WARSHAT_FOIL);
  }, []);

  // ── Animation loop ──────────────────────────────────────────────────
  useEffect(() => {
    const host = hostRef.current;
    const card = cardRef.current;
    if (!host || !card) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const tilt = new Follow(0.16);
    const sheet = new Follow(0.09);
    const kick = new Kick();
    const t0 = performance.now();

    let raf = 0;
    let running = false;
    let onScreen = false;
    let hidden = false;
    let idle = 0;
    let touched = false;
    let release = 1;
    let handoff = { x: 0, y: 0 };
    let grab = 1;
    let grabFrom = { x: 0, y: 0 };
    let aim = { x: 0, y: 0 };

    const frame = () => {
      raf = 0;

      if (!touched) {
        idle += 0.0042;
        const drift = {
          x: Math.sin(idle) * 0.28,
          y: Math.cos(idle * 0.73) * 0.2,
        };
        release = Math.min(1, release + 0.016);
        const k = release * release;
        tilt.target = {
          x: handoff.x + (drift.x - handoff.x) * k,
          y: handoff.y + (drift.y - handoff.y) * k,
        };
      }

      if (touched) {
        grab = Math.min(1, grab + 0.018);
        const k = grab * grab;
        tilt.target = {
          x: grabFrom.x + (aim.x - grabFrom.x) * k,
          y: grabFrom.y + (aim.y - grabFrom.y) * k,
        };
      }

      const k = kick.step();
      if (k.x || k.y) {
        tilt.target = { x: tilt.target.x + k.x, y: tilt.target.y + k.y };
      }

      tilt.step();
      sheet.target = tilt.value;
      sheet.step();

      applyFrame(
        card,
        tilt.value,
        sheet.value,
        WARSHAT_FOIL,
        (performance.now() - t0) / 1000,
        sheet.speed,
        sheet.velocity,
      );

      if (
        running &&
        (!touched || release < 1 || grab < 1 || kick.active || !tilt.settled || !sheet.settled)
      ) {
        raf = requestAnimationFrame(frame);
      }
    };

    const wake = () => {
      if (!running || raf) return;
      raf = requestAnimationFrame(frame);
    };

    // ── Pointer (desktop) ──
    const onPointer = (e: PointerEvent) => {
      // Ignore touch-originated pointer events — handled separately
      if (e.pointerType === 'touch') return;
      aim = fromPointer(host.getBoundingClientRect(), e.clientX, e.clientY);
      if (!touched) {
        touched = true;
        grabFrom = { x: tilt.value.x, y: tilt.value.y };
        grab = 0;
      }
      release = 0;
      wake();
    };

    const onLeave = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      touched = false;
      handoff = { x: tilt.value.x, y: tilt.value.y };
      release = 0;
      grab = 1;
      kick.fire(tilt.velocity);
      wake();
    };

    // ── Touch (mobile) ──
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const t = e.touches[0];
      aim = fromTouch(host.getBoundingClientRect(), t);
      touched = true;
      grabFrom = { x: tilt.value.x, y: tilt.value.y };
      grab = 0;
      release = 0;
      wake();
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      e.preventDefault(); // Prevent scroll while interacting with card
      const t = e.touches[0];
      aim = fromTouch(host.getBoundingClientRect(), t);
      wake();
    };

    const onTouchEnd = () => {
      touched = false;
      handoff = { x: tilt.value.x, y: tilt.value.y };
      release = 0;
      grab = 1;
      kick.fire(tilt.velocity);
      wake();
    };

    const sync = () => {
      const should = onScreen && !hidden && !reduced;
      if (should === running) return;
      running = should;
      if (should) wake();
      else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const io = new IntersectionObserver(
      (es) => {
        onScreen = es.some((e) => e.isIntersecting);
        sync();
      },
      { rootMargin: '200px' },
    );
    io.observe(host);

    const onVis = () => {
      hidden = document.hidden;
      sync();
    };
    document.addEventListener('visibilitychange', onVis);

    host.addEventListener('pointermove', onPointer);
    host.addEventListener('pointerleave', onLeave);
    host.addEventListener('touchstart', onTouchStart, { passive: true });
    host.addEventListener('touchmove', onTouchMove, { passive: false });
    host.addEventListener('touchend', onTouchEnd);

    return () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      host.removeEventListener('pointermove', onPointer);
      host.removeEventListener('pointerleave', onLeave);
      host.removeEventListener('touchstart', onTouchStart);
      host.removeEventListener('touchmove', onTouchMove);
      host.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  // ── Derived values ──
  const card5Progress = Math.min(member.sessions, 5);
  const card10Progress = Math.min(member.sessions, 10);
  const card5Complete = member.sessions >= 5;
  const card10Complete = member.sessions >= 10;

  return (
    <div
      ref={hostRef}
      className={styles.host}
      role="img"
      aria-label={`بطاقة ولاء ورشة فن — ${member.name} — ${member.sessions} جلسات`}
    >
      <div ref={cardRef} className={styles.card}>

        {/* ── Foil layers ── */}
        <div className={styles.foil} />
        <div className={styles.foilB} />
        <div className={styles.foilC} />
        <div className={styles.glare} />
        <div className={styles.sheen} />
        <div className={styles.spot} />

        {/* ── Ticket content ── */}
        <div className={styles.content}>

          {/* ── Top section ── */}
          <div className={styles.ticketTop}>
            {/* Brand stripe */}
            <div className={styles.brandStripe}>
              <span className={styles.brandName}>ورشة فن ✦</span>
              <span className={styles.memberSince}>عضو منذ {member.createdAt}</span>
            </div>

            {/* Member info + cards */}
            <div className={styles.topBody}>
              {/* Left: name + code */}
              <div className={styles.memberInfo}>
                <h2 className={styles.memberName}>{member.name}</h2>
                <p className={styles.memberCode}>{member.code}</p>
                {member.cycle > 1 && (
                  <span className={styles.cycleBadge}>الدورة {member.cycle}</span>
                )}
              </div>

              {/* Right: reward cards */}
              <div className={styles.rewardCards}>
                {/* Card 1: 5 sessions → 50% discount */}
                <div className={`${styles.rewardCard} ${card5Complete ? styles.rewardComplete : ''}`}>
                  <span className={styles.rewardLabel}>
                    {card5Complete && member.reward5Claimed ? '✓ تم الصرف' : 'خصم ٥٠٪'}
                  </span>
                  <div className={styles.starsRow}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={`s5-${i}`}
                        filled={i < card5Progress}
                        color={card5Complete ? '#a25f00' : '#597257'}
                      />
                    ))}
                  </div>
                  <span className={`${styles.rewardProgress} ${styles.ltrNum}`}>{card5Progress} / ٥</span>
                </div>

                {/* Card 2: 10 sessions → free workshop */}
                <div className={`${styles.rewardCard} ${card10Complete ? styles.rewardComplete : ''}`}>
                  <span className={styles.rewardLabel}>
                    {card10Complete && member.reward10Claimed ? '✓ تم الصرف' : 'ورشة مجانية'}
                  </span>
                  <div className={styles.starsGrid}>
                    {Array.from({ length: 10 }).map((_, i) => (
                      <Star
                        key={`s10-${i}`}
                        filled={i < card10Progress}
                        color={card10Complete ? '#C08A2D' : '#597257'}
                      />
                    ))}
                  </div>
                  <span className={`${styles.rewardProgress} ${styles.ltrNum}`}>{card10Progress} / ١٠</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Perforation ── */}
          <div className={styles.perforation} aria-hidden="true">
            <div className={styles.notchRight} />
            <div className={styles.dots}>
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className={styles.dot} />
              ))}
            </div>
            <div className={styles.notchLeft} />
          </div>

          {/* ── Bottom stub ── */}
          <div className={styles.ticketBottom}>
            <div className={styles.qrWrap}>
              {qrSrc && (
                <img src={qrSrc} alt="QR Code" className={styles.qrImg} width={56} height={56} />
              )}
            </div>
            <div className={styles.stubInfo}>
              <p className={styles.stubText}>امسح للتحقق من عضويتك</p>
              <p className={styles.stubCode}>{member.code}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
