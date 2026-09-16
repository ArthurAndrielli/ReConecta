ReConecta — Requisitos do aplicativo

Versão: 2.1 · Reformulação visual e aplicação acadêmica completa
Data: 16/09/2026
Documentos relacionados: design.md e tasks.md.

Prioridade desta revisão: melhorar a aparência do sistema, conforme o pedido mais recente. A seção 11 acrescenta critérios visuais para as Tasks 27–44. As tarefas anteriores mantêm seu histórico; as novas tarefas são uma etapa de reformulação, sem exigir que funcionalidades prontas sejam refeitas.

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

O card abre o jogo correspondente dentro de #app, sem novo arquivo HTML.

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

O nível pode mudar entre sessões; a tela principal não exibe número, ranking ou mensagem de rebaixamento.

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

8.2 Progressão

Cada jogo mantém nível próprio de 1 a 4. Após três sessões concluídas desde a última avaliação daquele jogo, calcular a razão entre a soma de acertos e a soma de tentativas dessas três sessões: pelo menos 85% aumenta um nível; abaixo de 50% reduz um nível; os demais resultados mantêm o nível. Respeitar os limites 1–4 e iniciar uma nova janela após a avaliação.

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

A implementação estará concluída quando os 12 jogos puderem ser abertos e finalizados, o treino funcionar de ponta a ponta, o progresso sobreviver ao recarregamento, os dados antigos válidos forem preservados e os estados de falha tiverem saída útil.

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