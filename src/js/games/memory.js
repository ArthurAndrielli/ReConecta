import { shuffle } from '../utils/array.js';
import { picture } from '../utils/contentView.js';
export function render(container, callbacks, { content }) {
  const deck = shuffle(content.items.flatMap(id => [id, id]));
  const matched = new Set();
  let open = [], locked = false, destroyed = false, mismatchTimer = null;
  container.innerHTML = `<p id="pair-progress">0 de ${content.items.length} pares encontrados</p><div class="memory-grid">${deck.map((id, i) => `<button class="memory-card" data-index="${i}" aria-label="Carta ${i + 1} fechada"><span class="memory-card-inner"><span class="memory-card-face memory-card-back" aria-hidden="true">◌</span><span class="memory-card-face memory-card-front">${picture(id, { label: false })}</span></span></button>`).join('')}</div>`;
  const buttons = [...container.querySelectorAll('[data-index]')];
  const update = () => buttons.forEach((button, index) => {
    const revealed = open.includes(index) || matched.has(index);
    button.classList.toggle('is-open', revealed);
    button.classList.toggle('is-matched', matched.has(index));
    button.disabled = matched.has(index);
    if (!revealed) button.setAttribute('aria-label', `Carta ${index + 1} fechada`);
    else button.removeAttribute('aria-label');
  });
  buttons.forEach((button, index) => button.addEventListener('click', () => {
    if (destroyed || locked || !callbacks.isActive() || matched.has(index) || open.includes(index)) return;
    open.push(index); update();
    if (open.length !== 2) return;
    const [a, b] = open, correct = deck[a] === deck[b];
    callbacks.onAttempt(correct, correct ? `${content.id}:${deck[a]}` : `${content.id}:comparison`);
    if (correct) {
      matched.add(a); matched.add(b); open = []; update();
      container.querySelector('#pair-progress').textContent = `${matched.size / 2} de ${content.items.length} pares encontrados`;
      if (matched.size === deck.length) { locked = true; callbacks.onComplete(); }
      else { callbacks.message('Muito bem! Par encontrado.', 'success'); buttons.find(item => !item.disabled)?.focus(); }
    } else {
      locked = true;
      callbacks.message('Essas cartas são diferentes. Observe e tente outro par.', 'help');
      mismatchTimer = setTimeout(() => {
        mismatchTimer = null;
        if (destroyed) return;
        open = []; locked = false; update(); button.focus();
      }, 900);
    }
  }));
  return { destroy() { destroyed = true; if (mismatchTimer !== null) clearTimeout(mismatchTimer); } };
}
