import { renderChoices } from './choice.js';
import { objectById } from '../phases/objects.js';
import { picture } from '../utils/contentView.js';
import { escapeHTML } from '../utils/dom.js';
export function render(container, callbacks, { content }) {
  const inverse = content.direction === 'wordToImage';
  return renderChoices(container, callbacks, content, {
    prefix: `<div class="word-image">${inverse ? escapeHTML(objectById[content.assetId].label) : picture(content.assetId, { label: false })}</div>`,
    visual: inverse, label: inverse ? null : id => objectById[id].label
  });
}
