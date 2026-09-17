import { shuffle } from '../utils/array.js';
import { escapeHTML } from '../utils/dom.js';
export function render(container, callbacks, { content: round }) {
  let steps = shuffle(round.steps), done = false, waiting = false;
  container.innerHTML = '<ol class="routine-list"></ol><button id="check-routine">Verificar ordem</button>';
  const list = container.querySelector('ol');
  const draw = () => {
    list.innerHTML = steps.map((step, i) => `<li><span>${escapeHTML(step)}</span><div class="move-controls"><button class="secondary" data-move="-1" data-index="${i}" aria-label="Mover ${escapeHTML(step)} para cima" ${i === 0 || done || waiting ? 'disabled' : ''}>↑</button><button class="secondary" data-move="1" data-index="${i}" aria-label="Mover ${escapeHTML(step)} para baixo" ${i === steps.length - 1 || done || waiting ? 'disabled' : ''}>↓</button></div></li>`).join('');
    list.querySelectorAll('[data-move]').forEach(button => button.addEventListener('click', () => {
      if (!callbacks.isActive() || done || waiting) return;
      const i = Number(button.dataset.index), direction = Number(button.dataset.move), to = i + direction;
      if (to < 0 || to >= steps.length) return;
      [steps[i], steps[to]] = [steps[to], steps[i]]; draw();
      const selector = `[data-index="${to}"][data-move="${to === 0 ? 1 : to === steps.length - 1 ? -1 : direction}"]`;
      list.querySelector(selector).focus();
      callbacks.message(`${steps[to]}: posição ${to + 1} de ${steps.length}.`);
    }));
  };
  container.querySelector('#check-routine').addEventListener('click', () => {
    if (!callbacks.isActive() || done || waiting) return;
    const correct = round.acceptedOrders.some(order => order.every((step, i) => step === steps[i]));
    callbacks.onAttempt(correct, round.id);
    if (correct) { done = true; draw(); container.querySelector('#check-routine').disabled = true; callbacks.onComplete(); }
    else { waiting = true; draw(); callbacks.onRetry(() => { waiting = false; draw(); list.querySelector('button:not(:disabled)')?.focus(); }); }
  });
  draw(); return { destroy() { done = true; } };
}
