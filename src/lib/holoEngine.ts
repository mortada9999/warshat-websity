// holoEngine.ts — Simplified holographic engine for Warshat Fan loyalty card
// Inspired by arlan.me/vault/holo — stripped to essentials:
// 3D tilt, foil parallax, glare, sweet spot, diffraction lines
// One custom material in Warshat brand colors (olive/gold/orange)

/* ── Types ─────────────────────────────────────────────────────────────── */

/** A normalised pointer/tilt reading. (0,0) is dead centre, (1,1) bottom-right. */
export interface Vec {
  x: number;
  y: number;
}

/* ── Constants ──────────────────────────────────────────────────────────── */

/** Maximum tilt degrees at the card's edge. */
export const MAX_TILT = 14;

/** Warshat brand spectral ramp — olive/gold/orange/brown. */
export const WARSHAT_HUES = [
  'hsl(38, 80%, 55%)',   // ذهبي دافئ (honey)
  'hsl(24, 75%, 48%)',   // برتقالي محروق (accent)
  'hsl(80, 35%, 42%)',   // أخضر زيتوني (olive)
  'hsl(45, 70%, 60%)',   // أصفر ترابي
  'hsl(15, 65%, 40%)',   // بني غامق
  'hsl(95, 30%, 50%)',   // أخضر فاتح
];

/* ── Utility functions ──────────────────────────────────────────────────── */

export function clamp(v: number, min = -1, max = 1): number {
  return Math.min(Math.max(v, min), max);
}

/** Remap a value from one range onto another. */
export function adjust(
  v: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number,
): number {
  return toMin + ((toMax - toMin) * (v - fromMin)) / (fromMax - fromMin);
}

/* ── Pointer helpers ────────────────────────────────────────────────────── */

/** Pointer position within an element, normalised to -1..1 from its centre. */
export function fromPointer(rect: DOMRect, cx: number, cy: number): Vec {
  return {
    x: clamp(((cx - rect.left) / rect.width) * 2 - 1),
    y: clamp(((cy - rect.top) / rect.height) * 2 - 1),
  };
}

/** Touch position within an element, normalised to -1..1 from its centre. */
export function fromTouch(rect: DOMRect, touch: Touch): Vec {
  return fromPointer(rect, touch.clientX, touch.clientY);
}

/* ── Damped follower ────────────────────────────────────────────────────── */

/**
 * A damped follower. Not a spring — a simple exponential ease toward a target.
 * Lower stiffness = heavier, more lag.
 */
export class Follow {
  value: Vec = { x: 0, y: 0 };
  target: Vec = { x: 0, y: 0 };
  velocity: Vec = { x: 0, y: 0 };
  speed = 0;

  constructor(private stiffness: number) {}

  step() {
    const px = this.value.x;
    const py = this.value.y;
    this.value.x += (this.target.x - this.value.x) * this.stiffness;
    this.value.y += (this.target.y - this.value.y) * this.stiffness;
    this.velocity.x = this.value.x - px;
    this.velocity.y = this.value.y - py;
    const raw = Math.min(1, Math.hypot(this.velocity.x, this.velocity.y) * 14);
    this.speed += (raw - this.speed) * (raw > this.speed ? 0.45 : 0.06);
  }

  get settled(): boolean {
    return (
      Math.abs(this.target.x - this.value.x) < 0.0006 &&
      Math.abs(this.target.y - this.value.y) < 0.0006 &&
      this.speed < 0.004
    );
  }
}

/* ── Kick (release overshoot) ───────────────────────────────────────────── */

/**
 * One-shot overshoot on pointer release. Carries past a little on the axis
 * you were pushing, scaled by release speed.
 */
export class Kick {
  private amount: Vec = { x: 0, y: 0 };
  private life = 0;

  fire(v: Vec, gain = 2.6) {
    const mag = Math.hypot(v.x, v.y);
    if (mag < 0.002) return;
    this.amount = { x: v.x * gain, y: v.y * gain };
    this.life = 1;
  }

  step(): Vec {
    if (this.life <= 0) return { x: 0, y: 0 };
    this.life = Math.max(0, this.life - 0.035);
    const e = Math.sin(this.life * Math.PI) * this.life;
    return { x: this.amount.x * e, y: this.amount.y * e };
  }

  get active(): boolean {
    return this.life > 0;
  }
}

/* ── Rainbow gradient builder ───────────────────────────────────────────── */

function rainbow(angle: string, space: string, hues: string[] = WARSHAT_HUES): string {
  const stops = hues
    .map((c, i) => `${c} calc(${space} * ${i + 1})`)
    .concat(`${hues[0]} calc(${space} * ${hues.length + 1})`)
    .join(', ');
  return `repeating-linear-gradient(${angle}, ${stops})`;
}

/* ── Foil material ──────────────────────────────────────────────────────── */

export interface FoilLayer {
  img: string;
  size: string;
  rate: number;
  bgBlend?: string;
  blend: string;
  filter: string;
  base: number;
  gain: number;
}

export interface FoilMaterial {
  layers: FoilLayer[];
  parallax: number;
  bloom: number;
  glare: number;
}

/** The single Warshat material — olive/gold spectral with diffraction lines. */
export const WARSHAT_FOIL: FoilMaterial = {
  layers: [
    {
      // Main spectral sheet
      img: rainbow('10deg', '8%'),
      size: '380% 380%',
      rate: 1,
      blend: 'overlay',
      filter: 'brightness(1.08) contrast(2.3) saturate(1.5)',
      base: 0.26,
      gain: 0.6,
    },
    {
      // Crossing sheet at different angle and BACKWARDS
      img: rainbow('104deg', '13%'),
      size: '300% 300%',
      rate: -0.7,
      blend: 'color-dodge',
      filter: 'brightness(.82) contrast(2) saturate(1.7)',
      base: 0.14,
      gain: 0.34,
    },
    {
      // Fine diffraction lines
      img: 'repeating-linear-gradient(96deg, rgba(255,255,255,.5) 0px, rgba(255,255,255,0) 2px, rgba(0,0,0,.16) 3px, rgba(255,255,255,0) 5px)',
      size: 'auto',
      rate: 1.8,
      blend: 'overlay',
      filter: 'contrast(1.3)',
      base: 0.1,
      gain: 0.26,
    },
  ],
  parallax: 0.26,
  bloom: 0.55,
  glare: 0.55,
};

const LAYER_SLOTS = 3;

/* ── Apply static foil properties ───────────────────────────────────────── */

export function applyFoil(card: HTMLElement, foil: FoilMaterial): void {
  const s = card.style;
  s.setProperty('--glare-o', `${foil.glare}`);

  for (let i = 0; i < LAYER_SLOTS; i++) {
    const n = `--l${i + 1}`;
    const L = foil.layers[i];
    if (!L) {
      s.setProperty(`${n}-img`, 'none');
      s.setProperty(`${n}-o`, '0');
      continue;
    }
    s.setProperty(`${n}-img`, L.img);
    s.setProperty(`${n}-size`, L.size);
    s.setProperty(`${n}-bgblend`, L.bgBlend ?? 'normal');
    s.setProperty(`${n}-blend`, L.blend);
    s.setProperty(`${n}-filter`, L.filter);
  }
}

/* ── Apply per-frame CSS variables ──────────────────────────────────────── */

export function applyFrame(
  card: HTMLElement,
  tilt: Vec,
  sheet: Vec,
  foil: FoilMaterial,
  time: number,
  speed: number = 0,
  velocity: Vec = { x: 0, y: 0 },
): void {
  const { x, y } = tilt;
  const s = card.style;

  // Card rotation
  s.setProperty('--rx', `${(-y * MAX_TILT).toFixed(2)}deg`);
  s.setProperty('--ry', `${(x * MAX_TILT).toFixed(2)}deg`);

  const p = foil.parallax;

  // Per-layer position
  for (let i = 0; i < LAYER_SLOTS; i++) {
    const L = foil.layers[i];
    if (!L) continue;
    const t = p * L.rate;
    const n = `--l${i + 1}`;
    s.setProperty(`${n}-x`, `${adjust(sheet.x, -1, 1, 50 - t * 100, 50 + t * 100).toFixed(1)}%`);
    s.setProperty(`${n}-y`, `${adjust(sheet.y, -1, 1, 50 - t * 100, 50 + t * 100).toFixed(1)}%`);
  }

  // Distance from face-on
  const off = Math.min(1, Math.hypot(x, y));
  s.setProperty('--off', off.toFixed(3));

  // Sweet spot — off-centre for discovery
  const SPOT = { x: -0.42, y: -0.36 };
  const dSpot = Math.hypot(sheet.x - SPOT.x, sheet.y - SPOT.y);
  const hit = Math.max(0, 1 - dSpot / 0.34);
  const spotBloom = hit * hit * (3 - 2 * hit);

  // Slow resting breath
  const breathNow =
    0.5 + 0.5 * Math.sin(time * 0.5) * Math.cos(time * 0.31);

  // Per-layer opacity
  for (let i = 0; i < LAYER_SLOTS; i++) {
    const L = foil.layers[i];
    if (!L) continue;
    let o = Math.max(0, L.base + off * L.gain * (foil.bloom / 0.5));
    o *= 1 + spotBloom * 0.85;
    o *= 0.94 + breathNow * 0.06;
    s.setProperty(`--l${i + 1}-o`, Math.min(1, o).toFixed(3));
  }

  // Glare tracks pointer directly
  s.setProperty('--gx', `${adjust(x, -1, 1, 12, 88).toFixed(1)}%`);
  s.setProperty('--gy', `${adjust(y, -1, 1, 12, 88).toFixed(1)}%`);

  // Sweet spot intensity
  s.setProperty('--spot', spotBloom.toFixed(3));

  // Embossing
  s.setProperty('--emboss-x', `${(-x * 0.9).toFixed(2)}px`);
  s.setProperty('--emboss-y', `${(-y * 0.9).toFixed(2)}px`);

  // Edge catches
  s.setProperty('--edge-l', Math.max(0, -x).toFixed(3));
  s.setProperty('--edge-r', Math.max(0, x).toFixed(3));
  s.setProperty('--edge-t', Math.max(0, -y).toFixed(3));
  s.setProperty('--edge-b', Math.max(0, y).toFixed(3));

  // Breath
  s.setProperty('--breath', breathNow.toFixed(3));

  // Velocity streak
  const vmag = Math.hypot(velocity.x, velocity.y);
  if (vmag > 0.0001) {
    s.setProperty(
      '--smear-angle',
      `${(Math.atan2(velocity.y, velocity.x) * (180 / Math.PI)).toFixed(0)}deg`,
    );
  }
  s.setProperty('--smear', (Math.min(1, speed) * 0.8).toFixed(3));
}
