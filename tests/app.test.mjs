import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSDOM } from 'jsdom';
import { games } from '../src/js/data.js';
import { getPhase, getGamePhases } from '../src/js/phases/catalog.js';
import { getPhaseContent, phaseRounds, phaseBoards } from '../src/js/phases/content.js';
import { solve, button } from './game-helpers.mjs';
import { getProgress, resetProgress, getPreferences } from '../src/js/storage.js';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const dom = new JSDOM(html, { url: 'http://localhost:4173/', pretendToBeVisual: true });
const { window } = dom;
for (const name of ['window', 'document', 'localStorage', 'location', 'history', 'Event']) globalThis[name] = name === 'window' ? window : window[name];
window.scrollTo = () => {};
const artwork = await readFile(new URL('../src/assets/game-objects-v2.svg', import.meta.url), 'utf8');
globalThis.fetch = async () => ({ ok: true, text: async () => artwork });
window.matchMedia = () => ({ matches: false, addEventListener() {} });
window.HTMLDialogElement.prototype.showModal = function () { this.open = true; };
window.HTMLDialogElement.prototype.close = function () { this.open = false; };
const errors = [];
window.addEventListener('error', event => { errors.push(event.error); });
await import('../src/js/app.js');
const tick = () => new Promise(resolve => setTimeout(resolve, 10));
const app = document.getElementById('app');
function checkSemantics() {
  const ids = [...document.querySelectorAll('[id]')].map(el => el.id);
  assert.equal(new Set(ids).size, ids.length, 'duplicate DOM IDs');
  assert.equal(document.querySelectorAll('main').length, 1);
  assert.equal(document.querySelectorAll('h1').length, 1);
  assert.equal(app.querySelectorAll('a button, button a').length, 0);
}
async function route(hash) {
  if (location.hash === hash) { window.dispatchEvent(new window.HashChangeEvent('hashchange')); }
  else location.hash = hash;
  await tick();
  checkSemantics();
}
function solveSession() {
  const session = getProgress().sessions.at(-1);
  for (const id of session.contentIds) {
    const content = phaseRounds[id] || phaseBoards[id];
    solve(app.querySelector('#game-board'), session.gameId, content, () => {
      const retry = app.querySelector('#retry-round'); if (retry && !retry.hidden) retry.click();
    }, true);
    const next = app.querySelector('#continue-round');
    assert.equal(next.hidden, false, id);
    next.click();
  }
  assert.match(app.textContent, /Muito bem!|Treino concluído!/);
  assert.equal(getProgress().sessions.at(-1).status, 'completed');
  checkSemantics();
}
test('integrated navigation, all games, daily plan, pause, retry, preferences and reset', async () => {
  assert.equal(app.querySelectorAll('[data-game]').length, 3);
  assert.equal(document.querySelectorAll('h1').length, 1);
  await route('#/atividades');
  assert.equal(app.querySelectorAll('[data-game]').length, 12);
  const cards = [...app.querySelectorAll('.game-card')];
  assert.equal(cards.length, 12);
  assert.equal(new Set(cards.map(card => card.dataset.gameTheme)).size, 12);
  cards.forEach(card => {
    assert.ok(card.querySelector('.game-icon'));
    assert.ok(card.querySelector('h3').textContent.trim());
    assert.ok(card.querySelector('.game-card-content > p').textContent.trim());
    assert.ok(card.querySelector('progress[aria-label]'));
    assert.ok(card.querySelector('.card-action[aria-label]'));
  });
  const search = app.querySelector('#game-search');
  search.value = 'MEMORIA'; search.dispatchEvent(new Event('input'));
  assert.equal(app.querySelectorAll('[data-game]').length, 1);
  app.querySelector('[data-game]').click(); await tick();
  assert.match(app.textContent, /Começar atividade/);
  await route('#/jogo/memory/fases');
  assert.equal(app.querySelectorAll('[data-phase]').length, 20);
  assert.equal(app.querySelector('.phase-map').dataset.gameTheme, 'memory');
  assert.equal(app.querySelectorAll('.phase-available').length, 1);
  assert.equal(app.querySelectorAll('.phase-locked').length, 19);
  assert.equal(app.querySelector('[data-phase][aria-current="step"]').dataset.phase, 'memory-p01');
  assert.equal(app.querySelector('.phase-available .phase-status').textContent.trim(), '● Atual');
  assert.match(app.querySelector('.phase-available').textContent, /Atividade 1.*Pronta para continuar/s);
  assert.match(app.querySelector('.phase-locked').textContent, /Bloqueada/);
  assert.equal(app.querySelector('.phase-locked [data-phase]').disabled, true);
  assert.ok(app.querySelector('.phase-summary progress[aria-label]'));
  app.querySelector('#back-catalog').click(); await tick();
  assert.equal(app.querySelector('#game-search').value, 'MEMORIA');
  await route('#/jogo/memory/fase/memory-p02');
  assert.match(app.textContent, /Conclua a fase anterior/);
  assert.equal(getProgress().sessions.length, 0);
  await route('#/jogo/memory/fase/memory-p01');
  button(app, 'Começar atividade').click();
  await tick();
  button(app, 'Pausar').click(); await tick();
  assert.equal(app.querySelector('#game-interaction').inert, true);
  button(document.querySelector('dialog'), 'Continuar atividade').click(); await tick();
  assert.equal(app.querySelector('#game-interaction').inert, false);
  await route('#/atividades');
  assert.ok(document.querySelector('dialog'));
  button(document.querySelector('dialog'), 'Continuar atividade').click(); await tick();
  assert.ok(app.querySelector('#game-board')); assert.equal(location.hash, '#/jogo/memory/fase/memory-p01');
  solveSession();
  const firstTotal = getProgress().atividades;
  button(app, 'Tentar novamente').click(); await tick(); solveSession();
  assert.equal(getProgress().atividades, firstTotal + 1);
  assert.equal(getProgress().phaseProgress.memory[1].completions, 2);
  button(app, 'Próxima atividade').click(); await tick();
  assert.equal(getProgress().sessions.at(-1).phaseOrdinal, 2);
  solveSession();
  await route('#/jogo/memory/fases');
  assert.equal(app.querySelectorAll('.phase-completed').length, 2);
  assert.match(app.querySelector('.phase-completed').textContent, /Concluída.*Melhor resultado/s);
  assert.equal(app.querySelector('[data-phase][aria-current="step"]').dataset.phase, 'memory-p03');
  for (const game of games) {
    await route(`#/jogo/${game.id}`);
    button(app, 'Começar atividade').click(); await tick();
    solveSession();
    assert.equal(getProgress().sessions.at(-1).mode, 'free');
  }
  await route('#/treino');
  const planBefore = structuredClone(getProgress().dailyPlans);
  button(app, 'Começar treino').click();
  for (let i = 0; i < 5; i++) {
    if (i === 0) button(app, 'Começar atividade').click();
    await tick(); solveSession();
    const session = getProgress().sessions.at(-1);
    assert.equal(session.mode, 'daily');
    assert.equal(getProgress().dailyPlans[session.trainingRef.dateKey].slots[i].completedSessionId, session.id);
    if (i < 4) button(app, 'Próxima atividade').click();
  }
  assert.match(app.textContent, /Parabéns! Você concluiu o treino de hoje/);
  await route('#/inicio'); assert.match(app.textContent, /Treino de hoje concluído/);
  const completedCount = getProgress().atividades;
  await route('#/treino'); assert.equal(getProgress().atividades, completedCount);
  for (const [date, plan] of Object.entries(planBefore)) assert.deepEqual(getProgress().dailyPlans[date].slots.map(s => s.phaseId), plan.slots.map(s => s.phaseId));
  await route('#/evolucao');
  assert.ok(app.querySelectorAll('details').length > 12);
  const select = app.querySelector('#history-period'); select.value = '7'; select.dispatchEvent(new Event('change'));
  assert.ok(app.querySelector('.participation'));
  await route('#/ajustes');
  app.querySelector('#appearance').value = 'dark'; app.querySelector('#appearance').dispatchEvent(new Event('change'));
  assert.equal(document.documentElement.dataset.appearance, 'dark');
  app.querySelector('#text-size').value = 'large'; app.querySelector('#text-size').dispatchEvent(new Event('change'));
  assert.equal(document.documentElement.dataset.textSize, 'large');
  localStorage.setItem('other-app', 'preserve');
  button(app, 'Apagar meu progresso').click(); await tick();
  button(document.querySelector('dialog'), 'Cancelar').click(); await tick();
  assert.equal(getProgress().atividades, completedCount);
  button(app, 'Apagar meu progresso').click(); await tick();
  button(document.querySelector('dialog'), 'Apagar progresso').click(); await tick();
  assert.equal(getProgress().atividades, 0);
  assert.equal(getPreferences().appearance, 'dark');
  assert.equal(localStorage.getItem('other-app'), 'preserve');
  await route('#/jogo/what-did-you-see/fases'); assert.equal(app.querySelectorAll('[data-phase]').length, 20);
  await route('#/not-found'); assert.match(app.textContent, /Não encontramos/);
  assert.deepEqual(errors, []);
});

test('browser back cancellation keeps history, paused exit cancellation and restart keep correct state', async () => {
  resetProgress();
  await route('#/atividades');
  await route('#/jogo/word/fase/word-p01');
  button(app, 'Começar atividade').click(); await tick();
  const originalSession = getProgress().sessions.at(-1).id;
  history.back(); await tick(); await tick();
  assert.ok(document.querySelector('dialog'));
  button(document.querySelector('dialog'), 'Continuar atividade').click(); await tick();
  assert.equal(location.hash, '#/jogo/word/fase/word-p01');
  assert.equal(getProgress().sessions.at(-1).id, originalSession);
  button(app, 'Pausar').click(); await tick();
  button(document.querySelector('dialog'), 'Sair da atividade').click(); await tick();
  button(document.querySelector('dialog'), 'Continuar atividade').click(); await tick();
  assert.match(document.querySelector('dialog').textContent, /Atividade pausada/);
  assert.equal(app.querySelector('#game-interaction').inert, true);
  button(document.querySelector('dialog'), 'Continuar atividade').click(); await tick();
  button(app, 'Recomeçar atividade').click(); await tick();
  button(document.querySelector('dialog'), 'Sair da atividade').click(); await tick();
  assert.equal(getProgress().sessions.find(session => session.id === originalSession).status, 'abandoned');
  await tick();
  assert.notEqual(getProgress().sessions.at(-1).id, originalSession);
  history.back(); await tick(); await tick();
  button(document.querySelector('dialog'), 'Sair da atividade').click(); await tick(); await tick();
  assert.equal(location.hash, '#/atividades');
  assert.equal(getProgress().sessions.filter(s => s.status === 'active').length, 0);
  assert.equal(getProgress().atividades, 0);
  assert.deepEqual(errors, []);
});

test('saving failure is visible and retry does not repeat the completed activity', async () => {
  resetProgress();
  const original = window.Storage.prototype.setItem;
  window.Storage.prototype.setItem = () => { throw new Error('Quota'); };
  try {
    await route('#/jogo/word/fase/word-p01');
    button(app, 'Começar atividade').click(); await tick(); solveSession();
    assert.equal(document.getElementById('storage-status').hidden, false);
    assert.match(document.getElementById('storage-status').textContent, /não foi possível salvá-lo/);
    assert.equal(getProgress().atividades, 1);
  } finally { window.Storage.prototype.setItem = original; }
  button(document.getElementById('storage-status'), 'Tentar salvar novamente').click();
  assert.equal(getProgress().atividades, 1);
  assert.equal(document.getElementById('storage-status').hidden, true);
  assert.equal(JSON.parse(localStorage.getItem('reconecta_progress')).atividades, 1);
  assert.deepEqual(errors, []);
});
