---
name: warshat-websity-design-system
description: >
  Design system for Warshat Fan (ورشة فن) — Arabic RTL craft workshop brand
  from mortada9999/warshat-websity. Use for landings, decks, admin tools,
  workshop cards, and bilingual Baghdad craft marketing.
user-invocable: true
---

# Warshat Websity Design System Skill

## What is inside

- `DESIGN.md` — full visual contract
- `colors_and_type.css` — CSS tokens and shared components
- `preview/` — focused HTML review cards
- `ui_kits/app/` — composed public + admin shell
- `assets/` · `build/` — logo
- `source_examples/` — original Header, cards, form, globals
- `context/github/` — git-clone evidence

## Source context

- Repo: https://github.com/mortada9999/warshat-websity
- Product: ورشة فن — creative workshops in Baghdad
- Tokens file of record: `src/app/globals.css`
- Primary surfaces: home marketplace, workshop detail, admin CRUD

## When to use this skill

Use when generating or editing anything for Warshat Fan / warshat-websity branding: marketing pages, pitch decks, emails, workshop catalogs, admin dashboards, or bilingual AR/EN craft education UI.

## How to use

1. Read `README.md` then `DESIGN.md`.
2. Load `colors_and_type.css` into HTML artifacts (`<link rel="stylesheet" href="colors_and_type.css">` or relative path).
3. Study `preview/` cards for token usage.
4. For product UI, start from `ui_kits/app/index.html` and modular components under `ui_kits/app/components/`.
5. Copy patterns from `source_examples/` when fidelity to the Next.js app matters.
6. Keep logos from `assets/` or `build/`.

## Design system highlights

- **Palette:** canvas cream, olive primary, honey accent, terracotta coral
- **Type:** Aref Ruqaa headings + Tajawal body
- **Layout:** RTL-first, sticky header, photo-led cards, section banners
- **Components:** pill CTAs, workshop cards, circular activity cards, training cards, badges, forms, admin table
- **Motion:** 0.25s ease, card lift/tilt, fadeUp
- **Voice:** warm Arabic craft copy; IQD prices; branches Zayouna / Yarmouk
