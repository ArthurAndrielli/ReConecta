import { wordRounds } from '../data.js';
import { shuffle } from '../utils/array.js';

function render(container, callbacks, context = {}) {
  const round = wordRounds.find((item) => item.level === context.level) || wordRounds[0];
  let selected = [];
  let completed = false;
  let attempts = 0;
  let errors = 0;
  const startTime = Date.now();
  const syllables = shuffle(round.syllables);

  container.innerHTML = `<section class="activity-card" data-level="${context.level || 1}"><h2>Monte a Palavra</h2><p>Escolha as sílabas na ordem correta para formar a palavra.</p><div class="word-image" role="img" aria-label="Imagem da palavra">${round.image}</div><p id="selected-syllables" class="selected-syllables" aria-live="polite">Escolha uma sílaba</p><div id="syllable-options" class="choice-grid"></div><p class="feedback" id="feedback" aria-live="polite"></p><div class="actions"><button class="secondary" id="undo-syllable">Desfazer</button><button class="secondary" id="back-home">← Voltar ao início</button><button id="restart">Jogar novamente</button></div></section>`;
  const options = container.querySelector('#syllable-options');
  const selectedElement = container.querySelector('#selected-syllables');
  const draw = () => {
    selectedElement.textContent = selected.length ? selected.join(' - ') : 'Escolha uma sílaba';
    options.innerHTML = syllables.map((syllable, index) => `<button class="choice-button" data-index="${index}" ${selected.includes(syllable) ? 'disabled' : ''}>${syllable}</button>`).join('');
    options.querySelectorAll('[data-index]').forEach((button) => button.addEventListener('click', () => select(syllables[Number(button.dataset.index)])));
  };
  const select = (syllable) => {
    if (completed || selected.includes(syllable)) return;
    selected.push(syllable);
    draw();
    if (selected.length !== round.syllables.length) return;
    attempts += 1;
    callbacks.onAttempt();
    if (selected.join('') === round.syllables.join('')) {
      completed = true;
      callbacks.onCorrect();
      callbacks.onMessage('correct');
      callbacks.onComplete({ attempts, errors, elapsedTime: Date.now() - startTime });
      container.querySelector('#feedback').textContent = 'Parabéns! Você montou a palavra.';
    } else {
      errors += 1;
      callbacks.onWrong();
      callbacks.onMessage('wrong');
      selected = [];
      draw();
    }
  };
  container.querySelector('#undo-syllable').addEventListener('click', () => { if (!completed) { selected.pop(); draw(); } });
  container.querySelector('#back-home').addEventListener('click', callbacks.onBack);
  container.querySelector('#restart').addEventListener('click', () => render(container, callbacks, context));
  draw();
}

export { render };
