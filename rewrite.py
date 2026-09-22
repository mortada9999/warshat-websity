import re
import sys

with open('src/components/kids/KidsPage.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Imports
code = code.replace("import React from 'react';", "import React, { useRef } from 'react';\nimport gsap from 'gsap';\nimport { ScrollTrigger } from 'gsap/ScrollTrigger';\nimport { useGSAP } from '@gsap/react';")

# 2. Hooks and GSAP init
code = code.replace(
    "export default function KidsPage() {",
    "if (typeof window !== 'undefined') {\n  gsap.registerPlugin(ScrollTrigger, useGSAP);\n  ScrollTrigger.config({ ignoreMobileResize: true });\n}\n\nexport default function KidsPage() {"
)

code = code.replace(
    "const kidsWorkshops = getByCategory('kids_workshop', false);",
    "const kidsWorkshops = getByCategory('kids_workshop', false);\n\n  const containerRef = useRef<HTMLElement>(null);\n\n  useGSAP(() => {\n    const sections = gsap.utils.toArray('.stackable-section') as HTMLElement[];\n    sections.forEach((section, index) => {\n      if (index === sections.length - 1) return;\n      ScrollTrigger.create({\n        trigger: section,\n        start: 'bottom bottom',\n        end: 'bottom top',\n        pin: true,\n        pinSpacing: false,\n        invalidateOnRefresh: true,\n      });\n    });\n    ScrollTrigger.refresh();\n  }, { scope: containerRef });"
)

# 3. Wrapping
code = code.replace('<main dir="rtl">', '<main dir="rtl" ref={containerRef} className="relative z-10 bg-[#F6F6F4] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">\n      <div className="w-full overflow-hidden">')

# Hero Wrapper
code = code.replace(
    '{/* ══ HERO',
    '<div className="stackable-section relative w-full" style={{ backgroundColor: \'#F6F0E2\', zIndex: 10, minHeight: \'100svh\', paddingBottom: \'60svh\' }}>\n      {/* ══ HERO'
)
code = code.replace(
    '      {/* ══ WORKSHOPS',
    '      </div>\n\n      {/* ══ WORKSHOPS'
)

# Workshops Wrapper
code = code.replace(
    '      <section id="workshops" className={styles.sectionWhite}>',
    '      <div className="stackable-section relative w-full" style={{ backgroundColor: \'#FDFBF7\', zIndex: 20, minHeight: \'100svh\', paddingBottom: \'60svh\' }}>\n        <TornEdge color="#FDFBF7" seed={1} isNotebook={false} />\n      <section id="workshops" className={styles.sectionWhite}>'
)
code = code.replace(
    '      {/* ══ COURSES',
    '      </div>\n\n      {/* ══ COURSES'
)

# Courses Wrapper
# Note: Currently it has `<section id="courses" className={styles.section} style={{ zIndex: 10 }}>` and `<TornEdge... />` inside. I will remove TornEdge inside.
code = code.replace(
    '      <section id="courses" className={styles.section} style={{ zIndex: 10 }}>\n        <TornEdge color="#F6F0E2" seed={4} isNotebook={true} />',
    '      <div className="stackable-section relative w-full" style={{ backgroundColor: \'#F6F0E2\', zIndex: 30, minHeight: \'100svh\', paddingBottom: \'60svh\' }}>\n        <TornEdge color="#F6F0E2" seed={4} isNotebook={false} />\n      <section id="courses" className={styles.section}>'
)

# Replace old torn edge if any variations
code = re.sub(r'<section id="courses" className=\{styles\.section\}>\s*<div className=\{styles\.sectionInner\}>', r'<div className="stackable-section relative w-full" style={{ backgroundColor: \'#F6F0E2\', zIndex: 30, minHeight: \'100svh\', paddingBottom: \'60svh\' }}>\n        <TornEdge color="#F6F0E2" seed={4} isNotebook={false} />\n      <section id="courses" className={styles.section}>\n        <div className={styles.sectionInner}>', code)

code = code.replace(
    '      {/* ══ FOOTER',
    '      </div>\n\n      {/* ══ FOOTER'
)

# Footer Wrapper
code = code.replace(
    '      <footer className={styles.footer}>',
    '      <div className="stackable-section relative w-full" style={{ backgroundColor: \'#2A2420\', zIndex: 40, minHeight: \'100svh\', paddingBottom: \'0\' }}>\n        <TornEdge color="#2A2420" seed={5} isNotebook={false} />\n      <footer className={styles.footer}>'
)
code = code.replace(
    '      </footer>\n    </main>',
    '      </footer>\n      </div>\n\n      </div>\n    </main>'
)

with open('src/components/kids/KidsPage.tsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Done")
