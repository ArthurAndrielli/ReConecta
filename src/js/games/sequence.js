import { renderChoices } from './choice.js';
import { option } from '../utils/contentView.js';
export function render(container, callbacks, { content }) {
  const visual = content.rule.type === 'cycle';
  return renderChoices(container, callbacks, content, { visual,
    prefix: `<ol class="sequence-display" aria-label="Sequência">${content.sequence.map(value => `<li>${option(value, visual)}</li>`).join('')}<li aria-label="Lacuna">?</li></ol>` });
}
