export const LEVELS = {
  1: { name: 'Inicial', help: 'high' }
};

export function getCurrentLevel(progress) {
  const level = Number(progress?.nivelAtual) || 1;
  return LEVELS[level] ? level : 1;
}
