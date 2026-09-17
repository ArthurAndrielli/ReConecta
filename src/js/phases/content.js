const words = [['maçã', 'banana'], ['copo', 'livro'], ['casa', 'sapato'], ['chuva', 'casaco'], ['escova', 'dentes']];
const gamesWithRounds = ['whatDidYouSee', 'word', 'image', 'odd', 'sequence', 'routine', 'findObject', 'tapOnly', 'situations', 'sentence'];
const boardGames = ['memory', 'association'];

function makeBoard(gameId, ordinal) {
  const base = words[(ordinal - 1) % words.length];
  const size = gameId === 'memory' ? 2 + Math.ceil(ordinal / 5) : 1 + Math.ceil(ordinal / 5);
  return { id: `${gameId}-board-${String(ordinal).padStart(2, '0')}`, gameId, pairs: Array.from({ length: size }, (_, index) => [`${base[index % base.length]} ${ordinal}`, `${gameId === 'memory' ? 'par' : 'uso'} ${index + 1}`]) };
}
function makeRound(gameId, ordinal, round) {
  const subject = words[(ordinal + round - 2) % words.length][0];
  const id = `${gameId}-p${String(ordinal).padStart(2, '0')}-r${round}`;
  const options = gameId === 'sequence' ? [`${ordinal}`, `${ordinal + 1}`, `${ordinal + 2}`] : [subject, `outra opção ${ordinal}`, `outra escolha ${round}`];
  return { id, gameId, ordinal, round, prompt: `Desafio ${round} da fase ${ordinal}: escolha a opção que combina com ${subject}.`, options, answer: options[0], hint: 'Leia a instrução novamente e compare as alternativas.' };
}
export const phaseBoards = Object.fromEntries(boardGames.flatMap((gameId) => Array.from({ length: 20 }, (_, index) => { const board = makeBoard(gameId, index + 1); return [board.id, board]; })));
export const phaseRounds = Object.fromEntries(gamesWithRounds.flatMap((gameId) => Array.from({ length: 20 }, (_, index) => Array.from({ length: 3 }, (_, round) => { const item = makeRound(gameId, index + 1, round + 1); return [item.id, item]; })).flat()));
export function getPhaseContent(phase) { const source = phase.unit === 'board' ? phaseBoards : phaseRounds; return phase.contentRefs.map((ref) => source[ref]).filter(Boolean); }
export function validateContentReferences(phases) { return phases.flatMap((phase) => phase.contentRefs.filter((ref) => !(phase.unit === 'board' ? phaseBoards : phaseRounds)[ref]).map((ref) => `${phase.id}: referência ausente ${ref}`)); }
