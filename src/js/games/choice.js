import { shuffle } from '../utils/array.js';
import { escapeHTML } from '../utils/dom.js';
import { option } from '../utils/contentView.js';

// Shared single-answer interaction; each game keeps its own prompt and data.
export function renderChoices(container, callbacks, round, { prefix = '', visual = false, label = null, success = '' } = {}) {
  let done = false;
  let waiting = false;
  const choices = shuffle(round.options);
  container.innerHTML = `${prefix}<div class="choice-grid${visual ? '' : ' text-choices'}">${choices.map((value, index) =>
    `<button class="choice-button" data-choice="${index}">${label ? escapeHTML(label(value)) : option(value, visual)}</button>`).join('')}</div>`;
  container.querySelectorAll('[data-choice]').forEach(button => button.addEventListener('click', () => {
    if (done || waiting || !callbacks.isActive()) return;
    const correct = choices[Number(button.dataset.choice)] === round.answer;
    if (!callbacks.onAttempt(correct, round.id)) return;
    waiting = !correct;
    if (correct) {
      done = true;
      button.classList.add('is-resolved');
      button.setAttribute('aria-pressed', 'true');
      container.querySelectorAll('button').forEach(item => { item.disabled = true; });
      callbacks.onComplete(success);
    } else {
      button.classList.add('is-incorrect');
      callbacks.onRetry(() => { waiting = false; button.classList.remove('is-incorrect'); button.focus(); });
    }
  }));
  return { destroy() { done = true; } };
}
