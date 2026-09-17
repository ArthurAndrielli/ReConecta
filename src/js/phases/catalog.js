const GAME_IDS = ['memory', 'whatDidYouSee', 'word', 'image', 'odd', 'sequence', 'routine', 'findObject', 'tapOnly', 'association', 'situations', 'sentence'];
const TITLES = ['Objetos de casa', 'Cores e formas', 'Pequenas escolhas', 'Descobertas do dia', 'Novos caminhos'];
const UNITS = new Set(['memory', 'association']);

function makePhase(gameId, ordinal) {
  const block = Math.ceil(ordinal / 5);
  const level = block;
  const prefix = `${gameId}-p${String(ordinal).padStart(2, '0')}`;
  const refs = UNITS.has(gameId) ? [`${gameId}-board-${String(ordinal).padStart(2, '0')}`] : [1, 2, 3].map((round) => `${prefix}-r${round}`);
  return { id: prefix, gameId, ordinal, block, title: `${TITLES[(ordinal - 1) % TITLES.length]} ${ordinal}`, level, contentVersion: 1, unit: UNITS.has(gameId) ? 'board' : 'rounds', contentRefs: refs, instruction: 'Observe com calma e responda cada desafio.', hint: 'Procure a relação que combina com a instrução.' };
}

export const phaseCatalog = GAME_IDS.flatMap((gameId) => Array.from({ length: 20 }, (_, index) => makePhase(gameId, index + 1)));
export const phasesByGame = Object.fromEntries(GAME_IDS.map((gameId) => [gameId, phaseCatalog.filter((phase) => phase.gameId === gameId)]));
export function getPhase(phaseId) { return phaseCatalog.find((phase) => phase.id === phaseId) || null; }
export function getGamePhases(gameId) { return phasesByGame[gameId] || []; }
export function getPhaseTotal(gameId) { return getGamePhases(gameId).length; }
export { GAME_IDS };
