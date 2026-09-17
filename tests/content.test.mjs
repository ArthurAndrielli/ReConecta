import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { phaseCatalog } from '../src/js/phases/catalog.js';
import { phaseBoards, phaseRounds } from '../src/js/phases/content.js';
import { objects } from '../src/js/phases/objects.js';
import { validatePhaseCatalog } from '../src/js/phases/validate.js';

test('240 phases contain 600 distinct challenges and 40 distinct boards', () => {
  const report = validatePhaseCatalog();
  assert.deepEqual(report.errors, []);
  assert.equal(report.total, 240);
  assert.equal(report.rounds, 600);
  assert.equal(report.boards, 40);
});
test('all local illustration references exist', async () => {
  const svg = await readFile(new URL('../src/assets/objects.svg', import.meta.url), 'utf8');
  for (const object of objects) assert.ok(svg.includes(`id="${object.symbol}"`), object.label);
  assert.equal(new Set([...svg.matchAll(/id="([^"]+)"/g)].map(m => m[1])).size, objects.length);
});
test('validator rejects malformed records, wrong counts, ambiguous answers and normalized clones', () => {
  for (const mutate of [
    phases => { phases[1].id = phases[0].id; },
    phases => { phases[0].contentRefs = null; },
    phases => { phases[0].level = 4; },
    phases => { phases[0].unit = 'rounds'; },
    phases => { phases[0].contentRefs = ['missing']; }
  ]) {
    const phases = structuredClone(phaseCatalog); mutate(phases); assert.equal(validatePhaseCatalog(phases).valid, false);
  }
  const sources = { boards: structuredClone(phaseBoards), rounds: structuredClone(phaseRounds) };
  sources.rounds['whatDidYouSee-p01-r1'].options[1] = sources.rounds['whatDidYouSee-p01-r1'].items[1];
  assert.ok(validatePhaseCatalog(phaseCatalog, sources).errors.some(e => e.includes('observação ambígua')));
  const first = sources.rounds['situations-p01-r1'];
  sources.rounds['situations-p01-r2'].prompt = first.prompt.toUpperCase() + ' !!!';
  assert.ok(validatePhaseCatalog(phaseCatalog, sources).errors.some(e => e.includes('clone semântico')));
  sources.boards['memory-board-02'].items = [...sources.boards['memory-board-01'].items].reverse();
  assert.ok(validatePhaseCatalog(phaseCatalog, sources).errors.some(e => e.includes('memory-board-02') && e.includes('clone')));
});
