import { getGamePhases } from '../phases/catalog.js';
import { getPhaseState, getPhaseSummary } from '../phases/progression.js';
import { categories } from '../data.js';
import { escapeHTML } from '../utils/dom.js';
import { renderIcon } from '../utils/icons.js';

function phaseCard(phase, state, record, game) {
  const current = state === 'available';
  const status = current ? 'Atual' : state === 'completed' ? 'Concluída' : 'Bloqueada';
  const statusIcon = current ? '●' : state === 'completed' ? '✓' : '🔒';
  const description = state === 'completed'
    ? `Melhor resultado: ${record.bestStars} de 3 estrelas`
    : current ? 'Pronta para continuar' : `Conclua a atividade ${phase.ordinal - 1} para continuar`;
  const action = state === 'completed' ? 'Repetir' : current ? 'Começar' : '';

  return `<li class="phase-card phase-${state}"><button class="phase-card-action" data-phase="${phase.id}" ${state === 'locked' ? 'disabled' : ''} ${current ? 'aria-current="step"' : ''} aria-label="${action ? `${action} atividade ${phase.ordinal}: ` : ''}${escapeHTML(phase.title)}. ${status}. ${description}"><span class="phase-card-top"><span class="phase-card-icon" aria-hidden="true">${renderIcon(game.id)}</span><span class="phase-status"><span aria-hidden="true">${statusIcon}</span> ${status}</span></span><strong>Atividade ${phase.ordinal}</strong><h3>${escapeHTML(phase.title)}</h3><span class="phase-description">${description}</span>${action ? `<span class="phase-action-label" aria-hidden="true">${action}<span>→</span></span>` : ''}</button></li>`;
}

export function renderPhaseMap(container, game, progress, actions) {
  const summary = getPhaseSummary(progress, game.id);
  const phases = getGamePhases(game.id);
  const next = summary.next;
  container.innerHTML = `<section class="page-card phase-map" data-game-theme="${game.id}"><button class="secondary" id="back-catalog">← Voltar às atividades</button><span class="eyebrow">Percurso de ${categories.find(c => c.id === game.category)?.name}</span><h1>${game.name}</h1><p>${game.description}</p><div class="phase-summary" aria-live="polite"><span><strong>Seu progresso</strong><span>${summary.completed} de ${summary.total} atividades concluídas</span></span><progress value="${summary.completed}" max="${summary.total}" aria-label="Progresso em ${game.name}: ${summary.completed} de ${summary.total} atividades"></progress></div><div class="actions"><button id="continue-phase" ${next ? '' : 'disabled'}>${next ? `Continuar na atividade ${next.ordinal}` : 'Escolha uma atividade para repetir'}</button><button class="secondary" id="free-practice">Prática livre</button></div><div class="phase-blocks">${[1, 2, 3, 4].map((block) => `<section aria-labelledby="phase-block-${block}"><h2 id="phase-block-${block}">${['Primeiros passos', 'Novas conexões', 'Descobertas', 'Mais caminhos'][block - 1]}</h2><ol class="phase-grid">${phases.filter((phase) => phase.block === block).map((phase) => { const state = getPhaseState(progress, game.id, phase.ordinal); const record = progress.phaseProgress?.[game.id]?.[phase.ordinal]; return phaseCard(phase, state, record, game); }).join('')}</ol></section>`).join('')}</div></section>`;
  container.querySelector('#back-catalog').addEventListener('click', actions.back);
  container.querySelector('#free-practice').addEventListener('click', actions.free);
  container.querySelector('#continue-phase')?.addEventListener('click', () => next && actions.start(next));
  container.querySelectorAll('[data-phase]').forEach((button) => button.addEventListener('click', () => actions.start(phases.find((phase) => phase.id === button.dataset.phase))));
}
