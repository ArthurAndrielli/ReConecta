import { games } from './data.js';
import { getProgress, saveProgress } from './storage.js';
import { getGamePhases, getPhase } from './phases/catalog.js';
import { getNextPhase } from './phases/progression.js';
import { getRecommendation } from './evolution.js';
import { localDateKey } from './utils/dom.js';

export function chooseDailyPhase(progress, gameId) {
  return getNextPhase(progress, gameId) || [...getGamePhases(gameId)].sort((a, b) => {
    const records = progress.phaseProgress[gameId] || {};
    return (records[a.ordinal]?.lastCompletedAt || '').localeCompare(records[b.ordinal]?.lastCompletedAt || '') || a.ordinal - b.ordinal;
  })[0];
}
export function getDailyPlan(dateKey = localDateKey()) {
  const progress = getProgress();
  let plan = progress.dailyPlans[dateKey];
  if (!plan) {
    const selected = ['memoria', 'linguagem', 'raciocinio', 'atencao', 'cotidiano'].map(group =>
      getRecommendation(progress, games.filter(g => (g.group || (g.category === 'associacao' ? 'cotidiano' : g.category)) === group)).gameId);
    plan = { dateKey, createdAt: new Date().toISOString(), slots: selected.map((gameId, index) => ({
      id: `${dateKey}-${index + 1}`, gameId, completedSessionId: null
    })) };
  }
  // The shipped legacy plan used activities/currentIndex instead of slots.
  if (!plan.slots && Array.isArray(plan.activities)) {
    plan.slots = plan.activities.map((gameId, index) => ({ id: `${dateKey}-${index + 1}`, gameId,
      completedSessionId: index < (plan.completed ? 5 : plan.currentIndex || 0) ? 'legacy-completed' : null,
      phaseId: plan.phaseIds?.[index] || null }));
  }
  if (!Array.isArray(plan.slots) || plan.slots.length !== 5 || plan.slots.some(s => !games.some(g => g.id === s.gameId))) return null;
  for (const slot of plan.slots) {
    if (slot.completedSessionId) continue;
    if (!slot.phaseId || !getPhase(slot.phaseId)) {
      const phase = chooseDailyPhase(progress, slot.gameId);
      slot.phaseId = phase.id; slot.contentVersion = phase.contentVersion;
    } else if (!slot.contentVersion && getPhase(slot.phaseId)) slot.contentVersion = getPhase(slot.phaseId).contentVersion;
  }
  progress.dailyPlans[dateKey] = plan;
  saveProgress(progress);
  return plan;
}
