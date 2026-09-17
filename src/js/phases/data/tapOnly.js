import { phaseRounds } from '../content.js';
export const tapOnlyPhaseRounds = Object.values(phaseRounds).filter((item) => item.gameId === 'tapOnly');
