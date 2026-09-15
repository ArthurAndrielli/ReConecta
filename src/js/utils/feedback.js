import { randomChoice } from './array.js';

export const feedbackMessages = {
  correct: ['Excelente!', 'Muito bem!', 'Você conseguiu!'],
  wrong: ['Vamos tentar novamente.', 'Quase lá!', 'Tente mais uma vez.']
};

export function getFeedbackMessage(type) {
  return randomChoice(feedbackMessages[type] || feedbackMessages.correct);
}
