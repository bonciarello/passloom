import { useCallback, useState } from 'react';
import Block from './Block';

export default function BuilderArea({ builderBlocks, onDrop, onRemove, onClear }) {
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      try {
        const data = JSON.parse(e.dataTransfer.getData('text/plain'));
        onDrop(data);
      } catch {
        // Ignore invalid drops
      }
    },
    [onDrop]
  );

  return (
    <div className="builder" aria-label="Area di costruzione password">
      <div className="builder__header">
        <h2 className="builder__title">Il tuo telaio</h2>
        {builderBlocks.length > 0 && (
          <button className="builder__clear" onClick={onClear} aria-label="Rimuovi tutti i blocchi">
            Svuota tutto
          </button>
        )}
      </div>
      <div
        className={`builder__dropzone${dragOver ? ' builder__dropzone--active' : ''}${builderBlocks.length === 0 ? ' builder__dropzone--empty' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="region"
        aria-label="Area di costruzione. Trascina qui i blocchi per comporre la password."
        aria-live="polite"
      >
        {builderBlocks.length === 0 ? (
          <div className="builder__placeholder">
            <span className="builder__placeholder-icon" aria-hidden="true">🧵</span>
            <p>Trascina qui i blocchi per tessere la tua password</p>
          </div>
        ) : (
          <div className="builder__blocks">
            {builderBlocks.map((block, index) => (
              <Block
                key={block.instanceId}
                block={block}
                isInBuilder
                dragIndex={index}
                onRemove={onRemove}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
