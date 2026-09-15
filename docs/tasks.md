# ReConecta - Plano de Tarefas

Versão: 0.1 - Pré-teste

## Objetivo deste documento

Este arquivo apresenta todas as tarefas necessárias para construir a primeira versão funcional do ReConecta.

Como este é o primeiro projeto do desenvolvedor, as tarefas foram divididas em pequenas etapas para facilitar:

- desenvolvimento;
- aprendizado;
- testes;
- identificação de erros;
- apresentação do projeto na faculdade.

Cada tarefa deve ser concluída e testada antes de avançar para tarefas que dependem dela.

Legenda:

- [ ] tarefa ainda não iniciada ou não concluída;
- [x] tarefa concluída e testada.

---

# FASE 1 - Preparação do projeto

Objetivo:

Preparar corretamente a pasta ReConecta antes de começar a programação.

---

## T001 - Conferir a pasta principal do projeto

Status:

- [x] Concluído

O que fazer:

Confirmar que a pasta aberta no VS Code se chama:

ReConecta

Verificar se estamos trabalhando dentro da pasta correta.

Não criar arquivos fora dela.

Por que esta tarefa existe:

Evitar arquivos espalhados em outros locais do computador e manter o projeto organizado.

Critério de conclusão:

A pasta ReConecta deve aparecer como pasta principal no Explorer do VS Code.

---

## T002 - Criar a pasta de documentação

Status:

- [x] Concluído

Criar:

docs/

Dentro dela deverão existir:

requerimentos.md
design.md
tasks.md

Estrutura esperada:

ReConecta/
└── docs/
    ├── requerimentos.md
    ├── design.md
    └── tasks.md

Por que esta tarefa existe:

Os arquivos da metodologia SDD devem ficar separados dos arquivos do programa.

Critério de conclusão:

Os três arquivos devem aparecer dentro da pasta docs no VS Code.

---

## T003 - Criar a estrutura inicial do código

Status:

- [x] Concluído

Criar:

src/
src/css/
src/js/
src/js/games/

Por enquanto, a estrutura deverá ficar:

ReConecta/
│
├── docs/
│
└── src/
    ├── css/
    └── js/
        └── games/

Critério de conclusão:

Todas essas pastas devem aparecer corretamente no Explorer do VS Code.

---

# FASE 2 - Documentação SDD

Objetivo:

Definir primeiro o que será construído antes de começar a programar.

---

## T004 - Criar os requisitos do projeto

Status:

- [x] Concluído

Arquivo:

docs/requerimentos.md

O que fazer:

Documentar:

- objetivo do ReConecta;
- objetivo da versão 0.1;
- funcionalidades incluídas;
- funcionalidades que ainda não serão desenvolvidas;
- requisitos funcionais;
- requisitos não funcionais;
- critérios de aceitação.

Os requisitos funcionais deverão utilizar identificadores como:

RF001
RF002
RF003

Os requisitos não funcionais deverão utilizar:

RNF001
RNF002
RNF003

Por que esta tarefa existe:

Os requisitos explicam O QUE o sistema precisa fazer.

Critério de conclusão:

O arquivo deve permitir que uma pessoa entenda as funções da versão 0.1 sem precisar ler o código.

---

## T005 - Criar o documento de design

Status:

- [x] Concluído

Arquivo:

docs/design.md

O que fazer:

Explicar COMO o projeto será implementado.

Documentar:

- HTML;
- CSS;
- JavaScript;
- SPA;
- módulos JavaScript;
- localStorage;
- estrutura de pastas;
- navegação;
- organização do código;
- funcionamento do Jogo da Memória.

Por que esta tarefa existe:

O design serve como plano técnico do sistema.

Critério de conclusão:

O documento deve explicar claramente como os requisitos serão transformados em código.

---

## T006 - Criar o plano de tarefas

Status:

- [x] Concluído

Arquivo:

docs/tasks.md

O que fazer:

Criar este documento contendo todas as fases do desenvolvimento.

Não marcar uma tarefa como concluída antes de implementar e testar.

Critério de conclusão:

O arquivo deve funcionar como um roteiro de construção do projeto.

---

# FASE 3 - Criar a página principal

Objetivo:

Criar a estrutura HTML básica que será utilizada por toda a aplicação.

---

## T007 - Criar o index.html

Status:

- [x] Concluído

Arquivo:

index.html

O que fazer:

Criar a estrutura HTML5.

Deve conter:

<!DOCTYPE html>

<html>

<head>

<body>

Também definir:

lang="pt-BR"

No head adicionar:

- charset UTF-8;
- viewport;
- título ReConecta;
- arquivo CSS.

Critério de conclusão:

O arquivo deve abrir no navegador sem apresentar erros.

---

## T008 - Criar o cabeçalho

Status:

- [x] Concluído

Arquivo:

index.html

Criar:

<header>

Dentro dele mostrar:

ReConecta

e:

Atividades cognitivas e de linguagem

Por que esta tarefa existe:

O usuário precisa identificar imediatamente qual aplicativo está utilizando.

Critério de conclusão:

O nome ReConecta deve aparecer no topo da página.

---

## T009 - Criar a área dinâmica da aplicação

Status:

- [x] Concluído

Arquivo:

index.html

Criar:

<main id="app"></main>

Por que esta tarefa existe:

Essa área será utilizada pelo JavaScript para trocar as telas sem recarregar a página.

Exemplo:

Tela inicial

↓

Jogo da Memória

↓

Tela inicial novamente

Critério de conclusão:

O elemento com id "app" deve existir no HTML.

---

## T010 - Conectar o JavaScript

Status:

- [x] Concluído

Arquivo:

index.html

Adicionar antes de fechar body:

<script type="module" src="./src/js/app.js"></script>

Por que usar type="module":

Isso permitirá separar o JavaScript em diferentes arquivos usando:

import

e

export.

Critério de conclusão:

O navegador deverá carregar app.js sem apresentar erro no console.

---

# FASE 4 - Criar o visual inicial

Objetivo:

Criar uma interface simples, confortável e fácil de utilizar.

---

## T011 - Criar o style.css

Status:

- [x] Concluído

Arquivo:

src/css/style.css

Criar estilos gerais para:

body

header

main

button

cards

Por que esta tarefa existe:

Separar aparência e estrutura.

HTML será responsável pelo conteúdo.

CSS será responsável pela aparência.

Critério de conclusão:

A página não deverá aparecer apenas como HTML sem formatação.

---

## T012 - Criar layout centralizado

Status:

- [x] Concluído

Configurar o conteúdo principal para possuir:

- largura máxima;
- margem automática;
- espaçamento interno.

Exemplo de comportamento:

Em monitor grande o conteúdo não deve ocupar a tela inteira.

Critério de conclusão:

A aplicação deve permanecer visualmente organizada em telas grandes.

---

## T013 - Criar estilo dos cards dos jogos

Status:

- [x] Concluído

Os jogos deverão aparecer como grandes cards ou botões.

Cada card deve possuir:

- ícone ou emoji;
- nome da atividade;
- botão clicável;
- espaçamento;
- bordas arredondadas.

Jogos:

🧠 Jogo da Memória

🔤 Monte a Palavra

🖼️ Imagem e Palavra

🔎 Qual Não Combina?

🔢 Complete a Sequência

Critério de conclusão:

Os cinco jogos devem ser facilmente identificáveis.

---

## T014 - Criar estado hover

Status:

- [x] Concluído

Adicionar efeito visual quando o mouse passar sobre botões e cards.

Não utilizar animações exageradas.

Critério de conclusão:

O usuário deve perceber visualmente que um elemento pode ser clicado.

---

## T015 - Criar foco de teclado

Status:

- [x] Concluído

Adicionar estilo:

:focus-visible

Objetivo:

Permitir que usuários navegando com teclado identifiquem qual botão está selecionado.

Critério de conclusão:

Ao utilizar TAB, o botão focado deve ficar visivelmente destacado.

---

## T016 - Criar responsividade básica

Status:

- [x] Concluído

Em telas maiores:

permitir cards em duas ou mais colunas.

Em telas pequenas:

mostrar os cards um abaixo do outro.

Critério de conclusão:

A página não deve possuir rolagem horizontal no celular.

---

# FASE 5 - Criar a lógica principal da aplicação

Objetivo:

Criar o JavaScript que controla as telas.

---

## T017 - Criar app.js

Status:

- [x] Concluído

Arquivo:

src/js/app.js

Responsabilidade:

Controlar a navegação da aplicação.

Não colocar dentro dele toda a lógica dos jogos.

Critério de conclusão:

app.js deve ser carregado corretamente pelo navegador.

---

## T018 - Criar renderHome()

Status:

- [x] Concluído

Criar uma função:

renderHome()

Responsabilidade:

Mostrar a página inicial dentro de:

<main id="app">

Ela deverá exibir:

- mensagem de boas-vindas;
- cinco jogos;
- progresso do usuário.

Critério de conclusão:

Ao abrir o aplicativo, renderHome() deverá mostrar a tela principal.

---

## T019 - Criar eventos dos cards

Status:

- [x] Concluído

Cada card deverá responder ao clique.

Jogo da Memória:

deve abrir o jogo.

Outros quatro jogos:

devem abrir uma tela informando:

"Este jogo será implementado em uma próxima versão."

Critério de conclusão:

Todos os cinco cards devem responder ao clique.

---

## T020 - Criar tela "Em desenvolvimento"

Status:

- [x] Concluído

Criar uma função responsável por mostrar:

Nome do jogo

Mensagem:

"Este jogo será implementado em uma próxima versão."

Botão:

← Voltar ao início

Critério de conclusão:

Os quatro jogos ainda não implementados não devem causar erros.

---

## T021 - Criar botão voltar

Status:

- [x] Concluído

Quando o usuário estiver:

- no Jogo da Memória;
- na tela Em desenvolvimento;

deverá existir:

← Voltar ao início

Ao clicar:

renderHome()

deverá ser executado.

Critério de conclusão:

O usuário consegue navegar entre as telas sem atualizar o navegador.

---

# FASE 6 - Sistema de progresso

Objetivo:

Criar um pequeno sistema de armazenamento local.

---

## T022 - Criar storage.js

Status:

- [x] Concluído

Arquivo:

src/js/storage.js

Responsabilidade:

Centralizar tudo relacionado ao localStorage.

Não utilizar localStorage diretamente em vários arquivos.

Critério de conclusão:

Somente storage.js deverá manipular diretamente o armazenamento.

---

## T023 - Definir estrutura do progresso

Status:

- [x] Concluído

Estrutura inicial:

{
    atividades: 0,
    acertos: 0,
    erros: 0
}

Chave utilizada:

reconecta_progress

Critério de conclusão:

Quando ainda não houver dados salvos, o sistema deve utilizar esses valores.

---

## T024 - Criar getProgress()

Status:

- [x] Concluído

Função:

getProgress()

Responsabilidade:

Buscar progresso salvo.

Caso não exista:

retornar progresso inicial.

Critério de conclusão:

A aplicação não deve quebrar quando for executada pela primeira vez.

---

## T025 - Criar saveProgress()

Status:

- [x] Concluído

Função:

saveProgress(progress)

Responsabilidade:

Converter o objeto para JSON e armazenar no localStorage.

Critério de conclusão:

Os dados precisam permanecer após atualizar a página.

---

## T026 - Criar registerCorrect()

Status:

- [x] Concluído

Responsabilidade:

Adicionar 1 em:

acertos

Depois salvar novamente.

Critério de conclusão:

Um acerto no jogo deverá aumentar o contador.

---

## T027 - Criar registerWrong()

Status:

- [x] Concluído

Responsabilidade:

Adicionar 1 em:

erros

Depois salvar.

Critério de conclusão:

Uma tentativa incorreta deve aumentar o contador de erros.

---

## T028 - Criar registerActivity()

Status:

- [x] Concluído

Responsabilidade:

Adicionar 1 em:

atividades

Utilizar somente quando um jogo for completamente concluído.

Critério de conclusão:

Virar uma carta não pode contar como atividade concluída.

---

## T029 - Criar resetProgress()

Status:

- [x] Concluído

Responsabilidade:

Apagar ou restaurar os dados do progresso.

Antes de executar:

mostrar confirm():

"Tem certeza que deseja apagar o progresso desta versão de teste?"

Critério de conclusão:

Cancelar não deverá apagar nada.

Confirmar deverá voltar os contadores para zero.

---

# FASE 7 - Mostrar progresso na tela inicial

Objetivo:

Permitir que o usuário veja seus resultados.

---

## T030 - Criar card de progresso

Status:

- [x] Concluído

Na página inicial mostrar:

Seu progresso

Atividades realizadas: 0

Acertos: 0

Erros: 0

Critério de conclusão:

Os valores devem vir de getProgress().

---

## T031 - Atualizar progresso ao voltar do jogo

Status:

- [x] Concluído

Depois de jogar e voltar à tela inicial:

renderHome()

deve consultar novamente o localStorage.

Critério de conclusão:

Não deve ser necessário atualizar manualmente o navegador para ver os números.

---

# FASE 8 - Criar o Jogo da Memória

Objetivo:

Implementar o primeiro minijogo funcional do ReConecta.

---

## T032 - Criar memory.js

Status:

- [x] Concluído

Arquivo:

src/js/games/memory.js

Responsabilidade:

Conter a lógica específica do Jogo da Memória.

Evitar colocar essa lógica dentro de app.js.

Critério de conclusão:

O módulo deve poder ser importado por app.js.

---

## T033 - Criar as cartas

Status:

- [x] Concluído

Utilizar inicialmente:

🍎
🍎
🍌
🍌

Cada carta deverá possuir informações suficientes para identificar seu par.

Critério de conclusão:

Devem existir exatamente quatro cartas.

---

## T034 - Embaralhar as cartas

Status:

- [x] Concluído

Antes de exibir o jogo:

embaralhar o array.

Objetivo:

Evitar que maçãs e bananas apareçam sempre nas mesmas posições.

Critério de conclusão:

Reiniciar o jogo deve poder alterar a posição das cartas.

---

## T035 - Mostrar cartas escondidas

Status:

- [x] Concluído

Estado inicial:

❓ ❓

❓ ❓

Não mostrar os emojis antes do clique.

Critério de conclusão:

O jogador não deve conhecer as posições no início.

---

## T036 - Permitir virar a primeira carta

Status:

- [x] Concluído

Ao clicar em uma carta escondida:

mostrar o emoji.

Guardar essa carta temporariamente.

Critério de conclusão:

A primeira carta deverá permanecer aberta esperando a segunda.

---

## T037 - Permitir virar a segunda carta

Status:

- [x] Concluído

Ao clicar em outra carta:

mostrar seu emoji.

Agora o jogo deverá possuir duas cartas selecionadas.

Critério de conclusão:

O sistema deverá comparar as duas cartas.

---

## T038 - Impedir selecionar a mesma carta duas vezes

Status:

- [x] Concluído

Se o jogador clicar duas vezes na mesma carta:

não considerar como par.

Critério de conclusão:

Uma carta não poderá formar par consigo mesma.

---

## T039 - Verificar par correto

Status:

- [ ] Concluído

Se os dois emojis forem iguais:

manter as cartas abertas.

Registrar:

1 acerto.

Mostrar uma das mensagens:

"Excelente!"

"Muito bem!"

"Você conseguiu!"

Critério de conclusão:

Cartas corretas não deverão voltar a fechar.

---

## T040 - Verificar tentativa incorreta

Status:

- [ ] Concluído

Se forem diferentes:

mostrar as duas cartas por aproximadamente 700ms.

Depois:

esconder novamente.

Registrar:

1 erro.

Mostrar mensagem como:

"Vamos tentar novamente."

"Quase lá!"

"Tente mais uma vez."

Critério de conclusão:

Depois do tempo definido, as cartas deverão voltar ao estado escondido.

---

## T041 - Bloquear cliques durante comparação

Status:

- [ ] Concluído

Enquanto as duas cartas incorretas estiverem sendo mostradas:

não permitir abrir uma terceira carta.

Por que esta tarefa é importante:

Sem esse bloqueio, o usuário poderá clicar rapidamente em várias cartas e quebrar a lógica do jogo.

Critério de conclusão:

Durante os aproximadamente 700ms, novos cliques não devem alterar cartas.

---

## T042 - Detectar final do jogo

Status:

- [ ] Concluído

Quando os dois pares forem encontrados:

mostrar:

"Parabéns! Você concluiu o Jogo da Memória."

Registrar:

1 atividade concluída.

IMPORTANTE:

registrar somente uma vez.

Critério de conclusão:

Encontrar todas as cartas encerra a partida.

---

## T043 - Criar botão Jogar novamente

Status:

- [ ] Concluído

Depois de concluir:

mostrar:

Jogar novamente

Ao clicar:

reiniciar o jogo.

Embaralhar novamente as cartas.

Critério de conclusão:

O usuário consegue iniciar uma nova partida sem atualizar o navegador.

---

# FASE 9 - Feedback ao usuário

Objetivo:

Garantir que os erros não sejam tratados como punição.

---

## T044 - Criar feedback de acerto

Status:

- [ ] Concluído

Utilizar mensagens positivas.

Exemplos:

Excelente!

Muito bem!

Você conseguiu!

Não utilizar apenas mudança de cor.

Critério de conclusão:

Uma mensagem textual deverá aparecer quando houver acerto.

---

## T045 - Criar feedback de tentativa incorreta

Status:

- [ ] Concluído

Utilizar mensagens amigáveis.

Exemplos:

Vamos tentar novamente.

Quase lá!

Tente mais uma vez.

Não mostrar:

"Você perdeu."

"Errado!"

"Falhou!"

Critério de conclusão:

Uma tentativa incorreta deve orientar o usuário sem punição.

---

# FASE 10 - Testes funcionais

Objetivo:

Verificar se o sistema realmente funciona antes de considerar o pré-teste pronto.

---

## T046 - Testar abertura da aplicação

Status:

- [ ] Testado

Procedimento:

Abrir index.html utilizando Live Server.

Resultado esperado:

A página abre normalmente.

Não aparece página em branco.

---

## T047 - Testar console do navegador

Status:

- [ ] Testado

Abrir:

F12

Depois:

Console

Resultado esperado:

Não devem existir erros JavaScript em vermelho.

---

## T048 - Testar tela inicial

Status:

- [ ] Testado

Confirmar:

- título ReConecta;
- mensagem de boas-vindas;
- cinco jogos;
- card de progresso.

Resultado esperado:

Todos aparecem corretamente.

---

## T049 - Testar jogos não implementados

Status:

- [ ] Testado

Clicar em:

Monte a Palavra.

Imagem e Palavra.

Qual Não Combina.

Complete a Sequência.

Resultado esperado:

Mostrar:

"Este jogo será implementado em uma próxima versão."

Também deve existir botão voltar.

---

## T050 - Testar Jogo da Memória

Status:

- [ ] Testado

Verificar:

- quatro cartas;
- cartas escondidas;
- primeira carta abre;
- segunda carta abre;
- pares são comparados;
- acertos permanecem abertos;
- erros voltam a fechar;
- terceira carta não abre durante comparação;
- jogo consegue terminar.

Resultado esperado:

Todos os comportamentos funcionam corretamente.

---

## T051 - Testar persistência

Status:

- [ ] Testado

Procedimento:

1. jogar;
2. gerar pelo menos um acerto;
3. gerar pelo menos um erro;
4. concluir uma partida;
5. voltar para a página inicial;
6. atualizar o navegador.

Resultado esperado:

Os números continuam salvos.

---

## T052 - Testar limpeza do progresso

Status:

- [ ] Testado

Clicar:

Limpar progresso

Primeiro escolher:

Cancelar.

Resultado esperado:

Nada deve acontecer.

Depois:

clicar novamente e confirmar.

Resultado esperado:

Atividades = 0

Acertos = 0

Erros = 0

---

## T053 - Testar responsividade

Status:

- [ ] Testado

Abrir ferramentas do desenvolvedor.

Utilizar modo celular.

Testar largura próxima de:

375px

Resultado esperado:

- nenhum card cortado;
- nenhum texto saindo da tela;
- nenhum botão impossível de clicar;
- nenhuma rolagem horizontal desnecessária.

---

## T054 - Testar navegação por teclado

Status:

- [ ] Testado

Utilizar:

TAB

SHIFT + TAB

ENTER

Resultado esperado:

O usuário consegue identificar o elemento focado e ativar os botões.

---

# FASE 11 - Revisão do código

Objetivo:

Deixar o projeto mais organizado antes da apresentação.

---

## T055 - Revisar nomes de variáveis

Status:

- [ ] Concluído

Verificar se nomes são compreensíveis.

Preferir:

selectedCard

matchedCards

progress

games

Evitar nomes como:

x

abc

coisa

teste123

Critério de conclusão:

Uma pessoa iniciante deve conseguir entender aproximadamente o propósito das variáveis.

---

## T056 - Remover código não utilizado

Status:

- [ ] Concluído

Verificar:

- funções não utilizadas;
- variáveis não utilizadas;
- console.log esquecidos;
- comentários desnecessários.

Critério de conclusão:

O projeto não deve possuir código abandonado sem motivo.

---

## T057 - Verificar separação das responsabilidades

Status:

- [ ] Concluído

Confirmar:

index.html = estrutura.

style.css = aparência.

app.js = navegação.

storage.js = armazenamento.

memory.js = Jogo da Memória.

Critério de conclusão:

Nenhum arquivo deve concentrar todo o sistema sozinho.

---

# FASE 12 - README e apresentação

Objetivo:

Preparar o projeto para ser mostrado e explicado.

---

## T058 - Criar README.md

Status:

- [ ] Concluído

Explicar:

- nome do projeto;
- objetivo;
- versão atual;
- tecnologias;
- estrutura;
- funcionalidades;
- como executar;
- funcionalidades futuras.

Critério de conclusão:

Uma pessoa que nunca viu o projeto deverá conseguir abrir e executar seguindo o README.

---

## T059 - Documentar a versão atual

Status:

- [ ] Concluído

Informar claramente:

Versão 0.1 - Pré-teste.

Funciona:

- tela inicial;
- navegação;
- Jogo da Memória;
- localStorage;
- progresso.

Ainda não funciona:

- Monte a Palavra;
- Imagem e Palavra;
- Qual Não Combina;
- Complete a Sequência.

Isso é proposital nesta versão.

---

# FASE 13 - Validação final do pré-teste

## T060 - Conferir estrutura final

Status:

- [ ] Validado

Estrutura esperada:

ReConecta/
│
├── index.html
├── README.md
│
├── docs/
│   ├── requerimentos.md
│   ├── design.md
│   └── tasks.md
│
└── src/
    ├── css/
    │   └── style.css
    │
    └── js/
        ├── app.js
        ├── storage.js
        │
        └── games/
            └── memory.js

---

## T061 - Fazer teste completo do início ao fim

Status:

- [ ] Validado

Executar o seguinte fluxo:

Abrir aplicação.

↓

Ver tela inicial.

↓

Abrir Jogo da Memória.

↓

Errar pelo menos uma tentativa.

↓

Encontrar um par.

↓

Encontrar o segundo par.

↓

Concluir a atividade.

↓

Voltar para tela inicial.

↓

Verificar progresso.

↓

Atualizar página.

↓

Verificar se progresso permanece salvo.

↓

Limpar progresso.

Resultado esperado:

Todo o fluxo deverá funcionar sem erros.

---

# Resultado do pré-teste

Preencher somente depois da implementação.

## O que foi implementado

Adicionar aqui as funcionalidades que realmente funcionam.

## O que foi testado

Adicionar aqui os testes que realmente foram realizados.

## Problemas encontrados

Registrar os problemas encontrados durante o desenvolvimento.

Exemplo:

- erro de import;
- caminho CSS incorreto;
- clique duplicado;
- problema no localStorage.

## Problemas corrigidos

Explicar brevemente as correções realizadas.

## O que ainda não foi implementado

- Monte a Palavra;
- Imagem e Palavra;
- Qual Não Combina;
- Complete a Sequência;
- níveis adicionais;
- sistema completo de estrelas;
- treino diário.

## Próxima versão

Versão planejada:

ReConecta v0.2

Próximo objetivo:

Implementar o minijogo Monte a Palavra e melhorar o sistema de progresso.
