import { phaseRounds } from '../content.js';
export const routinePhaseRounds = Object.values(phaseRounds).filter((item) => item.gameId === 'routine');
