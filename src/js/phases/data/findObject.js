import { phaseRounds } from '../content.js';
export const findObjectPhaseRounds = Object.values(phaseRounds).filter((item) => item.gameId === 'findObject');
