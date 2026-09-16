import { getProgress, registerCorrect, registerWrong, registerActivity, registerAttempt, registerMemoryMetrics, resetProgress } from './storage.js';
import { render as renderMemory } from './games/memory.js';
import { render as renderWhatDidYouSee } from './games/whatDidYouSee.js';
import { render as renderWordBuilder } from './games/wordBuilder.js';
import { render as renderImageWord } from './games/imageWord.js';
import { render as renderOddOneOut } from './games/oddOneOut.js';
import { render as renderSequence } from './games/sequence.js';
import { render as renderRoutine } from './games/organizeRoutine.js';
import { render as renderFindObject } from './games/findObject.js';
import { render as renderTapOnly } from './games/tapOnly.js';
import { render as renderAssociation } from './games/objectAssociation.js';
import { render as renderDailySituations } from './games/dailySituations.js';
import { render as renderCompleteSentence } from './games/completeSentence.js';
import { games } from './data.js';
import { getFeedbackMessage } from './utils/feedback.js';
import { getCurrentLevel } from './levels.js';
import { calculateStars } from './scoring.js';

const app = document.getElementById('app');
let dailyTraining = null;
const dailyTrainingActivities = ['memory', 'word', 'sequence', 'findObject', 'situations'];
const categoryByGame = { memory: 'memoria', whatDidYouSee: 'memoria', word: 'linguagem', image: 'linguagem', sentence: 'linguagem', odd: 'raciocinio', sequence: 'raciocinio', findObject: 'atencao', tapOnly: 'atencao', routine: 'cotidiano', association: 'associacao', situations: 'cotidiano' };

function renderHome(trainingMessage = '') {
  const progress = getProgress();
  app.innerHTML = `<section class="page-card"><h2>Bem-vindo ao ReConecta!</h2><p>Escolha uma atividade para exercitar sua memória, linguagem e atenção.</p>${trainingMessage ? `<p class="feedback" role="status">${trainingMessage}</p>` : ''}<div class="daily-card"><h3>Treino de Hoje</h3><p>Faça cinco atividades variadas em sequência.</p><button id="start-training">Começar treino</button></div><div class="progress-card" aria-label="Seu progresso"><div><strong>${progress.atividades}</strong>Atividades realizadas</div><div><strong>${progress.acertos}</strong>Acertos</div><div><strong>${progress.erros}</strong>Erros</div></div><div class="game-grid">${games.map((game) => `<article class="game-card"><div role="img" aria-label="${game.name}">${game.icon}</div><h3>${game.name}</h3><p>${game.id === 'memory' ? 'Encontre os pares.' : 'Atividade cognitiva.'}</p><button data-game="${game.id}">Abrir atividade</button></article>`).join('')}</div><div class="actions"><button class="secondary" id="reset-progress">Limpar progresso</button></div></section>`;
  app.querySelectorAll('[data-game]').forEach((button) => button.addEventListener('click', () => openGame(button.dataset.game)));
  app.querySelector('#start-training').addEventListener('click', startDailyTraining);
  app.querySelector('#reset-progress').addEventListener('click', () => { if (resetProgress()) renderHome(); });
}

function renderDevelopment(game) {
  app.innerHTML = `<section class="page-card"><h2>${game.name}</h2><p>Este jogo será implementado em uma próxima versão.</p><button id="back-home">← Voltar ao início</button></section>`;
  app.querySelector('#back-home').addEventListener('click', renderHome);
}

function advanceTraining() {
  if (!dailyTraining) return;
  dailyTraining.currentIndex += 1;
  if (dailyTraining.currentIndex >= dailyTraining.activities.length) { dailyTraining = null; renderHome('Parabéns! Você concluiu o treino de hoje.'); return; }
  openGame(dailyTraining.activities[dailyTraining.currentIndex], { trainingMode: true });
}

function startDailyTraining() {
  dailyTraining = { activities: [...dailyTrainingActivities], currentIndex: 0, completed: false };
  openGame(dailyTraining.activities[0], { trainingMode: true });
}

function openGame(gameId, { trainingMode = false } = {}) {
  const game = games.find((item) => item.id === gameId);
  const level = getCurrentLevel(getProgress());
  const category = categoryByGame[gameId];
  const onComplete = (result) => { if (gameId === 'memory') registerMemoryMetrics({ pairs: result.pairs, ...result }); registerActivity({ ...result, category, stars: calculateStars({ ...result, completed: true }) }); if (trainingMode) advanceTraining(); };
  const callbacks = { onCorrect: () => registerCorrect(category), onWrong: () => registerWrong(category), onAttempt: () => registerAttempt(category), onComplete, onMessage: (type) => { const element = app.querySelector('#feedback'); if (element) element.textContent = getFeedbackMessage(type); }, onBack: () => { dailyTraining = null; renderHome(); } };
  if (gameId === 'memory') renderMemory(app, callbacks, { level });
  else if (gameId === 'whatDidYouSee') renderWhatDidYouSee(app, callbacks, { level });
  else if (gameId === 'word') renderWordBuilder(app, callbacks, { level });
  else if (gameId === 'image') renderImageWord(app, callbacks, { level });
  else if (gameId === 'odd') renderOddOneOut(app, callbacks, { level });
  else if (gameId === 'sequence') renderSequence(app, callbacks, { level });
  else if (gameId === 'routine') renderRoutine(app, callbacks, { level });
  else if (gameId === 'findObject') renderFindObject(app, callbacks, { level });
  else if (gameId === 'tapOnly') renderTapOnly(app, callbacks, { level });
  else if (gameId === 'association') renderAssociation(app, callbacks, { level });
  else if (gameId === 'situations') renderDailySituations(app, callbacks, { level });
  else if (gameId === 'sentence') renderCompleteSentence(app, callbacks, { level });
  else renderDevelopment(game);
}

renderHome();
export { app, renderHome };
