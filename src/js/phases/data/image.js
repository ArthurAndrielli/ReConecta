import { phaseRounds } from '../content.js';
export const imagePhaseRounds = Object.values(phaseRounds).filter((item) => item.gameId === 'image');
