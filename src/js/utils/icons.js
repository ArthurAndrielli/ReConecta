export function renderIcon(name, label = '') {
  const accessible = label ? ` role="img" aria-label="${label}"` : ' aria-hidden="true"';
  return `<svg class="icon" viewBox="0 0 24 24"${accessible} focusable="false"><use href="./src/assets/icons.svg#${name}"></use></svg>`;
}
