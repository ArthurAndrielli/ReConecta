ReConecta — Tasks

Este arquivo contém somente as tarefas de implementação que ainda fazem sentido para o projeto atual.

Os arquivos de documentação, index.html e README.md já existem e não fazem parte destas tasks.

Regras

[ ] = pendente

[x] = concluída

executar uma task por vez;

testar antes de marcar como concluída;

fazer um commit por task;

padrão de commit: feat: implementa a task XX.

Fase 1 — Estrutura atual da aplicação

[ ] T01 — Ajustar a tela inicial para exibir os 12 minijogos do ReConecta.
[x] T02 — Garantir que todos os cards dos jogos abram a atividade correta.
[x] T03 — Garantir que todas as atividades possuam o botão “← Voltar ao início”.
[x] T04 — Organizar os dados fixos dos jogos em um arquivo central de dados.
[x] T05 — Criar funções utilitárias compartilhadas para embaralhamento, escolha aleatória e feedback.

Fase 2 — Progresso e armazenamento

[x] T06 — Completar o storage.js para salvar e recuperar o progresso com localStorage.
[x] T07 — Registrar atividades realizadas.
[x] T08 — Registrar acertos.
[x] T09 — Registrar erros.
[x] T10 — Registrar tentativas.
[x] T11 — Registrar tempo de resposta ou tempo de conclusão sem usar o tempo para pressionar o usuário.
[x] T12 — Criar a função para limpar o progresso mediante confirmação.
[x] T13 — Exibir na tela inicial um resumo do progresso salvo.

Fase 3 — Sistema de níveis

[x] T14 — Implementar o Nível 1 — Inicial.
[x] T15 — Implementar o Nível 2 — Fácil.
[x] T16 — Implementar o Nível 3 — Intermediário.
[x] T17 — Implementar o Nível 4 — Avançado.
[x] T18 — Fazer os jogos consultarem o nível atual para ajustar sua dificuldade.
[x] T19 — Permitir que o nível seja usado internamente sem precisar mostrar o número ao usuário.

Fase 4 — Pontuação, feedback e dicas

[x] T20 — Implementar o sistema de estrelas: 1, 2 ou 3 estrelas conforme o desempenho.
[x] T21 — Mostrar mensagens positivas quando o usuário acertar.
[x] T22 — Mostrar mensagens amigáveis quando o usuário errar.
[x] T23 — Implementar dicas depois de algumas tentativas nos jogos que suportarem ajuda.

Fase 5 — Jogo da Memória

[x] T24 — Completar o Jogo da Memória com 4 cartas e 2 pares no nível inicial.
[x] T25 — Adicionar 6 cartas e 3 pares no próximo nível.
[x] T26 — Adicionar 8 cartas e 4 pares no nível seguinte.
[x] T27 — Permitir níveis mais avançados com mais cartas ou imagens parecidas.
[x] T28 — Registrar pares encontrados, tentativas, erros e tempo de conclusão.
[x] T29 — Finalizar corretamente a atividade quando todos os pares forem encontrados.

Fase 6 — O Que Você Viu?

[x] T30 — Implementar o jogo “O Que Você Viu?”.
[x] T31 — Mostrar imagens durante alguns segundos e escondê-las antes da pergunta.
[x] T32 — Implementar nível inicial com 2 imagens e 2 opções.
[x] T33 — Implementar nível seguinte com 3 imagens e 3 ou 4 opções.
[x] T34 — Implementar níveis avançados com 4 ou mais imagens e redução gradual do tempo de visualização.

Fase 7 — Monte a Palavra

[x] T35 — Implementar o jogo “Monte a Palavra”.
[x] T36 — Permitir montar palavras de duas sílabas.
[x] T37 — Permitir montar palavras de três sílabas.
[x] T38 — Adicionar palavras maiores e sílabas incorretas nos níveis avançados.
[x] T39 — Depois de duas tentativas incorretas, oferecer uma dica destacando a primeira sílaba correta.

Fase 8 — Imagem e Palavra

[x] T40 — Implementar o modo imagem → palavra.
[x] T41 — Implementar o modo palavra → imagem.
[x] T42 — Registrar acertos, erros, tentativas e conclusão da atividade.

Fase 9 — Qual Não Combina?

[x] T43 — Implementar o jogo “Qual Não Combina?” com quatro elementos.
[x] T44 — Criar atividades iniciais com categorias bem diferentes.
[x] T45 — Criar atividades mais avançadas com diferenças mais sutis.

Fase 10 — Complete a Sequência

[x] T46 — Implementar sequências simples com dois elementos alternados.
[x] T47 — Implementar sequências com três elementos.
[x] T48 — Implementar sequências numéricas simples.
[x] T49 — Implementar padrões mais complexos nos níveis avançados.

Fase 11 — Organize a Rotina

[x] T50 — Implementar o jogo “Organize a Rotina”.
[x] T51 — Adicionar a rotina de lavar as mãos.
[x] T52 — Adicionar outras rotinas: beber água, escovar os dentes, colocar roupa e preparar refeição simples.
[x] T53 — Permitir reorganizar as etapas sem depender exclusivamente de arrastar e soltar.

Fase 12 — Encontre o Objeto

[x] T54 — Implementar o jogo “Encontre o Objeto”.
[x] T55 — Criar nível inicial com poucos objetos bem diferentes.
[x] T56 — Criar nível intermediário com mais objetos.
[x] T57 — Criar nível avançado com elementos visualmente semelhantes.

Fase 13 — Toque Somente em...

[x] T58 — Implementar o jogo “Toque Somente em...”.
[x] T59 — Permitir selecionar vários itens corretos de uma categoria.
[x] T60 — Validar itens corretos e incorretos sem encerrar a atividade no primeiro clique.

Fase 14 — Associação de Objetos

[x] T61 — Implementar o jogo “Associação de Objetos”.
[x] T62 — Adicionar associações simples como Escova→Dentes, Chave→Porta, Garfo→Comida, Cama→Dormir e Sapato→Pé.
[x] T63 — Adicionar relações mais abstratas nos níveis avançados.

Fase 15 — Situações do Cotidiano

[x] T64 — Implementar o jogo “Situações do Cotidiano”.
[x] T65 — Adicionar situações simples como chuva→guarda-chuva e beber água→copo.
[x] T66 — Adicionar novas situações para evitar repetição excessiva.

Fase 16 — Complete a Frase

[x] T67 — Implementar o jogo “Complete a Frase”.
[x] T68 — Criar frases simples nos níveis iniciais.
[x] T69 — Criar frases maiores nos níveis avançados.

Fase 17 — Treino Diário

[x] T70 — Criar o “Treino de Hoje”.
[x] T71 — Incluir 1 atividade de memória.
[x] T72 — Incluir 1 exercício de palavras.
[x] T73 — Incluir 1 exercício de raciocínio.
[x] T74 — Incluir 1 exercício de atenção.
[x] T75 — Incluir 1 atividade cotidiana.
[ ] T76 — Executar as cinco atividades em sequência.
[ ] T77 — Mostrar a mensagem “Parabéns! Você concluiu o treino de hoje.” ao finalizar.

Fase 18 — Acompanhamento da evolução

[ ] T78 — Registrar exercícios realizados por categoria.
[ ] T79 — Registrar acertos, erros, tentativas, tempo e nível atual.
[ ] T80 — Identificar a categoria com maior facilidade.
[ ] T81 — Identificar a categoria que precisa de mais prática.
[ ] T82 — Criar uma tela simples de acompanhamento da evolução.
[ ] T83 — Usar o histórico para sugerir mais atividades das categorias que precisam de prática, mantendo variedade.

Fase 19 — Acessibilidade e responsividade

[ ] T84 — Garantir poucos elementos e comandos objetivos em cada tela.
[ ] T85 — Garantir botões grandes e textos legíveis.
[ ] T86 — Adicionar foco visível para navegação por teclado.
[ ] T87 — Garantir que acertos e erros não sejam comunicados somente por cor.
[ ] T88 — Adaptar a tela inicial para celular.
[ ] T89 — Adaptar os 12 minijogos para celular sem rolagem horizontal desnecessária.

Fase 20 — Testes finais

[ ] T90 — Testar abertura e retorno dos 12 minijogos.
[ ] T91 — Testar resposta correta e incorreta em todos os jogos.
[ ] T92 — Testar feedback, estrelas e dicas.
[ ] T93 — Testar todos os níveis de dificuldade.
[ ] T94 — Testar persistência do progresso após atualizar a página.
[ ] T95 — Testar limpeza do progresso.
[ ] T96 — Testar o Treino de Hoje do início ao fim.
[ ] T97 — Testar a tela de evolução e as recomendações.
[ ] T98 — Testar navegação por teclado e versão mobile.
[ ] T99 — Corrigir erros encontrados e confirmar que o console do navegador não possui erros críticos.
