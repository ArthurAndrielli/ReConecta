import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateLevel } from '../src/js/levels.js';
import { calculateStars } from '../src/js/scoring.js';
import { getBestCategory, getPracticeCategory, getRecommendation } from '../src/js/evolution.js';
import { localDateKey } from '../src/js/utils/dom.js';
import { getDailyPlan, chooseDailyPhase } from '../src/js/dailyTraining.js';
import { getProgress, saveProgress, resetProgress } from '../src/js/storage.js';
import { getGamePhases } from '../src/js/phases/catalog.js';

const disk = new Map();
globalThis.localStorage = { getItem: key => disk.get(key) ?? null, setItem: (key, value) => disk.set(key, value), removeItem: key => disk.delete(key) };
function session(id, category, successes, attempts = 4) {
  return { id, category, gameId: category === 'memoria' ? 'memory' : 'word', mode: 'free', status: 'completed',
    endedAt: '2026-09-15T12:00:00Z', attempts: Array.from({ length: attempts }, (_, index) => ({ correct: index < successes })) };
}
test('star thresholds never punish help, time or incomplete activities', () => {
  for (const [errors, stars] of [[0, 3], [1, 2], [2, 2], [3, 1], [20, 1]]) {
    assert.equal(calculateStars({ completed: true, errors, elapsedMs: 999999, hints: 50 }), stars);
    assert.equal(calculateStars({ completed: false, errors }), 0);
  }
});
test('adaptive thresholds are 85 percent inclusive and below 50 percent, with limits', () => {
  for (const [correct, expected] of [[17, 3], [10, 2], [9, 1]]) {
    const progress = { levelState: { memory: { level: 2, completedSinceEvaluation: [] } }, sessions: [] };
    for (let i = 0; i < 3; i++) {
      const s = session('s' + i, 'memoria', correct, 20);
      progress.sessions.push(s); evaluateLevel(progress, 'memory', s);
    }
    assert.equal(progress.levelState.memory.level, expected);
    assert.deepEqual(progress.levelState.memory.completedSinceEvaluation, []);
  }
  for (const [level, correct] of [[1, 0], [4, 20]]) {
    const progress = { levelState: { memory: { level, completedSinceEvaluation: [] } }, sessions: [] };
    for (let i = 0; i < 3; i++) { const s = session('s' + i, 'memoria', correct, 20); progress.sessions.push(s); evaluateLevel(progress, 'memory', s); }
    assert.equal(progress.levelState.memory.level, level);
  }
});
test('recommendations require two eligible categories, weighted samples and untied rates', () => {
  const progress = { sessions: [] };
  assert.equal(getBestCategory(progress), null);
  assert.equal(getRecommendation(progress).gameId, 'memory');
  progress.sessions = [0, 1, 2].map(i => session('m' + i, 'memoria', 4));
  assert.equal(getBestCategory(progress), null);
  progress.sessions.push(...[0, 1, 2].map(i => session('w' + i, 'linguagem', 4)));
  assert.equal(getBestCategory(progress), null);
  progress.sessions.at(-1).attempts.push(...Array.from({ length: 8 }, () => ({ correct: false })));
  assert.equal(getBestCategory(progress).category, 'memoria');
  assert.equal(getPracticeCategory(progress).category, 'linguagem');
  assert.equal(getRecommendation(progress).gameId, 'image');
});
test('daily plans freeze slots, keep their original date and choose oldest completed phase', () => {
  resetProgress();
  const original = getDailyPlan('2026-09-16');
  assert.equal(original.slots.length, 5);
  assert.deepEqual(getDailyPlan('2026-09-16'), original);
  const otherDay = getDailyPlan('2026-09-17');
  assert.notEqual(otherDay.slots[0].id, original.slots[0].id);
  assert.deepEqual(getDailyPlan('2026-09-16'), original);
  const progress = getProgress();
  progress.phaseProgress.memory = Object.fromEntries(getGamePhases('memory').map(p => [p.ordinal, {
    completed: true, bestStars: 3, firstCompletedAt: '2026-09-01T12:00:00Z',
    lastCompletedAt: p.ordinal === 7 ? '2026-09-01T12:00:00Z' : '2026-09-15T12:00:00Z'
  }]));
  assert.equal(chooseDailyPhase(progress, 'memory').ordinal, 7);
  saveProgress(progress);
  assert.deepEqual(getDailyPlan('2026-09-16').slots.map(s => s.phaseId), original.slots.map(s => s.phaseId));
});
test('legacy daily migration preserves completed slots and populates only pending references', () => {
  resetProgress();
  const progress = getProgress();
  progress.dailyPlans['2026-09-14'] = { dateKey: '2026-09-14', activities: ['memory', 'word', 'sequence', 'findObject', 'situations'], currentIndex: 2 };
  saveProgress(progress);
  const plan = getDailyPlan('2026-09-14');
  assert.equal(plan.slots.filter(s => s.completedSessionId).length, 2);
  assert.equal(plan.slots[0].phaseId, null);
  assert.equal(plan.slots[2].phaseId, 'sequence-p01');
  assert.deepEqual(getDailyPlan('2026-09-14'), plan);
  assert.equal(getProgress().atividades, 0);
});
test('date key uses local year, month and day', () => {
  assert.equal(localDateKey(new Date(2026, 8, 16, 23, 59)), '2026-09-16');
  assert.equal(localDateKey(new Date(2026, 8, 17, 0, 1)), '2026-09-17');
});
