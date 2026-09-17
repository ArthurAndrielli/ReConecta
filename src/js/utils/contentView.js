import { objectById } from '../phases/objects.js';
import { escapeHTML } from './dom.js';

export function picture(id, { label = true, alt } = {}) {
  const item = objectById[id];
  if (!item) throw new Error('Imagem indisponível');
  // A visible caption already names the picture, just like an <img alt="">.
  // Without a caption, the inline SVG receives the equivalent accessible name.
  const alternative = alt === undefined ? (label ? '' : item.label) : alt;
  const accessibility = alternative
    ? `role="img" aria-label="${escapeHTML(alternative)}"`
    : 'aria-hidden="true"';
  const title = alternative ? `<title>${escapeHTML(alternative)}</title>` : '';
  return `<span class="object-picture"><svg viewBox="0 0 96 96" preserveAspectRatio="xMidYMid meet" ${accessibility} focusable="false">${title}<use href="${item.asset}#${item.symbol}"></use></svg>${label ? `<span>${escapeHTML(item.label)}</span>` : ''}</span>`;
}
export function option(value, visual = false) {
  return visual ? picture(value) : escapeHTML(value);
}
