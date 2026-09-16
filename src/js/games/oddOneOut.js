import { oddOneOutRounds } from '../data.js';

function render(container, callbacks, context = {}) {
  const round = oddOneOutRounds.find((item) => item.level === context.level) || oddOneOutRounds[0];
  let completed = false;
  let attempts = 0;
  let errors = 0;
  const startTime = Date.now();
  container.innerHTML = `<section class="activity-card" data-level="${context.level || 1}"><h2>Qual Não Combina?</h2><p>Escolha o elemento que não pertence ao grupo.</p><div class="choice-grid" id="odd-options"></div><p class="feedback" id="feedback" aria-live="polite"></p><div class="actions"><button class="secondary" id="back-home">← Voltar ao início</button><button id="restart">Jogar novamente</button></div></section>`;
  const options = container.querySelector('#odd-options');
  options.innerHTML = round.items.map((item) => `<button class="choice-button" data-answer="${item}">${item}</button>`).join('');
  options.querySelectorAll('[data-answer]').forEach((button) => button.addEventListener('click', () => {
    if (completed) return;
    attempts += 1;
    callbacks.onAttempt();
    if (button.dataset.answer === round.answer) { completed = true; callbacks.onCorrect(); callbacks.onMessage('correct'); callbacks.onComplete({ attempts, errors, elapsedTime: Date.now() - startTime }); container.querySelector('#feedback').textContent = 'Muito bem! Você encontrou o diferente.'; }
    else { errors += 1; callbacks.onWrong(); callbacks.onMessage('wrong'); }
  }));
  container.querySelector('#back-home').addEventListener('click', callbacks.onBack);
  container.querySelector('#restart').addEventListener('click', () => render(container, callbacks, context));
}

export { render };
