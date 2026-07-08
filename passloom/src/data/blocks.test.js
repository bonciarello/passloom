import { describe, it, expect } from 'vitest';
import { allBlocks, blockCategories, getBlockById } from './blocks';

describe('blocks data', () => {
  it('contiene blocchi di tutti e quattro i tipi', () => {
    const types = new Set(allBlocks.map(b => b.type));
    expect(types.has('parola')).toBe(true);
    expect(types.has('maiuscola')).toBe(true);
    expect(types.has('numero')).toBe(true);
    expect(types.has('simbolo')).toBe(true);
  });

  it('ogni blocco ha id, type, value, label', () => {
    for (const block of allBlocks) {
      expect(block).toHaveProperty('id');
      expect(block).toHaveProperty('type');
      expect(block).toHaveProperty('value');
      expect(block).toHaveProperty('label');
      expect(typeof block.id).toBe('string');
      expect(typeof block.type).toBe('string');
      expect(typeof block.value).toBe('string');
      expect(typeof block.label).toBe('string');
    }
  });

  it('getBlockById restituisce il blocco corretto', () => {
    const block = getBlockById('w1');
    expect(block).toBeDefined();
    expect(block.type).toBe('parola');
    expect(block.value).toBe('sole');
  });

  it('getBlockById restituisce undefined per id inesistente', () => {
    const block = getBlockById('inesistente');
    expect(block).toBeUndefined();
  });

  it('blockCategories ha 4 categorie', () => {
    expect(blockCategories).toHaveLength(4);
    const ids = blockCategories.map(c => c.id);
    expect(ids).toContain('parole');
    expect(ids).toContain('maiuscole');
    expect(ids).toContain('numeri');
    expect(ids).toContain('simboli');
  });

  it('ogni categoria ha title, description, color, icon, blocks', () => {
    for (const cat of blockCategories) {
      expect(cat).toHaveProperty('id');
      expect(cat).toHaveProperty('title');
      expect(cat).toHaveProperty('description');
      expect(cat).toHaveProperty('color');
      expect(cat).toHaveProperty('icon');
      expect(cat).toHaveProperty('blocks');
      expect(Array.isArray(cat.blocks)).toBe(true);
      expect(cat.blocks.length).toBeGreaterThan(0);
    }
  });
});
