import { useState, useCallback } from 'react';

export default function PasswordDisplay({ password, blockCount }) {
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleCopy = useCallback(async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = password;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [password]);

  const maskPassword = useCallback((pwd) => {
    if (showPassword) return pwd;
    return pwd.replace(/./g, '•');
  }, [showPassword]);

  return (
    <div className="password-display" aria-label="Password generata">
      <div className="password-display__header">
        <h2 className="password-display__title">Password generata</h2>
        <span className="password-display__count">
          {blockCount} {blockCount === 1 ? 'blocco' : 'blocchi'}
        </span>
      </div>
      <div className="password-display__field">
        <code className="password-display__text" aria-live="polite">
          {password ? maskPassword(password) : '—'}
        </code>
        <div className="password-display__actions">
          <button
            className="password-display__toggle"
            onClick={() => setShowPassword((p) => !p)}
            aria-label={showPassword ? 'Nascondi password' : 'Mostra password'}
            aria-pressed={showPassword}
          >
            {showPassword ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
          <button
            className="password-display__copy"
            onClick={handleCopy}
            disabled={!password}
            aria-label={copied ? 'Password copiata' : 'Copia password negli appunti'}
          >
            {copied ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Copiata!
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copia
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
