import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const component = await readFile(
  resolve(repositoryRoot, 'src/components/background/SplineBackground.jsx'),
  'utf8',
);
const styles = await readFile(
  resolve(
    repositoryRoot,
    'src/components/background/SplineBackground.module.css',
  ),
  'utf8',
);

test('Spline loading state cannot permanently block portfolio interactions', () => {
  assert.match(component, /setTimeout\(\(\) => setIsPreparing\(false\), 8000\)/);
  assert.match(styles, /\.fixedLayer\s*\{[\s\S]*?pointer-events:\s*none/);

  const loadingRule = styles.match(/\.loading\s*\{([\s\S]*?)\}/)?.[1] ?? '';
  assert.doesNotMatch(loadingRule, /pointer-events:\s*auto/);
});
