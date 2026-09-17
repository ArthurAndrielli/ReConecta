// Reviewed vocabulary: 15 words for each syllabic block. Art is local SVG.
const vocabulary = [
  ['casa','CA-SA','casa'], ['bola','BO-LA','lazer'], ['copo','CO-PO','utensilios'],
  ['livro','LI-VRO','estudo'], ['chave','CHA-VE','casa'], ['prato','PRA-TO','utensilios'],
  ['garfo','GAR-FO','utensilios'], ['faca','FA-CA','utensilios'], ['cama','CA-MA','moveis'],
  ['mesa','ME-SA','moveis'], ['vaso','VA-SO','casa'], ['pato','PA-TO','animais'],
  ['gato','GA-TO','animais'], ['vaca','VA-CA','animais'], ['sapo','SA-PO','animais'],
  ['banana','BA-NA-NA','alimentos'], ['sapato','SA-PA-TO','roupas'], ['panela','PA-NE-LA','utensilios'],
  ['janela','JA-NE-LA','casa'], ['cavalo','CA-VA-LO','animais'], ['tomate','TO-MA-TE','alimentos'],
  ['cenoura','CE-NOU-RA','alimentos'], ['camisa','CA-MI-SA','roupas'], ['caneta','CA-NE-TA','estudo'],
  ['tesoura','TE-SOU-RA','estudo'], ['cadeira','CA-DEI-RA','moveis'], ['mochila','MO-CHI-LA','estudo'],
  ['martelo','MAR-TE-LO','ferramentas'], ['girafa','GI-RA-FA','animais'], ['coruja','CO-RU-JA','animais'],
  ['abacaxi','A-BA-CA-XI','alimentos'], ['borboleta','BOR-BO-LE-TA','animais'], ['bicicleta','BI-CI-CLE-TA','transportes'],
  ['tartaruga','TAR-TA-RU-GA','animais'], ['geladeira','GE-LA-DEI-RA','eletros'], ['telefone','TE-LE-FO-NE','eletros'],
  ['sabonete','SA-BO-NE-TE','higiene'], ['abacate','A-BA-CA-TE','alimentos'], ['chocolate','CHO-CO-LA-TE','alimentos'],
  ['camiseta','CA-MI-SE-TA','roupas'], ['capacete','CA-PA-CE-TE','protecao'], ['travesseiro','TRA-VES-SEI-RO','casa'],
  ['televisão','TE-LE-VI-SÃO','eletros'], ['calendário','CA-LEN-DÁ-RIO','estudo'], ['envelope','EN-VE-LO-PE','estudo'],
  ['ventilador','VEN-TI-LA-DOR','eletros'], ['computador','COM-PU-TA-DOR','eletros'], ['calculadora','CAL-CU-LA-DO-RA','estudo'],
  ['aspirador','AS-PI-RA-DOR','eletros'], ['apontador','A-PON-TA-DOR','estudo'], ['apagador','A-PA-GA-DOR','estudo'],
  ['prateleira','PRA-TE-LEI-RA','moveis'], ['torradeira','TOR-RA-DEI-RA','eletros'], ['cafeteira','CA-FE-TEI-RA','eletros'],
  ['frigideira','FRI-GI-DEI-RA','utensilios'], ['batedeira','BA-TE-DEI-RA','eletros'], ['gelatina','GE-LA-TI-NA','alimentos'],
  ['limonada','LI-MO-NA-DA','alimentos'], ['melancia','ME-LAN-CI-A','alimentos'], ['helicóptero','HE-LI-CÓP-TE-RO','transportes']
];
export const objects = vocabulary.map(([label, syllables, category], index) => ({
  id: `object-${index + 1}`, label, syllables: syllables.split('-'), category,
  asset: './src/assets/objects.svg', symbol: `object-${index + 1}`
}));
export const objectById = Object.fromEntries(objects.map(item => [item.id, item]));
export const groupLabels = {
  casa: 'elementos e objetos da casa', lazer: 'objetos para brincar', utensilios: 'utensílios de cozinha',
  estudo: 'materiais de estudo e comunicação escrita', moveis: 'móveis', animais: 'animais',
  alimentos: 'alimentos e bebidas', roupas: 'peças de vestir', ferramentas: 'ferramentas',
  transportes: 'meios de transporte', eletros: 'aparelhos elétricos', higiene: 'itens de higiene', protecao: 'itens de proteção'
};
