import { objects } from '../phases/objects.js';
let ready;
export const GAME_ARTWORK = './src/assets/game-objects-v2.svg';
// A failed essential sprite must stop the activity, not turn into an empty answer.
export function ensureGameAssets() {
  if (!ready) ready = fetch(GAME_ARTWORK, { cache: 'no-cache' })
    .then(async response => {
      if (!response.ok) throw new Error('Imagens indisponíveis');
      const text = await response.text();
      if (!text.includes('<svg') || objects.some(item => !text.includes(`id="${item.symbol}"`))) throw new Error('Imagens inválidas');
    }).catch(error => { ready = null; throw error; });
  return ready;
}
