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
  { level: 2, items: ['🍎', '🍌', '🍇'], options: ['🍎', '🍌', '🍇', '🍉'], answer: '🍇' }
];
