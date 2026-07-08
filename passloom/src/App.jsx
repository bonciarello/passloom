import { useCallback, useEffect } from 'react';
import BlockPanel from './components/BlockPanel';
import BuilderArea from './components/BuilderArea';
import PasswordDisplay from './components/PasswordDisplay';
import StrengthMeter from './components/StrengthMeter';
import { usePasswordBuilder } from './hooks/usePasswordBuilder';
import './App.css';

export default function App() {
  const {
    builderBlocks,
    password,
    result,
    blockCount,
    addBlock,
    removeBlock,
    clearAll,
    lastUpdateRef,
  } = usePasswordBuilder();

  const handleDrop = useCallback(
    (data) => {
      if (data.fromBuilder) {
        // Reordering within builder - not implemented for simplicity, but could be added
        return;
      }
      addBlock(data.blockId);
    },
    [addBlock]
  );

  useEffect(() => {
    const handler = (e) => {
      addBlock(e.detail.blockId);
    };
    window.addEventListener('add-block', handler);
    return () => window.removeEventListener('add-block', handler);
  }, [addBlock]);

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">
          <span className="app__logo" aria-hidden="true">🧵</span>
          PassLoom
        </h1>
        <p className="app__tagline">
          Tessitura di password — combina blocchi per creare chiavi sicure e facili da ricordare
        </p>
      </header>

      <main className="app__main">
        <div className="app__panel">
          <BlockPanel />
        </div>
        <div className="app__workspace">
          <BuilderArea
            builderBlocks={builderBlocks}
            onDrop={handleDrop}
            onRemove={removeBlock}
            onClear={clearAll}
          />
          <PasswordDisplay password={password} blockCount={blockCount} />
          <StrengthMeter result={result} />
        </div>
      </main>

      <footer className="app__footer">
        <p>
          PassLoom — Le password non vengono mai inviate a server esterni.
          Tutta l'elaborazione avviene nel tuo browser.
        </p>
      </footer>
    </div>
  );
}
