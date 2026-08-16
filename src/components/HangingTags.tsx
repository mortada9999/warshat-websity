'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { useGSAP } from '@gsap/react';
import { useLanguage } from './LanguageProvider';
import styles from './HangingTags.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Draggable, useGSAP);
}

type TagDef = {
  id: string;
  en: string;
  ar: string;
};

const TAGS: TagDef[] = [
  { id: 'entertainment', en: 'Open Daily Activities', ar: 'النشاطات اليومية المفتوحة' },
  { id: 'courses', en: 'Courses', ar: 'كورسات' },
  { id: 'kids', en: 'Kids Workshops', ar: 'ورش الأطفال' },
  { id: 'training', en: 'Training Workshops', ar: 'الورش التدريبية' },
];

interface Variant {
  string: number;
  rot: number;
  drift: number;
}

export default function HangingTags() {
  const { t } = useLanguage();
  const rootRef = useRef<HTMLDivElement>(null);
  const anchorRefs = useRef<Array<HTMLDivElement | null>>([]);
  const bodyRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const stringRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const baseRots = useRef<number[]>([]);
  const draggingRef = useRef(false);
  const firstRunRef = useRef(true);
  const [hidden, setHidden] = useState(false);

  // Randomised per page-load so the tags never look identical.
  // These values are only applied via GSAP (client-side) so they don't
  // affect the server-rendered HTML and cause hydration mismatches.
  const variants = useMemo<Variant[]>(
    () =>
      TAGS.map((_, i) => {
        const short = i % 2 === 0;
        return {
          string: short
            ? 46 + Math.round(Math.random() * 26)
            : 128 + Math.round(Math.random() * 42),
          rot: Math.round((Math.random() * 10 - 5) * 10) / 10,
          drift: Math.round(Math.random() * 16 - 8),
        };
      }),
    [],
  );

  // Hide the tags entirely once the user scrolls down into the content.
  useEffect(() => {
    const onScroll = () => {
      const shouldHide = window.scrollY > window.innerHeight * 0.6;
      setHidden((prev) => (prev === shouldHide ? prev : shouldHide));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // "Cut" transition: tags are snipped off their thread and drop away
  // when hidden, then bounce back when the user returns to the top.
  useEffect(() => {
    if (firstRunRef.current) {
      firstRunRef.current = false;
      return;
    }
    const anchors = anchorRefs.current.filter(Boolean) as HTMLDivElement[];
    if (anchors.length === 0) return;

    if (hidden) {
      anchors.forEach((a, i) => {
        gsap.to(a, {
          y: variants[i].drift + 190 + i * 26,
          rotation: i % 2 === 0 ? -16 : 16,
          opacity: 0,
          duration: 0.45,
          ease: 'power2.in',
          delay: i * 0.04,
          overwrite: 'auto',
        });
      });
    } else {
      anchors.forEach((a, i) => {
        gsap.fromTo(
          a,
          { y: variants[i].drift - 230, opacity: 0, rotation: i % 2 === 0 ? -12 : 12 },
          {
            y: variants[i].drift,
            opacity: 1,
            rotation: 0,
            duration: 0.9,
            ease: 'bounce.out',
            delay: i * 0.05,
            overwrite: 'auto',
          },
        );
      });
    }
  }, [hidden, variants]);

  function goTo(id: string) {
    const target = document.getElementById(id);
    if (target) {
      // scrollIntoView re-tracks the element every frame, so it stays
      // accurate even with the stacked ScrollTrigger pinning.
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // "Art Caffe" section doesn't exist yet — reveal the footer instead.
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  }

  useGSAP(
    () => {
      const anchors = anchorRefs.current.filter((el): el is HTMLDivElement => Boolean(el));
      const bodies = bodyRefs.current.filter((el): el is HTMLButtonElement => Boolean(el));
      const strings = stringRefs.current.filter((el): el is HTMLSpanElement => Boolean(el));
      if (anchors.length === 0) return;

      baseRots.current = variants.map((v) => v.rot);
      const reduceMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Realistic resting poses: slight tilt + string length + vertical drift
      bodies.forEach((body, i) => {
        gsap.set(body, { rotation: baseRots.current[i], transformOrigin: '50% 0%' });
      });
      anchors.forEach((a) => gsap.set(a, { transformOrigin: '50% 0%' }));
      strings.forEach((str, i) => gsap.set(str, { height: variants[i].string }));

      // Entrance: drop from behind the header and bounce into place
      if (reduceMotion) {
        gsap.set(anchors, { opacity: 1, y: 0 });
      } else {
        anchors.forEach((anchor, i) => {
          gsap.fromTo(
            anchor,
            { y: -260, opacity: 0 },
            {
              y: variants[i].drift,
              opacity: 1,
              duration: 1.15,
              ease: 'bounce.out',
              delay: 0.35 + i * 0.09,
            },
          );
        });
      }

      // Pull-down: the string BREAKS (doesn't stretch) — the tag body
      // detaches from the thread, then springs back up and re-attaches.
      bodies.forEach((body, i) => {
        Draggable.create(body, {
          type: 'y',
          bounds: { minY: 0, maxY: 240 },
          edgeResistance: 0.85,
          dragResistance: 0.5,
          cursor: 'grabbing',
          onPress() {
            gsap.killTweensOf(body);
          },
          onDragStart() {
            draggingRef.current = true;
          },
          onDragEnd() {
            draggingRef.current = false;
            gsap.to(body, { y: 0, duration: 1.15, ease: 'elastic.out(1, 0.32)' });
          },
          onClick() {
            goTo(TAGS[i].id);
          },
        });
      });

      if (reduceMotion) return;

      // Scroll physics: tags swing with scroll velocity, then settle back
      let lastY = window.scrollY;
      let lastT = performance.now();
      let ticking = false;

      const onScroll = () => {
        if (ticking || draggingRef.current) return;
        ticking = true;
        requestAnimationFrame(() => {
          ticking = false;
          const now = performance.now();
          const y = window.scrollY;
          const dt = (now - lastT) / 1000;
          const vel = dt > 0.01 ? (y - lastY) / dt : 0;
          lastY = y;
          lastT = now;
          if (Math.abs(vel) < 80) return;

          const nudge = gsap.utils.clamp(-10, 10, vel * 0.007);
          bodies.forEach((body, j) => {
            const base = baseRots.current[j];
            gsap.to(body, {
              rotation: base + nudge,
              duration: 0.16,
              ease: 'power1.out',
              overwrite: 'auto',
            });
            gsap.to(body, {
              rotation: base,
              duration: 1.6,
              ease: 'elastic.out(1, 0.45)',
              delay: 0.12,
              overwrite: 'auto',
            });
          });
        });
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className={`${styles.root} ${hidden ? styles.rootHidden : ''}`}>
      {TAGS.map((tag, i) => (
        <div
          key={tag.id}
          ref={(el) => {
            anchorRefs.current[i] = el;
          }}
          className={styles.anchor}
        >
            <span
              ref={(el) => {
                stringRefs.current[i] = el;
              }}
              className={styles.string}
              aria-hidden="true"
            />
            <button
              ref={(el) => {
                bodyRefs.current[i] = el;
              }}
              type="button"
              className={`${styles.body} ${i % 2 === 1 ? styles.toneB : ''}`}
              aria-label={t(tag.ar, tag.en)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  goTo(tag.id);
                }
              }}
            >
              <span className={styles.grommet} aria-hidden="true" />
              <span className={styles.text}>{t(tag.ar, tag.en)}</span>
            </button>
          </div>
      ))}
    </div>
  );
}
