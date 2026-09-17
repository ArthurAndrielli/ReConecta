import { GAME_IDS, phaseCatalog } from './catalog.js';
import { phaseBoards, phaseRounds } from './content.js';
import { objectById } from './objects.js';

const normalized = text => String(text).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim();
const canonical = values => [...values].map(normalized).sort();
const unique = values => Array.isArray(values) && new Set(values).size === values.length;
export function semanticSignature(item) {
  switch (item.gameId) {
    case 'memory': return JSON.stringify(canonical(item.items));
    case 'association': return JSON.stringify(item.pairs.map(pair => pair.map(normalized).join('=')).sort());
    case 'word': return normalized(item.word);
    case 'image': return `${item.direction}:${item.assetId}`;
    case 'sequence': return JSON.stringify([item.sequence, item.answer]);
    case 'routine': return JSON.stringify(canonical(item.steps));
    case 'situations': return normalized(item.prompt);
    case 'sentence': return normalized(item.sentence);
    case 'odd': return JSON.stringify([item.category, canonical(item.options)]);
    case 'tapOnly': return JSON.stringify([item.category, canonical(item.options), canonical(item.targets)]);
    case 'whatDidYouSee': return JSON.stringify([canonical(item.items), item.answer]);
    default: return JSON.stringify([item.answer, canonical(item.options)]);
  }
}
export function validatePhaseCatalog(phases = phaseCatalog, sources = { boards: phaseBoards, rounds: phaseRounds }) {
  const errors = [], seen = new Set(), signatures = new Set(), used = new Set();
  let boardCount = 0, roundCount = 0;
  const fail = (id, text) => errors.push(`${id}: ${text}`);
  for (const phase of phases) {
    const id = phase?.id || '(sem ID)';
    if (!phase || typeof phase !== 'object') { fail(id, 'definição inválida'); continue; }
    if (seen.has(id)) fail(id, 'ID duplicado'); seen.add(id);
    if (!GAME_IDS.includes(phase.gameId)) fail(id, 'jogo inválido');
    if (!Number.isInteger(phase.ordinal) || phase.ordinal < 1 || phase.ordinal > 20) fail(id, 'ordinal inválido');
    if (phase.block !== Math.ceil(phase.ordinal / 5) || phase.level !== phase.block) fail(id, 'bloco/nível incompatível');
    if (!Number.isInteger(phase.contentVersion) || phase.contentVersion < 1 || ![phase.title, phase.instruction, phase.hint].every(v => typeof v === 'string' && v.trim())) fail(id, 'contrato incompleto');
    const board = ['memory', 'association'].includes(phase.gameId);
    if (phase.unit !== (board ? 'board' : 'rounds')) fail(id, 'unidade incompatível');
    if (!unique(phase.contentRefs) || phase.contentRefs.length !== (board ? 1 : 3)) { fail(id, 'referências incompatíveis'); continue; }
    for (const ref of phase.contentRefs) {
      const item = (board ? sources.boards : sources.rounds)[ref];
      if (!item || item.id !== ref || item.gameId !== phase.gameId || item.level !== phase.level) { fail(ref, 'referência ausente/incompatível'); continue; }
      if (used.has(ref)) fail(ref, 'conteúdo reutilizado'); used.add(ref);
      board ? boardCount++ : roundCount++;
      if (!item.hint?.trim() || /outra opção|outra escolha|desafio \d+ da fase/i.test(JSON.stringify(item))) fail(ref, 'conteúdo provisório/incompleto');
      const level = phase.level - 1;
      try {
        const signature = `${phase.gameId}:${semanticSignature(item)}`;
        if (signatures.has(signature)) fail(ref, 'clone semântico'); signatures.add(signature);
        const images = values => { for (const value of values) if (!objectById[value]) fail(ref, `imagem inexistente: ${value}`); };
        if (item.options && (!unique(item.options) || item.options.some(v => typeof v !== 'string' || !v.trim()))) fail(ref, 'alternativas inválidas');
        if (item.answer !== undefined && item.options.filter(o => o === item.answer).length !== 1) fail(ref, 'resposta ausente/duplicada');
        switch (phase.gameId) {
          case 'memory':
            if (!unique(item.items) || item.items.length !== [2, 3, 4, 6][level]) fail(ref, 'pares incorretos');
            images(item.items); break;
          case 'association':
            if (item.pairs.length !== [2, 3, 4, 5][level] || !unique(item.pairs.map(p => p[0])) || !unique(item.pairs.map(p => p[1])) || item.pairs.some(p => p.length !== 2 || p.some(v => !v.trim()))) fail(ref, 'associação não unívoca');
            break;
          case 'word':
            images([item.assetId]);
            if (item.syllables.join('') !== item.word || item.word !== objectById[item.assetId]?.label.toLocaleUpperCase('pt-BR')) fail(ref, 'sílabas/resposta incompatíveis');
            if ((level < 3 && item.syllables.length !== [2, 3, 4][level]) || (level === 3 && ![4, 5].includes(item.syllables.length))) fail(ref, 'quantidade de sílabas incorreta');
            if (level < 3 ? item.distractors.length !== 0 : item.distractors.length < 1 || item.distractors.length > 2) fail(ref, 'distratores incorretos');
            break;
          case 'whatDidYouSee':
            images([...item.items, ...item.options]);
            if (!unique(item.items) || item.items.length !== [2, 3, 4, 5][level] || item.options.length !== [2, 3, 4, 4][level]
              || item.options.filter(o => item.items.includes(o)).length !== 1 || !item.items.includes(item.answer)) fail(ref, 'observação ambígua/quantidade incorreta');
            break;
          case 'image':
            images([item.assetId, ...item.options]);
            if (!['wordToImage', 'imageToWord'].includes(item.direction) || item.answer !== item.assetId || item.options.length !== [2, 3, 4, 4][level]) fail(ref, 'imagem/palavra incompatível');
            break;
          case 'odd':
            images(item.options);
            if (item.options.length !== 4 || item.options.filter(o => objectById[o]?.category === item.category).length !== 3 || objectById[item.answer]?.category === item.category) fail(ref, 'intruso ambíguo');
            break;
          case 'tapOnly':
            images(item.options);
            if (item.options.length !== [4, 6, 8, 9][level] || !unique(item.targets) || item.targets.length !== [2, 3, 3, 4][level]
              || !item.targets.every(o => item.options.includes(o)) || item.options.some(o => (objectById[o]?.category === item.category) !== item.targets.includes(o))) fail(ref, 'categoria/alvos incompatíveis');
            break;
          case 'findObject':
            images(item.options); if (item.options.length !== [4, 6, 8, 9][level]) fail(ref, 'quantidade incorreta'); break;
          case 'routine':
            if (item.steps.length !== [3, 4, 5, 6][level] || !unique(item.steps) || !item.acceptedOrders.length || item.acceptedOrders.some(order => JSON.stringify(canonical(order)) !== JSON.stringify(canonical(item.steps)))) fail(ref, 'ordem inválida');
            break;
          case 'sequence':
            if (item.options.length !== [2, 3, 3, 4][level]) fail(ref, 'quantidade incorreta');
            if (item.rule.type === 'cycle') {
              images([...item.sequence, ...item.options]);
              const pattern = item.rule.pattern;
              if (item.sequence.length < pattern.length * 2 || item.sequence.some((v, i) => v !== pattern[i % pattern.length]) || item.answer !== pattern[item.sequence.length % pattern.length]) fail(ref, 'padrão inconsistente');
            } else if (item.rule.type === 'addition') {
              if (item.sequence.some((v, i) => Number(v) !== item.rule.start + item.rule.step * i) || Number(item.answer) !== item.rule.start + item.rule.step * item.sequence.length) fail(ref, 'regra numérica inconsistente');
            } else fail(ref, 'regra desconhecida');
            break;
          case 'sentence':
            if (item.sentence.split('___').length !== 2) fail(ref, 'lacuna inválida');
            // falls through
          case 'situations':
            if (item.options.length !== [2, 3, 3, 4][level]) fail(ref, 'alternativas incorretas'); break;
        }
      } catch { fail(ref, 'estrutura de conteúdo inválida'); }
    }
  }
  for (const gameId of GAME_IDS) {
    const definitions = phases.filter(p => p?.gameId === gameId);
    if (definitions.length !== 20 || new Set(definitions.map(p => p.ordinal)).size !== 20) fail(gameId, 'esperadas 20 fases sem lacunas');
  }
  if (boardCount !== 40 || roundCount !== 600) fail('banco', `esperados 40 tabuleiros e 600 rodadas; encontrados ${boardCount}/${roundCount}`);
  return { valid: errors.length === 0, errors, total: phases.length, boards: boardCount, rounds: roundCount };
}
