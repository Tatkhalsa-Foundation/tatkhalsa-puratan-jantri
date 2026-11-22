import {Download, WifiOff, X} from 'lucide-react';
import React, {useEffect, useState} from 'react';
import type {LanguageMode} from '../data/types';
import {useOnlineStatus} from '../hooks/useOnlineStatus';
import {usePWAInstall} from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  lang: LanguageMode;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({lang}) => {
  const {isInstallable, isInstalled, isIOS, install} = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) return null;

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        className="inline-flex items-center gap-1.5 min-h-[38px] px-3 py-1.5 text-xs font-medium text-[var(--text-heading)] border border-[var(--border-strong)] bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-hover)] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
      >
        <Download className="w-3.5 h-3.5" aria-hidden="true" />
        <span>{lang === 'pa' ? 'ਐਪ ਇੰਸਟਾਲ ਕਰੋ' : 'Install App'}</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          className="inline-flex items-center gap-1.5 min-h-[38px] px-3 py-1.5 text-xs font-medium text-[var(--text-heading)] border border-[var(--border-strong)] bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-hover)] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{lang === 'pa' ? 'ਹੋਮ ਸਕ੍ਰੀਨ ’ਤੇ ਜੋੜੋ' : 'Add to Home Screen'}</span>
        </button>

        {showIOSGuide && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg-backdrop)] backdrop-blur-xs p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ios-install-title"
          >
            <div className="w-full max-w-sm rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] p-6 shadow-xl">
              <div className="flex items-start justify-between gap-4">
                <h3
                  id="ios-install-title"
                  className="font-display text-xl font-semibold text-[var(--text-heading)]"
                >
                  {lang === 'pa' ? 'iPhone / iPad ’ਤੇ ਇੰਸਟਾਲ ਕਰੋ' : 'Install on iPhone or iPad'}
                </h3>
                <button
                  type="button"
                  onClick={() => setShowIOSGuide(false)}
                  aria-label="Close install guide"
                  className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-md text-[var(--text-muted)] hover:bg-[var(--bg-hover)] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <ol className="mt-4 space-y-2.5 text-sm text-[var(--text-secondary)] list-decimal list-inside leading-relaxed">
                <li>
                  {lang === 'pa'
                    ? 'Safari ਟੂਲਬਾਰ ਵਿੱਚ Share ਬਟਨ ’ਤੇ ਟੈਪ ਕਰੋ।'
                    : 'Tap the Share button in the Safari toolbar.'}
                </li>
                <li>
                  {lang === 'pa'
                    ? 'ਹੇਠਾਂ ਸਕ੍ਰੋਲ ਕਰੋ ਅਤੇ "Add to Home Screen" ਚੁਣੋ।'
                    : 'Scroll down and tap "Add to Home Screen".'}
                </li>
              </ol>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full min-h-[44px] rounded-lg bg-[var(--accent-navy)] text-[var(--accent-on-navy)] text-sm font-medium hover:bg-[var(--accent-navy-hover)] transition-colors cursor-pointer"
              >
                {lang === 'pa' ? 'ਬੰਦ ਕਰੋ' : 'Close'}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};

export const OfflineIndicator: React.FC<{lang: LanguageMode}> = ({lang}) => {
  const isOnline = useOnlineStatus();
  const [dismissed, setDismissed] = useState(false);

  // Reset dismissal whenever the browser comes back online so future offline events notify again
  useEffect(() => {
    if (isOnline) {
      setDismissed(false);
    }
  }, [isOnline]);

  // Only render when genuinely offline and not dismissed
  if (isOnline || dismissed) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="no-print fixed bottom-20 lg:bottom-4 left-4 z-40 inline-flex items-center gap-2 rounded-md border border-[var(--accent-primary)]/45 bg-[var(--bg-surface-elevated)] pl-3 pr-1.5 py-1.5 text-xs font-medium text-[var(--text-primary)] shadow-md max-w-[calc(100vw-2rem)]"
    >
      <WifiOff className="w-3.5 h-3.5 text-[var(--accent-primary-text)] shrink-0" aria-hidden="true" />
      <span>
        {lang === 'pa'
          ? 'ਆਫ਼ਲਾਈਨ ਮੋਡ — ਪੁਰਾਤਨ ਜੰਤਰੀ ਕੈਸ਼ ਤੋਂ ਚੱਲ ਰਹੀ ਹੈ'
          : 'Offline mode — using cached Puratan Jantri'}
      </span>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label={lang === 'pa' ? 'ਆਫ਼ਲਾਈਨ ਸੂਚਨਾ ਬੰਦ ਕਰੋ' : 'Dismiss offline notice'}
        className="ml-1 inline-flex h-6 w-6 items-center justify-center rounded-sm text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] transition-colors shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--accent-primary)]"
      >
        <X className="w-3.5 h-3.5" aria-hidden="true" />
      </button>
    </div>
  );
};
