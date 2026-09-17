import { phaseBoards } from '../content.js';
export const associationPhaseBoards = Object.values(phaseBoards).filter((item) => item.gameId === 'association');
