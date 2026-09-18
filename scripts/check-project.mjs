import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, dirname, relative } from 'node:path';
import { execFileSync } from 'node:child_process';
import { JSDOM, VirtualConsole } from 'jsdom';
import assert from 'node:assert/strict';

const root = resolve(import.meta.dirname, '..');
async function filesIn(directory) {
  return (await Promise.all((await readdir(directory, { withFileTypes: true })).map(entry =>
    entry.isDirectory() ? filesIn(resolve(directory, entry.name)) : resolve(directory, entry.name)))).flat();
}
const files = [resolve(root, 'index.html'), ...(await filesIn(resolve(root, 'src'))).filter(path => !path.endsWith('.gitkeep'))];
let bytes = 0, imports = 0, scripts = 0;
for (const path of files) {
  const text = await readFile(path, 'utf8'); bytes += (await stat(path)).size;
  if (/\.(js|mjs)$/.test(path)) {
    execFileSync(process.execPath, ['--check', path]); scripts++;
    for (const [, ref] of text.matchAll(/(?:from\s+|import\s*)['"](\.[^'"]+)['"]/g)) {
      assert.ok((await stat(resolve(dirname(path), ref))).isFile(), `${path}: ${ref}`); imports++;
    }
  }
}
const errors = [];
const console = new VirtualConsole();
console.on('jsdomError', error => errors.push(error.message));
const dom = new JSDOM('<!doctype html><head></head><body></body>', { virtualConsole: console });
const css = await readFile(resolve(root, 'src/css/style.css'), 'utf8');
const style = dom.window.document.createElement('style'); style.textContent = css; dom.window.document.head.append(style);
assert.deepEqual(errors, [], 'CSS parse errors');
const tokens = {};
for (const rule of style.sheet.cssRules) {
  if (rule.selectorText === ':root') for (let i = 0; i < rule.style.length; i++) { const name = rule.style.item(i); if (name.startsWith('--')) tokens[name] = rule.style.getPropertyValue(name).trim(); }
}
function luminance(hex) {
  const parts = hex.replace('#', '').match(/../g).map(value => parseInt(value, 16) / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
  return parts[0] * .2126 + parts[1] * .7152 + parts[2] * .0722;
}
function ratio(a, b) { const l = [luminance(a), luminance(b)].sort((a, b) => b - a); return (l[0] + .05) / (l[1] + .05); }
let minimum = Infinity;
for (const theme of ['light', 'dark']) {
  if (theme === 'dark') for (const rule of style.sheet.cssRules) if (rule.selectorText === 'html[data-appearance="dark"]') {
    for (let i = 0; i < rule.style.length; i++) { const name = rule.style.item(i); if (name.startsWith('--')) tokens[name] = rule.style.getPropertyValue(name).trim(); }
  }
  const pairs = [
    ['--color-text', '--color-bg'], ['--color-text', '--color-surface'], ['--color-text-muted', '--color-surface-soft'],
    ['--color-on-primary', '--color-primary'], ['--color-on-primary', '--color-primary-hover'], ['--color-on-primary', '--color-primary-active'],
    ['--color-primary-strong', '--color-surface'], ['--color-primary-strong', '--color-primary-soft'],
    ['--color-primary-strong', '--color-navigation-active'], ['--color-text', '--color-navigation-active'],
    ['--color-on-hero', '--color-hero'], ['--color-hero-muted', '--color-hero'],
    ['--color-on-highlight', '--color-highlight'], ['--color-success', '--color-success-soft'],
    ['--color-text', '--color-surface-soft'], ['--color-text-muted', '--color-bg'],
    ['--color-text-muted', '--color-surface'], ['--color-primary-strong', '--color-bg'],
    ['--color-help', '--color-help-soft'], ['--color-danger', '--color-danger-soft'],
    ...['memoria', 'linguagem', 'atencao', 'raciocinio', 'associacao', 'cotidiano'].map(id => [`--category-${id}-fg`, `--category-${id}-bg`]),
    ...['memory', 'seen', 'word', 'image', 'odd', 'sequence', 'routine', 'find', 'tap', 'association', 'situations', 'sentence']
      .flatMap(id => [
        [`--game-${id}-ink`, `--game-${id}-bg`], [`--game-${id}-ink`, `--game-${id}-soft`],
        [`--game-${id}-ink`, '--color-surface'], [`--game-${id}-accent`, '--color-surface']
      ])
  ];
  for (const [foreground, background] of pairs) {
    const contrast = ratio(tokens[foreground], tokens[background]);
    assert.ok(contrast >= 4.5, `${theme}: ${foreground}/${background}: ${contrast}`);
    minimum = Math.min(minimum, contrast);
  }
  for (const [foreground, background] of [
    ['--color-control-border', '--color-surface'], ['--color-focus', '--color-surface'],
    ['--color-focus', '--color-bg'], ['--color-control-border', '--color-surface-soft']
  ]) {
    assert.ok(ratio(tokens[foreground], tokens[background]) >= 3, `${theme}: control/focus contrast ${foreground}/${background}`);
  }
}
process.stdout.write(`Project checks: ${scripts} scripts, ${imports} import references, valid CSS.\nProduction files: ${bytes} bytes. Minimum checked token contrast: ${minimum.toFixed(2)}:1.\nThis is not a browser rendering/accessibility audit.\n`);
