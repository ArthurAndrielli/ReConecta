import { tapOnlyRounds } from '../data.js';

function render(container, callbacks, context = {}) {
  const round = tapOnlyRounds.find((item) => item.level === context.level) || tapOnlyRounds[0];
  const selected = new Set();
  let completed = false;
  let attempts = 0;
  let errors = 0;
  const startTime = Date.now();
  const targetCount = round.options.filter((item) => item.correct).length;
  container.innerHTML = `<section class="activity-card" data-level="${context.level || 1}"><h2>Toque Somente em...</h2><p>${round.instruction}.</p><p id="tap-progress" role="status">0 de ${targetCount} itens selecionados</p><div class="choice-grid" id="tap-options"></div><button id="check-tap">Conferir seleção</button><p class="feedback" id="feedback" aria-live="polite"></p><div class="actions"><button class="secondary" id="back-home">← Voltar ao início</button><button id="restart">Jogar novamente</button></div></section>`;
  const options = container.querySelector('#tap-options');
  options.innerHTML = round.options.map((item, index) => `<button class="choice-button" data-index="${index}">${item.value}</button>`).join('');
  options.querySelectorAll('[data-index]').forEach((button) => button.addEventListener('click', () => { if (completed) return; const index = Number(button.dataset.index); if (selected.has(index)) { selected.delete(index); button.classList.remove('is-selected'); } else { selected.add(index); button.classList.add('is-selected'); } container.querySelector('#tap-progress').textContent = `${[...selected].filter((item) => round.options[item].correct).length} de ${targetCount} itens corretos selecionados`; }));
  container.querySelector('#check-tap').addEventListener('click', () => { if (completed) return; attempts += 1; callbacks.onAttempt(); const expected = new Set(round.options.map((item, index) => item.correct ? index : null).filter((index) => index !== null)); const correct = selected.size === expected.size && [...expected].every((index) => selected.has(index)); if (correct) { completed = true; callbacks.onCorrect(); callbacks.onMessage('correct'); callbacks.onComplete({ attempts, errors, elapsedTime: Date.now() - startTime }); container.querySelector('#feedback').textContent = 'Muito bem! Você selecionou todos os itens corretos.'; } else { errors += 1; callbacks.onWrong(); callbacks.onMessage('wrong'); } });
  container.querySelector('#back-home').addEventListener('click', callbacks.onBack);
  container.querySelector('#restart').addEventListener('click', () => render(container, callbacks, context));
}

export { render };
