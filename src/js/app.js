import { getProgress, createSession, abandonSession, registerCorrect, registerWrong, registerActivity, registerAttempt, registerMemoryMetrics, resetProgress } from './storage.js';
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
import { games, categories } from './data.js';
import { getFeedbackMessage } from './utils/feedback.js';
import { getCurrentLevel } from './levels.js';
import { calculateStars } from './scoring.js';
import { getBestCategory, getPracticeCategory, getRecommendation } from './evolution.js';
import { renderIcon } from './utils/icons.js';

const app = document.getElementById('app');
const navLinks = [...document.querySelectorAll('[data-nav]')];
let dailyTraining = null;
let activeSession = null;
let activeGameCleanup = null;
const dailyTrainingActivities = ['memory', 'word', 'sequence', 'findObject', 'situations'];
const categoryByGame = { memory: 'memoria', whatDidYouSee: 'memoria', word: 'linguagem', image: 'linguagem', sentence: 'linguagem', odd: 'raciocinio', sequence: 'raciocinio', findObject: 'atencao', tapOnly: 'atencao', routine: 'cotidiano', association: 'associacao', situations: 'cotidiano' };
const normalize = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const categoryLabel = (id) => categories.find((category) => category.id === id)?.name || id;

function gameCard(game) {
  return `<article class="game-card" data-category="${game.category}">
    <div class="game-icon" aria-hidden="true">${renderIcon(game.id, game.name)}</div>
    <div class="game-card-content"><span class="category-label category-${game.category}">${categoryLabel(game.category)}</span>
    <h3>${game.name}</h3><p>${game.description}</p></div>
    <button data-game="${game.id}">Conhecer atividade</button>
  </article>`;
}

function renderHome(trainingMessage = '') {
  setActiveNav('inicio');
  const progress = getProgress();
  const featured = games.filter((game) => ['memory', 'word', 'sentence'].includes(game.id));
  app.innerHTML = `<section class="page-card home-page"><h2>Bom te ver por aqui.</h2><p class="lead">Escolha uma atividade. Cada pequeno passo conta.</p>${trainingMessage ? `<p class="feedback" role="status">${trainingMessage}</p>` : ''}<div class="daily-card"><div><span class="eyebrow">Treino de Hoje</span><h3>Um momento para reconectar.</h3><p>Faça cinco atividades variadas em sequência, no seu ritmo.</p><button id="start-training">Começar treino</button></div></div>${progress.atividades ? `<div class="progress-card" aria-label="Seu progresso"><div><strong>${progress.atividades}</strong>Atividades realizadas</div><div><strong>${progress.acertos}</strong>Acertos</div><div><strong>${progress.estrelas}</strong>Estrelas</div></div>` : `<p class="empty-note">Seu progresso começa com a primeira atividade.</p>`}<div class="section-heading"><div><span class="eyebrow">Para começar</span><h3>Escolha uma atividade</h3></div><a href="#/atividades">Ver todas</a></div><div class="game-grid featured-grid">${featured.map(gameCard).join('')}</div><div class="actions"><button class="secondary" id="reset-progress">Limpar progresso</button></div></section>`;
  app.querySelectorAll('[data-game]').forEach((button) => button.addEventListener('click', () => openGame(button.dataset.game)));
  app.querySelector('#start-training').addEventListener('click', startDailyTraining);
  app.querySelector('#reset-progress').addEventListener('click', () => { if (resetProgress()) renderHome(); });
}

function renderActivities() {
  setActiveNav('atividades');
  app.innerHTML = `<section class="page-card catalog-page"><h2>Atividades</h2><p class="lead">Encontre uma atividade para praticar com calma.</p><div class="catalog-controls"><label for="game-search">Buscar atividade</label><input id="game-search" type="search" placeholder="Digite um nome" autocomplete="off"><div class="filter-list" role="group" aria-label="Filtrar por categoria"><button class="filter-chip is-selected" data-filter="all">Todas</button>${categories.map((category) => `<button class="filter-chip" data-filter="${category.id}">${category.name}</button>`).join('')}</div></div><p id="catalog-count" class="catalog-count" role="status"></p><div id="catalog-grid" class="game-grid">${games.map(gameCard).join('')}</div></section>`;
  const search = app.querySelector('#game-search');
  const grid = app.querySelector('#catalog-grid');
  const count = app.querySelector('#catalog-count');
  let filter = 'all';
  const update = () => {
    const query = normalize(search.value.trim());
    const visible = games.filter((game) => (filter === 'all' || game.category === filter) && (!query || normalize(`${game.name} ${game.description}`).includes(query)));
    grid.innerHTML = visible.length ? visible.map(gameCard).join('') : `<div class="empty-state"><h3>Nenhuma atividade encontrada</h3><p>Tente outra busca ou limpe os filtros para ver todas as atividades.</p><button class="secondary" id="clear-filters">Limpar filtros</button></div>`;
    count.textContent = `${visible.length} ${visible.length === 1 ? 'atividade encontrada' : 'atividades encontradas'}`;
    grid.querySelectorAll('[data-game]').forEach((button) => button.addEventListener('click', () => openGame(button.dataset.game)));
    grid.querySelector('#clear-filters')?.addEventListener('click', () => { search.value = ''; filter = 'all'; app.querySelectorAll('[data-filter]').forEach((item) => item.classList.toggle('is-selected', item.dataset.filter === 'all')); update(); search.focus(); });
  };
  app.querySelectorAll('[data-filter]').forEach((button) => button.addEventListener('click', () => { filter = button.dataset.filter; app.querySelectorAll('[data-filter]').forEach((item) => item.classList.toggle('is-selected', item === button)); update(); }));
  search.addEventListener('input', update); update();
}

function renderEvolution() {
  setActiveNav('evolucao');
  const progress = getProgress();
  const best = getBestCategory(progress);
  const practice = getPracticeCategory(progress);
  const recommendation = getRecommendation(progress);
  app.innerHTML = `<section class="page-card"><h2>Sua evolução</h2><p>Acompanhe seu progresso com calma e no seu ritmo.</p><div class="progress-card"><div><strong>${progress.atividades}</strong>Atividades realizadas</div><div><strong>${progress.acertos}</strong>Acertos</div><div><strong>${progress.tentativas}</strong>Tentativas</div></div><p><strong>Maior facilidade:</strong> ${best ? best.label : 'Ainda não há dados suficientes.'}</p><p><strong>Categoria para praticar mais:</strong> ${practice ? practice.label : 'Ainda não há dados suficientes.'}</p>${recommendation ? `<p><strong>Sugestão:</strong> pratique uma atividade de ${recommendation.category}.</p>` : ''}<div class="actions"><button id="back-home">← Voltar ao início</button></div></section>`;
  app.querySelector('#back-home').addEventListener('click', renderHome);
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
  document.body.classList.add('is-focus-mode');
  const game = games.find((item) => item.id === gameId);
  if (!game) return renderHome('Não encontramos essa atividade. Escolha uma opção disponível.');
  app.innerHTML = `<section class="activity-card activity-intro"><span class="eyebrow">${game.category}</span><h2>${game.name}</h2><p>${game.description}</p><p>Faça a atividade com calma. Você poderá pedir ajuda ou voltar quando quiser.</p><div class="actions"><button id="start-activity">Começar atividade</button><button class="secondary" id="cancel-activity">Voltar ao início</button></div></section>`;
  app.querySelector('#cancel-activity').addEventListener('click', () => { document.body.classList.remove('is-focus-mode'); renderHome(); });
  app.querySelector('#start-activity').addEventListener('click', () => mountGame(gameId, { trainingMode, game }));
}

function mountGame(gameId, { trainingMode, game }) {
  const level = getCurrentLevel(getProgress());
  const category = categoryByGame[gameId];
  activeSession = createSession({ gameId, category, level, trainingRef: trainingMode ? { dateKey: new Date().toLocaleDateString('en-CA') } : null });
  let completed = false;
  const onComplete = (result) => { if (completed) return; completed = true; if (gameId === 'memory') registerMemoryMetrics({ pairs: result.pairs, ...result }); const stars = calculateStars({ ...result, completed: true }); registerActivity({ ...result, category, stars, session: activeSession }); renderResult(game, stars, trainingMode); };
  const callbacks = { onCorrect: () => registerCorrect(category), onWrong: () => registerWrong(category), onAttempt: () => registerAttempt(category), onComplete, onMessage: (type) => { const element = app.querySelector('#feedback'); if (element) element.textContent = getFeedbackMessage(type); }, onBack: () => { if (activeSession) abandonSession(activeSession.id); activeSession = null; dailyTraining = null; document.body.classList.remove('is-focus-mode'); renderHome(); } };
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

function renderResult(game, stars, trainingMode) {
  const starText = '★'.repeat(stars);
  app.innerHTML = `<section class="activity-card result-card"><span class="eyebrow">Atividade concluída</span><h2>Muito bem!</h2><p>Você concluiu ${game.name}.</p><p class="result-stars" aria-label="${stars} ${stars === 1 ? 'estrela recebida' : 'estrelas recebidas'}">${starText}</p><p class="feedback" role="status">${stars === 3 ? 'Você foi muito bem e manteve a calma.' : 'Cada tentativa faz parte do seu caminho.'}</p><div class="actions"><button id="next-action">${trainingMode ? 'Próxima atividade' : 'Voltar ao início'}</button></div></section>`;
  app.querySelector('#next-action').addEventListener('click', () => { activeSession = null; if (trainingMode) advanceTraining(); else { document.body.classList.remove('is-focus-mode'); renderHome(); } });
}

function setActiveNav(route) {
  navLinks.forEach((link) => {
    if (link.dataset.nav === route) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

function routeFromHash() {
  const route = location.hash.replace(/^#\/?/, '') || 'inicio';
  if (route === 'inicio') renderHome();
  else if (route === 'evolucao') renderEvolution();
  else if (route === 'atividades') renderActivities();
  else if (route === 'ajustes') { renderHome(); setActiveNav('ajustes'); }
  else if (route.startsWith('jogo/') && games.some((game) => game.id === route.slice(5))) openGame(route.slice(5));
  else renderHome('Não encontramos esta página. Volte ao início para continuar.');
}

window.addEventListener('hashchange', routeFromHash);

routeFromHash();
export { app, renderHome };
