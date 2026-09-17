import { phaseCatalog } from './catalog.js';
import { validatePhaseCatalog } from './validate.js';
const report = validatePhaseCatalog(phaseCatalog);
if (!report.valid) { console.error(report.errors.join('\n')); process.exit(1); }
console.log(`Banco válido: ${report.total} fases, 40 tabuleiros e 600 rodadas.`);
