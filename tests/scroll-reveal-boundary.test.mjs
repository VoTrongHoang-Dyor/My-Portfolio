import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = await readFile(
  resolve(repositoryRoot, 'src/components/ui/ScrollReveal.jsx'),
  'utf8',
);

test('reduced-motion preference is gated until after hydration', () => {
  assert.match(source, /const \[mounted, setMounted\] = useState\(false\)/);
  assert.match(
    source,
    /window\.matchMedia\('\(prefers-reduced-motion: reduce\)'\)/,
  );
  assert.match(source, /const shouldReduceMotion = mounted && reduceMotion/);
  assert.match(source, /const revealed = mounted &&/);
  assert.doesNotMatch(source, /useReducedMotion/);
});
