ReConecta — Requirements

Versão: 1.0 — Aplicação acadêmica completa

1. Visão geral

O ReConecta é uma aplicação web de atividades cognitivas e de linguagem.

A proposta do sistema é oferecer exercícios simples, acessíveis e progressivos, com poucos elementos por tela, comandos objetivos, respostas visuais fáceis de compreender e feedback positivo.

O aplicativo deve evitar excesso de informações, reduzir a sensação de avaliação ou competição e valorizar a participação do usuário mesmo quando houver erros.

2. Objetivo do projeto

O objetivo do ReConecta é disponibilizar atividades que trabalhem diferentes capacidades, incluindo:

memória visual;

memória de curto prazo;

atenção;

concentração;

linguagem;

reconhecimento de palavras;

organização de sílabas;

leitura;

associação;

categorização;

raciocínio lógico;

percepção;

organização sequencial;

compreensão de situações do cotidiano.

3. Escopo desta especificação

O documento-base recomenda cinco minijogos para um MVP inicial. Para esta versão acadêmica, o escopo foi ampliado para contemplar os doze minijogos descritos no documento, além dos sistemas de níveis, pontuação, feedback, treino diário e acompanhamento da evolução.

Esta versão deverá incluir:

Jogo da Memória;

O Que Você Viu?;

Monte a Palavra;

Imagem e Palavra;

Qual Não Combina?;

Complete a Sequência;

Organize a Rotina;

Encontre o Objeto;

Toque Somente em...;

Associação de Objetos;

Situações do Cotidiano;

Complete a Frase.

Também fazem parte do escopo:

níveis de dificuldade;

sistema de estrelas;

feedback positivo;

dicas em atividades compatíveis;

treino diário;

registro de desempenho;

resumo de evolução;

recomendação simples de atividades;

persistência local no navegador;

responsividade;

acessibilidade básica.

4. Fora do escopo desta versão

Os itens abaixo são considerados evolução futura:

reconhecimento de voz;

exercícios baseados em áudio;

exercícios com sons;

personalização avançada;

criação de exercícios por profissionais;

sistema inteligente avançado de recomendação;

backend;

autenticação;

sincronização em nuvem;

banco de dados remoto.

5. Requisitos funcionais gerais

RF001 — Exibir tela inicial

Descrição: o sistema deverá apresentar uma tela inicial identificando o aplicativo ReConecta.

Prioridade: Alta.

Critério de aceitação: ao abrir a aplicação, o usuário deverá visualizar o nome ReConecta, uma orientação curta e acesso às atividades.

RF002 — Exibir os doze minijogos

Descrição: a tela inicial deverá apresentar acesso aos doze minijogos definidos nesta especificação.

Prioridade: Alta.

Critério de aceitação: os doze jogos deverão aparecer como opções identificáveis e acionáveis.

RF003 — Abrir uma atividade

Descrição: o usuário deverá poder selecionar um minijogo e entrar em sua tela.

Prioridade: Alta.

Critério de aceitação: selecionar uma atividade deverá renderizar a atividade correspondente sem abrir outro arquivo HTML.

RF004 — Retornar ao início

Descrição: todas as atividades deverão possuir a ação “← Voltar ao início”.

Prioridade: Alta.

Critério de aceitação: ao utilizar a ação, o usuário deverá retornar à tela inicial.

RF005 — Exibir instruções simples

Descrição: cada atividade deverá apresentar uma instrução curta e objetiva antes ou durante o exercício.

Prioridade: Alta.

Critério de aceitação: o usuário deverá conseguir identificar o que precisa fazer sem depender de explicações externas.

RF006 — Registrar tentativa

Descrição: o sistema deverá registrar as tentativas realizadas nas atividades.

Prioridade: Alta.

Critério de aceitação: cada tentativa relevante deverá atualizar o progresso armazenado.

RF007 — Registrar acerto

Descrição: o sistema deverá registrar respostas corretas.

Prioridade: Alta.

Critério de aceitação: um acerto deverá aumentar o total correspondente no progresso.

RF008 — Registrar erro

Descrição: o sistema deverá registrar respostas incorretas sem tratar o erro de forma punitiva.

Prioridade: Alta.

Critério de aceitação: uma resposta incorreta deverá atualizar o total de erros e gerar feedback amigável.

RF009 — Registrar atividade concluída

Descrição: o sistema deverá registrar quando uma atividade for finalizada.

Prioridade: Alta.

Critério de aceitação: a conclusão válida de uma atividade deverá incrementar o total de atividades realizadas.

RF010 — Registrar tempo de resposta

Descrição: o sistema poderá registrar tempo de resposta ou conclusão para acompanhamento de evolução.

Prioridade: Média.

Critério de aceitação: o tempo poderá ser armazenado, mas não deverá ser utilizado para pressionar o usuário.

RF011 — Salvar progresso localmente

Descrição: o sistema deverá salvar o progresso no navegador utilizando localStorage.

Prioridade: Alta.

Critério de aceitação: atualizar a página não deverá apagar o progresso.

RF012 — Recuperar progresso

Descrição: o sistema deverá carregar automaticamente o progresso salvo ao iniciar.

Prioridade: Alta.

Critério de aceitação: valores salvos anteriormente deverão reaparecer na tela de progresso.

RF013 — Limpar progresso

Descrição: o usuário deverá poder apagar o progresso local mediante confirmação.

Prioridade: Média.

Critério de aceitação: cancelar a confirmação não apaga dados; confirmar restaura o estado inicial.

6. Requisitos de níveis

RF014 — Trabalhar com quatro níveis internos

Descrição: o sistema deverá suportar quatro faixas de dificuldade:

Nível 1 — Inicial;

Nível 2 — Fácil;

Nível 3 — Intermediário;

Nível 4 — Avançado.

Prioridade: Alta.

Critério de aceitação: jogos compatíveis deverão consultar o nível atual para ajustar dificuldade.

RF015 — Ajustar quantidade de elementos

Descrição: níveis iniciais deverão apresentar menos elementos e níveis superiores poderão apresentar mais elementos.

Prioridade: Alta.

Critério de aceitação: a quantidade de elementos deverá variar de acordo com a dificuldade configurada.

RF016 — Ajustar complexidade de palavras e frases

Descrição: níveis mais altos poderão utilizar palavras, sílabas, frases e relações mais complexas.

Prioridade: Alta.

Critério de aceitação: atividades linguísticas deverão possuir conteúdo progressivo.

RF017 — Ajustar quantidade de ajuda

Descrição: níveis iniciais deverão poder oferecer mais ajuda, enquanto níveis mais altos poderão oferecer menos dicas.

Prioridade: Média.

Critério de aceitação: a quantidade de ajuda deverá ser configurável por nível.

RF018 — Permitir nível interno não exibido

Descrição: o sistema deverá conseguir controlar dificuldade sem necessariamente mostrar “Nível 1”, “Nível 2” etc. ao usuário.

Prioridade: Média.

Critério de aceitação: a dificuldade poderá mudar internamente sem exibição obrigatória do número do nível.

7. Requisitos de pontuação e feedback

RF019 — Conceder estrelas

Descrição: o sistema deverá usar estrelas como incentivo.

Regras gerais:

⭐⭐⭐ — excelente desempenho;

⭐⭐ — bom desempenho;

⭐ — atividade concluída.

Prioridade: Alta.

Critério de aceitação: toda atividade concluída deverá conceder pelo menos uma estrela.

RF020 — Exibir feedback de acerto

Descrição: respostas corretas deverão produzir mensagens positivas.

Exemplos:

“Excelente!”;

“Muito bem!”;

“Você conseguiu!”.

Prioridade: Alta.

Critério de aceitação: um acerto deverá gerar mensagem textual positiva.

RF021 — Exibir feedback de erro

Descrição: respostas incorretas deverão gerar incentivo para tentar novamente.

Exemplos:

“Vamos tentar novamente.”;

“Quase lá!”;

“Tente mais uma vez.”.

Prioridade: Alta.

Critério de aceitação: o sistema não deverá exibir mensagens punitivas.

RF022 — Oferecer dicas

Descrição: atividades compatíveis poderão oferecer uma dica depois de algumas tentativas.

Prioridade: Média.

Critério de aceitação: a dica deverá ajudar sem entregar imediatamente toda a resposta.

8. Requisitos dos minijogos

8.1 Jogo da Memória

RF023 — Implementar Jogo da Memória

Descrição: o usuário deverá selecionar duas cartas por vez para encontrar pares iguais.

Prioridade: Alta.

Critério de aceitação: o jogo deverá permitir concluir a atividade encontrando todos os pares.

RF024 — Aplicar progressão na Memória

Descrição:

nível inicial: 4 cartas / 2 pares;

próximo nível: 6 cartas / 3 pares;

seguinte: 8 cartas / 4 pares;

níveis posteriores: mais cartas e possibilidade de imagens mais parecidas.

Prioridade: Alta.

Critério de aceitação: a quantidade e dificuldade visual das cartas deverão variar por nível.

RF025 — Registrar métricas da Memória

Descrição: registrar pares encontrados, tentativas, tempo e erros.

Prioridade: Média.

Critério de aceitação: as métricas deverão ser registradas sem transformar velocidade em pressão.

8.2 O Que Você Viu?

RF026 — Implementar O Que Você Viu?

Descrição: o sistema deverá exibir imagens por alguns segundos, ocultá-las e perguntar qual delas apareceu.

Prioridade: Alta.

Critério de aceitação: a pergunta só deverá aparecer depois da etapa de visualização.

RF027 — Aplicar níveis em O Que Você Viu?

Descrição:

nível inicial: 2 imagens / 2 opções;

nível seguinte: 3 imagens / 3 ou 4 opções;

níveis superiores: 4 ou mais imagens e possível redução gradual do tempo de visualização.

Prioridade: Alta.

Critério de aceitação: quantidade de imagens e opções deverá variar conforme o nível.

8.3 Monte a Palavra

RF028 — Implementar Monte a Palavra

Descrição: apresentar uma imagem conhecida e sílabas embaralhadas para formar a palavra correspondente.

Prioridade: Alta.

Critério de aceitação: o usuário deverá conseguir selecionar/ordenar sílabas e formar a palavra correta.

RF029 — Aplicar níveis em Monte a Palavra

Descrição:

inicial: palavras de duas sílabas;

seguinte: palavras de três sílabas;

avançado: palavras maiores e opções incorretas misturadas.

Prioridade: Alta.

Critério de aceitação: a dificuldade deverá acompanhar o nível.

RF030 — Oferecer dica de sílaba

Descrição: após duas tentativas, o sistema poderá destacar a primeira sílaba correta.

Prioridade: Média.

Critério de aceitação: a dica deverá ser apresentada sem completar automaticamente a palavra.

8.4 Imagem e Palavra

RF031 — Implementar imagem para palavra

Descrição: mostrar uma imagem e opções de palavras.

Prioridade: Alta.

Critério de aceitação: o usuário deverá conseguir escolher a palavra correspondente.

RF032 — Implementar palavra para imagem

Descrição: mostrar uma palavra e opções de imagens.

Prioridade: Média.

Critério de aceitação: o usuário deverá conseguir escolher a imagem correspondente.

8.5 Qual Não Combina?

RF033 — Implementar Qual Não Combina?

Descrição: apresentar quatro elementos e pedir qual não pertence ao grupo.

Prioridade: Alta.

Critério de aceitação: o usuário deverá conseguir identificar o item diferente.

RF034 — Aplicar progressão de categorização

Descrição: começar com categorias bem distintas e evoluir para diferenças mais sutis.

Prioridade: Média.

Critério de aceitação: o conjunto de opções deverá variar conforme o nível.

8.6 Complete a Sequência

RF035 — Implementar sequências visuais

Descrição: apresentar padrões visuais e pedir o próximo elemento.

Prioridade: Alta.

Critério de aceitação: o sistema deverá reconhecer a opção correta.

RF036 — Implementar sequências numéricas simples

Descrição: permitir padrões como 1 — 2 — 3 — ?.

Prioridade: Média.

Critério de aceitação: o usuário deverá conseguir selecionar o próximo número correto.

RF037 — Aplicar progressão de sequência

Descrição: variar entre dois elementos alternados, três elementos e padrões mais complexos.

Prioridade: Alta.

Critério de aceitação: a complexidade deverá acompanhar o nível.

8.7 Organize a Rotina

RF038 — Implementar Organize a Rotina

Descrição: apresentar etapas de atividades do cotidiano fora de ordem.

Exemplos:

lavar as mãos;

preparar um copo de água;

escovar os dentes;

colocar uma roupa;

preparar uma refeição simples.

Prioridade: Alta.

Critério de aceitação: o usuário deverá conseguir reorganizar as etapas na ordem correta.

RF039 — Permitir ordenação acessível

Descrição: a atividade não deverá depender exclusivamente de arrastar e soltar.

Prioridade: Alta.

Critério de aceitação: deverá existir alternativa por clique ou botões.

8.8 Encontre o Objeto

RF040 — Implementar Encontre o Objeto

Descrição: pedir para localizar um objeto específico entre várias imagens.

Prioridade: Alta.

Critério de aceitação: tocar no item solicitado deverá ser reconhecido como acerto.

RF041 — Aplicar progressão visual

Descrição: começar com poucas imagens, depois aumentar quantidade e semelhança visual.

Prioridade: Média.

Critério de aceitação: dificuldade deverá variar conforme o nível.

8.9 Toque Somente em...

RF042 — Implementar seleção por categoria

Descrição: apresentar vários objetos e uma instrução como “Toque somente nas frutas”.

Prioridade: Alta.

Critério de aceitação: o usuário deverá conseguir selecionar todos os itens corretos.

RF043 — Validar múltiplas seleções

Descrição: a atividade deverá avaliar itens ao longo da seleção sem encerrar no primeiro toque.

Prioridade: Alta.

Critério de aceitação: o jogo só deverá terminar quando o conjunto necessário for concluído.

8.10 Associação de Objetos

RF044 — Implementar Associação de Objetos

Descrição: permitir relacionar elementos como:

Escova → Dentes;

Chave → Porta;

Garfo → Comida;

Cama → Dormir;

Sapato → Pé.

Prioridade: Alta.

Critério de aceitação: todos os pares deverão poder ser associados.

RF045 — Aplicar progressão de associações

Descrição: começar com relações simples e avançar para relações mais abstratas.

Prioridade: Média.

Critério de aceitação: a complexidade das relações deverá variar por nível.

8.11 Situações do Cotidiano

RF046 — Implementar Situações do Cotidiano

Descrição: apresentar situações simples com alternativas.

Exemplos:

“Está chovendo. O que você deve usar?”;

“Você quer beber água. O que deve pegar?”.

Prioridade: Alta.

Critério de aceitação: a resposta adequada deverá ser reconhecida.

RF047 — Variar situações

Descrição: o jogo deverá possuir mais de uma situação.

Prioridade: Média.

Critério de aceitação: iniciar atividades repetidamente não deverá mostrar sempre o mesmo cenário.

8.12 Complete a Frase

RF048 — Implementar Complete a Frase

Descrição: mostrar uma frase com lacuna e opções de palavras.

Exemplos:

“Eu bebo ______.”;

“Eu durmo na ______.”.

Prioridade: Alta.

Critério de aceitação: a palavra adequada deverá completar corretamente a frase.

RF049 — Aumentar complexidade das frases

Descrição: níveis superiores poderão usar frases maiores.

Prioridade: Média.

Critério de aceitação: o conteúdo textual deverá acompanhar o nível.

9. Treino Diário

RF050 — Criar Treino de Hoje

Descrição: o sistema deverá poder montar automaticamente um pequeno treinamento.

Composição:

1 atividade de memória;

1 atividade de palavras;

1 atividade de raciocínio;

1 atividade de atenção;

1 atividade cotidiana.

Prioridade: Alta.

Critério de aceitação: o sistema deverá gerar uma sequência com cinco atividades.

RF051 — Executar treino em sequência

Descrição: ao concluir uma atividade do treino, o sistema deverá permitir avançar para a próxima.

Prioridade: Alta.

Critério de aceitação: as cinco atividades deverão poder ser completadas sem retornar manualmente à tela inicial entre elas.

RF052 — Finalizar treino diário

Descrição: após concluir as cinco atividades, exibir mensagem de conclusão.

Mensagem esperada: “Parabéns! Você concluiu o treino de hoje.”

Prioridade: Alta.

Critério de aceitação: a mensagem deverá aparecer somente após o treino completo.

10. Acompanhamento da evolução

RF053 — Registrar histórico de desempenho

Descrição: registrar:

exercícios realizados;

acertos;

erros;

tentativas;

tempo de resposta;

nível atual;

desempenho por categoria.

Prioridade: Alta.

Critério de aceitação: os dados deverão permanecer salvos localmente.

RF054 — Identificar maior facilidade

Descrição: o sistema deverá calcular qual categoria apresenta melhor desempenho relativo.

Prioridade: Média.

Critério de aceitação: o resultado deverá ser baseado nos dados armazenados.

RF055 — Identificar categoria que precisa de mais prática

Descrição: o sistema deverá calcular qual categoria apresenta maior dificuldade relativa.

Prioridade: Média.

Critério de aceitação: a apresentação deverá evitar linguagem negativa ou punitiva.

RF056 — Recomendar atividades

Descrição: o sistema poderá priorizar atividades de categorias com maior dificuldade, mantendo também outras categorias.

Prioridade: Média.

Critério de aceitação: a recomendação deverá utilizar dados reais do histórico.

11. Requisitos não funcionais

RNF001 — Simplicidade

A interface deverá apresentar poucos elementos por tela e comandos objetivos.

RNF002 — Acessibilidade básica

O sistema deverá utilizar HTML semântico, botões reais, foco visível e áreas clicáveis adequadas.

RNF003 — Feedback multimodal

Acertos e erros não deverão ser comunicados apenas por cor.

RNF004 — Legibilidade

Textos deverão possuir tamanho confortável e contraste adequado.

RNF005 — Responsividade

A aplicação deverá funcionar em computador e celular sem rolagem horizontal desnecessária.

RNF006 — Compatibilidade

A aplicação deverá funcionar em navegadores modernos quando executada via Live Server.

RNF007 — JavaScript modular

O sistema deverá usar ES Modules com import e export.

RNF008 — Separação de responsabilidades

Navegação, armazenamento, dados e regras dos jogos deverão ficar em módulos distintos.

RNF009 — Manutenibilidade

O código deverá ser simples e compreensível para um estudante iniciante.

RNF010 — Persistência local

O armazenamento deverá utilizar localStorage nesta versão, sem banco de dados remoto.

RNF011 — Ausência de pressão por velocidade

Métricas de tempo poderão ser registradas, mas não deverão ser usadas como elemento punitivo ou de pressão.

RNF012 — Experiência não competitiva

A dificuldade poderá ser ajustada internamente sem obrigar a exibição de números de nível.

12. Critérios gerais de aceitação

A versão será considerada funcional quando:

os 12 minijogos abrirem e puderem ser concluídos;

o sistema registrar acertos, erros, tentativas e atividades;

os dados persistirem após atualizar a página;

níveis alterarem a dificuldade quando aplicável;

estrelas forem atribuídas após atividades;

feedback positivo aparecer em acertos e erros;

treino diário puder ser concluído;

a tela de evolução mostrar dados reais;

recomendações simples utilizarem o histórico;

todos os jogos possuírem botão de retorno;

a aplicação funcionar em telas pequenas;

não houver erros JavaScript críticos no fluxo principal.

13. Evolução futura

A documentação de origem prevê como possibilidades futuras:

áudio;

reconhecimento de voz;

exercícios com sons;

personalização de atividades;

novos temas;

criação de exercícios por profissionais;

sistema inteligente capaz de recomendar treinamentos automaticamente conforme a evolução do usuário.