ReConecta — Design Técnico

1. Arquitetura

O MVP usará uma arquitetura front-end simples, dividida em três camadas:

HTML — estrutura principal da aplicação;

CSS — identidade visual, layout e responsividade;

JavaScript — navegação, estado, regras dos jogos e armazenamento local.

Não haverá back-end nesta versão.

2. Estrutura de pastas

ReConecta/
├── index.html
├── README.md
├── docs/
│   ├── requerimentos.md
│   ├── design.md
│   └── tasks.md
└── src/
    ├── css/
    │   └── style.css
    ├── js/
    │   ├── app.js
    │   ├── storage.js
    │   └── games/
    │       ├── memory.js
    │       ├── wordBuilder.js
    │       ├── imageWord.js
    │       ├── oddOneOut.js
    │       └── sequence.js
    └── assets/

3. Fluxo de navegação

Tela inicial
   ↓
Escolha de minijogo
   ↓
Atividade
   ↓
Feedback / conclusão
   ↓
Jogar novamente ou voltar ao menu

4. Componentes principais

4.1 app.js

Responsável por:

montar a tela inicial;

controlar qual jogo está ativo;

abrir os módulos dos jogos;

atualizar o painel de progresso;

exibir mensagens globais de feedback.

4.2 storage.js

Responsável por salvar e recuperar o progresso usando localStorage.

Estrutura sugerida:

{
  completedGames: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
  stars: 0
}

4.3 Módulos de jogos

Cada arquivo exporta uma função render(container, callbacks).

O módulo recebe:

o elemento onde deve desenhar a atividade;

callbacks para registrar acertos, erros e conclusão;

callback para voltar ao menu.

Isso reduz o acoplamento entre os jogos e a aplicação principal.

5. Estado da aplicação

O estado em memória conterá apenas informações da atividade atual. O histórico geral será salvo em localStorage.

Exemplo:

const state = {
  currentGame: null,
  attempts: 0,
  correct: 0,
  wrong: 0
};

6. Design de interface

A interface terá:

cabeçalho com nome do projeto;

cartão de progresso;

grade com cinco jogos;

área central para atividade;

botões grandes;

feedback textual visível;

uso de emojis no MVP para evitar dependência inicial de banco de imagens.

7. Regras de feedback

Acerto

O sistema poderá sortear uma destas mensagens:

Excelente!

Muito bem!

Você conseguiu!

Erro

O sistema poderá sortear:

Vamos tentar novamente.

Quase lá!

Tente mais uma vez.

8. Estrelas

Para manter a proposta de incentivo:

3 estrelas: concluiu sem erros;

2 estrelas: concluiu com até 2 erros;

1 estrela: concluiu com 3 ou mais erros.

O tempo não será usado para pressionar o usuário.

9. Decisões técnicas

JavaScript puro

Escolhido porque é adequado para um trabalho acadêmico inicial, reduz configuração e permite demonstrar claramente DOM, eventos, arrays, funções, módulos e armazenamento local.

ES Modules

Os scripts usarão type="module", permitindo separar responsabilidades em arquivos.

Sem banco de dados

O MVP salva apenas progresso local. Uma versão posterior poderá usar API e banco de dados.

10. Evolução futura

A arquitetura permite adicionar:

novos jogos;

níveis de dificuldade;

áudio;

banco de dados;

autenticação;

painel de acompanhamento;

criação de atividades por profissionais;

recomendação automática de exercícios.