import { imageWordRounds } from '../data.js';

function render(container, callbacks, context = {}) {
  let mode = 'imageToWord';
  let completed = false;
  let attempts = 0;
  let errors = 0;
  const startTime = Date.now();
  const draw = () => {
    const round = imageWordRounds.find((item) => item.mode === mode) || imageWordRounds[0];
    const optionMarkup = round.options.map((option) => `<button class="choice-button" data-answer="${option}">${option}</button>`).join('');
    container.innerHTML = `<section class="activity-card" data-level="${context.level || 1}"><h2>Imagem e Palavra</h2><p>Escolha a opção correspondente.</p><div class="word-image" role="img" aria-label="${round.promptLabel}">${round.prompt}</div><div class="choice-grid" id="image-word-options">${optionMarkup}</div><p class="feedback" id="feedback" aria-live="polite"></p><div class="actions"><button class="secondary" id="toggle-mode">Trocar modo</button><button class="secondary" id="hint">Preciso de uma dica</button><button class="secondary" id="back-home">← Voltar ao início</button><button id="restart">Jogar novamente</button></div></section>`;
    container.querySelectorAll('[data-answer]').forEach((button) => button.addEventListener('click', () => answer(button.dataset.answer, round.answer)));
    container.querySelector('#toggle-mode').addEventListener('click', () => { if (!completed) { mode = mode === 'imageToWord' ? 'wordToImage' : 'imageToWord'; draw(); } });
    container.querySelector('#hint').addEventListener('click', () => { container.querySelector('#feedback').textContent = 'Procure a opção que representa exatamente a referência.'; });
    container.querySelector('#back-home').addEventListener('click', callbacks.onBack);
    container.querySelector('#restart').addEventListener('click', () => render(container, callbacks, context));
  };
  const answer = (value, correctAnswer) => {
    if (completed) return;
    attempts += 1;
    callbacks.onAttempt();
    if (value === correctAnswer) {
      completed = true;
      callbacks.onCorrect();
      callbacks.onMessage('correct');
      callbacks.onComplete({ attempts, errors, elapsedTime: Date.now() - startTime });
      container.querySelector('#feedback').textContent = 'Muito bem! Você fez a associação correta.';
    } else {
      errors += 1;
      callbacks.onWrong();
      callbacks.onMessage('wrong');
    }
  };
  draw();
}

export { render };
