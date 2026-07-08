import { useState, useCallback, useMemo, useRef } from 'react';
import { evaluatePassword } from '../utils/passwordStrength';
import { getBlockById } from '../data/blocks';

export function usePasswordBuilder() {
  const [builderBlocks, setBuilderBlocks] = useState([]);
  const lastUpdateRef = useRef(Date.now());

  const result = useMemo(() => evaluatePassword(builderBlocks), [builderBlocks]);

  const addBlock = useCallback((blockId) => {
    const block = getBlockById(blockId);
    if (!block) return;
    setBuilderBlocks((prev) => {
      lastUpdateRef.current = Date.now();
      return [...prev, { ...block, instanceId: `${block.id}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` }];
    });
  }, []);

  const removeBlock = useCallback((instanceId) => {
    setBuilderBlocks((prev) => {
      lastUpdateRef.current = Date.now();
      return prev.filter((b) => b.instanceId !== instanceId);
    });
  }, []);

  const clearAll = useCallback(() => {
    setBuilderBlocks([]);
    lastUpdateRef.current = Date.now();
  }, []);

  const moveBlock = useCallback((fromIndex, toIndex) => {
    if (fromIndex === toIndex) return;
    setBuilderBlocks((prev) => {
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      lastUpdateRef.current = Date.now();
      return next;
    });
  }, []);

  const password = useMemo(
    () => builderBlocks.map((b) => b.value).join(''),
    [builderBlocks]
  );

  const blockCount = builderBlocks.length;

  return {
    builderBlocks,
    password,
    result,
    blockCount,
    addBlock,
    removeBlock,
    clearAll,
    moveBlock,
    lastUpdateRef,
  };
}
