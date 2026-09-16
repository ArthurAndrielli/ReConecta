import { dailySituationRounds } from '../data.js';

function render(container, callbacks, context = {}) {
  const round = dailySituationRounds[Math.floor(Math.random() * dailySituationRounds.length)];
  let completed = false;
  let attempts = 0;
  let errors = 0;
  const startTime = Date.now();
  container.innerHTML = `<section class="activity-card" data-level="${context.level || 1}"><h2>Situações do Cotidiano</h2><p>${round.question}</p><div class="choice-grid">${round.options.map((option) => `<button class="choice-button" data-answer="${option}">${option}</button>`).join('')}</div><p class="feedback" id="feedback" aria-live="polite"></p><div class="actions"><button class="secondary" id="hint">Preciso de uma dica</button><button class="secondary" id="back-home">← Voltar ao início</button><button id="restart">Outra situação</button></div></section>`;
  container.querySelector('#hint').addEventListener('click', () => { container.querySelector('#feedback').textContent = 'Pense no que ajuda a resolver a situação apresentada.'; });
  container.querySelectorAll('[data-answer]').forEach((button) => button.addEventListener('click', () => { if (completed) return; attempts += 1; callbacks.onAttempt(); if (button.dataset.answer === round.answer) { completed = true; callbacks.onCorrect(); callbacks.onMessage('correct'); callbacks.onComplete({ attempts, errors, elapsedTime: Date.now() - startTime }); container.querySelector('#feedback').textContent = 'Muito bem! Essa é uma boa escolha.'; } else { errors += 1; callbacks.onWrong(); callbacks.onMessage('wrong'); } }));
  container.querySelector('#back-home').addEventListener('click', callbacks.onBack);
  container.querySelector('#restart').addEventListener('click', () => render(container, callbacks, context));
}

export { render };
