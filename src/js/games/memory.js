import { shuffle } from '../utils/array.js';
import { picture } from '../utils/contentView.js';
import { objectById } from '../phases/objects.js';
export function render(container, callbacks, { content }) {
  const deck = shuffle(content.items.flatMap(id => [id, id]));
  const matched = new Set();
  let open = [], locked = false, destroyed = false, mismatchTimer = null;
  let remaining = 900, timerStarted = 0;
  container.innerHTML = `<p id="pair-progress">0 de ${content.items.length} pares encontrados</p><div class="memory-grid">${deck.map((id, i) => `<button class="memory-card" data-index="${i}" aria-label="Carta ${i + 1} fechada"><span class="memory-card-inner"><span class="memory-card-face memory-card-back" aria-hidden="true"><span class="memory-card-emblem"></span></span><span class="memory-card-face memory-card-front" aria-hidden="true">${picture(id, { label: false, alt: '' })}</span></span></button>`).join('')}</div>`;
  const buttons = [...container.querySelectorAll('[data-index]')];
  const update = () => buttons.forEach((button, index) => {
    const revealed = open.includes(index) || matched.has(index);
    button.classList.toggle('is-open', revealed);
    button.classList.toggle('is-matched', matched.has(index));
    button.disabled = matched.has(index);
    button.setAttribute('aria-label', revealed
      ? `Carta ${index + 1}: ${objectById[deck[index]].label}`
      : `Carta ${index + 1} fechada`);
  });
  const pause = () => {
    if (mismatchTimer === null) return;
    clearTimeout(mismatchTimer); mismatchTimer = null;
    remaining = Math.max(0, remaining - (performance.now() - timerStarted));
  };
  const resume = () => {
    if (destroyed || !locked || open.length !== 2 || mismatchTimer !== null) return;
    timerStarted = performance.now();
    mismatchTimer = setTimeout(() => {
      mismatchTimer = null;
      if (destroyed || !callbacks.isActive()) return;
      const last = open.at(-1);
      open = []; locked = false; update(); buttons[last]?.focus();
    }, remaining);
  };
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
      remaining = 900; resume();
    }
  }));
  return { pause, resume, destroy() { pause(); destroyed = true; } };
}
