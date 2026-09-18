# Imagens internas das atividades — 18/09/2026

## Diagnóstico e fontes

O vocabulário de 60 objetos está em `src/js/phases/objects.js`. Cada ID aponta para um símbolo em `src/assets/game-objects-v2.svg`. O componente compartilhado `src/js/utils/contentView.js::picture()` é usado durante as partidas, inclusive por `option()` e `games/choice.js`. `src/js/utils/assets.js` verifica a disponibilidade do sprite antes de iniciar uma atividade.

O mapeamento do garfo (`object-7`) estava correto. O problema era a arte: um caminho aberto com preenchimento implícito, cabo sem silhueta própria e dentes pouco distinguíveis. O conjunto anterior ainda dependia de `var(--illustration-outline)` no documento SVG externo, tinha preenchimentos genéricos por grupos, cores pouco naturais (por exemplo, tomate alaranjado, abacate alaranjado, chocolate azul) e filtro de sombra em todos os objetos. A renderização já preservava a proporção, mas a escala era pequena em alternativas e a aparência dependia da resolução dos estilos externos.

| Jogo | Caminho de renderização | Resultado |
| --- | --- | --- |
| Jogo da Memória | `games/memory.js` → `picture` | 60 recursos compartilhados disponíveis; cartas mantêm pares, giro e estados |
| O Que Você Viu? | `games/whatDidYouSee.js` → `picture` e escolhas | Imagens de observação e alternativas atualizadas |
| Monte a Palavra | `games/wordBuilder.js` → `picture` | Imagem principal atualizada |
| Imagem e Palavra | `games/imageWord.js` → `picture` e escolhas | Ambos os sentidos usam a mesma arte |
| Qual Não Combina? | `games/oddOneOut.js` → escolhas | Alternativas atualizadas |
| Complete a Sequência | `games/sequence.js` → `option` e escolhas | Sequências visuais e alternativas atualizadas |
| Encontre o Objeto | `games/findObject.js` → escolhas | Alternativas atualizadas |
| Toque Somente em... | `games/tapOnly.js` → `picture` | Objetos selecionáveis atualizados |
| Associação de Objetos | `games/objectAssociation.js` | Já era textual; sem imagens internas para substituir |
| Organize a Rotina, Situações do Cotidiano, Complete a Frase | respectivos renderizadores | Já eram textuais; conteúdo preservado |

`game-card-icons.svg` atende aos ícones de navegação e não é a fonte das imagens internas. Os diretórios antigos `css/` e `js/` não são a entrada carregada pelo `index.html` atual.

## Implementação

As 60 ilustrações foram redesenhadas em SVG vetorial original do projeto. O arquivo fonte editável/reprodutível é `scripts/build-object-art.mjs`; executar `node scripts/build-object-art.mjs` recria o sprite. Não foi usado conjunto externo, emoji, imagem remota nem dependência de licença/atribuição de terceiros.

O garfo tem quatro dentes separados, espaços vazados, pescoço contínuo e cabo fechado. Os demais objetos receberam silhuetas e detalhes próprios, contorno explícito escuro, cores por material e gradientes suaves. Não há filtro de sombra nem dependência de CSS externo no SVG. A revisão também distinguiu o sapato de uma bota e o vaso de uma planta em vaso.

Todos compartilham `viewBox="0 0 96 96"`, margem interna e `preserveAspectRatio="xMidYMid meet"`. `src/css/style.css` amplia as alternativas até 144 px e a imagem principal até 208 px; as cartas aproveitam sua largura disponível. O fundo azul muito claro fica restrito à área da ilustração, mantendo contraste estável sem recolorir objetos conforme o tema. Legendas e nomes acessíveis continuam no componente existente.

Objetos: casa, bola, copo, livro, chave, prato, garfo, faca, cama, mesa, vaso, pato, gato, vaca, sapo, banana, sapato, panela, janela, cavalo, tomate, cenoura, camisa, caneta, tesoura, cadeira, mochila, martelo, girafa, coruja, abacaxi, borboleta, bicicleta, tartaruga, geladeira, telefone, sabonete, abacate, chocolate, camiseta, capacete, travesseiro, televisão, calendário, envelope, ventilador, computador, calculadora, aspirador, apontador, apagador, prateleira, torradeira, cafeteira, frigideira, batedeira, gelatina, limonada, melancia e helicóptero.

## Validação

- 33 testes existentes passaram, executando cada arquivo em processo separado com `node --test --test-isolation=none`: integração/navegação, todos os 96 tabuleiros/rodadas das 36 fases, tentativas, pontuação, pares, pausa, temporizadores e persistência. A execução convencional via npm.cmd test também terminou com sucesso. Durante sua espera, os arquivos foram verificados individualmente; executar todos sem isolamento juntos gera interferência entre seus DOMs globais.
- `node src/js/phases/validate-bank.mjs`: banco válido, 36 fases, 6 tabuleiros e 90 rodadas.
- `node scripts/check-project.mjs`: sintaxe, importações e CSS válidos.
- Catálogo das 60 imagens inspecionado em capturas reais do Edge. Contornos, cores, correspondência de nomes e enquadramento revisados.
- `scripts/art-review.html` monta os renderizadores reais com dados existentes. Revisão dos 12 jogos em 390 e 1440 px, incluindo memória difícil com os seis pares encontrados e sequência visual da fase 1. Nenhum transbordamento horizontal nos 24 casos. As imagens dos jogos foram inspecionadas nas capturas.
- O navegador integrado estava indisponível; foi usado Edge headless local. A largura móvel foi aplicada via emulação de viewport, pois o argumento de tamanho de janela do Edge impunha um mínimo de 500 px e produzia capturas cortadas. Essas capturas iniciais foram substituídas.
- A passagem adicional pela aplicação completa iniciou os 12 jogos em 390 e 1440 px (24 capturas `app-*.png`, relatório `app-art-layout.json`), sem transbordamento horizontal. O sistema escolheu o tema escuro; a página de revisão usa o tema claro. Foram conferidos também exemplos da aplicação completa com carta aberta, alternativas e imagem principal no tema escuro.
- Evidências locais em `test-results/`: `atlas-*.png`, `<jogo>-390.png`, `<jogo>-1440.png` e `art-layout.json`. `scripts/capture-art-review.mjs` reproduz as capturas com servidor HTTP em 4173 e Edge em depuração local 9223; `--app` verifica também a entrada completa da aplicação, inicia cada jogo e captura uma carta aberta na memória. Arquivos de evidência são ignorados pelo Git.

Nenhuma regra, fase, palavra, interação, som ou pontuação foi alterada. A verificação visual é de renderização e reconhecimento das ilustrações, não um estudo de usabilidade com participantes.
