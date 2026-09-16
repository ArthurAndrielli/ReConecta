ReConecta
=========

Versão 0.1 - Pré-teste: uma aplicação acadêmica de atividades cognitivas e de linguagem.

## Como executar

Abra a pasta no VS Code, instale o Live Server e abra `index.html` com **Open with Live Server**. Um servidor HTTP local simples também funciona.

## Tecnologias

HTML5, CSS3, JavaScript ES6+ com ES Modules e `localStorage`. Não há framework nem back-end.

## Funcionalidades atuais

- Tela inicial com cinco atividades.
- Navegação sem recarregar a página.
- Jogo da Memória com dois pares, feedback de acerto/erro, reinício e conclusão.
- Progresso local de atividades, acertos e erros.
- Layout responsivo, foco de teclado e botões grandes.

Nesta versão, **Monte a Palavra**, **Imagem e Palavra**, **Qual Não Combina?** e **Complete a Sequência** exibem a mensagem de próxima versão.

## Estrutura

`index.html` contém a estrutura; `src/css/style.css` a aparência; `src/js/app.js` a navegação; `src/js/storage.js` o armazenamento; e `src/js/games/memory.js` o jogo funcional. A documentação SDD está em `docs/`.

## Próximos passos

ReConecta v0.2 deverá implementar Monte a Palavra e ampliar o sistema de progresso.
