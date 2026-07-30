## Problem

The portfolio currently expresses the same candidate facts through several
shallow, tightly coupled modules:

- Human-facing section data and presentation annotations.
- Candidate identity, navigation, contact details, and deployment URLs.
- A separately assembled machine profile and project evidence map.
- Next.js metadata and Schema.org JSON-LD.
- `/profile.json`, `/llms.txt`, and the repository README.

Each consumer owns part of the transformation, so updating one fact requires
knowing every downstream representation. The seams have already drifted:
the README omitted the 2026 journey entry, retained an outdated availability
claim, and disagreed with the structured Swift and Dart proficiency values.
Project evidence is also joined by mutable display names.

This makes the codebase harder to navigate, allows facts to diverge silently,
and provides no single boundary at which consistency can be tested.

## Proposed Interface

Use one private canonical profile and expose two public, deep boundaries:

```ts
// Client-safe profile read model.
export const profile: DeepReadonly<PortfolioView>;

type Artifact =
  | 'metadata'
  | 'json-ld'
  | 'profile-json'
  | 'llms'
  | 'readme';

// Server-only artifact compiler.
export function buildProfileArtifact<K extends Artifact>(
  kind: K,
  context: { origin: string },
): ArtifactResult[K];
```

React callers use the frozen read model directly:

```jsx
import { profile } from '@/profile';

profile.journey.map((item) => (
  <YearCard key={item.id} {...item} />
));
```

Server consumers compile their required representation:

```js
import { buildProfileArtifact } from '@/profile/server';

export const metadata = buildProfileArtifact('metadata', { origin });

export function GET() {
  return Response.json(
    buildProfileArtifact('profile-json', { origin }),
  );
}
```

A repository script writes or checks the generated README:

```js
const markdown = buildProfileArtifact('readme', { origin });
```

The module hides:

- Canonical validation and deep freezing.
- Stable entity IDs and referential integrity.
- The compatibility projection required by the existing UI.
- Project evidence composition without display-name joins.
- Canonical URL normalization.
- Metadata and Schema.org graph construction.
- JSON-LD IDs, references, slugging, and safe escaping.
- Deterministic machine JSON, `llms.txt`, and README generation.
- Evidence-policy rules that prevent unsupported claims or links.
- Derivation of repeated facts such as contact identity and proficiency.

Current runtime data is authoritative during migration. The first web
projection must preserve existing visible copy, order, colors, and component
shapes. Stale documentation must never overwrite structured runtime facts.

## Dependency Strategy

**In-process**.

The canonical profile, validation, compatibility projection, and artifact
renderers are pure in-memory transformations. The profile module must not own
React rendering, filesystem access, network access, `Response`, or deployment
environment reads.

The deployment origin is passed as an explicit value. A small server-only
environment adapter may resolve that value before calling the compiler.
Filesystem I/O for README synchronization belongs to the repository script,
outside the profile module.

Remote image and icon URLs remain inert data; this module does not fetch them.

## Testing Strategy

- **New boundary tests to write**:
  - The client read model preserves all current UI facts and ordering.
  - The 2026 journey entry appears in the web view, machine JSON, `llms.txt`,
    JSON-LD where applicable, and README.
  - Candidate identity, contact details, education, spoken languages,
    projects, journey entries, and proficiency values agree across artifacts.
  - README omits the removed availability text and matches structured
    proficiency values.
  - Machine outputs retain explicit missing evidence and `null` links without
    inventing metrics, clients, certifications, repositories, or demos.
  - Origins are normalized consistently for localhost, bare deployment hosts,
    and absolute HTTPS origins.
  - JSON-LD graph IDs and references are internally consistent and safe for
    insertion into a `<script>` element.
  - Duplicate IDs, duplicate journey years, malformed URLs, invalid
    proficiency values, and broken references fail early.
  - Renaming a project's display title does not detach its evidence.
  - Every artifact is deterministic and cannot mutate the canonical profile.
  - A drift check compares the checked-in README with the generated Markdown.
- **Old tests to delete**: none; the repository currently has no test suite.
- **Test environment needs**: a lightweight JavaScript test runner only.
  No browser, network, service mock, or local infrastructure is required.

## Implementation Recommendations

- Treat the canonical profile as the only editable source of candidate facts.
- Separate semantic facts, authored channel-specific messaging, and
  presentation annotations inside the canonical record.
- Give projects, journey entries, capabilities, and other referenced entities
  stable IDs that do not depend on display text.
- Keep the public client profile compatible with the current React callers
  during the migration so architecture work does not alter the UI.
- Keep server artifact logic out of client bundles through an explicit
  server-only entry point.
- Generate README facts from the canonical profile and add a short note
  directing contributors to edit the canonical source instead.
- Keep deliberate channel-specific prose as authored messaging, but derive
  repeated facts such as years, roles, links, and proficiency from structured
  fields.
- Add a repository command that can update README and a check command that
  fails when generated artifacts drift.
- Migrate consumers one output at a time behind the stable public boundary,
  then remove the previous duplicated constants and display-name evidence map.
