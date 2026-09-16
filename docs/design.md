ReConecta — Design visual, interação e arquitetura

Versão: 2.1 · Reformulação visual do ReConecta
Data: 16/09/2026
Base funcional: requirements.md
Execução: tasks.md.

Revisão visual solicitada: aplicar a seção 15 nas Tasks 27–44. Esta etapa melhora composição, proporções, imagens e acabamento do aplicativo existente. As regras dos jogos e a persistência continuam sendo as da implementação base.

1. Direção visual

Conceito: clareza para praticar no próprio ritmo.

O ReConecta deve parecer um aplicativo de cuidado e aprendizagem bem acabado: fundo claro levemente quente, verde profundo nas ações, superfícies brancas, ilustrações simples, textos confortáveis e bastante espaço entre os grupos de informação.

A identidade precisa ser adulta e acolhedora, sem presumir a idade da pessoa. A qualidade visual vem da proporção, da consistência e da hierarquia. Usar cores de categoria em pequenos detalhes; deixar a tarefa e a instrução ocuparem o centro da atenção.

1.1 Decisões da revisão

Decisão

Aplicação

Verde como cor de ação

Botão principal, navegação ativa, links e pequenos destaques.

Fundo claro e superfícies brancas

Separar áreas sem bordas pesadas ou muitas caixas aninhadas.

Um destaque principal no Início

Treino de Hoje com título, informação breve e botão.

Catálogo organizado

Os 12 jogos mantêm cards consistentes e categorias identificáveis.

Modo de foco nos jogos

Retirar navegação global durante exercícios e priorizar o tabuleiro.

Linguagem direta

“Começar atividade”, “Preciso de uma dica”, “Continuar”.

Evolução com dados reais

Poucos totais de destaque e detalhes consultáveis.

Esta é a direção visual proposta para a implementação. Os arquivos de código existentes devem ser inspecionados antes de alterar componentes, caminhos e lógica. Não recriar o projeto nem reiniciar o desenvolvimento de funcionalidades prontas.

2. Sistema visual

2.1 Paleta principal

Os nomes da primeira coluna são os tokens oficiais. Não espalhar valores hexadecimais nos componentes.

Token

Valor

Uso

--color-bg

#F4F5F0

Fundo geral.

--color-surface

#FFFFFF

Cards, painéis e diálogos.

--color-surface-soft

#EFF3EE

Grupos secundários e áreas de descanso visual.

--color-text

#183A2E

Títulos e conteúdo principal.

--color-text-muted

#576A60

Descrições, metadados e orientações.

--color-primary

#245C45

Ações principais, links e estado ativo.

--color-primary-hover

#1B4A36

Hover e pressão em ações principais.

--color-primary-soft

#E7F1EA

Destaque de treino e item de navegação ativo.

--color-border

#DDE6DA

Divisórias e contornos decorativos.

--color-control-border

#778B81

Limites de campos, opções e controles que precisam ser identificados.

--color-focus

#1B63B9

Anel de foco de teclado.

--color-success

#197044

Acerto, junto de texto e ícone.

--color-success-soft

#E9F4EC

Fundo do feedback de acerto.

--color-help

#8A5A14

Dica, estrelas e orientação de nova tentativa.

--color-help-soft

#FFF4DE

Fundo de dica ou nova tentativa.

--color-danger

#AF3545

Exclusão de dados e falhas de sistema.

--color-danger-soft

#FCEEF0

Fundo de mensagem sobre ação destrutiva/falha.

Resposta incorreta usa a cor de orientação, não a cor destrutiva. Texto sobre botão principal é branco. Fundo suave de categoria recebe seu tom escuro correspondente.

2.2 Cores das categorias

Categoria / chave

Fundo

Texto e ícone

Símbolo sugerido

Memória / memoria

#EAF2F6

#386579

Duas cartas sobrepostas.

Linguagem / linguagem

#F1EDF6

#665184

Balão de conversa com traço de texto.

Atenção / atencao

#FBF2E3

#8A5A24

Alvo com ponto central.

Raciocínio / raciocinio

#EFF3E5

#596734

Peças geométricas.

Associação / associacao

#F7EEE7

#765445

Dois elos conectados.

Cotidiano / cotidiano

#E9F2EF

#41685F

Casa com porta.

Usar tokens --category-<chave>-bg e --category-<chave>-fg. O nome da categoria sempre acompanha a cor. A classificação dos jogos está em requirements.md, seção 3.2.

2.3 Contraste

Pares calculados nesta especificação, sem transparência sobreposta:

Primeiro plano / fundo

Razão aproximada

Texto principal / fundo geral

11,38:1

Texto secundário / branco

5,78:1

Branco / verde principal

7,80:1

Verde principal / verde suave

6,75:1

Texto / fundo das seis categorias

Entre 5,30:1 e 5,91:1

Manter pelo menos 4,5:1 para texto nesta interface. O contorno decorativo suave não identifica sozinho um controle; usar --color-control-border, texto ou outra forma de delimitação suficientemente contrastante para componentes interativos. Verificar os pares reais após aplicar estados, imagens, opacidades e temas do sistema.

Referência: contraste mínimo da W3C. Os valores da tabela são cálculos da paleta proposta, não resultados de auditoria de uma interface implementada.

2.4 Tipografia

Família: Inter, quando já disponível localmente, com fallback "Segoe UI", system-ui, -apple-system, sans-serif. Não depender de fonte remota; a versão com fallback deve manter o layout. Usar pesos 400, 600 e 700.

Papel

Tamanho padrão

Entrelinha

Peso

Título de tela

28–36 px com clamp()

1,2

700

Título de seção

24 px

1,3

600

Título de card

20 px

1,35

600

Corpo e instrução auxiliar

18 px

1,6

400

Comando do exercício

22–28 px

1,4

600

Botão

18 px

1,35

600

Navegação e metadados

16 px

1,5

400/600

Rótulo inferior no celular

14 px

1,3

600

Texto ampliado usa fator 1,125, aplicado a todos os papéis de texto. Empregar rem ou tokens calculados, sem alturas fixas que cortem rótulos. Limitar parágrafos de leitura a aproximadamente 65 caracteres por linha. Não aplicar text-transform: uppercase na navegação ou em parágrafos; sílabas e palavras do exercício podem usar maiúsculas conforme o conteúdo.

2.5 Espaçamento, formas e sombras

Grupo

Valores

Escala de espaço

4, 8, 12, 16, 24, 32 e 48 px.

Margem lateral do conteúdo

16 px no celular; 24 px no tablet; 32 px no desktop.

Distância entre seções

32 px no celular; 40–48 px no desktop.

Padding de card

20 px no celular; 24 px em áreas maiores.

Espaço entre cards

16 px no celular; 24 px no desktop.

Raio de botões e campos

12 px.

Raio de cards

20 px.

Raio do destaque principal

24 px.

Raio de etiquetas

999 px somente para etiquetas e filtros curtos.

Sombra de card

0 4px 16px rgb(30 53 48 / 0.04).

Sombra de diálogo

0 16px 48px rgb(30 53 48 / 0.16).

Cartas de jogo têm proporção 1:1 quando o conteúdo é visual. Alternativas textuais podem crescer verticalmente. Não usar altura fixa para blocos de texto.

2.6 Tokens CSS de referência

Este trecho orienta a implementação; os demais tokens das tabelas também devem ser centralizados.

:root {
  --color-bg: #F4F5F0;
  --color-surface: #FFFFFF;
  --color-text: #183A2E;
  --color-text-muted: #576A60;
  --color-primary: #245C45;
  --color-primary-hover: #1B4A36;
  --color-primary-soft: #E7F1EA;
  --color-border: #DDE6DA;
  --color-control-border: #778B81;
  --color-focus: #1B63B9;
  --font-ui: "Inter", "Segoe UI", system-ui, -apple-system, sans-serif;
  --font-scale: 1;
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --radius-control: 0.75rem;
  --radius-card: 1.25rem;
  --content-max: 70rem;
  --duration-ui: 160ms;
}

:root[data-text-size="large"] { --font-scale: 1.125; }

body {
  margin: 0;
  color: var(--color-text);
  background: var(--color-bg);
  font-family: var(--font-ui);
  font-size: calc(1.125rem * var(--font-scale));
  line-height: 1.6;
}

button, input, select { font: inherit; }

.page-title {
  font-size: calc(clamp(1.75rem, 1.4rem + 1vw, 2.25rem) * var(--font-scale));
  line-height: 1.2;
}

.button {
  min-height: 3rem;
  min-width: 3rem;
  padding: 0.75rem 1.25rem;
  border-radius: var(--radius-control);
  white-space: normal;
}

:where(a, button, input, select, summary):focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 3px;
}

/* Aplicar às classes de transição reais do projeto. */
@media (prefers-reduced-motion: reduce) {
  :root { --duration-ui: 0ms; }
}
:root[data-reduced-motion="true"] { --duration-ui: 0ms; }

3. Marca, ícones e imagens

Manter a grafia ReConecta. Se o projeto já tiver logotipo utilizável, preservar o desenho e ajustar sua aplicação. Na ausência de marca, usar o nome em peso 700 e um pequeno símbolo vetorial de dois elos arredondados. A marca deve funcionar em uma cor e não exigir download externo.

Ícones de navegação: desenho linear, caixa de 24 × 24, traço de aproximadamente 2 px e pontas arredondadas. Usar a mesma família em todo o aplicativo. Ícones decorativos recebem aria-hidden="true"; ações possuem rótulo textual. Um ícone isolado só pode ser usado com nome acessível e área de toque de 48 px.

Ativos dos exercícios devem ter fundo limpo, objeto central, proporção consistente e significado reconhecível. Usar arquivos locais em SVG, WebP ou PNG, com dimensões reservadas. Separar nome do objeto, descrição acessível e caminho do arquivo. Não usar fotos genéricas de banco de imagens apenas como decoração dos cards.

Os emojis da versão inicial podem ser mantidos durante a transição, mas a entrega visual deve usar uma coleção consistente de imagens/ilustrações locais. Não misturar emoji de plataforma, fotografia e ícone de estilos diferentes no mesmo tabuleiro.

O texto alternativo descreve o objeto representado; não inclui informações como “resposta correta”. Cartas fechadas da Memória não expõem imagem nem nome do par no conteúdo acessível. Se uma imagem essencial falhar, mostrar “Não foi possível carregar esta atividade” e ações úteis; não revelar a resposta por um fallback que altere o exercício.

4. Navegação e layout responsivo

4.1 Destinos

Se já existir roteamento funcional, preservá-lo e mapear os destinos abaixo. Para navegação nova em SPA estática, usar hash para permitir recarregamento sem configuração de servidor.

Destino

Rota proposta

Observação

Início

#/inicio

Rota padrão para abertura sem hash.

Atividades

#/atividades

Busca e categoria são estado da tela; preservar ao voltar de um jogo.

Minha evolução

#/evolucao

Resumo, período, histórico e detalhes.

Ajustes

#/ajustes

Preferências e dados locais.

Jogo

#/jogo/<gameId>

Usar somente IDs do catálogo.

Treino

#/treino

Plano e sessão atual; guardar referência da data enquanto estiver ativo.

Resultado

Estado da sessão dentro da rota do jogo/treino

Não recalcular ou salvar conclusão ao renderizar novamente.

Uma rota inválida mostra “Não encontramos esta atividade” e “Voltar ao início”. Link direto para jogo válido abre instruções. O destino atual da navegação usa aria-current="page". O botão Voltar do navegador passa pela mesma proteção de saída de sessão; cancelar mantém rota, tela e estado atuais sem criar uma cadeia de entradas duplicadas no histórico.

4.2 Comportamento por largura

Largura

Navegação

Conteúdo e catálogo

320–599 px

Barra inferior com quatro destinos, ícone e texto; cabeçalho simples com marca.

Uma coluna; margens de 16 px; botões principais podem ocupar toda a largura.

600–767 px

Mesma navegação inferior, com rótulos completos.

Duas colunas de cards se o conteúdo couber; manter margens de 16–24 px.

768–1023 px

Cabeçalho e navegação horizontal, permitindo quebra ordenada.

Duas colunas; margens de 24 px.

A partir de 1024 px

Barra lateral de 232 px com quatro destinos; marca no topo.

Área principal com margens de 32 px, largura máxima de 1120 px e três colunas de cards.

No desktop, a barra lateral pode ser aderente ao topo, sem cobrir o conteúdo. No celular, reservar no fim da página 88px + env(safe-area-inset-bottom) para a barra inferior. Usar min-width: 0 nos itens de grid e flex; não corrigir overflow apenas escondendo-o no body.

Durante jogos e pausas, ocultar a navegação global e usar largura máxima de 960 px para o exercício, com tabuleiro de até 760 px quando apropriado. Conservar a marca discreta e “Voltar ao início”. A página pode rolar verticalmente; controles e rodapé não se sobrepõem ao tabuleiro.

4.3 Grade

.games-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1rem;
}

@media (min-width: 600px) {
  .games-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (min-width: 1024px) {
  .games-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.5rem;
  }
}

Alvos e textos têm prioridade sobre o número de colunas. Se uma variante ampliada exigir, reduzir colunas. A grade de jogos do catálogo e o tabuleiro de um minijogo são componentes distintos.

5. Especificação das telas

5.1 Início

Ordem de leitura e conteúdo:

Região

Conteúdo

Direção visual e comportamento

Abertura

h1 “Bom te ver por aqui.” e “Escolha uma atividade. Cada pequeno passo conta.”

Alinhamento à esquerda e texto curto; não inventar nome de perfil.

Destaque

“Treino de Hoje”, “5 atividades variadas” e estimativa de 5 a 10 minutos.

Card verde profundo, texto claro e botão verde-limão; título à esquerda e composição de cartas à direita no desktop, dispensável no celular.

Ação do treino

“Começar treino”, “Continuar treino” ou estado concluído.

Um único botão principal; texto deriva do plano real.

Resumo

Atividades concluídas, estrelas e dias com atividade.

Três informações compactas. “Dias com atividade” não é uma sequência obrigatória.

Sugestão

Um jogo e uma justificativa curta, quando houver base para recomendar.

Destaque secundário sem repetir o peso visual do treino.

Atividades em destaque

Título “Encontre sua próxima atividade”, ação “Ver todas” e três cards.

Três colunas no desktop e uma no celular; “Ver todas” abre os 12 jogos em Atividades.

No primeiro acesso, substituir o resumo vazio por “Seu progresso começa com a primeira atividade.” e convite para começar. Não mostrar três cartões grandes com zeros. Em progresso legado sem datas, mostrar somente os totais conhecidos; omitir o total de dias até haver dados datados, com explicação em Minha evolução.

Treino parcial: “Você concluiu 2 de 5 atividades” e “Continuar treino”. Treino finalizado: “Treino de hoje concluído” e “Escolher outra atividade”. Nenhuma contagem é fixa no código de apresentação.

5.2 Atividades

Título “Escolha sua próxima atividade” e descrição “Você pode começar por qualquer uma.”. Abaixo, campo com rótulo “Buscar atividade” e placeholder “Ex.: memória”; depois filtros Todas, Memória, Linguagem, Atenção, Raciocínio, Associação e Cotidiano.

Filtros são botões com aria-pressed, dispostos em linhas que podem quebrar. Não exigir arrastar uma faixa horizontal para encontrar categorias. Busca e filtro atualizam a lista sem mover o foco; anunciar a quantidade de resultados de forma discreta.

Card: miniatura superior com cerca de 104 px de altura, etiqueta de categoria, título, descrição de uma frase e rótulo “Conhecer atividade”. O destino é um único link envolvendo o conteúdo não interativo do card; “Conhecer atividade” pode ser um texto dentro desse link, nunca um botão aninhado. Não usar card clicável com vários handlers concorrentes.

Zero resultados: “Nenhuma atividade encontrada. Tente outro nome ou limpe os filtros.” e botão “Limpar filtros”. Preservar a busca após voltar do jogo, sempre que a navegação partir do catálogo.

5.3 Instruções e exercício

Antes de iniciar, apresentar o título do jogo, a categoria, uma instrução objetiva e uma ilustração ou exemplo curto apenas quando necessário. A ação principal é “Começar atividade”. “Voltar ao início” permanece disponível.

Durante a atividade, a ordem é:

Barra compacta com voltar e pausar.

Nome do jogo e progresso textual do desafio.

Comando do exercício.

Área interativa.

Região de feedback com espaço reservado.

Controles de ajuda, desfazer/verificar quando aplicáveis e continuar.

Não mostrar o total de erros ou cronômetro no topo. A dificuldade fica interna. O progresso local pode ser “Etapa 2 de 3”, “1 de 3 pares encontrados” ou “2 de 3 objetos encontrados”. Nenhuma barra sugere tempo esgotando.

Pausar exibe um diálogo com “Atividade pausada”, “Continuar atividade” e “Sair da atividade”. Interromper o relógio ativo e qualquer exposição temporizada. Voltar à aba não retoma sozinho uma sessão pausada automaticamente; a pessoa escolhe continuar.

5.4 Resultado

Resultado aparece na mesma área de foco, com largura de leitura menor que o tabuleiro. Mostrar um ícone simples de conclusão, “Atividade concluída!”, estrelas efetivamente recebidas e “Muito bem por chegar até aqui.”.

Prática livre: botão principal “Praticar novamente” e link secundário “Escolher outra atividade”. “Praticar novamente” cria nova sessão, e não reabre a sessão concluída para somar de novo.

Treino: mostrar “Atividade 2 de 5 concluída” e botão “Próxima atividade”. Após a quinta, mostrar a mensagem final do treino e “Voltar ao início”. O resumo usa as estrelas das cinco sessões concluídas; não concede uma segunda recompensa pelas mesmas sessões.

Não usar fogos, chuva de confetes ou animação contínua. Se houver transição, usar uma aparição discreta controlada pela preferência de movimento.

5.5 Treino de Hoje

Antes da primeira atividade, exibir cinco linhas numeradas com jogo e categoria, a estimativa e “Começar treino”. Em treino parcial, marcar etapas concluídas por ícone e texto, indicar a próxima e oferecer “Continuar treino”.

Durante o treino, reutilizar a tela real de cada jogo. Não manter outra versão das regras para o modo diário. Registrar a referência da etapa junto da sessão. A sequência avança apenas após “Próxima atividade”.

Se a página for atualizada, preservar etapas concluídas e reiniciar a etapa pendente. Mostrar “As etapas concluídas estão salvas. Vamos recomeçar esta atividade.” quando isso ocorrer. Não apresentar “Continuar de onde parou” para um tabuleiro que não foi preservado.

5.6 Minha evolução

Título “Cada prática conta” e descrição curta. Usar seletor de período “Últimos 7 dias”, “Últimos 30 dias” e “Todo o período”; o padrão é Todo o período.

Bloco

Conteúdo e regra

Totais

Até três: atividades concluídas, estrelas e dias com atividade.

Participação

Barras simples de atividades concluídas por dia no período de 7 dias, ou por semana no de 30 dias. Em Todo o período, resumo textual e histórico são suficientes.

Alternativa textual

Lista ou tabela com os mesmos intervalos, datas e totais do gráfico.

Categorias

Nome, quantidade de sessões e texto de incentivo. Comparações só aparecem com amostra suficiente.

Sugestão

Um jogo, ação “Praticar” e justificativa correspondente à regra realmente usada.

Histórico

Lista de sessões com jogo, data, estado e estrelas; detalhes mostram métricas registradas.

Datas e números usam Intl.DateTimeFormat('pt-BR') e Intl.NumberFormat('pt-BR'). Registros incompletos são “Interrompida” e não entram no gráfico de conclusões.

Sessões antigas sem data preservada não entram em filtros de 7/30 dias. Em Todo o período, apresentar os totais legados separadamente com “Inclui registros anteriores sem data detalhada”. Não transformar esses totais em pontos de gráfico.

Com histórico vazio, mostrar “Seu progresso vai aparecer aqui depois da primeira atividade.” e “Escolher atividade”. Um gráfico com valores de exemplo não faz parte desta tela.

5.7 Ajustes

Agrupar em “Aparência”, “Leitura”, “Movimento”, “Tempo de observação” e “Meu progresso”. Não criar perfil, avatar, senha ou e-mail.

Aparência: opções Claro, Escuro e Sistema, aplicadas sem recarregar e persistidas no navegador.

Leitura: opções Padrão e Ampliado, com prévia curta. Aplicar sem recarregar.

Movimento: “Reduzir animações”. A preferência do sistema por redução sempre é respeitada; a opção do aplicativo pode acrescentar redução, nunca forçar movimento contra o sistema.

Observação: “No meu ritmo” como padrão, ou “Tempo sugerido” para O Que Você Viu?. Explicar que essa escolha controla quando as imagens são ocultadas.

Meu progresso: “Seu progresso fica salvo neste navegador.” e ação “Apagar meu progresso” em área separada.

Confirmação: título “Apagar seu progresso?”, texto “As atividades, estrelas e treinos salvos neste navegador serão apagados. Suas preferências de leitura serão mantidas.”, botão seguro “Cancelar” e botão destrutivo “Apagar progresso”. Foco inicial em Cancelar. Não executar exclusão por fechar o diálogo ou pressionar Escape.

6. Componentes e estados

6.1 Componentes compartilhados

Componente

Responsabilidade

AppShell

Navegação global, região principal e modo de foco.

PageHeader

Título, descrição e ação contextual quando existir.

Button / links

Variantes principal, secundária, discreta e destrutiva.

GameCard

Apresentação e acesso a um jogo do catálogo.

CategoryBadge

Ícone, nome e cor da categoria.

GameShell

Instrução, progresso, tabuleiro, feedback e controles comuns.

ChoiceButton

Alternativa textual ou visual e estado selecionado/resolvido.

FeedbackMessage

Mensagem persistente, ícone e anúncio acessível.

ProgressIndicator

Contagem de etapas, pares ou itens com texto equivalente.

ResultPanel

Resultado já registrado, estrelas e próxima ação.

EmptyState

Explicação curta e uma ação útil.

Dialog

Pausa, saída e confirmação de exclusão.

Esses nomes representam responsabilidades, não exigem framework ou uma classe por componente. Funções JavaScript que retornam elementos DOM são suficientes. Não transformar componentes em um sistema genérico complexo.

6.2 Estados interativos

Estado

Aparência

Comportamento e semântica

Normal

Fundo e contorno da variante.

Nome de ação explícito; alvo mínimo respeitado.

Hover

Mudança leve de fundo/contorno; sem salto de layout.

Aplicar apenas em dispositivos com hover.

Foco

Anel externo de 3 px com afastamento de 3 px.

Foco nunca fica atrás de navegação ou diálogo.

Selecionado

Contorno de 2 px, fundo suave e marca de seleção.

aria-pressed ou estado nativo apropriado.

Correto

Fundo de sucesso, ícone de verificação e mensagem.

Resolver item uma vez e impedir nova pontuação.

Nova tentativa

Fundo de orientação e texto acolhedor.

Não sacudir a tela; oferecer nova tentativa e ajuda.

Indisponível

Visual atenuado, rótulo ainda legível.

Desabilitar apenas por condição real e explicar quando necessário.

Processando

Rótulo como “Salvando...”, se houver operação real.

Bloquear reenvio; não criar atraso artificial.

Reservar a borda de 2 px desde o estado normal com cor apropriada para a seleção não deslocar os itens. Usar button nas ações e a nos destinos; um div não deve substituir controle nativo.

6.3 Estados de conteúdo

Situação

Mensagem sugerida

Ação

Sem histórico

“Seu progresso começa com a primeira atividade.”

Escolher atividade.

Busca vazia

“Nenhuma atividade encontrada.”

Limpar filtros.

Sem amostra para recomendar

“Explore as atividades para descobrir suas preferidas.”

Explorar atividades.

Falha ao gravar

“Seu progresso está disponível nesta sessão, mas não foi possível salvá-lo neste navegador.”

Tentar salvar novamente ou continuar.

Dado salvo ilegível

“Não foi possível ler o progresso salvo. Você pode continuar por enquanto.”

Ver ajustes; manter o valor original até decisão explícita de reset.

Jogo ou ativo indisponível

“Não foi possível carregar esta atividade.”

Tentar novamente e voltar ao início.

Rota desconhecida

“Não encontramos esta atividade.”

Voltar ao início.

Mensagens de sistema podem usar role="alert" quando a ação precisa de atenção imediata. Feedback comum dos exercícios usa uma região role="status", aria-live="polite" e aria-atomic="true". Não anunciar toda a página a cada clique.

7. Interação dos 12 minijogos

As quantidades abaixo são decisões implementáveis desta revisão. Nível altera conteúdo e complexidade, nunca o tamanho mínimo dos alvos. Um jogo livre e o mesmo jogo no treino usam o mesmo módulo.

Jogo

Apresentação e interação

Configuração dos níveis 1 / 2 / 3 / 4

Jogo da Memória

Cartas fechadas com verso neutro. Comparar duas diferentes; bloquear terceira enquanto o par é avaliado. Par incorreto permanece aberto até “Tentar outro par”; par correto fica resolvido.

2 / 3 / 4 / 6 pares; 4 / 6 / 8 / 12 cartas.

O Que Você Viu?

Observar imagens; ocultar por “Já observei” ou tempo escolhido; depois selecionar qual apareceu. Remover imagens anteriores da árvore acessível na fase de resposta.

2 / 3 / 4 / 5 imagens; 2 / 3 / 4 / 4 opções; exposição temporizada de 12 / 10 / 8 / 6 segundos.

Monte a Palavra

Imagem central; espaços para sílabas; banco de peças; “Desfazer” e “Verificar palavra”. Cada peça tem ID próprio mesmo quando o texto se repete.

2 sílabas / 3 sílabas / 4 sílabas / 4–5 sílabas com 1–2 distratores.

Imagem e Palavra

Uma referência e alternativas grandes. Distribuir imagem→palavra e palavra→imagem entre desafios.

2 / 3 / 4 / 4 opções; aumentar semelhança sem ambiguidade.

Qual Não Combina?

Quatro itens equivalentes em peso visual; selecionar o diferente. Explicar a categoria após acerto.

Sempre 4 itens; categorias progressivamente mais próximas.

Complete a Sequência

Padrão em faixa que pode quebrar com ordem explícita; lacuna destacada; alternativas abaixo.

AB / ABC / AAB ou ABB / padrões visuais ou numéricos mais complexos; 2 / 3 / 3 / 4 opções.

Organize a Rotina

Lista de etapas numeradas com controles de subir/descer e “Verificar ordem”. Manter foco no item movido.

3 / 4 / 5 / 6 etapas coerentes, usando conteúdos preparados para cada tamanho.

Encontre o Objeto

Comando “Encontre a maçã.” e grade de imagens. Alvo único; evitar ruído decorativo.

4 / 6 / 8 / 9 objetos; aumentar semelhança visual nos últimos níveis.

Toque Somente em...

Instrução de categoria e objetos selecionáveis. Corretos permanecem marcados; repetição não gera tentativa. Incorreto gera orientação.

4 / 6 / 8 / 9 itens; 2 / 3 / 3 / 4 alvos corretos.

Associação de Objetos

Selecionar origem e depois destino. Mostrar pares resolvidos por rótulo e marca, sem depender de linhas cruzadas ou arrastar.

2 / 3 / 4 / 5 pares, com relações progressivamente menos diretas.

Situações do Cotidiano

Pergunta em destaque, imagem opcional e alternativas curtas. A pergunta contém tudo o que é necessário para resolver.

2 / 3 / 3 / 4 opções; contexto gradualmente mais elaborado.

Complete a Frase

Frase com uma lacuna, alternativas e atualização textual após escolha correta.

2 / 3 / 3 / 4 opções; frases progressivamente maiores.

7.1 Regras de layout dos tabuleiros

Memória: em celular estreito, preferir três colunas quando quatro reduzirem as cartas abaixo de 64 px. Com 4 cartas, usar 2 × 2. Não associar número de colunas ao nível de forma rígida.

Alternativas com imagem: a caixa clicável tem pelo menos 64 px em ambas as dimensões; preferir 88–112 px quando houver espaço. Descrições podem ficar abaixo.

Sílabas: usar botões com largura mínima de 64 px, sem cortar acentos; o banco quebra em linhas.

Rotina: lista vertical em qualquer tela. Cada controle de deslocamento mantém 48 px e nome como “Mover Usar sabão para cima”. Desabilitar a direção impossível na primeira/última posição.

Associação: no desktop, duas colunas com títulos Origem e Combinação. No celular, dois grupos verticais; após escolher origem, conduzir o foco ao grupo de destinos com anúncio da seleção. Permitir cancelar a seleção.

Sequências: manter ordem de leitura com lista semântica; usar formas/nomes diferentes além da cor. Evitar rolagem horizontal obrigatória.

7.2 Conteúdo e dados

Jogos de três desafios precisam de pelo menos três conteúdos distintos e válidos por nível. Jogos de tabuleiro precisam de conjuntos suficientes para a maior configuração. Não repetir imediatamente um conteúdo quando houver alternativas no mesmo nível.

Para rotina, definir uma ordem canônica explícita ou uma lista de ordens aceitas quando houver mais de uma solução correta. Nunca penalizar uma sequência válida só porque a ordem dos dados foi escolhida arbitrariamente. No modo acadêmico, preferir instruções que deixem clara a sequência esperada.

Categorias, situações, frases e associações precisam de resposta inequívoca. Distratores devem ser distintos e não conter a resposta duplicada. A dificuldade é de resolução do exercício, não de interpretação de imagens confusas.

Exemplo de sílabas com repetição:

{
  id: "banana-l2",
  level: 2,
  word: "BANANA",
  assetId: "banana",
  syllablePieces: [
    { id: "ba-1", text: "BA" },
    { id: "na-1", text: "NA" },
    { id: "na-2", text: "NA" }
  ],
  answerTexts: ["BA", "NA", "NA"],
  hint: "A palavra começa com BA."
}

A resposta compara a sequência de textos/valor semântico; IDs distinguem peças físicas, e não tornam as duas peças NA diferentes como resposta.

8. Arquitetura técnica

8.1 Organização

Manter a estrutura real do repositório sempre que já atender às responsabilidades. Os caminhos abaixo seguem a documentação anterior; são destinos de referência, não ordem para mover ou recriar arquivos existentes.

Caminho

Responsabilidade

index.html existente

HTML base, metadados, CSS e ponto de entrada; preservar #app.

src/css/style.css

Tokens, estilos básicos, layouts, componentes e media queries, com seções claras.

src/js/app.js

Inicialização, navegação, leitura de preferências e montagem/desmontagem de telas.

src/js/data.js

Registro do catálogo e conteúdo; pode importar arquivos de dados menores se já existirem.

src/js/storage.js

Leitura, validação, migração e gravação dos dados locais.

src/js/session.js

Ciclo de vida de atividade, tentativas, pausa e conclusão idempotente.

src/js/levels.js

Configurações e progressão por jogo.

src/js/scoring.js

Cálculo único das estrelas.

src/js/dailyTraining.js

Plano diário, etapas e retomada.

src/js/evolution.js

Totais, agrupamentos por data, elegibilidade e recomendações.

src/js/ui/

Funções compartilhadas de componentes e telas, na quantidade necessária.

src/js/utils/

Embaralhamento, data local e tempo ativo, sem regras de jogo.

src/js/games/

Um módulo por jogo, preservando módulos já existentes.

src/assets/

Imagens, ícones e fontes locais quando presentes.

Módulos dos jogos, conforme a base anterior: memory.js, whatDidYouSee.js, wordBuilder.js, imageWord.js, oddOneOut.js, sequence.js, organizeRoutine.js, findObject.js, tapOnly.js, objectAssociation.js, dailySituations.js e completeSentence.js.

Não acessar localStorage de dentro dos jogos. Não colocar as regras de todos os jogos em app.js. Preservar README.md e documentos existentes; esta execução não tem tarefa de criação de documentação.

8.2 Contrato dos jogos

Interface de referência; adaptar nomes existentes, preservando estes comportamentos:

export function mountGame(root, context) {
  // context: gameId, level, content, preferences, sessionId,
  // onAttempt, onComplete, onPause, onBack, signal
  // Retorna funções para pausar, retomar e desmontar a atividade.
  return { pause, resume, destroy };
}

onAttempt recebe ID único de avaliação, desafio, resultado correto/incorreto e metadados específicos quando necessários.

onComplete informa que os objetivos foram concluídos; o serviço de sessão calcula métricas e estrelas a partir dos registros oficiais.

onPause e onBack passam pelo controlador comum; cada jogo não cria seu próprio diálogo de saída.

pause() congela interação e timers de observação; resume() retoma tempo restante, sem criar outro timer concorrente.

destroy() remove eventos, timers e referências ao DOM. Usar AbortController quando compatível com a estrutura existente.

O registro do catálogo mapeia um gameId conhecido para seu módulo. Rejeitar IDs desconhecidos antes de importar ou renderizar conteúdo. A montagem de outro jogo sempre desmonta o anterior.

8.3 Ciclo de vida

stateDiagram-v2
  [*] --> Instrucoes
  Instrucoes --> EmAtividade: Começar
  EmAtividade --> Pausada: Pausar ou ocultar aba
  Pausada --> EmAtividade: Continuar
  EmAtividade --> Resultado: Todos os objetivos concluídos
  EmAtividade --> ConfirmarSaida: Sair
  Pausada --> ConfirmarSaida: Sair
  ConfirmarSaida --> EmAtividade: Cancelar se estava ativa
  ConfirmarSaida --> Pausada: Cancelar se estava pausada
  ConfirmarSaida --> Interrompida: Confirmar
  Resultado --> [*]
  Interrompida --> [*]

O estado anterior à confirmação deve ser preservado: se a saída foi pedida a partir da pausa, Cancelar volta à pausa; se partiu de uma atividade em execução, Cancelar permite continuar a atividade.

Dentro da atividade, avaliação e feedback possuem um bloqueio curto de reentrada. Duplo clique não cria duas avaliações. Após acerto em desafio de alternativa única, aguardar “Continuar”. Após erro, apresentar “Tentar novamente” quando necessário para reabrir a avaliação. Jogos de múltiplos itens continuam com o próximo item, mantendo os resolvidos protegidos.

8.4 Tempo

Usar performance.now() para duração ativa em uma sessão e carimbos ISO para datas de histórico. Acumular segmentos ativos; pausar ao abrir diálogo, ao ocultar a aba e durante a saída. O tempo de leitura das instruções, do resultado e da pausa não entra na duração. Em recarregamento inesperado, uma sessão interrompida conserva a duração acumulada no último registro; não inferir tempo não observado desde a gravação.

O temporizador de observação só existe no modo Tempo sugerido. Seu tempo restante pausa junto da sessão. No modo No meu ritmo, não há timer: “Já observei” muda de fase. O ajuste sem limite de tempo se inspira na referência de tempo ajustável da W3C.

9. Dados, persistência e integridade

9.1 Chaves e modelo

Chave de progresso proposta: reconecta_progress, preservando a referência anterior. Preferências ficam em reconecta_preferences para sobreviver ao reset de progresso. Se o código já usar outras chaves, localizar e migrar explicitamente; não abandonar dados existentes por simples renomeação.

Modelo de referência da versão 2:

{
  schemaVersion: 2,
  legacyTotals: null,
  levelState: {
    // gameId: { level: 1, completedSinceEvaluation: [] }
  },
  sessions: [
    // {
    //   id, gameId, category, level,
    //   status: "active" | "completed" | "abandoned",
    //   startedAt, endedAt, elapsedMs,
    //   attempts: [{ id, challengeId, correct, at }],
    //   stars: 0,
    //   trainingRef: null | { dateKey, slotId }
    // }
  ],
  dailyPlans: {
    // "AAAA-MM-DD": {
    //   dateKey, gameIds: [],
    //   slots: [{ id, gameId, completedSessionId: null }],
    //   createdAt
    // }
  }
}

Preferências:

{
  schemaVersion: 1,
  textSize: "standard",        // "standard" | "large"
  reduceMotion: false,          // combina por OR com a preferência do sistema
  observationMode: "self-paced" // "self-paced" | "suggested-time"
}

Os comentários representam forma dos dados; não são registros de exemplo para inserir na interface. Gerar IDs únicos por sessão e por tentativa. Tratar os arrays de tentativas como fonte das contagens: quantidade total, quantidade correta e quantidade incorreta.

9.2 Operações e invariantes

Operação

Regra

Iniciar

Criar uma sessão ativa somente ao começar o exercício. Fixar jogo, categoria e nível.

Avaliar

Adicionar uma tentativa com ID único; rejeitar ID repetido e avaliação de objetivo já resolvido.

Persistir

Atualizar a cópia em memória e gravar em localStorage com tratamento de erro. A interface recebe o estado real de gravação.

Concluir

Aceitar apenas uma transição active→completed. Calcular estrelas, fechar tempo e atualizar a etapa diária na mesma gravação do objeto de progresso.

Interromper

Fechar sessão como abandoned, manter tentativas e zerar recompensa. Não avançar etapa diária.

Recarregar

Sessão active persistida vira abandoned; treino preserva etapas concluídas e reinicia a pendente quando solicitado.

Ler resultado

Exibir o registro concluído; não executar novamente cálculo com efeito de gravação.

Resetar

Remover somente as chaves de progresso identificadas como pertencentes ao ReConecta; preservar preferências e dados de outras aplicações. Nunca usar localStorage.clear().

Estrelas são 3, 2 ou 1 conforme RF019; não usar valores derivados do tempo. tentativas = acertos + erros. Total de atividades conta apenas status completed. Estrelas somam somente sessões concluídas e eventual total legado conhecido.

As sessões interrompidas podem aparecer no histórico e nos detalhes de tentativas; gráficos de atividades, níveis e recomendações usam conclusões. Essa distinção precisa ser a mesma em todas as telas.

9.3 Migração e falhas

Antes de migrar, identificar a estrutura realmente usada no código. Se corresponder ao modelo anterior com atividadesRealizadas, acertos, erros, tentativas, tempoRespostaTotal, estrelas e nivelAtual, preservar os valores válidos como totais legados. Validar números finitos e não negativos; normalizar nível para 1–4 apenas quando existir valor válido. Não inventar histórico detalhado.

A migração deve ser idempotente: repetir a abertura não pode somar os valores antigos de novo. Construir e validar o novo objeto antes de gravá-lo. Preservar campos de dados reconhecidos na migração; dados de estrutura desconhecida não devem ser descartados silenciosamente.

JSON ilegível ou versão futura desconhecida: manter o valor original intacto e operar temporariamente em memória, mostrando a situação. Não sobrescrever o conteúdo irrecuperável como se fosse progresso vazio. A ação de reset em Ajustes permite a decisão explícita sobre exclusão.

Falha de quota ou acesso: manter a sessão utilizável em memória e informar que não foi salva. “Tentar salvar novamente” usa o mesmo estado, sem criar outra sessão. Não afirmar persistência após falha.

Esta versão trabalha com uma sessão de uso em uma aba. Sincronização e edição simultânea entre abas não integram o escopo. Os testes de integridade devem cobrir os eventos e gravações da sessão ativa, sem declarar suporte a mesclagem concorrente de progresso.

10. Dificuldade, treino e recomendação

levels.js implementa exatamente a janela de três sessões e os limiares de RF014–RF018 e da seção 8.2 de requirements.md. O cálculo ocorre ao registrar a conclusão, não a cada renderização. Após a avaliação, limpar a janela daquele jogo, mesmo se o nível permanecer igual.

O plano diário contém exatamente cinco grupos na ordem Memória, Linguagem, Raciocínio, Atenção e Cotidiano. Associação de Objetos pertence à categoria de métricas Associação e pode ocupar o grupo Cotidiano do treino. Não duplicar sua pontuação em Cotidiano.

Gerar dateKey a partir de ano, mês e dia locais. Não usar toISOString().slice(0, 10) para identificar o dia local. A escolha dos jogos é feita uma vez e persistida; recarregar não sorteia outro plano.

A função de recomendação deve ser pura: receber histórico e catálogo e devolver jogo, categoria e motivo. Regras de amostra, taxa e desempate estão em requirements.md, seção 8.4. A interface traduz o motivo real em texto:

Motivo

Texto de apresentação

Variedade por pouco histórico

“Que tal experimentar esta atividade?”

Jogo pouco praticado

“Uma atividade para variar sua prática.”

Categoria elegível com menor taxa

“Uma sugestão para continuar praticando.”

Não mostrar percentuais como diagnóstico. Um filtro de período da tela de evolução não muda o plano diário já gerado nem altera automaticamente a regra global de recomendação.

11. Acessibilidade aplicada

Documento em português do Brasil, um main, um h1 por tela, cabeçalhos em sequência e link “Pular para o conteúdo”.

Ao trocar de tela, atualizar o título da página e mover foco ao título ou início do conteúdo. Ao voltar ao catálogo, restaurar o foco ao card de origem quando existir.

Usar botões nativos em todas as seleções; permitir Tab, Shift+Tab, Enter e Espaço. Nenhuma atividade depende de hover, arrastar ou gesto preciso.

Descrever cada controle; fornecer aria-pressed para seleção quando pertinente. Não adicionar atributos ARIA que contradigam o comportamento nativo.

Diálogos têm título, foco inicial adequado, foco contido, Escape como cancelamento e devolução de foco ao acionador.

Garantir 48 × 48 CSS px em controles isolados e 64 × 64 em cartas/alternativas visuais. Esses tamanhos são a escolha de conforto do projeto; a referência da W3C sobre tamanho de alvo descreve um mínimo menor e suas exceções.

Manter texto, ícone e forma para seleção e feedback. Sequências coloridas precisam de forma ou descrição adicional.

Não expor respostas ocultas da Memória ou objetos da fase anterior de O Que Você Viu? à árvore acessível.

Respeitar ampliação do navegador, texto ampliado e redução de movimento. Não usar user-scalable=no.

Imagens de conteúdo têm alternativas textuais; imagens decorativas não entram na leitura. Modal e mensagem não podem esconder controles focados.

12. Desempenho e verificação visual

Meta de implementação: Início interativo sem espera artificial e transferência inicial de HTML, CSS, JavaScript e ativos necessários de até 1,5 MB, sem incluir imagens de jogos ainda não abertos. É um orçamento proposto, não uma medição feita nesta revisão.

Carregar as imagens do tabuleiro antes de começar uma fase de observação. Usar carregamento sob demanda para ativos de jogos ainda não abertos, reservar largura/altura e não atrasar o primeiro conteúdo relevante com animação.

Validar a versão final nas larguras 320, 390, 768, 1024 e 1440 CSS px. Conferir pelo menos Início, catálogo, um exercício visual, um textual, ordenação, resultado, evolução e Ajustes. Cada jogo também deve passar por conclusão em tela pequena.

Verificação

Evidência esperada

Hierarquia e consistência

Mesmos tokens e componentes nas telas; ação principal identificável.

Textos reais

Títulos longos, acentos, quebra de linhas e estado sem dados sem cortes.

Teclado

Percurso completo, foco visível, saída/cancelamento e retorno ao acionador.

Contraste

Pares efetivamente usados em estado normal, foco, seleção e feedback.

Zoom

Texto a 200% e refluxo a uma largura efetiva de 320 CSS px; nenhum botão inacessível.

Movimento

Preferência do sistema e ajuste do aplicativo respeitados.

Regressão

Regras, dados e pontuação continuam corretos após mudanças de aparência.

13. Estratégia de testes

Usar testes de lógica onde previnem falhas reais: cálculo de estrelas, limites de nível, tentativas duplicadas, conclusão repetida, data local, retomada do treino, recomendações sem amostra e migração de progresso.

No navegador, verificar cada jogo com erro, dica, acerto, conclusão, pausa, saída e nova entrada. Testar também persistência após F5, sequência de cinco etapas e falha simulada de armazenamento. Verificar que timers e eventos de uma atividade não alteram outra tela.

Para alterações puramente visuais, inspeção real nos tamanhos definidos é suficiente; não criar testes que apenas repitam nomes de classes ou valores CSS. Reutilizar o ambiente de testes disponível; registrar o que foi efetivamente validado e não declarar testes sem executá-los.

14. Critério de design pronto

Todas as áreas devem seguir esta especificação e os requisitos de requirements.md. Nenhum botão visível pode ser decorativo, nenhum jogo pode ficar apenas como card sem implementação e nenhuma métrica pode usar dado fictício.

O resultado esperado é um ReConecta com identidade consistente, navegação clara, jogos compreensíveis, progresso preservado e experiência confortável no computador e no celular. As tarefas concretas para chegar a esse resultado estão em tasks.md.

15. Nova direção visual — implementação das Tasks 27–44

15.1 O que deve mudar na percepção do aplicativo

A página inicial deve transmitir cuidado na composição: cabeçalho enxuto, um destaque principal, poucos elementos com o mesmo peso e um conjunto coerente de atividades. O catálogo ganha miniaturas próprias e textos alinhados. As telas de exercício ganham proporções consistentes, espaços claros de instrução/resposta e feedback integrado.

Priorizar quatro características verificáveis: hierarquia, alinhamento, proporção e consistência. Aumentar sombras, arredondar tudo ou colocar um degradê no fundo não basta para concluir a reformulação.

O primeiro acesso é uma tela completa sem estatísticas: destaque do treino, convite acolhedor e três atividades. Quando houver histórico, mostrar os dados reais em uma faixa secundária compacta. Não inventar um perfil, nome de usuário, sequência de dias ou percentuais para preencher espaço.

15.2 Paleta complementar e uso do destaque

Os tokens principais da seção 2 foram atualizados nesta revisão. Acrescentar:

Token

Valor no tema claro

Uso

--color-hero

#173F32

Fundo do destaque do Treino de Hoje.

--color-on-hero

#FAFCF8

Título do destaque.

--color-hero-muted

#E0EEDD

Descrição curta sobre o fundo verde profundo.

--color-highlight

#DDF0B6

Botão principal dentro do destaque.

--color-on-highlight

#1C4231

Texto e ícone desse botão.

--color-navigation-active

#EDF3E4

Fundo do destino selecionado na navegação.

O par título/destaque tem contraste aproximado de 11,34:1. O par texto/botão claro do destaque tem aproximadamente 9,19:1. Esses valores foram calculados para os hexadecimais apresentados; os estados implementados continuam sujeitos à conferência.

Distribuição: fundo neutro na maior área; branco nas superfícies de leitura; verde profundo em um bloco de destaque; cores de categoria nas miniaturas. Não preencher todos os cards com a cor principal. Evitar borda, sombra e fundo contrastante simultaneamente em todo elemento.

15.3 Proporções de referência

Elemento

Desktop

Celular

Barra lateral

232 px; marca, menu e observação discreta no fim.

Substituída pela navegação inferior da aplicação.

Área principal

Até 1120 px, margens de 32 px.

Margens de 16 px.

Abertura

Título 32–36 px e descrição 18 px.

Título 26–28 px e descrição 18 px.

Destaque

Padding 32 px, raio 24 px, duas colunas de aproximadamente 65%/35%.

Padding 24 px, uma coluna e decoração removida se faltar espaço.

Título do destaque

36–40 px, duas linhas curtas.

28–30 px, sem cortar palavras.

Botão do destaque

Altura mínima 52 px e espaço lateral de 20–24 px.

Altura mínima 52 px; largura confortável ou total.

Miniatura de card

Altura entre 100 e 120 px, mesmo padrão em toda a linha.

Altura entre 100 e 120 px; não esticar a imagem.

Conteúdo do card

Padding de 20 px; título 20 px, descrição 16–18 px.

Padding de 20 px; título 20 px e quebra natural.

Área de exercício

Superfície limpa com tabuleiro de até 760 px.

Ajustada à largura, preservando cartas de pelo menos 64 px.

O tamanho de 16 px é reservado a descrições curtas de cards e metadados; instruções e conteúdo principal dos exercícios continuam com 18 px ou mais. Texto ampliado aumenta também descrições, rótulos e botões. Não usar altura fixa em cards para forçar alinhamento de títulos: usar layout em coluna e ancorar a ação no fim.

15.4 Início: composição final

Cabeçalho: “Bom te ver por aqui.” e “Escolha uma atividade. Cada pequeno passo conta.”. Em seguida, destaque com rótulo “Treino de Hoje”, título “Um momento para reconectar.”, composição de cinco atividades e estimativa de tempo já definida.

O destaque pode usar duas pequenas cartas ilustradas e uma forma circular suave. Essa arte é decorativa: não contém contadores, botões falsos, gráfico ou texto necessário. Se houver logotipo consolidado, preservar sua identidade; a decoração não cria outra marca.

O botão usa o estado real: Começar treino, Continuar treino ou Escolher outra atividade. Após o destaque, mostrar uma faixa breve de progresso quando houver dados ou “Seu progresso começa com a primeira atividade.” no primeiro acesso.

Encerrar com três cards e “Ver todas”. Na ausência de histórico, usar Jogo da Memória, Monte a Palavra e Complete a Sequência. Com histórico, usar a sugestão válida e completar com jogos de categorias distintas conforme a ordem do catálogo. Não duplicar um jogo na mesma faixa. Essa seleção não muda o plano diário já salvo.

O Início deixa de listar os 12 cards; o catálogo completo é exibido em Atividades. Essa alteração substitui a composição inicial prevista na versão 2.0 e não remove funcionalidades.

15.5 Catálogo e imagens

Cada card deve ter uma miniatura superior, uma categoria discreta, nome completo, descrição curta e ação. Exemplo: “Jogo da Memória” / “Observe, descubra e encontre os pares.”. Não mostrar um código técnico, número de nível ou palavra em inglês como substituto de texto de produto.

Miniaturas comunicam a atividade: cartas sobrepostas para memória, peças de sílabas para linguagem, formas em sequência para raciocínio. Criar composição simples de dois ou três elementos, com uma família de traços e a cor da categoria. Um ícone ampliado pode servir como solução intermediária, mas os cards finais devem diferenciar atividades da mesma categoria.

Imagens de alternativas permanecem centradas, reconhecíveis e sem filtros que alterem seu significado. Não usar o mesmo emoji em todo lugar nem substituir imagens de comida, casa e objetos por símbolos abstratos que exijam interpretação extra.

O card completo pode ser um link único para as instruções do jogo. Não criar um botão dentro do link. Estado hover pode alterar contorno e sombra de forma leve; não aumentar o tamanho do card e deslocar a grade.

15.6 Acabamento por família de jogo

Família

Aplicação da nova aparência

Memória e observação

Verso neutro com identidade única; faces com mesma escala; área estável durante revelação; instrução acima e feedback abaixo.

Sílabas, imagem/palavra e frases

Separar referência, resposta e opções por espaço; peças de sílabas proporcionais; lacuna legível; alternativas textuais sem truncamento.

Sequência, intruso e atenção

Padronizar moldura dos objetos, manter ordem de leitura e diferenciar elementos da atividade de qualquer decoração.

Rotinas e associações

Linhas com numeração, texto e controles alinhados; seleção evidente; estados resolvidos com texto e ícone.

Situações do cotidiano

Pergunta como foco principal; imagem de apoio pequena; alternativas com peso equivalente.

Toda reforma deve preservar os handlers, IDs, comparação de respostas, dicas, níveis, métricas e conclusão existentes. Se uma alteração estrutural exigir mover um controle, adaptar a integração e verificar o fluxo afetado. Não duplicar módulos para trocar o tema.

15.7 Controles, mensagens e diálogos

Usar quatro variantes de ação: principal, secundária, discreta e destrutiva. Botões principais têm preenchimento e texto contrastantes; secundários usam superfície suave ou contorno funcional. Ações destrutivas ficam reservadas a apagar dados.

Campos e filtros têm rótulos próprios, altura confortável e estado ativo visível. Texto do placeholder não é o único rótulo. O anel de foco permanece visível nos dois temas e não é cortado por overflow no ancestral.

Feedback fica em uma região estável próxima da resposta. Mensagens podem ter fundo suave e ícone pequeno; não usar um banner enorme para cada acerto. Resultado destaca a conclusão e apenas as estrelas recebidas; evita tabela de erros em primeiro plano.

Diálogos usam largura de aproximadamente 440 px no desktop, limitada à largura disponível no celular, padding de 24 px e títulos claros. Os botões podem empilhar quando necessário. Preservar foco, cancelamento, pausa e retorno ao acionador.

15.8 Evolução e Ajustes

Minha evolução: no máximo três totais em destaque, depois participação por período e histórico. Usar eixos discretos, barras simples e espaço suficiente para datas; cores não codificam uma avaliação da pessoa. Detalhes permanecem legíveis em lista ou tabela textual. Não redesenhar o gráfico como medidor de saúde ou desempenho inventado.

Ajustes: usar seções com título, explicação de uma linha e controle alinhado. Ordem: Aparência, Leitura, Movimento, Tempo de observação e Meu progresso. A seleção de tema fica nessa tela, sem acrescentar vários botões de personalização à página inicial.

Confirmação de apagar progresso mantém a regra original: excluir progresso mediante confirmação, preservando preferências, inclusive aparência. Não transformar a reformulação visual em uma migração desnecessária do histórico de sessões.

15.9 Aparência clara, escura e do sistema

Acrescentar appearance: "system" às preferências, com valores permitidos "light", "dark" e "system". Preservar os outros campos e tratar ausência do novo campo como Sistema. A versão do objeto de preferências pode avançar de 1 para 2; a estrutura de progresso permanece inalterada.

No modo Sistema, acompanhar a preferência de aparência do dispositivo; uma escolha explícita prevalece até a pessoa alterá-la. Resolver a aparência antes de renderizar o conteúdo para reduzir flashes. Ao alterar a aparência, manter jogo, foco, seleção, tempo e dados. Essa preferência não deve remontar o jogo nem iniciar outra sessão.

Papel

Claro

Escuro

Fundo geral

#F4F5F0

#12271F

Superfície

#FFFFFF

#1B352A

Texto principal

#183A2E

#EEF5EC

Texto secundário

#576A60

#B2C4B7

Ação principal

#245C45

#DDF0B6

Texto da ação

#FFFFFF

#173F32

Superfície suave

#EDF3E4

#294333

Divisória decorativa

#DDE6DA

#375044

Contorno funcional

#778B81

#8FA99A

Foco

#1B63B9

#A5CEF7

Destaque do treino

#173F32

#214A38

Texto sobre destaque

#FAFCF8

#FAFCF8

Categorias no escuro: Memória #253F4B/#BEDFEC; Linguagem #3F344C/#DED0F2; Atenção #4B3B27/#F1D4A6; Raciocínio #36412A/#D1DEAE; Associação #45372F/#EACBBB; Cotidiano #2D433B/#BFDDD2. Cada par corresponde a fundo/texto.

Definir também sucesso, dica, erro, seleção, diálogo e indisponibilidade no tema escuro; não inverter a tela inteira por filtro CSS. Nos exercícios, as cores que fazem parte da resposta ou do padrão são conteúdo e não devem mudar semanticamente com o tema.

15.10 Celular e tablet

No celular, usar uma coluna de cards; a composição ilustrada do destaque é opcional e pode sumir. A mensagem, a ação e os dados necessários permanecem presentes. Não reduzir a fonte dos cards para colocar três por linha.

A aplicação real mantém navegação inferior em telas pequenas, com quatro destinos, rótulos completos e reserva de área segura. A prévia incorporada à conversa pode colocar a navegação no topo por estar contida em outra tela; isso não substitui a regra da aplicação final.

No tablet, usar duas colunas e navegação horizontal com quebra ordenada. No desktop, usar três colunas e a barra lateral. Alinhar os limites externos de título, destaque, catálogo e painéis para evitar a sensação de que cada tela foi feita separadamente.

15.11 Processo de revisão visual

Antes de modificar, registrar a aparência atual das telas que serão alteradas, quando o ambiente permitir capturas. Implementar a nova composição em componentes compartilhados e comparar os estados equivalentes. Não refazer funcionalidades aprovadas para produzir diferenças de código.

Para concluir a Task 44, verificar: alinhamentos, títulos longos, contraste, distribuição de espaços, escala de imagens, estados vazios, tema escuro, foco, texto ampliado e áreas de toque. Corrigir os problemas encontrados no tamanho de tela em que acontecem.

Capturas são evidência auxiliar e não precisam entrar no commit se o repositório não usar referências visuais versionadas. A tarefa não exige criar README, documentação adicional ou uma suíte de testes visuais do zero. Registrar somente verificações realmente executadas.

A implementação final continua sendo o aplicativo existente, com seus dados e regras. A prévia de design demonstra a direção visual; seus exemplos interativos não devem ser copiados como substitutos simplificados dos jogos completos.