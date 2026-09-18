import { games } from '../data.js';
import { phaseBoards, phaseRounds } from './content.js';
const GAME_IDS = games.map(game => game.id);
const UNITS = new Set(['memory', 'association']);

function makePhase(gameId, ordinal) {
  const block = ordinal;
  const level = ordinal;
  const prefix = `${gameId}-p${String(ordinal).padStart(2, '0')}`;
  const refs = UNITS.has(gameId) ? [`${gameId}-board-${String(ordinal).padStart(2, '0')}`] : [1, 2, 3].map((round) => `${prefix}-r${round}`);
  const content = (UNITS.has(gameId) ? phaseBoards : phaseRounds)[refs[0]];
  return { id: prefix, gameId, ordinal, block, title: content.title, level, contentVersion: 1, unit: UNITS.has(gameId) ? 'board' : 'rounds', contentRefs: refs, instruction: games.find(game => game.id === gameId).description, hint: content.hint };
}

export const phaseCatalog = GAME_IDS.flatMap((gameId) => Array.from({ length: 3 }, (_, index) => makePhase(gameId, index + 1)));
export const phasesByGame = Object.fromEntries(GAME_IDS.map((gameId) => [gameId, phaseCatalog.filter((phase) => phase.gameId === gameId)]));
export function getPhase(phaseId) { return phaseCatalog.find((phase) => phase.id === phaseId) || null; }
export function getGamePhases(gameId) { return phasesByGame[gameId] || []; }
export function getPhaseTotal(gameId) { return getGamePhases(gameId).length; }
export { GAME_IDS };
