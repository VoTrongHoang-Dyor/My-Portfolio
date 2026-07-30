## Problem

External asset declarations and the security policy that permits them are
currently maintained in separate places:

- The Spline scene URL is consumed by the background feature.
- Skill and support icons contain provider URLs in content/configuration data.
- The Content Security Policy independently repeats the allowed Spline and icon
  origins.
- Runtime loaders own partial loading behavior but do not share a common
  fallback contract.
- Provider-specific Spline requirements such as connection, worker, WebAssembly,
  and evaluation permissions are described only as raw CSP tokens.

Adding or changing an external asset therefore requires remembering which CSP
directive, provider origin, runtime exception, and fallback must also change.
The policy can become too broad to avoid breakage, or remain too narrow and
silently block the asset. A provider outage can leave broken icons or a loader
that never resolves.

The codebase has no boundary that verifies that every remote asset is allowed by
the least-privilege directive, every allowance has an owning asset/provider,
and every true-external dependency has a usable fallback.

## Proposed Interface

Use one typed manifest as the source for client-safe asset references and a
server-only security compiler:

```ts
type AssetKind = 'image' | 'icon' | 'spline-scene';

type AssetRef<Kind extends AssetKind = AssetKind> = Readonly<{
  id: string;
  kind: Kind;
  src: string;
  fallback:
    | { type: 'local-image'; src: string }
    | { type: 'monogram'; text: string }
    | { type: 'css'; token: string };
  width?: number;
  height?: number;
}>;

export const ASSETS: Readonly<Record<string, AssetRef>>;

// Server/build-only entry point.
export function compileSecurityHeaders(
  environment: 'development' | 'production',
): readonly Readonly<{
  key: string;
  value: string;
}>[];
```

The client-safe projection is built from one private or shared pure manifest:

```ts
const manifest = defineAssetManifest({
  assets: {
    heroSpline: {
      kind: 'spline-scene',
      provider: 'spline',
      src: 'https://prod.spline.design/...',
      fallback: { type: 'css', token: 'portfolio-background' },
    },
    n8nIcon: {
      kind: 'icon',
      provider: 'svgl',
      src: 'https://svgl.app/library/n8n.svg',
      fallback: { type: 'monogram', text: 'n8n' },
    },
  },
});
```

Components receive typed references and never decide provider policy:

```jsx
<AssetImage asset={ASSETS.n8nIcon} alt="n8n" />
<SplineScene asset={ASSETS.heroSpline} />
```

The server/build entry point compiles the current strict baseline headers from
the same manifest and a private provider-policy registry:

```js
export default {
  async headers() {
    return [{
      source: '/:path*',
      headers: compileSecurityHeaders(process.env.NODE_ENV),
    }];
  },
};
```

Provider policies map explicit capabilities to exact CSP directives. An icon
provider may grant only `img-src`. The Spline provider owns its exact current
connection, worker, image, script, WebAssembly, and evaluation requirements,
each with a documented rationale.

The module hides:

- Asset and provider validation.
- URL parsing, normalization, and origin ownership.
- Exact capability-to-CSP mapping.
- The strict security baseline and header serialization.
- Deduplication and deterministic ordering.
- Development-only versus production policy overlays.
- Spline-specific runtime exceptions.
- Projection of client-safe refs without grants or rationale.
- Loading, failure, timeout, and fallback behavior.
- Protection against wildcard, insecure, malformed, or header-injection URLs.

## Dependency Strategy

The module combines two dependency categories:

- **In-process**: manifest validation, URL normalization, provider resolution,
  capability analysis, CSP compilation, environment overlays, and deterministic
  serialization are pure transformations. They do not perform network or
  filesystem I/O.
- **True external**: Spline and icon CDNs are controlled by third parties.
  Component tests simulate success, error, timeout, and invalid responses at
  the asset boundary. Tests never contact the real providers. Every external
  asset requires a local image, monogram, CSS, or hidden fallback appropriate
  to its role.

The compiler deliberately does not check whether a provider is online. Builds
remain deterministic, and runtime failures use the declared fallback.

## Testing Strategy

- **New boundary tests to write**:
  - The migrated manifest compiles to the current strict security baseline.
  - Every remote asset reference is permitted by the correct CSP directive.
  - Local assets add no external origin.
  - Icon-provider origins appear only in `img-src`.
  - Spline receives exactly the currently required capabilities and no
    wildcard or broad protocol allowance.
  - Unused providers add no source to the compiled policy.
  - Output is sorted, deduplicated, and deterministic regardless of declaration
    order.
  - Duplicate IDs, missing providers, unsupported kinds, missing fallbacks, and
    source/provider origin mismatches fail during compilation.
  - Production rejects wildcard origins, wildcard subdomains, broad `https:`,
    insecure HTTP, credentials in URLs, newlines, and unapproved protocols.
  - Development allowances never appear in production.
  - Existing baseline headers remain present after assets are added or removed.
  - Client refs serialize without provider grants, rationale, security
    directives, or other server configuration.
  - Server-only compiler code does not enter the client bundle.
  - A remote icon load succeeds normally; error or invalid content displays a
    local fallback or accessible monogram without changing its layout box.
  - Spline success removes the loader; error or timeout removes the loader and
    displays the CSS/static fallback without blocking navigation or content.
  - Retry behavior is bounded and unmount releases pending timers/listeners.
  - Browser tests with external requests intercepted confirm the page remains
    usable when each provider fails.
  - A production browser smoke test reports no unexpected CSP violations.
- **Old tests to delete**: none; the repository currently has no asset-policy
  tests.
- **Test environment needs**: a JavaScript test runner for pure manifest and
  CSP compilation, component asset-load/error substitutes, bundle-boundary
  verification, and a small local Chromium suite with request interception.
  Tests must not contact external providers.

## Implementation Recommendations

- Treat the typed asset manifest as the only place to declare external URLs,
  provider ownership, purpose, dimensions, and fallbacks.
- Keep the client asset projection small and free of provider capabilities,
  CSP grants, rationale, and server configuration.
- Keep the provider-policy registry and header compiler in a server/build-only
  entry point.
- Give each provider the least privilege required by its declared asset kinds
  and runtime capabilities.
- Do not allow wildcard origins or broad protocols as a convenience fallback.
- Keep every Spline exception together in one auditable provider policy and
  migrate only capabilities confirmed by the current working runtime.
- Preserve the existing strict baseline independently of the active provider
  set.
- Require a local, monogram, or CSS fallback for every true-external asset.
- Keep fallback dimensions stable to avoid layout shift.
- Make Spline error and timeout leave the page usable rather than keeping the
  loading state indefinitely.
- Add external assets by extending the manifest; components and raw CSP strings
  must not be edited in parallel.
- Migrate provider URLs one group at a time, verify the generated production
  policy, then remove the previous scattered URL and CSP declarations.
