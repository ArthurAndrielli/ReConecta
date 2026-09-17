import { renderChoices } from './choice.js';
import { escapeHTML } from '../utils/dom.js';
export function render(container, callbacks, { content: round }) {
  return renderChoices(container, callbacks, round, { prefix: `<p class="sentence-prompt">${escapeHTML(round.sentence.replace('___', '______'))}</p>`,
    success: round.sentence.replace('___', round.answer) });
}
