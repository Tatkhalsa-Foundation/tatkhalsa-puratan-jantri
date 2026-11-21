import {BookOpen, CalendarDays, Compass, Printer} from 'lucide-react';
import React from 'react';
import type {LanguageMode} from '../data/types';

export type AppView = 'jantri' | 'events' | 'sangrands' | 'print';

interface HeaderProps {
  activeView: AppView;
  onSelectView: (view: AppView) => void;
  lang: LanguageMode;
  onToggleLang: () => void;
}

const NAV_ITEMS: readonly {
  id: AppView;
  labelEn: string;
  labelPa: string;
  icon: React.FC<{className?: string}>;
}[] = [
  {id: 'jantri', labelEn: 'Jantri', labelPa: 'ਜੰਤਰੀ', icon: CalendarDays},
  {id: 'events', labelEn: 'Historical Days', labelPa: 'ਇਤਿਹਾਸਕ ਦਿਹਾੜੇ', icon: BookOpen},
  {id: 'sangrands', labelEn: 'Sangrands', labelPa: 'ਸੰਗਰਾਂਦਾਂ', icon: Compass},
  {id: 'print', labelEn: 'Print A4', labelPa: 'ਪ੍ਰਿੰਟ A4', icon: Printer},
];

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onSelectView,
  lang,
  onToggleLang,
}) => {
  return (
    <>
      <header className="no-print sticky top-0 z-30 border-b border-[#DDD3C0] bg-[#FAF6EE]/95 backdrop-blur-xs">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-16 lg:gap-8 lg:px-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <button
            type="button"
            onClick={() => onSelectView('jantri')}
            className="flex items-center gap-2.5 text-left whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
            aria-label={lang === 'pa' ? 'ਤੱਤਖ਼ਾਲਸਾ ਪੁਰਾਤਨ ਜੰਤਰੀ — ਮੁੱਖ ਪੰਨਾ' : 'Tatkhalsa Puratan Jantri — Home'}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 40 40"
              fill="none"
              aria-hidden="true"
              className="shrink-0"
            >
              <circle cx="20" cy="20" r="18" stroke="#1E3A8A" strokeWidth="1.75" />
              <circle cx="20" cy="20" r="13" stroke="#D97706" strokeWidth="1.25" strokeDasharray="2 2" />
              <circle cx="20" cy="20" r="7.5" fill="#D97706" />
              <path d="M23 13A7.5 7.5 0 1 0 23 27A5.6 5.6 0 1 1 23 13Z" fill="#FAF6EE" />
            </svg>
            <span
              className={`font-display text-lg font-semibold tracking-tight text-[#1C1917] sm:text-xl ${
                lang === 'pa' ? 'font-gurmukhi text-base sm:text-lg' : ''
              }`}
            >
              {lang === 'pa' ? 'ਤੱਤਖ਼ਾਲਸਾ ਪੁਰਾਤਨ ਜੰਤਰੀ' : 'Tatkhalsa Puratan Jantri'}
            </span>
          </button>

          {/* Zone 2: 4 Clean Single-Line Navigation Links (Desktop) */}
          <nav
            aria-label={lang === 'pa' ? 'ਮੁੱਖ ਨੇਵੀਗੇਸ਼ਨ' : 'Primary navigation'}
            className="hidden lg:flex items-center gap-7"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectView(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative py-2 text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3A8A] ${
                    isActive
                      ? 'text-[#1E3A8A]'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  {lang === 'pa' ? item.labelPa : item.labelEn}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D97706]"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action — Instant Gurmukhi / English Toggle */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={onToggleLang}
              aria-label={
                lang === 'pa'
                  ? 'Switch interface to English and Transliteration'
                  : 'ਇੰਟਰਫੇਸ ਗੁਰਮੁਖੀ ਵਿੱਚ ਬਦਲੋ'
              }
              className="min-h-[40px] px-4 py-2 text-xs sm:text-sm font-medium bg-[#1E3A8A] text-[#FAF6EE] hover:bg-[#172554] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706]"
            >
              {lang === 'pa' ? 'English / Translit' : 'ਗੁਰਮੁਖੀ'}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Tab Bar (Thumb-Zone Navigation, compact 60px <= 15% cap with top bar) */}
      <nav
        aria-label={lang === 'pa' ? 'ਮੋਬਾਈਲ ਨੇਵੀਗੇਸ਼ਨ' : 'Mobile navigation'}
        className="no-print fixed bottom-0 left-0 right-0 z-30 border-t border-[#DDD3C0] bg-[#FAF6EE]/95 backdrop-blur-xs lg:hidden"
      >
        <div className="grid grid-cols-4 h-[60px]">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectView(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`flex flex-col items-center justify-center gap-0.5 min-h-[44px] transition-colors cursor-pointer ${
                  isActive ? 'text-[#1E3A8A]' : 'text-[#57534E]'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#D97706]' : ''}`} aria-hidden="true" />
                <span className="text-[11px] font-medium leading-none truncate max-w-[92%]">
                  {lang === 'pa' ? item.labelPa : item.labelEn}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
