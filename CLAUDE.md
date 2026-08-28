# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the dev server (Next.js + Turbopack) at http://localhost:3000
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint (`next/core-web-vitals` + `next/typescript`)

There is no test suite and no test runner configured.

## Architecture

Personal portfolio built with **Next.js 15 (App Router), React 19, Tailwind CSS v4, and shadcn/ui** (new-york style, `slate` base color). Deployed on Vercel. Path alias `@/*` maps to the repo root.

### Routing and page structure

- `app/page.tsx` redirects `/` to `/about`. `app/layout.tsx` is the only shared shell: it wraps everything in `LanguageProvider`, renders the fixed `Navbar`, and applies the global slate gradient background and Geist fonts.
- Each nav destination is its own route directory: `app/about`, `app/competences`, `app/projets`, `app/experience`, `app/contact`. Each `page.tsx` exports route-specific `Metadata` and renders a single matching component from `components/sections/`.
- Route slugs are French (`/competences`, `/projets`) and are hardcoded in `components/layout/Navbar.tsx`. `components/Portfolio.tsx` is a legacy single-page composition of all sections — not currently routed.

### Internationalization

`contexts/LanguageContext.tsx` holds the entire translation system: a `translations` object with `fr` and `en` keys, a `useLanguage()` hook exposing `t(key)`, `language`, and `setLanguage`. Default language is `fr`; state is in-memory only (not persisted, no URL locale). When adding user-facing text to a section, add the key to **both** `fr` and `en` in this file and call `t("...")`. `LanguageSelector` (in `components/layout/`) toggles the language.

### Content data

Static content lives in `data/` as typed exports, consumed directly by section components:
- `data/projects.ts` — `Project[]` (note: `status` union is in French; `projects.ts` content is not run through the `t()` translation system)
- `data/skills.tsx` — `Skill[]` with inline lucide-react icon JSX (hence `.tsx`)
- `data/experience.ts` — `Experience[]` (partly superseded by translated `experience.*` keys in `LanguageContext`)

### Design system — "deep matter"

The theme deliberately avoids the generic blue→purple gradient look. All colours are CSS custom properties defined once in `app/globals.css` and exposed to Tailwind v4 via `@theme inline`:
- `--void` / `--surface` / `--surface-2` — near-black cold-blue backgrounds (`bg-void`, `bg-surface`, …)
- `--ink` / `--ink-dim` / `--ink-faint` — text tiers (`text-ink`, …)
- `--accent` (cold cyan) is the **single** brand accent; `--accent-2` (magenta) is a sparingly-used counter-accent. `--hairline` is the standard 8%-white border.
- shadcn aliases (`--primary`, `--card`, `--border`, …) are remapped onto these tokens, so `components/ui/` primitives inherit the theme automatically.
- `--on-accent` is the foreground colour for solid-accent surfaces (accent buttons); use `text-on-accent`, never a hardcoded colour.

### Light / dark theme

- Light is the default `:root`; `.dark` on `<html>` overrides only the **raw** tokens — the shadcn aliases are `var()` references so they re-resolve per theme automatically. Add new colours as raw tokens in both blocks, not as one-off values inside a component.
- The blocking inline script in `app/layout.tsx` sets the initial `.dark` class before paint from `localStorage.theme`, falling back to `prefers-color-scheme`. `<html>` ships with `className="dark"` + `suppressHydrationWarning`.
- `components/layout/ThemeToggle.tsx` (next to `LanguageSelector` in `Navbar`) flips the class and persists to `localStorage`. Canvas visuals cannot read CSS variables, so `hooks/useIsDark.ts` mirrors the class via MutationObserver and `NetworkCanvas` re-mounts the scene on change to swap `NETWORK_PALETTES`.
- `--grain-opacity` / `--grain-blend` / `--edge` are theme-scoped so the grain film and vignette stay legible in light mode.
- Do **not** reintroduce `slate-*` / `blue-*` / `purple-*` utility classes or `bg-gradient-*` accents — use the tokens.
- Texture: `body::before` is a fixed SVG fractal-noise grain, `body::after` a vignette. `.bloom` is a reusable radial accent glow to place behind hero elements.
- The `Button` `variant="cv"` is the accent-outline style used for the CV link. Mono/technical framing (`font-mono`, `> label`, `01 — SECTION` indices) is part of the identity.

### Motion & 3D

The WebGL piece is a **distributed-system graph in the shape of Madagascar**: nodes wired to their nearest neighbours, with light packets travelling the edges. Both halves of that are deliberate — the network says what he builds, the silhouette says where he is. Keep that reading if you change it.

- `data/madagascar.ts` — the island outline, derived from a public simplified GeoJSON, projected with a cos(latitude) correction, centred and scaled to 2 units tall. Regenerate it rather than hand-editing: the sampling assumes one closed ring with no repeated closing vertex.
- `components/three/NetworkField.tsx` — the scene graph itself, plus `buildGraph()` (≈45% of nodes walked along the coastline at even arc-length so the silhouette reads, the rest best-candidate-sampled inside the polygon so it still looks like a mesh; then k-nearest-neighbour edges and degree-ranked hubs) and `NETWORK_PALETTES`. Node counts must stay high enough for the coastline to be legible — below ~20 nodes the shape stops reading.
- Coastal nodes are stored first, in perimeter order, and **explicitly chained into a closed ring before** the k-nearest-neighbour pass. Without that chain the silhouette does not render at all: nearest-neighbour linking connects each coastal node inward to the mesh rather than to the next point along the shore.
- The island is flat, so it **cannot spin**: edge-on it would vanish. It drifts within a shallow arc (`drift` in the config), leans toward the pointer, and only its depth breathes — scaling is uniform so the coastline never wobbles. All per-frame work writes into buffers allocated once in `useMemo`; nodes are two `instancedMesh`es (plain + hub), edges one `lineSegments`, packets one `points`. `buildGraph` is seeded with a fixed PRNG so a theme swap re-mounts an identical graph.
- Traffic is the point of the scene: a packet arriving at a node sets `excite[node] = 1` (decaying pulse of scale + colour via `setColorAt`), and each edge carries per-vertex colours lerped toward `palette.packet` so the glow travels with the packet. `palette.edge` is therefore kept well below `palette.packet`: it has to be bright enough to draw the coastline, but pushing it much higher flattens the contrast and the traffic stops reading. Keeping `packetCount` well under the edge count matters for the same reason.
- `components/three/NetworkScene.tsx` — the `<Canvas>` plus `FitCamera`, which pulls the camera back on portrait viewports (the `fov` is vertical, so a narrow screen would crop the island). Its `VARIANTS` table holds four tunings: `hero`, `heroCompact`, `ambient`, `ambientCompact`. The phone hero (`heroCompact`) deliberately uses a **larger** island than desktop: the portrait sits on top of it, so the island has to extend past the photo on all sides for the coastline to read. `About.tsx` shrinks the portrait to `w-40` on mobile for the same reason, and `.mask-hero` fades the canvas out vertically before it reaches the body copy.
- `components/three/NetworkCanvas.tsx` — client wrapper: `next/dynamic({ ssr: false })`, mounts after first paint, skips WebGL entirely under `prefers-reduced-motion`, optional static `.bloom` fallback. Used at full strength on the About hero.
- `components/three/AmbientBackdrop.tsx` — mounted once in the root layout as a `fixed inset-0 -z-10` layer so it survives route changes. Returns `null` on `/about`, which owns the hero scene, so the two canvases never coexist. It runs on phones too, in its `ambientCompact` tuning.
- `three` / `@react-three/fiber` / `@react-three/drei` must only be imported from `components/three/` behind the dynamic wrapper — importing them elsewhere pulls ~150kB into the shared bundle.
Everything else is CSS 3D, deliberately: it keeps text as real DOM (SEO, accessibility, selectable) and costs no extra canvas. Only add WebGL where the visual genuinely cannot be done in CSS.

- `components/effects/Reveal.tsx` — IntersectionObserver fade/slide-in wrapper (`delay` prop for stagger); animation is in the `.reveal` utility with a visibility safety-net timeout.
- `components/effects/TiltCard.tsx` — pointer-driven CSS 3D tilt (writes `--rx`/`--ry` for the `.tilt` utility); flattens on coarse pointers and reduced motion.
- `components/effects/ScrollCard.tsx` + `lib/scrollBus.ts` — scroll-position 3D bend on the project cards (upright at viewport centre, pitched back and dimmed toward the edges, sheared by scroll velocity). `scrollBus` runs **one** scroll listener and **one** rAF loop for the whole page and parks itself when idle — subscribe through it rather than adding per-element listeners. Nesting order on a project card is `Reveal > ScrollCard > TiltCard > Card`, each owning its own transform.
- `components/common/Timeline.tsx` — `Timeline` / `TimelineItem` / `TimelineMarker`, the shared vertical rail used by **both** the Experience and Skills pages (hairline spine, icon marker box, and the travelling `.rail-dot`). Render through these rather than re-hand-rolling the markup: the rail offset, the item padding and the marker size all have to agree, and the two pages are expected to look identical in structure.
- The skills page presents four architecture layers — interface, API, data, delivery — inside that same `Timeline`. An earlier isometric-tilt version of it was rejected for not matching the rest of the site, as was a looping colour pulse across the cards — **cards on this site never animate on their own**; the rail dot is the only self-running motion outside the hero. Layer names live in `LanguageContext` under `skills.layer.*`; the tech lists are in `LAYERS` in `Skills.tsx`. There are deliberately **no** skill percentages — self-rated bars were dropped in favour of showing the architecture.
- `hooks/usePrefersReducedMotion.ts` — shared reduced-motion state. Every motion effect must respect it; `.reveal` / `.tilt` are also neutralised via `@media (prefers-reduced-motion: reduce)` in `globals.css`.
- Never run `npm run build` while `npm run dev` is live — they share `.next` and corrupt it (fix: stop both, `rm -rf .next`, restart).

### Other UI conventions

- `components/ui/` are shadcn/ui primitives; `cn()` from `lib/utils.ts` merges classes. Add new primitives with the shadcn CLI (`components.json` is configured).
- Static assets: CV PDF at `public/cv/CV_Yael.pdf`, images under `public/images/`.
- All section and layout components are `"use client"` (they consume the language context and/or motion hooks).
