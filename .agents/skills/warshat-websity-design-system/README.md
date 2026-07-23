# Warshat Websity Design System

Reusable Open Design package for **ورشة فن (Warshat Fan)** — an Arabic RTL craft-workshop site for Baghdad (Zayouna & Yarmouk branches).

## Product Overview / Product Context

Warshat Fan helps people discover and book:

- Open recreational activities (daily, no reservation)
- Training workshops
- Kids workshops & subscriptions
- Courses (e.g. knitting)

Stack (source): Next.js 16, React 19, Framer Motion, Lenis, CSS modules + global design tokens.

**Source repository:** https://github.com/mortada9999/warshat-websity  
**Intake method:** git-clone via `github-design-context`  
**Evidence note:** `context/github/mortada9999-warshat-websity.md`

## Package contents

| Path | Purpose |
|------|---------|
| `DESIGN.md` | Canonical design rules |
| `colors_and_type.css` | Tokens + shared utilities |
| `SKILL.md` | Agent skill for applying this system |
| `brand.json` / `BRAND-SYSTEM.md` / `theme.json` / `tokens.*.json` | Brand kit metadata |
| `assets/logo.png` | Brand logo (from `public/logo.png`) |
| `build/logo.png` | Runtime logo copy |
| `preview/*.html` | Review cards |
| `ui_kits/app/` | Runnable composed interface |
| `source_examples/` | Original high-signal components |
| `context/github/` | Intake snapshots |
| `system/artifacts/` | Landing, deck, poster, email, newsletter, form |

## Preview Manifest

- `preview/typography-specimens.html` — Aref Ruqaa + Tajawal scale
- `preview/colors-themes.html` — palette swatches & semantic roles
- `preview/spacing-radius.html` — spacing, radius, shadows
- `preview/components-buttons.html` — buttons, badges, inputs
- `preview/components-cards.html` — workshop / activity / training cards
- `preview/brand-assets.html` — logo and preserved assets
- `preview/layout-shell.html` — header + section rhythm

## How to reuse

1. Bind `colors_and_type.css` (or DESIGN.md tokens) into new artifacts.
2. Keep RTL-first Arabic copy; use real workshop language, not lorem.
3. Prefer olive primary CTAs, honey brush underlines, coral price accents.
4. Compose UI from `ui_kits/app/components/*` patterns when building product screens.
5. Reference `assets/logo.png` locally — never hot-link.

## Design highlights

- Canvas cream `#EFE7D6` + olive `#4E5A2E` + honey `#C08A2D` + coral `#C85A3C`
- Display: Aref Ruqaa · Body: Tajawal
- Pill olive buttons with soft glow; cards lift/tilt on hover
- Bilingual AR/EN with `LanguageProvider` pattern
