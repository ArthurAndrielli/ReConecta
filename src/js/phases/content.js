import { objects, groupLabels } from './objects.js';
import { routines, situations, sentences } from './editorial.js';

const pick = (items, start, count) => Array.from({ length: count }, (_, i) => items[(start + i) % items.length]);
const ids = items => items.map(item => item.id);
const optionCount = [2, 3, 4, 4];
const textCount = [2, 3, 3, 4];
const selectCount = [4, 6, 8, 9];
const categoryPool = ['animais', 'alimentos', 'estudo', 'utensilios', 'eletros'];
const byCategory = name => objects.filter(item => item.category === name);
function combination(items, rank, size) {
  const combinations = [];
  function visit(start, chosen) {
    if (chosen.length === size) { combinations.push(chosen); return; }
    for (let i = start; i <= items.length - (size - chosen.length); i++) visit(i + 1, [...chosen, items[i]]);
  }
  visit(0, []);
  return combinations[rank % combinations.length];
}
const relations = [
  ['Chave','Abrir uma fechadura'], ['Garfo','Espetar alimentos'], ['Cama','Deitar para dormir'],
  ['Sapato','Calçar os pés'], ['Livro','Ler histórias'], ['Guarda-chuva','Proteger da chuva'],
  ['Relógio','Consultar as horas'], ['Panela','Cozinhar uma sopa'], ['Tesoura','Cortar papel'],
  ['Caneta','Escrever com tinta'], ['Toalha','Secar as mãos'], ['Vassoura','Varrer o chão'],
  ['Calendário','Consultar datas'], ['Mochila','Transportar livros nas costas'], ['Geladeira','Manter alimentos frios'],
  ['Telefone','Fazer ligações'], ['Travesseiro','Apoiar a cabeça ao dormir'], ['Regador','Molhar a terra das plantas'],
  ['Martelo','Bater em pregos'], ['Envelope','Envolver uma carta']
];
const boards = [];
const rounds = [];
for (let n = 0; n < 20; n++) {
  const level = Math.floor(n / 5) + 1;
  const memoryItems = ids(combination(objects.slice(0, 30), n + level * 7, [2, 3, 4, 6][level - 1]));
  boards.push({ id: `memory-board-${String(n + 1).padStart(2, '0')}`, gameId: 'memory', level,
    title: memoryItems.map(id => objects.find(o => o.id === id).label).slice(0, 2).join(' e '), items: memoryItems,
    hint: 'Vire uma carta de cada vez e procure outra com o mesmo desenho.' });
  const pairs = pick(relations, n, [2, 3, 4, 5][level - 1]);
  boards.push({ id: `association-board-${String(n + 1).padStart(2, '0')}`, gameId: 'association', level,
    title: `${pairs[0][0]} e suas relações`, pairs, hint: 'Pense na finalidade de cada objeto antes de escolher sua combinação.' });
}
for (let index = 0; index < 60; index++) {
  const level = Math.floor(index / 15) + 1;
  const ordinal = Math.floor(index / 3) + 1;
  const subject = objects[index];
  const others = objects.filter(o => o.id !== subject.id);
  function add(gameId, item) {
    rounds.push({ id: `${gameId}-p${String(ordinal).padStart(2, '0')}-r${index % 3 + 1}`,
      gameId, level, title: subject.label, ...item });
  }
  const observed = [subject, ...pick(others, index + 7, level)];
  const observationOptions = [subject, ...pick(objects.filter(o => !observed.includes(o)), index, optionCount[level - 1] - 1)];
  add('whatDidYouSee', { items: ids(observed), options: ids(observationOptions), answer: subject.id,
    prompt: 'Qual destes objetos apareceu?', hint: 'Lembre dos desenhos que você acabou de observar. Só um deles está entre as opções.' });
  add('word', { word: subject.label.toLocaleUpperCase('pt-BR'), syllables: subject.syllables, assetId: subject.id,
    distractors: level === 4 ? ['ZU', 'XI'].filter(s => !subject.syllables.includes(s)) : [],
    prompt: 'Organize as sílabas e depois verifique a palavra.', hint: `A palavra começa com ${subject.syllables[0]}.` });
  add('image', { direction: index % 2 ? 'wordToImage' : 'imageToWord', assetId: subject.id,
    options: ids([subject, ...pick(others, index + 13, optionCount[level - 1] - 1)]), answer: subject.id,
    prompt: index % 2 ? 'Qual imagem representa esta palavra?' : 'Qual palavra representa esta imagem?',
    hint: 'Compare a referência com cada alternativa.' });
  const category = categoryPool[index % categoryPool.length];
  const matching = byCategory(category);
  // Avoid dual-use distractors (e.g. a calculator is both school material
  // and an electrical appliance). These classes have clearly different uses.
  const outside = objects.filter(o => o.category !== category && ['animais', 'alimentos', 'roupas', 'moveis'].includes(o.category));
  const members = combination(matching, Math.floor(index / 5), 3);
  const odd = outside[(index * 3) % outside.length];
  add('odd', { title: groupLabels[category], category, options: ids([...members, odd]), answer: odd.id,
    prompt: `Três imagens são ${groupLabels[category]}. Qual não pertence a esse grupo?`,
    hint: `Procure o único item fora do grupo: ${groupLabels[category]}.` });
  const a = objects[(index * 2) % 60].id, b = objects[(index * 2 + 1) % 60].id, c = objects[(index * 2 + 2) % 60].id;
  const pattern = level === 1 ? [a, b] : level === 2 ? [a, b, c] : index % 2 ? [a, b, b] : [a, a, b];
  if (level === 4) {
    const start = index - 43, step = index % 5 + 2;
    const sequence = Array.from({ length: 5 }, (_, i) => String(start + step * i));
    const answer = String(start + step * 5);
    add('sequence', { title: `Contando de ${step} em ${step}`, sequence, answer, rule: { type: 'addition', start, step },
      options: [answer, ...[1, 2, 3].map(d => String(Number(answer) + d))],
      prompt: 'Que número continua a sequência?', hint: `Some ${step} a cada número para encontrar o próximo.` });
  } else {
    add('sequence', { title: level === 1 ? 'Alternando objetos' : level === 2 ? 'Três em três' : 'Uma repetição a mais',
      sequence: [...pattern, ...pattern], answer: pattern[0], rule: { type: 'cycle', pattern },
      options: [...new Set([...pattern, c])].slice(0, [2, 3, 3][level - 1]),
      prompt: 'Observe os dois ciclos. Qual desenho vem a seguir?', hint: 'Compare a primeira parte com a segunda. O mesmo grupo se repete.' });
  }
  const routine = routines[index];
  add('routine', { ...routine, prompt: `Organize: ${routine.title.toLocaleLowerCase('pt-BR')}. Siga a ordem indicada pela tarefa.`,
    acceptedOrders: routine.title === 'Arrumar a mesa' ? [routine.steps, [routine.steps[0], routine.steps[1], routine.steps[3], routine.steps[2], routine.steps[4]]] : [routine.steps],
    hint: `Comece por: ${routine.steps[0]}.` });
  add('findObject', { options: ids([subject, ...pick(others, index + 9, selectCount[level - 1] - 1)]), answer: subject.id,
    prompt: `Encontre: ${subject.label}.`, hint: 'Observe o formato de cada desenho e compare com o nome pedido.' });
  const targets = combination(matching, Math.floor(index / 5), [2, 3, 3, 4][level - 1]);
  add('tapOnly', { title: groupLabels[category], category, targets: ids(targets),
    options: ids([...targets, ...pick(outside, index, selectCount[level - 1] - targets.length)]),
    prompt: `Toque somente em ${groupLabels[category]}.`, hint: `Marque todos os itens do grupo: ${groupLabels[category]}. Os acertos ficam marcados.` });
  const situation = situations[index];
  add('situations', { title: situation.question.split('. ')[0], prompt: situation.question, answer: situation.answer,
    options: [situation.answer, ...situation.distractors.slice(0, textCount[level - 1] - 1)],
    hint: 'Leia o objetivo da situação. Escolha a ação que ajuda a realizá-lo.' });
  const sentence = sentences[index];
  // Distractors have incompatible meanings, reviewed separately from the answer.
  const distractors = ['parafuso', 'nuvem', 'tijolo'].filter(word => word !== sentence.answer);
  add('sentence', { title: sentence.answer, sentence: sentence.sentence, prompt: 'Escolha a palavra que completa a frase.',
    answer: sentence.answer, options: [sentence.answer, ...distractors.slice(0, textCount[level - 1] - 1)],
    hint: 'Leia a frase inteira e pense no objeto ou na ação descrita.' });
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
