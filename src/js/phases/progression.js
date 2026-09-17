import { getGamePhases } from './catalog.js';

export function validRecord(record) {
  return record?.completed === true && Number.isInteger(record.bestStars) && record.bestStars >= 1 && record.bestStars <= 3
    && Number.isFinite(Date.parse(record.firstCompletedAt || record.completedAt));
}
export function getPhaseState(progress, gameId, ordinal) {
  if (!getGamePhases(gameId).some(phase => phase.ordinal === ordinal)) return 'locked';
  const records = progress?.phaseProgress?.[gameId] || {};
  if (validRecord(records[ordinal])) return 'completed';
  return ordinal === 1 || validRecord(records[ordinal - 1]) ? 'available' : 'locked';
}
export const getCompletedOrdinals = (progress, gameId) => getGamePhases(gameId).filter(p => getPhaseState(progress, gameId, p.ordinal) === 'completed').map(p => p.ordinal);
export const getNextPhase = (progress, gameId) => getGamePhases(gameId).find(p => getPhaseState(progress, gameId, p.ordinal) === 'available') || null;
export const canStartPhase = (progress, gameId, ordinal) => getPhaseState(progress, gameId, ordinal) !== 'locked';
export function getPhaseSummary(progress, gameId) {
  const completed = getCompletedOrdinals(progress, gameId);
  return { completed: completed.length, total: getGamePhases(gameId).length, next: getNextPhase(progress, gameId),
    stars: completed.reduce((sum, n) => sum + progress.phaseProgress[gameId][n].bestStars, 0) };
}
export function recordPhaseResult(progress, gameId, ordinal, stars, attempts, contentVersion = 1, at = new Date().toISOString()) {
  if (!canStartPhase(progress, gameId, ordinal) || ![1, 2, 3].includes(stars)) return { progress, accepted: false };
  const previous = progress.phaseProgress?.[gameId]?.[ordinal];
  const current = validRecord(previous) ? previous : {};
  const record = { completed: true, bestStars: Math.max(current.bestStars || 0, stars),
    completions: (current.completions || (current.completed ? 1 : 0)) + 1,
    attempts: (current.attempts || 0) + attempts, completedAt: current.completedAt || at,
    firstCompletedAt: current.firstCompletedAt || current.completedAt || at, lastCompletedAt: at, contentVersion };
  return { progress: { ...progress, phaseProgress: { ...progress.phaseProgress,
    [gameId]: { ...progress.phaseProgress?.[gameId], [ordinal]: record } } }, accepted: true };
}
