import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { phaseCatalog } from '../src/js/phases/catalog.js';
import { getPhaseContent, phaseBoards, phaseRounds } from '../src/js/phases/content.js';
import { objects } from '../src/js/phases/objects.js';
import { validatePhaseCatalog } from '../src/js/phases/validate.js';
import { fallbackPicture, picture } from '../src/js/utils/contentView.js';

test('36 phases contain 90 distinct challenges and 6 distinct boards', () => {
  const report = validatePhaseCatalog();
  assert.deepEqual(report.errors, []);
  assert.equal(report.total, 36);
  assert.equal(report.rounds, 90);
  assert.equal(report.boards, 6);
});
test('visual content does not repeat images between difficulty phases', () => {
  const visualGames = new Set(['memory', 'whatDidYouSee', 'word', 'image', 'odd', 'sequence', 'findObject', 'tapOnly']);
  const imageIds = item => [item.assetId, ...(item.items || []), ...(item.options || [])]
    .filter(value => typeof value === 'string' && value.startsWith('object-'));
  for (const gameId of visualGames) {
    const seen = new Set();
    for (const phase of phaseCatalog.filter(item => item.gameId === gameId)) {
      const current = new Set(getPhaseContent(phase).flatMap(imageIds));
      for (const id of current) assert.equal(seen.has(id), false, `${gameId}: ${id} repetido entre fases`);
      current.forEach(id => seen.add(id));
    }
  }
});
test('all local illustration references exist', async () => {
  const svg = await readFile(new URL('../src/assets/game-objects-v2.svg', import.meta.url), 'utf8');
  for (const object of objects) {
    assert.equal(object.asset, './src/assets/game-objects-v2.svg');
    assert.ok(svg.includes(`id="${object.symbol}"`), object.label);
  }
  assert.equal(new Set([...svg.matchAll(/<symbol id="(object-\d+)"/g)].map(m => m[1])).size, objects.length);
  assert.match(svg, /id="object-fallback"/);
  assert.ok([...svg.matchAll(/<linearGradient /g)].length >= 10, 'new artwork must use the shared color palette');
  assert.match(svg, /id="object-shadow"/);
});
test('shared game pictures preserve proportion and expose one useful alternative', () => {
  const standalone = picture('object-2', { label: false });
  assert.match(standalone, /preserveAspectRatio="xMidYMid meet"/);
  assert.match(standalone, /role="img" aria-label="bola"/);
  assert.match(standalone, /<title>bola<\/title>/);

  const captioned = picture('object-2');
  assert.match(captioned, /aria-hidden="true"/);
  assert.doesNotMatch(captioned, /role="img"/);
  assert.match(captioned, /<span>bola<\/span>/);

  const fallback = fallbackPicture();
  assert.match(fallback, /object-picture-fallback/);
  assert.doesNotMatch(fallback, /href=/);
  assert.match(fallback, /Ilustração indisponível/);
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
