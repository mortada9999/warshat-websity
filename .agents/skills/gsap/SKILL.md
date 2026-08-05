---
name: gsap
description: >
  GSAP (GreenSock Animation Platform) is the industry standard JavaScript animation library.
  Use this skill to learn how to create high-performance animations, timelines, and 
  scroll-driven effects using ScrollTrigger. Also includes best practices for React integration.
---

# GSAP (GreenSock Animation Platform) Skill

This skill provides guidelines and best practices for developing with [GSAP](https://gsap.com), the industry standard for high-performance JavaScript animation.

**Source**: https://github.com/greensock/GSAP

## When to Use This Skill

- Creating **complex animation sequences** (using `gsap.timeline()`).
- Building **Scroll-Driven Animations** (using the `ScrollTrigger` plugin).
- Animating SVG paths, React components, Canvas, or generic objects.
- Handling responsive animations with `gsap.matchMedia()`.

---

## Core Concepts & Basics

### 1. The Tweens (`gsap.to`, `gsap.from`, `gsap.fromTo`)
A Tween is a single movement or animation.
```javascript
// Animates an element TO the specified values
gsap.to(".box", { x: 100, opacity: 1, duration: 1, ease: "power2.out" });

// Animates an element FROM the specified values to its current natural state
gsap.from(".box", { y: -50, opacity: 0, duration: 1.5 });

// Animates FROM one state TO another
gsap.fromTo(".box", { opacity: 0 }, { opacity: 1, duration: 1 });
```

### 2. Timelines (`gsap.timeline`)
Timelines are used to chain multiple tweens together, creating complex sequences.
```javascript
const tl = gsap.timeline({ defaults: { duration: 1, ease: "power1.inOut" } });

tl.to(".box1", { x: 100 })
  .to(".box2", { y: 50 }, "-=0.5") // Starts 0.5 seconds before the previous tween ends
  .to(".box3", { rotation: 360 });
```

---

## ScrollTrigger Plugin (Crucial for Modern Web)

`ScrollTrigger` is the standard for scroll-based animations in GSAP.
*Always register the plugin before using it.*

```javascript
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Basic Example: Pin an element and scrub its animation based on scroll
gsap.to(".animate-me", {
  x: 500,
  scrollTrigger: {
    trigger: ".trigger-section", // The element that triggers the animation
    start: "top center", // When the TOP of the trigger hits the CENTER of the viewport
    end: "bottom top", // When the BOTTOM of the trigger hits the TOP of the viewport
    scrub: true, // Links the animation progress directly to the scrollbar
    pin: true, // Pins the trigger element in place while animating
    markers: false // Set to true during development to see the start/end points
  }
});
```

---

## React Integration (`@gsap/react`)

If using React (or Next.js), **always** use the `@gsap/react` package and the `useGSAP()` hook. It acts as a drop-in replacement for `useEffect` and handles automatic cleanup of animations (preventing memory leaks and double-firing issues in Strict Mode).

```bash
npm install gsap @gsap/react
```

```jsx
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function MyComponent() {
  const container = useRef();

  // The hook handles cleanup automatically!
  useGSAP(() => {
    // gsap code here...
    gsap.to(".box", { x: 100, rotation: 360 });
  }, { scope: container }); // Scopes the selector to the container ref

  return (
    <div ref={container} className="app">
      <div className="box">Animate Me</div>
    </div>
  );
}
```

---

## Responsive Animations (`gsap.matchMedia`)

Use `gsap.matchMedia()` to run specific animations only on certain screen sizes. It automatically cleans up and reverts animations when the media query no longer matches.

```javascript
let mm = gsap.matchMedia();

mm.add("(min-width: 800px)", () => {
  // Desktop animations
  gsap.to(".box", { x: 200 });
  
  return () => { 
    // Optional custom cleanup function
  };
});

mm.add("(max-width: 799px)", () => {
  // Mobile animations
  gsap.to(".box", { y: 100 });
});
```

---

## Notes & Best Practices
- **FREE Plugins**: As of late 2024, all GSAP plugins (SplitText, MorphSVG, FLIP, etc.) are 100% free even for commercial use.
- **Never animate `top`, `left`, `margin`, or `width`** if you can avoid it. Always animate `x`, `y`, `scale`, `rotation`, and `opacity` for hardware-accelerated, buttery smooth 60fps+ performance.
- Use `ease` functions to make animations feel natural (e.g., `"power2.out"`, `"elastic.out(1, 0.3)"`).
