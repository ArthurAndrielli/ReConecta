import { escapeHTML } from '../utils/dom.js';

export function showDialog({ title, text = '', actions }) {
  const trigger = document.activeElement;
  const dialog = document.createElement('dialog');
  dialog.setAttribute('aria-labelledby', 'dialog-title');
  dialog.setAttribute('aria-describedby', 'dialog-description');
  dialog.innerHTML = `<h2 id="dialog-title">${escapeHTML(title)}</h2><p id="dialog-description">${escapeHTML(text)}</p><div class="actions">${actions.map((action, i) => `<button data-action="${i}" class="${action.danger ? 'danger' : i ? 'secondary' : ''}">${escapeHTML(action.label)}</button>`).join('')}</div>`;
  document.body.append(dialog);
  return new Promise(resolve => {
    let closed = false;
    const close = value => { if (closed) return; closed = true; dialog.close(); dialog.remove(); if (trigger?.isConnected) trigger.focus(); resolve(value); };
    dialog.querySelectorAll('[data-action]').forEach(button => button.addEventListener('click', () => close(actions[Number(button.dataset.action)].value)));
    dialog.addEventListener('cancel', event => { event.preventDefault(); close(actions[0].value); });
    dialog.showModal();
    dialog.querySelector('button').focus();
  });
}
