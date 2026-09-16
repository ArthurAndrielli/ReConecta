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

export const sequenceRounds = [
  { level: 1, sequence: ['🔵', '🔴', '🔵', '🔴'], options: ['🔵', '🟢', '🟡'], answer: '🔵' },
  { level: 2, sequence: ['🔵', '🔴', '🟢', '🔵', '🔴'], options: ['🟢', '🟡', '🔵'], answer: '🟢' },
  { level: 3, sequence: ['1', '2', '3', '4'], options: ['5', '6', '7'], answer: '5' },
  { level: 4, sequence: ['2', '4', '8', '16'], options: ['18', '24', '32'], answer: '32' }
];

export const routineRounds = [
  { level: 1, title: 'Lavar as mãos', steps: ['Abrir a torneira', 'Molhar as mãos', 'Usar sabão', 'Enxaguar', 'Secar'] },
  { level: 2, title: 'Beber água', steps: ['Pegar o copo', 'Abrir a torneira', 'Encher o copo', 'Beber a água'] },
  { level: 3, title: 'Escovar os dentes', steps: ['Pegar a escova', 'Colocar pasta', 'Escovar os dentes', 'Enxaguar a boca'] },
  { level: 4, title: 'Preparar uma refeição', steps: ['Separar os ingredientes', 'Lavar os alimentos', 'Preparar a refeição', 'Servir a comida'] },
  { level: 5, title: 'Colocar uma roupa', steps: ['Escolher a roupa', 'Vestir a camiseta', 'Vestir a calça', 'Calçar os sapatos'] }
];

export const findObjectRounds = [
  { level: 1, instruction: 'Encontre a maçã', target: '🍎', options: ['🍎', '🏠', '🐶'] },
  { level: 2, instruction: 'Encontre o cachorro', target: '🐶', options: ['🍎', '🐶', '🚗', '🏠', '⚽'] },
  { level: 3, instruction: 'Encontre a fruta', target: '🍐', options: ['🍎', '🍐', '🍏', '🍈', '🥝', '🍋'] },
  { level: 4, instruction: 'Encontre o limão', target: '🍋', options: ['🍋', '🍊', '🍈', '🥝', '🍐', '🍏', '🍎'] }
];

export const tapOnlyRounds = [
  { level: 1, instruction: 'Toque somente nas frutas', options: [{ value: '🍎', correct: true }, { value: '🐶', correct: false }, { value: '🍌', correct: true }, { value: '🚗', correct: false }] },
  { level: 3, instruction: 'Toque somente nos animais', options: [{ value: '🐶', correct: true }, { value: '🐱', correct: true }, { value: '🍎', correct: false }, { value: '🏠', correct: false }, { value: '🐭', correct: true }] }
];

export const associationRounds = [
  { level: 1, pairs: [['Escova', 'Dentes'], ['Chave', 'Porta'], ['Garfo', 'Comida'], ['Cama', 'Dormir'], ['Sapato', 'Pé']] },
  { level: 3, pairs: [['Livro', 'Ler'], ['Guarda-chuva', 'Chuva'], ['Relógio', 'Hora'], ['Panela', 'Cozinhar']] }
];

export const dailySituationRounds = [
  { question: 'Está chovendo. O que você deve usar?', options: ['Guarda-chuva', 'Colher', 'Travesseiro'], answer: 'Guarda-chuva' },
  { question: 'Você quer beber água. O que deve pegar?', options: ['Copo', 'Sapato', 'Livro'], answer: 'Copo' },
  { question: 'Está frio. O que você deve vestir?', options: ['Casaco', 'Chinelo', 'Óculos de sol'], answer: 'Casaco' }
];
