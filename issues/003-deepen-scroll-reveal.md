## Problem

The site-wide entrance animation currently depends on a hidden contract spread
across several layers:

- Page composition wraps sections in a reveal component.
- Individual sections add `data-reveal-item` to selected descendants.
- Each item manually passes a CSS custom property containing a delay.
- A global stylesheet interprets the attributes and delay values.
- Framer Motion controls the section shell while CSS animation controls the
  descendants.

Understanding or changing one entrance effect therefore requires navigating the
page, the reveal component, global CSS, and every participating section.
Callers must know implementation details such as attribute names and delay
units. A missing attribute, invalid custom property, or item rendered outside
the correct shell can silently suppress or desynchronize content.

The contract has no boundary tests for one-time reveal, upward scrolling,
reduced motion, hydration, or observer cleanup.

## Proposed Interface

Expose one compound component:

```ts
type RevealDirection = 'up' | 'left' | 'right';

type RevealProps = Readonly<{
  direction?: RevealDirection;
  children: React.ReactNode;
}>;

type RevealItemProps<T extends keyof React.JSX.IntrinsicElements = 'div'> = {
  as?: T;
  order?: number;
  children: React.ReactNode;
} & Omit<React.JSX.IntrinsicElements[T], 'as' | 'children'>;

export function Reveal(props: RevealProps): React.ReactElement;

Reveal.Item: <T extends keyof React.JSX.IntrinsicElements = 'div'>(
  props: RevealItemProps<T>,
) => React.ReactElement;
```

The page keeps explicit section directions:

```jsx
<Reveal direction="left">
  <About />
</Reveal>

<Reveal direction="right">
  <Education />
</Reveal>
```

Sections declare staggered semantic elements without data attributes or CSS
delay variables:

```jsx
<Reveal.Item
  as="article"
  order={index}
  className={styles.card}
>
  {content}
</Reveal.Item>
```

`Reveal.Item` outside a provider must fail open and render immediately.

The module hides:

- Viewport observation and cleanup.
- A one-way `pending -> revealed` state latch.
- Mapping from `up`, `left`, and `right` to the portfolio motion language.
- Translation, blur, scale, perspective, duration, easing, and thresholds.
- Stagger delay calculation from semantic order.
- Framer Motion and CSS Module implementation details.
- Reduced-motion behavior.
- Safe SSR and hydration behavior.
- Fallback visibility when observation or JavaScript animation is unavailable.

Timeline rolling years and other feature-specific animation remain outside this
module. The reveal boundary owns only section and item entrance animation.

## Dependency Strategy

**Local-substitutable**.

Production uses local browser capabilities through Framer Motion,
`IntersectionObserver`, animation frames, and reduced-motion media queries.

Boundary tests use a DOM harness with:

- A controllable viewport observer.
- Controllable animation frames and timers.
- A controllable reduced-motion media query.
- Either the real motion library in the DOM harness or an internal,
  deterministic motion driver.

These capabilities remain implementation details. They must not be injected
through the production component props.

## Testing Strategy

- **New boundary tests to write**:
  - Before intersection, the section has the expected pending state.
  - `up`, `left`, and `right` begin from the correct semantic direction and
    finish at the original layout position.
  - The first intersection transitions the section to its final visible state.
  - Leaving and re-entering the viewport never reverses or replays animation.
  - Items reveal in semantic `order`, with equal orders running together.
  - Items nested inside child components receive the parent reveal context.
  - The `as` prop preserves the semantic element, class, ARIA attributes, and
    event props without adding a layout wrapper.
  - Reduced motion removes translation, blur, scale, transition, and stagger.
  - An item outside a provider renders immediately.
  - Missing observer support fails open and keeps content visible.
  - SSR and hydration preserve content and do not create a mismatch.
  - Unmount before or during reveal releases observers, animation frames, and
    timers.
  - Timeline rolling-year state remains independent and is not reset by reveal.
  - A small local-browser test confirms each section enters once and remains in
    its final state when scrolling upward.
- **Old tests to delete**: none; the repository currently has no reveal tests.
- **Test environment needs**: a React DOM test environment with observer,
  clock, media-query, and animation-frame substitutes, plus one small Chromium
  boundary test for computed motion behavior.

## Implementation Recommendations

- Keep the public motion vocabulary deliberately small and aligned with the
  portfolio: `up`, `left`, and `right`.
- Do not expose duration, blur, scale, distance, observer thresholds, or raw
  animation values to ordinary callers.
- Keep section reveal explicit at page composition so the motion direction is
  easy to understand while navigating the code.
- Express stagger through `Reveal.Item` order rather than global data
  attributes or inline CSS variables.
- Preserve semantic elements directly; avoid wrappers that affect grid, flex,
  sizing, or accessibility.
- Use one context latch that can only move from pending to revealed.
- Make missing provider, missing observer, and reduced-motion cases fail open
  so content can never remain hidden.
- Keep feature-specific animation, such as Timeline year rolling, inside its
  owning feature boundary.
- Centralize all motion tokens and reduced-motion rules inside the module.
- Migrate one section at a time, then remove the old global reveal selectors,
  data attributes, inline delay properties, and previous wrapper component.
