import { sequenceRounds } from '../data.js';

function render(container, callbacks, context = {}) {
  const round = sequenceRounds.find((item) => item.level === context.level) || sequenceRounds[0];
  let completed = false;
  let attempts = 0;
  let errors = 0;
  const startTime = Date.now();
  container.innerHTML = `<section class="activity-card" data-level="${context.level || 1}"><h2>Complete a Sequência</h2><p>Observe o padrão e escolha o próximo elemento.</p><div class="sequence-display" aria-label="Sequência ${round.sequence.join(', ')} e lacuna">${round.sequence.map((item) => `<span>${item}</span>`).join('')}<span aria-label="Lacuna">?</span></div><div class="choice-grid" id="sequence-options">${round.options.map((item) => `<button class="choice-button" data-answer="${item}">${item}</button>`).join('')}</div><p class="feedback" id="feedback" aria-live="polite"></p><div class="actions"><button class="secondary" id="back-home">← Voltar ao início</button><button id="restart">Jogar novamente</button></div></section>`;
  container.querySelectorAll('[data-answer]').forEach((button) => button.addEventListener('click', () => {
    if (completed) return;
    attempts += 1;
    callbacks.onAttempt();
    if (button.dataset.answer === round.answer) { completed = true; callbacks.onCorrect(); callbacks.onMessage('correct'); callbacks.onComplete({ attempts, errors, elapsedTime: Date.now() - startTime }); container.querySelector('#feedback').textContent = 'Excelente! Você completou a sequência.'; }
    else { errors += 1; callbacks.onWrong(); callbacks.onMessage('wrong'); }
  }));
  container.querySelector('#back-home').addEventListener('click', callbacks.onBack);
  container.querySelector('#restart').addEventListener('click', () => render(container, callbacks, context));
}

export { render };
