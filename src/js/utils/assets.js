let ready;
// A failed essential sprite must stop the activity, not turn into an empty answer.
export function ensureGameAssets() {
  if (!ready) ready = fetch('./src/assets/objects.svg')
    .then(async response => {
      if (!response.ok) throw new Error('Imagens indisponíveis');
      const text = await response.text();
      if (!text.includes('id="object-60"') || !text.includes('<svg')) throw new Error('Imagens inválidas');
    }).catch(error => { ready = null; throw error; });
  return ready;
}
