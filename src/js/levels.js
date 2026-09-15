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
