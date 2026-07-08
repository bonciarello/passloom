import { blockCategories } from '../data/blocks';

export default function BlockPanel() {
  return (
    <aside className="panel" aria-label="Pannello dei blocchi">
      <h2 className="panel__title">Blocchi disponibili</h2>
      <p className="panel__subtitle">Trascina i blocchi nell'area di costruzione</p>
      {blockCategories.map((cat) => (
        <section key={cat.id} className="panel__category">
          <h3 className="panel__category-title">
            <span
              className="panel__category-dot"
              style={{ backgroundColor: cat.color }}
              aria-hidden="true"
            />
            {cat.title}
          </h3>
          <p className="panel__category-desc">{cat.description}</p>
          <div className="panel__blocks">
            {cat.blocks.map((block) => (
              <div
                key={block.id}
                className={`block block--${block.type}`}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData(
                    'text/plain',
                    JSON.stringify({ blockId: block.id, fromBuilder: false })
                  );
                  e.dataTransfer.effectAllowed = 'copy';
                }}
                tabIndex={0}
                role="button"
                aria-label={`Blocco ${cat.title}: ${block.label}. Trascina per aggiungere alla password.`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    // Trigger add via custom event
                    window.dispatchEvent(
                      new CustomEvent('add-block', { detail: { blockId: block.id } })
                    );
                  }
                }}
                data-type={block.type}
              >
                <span className="block__icon" aria-hidden="true">
                  {cat.id === 'parole' && '🔤'}
                  {cat.id === 'maiuscole' && '🔠'}
                  {cat.id === 'numeri' && '🔢'}
                  {cat.id === 'simboli' && '＊'}
                </span>
                <span className="block__label">{block.label}</span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </aside>
  );
}
