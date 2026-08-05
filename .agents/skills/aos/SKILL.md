---
name: aos
description: >
  A lightweight CSS3 driven scroll animation library (Animate On Scroll).
  Use this skill to learn how to initialize AOS, apply animation data-attributes,
  and configure global or element-specific settings.
---

# AOS (Animate On Scroll) Skill

This skill provides guidelines and best practices for integrating [AOS](https://github.com/michalsnik/aos), a lightweight library to animate elements on your page as you scroll.

**Source**: https://github.com/michalsnik/aos

## When to Use This Skill

- Adding simple, CSS-driven **entry animations** (fades, flips, slides, zooms) when elements scroll into view.
- Triggering animations repeatedly or only once based on scroll position.
- Implementing lightweight scroll animations without heavy JS calculation (unlike GSAP or Locomotive Scroll, AOS mostly toggles classes to trigger CSS transitions).

---

## Setup & Integration

### 1. Initialization
You must include the CSS and JS files, and then call `AOS.init()`.

```html
<!-- CSS -->
<link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />

<!-- JS -->
<script src="https://unpkg.com/aos@next/dist/aos.js"></script>
<script>
  AOS.init();
</script>
```

*(If using an ES6 module/bundler, you can `import AOS from 'aos'; import 'aos/dist/aos.css'; AOS.init();`)*

### 2. Global Settings
You can pass an options object to `AOS.init()` to define global behaviors for all elements.

```javascript
AOS.init({
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
  
  // Advanced
  disable: 'mobile' // Disable on mobile devices. Can be 'mobile', 'phone', 'tablet', or a function returning boolean.
});
```

---

## Usage (Data Attributes)

AOS is entirely controlled via `data-aos` attributes in your HTML.

### 1. Basic Animation
```html
<div data-aos="fade-up"></div>
<div data-aos="zoom-in"></div>
```

### 2. Element-Specific Settings
You can override global settings for a specific element.

```html
<div 
  data-aos="fade-up"
  data-aos-offset="200"
  data-aos-delay="50"
  data-aos-duration="1000"
  data-aos-easing="ease-in-out"
  data-aos-once="true">
</div>
```

### 3. Anchors
You can trigger an element's animation based on the scroll position of a *different* element.

```html
<!-- This div will animate when .example-selector enters the viewport -->
<div data-aos="fade-left" data-aos-anchor=".example-selector"></div>
```

---

## Animation Types

AOS provides several predefined animations out of the box:

- **Fade**: `fade`, `fade-up`, `fade-down`, `fade-left`, `fade-right`, `fade-up-right`, `fade-up-left`, `fade-down-right`, `fade-down-left`
- **Flip**: `flip-up`, `flip-down`, `flip-left`, `flip-right`
- **Slide**: `slide-up`, `slide-down`, `slide-left`, `slide-right`
- **Zoom**: `zoom-in`, `zoom-in-up`, `zoom-in-down`, `zoom-in-left`, `zoom-in-right`, `zoom-out`, `zoom-out-up`, `zoom-out-down`, `zoom-out-left`, `zoom-out-right`

## Important Methods

If the DOM changes (e.g., loading new elements via AJAX/React), you might need to manually tell AOS to recalculate elements.

- `AOS.refresh()`: Recalculates all offsets and positions (called automatically on window resize).
- `AOS.refreshHard()`: Re-initializes the array of AOS elements and triggers a refresh (called automatically on DOM mutations, but may need manual calling in older browsers or specific JS framework lifecycles).
