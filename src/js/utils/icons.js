export function renderIcon(name, label = '') {
  const accessible = label ? ` role="img" aria-label="${label}"` : ' aria-hidden="true"';
  return `<svg class="icon" viewBox="0 0 24 24"${accessible} focusable="false"><use href="./src/assets/icons.svg#${name}"></use></svg>`;
}

export function renderGameCardIcon(name) {
  return `<svg class="icon game-card-art" viewBox="0 0 96 96" aria-hidden="true" focusable="false"><use href="./src/assets/game-card-icons.svg#${name}"></use></svg>`;
}
