# Mobile UI Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the two confirmed mobile UX problems in the portfolio site — no way to access nav links on phones, and an unreadably-squeezed SkillsGraph — without touching anything already confirmed to work on mobile.

**Architecture:** Two independent, additive changes to existing components. Nav gets a client-side hamburger toggle + framer-motion dropdown panel (framer-motion is already a project dependency, used the same way in `SkillShowcase.jsx`). SkillsGraph gets a CSS-only breakpoint that turns its wrapper into a horizontal scroll container with a fixed-width SVG, plus a second, mobile-specific hint string swapped in via CSS visibility.

**Tech Stack:** Next.js 16 (App Router), React 19, CSS Modules, framer-motion (already installed, no new dependencies).

## Global Constraints

- No new dependencies. Reuse `framer-motion` (already in `package.json`) for the dropdown animation, matching the pattern in `src/components/ui/SkillShowcase.jsx:87-118` (`AnimatePresence` + `motion.div`, `transition={{ duration: ..., ease: [0.22, 1, 0.36, 1] }}`).
- The Nav breakpoint stays at `720px` (existing value in `Nav.module.css`). The SkillsGraph breakpoint is `640px` (matches the existing breakpoint already used in `Contact.module.css`).
- **No automated test framework exists in this repo** (no jest/vitest/playwright, no `*.test.*` files, no test script in `package.json`). Do not invent one for this task — it's out of scope and disproportionate for a CSS/markup change on a portfolio site. Each task's verification step is manual instead: start the dev server, fetch/read the rendered output, and check for console/build errors. Do not use `resize_window` or headless-Chrome tricks to emulate mobile viewports in this environment — in this session `resize_window` did not actually change the rendered viewport (`window.innerWidth` stayed pinned to screen width), and a headless-Chrome attempt accidentally killed the user's real Chrome window (same installed binary/profile as the connected browser). Prefer static verification (reading generated HTML/CSS, confirming class names and conditional logic) and, if visual confirmation is wanted, ask the user to check on their own phone or browser window.
- Keep both changes purely additive: don't touch any file outside `Nav.jsx`, `Nav.module.css`, `SkillsGraph.jsx`, `SkillsGraph.module.css`.

---

### Task 1: Nav mobile hamburger menu

**Files:**
- Modify: `src/components/layout/Nav.jsx`
- Modify: `src/components/layout/Nav.module.css`

**Interfaces:**
- Consumes: `SITE` (`.initials`, `.name`) and `NAV_LINKS` (array of `{ label, href }`) from `@/lib/site` — unchanged, already imported today.
- Produces: nothing consumed by other tasks — Nav is a leaf component rendered once from `src/app/page.js`.

- [ ] **Step 1: Rewrite `Nav.jsx` with the hamburger + dropdown**

Replace the full file contents with:

```jsx
'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SITE, NAV_LINKS } from '@/lib/site';
import styles from './Nav.module.css';

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <a href="#top" className={styles.brand} onClick={close}>
          <span className={styles.logo}>{SITE.initials}</span>
          <span className={styles.name}>{SITE.name}</span>
        </a>

        <div className={styles.right}>
          <div className={styles.links}>
            {NAV_LINKS.map(({ label, href }) => (
              <a key={label} href={href} className={styles.link}>
                {label}
              </a>
            ))}
          </div>
          <a href="#contact" className={styles.cta}>
            Get in touch
          </a>
          <button
            type="button"
            className={styles.menuToggle}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              {open ? (
                <path
                  d="M5 5L15 15M15 5L5 15"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M3 5.5H17M3 10H17M3 14.5H17"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className={styles.dropdown}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {NAV_LINKS.map(({ label, href }) => (
              <a key={label} href={href} className={styles.dropdownLink} onClick={close}>
                {label}
              </a>
            ))}
            <a href="#contact" className={styles.dropdownCta} onClick={close}>
              Get in touch
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
```

- [ ] **Step 2: Add the hamburger/dropdown styles to `Nav.module.css`**

Insert these new rules after the existing `.cta:hover { ... }` block (right before the `@media (max-width: 720px)` block at the end of the file):

```css
.menuToggle {
  display: none;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  border: 1px solid var(--glass-border-strong);
  background: var(--glass-strong);
  color: var(--text);
  flex-shrink: 0;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: 6px 28px 20px;
  background: rgba(7, 10, 24, 0.92);
  backdrop-filter: blur(16px) saturate(140%);
  -webkit-backdrop-filter: blur(16px) saturate(140%);
  border-bottom: 1px solid var(--glass-border);
}

.dropdownLink {
  padding: 13px 2px;
  font-size: 15.5px;
  font-weight: 500;
  color: var(--text-muted);
  border-bottom: 1px solid var(--glass-border);
}
.dropdownLink:last-of-type {
  border-bottom: none;
}
.dropdownLink:hover {
  color: var(--text);
}

.dropdownCta {
  margin-top: 14px;
  text-align: center;
  background: var(--glass-strong);
  border: 1px solid var(--glass-border-strong);
  color: var(--text);
  font-weight: 600;
  font-size: 14px;
  padding: 12px 18px;
  border-radius: 11px;
}
```

Then replace the existing trailing block:

```css
@media (max-width: 720px) {
  .links {
    display: none;
  }
}
```

with:

```css
@media (max-width: 720px) {
  .links {
    display: none;
  }
  .cta {
    display: none;
  }
  .menuToggle {
    display: inline-flex;
  }
}
```

- [ ] **Step 3: Verify with the dev server**

Run (background is fine, but wait for "Ready" before checking):
```bash
npm run dev
```
Then:
```bash
curl -s http://localhost:3000 | grep -o 'menuToggle[a-zA-Z0-9_]*' | head -1
curl -s http://localhost:3000 | grep -o 'mobile-menu' | head -1
```
Expected: both greps print a match (confirms the hamburger button and `#mobile-menu` container are present in the server-rendered HTML). Also confirm the terminal running `npm run dev` shows no compile errors and `GET /` returns 200:
```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000
```
Expected: `200`.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Nav.jsx src/components/layout/Nav.module.css
git commit -m "$(cat <<'EOF'
✨ Add mobile hamburger menu to Nav

Nav links were display:none below 720px with no replacement, making
About/Journey/Skills/Work/Praise unreachable on phones. Adds a toggle
button + framer-motion dropdown (same animation pattern already used
in SkillShowcase) containing the links and the CTA.
EOF
)"
```

---

### Task 2: SkillsGraph mobile horizontal scroll

**Files:**
- Modify: `src/components/sections/SkillsGraph.jsx`
- Modify: `src/components/sections/SkillsGraph.module.css`

**Interfaces:**
- Consumes: nothing from Task 1 — fully independent.
- Produces: nothing consumed elsewhere — `SkillsGraph` is only rendered from `src/components/sections/Skills.jsx`, which is unmodified by this task.

- [ ] **Step 1: Replace the single hint paragraph with a desktop/mobile pair**

In `src/components/sections/SkillsGraph.jsx`, find the closing of the component (currently):

```jsx
      <p className={styles.hint}>Hover a node to trace its branch · drag to rearrange</p>
    </div>
  );
}
```

Replace those two lines with:

```jsx
      <p className={`${styles.hint} ${styles.hintDesktop}`}>
        Hover a node to trace its branch · drag to rearrange
      </p>
      <p className={`${styles.hint} ${styles.hintMobile}`}>
        Scroll to explore · tap &amp; drag a node to rearrange
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Add the mobile breakpoint to `SkillsGraph.module.css`**

Replace the file's existing trailing block:

```css
@media (max-width: 560px) {
  .hint {
    font-size: 12px;
  }
}
```

with:

```css
.hintMobile {
  display: none;
}

@media (max-width: 560px) {
  .hint {
    font-size: 12px;
  }
}

@media (max-width: 640px) {
  .wrap {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .svg {
    width: 720px;
    max-width: none;
  }
  .hintDesktop {
    display: none;
  }
  .hintMobile {
    display: block;
  }
}
```

- [ ] **Step 3: Verify with the dev server**

With `npm run dev` still running from Task 1 (restart it if it was stopped):
```bash
curl -s http://localhost:3000 | grep -o 'Scroll to explore' | head -1
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000
```
Expected: `Scroll to explore` is found, and the status code is `200`. Also check the terminal running `npm run dev` for compile errors (there should be none — this is a pure CSS/JSX text change, no new imports).

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/SkillsGraph.jsx src/components/sections/SkillsGraph.module.css
git commit -m "$(cat <<'EOF'
✨ Make SkillsGraph horizontally scrollable on mobile

Below 640px the graph was shrinking to fit the viewport, squeezing
~30-40 nodes into a ~330x220px area with unreadable labels. Now the
wrapper scrolls horizontally and the SVG keeps a fixed 720px width so
nodes/labels/icons stay legible and tappable. Hint text is swapped for
a touch-appropriate version (no "hover" on phones).
EOF
)"
```

---

### Task 3: Stop the dev server

- [ ] **Step 1: Kill the dev server started during verification**

```bash
lsof -i :3000 -t | xargs -r kill
```
Expected: no output, and `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000` now fails to connect (server is down).
