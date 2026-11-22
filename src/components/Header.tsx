import {BookOpen, CalendarDays, Compass, Printer} from 'lucide-react';
import React from 'react';
import type {LanguageMode} from '../data/types';

export type AppView = 'jantri' | 'events' | 'sangrands' | 'print';

interface HeaderProps {
  activeView: AppView;
  onSelectView: (view: AppView) => void;
  lang: LanguageMode;
  onSelectLang: (lang: LanguageMode) => void;
}

const NAV_ITEMS: readonly {
  id: AppView;
  labelEn: string;
  labelPa: string;
  mobileLabelEn: string;
  mobileLabelPa: string;
  icon: React.FC<{className?: string}>;
}[] = [
  {id: 'jantri', labelEn: 'Jantri', labelPa: 'ਜੰਤਰੀ', mobileLabelEn: 'Jantri', mobileLabelPa: 'ਜੰਤਰੀ', icon: CalendarDays},
  {id: 'events', labelEn: 'Purabs & Lookup', labelPa: 'ਦਿਹਾੜੇ ਅਤੇ ਖੋਜ', mobileLabelEn: 'Purabs', mobileLabelPa: 'ਦਿਹਾੜੇ', icon: BookOpen},
  {id: 'sangrands', labelEn: 'Sangrands', labelPa: 'ਸੰਗਰਾਂਦਾਂ', mobileLabelEn: 'Sangrands', mobileLabelPa: 'ਸੰਗਰਾਂਦਾਂ', icon: Compass},
  {id: 'print', labelEn: 'Print A4', labelPa: 'ਪ੍ਰਿੰਟ A4', mobileLabelEn: 'Print A4', mobileLabelPa: 'ਪ੍ਰਿੰਟ', icon: Printer},
];

const LANG_OPTIONS: readonly {
  id: LanguageMode;
  shortLabel: string;
  ariaLabel: string;
}[] = [
  {id: 'en', shortLabel: 'EN', ariaLabel: 'Switch language to English'},
  {id: 'pa', shortLabel: 'ਪੰ', ariaLabel: 'Switch language to Gurmukhi Punjabi'},
  {id: 'bi', shortLabel: 'Both', ariaLabel: 'Switch to side-by-side Bilingual display'},
];

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onSelectView,
  lang,
  onSelectLang,
}) => {
  const isPa = lang === 'pa';

  return (
    <>
      <header className="no-print sticky top-0 z-30 border-b border-[#DDD2BE] bg-[#FAF6EE]/95 backdrop-blur-xs">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-16 lg:gap-8 lg:px-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <button
            type="button"
            onClick={() => onSelectView('jantri')}
            className="flex items-center gap-2.5 text-left whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B263B]"
            aria-label={
              isPa ? 'ਤੱਤਖ਼ਾਲਸਾ ਪੁਰਾਤਨ ਜੰਤਰੀ — ਮੁੱਖ ਪੰਨਾ' : 'Tatkhalsa Puratan Jantri — Home'
            }
          >
            <img
              src="./logo.png"
              alt={isPa ? 'ਤੱਤਖ਼ਾਲਸਾ ਪੁਰਾਤਨ ਜੰਤਰੀ ਮੋਹਰ' : 'Tatkhalsa Puratan Jantri Logo'}
              width={40}
              height={40}
              className="w-10 h-10 rounded-lg border border-[#B8860B] object-cover shrink-0 shadow-xs bg-[#FAF6EE]"
            />
            <span
              className={`font-display text-lg font-semibold tracking-tight text-[#1B263B] sm:text-xl ${
                isPa ? 'font-gurmukhi text-base sm:text-lg' : ''
              }`}
            >
              {isPa ? 'ਤੱਤਖ਼ਾਲਸਾ ਪੁਰਾਤਨ ਜੰਤਰੀ' : 'Tatkhalsa Puratan Jantri'}
            </span>
          </button>

          {/* Zone 2: 4 Clean Single-Line Navigation Links (Desktop) */}
          <nav
            aria-label={isPa ? 'ਮੁੱਖ ਨੇਵੀਗੇਸ਼ਨ' : 'Primary navigation'}
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
                  className={`relative py-2 text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B263B] ${
                    isActive
                      ? 'text-[#1B263B]'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  {isPa ? item.labelPa : item.labelEn}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C86400]"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action — Seamless English / ਪੰਜਾਬੀ / Bilingual Switch */}
          <div
            role="group"
            aria-label={isPa ? 'ਭਾਸ਼ਾ ਚੋਣ' : 'Display language mode'}
            className="inline-flex items-center rounded-md border border-[#C9BEA8] bg-[#F3ECE0] p-0.5 shrink-0"
          >
            {LANG_OPTIONS.map((opt) => {
              const active = lang === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onSelectLang(opt.id)}
                  aria-pressed={active}
                  aria-label={opt.ariaLabel}
                  className={`min-h-[36px] px-2.5 sm:px-3 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#C86400] ${
                    active
                      ? 'bg-[#1B263B] text-[#FAF6EE]'
                      : 'text-[#44403C] hover:text-[#1B263B]'
                  } ${opt.id === 'pa' ? 'font-gurmukhi' : ''}`}
                >
                  {opt.shortLabel}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Mobile Bottom Tab Bar (Thumb-Zone Navigation, compact 58px <= 15% cap with top bar) */}
      <nav
        aria-label={isPa ? 'ਮੋਬਾਈਲ ਨੇਵੀਗੇਸ਼ਨ' : 'Mobile navigation'}
        className="no-print fixed bottom-0 left-0 right-0 z-30 border-t border-[#DDD2BE] bg-[#FAF6EE]/95 backdrop-blur-xs lg:hidden"
      >
        <div className="grid grid-cols-4 h-[58px]">
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
                  isActive ? 'text-[#1B263B]' : 'text-[#57534E]'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#C86400]' : ''}`} aria-hidden="true" />
                <span className="text-[11px] font-medium leading-none whitespace-nowrap">
                  {isPa ? item.mobileLabelPa : item.mobileLabelEn}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
