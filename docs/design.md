ReConecta — Design

Versão: 1.0 — Aplicação acadêmica completa

1. Objetivo do design

Este documento descreve como o ReConecta será construído tecnicamente.

A solução deve permanecer simples, modular e fácil de explicar em um trabalho acadêmico.

Tecnologias da versão:

HTML5;

CSS3;

JavaScript puro;

ES Modules;

localStorage;

Live Server no VS Code.

Não serão utilizados frameworks JavaScript, backend ou banco de dados remoto nesta versão.

2. Arquitetura geral

O ReConecta será uma aplicação web do tipo SPA simples.

SPA significa Single Page Application.

A aplicação possuirá apenas um arquivo HTML principal:

index.html

O conteúdo interno da aplicação será trocado pelo JavaScript dentro de:

<main id="app"></main>

Fluxo geral:

index.html
   ↓
app.js
   ↓
Tela inicial
   ↓
Usuário escolhe uma atividade
   ↓
Módulo do jogo renderiza a atividade
   ↓
Usuário conclui
   ↓
storage.js registra progresso
   ↓
Usuário retorna ao início ou avança no treino

3. Estrutura de pastas

Estrutura proposta:

ReConecta/
│
├── index.html
├── README.md
│
├── docs/
│   ├── requirements.md
│   ├── design.md
│   └── tasks.md
│
└── src/
    ├── css/
    │   └── style.css
    │
    ├── assets/
    │
    └── js/
        ├── app.js
        ├── data.js
        ├── storage.js
        ├── levels.js
        ├── scoring.js
        ├── dailyTraining.js
        ├── evolution.js
        │
        ├── utils/
        │   ├── array.js
        │   ├── feedback.js
        │   └── time.js
        │
        └── games/
            ├── memory.js
            ├── whatDidYouSee.js
            ├── wordBuilder.js
            ├── imageWord.js
            ├── oddOneOut.js
            ├── sequence.js
            ├── organizeRoutine.js
            ├── findObject.js
            ├── tapOnly.js
            ├── objectAssociation.js
            ├── dailySituations.js
            └── completeSentence.js

A estrutura poderá ser simplificada durante o desenvolvimento se isso reduzir complexidade sem misturar responsabilidades.

4. Responsabilidade dos arquivos principais

4.1 index.html

Responsável somente pela estrutura base da página.

Deverá conter:

cabeçalho;

área principal #app;

rodapé;

link do CSS;

carregamento de app.js com type="module".

Não deverá conter a lógica dos jogos.

4.2 style.css

Responsável pela aparência.

Deverá conter:

variáveis visuais simples;

layout;

tipografia;

botões;

cards;

estados de foco;

feedback;

grids dos jogos;

responsividade.

A aparência deve priorizar simplicidade e legibilidade.

4.3 app.js

Responsável pela navegação da aplicação.

Funções sugeridas:

renderHome()
openGame(gameId)
renderProgressSummary()
renderEvolution()
startDailyTraining()
goHome()

O app.js não deve conter regras internas detalhadas de cada minijogo.

4.4 data.js

Responsável por centralizar o conteúdo dos exercícios.

Exemplo de estrutura:

export const words = [
  {
    word: "CASA",
    syllables: ["CA", "SA"],
    image: "🏠",
    level: 1
  }
];

Outros conjuntos poderão existir para:

memória;

imagens de curto prazo;

associação imagem-palavra;

categorias;

sequências;

rotinas;

objetos;

categorias de seleção;

associações;

situações;

frases.

4.5 storage.js

Responsável por todo acesso ao localStorage.

Nenhum jogo deverá chamar localStorage diretamente.

Chave sugerida:

reconecta_progress

Funções sugeridas:

getProgress()
saveProgress(progress)
registerAttempt(data)
registerActivity(result)
resetProgress()

4.6 levels.js

Responsável pelas regras de dificuldade.

Estrutura possível:

export const LEVELS = {
  1: {
    name: "Inicial",
    help: "high"
  },
  2: {
    name: "Fácil",
    help: "medium"
  },
  3: {
    name: "Intermediário",
    help: "low"
  },
  4: {
    name: "Avançado",
    help: "low"
  }
};

O número do nível poderá ficar oculto da interface.

4.7 scoring.js

Responsável pelo cálculo de estrelas.

Exemplo de regra simples:

atividade concluída → pelo menos 1 estrela
bom desempenho → 2 estrelas
excelente desempenho → 3 estrelas

O cálculo poderá considerar:

acertos;

erros;

tentativas;

conclusão.

O tempo não deverá ser usado de maneira punitiva.

4.8 dailyTraining.js

Responsável por criar e controlar o Treino de Hoje.

Deverá montar:

1 atividade de memória;

1 atividade de palavras;

1 atividade de raciocínio;

1 atividade de atenção;

1 atividade cotidiana.

O módulo deverá controlar o índice da atividade atual e avançar até completar as cinco.

4.9 evolution.js

Responsável por analisar o progresso.

Poderá calcular:

total de atividades;

acertos;

erros;

tentativas;

média por categoria;

categoria com maior facilidade;

categoria que precisa de mais prática;

recomendação simples.

5. Modelo de dados do progresso

Estrutura sugerida:

{
  atividadesRealizadas: 0,
  acertos: 0,
  erros: 0,
  tentativas: 0,
  tempoRespostaTotal: 0,
  estrelas: 0,
  nivelAtual: 1,

  desempenhoPorCategoria: {
    memoria: {
      atividades: 0,
      acertos: 0,
      erros: 0
    },

    linguagem: {
      atividades: 0,
      acertos: 0,
      erros: 0
    },

    atencao: {
      atividades: 0,
      acertos: 0,
      erros: 0
    },

    raciocinio: {
      atividades: 0,
      acertos: 0,
      erros: 0
    },

    associacao: {
      atividades: 0,
      acertos: 0,
      erros: 0
    },

    cotidiano: {
      atividades: 0,
      acertos: 0,
      erros: 0
    }
  }
}

A estrutura poderá evoluir, mas deverá permanecer legível.

6. Navegação

6.1 Tela inicial

A tela inicial deverá apresentar:

nome ReConecta;

boas-vindas;

instrução para escolher atividade;

card do Treino de Hoje;

resumo de progresso;

cards dos 12 minijogos;

acesso à evolução.

6.2 Tela de jogo

Cada jogo deverá possuir:

nome;

instrução;

conteúdo da atividade;

área de feedback;

botão de retorno;

controles específicos.

6.3 Tela de evolução

Deverá exibir informações de acompanhamento sem linguagem punitiva.

6.4 Treino diário

O treino utilizará a mesma área #app, mas controlará uma sequência de atividades.

7. Padrão comum dos jogos

Cada módulo de jogo deverá, sempre que possível, seguir uma interface semelhante.

Exemplo:

export function renderMemoryGame(context) {
  // renderiza e controla a atividade
}

O context poderá receber:

{
  level,
  onComplete,
  onBack,
  trainingMode
}

Isso permitirá reutilizar os mesmos jogos na tela normal e dentro do treino diário.

8. Design dos 12 minijogos

8.1 Jogo da Memória

Estrutura

As cartas serão armazenadas em array.

Exemplo:

[
  { id: 1, pair: "apple", value: "🍎" },
  { id: 2, pair: "apple", value: "🍎" },
  { id: 3, pair: "banana", value: "🍌" },
  { id: 4, pair: "banana", value: "🍌" }
]

Estado

O módulo poderá controlar:

firstCard
secondCard
locked
matchedPairs
attempts
errors
startTime

Fluxo

embaralhar
↓
mostrar cartas fechadas
↓
selecionar primeira
↓
selecionar segunda
↓
comparar
↓
manter abertas OU fechar
↓
repetir
↓
finalizar

8.2 O Que Você Viu?

Estado

phase
visibleItems
options
correctAnswer

Fluxo

mostrar imagens
↓
aguardar tempo definido
↓
ocultar imagens
↓
mostrar pergunta
↓
avaliar resposta

O tempo de exposição poderá diminuir gradualmente, sem virar mecanismo de pressão.

8.3 Monte a Palavra

Dados

{
  word: "BANANA",
  syllables: ["BA", "NA", "NA"],
  image: "🍌",
  level: 2
}

Estado

selectedSyllables
attempts
hintVisible

Interação

Os botões de sílabas serão selecionados em ordem.

O usuário poderá desfazer seleção.

Depois de tentativas incorretas, uma dica poderá destacar a primeira sílaba.

8.4 Imagem e Palavra

Dois modos:

imagem → palavra
palavra → imagem

Cada rodada terá:

prompt
options
correctAnswer
mode

8.5 Qual Não Combina?

Dados organizados por categoria.

Exemplo:

{
  items: ["🍎", "🍌", "🍊", "🚗"],
  correctAnswer: "🚗",
  category: "frutas"
}

Níveis avançados utilizarão categorias menos óbvias.

8.6 Complete a Sequência

Modelo possível:

{
  sequence: ["🔵", "🔴", "🔵", "🔴"],
  options: ["🔵", "🟢", "🟡"],
  answer: "🔵",
  level: 1
}

Também existirão sequências numéricas.

8.7 Organize a Rotina

Modelo:

{
  title: "Lavar as mãos",
  steps: [
    "Abrir a torneira",
    "Molhar as mãos",
    "Usar sabão",
    "Enxaguar",
    "Secar"
  ]
}

As etapas serão embaralhadas.

A interação principal poderá usar botões “subir” e “descer”, tornando a atividade acessível sem depender de drag and drop.

8.8 Encontre o Objeto

Modelo:

{
  instruction: "Encontre a maçã",
  target: "🍎",
  options: ["🍌", "🏠", "🐶", "🍎", "⚽", "🚗"]
}

O número e a semelhança das opções variam com o nível.

8.9 Toque Somente em...

Modelo:

{
  instruction: "Toque somente nas frutas",
  options: [
    { value: "🍎", correct: true },
    { value: "🐶", correct: false },
    { value: "🍌", correct: true },
    { value: "🚗", correct: false }
  ]
}

O jogo deverá aceitar múltiplas seleções.

8.10 Associação de Objetos

Modelo:

{
  pairs: [
    ["Escova", "Dentes"],
    ["Chave", "Porta"],
    ["Garfo", "Comida"]
  ]
}

Para manter simplicidade, a interação inicial poderá ser:

selecionar item da coluna esquerda;

selecionar item da coluna direita;

validar par.

Não é necessário desenhar linhas entre colunas na primeira implementação.

8.11 Situações do Cotidiano

Modelo:

{
  question: "Está chovendo. O que você deve usar?",
  options: ["Guarda-chuva", "Colher", "Travesseiro"],
  answer: "Guarda-chuva"
}

8.12 Complete a Frase

Modelo:

{
  sentence: "Eu bebo ______.",
  options: ["Água", "Cadeira", "Sapato"],
  answer: "Água"
}

Níveis superiores utilizarão frases maiores.

9. Sistema de níveis

O nível será obtido do progresso.

Exemplo:

const level = getCurrentLevel(progress);

Cada jogo decide como o nível afeta sua dificuldade.

Exemplos:

Memória:
1 → 4 cartas
2 → 6 cartas
3 → 8 cartas
4 → mais cartas ou imagens semelhantes

Monte a Palavra:
1 → 2 sílabas
2 → 3 sílabas
3 → palavras maiores
4 → distrações extras

Encontre o Objeto:
1 → poucas imagens
2 → mais imagens
3 → itens mais semelhantes
4 → maior complexidade visual

A progressão deverá ser gradual.

10. Pontuação

O sistema de estrelas deverá ser simples.

Exemplo de cálculo:

function calculateStars({ completed, errors, attempts }) {
  if (!completed) return 0;

  if (errors === 0) return 3;
  if (errors <= 2) return 2;

  return 1;
}

A regra poderá ser adaptada por jogo, mas deverá sempre valorizar a conclusão.

11. Feedback

Acerto

Mensagens possíveis:

[
  "Excelente!",
  "Muito bem!",
  "Você conseguiu!"
]

Erro

Mensagens possíveis:

[
  "Vamos tentar novamente.",
  "Quase lá!",
  "Tente mais uma vez."
]

Não utilizar mensagens como:

“Você perdeu”;

“Falhou”;

“Resposta ruim”.

12. Sistema de dicas

As dicas deverão ser usadas somente quando fizer sentido.

Exemplo no Monte a Palavra:

tentativa 1 → feedback
tentativa 2 → feedback + destacar primeira sílaba

Outros jogos poderão usar:

reduzir opções;

destacar categoria;

repetir instrução.

13. Treino Diário

13.1 Categorias

Mapeamento sugerido:

Memória:
- Jogo da Memória
- O Que Você Viu?

Palavras/Linguagem:
- Monte a Palavra
- Imagem e Palavra
- Complete a Frase

Raciocínio:
- Qual Não Combina?
- Complete a Sequência

Atenção:
- Encontre o Objeto
- Toque Somente em...

Cotidiano:
- Organize a Rotina
- Situações do Cotidiano
- Associação de Objetos

13.2 Estrutura da sessão

{
  activities: [
    {...},
    {...},
    {...},
    {...},
    {...}
  ],
  currentIndex: 0,
  completed: false
}

13.3 Fluxo

Treino de Hoje
↓
atividade 1
↓
atividade 2
↓
atividade 3
↓
atividade 4
↓
atividade 5
↓
Parabéns! Você concluiu o treino de hoje.

14. Evolução e recomendação

14.1 Métrica por categoria

Uma métrica simples poderá usar:

taxa de acerto = acertos / tentativas

Quando não houver tentativas suficientes, o sistema não deverá tirar conclusões fortes.

14.2 Maior facilidade

Categoria com melhor taxa de acerto entre categorias com dados suficientes.

14.3 Categoria que precisa de mais prática

Categoria com menor taxa de acerto entre categorias com dados suficientes.

Na interface, preferir expressões como:

“Categoria para praticar mais”

em vez de:

“Pior categoria”

14.4 Recomendação

A recomendação poderá priorizar uma atividade da categoria que precisa de mais prática e combinar com outras categorias para manter variedade.

15. Acessibilidade

A aplicação deverá:

usar botões <button>;

usar cabeçalhos em ordem lógica;

possuir aria-live na área de feedback quando adequado;

possuir foco visível;

permitir navegação por teclado;

evitar controles que dependam somente de arrastar;

usar textos claros;

usar áreas clicáveis grandes;

não comunicar resultado somente por cor.

16. Responsividade

Estratégia:

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

Em telas pequenas:

cards ocupam largura disponível;

controles ficam empilhados quando necessário;

cartas e botões reduzem de tamanho sem ficar difíceis de tocar;

não deve existir rolagem horizontal.

17. Tratamento de estado

Cada jogo deverá manter seu estado apenas enquanto estiver ativo.

Exemplo:

let state = {
  attempts: 0,
  errors: 0,
  correct: 0,
  startTime: Date.now()
};

Ao concluir:

onComplete({
  attempts,
  errors,
  correct,
  elapsedTime,
  category
});

O módulo externo registra o resultado no progresso.

18. Estratégia de testes

Cada jogo deverá ser testado em pelo menos:

abertura;

instrução;

resposta correta;

resposta incorreta;

feedback;

conclusão;

registro de progresso;

retorno ao início;

tela pequena.

Testes gerais:

persistência após F5;

reset;

navegação;

treino diário;

evolução;

níveis;

estrelas;

console sem erros críticos.

19. Decisões técnicas

JavaScript puro

Escolhido para manter o projeto simples e adequado a um primeiro trabalho acadêmico.

ES Modules

Permitem separar responsabilidades sem precisar de frameworks.

localStorage

Adequado para uma versão local e acadêmica.

Limitação: os dados ficam somente no navegador/dispositivo atual.

Emojis e recursos simples

Podem ser usados inicialmente para reduzir dependência de arquivos externos.

Imagens reais poderão ser adicionadas em src/assets/ posteriormente.

SPA simples

Evita múltiplas páginas e centraliza a navegação no JavaScript.

20. Limitações desta arquitetura

não existe conta de usuário;

os dados não sincronizam entre dispositivos;

limpar dados do navegador pode apagar o progresso;

não existe banco remoto;

não existe áudio nesta versão;

recomendações serão baseadas em regras simples, não em inteligência artificial.

Essas limitações são aceitáveis para o escopo acadêmico atual.

21. Evolução futura

A arquitetura deverá permitir futuramente adicionar:

áudio;

reconhecimento de voz;

exercícios com sons;

novos temas;

personalização;

criação de atividades por profissionais;

sistema inteligente mais avançado de recomendação.