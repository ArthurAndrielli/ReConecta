import { objectById } from '../phases/objects.js';
import { escapeHTML } from './dom.js';

export function picture(id, { label = true, alt } = {}) {
  const item = objectById[id];
  if (!item) return fallbackPicture('Ilustração indisponível');
  // A visible caption already names the picture, just like an <img alt="">.
  // Without a caption, the inline SVG receives the equivalent accessible name.
  const alternative = alt === undefined ? (label ? '' : item.label) : alt;
  const accessibility = alternative
    ? `role="img" aria-label="${escapeHTML(alternative)}"`
    : 'aria-hidden="true"';
  const title = alternative ? `<title>${escapeHTML(alternative)}</title>` : '';
  return `<span class="object-picture"><svg viewBox="0 0 96 96" preserveAspectRatio="xMidYMid meet" ${accessibility} focusable="false">${title}<use href="${item.asset}#${item.symbol}"></use></svg>${label ? `<span>${escapeHTML(item.label)}</span>` : ''}</span>`;
}
export function fallbackPicture(message = 'Ilustração indisponível') {
  const safe = escapeHTML(message);
  return `<span class="object-picture object-picture-fallback"><svg viewBox="0 0 96 96" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${safe}" focusable="false"><title>${safe}</title><g fill="#B9ECDF" stroke="#294C43" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><rect x="15" y="17" width="66" height="62" rx="18"/><path fill="#FFFDF6" d="M31 36h34v25H31z"/><circle fill="#FFF08A" cx="41" cy="45" r="5"/><path fill="none" d="m33 58 10-9 8 7 7-6 7 8"/></g></svg><span>${safe}</span></span>`;
}
export function option(value, visual = false) {
  return visual ? picture(value) : escapeHTML(value);
}
