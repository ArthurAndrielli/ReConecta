import { getGamePhases } from './catalog.js';

export function getPhaseState(progress, gameId, ordinal) {
  const record = progress?.phaseProgress?.[gameId]?.[ordinal];
  if (record?.completed) return 'completed';
  if (ordinal === 1 || progress?.phaseProgress?.[gameId]?.[ordinal - 1]?.completed) return 'available';
  return 'locked';
}
export function getCompletedOrdinals(progress, gameId) { return Object.entries(progress?.phaseProgress?.[gameId] || {}).filter(([, value]) => value?.completed).map(([ordinal]) => Number(ordinal)); }
export function getNextPhase(progress, gameId) { return getGamePhases(gameId).find((phase) => getPhaseState(progress, gameId, phase.ordinal) !== 'completed') || null; }
export function getPhaseSummary(progress, gameId) { const phases = getGamePhases(gameId); const completed = getCompletedOrdinals(progress, gameId); return { completed: completed.length, total: phases.length, next: getNextPhase(progress, gameId), stars: completed.reduce((sum, ordinal) => sum + (progress.phaseProgress[gameId][ordinal].bestStars || 0), 0) }; }
