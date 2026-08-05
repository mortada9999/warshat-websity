---
name: developer-roadmap
description: >
  Comprehensive developer roadmaps from roadmap.sh (nilbuild/developer-roadmap).
  Covers Frontend, Backend, Next.js, JavaScript, TypeScript, CSS, React, DevOps,
  API Design, and 60+ technology roadmaps. Use for architecture decisions, technology
  selection, best practices, learning paths, and career development guidance.
  Activated for technology stack decisions, code review guidance, and development
  best practices.
---

# Developer Roadmap Skill

A curated knowledge base derived from the [developer-roadmap](https://github.com/nilbuild/developer-roadmap) repository by roadmap.sh. This skill provides structured learning paths, best practices, and technology guidance for developers.

**Source**: https://github.com/nilbuild/developer-roadmap

## When to Use This Skill

- Making **technology stack decisions** (frameworks, libraries, tools)
- Providing **learning path** recommendations
- Suggesting **best practices** for frontend, backend, or full-stack development
- Advising on **architecture patterns** and design decisions
- Recommending **tools and workflows** for development

## Available Roadmaps

### Core Development Paths
| Roadmap | Focus Area | Link |
|---------|-----------|------|
| Frontend | HTML, CSS, JS, React, Next.js, Build Tools | [roadmap.sh/frontend](https://roadmap.sh/frontend) |
| Frontend Beginner | Simplified frontend path for newcomers | [roadmap.sh/frontend?r=frontend-beginner](https://roadmap.sh/frontend?r=frontend-beginner) |
| Backend | Server-side, APIs, Databases, Auth | [roadmap.sh/backend](https://roadmap.sh/backend) |
| Full Stack | Combined frontend + backend | [roadmap.sh/full-stack](https://roadmap.sh/full-stack) |
| DevOps | CI/CD, Containers, Cloud, Monitoring | [roadmap.sh/devops](https://roadmap.sh/devops) |

### Framework-Specific Roadmaps
| Roadmap | Focus Area | Link |
|---------|-----------|------|
| Next.js | SSR, SSG, App Router, API Routes | [roadmap.sh/nextjs](https://roadmap.sh/nextjs) |
| React | Components, Hooks, State Management | [roadmap.sh/react](https://roadmap.sh/react) |
| Angular | Components, Services, Modules | [roadmap.sh/angular](https://roadmap.sh/angular) |
| Vue.js | Composition API, Vuex, Vue Router | [roadmap.sh/vue](https://roadmap.sh/vue) |
| Node.js | Express, APIs, Streams, Clusters | [roadmap.sh/nodejs](https://roadmap.sh/nodejs) |

### Language Roadmaps
| Roadmap | Link |
|---------|------|
| JavaScript | [roadmap.sh/javascript](https://roadmap.sh/javascript) |
| TypeScript | [roadmap.sh/typescript](https://roadmap.sh/typescript) |
| HTML | [roadmap.sh/html](https://roadmap.sh/html) |
| CSS | [roadmap.sh/css](https://roadmap.sh/css) |
| Python | [roadmap.sh/python](https://roadmap.sh/python) |
| Java | [roadmap.sh/java](https://roadmap.sh/java) |
| Go | [roadmap.sh/golang](https://roadmap.sh/golang) |
| Rust | [roadmap.sh/rust](https://roadmap.sh/rust) |
| C++ | [roadmap.sh/cpp](https://roadmap.sh/cpp) |

### Specialized Roadmaps
| Roadmap | Focus Area | Link |
|---------|-----------|------|
| API Design | REST, GraphQL, gRPC, WebSockets | [roadmap.sh/api-design](https://roadmap.sh/api-design) |
| Design System | Components, Tokens, Documentation | [roadmap.sh/design-system](https://roadmap.sh/design-system) |
| Docker | Containers, Compose, Networking | [roadmap.sh/docker](https://roadmap.sh/docker) |
| Kubernetes | Orchestration, Helm, Service Mesh | [roadmap.sh/kubernetes](https://roadmap.sh/kubernetes) |
| PostgreSQL DBA | Queries, Indexing, Replication | [roadmap.sh/postgresql-dba](https://roadmap.sh/postgresql-dba) |
| MongoDB | NoSQL, Aggregation, Sharding | [roadmap.sh/mongodb](https://roadmap.sh/mongodb) |
| Cyber Security | OWASP, Encryption, Penetration | [roadmap.sh/cyber-security](https://roadmap.sh/cyber-security) |
| Machine Learning | Models, Training, Deployment | [roadmap.sh/machine-learning](https://roadmap.sh/machine-learning) |
| AI Agents | LLMs, Tool Use, RAG | [roadmap.sh/ai-agents](https://roadmap.sh/ai-agents) |

---

## Frontend Development Roadmap (Detailed)

### 1. Internet & Web Fundamentals
- **How the Internet Works**: DNS, HTTP/HTTPS, TCP/IP
- **Browsers & How They Work**: Rendering engine, DOM/CSSOM, JS engine
- **DNS & Domain Name System**: Resolution, caching, records
- **Hosting & Deployment**: Static hosting, CDNs, serverless

### 2. HTML
- **Semantic HTML**: `<article>`, `<section>`, `<nav>`, `<aside>`, `<header>`, `<footer>`
- **Forms & Validation**: Input types, constraint validation API
- **Accessibility (a11y)**: ARIA roles, screen readers, keyboard navigation
- **SEO Basics**: Meta tags, Open Graph, structured data, heading hierarchy

### 3. CSS
- **Fundamentals**: Selectors, specificity, cascade, inheritance
- **Box Model**: Content, padding, border, margin
- **Layout**:
  - Flexbox: `display: flex`, `justify-content`, `align-items`, `flex-wrap`
  - Grid: `grid-template-columns`, `grid-template-rows`, `gap`, `grid-area`
  - Positioning: `static`, `relative`, `absolute`, `fixed`, `sticky`
- **Responsive Design**: Media queries, fluid typography, container queries
- **CSS Custom Properties**: Variables, theming, dynamic values
- **Animations & Transitions**: `@keyframes`, `transition`, `animation`, `will-change`
- **CSS Frameworks**: Tailwind CSS, Bootstrap, CSS Modules
- **CSS Architecture**: BEM, SMACSS, OOCSS, utility-first

### 4. JavaScript
- **Core Concepts**: Variables, data types, operators, control flow
- **Functions**: Closures, arrow functions, IIFE, callbacks
- **DOM Manipulation**: `querySelector`, `addEventListener`, `createElement`
- **Async JavaScript**: Promises, async/await, Event Loop, Microtasks
- **ES6+ Features**: Destructuring, spread/rest, template literals, modules
- **Fetch API & AJAX**: `fetch()`, `XMLHttpRequest`, error handling
- **Error Handling**: `try/catch`, custom errors, error boundaries

### 5. TypeScript
- **Type System**: Primitive types, union types, intersection types
- **Interfaces & Types**: Type aliases, extending interfaces, generics
- **Enums & Utility Types**: `Partial<T>`, `Required<T>`, `Pick<T>`, `Omit<T>`
- **Strict Mode**: `strictNullChecks`, `noImplicitAny`
- **Generics**: Generic functions, constraints, conditional types
- **Declaration Files**: `.d.ts`, `@types/*`, ambient declarations

### 6. Package Managers
- **npm**: `package.json`, `package-lock.json`, scripts, workspaces
- **pnpm**: Performance, disk efficiency, strict dependency management
- **Bun**: All-in-one runtime, bundler, package manager

### 7. Framework Selection (React Focus)
- **React Core**: JSX, Components, Props, State
- **React Hooks**: `useState`, `useEffect`, `useRef`, `useMemo`, `useCallback`, `useContext`
- **State Management**: Context API, Zustand, Jotai, Redux Toolkit
- **Rendering Patterns**: CSR, SSR, SSG, ISR
- **React Server Components (RSC)**: Server vs Client components

### 8. Next.js (Meta-Framework)
- **App Router**: File-based routing, layouts, loading/error states
- **Server Components**: Default server rendering, `'use client'` directive
- **Data Fetching**: Server-side `fetch()`, `revalidate`, `generateStaticParams`
- **API Routes**: Route handlers, middleware
- **Image Optimization**: `next/image`, blur placeholders, responsive sizes
- **Font Optimization**: `next/font`, Google Fonts integration
- **Deployment**: Vercel, self-hosted, Docker

### 9. CSS Architecture in Practice
- **CSS Modules**: Scoped styles, `*.module.css`, composition
- **Styled Components**: CSS-in-JS, tagged template literals
- **Tailwind CSS**: Utility-first, `@apply`, plugins, JIT mode
- **Vanilla CSS**: Custom Properties, `@layer`, nesting

### 10. Build Tools
- **Bundlers**: Vite, Webpack, esbuild, Rollup, Turbopack
- **Linters & Formatters**: ESLint, Prettier, Biome
- **Task Runners**: npm scripts, turborepo

### 11. Testing
- **Unit Testing**: Jest, Vitest
- **Integration Testing**: React Testing Library
- **E2E Testing**: Playwright, Cypress
- **Visual Regression**: Storybook, Chromatic

### 12. Performance Optimization
- **Core Web Vitals**: LCP, FID/INP, CLS
- **Lazy Loading**: `React.lazy()`, dynamic imports, `loading="lazy"`
- **Code Splitting**: Route-based, component-based
- **Caching Strategies**: Cache-Control, Service Workers, CDN
- **Image Optimization**: WebP/AVIF, responsive images, CDN transforms
- **Bundle Analysis**: `@next/bundle-analyzer`, webpack-bundle-analyzer

### 13. Web Security
- **HTTPS**: TLS, certificates, HSTS
- **Content Security Policy (CSP)**: Script sources, frame ancestors
- **CORS**: Cross-origin requests, preflight, credentials
- **XSS Prevention**: Input sanitization, output encoding
- **CSRF Protection**: Tokens, SameSite cookies

### 14. Deployment & DevOps
- **Hosting Platforms**: Vercel, Netlify, Cloudflare Pages, AWS
- **CI/CD**: GitHub Actions, automated testing, preview deployments
- **Monitoring**: Error tracking, analytics, performance monitoring
- **Docker**: Containerization, multi-stage builds

### 15. AI-Assisted Development
- **AI Code Editors**: Cursor, Copilot, Antigravity
- **AI APIs**: OpenAI, Anthropic, Gemini
- **Vibe Coding**: AI-first development workflow
- **Prompt Engineering**: Effective prompting for code generation

---

## Next.js Roadmap (Detailed)

### Fundamentals
- **React Foundations**: Components, JSX, Props, State
- **Project Structure**: `src/app/`, `public/`, `next.config.js`

### Routing
- **App Router**: `app/` directory, nested layouts
- **Dynamic Routes**: `[slug]`, `[...catchAll]`, `[[...optionalCatchAll]]`
- **Route Groups**: `(group)` convention for organizing without URL impact
- **Parallel Routes**: `@slot` convention for simultaneous rendering
- **Intercepting Routes**: `(.)`, `(..)`, `(...)` conventions
- **Middleware**: `middleware.ts`, request/response manipulation

### Rendering
- **Server Components**: Default in App Router, zero client JS
- **Client Components**: `'use client'`, interactivity, event handlers
- **Streaming**: `loading.tsx`, `Suspense`, progressive rendering
- **Static vs Dynamic**: `force-static`, `force-dynamic`, `revalidate`

### Data Fetching
- **Server-Side Fetching**: `fetch()` in Server Components, automatic deduplication
- **Client-Side Fetching**: `SWR`, `TanStack Query`
- **Server Actions**: `'use server'`, form actions, mutations
- **Caching**: Request Memoization, Data Cache, Full Route Cache

### Styling
- **CSS Modules**: Built-in support, `*.module.css`
- **Tailwind CSS**: First-class integration
- **CSS-in-JS**: Styled Components (with config), Emotion
- **Sass**: Built-in `.scss` support

### Optimization
- **Images**: `next/image`, automatic optimization, responsive
- **Fonts**: `next/font`, preloading, zero layout shift
- **Scripts**: `next/script`, loading strategies
- **Metadata**: `generateMetadata`, SEO, Open Graph
- **Lazy Loading**: `next/dynamic`, React.lazy()

### Authentication
- **NextAuth.js / Auth.js**: OAuth, credentials, sessions
- **Middleware Auth**: Route protection, redirects

### Deployment
- **Vercel**: Zero-config, edge functions, preview deployments
- **Self-Hosted**: Node.js server, Docker, standalone output
- **Static Export**: `output: 'export'` for static hosting

---

## Best Practices Reference

### Code Quality
1. **Use TypeScript** for type safety and better IDE support
2. **Implement ESLint** with strict rules for code consistency
3. **Use Prettier** for automatic code formatting
4. **Write tests** at unit, integration, and E2E levels
5. **Follow semantic versioning** for packages

### Performance
1. **Minimize JavaScript bundle size** through code splitting
2. **Optimize images** with modern formats (WebP/AVIF) and lazy loading
3. **Use server-side rendering** for critical content
4. **Implement caching strategies** at multiple levels
5. **Monitor Core Web Vitals** continuously

### Security
1. **Always use HTTPS** in production
2. **Implement CSP headers** to prevent XSS
3. **Validate and sanitize** all user inputs
4. **Use environment variables** for secrets (never commit them)
5. **Keep dependencies updated** and audit regularly

### Accessibility
1. **Use semantic HTML** elements appropriately
2. **Provide alt text** for all meaningful images
3. **Ensure keyboard navigation** works throughout
4. **Maintain sufficient color contrast** ratios
5. **Test with screen readers** regularly

---

## Additional Resources

For detailed content on any specific topic, refer to:
- **Roadmaps**: https://roadmap.sh/roadmaps
- **Best Practices**: https://roadmap.sh/best-practices
- **Questions**: https://roadmap.sh/questions
- **YouTube**: https://www.youtube.com/@roadmapsh

## License

Content derived from [nilbuild/developer-roadmap](https://github.com/nilbuild/developer-roadmap) under the project's open license.
