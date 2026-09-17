import { GAME_IDS, phaseCatalog } from './catalog.js';
import { validateContentReferences, phaseBoards, phaseRounds } from './content.js';

export function validatePhaseCatalog(phases = phaseCatalog) {
  const errors = [];
  const ids = new Set();
  for (const phase of phases) {
    if (ids.has(phase.id)) errors.push(`ID duplicado: ${phase.id}`);
    ids.add(phase.id);
    if (!GAME_IDS.includes(phase.gameId)) errors.push(`jogo inválido: ${phase.id}`);
    if (!Number.isInteger(phase.ordinal) || phase.ordinal < 1 || phase.ordinal > 20) errors.push(`ordinal inválido: ${phase.id}`);
    if (phase.block !== Math.ceil(phase.ordinal / 5)) errors.push(`bloco incompatível: ${phase.id}`);
    if (![1, 2, 3, 4].includes(phase.level)) errors.push(`nível inválido: ${phase.id}`);
    if (!phase.contentVersion || !phase.instruction || !phase.hint) errors.push(`contrato incompleto: ${phase.id}`);
    if (!Array.isArray(phase.contentRefs) || phase.contentRefs.length !== (phase.unit === 'board' ? 1 : 3)) errors.push(`referências incompatíveis: ${phase.id}`);
    if (!['board', 'rounds'].includes(phase.unit)) errors.push(`unidade inválida: ${phase.id}`);
  }
  for (const gameId of GAME_IDS) {
    const gamePhases = phases.filter((phase) => phase.gameId === gameId);
    if (gamePhases.length !== 20) errors.push(`${gameId}: esperado 20 fases, encontrado ${gamePhases.length}`);
    if (new Set(gamePhases.map((phase) => phase.ordinal)).size !== gamePhases.length) errors.push(`${gameId}: ordinais duplicados`);
  }
  errors.push(...validateContentReferences(phases));
  const boardSignatures = new Set(Object.values(phaseBoards).map((board) => JSON.stringify(board.pairs)));
  if (Object.keys(phaseBoards).length !== 40 || boardSignatures.size !== 40) errors.push('bancos de tabuleiro incompletos ou duplicados');
  if (Object.keys(phaseRounds).length !== 600) errors.push(`rodadas esperadas: 600, encontradas ${Object.keys(phaseRounds).length}`);
  return { valid: errors.length === 0, errors, total: phases.length };
}
