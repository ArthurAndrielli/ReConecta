export function calculateStars({ completed = false, errors = 0 } = {}) {
  if (!completed) return 0;
  if (errors === 0) return 3;
  if (errors <= 2) return 2;
  return 1;
}
