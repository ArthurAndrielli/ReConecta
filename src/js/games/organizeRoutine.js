import { routineRounds } from '../data.js';
import { shuffle } from '../utils/array.js';

function render(container, callbacks, context = {}) {
  const round = routineRounds.find((item) => item.level === context.level) || routineRounds[0];
  let steps = shuffle(round.steps);
  let selectedIndex = 0;
  let completed = false;
  let attempts = 0;
  let errors = 0;
  const startTime = Date.now();
  container.innerHTML = `<section class="activity-card" data-level="${context.level || 1}"><h2>Organize a Rotina</h2><p>Selecione uma etapa e use subir ou descer para colocar tudo em ordem.</p><h3>${round.title}</h3><ol id="routine-list" class="routine-list"></ol><div class="actions"><button class="secondary" id="move-up">Subir</button><button class="secondary" id="move-down">Descer</button><button id="check-routine">Conferir ordem</button></div><p class="feedback" id="feedback" aria-live="polite"></p><div class="actions"><button class="secondary" id="back-home">← Voltar ao início</button><button id="restart">Jogar novamente</button></div></section>`;
  const list = container.querySelector('#routine-list');
  const draw = () => { list.innerHTML = steps.map((step, index) => `<li><button class="routine-step ${index === selectedIndex ? 'is-selected' : ''}" data-index="${index}">${step}</button></li>`).join(''); list.querySelectorAll('[data-index]').forEach((button) => button.addEventListener('click', () => { selectedIndex = Number(button.dataset.index); draw(); })); };
  const move = (direction) => { const target = selectedIndex + direction; if (target < 0 || target >= steps.length) return; [steps[selectedIndex], steps[target]] = [steps[target], steps[selectedIndex]]; selectedIndex = target; draw(); };
  container.querySelector('#move-up').addEventListener('click', () => move(-1));
  container.querySelector('#move-down').addEventListener('click', () => move(1));
  container.querySelector('#check-routine').addEventListener('click', () => { if (completed) return; attempts += 1; callbacks.onAttempt(); if (steps.every((step, index) => step === round.steps[index])) { completed = true; callbacks.onCorrect(); callbacks.onMessage('correct'); callbacks.onComplete({ attempts, errors, elapsedTime: Date.now() - startTime }); container.querySelector('#feedback').textContent = 'Muito bem! A rotina está organizada.'; } else { errors += 1; callbacks.onWrong(); callbacks.onMessage('wrong'); } });
  container.querySelector('#back-home').addEventListener('click', callbacks.onBack);
  container.querySelector('#restart').addEventListener('click', () => render(container, callbacks, context));
  draw();
}

export { render };
