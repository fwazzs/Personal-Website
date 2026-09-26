# DESIGN.md — ILITS Portfolio

Written spec of the approved design canvas. **The canvas is the source of truth**;
this file mirrors it so code can be built without re-reading 100KB of mockup HTML.
If the two disagree, the canvas wins — fix this file.

- Canvas: https://claude.ai/artifact/DHaJP3BMyQCaTRjsUuoh2F ("ILITS Portfolio")
- Artboards: `Main.dc.html` (Desktop, 1440 × 4180) · `Mobile.dc.html` (Mobile, 390 × 4610)
- Look: **dark monochrome**, editorial. Hero modelled on v0-optimus (grid lines, giant serif
  headline with a cycling word, tool marquee); particle-ring background after antigravity.google.
- Rejected directions (don't bring back): ASCII ball hero, ILITS-specific copy, color accents.

---

## 1. Tokens

### Color
| Token | Hex | Use |
|---|---|---|
| `bg` | `#0A0A0B` | page background |
| `surface` | `#111113` | card background, row hover |
| `surface-sunken` | `#0D0D0F` | card media/illustration area |
| `surface-raised` | `#141416` / `#161618` / `#1F1F22` | skill chip / ghost-button hover / chip hover |
| `fg` | `#F5F5F7` | primary text, primary button fill, focus ring |
| `fg-hover` | `#FFFFFF` | link + primary button hover |
| `fg-muted` | `#A1A1A6` | body copy, nav links, descriptions |
| `fg-subtle` | `#86868B` | eyebrows, `<dt>` labels, marquee, footer |
| `fg-faint` | `#6E6E73` | second line of contact headline only (display size — passes 3:1 large-text) |
| `line` | `#1C1C1F` | section dividers, card media borders |
| `line-card` | `#232326` → hover `#3A3A3F` | card border |
| `line-chip` | `#2A2A2E` | chips, SVG gridlines |
| `line-ghost` | `#2E2E33` → hover `#48484E` | ghost button border |
| `grid` | `rgba(245,245,247,.04)` | hero grid lines |

No accent color. Emphasis comes from size, weight and white-vs-grey — never hue.

### Type
All three via `next/font/google` (not a `<link>`), exposed as CSS variables.

| Role | Family | Notes |
|---|---|---|
| Display | **Instrument Serif** 400 | h1/h2 only. Tight leading (0.9–1.0), `letter-spacing: -0.01em` to `-0.02em` |
| Body / UI | **Instrument Sans** 400–700 | default `body` font. h3 = 600, `-0.02em` to `-0.03em` |
| Mono | **JetBrains Mono** 400/500 | eyebrows, `<dt>`, chips, marquee, tooltips, footer |

| Element | Desktop | Mobile |
|---|---|---|
| Hero h1 | 160px / 0.9 | 68px / 0.92 |
| Section h2 | 72px / 1.0 | 46px / 1.0 |
| Contact h2 | 136px / 0.92 | 64px / 0.95 |
| Feature card h3 | 40px / 1.1 | 24px |
| Card h3 | 24px | 22px |
| Hero lead | 22px / 1.6 | 17px / 1.6 |
| Body | 17–19px / 1.6 | 15–17px / 1.6 |
| Eyebrow | 13px mono, UPPERCASE, `.08em` tracking | 12px |

### Shape & spacing
- Radius: cards `28px`, buttons/chips/tooltips `999px` (pill), skill chip = circle.
- Page gutter: desktop `80px`, mobile `24px` (work section `16px` + `8px` header inset).
- Section vertical rhythm: desktop 120–140px, mobile 80px. Sections divided by a 1px `line` top border.
- Buttons: 52px tall (≥44px touch target — keep it).

### Motion
- One easing everywhere: `cubic-bezier(.2,.8,.2,1)`.
- `.rise` — hero entrance: fade + 24px up, 1s, staggered 80ms (`d1`–`d4`).
- `.reveal` — scroll entrance: fade + 28px up, 0.9s, toggled by IntersectionObserver at `threshold: .15`.
- `.char` — cycling hero word: each letter blurs/slides in, 50ms stagger; word changes every **2.5s**.
- Marquees: tool strip 40s loop; skills ring 48s loop, **pauses on hover/focus**.
- Card hover: lift `-6px` + border brightens. Arrow icons nudge `3–4px` right.
- **`prefers-reduced-motion: reduce` is mandatory**: kill every animation, show `.reveal` content
  immediately, freeze canvas time (canvas still renders a static frame).

---

## 2. Components

| Component | Spec |
|---|---|
| **NavLink** | 14px `fg-muted`, 12px/6px padding, hover → `fg` + 1px underline scaling in from left (0.3s) |
| **Button primary** | pill, 52px, `fg` fill, `bg` text, 16px/500; hover → white + `scale(1.03)` |
| **Button ghost** | pill, 52px, 1px `line-ghost` border, `fg` text; hover → `#161618` fill |
| **Eyebrow** | mono uppercase label above every h2 |
| **ProjectCard** | `surface`, 1px `line-card`, 28px radius, `overflow:hidden`; whole card is one `<a>`. Media area on `surface-sunken`. "See detail ↗" row at bottom |
| **SkillChip** | 84px circle, `#141416`, 30px brand SVG in `fg`; hover → scale 1.08 + tooltip pill (mono 12px, inverted colors) above. Not focusable: most chips are off-screen in the moving band, so tabbing would land on invisible targets; the `<ul aria-label="Skills">` already exposes every name |
| **FactList** | `<dl>` 2-col grid, `<dt>` mono 12px `fg-subtle`, `<dd>` 16px `fg`, 1px top border |

Icons: inline stroke SVG (`stroke-width: 2`, round caps), `aria-hidden`. Brand logos = Simple Icons paths, `fill: currentColor`. No emoji, no icon font.

---

## 3. Page — section by section

Single page, anchors `#top #work #skills #about #contact`. Nav order: **Project · Skills · About**.

### Header
- Desktop: 80px, absolutely positioned over hero, nav centered, 48px gap. No logo, no CTA.
- Mobile: 64px, right-aligned 44×44 hamburger `<button aria-label="Open menu">` (two lines).
  Menu panel is **not designed** — build a simple full-screen overlay with the same three links,
  `aria-expanded`, Esc to close, focus trap.

### Hero `#top`
Desktop 900px tall, content vertically centered. Mobile 800px, content bottom-aligned
(`padding: 120px 24px 140px`).
1. **Particle-ring canvas** (full bleed, `aria-hidden`) — see §4.
2. **Grid overlay** — hairlines at every 12.5% vertical / 8.33% horizontal (desktop); 25% both ways (mobile).
3. **h1** (serif): "I prompt and / design to **{Build | Deploy | Experiment}**" — cycling word.
   `aria-label="I prompt and design to Build, Deploy, Experiment."` on the h1, cycling span `aria-hidden`.
4. **Lead** (`fg-muted`, max 560px): "Converting prompts into UI/UX designs and realizing them into applications using AI's powers."
5. **Tool marquee** pinned to bottom (88px / 64px mobile), top+bottom `line` borders,
   `rgba(10,10,11,.6)` backdrop, mono `fg-subtle`: React · TypeScript · Tailwind CSS · Three.js ·
   React Three Fiber · Motion · Figma · Supabase · Vite · Vitest · Git & GitHub.
   List duplicated once for the seamless loop; the duplicate is `aria-hidden`.

### Work `#work`
Eyebrow "PROJECT LIST" · h2 "Things I've Built."
- **Feature card — Arsitekindo** (desktop: 540px tall, grid `5fr 7fr`, text left / media right).
  Media = CSS-3D wireframe house slowly rotating (18s) on a 24px dot grid. Pure CSS (`preserve-3d`), not Three.js.
- **2-up grid** (desktop; stacked on mobile), media area 260px:
  - **Omni Calculator** — SVG sine curve that draws in/out (4.2s) + pulsing dot.
  - **Financial Management (FinMan)** — SVG bar chart, bars breathing (2.8s), one bar highlighted `fg`.
- Mobile: all three cards stack, media on top (220px), text 24px padding.

### Skills `#skills`
Eyebrow "Skills" · h2 "What I work with."
Full-bleed 200px band: SkillChips travel left→right along a straight `offset-path`, 48s loop,
evenly staggered. Order: HTML5, CSS, JavaScript, TypeScript, React, Tailwind CSS, Three.js, Motion,
Figma, Git, GitHub, Supabase, Vite, Vitest, Node.js, PostgreSQL, Claude.
`<ul aria-label="Skills">` so screen readers get the plain list.

### About `#about`
Desktop grid `5fr 7fr`, 80px gap, image left. Mobile stacked.
- **Halftone portrait canvas** (aspect 160:202, 28px radius) — see §4. Fallback: plain `<img>` grayscale.
- Eyebrow "About" · h2 "Hi, I'm Fawwaz."
- Bio: "I'm an `Information System` student at ITS who loves turning simple prompts into intuitive
  UI/UX designs, and then pushing them into real, interactive apps using AI." (the major in mono, `fg`)
- FactList: Studying — Information System, ITS · Based in — Surabaya, Indonesia ·
  Currently building — Financial Management (FinMan) · Toolbox — Figma, VS Code, Claude Code.

### Contact `#contact` + Footer
Soft radial glow from bottom center (`rgba(255,255,255,.06)` → transparent).
- Eyebrow "Contact" · h2 "Let's build something / together." (second line `fg-faint`)
- "Open to Front-End and UI/UX roles, internships and collaborations."
- Primary button: the email (`mailto:`) with ↗ · Ghost buttons: GitHub, LinkedIn, Instagram.
  Mobile: email full width, socials in a 3-col grid.
- Footer (mono 13px `fg-subtle`, 88px, top border): "© 2026 Naufal Fawwaz Rahman" ·
  "Designed and built by me · Next.js, Tailwind CSS" · "Back to top ↑". Mobile: stacked.
  (Canvas says "React, Three.js" — update to the real stack.)

---

## 4. Canvas visuals (the two hand-written pieces)

Both are client components with their own `requestAnimationFrame` loop. Port the math from the
canvas artboard's `<script>` — don't reinvent it.

**HeroParticles** — jittered dot grid (22px gap, ±40% jitter). A ring (R≈190px, breathing ±6%)
eases toward the pointer (lerp .08); dots near the ring grow, brighten and get pushed outward.
With no pointer, the ring drifts and morphs into a crescent. Click (not on a link/button) sends a
pulse that expands the ring. Dots are bucketed into 8 alpha levels (`.04`→`.39`) and drawn in 8
batched paths — keep that batching, it's the performance trick.

**HalftonePortrait** — loads the portrait, samples it to a 160×202 grid, keys out the green screen,
draws one `fg` dot per cell with radius ∝ luminance^0.85. A lens under the pointer enlarges dots 15%.
`role="img"` + `aria-label="Black-and-white halftone portrait of Fawwaz"`.

Production requirements the mockup skips:
- Size to the container (ResizeObserver) and regenerate dots on resize; respect `devicePixelRatio`.
- Stop the RAF loop when the canvas is off-screen (IntersectionObserver) or the tab is hidden.
- Reduced motion → draw one static frame, no loop.
- Touch: no hover on mobile — ring drifts on its own; tap = pulse.

---

## 5. Accessibility checklist (WCAG 2.1 AA)
- `:focus-visible` → 2px `fg` outline, 3px offset. Never remove it.
- Contrast on `bg`: `fg` 18.2:1, `fg-muted` 7.7:1, `fg-subtle` 5.5:1 — all pass. `fg-faint` 3.9:1 → display size only.
- Every animated/decorative element `aria-hidden`; text equivalents via `aria-label` (h1, marquee, skills list).
- Real `<a href>` / `<button>` only. One `<h1>`. Landmarks: `<header> <nav> <main> <footer>`.
- Touch targets ≥ 44px.

## 6. Assets
- `public/portrait.jpg` — green-screen portrait (the canvas upload). Needed by both the halftone and the fallback `<img>`.
- Brand SVG paths for skill chips — copy from the canvas artboard.
- Project links (live / repo) and social URLs — **still placeholders in the canvas** (`#github` etc.). Get real URLs from the user.
- `og:image` (1200×630, dark, name + headline) and favicon — not designed yet; keep them in the same monochrome style.
