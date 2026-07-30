import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const nextConfig = await readFile(
  resolve(repositoryRoot, 'next.config.mjs'),
  'utf8',
);

test('local preview does not render the Next.js dev indicator', () => {
  assert.match(nextConfig, /devIndicators:\s*false/);
});
