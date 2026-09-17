# Registro da revisão — 17/09/2026

## Escopo e resultado

Foram lidos requirements.md, design.md, tasks.md (Tasks 01–68), README.md, index.html, todos os módulos JavaScript, o CSS e os ativos existentes. As pastas css/ e js/ da raiz estavam vazias. Os arquivos .gitkeep e os módulos de compatibilidade em phases/data/ foram preservados.

A primeira passagem encontrou 240 definições com textos provisórios, sem conexão com os motores. Os jogos encerravam após um único desafio; algumas respostas eram ambíguas; contadores agregados e sessões divergiam. Faltavam pausa efetiva, saída confirmada, evolução detalhada e integridade do treino. O validador anterior aprovava conteúdo fictício.

As correções preservam a aplicação estática, os 12 jogos, os IDs internos e o histórico reconhecido. O conteúdo foi substituído por 600 desafios e 40 tabuleiros efetivos, com 60 ilustrações SVG locais. O controle compartilhado cuida das três rodadas, pausa, dicas, tentativas, reinício e resultado. A conclusão atualiza sessão, fase e slot diário na mesma gravação.

Na segunda passagem foram corrigidos histórico do navegador ao cancelar saída, aplicação antecipada do tema, conflitos de CSS e semântica do mapa. Foram acrescentados testes de falhas, limiares adaptativos, recomendações, migração e retomada diária.

## Evidências executadas

Ambiente: Windows, Node.js 24.18.0, Python 3.14.6, jsdom 30.1.0.

| Comando / verificação | Resultado |
| --- | --- |
| npm.cmd test | 24 testes aprovados; zero falhas |
| npm.cmd run validate | 240 fases, 600 desafios e 40 tabuleiros válidos |
| node src/js/phases/regression.mjs | Regressões de fases aprovadas |
| npm.cmd run check | Sintaxe de 50 scripts, 105 referências de importação e CSS válidos |
| Contraste dos pares de tokens usados | Mínimo calculado de 5,15:1 nos pares verificados, claro/escuro |
| Arquivos de produção | 175.908 bytes na conferência; inclui módulos de validação, abaixo do orçamento de 1,5 MB |
| Servidor Python em 127.0.0.1:4173 | HTML, app.js, CSS e os dois sprites SVG responderam HTTP 200 |
| git diff --check | Sem erros de whitespace |

Os testes de jogos executam os motores reais para todas as 240 fases: 640 montagens, incluindo os três desafios de cada fase de rodadas. Exercitam respostas, erros em alternativas, novas tentativas, pares, sílabas repetidas, ordenação, seleção de múltiplos itens, conclusão e proteção contra cliques duplicados/eventos após desmontagem. O temporizador é verificado nos quatro níveis, com pausa, retomada e descarte.

O teste integrado percorre o aplicativo em DOM simulado: catálogo e busca sem acentos, filtros preservados, mapa, rota bloqueada, repetição, todos os 12 jogos em prática livre, treino de cinco etapas, histórico, períodos, preferências e reset. Também verifica cancelamento/aceite de saída pelo histórico do navegador, saída a partir da pausa, reinício e recuperação de quota. Verifica um main, um h1 e ausência de IDs duplicados ou controles aninhados nas telas exercitadas. Não houve exceções JavaScript capturadas nesses fluxos.

Os testes de armazenamento percorrem as 240 conclusões, incluindo fronteiras 5→6, 10→11 e 15→16, fase 20 e impossibilidade da fase 21. Cobrem recordes, repetições, isolamento de modos, proteção de objetivos incompletos, migração idempotente, recarga ativa, JSON ilegível, versão futura, quota, retry e reset que preserva preferências/dados alheios.

## Conferência das Tasks 01–68

As marcações históricas [x] de tasks.md foram preservadas. Esta tabela registra o que foi efetivamente conferido; a marcação anterior não substitui evidência. “DOM” significa jsdom, sem renderização gráfica.

| Task | Conferência / correção desta revisão |
| --- | --- |
| 01 | Tokens, texto de 18 px e contrastes calculados; renderização pendente |
| 02 | Controles compartilhados, SVG locais e estados; geometria visual pendente |
| 03 | Rotas, foco, histórico e modo de foco em DOM; responsividade pendente |
| 04 | 12 jogos, três destaques, busca, filtros e retorno ao catálogo |
| 05 | Estado em memória, migração e preservação de dados ilegíveis |
| 06 | Sessão comum, objetivos, três rodadas, ajuda, pausa, saída e resultado |
| 07 | Configuração fixa por fase; adaptação por jogo e taxa ponderada |
| 08 | Memória: 20 tabuleiros, pares, erro manual, conclusão e descarte |
| 09 | Observação: 60 desafios inequívocos e timer 12/10/8/6 segundos |
| 10 | Palavras: 60 entradas, sílabas distintas/repetidas, desfazer e verificar |
| 11 | Imagem/palavra: 60 desafios, dois sentidos e continuação manual |
| 12 | Intruso: 60 conjuntos; classificação e distratores compatíveis |
| 13 | Sequências: 60 padrões; AB, ABC, AAB/ABB e progressões numéricas |
| 14 | Rotinas: 60 tarefas, controles individuais e ordens aceitas explícitas |
| 15 | Busca: 60 alvos únicos, quantidades por bloco e dica |
| 16 | Seleção: avaliação por novo item e proteção de itens resolvidos |
| 17 | Associação: 20 tabuleiros, seleção/cancelamento e destinos estáveis |
| 18 | Situações: 60 perguntas com alternativas e resposta contextual |
| 19 | Frases: 60 entradas e anúncio da frase completa após acerto |
| 20 | Treino: cinco grupos, slots congelados e recompensa única |
| 21 | Evolução, períodos, detalhes, amostra mínima e recomendações |
| 22 | Preferências imediatas, cancelamento e exclusão confirmada |
| 23 | Regras responsivas corrigidas no código; inspeção gráfica pendente |
| 24 | Semântica, foco, diálogos e nomes no DOM; teclado/leitor real pendentes |
| 25 | Falhas de gravação, conteúdo, imagens e referências desconhecidas |
| 26 | Integração automatizada completa; Chrome/Edge/Firefox pendentes |
| 27 | Paleta e composição existentes preservadas e ajustadas |
| 28 | Ícones SVG, marca, escala de texto e aplicação antecipada do tema |
| 29 | Sobreposição antiga do menu com a marca corrigida no CSS |
| 30 | Treino novo/parcial/concluído, três destaques e catálogo completo |
| 31 | Cards como links únicos, categorias e filtros acessíveis |
| 32 | Estados vazios/falhas com ações úteis, sem conteúdo provisório |
| 33 | 60 ilustrações locais, referências conferidas e erro de carregamento |
| 34 | Memória sem timeout de erro; observação removida da árvore DOM |
| 35 | Referência, sílabas, frase completa e alternativas separadas |
| 36 | Listas de sequência, contagem de alvos e estados resolvidos |
| 37 | Rotinas e associações com foco e controles estáveis |
| 38 | Alturas mínimas, variantes e estados consolidados no CSS |
| 39 | Feedback estável, diálogos nativos e estrelas reais |
| 40 | Histórico de concluídas/interrompidas, detalhes e participação real |
| 41 | Ajustes agrupados e exclusão separada, com confirmação |
| 42 | Claro/Escuro/Sistema, categorias escuras e persistência |
| 43 | Media queries consolidadas; conferência gráfica pendente |
| 44 | Segunda passagem de código feita; revisão visual real pendente |
| 45 | Catálogo ligado ao conteúdo real, contratos e validação |
| 46 | Migração de dados conhecidos sem inventar fases |
| 47 | Desbloqueio, repetição, recordes e conclusão atômica |
| 48 | Mapa semântico e bloqueio validado também na criação da sessão |
| 49 | Conteúdo/nível congelados e três rodadas integradas ao controlador |
| 50 | Todas as 20 fases de Memória exercitadas em DOM |
| 51 | Todas as 20 fases de observação exercitadas em DOM |
| 52 | Todas as 20 fases de palavras exercitadas em DOM |
| 53 | Todas as 20 fases de imagem/palavra exercitadas em DOM |
| 54 | Todas as 20 fases de intruso exercitadas em DOM |
| 55 | Todas as 20 fases de sequência exercitadas em DOM |
| 56 | Todas as 20 fases de rotina exercitadas em DOM |
| 57 | Todas as 20 fases de busca exercitadas em DOM |
| 58 | Todas as 20 fases de seleção exercitadas em DOM |
| 59 | Todas as 20 fases de associação exercitadas em DOM |
| 60 | Todas as 20 fases de situações exercitadas em DOM |
| 61 | Todas as 20 fases de frases exercitadas em DOM |
| 62 | Próxima fase, repetição, recorde e término do percurso |
| 63 | Slots diários, data original, migração e fase praticada externamente |
| 64 | Fases distintas e melhores estrelas separadas do total histórico |
| 65 | Validador completo e casos inválidos/clones rejeitados |
| 66 | Mapa/resultado refinados; validação gráfica nas cinco larguras pendente |
| 67 | Testes reais de progressão, sessões, migração, quota e modos |
| 68 | Banco e motores completos; amostra gráfica de 48 combinações pendente |

## Rastreabilidade dos requisitos

| Requisitos | Implementação e evidência |
| --- | --- |
| RF001–RF005, RF057, RF061–RF063 | app.js, phaseMap.js, dialog.js, assets.js; app.test.mjs e assets.test.mjs |
| RF006–RF013, RF019–RF022, RF058–RF060 | storage.js e session.js; storage.test.mjs, app.test.mjs |
| RF014–RF018 | levels.js, catálogo e conteúdo; rules.test.mjs e testes dos jogos |
| RF023–RF049 | games/, phases/content.js, editorial.js, objects.js; games.test.mjs e content.test.mjs |
| RF050–RF056 | dailyTraining.js e evolution.js; rules.test.mjs e app.test.mjs |
| RF064–RF090 | catálogo, progressão, objetivos, sessão, armazenamento e telas; content/storage/games/app/rules.test.mjs |
| RUI001–RUI038 | HTML, CSS, SVG e telas revisados; semântica DOM e tokens conferidos; aparência renderizada pendente |
| RNF001–RNF005, RNF011–RNF015 | Ritmo, semântica, controles, callbacks e escape de texto; testes de interação e código |
| RNF006, RNF017 | Verificação em navegadores e evidência visual pendentes |
| RNF007–RNF010, RNF013, RNF018–RNF020 | Módulos, armazenamento e conteúdo; testes e check-project.mjs |
| RNF016 | Recursos locais e orçamento de arquivos conferidos; carregamento/renderização medidos em navegador pendentes |

## Limitações verificadas

O runtime do navegador integrado retornou **“No browser is available”** e a descoberta retornou **[]**. Por isso, não foram executados:

- inspeção visual nas larguras 320/390/768/1024/1440 px;
- capturas comparáveis dos temas, jogos, resultados e mapas;
- avaliação de recorte, alinhamento, sobreposição, zoom e tamanho físico dos alvos;
- percurso de teclado/leitor de tela em navegador real;
- console e compatibilidade reais de Chrome/Edge e Firefox.

Os testes de DOM e os cálculos de contraste não comprovam esses itens. A revisão funcional está verificada pelos comandos acima; a homologação visual permanece pendente, sem afirmar conformidade total ou ausência de problemas ainda não observados.

## Commits

- 41c2a28 — feat: auditoria 0.25: já presente no repositório ao retomar; contém a primeira passagem.
- 47e4be5 — fix: preserva historico de navegacao e valida fluxos de recuperacao.
- a14fd6e — style: consolida layouts responsivos temas e semantica do mapa.
- O registro final desta revisão e o README atualizado acompanham o commit de documentação.
