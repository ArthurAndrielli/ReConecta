import { games } from './data.js';
import { getPhase, getGamePhases } from './phases/catalog.js';
import { canStartPhase, recordPhaseResult, validRecord } from './phases/progression.js';
import { calculateStars } from './scoring.js';
import { evaluateLevel, getGameLevel } from './levels.js';
import { phaseBoards, phaseRounds } from './phases/content.js';
import { objectivesFor } from './phases/objectives.js';

export const STORAGE_KEY = 'reconecta_progress';
export const PREFERENCES_KEY = 'reconecta_preferences';
const defaults = () => ({ schemaVersion: 2, appearance: 'system', textSize: 'standard', reduceMotion: false, observationMode: 'self-paced' });
export const initialProgress = () => ({ schemaVersion: 3, atividades: 0, acertos: 0, erros: 0, tentativas: 0, estrelas: 0,
  tempoRespostaTotal: 0, nivelAtual: 1, sessions: [], levelState: {}, phaseProgress: {}, dailyPlans: {}, legacyTotals: null });
let state;
let preferences;
let protectedProgress = false;
let protectedPreferences = false;
let issue = '';
let preferenceIssue = '';
const clone = value => structuredClone(value);
const object = value => value && typeof value === 'object' && !Array.isArray(value);
const number = value => Number.isFinite(value) && value >= 0;
const date = value => typeof value === 'string' && Number.isFinite(Date.parse(value));
const uid = () => globalThis.crypto?.randomUUID?.() || `session-${Date.now()}-${Math.random().toString(36).slice(2)}`;
function announce() { if (typeof window !== 'undefined') window.dispatchEvent(new Event('storage-status')); }
export const getStorageStatus = () => ({ issue, preferenceIssue, protectedProgress });
function read(key) { try { return localStorage.getItem(key); } catch { throw new Error('unavailable'); } }

// A malformed known record is kept on disk, rather than silently replaced.
export function migrateProgress(saved) {
  if (!object(saved) || (saved.schemaVersion && ![1, 2, 3].includes(saved.schemaVersion))) throw new Error('unknown');
  if (!('sessions' in saved) && !['atividades', 'atividadesRealizadas', 'acertos', 'erros', 'estrelas'].some(key => key in saved)) throw new Error('unknown');
  const result = { ...initialProgress(), ...clone(saved), schemaVersion: 3 };
  for (const key of ['sessions']) if (saved[key] !== undefined && !Array.isArray(saved[key])) throw new Error('invalid');
  for (const key of ['dailyPlans', 'phaseProgress', 'levelState']) if (saved[key] !== undefined && !object(saved[key])) throw new Error('invalid');
  for (const key of ['atividades', 'acertos', 'erros', 'tentativas', 'estrelas', 'tempoRespostaTotal']) {
    const value = key === 'atividades' ? saved.atividades ?? saved.atividadesRealizadas ?? 0 : saved[key] ?? 0;
    if (!number(value)) throw new Error('invalid');
    result[key] = value;
  }
  result.nivelAtual = [1, 2, 3].includes(saved.nivelAtual) ? saved.nivelAtual : saved.nivelAtual === 4 ? 3 : 1;
  const sessionIds = new Set();
  result.sessions = (saved.sessions || []).map(item => {
    if (!object(item) || typeof item.id !== 'string' || sessionIds.has(item.id) || !games.some(g => g.id === item.gameId)
      || !['active', 'completed', 'abandoned'].includes(item.status) || !date(item.startedAt) || !Array.isArray(item.attempts)) throw new Error('invalid session');
    sessionIds.add(item.id);
    const attempts = new Set();
    item.attempts.forEach(a => { if (!object(a) || typeof a.id !== 'string' || attempts.has(a.id) || typeof a.correct !== 'boolean') throw new Error('invalid attempt'); attempts.add(a.id); });
    return { ...item, category: games.find(g => g.id === item.gameId).category,
      mode: item.mode || (item.trainingRef ? 'daily' : 'free'), phaseId: item.phaseId || null, contentVersion: item.contentVersion || null,
      stars: item.status === 'completed' && [1, 2, 3].includes(item.stars) ? item.stars : 0,
      elapsedMs: number(item.elapsedMs) ? item.elapsedMs : 0,
      level: [1, 2, 3, 4].includes(item.level) ? item.level : 1 };
  });
  // Keep old aggregate-only counts separately; never manufacture dated sessions.
  if (!saved.legacyTotals) {
    const completed = result.sessions.filter(s => s.status === 'completed');
    const attempts = result.sessions.flatMap(s => s.attempts);
    result.legacyTotals = {
      atividades: Math.max(0, result.atividades - completed.length),
      estrelas: Math.max(0, result.estrelas - completed.reduce((n, s) => n + s.stars, 0)),
      acertos: Math.max(0, result.acertos - attempts.filter(a => a.correct).length),
      erros: Math.max(0, result.erros - attempts.filter(a => !a.correct).length)
    };
  }
  const completedSessions = result.sessions.filter(s => s.status === 'completed');
  const recordedAttempts = result.sessions.flatMap(s => s.attempts);
  if (!object(result.legacyTotals)) throw new Error('invalid legacy totals');
  const legacy = result.legacyTotals;
  for (const field of ['atividades', 'estrelas', 'acertos', 'erros']) {
    const value = field === 'atividades' ? legacy.atividades ?? legacy.atividadesRealizadas ?? 0 : legacy[field] ?? 0;
    if (!number(value)) throw new Error('invalid legacy totals');
    legacy[field] = value;
  }
  result.atividades = legacy.atividades + completedSessions.length;
  result.estrelas = legacy.estrelas + completedSessions.reduce((sum, s) => sum + s.stars, 0);
  result.acertos = legacy.acertos + recordedAttempts.filter(a => a.correct).length;
  result.erros = legacy.erros + recordedAttempts.filter(a => !a.correct).length;
  result.tentativas = result.acertos + result.erros;
  for (const [gameId, records] of Object.entries(result.phaseProgress)) {
    if (!object(records)) throw new Error('invalid phases');
    for (const [key, record] of Object.entries(records)) {
      const phase = getGamePhases(gameId).find(p => String(p.ordinal) === key || p.id === key);
      const normalizedRecord = { ...record, completed: record.completed ?? (record.completions > 0) };
      const removedOrdinal = Number(String(key).match(/(?:p)?(\d+)$/)?.[1]);
      if (!phase && games.some(game => game.id === gameId) && removedOrdinal >= 4 && removedOrdinal <= 20 && validRecord(normalizedRecord)) {
        delete records[key];
        continue;
      }
      if (!phase || !validRecord(normalizedRecord)) throw new Error('invalid phase');
      records[phase.ordinal] = { ...record, completed: true, completions: record.completions || 1,
        firstCompletedAt: record.firstCompletedAt || record.completedAt, lastCompletedAt: record.lastCompletedAt || record.completedAt };
      if (key === phase.id) delete records[key];
    }
  }
  for (const game of games) {
    const current = result.levelState[game.id];
    const level = [1, 2, 3].includes(current?.level) ? current.level : current?.level === 4 ? 3 : result.nivelAtual;
    const refs = Array.isArray(current?.completedSinceEvaluation) ? current.completedSinceEvaluation : [];
    result.levelState[game.id] = { level, completedSinceEvaluation: [...new Set(refs)].filter(id => result.sessions.some(s => s.id === id && s.gameId === game.id && s.status === 'completed' && s.mode === 'free')).slice(-2) };
  }
  return result;
}
function load() {
  if (state) return;
  state = initialProgress();
  try {
    const raw = read(STORAGE_KEY);
    if (!raw) return;
    state = migrateProgress(JSON.parse(raw));
    state.sessions.forEach(session => { if (session.status === 'active') { session.status = 'abandoned'; session.endedAt = new Date().toISOString(); session.stars = 0; } });
    saveProgress(state);
  } catch (error) { protectedProgress = error.message !== 'unavailable'; issue = protectedProgress ? 'protected' : 'unavailable'; }
}
export function getProgress() { load(); return clone(state); }
export function saveProgress(progress) {
  state = clone(progress);
  if (protectedProgress) { issue = 'protected'; announce(); return false; }
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); issue = ''; announce(); return true; }
  catch { issue = 'unavailable'; announce(); return false; }
}
export function retrySave() { load(); return saveProgress(state); }
export function getPreferences() {
  if (preferences) return clone(preferences);
  preferences = defaults();
  try {
    const raw = read(PREFERENCES_KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      if (!object(saved) || (saved.schemaVersion && ![1, 2].includes(saved.schemaVersion))) throw new Error('unknown');
      preferences = { ...defaults(), ...saved,
        appearance: ['light', 'dark', 'system'].includes(saved.appearance) ? saved.appearance : 'system',
        textSize: saved.textSize === 'large' ? 'large' : 'standard',
        reduceMotion: saved.reduceMotion === true,
        observationMode: saved.observationMode === 'suggested-time' ? 'suggested-time' : 'self-paced' };
    }
  } catch (error) { protectedPreferences = error.message !== 'unavailable'; preferenceIssue = 'Não foi possível ler os ajustes salvos. As alterações valerão nesta sessão.'; }
  return clone(preferences);
}
export function savePreferences(value) {
  preferences = { ...getPreferences(), ...value, schemaVersion: 2 };
  try {
    if (protectedPreferences) throw new Error('protected');
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences)); preferenceIssue = ''; announce(); return true;
  } catch { preferenceIssue = 'Os ajustes estão aplicados, mas não foi possível salvá-los.'; announce(); return false; }
}
export function createSession({ gameId, mode = 'free', phaseId = null, trainingRef = null, contentIds = [] }) {
  const progress = getProgress();
  const game = games.find(g => g.id === gameId);
  const phase = phaseId ? getPhase(phaseId) : null;
  if (!game || !['free', 'phase', 'daily'].includes(mode)) return null;
  if (mode !== 'free' && (!phase || phase.gameId !== gameId || !canStartPhase(progress, gameId, phase.ordinal))) return null;
  if (mode === 'daily') {
    const slot = progress.dailyPlans[trainingRef?.dateKey]?.slots?.find(s => s.id === trainingRef?.slotId);
    if (!slot || slot.completedSessionId || slot.gameId !== gameId || slot.phaseId !== phaseId || slot.contentVersion !== phase.contentVersion) return null;
  }
  const level = phase?.level || getGameLevel(progress, gameId);
  if (phase) contentIds = phase.contentRefs;
  else if (!contentIds.length) contentIds = getGamePhases(gameId).find(p => p.level === level).contentRefs;
  const content = contentIds.map(id => phaseBoards[id] || phaseRounds[id]);
  if (content.length !== (['memory', 'association'].includes(gameId) ? 1 : 3)
    || new Set(contentIds).size !== content.length || content.some(item => !item || item.gameId !== gameId || item.level !== level)) return null;
  const session = { id: uid(), gameId, category: game.category, mode, phaseId: phase?.id || null,
    phaseOrdinal: phase?.ordinal || null, contentVersion: phase?.contentVersion || null,
    level, trainingRef, contentIds, objectives: objectivesFor(content),
    status: 'active', startedAt: new Date().toISOString(), endedAt: null, elapsedMs: 0, attempts: [], stars: 0 };
  progress.sessions.push(session); saveProgress(progress); return clone(session);
}
export function recordSessionAttempt(sessionId, attempt, elapsedMs = 0) {
  const progress = getProgress();
  const session = progress.sessions.find(s => s.id === sessionId && s.status === 'active');
  if (!session || typeof attempt.correct !== 'boolean' || !attempt.id || session.attempts.some(a => a.id === attempt.id)) return false;
  if (attempt.correct && !session.objectives.includes(attempt.objectiveId)) return false;
  if (attempt.correct && session.attempts.some(a => a.correct && a.objectiveId === attempt.objectiveId)) return false;
  session.attempts.push({ ...attempt, at: new Date().toISOString() });
  session.elapsedMs = Math.max(session.elapsedMs, elapsedMs);
  progress.tentativas++; progress[attempt.correct ? 'acertos' : 'erros']++;
  saveProgress(progress); return true;
}
export function checkpointSession(sessionId, elapsedMs) {
  const progress = getProgress();
  const session = progress.sessions.find(s => s.id === sessionId && s.status === 'active');
  if (!session) return false;
  session.elapsedMs = Math.max(session.elapsedMs, elapsedMs); return saveProgress(progress);
}
export function finishSession(sessionId, { elapsedMs = 0 } = {}) {
  let progress = getProgress();
  const session = progress.sessions.find(s => s.id === sessionId);
  if (!session || session.status === 'abandoned') return null;
  if (session.status === 'completed') return clone(session);
  const objectives = objectivesFor((session.contentIds || []).map(id => phaseBoards[id] || phaseRounds[id]).filter(Boolean));
  if (!objectives.length || !objectives.every(id => session.attempts.some(a => a.correct && a.objectiveId === id))) return null;
  let slot;
  if (session.mode === 'daily') {
    slot = progress.dailyPlans[session.trainingRef?.dateKey]?.slots?.find(s => s.id === session.trainingRef?.slotId);
    if (!slot || slot.completedSessionId || slot.gameId !== session.gameId || slot.phaseId !== session.phaseId || slot.contentVersion !== session.contentVersion) return null;
  }
  const stars = calculateStars({ completed: true, errors: session.attempts.filter(a => !a.correct).length });
  const at = new Date().toISOString();
  if (session.mode !== 'free') {
    const result = recordPhaseResult(progress, session.gameId, session.phaseOrdinal, stars, session.attempts.length, session.contentVersion, at);
    if (!result.accepted) return null;
    progress = result.progress;
  }
  Object.assign(session, { status: 'completed', endedAt: at, elapsedMs: Math.max(session.elapsedMs, elapsedMs), stars });
  if (slot) slot.completedSessionId = session.id;
  progress.atividades++; progress.estrelas += stars; progress.tempoRespostaTotal += session.elapsedMs;
  evaluateLevel(progress, session.gameId, session);
  saveProgress(progress); return clone(session);
}
export function abandonSession(sessionId, elapsedMs = 0) {
  const progress = getProgress();
  const session = progress.sessions.find(s => s.id === sessionId && s.status === 'active');
  if (!session) return false;
  Object.assign(session, { status: 'abandoned', endedAt: new Date().toISOString(), elapsedMs: Math.max(session.elapsedMs, elapsedMs), stars: 0 });
  saveProgress(progress); return true;
}
export function resetProgress() {
  load();
  try { localStorage.removeItem(STORAGE_KEY); }
  catch { issue = 'reset-failed'; announce(); return false; }
  protectedProgress = false; state = initialProgress(); issue = ''; announce(); return true;
}
