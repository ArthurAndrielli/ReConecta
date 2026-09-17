import assert from 'node:assert/strict';
import { objectById } from '../src/js/phases/objects.js';

export function button(root, label) {
  const found = [...root.querySelectorAll('button')].find(b => !b.disabled && !b.hidden && b.textContent.trim() === label);
  assert.ok(found, `Button not found: ${label}`);
  return found;
}
export function solve(root, gameId, content, retry = () => {}, wrong = false) {
  const findChoice = value => {
    const label = objectById[value]?.label || value;
    const found = [...root.querySelectorAll('button')].find(b => !b.disabled && (b.textContent.trim() === label || b.querySelector('use')?.getAttribute('href')?.endsWith('#' + value)));
    assert.ok(found, `Choice not found: ${label}`); return found;
  };
  if (gameId === 'memory') {
    const cards = [...root.querySelectorAll('[data-index]')], known = new Map();
    for (let i = 0; i < cards.length; i += 2) {
      cards[i].click(); cards[i + 1].click();
      for (const j of [i, i + 1]) {
        const href = cards[j].querySelector('use').getAttribute('href');
        const list = known.get(href) || []; list.push(j); known.set(href, list);
      }
      retry();
    }
    for (const indices of known.values()) if (!cards[indices[0]].disabled) { cards[indices[0]].click(); cards[indices[1]].click(); }
    cards[0].click();
  } else if (gameId === 'word') {
    for (const syllable of content.syllables) button(root, syllable).click();
    button(root, 'Verificar palavra').click();
  } else if (gameId === 'routine') {
    for (let i = 0; i < content.steps.length; i++) {
      let index = [...root.querySelectorAll('li > span')].findIndex(el => el.textContent === content.steps[i]);
      while (index > i) { root.querySelector(`[data-index="${index}"][data-move="-1"]`).click(); index--; }
    }
    button(root, 'Verificar ordem').click();
  } else if (gameId === 'association') {
    for (const pair of content.pairs) { button(root, pair[0]).click(); button(root, pair[1]).click(); }
  } else if (gameId === 'tapOnly') {
    if (wrong) { findChoice(content.options.find(id => !content.targets.includes(id))).click(); retry(); }
    for (const id of content.targets) { const choice = findChoice(id); choice.click(); choice.click(); }
  } else {
    if (gameId === 'whatDidYouSee') button(root, 'Já observei').click();
    if (wrong) { findChoice(content.options.find(value => value !== content.answer)).click(); retry(); }
    const choice = findChoice(content.answer); choice.click(); choice.click();
  }
}
