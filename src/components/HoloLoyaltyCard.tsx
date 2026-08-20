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
  clamp,
} from '@/lib/holoEngine';
import type { LoyaltyMember } from '@/lib/loyaltyStore';
import styles from './HoloLoyaltyCard.module.css';

/* ── Gem component (replaces stars for a premium feel) ─────────────────── */

function Gem({ filled, color }: { filled: boolean; color: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill={filled ? color : 'none'}
      stroke={filled ? color : 'rgba(74,82,64,0.2)'}
      strokeWidth="1.5"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`${styles.gemSvg} ${filled ? styles.gemFilled : ''}`}
    >
      <path d="M6 2L2 8l10 14L22 8l-4-6H6z" />
      {filled && (
        <>
          <path d="M2 8h20" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
          <path d="M12 22V8" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
          <path d="M6 2l6 6" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
          <path d="M18 2l-6 6" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
        </>
      )}
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

    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    // Higher stiffness on mobile = snappier, lighter, 1-to-1 feel when touched
    const tilt = new Follow(isMobile ? 0.35 : 0.16);
    const sheet = new Follow(isMobile ? 0.18 : 0.09);
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

    // ── Gyroscope state (mobile only) ──
    let gyroActive = false;
    let gyroCalibrated = false;
    let gyroBeta0 = 0;   // initial beta (front-back angle when page loaded)
    let gyroGamma0 = 0;  // initial gamma (left-right angle when page loaded)
    const gyroSmooth = new Follow(0.25); // fast smoother — kills jitter without feeling sluggish

    const frame = () => {
      raf = 0;

      // On mobile with gyro: gyroSmooth drives the card when not touched
      if (isMobile && gyroActive && !touched) {
        gyroSmooth.step();
        // Very subtle shimmer on top of gentle gyro
        idle += 0.004;
        tilt.target = {
          x: gyroSmooth.value.x * 0.25 + Math.sin(idle) * 0.03,
          y: gyroSmooth.value.y * 0.25 + Math.cos(idle * 0.73) * 0.02,
        };
      } else if (!touched) {
        if (isMobile) {
          // Mobile without gyro: gentle wobble to invite interaction
          idle += 0.02;
          const drift = {
            x: aim.x + Math.sin(idle) * 0.5,
            y: aim.y + Math.cos(idle * 0.73) * 0.35,
          };
          release = Math.min(1, release + 0.016);
          const k = release * release;
          tilt.target = {
            x: handoff.x + (drift.x - handoff.x) * k,
            y: handoff.y + (drift.y - handoff.y) * k,
          };
        } else {
          // Desktop: ease back to flat (0,0) when mouse is not on the card
          release = Math.min(1, release + 0.016);
          const k = release * release;
          tilt.target = {
            x: handoff.x * (1 - k),
            y: handoff.y * (1 - k),
          };
        }
      }

      if (touched) {
        // Faster grab on mobile for 1:1 feel
        grab = Math.min(1, grab + (isMobile ? 0.06 : 0.018));
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

      // On mobile with gyro, never settle — phone micro-movements keep it alive
      const gyroKeepAlive = isMobile && gyroActive && !touched;
      if (
        running &&
        (gyroKeepAlive || !touched || release < 1 || grab < 1 || kick.active || !tilt.settled || !sheet.settled)
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

    // ── Gyroscope (mobile — polished) ──
    const onDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma === null || e.beta === null) return;
      // When touched, don't update gyro target — let finger drive
      if (touched) return;

      // Auto-calibrate on first valid reading
      if (!gyroCalibrated) {
        gyroBeta0 = e.beta;
        gyroGamma0 = e.gamma;
        gyroCalibrated = true;
      }
      gyroActive = true;

      // Slowly drift baseline toward current angle (prevents locking in one direction)
      gyroBeta0 += (e.beta - gyroBeta0) * 0.002;
      gyroGamma0 += (e.gamma - gyroGamma0) * 0.002;

      // Delta from drifting baseline, ±70° = full range (very gentle)
      const x = clamp((e.gamma - gyroGamma0) / 70, -1, 1);
      const y = clamp((e.beta - gyroBeta0) / 70, -1, 1);

      // Feed into the gyro smoother
      gyroSmooth.target = { x, y };
      wake();
    };

    // ── Scroll fallback (mobile without gyro) ──
    const onScroll = () => {
      if (touched || gyroActive) return;
      const rect = host.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const windowCenterY = window.innerHeight / 2;
      const y = clamp((centerY - windowCenterY) / (window.innerHeight / 2), -1, 1);
      aim = { x: 0, y };
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
      // Re-calibrate gyro when user comes back (phone may have moved)
      if (!hidden) gyroCalibrated = false;
      sync();
    };
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('deviceorientation', onDeviceOrientation, { passive: true });

    host.addEventListener('pointermove', onPointer);
    host.addEventListener('pointerleave', onLeave);
    host.addEventListener('touchstart', onTouchStart, { passive: true });
    host.addEventListener('touchmove', onTouchMove, { passive: true });
    host.addEventListener('touchend', onTouchEnd);

    return () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('deviceorientation', onDeviceOrientation);
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
                  <div className={styles.gemsRow}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Gem
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
                  <div className={styles.gemsGrid}>
                    {Array.from({ length: 10 }).map((_, i) => (
                      <Gem
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
