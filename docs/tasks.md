ReConecta — Plano de implementação

Versão: 3.0 · Vinte fases por jogo
Data: 16/09/2026
Base: requirements.md e design.md.

Atualização: acrescentadas 24 tarefas, da Task 45 à Task 68, para entregar 20 fases em cada um dos 12 jogos: 240 fases. As novas tarefas seguem requirements.md, seção 12, e design.md, seção 16. O conteúdo e os status das Tasks 01–44 foram preservados; os títulos agora usam [ ] literal, conforme solicitado.

Ao incorporar esta atualização ao VS Code, preserve os [x] e os registros que já existirem na cópia do projeto. Se ela estiver mais avançada que este documento, acrescente somente a seção de ampliação com as Tasks 45–68 e as orientações atualizadas, sem substituir status anteriores. Esta revisão não acessou o repositório do VS Code para conferir seu andamento. Use títulos no formato ### [ ] Task 45 — ..., com colchetes visíveis; ao concluir, troque por ### [x] Task 45 — ....

Como executar este plano

O objetivo atual é ampliar os 12 minijogos com fases reais, mantendo o design profissional e as funcionalidades já entregues. As tarefas começam com mudanças reais na aplicação. Não há tarefas para criar documentação, index.html ou README.md. Esses arquivos já existem.

Antes da primeira alteração, ler os três documentos, as instruções do repositório e o código atual. Localizar o CSS, o ponto de entrada JavaScript, os jogos e a persistência existentes. Essa leitura faz parte da primeira task pendente, que pode ser a Task 45 se a base já estiver concluída; não é uma tarefa de preparação isolada.

Trabalhar na primeira task pendente, na ordem numérica, respeitando dependências.

Reaproveitar o que já funciona. Quando uma parte já estiver implementada, verificar e ajustar somente o necessário para atender a esta revisão.

Preservar código, dados e alterações anteriores do usuário. Não substituir o aplicativo por um projeto novo, não adicionar framework e não reescrever histórico Git.

Os caminhos de design.md são referências. Usar os caminhos reais do projeto quando já estiverem corretos. Fazer ajustes pontuais no HTML existente somente para integração necessária.

Implementar, verificar o comportamento descrito, corrigir problemas encontrados e só então mudar a marcação da task de [ ] para [x].

Incluir a implementação e a atualização desta marcação no mesmo commit. Criar um commit por task, exatamente no padrão feat: implementa a task 01, trocando apenas o número.

Confirmar que o commit foi criado. Se falhar, não afirmar que a task foi entregue; manter a indicação de pendência até resolver o commit. Não fazer commits vazios nem alterar código que já atende ao requisito só para produzir diferença.

Continuar automaticamente para a próxima task até concluir as pendentes, incluindo a Task 68. Não encerrar após duas ou três tarefas nem pedir confirmação a cada commit. Comunicar de forma breve a conclusão e os testes relevantes, sem substituir a implementação por explicações longas. Fazer commits locais; publicação ou push não fazem parte deste plano.

Se houver bloqueio real de acesso, dado essencial ausente ou dependência externa indisponível, registrar o ponto exato e não marcar a task como concluída. Resolver problemas locais reversíveis antes de interromper.

As marcações começam pendentes porque o repositório atual não foi verificado nesta revisão. Elas não afirmam que todas as funcionalidades estão ausentes. A numeração pertence a este plano; commits anteriores permanecem intactos.

Critério comum de conclusão

Uma task precisa entregar suas alterações aplicáveis, passar pelas verificações indicadas, manter o fluxo já existente funcional e ser registrada em commit próprio. Não marcar como pronta uma tela com botões sem ação, números fictícios, jogos simulados ou erros conhecidos que impeçam o uso.

Usar o ambiente de execução e testes já disponível. Alterações de aparência exigem inspeção visual; regras de persistência, pontuação e navegação exigem verificações de comportamento. Não criar testes que apenas repitam a implementação ou valores de CSS. Não declarar comandos ou testes que não foram executados.

Base visual e navegação

[x] Task 01 — Aplicar a identidade visual à interface existente

Depende de: nenhuma. Requisitos: RUI001, RUI007, RNF004, RNF007, RNF009.

Implementar: localizar o CSS e a estrutura atuais; criar ou ajustar tokens de cores, tipografia, espaçamento, raios, sombras e foco de acordo com design.md, seção 2. Aplicar os tokens ao fundo, títulos, botões e cards que já existem. Manter a estrutura funcional e os imports válidos. A task deve produzir uma mudança visual concreta na tela existente, além da leitura dos arquivos.

Validar: abrir pelo servidor local; conferir legibilidade, contraste dos pares usados, comportamento dos botões existentes e ausência de erro de CSS/JavaScript que impeça navegação. Conferir pelo menos 390 e 1440 px.

Commit: feat: implementa a task 01.

[x] Task 02 — Padronizar componentes, ícones e ativos visuais

Depende de: Task 01. Requisitos: RUI005, RUI008, RUI009, RUI012, RUI013, RNF003, RNF014.

Implementar: componentes compartilhados de botão/link, card de jogo, categoria, alternativa, feedback e estado vazio. Aplicar estados normal, hover, foco, selecionado, resolvido e indisponível. Manter logotipo existente utilizável; na ausência dele, aplicar marca tipográfica e símbolo simples conforme o design. Organizar ícones e imagens locais com estilo consistente, dimensões e descrições acessíveis. Reaproveitar ativos adequados; substituir emojis de interface pela coleção visual definida.

Validar: usar os componentes em pelo menos uma tela real; conferir que todos os estados são distinguíveis, que não há botão dentro de link e que imagens não deslocam o conteúdo ao carregar. Confirmar que recursos não dependem de CDN.

Commit: feat: implementa a task 02.

[x] Task 03 — Implementar a estrutura de navegação responsiva

Depende de: Tasks 01–02. Requisitos: RF001, RF003, RF004, RUI002, RUI003, RUI006, RNF002, RNF008.

Implementar: navegação para Início, Atividades, Minha evolução e Ajustes, mantendo o roteamento existente quando adequado. Implementar estado ativo, modo de foco para jogos, destino para treino e tratamento inicial de rota inválida. Criar/adaptar barra lateral no desktop, navegação horizontal no tablet e barra inferior no celular. Atualizar título da página, foco e região #app a cada troca.

Validar: acessar os destinos, recarregar uma rota válida e usar Voltar/Avançar do navegador sem erros. Conferir link de pular conteúdo, estado ativo acessível e espaço reservado para a barra inferior. Não criar outro arquivo HTML por tela.

Commit: feat: implementa a task 03.

[x] Task 04 — Construir o Início e o catálogo dos 12 jogos

Depende de: Tasks 02–03. Requisitos: RF001, RF002, RF057, RF062, RUI004, RUI005, RUI015, RNF001.

Implementar: Início na ordem definida no design: abertura, destaque do treino, resumo quando houver dados, sugestão quando aplicável e os 12 cards. Construir Atividades com busca por nome, filtros das seis categorias, contagem acessível e estado sem resultados. Usar os IDs e categorias oficiais. Buscar métricas no serviço existente; se ainda não houver dados/serviço, apresentar o estado vazio verdadeiro até a conexão da Task 05, sem números de demonstração.

Validar: conferir os 12 nomes e destinos, busca sem distinção de acentos/caixa, combinação de filtro e busca, ação de limpar e preservação dos filtros ao voltar. Conferir títulos longos, primeiro acesso e resumo com dados reais disponíveis.

Commit: feat: implementa a task 04.

Dados e funcionamento compartilhado

[x] Task 05 — Preservar o progresso e centralizar o armazenamento

Depende de: Tasks 03–04. Requisitos: RF006, RF007, RF008, RF009, RF011, RF012, RF013, RF053, RNF010, RNF015.

Implementar: leitura, validação, migração e gravação centralizadas conforme design.md, seção 9. Preservar os totais válidos existentes e separar progresso de preferências. Criar operações para sessão, tentativa, conclusão e reset sem chamar localStorage nos jogos. Conectar resumos ao estado real. Preservar dados desconhecidos/ilegíveis e sinalizar modo temporário em memória, sem sobrescrevê-los como vazio.

Validar: salvar e recarregar progresso; migrar amostra da estrutura anterior sem duplicar totais após duas aberturas; manter JSON ilegível intacto; simular falha de gravação e continuar em memória. Confirmar que reset do serviço não apaga preferências ou dados de outras aplicações.

Commit: feat: implementa a task 05.

[x] Task 06 — Integrar tela de exercício, sessão, feedback e resultado

Depende de: Tasks 02–03 e 05. Requisitos: RF005–RF010, RF019–RF022, RF060, RF062, RUI006, RUI009, RUI010, RNF011, RNF013.

Implementar: GameShell e contrato comum de jogos; tela de instruções, começo explícito, registro de tentativa, cálculo de estrelas, região de feedback, dicas, pausa, confirmação de saída e resultado. Implementar tempo ativo sem contagem competitiva, desmontagem e bloqueio de conclusão duplicada. Adaptar ao menos um jogo existente ao contrato para exercitar o fluxo real. Preservar o estado anterior ao cancelar saída.

Validar: erro, ajuda, acerto e conclusão; estrelas para zero, dois e três erros; clique duplo em resposta/conclusão; pausa e aba oculta; cancelar e confirmar saída, inclusive pelo Voltar do navegador. Confirmar que resultado repetido não soma novamente e que sessão interrompida não concede estrelas.

Commit: feat: implementa a task 06.

[ ] Task 07 — Consolidar conteúdo, níveis e progressão dos jogos

Depende de: Tasks 05–06. Requisitos: RF014–RF018, RF022, RNF008, RNF009, RNF012.

Implementar: catálogo como fonte única de ID, nome, categoria, módulo e grupo diário; configurações dos quatro níveis; função de progressão por jogo com janela de três sessões e limiares de 85%/50%. Consolidar dados e ativos por nível, com pelo menos três desafios distintos nos jogos de sequência e conjuntos suficientes nos de tabuleiro. Completar conteúdo faltante conforme cada jogo for adaptado, sem deixar a entrega final com nível vazio.

Validar: limiares exatos, amostra insuficiente, mínimo 1/máximo 4, avaliação executada uma vez por janela e nível fixo durante a sessão. Conferir IDs únicos, existência dos ativos referenciados e ausência de respostas corretas duplicadas entre alternativas.

Commit: feat: implementa a task 07.

Adaptação e conclusão dos minijogos

Para as Tasks 08–19, adaptar o módulo existente; implementar somente o que faltar. Cada task deve terminar com o jogo integrado à navegação, à sessão, ao resultado e à persistência. Não entregar apenas a função isolada ou o card de acesso.

[ ] Task 08 — Finalizar o Jogo da Memória

Depende de: Tasks 06–07. Requisitos: RF023–RF025.

Implementar: tabuleiros de 4, 6, 8 e 12 cartas com a aparência comum. Comparar duas cartas diferentes; manter pares corretos; impedir terceiro clique durante avaliação; manter par incorreto visível até “Tentar outro par”. Contar uma tentativa por comparação e concluir o tabuleiro uma vez. Cartas fechadas não expõem a resposta ao leitor de tela.

Validar: quatro níveis, clique duplo na mesma carta, terceiro clique, tentativa de selecionar par já resolvido, erro, dica, conclusão e persistência. Conferir grid estreito sem carta menor que 64 px e saída durante comparação.

Commit: feat: implementa a task 08.

[ ] Task 09 — Finalizar O Que Você Viu?

Depende de: Tasks 06–07. Requisitos: RF026–RF027.

Implementar: três desafios por sessão, com fases separadas de observação e resposta. Oferecer “No meu ritmo” com “Já observei” e modo temporizado com 12/10/8/6 segundos conforme o nível. Usar quantidades de imagens/opções do design, carregar imagens antes de iniciar a exposição e remover as observadas da árvore acessível após ocultar.

Validar: ordem das fases, resposta única válida, níveis, modo sem limite, pausa/retomada do tempo restante e saída antes de o timer terminar. Confirmar que nenhum timer antigo altera outra tela e que só o terceiro desafio finaliza a atividade.

Commit: feat: implementa a task 09.

[ ] Task 10 — Finalizar Monte a Palavra

Depende de: Tasks 06–07. Requisitos: RF028–RF030.

Implementar: imagem, banco de sílabas, espaços da resposta, seleção em ordem, desfazer e verificação. Cada peça recebe ID próprio; comparar a resposta pelo texto das sílabas. Implementar quatro níveis, três desafios por sessão e dica da primeira sílaba, destacada após dois erros.

Validar: CASA, BANANA com duas peças NA e palavra com distratores; desfazer sem perder peça; erro sem apagar a atividade; dica sem resolver automaticamente; teclado, persistência e conclusão no terceiro desafio.

Commit: feat: implementa a task 10.

[ ] Task 11 — Finalizar Imagem e Palavra

Depende de: Tasks 06–07. Requisitos: RF031–RF032.

Implementar: direções imagem→palavra e palavra→imagem dentro de três desafios por sessão. Usar 2/3/4/4 alternativas conforme o nível, imagens consistentes e uma única resposta válida por desafio. Conectar seleção, feedback, dica e “Continuar”.

Validar: os dois modos, os quatro níveis, alternativas sem duplicação, resposta incorreta, correção, texto acessível das imagens e conclusão/persistência. Conferir que o foco chega ao novo comando apenas após avançar.

Commit: feat: implementa a task 11.

[ ] Task 12 — Finalizar Qual Não Combina?

Depende de: Tasks 06–07. Requisitos: RF033–RF034.

Implementar: três desafios de quatro elementos por sessão, com um item fora da categoria. Variar complexidade sem alterar arbitrariamente a quantidade. Apresentar a relação da categoria na explicação após acerto e usar a aparência comum de alternativa.

Validar: todos os níveis, existência de exatamente um intruso em cada conjunto, erro/dica/acerto e finalização. Conferir que nenhuma imagem tem destaque visual que entregue a resposta antes da escolha.

Commit: feat: implementa a task 12.

[ ] Task 13 — Finalizar Complete a Sequência

Depende de: Tasks 06–07. Requisitos: RF035–RF037.

Implementar: três desafios por sessão combinando padrões visuais e numéricos, com níveis AB, ABC, AAB/ABB e padrões avançados definidos no conteúdo. Exibir sequência, lacuna e alternativas com ordem de leitura correta. Cores têm apoio de formas, imagens ou nomes.

Validar: solução de cada padrão, alternativas inequívocas, sequência numérica, uso sem distinguir cores, erro, ajuda e conclusão. Conferir quebra de linha no celular sem inverter a ordem ou exigir rolagem horizontal.

Commit: feat: implementa a task 13.

[ ] Task 14 — Finalizar Organize a Rotina

Depende de: Tasks 06–07. Requisitos: RF038–RF039.

Implementar: três rotinas por sessão com 3/4/5/6 etapas conforme o nível. Ordenar por controles de subir/descer e validar por “Verificar ordem”. Preparar conteúdo para os exemplos previstos e declarar ordens aceitas quando houver variação válida. Atualizar posição e anúncio mantendo foco no item movido.

Validar: primeira/última posição, deslocamentos por teclado, ordem incorreta, sequência correta, duas ordens válidas quando existirem e conclusão. Confirmar que arrastar não é obrigatório e que tocar em mover não conta como tentativa.

Commit: feat: implementa a task 14.

[ ] Task 15 — Finalizar Encontre o Objeto

Depende de: Tasks 06–07. Requisitos: RF040–RF041.

Implementar: três desafios por sessão, comando explícito, alvo único e grades de 4/6/8/9 objetos conforme o nível. Aumentar semelhança nos níveis superiores preservando reconhecimento, espaço e tamanho dos alvos.

Validar: alvo presente exatamente uma vez, erro, dica, acerto e conclusão. Conferir quatro níveis, imagens locais carregadas, navegação por teclado e grade em 320 px.

Commit: feat: implementa a task 15.

[ ] Task 16 — Finalizar Toque Somente em...

Depende de: Tasks 06–07. Requisitos: RF042–RF043.

Implementar: três desafios de seleção por categoria. Usar quantidade de objetos e alvos do design. Avaliar novos itens individualmente, marcar os corretos, orientar sobre incorretos e encerrar o desafio apenas quando todos os alvos estiverem resolvidos. Mostrar progresso textual dos alvos encontrados.

Validar: não concluir no primeiro toque, clique repetido em item resolvido sem contar tentativa, item incorreto sem apagar acertos, seleção por teclado e níveis. Conferir que acertos/tentativas correspondem às avaliações efetivas.

Commit: feat: implementa a task 16.

[ ] Task 17 — Finalizar Associação de Objetos

Depende de: Tasks 06–07. Requisitos: RF044–RF045.

Implementar: um tabuleiro por sessão, com 2/3/4/5 pares conforme o nível. Selecionar origem e destino, permitir cancelar origem e marcar pares resolvidos. Apresentar grupos verticais no celular com condução de foco, sem depender de linhas, arrastar ou gestos precisos. Classificar a sessão somente em Associação.

Validar: par correto/incorreto, troca de origem, alvo já resolvido, relações sem ambiguidade, teclado e conclusão única. Confirmar que cancelar origem não gera tentativa e que os dados não são duplicados em Cotidiano.

Commit: feat: implementa a task 17.

[ ] Task 18 — Finalizar Situações do Cotidiano

Depende de: Tasks 06–07. Requisitos: RF046–RF047.

Implementar: três situações por sessão, com vocabulário familiar e 2/3/3/4 alternativas por nível. Garantir no mínimo três conteúdos distintos por nível e evitar repetição imediata quando houver escolha. Pergunta e alternativas devem permitir uma resposta inequívoca.

Validar: cenários chuva/guarda-chuva e água/copo, variedade, níveis, instrução legível, erro, dica, acerto e conclusão persistida. Não depender de uma imagem decorativa para compreender a situação.

Commit: feat: implementa a task 18.

[ ] Task 19 — Finalizar Complete a Frase

Depende de: Tasks 06–07. Requisitos: RF048–RF049.

Implementar: três desafios por sessão, cada um com frase, uma lacuna e 2/3/3/4 alternativas conforme o nível. Aumentar complexidade do conteúdo, preservar frases familiares e anunciar a frase completa após o acerto.

Validar: concordância e resposta única, frases maiores, erro sem avanço indevido, dica, conclusão e dados salvos. Conferir leitor de tela, acentos e texto ampliado sem cortar frase ou botões.

Commit: feat: implementa a task 19.

Fluxos completos e personalização

[ ] Task 20 — Implementar o Treino de Hoje e a retomada

Depende de: Tasks 05–19. Requisitos: RF050–RF052, RF059, RUI004.

Implementar: plano diário persistido com cinco grupos oficiais; resumo antes de começar; indicação da etapa atual; uso dos módulos reais dos jogos; “Próxima atividade”; conclusão do treino. Criar plano por data local, manter escolha após F5 e creditar cada etapa uma vez. Retomar a primeira etapa pendente reiniciando sua atividade. Atualizar o card do Início nos estados novo, parcial e concluído.

Validar: cinco grupos e cinco etapas, avanço manual, retomada após duas etapas, sessão interrompida sem avanço, duplo clique no resultado, F5 e mudança de data local. Confirmar que treino aberto pode concluir na data original e que concluir o treino não duplica estrelas dos jogos.

Commit: feat: implementa a task 20.

[ ] Task 21 — Implementar Minha evolução e recomendações

Depende de: Tasks 05–07 e 20. Requisitos: RF053–RF056, RF062, RUI011, RUI015.

Implementar: totais, períodos de 7/30 dias e todo o período, participação por dia/semana, alternativa textual, categorias, histórico e detalhes. Preservar totais legados sem inventar datas. Implementar elegibilidade mínima, taxa ponderada por tentativas, desempate e escolha de jogo definidos nos requisitos. Conectar sugestões ao Início e ao gerador de planos futuros, sem modificar um plano diário já salvo.

Validar: histórico vazio, poucas tentativas, uma única categoria elegível, empate, duas categorias elegíveis, sessões interrompidas e dados legados sem data. Conferir totais do gráfico e tabela, filtros em data local e recomendações baseadas nos registros efetivos.

Commit: feat: implementa a task 21.

[ ] Task 22 — Implementar Ajustes e exclusão confirmada de progresso

Depende de: Tasks 05–06 e 20–21. Requisitos: RF013, RF058, RUI013, RUI016, RNF005, RNF011.

Implementar: texto Padrão/Ampliado com prévia, redução de movimento e modo de observação. Aplicar e persistir preferências. Respeitar redução solicitada pelo sistema. Integrar “Apagar meu progresso” ao serviço, com diálogo de confirmação, foco em Cancelar e mensagem clara. Atualizar Início, evolução e treino depois do reset; preservar preferências.

Validar: alteração imediata, F5, preferência do sistema, modo sem tempo e temporizado. Cancelar/Escape não apagam; confirmar remove só progresso do ReConecta; dados de outra chave e ajustes visuais permanecem.

Commit: feat: implementa a task 22.

Acabamento e verificação final

[ ] Task 23 — Ajustar todas as telas para celular e tablet

Depende de: Tasks 08–22. Requisitos: RUI007, RUI014, RNF005, RNF016.

Implementar: corrigir os layouts encontrados na inspeção de 320, 390, 768, 1024 e 1440 px. Ajustar margens, colunas, títulos longos, botões, navegação inferior, área segura e tabuleiros. Preservar os tamanhos mínimos; preferir mais linhas a encolher alvos. Carregar ativos de jogos sob demanda, reservar dimensões e medir o orçamento inicial proposto.

Validar: Início, catálogo, os 12 jogos, resultado, treino, evolução e Ajustes. Conferir rolagem vertical natural, ausência de rolagem horizontal obrigatória, controle encoberto ou imagem esticada. Não esconder overflow para disfarçar um layout quebrado.

Commit: feat: implementa a task 23.

[ ] Task 24 — Completar a acessibilidade dos fluxos

Depende de: Tasks 08–23. Requisitos: RF039, RUI008, RUI009, RUI012, RNF002–RNF005.

Implementar: corrigir problemas de semântica, ordem de foco, títulos, rótulos, anúncios, imagens, contrastes e diálogos. Garantir alternativa a arrastar, distinguir estados além da cor, esconder respostas de cartas fechadas e respeitar movimento reduzido. Corrigir o que a inspeção real apontar, sem adicionar ARIA desnecessária.

Validar: executar um percurso completo por teclado, percorrer todos os tipos de interação dos jogos e verificar leitura com tecnologia assistiva disponível. Conferir texto a 200%, refluxo em 320 CSS px, foco não encoberto, retorno de diálogos e contraste dos estados reais.

Commit: feat: implementa a task 24.

[ ] Task 25 — Resolver estados de falha e proteger os dados

Depende de: Tasks 05–24. Requisitos: RF061, RF062, RUI015, RNF010, RNF013–RNF015.

Implementar: finalizar mensagens e recuperação de rota inválida, imagem indisponível, falha ao salvar, JSON ilegível e versão desconhecida. Impedir gravação por callbacks de uma sessão já desmontada. Revisar cancelamento de timers/eventos, uso seguro de textos no DOM e ausência de dados fictícios ou controles sem ação.

Validar: simular cada falha sem apagar dados reais; voltar ao início após erro; tentar salvar novamente sem criar sessão duplicada. Confirmar que uma atividade desmontada não altera a atual e que a interface não afirma gravação quando houve falha.

Commit: feat: implementa a task 25.

[ ] Task 26 — Validar a aplicação completa e corrigir regressões

Depende de: Tasks 01–25. Requisitos: RNF006 e todos os critérios gerais de entrega de requirements.md e design.md.

Implementar: corrigir somente as regressões encontradas no fluxo final. Conferir integrações, imports, navegação, métricas, persistência e consistência visual. Remover logs de depuração e código abandonado diretamente relacionado a esta implementação, preservando alterações não relacionadas do usuário.

Validar: primeiro acesso → catálogo → jogo com erro/dica/acerto → resultado → treino completo → evolução → F5 → ajustes → cancelamento e confirmação de reset. Finalizar cada um dos 12 jogos, conferir os quatro níveis, sair/retomar um treino, usar teclado e conferir celular. Executar os testes de lógica relevantes e o comando de verificação já existente no projeto. Verificar em Chrome ou Edge e em Firefox, registrando versões realmente usadas; se um navegador não estiver disponível, registrar a verificação de compatibilidade correspondente como pendente. Confirmar ausência de erros críticos no console.

Commit: feat: implementa a task 26.

Reformulação visual — nova etapa

Executar esta etapa após verificar a base das Tasks 01–26. Se elas já estiverem concluídas no repositório, preservar suas marcações e commits e começar pela Task 27. Se ainda houver tarefa anterior pendente, manter a regra de executar a primeira pendente. Não recriar módulos prontos para aplicar os novos estilos.

Os critérios visuais da revisão 2.1 substituem os detalhes correspondentes da versão anterior. Em especial, o Início passa a mostrar três atividades em destaque e acesso aos 12 jogos em Atividades. O escopo funcional e os dados existentes permanecem válidos.

[ ] Task 27 — Aplicar a nova composição visual e os tokens refinados

Depende de: Task 26. Requisitos: RUI017, RUI001, RNF004.

Implementar: conferir a aparência atual no código e aplicar a paleta, as superfícies e as proporções da seção 15 do design. Criar tokens para destaque verde profundo, texto claro, botão verde-limão e navegação ativa. Unificar margens, largura máxima, espaçamento vertical e sombras. Aplicar as mudanças ao aplicativo real; não encerrar com uma página de amostras de cores.

Validar: conferir Início, catálogo e uma tela de exercício. Comparar hierarquia e distribuição de espaço antes/depois; verificar os contrastes dos novos pares e manter navegação e progresso funcionando.

Commit: feat: implementa a task 27.

[ ] Task 28 — Refinar marca, tipografia e família de ícones

Depende de: Task 27. Requisitos: RUI018, RUI012, RNF004.

Implementar: ajustar aplicação da marca existente, alinhamento do símbolo com o nome, escala de títulos, entrelinhas e pesos. Padronizar ícones da navegação e das ações, removendo misturas de emoji e famílias incompatíveis. Preservar fallback de fonte local e descrição acessível das ações.

Validar: conferir marca no desktop/celular, títulos longos, acentos, carregamento sem fonte opcional e texto ampliado. Ícones não devem substituir rótulos necessários nem aparecer desalinhados dentro de botões.

Commit: feat: implementa a task 28.

[ ] Task 29 — Refinar navegação, cabeçalho e alinhamento das telas

Depende de: Tasks 27–28. Requisitos: RUI019, RUI003.

Implementar: barra lateral de 232 px no desktop com marca, menu espaçado e item ativo suave; cabeçalho com contexto breve e alinhamento ao conteúdo. Padronizar início de títulos, painéis e grades. Manter quatro destinos, versão horizontal no tablet e navegação inferior no celular. Remover elementos de navegação duplicados e espaço decorativo que comprima a área útil.

Validar: trocar entre as quatro áreas, testar rota direta e foco, conferir alinhamentos em 768/1024/1440 px e manter o modo de foco dos exercícios.

Commit: feat: implementa a task 29.

[ ] Task 30 — Redesenhar a página inicial com destaque e três atividades

Depende de: Tasks 27–29. Requisitos: RF001, RF002, RUI020, RUI004.

Implementar: abertura curta, destaque verde profundo com mensagem e botão claro, composição decorativa discreta, faixa de progresso real/convite inicial e três cards. Aplicar o estado correto do treino: novo, parcial ou concluído. “Ver todas” abre o catálogo completo. Usar a seleção dos três jogos definida no design sem duplicação ou alteração do plano diário.

Validar: primeiro acesso sem estatísticas fictícias, usuário com histórico, treino parcial/concluído e acesso aos 12 jogos. Conferir que o destaque tem uma ação principal e que remover decoração no celular não remove informação necessária.

Commit: feat: implementa a task 30.

[ ] Task 31 — Transformar os cards e a apresentação do catálogo

Depende de: Tasks 28 e 30. Requisitos: RF002, RF057, RUI021, RUI005.

Implementar: cards com miniatura de 100–120 px, categoria discreta, título completo, descrição curta e ação alinhada ao fim. Ajustar busca, filtros e quantidade de resultados à nova composição. Cada card possui um único destino acionável e hover leve sem deslocar a grade. Usar os mesmos cards no Início e no catálogo.

Validar: exibir os 12 jogos, combinar busca/filtro, conferir os títulos mais longos e verificar ausência de botão aninhado em link. Testar teclado e texto ampliado com ações alinhadas e sem truncamento.

Commit: feat: implementa a task 31.

[ ] Task 32 — Refinar microtextos, estados vazios e mensagens de carregamento

Depende de: Tasks 30–31. Requisitos: RF061, RF062, RUI022, RUI015.

Implementar: aplicar linguagem e composição consistentes aos estados de primeiro acesso, busca vazia, histórico vazio, imagem indisponível e falha de gravação. Usar imagem/ícone pertinente, mensagem curta e ação útil. Ajustar proporção dos blocos e remover textos provisórios, repetições e avisos técnicos desnecessários ao usuário.

Validar: provocar os estados com dados de teste isolados; conferir ações de recuperação e mensagens fiéis ao erro. Não mostrar animação de carregamento para uma operação que já terminou nem ocultar uma falha de salvamento.

Commit: feat: implementa a task 32.

[ ] Task 33 — Unificar as miniaturas e imagens dos exercícios

Depende de: Tasks 28 e 31. Requisitos: RUI023, RUI012, RNF014, RNF016.

Implementar: revisar os ativos usados pelos 12 jogos e produzir/adaptar miniaturas que representem cada atividade. Padronizar fundo, traço, escala aparente e recorte. Substituir ativos provisórios inadequados por imagens locais reconhecíveis. Distinguir miniatura decorativa do card de imagem que integra a resposta. Otimizar arquivos e reservar dimensões.

Validar: verificar imagens nos quatro níveis quando os conjuntos variarem; nenhuma imagem deve ficar esticada, pouco reconhecível ou revelar a resposta pelo nome acessível de um item fechado. Conferir ativos ausentes, alternativas textuais e impacto no carregamento inicial.

Commit: feat: implementa a task 33.

[ ] Task 34 — Redesenhar os tabuleiros de memória e observação

Depende de: Tasks 27–28 e 33. Requisitos: RUI024, RF023–RF027.

Implementar: aplicar cartas com verso padronizado, faces proporcionais, espaçamento regular, progresso discreto e feedback estável no Jogo da Memória e em O Que Você Viu?. Manter a área visual equilibrada nas diferentes quantidades de elementos e nas fases de observação/resposta. Posicionar ajuda e controles próximos à atividade.

Validar: conferir 4/6/8/12 cartas, revelação, erro/acerto, fase de observação e modo sem limite de tempo. A mudança visual não pode permitir cliques extras, alterar tentativas ou deixar timer ativo depois de sair.

Commit: feat: implementa a task 34.

[ ] Task 35 — Refinar a apresentação dos jogos de linguagem

Depende de: Tasks 28 e 33. Requisitos: RUI025, RF028–RF032, RF048–RF049.

Implementar: redesenhar Monte a Palavra, Imagem e Palavra e Complete a Frase. Separar visualmente referência, área de resposta e opções usando espaço e hierarquia. Padronizar peças de sílabas, lacunas e alternativas; manter botões de desfazer/verificar no lugar esperado. Aplicar imagens e tipografia refinadas sem mudar as respostas.

Validar: BANANA com sílabas repetidas, palavras/frases maiores, ambos os sentidos de Imagem e Palavra, erro/dica/acerto e texto ampliado. Nenhuma peça pode sumir, ter texto cortado ou perder seu ID por uma alteração no DOM.

Commit: feat: implementa a task 35.

[ ] Task 36 — Refinar sequências, categorização e atenção

Depende de: Tasks 28 e 33. Requisitos: RUI026, RF033–RF037, RF040–RF043.

Implementar: aplicar molduras e escalas consistentes a Qual Não Combina?, Complete a Sequência, Encontre o Objeto e Toque Somente em.... Separar comando, padrão e alternativas. Padronizar seleção/resolução, contagem textual e espaçamento. Manter decoração fora da área usada para interpretar a resposta.

Validar: padrões visuais e numéricos, leitura sem depender só de cor, seleção de múltiplos alvos e o maior tabuleiro. Conferir que mudança de aparência não sugere a resposta nem duplica a contagem de um item resolvido.

Commit: feat: implementa a task 36.

[ ] Task 37 — Refinar rotinas, associações e situações do cotidiano

Depende de: Tasks 28 e 33. Requisitos: RUI027, RF038–RF039, RF044–RF047.

Implementar: melhorar proporções de linhas, numeração, títulos de grupos e controles em Organize a Rotina e Associação de Objetos. Em Situações do Cotidiano, dar destaque à pergunta e manter alternativas com pesos equivalentes. Simplificar a composição no celular, preservando seleção, foco e indicação dos pares/etapas resolvidos.

Validar: mover etapas por teclado, manter foco no item, associar e cancelar origem, responder pergunta e concluir. Os controles devem continuar com pelo menos 48 px e a solução não pode depender de arrastar ou de linhas decorativas.

Commit: feat: implementa a task 37.

[ ] Task 38 — Dar acabamento aos botões, campos e filtros

Depende de: Tasks 29–37. Requisitos: RUI028, RUI007, RUI008.

Implementar: revisar os componentes reais e eliminar variações acidentais de altura, raio, peso de texto, alinhamento de ícone e distância entre ações. Aplicar variantes principal/secundária/discreta/destrutiva e estados de foco, seleção, indisponibilidade e processamento. Padronizar busca, filtros e seletores sem duplicar estilos por tela.

Validar: controles com rótulos curtos/longos, mouse, teclado, toque e texto ampliado. Verificar foco não cortado, tamanho mínimo, contraste dos estados e ausência de deslocamento ao selecionar ou passar o mouse.

Commit: feat: implementa a task 38.

[ ] Task 39 — Refinar feedback, resultado e diálogos

Depende de: Tasks 34–38. Requisitos: RUI029, RF019–RF022, RF060.

Implementar: feedback proporcional e estável, resultado com estrelas bem desenhadas e ações claras, diálogos de pausa/saída/exclusão com a mesma linguagem visual. Evitar mensagens que cubram o tabuleiro, comemoração excessiva ou destaque punitivo para erros. Preservar regras, duração ativa e semântica acessível.

Validar: resultado com uma, duas e três estrelas, erro, ajuda, pausa, cancelamento e saída confirmada. Conferir foco contido/devolvido, botão seguro na confirmação destrutiva, redução de movimento e ausência de dupla conclusão.

Commit: feat: implementa a task 39.

[ ] Task 40 — Redesenhar a apresentação de Minha evolução

Depende de: Tasks 27–28 e 38. Requisitos: RUI030, RUI011, RF053–RF056.

Implementar: reorganizar os totais reais, participação por período, categorias e histórico com pesos visuais distintos. Padronizar títulos, números, datas, linhas e estados vazios. Ajustar desenho do gráfico para leitura clara, mantendo valores e alternativa textual. Separar detalhes do resumo sem remover informações existentes.

Validar: histórico vazio, poucos dados, muitos registros, filtros de período e totais legados. Conferir os mesmos valores antes/depois, ausência de dados ilustrativos e legibilidade das datas e da tabela em telas pequenas.

Commit: feat: implementa a task 40.

[ ] Task 41 — Refinar a tela de Ajustes e suas preferências

Depende de: Tasks 38–40. Requisitos: RUI031, RF058, RUI016.

Implementar: organizar seções de leitura, movimento, observação e progresso com descrição curta e controle alinhado. Preparar a composição para a seção de aparência da Task 42. Aplicar prévia de texto legível, divisórias discretas e separação clara da exclusão de dados. Não criar controles aparentes sem comportamento real.

Validar: alteração e persistência das preferências existentes, reset cancelado/confirmado, texto ampliado e layout estreito. A preparação para aparência não pode exibir seletor inoperante.

Commit: feat: implementa a task 41.

[ ] Task 42 — Implementar os temas Claro, Escuro e Sistema

Depende de: Tasks 27–41. Requisitos: RF063, RUI032, RNF004, RNF010.

Implementar: tema escuro completo segundo os tokens do design e seletor funcional em Ajustes. Persistir appearance sem alterar sessões; aplicar Sistema quando o campo estiver ausente. Atualizar a aparência sem remontar o jogo, resetar foco ou perder seleções. Tratar todas as superfícies e estados, inclusive gráficos, diálogos e feedback.

Validar: mudança imediata, F5, preferência do sistema, seleção explícita, dados anteriores e falha de armazenamento. Conferir contraste de texto/controles, imagens preservadas, exercício em andamento e texto ampliado nos dois temas.

Commit: feat: implementa a task 42.

[ ] Task 43 — Ajustar a nova composição para celular e tablet

Depende de: Tasks 29–42. Requisitos: RUI033, RUI014, RNF005.

Implementar: refinar a composição em 320/390/768 px: uma coluna de cards no celular, duas no tablet, decoração reduzida no destaque, navegação inferior com área segura e controles em posições confortáveis. Adaptar tabuleiros, diálogos e dados sem miniaturizar a interface de desktop nem esconder conteúdo necessário.

Validar: orientação estreita e paisagem quando disponível, texto ampliado, ambos os temas, títulos longos e todos os tipos de interação dos jogos. Conferir alvos mínimos, nenhum botão encoberto e ausência de rolagem horizontal obrigatória.

Commit: feat: implementa a task 43.

[ ] Task 44 — Fazer a revisão visual final e corrigir o acabamento

Depende de: Tasks 27–43. Requisitos: RUI034, RNF017 e critérios de reformulação da seção 11 de requirements.md.

Implementar: corrigir inconsistências observadas em Início, catálogo, famílias de jogos, resultado, treino, evolução e Ajustes. Comparar as telas com a seção 15 do design e com referências visuais disponíveis, em estados equivalentes. Revisar alinhamento, proporção, contraste, escala de imagens, sombras, foco e espaçamentos. Remover CSS duplicado ou conflitante criado pela reformulação.

Validar: inspeção real em 320/390/768/1024/1440 px, temas claro/escuro, texto ampliado e redução de movimento. Registrar as telas e verificações efetivamente realizadas; conferir navegação, uma atividade por família, treino e persistência após os ajustes. Não marcar esta task apenas porque a página abre ou porque o CSS foi alterado.

Commit: feat: implementa a task 44.

Ampliação dos jogos — novas Tasks 45–68

Entregar 20 fases reais por jogo, sem recomeçar a aplicação. Esta etapa usa requirements.md, seção 12, e design.md, seção 16. As tarefas de conteúdo abaixo incluem programação, banco de desafios e integração com o jogo existente. Não basta adicionar números ou repetir a mesma partida com outro título.

A numeração das fases é independente dos quatro níveis da prática livre. A conclusão libera a fase seguinte; estrelas, erros, tempo e dicas não bloqueiam o avanço. A alteração deve preservar a reformulação visual já feita. Ativar o acesso às fases de cada jogo quando seu banco estiver válido; a entrega final exige os 12 jogos completos.

[ ] Task 45 — Criar o registro de fases e os contratos de conteúdo

Depende de: Tasks 05–07 e 26. Requisitos: RF064, RF068, RF089, RNF018.

Implementar: acrescentar um registro declarativo de fases com ID estável, jogo, ordinal, bloco, título, nível, versão de conteúdo, unidade, referências, instrução e dica. Criar resolução por ID e validação básica reutilizável nos bancos das próximas tarefas. Preservar motores e catálogo existentes. Uma fase de tabuleiro referencia um conjunto; as demais referenciam três desafios. Preparar os quatro blocos de cinco e cálculos de totais por registro, sem gerar fases vazias ou falsamente jogáveis.

Validar: uma definição real válida é resolvida; IDs duplicados, referências inexistentes, ordinal inválido e unidade incompatível são rejeitados com indicação do erro. A estrutura aceita novos registros sem duplicar o motor. A aplicação existente continua abrindo seus jogos enquanto os bancos são ampliados.

Commit: feat: implementa a task 45.

[ ] Task 46 — Acrescentar persistência e migração do progresso de fases

Depende de: Tasks 05 e 45. Requisitos: RF070, RF071, RF090, RNF019.

Implementar: ampliar o armazenamento para a versão 3, acrescentando phaseProgress, modo, fase e versão de conteúdo às sessões e referências aos slots diários. Preservar todos os campos anteriores reconhecidos, níveis, totais, histórico e preferências. Migrar sessões sem fase conforme sua referência de treino; não criar conclusões de fase a partir de totais antigos. Preparar a resolução de referências pendentes do treino para a integração da Task 63, preservando planos anteriores. Manter proteção de JSON inválido, versões futuras e falhas de gravação.

Validar: migração de dados conhecidos com sessões concluídas/interrompidas, totais e plano parcial; segunda abertura sem alteração de totais; nível preservado; preferências intactas; zero fases inventadas. Confirmar que erro de gravação ou estrutura desconhecida não sobrescreve o original. Reset confirmado inclui fases sem apagar preferências.

Commit: feat: implementa a task 46.

[ ] Task 47 — Implementar desbloqueio, repetição e conclusão única

Depende de: Tasks 45–46. Requisitos: RF066–RF068, RF072, RF088, RNF019.

Implementar: derivar os estados concluída/disponível/bloqueada a partir do catálogo e das conclusões. Integrar a conclusão ao serviço de sessão, atualizando melhor resultado, datas e quantidade de conclusões em uma única transição. Liberar somente a próxima fase do mesmo jogo. Separar estrelas do percurso das estrelas históricas. Restringir a janela adaptativa às sessões de prática livre, mantendo a dificuldade fixa nas fases e no treino.

Validar: fase 1 disponível; fase 2 bloqueada antes da conclusão; muitos erros ainda permitem avanço; abandonar não libera; outro jogo permanece intacto. Repetição não aumenta fases distintas nem reduz recorde; evento duplicado não altera contagens. Sessões de fase não mudam o nível da prática livre.

Commit: feat: implementa a task 47.

[ ] Task 48 — Criar o mapa de fases e proteger as rotas

Depende de: Tasks 03, 31, 44–47. Requisitos: RF065, RF066, RF090, RUI035, RUI038.

Implementar: criar a tela com título do jogo, resumo real, quatro blocos, cards de fase, continuidade e opção de prática livre. Acrescentar as rotas da seção 16.2 do design e validar IDs/desbloqueio antes de iniciar. Reutilizar identidade, componentes, temas, navegação e foco existentes. Manter a entrada antiga de prática livre compatível; conectar cada card do catálogo ao mapa quando as 20 fases daquele jogo estiverem prontas.

Validar: primeira visita, fases concluídas, bloqueadas e percurso completo; teclado e nomes acessíveis. URL direta bloqueada/inexistente não cria sessão nem permite jogar. Acesso à prática livre e retorno ao catálogo funcionam. Não mostrar dados de demonstração no uso normal.

Commit: feat: implementa a task 48.

[ ] Task 49 — Integrar as fases ao controlador comum dos jogos

Depende de: Tasks 06–07 e 45–48. Requisitos: RF068, RF088, RF090, RUI036.

Implementar: estender o contexto de montagem com modo, fase, ordinal, total e versão do conteúdo. Resolver e congelar configuração/conteúdo no início da sessão. Exibir “Fase N de 20” separado do andamento interno. Preservar ajuda, pausa, avaliação, timers, saída, desmontagem e modo de observação. Prática livre continua escolhendo conteúdo pelo nível adaptativo, com fase nula. A abertura de instruções não cria atividade realizada.

Validar: pausar, alterar tema e pedir dica não trocam o conteúdo; reiniciar encerra a sessão anterior antes de criar outra; reload conserva registros e permite recomeçar a mesma fase. Fases ausentes têm saída útil. O contexto de um jogo não vaza para outro, e não ficam timers ativos após sair.

Commit: feat: implementa a task 49.

[ ] Task 50 — Entregar 20 fases do Jogo da Memória

Depende de: Tasks 08 e 49. Requisitos: RF069, RF073, RNF020.

Implementar: criar 20 conjuntos distintos, cinco por bloco, usando 2/3/4/6 pares. Variar objetos e temas com ilustrações coerentes; cada par possui duas cartas. Adaptar o motor para receber o conjunto da fase e manter embaralhamento apenas no início da nova sessão. Conectar o mapa do jogo e suas 20 fases válidas.

Validar: todos os tabuleiros passam pelo validador; não há conjuntos duplicados escondidos por outra ordem. Jogar uma fase de cada bloco, verificar pares, carta já resolvida, duplo clique, dicas e conclusão. Doze cartas cabem com alvos confortáveis. Repetir um tabuleiro preserva o melhor resultado.

Commit: feat: implementa a task 50.

[ ] Task 51 — Entregar 20 fases de O Que Você Viu?

Depende de: Tasks 09 e 49. Requisitos: RF069, RF074, RNF020.

Implementar: criar 60 desafios distintos, três por fase, com 2/3/4/5 imagens observadas e 2/3/4/4 opções por bloco. Usar conjuntos novos e uma resposta inequívoca por pergunta. Preservar “Já observei” e, quando escolhido, tempo sugerido de 12/10/8/6 segundos. Integrar as 20 fases ao mapa.

Validar: banco completo, uma fase por bloco e ambos os modos de observação. Pausa e aba oculta conservam tempo restante; retornar não cria timer concorrente. Observar não conclui a fase; os três desafios precisam ser respondidos. Alternativas incorretas não satisfazem a pergunta.

Commit: feat: implementa a task 51.

[ ] Task 52 — Entregar 20 fases de Monte a Palavra

Depende de: Tasks 10 e 49. Requisitos: RF069, RF075, RNF020.

Implementar: criar 60 desafios de palavras distintas, três por fase: 2/3/4 sílabas nos primeiros blocos e 4–5 sílabas com 1–2 distratores no último. Revisar separação silábica, acentos, imagem e dica de cada palavra. Preservar seleção, desfazer e validação por texto das peças, inclusive sílabas repetidas. Integrar as 20 fases ao mapa.

Validar: contagens e referências de todas as palavras, sem clones por troca de imagem ou caixa do texto; jogar uma fase por bloco. Montar palavra com sílabas repetidas, corrigir seleção errada e usar teclado. A ordem dos IDs de peças iguais não invalida uma palavra correta.

Commit: feat: implementa a task 52.

[ ] Task 53 — Entregar 20 fases de Imagem e Palavra

Depende de: Tasks 11 e 49. Requisitos: RF069, RF076, RNF020.

Implementar: criar 60 desafios distintos, três por fase, com 2/3/4/4 alternativas. Distribuir palavra→imagem e imagem→palavra no banco, usando vocabulário variado e imagens identificáveis. Não reaproveitar a mesma pergunta com opções apenas reordenadas. Integrar as 20 fases ao mapa, respeitando o conteúdo recebido pelo controlador.

Validar: uma resposta correta por desafio, imagens existentes e distratores distintos; jogar uma fase por bloco e ambas as direções. Acerto aguarda “Continuar”, erro permite nova tentativa e repetir clique não duplica pontuação. Conferir nomes acessíveis sem revelar a resposta indevidamente.

Commit: feat: implementa a task 53.

[ ] Task 54 — Entregar 20 fases de Qual Não Combina?

Depende de: Tasks 12 e 49. Requisitos: RF069, RF077, RNF020.

Implementar: criar 60 grupos distintos, três por fase, sempre com quatro opções e um intruso. Evoluir de categorias evidentes para relações de uso, função e contexto explícito. Registrar o critério do grupo e dicas compatíveis; revisar itens que poderiam pertencer a mais de uma categoria. Integrar as 20 fases ao mapa.

Validar: em todos os grupos, três itens atendem ao critério declarado e somente um não atende. Jogar uma fase por bloco; verificar dica, resposta, continuidade manual e leitura da instrução. Corrigir relações ambíguas em vez de apenas marcar uma alternativa como correta nos dados.

Commit: feat: implementa a task 54.

[ ] Task 55 — Entregar 20 fases de Complete a Sequência

Depende de: Tasks 13 e 49. Requisitos: RF069, RF078, RNF020.

Implementar: criar 60 padrões distintos, três por fase, distribuindo AB, ABC, AAB/ABB e padrões visuais ou numéricos mais elaborados. Usar 2/3/3/4 alternativas por bloco. Registrar a regra e a resposta, apresentar elementos suficientes para identificá-la e distinguir formas além da cor. Integrar as 20 fases ao mapa.

Validar: resposta consistente com a regra em todos os dados e sem alternativas equivalentes. Jogar uma fase por bloco, incluindo os dois padrões do terceiro bloco e um numérico quando presente. Sequência legível em celular, sem rolagem horizontal obrigatória ou quebra da ordem de leitura.

Commit: feat: implementa a task 55.

[ ] Task 56 — Entregar 20 fases de Organize a Rotina

Depende de: Tasks 14 e 49. Requisitos: RF069, RF079, RNF020.

Implementar: criar 60 rotinas distintas, três por fase, com 3/4/5/6 passos por bloco. Delimitar a sequência no enunciado e registrar ordens alternativas válidas quando necessário. Preservar movimentos por botões e teclado; arrastar pode ser complementar. Integrar as 20 fases ao mapa e oferecer dicas específicas por rotina.

Validar: todos os passos aparecem uma vez, respostas aceitas são permutações válidas e nenhuma rotina depende de ordem arbitrária. Jogar uma fase por bloco, inclusive com seis passos e uma ordem alternativa. A avaliação ocorre ao confirmar a organização, sem pontuar movimentos individuais.

Commit: feat: implementa a task 56.

[ ] Task 57 — Entregar 20 fases de Encontre o Objeto

Depende de: Tasks 15 e 49. Requisitos: RF069, RF080, RNF020.

Implementar: criar 60 buscas distintas, três por fase, com 4/6/8/9 opções por bloco. Variar objetos, alvos e contextos; cada busca precisa de um alvo único, reconhecível e acessível. Preservar a legibilidade das imagens e a grade responsiva. Integrar as 20 fases ao mapa.

Validar: alvo presente exatamente uma vez, imagens válidas e distratores distintos em todo o banco. Jogar uma fase por bloco; conferir nove opções em tela estreita, foco, dica, resposta e continuação manual. O tema escuro não esconde detalhes que identificam o objeto.

Commit: feat: implementa a task 57.

[ ] Task 58 — Entregar 20 fases de Toque Somente em...

Depende de: Tasks 16 e 49. Requisitos: RF069, RF081, RNF020.

Implementar: criar 60 conjuntos distintos, três por fase, com 4/6/8/9 objetos e 2/3/3/4 alvos por bloco. Variar critérios claros de categoria ou função e registrar todos os alvos corretos. Preservar seleção por toque/teclado e proteção contra recontagem de item resolvido. Integrar as 20 fases ao mapa.

Validar: quantidade de itens/alvos em todas as fases; nenhum alvo fica fora do critério e nenhum distrator satisfaz a regra. Jogar uma fase por bloco, errar, pedir dica e clicar novamente em item correto. Concluir apenas quando todos os alvos dos três conjuntos estiverem resolvidos.

Commit: feat: implementa a task 58.

[ ] Task 59 — Entregar 20 fases de Associação de Objetos

Depende de: Tasks 17 e 49. Requisitos: RF069, RF082, RNF020.

Implementar: criar 20 tabuleiros distintos, cinco por bloco, com 2/3/4/5 pares. Variar relações de objeto/função, objeto/local e usos complementares, garantindo correspondência inequívoca. Preservar seleção de origem e destino, confirmação visual e categoria principal Associação. Integrar as 20 fases ao mapa.

Validar: relações e referências de todos os tabuleiros, sem clones por embaralhamento. Jogar uma fase por bloco e verificar que um destino não é resposta válida para múltiplas origens. Pares resolvidos não pontuam novamente; a sessão conta uma vez, inclusive quando o jogo ocupa o grupo Cotidiano do treino.

Commit: feat: implementa a task 59.

[ ] Task 60 — Entregar 20 fases de Situações do Cotidiano

Depende de: Tasks 18 e 49. Requisitos: RF069, RF083, RNF020.

Implementar: criar 60 situações distintas, três por fase, com 2/3/3/4 alternativas por bloco. Variar comunicação, organização e tarefas familiares, com enunciado que determine uma única resposta. Usar texto curto e ilustração coerente quando pertinente. Integrar as 20 fases ao mapa e manter dicas disponíveis.

Validar: revisar todos os enunciados e distratores para não penalizar escolhas pessoais igualmente válidas. Jogar uma fase por bloco, conferir títulos/textos longos, teclado, dicas e avanço manual. Não aumentar dificuldade por ambiguidade da escrita.

Commit: feat: implementa a task 60.

[ ] Task 61 — Entregar 20 fases de Complete a Frase

Depende de: Tasks 19 e 49. Requisitos: RF069, RF084, RNF020.

Implementar: criar 60 frases distintas, três por fase, com 2/3/3/4 alternativas por bloco. Variar objetos, ações e contextos; revisar concordância, acentuação e sentido da frase completa. Garantir uma resposta correta por contexto, com dicas que orientem a escolha. Integrar as 20 fases ao mapa.

Validar: banco completo e frases formadas por cada alternativa; corrigir distratores que também produzam resposta válida. Jogar uma fase por bloco, conferir leitura com lacuna, seleção, foco e continuação manual. A fase só termina depois dos três desafios.

Commit: feat: implementa a task 61.

[ ] Task 62 — Completar resultado, repetição e passagem de fase

Depende de: Tasks 47–61. Requisitos: RF067, RF072, RF085, RUI037.

Implementar: acrescentar ao resultado o número da fase, estrelas desta tentativa, melhor resultado e ações da seção 16.8 do design. Implementar “Próxima fase”, “Repetir fase” e “Ver fases”, sempre por ação explícita. Na fase 20, mostrar conclusão do percurso e oferecer repetição/outro jogo. Na repetição de fase antiga, a próxima ação segue o ordinal; o mapa continua apontando para a primeira pendente.

Validar: concluir pela primeira vez, repetir com resultado inferior/superior, voltar ao resultado e clicar duas vezes. Confirmar recorde preservado, zero contagem duplicada e inexistência de fase 21. Verificar fronteiras 5→6, 10→11 e 15→16, foco e mensagem de falha de salvamento.

Commit: feat: implementa a task 62.

[ ] Task 63 — Integrar fases e migração ao Treino de Hoje

Depende de: Tasks 20 e 46–62. Requisitos: RF071, RF072, RF086, RNF019.

Implementar: manter os cinco grupos e congelar a primeira fase pendente disponível de cada jogo selecionado no plano. Quando todas estiverem concluídas, usar a fase concluída praticada há mais tempo, com desempate por ordinal. Persistir fase e versão por slot; completar referências somente em slots legados pendentes. Atualizar fase, sessão e slot no mesmo salvamento. Aplicar as ações específicas de resultado do treino, sem avançar automaticamente.

Validar: treino novo e parcial; recarga; fase feita fora do treino depois da criação do plano; todas as fases já concluídas; data local mudando durante o treino. Um slot concluído não inicia nova sessão diária. Migração mantém escolhas/slots anteriores, não premia conclusões antigas e não muda referências na segunda abertura.

Commit: feat: implementa a task 63.

[ ] Task 64 — Exibir avanço das fases no catálogo e na evolução

Depende de: Tasks 21 e 46–63. Requisitos: RF087, RUI038.

Implementar: acrescentar fases distintas concluídas por jogo e no total, barras proporcionais e resumo de melhores estrelas do percurso. Separar essa métrica das estrelas históricas de sessões. Identificar fase e modo no histórico quando conhecidos. Integrar os cards do catálogo e destaques do Início aos dados reais e manter filtros, recomendações e estados vazios existentes.

Validar: zero histórico, histórico legado sem fases, um jogo parcial e todos os jogos completos em dados de teste. Uma fase repetida dez vezes conta como uma; máximos do percurso são 20/240 fases e 60/720 estrelas por jogo/total. Estrelas históricas podem ultrapassar 720 sem corromper o percurso. Não inventar fase para sessão antiga.

Commit: feat: implementa a task 64.

[ ] Task 65 — Validar integralmente o banco das 240 fases

Depende de: Tasks 45 e 50–61. Requisitos: RF064, RF069, RF089, RNF020.

Implementar: completar um comando de validação do banco usando o ambiente já disponível. Cobrir IDs, ordinais, blocos, versões, referências, contagens, configurações, respostas, dicas e imagens. Detectar duplicações com assinatura semântica adequada a cada jogo, ignorando IDs e embaralhamento. Conferir 240 fases, pelo menos 600 desafios distintos de rodadas e 40 tabuleiros distintos. Corrigir o conteúdo que falhar e revisar ambiguidades que a validação automática não resolve.

Validar: executar sobre todo o banco real e obter relatório sem erros. Demonstrar que registros inválidos e clones normalizados são detectados em casos de teste temporários, sem deixá-los no banco de produção. Verificar referências de imagens e ausência de conteúdo provisório. Não considerar apenas contagem de arquivos como prova de 240 fases.

Commit: feat: implementa a task 65.

[ ] Task 66 — Refinar aparência e acessibilidade das novas telas

Depende de: Tasks 43–44 e 48–65. Requisitos: RUI035–RUI038, RNF017.

Implementar: ajustar mapa, resumo de progresso, cabeçalho de fase e resultado à identidade existente. Refinar colunas por largura, espaçamento, tamanho de imagem, hierarquia dos quatro blocos e destaque da fase disponível. Garantir textos de estado, foco, navegação por teclado, áreas de toque, temas e texto ampliado. Corrigir rolagem horizontal ou excesso de informação ao redor do exercício.

Validar: inspecionar mapa, exercício e resultado em 320/390/768/1024/1440 px; ambos os temas, texto ampliado e movimento reduzido. Conferir 20 fases no mapa, títulos longos, bloqueadas/concluídas/disponíveis e percurso completo. Os controles mantêm pelo menos 48 px e escolhas de jogo seguem os alvos definidos no design.

Commit: feat: implementa a task 66.

[ ] Task 67 — Verificar integridade e corrigir regressões de progressão

Depende de: Tasks 45–66. Requisitos: RF066–RF072, RF085–RF090, RNF019.

Implementar: acrescentar ou ajustar testes de comportamento onde houver risco real: desbloqueio, idempotência, recordes, migração, falhas de persistência, separação dos modos e integração diária. Usar os módulos reais; não criar testes que apenas repitam constantes de CSS ou a própria implementação. Corrigir defeitos encontrados antes de marcar a tarefa.

Validar: fase bloqueada por URL, abandono, conclusão repetida, regravação após quota, recarga ativa, reset, JSON inválido/versão futura, migração aplicada duas vezes e janela adaptativa somente da prática livre. Cobrir plano diário congelado, sessão sem referência de slot e término da fase 20. Registrar comandos e resultados reais; não declarar aprovação de testes indisponíveis.

Commit: feat: implementa a task 67.

[ ] Task 68 — Concluir a verificação integrada dos 12 jogos com fases

Depende de: Tasks 65–67. Requisitos: RF064–RF090, RUI035–RUI038, RNF018–RNF020.

Implementar: revisar a entrega integrada e corrigir falhas restantes: todos os jogos com 20 fases, acesso principal pelo mapa, prática livre preservada, resultado, treino, evolução e persistência conectados. Remover dados provisórios e atalhos de desbloqueio usados apenas em testes. Preservar histórico, aparência e funcionalidades anteriores. Não encerrar a ampliação com jogos ainda usando fases vazias ou clonadas.

Validar: executar a validação das 240 definições e os testes relevantes da Task 67. Conferir interativamente pelo menos uma fase de cada bloco em cada jogo, totalizando 48 combinações, aproveitando evidências já produzidas nas Tasks 50–61 quando continuarem válidas. Verificar limites 5→6, 10→11 e 15→16, conclusão da fase 20, treino completo, repetição, recarga e prática livre. Consolidar um registro breve das verificações efetivamente executadas; corrigir problemas antes do commit final.

Commit: feat: implementa a task 68.

Verificações de maior risco

Risco

Tasks responsáveis

Recriar estrutura pronta ou perder código existente

01–03 e regra de execução.

Perder progresso antigo ou contar a migração duas vezes

05 e 25.

Duplicar tentativas, estrelas ou conclusões

06, 08, 16, 17 e 20.

Subir/descer nível com dados insuficientes

07.

Timer continuar depois de sair do jogo

06, 09 e 25.

Perder etapas concluídas do treino

20.

Recomendação errada por falta de amostra

21.

Reset apagar preferências ou dados de outras aplicações

05 e 22.

Design bonito com controles pequenos ou inacessíveis

23–24.

Aplicativo mostrar estados fictícios ou sem ação útil

04, 21, 25 e 26.

Trocar cores sem corrigir composição e proporções

27, 30, 31 e 44.

Perder acesso a jogos ao simplificar o Início

30–31.

Melhorar aparência e quebrar interação ou pontuação

34–39.

Misturar imagens e ícones de estilos incompatíveis

28 e 33.

Tema escuro ilegível ou mudança de tema reiniciar jogo

42.

Miniaturizar o desktop para caber no celular

43 e 66.

Chamar embaralhamentos do mesmo conteúdo de novas fases

45, 50–61 e 65.

Perder histórico na migração para fases

46, 63 e 67.

Liberar fases por URL ou alterar outro jogo

47–49 e 67.

Confundir estrelas históricas com melhores estrelas de fases

47, 62 e 64.

Prática livre mudar a dificuldade fixa de uma fase

47, 49 e 67.

Treino duplicar recompensas ou trocar a fase já escolhida

63 e 67.

Mapa inacessível ou 20 fases com botões sem ação

48, 66 e 68.

Declarar 240 fases apenas pela existência de IDs

65 e 68.

Registro de conclusão

Ao finalizar uma task, manter um registro curto neste espaço, sem reproduzir toda a implementação: número, comportamento entregue, verificações executadas e hash do commit. Como o hash só existe após o commit, anotar depois sem reescrever o histórico; essa anotação pode seguir no próximo commit ou no relatório final. A atualização da marcação deve estar no commit da própria task.

Nenhuma task foi executada apenas pela criação deste plano. O registro de implementação começa quando o código do aplicativo for efetivamente alterado ou verificado.
