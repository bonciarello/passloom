/**
 * Blocchi predefiniti per il costruttore di password.
 * Ogni blocco ha: id, type (parola, maiuscola, numero, simbolo), value, label.
 */

const wordBlocks = [
  { id: 'w1', type: 'parola', value: 'sole', label: 'sole' },
  { id: 'w2', type: 'parola', value: 'luna', label: 'luna' },
  { id: 'w3', type: 'parola', value: 'cane', label: 'cane' },
  { id: 'w4', type: 'parola', value: 'libro', label: 'libro' },
  { id: 'w5', type: 'parola', value: 'mare', label: 'mare' },
  { id: 'w6', type: 'parola', value: 'albero', label: 'albero' },
  { id: 'w7', type: 'parola', value: 'nuvola', label: 'nuvola' },
  { id: 'w8', type: 'parola', value: 'ponte', label: 'ponte' },
  { id: 'w9', type: 'parola', value: 'vento', label: 'vento' },
  { id: 'w10', type: 'parola', value: 'stella', label: 'stella' },
];

const uppercaseBlocks = [
  { id: 'u1', type: 'maiuscola', value: 'ROMA', label: 'ROMA' },
  { id: 'u2', type: 'maiuscola', value: 'LUCE', label: 'LUCE' },
  { id: 'u3', type: 'maiuscola', value: 'SOLE', label: 'SOLE' },
  { id: 'u4', type: 'maiuscola', value: 'ALBA', label: 'ALBA' },
  { id: 'u5', type: 'maiuscola', value: 'NUVOLA', label: 'NUVOLA' },
  { id: 'u6', type: 'maiuscola', value: 'FUOCO', label: 'FUOCO' },
];

const numberBlocks = [
  { id: 'n1', type: 'numero', value: '42', label: '42' },
  { id: 'n2', type: 'numero', value: '007', label: '007' },
  { id: 'n3', type: 'numero', value: '1987', label: '1987' },
  { id: 'n4', type: 'numero', value: '365', label: '365' },
  { id: 'n5', type: 'numero', value: '2024', label: '2024' },
  { id: 'n6', type: 'numero', value: '99', label: '99' },
];

const symbolBlocks = [
  { id: 's1', type: 'simbolo', value: '!', label: '!' },
  { id: 's2', type: 'simbolo', value: '@', label: '@' },
  { id: 's3', type: 'simbolo', value: '#', label: '#' },
  { id: 's4', type: 'simbolo', value: '$', label: '$' },
  { id: 's5', type: 'simbolo', value: '%', label: '%' },
  { id: 's6', type: 'simbolo', value: '&', label: '&' },
  { id: 's7', type: 'simbolo', value: '*', label: '*' },
  { id: 's8', type: 'simbolo', value: '?', label: '?' },
];

export const blockCategories = [
  {
    id: 'parole',
    title: 'Parole',
    description: 'Parole comuni in minuscolo',
    color: '#5B4AE0',
    icon: 'text',
    blocks: wordBlocks,
  },
  {
    id: 'maiuscole',
    title: 'Maiuscole',
    description: 'Parole in maiuscolo',
    color: '#7C3AED',
    icon: 'case-upper',
    blocks: uppercaseBlocks,
  },
  {
    id: 'numeri',
    title: 'Numeri',
    description: 'Sequenze numeriche',
    color: '#0891B2',
    icon: 'hash',
    blocks: numberBlocks,
  },
  {
    id: 'simboli',
    title: 'Simboli',
    description: 'Caratteri speciali',
    color: '#D9468A',
    icon: 'asterisk',
    blocks: symbolBlocks,
  },
];

export const allBlocks = [
  ...wordBlocks,
  ...uppercaseBlocks,
  ...numberBlocks,
  ...symbolBlocks,
];

export function getBlockById(id) {
  return allBlocks.find((b) => b.id === id);
}
