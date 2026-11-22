import {Download, WifiOff, X} from 'lucide-react';
import React, {useState} from 'react';
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
        className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 text-xs font-medium text-[#1B263B] border border-[#1B263B]/30 bg-[#FAF6EE] hover:bg-[#EBE2D2] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
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
          className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 text-xs font-medium text-[#1B263B] border border-[#1B263B]/30 bg-[#FAF6EE] hover:bg-[#EBE2D2] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{lang === 'pa' ? 'ਹੋਮ ਸਕ੍ਰੀਨ ’ਤੇ ਜੋੜੋ' : 'Add to Home Screen'}</span>
        </button>

        {showIOSGuide && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#1B263B]/50 backdrop-blur-xs p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ios-install-title"
          >
            <div className="w-full max-w-sm rounded-xl bg-[#FAF6EE] border border-[#DDD2BE] p-6 shadow-xl">
              <div className="flex items-start justify-between gap-4">
                <h3 id="ios-install-title" className="font-display text-xl font-semibold text-[#1B263B]">
                  {lang === 'pa' ? 'iPhone / iPad ’ਤੇ ਇੰਸਟਾਲ ਕਰੋ' : 'Install on iPhone or iPad'}
                </h3>
                <button
                  type="button"
                  onClick={() => setShowIOSGuide(false)}
                  aria-label="Close install guide"
                  className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-md text-[#57534E] hover:bg-[#EBE2D2] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <ol className="mt-4 space-y-2.5 text-sm text-[#44403C] list-decimal list-inside leading-relaxed">
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
                className="mt-5 w-full min-h-[44px] rounded-lg bg-[#1B263B] text-[#FAF6EE] text-sm font-medium hover:bg-[#111A2B] transition-colors cursor-pointer"
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
  if (isOnline) return null;

  return (
    <div
      role="status"
      className="no-print fixed bottom-20 lg:bottom-4 left-4 z-40 inline-flex items-center gap-2 rounded-md border border-[#C86400]/40 bg-[#FAF6EE] px-3 py-2 text-xs font-medium text-[#1C1917] shadow-md"
    >
      <WifiOff className="w-3.5 h-3.5 text-[#9E4F00]" aria-hidden="true" />
      <span>
        {lang === 'pa'
          ? 'ਆਫ਼ਲਾਈਨ ਮੋਡ — ਪੁਰਾਤਨ ਜੰਤਰੀ ਕੈਸ਼ ਤੋਂ ਚੱਲ ਰਹੀ ਹੈ'
          : 'Offline mode — using cached Puratan Jantri'}
      </span>
    </div>
  );
};
