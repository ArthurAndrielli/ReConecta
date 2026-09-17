import { getGamePhases } from '../phases/catalog.js';
import { getPhaseState, getPhaseSummary } from '../phases/progression.js';
import { categories } from '../data.js';
import { escapeHTML } from '../utils/dom.js';

export function renderPhaseMap(container, game, progress, actions) {
  const summary = getPhaseSummary(progress, game.id);
  const phases = getGamePhases(game.id);
  const next = summary.next;
  container.innerHTML = `<section class="page-card phase-map"><button class="secondary" id="back-catalog">← Voltar às atividades</button><span class="eyebrow">Percurso de ${categories.find(c => c.id === game.category)?.name}</span><h1>${game.name}</h1><p>${game.description}</p><p class="phase-summary" aria-live="polite">${summary.completed} de ${summary.total} fases concluídas</p><div class="actions"><button id="continue-phase" ${next ? '' : 'disabled'}>${next ? `Continuar na fase ${next.ordinal}` : 'Escolha uma fase para repetir'}</button><button class="secondary" id="free-practice">Prática livre</button></div><div class="phase-blocks">${[1, 2, 3, 4].map((block) => `<section aria-labelledby="phase-block-${block}"><h2 id="phase-block-${block}">${['Primeiros passos', 'Novas conexões', 'Descobertas', 'Mais caminhos'][block - 1]}</h2><ol class="phase-grid">${phases.filter((phase) => phase.block === block).map((phase) => { const state = getPhaseState(progress, game.id, phase.ordinal); const record = progress.phaseProgress?.[game.id]?.[phase.ordinal]; const label = state === 'completed' ? `Repetir fase ${phase.ordinal}` : state === 'available' ? `Começar fase ${phase.ordinal}` : `Fase ${phase.ordinal} bloqueada`; return `<li class="phase-card phase-${state}"><strong>Fase ${phase.ordinal}</strong><h3>${escapeHTML(phase.title)}</h3><p>${state === 'completed' ? `Concluída · melhor resultado: ${record.bestStars} de 3 estrelas` : state === 'available' ? 'Disponível' : `Conclua a fase ${phase.ordinal - 1} para continuar`}</p><button data-phase="${phase.id}" ${state === 'locked' ? 'disabled' : ''}>${label}</button></li>`; }).join('')}</ol></section>`).join('')}</div></section>`;
  container.querySelector('#back-catalog').addEventListener('click', actions.back);
  container.querySelector('#free-practice').addEventListener('click', actions.free);
  container.querySelector('#continue-phase')?.addEventListener('click', () => next && actions.start(next));
  container.querySelectorAll('[data-phase]').forEach((button) => button.addEventListener('click', () => actions.start(phases.find((phase) => phase.id === button.dataset.phase))));
}
