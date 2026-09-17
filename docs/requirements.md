ReConecta — Requisitos do aplicativo

> Nota de vigência (17/09/2026): o percurso atual possui 3 fases por jogo — Fácil, Médio e Difícil. As referências a 20 fases abaixo registram a especificação histórica anterior e foram substituídas pela implementação atual.

Versão: 3.0 · Mais fases para os 12 minijogos
Data: 16/09/2026
Documentos relacionados: design.md e tasks.md.

Prioridade desta revisão: ampliar cada um dos 12 jogos para 20 fases, totalizando 240 fases. A seção 12 orienta as novas Tasks 45–68 e complementa a reformulação visual da seção 11. Preservar funcionalidades, aparência, progresso e tarefas concluídas no projeto existente. Esta documentação especifica a ampliação; não afirma que ela já foi implementada.

1. Objetivo e base desta revisão

O ReConecta é uma aplicação web de atividades cognitivas e de linguagem. Deve oferecer exercícios de memória, atenção, linguagem, associação, raciocínio e situações do cotidiano com instruções simples, dificuldade gradual e incentivo à participação.

Esta revisão transforma a documentação existente em uma especificação de produto com direção visual definida, telas, componentes, estados e critérios de aceitação. A base é o documento “Projeto fono(1).txt” e a especificação acadêmica anterior. O escopo vigente continua sendo de 12 minijogos; a proposta inicial de cinco jogos é uma etapa histórica do projeto.

São decisões propostas nesta revisão: identidade em verde e tons claros, catálogo com filtros, navegação em quatro áreas, preferências de leitura e movimento, regras numéricas de progressão e tratamento explícito de sessões interrompidas. Essas decisões detalham a implementação; não representam funcionalidades já verificadas no código.

O código atual do VS Code não foi inspecionado nesta revisão. A implementação deve começar pela leitura dos arquivos existentes e reaproveitar funcionalidades prontas. index.html, README.md e a documentação já existem: não criar tarefas para refazê-los. Pequenos ajustes de integração no HTML existente são permitidos quando necessários.

2. Experiência desejada

O aplicativo deve ser acolhedor, organizado e fácil de entender por pessoas com diferentes níveis de familiaridade com tecnologia. A interface não deve pressupor um diagnóstico, uma faixa etária específica ou conhecimento técnico.

A pessoa entende a próxima ação pela instrução e pelo botão principal.

Cada exercício apresenta somente os elementos necessários para resolvê-lo.

Erros geram orientação e nova tentativa; não há perda de vidas ou bloqueio por desempenho.

A pessoa pode sair, pedir ajuda, aumentar o texto e controlar o ritmo.

Estrelas valorizam atividades concluídas. Não há ranking, sequência diária punitiva ou comparação entre pessoas.

O histórico descreve uso e resultados dos exercícios, sem prometer benefícios clínicos.

3. Escopo

3.1 Áreas do aplicativo

Área

Finalidade

Início

Apresentar o Treino de Hoje, um resumo real e acesso aos 12 jogos.

Atividades

Explorar os jogos, filtrar por categoria e buscar pelo nome.

Minha evolução

Consultar atividades realizadas, estrelas, histórico e sugestões.

Ajustes

Alterar leitura, movimento e tempo de observação; gerenciar progresso local.

Exercício e resultado

Realizar um jogo, receber ajuda, concluir e escolher a próxima ação.

3.2 Catálogo e classificação oficial

A categoria principal é usada em filtros e métricas. O grupo de treino organiza a sequência diária. Cada sessão conta em uma única categoria principal.

ID estável

Minijogo

Categoria principal

Grupo do treino

memory

Jogo da Memória

Memória

Memória

what-did-you-see

O Que Você Viu?

Memória

Memória

word-builder

Monte a Palavra

Linguagem

Linguagem

image-word

Imagem e Palavra

Linguagem

Linguagem

odd-one-out

Qual Não Combina?

Raciocínio

Raciocínio

sequence

Complete a Sequência

Raciocínio

Raciocínio

organize-routine

Organize a Rotina

Cotidiano

Cotidiano

find-object

Encontre o Objeto

Atenção

Atenção

tap-only

Toque Somente em...

Atenção

Atenção

object-association

Associação de Objetos

Associação

Cotidiano

daily-situations

Situações do Cotidiano

Cotidiano

Cotidiano

complete-sentence

Complete a Frase

Linguagem

Linguagem

3.3 Tecnologias e limites

Usar HTML5, CSS3, JavaScript puro com ES Modules e localStorage, executados por servidor HTTP local, como o Live Server do VS Code. A aplicação permanece uma SPA com um único index.html. Esta versão considera uma sessão de uso em uma aba; edição simultânea e sincronização entre abas não fazem parte do escopo.

Não incluir nesta versão backend, cadastro, login, sincronização em nuvem, banco remoto, reconhecimento de voz, exercícios de áudio, painel profissional, pagamentos ou recomendação por inteligência artificial. Não adicionar framework, biblioteca de componentes ou ferramenta de build apenas para aplicar o design.

4. Requisitos funcionais preservados

Os identificadores RF001–RF056 da especificação anterior são mantidos. Os critérios abaixo tornam seus comportamentos verificáveis. Todos integram a entrega desta versão.

4.1 Navegação, registro e persistência

ID

Requisito

Critério de aceitação

RF001

Exibir a tela inicial.

Ao abrir, mostrar ReConecta, uma orientação curta, o Treino de Hoje e acesso às atividades.

RF002

Disponibilizar os 12 jogos.

Atividades reúne os 12 jogos. Após a reformulação visual, o Início destaca três cards e oferece “Ver todas” para o catálogo completo. Nenhum jogo desaparece por falta de histórico.

RF003

Abrir a atividade escolhida.

O card abre o mapa de fases do jogo correspondente dentro de #app, sem novo arquivo HTML; a prática livre continua acessível.

RF004

Permitir voltar ao início.

Todo jogo oferece “Voltar ao início”; uma sessão em andamento usa o fluxo de saída de RF060.

RF005

Exibir instruções simples.

Antes de começar, mostrar título, instrução de uma ou duas frases e “Começar atividade”. A instrução continua disponível durante o jogo.

RF006

Registrar tentativas válidas.

Uma resposta avaliada gera exatamente uma tentativa; navegação, ajuda e clique repetido em item resolvido não geram tentativas.

RF007

Registrar acertos.

Uma resposta correta aumenta acertos e tentativas uma vez.

RF008

Registrar erros com acolhimento.

Uma resposta incorreta aumenta erros e tentativas uma vez, exibe orientação e permite tentar novamente.

RF009

Registrar conclusão.

Concluir todos os objetivos aumenta atividades realizadas uma vez; duplo clique ou retorno ao resultado não duplica o registro.

RF010

Registrar tempo ativo.

Armazenar duração em milissegundos, excluindo pausas e tempo com a aba oculta. Tempo não altera estrelas ou dificuldade.

RF011

Salvar progresso.

Com armazenamento disponível, tentativas avaliadas e conclusões sobrevivem à atualização da página.

RF012

Recuperar progresso.

Carregar dados válidos na abertura; preservar dados anteriores por migração, sem inventar sessões antigas.

RF013

Apagar progresso com confirmação.

Cancelar preserva tudo; confirmar remove somente os dados de progresso do ReConecta e mantém preferências visuais.

4.2 Dificuldade, estrelas e ajuda

ID

Requisito

Critério de aceitação

RF014

Suportar quatro níveis internos.

Cada jogo possui configurações para Inicial, Fácil, Intermediário e Avançado, equivalentes aos níveis 1–4.

RF015

Variar quantidade de elementos.

Os jogos com tabuleiros ou alternativas usam as quantidades definidas em design.md, sem reduzir os alvos abaixo do tamanho mínimo.

RF016

Variar complexidade linguística.

Palavras, frases e relações têm conteúdo válido para os quatro níveis.

RF017

Ajustar ajuda.

Cada conteúdo tem instrução e dica compatível; o botão de ajuda permanece disponível em todos os níveis.

RF018

Manter níveis discretos.

Na prática livre, o nível pode mudar entre sessões, sem anunciar rebaixamento. A dificuldade interna 1–4 não é exibida como classificação da pessoa; o número da fase 1–20 é visível como localização no percurso.

RF019

Conceder estrelas.

Sessão concluída recebe 3 estrelas com zero erros, 2 com um ou dois erros, 1 com três ou mais. Incompleta recebe zero; ajuda e tempo não descontam estrelas.

RF020

Dar feedback positivo de acerto.

Exibir texto, ícone e estado visual, por exemplo “Muito bem!”.

RF021

Dar feedback amigável de erro.

Exibir “Vamos tentar novamente.” ou equivalente; não usar “Você perdeu”, tremor da tela ou efeito de punição.

RF022

Oferecer dicas úteis.

“Preciso de uma dica” funciona desde a primeira tentativa; depois de dois erros no mesmo desafio, destacar a disponibilidade de ajuda sem resolver o desafio sozinho.

4.3 Minijogos

ID

Requisito

Critério de aceitação

RF023

Encontrar pares na Memória.

Duas cartas diferentes são comparadas; pares encontrados permanecem visíveis; concluir ao encontrar todos os pares.

RF024

Graduar a Memória.

Níveis 1–4 usam 4, 6, 8 e 12 cartas, respectivamente.

RF025

Medir a Memória.

Uma comparação de duas cartas é uma tentativa; registrar pares, erros e duração sem cronômetro competitivo.

RF026

Mostrar e ocultar imagens em O Que Você Viu?.

Separar observação e resposta. No modo “No meu ritmo”, “Já observei” oculta as imagens; no temporizado, a ocultação segue o tempo configurado.

RF027

Graduar O Que Você Viu?.

Variar de 2 a 5 imagens observadas e de 2 a 4 alternativas. O modo temporizado pode reduzir a exposição; o modo sem limite permanece disponível.

RF028

Montar palavras por sílabas.

Selecionar sílabas em ordem, desfazer e verificar a palavra; duas sílabas iguais são peças distintas e utilizáveis.

RF029

Graduar Monte a Palavra.

Começar com duas sílabas, passar a três e depois a palavras maiores e distratores.

RF030

Dar dica de sílaba.

Depois de dois erros, oferecer destaque da primeira sílaba correta sem completar o restante.

RF031

Associar imagem a palavra.

Mostrar imagem e alternativas textuais com uma única resposta correta.

RF032

Associar palavra a imagem.

Disponibilizar também a direção inversa dentro de Imagem e Palavra.

RF033

Identificar o item que não combina.

Mostrar quatro itens, dos quais exatamente um está fora da categoria declarada no conteúdo.

RF034

Graduar categorização.

Aumentar a sutileza das categorias sem criar mais de uma interpretação correta.

RF035

Completar sequências visuais.

Mostrar padrão e alternativas; distinguir elementos por forma, desenho ou rótulo, além da cor.

RF036

Completar sequências numéricas.

Incluir padrões simples, como 1, 2, 3, ?, com uma única continuação correta entre as alternativas.

RF037

Graduar sequências.

Oferecer alternância AB, repetição ABC e padrões mais complexos explicitamente definidos nos dados.

RF038

Ordenar rotinas.

Reorganizar etapas de lavar as mãos, preparar água, escovar os dentes, vestir uma roupa e preparar refeição simples. Validar a ordem escolhida.

RF039

Ordenar sem arrastar.

Cada etapa possui controles “Mover para cima” e “Mover para baixo”, acionáveis por teclado e toque.

RF040

Encontrar o objeto solicitado.

Exibir instrução e um alvo único entre as opções; selecionar o alvo é um acerto.

RF041

Graduar busca visual.

Aumentar a quantidade e a semelhança dos objetos mantendo imagens reconhecíveis e alvos grandes.

RF042

Selecionar objetos de uma categoria.

“Toque Somente em...” aceita vários itens corretos e preserva os já encontrados.

RF043

Validar cada seleção.

Cada novo item é avaliado individualmente; concluir somente após selecionar todos os corretos. Repetir item resolvido não pontua.

RF044

Associar objetos.

Selecionar um item de origem e um destino, verificar o par e continuar até resolver todos.

RF045

Graduar associações.

Ampliar quantidade e complexidade das relações; cada item possui um destino correto no conjunto.

RF046

Resolver situações do cotidiano.

Pergunta curta e alternativas permitem escolher a ação adequada, com feedback e nova tentativa.

RF047

Variar situações.

Disponibilizar pelo menos três desafios distintos por nível e evitar repetição imediata quando houver alternativas.

RF048

Completar frases.

Uma lacuna e alternativas permitem completar a frase; o leitor de tela recebe a frase completa após o acerto.

RF049

Graduar frases.

Aumentar extensão e complexidade mantendo vocabulário familiar e resposta inequívoca.

4.4 Treino e evolução

ID

Requisito

Critério de aceitação

RF050

Montar Treino de Hoje.

Gerar cinco atividades: uma de Memória, Linguagem, Raciocínio, Atenção e Cotidiano. Persistir a seleção por data local.

RF051

Avançar no treino.

Após cada resultado, “Próxima atividade” abre a etapa seguinte. A transição depende da ação da pessoa.

RF052

Concluir o treino.

Mostrar “Parabéns! Você concluiu o treino de hoje.” somente após cinco etapas concluídas; voltar à tela não duplica o treino.

RF053

Consultar histórico real.

Mostrar totais de atividades e estrelas, sessões e detalhes de acertos, erros, tentativas, tempo e dificuldade. Não preencher com números de demonstração.

RF054

Identificar categoria de facilidade.

Comparar categorias elegíveis usando dados recentes e o mínimo de amostra definido nas regras.

RF055

Identificar categoria para praticar.

Apresentar “Uma sugestão para continuar” com linguagem acolhedora; ausência de amostra não é tratada como dificuldade.

RF056

Recomendar com variedade.

Usar histórico válido para sugerir um jogo; manter a diversidade dos cinco grupos no treino e permitir escolha livre.

5. Requisitos acrescentados para a experiência profissional

ID

Requisito

Critério de aceitação

RF057

Buscar e filtrar o catálogo.

Busca ignora diferenças de maiúsculas e acentos; filtros incluem Todas e as seis categorias. Busca e filtro se combinam; zero resultados oferece “Limpar filtros”.

RF058

Ajustar leitura e movimento.

Oferecer texto Padrão/Ampliado, redução de animações e observação “No meu ritmo”/“Tempo sugerido”. Aplicar imediatamente e persistir localmente.

RF059

Retomar treino do dia.

Após sair ou atualizar, manter as etapas concluídas e reiniciar apenas a atividade pendente. Não prometer retomada no meio de um tabuleiro.

RF060

Pausar e confirmar saída.

“Pausar” interrompe a interação e o tempo ativo; voltar à atividade retoma. Sair durante uma sessão exige escolha entre continuar ou sair, sem dar estrelas por abandono.

RF061

Tratar falhas recuperáveis.

Falha de armazenamento, conteúdo indisponível ou rota inválida mostra orientação e uma ação útil; não deixa página vazia ou botão sem função.

RF062

Apresentar estados sem dados e de conclusão.

Primeiro acesso convida a começar; histórico vazio não apresenta gráfico fictício; resultado mostra mensagem, estrelas recebidas e próxima ação.

RF063

Escolher a aparência.

Em Ajustes, oferecer Claro, Escuro e Sistema; aplicar e persistir a escolha sem alterar progresso ou preferência de texto. Sistema acompanha a aparência do dispositivo.

6. Requisitos de interface

ID

Requisito

Critério verificável

RUI001

Identidade consistente.

Usar a paleta, tipografia, espaçamento e raios de design.md por variáveis CSS compartilhadas.

RUI002

Hierarquia clara.

Cada tela tem um h1, descrição curta e uma ação principal visualmente destacada por bloco de decisão.

RUI003

Navegação previsível.

Início, Atividades, Minha evolução e Ajustes mantêm ordem e rótulos; destino atual tem texto, ícone e marcação acessível.

RUI004

Início com foco no treino.

O destaque do Treino de Hoje antecede o resumo e o catálogo; métricas não disputam atenção com “Começar treino”.

RUI005

Cards padronizados.

Todos mostram ilustração ou ícone consistente, título, categoria, descrição curta e acesso identificável. Títulos não são truncados.

RUI006

Exercícios com área de foco.

Durante a atividade, recolher a navegação global e manter título, instrução, tabuleiro, feedback e controles necessários.

RUI007

Controles confortáveis.

Botões e controles isolados têm pelo menos 48 × 48 CSS px; cartas e alternativas visuais, pelo menos 64 × 64 CSS px.

RUI008

Estados completos.

Botões, cards, opções e filtros possuem normal, hover quando aplicável, foco, selecionado e indisponível. Estado não depende só de cor.

RUI009

Feedback estável.

Reservar espaço no fluxo para mensagens; feedback não cobre o tabuleiro nem desaparece antes de poder ser lido.

RUI010

Resultado acolhedor.

Mostrar as estrelas efetivamente recebidas, conclusão e ações. Não desenhar estrelas vazias como punição ou tabela de erros em destaque.

RUI011

Evolução legível.

Até três métricas de destaque; detalhes em seção secundária. Visualizações devem ter valores e alternativa textual.

RUI012

Ícones e imagens coerentes.

Usar uma única linguagem de ícones e ativos locais reconhecíveis. Imagem decorativa não substitui texto de ação.

RUI013

Movimento discreto.

Transições de interface duram 120–180 ms; respeitar redução de movimento; não usar efeitos contínuos, flashes ou som automático.

RUI014

Responsividade real.

Layout adaptado a 320, 390, 768, 1024 e 1440 CSS px; nenhum controle fica encoberto ou exige arrastar a página horizontalmente.

RUI015

Textos de produto completos.

Toda ação visível tem função real. Não usar “Lorem ipsum”, nomes de usuário inventados, números falsos ou comandos técnicos na interface.

RUI016

Gerenciamento cuidadoso de dados.

A ação “Apagar meu progresso” fica em Ajustes, visualmente separada da navegação e acompanhada de confirmação clara.

7. Requisitos não funcionais

ID

Requisito e aceite

RNF001

Simplicidade: instruções curtas, agrupamento consistente e ausência de elementos decorativos que atrapalhem a tarefa.

RNF002

Acessibilidade: HTML semântico, navegação completa por teclado, foco visível e ordem lógica. Diálogos mantêm foco interno e devolvem ao acionador.

RNF003

Feedback multimodal: estados importantes combinam texto e indicação visual; mudanças relevantes são anunciadas sem repetição excessiva.

RNF004

Legibilidade: corpo padrão de 18 px, entrelinha 1,6 e contraste mínimo de 4,5:1 para os textos de conteúdo e controles previstos neste projeto. Ver referência de contraste abaixo.

RNF005

Refluxo: suportar ampliação de texto e zoom sem cortes de conteúdo ou sobreposição de ações. Não bloquear o zoom do navegador.

RNF006

Compatibilidade: validar em Chrome ou Edge e em Firefox disponíveis no desenvolvimento; registrar versões realmente testadas. Executar por HTTP local.

RNF007

Modularidade: usar ES Modules, preservar os caminhos válidos do projeto e não introduzir framework para esta revisão visual.

RNF008

Responsabilidades: separar navegação, armazenamento, conteúdo, componentes de interface e regras dos jogos.

RNF009

Manutenção: nomes claros e funções pequenas; comentários explicam regras relevantes, sem abstrações desnecessárias.

RNF010

Persistência: acesso a localStorage centralizado, validação de dados e tratamento de leitura/gravação indisponível.

RNF011

Ritmo: sem tempo máximo para responder, perda por demora ou avanço automático entre desafios. Observação temporizada é opcional.

RNF012

Incentivo: sem competição, perda de estrelas anteriores ou classificação negativa da pessoa.

RNF013

Integridade: tentativas e conclusões idempotentes, descarte de eventos de tela desmontada e cancelamento de timers ao sair.

RNF014

Recursos locais: fontes opcionais e imagens devem estar no projeto; atividades não dependem de uma API ou CDN para funcionar depois que o servidor local está disponível.

RNF015

Conteúdo seguro no DOM: inserir textos por textContent e construir elementos de forma controlada; não executar HTML vindo do armazenamento ou dos campos de busca.

RNF016

Desempenho: reservar dimensões de imagens, evitar carregamentos artificiais e renderizar apenas a atividade ativa. A meta de carregamento e sua medição estão em design.md.

8. Regras de negócio e consistência

8.1 Unidade de atividade e contabilização

Uma sessão de atividade corresponde a um tabuleiro completo na Memória e na Associação de Objetos. Nos outros dez jogos, corresponde a três desafios distintos, um de cada vez. A tela mostra “Etapa 1 de 3” quando existir sequência, ou progresso de pares/itens quando apropriado.

Uma tentativa é uma resposta efetivamente avaliada: comparação de cartas, envio de palavra ou ordem, seleção de alternativa, seleção de novo objeto ou comparação de associação. Deve sempre valer tentativas = acertos + erros.

Abrir instruções, pedir dica, desfazer seleção, pausar e apertar um botão desabilitado não contam como tentativa. Acertos de objetivos já resolvidos não podem ser contados novamente. Nos jogos de múltipla escolha, um acerto aguarda “Continuar”; não há troca automática de pergunta.

Sessões interrompidas preservam as tentativas já avaliadas, mas não recebem estrelas nem aumentam atividades concluídas. A evolução identifica essas sessões como “Interrompida”. Recomendações e progressão usam apenas sessões concluídas. O estado de um tabuleiro em andamento não precisa sobreviver ao recarregamento.

8.2 Dificuldade adaptativa da prática livre

Cada jogo mantém nível próprio de 1 a 4 para a prática livre. Após três sessões de prática livre concluídas desde a última avaliação daquele jogo, calcular a razão entre a soma de acertos e a soma de tentativas dessas três sessões: pelo menos 85% aumenta um nível; abaixo de 50% reduz um nível; os demais resultados mantêm o nível. Respeitar os limites 1–4 e iniciar uma nova janela após a avaliação. Sessões de fases e do treino diário não entram nessa janela; usam a dificuldade fixa da fase selecionada, conforme a seção 12.

O nível de uma sessão iniciada fica congelado até ela terminar. Dicas e duração não entram na decisão. A interface não anuncia redução de nível. Dados legados só inicializam dificuldade quando houver um valor válido; na ausência dele, usar 1.

8.3 Treino de Hoje

Gerar o plano uma vez por data local no formato AAAA-MM-DD, usando o fuso do dispositivo. A estimativa “Cerca de 5 a 10 minutos, no seu ritmo” é orientação, nunca prazo.

Persistir jogos e etapas concluídas. Cada etapa concluída recebe um identificador próprio e só pode ser creditada uma vez. Ao retomar, iniciar uma nova sessão para a primeira etapa pendente. Após concluir as cinco, oferecer “Escolher outra atividade”; a pessoa continua podendo praticar livremente.

Se o dia mudar durante um treino aberto, permitir concluí-lo com sua data original. Ao voltar ao Início, apresentar o plano da data atual. Abandonar ou interromper não elimina etapas já concluídas.

8.4 Histórico e recomendações

Para uma categoria ser elegível à comparação, exigir pelo menos três sessões concluídas e dez tentativas no conjunto de até dez sessões concluídas mais recentes daquela categoria. Calcular a taxa pela soma de acertos dividida pela soma de tentativas, nunca pela média simples das porcentagens de sessões.

Só comparar facilidade e necessidade de prática quando houver pelo menos duas categorias elegíveis. Em empate de desempenho, não declarar uma melhor/pior categoria; priorizar variedade. Com poucos dados, mostrar convite para explorar, sem concluir que a categoria não praticada é uma dificuldade.

Para sugerir um jogo, priorizar a categoria elegível de menor taxa e, dentro dela, um jogo menos recente. Sem comparação válida, sugerir o jogo menos praticado e menos recente. Desempatar pela ordem do catálogo. O treino preserva os cinco grupos, podendo usar a recomendação dentro do grupo correspondente.

Totais anteriores podem ser preservados como totais legados; não criar datas, sessões, categorias ou taxas para informações ausentes. Filtros por período e recomendações usam apenas registros com data e métricas válidas.

9. Critério de entrega

A implementação estará concluída quando os 12 jogos tiverem suas 20 fases válidas e jogáveis, a prática livre continuar funcionando, o treino funcionar de ponta a ponta, o progresso sobreviver ao recarregamento, os dados antigos válidos forem preservados e os estados de falha tiverem saída útil. Não basta trocar o número da fase ou embaralhar o mesmo conteúdo.

O design deve estar aplicado às telas Início, Atividades, Exercício, Resultado, Treino, Minha evolução e Ajustes. Validar uso por teclado, telas pequenas, texto ampliado, redução de movimento e ausência de dupla contagem. A aparência isolada não permite marcar uma funcionalidade como concluída.

O tasks.md define a ordem de implementação. Somente tarefas implementadas e verificadas recebem [x] e commit próprio.

10. Referências de acessibilidade

O contraste de 4,5:1 para texto comum segue a referência de contraste mínimo da W3C. Este projeto adota esse valor também para seus títulos como decisão simplificadora.

Os alvos de 48 px e as alternativas visuais de 64 px são decisões de conforto do ReConecta, acima do mínimo de 24 × 24 CSS px descrito, com exceções, na referência de tamanho de alvo da W3C.

A opção de observação sem limite de tempo considera a referência de tempo ajustável da W3C. Estes documentos definem critérios de implementação; não constituem uma auditoria de conformidade do aplicativo.

11. Reformulação visual — Tasks 27–44

11.1 Resultado esperado

A nova interface deve ter composição mais cuidadosa, uma ação principal clara e linguagem visual consistente. O Início ganha um destaque verde profundo com botão claro, fundo geral neutro e apenas três atividades em evidência. O catálogo completo permanece disponível em Atividades.

O objetivo é corrigir hierarquia, proporções, distribuição dos elementos e acabamento em todas as telas. Uma troca isolada de cores não conclui esta etapa. O sistema continua com os mesmos 12 jogos, dados e regras de negócio.

São acrescentados somente a escolha de aparência e os refinamentos visuais descritos abaixo. Backend, conta, áudio, novos jogos e publicação não são necessários para executar esta revisão.

11.2 Critérios de interface adicionais

ID

Melhoria

Critério de aceitação

RUI017

Composição e paleta refinadas.

Aplicar os tokens da seção 15 de design.md; concentrar o verde profundo no destaque e nas ações, mantendo superfícies de leitura tranquilas.

RUI018

Marca e ícones bem acabados.

Identidade legível no desktop e celular; uma família de ícones, sem mistura de emoji e ícone nas ações.

RUI019

Navegação profissional.

Menu, marca e conteúdo têm alinhamento comum; estado ativo é claro e o conteúdo não parece comprimido pela navegação.

RUI020

Início reorganizado.

Mostrar abertura curta, destaque de treino, resumo real quando existir e três cards de atividades; “Ver todas” abre o catálogo completo.

RUI021

Cards com hierarquia.

Miniatura consistente, categoria, título completo, descrição e ação formam a mesma sequência; ações se alinham na mesma linha dentro da grade.

RUI022

Textos e estados vazios integrados ao design.

Usar mensagens curtas, uma imagem/ícone pertinente e ação útil; não exibir zeros decorativos, dados fictícios ou blocos de texto desproporcionais.

RUI023

Imagens com unidade visual.

Todos os exercícios usam ativos reconhecíveis, sem distorção, com recorte e escala consistentes; ícones de navegação e imagens de resposta têm papéis distintos.

RUI024

Tabuleiros de memória refinados.

Cartas têm verso consistente, espaçamento regular e estados claros; a fase de observação não muda de tamanho de forma brusca.

RUI025

Jogos de linguagem refinados.

Sílabas, frases, lacunas e alternativas têm tipografia legível, alinhamento e espaço suficiente para palavras longas.

RUI026

Atenção e padrões com leitura clara.

Tabuleiros de seleção e sequências distinguem comando, opções e progresso; decoração não se confunde com objeto do exercício.

RUI027

Rotinas e associações organizadas.

Etapas e pares apresentam ordem, seleção e resolução de maneira clara em desktop e celular.

RUI028

Controles com acabamento consistente.

Botões, busca, filtros e seletores usam a mesma escala de altura, raio e estados; foco e toque continuam funcionais.

RUI029

Feedback, resultado e diálogos coesos.

Mensagens respeitam o fluxo da tela; estrelas e ações são proporcionais; diálogos preservam legibilidade e foco.

RUI030

Evolução com hierarquia visual.

Totais, gráfico e histórico têm pesos distintos; gráficos mantêm valores e alternativa textual, sem números ilustrativos.

RUI031

Ajustes organizados.

Agrupar aparência, leitura, movimento, observação e dados; controles ficam alinhados às descrições e explicam seu efeito.

RUI032

Tema escuro completo.

Toda superfície, texto, ícone, controle e estado tem contraste adequado no tema escuro; imagens de conteúdo mantêm identificação correta.

RUI033

Composição própria para telas pequenas.

Em 320/390 px, usar uma coluna de cards, reduzir decoração e manter botões confortáveis; não miniaturizar o desktop.

RUI034

Revisão visual com evidência.

Inspecionar as telas e variantes realmente renderizadas, corrigir cortes/desalinhamentos e registrar as verificações realizadas antes de concluir a etapa.

11.3 Qualidade e compatibilidade

RNF017 — Verificação visual da reformulação: conferir Início, catálogo, um representante de cada família de jogo, resultado, treino, evolução e Ajustes nas larguras 320, 390, 768, 1024 e 1440 CSS px. Validar também os temas claro/escuro, texto ampliado e redução de movimento. Capturas de referência devem usar o mesmo tamanho de janela e estado de dados para permitir comparação. Testar a interface de verdade; não registrar como executada uma inspeção indisponível.

11.4 Regra de aplicação

As Tasks 01–26 descrevem a implementação base. As Tasks 27–44 refinam essa implementação; um critério visual antigo substituído por esta seção não deve ser reaplicado depois da reformulação. Em particular, a antiga exigência de 12 cards no Início passa a ser três destaques com acesso ao catálogo completo. A lógica e a disponibilidade dos 12 jogos permanecem obrigatórias.

Os exemplos de telas são referências de composição. Ao implementar, conectar totais, treino, seleção de atividades e histórico às fontes reais existentes. Um protótipo visual não substitui as regras dos jogos nem comprova que as alterações foram aplicadas ao código do usuário.

12. Ampliação dos jogos — Tasks 45–68

12.1 Escopo e resultado esperado

Entregar 20 fases por jogo × 12 jogos = 240 fases. Uma fase é uma atividade completa: um tabuleiro na Memória e na Associação de Objetos; três desafios distintos nos outros dez jogos. O número da fase indica o avanço no percurso, enquanto “Etapa 1 de 3” indica o andamento dentro daquela fase.

Cada jogo possui quatro blocos de cinco fases: Primeiros passos (1–5), Novas conexões (6–10), Descobertas (11–15) e Mais caminhos (16–20). Esses blocos usam, respectivamente, as configurações internas 1, 2, 3 e 4. A dificuldade cresce entre blocos; dentro de cada bloco variam os conteúdos e contextos. Não aumentar dificuldade por cronômetro, imagens menores, instruções confusas ou penalidades.

O modo Fases passa a ser o acesso principal do catálogo. A opção “Prática livre” preserva o funcionamento adaptativo anterior. Não há limite de tentativas, vidas, compras, ranking, desbloqueio por dias ou exigência de três estrelas para continuar.

12.2 Requisitos funcionais adicionais

ID

Requisito

Critério de aceitação

RF064

Oferecer 240 fases reais.

Os 12 IDs oficiais possuem exatamente 20 definições nesta entrega, numeradas de 1 a 20, com identificadores estáveis e conteúdo válido.

RF065

Exibir o mapa de fases.

Mostrar os quatro blocos, fases concluídas, fase disponível, bloqueadas, melhor resultado e botão para continuar; permitir prática livre.

RF066

Desbloquear por conclusão.

Fase 1 começa disponível. Concluir uma fase libera a seguinte do mesmo jogo, com qualquer quantidade de erros, dicas ou tempo. Abandono não libera; alterar a URL não permite iniciar uma fase bloqueada.

RF067

Repetir fases concluídas.

Toda fase concluída pode ser repetida. A melhor quantidade de estrelas é preservada; uma repetição não aumenta a quantidade de fases distintas concluídas.

RF068

Fixar a dificuldade da fase.

O conteúdo e a configuração são determinados pela fase, inclusive no treino diário. Resultados da prática livre não alteram nem bloqueiam esse percurso.

RF069

Ampliar conteúdo de verdade.

Cada fase tem material próprio. Nos jogos de três desafios, oferecer pelo menos 60 desafios semanticamente distintos por jogo; nos dois jogos de tabuleiro, 20 conjuntos distintos por jogo. Mudar apenas ordem, ID ou título não cria conteúdo novo.

RF070

Salvar avanço por jogo.

Persistir fases concluídas, primeiro/último término, quantidade de conclusões e melhor resultado. Recarregar preserva tudo que foi salvo; a próxima fase é derivada do percurso válido.

RF071

Migrar sem perder histórico.

Migrar progresso conhecido para a versão 3, preservando sessões, totais, níveis, treino e preferências. Não transformar atividades antigas sem identificação de fase em fases concluídas. Reabrir não repete a migração.

RF072

Concluir com efeito único.

Uma sessão atualiza histórico, estrelas, progresso da fase e eventual etapa diária no mesmo estado salvo. Cliques duplicados, remontagem do resultado ou nova tentativa de salvar não duplicam nada.

RF073

Ampliar Jogo da Memória.

Entregar 20 tabuleiros com pares inequívocos, usando 2/3/4/6 pares por bloco; variar conjuntos, preservando alvos confortáveis e regras de comparação.

RF074

Ampliar O Que Você Viu?

Entregar 20 fases com três desafios cada, conjuntos observados de 2/3/4/5 imagens e 2/3/4/4 opções por bloco. Preservar “Já observei” e o tempo sugerido opcional.

RF075

Ampliar Monte a Palavra.

Entregar 20 fases com três palavras distintas cada, de 2/3/4/4–5 sílabas por bloco; somente no último bloco acrescentar 1–2 distratores. Validar acentos e sílabas repetidas.

RF076

Ampliar Imagem e Palavra.

Entregar 20 fases com três desafios cada, 2/3/4/4 alternativas por bloco e correspondência inequívoca; distribuir as duas direções de associação no banco.

RF077

Ampliar Qual Não Combina?

Entregar 20 fases com três grupos cada, quatro opções e exatamente um intruso. Evoluir a relação de categoria/função sem introduzir respostas ambíguas.

RF078

Ampliar Complete a Sequência.

Entregar 20 fases com três padrões cada: AB, ABC, AAB/ABB e padrões mais elaborados, com 2/3/3/4 alternativas por bloco e regra verificável.

RF079

Ampliar Organize a Rotina.

Entregar 20 fases com três rotinas cada, de 3/4/5/6 passos por bloco, ordens aceitas explícitas e operação por toque e teclado.

RF080

Ampliar Encontre o Objeto.

Entregar 20 fases com três buscas cada, de 4/6/8/9 opções por bloco. Cada busca possui um alvo único e distratores visualmente claros.

RF081

Ampliar Toque Somente em...

Entregar 20 fases com três conjuntos cada, de 4/6/8/9 objetos e 2/3/3/4 alvos por bloco; garantir critério inequívoco e contagem única por seleção avaliada.

RF082

Ampliar Associação de Objetos.

Entregar 20 tabuleiros de 2/3/4/5 pares por bloco, com relações claras. Não pontuar novamente pares resolvidos nem contar a sessão em duas categorias.

RF083

Ampliar Situações do Cotidiano.

Entregar 20 fases com três situações cada e 2/3/3/4 alternativas por bloco. A pergunta delimita uma resposta correta sem tratar preferências pessoais como erro.

RF084

Ampliar Complete a Frase.

Entregar 20 fases com três frases cada e 2/3/3/4 alternativas por bloco; gramática, contexto e distratores permitem uma resposta inequívoca.

RF085

Mostrar resultado e próxima ação.

Exibir fase concluída, estrelas desta tentativa e melhor resultado. Oferecer “Próxima fase” quando houver, “Repetir fase” e “Ver fases”; após a fase 20, celebrar a conclusão sem criar fase 21.

RF086

Integrar fases ao Treino de Hoje.

Cada uma das cinco etapas congela uma fase disponível do jogo escolhido. Concluí-la também registra o avanço daquele jogo, com uma única recompensa de sessão. O plano não muda por recarga ou prática fora do treino.

RF087

Exibir evolução das fases.

Mostrar fases distintas concluídas por jogo (0–20) e no total (0–240). Separar estrelas do percurso, soma dos melhores resultados (0–720), de estrelas históricas de sessões e totais legados.

RF088

Preservar prática livre.

Manter acesso aos 12 jogos com adaptação por desempenho; seus resultados entram no histórico, mas não concluem fases nem alimentam progresso fictício.

RF089

Permitir expansão posterior por dados.

Acrescentar conteúdo por registro de fase, sem copiar o motor do jogo. Não renumerar IDs publicados; calcular totais a partir do catálogo validado. A entrega atual continua exigindo 20 por jogo.

RF090

Tratar interrupções e conteúdo indisponível.

Ao sair/recarregar uma sessão ativa, preservar tentativas e reiniciar a mesma fase quando solicitado; não restaurar tabuleiro parcial nem concluir automaticamente. Referência inválida oferece retorno ao mapa, sem gravar uma conclusão falsa.

12.3 Interface e qualidade adicionais

ID

Requisito

Critério de aceitação

RUI035

Mapa legível e acessível.

Estados têm texto, forma/ícone e contraste; navegação por teclado; explicar o bloqueio. A fase disponível se destaca com a identidade visual da seção 11, sem um mapa decorativo difícil de percorrer.

RUI036

Orientação durante a fase.

Exibir nome do jogo, “Fase N de 20” e progresso interno separado. A área de jogo permanece central e não fica cercada por 20 miniaturas.

RUI037

Resultado acolhedor.

Manter o padrão visual existente e deixar clara a próxima ação. Nunca anunciar perda de progresso por obter menos estrelas numa repetição.

RUI038

Resumo consistente.

Catálogo e evolução usam os mesmos dados reais; no primeiro uso, mostrar zero fases concluídas e Fase 1 disponível. Evitar percentuais ou estrelas de exemplo.

RNF018

Conteúdo declarativo e extensível.

Registro, validação, progressão e apresentação possuem responsabilidades separadas, aproveitando os módulos existentes. Não adicionar dependências de produção apenas para representar fases.

RNF019

Integridade do avanço.

Verificações cobrem desbloqueio, repetição, migração, interrupção, duplicidade e falha de gravação. Não apagar dados desconhecidos nem declarar salvamento quando falhou.

RNF020

Banco de fases verificável.

Validar automaticamente IDs, ordinais, referências, quantidade, respostas e limites de cada jogo. Revisar também linguagem e imagens, pois um validador estrutural não comprova clareza semântica.

12.4 Regras de progressão e conteúdo

Identidade: usar IDs estáveis, como memory-p001, até memory-p020; títulos podem mudar sem apagar progresso. A versão do conteúdo é distinta da versão do armazenamento.

Desbloqueio: disponível se for a primeira fase, já estiver concluída ou tiver a anterior concluída. Acesso pelo mapa e por URL passa pela mesma regra. Um jogo nunca desbloqueia fases de outro.

Conclusão: somente cumprir todos os objetivos fecha a sessão. Ajuda, erros e duração não impedem avanço. Estrelas seguem RF019 e não são condição para liberar fases.

Repetição: uma nova sessão legítima conta no histórico e pode somar estrelas históricas; o percurso guarda apenas o melhor resultado de cada fase. Repetir dez vezes a primeira fase continua representando uma fase distinta concluída.

Continuidade: nenhuma fase começa automaticamente após o resultado. “Continuar” no mapa abre a primeira fase ainda não concluída e disponível; com todas concluídas, mostra o estado final e permite escolher uma para repetir.

Conteúdo próprio: é permitido reutilizar ilustrações e tipos de exercício. O desafio completo ou o conjunto completo de pares não pode ser idêntico em duas fases do mesmo jogo. Apenas embaralhar opções não atende ao requisito.

Interrupção: atualizar a página encerra a sessão ativa como interrompida e conserva seus registros; repetir essa fase cria nova sessão desde o início. Fases concluídas e etapas diárias já creditadas continuam concluídas.

Dados anteriores: histórico antigo pode coexistir com zero fases concluídas. Não inferir fase a partir do antigo nível, número de atividades ou estrelas. Reset de progresso inclui as fases e mantém as preferências.

12.5 Integração diária e aceitação da entrega

Ao gerar o plano diário, preservar os cinco grupos existentes. Para cada jogo escolhido, selecionar a primeira fase pendente disponível; se todas estiverem concluídas, selecionar a fase concluída praticada há mais tempo, com desempate pelo menor ordinal. Persistir a escolha. Se a pessoa terminar essa fase fora do treino, o plano conserva a mesma fase até a etapa ser realizada dentro daquele treino. Não creditar a etapa diária por uma sessão sem a referência dessa etapa.

Planos antigos mantêm etapas e conclusões. A migração acrescenta uma fase apenas às etapas pendentes sem referência válida; etapas antigas concluídas não recebem retroativamente estrelas ou avanço de fase. Se a data mudar durante o treino, continuar com o plano original, conforme a seção 8.3.

A entrega exige os 240 registros válidos, pelo menos 600 desafios distintos nos dez jogos de três desafios e 40 tabuleiros distintos nos outros dois. Cada conjunto de tabuleiro pode conter vários pares. O banco deve respeitar as configurações e as respostas de cada jogo, sem textos provisórios, imagens ausentes ou clones com outro número.

Validar os 12 jogos, limites entre blocos (5→6, 10→11 e 15→16), término da fase 20, repetição, prática livre, treino, migração e recarregamento. A validação de dados cobre todas as 240 definições; a inspeção interativa cobre pelo menos uma fase de cada bloco de cada jogo, além dos fluxos compartilhados de maior risco. As verificações são detalhadas em design.md, seção 16, e nas Tasks 65–68.

As Tasks 01–44 permanecem como histórico e base. A ampliação pertence às Tasks 45–68. Regras desta seção sobre fases, acesso pelo catálogo e adaptação exclusiva da prática livre prevalecem sobre instruções anteriores desses mesmos pontos; todas as demais regras continuam valendo.

## Adendo — fluxo contínuo dos minijogos (17/09/2026)

Este adendo substitui, para o caminho principal, a exigência anterior de abrir o mapa de fases a partir de todo card. As 20 fases e suas regras de desbloqueio continuam preservadas, mas funcionam como progressão interna e como percurso opcional.

- Cada card apresenta **Jogar**, **Continuar** ou **Jogar novamente** e abre diretamente a atividade adequada. **Ver percurso** é uma ação secundária.
- Durante uma atividade, o cabeçalho informa jogo, contexto e progresso sem classificar a pessoa por nível ou fase.
- Ao concluir, a ação dominante é **Próxima atividade**; a próxima sessão abre diretamente, sem retorno ao catálogo, mapa, introdução ou tela do treino.
- O resultado oferece somente uma ação principal, **Tentar novamente** como ação secundária e **Sair do jogo** como ação discreta.
- No Treino de Hoje, as cinco atividades formam um fluxo contínuo. A tela do treino é usada para iniciar ou retomar, não como parada obrigatória entre etapas.
- Fases, dificuldade, tentativas, estrelas, tempo e progresso permanecem na arquitetura de persistência existente.
