---
name: locomotive-scroll
description: >
  A lightweight & modern scroll library for detection, animation, and smooth scrolling.
  Built on top of Lenis. Use this skill to learn how to integrate Locomotive Scroll,
  apply parallax effects using data-scroll attributes, and manage scroll detection.
---

# Locomotive Scroll Skill

This skill provides guidelines and best practices for integrating [Locomotive Scroll](https://github.com/locomotivemtl/locomotive-scroll), a modern smooth scrolling and parallax library.

**Source**: https://github.com/locomotivemtl/locomotive-scroll

## When to Use This Skill

- Building **Parallax** effects easily using HTML attributes.
- Detecting when elements enter or leave the viewport (Intersection Observers) specifically tied to scroll.
- Implementing smooth scrolling (Note: Version 5+ is built on top of **Lenis**, combining the best of both worlds).

---

## Core Features
- **Built on Lenis**: v5+ uses Lenis under the hood for the actual smooth scrolling mechanics, ensuring top-tier performance.
- **Dual Intersection Observers**: Optimized detection for distinguishing between animation triggers and viewport detection.
- **Smart Touch Detection**: Automatically disables complex parallax on mobile devices for better performance.
- **Data Attributes**: Heavily relies on `data-scroll` HTML attributes for configuration.

---

## Setup & Integration

### 1. Installation and Basic Setup

```javascript
import LocomotiveScroll from 'locomotive-scroll';

// Initialize the scroll
const scroll = new LocomotiveScroll();
```

### 2. Required CSS
You must import the base CSS for the library to function correctly.

```css
@import 'locomotive-scroll/dist/locomotive-scroll.css';
```

---

## Parallax & Animations (Data Attributes)

Locomotive Scroll uses `data-scroll-*` attributes directly on HTML elements to create effects without writing custom JS animations.

### 1. Basic Detection
Trigger an animation or state change when an element enters the viewport.
```html
<div data-scroll>
  I will be detected when I enter the viewport.
</div>
```

### 2. Parallax Speed
Create a parallax effect by moving an element faster or slower than the regular scroll speed.
```html
<!-- Moves slower than the scroll -->
<div data-scroll data-scroll-speed="0.5">I move at half speed</div>

<!-- Moves faster than the scroll -->
<div data-scroll data-scroll-speed="2">I move at double speed</div>

<!-- Moves in the opposite direction -->
<div data-scroll data-scroll-speed="-1">I move backwards</div>
```

### 3. Horizontal Parallax
Move elements horizontally as the user scrolls vertically.
```html
<div data-scroll data-scroll-speed="1" data-scroll-direction="horizontal">
  I move sideways when you scroll down
</div>
```

---

## Best Practices

1. **Avoid Overuse**: Do not add `data-scroll` to every element on the page. Only use it for elements that actually need parallax or scroll-triggered animations. Excessive observers will degrade performance.
2. **Mobile Considerations**: Trust the library's default "Smart Touch Detection". Native scrolling is generally preferred on touch devices, and parallax is often disabled automatically to preserve battery and frame rate.
3. **Lenis Integration**: Since v5 uses Lenis internally, you typically do not need to install Lenis separately if you are only using it for smooth scrolling. However, if you need advanced Lenis features (like GSAP ScrollTrigger sync), refer to the Lenis documentation for integration patterns.
