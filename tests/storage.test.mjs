import test from 'node:test';
import assert from 'node:assert/strict';
import { phaseCatalog, getGamePhases } from '../src/js/phases/catalog.js';
import { getPhaseContent } from '../src/js/phases/content.js';
import { canStartPhase, getPhaseSummary } from '../src/js/phases/progression.js';

class MemoryStorage {
  data = new Map(); fail = false;
  getItem(key) { return this.data.get(key) ?? null; }
  setItem(key, value) { if (this.fail) throw new Error('Quota'); this.data.set(key, String(value)); }
  removeItem(key) { if (this.fail) throw new Error('Denied'); this.data.delete(key); }
}
let counter = 0;
async function fresh(raw) {
  globalThis.localStorage = new MemoryStorage();
  if (raw !== undefined) localStorage.setItem('reconecta_progress', typeof raw === 'string' ? raw : JSON.stringify(raw));
  return import(`../src/js/storage.js?test=${counter++}`);
}
function complete(storage, options = {}) {
  const session = storage.createSession({ gameId: 'memory', ...options });
  assert.ok(session);
  for (const id of session.objectives) storage.recordSessionAttempt(session.id, { id, objectiveId: id, correct: true }, 50);
  return storage.finishSession(session.id, { elapsedMs: 100 });
}
test('completion is atomic/idempotent, preserves records and isolates modes', async () => {
  const s = await fresh(); const phase = getGamePhases('memory')[0];
  assert.equal(s.createSession({ gameId: 'memory', mode: 'phase', phaseId: 'memory-p02' }), null);
  const result = complete(s, { mode: 'phase', phaseId: phase.id });
  assert.equal(result.stars, 3);
  s.finishSession(result.id, { objectives: ['goal'] });
  assert.equal(s.recordSessionAttempt(result.id, { id: 'late', correct: true }), false);
  let progress = s.getProgress();
  assert.equal(progress.atividades, 1); assert.equal(progress.estrelas, 3);
  assert.equal(progress.phaseProgress.memory[1].completions, 1);
  assert.ok(canStartPhase(progress, 'memory', 2));
  assert.equal(canStartPhase(progress, 'word', 2), false);
  assert.equal(canStartPhase(progress, 'memory', 21), false);
  const repeat = s.createSession({ gameId: 'memory', mode: 'phase', phaseId: phase.id });
  for (let i = 0; i < 3; i++) s.recordSessionAttempt(repeat.id, { id: 'wrong' + i, objectiveId: 'goal', correct: false });
  for (const id of repeat.objectives) s.recordSessionAttempt(repeat.id, { id, objectiveId: id, correct: true });
  s.finishSession(repeat.id, { objectives: ['goal'] });
  progress = s.getProgress();
  assert.equal(progress.phaseProgress.memory[1].bestStars, 3);
  assert.equal(progress.phaseProgress.memory[1].completions, 2);
  assert.equal(getPhaseSummary(progress, 'memory').completed, 1);
  assert.equal(progress.tentativas, progress.acertos + progress.erros);
  assert.equal(progress.levelState.memory, undefined);
});
test('failed writes keep all session data in memory and retry cannot duplicate completion', async () => {
  const s = await fresh();
  const first = complete(s);
  localStorage.fail = true;
  const second = complete(s);
  assert.equal(s.getProgress().atividades, 2);
  assert.equal(s.getStorageStatus().issue, 'unavailable');
  assert.equal(JSON.parse(localStorage.getItem(s.STORAGE_KEY)).atividades, 1);
  localStorage.fail = false; s.retrySave(); s.retrySave();
  assert.equal(JSON.parse(localStorage.getItem(s.STORAGE_KEY)).atividades, 2);
  assert.equal(s.getProgress().sessions.find(item => item.id === second.id).status, 'completed');
  assert.notEqual(first.id, second.id);
});
test('unknown, corrupt and future values remain intact', async () => {
  for (const raw of ['{broken', 'null', '{"schemaVersion":99,"sessions":[]}', '{"mystery":1}', '{"schemaVersion":3,"sessions":"wrong"}']) {
    const s = await fresh(raw);
    complete(s);
    assert.equal(localStorage.getItem(s.STORAGE_KEY), raw);
    assert.equal(s.getStorageStatus().protectedProgress, true);
  }
});
test('legacy migration, reload interruption and reset preserve unrelated data/preferences', async () => {
  const s = await fresh({ atividadesRealizadas: 7, acertos: 12, erros: 4, tentativas: 16, estrelas: 15, nivelAtual: 2 });
  assert.equal(s.getProgress().atividades, 7);
  const session = s.createSession({ gameId: 'word' });
  s.recordSessionAttempt(session.id, { id: 'attempt', correct: false, objectiveId: 'one' }, 123);
  const loaded = await import(`../src/js/storage.js?reload=${counter++}`);
  assert.equal(loaded.getProgress().sessions[0].status, 'abandoned');
  assert.equal(loaded.getProgress().sessions[0].elapsedMs, 123);
  assert.equal(loaded.getProgress().atividades, 7);
  assert.deepEqual(loaded.getProgress().phaseProgress, {});
  const again = await import(`../src/js/storage.js?reload=${counter++}`);
  assert.deepEqual(again.getProgress(), loaded.getProgress());
  loaded.savePreferences({ textSize: 'large', appearance: 'dark' });
  localStorage.setItem('unrelated', 'keep');
  assert.equal(loaded.resetProgress(), true);
  assert.equal(localStorage.getItem('unrelated'), 'keep');
  assert.equal(loaded.getPreferences().appearance, 'dark');
  assert.equal(loaded.getProgress().atividades, 0);
});
test('migration removes retired phases and maps the former fourth level to difficult', async () => {
  const completedAt = '2026-09-01T12:00:00Z';
  const s = await fresh({ schemaVersion: 3, sessions: [], dailyPlans: {}, atividades: 0, acertos: 0, erros: 0,
    tentativas: 0, estrelas: 0, tempoRespostaTotal: 0, nivelAtual: 4,
    phaseProgress: { memory: { 4: { completed: true, bestStars: 3, completedAt } } },
    levelState: { memory: { level: 4, completedSinceEvaluation: [] } } });
  assert.deepEqual(s.getProgress().phaseProgress.memory, {});
  assert.equal(s.getProgress().nivelAtual, 3);
  assert.equal(s.getProgress().levelState.memory.level, 3);
});
test('all 36 phases can progress through every difficulty and preserve maximum totals', async () => {
  const s = await fresh();
  for (const phase of phaseCatalog) {
    const session = s.createSession({ gameId: phase.gameId, mode: 'phase', phaseId: phase.id });
    assert.ok(session, phase.id);
    for (const id of session.objectives) s.recordSessionAttempt(session.id, { id, objectiveId: id, correct: true });
    assert.ok(s.finishSession(session.id, { objectives: ['goal'] }), phase.id);
  }
  const progress = s.getProgress();
  assert.equal(progress.atividades, 36); assert.equal(progress.estrelas, 108);
  for (const id of new Set(phaseCatalog.map(p => p.gameId))) assert.deepEqual([getPhaseSummary(progress, id).completed, getPhaseSummary(progress, id).stars], [3, 9]);
});
test('daily slot is credited by matching session only, in the same saved object', async () => {
  const s = await fresh();
  const progress = s.getProgress();
  progress.dailyPlans['2026-09-16'] = { slots: [{ id: 'slot', gameId: 'memory', phaseId: 'memory-p01', contentVersion: 1, completedSessionId: null }] };
  s.saveProgress(progress);
  complete(s, { mode: 'phase', phaseId: 'memory-p01' });
  assert.equal(s.getProgress().dailyPlans['2026-09-16'].slots[0].completedSessionId, null);
  assert.equal(s.createSession({ gameId: 'memory', mode: 'daily', phaseId: 'memory-p01' }), null);
  const result = complete(s, { mode: 'daily', phaseId: 'memory-p01', trainingRef: { dateKey: '2026-09-16', slotId: 'slot' } });
  assert.equal(s.getProgress().dailyPlans['2026-09-16'].slots[0].completedSessionId, result.id);
  assert.equal(s.createSession({ gameId: 'memory', mode: 'daily', phaseId: 'memory-p01', trainingRef: result.trainingRef }), null);
  assert.equal(s.getProgress().atividades, 2);
});
test('adaptive level uses weighted attempts, three free sessions and game isolation', async () => {
  const s = await fresh();
  for (const [correct, wrong] of [[1, 0], [1, 0], [1, 9]]) {
    const session = s.createSession({ gameId: 'word' });
    for (let i = 0; i < wrong; i++) s.recordSessionAttempt(session.id, { id: 'w' + i, correct: false, objectiveId: 'goal' });
    for (const id of session.objectives) s.recordSessionAttempt(session.id, { id, correct: true, objectiveId: id });
    s.finishSession(session.id, { objectives: ['goal'] });
  }
  assert.equal(s.getProgress().levelState.word.level, 1);
  for (let i = 0; i < 3; i++) complete(s, { gameId: 'word' });
  assert.equal(s.getProgress().levelState.word.level, 2);
  assert.equal(s.getProgress().levelState.memory, undefined);
});

test('partial completion cannot be authorized by a caller-supplied objective list', async () => {
  const s = await fresh();
  const session = s.createSession({ gameId: 'word' });
  const objective = session.objectives[0];
  assert.equal(s.recordSessionAttempt(session.id, { id: 'fake', correct: true, objectiveId: 'invented' }), false);
  s.recordSessionAttempt(session.id, { id: 'one', correct: true, objectiveId: objective });
  assert.equal(s.finishSession(session.id, { objectives: [objective] }), null);
  s.abandonSession(session.id, 400);
  assert.equal(s.getProgress().atividades, 0);
  assert.equal(s.getProgress().sessions[0].elapsedMs, 400);
});

test('version 2 session-only records derive totals and preserve legacy totals', async () => {
  const raw = {
    schemaVersion: 2, legacyTotals: { atividadesRealizadas: 4, estrelas: 9, acertos: 8, erros: 2 },
    sessions: [{ id: 'old', gameId: 'word', status: 'completed', startedAt: '2026-09-01T12:00:00Z',
      endedAt: '2026-09-01T12:01:00Z', level: 2, stars: 3, elapsedMs: 60000, attempts: [{ id: 'one', correct: true }] }]
  };
  const s = await fresh(raw);
  const progress = s.getProgress();
  assert.equal(progress.atividades, 5);
  assert.equal(progress.estrelas, 12);
  assert.equal(progress.acertos, 9);
  assert.equal(progress.erros, 2);
  assert.equal(progress.tentativas, 11);
  assert.equal(progress.sessions[0].phaseId, null);
  assert.deepEqual(s.migrateProgress(progress), progress);
});
