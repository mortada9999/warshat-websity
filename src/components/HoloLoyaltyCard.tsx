'use client';

// HoloLoyaltyCard — Holographic train-ticket loyalty card for Warshat Fan
// Tilt-reactive foil with olive/gold spectrum, perforation, QR code stub.
// Long-press flips to reveal a large QR code on the back for admin scanning.
// Works with pointer (desktop) AND touch (mobile) for smooth interaction.

import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  const [qrBackSrc, setQrBackSrc] = useState<string>('');
  const [mounted, setMounted] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [pressPos, setPressPos] = useState<{ x: number; y: number } | null>(null);
  const [showPressRing, setShowPressRing] = useState(false);

  // Long press detection refs (for desktop)
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLongPress = useRef(false);
  const pressStartPos = useRef<{ x: number; y: number } | null>(null);
  const LONG_PRESS_MS = 600;

  // Double tap detection refs (for mobile)
  const tapStartPos = useRef<{ x: number; y: number } | null>(null);
  const lastTapTime = useRef(0);

  // Track client mount
  useEffect(() => { setMounted(true); }, []);

  // Generate QR codes as data URLs (client-side only)
  useEffect(() => {
    if (!mounted) return;
    const url = `${window.location.origin}/staff/rewards?member=${member.code}`;
    // Small QR for the front stub
    QRCode.toDataURL(url, {
      width: 160,
      margin: 1,
      color: { dark: '#374a00', light: '#00000000' },
      errorCorrectionLevel: 'M',
    })
      .then((dataUrl: string) => setQrSrc(dataUrl))
      .catch(() => {});
    // Larger QR for the back face
    QRCode.toDataURL(url, {
      width: 320,
      margin: 2,
      color: { dark: '#374a00', light: '#00000000' },
      errorCorrectionLevel: 'H',
    })
      .then((dataUrl: string) => setQrBackSrc(dataUrl))
      .catch(() => {});
  }, [member.code, mounted]);

  // ── Long press handlers ──────────────────────────────────────────────
  const clearLongPress = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    setShowPressRing(false);
    setPressPos(null);
    pressStartPos.current = null;
  }, []);

  const startLongPress = useCallback((clientX: number, clientY: number) => {
    const host = hostRef.current;
    if (!host) return;
    isLongPress.current = false;
    pressStartPos.current = { x: clientX, y: clientY };

    // Calculate position relative to host
    const rect = host.getBoundingClientRect();
    setPressPos({ x: clientX - rect.left, y: clientY - rect.top });
    setShowPressRing(true);

    longPressTimer.current = setTimeout(() => {
      isLongPress.current = true;
      setIsFlipped(prev => !prev);
      setShowPressRing(false);
      setPressPos(null);
      pressStartPos.current = null;
      // Haptic feedback on mobile if available
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(30);
      }
    }, LONG_PRESS_MS);
  }, []);

  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (!pressStartPos.current) return;
    const dx = clientX - pressStartPos.current.x;
    const dy = clientY - pressStartPos.current.y;
    // 10px threshold squared = 100
    if (dx * dx + dy * dy > 100) {
      clearLongPress();
    }
  }, [clearLongPress]);

  const endLongPress = useCallback(() => {
    clearLongPress();
    // If it was a long press, we already flipped — don't do anything else
    // If it was a short tap while flipped, flip back
    if (!isLongPress.current && isFlipped) {
      setIsFlipped(false);
    }
    isLongPress.current = false;
  }, [clearLongPress, isFlipped]);

  // ── Double tap handlers (Mobile) ────────────────────────────────────
  const handleTouchStart = useCallback((clientX: number, clientY: number) => {
    tapStartPos.current = { x: clientX, y: clientY };
  }, []);

  const handleTouchEnd = useCallback((clientX: number, clientY: number) => {
    if (!tapStartPos.current) return;
    const dx = clientX - tapStartPos.current.x;
    const dy = clientY - tapStartPos.current.y;
    tapStartPos.current = null;
    
    // If moved more than 10px, it's a swipe, not a tap
    if (dx * dx + dy * dy > 100) return;

    const now = performance.now();
    // 400ms threshold for double tap
    if (now - lastTapTime.current < 400) {
      setIsFlipped(prev => !prev);
      lastTapTime.current = 0; // consume tap
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(30);
      }
    } else {
      lastTapTime.current = now;
    }
  }, []);

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
    const tilt = new Follow(isMobile ? 0.65 : 0.16);
    const sheet = new Follow(isMobile ? 0.35 : 0.09);
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
    let gyroBeta0 = 0;
    let gyroGamma0 = 0;
    const gyroSmooth = new Follow(0.7); // Near-instant — buttery smooth

    const frame = () => {
      raf = 0;

      if (isMobile && gyroActive && !touched) {
        // Gyro = same feel as finger touch, 1:1
        gyroSmooth.step();
        tilt.target = {
          x: gyroSmooth.value.x,
          y: gyroSmooth.value.y,
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
        grab = Math.min(1, grab + (isMobile ? 0.2 : 0.018));
        const k = grab * grab;
        tilt.target = {
          x: grabFrom.x + (aim.x * (isMobile ? 0.7 : 1) - grabFrom.x) * k,
          y: grabFrom.y + (aim.y * (isMobile ? 0.7 : 1) - grabFrom.y) * k,
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

      // On mobile: ALWAYS keep running (idle shimmer or gyro)
      // On desktop: keep running while settling back to flat
      if (running && (isMobile || !touched || release < 1 || grab < 1 || kick.active || !tilt.settled || !sheet.settled)) {
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

    // ── Gyroscope (mobile) ──
    const onDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma === null || e.beta === null) return;
      if (touched) return;

      // Calibrate once — captures the angle you're holding the phone at
      if (!gyroCalibrated) {
        gyroBeta0 = e.beta;
        gyroGamma0 = e.gamma;
        gyroCalibrated = true;
      }
      gyroActive = true;

      const rawX = e.gamma - gyroGamma0;
      const rawY = e.beta - gyroBeta0;

      // Smart recalibration: when phone is near-straight (small delta),
      // slowly drift baseline to fix sensor drift.
      // When actively tilting (large delta), don't touch the baseline.
      const mag = Math.abs(rawX) + Math.abs(rawY);
      if (mag < 8) {
        // Near center — correct drift slowly
        gyroBeta0 += (e.beta - gyroBeta0) * 0.005;
        gyroGamma0 += (e.gamma - gyroGamma0) * 0.005;
      }

      // ±30° from rest = full range
      const x = clamp(rawX / 30, -1, 1);
      const y = clamp(rawY / 30, -1, 1);

      gyroSmooth.target = { x, y };
      wake();
    };

    // ── iOS requires permission for DeviceOrientation ──
    const requestGyroPermission = () => {
      const DOE = DeviceOrientationEvent as unknown as {
        requestPermission?: () => Promise<string>;
      };
      if (typeof DOE.requestPermission === 'function') {
        DOE.requestPermission()
          .then((state: string) => {
            if (state === 'granted') {
              window.addEventListener('deviceorientation', onDeviceOrientation, { passive: true });
            }
          })
          .catch(() => {});
      }
    };
    // Try iOS permission on first user interaction
    if (isMobile) {
      host.addEventListener('touchstart', requestGyroPermission, { once: true });
    }

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
    // Android doesn't need permission — listen directly
    window.addEventListener('deviceorientation', onDeviceOrientation, { passive: true });
    // iOS permission is handled via touchstart above

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
      onPointerDown={(e) => {
        if (e.pointerType === 'touch') return; // touch handled separately
        startLongPress(e.clientX, e.clientY);
      }}
      onPointerMove={(e) => {
        if (e.pointerType === 'touch') return;
        handleMove(e.clientX, e.clientY);
      }}
      onPointerUp={(e) => {
        if (e.pointerType === 'touch') return;
        endLongPress();
      }}
      onPointerCancel={(e) => {
        if (e.pointerType === 'touch') return;
        clearLongPress();
      }}
      onTouchStart={(e) => {
        if (e.touches.length > 0) {
          handleTouchStart(e.touches[0].clientX, e.touches[0].clientY);
        }
      }}
      onTouchEnd={(e) => {
        if (e.changedTouches.length > 0) {
          handleTouchEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        }
      }}
      onTouchCancel={() => {
        tapStartPos.current = null;
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div ref={cardRef} className={`${styles.card} ${isFlipped ? styles.cardFlipped : ''}`}>

          {/* ══ FRONT FACE — foil + ticket content ══ */}
          <div className={styles.frontFace}>
            {/* Foil layers live inside frontFace so they flip with the card */}
            <div className={styles.foil} />
            <div className={styles.foilB} />
            <div className={styles.foilC} />
            <div className={styles.glare} />
            <div className={styles.sheen} />
            <div className={styles.spot} />

            <div className={styles.content}>

              {/* ── Top section ── */}
              <div className={styles.ticketTop}>
                {/* Brand stripe */}
                <div className={styles.brandStripe}>
                  <span className={styles.brandName}>ورشة فن</span>
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

          {/* ══ BACK FACE — same foil + QR only ══ */}
          <div className={styles.backFace}>
            {/* Same foil layers as front for identical holographic effect */}
            <div className={styles.foil} />
            <div className={styles.foilB} />
            <div className={styles.foilC} />
            <div className={styles.glare} />
            <div className={styles.sheen} />
            <div className={styles.spot} />

            <div className={styles.backQrWrap}>
              {qrBackSrc && (
                <img src={qrBackSrc} alt="QR Code" className={styles.backQrImg} width={140} height={140} />
              )}
            </div>
          </div>

      </div>

      {/* ── Long-press progress ring ── */}
      {showPressRing && pressPos && (
        <div
          className={styles.pressRing}
          style={{ left: pressPos.x, top: pressPos.y }}
        >
          <svg className={styles.pressRingSvg} viewBox="0 0 44 44">
            <circle className={styles.pressRingCircle} cx="22" cy="22" r="20" />
          </svg>
        </div>
      )}
    </div>
  );
}
