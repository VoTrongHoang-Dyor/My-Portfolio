# Mobile UI Optimization — Design

## Context

An audit of the portfolio site's mobile responsiveness (CSS breakpoints across
all `*.module.css` files) found that most sections already handle mobile well
(About, Education, Timeline, Skills tag cloud, Work, Testimonials,
SkillShowcase chat, Contact). Two real problems remain:

1. **Nav has no mobile menu.** Below 720px, `Nav.module.css` sets
   `.links { display: none; }` with no replacement — the About/Journey/
   Skills/Work/Praise anchor links become completely inaccessible on phones.
   Only the logo and "Get in touch" CTA remain visible.
2. **SkillsGraph is unreadable when squeezed to phone width.** The
   force-directed skills graph (`SkillsGraph.jsx`) renders a ~1000×660 viewBox
   SVG with ~30-40 nodes. `width: 100%; height: auto` scales it down to fit
   the ~330px content width on a phone, making labels, icons, and tap targets
   too small to use.

No other blocking mobile issues were found in the deeper pass (tap target
sizes, horizontal-overflow risk, form inputs triggering iOS zoom, etc. were
all checked and are fine — `html, body { overflow-x: hidden }` already guards
against accidental horizontal scroll).

## 1. Nav mobile menu

**Behavior:**
- `Nav.jsx` becomes a client component (`'use client'`) with an `open` boolean
  state.
- Below 720px (existing breakpoint, unchanged): the "Get in touch" CTA is
  hidden from the bar (there isn't room for brand + hamburger + CTA on
  narrow phones) and replaced by a hamburger toggle button — a plain inline
  SVG icon (no new dependency), morphing to an X when open.
- Tapping the hamburger opens a full-width dropdown panel directly under the
  nav bar, styled with the same `glass`/`blur` treatment used elsewhere on
  the site. It contains the nav links (About, Journey, Skills, Work, Praise)
  followed by the "Get in touch" CTA.
- Closing triggers: tapping a link, pressing Escape, tapping the hamburger
  again.
- Accessibility: `aria-expanded` and `aria-controls` on the toggle button,
  `aria-label` ("Open menu" / "Close menu").
- Above 720px: unchanged from today — full horizontal link row, no hamburger
  button rendered (or rendered but hidden via existing media query, mirroring
  how `.links` is hidden today).

**Files touched:** `Nav.jsx`, `Nav.module.css`.

## 2. SkillsGraph mobile scrolling

**Behavior:**
- Below 640px, `.wrap` becomes a horizontally-scrollable container
  (`overflow-x: auto`, `-webkit-overflow-scrolling: touch`) instead of
  shrinking the graph to fit.
- The `<svg>` gets a fixed CSS pixel width (720px) with `flex-shrink: 0` /
  `max-width: none` on this breakpoint, so nodes, labels, and icons stay at a
  legible, tappable size regardless of viewport width. The viewBox
  (`0 0 1000 660`) and the physics simulation are untouched — only the CSS
  rendering size changes.
- The hint line under the graph ("Hover a node to trace its branch · drag to
  rearrange") doesn't match touch input (no hover). Two variants are
  rendered — one visible ≥720px ("Hover…"), one visible <720px ("Scroll to
  explore · tap & drag a node to rearrange") — toggled with the same
  breakpoint via CSS, no JS/media-query-in-JS needed.

**Files touched:** `SkillsGraph.jsx`, `SkillsGraph.module.css`.

## Non-goals

- No redesign of SkillsGraph into a non-graph mobile layout (e.g., a flat
  list) — scroll-to-explore was chosen over a simplified alternative.
- No changes to sections already confirmed to handle mobile correctly.
- No new dependencies (icon libraries, gesture libraries) are introduced.

## Testing

Dev server + manual verification at common phone widths (375px, 390px,
414px) and at the 640px/720px breakpoints themselves (boundary check).
Verify: hamburger opens/closes, links navigate and close the menu, no
horizontal overflow introduced, SkillsGraph scrolls smoothly and drag/tap
still works on the enlarged nodes.
