import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  buildProfileArtifact,
  normalizeOrigin,
} from '../src/profile/artifacts.mjs';
import { profile } from '../src/profile/index.mjs';
import {
  canonicalProfile,
  defineCanonicalProfile,
} from '../src/profile/source.mjs';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const testOrigin = 'https://portfolio.example';

function cloneCanonicalProfile() {
  return structuredClone(canonicalProfile);
}

test('client read model preserves current UI facts and ordering', () => {
  assert.equal(Object.isFrozen(profile), true);
  assert.equal(Object.isFrozen(profile.projects[0]), true);
  assert.deepEqual(
    profile.journey.map(({ id, year, dotHue }) => ({ id, year, dotHue })),
    [
      { id: 'journey-2022', year: '2022', dotHue: '#D9622B' },
      { id: 'journey-2023', year: '2023', dotHue: '#E14F62' },
      { id: 'journey-2024', year: '2024', dotHue: '#DA5597' },
      { id: 'journey-2025', year: '2025', dotHue: '#E9A23B' },
      { id: 'journey-2026', year: '2026', dotHue: '#62C6C2' },
    ],
  );
  assert.deepEqual(
    profile.projects.map(({ id, name }) => ({ id, name })),
    [
      { id: 'ai-pain-point-discovery', name: 'AI Pain Point Discovery' },
      { id: 'terachat', name: 'TeraChat' },
      { id: 'mcp-context-manager', name: 'MCP Context Manager' },
    ],
  );
  assert.deepEqual(
    profile.spokenLanguages.map(({ name, level }) => ({ name, level })),
    [
      { name: 'Vietnamese', level: 'Native' },
      { name: 'English', level: 'B2 · Upper-Intermediate' },
      { name: 'Chinese', level: 'HSK 3' },
    ],
  );
});

test('candidate facts agree across machine, text, JSON-LD, and README artifacts', () => {
  const machine = buildProfileArtifact('profile-json', {
    origin: testOrigin,
  });
  const llms = buildProfileArtifact('llms', { origin: testOrigin });
  const readme = buildProfileArtifact('readme', { origin: testOrigin });
  const jsonLdText = buildProfileArtifact('json-ld', {
    origin: testOrigin,
  });
  const jsonLd = JSON.parse(jsonLdText);

  assert.equal(machine.candidate.name, profile.identity.name);
  assert.equal(machine.candidate.contact.email, profile.identity.email);
  assert.equal(machine.education.degree, profile.education.degree);
  assert.equal(machine.education.school, profile.education.school);
  assert.deepEqual(
    machine.projects.map(({ id, name }) => ({ id, name })),
    profile.projects.map(({ id, name }) => ({ id, name })),
  );
  assert.deepEqual(
    machine.practicalExperience.map(({ id, year }) => ({ id, year })),
    profile.journey.map(({ id, year }) => ({ id, year })),
  );
  assert.deepEqual(
    machine.programmingProficiency,
    profile.skills.proficiency.map(({ id, name, level }) => ({
      id,
      name,
      level,
    })),
  );

  for (const value of [
    profile.identity.name,
    profile.identity.email,
    profile.education.degree,
    profile.education.school,
    '2026',
  ]) {
    assert.match(llms, new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.match(
      readme,
      new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
    );
  }

  const person = jsonLd['@graph'].find((node) => node['@type'] === 'Person');
  const journey = jsonLd['@graph'].find((node) => node['@id'].endsWith('#journey'));
  assert.equal(person.name, profile.identity.name);
  assert.equal(person.email, `mailto:${profile.identity.email}`);
  assert.equal(
    journey.itemListElement.at(-1).name,
    `2026 — ${profile.journey.at(-1).title}`,
  );
});

test('README and llms text use structured proficiency and omit stale availability', () => {
  const readme = buildProfileArtifact('readme');
  const llms = buildProfileArtifact('llms', { origin: testOrigin });

  for (const entry of profile.skills.proficiency) {
    assert.match(readme, new RegExp(`\\| ${entry.name} \\| ${entry.level} \\|`));
    assert.match(llms, new RegExp(`- ${entry.name}: ${entry.level}`));
  }

  assert.doesNotMatch(readme, /Available for freelance/i);
});

test('missing evidence stays explicit and project links stay null', () => {
  const machine = buildProfileArtifact('profile-json', {
    origin: testOrigin,
  });

  assert.match(machine.evidencePolicy.note, /does not invent/i);
  assert.ok(machine.evidencePolicy.missingEvidence.length > 0);
  for (const project of machine.projects) {
    assert.deepEqual(project.links, {
      repository: null,
      demo: null,
      caseStudy: null,
    });
    assert.match(project.outcome, /No public|not been supplied/i);
  }
});

test('origins normalize localhost, deployment hosts, and HTTPS URLs', () => {
  assert.equal(normalizeOrigin(), 'http://localhost:3000');
  assert.equal(normalizeOrigin('localhost:3127/path'), 'http://localhost:3127');
  assert.equal(normalizeOrigin('127.0.0.1:3127'), 'http://127.0.0.1:3127');
  assert.equal(
    normalizeOrigin('portfolio.example/path?q=1#fragment'),
    'https://portfolio.example',
  );
  assert.equal(
    normalizeOrigin('https://portfolio.example/path?q=1#fragment'),
    'https://portfolio.example',
  );
  assert.throws(
    () => normalizeOrigin('https://user:secret@portfolio.example'),
    /credentials/,
  );
  assert.throws(() => normalizeOrigin('https://'), /Invalid site origin/);
});

test('JSON-LD has stable, internally consistent IDs and script-safe output', () => {
  const text = buildProfileArtifact('json-ld', { origin: testOrigin });
  const data = JSON.parse(text);
  const nodes = data['@graph'];
  const ids = new Set(nodes.map((node) => node['@id']));
  const website = nodes.find((node) => node['@type'] === 'WebSite');
  const profilePage = nodes.find((node) => node['@type'] === 'ProfilePage');

  assert.equal(ids.size, nodes.length);
  assert.ok(ids.has(website.publisher['@id']));
  assert.ok(ids.has(profilePage.about['@id']));
  assert.ok(ids.has(profilePage.isPartOf['@id']));
  website.hasPart.forEach((reference) => assert.ok(ids.has(reference['@id'])));
  assert.doesNotMatch(text, /</);
  assert.doesNotMatch(text, /<\/script/i);
});

test('canonical validation rejects invalid IDs, years, URLs, levels, and references', async (t) => {
  await t.test('duplicate ID', () => {
    const draft = cloneCanonicalProfile();
    draft.projects[1].id = draft.projects[0].id;
    assert.throws(() => defineCanonicalProfile(draft), /Project IDs/);
  });

  await t.test('duplicate journey year', () => {
    const draft = cloneCanonicalProfile();
    draft.journey[1].year = draft.journey[0].year;
    assert.throws(() => defineCanonicalProfile(draft), /Journey years/);
  });

  await t.test('malformed URL', () => {
    const draft = cloneCanonicalProfile();
    draft.identity.github = 'not an absolute URL';
    assert.throws(() => defineCanonicalProfile(draft), /GitHub URL/);
  });

  await t.test('invalid proficiency value', () => {
    const draft = cloneCanonicalProfile();
    draft.skills.proficiency[0].level = 'Expert';
    assert.throws(
      () => defineCanonicalProfile(draft),
      /Unsupported proficiency level/,
    );
  });

  await t.test('broken proficiency reference', () => {
    const draft = cloneCanonicalProfile();
    draft.skills.proficiency[0].id = 'unknown-language';
    assert.throws(
      () => defineCanonicalProfile(draft),
      /references unknown skill/,
    );
  });
});

test('project evidence survives a display-title rename because it is co-located by ID', () => {
  const draft = cloneCanonicalProfile();
  const original = draft.projects[0];
  const evidence = {
    problem: original.problem,
    solution: original.solution,
    role: original.role,
    outcome: original.outcome,
    links: original.links,
  };
  original.name = 'Renamed Discovery Workflow';

  const renamed = defineCanonicalProfile(draft);
  const project = renamed.projects.find(
    ({ id }) => id === 'ai-pain-point-discovery',
  );

  assert.equal(project.name, 'Renamed Discovery Workflow');
  assert.deepEqual(
    {
      problem: project.problem,
      solution: project.solution,
      role: project.role,
      outcome: project.outcome,
      links: project.links,
    },
    evidence,
  );
});

test('artifact generation is deterministic and cannot mutate canonical data', () => {
  const before = JSON.stringify(canonicalProfile);

  for (const kind of ['metadata', 'json-ld', 'profile-json', 'llms', 'readme']) {
    const first = buildProfileArtifact(kind, { origin: testOrigin });
    const second = buildProfileArtifact(kind, { origin: testOrigin });
    assert.deepEqual(first, second);
  }

  const machine = buildProfileArtifact('profile-json', {
    origin: testOrigin,
  });
  machine.candidate.name = 'Mutated output';
  assert.equal(canonicalProfile.identity.name, profile.identity.name);
  assert.equal(JSON.stringify(canonicalProfile), before);
});

test('checked-in README exactly matches the generated artifact', async () => {
  const actual = await readFile(resolve(repositoryRoot, 'README.md'), 'utf8');
  assert.equal(actual, buildProfileArtifact('readme'));
});
