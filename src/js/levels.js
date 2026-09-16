export const LEVELS = {
  1: { name: 'Inicial', help: 'high' },
  2: { name: 'Fácil', help: 'medium' },
  3: { name: 'Intermediário', help: 'low' },
  4: { name: 'Avançado', help: 'low' }
};

export function getCurrentLevel(progress) {
  const level = Number(progress?.nivelAtual) || 1;
  return LEVELS[level] ? level : 1;
}

export function getGameLevel(progress, gameId) {
  const stored = progress?.levelState?.[gameId]?.level;
  return LEVELS[stored] ? stored : getCurrentLevel(progress);
}

export function evaluateLevel(progress, gameId, accuracy) {
  const current = getGameLevel(progress, gameId);
  const state = progress.levelState?.[gameId] || { level: current, evaluations: [] };
  state.evaluations = [...(state.evaluations || []), Number(accuracy)].slice(-3);
  if (state.evaluations.length === 3) {
    const average = state.evaluations.reduce((sum, value) => sum + value, 0) / 3;
    state.level = average >= 0.85 ? Math.min(4, current + 1) : average < 0.5 ? Math.max(1, current - 1) : current;
    state.evaluations = [];
  }
  progress.levelState = { ...(progress.levelState || {}), [gameId]: state };
  return progress;
}
