import { phaseRounds } from '../content.js';
export const wordPhaseRounds = Object.values(phaseRounds).filter((item) => item.gameId === 'word');
