import { phaseRounds } from '../content.js';
export const sentencePhaseRounds = Object.values(phaseRounds).filter((item) => item.gameId === 'sentence');
