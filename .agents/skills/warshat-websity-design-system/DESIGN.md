# Warshat Websity Design System

> Category: Brands · Craft workshop / education
> Surface: web (Next.js, RTL-first Arabic)
> Product: ورشة فن (Warshat Fan) — creative workshops in Baghdad (Zayouna & Yarmouk)

A warm art-studio system for an Arabic craft workshop marketplace: canvas cream paper, forest olive, honey gold, terracotta accents, and calligraphic display type.

Source: https://github.com/mortada9999/warshat-websity (git-clone intake)

## 1. Visual Theme & Atmosphere

**Feeling:** Handmade studio, not SaaS. Warm canvas paper under soft olive ink; playful organic blobs and brush-stroke price chips; gallery of real craft photos.

**Audience:** Arabic-speaking families and creatives in Baghdad booking open activities, workshops, kids sessions, and courses.

**Posture rules:**
1. RTL-first (`lang="ar" dir="rtl"`); LTR is a secondary mode via language toggle.
2. Canvas cream backgrounds with olive headings — never cool greys or purple gradients.
3. Pill primary buttons with soft olive glow; cards lift and tilt slightly on hover.
4. Section titles get a honey brush underline (organic blob shape).
5. Imagery is photo-led craft work (pottery, painting, felting) — circular thumbnails for open activities, 16:10 for workshops.

**Evidence note:** Implemented tokens live in `src/app/globals.css`. The repo skill `warshat-designer` describes a sharper Object & Archive gallery variant (0 radius, IBM Plex, burnt orange `#C4622D`); **this package binds the implemented globals.css system** as the shipped brand.

## 2. Color

| Token | Hex / value | Role |
|-------|-------------|------|
| `--clr-bg` | `#EFE7D6` | Page canvas |
| `--clr-surface` | `#F6F0E2` | Cards, inputs, raised panels |
| `--clr-surface-2` | `#E7DCC6` | Image placeholders, muted fills |
| `--clr-mint` | `#E7DFCB` | Table headers, soft rails |
| `--clr-olive` | `#4E5A2E` | Primary brand / headings / CTAs / footer |
| `--clr-olive-light` | `#6E7A3E` | Primary hover |
| `--clr-honey` | `#C08A2D` | Accent underline, stats, secondary highlight |
| `--clr-coral` | `#C85A3C` | Price, category badge, warm accent |
| `--clr-brown` | `#5D4A2D` | Borders base, muted text |
| `--clr-text` | `#3A2E1C` | Body ink |
| `--clr-text-muted` | `#5D4A2D` | Secondary copy |
| `--clr-text-dim` | `#8A7A5C` | Meta / captions |
| `--clr-heading` | `#4E5A2E` | All headings |
| Success | `#1a9957` | Free / active |
| Danger | `#d94040` | Errors / delete |
| Header clay border | `#d96f4b` | Sticky header bottom edge |
| Hamburger bars | `#8c9b58` | Menu icon |

Borders: `rgba(93, 74, 45, 0.18)`  
olive glow: `rgba(78, 90, 46, 0.28)` for button shadows  
Semantic OD aliases: `--bg --surface --fg --muted --border --accent` map to canvas / cream / ink / dim / border / olive.

## 3. Typography

| Role | Stack | Notes |
|------|-------|-------|
| Display / headings | `'Aref Ruqaa', 'Tajawal', Georgia, serif` | Calligraphic Arabic display; weight 700 in shipped CSS |
| Body | `'Tajawal', 'Segoe UI', Tahoma, sans-serif` | 300–800; default body comfortable at ~15–16px, line-height 1.7 |
| Mono | system mono | Admin/code only |

Scale (observed):
- Hero title: `clamp(3rem, 8vw, 5.5rem)` (page.module) or ~2.5rem (WixHero)
- Section title: `clamp(1.6rem, 3vw, 2.4rem)`
- Card title: ~1.2–1.8rem
- Body: 0.9–1.15rem
- Caption / badge: 0.75–0.85rem
- Eyebrow: 0.875rem, uppercase, letter-spacing 0.12em, honey color

Google Fonts import (source): Tajawal 300–800 + Aref Ruqaa 400/700.

## 4. Spacing

- Container max-width: **1280px**, horizontal padding **1.5rem**
- Header height: **70px**, sticky
- Card padding: **1.5rem** content; activity cards **24px**
- Grid gap: **1.75rem** workshop grid; open activities **2rem**
- Section vertical: **4rem** padding common
- Radius: sm **10px**, md **pill 9999px** (buttons), lg **18px** (cards), xl **26px**
- Brush price chip: `border-radius: 8px 30px 10px 40px` + slight rotate

## 5. Layout & Composition

- **Public home:** sticky Header → split Hero (text + craft photo + organic blobs) → open-activity circle grid on light-olive band → training workshop stack on white → category banners (50/50 image+text) → olive footer with honey top border
- **Admin:** AdminNav brand bar + table of workshops, form create/edit, secret field for admin
- **Detail:** workshop page with image, meta, bilingual copy
- **RTL:** logo on the start side; category badges pin to `right` (flip in LTR); honey underline anchors to `right`
- **Responsive:** hero stacks column under 768px; training cards row on desktop, column on mobile; grids `auto-fill minmax(200–300px, 1fr)`
- **Categories:** `open_activity`, `workshop`, `kids`, `course`
- **Branches:** Zayouna (الزيونة), Yarmouk (اليرموك), both

## 6. Components

### Header
White sticky bar, 70px, clay `#d96f4b` bottom border; logo image ~50px; hamburger 3 bars olive-sage `#8c9b58`.

### Buttons
- `.btn-primary` — olive fill, white text, pill, glow shadow, lift on hover
- `.btn-ghost` — border + muted text
- `.btn-danger` — soft red tint
- `.btn-sm` — denser padding
- Training “Book Now” — slightly squared (`4px`) olive block

### Cards
- **WorkshopCard** — surface card, 16:10 image, coral category badge overlay, tags, branch/seats meta, coral price or green free
- **WixActivityCard** — white tile, circular 120–150px image, centered title, brush coral price chip
- **WixTrainingCard** — white with olive border, image + centered copy + book CTA, decorative triangle under card

### Badges
Pill badges: orange (coral), beige (honey), green (success), red (danger)

### Forms
Surface inputs, sm radius, olive focus ring (`0 0 0 3px olive-dim`); toggle switch olive when on; admin table mint header

### Hero / Banner
Split panels, organic blob decorations (`#ABC175`, `#FFD600`, blush fills), olive CTAs

### Footer
Solid olive background, 4px honey top border, cream muted copyright

## 7. Motion & Interaction

- Global transition: **0.25s ease**
- Card hover: `translateY(-6px) rotate(-0.4deg)` + deeper shadow; image scale ~1.06
- Activity card hover: `translateY(-5px)`
- Primary button hover: lift 2px + stronger glow
- `fadeUp` entrance 0.5s; skeleton `shimmer`
- Lenis smooth scroll (lerp ~0.08) + Framer Motion in-view patterns in project skill
- Respect `prefers-reduced-motion` when extending

## 8. Voice & Brand

- **Name:** ورشة فن / Warshat Fan
- **Tagline (meta):** مساحة الإبداع والتعلم — space for creativity and learning
- **Hero (AR):** المكان المثالي للترفيه عن طريق الفن / و لتعلم مختلف الفنون بأحترافية!
- **Tone:** Warm, inviting, craft-forward; bilingual AR/EN with Arabic primary
- **Copy patterns:** real workshop titles (pottery mug painting, tote bag, kids knitting); prices in IQD (د.ع); “مجاني” for free
- **Locale:** `ar_IQ`, Baghdad branches

## 9. Anti-patterns

- Do not use purple gradients, neon, glassmorphism, or cool blue SaaS chrome
- Do not replace olive/honey/coral with generic indigo/teal
- Do not drop RTL or flip icons incorrectly
- Do not invent metrics or fake workshop inventory
- Do not use Inter/Roboto as display; keep Aref Ruqaa + Tajawal
- Do not square all buttons to 0 radius when using the **implemented** system (pill CTAs are intentional here)
- Do not hot-link remote logos — use `assets/logo.png` / `build/logo.png`
- Avoid heavy dark heroes with white overlay text as the default home treatment
