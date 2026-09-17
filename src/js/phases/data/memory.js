import { phaseBoards } from '../content.js';
export const memoryPhaseBoards = Object.values(phaseBoards).filter((board) => board.gameId === 'memory');
