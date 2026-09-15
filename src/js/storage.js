const STORAGE_KEY = 'reconecta_progress';
const initialProgress = () => ({ atividades: 0, acertos: 0, erros: 0, tentativas: 0, tempoRespostaTotal: 0, estrelas: 0, nivelAtual: 1, memoria: { pares: 0, tentativas: 0, erros: 0, tempoTotal: 0 } });

function getProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const initial = initialProgress();
    return { ...initial, ...saved, memoria: { ...initial.memoria, ...(saved.memoria || {}) } };
  } catch { return initialProgress(); }
}
function saveProgress(progress) { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); }
function updateProgress(field) { const progress = getProgress(); progress[field] += 1; saveProgress(progress); return progress; }
function registerCorrect() { return updateProgress('acertos'); }
function registerWrong() { return updateProgress('erros'); }
function registerActivity({ elapsedTime = 0, stars = 1 } = {}) { const progress = updateProgress('atividades'); progress.tempoRespostaTotal += Number.isFinite(elapsedTime) ? Math.max(0, elapsedTime) : 0; progress.estrelas += Math.max(0, Number(stars) || 0); saveProgress(progress); return progress; }
function registerAttempt() { return updateProgress('tentativas'); }
function registerMemoryMetrics({ pairs = 0, attempts = 0, errors = 0, elapsedTime = 0 } = {}) { const progress = getProgress(); progress.memoria.pares += Math.max(0, Number(pairs) || 0); progress.memoria.tentativas += Math.max(0, Number(attempts) || 0); progress.memoria.erros += Math.max(0, Number(errors) || 0); progress.memoria.tempoTotal += Number.isFinite(elapsedTime) ? Math.max(0, elapsedTime) : 0; saveProgress(progress); return progress; }
function resetProgress() { if (!window.confirm('Tem certeza que deseja apagar o progresso desta versão de teste?')) return false; saveProgress(initialProgress()); return true; }
export { getProgress, saveProgress, registerCorrect, registerWrong, registerActivity, registerAttempt, registerMemoryMetrics, resetProgress };
