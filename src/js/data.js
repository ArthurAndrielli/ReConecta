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
  { id: 'findObject', icon: 'target', name: 'Encontre o Objeto', category: 'atencao', description: 'Encontre o objeto solicitado, no seu ritmo.' },
  { id: 'tapOnly', icon: 'target', name: 'Toque Somente em...', category: 'atencao', description: 'Selecione apenas os objetos da categoria indicada.' },
  { id: 'association', icon: 'link', name: 'Associação de Objetos', category: 'associacao', description: 'Relacione cada objeto ao seu uso.' },
  { id: 'situations', icon: 'home', name: 'Situações do Cotidiano', category: 'cotidiano', description: 'Escolha uma ação adequada para cada situação.' },
  { id: 'sentence', icon: 'message', name: 'Complete a Frase', category: 'linguagem', description: 'Escolha a palavra que completa cada frase.' }
];

export const levelSettings = {
  memory: { 1: { cards: 4 }, 2: { cards: 6 }, 3: { cards: 8 }, 4: { cards: 12 } },
  whatDidYouSee: { 1: { items: 2, options: 2 }, 2: { items: 3, options: 3 }, 3: { items: 4, options: 4 }, 4: { items: 5, options: 4 } },
  word: { 1: { syllables: 2 }, 2: { syllables: 3 }, 3: { syllables: 4 }, 4: { syllables: 5 } },
  findObject: { 1: { options: 4 }, 2: { options: 6 }, 3: { options: 8 }, 4: { options: 9 } },
  tapOnly: { 1: { options: 4 }, 2: { options: 6 }, 3: { options: 8 }, 4: { options: 9 } },
  association: { 1: { pairs: 2 }, 2: { pairs: 3 }, 3: { pairs: 4 }, 4: { pairs: 5 } }
};
