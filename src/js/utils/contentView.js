import { objectById } from '../phases/objects.js';
import { escapeHTML } from './dom.js';

export function picture(id, { label = true } = {}) {
  const item = objectById[id];
  if (!item) throw new Error('Imagem indisponível');
  return `<span class="object-picture"><svg viewBox="0 0 96 96" role="img" aria-label="${escapeHTML(item.label)}" focusable="false"><use href="${item.asset}#${item.symbol}"></use></svg>${label ? `<span>${escapeHTML(item.label)}</span>` : ''}</span>`;
}
export function option(value, visual = false) {
  return visual ? picture(value) : escapeHTML(value);
}
