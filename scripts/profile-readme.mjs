import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildProfileArtifact } from '../src/profile/artifacts.mjs';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const readmePath = resolve(repositoryRoot, 'README.md');
const expected = buildProfileArtifact('readme');
const shouldWrite = process.argv.includes('--write');

if (shouldWrite) {
  await writeFile(readmePath, expected, 'utf8');
  console.log('README.md updated from the canonical profile.');
} else {
  const actual = await readFile(readmePath, 'utf8');

  if (actual !== expected) {
    console.error(
      'README.md is out of sync. Run `npm run profile:write` and commit the result.',
    );
    process.exitCode = 1;
  } else {
    console.log('README.md matches the canonical profile.');
  }
}
