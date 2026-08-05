---
name: html5-boilerplate
description: >
  A professional front-end template for building fast, robust, and adaptable web apps or sites.
  This skill provides best practices, setup commands, and core concepts of HTML5 Boilerplate
  for starting new projects with a solid foundation.
---

# HTML5 Boilerplate Skill

This skill provides guidelines and best practices based on [HTML5 Boilerplate](https://html5boilerplate.com/), a professional front-end template for building fast, robust, and adaptable web apps or sites.

**Source**: https://github.com/h5bp/html5-boilerplate

## When to Use This Skill

- Setting up a **new web project** from scratch without a heavy framework.
- Looking for standard **HTML structure**, meta tags, and Open Graph configurations.
- Applying baseline **CSS normalizations** and helper classes.
- Configuring a robust frontend starting point for progressive enhancement.

---

## Quick Start

If you want to start a new project using HTML5 Boilerplate, use the following `npx` command to fetch the latest template without cloning the entire repository:

```bash
npx create-html5-boilerplate new-site
cd new-site
npm install
npm run start
```

*Note: The actual repository contains build tools for the template itself. You only need the generated output (the `dist/` folder equivalents) for your own projects.*

---

## Core Features & Best Practices

### 1. The HTML Structure (`index.html`)
HTML5 Boilerplate provides an optimized `index.html` that includes:
- **`<!doctype html>`**: The standard HTML5 doctype.
- **Language Attribute**: `<html class="no-js" lang="">` (includes `no-js` class which is replaced by `js` via Modernizr/scripts if JavaScript is enabled).
- **Meta Charset**: `<meta charset="utf-8">`
- **Viewport**: `<meta name="viewport" content="width=device-width, initial-scale=1">` for responsive mobile design.
- **Open Graph**: Placeholder `<meta property="og:...">` tags for social sharing.
- **Web App Manifest**: `<link rel="manifest" href="site.webmanifest">` for PWA capabilities.
- **Favicons**: Links to `favicon.ico` and apple touch icons.

### 2. CSS Architecture (`main.css`)
The default CSS is designed to be a solid foundation:
- **Normalization**: It includes `normalize.css` to render elements consistently across all browsers.
- **Base Styles**: Opinionated defaults for typography and base elements.
- **Helper Classes**:
  - `.hidden`: Visually hidden and hidden from screen readers.
  - `.sr-only`: Visually hidden but accessible to screen readers (useful for accessibility).
  - `.clearfix`: Clear floats without extra markup.
- **Media Queries**: Placeholder sections for responsive design.
- **Print Styles**: Optimized styles that hide unnecessary elements (like navigation) and expand links/URLs for printed pages.

### 3. JavaScript (`main.js` & `plugins.js`)
- **`plugins.js`**: Avoids `console` errors in browsers that lack a console, and serves as a place to put third-party jQuery/JS plugins.
- **`main.js`**: A blank slate for your application's specific JavaScript.

### 4. Browser Support
HTML5 Boilerplate supports the latest, stable releases of all major browsers, relying on the `default` configuration from Browserslist.

### 5. Other Important Files
- **`robots.txt`**: A starter file for search engine crawlers.
- **`site.webmanifest`**: Configuration for progressive web apps (PWA) and mobile home screen icons.
- **`.editorconfig`**: Maintains consistent coding styles between different editors and IDEs.

---

## Development Philosophy

1. **Progressive Enhancement**: Start with a solid HTML core that works without JavaScript, then enhance it with CSS and JS.
2. **Delete-key Friendly**: The boilerplate is designed to be comprehensive but easy to strip down. Delete the parts you don't need (e.g., if you don't need Google Analytics snippets or certain helper classes, just remove them).
3. **Agnostic**: It does not impose a specific framework (like React or Vue) or CSS methodology (like Tailwind or Bootstrap). It is just the standard web platform.
