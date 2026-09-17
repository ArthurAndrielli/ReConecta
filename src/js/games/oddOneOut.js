import { renderChoices } from './choice.js';
export function render(container, callbacks, { content }) { return renderChoices(container, callbacks, content, { visual: true, success: 'Muito bem! Você encontrou o item que não pertence ao grupo indicado.' }); }
