---
name: spellbook-of-modern-webdev
description: >
  Comprehensive knowledge base from dexteryy/spellbook-of-modern-webdev — a curated
  taxonomy of 2000+ modern JavaScript web development resources. Covers Open Web Platform,
  HTML5/Web APIs, CSS Features, Modern CSS, Modern JS/ES6+, Node.js, npm ecosystem,
  GUI frameworks (React/Redux), UI toolkits, UX/graphic libraries, server-side best
  practices, testing, toolchain (Webpack/Vite/Babel), workflow, and IDE setup. Use for
  library selection, architecture decisions, best practices lookup, and learning paths.
---

# Spellbook of Modern Web Dev

A curated knowledge base derived from the [Spellbook of Modern Web Dev](https://github.com/dexteryy/spellbook-of-modern-webdev) — a Big Picture, Thesaurus, and Taxonomy of Modern JavaScript Web Development with **2000+ curated links**.

**Source**: https://github.com/dexteryy/spellbook-of-modern-webdev

## When to Use This Skill

- Selecting **libraries and tools** for a specific problem domain
- Making **architecture and infrastructure** decisions
- Looking up **best practices** for CSS, JS, Node.js, APIs, etc.
- Finding **learning resources** for web technologies
- Understanding **the full landscape** of modern web development

---

## Master Index

### 1. Platforms & Languages

#### Open Web Platform
- **Learning**: MDN Learn Web Development, Google Web Fundamentals
- **Reference**: MDN Web Docs, Google Developers, CSSDB, CSS-Tricks Almanac
- **Performance**: Rendering (how browsers work, GPU animation, `will-change`, CSS containment), Loading (DNS, script loading, critical rendering path), Measurement (RAIL, Navigation/Resource/User Timing), Optimization (Lighthouse, Core Web Vitals)
- **Security**: HTTPS, CSP, CORS, XSS/CSRF prevention, HTML5 Security Cheatsheet
- **Semantics/SEO/a11y**: Semantic HTML, structured data, ARIA, a11y project

#### HTML5 / Web APIs
| Category | Key APIs |
|----------|---------|
| **HTML/DOM** | You Might Not Need jQuery, HEAD tags, favicon, Mutation Observers |
| **Appearance** | Web Components (Shadow DOM v1, Custom Elements v1), Web Animations API |
| **Interaction** | MouseEvent, TouchEvent, PointerEvent, Intersection/Resize Observer, Gamepad, Web Speech |
| **Access** | URL, History, Navigator, Page Visibility, Clipboard, Permissions, Geolocation, Notifications |
| **Network** | Fetch API, XMLHttpRequest2, WebSocket, Server-Sent Events, WebRTC |
| **Offline** | Web Storage, IndexedDB, FileReader/Blob, Service Workers, PWA |
| **Media** | `<video>`, `<audio>`, Web Audio API, Media Streams |
| **Graphics** | SVG, Canvas, WebGL, WebXR |
| **Computing** | Web Crypto, Web Workers, WebAssembly |

#### CSS Features
- **Basics**: Selectors (CSS4→CSS1), pseudo-classes/elements, `@supports`, Houdini
- **Responsive**: Media queries, responsive images, fluid units (`rem`, `em`, `vh`, `vw`)
- **Layout**: Flexbox, CSS Grid, traditional (floats, positioning, z-index, centering)
- **Typography**: `@font-face`, font loading strategies, vertical rhythm
- **Animation**: CSS Transitions, 3D transforms, CSS Animation, motion paths
- **Effects**: Blend modes, filters, clipping/masking, shapes, reflections

#### Modern CSS / Next-Gen CSS
- **Component CSS**: Utility-first/Atomic CSS, CSS Modules, Styled-Components/Emotion
- **Preprocessors**: PostCSS, preset-env, custom properties, `calc()`
- **Best Practices**: Sanitize/Normalize/Reset, BEM, OOCSS, SMACSS, ITCSS
- **Code Style**: Idiomatic CSS, Airbnb CSS/Sass Styleguide
- **Design Knowledge**: RWD patterns, motion design, grid systems (8-pt grid), Atomic Design, design systems & tokens, style guides

#### Modern JS / Next-Gen JS
- **ES6+ Features**: Overview, Babel REPL, feature comparison
- **Deep Dive**: Exploring ES6 (Dr. Axel), ES6 In Depth (MDN), Understanding ES6 (Zakas)
- **Core Concepts**: Closures, prototypes, event loop, memory, modules, `this`, hoisting
- **Books**: Eloquent JS, Speaking JS, You Don't Know JS
- **Important Proposals**: ESM, Dynamic Import, Class Fields, Decorators, async/await, Observables
- **Functional Programming**: Composing Software, Ramda, Lodash/FP, Fantasy Land, ADTs
- **FRP**: RxJS, Reactive Programming intro, RxMarbles
- **Static Typing**: TypeScript, Flow, JSDoc
- **Code Style**: Airbnb JS Style Guide, Clean Code JS, Node.js Style Guide

#### Node.js
- **Intro**: Art of Node, Event Loop, Garbage Collection, Streams
- **Workshop**: NodeSchool, learnyounode
- **Best Practices**: The Node Way, Joyent Production Practices, Heroku Best Practices

---

### 2. Universal Web Apps / Web Pages

#### GUI Framework (React Ecosystem)
- **View**: React (JSX, Components, Hooks, Lifecycle)
- **State**: Redux (Store, Actions, Reducers, Middleware, Selectors)
- **Data**: GraphQL (Apollo, Relay)
- **Architecture Patterns**: MVC, MVP, MVVM, Flux, Redux, Elm, SAM

#### UI Toolkits
| Type | Top Picks |
|------|-----------|
| **CSS Frameworks** | Tailwind CSS, Bootstrap |
| **React UI** | Material UI, Ant Design, Chakra UI, shadcn/ui |

#### Standalone UI Components
| Category | Examples |
|----------|---------|
| **Layout** | Masonry, virtual lists, responsive grids |
| **Icon** | react-icons, Heroicons, Lucide |
| **Form** | React Hook Form, Formik, input masks |
| **Overlay** | Modals, popovers, tooltips, toasts |
| **Picker** | Date pickers, color pickers, file uploaders |
| **Content** | Carousels, tables, markdown renderers |
| **Editor** | Rich text (Tiptap, Slate), code editors (Monaco, CodeMirror) |

---

### 3. Client Side

#### UX Libraries
- **Drag & Drop**: dnd-kit, react-beautiful-dnd
- **Gesture**: Hammer.js, use-gesture
- **Scrolling**: Smooth scroll, infinite scroll, virtual scroll
- **Zoom**: Pinch zoom, image zoom
- **Tooltip/Tour**: Tippy.js, React Joyride

#### Graphic Libraries
- **Animation**: GSAP, Framer Motion, Lottie, anime.js
  - Effects, loading spinners, scroll-triggered, parallax, transitions, motion paths
- **2D**: Canvas libs (Fabric.js, Konva), SVG libs (Snap.svg, D3), physics (Matter.js)
- **3D**: Three.js, Babylon.js, R3F (React Three Fiber)
- **Data Visualization**: D3.js, Chart.js, Recharts, Nivo, Victory
- **Game**: Phaser, PixiJS

#### Hybrid / Cross-Platform
- **Desktop**: Electron, Tauri
- **Mobile**: React Native, Flutter, Expo

---

### 4. Server Side

#### Network
- **HTTP**: Same-origin policy, performance, HTTPS, HTTP/2, HTTP/3, gRPC
- **Real-time**: WebSockets, SSE, WebRTC

#### Server-side Best Practices
- **API Design**: RESTful, GraphQL, gRPC
- **Architecture**: Microservices, API Gateway, Serverless, SaaS patterns
- **Infrastructure**: Cloud/distributed vs self-hosted
- **Security**: Auth (OAuth, JWT, sessions), rate limiting, input validation
- **Operations**: Logging, monitoring, APM, error tracking, DevOps, CI/CD

#### Cloud Services
| Category | Services |
|----------|---------|
| **Compute (FaaS)** | AWS Lambda, Cloudflare Workers, Vercel Edge Functions |
| **Compute (PaaS)** | Vercel, Railway, Render, Fly.io |
| **Storage** | S3, Cloudflare R2, Supabase Storage |
| **Database** | Supabase, PlanetScale, Neon, Turso, MongoDB Atlas |
| **Auth** | Auth.js, Clerk, Supabase Auth, Firebase Auth |
| **Search** | Algolia, Meilisearch, Typesense |
| **Email** | SendGrid, Resend, Postmark |

---

### 5. Tooling

#### Testing
| Level | Tools |
|-------|-------|
| **Unit** | Jest, Vitest, Node Test Runner |
| **Integration** | React Testing Library, MSW |
| **E2E** | Playwright, Cypress |
| **Visual** | Storybook, Chromatic |
| **Load** | k6, Artillery |
| **Analysis** | Code coverage (c8, Istanbul), security audits |

#### Documentation
- **JS/API**: JSDoc, TypeDoc, Swagger/OpenAPI
- **Style Guide**: Storybook, Styleguidist
- **Writing**: Markdown, MDX, Docusaurus

#### Toolchain
| Stage | Tools |
|-------|-------|
| **Compiler/Transpiler** | Babel, SWC, TypeScript, PostCSS |
| **Bundler** | Vite, Webpack, Rollup, esbuild, Turbopack |
| **Minifier** | Terser, cssnano, imagemin, sharp |
| **Formatter** | Prettier, Biome |
| **Linter** | ESLint, Stylelint, Biome |
| **Task Automation** | npm scripts, Turborepo, nx |

#### Workflow
| Phase | Tools |
|-------|-------|
| **Dev** | Hot reload, dev tools, HTTP inspector, debugging proxy |
| **Deploy** | Docker, Kubernetes, Vercel, PM2 |
| **Monitor** | Sentry, LogRocket, Datadog, New Relic |

#### IDE / Editors (VS Code Focus)
- **UI**: Themes (One Dark Pro, GitHub Theme), icons (Material Icon)
- **Formatting**: Prettier, ESLint, Stylelint
- **DX**: GitLens, Error Lens, Todo Tree, Path Intellisense
- **AI**: Copilot, Antigravity, Cursor
- **Fonts**: Fira Code, JetBrains Mono, Cascadia Code

---

## Learning Paths

### Path 1: Web Fundamentals → Production
1. Open Web Platform fundamentals
2. HTML5 / Web APIs
3. CSS Features → Modern CSS
4. Modern JS / ES6+
5. Platform compatibility
6. Network fundamentals
7. Node.js basics
8. npm ecosystem
9. IDE setup
10. GUI Framework (React)
11. Microservices / API design
12. Testing

### Path 2: Finding Libraries
- Cross-browser / Polyfill → GUI Framework → UI Toolkits → Standalone Components → UX Libraries → Graphic Libraries → Utility Libraries → Server Libraries

### Path 3: Architecture & Infrastructure
- GUI Framework → Toolchain → Workflow → Microservices → Server Best Practices → Cloud Services → Documentation

---

## Key Principles (from the Spellbook)

1. **Stay lean**: Focus on the most frequent problems and commonly used solutions
2. **Not outdated**: Prioritize tools with clear trends and active maintenance
3. **npm stats > GitHub stars**: Actual usage matters more than popularity signals
4. **Fine-grained classification**: Each line should be a unique category
5. **Knowledge graph over list**: Think skill tree, not bookmark collection

---

## Quick Reference Links

| Resource | URL |
|----------|-----|
| MDN Web Docs | https://developer.mozilla.org |
| Can I Use | https://caniuse.com |
| CSS-Tricks | https://css-tricks.com |
| web.dev | https://web.dev |
| npm trends | https://npmtrends.com |
| Bundlephobia | https://bundlephobia.com |
| TypeScript Playground | https://typescriptlang.org/play |
| Babel REPL | https://babeljs.io/repl |
| Vite | https://vitejs.dev |
| React Docs | https://react.dev |
| Next.js Docs | https://nextjs.org/docs |

## License

Content derived from [dexteryy/spellbook-of-modern-webdev](https://github.com/dexteryy/spellbook-of-modern-webdev).
