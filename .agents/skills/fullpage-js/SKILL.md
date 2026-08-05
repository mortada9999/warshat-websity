---
name: fullpage-js
description: >
  A library for creating fullscreen scrolling websites (single page websites) 
  and landscape sliders inside sections. Use this skill to learn the HTML structure,
  initialization options, and how to use fullPage.js API methods.
---

# fullPage.js Skill

This skill provides guidelines for integrating [fullPage.js](https://alvarotrigo.com/fullPage/), a powerful library for creating fullscreen scrolling websites.

**Source**: https://github.com/alvarotrigo/fullPage.js

## When to Use This Skill

- Building a **"One Page"** website where every scroll snaps to a fullscreen section.
- Creating **presentation-like** web pages with vertical sections and horizontal slides.
- Handling complex navigation (anchors, menus, lazy loading) inside a fullscreen context.

---

## Setup & HTML Structure

### 1. Initialization
You must include the CSS and JS files, and initialize the plugin on a wrapper element.

```javascript
// Basic Initialization
new fullpage('#fullpage', {
  autoScrolling: true,
  scrollHorizontally: true,
  navigation: true, // Shows the right side dots
  anchors: ['firstPage', 'secondPage', 'thirdPage'], // URL anchors
});
```

### 2. Required HTML Structure
You **must** use specific classes for the library to detect sections and slides.
- `#fullpage`: The main wrapper (cannot be the `<body>`).
- `.section`: Fullscreen vertical sections.
- `.slide`: Fullscreen horizontal slides (must be nested inside a `.section`).

```html
<div id="fullpage">
  <!-- Section 1 (Vertical) -->
  <div class="section" data-anchor="firstPage">
    <h1>Section 1</h1>
  </div>
  
  <!-- Section 2 (With Horizontal Slides) -->
  <div class="section" data-anchor="secondPage">
    <div class="slide">Slide 2.1</div>
    <div class="slide">Slide 2.2</div>
  </div>
  
  <!-- Section 3 (Auto height for footers) -->
  <div class="section fp-auto-height">
    <footer>My Footer (Not fullscreen)</footer>
  </div>
</div>
```

---

## Important Features & Configurations

### 1. Auto Height Sections (Footers)
By default, every `.section` takes 100vh. If you have a footer or a smaller section, you must add the `fp-auto-height` class to it.

```html
<div class="section fp-auto-height">Content dictates height</div>
```

### 2. Normal Scroll Elements
If you have a map, a textarea, or a div with its own scrollbar (like terms and conditions), you need to prevent fullPage.js from hijacking the scroll inside that element.
Add the option: `normalScrollElements: '#myScrollableDiv, .map-container'`

### 3. Scroll Overflow
If a section's content is taller than the viewport (100vh), you need to enable the scrollOverflow option to allow scrolling *inside* that specific section.
```javascript
new fullpage('#fullpage', {
  scrollOverflow: true
});
```

### 4. CSS State Classes
fullPage.js adds helpful state classes to the `body` and elements:
- `active`: Added to the current visible `.section` and `.slide`.
- `fp-viewing-SECTION-SLIDE`: Added to the `<body>` (e.g., `fp-viewing-secondPage-0`). Useful for changing global styles based on the active page.

---

## API Methods

You can interact with the plugin programmatically using the `fullpage_api` global object.

```javascript
// Move between sections
fullpage_api.moveSectionUp();
fullpage_api.moveSectionDown();
fullpage_api.moveTo('secondPage', 1); // moveTo(sectionAnchor, slideIndex)

// Disable/Enable Scrolling (Useful when opening modals)
fullpage_api.setAllowScrolling(false);
fullpage_api.setAllowScrolling(true);
```

---

## Licensing Note
fullPage.js requires a license key for commercial projects. For open-source projects (GPLv3), you can request an open-source license. Always provide the `licenseKey: 'YOUR_KEY_HERE'` in the options.
