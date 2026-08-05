---
name: lenis
description: >
  A lightweight, robust, and performant smooth scroll library by darkroom.engineering.
  Use this skill to learn how to integrate smooth scrolling into web projects, 
  configure Lenis settings, and synchronize it with GSAP or React/Vue.
---

# Lenis Smooth Scroll Skill

This skill provides guidelines and best practices for integrating [Lenis](https://github.com/darkroomengineering/lenis), a lightweight and performant smooth scrolling library.

**Source**: https://github.com/darkroomengineering/lenis

## When to Use This Skill

- Implementing **smooth scrolling** on web pages.
- Synchronizing scroll animations with **WebGL** or **GSAP ScrollTrigger**.
- Handling **nested scrollable elements** (like modals or sidebars) without breaking the smooth scroll.
- Integrating smooth scroll in frameworks like React, Vue, or Framer.

---

## Core Features
- **Lightweight & Dependency-free**: Zero runtime dependencies.
- **Native Scroll**: Wraps the browser's own scroll, so `position: sticky`, anchor links, and accessibility continue to work.
- **Built for Sync**: Drives WebGL scenes, GSAP ScrollTrigger, and parallax effects using a single RequestAnimationFrame (RAF) loop.

---

## Setup & Integration

### 1. Basic Vanilla JS Setup
You must initialize Lenis and typically run it inside a `requestAnimationFrame` loop (unless using the new `autoRaf: true` option).

```javascript
import Lenis from 'lenis';

// Modern approach (autoRaf handles the loop)
const lenis = new Lenis({
  autoRaf: true,
});

// Traditional approach (Custom loop)
/*
const lenis = new Lenis();
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
*/
```

### 2. Required CSS
Lenis requires specific CSS to prevent scrolling glitches. You must either import it or link it.

```javascript
// If using a bundler
import 'lenis/dist/lenis.css';
```
```html
<!-- If using plain HTML -->
<link rel="stylesheet" href="https://unpkg.com/lenis@1.3.25/dist/lenis.css">
```

### 3. GSAP ScrollTrigger Integration (CRITICAL)
If you are using GSAP's `ScrollTrigger`, you **must** synchronize Lenis with GSAP's ticker to prevent jittery animations.

```javascript
const lenis = new Lenis();

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on('scroll', ScrollTrigger.update);

// Add Lenis's raf to GSAP's ticker
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent delay in scroll animations
gsap.ticker.lagSmoothing(0);
```

---

## Important Considerations

### 1. Nested Scroll (Modals, Sidebars, etc.)
By default, Lenis hijacks the main scroll. If you have an overflowing `div` (e.g., a modal or sidebar), it won't scroll properly unless you tell Lenis to ignore it.

**Method A: Using `allowNestedScroll` (Easiest but impacts performance)**
```javascript
const lenis = new Lenis({ allowNestedScroll: true })
```

**Method B: Using HTML Attributes (Recommended)**
Add the `data-lenis-prevent` attribute to the scrollable container.
```html
<div class="my-modal-or-sidebar" data-lenis-prevent>
  <!-- Scrollable content here -->
</div>
```
*(Other attributes include `data-lenis-prevent-wheel`, `data-lenis-prevent-touch`, etc.)*

### 2. Anchor Links (Jump to Section)
By default, Lenis prevents native anchor links from jumping abruptly. To enable smooth scrolling to anchors:

```javascript
const lenis = new Lenis({
  anchors: true // or pass an object { offset: 100 }
});
```

---

## Important Settings (`new Lenis(options)`)

| Option | Default | Description |
|--------|---------|-------------|
| `autoRaf` | `false` | Automatically run `requestAnimationFrame` loop. |
| `lerp` | `0.1` | Linear interpolation intensity (0 to 1). Lower is slower/smoother. |
| `duration` | `1.2` | Animation duration (in seconds). Ignored if `lerp` is defined. |
| `wheelMultiplier`| `1` | Speed multiplier for mouse wheels. |
| `orientation` | `vertical` | Scroll axis (`vertical` or `horizontal`). |
| `syncTouch` | `false` | Mimic touch device scroll while allowing scroll sync (can be unstable on iOS < 16). |
| `prevent` | `undefined` | Function to manually prevent smooth scroll: `(node) => node.id === 'modal'` |

---

## Common Limitations & Troubleshooting
- **CSS Scroll Snap**: Lenis does not support native CSS `scroll-snap-type`. You must use the `@studio-freight/lenis/snap` plugin.
- **iframes**: Smooth scroll stops working when hovering over iframes because they capture wheel events.
- **Position Fixed on Old Safari**: `position: fixed` might lag on older macOS Safari versions (pre-M1).
- **GSAP Jitter**: If animations jitter, make sure you disabled `gsap.ticker.lagSmoothing(0)` and synced `ScrollTrigger.update`.
