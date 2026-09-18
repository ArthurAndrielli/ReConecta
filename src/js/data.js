export const categories = [
  { id: 'memoria', name: 'Memória' },
  { id: 'linguagem', name: 'Linguagem' },
  { id: 'raciocinio', name: 'Raciocínio' },
  { id: 'atencao', name: 'Atenção' },
  { id: 'associacao', name: 'Associação' },
  { id: 'cotidiano', name: 'Cotidiano' }
];

export const games = [
  { id: 'memory', icon: 'apple', name: 'Jogo da Memória', category: 'memoria', group: 'memoria', cardDescription: 'Encontre os pares.', description: 'Observe, descubra e encontre os pares.' },
  { id: 'whatDidYouSee', icon: 'banana', name: 'O Que Você Viu?', category: 'memoria', cardDescription: 'Observe e reconheça.', description: 'Observe imagens e reconheça o que apareceu.' },
  { id: 'word', icon: 'dog', name: 'Monte a Palavra', category: 'linguagem', cardDescription: 'Organize as sílabas.', description: 'Organize as sílabas para formar uma palavra.' },
  { id: 'image', icon: 'ball', name: 'Imagem e Palavra', category: 'linguagem', cardDescription: 'Associe imagens e palavras.', description: 'Relacione imagens e palavras conhecidas.' },
  { id: 'odd', icon: 'house', name: 'Qual Não Combina?', category: 'raciocinio', cardDescription: 'Descubra o item diferente.', description: 'Encontre o item que pertence a outra categoria.' },
  { id: 'sequence', icon: 'cat', name: 'Complete a Sequência', category: 'raciocinio', cardDescription: 'Encontre o próximo elemento.', description: 'Observe o padrão e escolha a próxima peça.' },
  { id: 'routine', icon: 'window', name: 'Organize a Rotina', category: 'cotidiano', cardDescription: 'Coloque as etapas em ordem.', description: 'Coloque as etapas de uma rotina em ordem.' },
  { id: 'findObject', icon: 'chair', name: 'Encontre o Objeto', category: 'atencao', cardDescription: 'Localize o objeto pedido.', description: 'Encontre o objeto solicitado, no seu ritmo.' },
  { id: 'tapOnly', icon: 'car', name: 'Toque Somente em...', category: 'atencao', cardDescription: 'Selecione os objetos certos.', description: 'Selecione apenas os objetos da categoria indicada.' },
  { id: 'association', icon: 'orange', name: 'Associação de Objetos', category: 'associacao', cardDescription: 'Descubra o que combina.', description: 'Relacione cada objeto ao seu uso.' },
  { id: 'situations', icon: 'blue-circle', name: 'Situações do Cotidiano', category: 'cotidiano', cardDescription: 'Escolha a melhor ação.', description: 'Escolha uma ação adequada para cada situação.' },
  { id: 'sentence', icon: 'red-circle', name: 'Complete a Frase', category: 'linguagem', cardDescription: 'Escolha a palavra que falta.', description: 'Escolha a palavra que completa cada frase.' }
];
