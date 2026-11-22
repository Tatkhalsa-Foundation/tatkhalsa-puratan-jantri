import {Download, Share, Smartphone, X} from 'lucide-react';
import React, {useEffect, useState} from 'react';
import type {LanguageMode} from '../data/types';
import {usePWAInstall} from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  lang: LanguageMode;
  variant?: 'header' | 'footer' | 'inline';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  lang,
  variant = 'inline',
}) => {
  const {isInstallable, isInstalled, isIOS, install} = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);
  const isPa = lang === 'pa';

  useEffect(() => {
    if (!showGuide) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowGuide(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showGuide]);

  // Automatically hide whenever running in standalone / installed PWA mode
  if (isInstalled) return null;

  const handleClick = async () => {
    if (isInstallable) {
      await install();
      return;
    }
    setShowGuide(true);
  };

  const buttonClassName =
    variant === 'header'
      ? 'inline-flex items-center justify-center gap-1.5 min-h-[38px] min-w-[38px] px-2 sm:px-3 py-1.5 text-xs font-medium rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-heading)] hover:bg-[var(--bg-hover)] hover:border-[var(--accent-primary)] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)]'
      : variant === 'footer'
        ? 'inline-flex items-center gap-1.5 min-h-[34px] px-2.5 py-1 text-xs font-medium rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface-elevated)] text-[var(--text-heading)] hover:bg-[var(--bg-hover)] hover:text-[var(--accent-primary-text)] transition-colors whitespace-nowrap shrink-0 cursor-pointer'
        : 'inline-flex items-center gap-1.5 min-h-[38px] px-3 py-1.5 text-xs font-medium text-[var(--text-heading)] border border-[var(--border-strong)] bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-hover)] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer';

  const label = isPa ? 'ਐਪ ਇੰਸਟਾਲ ਕਰੋ' : 'Install App';

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        aria-label={label}
        title={label}
        data-testid={`pwa-install-btn-${variant}`}
        className={buttonClassName}
      >
        {variant === 'header' ? (
          <Smartphone className="w-4 h-4 text-[var(--accent-primary-text)] shrink-0" aria-hidden="true" />
        ) : (
          <Download className="w-3.5 h-3.5 text-[var(--accent-primary-text)] shrink-0" aria-hidden="true" />
        )}
        <span className={variant === 'header' ? 'hidden sm:inline' : ''}>{label}</span>
      </button>

      {showGuide && (
        <div
          className="no-print fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg-backdrop)] backdrop-blur-xs p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pwa-install-guide-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowGuide(false);
          }}
        >
          <div
            data-testid="pwa-install-guide-modal"
            className="w-full max-w-sm rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] p-5 sm:p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <Smartphone
                  className="w-5 h-5 text-[var(--accent-primary-text)] shrink-0"
                  aria-hidden="true"
                />
                <h3
                  id="pwa-install-guide-title"
                  className="font-display text-xl font-semibold text-[var(--text-heading)] leading-tight"
                >
                  {isIOS
                    ? isPa
                      ? 'iPhone / iPad ’ਤੇ ਐਪ ਇੰਸਟਾਲ ਕਰੋ'
                      : 'Install on iPhone or iPad'
                    : isPa
                      ? 'ਤੱਤਖ਼ਾਲਸਾ ਪੁਰਾਤਨ ਜੰਤਰੀ ਐਪ ਇੰਸਟਾਲ ਕਰੋ'
                      : 'Install Tat Khalsa Puratan Jantri'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowGuide(false)}
                aria-label={isPa ? 'ਬੰਦ ਕਰੋ' : 'Close install guide'}
                className="min-h-[38px] min-w-[38px] flex items-center justify-center rounded-md text-[var(--text-muted)] hover:bg-[var(--bg-hover)] cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {isIOS ? (
              <ol className="space-y-2.5 text-sm text-[var(--text-primary)] leading-relaxed">
                <li className="flex items-start gap-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-soft)] p-3">
                  <span className="font-mono-tabular font-semibold text-[var(--accent-primary-text)]">
                    1.
                  </span>
                  <span>
                    {isPa ? (
                      <>
                        Safari ਦੇ ਹੇਠਾਂ <strong>Share (⎙)</strong> ਆਈਕਨ ’ਤੇ ਟੈਪ ਕਰੋ।
                      </>
                    ) : (
                      <>
                        Tap the <strong>Share icon (⎙)</strong> at the bottom of Safari.
                      </>
                    )}
                  </span>
                </li>
                <li className="flex items-start gap-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-soft)] p-3">
                  <span className="font-mono-tabular font-semibold text-[var(--accent-primary-text)]">
                    2.
                  </span>
                  <span>
                    {isPa ? (
                      <>
                        ਹੇਠਾਂ ਸਕ੍ਰੋਲ ਕਰੋ ਅਤੇ <strong>“Add to Home Screen”</strong> ’ਤੇ ਟੈਪ ਕਰੋ।
                      </>
                    ) : (
                      <>
                        Tap <strong>“Add to Home Screen”</strong> to open Puratan Jantri offline anytime.
                      </>
                    )}
                  </span>
                </li>
              </ol>
            ) : (
              <div className="space-y-3 text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed">
                <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-soft)] p-3 space-y-1">
                  <p className="font-semibold text-[var(--text-heading)] flex items-center gap-1.5">
                    <Download className="w-3.5 h-3.5 text-[var(--accent-primary-text)]" aria-hidden="true" />
                    <span>{isPa ? 'Android / Chrome / Edge:' : 'Android / Chrome / Edge:'}</span>
                  </p>
                  <p className="text-xs text-[var(--text-secondary)]">
                    {isPa
                      ? 'ਬ੍ਰਾਊਜ਼ਰ ਮੀਨੂ (⋮) ਜਾਂ ਐਡਰੈੱਸ ਬਾਰ ਵਿੱਚ “Install App” / “Add to Home screen” ਚੁਣੋ।'
                      : 'Open the browser menu (⋮) or click the Install icon in the address bar and choose “Install App”.'}
                  </p>
                </div>

                <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-soft)] p-3 space-y-1">
                  <p className="font-semibold text-[var(--text-heading)] flex items-center gap-1.5">
                    <Share className="w-3.5 h-3.5 text-[var(--accent-primary-text)]" aria-hidden="true" />
                    <span>{isPa ? 'iPhone / iPad (Safari):' : 'iPhone / iPad (Safari):'}</span>
                  </p>
                  <p className="text-xs text-[var(--text-secondary)]">
                    {isPa
                      ? 'Safari ਦੇ ਹੇਠਾਂ Share ਆਈਕਨ (⎙) ’ਤੇ ਟੈਪ ਕਰੋ → “Add to Home Screen” ਚੁਣੋ।'
                      : 'Tap the Share icon (⎙) at the bottom of Safari → Tap “Add to Home Screen”.'}
                  </p>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowGuide(false)}
              className="w-full min-h-[42px] rounded-lg bg-[var(--accent-navy)] text-[var(--accent-on-navy)] text-sm font-medium hover:bg-[var(--accent-navy-hover)] transition-colors cursor-pointer"
            >
              {isPa ? 'ਸਮਝ ਗਿਆ' : 'Got it'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
