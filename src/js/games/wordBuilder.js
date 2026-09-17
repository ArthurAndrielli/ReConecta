import { shuffle } from '../utils/array.js';
import { picture } from '../utils/contentView.js';
import { escapeHTML } from '../utils/dom.js';
export function render(container, callbacks, { content: round }) {
  const pieces = shuffle([...round.syllables, ...round.distractors]);
  let selected = [], done = false, waiting = false;
  container.innerHTML = `<div class="word-image">${picture(round.assetId, { label: false })}</div><p class="selected-syllables" id="selected-syllables" role="status">Escolha uma sílaba</p><div class="choice-grid">${pieces.map((piece, i) => `<button class="choice-button" data-piece="${i}">${escapeHTML(piece)}</button>`).join('')}</div><div class="actions"><button class="secondary" id="undo-syllable" disabled>Desfazer</button><button id="check-word" disabled>Verificar palavra</button></div>`;
  const buttons = [...container.querySelectorAll('[data-piece]')];
  const update = () => {
    container.querySelector('#selected-syllables').textContent = selected.length ? selected.map(i => pieces[i]).join(' · ') : 'Escolha uma sílaba';
    buttons.forEach((b, i) => { b.disabled = done || waiting || selected.includes(i) || selected.length >= round.syllables.length; });
    container.querySelector('#undo-syllable').disabled = done || waiting || !selected.length;
    container.querySelector('#check-word').disabled = done || waiting || selected.length !== round.syllables.length;
  };
  buttons.forEach((button, i) => button.addEventListener('click', () => {
    if (!callbacks.isActive() || done || waiting || selected.includes(i) || selected.length >= round.syllables.length) return;
    selected.push(i); update();
    (buttons.find(b => !b.disabled) || container.querySelector('#check-word')).focus();
  }));
  container.querySelector('#undo-syllable').addEventListener('click', () => {
    if (!callbacks.isActive() || done || waiting) return;
    const i = selected.pop(); update(); buttons[i]?.focus();
  });
  container.querySelector('#check-word').addEventListener('click', () => {
    if (!callbacks.isActive() || done || waiting || selected.length !== round.syllables.length) return;
    const correct = selected.map(i => pieces[i]).join('') === round.word;
    callbacks.onAttempt(correct, round.id);
    if (correct) { done = true; update(); callbacks.onComplete(`Muito bem! Você formou ${round.word}.`); }
    else { waiting = true; update(); callbacks.onRetry(() => { waiting = false; update(); container.querySelector('#undo-syllable').focus(); }); }
  });
  return { hint() { buttons.forEach((button, i) => button.classList.toggle('hint', pieces[i] === round.syllables[0])); }, destroy() { done = true; } };
}
