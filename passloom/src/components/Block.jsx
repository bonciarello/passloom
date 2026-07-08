import { useCallback, useRef } from 'react';

const TYPE_ICONS = {
  parola: '🔤',
  maiuscola: '🔠',
  numero: '🔢',
  simbolo: '＊',
};

export default function Block({ block, onRemove, isInBuilder, dragIndex }) {
  const ref = useRef(null);

  const handleDragStart = useCallback(
    (e) => {
      e.dataTransfer.setData('text/plain', JSON.stringify({ blockId: block.id, fromBuilder: isInBuilder, instanceId: block.instanceId, dragIndex }));
      e.dataTransfer.effectAllowed = 'move';
      if (ref.current) {
        ref.current.classList.add('dragging');
        requestAnimationFrame(() => {
          if (ref.current) ref.current.classList.remove('dragging');
        });
      }
    },
    [block, isInBuilder, dragIndex]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (isInBuilder && onRemove) {
          onRemove(block.instanceId);
        }
      }
    },
    [block, isInBuilder, onRemove]
  );

  return (
    <div
      ref={ref}
      className={`block block--${block.type}${isInBuilder ? ' block--in-builder' : ''}`}
      draggable
      onDragStart={handleDragStart}
      tabIndex={0}
      role="button"
      aria-label={`Blocco ${block.type}: ${block.label}. ${isInBuilder ? 'Premi Invio per rimuovere' : 'Trascina per aggiungere'}`}
      onKeyDown={handleKeyDown}
      data-type={block.type}
    >
      <span className="block__icon" aria-hidden="true">
        {TYPE_ICONS[block.type] || '⬜'}
      </span>
      <span className="block__label">{block.label}</span>
      {isInBuilder && (
        <button
          className="block__remove"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(block.instanceId);
          }}
          aria-label={`Rimuovi blocco ${block.label}`}
          tabIndex={0}
        >
          ×
        </button>
      )}
    </div>
  );
}
