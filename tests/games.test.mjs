import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { phaseCatalog } from '../src/js/phases/catalog.js';
import { getPhaseContent } from '../src/js/phases/content.js';
import { objectById } from '../src/js/phases/objects.js';
import { solve } from './game-helpers.mjs';

const modules = { memory: 'memory', whatDidYouSee: 'whatDidYouSee', word: 'wordBuilder', image: 'imageWord',
  odd: 'oddOneOut', sequence: 'sequence', routine: 'organizeRoutine', findObject: 'findObject',
  tapOnly: 'tapOnly', association: 'objectAssociation', situations: 'dailySituations', sentence: 'completeSentence' };
const engines = Object.fromEntries(await Promise.all(Object.entries(modules).map(async ([id, path]) => [id, (await import(`../src/js/games/${path}.js`)).render])));
const dom = new JSDOM('<main></main>', { url: 'http://localhost:4173/' });
globalThis.window = dom.window; globalThis.document = dom.window.document;

test('play all 240 phases (640 boards/rounds), with manual retries and duplicate clicks', () => {
  for (const phase of phaseCatalog) for (const content of getPhaseContent(phase)) {
    const root = document.querySelector('main');
    let completed = 0, retry = null, active = true;
    const attempts = [], objectives = new Set();
    const instance = engines[phase.gameId](root, {
      isActive: () => active,
      onAttempt(correct, id) {
        assert.equal(objectives.has(id), false, `resolved item scored twice: ${content.id}`);
        attempts.push(correct); if (correct) objectives.add(id); return true;
      },
      onComplete: () => { completed++; },
      onRetry: callback => { retry = callback; },
      message() {}
    }, { content, level: phase.level, preferences: { observationMode: 'self-paced' } });
    instance?.hint?.();
    solve(root, phase.gameId, content, () => { if (retry) { const fn = retry; retry = null; fn(); } }, true);
    assert.equal(completed, 1, content.id);
    const expected = phase.gameId === 'memory' ? content.items.length : phase.gameId === 'association' ? content.pairs.length : phase.gameId === 'tapOnly' ? content.targets.length : 1;
    assert.equal(attempts.filter(Boolean).length, expected, content.id);
    const before = attempts.length;
    active = false; instance?.destroy?.();
    root.querySelectorAll('button').forEach(button => button.click());
    assert.equal(attempts.length, before, `destroyed callback: ${content.id}`);
  }
});
test('memory keeps a wrong pair open for 900 ms, locks clicks, then closes only that pair', () => {
  const originalSet = globalThis.setTimeout, originalClear = globalThis.clearTimeout;
  let pending = null, cleared = null;
  globalThis.setTimeout = (callback, delay) => { pending = { callback, delay }; return 42; };
  globalThis.clearTimeout = id => { cleared = id; pending = null; };
  try {
    const content = getPhaseContent(phaseCatalog.find(phase => phase.gameId === 'memory'))[0];
    const root = document.querySelector('main');
    const attempts = [];
    const instance = engines.memory(root, {
      isActive: () => true,
      onAttempt: correct => { attempts.push(correct); return true; },
      onComplete() {},
      message() {}
    }, { content });
    const cards = [...root.querySelectorAll('[data-index]')];
    assert.ok(cards.every(card => card.querySelector('.memory-card-front').getAttribute('aria-hidden') === 'true'));
    assert.ok(cards.every(card => card.querySelector('svg').getAttribute('aria-hidden') === 'true'));
    const byPair = new Map();
    cards.forEach((card, index) => {
      const href = card.querySelector('use').getAttribute('href');
      if (!byPair.has(href)) byPair.set(href, []);
      byPair.get(href).push(index);
    });
    const [firstPair, secondPair] = [...byPair.values()];
    const firstCard = cards[firstPair[0]];
    const firstId = firstCard.querySelector('use').getAttribute('href').split('#').at(-1);
    assert.doesNotMatch(firstCard.getAttribute('aria-label'), new RegExp(objectById[firstId].label, 'i'));
    firstCard.click();
    assert.match(firstCard.getAttribute('aria-label'), new RegExp(objectById[firstId].label, 'i'));
    cards[secondPair[0]].click();
    assert.equal(pending.delay, 900);
    assert.ok(cards[firstPair[0]].classList.contains('is-open'));
    assert.ok(cards[secondPair[0]].classList.contains('is-open'));
    cards[firstPair[1]].click();
    assert.equal(attempts.length, 1, 'a third card must stay blocked');
    cards[firstPair[0]].click();
    assert.equal(attempts.length, 1, 'the same open card cannot be selected twice');
    pending.callback();
    assert.equal(root.querySelectorAll('.memory-card.is-open').length, 0);
    cards[firstPair[0]].click(); cards[firstPair[1]].click();
    assert.ok(cards[firstPair[0]].classList.contains('is-matched'));
    assert.ok(cards[firstPair[1]].classList.contains('is-matched'));
    instance.destroy();

    const secondInstance = engines.memory(root, { isActive: () => true, onAttempt: () => true, onComplete() {}, message() {} }, { content });
    const nextCards = [...root.querySelectorAll('[data-index]')];
    const firstHref = nextCards[0].querySelector('use').getAttribute('href');
    const different = nextCards.findIndex(card => card.querySelector('use').getAttribute('href') !== firstHref);
    nextCards[0].click(); nextCards[different].click(); secondInstance.destroy();
    assert.equal(cleared, 42, 'destroy must clear a pending mismatch timer');
  } finally { globalThis.setTimeout = originalSet; globalThis.clearTimeout = originalClear; }
});
test('observation timer uses 12/10/8/6 seconds, pauses and is removed on destroy', () => {
  const originalSet = globalThis.setTimeout, originalClear = globalThis.clearTimeout;
  const pending = new Map(); let id = 0;
  globalThis.setTimeout = (callback, delay) => { pending.set(++id, { callback, delay }); return id; };
  globalThis.clearTimeout = id => pending.delete(id);
  try {
    for (let level = 1; level <= 4; level++) {
      const content = getPhaseContent(phaseCatalog.find(p => p.gameId === 'whatDidYouSee' && p.level === level))[0];
      const instance = engines.whatDidYouSee(document.querySelector('main'), { isActive: () => true, message() {} },
        { content, level, preferences: { observationMode: 'suggested-time' } });
      assert.equal([...pending.values()][0].delay, [12000, 10000, 8000, 6000][level - 1]);
      instance.pause(); assert.equal(pending.size, 0);
      instance.resume(); instance.resume(); assert.equal(pending.size, 1);
      instance.destroy(); assert.equal(pending.size, 0);
    }
  } finally { globalThis.setTimeout = originalSet; globalThis.clearTimeout = originalClear; }
});
