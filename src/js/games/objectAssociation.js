import { shuffle } from '../utils/array.js';
import { escapeHTML } from '../utils/dom.js';
export function render(container, callbacks, { content: round }) {
  const destinations = shuffle(round.pairs.map(pair => pair[1]));
  const resolved = new Set();
  let selected = null, done = false, waiting = false;
  container.innerHTML = `<p id="association-progress">0 de ${round.pairs.length} pares encontrados</p><div class="association-grid"><section><h3>Origem</h3>${round.pairs.map((pair, i) => `<button class="association-option" data-left="${i}" aria-pressed="false">${escapeHTML(pair[0])}</button>`).join('')}</section><section><h3>Combinação</h3>${destinations.map((value, i) => `<button class="association-option" data-right="${i}" disabled>${escapeHTML(value)}</button>`).join('')}</section></div><button class="secondary" id="cancel-association" disabled>Cancelar seleção</button>`;
  const left = [...container.querySelectorAll('[data-left]')], right = [...container.querySelectorAll('[data-right]')];
  const update = () => {
    left.forEach((b, i) => { b.disabled = resolved.has(i) || done || waiting; b.setAttribute('aria-pressed', String(selected === i)); b.classList.toggle('is-selected', selected === i); b.classList.toggle('is-resolved', resolved.has(i)); });
    right.forEach((b, i) => { b.disabled = selected === null || done || waiting || [...resolved].some(j => round.pairs[j][1] === destinations[i]); b.classList.toggle('is-resolved', [...resolved].some(j => round.pairs[j][1] === destinations[i])); });
    container.querySelector('#cancel-association').disabled = selected === null || done || waiting;
  };
  left.forEach((b, i) => b.addEventListener('click', () => {
    if (!callbacks.isActive() || done || waiting || resolved.has(i)) return;
    selected = i; update(); callbacks.message(`${round.pairs[i][0]} selecionado. Escolha uma combinação.`); right.find(item => !item.disabled)?.focus();
  }));
  right.forEach((b, i) => b.addEventListener('click', () => {
    if (!callbacks.isActive() || done || waiting || selected === null || b.disabled) return;
    const correct = round.pairs[selected][1] === destinations[i];
    callbacks.onAttempt(correct, `${round.id}:${selected}`);
    if (correct) {
      resolved.add(selected); selected = null; done = resolved.size === round.pairs.length; update();
      container.querySelector('#association-progress').textContent = `${resolved.size} de ${round.pairs.length} pares encontrados`;
      if (done) callbacks.onComplete(); else { callbacks.message('Muito bem! Par encontrado.', 'success'); left.find(item => !item.disabled)?.focus(); }
    } else { waiting = true; update(); callbacks.onRetry(() => { waiting = false; update(); right.find(item => !item.disabled)?.focus(); }); }
  }));
  container.querySelector('#cancel-association').addEventListener('click', () => { if (!callbacks.isActive() || done || waiting) return; const index = selected; selected = null; update(); left[index]?.focus(); });
  return { destroy() { done = true; } };
}
