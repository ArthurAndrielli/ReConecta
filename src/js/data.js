export const games = [
  { id: 'memory', icon: '🧠', name: 'Jogo da Memória' },
  { id: 'whatDidYouSee', icon: '👀', name: 'O Que Você Viu?' },
  { id: 'word', icon: '🔤', name: 'Monte a Palavra' },
  { id: 'image', icon: '🖼️', name: 'Imagem e Palavra' },
  { id: 'odd', icon: '🔎', name: 'Qual Não Combina?' },
  { id: 'sequence', icon: '🔢', name: 'Complete a Sequência' },
  { id: 'routine', icon: '🧼', name: 'Organize a Rotina' },
  { id: 'findObject', icon: '🔍', name: 'Encontre o Objeto' },
  { id: 'tapOnly', icon: '🍎', name: 'Toque Somente em...' },
  { id: 'association', icon: '🔗', name: 'Associação de Objetos' },
  { id: 'situations', icon: '🌦️', name: 'Situações do Cotidiano' },
  { id: 'sentence', icon: '💬', name: 'Complete a Frase' }
];

export const memoryCards = ['🍎', '🍎', '🍌', '🍌'];
export const memoryCardsByLevel = {
  1: memoryCards,
  2: ['🍎', '🍎', '🍌', '🍌', '🍇', '🍇'],
  3: ['🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍉', '🍉'],
  4: ['🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍉', '🍉', '🍐', '🍐']
};

export const whatDidYouSeeRounds = [
  { level: 1, items: ['🍎', '🍌'], options: ['🍎', '🍌'], answer: '🍌' },
  { level: 2, items: ['🍎', '🍌', '🍇'], options: ['🍎', '🍌', '🍇', '🍉'], answer: '🍇' },
  { level: 3, items: ['🍎', '🍌', '🍇', '🍉'], options: ['🍎', '🍌', '🍇', '🍉', '🍐'], answer: '🍉' },
  { level: 4, items: ['🍎', '🍌', '🍇', '🍉', '🍐'], options: ['🍎', '🍌', '🍇', '🍉', '🍐', '🍓'], answer: '🍐' }
];

export const wordRounds = [
  { level: 1, word: 'CASA', syllables: ['CA', 'SA'], image: '🏠' },
  { level: 2, word: 'BANANA', syllables: ['BA', 'NA', 'NA'], image: '🍌' },
  { level: 3, word: 'MACACO', syllables: ['MA', 'CA', 'CO'], image: '🐒', distractors: ['SA', 'LA'] },
  { level: 4, word: 'BORBOLETA', syllables: ['BOR', 'BO', 'LE', 'TA'], image: '🦋', distractors: ['CA', 'MA', 'NA'] }
];

export const imageWordRounds = [
  { mode: 'imageToWord', prompt: '🍎', promptLabel: 'Imagem de uma maçã', options: ['Maçã', 'Banana', 'Casa'], answer: 'Maçã' },
  { mode: 'wordToImage', prompt: 'Banana', promptLabel: 'Palavra Banana', options: ['🍎', '🍌', '🏠'], answer: '🍌' }
];

export const oddOneOutRounds = [
  { level: 1, items: ['🍎', '🍌', '🍊', '🚗'], answer: '🚗' },
  { level: 3, items: ['🐶', '🐱', '🐭', '🍎'], answer: '🍎' }
];
