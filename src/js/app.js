import { getProgress, registerCorrect, registerWrong, registerActivity, resetProgress } from './storage.js';
import { render as renderMemory } from './games/memory.js';

const app = document.getElementById('app');
const games = [
  { id: 'memory', icon: '🧠', name: 'Jogo da Memória' },
  { id: 'word', icon: '🔤', name: 'Monte a Palavra' },
  { id: 'image', icon: '🖼️', name: 'Imagem e Palavra' },
  { id: 'odd', icon: '🔎', name: 'Qual Não Combina?' },
  { id: 'sequence', icon: '🔢', name: 'Complete a Sequência' }
];

const feedback = {
  correct: ['Excelente!', 'Muito bem!', 'Você conseguiu!'],
  wrong: ['Vamos tentar novamente.', 'Quase lá!', 'Tente mais uma vez.']
};
const randomMessage = (messages) => messages[Math.floor(Math.random() * messages.length)];

function renderHome() {
  const progress = getProgress();
  app.innerHTML = `<section class="page-card"><h2>Bem-vindo ao ReConecta!</h2><p>Escolha uma atividade para exercitar sua memória, linguagem e atenção.</p><div class="progress-card" aria-label="Seu progresso"><div><strong>${progress.atividades}</strong>Atividades realizadas</div><div><strong>${progress.acertos}</strong>Acertos</div><div><strong>${progress.erros}</strong>Erros</div></div><div class="game-grid">${games.map((game) => `<article class="game-card"><div role="img" aria-label="${game.name}">${game.icon}</div><h3>${game.name}</h3><p>${game.id === 'memory' ? 'Encontre os pares.' : 'Atividade cognitiva.'}</p><button data-game="${game.id}">Abrir atividade</button></article>`).join('')}</div><div class="actions"><button class="secondary" id="reset-progress">Limpar progresso</button></div></section>`;
  app.querySelectorAll('[data-game]').forEach((button) => button.addEventListener('click', () => openGame(button.dataset.game)));
  app.querySelector('#reset-progress').addEventListener('click', () => { if (resetProgress()) renderHome(); });
}

function renderDevelopment(game) {
  app.innerHTML = `<section class="page-card"><h2>${game.name}</h2><p>Este jogo será implementado em uma próxima versão.</p><button id="back-home">← Voltar ao início</button></section>`;
  app.querySelector('#back-home').addEventListener('click', renderHome);
}

function openGame(gameId) {
  const game = games.find((item) => item.id === gameId);
  if (gameId === 'memory') renderMemory(app, { onCorrect: registerCorrect, onWrong: registerWrong, onComplete: registerActivity, onMessage: (type) => { const element = app.querySelector('#feedback'); if (element) element.textContent = randomMessage(feedback[type]); }, onBack: renderHome });
  else renderDevelopment(game);
}

renderHome();
export { app, renderHome };
