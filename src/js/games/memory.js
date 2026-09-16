import { memoryCardsByLevel } from '../data.js';
import { shuffle } from '../utils/array.js';

function render(container, callbacks, context = {}) {
  let deck = shuffle(memoryCardsByLevel[context.level] || memoryCardsByLevel[1]);
  let openCards = [];
  let matched = [];
  let locked = false;
  let completed = false;
  let attempts = 0;
  let errors = 0;
  const startTime = Date.now();
  container.innerHTML = `<section class="activity-card" data-level="${context.level || 1}"><h2>Jogo da Memória</h2><p>Encontre os dois pares.</p><div class="memory-grid" id="memory-grid"></div><p class="feedback" id="feedback" aria-live="polite"></p><div class="actions"><button class="secondary" id="back-home">← Voltar ao início</button><button id="restart">Jogar novamente</button></div></section>`;
  const grid = container.querySelector('#memory-grid');
  const draw = () => { grid.innerHTML = deck.map((value, index) => `<button class="memory-card ${openCards.includes(index) ? 'is-open' : ''} ${matched.includes(index) ? 'is-matched' : ''}" data-index="${index}" aria-label="Carta ${index + 1}">${openCards.includes(index) || matched.includes(index) ? value : '❓'}</button>`).join(''); grid.querySelectorAll('button').forEach((button) => button.addEventListener('click', () => select(Number(button.dataset.index)))); };
  const select = (index) => { if (locked || matched.includes(index) || openCards.includes(index)) return; openCards.push(index); draw(); if (openCards.length < 2) return; attempts += 1; callbacks.onAttempt(); const [first, second] = openCards; if (deck[first] === deck[second]) { matched.push(first, second); openCards = []; callbacks.onCorrect(); callbacks.onMessage('correct'); draw(); if (matched.length === deck.length && !completed) { completed = true; callbacks.onComplete({ pairs: matched.length / 2, elapsedTime: Date.now() - startTime, attempts, errors }); container.querySelector('#feedback').textContent = 'Parabéns! Você concluiu o Jogo da Memória.'; } } else { errors += 1; locked = true; callbacks.onWrong(); callbacks.onMessage('wrong'); if (errors >= 2) container.querySelector('#feedback').textContent = 'Dica: observe as cartas com calma.'; setTimeout(() => { openCards = []; locked = false; draw(); }, 700); } };
  container.querySelector('#back-home').addEventListener('click', callbacks.onBack);
  container.querySelector('#restart').addEventListener('click', () => render(container, callbacks, context));
  draw();
}
export { render };
