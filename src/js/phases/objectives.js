export function objectivesFor(content) {
  return content.flatMap(item => item.gameId === 'memory' ? item.items.map(id => `${item.id}:${id}`)
    : item.gameId === 'association' ? item.pairs.map((_, i) => `${item.id}:${i}`)
    : item.gameId === 'tapOnly' ? item.targets.map(id => `${item.id}:${id}`) : [item.id]);
}
