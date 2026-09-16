export const categories = [
  { id: 'memoria', name: 'Memória' },
  { id: 'linguagem', name: 'Linguagem' },
  { id: 'raciocinio', name: 'Raciocínio' },
  { id: 'atencao', name: 'Atenção' },
  { id: 'associacao', name: 'Associação' },
  { id: 'cotidiano', name: 'Cotidiano' }
];

export const games = [
  { id: 'memory', icon: 'cards', name: 'Jogo da Memória', category: 'memoria', group: 'memoria', description: 'Observe, descubra e encontre os pares.' },
  { id: 'whatDidYouSee', icon: 'eye', name: 'O Que Você Viu?', category: 'memoria', description: 'Observe imagens e reconheça o que apareceu.' },
  { id: 'word', icon: 'letters', name: 'Monte a Palavra', category: 'linguagem', description: 'Organize as sílabas para formar uma palavra.' },
  { id: 'image', icon: 'image', name: 'Imagem e Palavra', category: 'linguagem', description: 'Relacione imagens e palavras conhecidas.' },
  { id: 'odd', icon: 'search', name: 'Qual Não Combina?', category: 'raciocinio', description: 'Encontre o item que pertence a outra categoria.' },
  { id: 'sequence', icon: 'sequence', name: 'Complete a Sequência', category: 'raciocinio', description: 'Observe o padrão e escolha a próxima peça.' },
  { id: 'routine', icon: 'routine', name: 'Organize a Rotina', category: 'cotidiano', description: 'Coloque as etapas de uma rotina em ordem.' },
  { id: 'findObject', icon: 'target', name: 'Encontre o Objeto', category: 'atencao', description: 'Encontre rapidamente o objeto solicitado.' },
  { id: 'tapOnly', icon: 'target', name: 'Toque Somente em...', category: 'atencao', description: 'Selecione apenas os objetos da categoria indicada.' },
  { id: 'association', icon: 'link', name: 'Associação de Objetos', category: 'associacao', description: 'Relacione cada objeto ao seu uso.' },
  { id: 'situations', icon: 'home', name: 'Situações do Cotidiano', category: 'cotidiano', description: 'Escolha uma ação adequada para cada situação.' },
  { id: 'sentence', icon: 'message', name: 'Complete a Frase', category: 'linguagem', description: 'Escolha a palavra que completa cada frase.' }
];

export const levelSettings = {
  memory: { 1: { cards: 4 }, 2: { cards: 6 }, 3: { cards: 8 }, 4: { cards: 12 } },
  whatDidYouSee: { 1: { items: 2, options: 2 }, 2: { items: 3, options: 3 }, 3: { items: 4, options: 4 }, 4: { items: 5, options: 4 } },
  word: { 1: { syllables: 2 }, 2: { syllables: 3 }, 3: { syllables: 3 }, 4: { syllables: 4 } },
  findObject: { 1: { options: 4 }, 2: { options: 6 }, 3: { options: 8 }, 4: { options: 9 } },
  tapOnly: { 1: { options: 4 }, 2: { options: 6 }, 3: { options: 8 }, 4: { options: 9 } },
  association: { 1: { pairs: 2 }, 2: { pairs: 3 }, 3: { pairs: 4 }, 4: { pairs: 5 } }
};

export const memoryCards = ['🍎', '🍎', '🍌', '🍌'];
export const memoryCardsByLevel = {
  1: memoryCards,
  2: ['🍎', '🍎', '🍌', '🍌', '🍇', '🍇'],
  3: ['🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍉', '🍉'],
  4: ['🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍉', '🍉', '🍐', '🍐', '🍓', '🍓']
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

export const sentenceRounds = [
  { level: 1, sentence: 'Eu bebo ______.', options: ['Água', 'Cadeira', 'Sapato'], answer: 'Água' },
  { level: 2, sentence: 'Eu durmo na ______.', options: ['Cama', 'Mesa', 'Janela'], answer: 'Cama' },
  { level: 3, sentence: 'Quando está chovendo, eu uso um ______ para não me molhar.', options: ['Guarda-chuva', 'Garfo', 'Travesseiro'], answer: 'Guarda-chuva' },
  { level: 4, sentence: 'Antes de dormir, eu escovo os ______ e guardo meus brinquedos.', options: ['Dentes', 'Sapatos', 'Pratos'], answer: 'Dentes' }
];
