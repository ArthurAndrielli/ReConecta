import { phaseRounds } from '../content.js';
export const oddPhaseRounds = Object.values(phaseRounds).filter((item) => item.gameId === 'odd');
