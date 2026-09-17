import { phaseRounds } from '../content.js';
export const situationsPhaseRounds = Object.values(phaseRounds).filter((item) => item.gameId === 'situations');
