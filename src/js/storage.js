const STORAGE_KEY = 'reconecta_progress';
const initialProgress = () => ({ atividades: 0, acertos: 0, erros: 0, tentativas: 0, tempoRespostaTotal: 0, estrelas: 0 });

function getProgress() {
  try { return { ...initialProgress(), ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') }; }
  catch { return initialProgress(); }
}
function saveProgress(progress) { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); }
function updateProgress(field) { const progress = getProgress(); progress[field] += 1; saveProgress(progress); return progress; }
function registerCorrect() { return updateProgress('acertos'); }
function registerWrong() { return updateProgress('erros'); }
function registerActivity({ elapsedTime = 0 } = {}) { const progress = updateProgress('atividades'); progress.tempoRespostaTotal += Number.isFinite(elapsedTime) ? Math.max(0, elapsedTime) : 0; saveProgress(progress); return progress; }
function registerAttempt() { return updateProgress('tentativas'); }
function resetProgress() { if (!window.confirm('Tem certeza que deseja apagar o progresso desta versão de teste?')) return false; saveProgress(initialProgress()); return true; }
export { getProgress, saveProgress, registerCorrect, registerWrong, registerActivity, registerAttempt, resetProgress };
