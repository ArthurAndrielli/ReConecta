import { phaseRounds } from '../content.js';
export const sequencePhaseRounds = Object.values(phaseRounds).filter((item) => item.gameId === 'sequence');
