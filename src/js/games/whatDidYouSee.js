import { whatDidYouSeeRounds } from '../data.js';
import { shuffle } from '../utils/array.js';

function render(container, callbacks, context = {}) {
  const round = whatDidYouSeeRounds[0];
  let phase = 'visible';
  let completed = false;
  let attempts = 0;
  let errors = 0;
  const startTime = Date.now();

  container.innerHTML = `<section class="activity-card" data-level="${context.level || 1}"><h2>O Que Você Viu?</h2><p>Observe as imagens. Depois, escolha a que apareceu.</p><div id="what-you-saw-visual" class="choice-grid" aria-live="polite"></div><div id="what-you-saw-options" class="choice-grid" hidden></div><p class="feedback" id="feedback" aria-live="polite"></p><div class="actions"><button class="secondary" id="back-home">← Voltar ao início</button><button id="restart">Jogar novamente</button></div></section>`;
  const visual = container.querySelector('#what-you-saw-visual');
  const options = container.querySelector('#what-you-saw-options');
  visual.innerHTML = round.items.map((item) => `<span class="choice-item" role="img" aria-label="Imagem ${item}">${item}</span>`).join('');
  const showOptions = () => {
    phase = 'question';
    visual.hidden = true;
    options.hidden = false;
    options.innerHTML = shuffle(round.options).map((item) => `<button class="choice-button" data-answer="${item}">${item}</button>`).join('');
    options.querySelectorAll('[data-answer]').forEach((button) => button.addEventListener('click', () => answer(button.dataset.answer)));
  };
  const answer = (value) => {
    if (phase !== 'question' || completed) return;
    attempts += 1;
    callbacks.onAttempt();
    if (value === round.answer) {
      completed = true;
      callbacks.onCorrect();
      callbacks.onMessage('correct');
      callbacks.onComplete({ attempts, errors, elapsedTime: Date.now() - startTime });
      container.querySelector('#feedback').textContent = 'Parabéns! Você concluiu a atividade.';
    } else {
      errors += 1;
      callbacks.onWrong();
      callbacks.onMessage('wrong');
    }
  };
  container.querySelector('#back-home').addEventListener('click', callbacks.onBack);
  container.querySelector('#restart').addEventListener('click', () => render(container, callbacks, context));
  window.setTimeout(showOptions, 1200);
}

export { render };
