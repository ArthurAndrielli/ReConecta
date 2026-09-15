import { getProgress, registerCorrect, registerWrong, registerActivity, registerAttempt, resetProgress } from './storage.js';
import { render as renderMemory } from './games/memory.js';
import { games } from './data.js';
import { getFeedbackMessage } from './utils/feedback.js';
import { getCurrentLevel } from './levels.js';

const app = document.getElementById('app');

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
  const level = getCurrentLevel(getProgress());
  if (gameId === 'memory') renderMemory(app, { onCorrect: registerCorrect, onWrong: registerWrong, onAttempt: registerAttempt, onComplete: registerActivity, onMessage: (type) => { const element = app.querySelector('#feedback'); if (element) element.textContent = getFeedbackMessage(type); }, onBack: renderHome }, { level });
  else renderDevelopment(game);
}

renderHome();
export { app, renderHome };
