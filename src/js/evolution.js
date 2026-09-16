const categoryLabels = { memoria: 'Memória', linguagem: 'Linguagem', atencao: 'Atenção', raciocinio: 'Raciocínio', associacao: 'Associação', cotidiano: 'Cotidiano' };
const categoryActivities = { memoria: 'memory', linguagem: 'word', atencao: 'findObject', raciocinio: 'sequence', associacao: 'association', cotidiano: 'situations' };

export function getCategoryPerformance(progress) {
  return Object.entries(progress.desempenhoPorCategoria || {}).map(([category, stats]) => ({ category, label: categoryLabels[category] || category, ...stats, rate: stats.tentativas ? stats.acertos / stats.tentativas : null }));
}

export function getBestCategory(progress) { return getCategoryPerformance(progress).filter((item) => item.rate !== null).sort((a, b) => b.rate - a.rate)[0] || null; }
export function getPracticeCategory(progress) { return getCategoryPerformance(progress).filter((item) => item.rate !== null).sort((a, b) => a.rate - b.rate)[0] || null; }
export function getRecommendation(progress) { const practice = getPracticeCategory(progress); return practice ? { category: practice.label, gameId: categoryActivities[practice.category] } : null; }
