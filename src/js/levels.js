export const LEVELS = { 1: { name: 'Inicial' }, 2: { name: 'Fácil' }, 3: { name: 'Intermediário' }, 4: { name: 'Avançado' } };
export const getCurrentLevel = (progress) => LEVELS[progress?.nivelAtual] ? progress.nivelAtual : 1;
export const getGameLevel = (progress, gameId) => LEVELS[progress?.levelState?.[gameId]?.level] ? progress.levelState[gameId].level : getCurrentLevel(progress);

// Only completed free sessions enter a game's three-session window.
export function evaluateLevel(progress, gameId, session) {
  if (session.mode !== 'free' || session.status !== 'completed') return progress;
  const state = progress.levelState[gameId] ||= { level: getGameLevel(progress, gameId), completedSinceEvaluation: [] };
  const ids = state.completedSinceEvaluation ||= [];
  if (ids.includes(session.id)) return progress;
  ids.push(session.id);
  if (ids.length >= 3) {
    const attempts = ids.flatMap(id => progress.sessions.find(item => item.id === id)?.attempts || []);
    const rate = attempts.length ? attempts.filter(item => item.correct).length / attempts.length : null;
    if (rate !== null) state.level = rate >= .85 ? Math.min(4, state.level + 1) : rate < .5 ? Math.max(1, state.level - 1) : state.level;
    state.completedSinceEvaluation = [];
  }
  return progress;
}
