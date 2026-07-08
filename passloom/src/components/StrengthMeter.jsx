export default function StrengthMeter({ result }) {
  const { score, level, label, color, suggestions } = result;
  const percentage = score;

  return (
    <div className="strength" aria-label={`Valutazione password: ${label}`} aria-live="polite">
      <div className="strength__header">
        <h2 className="strength__title">Forza della password</h2>
        <span className="strength__badge" style={{ backgroundColor: color }}>
          {label}
        </span>
      </div>
      <div className="strength__bar-track" role="progressbar" aria-valuenow={score} aria-valuemin={0} aria-valuemax={100} aria-label={`Forza: ${score}%`}>
        <div
          className="strength__bar-fill"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
      <ul className="strength__suggestions">
        {suggestions.map((s, i) => (
          <li key={i} className="strength__suggestion">
            <span className="strength__suggestion-icon" aria-hidden="true">
              {level === 'forte' ? '✓' : level === 'media' ? '→' : '!'}
            </span>
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}
