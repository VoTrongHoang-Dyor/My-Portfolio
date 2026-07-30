## Problem

The Skills section is one product experience implemented across several
tightly coupled concepts:

- A canonical-looking category list and a separate per-language proficiency
  list.
- A large SVG force simulation with seeded positions, collision handling,
  bounds, drag behavior, hover highlighting, and animation-frame lifecycle.
- A rotating proficiency tab panel with manual selection, progress animation,
  autoplay, and code samples.
- Remote skill icons whose loading behavior is not represented in the feature
  boundary.
- Responsive SVG, mobile tabs, CSS animation, and DOM timers.

The graph and proficiency panel are rendered together but own separate data
shapes and timing behavior. Physics constants, browser effects, icon URLs,
presentation, and semantic capability data are mixed at the component level.
This has already allowed proficiency descriptions to disagree with other
candidate outputs and made a hover listener capable of stopping autoplay.

The section has no boundary tests for deterministic layout, collision
invariants, drag cleanup, timer behavior, or external icon failure.

## Proposed Interface

Expose one complete feature component that consumes the canonical profile
projection and optionally reports user selection:

```ts
type SkillIcon = Readonly<{
  remoteUrl?: string;
  localFallback?: string;
  fallbackLabel: string;
}>;

type SkillsExperienceModel = Readonly<{
  categories: readonly Readonly<{
    id: string;
    label: string;
    accent: `#${string}`;
    skills: readonly Readonly<{
      id: string;
      name: string;
      icon: SkillIcon;
    }>[];
  }>[];

  proficiency: readonly Readonly<{
    id: string;
    name: string;
    level: string;
    description: string;
    logo: SkillIcon;
    code: Readonly<{
      language: string;
      source: string;
    }>;
  }>[];
}>;

type SkillsExperienceProps = Readonly<{
  model: SkillsExperienceModel;
  onProficiencySelected?: (languageId: string) => void;
  className?: string;
}>;

export default function SkillsExperience(
  props: SkillsExperienceProps,
): React.ReactElement;
```

The caller passes the explicit canonical projection:

```jsx
import SkillsExperience from '@/features/skills-experience';
import { profile } from '@/profile';

<SkillsExperience
  model={profile.skills}
  onProficiencySelected={optionalAnalytics}
/>;
```

Analytics is observation only. Callers cannot control graph positions,
selection state, timers, progress, or simulation parameters.

The module hides:

- Category and skill graph derivation.
- Stable seeded positions based on entity IDs.
- Force integration, collision resolution, bounds, and convergence.
- Responsive coordinate handling and SVG rendering.
- Animation-frame and resize lifecycle.
- Pointer capture, dragging, pinning, release, and hover branch highlighting.
- Proficiency selection and autoplay state.
- Looping, progress reset, manual selection, and timer cleanup.
- The invariant that pointer hover never pauses autoplay.
- Code-panel synchronization and safe source rendering.
- Remote icon load/error handling and visual fallback.
- Reduced-motion and empty-data behavior.

Physics, proficiency control, graph rendering, and asset handling may be
organized as private internal modules. They are not separate production APIs.

## Dependency Strategy

This deep module owns three dependency categories:

- **In-process**: seeded graph derivation, force integration, collision,
  clamping, identity preservation, and proficiency state transitions are pure
  computations owned directly by the module.
- **Local-substitutable**: element geometry, resize observation, pointer events,
  animation frames, monotonic time, timers, and reduced-motion preference use
  the real browser in production and deterministic local stand-ins in tests.
- **True external**: remote icon delivery is isolated at the asset boundary.
  Tests never call the CDN. Production must provide a local fallback or
  accessible monogram so CDN failure cannot break graph interaction or layout.

Browser and asset test adapters remain private or available through a
testing-only entry point. They do not appear in the production component props.

## Testing Strategy

- **New boundary tests to write**:
  - The complete experience renders categories and proficiency from one
    canonical model.
  - The same IDs and bounds produce stable SVG positions across mounts and
    rerenders.
  - Reordering canonical records preserves node identity.
  - Representative layouts keep nodes inside bounds and prevent overlap beyond
    the accepted collision tolerance.
  - Resize preserves identity and current proficiency selection.
  - Hover highlights the correct category branch and pointer leave restores the
    complete graph.
  - Drag moves only the active node, uses pointer capture, and rejoins the
    simulation cleanly after release.
  - Animation frames, resize observers, pointer listeners, and timers are
    released on unmount.
  - The first language is initially selected.
  - Manual selection updates level, description, and code in one state change.
  - Autoplay advances, loops, and resets progress without duplicate timers.
  - Keeping the pointer anywhere inside the white panel never pauses progress
    or language rotation.
  - Manual selection restarts the cycle and autoplay continues.
  - Reduced motion retains full content and manual selection while avoiding
    unnecessary continuous motion.
  - Remote icon success renders the asset; failure uses a local fallback or
    accessible monogram without changing node geometry.
  - Empty category or proficiency lists remain stable.
  - A local-browser test verifies responsive collision quality, mouse/touch
    drag, and autoplay while hovering the white panel.
- **Old tests to delete**: none; the repository currently has no Skills tests.
- **Test environment needs**: a React DOM/SVG harness with deterministic
  geometry, resize observation, pointer input, clock, timers, and animation
  frames; image load/error substitutes; and a small Chromium boundary suite.
  No external network requests are allowed in tests.

## Implementation Recommendations

- Consume one canonical Skills projection; do not let the graph and proficiency
  panel maintain independent facts.
- Require stable IDs for categories, skills, and proficiency entries.
- Derive the layout seed from stable identity rather than mount order or
  `Math.random()`.
- Keep physics constants and simulation objects private to the feature.
- Treat graph and proficiency behavior as one tested experience while allowing
  internal modules to separate implementation concerns.
- Preserve autoplay as a product invariant: pointer presence must not pause the
  cycle.
- Reset the cycle after manual selection without creating a second timer.
- Isolate every remote icon behind a local fallback or accessible monogram.
- Keep external asset resolution from altering graph geometry after load
  failure.
- Expose analytics as optional observation callbacks only.
- Preserve current visible layout, labels, code samples, responsive behavior,
  colors, progress treatment, and interaction during migration.
