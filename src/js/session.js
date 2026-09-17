import { createSession, recordSessionAttempt, finishSession, abandonSession, checkpointSession } from './storage.js';
import { showDialog } from './ui/dialog.js';
import { escapeHTML, focusHeading } from './utils/dom.js';

export function startGameSession(container, game, context, render, onResult, onExit, onRestart) {
  const session = createSession({ ...context, gameId: game.id, contentIds: context.content.map(c => c.id) });
  if (!session) return null;
  let engine = null, roundIndex = 0, elapsed = 0, started = performance.now(), paused = false, destroyed = false, finished = false;
  let serial = 0, roundSolved = false, roundErrors = 0, retry = null, dialogPending = false;
  const objectives = context.content.flatMap(content => game.id === 'memory' ? content.items.map(id => `${content.id}:${id}`)
    : game.id === 'association' ? content.pairs.map((_, i) => `${content.id}:${i}`)
    : game.id === 'tapOnly' ? content.targets.map(id => `${content.id}:${id}`) : [content.id]);
  const activeTime = () => elapsed + (paused || finished || destroyed ? 0 : performance.now() - started);
  const message = (text, type = '') => {
    const feedback = container.querySelector('#feedback');
    if (feedback) { feedback.textContent = text; feedback.dataset.type = type; }
  };
  function pause() {
    if (paused || destroyed || finished) return;
    elapsed = activeTime(); paused = true; engine?.pause?.();
    container.querySelector('#game-interaction').inert = true;
    checkpointSession(session.id, elapsed);
  }
  function resume() {
    if (!paused || destroyed || finished) return;
    paused = false; started = performance.now(); container.querySelector('#game-interaction').inert = false; engine?.resume?.();
  }
  async function requestExit(action = onExit) {
    if (destroyed || finished || dialogPending) return false;
    const wasPaused = paused; pause(); dialogPending = true;
    const choice = await showDialog({ title: 'Sair da atividade?', text: 'Suas tentativas serão mantidas. Ao voltar, você recomeçará esta atividade. Uma atividade interrompida não recebe estrelas.',
      actions: [{ label: 'Continuar atividade', value: false }, { label: 'Sair da atividade', value: true }] });
    dialogPending = false;
    if (choice) { abandonSession(session.id, elapsed); destroy(); action(); return true; }
    if (!wasPaused) resume();
    return false;
  }
  async function pauseDialog() {
    if (dialogPending || destroyed || finished) return;
    pause(); dialogPending = true;
    const choice = await showDialog({ title: 'Atividade pausada', text: 'Continue quando estiver pronto.',
      actions: [{ label: 'Continuar atividade', value: 'resume' }, { label: 'Sair da atividade', value: 'exit' }] });
    dialogPending = false;
    if (choice === 'exit') { const left = await requestExit(); if (!left && !destroyed) pauseDialog(); }
    else resume();
  }
  function mountRound() {
    engine?.destroy?.(); roundSolved = false; roundErrors = 0; retry = null;
    const content = context.content[roundIndex];
    container.innerHTML = `<section class="activity-card"><div class="game-toolbar"><button class="secondary" id="back-home">Voltar ao início</button><button class="secondary" id="pause-game">Pausar</button></div><h1>${escapeHTML(game.name)}</h1><p class="eyebrow">${context.phase ? `Fase ${context.phase.ordinal} de ${context.phaseTotal} · ${escapeHTML(context.phase.title)}` : 'Prática livre'}${context.mode === 'daily' ? ' · Treino de Hoje' : ''}</p><div id="game-interaction"><p class="stage-progress">${context.content.length === 3 ? `Etapa ${roundIndex + 1} de 3` : 'Encontre todos os pares'}</p><h2 class="game-command" data-command>${escapeHTML(content.prompt || context.phase?.instruction || game.description)}</h2><div id="game-board"></div><p id="feedback" class="feedback" role="status" aria-atomic="true"></p><div class="actions"><button id="continue-round" hidden>Continuar</button><button id="retry-round" hidden>Tentar novamente</button><button class="secondary" id="hint">Preciso de uma dica</button><button class="secondary" id="restart">Recomeçar atividade</button></div></div></section>`;
    const isActive = () => !paused && !destroyed && !finished;
    engine = render(container.querySelector('#game-board'), {
      isActive, message,
      onAttempt(correct, objectiveId) {
        if (!isActive() || roundSolved) return false;
        const accepted = recordSessionAttempt(session.id, { id: `${session.id}:${++serial}`, challengeId: content.id, objectiveId, correct }, activeTime());
        if (!correct && accepted) { roundErrors++; if (roundErrors >= 2) container.querySelector('#hint').classList.add('hint-available'); }
        return accepted;
      },
      onRetry(callback, label = 'Tentar novamente') {
        if (!isActive()) return;
        retry = callback; message(roundErrors >= 2 ? 'Vamos tentar novamente. Você também pode pedir uma dica.' : 'Vamos tentar novamente.', 'help');
        const button = container.querySelector('#retry-round'); button.hidden = false; button.textContent = label; button.focus();
      },
      onComplete(text = 'Muito bem! Você conseguiu.') {
        if (!isActive() || roundSolved) return;
        roundSolved = true; message(text, 'success');
        const button = container.querySelector('#continue-round');
        button.hidden = false; button.textContent = roundIndex === context.content.length - 1 ? 'Ver resultado' : 'Continuar'; button.focus();
      }
    }, { content, level: session.level, preferences: context.preferences });
    container.querySelector('#hint').addEventListener('click', () => { if (isActive()) { engine?.hint?.(); message(content.hint, 'help'); } });
    container.querySelector('#retry-round').addEventListener('click', () => {
      if (!isActive() || !retry) return;
      const callback = retry; retry = null; container.querySelector('#retry-round').hidden = true; callback();
    });
    container.querySelector('#continue-round').addEventListener('click', () => {
      if (!isActive() || !roundSolved) return;
      if (roundIndex < context.content.length - 1) { roundIndex++; mountRound(); return; }
      elapsed = activeTime();
      const result = finishSession(session.id, { elapsedMs: elapsed, objectives });
      if (!result) { message('Não foi possível concluir. Volte ao mapa para recomeçar.', 'help'); return; }
      finished = true; destroy(); onResult(result);
    });
    container.querySelector('#back-home').addEventListener('click', () => requestExit());
    container.querySelector('#restart').addEventListener('click', () => requestExit(onRestart));
    container.querySelector('#pause-game').addEventListener('click', pauseDialog);
    focusHeading(container);
  }
  function destroy() {
    if (destroyed) return;
    destroyed = true; engine?.destroy?.();
    document.removeEventListener('visibilitychange', visibility);
    window.removeEventListener('pagehide', pagehide);
    window.removeEventListener('beforeunload', beforeunload);
  }
  const visibility = () => { if (document.hidden) pauseDialog(); };
  const pagehide = () => { if (!finished && !destroyed) abandonSession(session.id, activeTime()); destroy(); };
  const beforeunload = () => { if (!finished && !destroyed) checkpointSession(session.id, activeTime()); };
  document.addEventListener('visibilitychange', visibility);
  window.addEventListener('pagehide', pagehide);
  window.addEventListener('beforeunload', beforeunload);
  mountRound();
  return { requestExit, destroy, session, isActive: () => !destroyed && !finished };
}
