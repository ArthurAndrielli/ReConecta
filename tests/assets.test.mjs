import test from 'node:test';
import assert from 'node:assert/strict';
import { ensureGameAssets } from '../src/js/utils/assets.js';
import { readFile } from 'node:fs/promises';

test('missing or malformed artwork fails, then a successful retry is cached', async () => {
  globalThis.fetch = async () => ({ ok: false });
  await assert.rejects(ensureGameAssets());
  globalThis.fetch = async () => ({ ok: true, text: async () => '<html>error</html>' });
  await assert.rejects(ensureGameAssets());
  let calls = 0;
  const artwork = await readFile(new URL('../src/assets/objects.svg', import.meta.url), 'utf8');
  globalThis.fetch = async () => { calls++; return { ok: true, text: async () => artwork }; };
  await ensureGameAssets(); await ensureGameAssets();
  assert.equal(calls, 1);
});
