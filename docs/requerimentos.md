ReConecta — Requerimentos do MVP

1. Visão geral

O ReConecta é um aplicativo web de estimulação cognitiva e de linguagem baseado em minijogos simples, acessíveis e com progressão gradual de dificuldade.

A primeira versão (MVP) será implementada em HTML, CSS e JavaScript puro, para facilitar o desenvolvimento, a apresentação acadêmica e a execução no VS Code.

2. Objetivo do MVP

Criar uma aplicação funcional contendo cinco minijogos:

Jogo da Memória;

Monte a Palavra;

Imagem e Palavra;

Qual Não Combina?;

Complete a Sequência.

Esses jogos trabalham memória, linguagem, associação, atenção e raciocínio.

3. Público e princípios de uso

A interface deve priorizar:

simplicidade;

poucos elementos por tela;

botões grandes;

linguagem objetiva;

feedback positivo;

ausência de pressão por velocidade;

dificuldade progressiva.

4. Requisitos funcionais

RF001 — Tela inicial

O sistema deve apresentar o nome ReConecta, uma explicação breve e acesso aos cinco minijogos do MVP.

RF002 — Jogo da Memória

O sistema deve exibir cartas viradas para baixo e permitir que o usuário selecione duas por vez para encontrar pares.

No nível inicial, o jogo deve usar 4 cartas, formando 2 pares.

RF003 — Monte a Palavra

O sistema deve exibir uma figura representada por emoji e sílabas embaralhadas. O usuário deve selecionar as sílabas na ordem correta para formar a palavra.

RF004 — Imagem e Palavra

O sistema deve apresentar uma imagem/emoji e alternativas de palavras. O usuário deve escolher a palavra correspondente.

RF005 — Qual Não Combina?

O sistema deve apresentar quatro elementos, sendo três da mesma categoria e um diferente. O usuário deve identificar o elemento que não pertence ao grupo.

RF006 — Complete a Sequência

O sistema deve exibir uma sequência simples com um item faltando e alternativas de resposta.

RF007 — Feedback

Ao acertar, o sistema deve exibir mensagens positivas, como “Excelente!”, “Muito bem!” ou “Você conseguiu!”.

Ao errar, deve usar mensagens encorajadoras, como “Vamos tentar novamente.” ou “Quase lá!”.

RF008 — Pontuação por estrelas

Ao concluir um jogo, o sistema deve conceder de 1 a 3 estrelas como incentivo.

A pontuação não deve punir o usuário por erros; ela deve representar a conclusão e o desempenho geral.

RF009 — Registro de progresso local

O sistema deve registrar no navegador, usando localStorage:

quantidade de partidas concluídas;

quantidade total de acertos;

quantidade total de erros;

quantidade acumulada de estrelas.

RF010 — Reiniciar atividade

O usuário deve poder reiniciar uma atividade sem precisar recarregar a página inteira.

RF011 — Navegação

O usuário deve poder voltar da atividade atual para a tela de seleção de jogos.

5. Requisitos não funcionais

RNF001 — Tecnologia

A aplicação deve funcionar com HTML5, CSS3 e JavaScript ES6+ sem framework obrigatório.

RNF002 — Execução

A aplicação deve poder ser executada no VS Code usando a extensão Live Server ou um servidor HTTP local simples.

RNF003 — Responsividade

A interface deve se adaptar a computadores, tablets e celulares.

RNF004 — Acessibilidade visual

A interface deve possuir texto legível, contraste adequado, áreas clicáveis grandes e estados de foco visíveis.

RNF005 — Organização de código

Cada minijogo deve possuir seu próprio módulo JavaScript dentro de src/js/games.

RNF006 — Persistência

Os dados do MVP serão armazenados apenas localmente no navegador. Não haverá banco de dados nesta primeira versão.

6. Fora do escopo do MVP

Não serão implementados inicialmente:

login e cadastro;

banco de dados remoto;

painel para profissionais;

áudio;

reconhecimento de voz;

recomendação inteligente automática;

os outros sete minijogos descritos para versões futuras.

7. Critérios de aceite

O MVP será considerado concluído quando:

os cinco jogos puderem ser abertos pela tela inicial;

todos permitirem interação e conclusão;

houver feedback de acerto e erro;

o progresso for salvo em localStorage;

a aplicação funcionar pelo navegador sem erros no console;

o projeto puder ser aberto e executado no VS Code.
