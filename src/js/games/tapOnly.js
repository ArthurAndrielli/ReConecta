import { shuffle } from '../utils/array.js';
import { picture } from '../utils/contentView.js';
export function render(container, callbacks, { content: round }) {
  const selected = new Set(), options = shuffle(round.options);
  let done = false, waiting = false;
  container.innerHTML = `<p id="tap-progress">0 de ${round.targets.length} objetos encontrados</p><div class="choice-grid">${options.map((id, i) => `<button class="choice-button" data-index="${i}" aria-pressed="false">${picture(id)}</button>`).join('')}</div>`;
  container.querySelectorAll('[data-index]').forEach(button => button.addEventListener('click', () => {
    const id = options[Number(button.dataset.index)];
    if (!callbacks.isActive() || done || waiting || selected.has(id)) return;
    const correct = round.targets.includes(id);
    callbacks.onAttempt(correct, `${round.id}:${id}`);
    if (correct) {
      selected.add(id); button.disabled = true; button.classList.add('is-resolved'); button.setAttribute('aria-pressed', 'true');
      container.querySelector('#tap-progress').textContent = `${selected.size} de ${round.targets.length} objetos encontrados`;
      if (selected.size === round.targets.length) { done = true; callbacks.onComplete(); }
      else { callbacks.message('Muito bem! Continue procurando os outros objetos.', 'success'); container.querySelector('button:not(:disabled)')?.focus(); }
    } else {
      waiting = true; button.classList.add('is-incorrect');
      callbacks.onRetry(() => { waiting = false; button.classList.remove('is-incorrect'); button.focus(); });
    }
  }));
  return { destroy() { done = true; } };
}
