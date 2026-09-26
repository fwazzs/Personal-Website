# CLAUDE.md — ILITS Portfolio

@AGENTS.md

Project-level instructions. They extend `D:\AI\Project\CLAUDE.md`; where they differ, **this file wins**.

## What this is
A personal portfolio site for **Naufal Fawwaz Rahman**, built to apply to the
**INI LHO ITS! 2027 — IT Development / Web Development** subdivision.
Target roles: **1st Front-End, 2nd UI/UX.** It's part of the application, and it's also
something the reviewers will open and judge.

Source docs in this folder: `GUIDEBOOK_ILITS_27_General.md`, `GUIDEBOOK_ILITS_27_Web_Development.md`.
Design spec: **`DESIGN.md`** (mirrors the approved canvas).

### Deadlines (WIB)
| Date | What | Means for us |
|---|---|---|
| **27 Sep 2026 23:59** | Registration closes | Site **must be live on a public URL** before this |
| 30 Sep | Document screening result | reviewers may browse the site + repo |
| 2–4 Oct | Interview | Fawwaz must be able to explain every part of the code |
| 7 Oct | Result | — |

**Ship first, polish later.** A deployed site that's 90% done beats a perfect one on localhost.
If time is short, cut in this order: skills-ring animation → halftone portrait (use the plain
`<img>`) → hero particles (keep the static grid). Never cut: responsive layout, accessibility, real content.

## What reviewers are checking (from the guidebook)
Every build decision should make one of these visible:

| Criterion | How the site proves it |
|---|---|
| Semantic HTML | landmarks, one h1, `<dl>`, `<ul>`, real `<a>`/`<button>` |
| Responsive CSS | pixel-faithful at 390 and 1440, fluid in between, mobile-first Tailwind |
| JavaScript fundamentals | the two hand-written canvas components (no animation library for them) |
| Components / props / state | small typed components, data passed as props, cycling word + menu as state |
| RESTful API integration | *optional, only if time allows:* fetch public GitHub repo data (stars, last push) for the project cards in a server component with `revalidate` |
| Next.js (bonus) | App Router, `next/font`, `next/image`, metadata API |
| UI/UX: accessibility | contrast table + focus states in `DESIGN.md §5`, reduced-motion support |
| UI/UX: Figma | the design exists as a canvas; if Figma MCP gets authenticated, mirror it there |
| Git & GitHub (branch + PR) | public repo, feature branches, PRs merged into `main` — the history is part of the portfolio |
| "Pengendali AI, bukan dikendali AI" | Fawwaz can explain the code. See *Working with me* below |

## Tech stack
- **Next.js** (App Router, latest stable) + **TypeScript** (`strict`) + **Tailwind CSS** — overrides the parent's plain-React default for this project only.
- One route: `/`. Fully static (`output` can stay default; nothing server-dynamic unless the optional GitHub fetch is added).
- Fonts via `next/font/google`: Instrument Serif, Instrument Sans, JetBrains Mono.
- Design tokens from `DESIGN.md §1` go into the Tailwind theme (`@theme` in `globals.css` for Tailwind v4). No raw hex in components.
- **No new dependencies** without asking. No animation library — CSS keyframes + the two canvas components cover everything in the design. No Three.js (the house is CSS 3D).
- Deploy: **Vercel**, connected to the GitHub repo.

## Structure
```
src/
├── app/
│   ├── layout.tsx        # fonts, metadata, <html lang="en">
│   ├── page.tsx          # composes the sections
│   └── globals.css       # Tailwind + @theme tokens + keyframes + reduced-motion block
├── components/
│   ├── Header.tsx / MobileMenu.tsx / Footer.tsx
│   ├── sections/             # Hero, Work, Skills, About, Contact
│   ├── HeroParticles.tsx     # 'use client' canvas
│   ├── HalftonePortrait.tsx  # 'use client' canvas
│   ├── ProjectCard.tsx, SkillChip.tsx, …
│   ├── SectionHeading.tsx    # shared eyebrow + h2
│   ├── ArrowUpRight.tsx      # shared icon
│   └── RevealObserver.tsx    # one IntersectionObserver that adds .is-in to every .reveal
├── data/content.ts       # all copy, projects, links — typed, single source
└── data/skills.ts        # skill names + Simple Icons SVG paths
public/portrait.jpg       # green-screen photo, keyed out by HalftonePortrait
```
Content lives in `data/`, never hard-coded inside components. Unknown URLs use `MISSING_URL` — grep it before deploy.

## Content (fixed facts — don't invent or rewrite)
- **Name**: Naufal Fawwaz Rahman ("Fawwaz"). Information System student at ITS, Surabaya.
- **Tagline**: "I prompt and design to Build / Deploy / Experiment."
- **Projects** (this order): **Arsitekindo** (feature card), **Omni Calculator**, **Financial Management (FinMan)** — copy exactly as in `DESIGN.md §3`.
- **Email**: naufal.fawwaz.rahman123@gmail.com
- **Still missing — ask Fawwaz, don't guess**: GitHub URL, LinkedIn URL, Instagram URL, live/repo link for each project, the portrait file.
- Copy stays **general and professional** — no ILITS-specific wording on the site itself.
- Language: English.

## Conventions (additions to the parent file)
- Server components by default; `'use client'` only for HeroParticles, HalftonePortrait, the cycling word, the mobile menu and the reveal hook.
- **Inline `style` exception**: allowed only for per-item animation delays and canvas sizing. Everything else is Tailwind.
- Every animation must respect `prefers-reduced-motion` (see `DESIGN.md §1 Motion`).
- Canvas loops must pause off-screen and on hidden tabs — Lighthouse 90+ is still the bar.
- Before changing the look: update the canvas first, then `DESIGN.md`, then code. Never redesign in code.

## Working with me (Fawwaz)
- I'll be interviewed on this code. Keep it **boring and readable**; no clever one-liners.
- When you write something non-obvious (the particle math, the halftone sampling, the reveal observer), give me a **2–3 line plain explanation in chat** so I can explain it myself. Not in code comments.
- Small steps: one section per branch/PR (`feature/hero`, `feature/work`, …). I review before merge.

## Commands
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # must pass before every PR
npm run lint
```

## Definition of done (per section)
1. Matches the canvas at **390** and **1440**, no horizontal scroll in between.
2. Keyboard: tab through it, focus ring visible, nothing unreachable.
3. Reduced motion on → no animation, content still visible.
4. `npm run build` and `npm run lint` clean.
5. Final pass before submitting: Lighthouse (mobile) ≥ 90 in all categories, `og:image` + favicon + `<title>` set, live URL checked on a real phone.

Security: static site, no forms, no secrets. `/security-review` only if a form or API route gets added.
