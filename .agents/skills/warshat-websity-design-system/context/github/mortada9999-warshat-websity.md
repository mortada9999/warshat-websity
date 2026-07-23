# GitHub Design Evidence: mortada9999/warshat-websity

Source: https://github.com/mortada9999/warshat-websity
Read method: git-clone
Local clone method: git clone
Ref: default branch
Repository paths discovered: 72
Snapshot files written: 47

## Intake Status

- This-device intake was used through local git or GitHub CLI.

## README (README.md)

```md
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```

## Source Evidence Inventory

### Product docs and manifests

Use these to understand product purpose, dependency stack, scripts, and public naming.

- package.json -> `context/github/mortada9999-warshat-websity/files/package.json` (source)

### Brand assets and icons

Preserve source build/runtime paths: files under `build/` should be copied back into root `build/` with their original filenames, while non-build logos, avatars, or wordmarks can be copied into `assets/`. Reflect the preserved files in `preview/brand-assets.html`.

- public/logo.png -> `context/github/mortada9999-warshat-websity/files/public/logo.png` (binary asset)

### Theme, tokens, and styling

Extract concrete color, typography, spacing, radius, shadow, and theme-variable values from these files.

- src/app/globals.css -> `context/github/mortada9999-warshat-websity/files/src/app/globals.css` (source)
- src/app/admin/admin.module.css -> `context/github/mortada9999-warshat-websity/files/src/app/admin/admin.module.css` (source)
- src/app/admin/page.module.css -> `context/github/mortada9999-warshat-websity/files/src/app/admin/page.module.css` (source)
- src/app/page.module.css -> `context/github/mortada9999-warshat-websity/files/src/app/page.module.css` (source)
- src/app/workshops/[id]/page.module.css -> `context/github/mortada9999-warshat-websity/files/src/app/workshops/id/page.module.css` (source)
- src/components/AdminNav.module.css -> `context/github/mortada9999-warshat-websity/files/src/components/AdminNav.module.css` (source)
- src/components/BranchFilter.module.css -> `context/github/mortada9999-warshat-websity/files/src/components/BranchFilter.module.css` (source)
- src/components/CategoryTabs.module.css -> `context/github/mortada9999-warshat-websity/files/src/components/CategoryTabs.module.css` (source)
- src/components/FeatureBanner.module.css -> `context/github/mortada9999-warshat-websity/files/src/components/FeatureBanner.module.css` (source)
- src/components/Header.module.css -> `context/github/mortada9999-warshat-websity/files/src/components/Header.module.css` (source)
- src/components/WixActivityCard.module.css -> `context/github/mortada9999-warshat-websity/files/src/components/WixActivityCard.module.css` (source)
- src/components/WixBanner.module.css -> `context/github/mortada9999-warshat-websity/files/src/components/WixBanner.module.css` (source)
- src/components/WixHero.module.css -> `context/github/mortada9999-warshat-websity/files/src/components/WixHero.module.css` (source)
- src/components/WixTrainingCard.module.css -> `context/github/mortada9999-warshat-websity/files/src/components/WixTrainingCard.module.css` (source)
- src/components/WorkshopCard.module.css -> `context/github/mortada9999-warshat-websity/files/src/components/WorkshopCard.module.css` (source)
- src/components/WorkshopForm.module.css -> `context/github/mortada9999-warshat-websity/files/src/components/WorkshopForm.module.css` (source)

### App shell and navigation

Use these to recreate the product frame, navigation density, sidebars, window chrome, and layout rhythm.

- src/app/layout.tsx -> `context/github/mortada9999-warshat-websity/files/src/app/layout.tsx` (source)
- src/app/page.tsx -> `context/github/mortada9999-warshat-websity/files/src/app/page.tsx` (source)
- src/app/admin/[id]/edit/page.tsx -> `context/github/mortada9999-warshat-websity/files/src/app/admin/id/edit/page.tsx` (source)
- src/app/admin/new/page.tsx -> `context/github/mortada9999-warshat-websity/files/src/app/admin/new/page.tsx` (source)
- src/app/admin/page.tsx -> `context/github/mortada9999-warshat-websity/files/src/app/admin/page.tsx` (source)
- src/app/api/workshops/[id]/route.ts -> `context/github/mortada9999-warshat-websity/files/src/app/api/workshops/id/route.ts` (source)
- src/app/api/workshops/route.ts -> `context/github/mortada9999-warshat-websity/files/src/app/api/workshops/route.ts` (source)
- src/app/workshops/[id]/page.tsx -> `context/github/mortada9999-warshat-websity/files/src/app/workshops/id/page.tsx` (source)

### Reusable components

Use these to derive buttons, inputs, cards, dialogs, avatars, selectors, menus, and feedback states.

- src/components/AdminNav.tsx -> `context/github/mortada9999-warshat-websity/files/src/components/AdminNav.tsx` (source)
- src/components/AdminProvider.tsx -> `context/github/mortada9999-warshat-websity/files/src/components/AdminProvider.tsx` (source)
- src/components/CategoryTabs.tsx -> `context/github/mortada9999-warshat-websity/files/src/components/CategoryTabs.tsx` (source)
- src/components/LanguageProvider.tsx -> `context/github/mortada9999-warshat-websity/files/src/components/LanguageProvider.tsx` (source)
- src/components/WixActivityCard.tsx -> `context/github/mortada9999-warshat-websity/files/src/components/WixActivityCard.tsx` (source)
- src/components/WixTrainingCard.tsx -> `context/github/mortada9999-warshat-websity/files/src/components/WixTrainingCard.tsx` (source)
- src/components/WorkshopCard.tsx -> `context/github/mortada9999-warshat-websity/files/src/components/WorkshopCard.tsx` (source)
- src/components/WorkshopEditorModal.tsx -> `context/github/mortada9999-warshat-websity/files/src/components/WorkshopEditorModal.tsx` (source)
- src/components/WorkshopForm.tsx -> `context/github/mortada9999-warshat-websity/files/src/components/WorkshopForm.tsx` (source)
- src/components/BranchFilter.tsx -> `context/github/mortada9999-warshat-websity/files/src/components/BranchFilter.tsx` (source)
- src/components/FeatureBanner.tsx -> `context/github/mortada9999-warshat-websity/files/src/components/FeatureBanner.tsx` (source)
- src/components/Header.tsx -> `context/github/mortada9999-warshat-websity/files/src/components/Header.tsx` (source)
- src/components/Icons.tsx -> `context/github/mortada9999-warshat-websity/files/src/components/Icons.tsx` (source)
- src/components/Reveal.tsx -> `context/github/mortada9999-warshat-websity/files/src/components/Reveal.tsx` (source)
- src/components/SmoothScroll.tsx -> `context/github/mortada9999-warshat-websity/files/src/components/SmoothScroll.tsx` (source)
- src/components/WixBanner.tsx -> `context/github/mortada9999-warshat-websity/files/src/components/WixBanner.tsx` (source)
- src/components/WixHero.tsx -> `context/github/mortada9999-warshat-websity/files/src/components/WixHero.tsx` (source)

### Other design evidence

Inspect these only after the primary design evidence above has been used.

- .agents/skills/warshat-designer/SKILL.md -> `context/github/mortada9999-warshat-websity/files/.agents/skills/warshat-designer/SKILL.md` (source)
- AGENTS.md -> `context/github/mortada9999-warshat-websity/files/AGENTS.md` (source)
- CLAUDE.md -> `context/github/mortada9999-warshat-websity/files/CLAUDE.md` (source)
- next.config.ts -> `context/github/mortada9999-warshat-websity/files/next.config.ts` (source)


## Files Inspected

- public/logo.png -> `context/github/mortada9999-warshat-websity/files/public/logo.png` (121921 bytes, git-clone, binary asset)
- src/app/layout.tsx -> `context/github/mortada9999-warshat-websity/files/src/app/layout.tsx` (1147 bytes, git-clone)
- src/app/globals.css -> `context/github/mortada9999-warshat-websity/files/src/app/globals.css` (9734 bytes, git-clone)
- src/components/AdminNav.tsx -> `context/github/mortada9999-warshat-websity/files/src/components/AdminNav.tsx` (715 bytes, git-clone)
- src/components/AdminProvider.tsx -> `context/github/mortada9999-warshat-websity/files/src/components/AdminProvider.tsx` (2240 bytes, git-clone)
- src/components/CategoryTabs.tsx -> `context/github/mortada9999-warshat-websity/files/src/components/CategoryTabs.tsx` (1389 bytes, git-clone)
- src/components/LanguageProvider.tsx -> `context/github/mortada9999-warshat-websity/files/src/components/LanguageProvider.tsx` (1381 bytes, git-clone)
- src/components/WixActivityCard.tsx -> `context/github/mortada9999-warshat-websity/files/src/components/WixActivityCard.tsx` (2730 bytes, git-clone)
- src/components/WixTrainingCard.tsx -> `context/github/mortada9999-warshat-websity/files/src/components/WixTrainingCard.tsx` (2951 bytes, git-clone)
- src/components/WorkshopCard.tsx -> `context/github/mortada9999-warshat-websity/files/src/components/WorkshopCard.tsx` (3236 bytes, git-clone)
- src/components/WorkshopEditorModal.tsx -> `context/github/mortada9999-warshat-websity/files/src/components/WorkshopEditorModal.tsx` (6385 bytes, git-clone)
- src/components/WorkshopForm.tsx -> `context/github/mortada9999-warshat-websity/files/src/components/WorkshopForm.tsx` (11143 bytes, git-clone)
- src/app/page.tsx -> `context/github/mortada9999-warshat-websity/files/src/app/page.tsx` (6629 bytes, git-clone)
- package.json -> `context/github/mortada9999-warshat-websity/files/package.json` (640 bytes, git-clone)
- src/app/admin/[id]/edit/page.tsx -> `context/github/mortada9999-warshat-websity/files/src/app/admin/id/edit/page.tsx` (1511 bytes, git-clone)
- src/app/admin/admin.module.css -> `context/github/mortada9999-warshat-websity/files/src/app/admin/admin.module.css` (447 bytes, git-clone)
- src/app/admin/new/page.tsx -> `context/github/mortada9999-warshat-websity/files/src/app/admin/new/page.tsx` (622 bytes, git-clone)
- src/app/admin/page.module.css -> `context/github/mortada9999-warshat-websity/files/src/app/admin/page.module.css` (2648 bytes, git-clone)
- src/app/admin/page.tsx -> `context/github/mortada9999-warshat-websity/files/src/app/admin/page.tsx` (7315 bytes, git-clone)
- src/app/api/workshops/[id]/route.ts -> `context/github/mortada9999-warshat-websity/files/src/app/api/workshops/id/route.ts` (3256 bytes, git-clone)
- src/app/api/workshops/route.ts -> `context/github/mortada9999-warshat-websity/files/src/app/api/workshops/route.ts` (3784 bytes, git-clone)
- src/app/page.module.css -> `context/github/mortada9999-warshat-websity/files/src/app/page.module.css` (4316 bytes, git-clone)
- src/app/workshops/[id]/page.module.css -> `context/github/mortada9999-warshat-websity/files/src/app/workshops/id/page.module.css` (3213 bytes, git-clone)
- src/app/workshops/[id]/page.tsx -> `context/github/mortada9999-warshat-websity/files/src/app/workshops/id/page.tsx` (6308 bytes, git-clone)
- src/components/AdminNav.module.css -> `context/github/mortada9999-warshat-websity/files/src/components/AdminNav.module.css` (859 bytes, git-clone)
- src/components/BranchFilter.module.css -> `context/github/mortada9999-warshat-websity/files/src/components/BranchFilter.module.css` (192 bytes, git-clone)
- src/components/BranchFilter.tsx -> `context/github/mortada9999-warshat-websity/files/src/components/BranchFilter.tsx` (1428 bytes, git-clone)
- src/components/CategoryTabs.module.css -> `context/github/mortada9999-warshat-websity/files/src/components/CategoryTabs.module.css` (188 bytes, git-clone)
- src/components/FeatureBanner.module.css -> `context/github/mortada9999-warshat-websity/files/src/components/FeatureBanner.module.css` (3758 bytes, git-clone)
- src/components/FeatureBanner.tsx -> `context/github/mortada9999-warshat-websity/files/src/components/FeatureBanner.tsx` (3421 bytes, git-clone)
- src/components/Header.module.css -> `context/github/mortada9999-warshat-websity/files/src/components/Header.module.css` (788 bytes, git-clone)
- src/components/Header.tsx -> `context/github/mortada9999-warshat-websity/files/src/components/Header.tsx` (809 bytes, git-clone)
- src/components/Icons.tsx -> `context/github/mortada9999-warshat-websity/files/src/components/Icons.tsx` (1824 bytes, git-clone)
- src/components/Reveal.tsx -> `context/github/mortada9999-warshat-websity/files/src/components/Reveal.tsx` (608 bytes, git-clone)
- src/components/SmoothScroll.tsx -> `context/github/mortada9999-warshat-websity/files/src/components/SmoothScroll.tsx` (650 bytes, git-clone)
- src/components/WixActivityCard.module.css -> `context/github/mortada9999-warshat-websity/files/src/components/WixActivityCard.module.css` (1129 bytes, git-clone)
- src/components/WixBanner.module.css -> `context/github/mortada9999-warshat-websity/files/src/components/WixBanner.module.css` (2330 bytes, git-clone)
- src/components/WixBanner.tsx -> `context/github/mortada9999-warshat-websity/files/src/components/WixBanner.tsx` (1559 bytes, git-clone)
- src/components/WixHero.module.css -> `context/github/mortada9999-warshat-websity/files/src/components/WixHero.module.css` (2228 bytes, git-clone)
- src/components/WixHero.tsx -> `context/github/mortada9999-warshat-websity/files/src/components/WixHero.tsx` (1424 bytes, git-clone)
- src/components/WixTrainingCard.module.css -> `context/github/mortada9999-warshat-websity/files/src/components/WixTrainingCard.module.css` (1805 bytes, git-clone)
- src/components/WorkshopCard.module.css -> `context/github/mortada9999-warshat-websity/files/src/components/WorkshopCard.module.css` (2236 bytes, git-clone)
- src/components/WorkshopForm.module.css -> `context/github/mortada9999-warshat-websity/files/src/components/WorkshopForm.module.css` (1954 bytes, git-clone)
- .agents/skills/warshat-designer/SKILL.md -> `context/github/mortada9999-warshat-websity/files/.agents/skills/warshat-designer/SKILL.md` (14354 bytes, git-clone)
- AGENTS.md -> `context/github/mortada9999-warshat-websity/files/AGENTS.md` (332 bytes, git-clone)
- CLAUDE.md -> `context/github/mortada9999-warshat-websity/files/CLAUDE.md` (12 bytes, git-clone)
- next.config.ts -> `context/github/mortada9999-warshat-websity/files/next.config.ts` (795 bytes, git-clone)

## Binary Assets Preserved

- public/logo.png -> `context/github/mortada9999-warshat-websity/files/public/logo.png`

## Design-Relevant Excerpts

### src/app/layout.tsx

```tsx
import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/components/LanguageProvider';
import SmoothScroll from '@/components/SmoothScroll';

export const metadata: Metadata = {
  title: 'ورشة فن — مساحة الإبداع والتعلم',
  description:
    'ورشة فن — اكتشف ورش العمل والدورات والفعاليات الإبداعية في بغداد. فرعا الزيونة واليرموك.',
  keywords: ['ورشة', 'دورات', 'أطفال', 'نشاط', 'بغداد', 'الزيونة', 'اليرموك'],
  openGraph: {
    title: 'ورشة فن',
    description: 'مساحة الإبداع والتعلم في بغداد',
    locale: 'ar_IQ',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" style={{ backgroundColor: '#EFE7D6' }}>
      <head />
      <body>
        <LanguageProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}

```

### src/app/globals.css

```css
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&family=Aref+Ruqaa:wght@400;700&display=swap');

/* ─── Design Tokens ──────────────────────────────────────────────────────── */
:root {
  /* Palette — Art Studio: canvas cream, olive, honey gold, warm brown, terracotta */
  --clr-bg:           #EFE7D6;  /* warm canvas paper */
  --clr-surface:      #F6F0E2;  /* lighter canvas */
  --clr-surface-2:    #E7DCC6;
  --clr-border:       rgba(93, 74, 45, 0.18);

  --clr-mint:         #E7DFCB;
  --clr-peach:        #F1E7D3;
  --clr-pistachio:    #4E5A2E;

  --clr-olive:        #4E5A2E;  /* deep forest olive */
  --clr-olive-light:  #6E7A3E;
  --clr-olive-glow:   rgba(78, 90, 46, 0.28);
  --clr-olive-dim:    rgba(78, 90, 46, 0.10);

  --clr-honey:        #C08A2D;  /* mustard gold */
  --clr-honey-dim:    rgba(192, 138, 45, 0.14);
  --clr-brown:        #5D4A2D;  /* warm ink brown */

  --clr-coral:        #C85A3C;  /* terracotta */
  --clr-coral-light:  #D97050;
  --clr-coral-dim:    rgba(200, 90, 60, 0.14);

  --clr-text:         #3A2E1C;  /* warm ink */
  --clr-text-muted:   #5D4A2D;
  --clr-text-dim:     #8A7A5C;
  --clr-heading:      #4E5A2E;

  /* Typography */
  --font-heading: 'Aref Ruqaa', 'Tajawal', serif;
  --font-body:    'Tajawal', sans-serif;

  /* Textures */
  --tex-canvas: url('/textures/canvas-paper.png');

  /* Spacing & Radius */
  --radius-sm:  10px;
  --radius-md:  9999px; /* Pill shaped buttons */
  --radius-lg:  18px;
  --radius-xl:  26px;

  /* Transitions */
  --transition: 0.25s ease;
}

/* ─── Reset ──────────────────────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}

body {
  font-family: var(--font-body);
  background-color: var(--clr-bg);
  background-image: var(--tex-canvas);
  background-size: 480px;
  background-repeat: repeat;
  color: var(--clr-text);
  line-height: 1.7;
  min-height: 100vh;
  direction: rtl;
}

body.ltr {
  direction: ltr;
}

/* ─── Typography ─────────────────────────────────────────────────────────── */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 700;
  line-height: 1.3;
  color: var(--clr-heading);
}

p { color: var(--clr-te
...
```

### src/components/AdminNav.tsx

```tsx
'use client';

import React from 'react';
import Link from 'next/link';
import styles from './AdminNav.module.css';

export default function AdminNav() {
  return (
    <nav className={styles.nav} aria-label="Admin navigation">
      <Link href="/" className={styles.brand} id="admin-home-link">
        <span className={styles.icon}>✦</span>
        ورشة فن
      </Link>
      <div className={styles.links}>
        <Link href="/admin" className={styles.link} id="admin-nav-list">الورش</Link>
        <Link href="/admin/new" className={`btn btn-primary btn-sm ${styles.newBtn}`} id="admin-nav-new">
          + إضافة ورشة
        </Link>
      </div>
    </nav>
  );
}

```

### src/components/AdminProvider.tsx

```tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface AdminContextType {
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
}

const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  setIsAdmin: () => {},
});

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if URL has ?edit=true or if local storage has it
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('edit') === 'true') {
        setIsAdmin(true);
        localStorage.setItem('visual_admin', 'true');
      } else if (urlParams.get('edit') === 'false') {
        setIsAdmin(false);
        localStorage.removeItem('visual_admin');
      } else {
        setIsAdmin(localStorage.getItem('visual_admin') === 'true');
      }
    }
  }, []);

  return (
    <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
      
      {/* If in admin mode, show a small indicator at the bottom right */}
      {isAdmin && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '14px',
          zIndex: 9999,
          display: 'flex',
          gap: '8px',
          alignItems: 'center'
        }}>
          وضع التعديل المباشر مفعل ✏️
          <button 
            onClick={() => {
              setIsAdmin(false);
              localStorage.removeItem('visual_admin');
            }}
            style={{
              background: 'red',
              border: 'none',
              color: 'white',
              borderRadius: '4px',
              padding: '2px 8px',
              cursor: 'pointer'
            }}
          >
            خروج
          </button>
        </div>
      )}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}

```

### src/components/CategoryTabs.tsx

```tsx
'use client';

import React from 'react';
import type { Category } from '@/lib/types';
import { CATEGORY_LABELS } from '@/lib/types';
import { useLanguage } from './LanguageProvider';
import styles from './CategoryTabs.module.css';

interface CategoryTabsProps {
  active: Category | 'all';
  onChange: (cat: Category | 'all') => void;
}

const ALL_TABS: { value: Category | 'all' }[] = [
  { value: 'all' },
  { value: 'open_activity' },
  { value: 'workshop' },
  { value: 'kids' },
  { value: 'course' },
];

export default function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  const { t } = useLanguage();

  return (
    <div className={styles.tabs} role="tablist" aria-label={t('التصنيفات', 'Categories')}>
      {ALL_TABS.map(({ value }) => {
        const label =
          value === 'all'
            ? t('الكل', 'All')
            : t(CATEGORY_LABELS[value].ar, CATEGORY_LABELS[value].en);
        const isActive = active === value;
        return (
          <button
            key={value}
            role="tab"
            id={`tab-${value}`}
            aria-selected={isActive}
            className={`${styles.tab} ${isActive ? styles.active : ''}`}
            onClick={() => onChange(value)}
          >
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

```

### src/components/LanguageProvider.tsx

```tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Lang } from '@/lib/types';

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  isRtl: boolean;
  t: (ar: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'ar',
  setLang: () => {},
  isRtl: true,
  t: (ar) => ar,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ar');

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang | null;
    if (saved === 'ar' || saved === 'en') setLangState(saved);
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem('lang', l);
    document.documentElement.lang = l;
    document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
    if (l === 'en') {
      document.body.classList.add('ltr');
    } else {
      document.body.classList.remove('ltr');
    }
  }

  const isRtl = lang === 'ar';
  const t = (ar: string, en: string) => (lang === 'ar' ? ar : en);

  return (
    <LanguageContext.Provider value={{ lang, setLang, isRtl, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

```

### src/components/WixActivityCard.tsx

```tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import type { Workshop } from '@/lib/types';
import styles from './WixActivityCard.module.css';
import { useLanguage } from './LanguageProvider';
import { useAdmin } from './AdminProvider';
import WorkshopEditorModal from './WorkshopEditorModal';

interface WixActivityCardProps {
  workshop: Workshop;
  onRefresh?: () => void;
}

export default function WixActivityCard({ workshop, onRefresh }: WixActivityCardProps) {
  const { lang } = useLanguage();
  const { isAdmin } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);

  const title = lang === 'ar' ? workshop.title_ar : workshop.title_en;

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm('هل أنت متأكد من حذف هذا النشاط؟')) {
      await fetch(`/api/workshops/${workshop.id}`, { method: 'DELETE' });
      if (onRefresh) onRefresh();
    }
  };

  return (
    <>
      <div style={{ position: 'relative' }}>
        {isAdmin && (
          <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 10, display: 'flex', gap: 8 }}>
            <button onClick={(e) => { e.preventDefault(); setIsEditing(true); }} style={adminBtnStyle}>✏️</button>
            <button onClick={handleDelete} style={{ ...adminBtnStyle, background: '#fee' }}>🗑️</button>
          </div>
        )}
        <Link href={`/workshops/${workshop.id}`} className={styles.card}>
          <div className={styles.circleWrap}>
            {workshop.image_url ? (
              <img src={workshop.image_url} alt={title} className={styles.image} loading="lazy" />
            ) : (
              <div className={styles.placeholder} />
            )}
          </div>

          <h3 className={styles.title}>{title}</h3>

          {workshop.price != null && workshop.price > 0 && (
            <div className={styles.priceWrap}>
              {/* Orange brush stroke effect using CSS border-radius */}
              <span className={styles.price}>
                {workshop.price.toLocaleString()}
              </span>
            </div>
          )}
        </Link>
      </div>

      {isEditing && (
        <WorkshopEditorModal 
          workshop={workshop} 
          onClose={() => setIsEditing(false)} 
          onSave={() => { setIsEditing(
...
```

### src/components/WixTrainingCard.tsx

```tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import type { Workshop } from '@/lib/types';
import styles from './WixTrainingCard.module.css';
import { useLanguage } from './LanguageProvider';
import { useAdmin } from './AdminProvider';
import WorkshopEditorModal from './WorkshopEditorModal';

interface WixTrainingCardProps {
  workshop: Workshop;
  onRefresh?: () => void;
}

export default function WixTrainingCard({ workshop, onRefresh }: WixTrainingCardProps) {
  const { lang } = useLanguage();
  const { isAdmin } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);

  const title = lang === 'ar' ? workshop.title_ar : workshop.title_en;
  const description = lang === 'ar' ? workshop.description_ar : workshop.description_en;

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm('هل أنت متأكد من حذف هذه الورشة؟')) {
      await fetch(`/api/workshops/${workshop.id}`, { method: 'DELETE' });
      if (onRefresh) onRefresh();
    }
  };

  return (
    <>
      <div className={styles.cardWrapper} style={{ position: 'relative' }}>
        {isAdmin && (
          <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 10, display: 'flex', gap: 8 }}>
            <button onClick={(e) => { e.preventDefault(); setIsEditing(true); }} style={adminBtnStyle}>✏️ تعديل</button>
            <button onClick={handleDelete} style={{ ...adminBtnStyle, background: '#fee' }}>🗑️ حذف</button>
          </div>
        )}
        <div className={styles.card}>
          <div className={styles.imageWrap}>
            {workshop.image_url ? (
              <img src={workshop.image_url} alt={title} className={styles.image} loading="lazy" />
            ) : (
              <div className={styles.placeholder} />
            )}
          </div>
          
          <div className={styles.content}>
            <h3 className={styles.title}>{title}</h3>
            
            {description && (
              <p className={styles.desc}>
                {description}
              </p>
            )}

            <Link href={`/workshops/${workshop.id}`} className={styles.bookBtn}>
              Book Now
            </Link>
          </div>
        </div>
        {/* Decorative triangle hanging from bottom */}
        <div className
...
```

### src/components/WorkshopCard.tsx

```tsx
'use client';

import React from 'react';
import Link from 'next/link';
import type { Workshop } from '@/lib/types';
import { CATEGORY_LABELS, BRANCH_LABELS } from '@/lib/types';
import { useLanguage } from './LanguageProvider';
import { PinIcon, UsersIcon, SparkIcon } from './Icons';
import styles from './WorkshopCard.module.css';

interface WorkshopCardProps {
  workshop: Workshop;
}

export default function WorkshopCard({ workshop }: WorkshopCardProps) {
  const { lang, t } = useLanguage();

  const title       = lang === 'ar' ? workshop.title_ar : workshop.title_en;
  const description = lang === 'ar' ? workshop.description_ar : workshop.description_en;
  const tags        = workshop.tags?.split(',').map(s => s.trim()).filter(Boolean) ?? [];
  const catLabel    = CATEGORY_LABELS[workshop.category]?.[lang] ?? workshop.category;
  const branchLabel = workshop.branch ? BRANCH_LABELS[workshop.branch]?.[lang] : null;

  return (
    <Link href={`/workshops/${workshop.id}`} className={`card ${styles.card}`} id={`workshop-${workshop.id}`}>
      {/* Image */}
      <div className={styles.imageWrap}>
        {workshop.image_url ? (
          <img
            src={workshop.image_url}
            alt={title}
            className={styles.image}
            loading="lazy"
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            <SparkIcon size={40} className={styles.placeholderIcon} />
          </div>
        )}
        {/* Category badge overlay */}
        <span className={`badge badge-orange ${styles.catBadge}`}>
          {catLabel}
        </span>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>

        {description && (
          <p className={styles.description}>
            {description.length > 100 ? description.slice(0, 100) + '…' : description}
          </p>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className={styles.tags}>
            {tags.slice(0, 3).map(tag => (
              <span key={tag} className={`badge badge-beige ${styles.tag}`}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className={styles.footer}>
          <div className={styles.meta}>
          
...
```

### src/components/WorkshopEditorModal.tsx

```tsx
'use client';

import React, { useState } from 'react';
import type { Workshop, Category } from '@/lib/types';

interface WorkshopEditorModalProps {
  workshop: Workshop | null; // if null, we are adding new
  defaultCategory?: Category;
  onClose: () => void;
  onSave: () => void; // callback to refresh the list
}

export default function WorkshopEditorModal({ workshop, defaultCategory, onClose, onSave }: WorkshopEditorModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title_ar: workshop?.title_ar || '',
    title_en: workshop?.title_en || '',
    category: workshop?.category || defaultCategory || 'workshop',
    price: workshop?.price || 0,
    image_url: workshop?.image_url || '',
    description_ar: workshop?.description_ar || '',
    description_en: workshop?.description_en || '',
    sort_order: workshop?.sort_order || 0,
    is_active: workshop ? workshop.is_active : 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'sort_order' || name === 'is_active' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const isNew = !workshop;
      const url = isNew ? '/api/workshops' : `/api/workshops/${workshop.id}`;
      const method = isNew ? 'POST' : 'PATCH';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          // Note: we usually need a way to pass auth for admin actions.
          // Since the prompt doesn't specify auth mechanism, we assume the backend checks session/cookies
          // or we just bypass if running locally for the prototype.
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save');
      }

      onSave();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fix
...
```

### src/components/WorkshopForm.tsx

```tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Workshop, Category, Branch } from '@/lib/types';
import styles from './WorkshopForm.module.css';

interface WorkshopFormProps {
  initial?: Partial<Workshop>;
  mode: 'create' | 'edit';
  workshopId?: string;
}

const CATEGORIES: { value: Category; ar: string; en: string }[] = [
  { value: 'open_activity', ar: 'نشاط مفتوح', en: 'Open Activity' },
  { value: 'workshop',      ar: 'ورشة عمل',   en: 'Workshop' },
  { value: 'kids',          ar: 'أطفال',       en: 'Kids' },
  { value: 'course',        ar: 'دورة',        en: 'Course' },
];

const BRANCHES: { value: Branch; ar: string; en: string }[] = [
  { value: 'zayouna', ar: 'الزيونة', en: 'Zayouna' },
  { value: 'yarmouk', ar: 'اليرموك', en: 'Yarmouk' },
  { value: 'both',    ar: 'الفرعين', en: 'Both' },
];

export default function WorkshopForm({ initial, mode, workshopId }: WorkshopFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState('');
  const [imagePreview, setImagePreview] = useState(initial?.image_url ?? '');

  const [form, setForm] = useState({
    title_ar:       initial?.title_ar       ?? '',
    title_en:       initial?.title_en       ?? '',
    description_ar: initial?.description_ar ?? '',
    description_en: initial?.description_en ?? '',
    category:       initial?.category       ?? 'workshop',
    price:          initial?.price?.toString()  ?? '',
    image_url:      initial?.image_url      ?? '',
    is_active:      initial?.is_active      ?? 1,
    tags:           initial?.tags           ?? '',
    seats:          initial?.seats?.toString()  ?? '',
    branch:         initial?.branch         ?? '',
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (name === 'image_url') setImagePreview(value);
  }

  function handleToggle() {
    setForm(prev => ({ ...prev, is_active: prev.is_active === 1 ? 0 : 1 }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const secret = localStorage.getItem('admin_secret')
...
```

### src/app/page.tsx

```tsx
'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import WixHero from '@/components/WixHero';
import WixActivityCard from '@/components/WixActivityCard';
import WixTrainingCard from '@/components/WixTrainingCard';
import WixBanner from '@/components/WixBanner';
import { useLanguage } from '@/components/LanguageProvider';
import type { Workshop } from '@/lib/types';
import styles from './page.module.css';

// Mock workshop data for preview (adjusted to match design)
const MOCK_WORKSHOPS: Workshop[] = [
  {
    id: '1',
    title_ar: 'الرسم على الاكواب الفخارية',
    title_en: 'Pottery Mug Painting',
    description_ar: '',
    description_en: '',
    category: 'open_activity',
    branch: 'zayouna',
    price: 10000,
    seats: 20,
    image_url: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=400',
    is_active: 1,
    tags: null,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title_ar: 'الرسم على الحقائب القماشية',
    title_en: 'Tote Bag Painting',
    description_ar: '',
    description_en: '',
    category: 'open_activity',
    branch: 'yarmouk',
    price: 15000,
    seats: 20,
    image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400',
    is_active: 1,
    tags: null,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    title_ar: 'الرسم على المراية',
    title_en: 'Mirror Painting',
    description_ar: '',
    description_en: '',
    category: 'open_activity',
    branch: 'zayouna',
    price: 15000,
    seats: 20,
    image_url: 'https://images.unsplash.com/photo-1497942304796-b8bc2cc898f3?auto=format&fit=crop&q=80&w=400',
    is_active: 1,
    tags: null,
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    title_ar: 'صناعة الاكسسوارات',
    title_en: 'Accessories Making',
    description_ar: '',
    description_en: '',
    category: 'open_activity',
    branch: 'yarmouk',
    price: 15000,
    seats: 20,
    image_url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=400',
    is_active: 1,
    tags: null,
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    title_ar: 'ورشة الفخار',
    title_en: 'Pottery Workshop',
   
...
```


## Next Design-System Work

- Use these source paths and snapshots as evidence before writing `DESIGN.md`.
- Convert the inventory above into a Claude Design-style package: `README.md`, `SKILL.md`, `colors_and_type.css`, `preview/colors-*`, `preview/typography-specimens.html`, `preview/spacing-*`, `preview/components-*`, `preview/brand-assets.html`, `ui_kits/app/`, and preserved `assets/`, `build/`, or `fonts/` when evidence exists.
- `ui_kits/app/index.html` must be a browser-reviewable component entry: load `../../colors_and_type.css`, load or import at least three files from `ui_kits/app/components/`, and mount the composed UI through ReactDOM/Babel or compiled browser-ready JavaScript. Do not duplicate a static HTML mock when modular component files exist.
- `ui_kits/app/components/App.jsx` (or equivalent app shell) must compose source-backed role components such as Sidebar, AssistantsList, ChatArea, InputBar, and MessageBubble, not merely list their filenames.
- Claude-style UI-kit entry skeleton for direct JSX kits:
  - `<script src="https://unpkg.com/react@18.3.1/umd/react.development.js"></script>`
  - `<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"></script>`
  - `<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js"></script>`
  - `<link rel="stylesheet" href="../../colors_and_type.css">`
  - `<div id="root"></div>`
  - Load role components from `components/*.jsx` with `<script type="text/babel" src="components/ComponentName.jsx"></script>`.
  - Mount with `const { App } = window; const root = ReactDOM.createRoot(document.getElementById("root")); root.render(<App />);`.
- Preserve at least three high-signal source examples outside `context/` under `source_examples/` when reusable component snapshots exist, so future agents can compare generated components against original source structure.
- When a captured asset path begins with `build/`, copy the snapshot back into a root `build/` path with its original filename, such as `context/.../files/build/icon.png` -> `build/icon.png`. Do not satisfy build/runtime icon evidence by only renaming those files into `assets/`.
- Make `preview/brand-assets.html` visibly load preserved asset files from `assets/` or `build/`; do not redraw captured logos/icons as inline placeholders.
- Extract concrete colors, typography, spacing, radius, component behavior, assets, and product tone only when supported by inspected files.
- If evidence is missing or ambiguous, mark that uncertainty instead of inventing tokens.
