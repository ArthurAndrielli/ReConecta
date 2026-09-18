# Registro da revisão — 17/09/2026

> Registro histórico. A auditoria e as evidências atuais de 18/09/2026 estão em [AUDITORIA.md](../AUDITORIA.md) e [MELHORIAS_REALIZADAS.md](../MELHORIAS_REALIZADAS.md).

## Escopo e resultado

Os 12 jogos foram revisados separadamente e consolidados em três fases: Fácil, Médio e Difícil. O catálogo contém 36 fases, 90 desafios nos dez jogos de rodadas e 6 tabuleiros nos jogos de Memória e Associação.

A progressão aumenta elementos e semelhança das alternativas: Memória usa 2/4/6 pares; Associação usa 2/3/5 relações; observação usa 2/4/5 imagens; busca visual e seleção usam 4/6/9 opções; rotinas usam 3/4/6 passos; alternativas textuais e visuais passam de 2 para 3 e 4. A terceira fase de sequências usa progressões numéricas. As dicas ficam menos específicas nas fases posteriores.

As imagens, palavras, perguntas, rotinas e sequências não são reutilizadas entre as três fases do mesmo jogo. O modo temporizado de O Que Você Viu? usa 12/9/6 segundos; o modo “No meu ritmo” continua disponível por acessibilidade. Os demais jogos permanecem sem limite punitivo de resposta.

O mapa, a introdução e o exercício mostram “Fase 1 de 3”, “Fase 2 de 3” ou “Fase 3 de 3”. A conclusão da terceira fase mostra pontuação, acertos, tentativas, estrelas e a ação “Jogar novamente”. Pontuação, feedback, desbloqueio, prática livre e treino diário continuam usando o controlador compartilhado.

O carregamento remove registros das fases aposentadas 4–20 do percurso sem apagar sessões históricas. O antigo nível 4 é convertido para Difícil, e slots diários pendentes que apontavam para fases removidas são reatribuídos.

## Evidências executadas

| Verificação | Resultado |
| --- | --- |
| `npm.cmd test` | 29 testes aprovados; zero falhas |
| `npm.cmd run validate` | 36 fases, 90 desafios e 6 tabuleiros válidos |
| `npm.cmd run check` | 50 scripts, 108 imports, CSS válido e contraste mínimo verificado de 5,15:1 |
| `node src/js/phases/regression.mjs` | Regressões de fases aprovadas |
| `git diff --check` | Sem erros de whitespace |

A suíte monta e resolve as 96 unidades jogáveis (90 rodadas e 6 tabuleiros), incluindo erro, nova tentativa, cliques duplicados, dicas e desmontagem. O teste integrado percorre mapa, bloqueio, repetição, terceira fase, conclusão, os 12 jogos em prática livre, treino diário, histórico, preferências e falhas de armazenamento.

Foi solicitada uma sessão de navegador para inspeção visual, mas o ambiente não disponibilizou nenhum navegador conectado. Portanto, responsividade e renderização gráfica real continuam como verificação manual recomendada; comportamento, semântica de DOM e CSS foram verificados automaticamente.
