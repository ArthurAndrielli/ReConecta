import { games, categories } from './data.js';

export function getCategoryPerformance(progress) {
  return categories.map(category => {
    const sessions = progress.sessions.filter(s => s.status === 'completed' && s.category === category.id).slice(-10);
    const attempts = sessions.flatMap(s => s.attempts);
    const correct = attempts.filter(a => a.correct).length;
    return { category: category.id, label: category.name, count: sessions.length, attempts: attempts.length,
      eligible: sessions.length >= 3 && attempts.length >= 10, rate: attempts.length ? correct / attempts.length : null };
  });
}
function compared(progress) {
  const eligible = getCategoryPerformance(progress).filter(c => c.eligible).sort((a, b) => a.rate - b.rate);
  return eligible.length >= 2 && eligible[0].rate !== eligible.at(-1).rate ? eligible : [];
}
export const getBestCategory = progress => { const entries = compared(progress); return entries.length && entries.filter(c => c.rate === entries.at(-1).rate).length === 1 ? entries.at(-1) : null; };
export const getPracticeCategory = progress => { const entries = compared(progress); return entries.length && entries.filter(c => c.rate === entries[0].rate).length === 1 ? entries[0] : null; };
export function getRecommendation(progress, candidates = games) {
  const practice = getPracticeCategory(progress);
  const filtered = practice ? candidates.filter(g => g.category === practice.category) : [];
  const pool = filtered.length ? filtered : candidates;
  const entries = pool.map(game => {
    const sessions = progress.sessions.filter(s => s.gameId === game.id && s.status === 'completed');
    return { game, count: sessions.length, recent: sessions.at(-1)?.endedAt || '' };
  });
  entries.sort((a, b) => (filtered.length ? 0 : a.count - b.count) || a.recent.localeCompare(b.recent));
  const game = entries[0]?.game;
  return game ? { gameId: game.id, category: categories.find(c => c.id === game.category).name,
    reason: filtered.length ? 'Uma sugestão para continuar praticando.' : 'Uma atividade para variar sua prática.' } : null;
}
