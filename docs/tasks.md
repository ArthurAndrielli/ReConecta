ReConecta — Plano de Tarefas

Versão: 1.0 — Aplicação acadêmica completa

Objetivo deste documento

Este arquivo organiza o desenvolvimento do ReConecta em tarefas pequenas, sequenciais e testáveis.

A proposta é desenvolver seguindo SDD: requisitos → design → tarefas → implementação → testes → validação.

Regra de conclusão

Uma tarefa só pode ser marcada como concluída quando:

o código necessário tiver sido criado ou alterado;

o comportamento esperado tiver sido validado;

não houver erro conhecido que impeça a funcionalidade;

o tasks.md tiver sido atualizado;

o commit da tarefa tiver sido criado.

Status

pendente

concluída e validada

Padrão de commit

Cada tarefa concluída deve gerar um commit separado:

feat: implementa a task 01
feat: implementa a task 02
feat: implementa a task 03

Não agrupar várias tasks no mesmo commit.

FASE 1 — Preparação

T01 — Validar a pasta principal

Concluída

Objetivo: confirmar que o workspace aberto no VS Code é ReConecta.

Critério de conclusão: todo o projeto será criado dentro dessa pasta.

T02 — Inicializar o Git

Concluída

Ações: verificar se existe .git; se não existir, executar git init; conferir git status.

Critério de conclusão: a pasta é reconhecida como repositório Git.

T03 — Criar a estrutura principal

Concluída

Criar:

ReConecta/
├── docs/
├── src/
│   ├── css/
│   ├── js/
│   │   ├── games/
│   │   └── utils/
│   └── assets/

Critério de conclusão: todas as pastas aparecem corretamente no Explorer.

FASE 2 — Documentação SDD

T04 — Criar docs/requerimentos.md

Concluída

Documentar objetivo, escopo, requisitos funcionais e não funcionais, regras dos 12 minijogos, níveis, pontuação, feedback, treino diário, evolução e funcionalidades futuras.

Critério de conclusão: o documento explica claramente o que o sistema deve fazer.

T05 — Criar docs/design.md

Concluída

Documentar arquitetura, SPA, módulos, pastas, armazenamento, dados, navegação, acessibilidade, responsividade, níveis e pontuação.

Critério de conclusão: o documento explica como o sistema será construído.

T06 — Revisar coerência entre requisitos, design e tasks

Concluída

Critério de conclusão: nenhuma funcionalidade exigida ficou sem representação nos documentos.

FASE 3 — Base da aplicação

T07 — Criar index.html

Concluída

Implementar HTML5, lang="pt-BR", UTF-8, viewport, título, CSS, <main id="app"></main> e script ES Module.

Critério de conclusão: abre pelo Live Server sem erros.

T08 — Criar src/css/style.css

Concluída

Criar estilos base para corpo, cabeçalho, cards, botões, mensagens, controles e telas dos jogos.

Critério de conclusão: a aplicação possui aparência consistente.

T09 — Criar src/js/app.js

Concluída

Responsável pela navegação principal, tela inicial, abertura dos jogos, retorno ao início e atualização do progresso.

Critério de conclusão: a aplicação renderiza conteúdo em #app.

T10 — Criar src/js/data.js

Concluída

Centralizar palavras, sílabas, imagens/emoji, categorias, sequências, rotinas, associações, situações e frases.

Critério de conclusão: dados fixos não ficam espalhados pelos módulos.

T11 — Criar utilidades compartilhadas

Concluída

Criar funções para embaralhar arrays, selecionar itens aleatórios e gerar mensagens de feedback.

Critério de conclusão: funções genéricas não ficam duplicadas.

FASE 4 — Tela inicial e navegação

T12 — Criar cabeçalho

Concluída

Mostrar nome ReConecta e subtítulo simples.

T13 — Criar mensagem de boas-vindas

Concluída

Mostrar orientação curta para escolher uma atividade.

T14 — Criar cards dos 12 minijogos

Concluída

Exibir:

Jogo da Memória

O Que Você Viu?

Monte a Palavra

Imagem e Palavra

Qual Não Combina?

Complete a Sequência

Organize a Rotina

Encontre o Objeto

Toque Somente em...

Associação de Objetos

Situações do Cotidiano

Complete a Frase

Critério de conclusão: os 12 jogos aparecem na tela inicial.

T15 — Criar navegação SPA

Concluída

Trocar telas sem múltiplos arquivos HTML.

T16 — Criar botão “← Voltar ao início”

Concluída

Critério de conclusão: qualquer atividade permite retornar à tela inicial.

FASE 5 — Progresso e armazenamento

T17 — Criar storage.js

Concluída

Centralizar todo acesso ao localStorage.

T18 — Definir modelo de progresso

Concluída

Estrutura mínima:

{
  atividadesRealizadas: 0,
  acertos: 0,
  erros: 0,
  tentativas: 0,
  tempoRespostaTotal: 0,
  estrelas: 0,
  nivelAtual: 1,
  desempenhoPorCategoria: {}
}

T19 — Criar leitura e gravação de progresso

Concluída

Critério de conclusão: atualizar a página não apaga os dados.

T20 — Registrar atividade concluída

Concluída

Registrar categoria, acertos, erros, tentativas, tempo e nível.

T21 — Criar reset de progresso

Concluída

Pedir confirmação antes de apagar.

T22 — Criar resumo de evolução na tela inicial

Concluída

Mostrar atividades, acertos, erros, estrelas e nível atual.

FASE 6 — Níveis

T23 — Criar modelo de níveis

Concluída

Implementar internamente:

Nível 1 — Inicial

Nível 2 — Fácil

Nível 3 — Intermediário

Nível 4 — Avançado

T24 — Criar regras de progressão

Concluída

Considerar atividades, acertos, erros, tentativas e desempenho recente.

T25 — Permitir dificuldade interna sem exibir números

Concluída

Critério de conclusão: o sistema ajusta dificuldade sem transformar a experiência em competição.

FASE 7 — Pontuação, feedback e dicas

T26 — Criar sistema de estrelas

Concluída

⭐⭐⭐ excelente desempenho

⭐⭐ bom desempenho

⭐ atividade concluída

T27 — Criar feedback positivo de acerto

Concluída

Mensagens: “Excelente!”, “Muito bem!”, “Você conseguiu!”.

T28 — Criar feedback amigável de erro

Concluída

Mensagens: “Vamos tentar novamente.”, “Quase lá!”, “Tente mais uma vez.”

T29 — Criar sistema de dicas

Concluída

Depois de algumas tentativas, oferecer ajuda quando o jogo suportar dicas.

FASE 8 — Jogo da Memória

T30 — Criar memory.js

Concluída

T31 — Implementar nível inicial

Concluída

4 cartas e 2 pares.

T32 — Implementar níveis seguintes

Concluída

6 cartas / 3 pares; 8 cartas / 4 pares; permitir crescimento gradual.

T33 — Registrar métricas da Memória

Concluída

Pares, tentativas, erros e tempo de conclusão, sem usar o tempo para pressionar.

FASE 9 — O Que Você Viu?

T34 — Criar whatDidYouSee.js

Concluída

T35 — Implementar exibição temporária de imagens

Concluída

Mostrar imagens, esconder e depois perguntar qual apareceu.

T36 — Implementar níveis

Concluída

Inicial: 2 imagens / 2 opções. Depois 3 imagens / 3 ou 4 opções. Avançado: 4 ou mais imagens e menor tempo de visualização.

FASE 10 — Monte a Palavra

T37 — Criar wordBuilder.js

Concluída

T38 — Implementar montagem por sílabas

Concluída

Exemplos: CA+SA, BO+LA, GA+TO, BA+NA+NA, JA+NE+LA, CA+DEI+RA.

T39 — Implementar níveis

Concluída

2 sílabas, 3 sílabas, palavras maiores e opções incorretas extras.

T40 — Implementar dica de sílaba

Concluída

Após duas tentativas incorretas, destacar a primeira sílaba correta.

FASE 11 — Imagem e Palavra

T41 — Criar imageWord.js

Concluída

T42 — Implementar imagem → palavra

Concluída

Mostrar imagem/emoji e opções de palavras.

T43 — Implementar palavra → imagem

Concluída

Mostrar palavra e opções de imagens.

FASE 12 — Qual Não Combina?

T44 — Criar oddOneOut.js

Concluída

T45 — Implementar categorias simples

Concluída

Exemplos: frutas + carro; animais + cadeira; roupas + banana.

T46 — Implementar progressão

Concluída

Começar com categorias bem diferentes e avançar para diferenças mais sutis.

FASE 13 — Complete a Sequência

T47 — Criar sequence.js

Concluída

T48 — Implementar sequências visuais

Concluída

Exemplos: 🔵 🔴 🔵 🔴 ? e 🍎 🍌 🍎 🍌 ?.

T49 — Implementar sequências numéricas

Concluída

Exemplo: 1 — 2 — 3 — ?.

T50 — Implementar níveis

Concluída

Dois elementos alternados, três elementos e padrões mais complexos.

FASE 14 — Organize a Rotina

T51 — Criar organizeRoutine.js

Concluída

T52 — Implementar ordenação de etapas

Concluída

Rotinas: lavar as mãos, preparar água, escovar dentes, colocar roupa e preparar refeição simples.

T53 — Criar interação acessível para ordenar

Concluída

Permitir ordenar por botões/cliques e opcionalmente arrastar.

FASE 15 — Encontre o Objeto

T54 — Criar findObject.js

Concluída

T55 — Implementar busca por objeto

Concluída

Mostrar instrução e várias imagens; o usuário toca no objeto solicitado.

T56 — Implementar níveis

Concluída

Poucas imagens, depois mais imagens e por fim elementos visualmente semelhantes.

FASE 16 — Toque Somente em...

T57 — Criar tapOnly.js

Concluída

T58 — Implementar seleção por categoria

Concluída

Exemplo: “Toque somente nas frutas.”

T59 — Validar múltiplas escolhas

Concluída

Avaliar itens corretos e incorretos individualmente até concluir.

FASE 17 — Associação de Objetos

T60 — Criar objectAssociation.js

Concluída

T61 — Implementar associações simples

Concluída

Escova→Dentes, Chave→Porta, Garfo→Comida, Cama→Dormir, Sapato→Pé.

T62 — Implementar progressão das associações

Concluída

Começar com relações diretas e avançar para relações mais abstratas.

FASE 18 — Situações do Cotidiano

T63 — Criar dailySituations.js

Concluída

T64 — Implementar perguntas do cotidiano

Concluída

Exemplos: chuva→guarda-chuva; beber água→copo.

T65 — Criar conjunto variado de situações

Concluída

Critério de conclusão: o jogo não repete sempre a mesma pergunta.

FASE 19 — Complete a Frase

T66 — Criar completeSentence.js

Concluída

T67 — Implementar frases simples

Concluída

Exemplos: “Eu bebo ______.” e “Eu durmo na ______.”

T68 — Implementar frases mais complexas

Concluída

Aumentar gradualmente a complexidade nos níveis avançados.

FASE 20 — Treino Diário

T69 — Criar dailyTraining.js

Concluída

T70 — Montar o “Treino de Hoje”

Concluída

Incluir:

1 atividade de memória;

1 de palavras;

1 de raciocínio;

1 de atenção;

1 atividade cotidiana.

T71 — Criar fluxo sequencial do treino

Concluída

Avançar automaticamente entre as cinco atividades.

T72 — Finalizar treino diário

Concluída

Mostrar: “Parabéns! Você concluiu o treino de hoje.”

FASE 21 — Acompanhamento da evolução

T73 — Registrar desempenho por categoria

Concluída

Categorias sugeridas: memória, linguagem, atenção, raciocínio, associação e cotidiano.

T74 — Identificar maior facilidade e maior dificuldade

Concluída

Calcular desempenho relativo sem usar rótulos negativos.

T75 — Criar tela de evolução

Concluída

Mostrar exercícios, acertos, erros, tentativas, nível, estrelas e categorias.

T76 — Criar recomendação simples de atividades

Concluída

Sugerir mais exercícios de categorias com maior dificuldade, mantendo variedade.

FASE 22 — Acessibilidade

T77 — Revisar tamanho de botões

Concluída

T78 — Revisar contraste e legibilidade

Concluída

T79 — Implementar :focus-visible

Concluída

T80 — Não depender apenas de cor para feedback

Concluída

T81 — Revisar excesso de informação por tela

Concluída

Manter poucos elementos, comandos objetivos e respostas visuais claras.

FASE 23 — Responsividade

T82 — Adaptar tela inicial para celular

Concluída

T83 — Adaptar os 12 jogos para celular

Concluída

Critério de conclusão: sem rolagem horizontal e com controles utilizáveis.

FASE 24 — Testes

T84 — Testar navegação completa

Concluída

Abrir os 12 jogos, voltar ao início, abrir treino diário e evolução.

T85 — Testar persistência

Concluída

Realizar atividades, atualizar a página e confirmar os dados.

T86 — Testar níveis

Concluída

T87 — Testar estrelas e feedback

Concluída

T88 — Testar treino diário

Concluída

T89 — Testar evolução e recomendações

Concluída

T90 — Testar os 12 minijogos

Concluída

Em cada jogo testar: abertura, instrução, acerto, erro, feedback, conclusão, progresso, voltar e versão mobile.

FASE 25 — Revisão técnica

T91 — Revisar console do navegador

Concluída

Critério de conclusão: nenhum erro JavaScript relevante no fluxo principal.

T92 — Revisar imports, exports e caminhos

Concluída

T93 — Remover código não utilizado

Concluída

Remover funções abandonadas, variáveis sem uso, console.log de teste e duplicações óbvias.

T94 — Revisar responsabilidades dos módulos

Concluída

Confirmar:

app.js = navegação;

storage.js = armazenamento;

data.js = dados;

um módulo por jogo;

utils = funções compartilhadas.

FASE 26 — README e entrega acadêmica

T95 — Criar README.md

Concluída

Explicar projeto, objetivo, tecnologias, SDD, estrutura, execução, 12 jogos, níveis, estrelas, treino diário, evolução e armazenamento.

T96 — Documentar limitações e evolução futura

Concluída

Registrar como futuras possibilidades:

áudio;

reconhecimento de voz;

exercícios com sons;

personalização;

novos temas;

criação de exercícios por profissionais;

sistema inteligente mais avançado.

FASE 27 — Validação final

T97 — Executar fluxo completo

Concluída

Abrir aplicação → jogar → treino diário → estrelas → evolução → atualizar página → persistência → reset → versão mobile.

T98 — Conferir todos os status do tasks.md

Concluída

Nenhuma task pode estar [x] sem ter sido implementada e validada.

T99 — Preparar entrega final

Concluída

Revisar nome, documentação, arquivos, funcionamento, histórico Git, README e arquivos temporários.

Resultado final

Preencher apenas após concluir e validar o projeto.

Funcionalidades principais

12 minijogos

sistema de níveis

sistema de estrelas

feedback positivo

sistema de dicas

treino diário

acompanhamento da evolução

recomendações simples

persistência com localStorage

responsividade

acessibilidade básica

Testes realizados

Preencher ao final.

Problemas encontrados

Preencher ao final.

Problemas corrigidos

Preencher ao final.

Pendências

Preencher ao final.

Evolução futura

áudio;

reconhecimento de voz;

exercícios com sons;

personalização avançada;

novos temas;

ferramentas para profissionais;

recomendação inteligente mais avançada.