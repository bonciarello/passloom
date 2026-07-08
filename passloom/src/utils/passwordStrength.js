/**
 * Valutazione della forza di una password.
 * Restituisce un oggetto con: score (0-100), level ('debole'|'media'|'forte'),
 * label, color, e un array di suggerimenti.
 */

const SUGGESTIONS = {
  tooShort: 'Aggiungi più blocchi: una password più lunga è più sicura.',
  noVariety: 'Combina blocchi di tipo diverso (parole, numeri, simboli, maiuscole).',
  addNumbers: 'Aggiungi almeno un blocco di numeri per aumentare la sicurezza.',
  addSymbols: 'Aggiungi un simbolo come ! @ # per rendere la password più robusta.',
  addUppercase:
    'Inserisci un blocco in maiuscolo: le lettere grandi rendono la password più difficile da indovinare.',
  noLowerCase: 'Assicurati di includere almeno qualche lettera minuscola.',
  commonPattern: 'Evita sequenze troppo prevedibili; mescola meglio i blocchi.',
  excellent: 'Ottimo lavoro! La tua password è molto sicura.',
};

export function evaluatePassword(blocks) {
  if (!blocks || blocks.length === 0) {
    return {
      score: 0,
      level: 'nessuna',
      label: 'Nessuna password',
      color: '#CBD5E1',
      suggestions: ['Inizia trascinando dei blocchi dal pannello qui sopra.'],
    };
  }

  const password = blocks.map((b) => b.value).join('');
  const uniqueTypes = new Set(blocks.map((b) => b.type));
  const typeCount = uniqueTypes.size;
  const length = password.length;

  // Punteggio base dalla lunghezza (max 30 punti)
  let score = Math.min(length * 2.5, 30);

  // Bonus varietà di tipi (max 40 punti)
  score += typeCount * 10;

  // Bonus per tipi specifici
  const types = blocks.map((b) => b.type);
  if (types.includes('numero')) score += 8;
  if (types.includes('simbolo')) score += 10;
  if (types.includes('maiuscola')) score += 7;
  if (types.includes('parola')) score += 5;

  // Penalità per mancanza di minuscole se ci sono solo maiuscole
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasSymbol = /[^a-zA-Z0-9]/.test(password);

  if (!hasLower && hasUpper) score -= 5;

  // Penalità per pattern comuni (sequenze prevedibili)
  const commonPatterns = [
    /123/,
    /abc/i,
    /qwerty/i,
    /password/i,
    /admin/i,
  ];
  for (const pattern of commonPatterns) {
    if (pattern.test(password)) {
      score -= 10;
      break;
    }
  }

  // Clamp
  score = Math.max(0, Math.min(100, score));

  // Determina livello
  let level, label, color;
  if (score < 35) {
    level = 'debole';
    label = 'Debole';
    color = '#EF4444';
  } else if (score < 65) {
    level = 'media';
    label = 'Media';
    color = '#F59E0B';
  } else {
    level = 'forte';
    label = 'Forte';
    color = '#10B981';
  }

  // Genera suggerimenti
  const suggestions = [];
  if (length < 8) suggestions.push(SUGGESTIONS.tooShort);
  if (typeCount < 2) suggestions.push(SUGGESTIONS.noVariety);
  if (!hasDigit) suggestions.push(SUGGESTIONS.addNumbers);
  if (!hasSymbol) suggestions.push(SUGGESTIONS.addSymbols);
  if (!hasUpper) suggestions.push(SUGGESTIONS.addUppercase);
  if (!hasLower) suggestions.push(SUGGESTIONS.noLowerCase);
  if (score >= 65 && typeCount >= 3) suggestions.push(SUGGESTIONS.excellent);

  if (suggestions.length === 0) {
    suggestions.push(SUGGESTIONS.excellent);
  }

  return {
    score,
    level,
    label,
    color,
    suggestions,
    length,
    hasLower,
    hasUpper,
    hasDigit,
    hasSymbol,
    typeCount,
  };
}
