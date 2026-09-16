import { associationRounds } from '../data.js';
import { shuffle } from '../utils/array.js';

function render(container, callbacks, context = {}) {
  const round = associationRounds.find((item) => item.level === context.level) || associationRounds[0];
  const remaining = new Set(round.pairs.map((pair) => pair[0]));
  let left = null;
  let right = null;
  let completed = false;
  let attempts = 0;
  let errors = 0;
  const startTime = Date.now();
  container.innerHTML = `<section class="activity-card" data-level="${context.level || 1}"><h2>Associação de Objetos</h2><p>Escolha um item de cada coluna para formar um par.</p><div class="association-grid"><div><h3>Objeto</h3><div id="association-left"></div></div><div><h3>Relação</h3><div id="association-right"></div></div></div><p class="feedback" id="feedback" aria-live="polite"></p><div class="actions"><button class="secondary" id="cancel-association">Cancelar seleção</button><button class="secondary" id="back-home">← Voltar ao início</button><button id="restart">Jogar novamente</button></div></section>`;
  const leftElement = container.querySelector('#association-left');
  const rightElement = container.querySelector('#association-right');
  const draw = () => { const pairs = round.pairs.filter((pair) => remaining.has(pair[0])); leftElement.innerHTML = pairs.map((pair) => `<button class="association-option ${left === pair[0] ? 'is-selected' : ''}" data-left="${pair[0]}">${pair[0]}</button>`).join(''); rightElement.innerHTML = shuffle(pairs.map((pair) => pair[1])).map((value) => `<button class="association-option ${right === value ? 'is-selected' : ''}" data-right="${value}">${value}</button>`).join(''); leftElement.querySelectorAll('[data-left]').forEach((button) => button.addEventListener('click', () => { left = button.dataset.left; validate(); draw(); })); rightElement.querySelectorAll('[data-right]').forEach((button) => button.addEventListener('click', () => { right = button.dataset.right; validate(); draw(); })); };
  const validate = () => { if (!left || !right || completed) return; attempts += 1; callbacks.onAttempt(); const pair = round.pairs.find((item) => item[0] === left); if (pair && pair[1] === right) { remaining.delete(left); callbacks.onCorrect(); callbacks.onMessage('correct'); left = null; right = null; if (!remaining.size) { completed = true; callbacks.onComplete({ attempts, errors, elapsedTime: Date.now() - startTime }); container.querySelector('#feedback').textContent = 'Muito bem! Todos os pares foram associados.'; } } else { errors += 1; callbacks.onWrong(); callbacks.onMessage('wrong'); right = null; } };
  container.querySelector('#back-home').addEventListener('click', callbacks.onBack);
  container.querySelector('#cancel-association').addEventListener('click', () => { left = null; right = null; draw(); });
  container.querySelector('#restart').addEventListener('click', () => render(container, callbacks, context));
  draw();
}

export { render };
