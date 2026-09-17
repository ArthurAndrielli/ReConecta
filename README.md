# ReConecta

Aplicação acadêmica de atividades cognitivas e de linguagem. HTML, CSS e JavaScript com ES Modules, sem framework, backend ou conta. Os dados ficam neste navegador; a aplicação não faz avaliação clínica.

## Executar

Abra `index.html` com o **Live Server** do VS Code ou, com Python instalado, execute na pasta do projeto:

```sh
python -m http.server 4173 --bind 127.0.0.1
```

Acesse **http://127.0.0.1:4173**. Use um servidor HTTP; abrir o arquivo diretamente não carrega corretamente os módulos.

## Funcionalidades

- 12 jogos com 20 fases cada: 240 fases, 600 desafios e 40 tabuleiros.
- Mapa com desbloqueio por conclusão, repetição e melhores estrelas.
- Prática livre com dificuldade independente por jogo.
- Treino diário de cinco atividades, com seleção persistida e retomada da etapa pendente.
- Ajuda, pausa, observação sem limite ou temporizada, reinício e saída confirmada.
- Histórico de sessões concluídas/interrompidas, períodos, recomendações e evolução do percurso.
- Aparência Clara/Escura/Sistema, texto ampliado e redução de movimento.
- Progresso local, migração de dados conhecidos, recuperação de falha de gravação e exclusão confirmada.

Nos jogos de rodadas, cada atividade tem **três desafios**. Na Memória e na Associação, a atividade é um tabuleiro completo. A navegação entre desafios é manual.

Atualizar a página interrompe a sessão ativa e preserva as tentativas já salvas. O tabuleiro recomeça ao iniciar novamente. Se o armazenamento falhar, um aviso informa o uso temporário em memória. Dados ilegíveis ou de versões desconhecidas são preservados até uma exclusão explícita em Ajustes.

## Verificar

Node.js 24 foi usado nesta revisão. As dependências são apenas de desenvolvimento:

```sh
npm ci
npm test
npm run validate
npm run check
node src/js/phases/regression.mjs
```

No PowerShell com execução de scripts desabilitada, use `npm.cmd`.

Os testes usam os módulos reais e jsdom. Cobrem os 12 jogos e as 240 fases, integração das telas, sessões, progresso, treino, migrações e falhas. **jsdom não valida renderização, responsividade ou compatibilidade entre navegadores.** As evidências e pendências estão em [docs/review.md](docs/review.md).

## Estrutura

- `index.html`: estrutura, navegação e preferências antes da primeira renderização.
- `src/css/style.css`: tokens, componentes, temas e regras responsivas.
- `src/js/app.js`: telas e navegação; `session.js`: ciclo de vida da atividade.
- `src/js/storage.js`: persistência, migração e conclusão atômica.
- `src/js/dailyTraining.js`, `evolution.js`, `levels.js`: treino, histórico e dificuldade.
- `src/js/games/`: os 12 motores e a interação compartilhada de alternativas.
- `src/js/phases/`: conteúdo, catálogo, objetivos, validação e progressão.
- `src/assets/`: ícones e 60 ilustrações SVG locais.
- `tests/`: testes de comportamento.
- `docs/`: requisitos, design, tarefas e registro da revisão.

Os IDs internos existentes foram preservados para manter o histórico. As rotas também aceitam os nomes oficiais, como `#/jogo/word-builder/fases`.
