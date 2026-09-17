import { getProgress, getPreferences, savePreferences, getStorageStatus, retrySave, resetProgress } from './storage.js';
import { render as renderMemory } from './games/memory.js';
import { render as renderWhatDidYouSee } from './games/whatDidYouSee.js';
import { render as renderWordBuilder } from './games/wordBuilder.js';
import { render as renderImageWord } from './games/imageWord.js';
import { render as renderOddOneOut } from './games/oddOneOut.js';
import { render as renderSequence } from './games/sequence.js';
import { render as renderRoutine } from './games/organizeRoutine.js';
import { render as renderFindObject } from './games/findObject.js';
import { render as renderTapOnly } from './games/tapOnly.js';
import { render as renderAssociation } from './games/objectAssociation.js';
import { render as renderDailySituations } from './games/dailySituations.js';
import { render as renderCompleteSentence } from './games/completeSentence.js';
import { games, categories } from './data.js';
import { getGameLevel } from './levels.js';
import { getBestCategory, getRecommendation, getCategoryPerformance } from './evolution.js';
import { renderIcon } from './utils/icons.js';
import { getPhase, getGamePhases, phaseCatalog } from './phases/catalog.js';
import { canStartPhase, getPhaseSummary } from './phases/progression.js';
import { getPhaseContent } from './phases/content.js';
import { renderPhaseMap } from './ui/phaseMap.js';
import { getDailyPlan } from './dailyTraining.js';
import { startGameSession } from './session.js';
import { showDialog } from './ui/dialog.js';
import { escapeHTML as esc, localDateKey, focusHeading } from './utils/dom.js';
import { shuffle } from './utils/array.js';
import { ensureGameAssets } from './utils/assets.js';

const app = document.getElementById('app');
const navLinks = [...document.querySelectorAll('[data-nav]')];
const engines = { memory: renderMemory, whatDidYouSee: renderWhatDidYouSee, word: renderWordBuilder, image: renderImageWord,
  odd: renderOddOneOut, sequence: renderSequence, routine: renderRoutine, findObject: renderFindObject,
  tapOnly: renderTapOnly, association: renderAssociation, situations: renderDailySituations, sentence: renderCompleteSentence };
const aliases = { 'what-did-you-see': 'whatDidYouSee', 'word-builder': 'word', 'image-word': 'image', 'odd-one-out': 'odd',
  'organize-routine': 'routine', 'find-object': 'findObject', 'tap-only': 'tapOnly', 'object-association': 'association',
  'daily-situations': 'situations', 'complete-sentence': 'sentence' };
let active = null, dailyDate = null, period = 'all', returnCard = '';
let historyIndex = Number.isInteger(history.state?.reconectaIndex) ? history.state.reconectaIndex : 0;
let restoringHistory = null;
history.replaceState({ ...history.state, reconectaIndex: historyIndex }, '', location.href);
const catalogState = { query: '', category: 'all' };
const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const categoryLabel = id => categories.find(c => c.id === id)?.name || id;
const gameFor = id => games.find(g => g.id === (aliases[id] || id));
const phaseRoute = (game, phase) => `#/jogo/${game.id}/fase/${phase.id}`;
const mapRoute = id => `#/jogo/${id}/fases`;
const nf = new Intl.NumberFormat('pt-BR');
const df = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
const fmtDate = value => Number.isFinite(Date.parse(value)) ? df.format(new Date(value)) : 'Data não registrada';
function navigate(hash) { if (location.hash === hash) renderRoute(); else location.hash = hash; }
function setActiveNav(route) { navLinks.forEach(link => { if (link.dataset.nav === route) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current'); }); }
function screen(title, nav = '', focusMode = false) {
  document.title = `${title} · ReConecta`;
  document.body.classList.toggle('is-focus-mode', focusMode); setActiveNav(nav);
}
function finishView() { focusHeading(app); window.scrollTo?.(0, 0); }
function gameCard(game) {
  const summary = getPhaseSummary(getProgress(), game.id);
  return `<a class="game-card" href="${mapRoute(game.id)}" data-game="${game.id}" data-category="${game.category}"><div class="game-icon" aria-hidden="true">${renderIcon(game.id)}</div><div class="game-card-content"><span class="category-label category-${game.category}">${categoryLabel(game.category)}</span><h3>${game.name}</h3><p>${game.description}</p><p class="phase-progress">${summary.completed} de ${summary.total} fases concluídas</p></div><span class="card-action">Conhecer atividade <span aria-hidden="true">→</span></span></a>`;
}
function bindCards() { app.querySelectorAll('[data-game]').forEach(link => link.addEventListener('click', () => { returnCard = link.dataset.game; })); }
function dayCount(sessions) { return new Set(sessions.filter(s => s.status === 'completed').map(s => localDateKey(new Date(s.endedAt)))).size; }
function renderHome() {
  screen('Início', 'inicio');
  const progress = getProgress(), plan = getDailyPlan();
  const completed = plan?.slots.filter(s => s.completedSessionId).length || 0;
  const recommendation = getRecommendation(progress);
  let featured = progress.atividades ? [games.find(g => g.id === recommendation.gameId)] : ['memory', 'word', 'sequence'].map(id => games.find(g => g.id === id));
  for (const game of games) if (featured.length < 3 && !featured.some(g => g.category === game.category)) featured.push(game);
  const days = dayCount(progress.sessions);
  app.innerHTML = `<section class="page-card home-page"><h1>Bom te ver por aqui.</h1><p class="lead">Escolha uma atividade. Cada pequeno passo conta.</p><div class="daily-card"><div><span class="eyebrow">Treino de Hoje</span><h2>Um momento para reconectar.</h2><p>5 atividades variadas. Cerca de 5 a 10 minutos, no seu ritmo.</p>${completed ? `<p>${completed === 5 ? 'Treino de hoje concluído.' : `Você concluiu ${completed} de 5 atividades.`}</p>` : ''}<button id="start-training">${completed === 5 ? 'Escolher outra atividade' : completed ? 'Continuar treino' : 'Começar treino'}</button></div><div class="hero-art" aria-hidden="true">${renderIcon('memory')}${renderIcon('word')}</div></div>${progress.atividades ? `<div class="progress-card"><div><strong>${nf.format(progress.atividades)}</strong>Atividades concluídas</div><div><strong>${nf.format(progress.estrelas)}</strong>Estrelas históricas</div>${days ? `<div><strong>${days}</strong>Dias com atividade</div>` : ''}</div>` : '<p class="empty-note">Seu progresso começa com a primeira atividade.</p>'}<div class="section-heading"><h2>Encontre sua próxima atividade</h2><a href="#/atividades">Ver todas</a></div><div class="game-grid featured-grid">${featured.map(gameCard).join('')}</div></section>`;
  app.querySelector('#start-training').addEventListener('click', () => { dailyDate = null; navigate(completed === 5 ? '#/atividades' : '#/treino'); });
  bindCards();
}
function renderActivities() {
  screen('Atividades', 'atividades');
  app.innerHTML = `<section class="page-card catalog-page"><h1>Escolha sua próxima atividade</h1><p class="lead">Você pode começar por qualquer uma.</p><div class="catalog-controls"><label for="game-search">Buscar atividade</label><input id="game-search" type="search" placeholder="Ex.: memória" autocomplete="off"><div class="filter-list" role="group" aria-label="Filtrar por categoria"><button class="filter-chip" data-filter="all">Todas</button>${categories.map(c => `<button class="filter-chip" data-filter="${c.id}">${c.name}</button>`).join('')}</div></div><p id="catalog-count" class="catalog-count" role="status"></p><div id="catalog-grid" class="game-grid"></div></section>`;
  const search = app.querySelector('#game-search'), grid = app.querySelector('#catalog-grid');
  search.value = catalogState.query;
  const update = () => {
    const query = normalize(catalogState.query.trim());
    const visible = games.filter(g => (catalogState.category === 'all' || g.category === catalogState.category) && normalize(g.name).includes(query));
    grid.innerHTML = visible.length ? visible.map(gameCard).join('') : '<div class="empty-state"><h2>Nenhuma atividade encontrada</h2><p>Tente outro nome ou limpe os filtros.</p><button id="clear-filters">Limpar filtros</button></div>';
    app.querySelector('#catalog-count').textContent = `${visible.length} ${visible.length === 1 ? 'atividade encontrada' : 'atividades encontradas'}`;
    app.querySelectorAll('[data-filter]').forEach(b => { const selected = b.dataset.filter === catalogState.category; b.classList.toggle('is-selected', selected); b.setAttribute('aria-pressed', String(selected)); });
    app.querySelector('#clear-filters')?.addEventListener('click', () => { catalogState.query = search.value = ''; catalogState.category = 'all'; update(); search.focus(); });
    bindCards();
  };
  app.querySelectorAll('[data-filter]').forEach(b => b.addEventListener('click', () => { catalogState.category = b.dataset.filter; update(); }));
  search.addEventListener('input', () => { catalogState.query = search.value; update(); }); update();
}
function periodSessions(progress) {
  if (period === 'all') return progress.sessions;
  const since = new Date(); since.setHours(0, 0, 0, 0); since.setDate(since.getDate() - Number(period) + 1);
  return progress.sessions.filter(s => new Date(s.endedAt || s.startedAt) >= since);
}
function participation(sessions) {
  if (period === 'all' || !sessions.some(s => s.status === 'completed')) return '';
  const count = Number(period), bins = [];
  for (let offset = count - 1; offset >= 0; offset -= period === '30' ? 7 : 1) {
    const first = new Date(); first.setHours(0, 0, 0, 0); first.setDate(first.getDate() - offset);
    const last = new Date(first); last.setDate(first.getDate() + Math.min(period === '30' ? 7 : 1, offset + 1));
    bins.push({ label: `${first.toLocaleDateString('pt-BR')}${period === '30' ? ` a ${new Date(last.getTime() - 1).toLocaleDateString('pt-BR')}` : ''}`,
      value: sessions.filter(s => s.status === 'completed' && new Date(s.endedAt) >= first && new Date(s.endedAt) < last).length });
  }
  const max = Math.max(1, ...bins.map(b => b.value));
  return `<section><h2>Participação no período</h2><ul class="participation">${bins.map(b => `<li><span>${b.label}</span><span class="bar" style="--bar-size:${b.value / max * 100}%" aria-hidden="true"></span><strong>${b.value} atividades</strong></li>`).join('')}</ul></section>`;
}
function renderEvolution() {
  screen('Minha evolução', 'evolucao');
  const progress = getProgress(), sessions = periodSessions(progress), completed = sessions.filter(s => s.status === 'completed');
  const totals = period === 'all' ? { count: progress.atividades, stars: progress.estrelas } : { count: completed.length, stars: completed.reduce((n, s) => n + s.stars, 0) };
  const best = getBestCategory(progress), recommendation = getRecommendation(progress);
  const summaries = games.map(g => ({ game: g, ...getPhaseSummary(progress, g.id) }));
  const history = [...sessions].reverse().map(s => {
    const phase = getPhase(s.phaseId), mode = s.mode === 'daily' ? 'Treino de Hoje' : s.mode === 'phase' ? 'Fases' : 'Prática livre';
    return `<li><details><summary><strong>${esc(gameFor(s.gameId)?.name || 'Atividade')}</strong><span>${fmtDate(s.endedAt || s.startedAt)} · ${s.status === 'completed' ? `${s.stars} estrelas` : 'Interrompida'}</span></summary><p>${mode}${phase ? ` · Fase ${phase.ordinal}: ${esc(phase.title)}` : ''}</p><dl class="session-details"><div><dt>Tentativas</dt><dd>${s.attempts.length}</dd></div><div><dt>Acertos</dt><dd>${s.attempts.filter(a => a.correct).length}</dd></div><div><dt>Erros</dt><dd>${s.attempts.filter(a => !a.correct).length}</dd></div><div><dt>Tempo ativo</dt><dd>${Math.round(s.elapsedMs / 1000)} s</dd></div><div><dt>Configuração da atividade</dt><dd>${['Inicial', 'Fácil', 'Intermediário', 'Avançada'][s.level - 1]}</dd></div></dl></details></li>`;
  }).join('');
  app.innerHTML = `<section class="page-card"><h1>Cada prática conta</h1><p>Acompanhe as atividades que você realizou, no seu ritmo.</p><label for="history-period">Período</label><select id="history-period"><option value="all">Todo o período</option><option value="7">Últimos 7 dias</option><option value="30">Últimos 30 dias</option></select>${totals.count ? `<div class="progress-card"><div><strong>${totals.count}</strong>Atividades concluídas</div><div><strong>${totals.stars}</strong>Estrelas históricas</div><div><strong>${dayCount(sessions)}</strong>Dias com atividade registrada</div></div>` : '<p class="empty-note">Seu progresso vai aparecer aqui depois da primeira atividade.</p>'}${period === 'all' && progress.legacyTotals?.atividades ? '<p>Inclui registros anteriores sem data detalhada. Eles não entram nos períodos de 7 e 30 dias.</p>' : ''}${participation(sessions)}<section><h2>Seu percurso completo</h2><p>${summaries.reduce((n, s) => n + s.completed, 0)} de ${phaseCatalog.length} fases · ${summaries.reduce((n, s) => n + s.stars, 0)} estrelas do percurso (melhores resultados).</p><ul class="path-list">${summaries.map(s => `<li><a href="${mapRoute(s.game.id)}">${s.game.name}</a><span>${s.completed} de ${s.total} fases · ${s.stars} estrelas</span><progress value="${s.completed}" max="${s.total}" aria-label="Fases concluídas de ${s.game.name}"></progress></li>`).join('')}</ul></section><section><h2>Suas atividades por categoria</h2><ul>${getCategoryPerformance(progress).map(c => `<li>${c.label}: ${c.count} sessões nas até dez mais recentes.</li>`).join('')}</ul>${best ? `<p>Maior facilidade nos exercícios recentes: ${best.label}.</p>` : '<p>Explore as atividades para descobrir suas preferidas. Ainda não há comparação suficiente entre categorias.</p>'}<p>${recommendation.reason} <a href="${mapRoute(recommendation.gameId)}">Praticar ${gameFor(recommendation.gameId).name}</a></p></section><section><h2>Histórico</h2>${history ? `<ul class="history-list">${history}</ul>` : '<div class="empty-state"><p>Nenhuma sessão neste período.</p><a href="#/atividades">Escolher atividade</a></div>'}</section></section>`;
  const select = app.querySelector('#history-period'); select.value = period;
  select.addEventListener('change', () => { period = select.value; renderEvolution(); app.querySelector('#history-period').focus(); });
}
const appearanceMedia = window.matchMedia('(prefers-color-scheme: dark)');
function applyPreferences() {
  const p = getPreferences();
  document.documentElement.dataset.appearance = p.appearance === 'system' ? (appearanceMedia.matches ? 'dark' : 'light') : p.appearance;
  document.documentElement.dataset.textSize = p.textSize;
  document.documentElement.classList.toggle('reduce-motion', p.reduceMotion);
}
appearanceMedia.addEventListener('change', applyPreferences);
function renderSettings() {
  screen('Ajustes', 'ajustes'); const p = getPreferences();
  app.innerHTML = `<section class="page-card settings-page"><h1>Ajustes</h1><p class="lead">Escolha uma experiência confortável para você.</p><div class="settings-list"><section><h2>Aparência</h2><label for="appearance">Tema</label><p>Sistema acompanha a aparência do dispositivo.</p><select id="appearance"><option value="system">Sistema</option><option value="light">Claro</option><option value="dark">Escuro</option></select></section><section><h2>Leitura</h2><label for="text-size">Tamanho do texto</label><select id="text-size"><option value="standard">Padrão</option><option value="large">Ampliado</option></select><p>Você pode praticar no seu ritmo.</p></section><section><h2>Movimento</h2><label class="setting-check"><input id="reduce-motion" type="checkbox"> Reduzir animações</label><p>A preferência de redução do dispositivo também é respeitada.</p></section><section><h2>Tempo de observação</h2><label for="observation-mode">Em O Que Você Viu?</label><select id="observation-mode"><option value="self-paced">No meu ritmo</option><option value="suggested-time">Tempo sugerido</option></select><p>No seu ritmo, você decide quando ocultar as imagens. O tempo sugerido varia de 6 a 12 segundos.</p></section></div><section class="danger-zone"><h2>Meu progresso</h2><p>Seu progresso fica salvo neste navegador quando o armazenamento está disponível.</p><button class="danger" id="reset-progress">Apagar meu progresso</button><p id="settings-feedback" role="status"></p></section></section>`;
  app.querySelector('#appearance').value = p.appearance; app.querySelector('#text-size').value = p.textSize;
  app.querySelector('#observation-mode').value = p.observationMode; app.querySelector('#reduce-motion').checked = p.reduceMotion;
  app.querySelectorAll('select, input').forEach(control => control.addEventListener('change', () => {
    savePreferences({ appearance: app.querySelector('#appearance').value, textSize: app.querySelector('#text-size').value,
      observationMode: app.querySelector('#observation-mode').value, reduceMotion: app.querySelector('#reduce-motion').checked }); applyPreferences();
  }));
  app.querySelector('#reset-progress').addEventListener('click', async () => {
    const confirm = await showDialog({ title: 'Apagar seu progresso?', text: 'As atividades, estrelas e treinos salvos neste navegador serão apagados. Suas preferências serão mantidas.',
      actions: [{ label: 'Cancelar', value: false }, { label: 'Apagar progresso', value: true, danger: true }] });
    if (confirm) { const saved = resetProgress(); dailyDate = null; app.querySelector('#settings-feedback').textContent = saved ? 'Seu progresso foi apagado. Suas preferências foram mantidas.' : 'Não foi possível apagar o progresso. Tente novamente.'; }
  });
}
function renderTraining() {
  screen('Treino de Hoje', 'inicio'); dailyDate ||= localDateKey();
  const plan = getDailyPlan(dailyDate);
  if (!plan) return unavailable('Não foi possível ler este treino. Você pode escolher uma atividade no catálogo.');
  const next = plan.slots.find(s => !s.completedSessionId), count = plan.slots.filter(s => s.completedSessionId).length;
  app.innerHTML = `<section class="page-card"><h1>Treino de Hoje</h1><p>Cerca de 5 a 10 minutos, no seu ritmo.</p><p>${count} de 5 atividades concluídas.</p>${count === 5 ? '<p role="status">Parabéns! Você concluiu o treino de hoje.</p>' : '<p>As etapas concluídas são mantidas. Ao retomar, a atividade pendente recomeça do início.</p>'}<ol class="training-list">${plan.slots.map(slot => `<li><strong>${gameFor(slot.gameId).name}</strong><span>${categoryLabel(gameFor(slot.gameId).category)} · ${slot.completedSessionId ? 'Concluída' : getPhase(slot.phaseId) ? `Fase ${getPhase(slot.phaseId).ordinal}` : 'Conteúdo indisponível'}</span></li>`).join('')}</ol><div class="actions"><button id="training-next">${next ? count ? 'Continuar treino' : 'Começar treino' : 'Escolher outra atividade'}</button><a class="button secondary" href="#/inicio">Voltar ao início</a></div></section>`;
  app.querySelector('#training-next').addEventListener('click', () => next ? openIntro(gameFor(next.gameId), getPhase(next.phaseId), { dateKey: dailyDate, slotId: next.id }) : navigate('#/atividades'));
}
function unavailable(message, game = null) {
  screen('Atividade indisponível', 'atividades');
  app.innerHTML = `<section class="page-card"><h1>Não foi possível abrir esta atividade</h1><p>${esc(message)}</p><a class="button" href="${game ? mapRoute(game.id) : '#/atividades'}">${game ? 'Voltar ao mapa' : 'Escolher atividade'}</a><a class="button secondary" href="#/inicio">Voltar ao início</a></section>`;
}
function openPhaseMap(game) {
  screen(game.name, 'atividades');
  renderPhaseMap(app, game, getProgress(), { back: () => navigate('#/atividades'), free: () => navigate(`#/jogo/${game.id}`), start: phase => navigate(phaseRoute(game, phase)) });
}
function openIntro(game, phase = null, trainingRef = null) {
  if (phase && !canStartPhase(getProgress(), game.id, phase.ordinal)) return unavailable('Conclua a fase anterior para continuar.', game);
  if (trainingRef) {
    const slot = getDailyPlan(trainingRef.dateKey)?.slots.find(s => s.id === trainingRef.slotId);
    if (!phase || !slot || slot.completedSessionId || slot.phaseId !== phase.id || slot.contentVersion !== phase.contentVersion) return unavailable('A fase prevista neste treino não está disponível.', game);
  }
  screen(game.name, 'atividades', true);
  app.innerHTML = `<section class="activity-card activity-intro"><span class="eyebrow">${categoryLabel(game.category)}</span><h1>${game.name}</h1><p class="phase-context">${phase ? `Fase ${phase.ordinal} de ${getGamePhases(game.id).length} · ${esc(phase.title)}` : 'Prática livre'}</p><p>${esc(phase?.instruction || game.description)}</p><p>${['memory', 'association'].includes(game.id) ? 'Encontre todos os pares do tabuleiro.' : 'São três desafios. Você decide quando continuar.'} A ajuda fica disponível durante toda a atividade.</p><div class="actions"><button id="start-activity">${phase ? 'Começar fase' : 'Começar atividade'}</button><a class="button secondary" href="${mapRoute(game.id)}">Ver fases</a><a class="button secondary" href="#/inicio">Voltar ao início</a></div></section>`;
  app.querySelector('#start-activity').addEventListener('click', async event => {
    const start = event.currentTarget;
    if (start.disabled) return;
    start.disabled = true;
    start.textContent = 'Preparando atividade…';
    try { await ensureGameAssets(); }
    catch {
      if (start.isConnected) { unavailable('Não foi possível carregar as imagens. Volte ao mapa e tente novamente.', game); finishView(); }
      return;
    }
    if (!start.isConnected) return;
    let chosen = phase;
    if (!chosen) {
      const progress = getProgress(), level = getGameLevel(progress, game.id);
      const previous = progress.sessions.filter(s => s.gameId === game.id && s.mode === 'free').at(-1)?.contentIds || [];
      const available = getGamePhases(game.id).filter(p => p.level === level);
      chosen = shuffle(available.filter(p => !p.contentRefs.some(ref => previous.includes(ref))))[0] || available[0];
    }
    const content = getPhaseContent(chosen);
    if (content.length !== (chosen.unit === 'board' ? 1 : 3)) { unavailable('O conteúdo desta atividade não está disponível.', game); return; }
    const context = { phase, phaseId: phase?.id || null, phaseTotal: getGamePhases(game.id).length,
      mode: trainingRef ? 'daily' : phase ? 'phase' : 'free', trainingRef, content, preferences: getPreferences() };
    active = startGameSession(app, game, context, engines[game.id], result => { active = null; renderResult(game, phase, result); },
      () => { active = null; navigate('#/inicio'); }, () => { active = null; openIntro(game, phase, trainingRef); finishView(); });
    if (!active) unavailable('Esta atividade não pode ser iniciada. Volte ao mapa para continuar.', game);
  });
  finishView();
}
function renderResult(game, phase, session) {
  screen('Atividade concluída', 'atividades', true);
  const record = phase ? getProgress().phaseProgress[game.id]?.[phase.ordinal] : null;
  const next = phase ? getGamePhases(game.id).find(p => p.ordinal === phase.ordinal + 1) : null;
  const plan = session.trainingRef ? getDailyPlan(session.trainingRef.dateKey) : null;
  const count = plan?.slots.filter(s => s.completedSessionId).length || 0;
  app.innerHTML = `<section class="activity-card result-card"><h1>Atividade concluída!</h1><p>Muito bem por chegar até aqui.</p>${phase ? `<p>Fase ${phase.ordinal} de ${getGamePhases(game.id).length} · ${esc(phase.title)}</p>` : '<p>Prática livre</p>'}<p class="result-stars" aria-label="${session.stars} estrelas recebidas"><span aria-hidden="true">${'★'.repeat(session.stars)}</span></p>${record ? `<p>Melhor resultado desta fase: ${record.bestStars} de 3 estrelas.</p>` : ''}${plan ? `<p>${count === 5 ? 'Parabéns! Você concluiu o treino de hoje.' : `Atividade ${count} de 5 concluída.`}</p>` : phase && !next ? '<p>Parabéns! Você concluiu todas as fases deste jogo.</p>' : ''}<div class="actions"><button id="result-next">${plan ? count === 5 ? 'Escolher outra atividade' : 'Próxima atividade' : phase ? next ? 'Próxima fase' : 'Ver fases' : 'Praticar novamente'}</button>${!plan && phase ? '<button class="secondary" id="repeat-phase">Repetir fase</button>' : ''}<a class="button secondary" href="${mapRoute(game.id)}">Ver fases</a><a class="button secondary" href="#/atividades">Escolher outra atividade</a><a class="button secondary" href="#/inicio">Voltar ao início</a></div></section>`;
  app.querySelector('#result-next').addEventListener('click', () => {
    if (plan) {
      if (count === 5) navigate('#/atividades');
      else { dailyDate = session.trainingRef.dateKey; renderTraining(); finishView(); }
    } else if (phase) navigate(next ? phaseRoute(game, next) : mapRoute(game.id));
    else { openIntro(game); }
  });
  app.querySelector('#repeat-phase')?.addEventListener('click', () => { openIntro(game, phase); });
  finishView();
}
function renderStorageStatus() {
  const node = document.getElementById('storage-status'), status = getStorageStatus();
  node.hidden = !status.issue && !status.preferenceIssue;
  const message = status.issue === 'protected' ? 'Não foi possível ler o progresso salvo. O original foi preservado; você pode continuar temporariamente. A exclusão fica em Ajustes.'
    : status.issue === 'reset-failed' ? 'Não foi possível apagar o progresso salvo.'
    : status.issue ? 'Seu progresso está disponível nesta sessão, mas não foi possível salvá-lo neste navegador.' : '';
  node.innerHTML = `${message ? `<p>${message}</p>` : ''}${status.preferenceIssue ? `<p>${status.preferenceIssue}</p>` : ''}${status.issue && !status.protectedProgress ? '<button id="retry-save">Tentar salvar novamente</button>' : ''}`;
  node.querySelector('#retry-save')?.addEventListener('click', retrySave);
}
function renderRoute() {
  active?.destroy(); active = null;
  const route = location.hash.replace(/^#\/?/, '') || 'inicio';
  if (route === 'inicio') { dailyDate = null; renderHome(); }
  else if (route === 'atividades') renderActivities();
  else if (route === 'evolucao') renderEvolution();
  else if (route === 'ajustes') renderSettings();
  else if (route === 'treino') renderTraining();
  else {
    const parts = route.split('/'), game = gameFor(parts[1]);
    if (parts[0] !== 'jogo' || !game) unavailable('Não encontramos esta página.');
    else if (parts.length === 3 && parts[2] === 'fases') openPhaseMap(game);
    else if (parts.length === 2) openIntro(game);
    else if (parts.length === 4 && parts[2] === 'fase') {
      const phase = getPhase(parts[3]);
      if (!phase || phase.gameId !== game.id) unavailable('Esta fase não está disponível.', game); else openIntro(game, phase);
    } else unavailable('Não encontramos esta página.', game);
  }
  finishView();
  if (route === 'atividades' && returnCard) { app.querySelector(`[data-game="${returnCard}"]`)?.focus(); returnCard = ''; }
}
window.addEventListener('hashchange', () => {
  if (restoringHistory) {
    const pending = restoringHistory;
    restoringHistory = null;
    active?.requestExit(() => {
      active = null;
      // Restore the actual destination entry; cancellation never rewrites history.
      history.go(pending.delta);
    });
    return;
  }
  let destinationIndex = history.state?.reconectaIndex;
  if (!Number.isInteger(destinationIndex)) {
    destinationIndex = historyIndex + 1;
    history.replaceState({ ...history.state, reconectaIndex: destinationIndex }, '', location.href);
  }
  if (active?.isActive()) {
    const delta = destinationIndex - historyIndex;
    if (delta) {
      restoringHistory = { delta };
      history.go(-delta);
    }
  } else {
    historyIndex = destinationIndex;
    renderRoute();
  }
});
window.addEventListener('storage-status', renderStorageStatus);
navLinks.forEach((link, index) => link.insertAdjacentHTML('afterbegin', renderIcon(['situations', 'memory', 'sequence', 'routine'][index])));
getProgress(); applyPreferences(); renderRoute(); renderStorageStatus();
export { app, renderHome };
