import { findObjectRounds } from '../data.js';

function render(container, callbacks, context = {}) {
  const round = findObjectRounds.find((item) => item.level === context.level) || findObjectRounds[0];
  let completed = false;
  let attempts = 0;
  let errors = 0;
  const startTime = Date.now();
  container.innerHTML = `<section class="activity-card" data-level="${context.level || 1}"><h2>Encontre o Objeto</h2><p>${round.instruction}.</p><div class="choice-grid" id="find-options">${round.options.map((item) => `<button class="choice-button" data-answer="${item}">${item}</button>`).join('')}</div><p class="feedback" id="feedback" aria-live="polite"></p><div class="actions"><button class="secondary" id="back-home">← Voltar ao início</button><button id="restart">Jogar novamente</button></div></section>`;
  container.querySelectorAll('[data-answer]').forEach((button) => button.addEventListener('click', () => { if (completed) return; attempts += 1; callbacks.onAttempt(); if (button.dataset.answer === round.target) { completed = true; callbacks.onCorrect(); callbacks.onMessage('correct'); callbacks.onComplete({ attempts, errors, elapsedTime: Date.now() - startTime }); container.querySelector('#feedback').textContent = 'Muito bem! Você encontrou o objeto.'; } else { errors += 1; callbacks.onWrong(); callbacks.onMessage('wrong'); } }));
  container.querySelector('#back-home').addEventListener('click', callbacks.onBack);
  container.querySelector('#restart').addEventListener('click', () => render(container, callbacks, context));
}

export { render };
