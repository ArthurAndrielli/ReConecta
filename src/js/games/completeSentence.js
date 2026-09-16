import { sentenceRounds } from '../data.js';

function render(container, callbacks, context = {}) {
  const round = sentenceRounds.find((item) => item.level === context.level) || sentenceRounds[0];
  let completed = false;
  let attempts = 0;
  let errors = 0;
  const startTime = Date.now();
  container.innerHTML = `<section class="activity-card" data-level="${context.level || 1}"><h2>Complete a Frase</h2><p>Escolha a palavra que completa a frase.</p><p class="sentence-prompt">${round.sentence}</p><div class="choice-grid">${round.options.map((option) => `<button class="choice-button" data-answer="${option}">${option}</button>`).join('')}</div><p class="feedback" id="feedback" aria-live="polite"></p><div class="actions"><button class="secondary" id="back-home">← Voltar ao início</button><button id="restart">Jogar novamente</button></div></section>`;
  container.querySelectorAll('[data-answer]').forEach((button) => button.addEventListener('click', () => { if (completed) return; attempts += 1; callbacks.onAttempt(); if (button.dataset.answer === round.answer) { completed = true; callbacks.onCorrect(); callbacks.onMessage('correct'); callbacks.onComplete({ attempts, errors, elapsedTime: Date.now() - startTime }); container.querySelector('#feedback').textContent = 'Muito bem! A frase ficou completa.'; } else { errors += 1; callbacks.onWrong(); callbacks.onMessage('wrong'); } }));
  container.querySelector('#back-home').addEventListener('click', callbacks.onBack);
  container.querySelector('#restart').addEventListener('click', () => render(container, callbacks, context));
}

export { render };
