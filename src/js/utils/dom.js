export const escapeHTML = (value) => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
export const localDateKey = (date = new Date()) => [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
export function focusHeading(root) { const title = root.querySelector('h1, h2, [data-command]'); if (title) { title.tabIndex = -1; title.focus({ preventScroll: true }); } }
