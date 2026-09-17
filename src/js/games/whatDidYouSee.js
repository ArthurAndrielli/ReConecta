import { picture } from '../utils/contentView.js';
import { renderChoices } from './choice.js';
export function render(container, callbacks, { content, level, preferences }) {
  let timer = null, remaining = [12000, 10000, 8000, 6000][level - 1], began = 0, observing = true, destroyed = false, choice = null;
  container.innerHTML = `<div class="observation-area"><div class="choice-grid">${content.items.map(id => `<div class="choice-item">${picture(id)}</div>`).join('')}</div><button id="observe-done">Já observei</button></div>`;
  const stop = () => { if (timer !== null) { clearTimeout(timer); timer = null; remaining = Math.max(0, remaining - (performance.now() - began)); } };
  const show = () => {
    if (destroyed || !observing || !callbacks.isActive()) return;
    stop(); observing = false;
    // Remove the observed objects from both the DOM and accessibility tree.
    choice = renderChoices(container, callbacks, content, { visual: true });
    callbacks.message('Agora escolha o objeto que apareceu.');
    container.querySelector('button')?.focus();
  };
  const start = () => {
    if (destroyed || !observing || timer !== null || preferences.observationMode !== 'suggested-time') return;
    began = performance.now(); timer = setTimeout(show, remaining);
  };
  container.querySelector('#observe-done').addEventListener('click', show);
  start();
  return { pause: stop, resume: start, destroy() { destroyed = true; stop(); choice?.destroy(); } };
}
