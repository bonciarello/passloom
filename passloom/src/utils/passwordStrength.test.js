import { describe, it, expect } from 'vitest';
import { evaluatePassword } from './passwordStrength';

// Blocchi di test
const wordBlock = { id: 'w1', type: 'parola', value: 'sole' };
const uppercaseBlock = { id: 'u1', type: 'maiuscola', value: 'ROMA' };
const numberBlock = { id: 'n1', type: 'numero', value: '42' };
const symbolBlock = { id: 's1', type: 'simbolo', value: '!' };

const wordBlock2 = { id: 'w2', type: 'parola', value: 'luna' };
const numberBlock2 = { id: 'n2', type: 'numero', value: '007' };

describe('evaluatePassword', () => {
  it('restituisce "nessuna" per array vuoto', () => {
    const result = evaluatePassword([]);
    expect(result.level).toBe('nessuna');
    expect(result.score).toBe(0);
    expect(result.suggestions.length).toBeGreaterThan(0);
  });

  it('valuta come debole una password con un solo blocco parola', () => {
    const result = evaluatePassword([wordBlock]);
    expect(result.level).toBe('debole');
    expect(result.score).toBeLessThan(35);
  });

  it('valuta come media una password con due blocchi dello stesso tipo', () => {
    const result = evaluatePassword([wordBlock, wordBlock2]);
    expect(result.level).toBe('media');
  });

  it('valuta come media una password con due tipi diversi', () => {
    const result = evaluatePassword([wordBlock, numberBlock]);
    expect(result.level).toBe('media');
    expect(result.score).toBeGreaterThanOrEqual(35);
    expect(result.score).toBeLessThan(65);
  });

  it('valuta come forte una password con tre tipi diversi (criterio di accettazione 1)', () => {
    const result = evaluatePassword([wordBlock, numberBlock, symbolBlock]);
    expect(result.level).toBe('forte');
    expect(result.score).toBeGreaterThanOrEqual(65);
  });

  it('valuta come forte con tutti e quattro i tipi', () => {
    const result = evaluatePassword([wordBlock, uppercaseBlock, numberBlock, symbolBlock]);
    expect(result.level).toBe('forte');
    expect(result.score).toBeGreaterThanOrEqual(65);
  });

  it('genera suggerimenti appropriati per password debole', () => {
    const result = evaluatePassword([wordBlock]);
    expect(result.suggestions.some(s => s.includes('numeri'))).toBe(true);
    expect(result.suggestions.some(s => s.includes('simbolo'))).toBe(true);
  });

  it('genera suggerimento di eccellenza per password forte', () => {
    const result = evaluatePassword([wordBlock, numberBlock, symbolBlock, uppercaseBlock]);
    expect(result.suggestions.some(s => s.includes('Ottimo'))).toBe(true);
  });

  it('penalizza pattern comuni come "password"', () => {
    const badBlock = { id: 'b1', type: 'parola', value: 'password' };
    const result = evaluatePassword([badBlock, numberBlock]);
    // Dovrebbe avere score più basso del normale
    expect(result.score).toBeLessThan(60);
  });

  it('la lunghezza contribuisce al punteggio', () => {
    const longBlock = { id: 'l1', type: 'parola', value: 'supercalifragilistichespiralidoso' };
    const shortBlock = { id: 'sh1', type: 'parola', value: 'a' };
    const resultLong = evaluatePassword([longBlock, numberBlock, symbolBlock]);
    const resultShort = evaluatePassword([shortBlock, numberBlock, symbolBlock]);
    expect(resultLong.score).toBeGreaterThan(resultShort.score);
  });

  it('restituisce proprietà corrette', () => {
    const result = evaluatePassword([wordBlock, numberBlock, symbolBlock, uppercaseBlock]);
    expect(result).toHaveProperty('score');
    expect(result).toHaveProperty('level');
    expect(result).toHaveProperty('label');
    expect(result).toHaveProperty('color');
    expect(result).toHaveProperty('suggestions');
    expect(result).toHaveProperty('length');
    expect(result).toHaveProperty('hasLower');
    expect(result).toHaveProperty('hasUpper');
    expect(result).toHaveProperty('hasDigit');
    expect(result).toHaveProperty('hasSymbol');
    expect(result).toHaveProperty('typeCount');
  });
});
