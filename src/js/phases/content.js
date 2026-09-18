import { objects, groupLabels } from './objects.js';
import { routines, situations, sentences } from './editorial.js';

const ids = items => items.map(item => item.id);
const byCategory = name => objects.filter(item => item.category === name);
const profiles = [
  { sourceStart: 0, memory: 2, association: 2, observed: 2, visualOptions: 2, textOptions: 2, search: 4, targets: 2 },
  { sourceStart: 15, memory: 4, association: 3, observed: 4, visualOptions: 3, textOptions: 3, search: 6, targets: 3 },
  { sourceStart: 45, memory: 6, association: 5, observed: 5, visualOptions: 4, textOptions: 4, search: 9, targets: 4 }
];
const visualPools = [
  [1, 4, 16, 18, 22, 27, 32, 36, 39, 47, 40, 41],
  [3, 23, 24, 26, 43, 44, 2, 5, 6, 7, 17, 54, 8, 9, 25, 51, 0, 10],
  [11, 12, 13, 14, 19, 28, 29, 31, 33, 15, 20, 21, 30, 37, 38, 56, 57, 58, 34, 35, 42, 45, 46, 48, 52, 53, 55]
].map(pool => pool.map(index => objects[index]));
const hints = {
  memory: ['Vire uma carta e procure o mesmo desenho.', 'Observe onde cada desenho apareceu antes de virar a próxima carta.', 'Memorize as posições e compare os desenhos com atenção.'],
  association: ['Pense para que serve cada objeto.', 'Compare a finalidade de cada objeto antes de formar o par.', 'Analise todas as relações antes de confirmar cada par.'],
  visual: ['Compare o nome pedido com desenhos bem diferentes.', 'Observe forma e detalhes antes de escolher.', 'Compare cuidadosamente os detalhes das alternativas.'],
  reasoning: ['Procure o padrão que se repete.', 'Compare os grupos e descubra a regra.', 'Identifique a regra completa antes de responder.'],
  language: ['Leia devagar e compare as opções.', 'Leia a frase inteira antes de escolher.', 'Use o contexto completo para decidir.']
};
const relations = [
  ['Chave', 'Abrir uma fechadura'], ['Garfo', 'Espetar alimentos'], ['Cama', 'Deitar para dormir'],
  ['Sapato', 'Calçar os pés'], ['Livro', 'Ler histórias'], ['Guarda-chuva', 'Proteger da chuva'],
  ['Relógio', 'Consultar as horas'], ['Panela', 'Cozinhar uma sopa'], ['Tesoura', 'Cortar papel'],
  ['Caneta', 'Escrever com tinta']
];
const closerSituationDistractors = {
  15: ['Diminuir o brilho sem carregar', 'Reiniciar o telefone sem conectar o cabo', 'Fechar os aplicativos e continuar sem carga'],
  16: ['Responder antes de entender', 'Ignorar a parte que ficou confusa', 'Mudar de assunto sem confirmar'],
  17: ['Escolher uma rua sem conferir', 'Seguir a primeira placa que aparecer', 'Esperar sem procurar informação'],
  45: ['Escolher outro produto sem conferir', 'Sair sem perguntar sobre o item', 'Apagar o item da lista'],
  46: ['Guardar no fundo da mala despachada', 'Deixar os documentos misturados', 'Separar os documentos só depois de chegar'],
  47: ['Ativar apenas a câmera', 'Aumentar somente o volume', 'Sair da reunião sem testar o áudio']
};
const sentenceDistractors = {
  0: ['sapato'], 1: ['copo'], 2: ['livro'],
  15: ['sacola', 'pasta'], 16: ['rodo', 'pá'], 17: ['frigideira', 'tigela'],
  45: ['contato', 'arquivo', 'volume'], 46: ['endereço', 'pagamento', 'convite'], 47: ['ingrediente', 'recado', 'embrulho']
};

const boards = [];
const rounds = [];
let memoryOffset = 0, relationOffset = 0;
for (let index = 0; index < profiles.length; index++) {
  const level = index + 1, profile = profiles[index];
  const memoryItems = ids(objects.slice(memoryOffset, memoryOffset + profile.memory));
  memoryOffset += profile.memory;
  boards.push({ id: `memory-board-${String(level).padStart(2, '0')}`, gameId: 'memory', level,
    title: ['Primeiros pares', 'Mais posições', 'Desafio de memória'][index], items: memoryItems, hint: hints.memory[index] });
  const pairs = relations.slice(relationOffset, relationOffset + profile.association);
  relationOffset += profile.association;
  boards.push({ id: `association-board-${String(level).padStart(2, '0')}`, gameId: 'association', level,
    title: ['Relações diretas', 'Objetos e finalidades', 'Múltiplas relações'][index], pairs, hint: hints.association[index] });
}

const tapCategories = [['animais', 'alimentos', 'estudo'], ['utensilios', 'eletros', 'animais'], ['alimentos', 'estudo', 'eletros']];
const tapTargetOffsets = {};
const reservedTapTargets = new Set();
for (let level = 0; level < 3; level++) for (const category of tapCategories[level]) {
  const offset = tapTargetOffsets[category] || 0;
  byCategory(category).slice(offset, offset + profiles[level].targets).forEach(item => reservedTapTargets.add(item.id));
  tapTargetOffsets[category] = offset + profiles[level].targets;
}
Object.keys(tapTargetOffsets).forEach(key => { tapTargetOffsets[key] = 0; });
const usedTapOptions = new Set();

const oddCategories = ['animais', 'alimentos', 'estudo', 'utensilios', 'eletros', 'casa', 'moveis', 'roupas', 'animais'];
const oddOffsets = {}, oddMembersByRound = [], reservedOddMembers = new Set();
for (const category of oddCategories) {
  const offset = oddOffsets[category] || 0;
  const members = byCategory(category).slice(offset, offset + 3);
  oddOffsets[category] = offset + 3;
  oddMembersByRound.push(members);
  members.forEach(item => reservedOddMembers.add(item.id));
}
const usedOddOptions = new Set();

for (let levelIndex = 0; levelIndex < profiles.length; levelIndex++) {
  const level = levelIndex + 1, profile = profiles[levelIndex];
  for (let round = 0; round < 3; round++) {
    const sourceIndex = profile.sourceStart + round;
    const ordinal = level;
    const pool = visualPools[levelIndex].slice(round * profile.search, (round + 1) * profile.search);
    const subject = pool[0];
    const wordSubject = objects[sourceIndex];
    function add(gameId, item) {
      rounds.push({ id: `${gameId}-p${String(ordinal).padStart(2, '0')}-r${round + 1}`,
        gameId, level, title: subject.label, ...item });
    }

    const observed = pool.slice(0, profile.observed);
    const observationOptions = [subject, ...pool.slice(profile.observed, profile.observed + profile.visualOptions - 1)];
    add('whatDidYouSee', { items: ids(observed), options: ids(observationOptions), answer: subject.id,
      prompt: 'Qual destes objetos apareceu?', hint: hints.visual[levelIndex] });
    add('word', { title: wordSubject.label, word: wordSubject.label.toLocaleUpperCase('pt-BR'), syllables: wordSubject.syllables, assetId: wordSubject.id,
      distractors: level === 3 ? ['ZU', 'XI'].filter(s => !wordSubject.syllables.includes(s)) : [],
      prompt: 'Organize as sílabas e depois verifique a palavra.',
      hint: level === 1 ? `A palavra começa com ${wordSubject.syllables[0]}.` : hints.language[levelIndex] });
    add('image', { direction: sourceIndex % 2 ? 'wordToImage' : 'imageToWord', assetId: subject.id,
      options: ids(pool.slice(0, profile.visualOptions)), answer: subject.id,
      prompt: sourceIndex % 2 ? 'Qual imagem representa esta palavra?' : 'Qual palavra representa esta imagem?', hint: hints.visual[levelIndex] });

    const oddIndex = levelIndex * 3 + round, category = oddCategories[oddIndex], members = oddMembersByRound[oddIndex];
    const odd = objects.find(item => item.category !== category && !reservedOddMembers.has(item.id) && !usedOddOptions.has(item.id));
    [...members, odd].forEach(item => usedOddOptions.add(item.id));
    add('odd', { title: groupLabels[category], category, options: ids([...members, odd]), answer: odd.id,
      prompt: `Três imagens são ${groupLabels[category]}. Qual não pertence a esse grupo?`,
      hint: level === 1 ? `Procure o único item fora do grupo: ${groupLabels[category]}.` : hints.reasoning[levelIndex] });

    const [a, b, c] = ids(pool.slice(0, 3));
    const pattern = level === 1 ? [a, b] : [a, b, c];
    if (level === 3) {
      const start = sourceIndex - 43, step = sourceIndex % 5 + 2;
      const sequence = Array.from({ length: 5 }, (_, i) => String(start + step * i));
      const answer = String(start + step * 5);
      add('sequence', { title: `Contando de ${step} em ${step}`, sequence, answer, rule: { type: 'addition', start, step },
        options: [answer, ...[1, 2, 3].map(delta => String(Number(answer) + delta))],
        prompt: 'Que número continua a sequência?', hint: hints.reasoning[levelIndex] });
    } else {
      add('sequence', { title: level === 1 ? 'Alternando objetos' : 'Três em três', sequence: [...pattern, ...pattern],
        answer: pattern[0], rule: { type: 'cycle', pattern }, options: pattern,
        prompt: 'Observe os dois ciclos. Qual desenho vem a seguir?', hint: hints.reasoning[levelIndex] });
    }

    const routine = routines[sourceIndex];
    add('routine', { ...routine, prompt: `Organize: ${routine.title.toLocaleLowerCase('pt-BR')}. Siga a ordem indicada pela tarefa.`,
      acceptedOrders: [routine.steps], hint: level === 1 ? `Comece por: ${routine.steps[0]}.` : hints.reasoning[levelIndex] });
    add('findObject', { options: ids(pool), answer: subject.id, prompt: `Encontre: ${subject.label}.`, hint: hints.visual[levelIndex] });

    const tapCategory = tapCategories[levelIndex][round], targetOffset = tapTargetOffsets[tapCategory] || 0;
    const targets = byCategory(tapCategory).slice(targetOffset, targetOffset + profile.targets);
    tapTargetOffsets[tapCategory] = targetOffset + profile.targets;
    const tapDistractors = objects.filter(item => item.category !== tapCategory && !reservedTapTargets.has(item.id) && !usedTapOptions.has(item.id))
      .slice(0, profile.search - profile.targets);
    [...targets, ...tapDistractors].forEach(item => usedTapOptions.add(item.id));
    add('tapOnly', { title: groupLabels[tapCategory], category: tapCategory, targets: ids(targets), options: ids([...targets, ...tapDistractors]),
      prompt: `Toque somente em ${groupLabels[tapCategory]}.`,
      hint: level === 1 ? `Marque todos os itens do grupo: ${groupLabels[tapCategory]}.` : hints.visual[levelIndex] });

    const situation = situations[sourceIndex];
    const situationOptions = closerSituationDistractors[sourceIndex] || situation.distractors;
    add('situations', { title: situation.question.split('. ')[0], prompt: situation.question, answer: situation.answer,
      options: [situation.answer, ...situationOptions.slice(0, profile.textOptions - 1)], hint: hints.language[levelIndex] });
    const sentence = sentences[sourceIndex];
    add('sentence', { title: sentence.answer, sentence: sentence.sentence, prompt: 'Escolha a palavra que completa a frase.',
      answer: sentence.answer, options: [sentence.answer, ...sentenceDistractors[sourceIndex]], hint: hints.language[levelIndex] });
  }
}

export const phaseBoards = Object.fromEntries(boards.map(item => [item.id, item]));
export const phaseRounds = Object.fromEntries(rounds.map(item => [item.id, item]));
export function getPhaseContent(phase) {
  const source = phase?.unit === 'board' ? phaseBoards : phaseRounds;
  if (!phase?.contentRefs?.every(ref => source[ref]?.gameId === phase.gameId)) return [];
  return phase.contentRefs.map(ref => structuredClone(source[ref]));
}
export function validateContentReferences(phases) {
  return phases.flatMap(phase => (phase.contentRefs || []).filter(ref => !(phase.unit === 'board' ? phaseBoards : phaseRounds)[ref]).map(ref => `${phase.id}: referência ausente ${ref}`));
}
