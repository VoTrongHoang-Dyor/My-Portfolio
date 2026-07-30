## Problem

The career Timeline currently combines several tightly coupled responsibilities
inside one feature:

- Timeline rendering and presentation state.
- Desktop pointer dragging and click-versus-drag detection.
- Native touch scrolling and CSS scroll snapping.
- Card measurement, centering, and nearest-card selection.
- Hover, focus, keyboard navigation, and year-specific accents.
- One-time viewport and rolling-number animation.
- Portal dialog rendering and z-layer behavior.
- Body scroll locking, background `inert`, Escape handling, initial focus, and
  focus restoration.

These behaviors form one user interaction, but their coordination is exposed
through component-local effects, DOM queries, mutable refs, timers, and array
indexes. Bugs tend to occur in the seams: a drag can be mistaken for a click,
the modal can render but sit below another interaction layer, or cleanup can
leave the page locked or inert.

The feature has no boundary tests. Understanding or safely changing one behavior
requires reading the complete component, its CSS, its data shape, and the
surrounding reveal wrapper.

## Proposed Interface

Expose one complete feature component with stable data and one optional
observation callback:

```ts
type JourneyEntry = Readonly<{
  id: string;
  year: number;
  title: string;
  tag: string;
  accent: `#${string}`;
  details: readonly string[];
}>;

type CareerTimelineProps = Readonly<{
  entries: readonly JourneyEntry[];
  onEntryOpened?: (entry: JourneyEntry) => void;
  className?: string;
}>;

export default function CareerTimeline(
  props: CareerTimelineProps,
): React.ReactElement;
```

The page uses the canonical profile projection directly:

```jsx
import CareerTimeline from '@/features/career-timeline';
import { profile } from '@/profile';

<CareerTimeline
  entries={profile.journey}
  onEntryOpened={optionalAnalytics}
/>;
```

The public API intentionally does not expose refs, selected indexes, modal
callbacks, animation durations, gesture thresholds, portal targets, or body
lock flags. Those behaviors are product invariants owned by the feature.

The module hides:

- Stable-ID state for focused, hovered, and selected entries.
- Detection of the latest entry without relying on array order.
- Post-layout centering and resize behavior.
- Pointer capture and click-versus-drag thresholds.
- Native touch scroll and nearest-card snapping.
- Roving focus and Arrow Left/Right, Enter, and Space behavior.
- Accent application across card, year, and dialog presentation.
- One-time rolling-year animation and reduced-motion behavior.
- Portal lifecycle and unique accessible dialog IDs.
- Initial focus, focus trapping, Escape/backdrop/button dismissal, and focus
  restoration.
- Body scroll lock and exact restoration of prior body and background states.
- Cleanup for observers, pointer capture, timers, animation frames, focus
  layers, and transient styles.

The generic section entrance animation remains outside this feature and belongs
to the site-wide reveal system. Timeline-specific rolling and interaction
animation remain inside the Timeline boundary.

## Dependency Strategy

**Local-substitutable**.

Production depends on local browser capabilities:

- `IntersectionObserver` and `ResizeObserver`.
- Pointer and touch events.
- Element geometry and scrolling.
- `requestAnimationFrame`, timers, and reduced-motion preferences.
- Focus management, portals, `inert`, and body styles.

These capabilities should be hidden behind an internal `TimelinePlatform`
boundary. Production uses the real browser implementation. Tests use a
deterministic platform and DOM harness with controlled visibility, geometry,
time, scrolling, and focus.

The platform is an internal or testing-only entry point. It must not appear in
the production component props.

## Testing Strategy

- **New boundary tests to write**:
  - All canonical journey entries render and the latest entry is initially
    focused and centered.
  - Resize preserves the current focus rather than jumping back to the latest
    entry.
  - Hover and focus apply the correct entry accent.
  - Arrow navigation moves one entry, respects boundaries, focuses the target,
    and centers it.
  - Desktop drag updates scroll position and snaps to the nearest entry.
  - Movement below the threshold remains a click; movement above it never opens
    a dialog.
  - Touch retains native scrolling and a tap still opens details.
  - Click, Enter, and Space open the correct entry in one portal dialog.
  - The dialog has an accessible name and remains above the interactive page.
  - Opening moves focus into the dialog, locks body scroll, and makes the
    background inert.
  - Escape, backdrop, and the close button dismiss the dialog and restore the
    opener focus, body styles, and previous inert state.
  - Rapidly opening different entries still leaves one valid dialog.
  - Rolling years begin on the first intersection only and never replay when
    scrolling upward.
  - Reduced motion displays final values without smooth or rolling animation.
  - Empty and single-entry inputs remain stable.
  - Unmount during drag, animation, or dialog state releases all observers,
    timers, animation frames, locks, and inert layers.
  - A small local-browser test verifies actual CSS snapping, portal
    clickability, focus behavior, and inert interaction.
- **Old tests to delete**: none; the repository currently has no Timeline tests.
- **Test environment needs**: a React DOM component-test environment with
  deterministic observer, geometry, clock, and pointer substitutes, plus a
  small Chromium boundary suite for CSS and focus behavior that DOM simulation
  cannot reproduce faithfully.

## Implementation Recommendations

- Treat the Timeline as one deep interaction module rather than exporting its
  scroller, dialog, rolling-number, and gesture helpers independently.
- Use stable entry IDs for selection and focus; never use the array index or
  display year as durable identity.
- Model mutually exclusive interaction states explicitly so dragging, snapping,
  and dialog activation cannot overlap accidentally.
- Keep all browser effects and their cleanup inside the feature boundary.
- Preserve native touch scrolling and use custom pointer dragging only where it
  improves desktop interaction.
- Keep accessibility behavior as an invariant, including keyboard activation,
  focus containment, Escape dismissal, and exact focus restoration.
- Isolate browser capabilities behind a private platform implementation so
  boundary tests can control time, layout, and visibility deterministically.
- Expose analytics as an observation callback only; callers must not control or
  mutate the feature's internal selection state.
- Keep site-wide section reveal outside the Timeline module while retaining the
  Timeline-specific one-time year animation internally.
- Migrate the existing presentation without changing visible copy, order,
  colors, responsive behavior, or modal appearance.
