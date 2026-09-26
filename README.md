# Naufal Fawwaz Rahman — Portfolio

Personal portfolio: a single-page, dark-monochrome site showing my projects, skills and contact.

**Stack:** Next.js (App Router) · TypeScript (strict) · Tailwind CSS v4 · deployed on Vercel.
No UI or animation libraries — the hero particle ring and the halftone portrait are hand-written
Canvas 2D; everything else is CSS.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## How it's organised

```
src/
├── app/            layout (fonts, metadata), page, global tokens + keyframes
├── components/     Header, Footer, shared pieces, canvas components
│   └── sections/   Hero, Work, Skills, About, Contact
└── data/           all copy, projects, links and skill icons — one source of truth
```

- Design tokens (colors, type scale, easing) live in `src/app/globals.css` as a Tailwind `@theme`.
- Display type scales fluidly between the 390px and 1440px designs with `clamp()`.
- Accessibility: semantic landmarks, visible focus rings, keyboard-reachable tooltips and menu,
  and every animation respects `prefers-reduced-motion`.
- Canvas loops pause when off-screen or when the tab is hidden.

Design spec: [`DESIGN.md`](DESIGN.md).
