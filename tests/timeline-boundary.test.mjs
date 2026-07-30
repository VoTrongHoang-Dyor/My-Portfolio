import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const timelineSource = await readFile(
  resolve(repositoryRoot, 'src/components/sections/Timeline.jsx'),
  'utf8',
);
const timelineStyles = await readFile(
  resolve(repositoryRoot, 'src/components/sections/Timeline.module.css'),
  'utf8',
);

test('timeline cards are no longer coupled to custom pointer dragging', () => {
  for (const removedContract of [
    'setPointerCapture',
    'onPointerMove',
    'onPointerUp',
    'onPointerCancel',
    'drag.current',
    'cursor: grab',
    'cursor: grabbing',
  ]) {
    assert.doesNotMatch(
      `${timelineSource}\n${timelineStyles}`,
      new RegExp(removedContract.replace('.', '\\.')),
    );
  }
});

test('timeline details use the browser top-layer dialog contract', () => {
  assert.match(timelineSource, /<dialog/);
  assert.match(timelineSource, /showModal\(\)/);
  assert.match(timelineSource, /onCancel=/);
  assert.match(timelineSource, /onClose=/);
  assert.match(timelineStyles, /\.modalDialog::backdrop/);
  assert.doesNotMatch(timelineSource, /createPortal/);
  assert.doesNotMatch(timelineStyles, /\.modalOverlay/);
});

test('initial timeline positioning cannot move cards under the first click', () => {
  assert.match(timelineSource, /scrollToYear\(latest, 'instant'\)/);
});
