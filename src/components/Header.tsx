import {BookOpen, CalendarDays, Check, Compass, Flame, Moon, Printer, Sun} from 'lucide-react';
import React, {useEffect, useRef, useState} from 'react';
import type {LanguageMode, ThemeId} from '../data/types';

export type AppView = 'jantri' | 'events' | 'sangrands' | 'print';

interface HeaderProps {
  activeView: AppView;
  onSelectView: (view: AppView) => void;
  lang: LanguageMode;
  onSelectLang: (lang: LanguageMode) => void;
  theme: ThemeId;
  onSelectTheme: (theme: ThemeId) => void;
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

const THEME_OPTIONS: readonly {
  id: ThemeId;
  nameEn: string;
  namePa: string;
  subtitleEn: string;
  subtitlePa: string;
  bgSwatch: string;
  accentSwatch: string;
  icon: React.FC<{className?: string}>;
}[] = [
  {
    id: 'parchment',
    nameEn: 'Puratan Parchment',
    namePa: 'ਪੁਰਾਤਨ ਕਾਗ਼ਜ਼',
    subtitleEn: 'Warm ivory & Surmai',
    subtitlePa: 'ਹਲਕਾ ਪੁਰਾਤਨ ਰੰਗ',
    bgSwatch: '#FAF6EE',
    accentSwatch: '#B8860B',
    icon: Sun,
  },
  {
    id: 'surmai',
    nameEn: 'Surmai Night',
    namePa: 'ਸੁਰਮਈ ਰਾਤ',
    subtitleEn: 'Amritvela dark navy',
    subtitlePa: 'ਅੰਮ੍ਰਿਤਵੇਲਾ ਗੂੜ੍ਹਾ ਨੀਲਾ',
    bgSwatch: '#071524',
    accentSwatch: '#E5A93C',
    icon: Moon,
  },
  {
    id: 'kesri',
    nameEn: 'Hazuri Kesri',
    namePa: 'ਹਜ਼ੂਰੀ ਕੇਸਰੀ',
    subtitleEn: 'Warm cream & saffron',
    subtitlePa: 'ਨਿੱਘਾ ਕੇਸਰੀ ਰੰਗ',
    bgSwatch: '#FFFBF2',
    accentSwatch: '#C86400',
    icon: Flame,
  },
];

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onSelectView,
  lang,
  onSelectLang,
  theme,
  onSelectTheme,
}) => {
  const isPa = lang === 'pa';
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const themeMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!themeMenuOpen) return;
    const handleOutside = (e: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target as Node)) {
        setThemeMenuOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setThemeMenuOpen(false);
    };
    document.addEventListener('mousedown', handleOutside);
    window.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      window.removeEventListener('keydown', handleKey);
    };
  }, [themeMenuOpen]);

  const activeThemeMeta = THEME_OPTIONS.find((t) => t.id === theme) ?? THEME_OPTIONS[0];
  const ActiveThemeIcon = activeThemeMeta.icon;

  return (
    <>
      <header className="no-print sticky top-0 z-30 border-b border-[var(--border-subtle)] bg-[var(--bg-header)] backdrop-blur-xs">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-2 sm:gap-4 px-3.5 sm:px-6 lg:h-16 lg:gap-8 lg:px-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <button
            type="button"
            onClick={() => onSelectView('jantri')}
            className="flex items-center gap-2 sm:gap-2.5 text-left whitespace-nowrap shrink-0 min-w-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)]"
            aria-label={
              isPa ? 'ਤੱਤਖ਼ਾਲਸਾ ਪੁਰਾਤਨ ਜੰਤਰੀ — ਮੁੱਖ ਪੰਨਾ' : 'Tatkhalsa Puratan Jantri — Home'
            }
          >
            <img
              src="./logo.png"
              alt={isPa ? 'ਤੱਤਖ਼ਾਲਸਾ ਪੁਰਾਤਨ ਜੰਤਰੀ ਮੋਹਰ' : 'Tatkhalsa Puratan Jantri Logo'}
              width={36}
              height={36}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-[var(--accent-gold)] object-cover shrink-0 shadow-xs bg-[#FAF6EE]"
            />
            <span
              className={`font-display font-semibold tracking-tight text-[var(--text-heading)] ${
                isPa ? 'font-gurmukhi text-sm sm:text-lg' : 'text-base sm:text-xl'
              }`}
            >
              <span className="sm:hidden">{isPa ? 'ਪੁਰਾਤਨ ਜੰਤਰੀ' : 'Puratan Jantri'}</span>
              <span className="hidden sm:inline">
                {isPa ? 'ਤੱਤਖ਼ਾਲਸਾ ਪੁਰਾਤਨ ਜੰਤਰੀ' : 'Tatkhalsa Puratan Jantri'}
              </span>
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
                  className={`relative py-2 text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-primary)] ${
                    isActive
                      ? 'text-[var(--text-heading)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {isPa ? item.labelPa : item.labelEn}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent-primary)]"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Compact Theme Switcher Icon + Language Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Curated 3-Theme Switcher */}
            <div className="relative" ref={themeMenuRef}>
              <button
                type="button"
                onClick={() => setThemeMenuOpen((prev) => !prev)}
                aria-expanded={themeMenuOpen}
                aria-haspopup="menu"
                aria-label={
                  isPa
                    ? `ਥੀਮ ਬਦਲੋ (${activeThemeMeta.namePa})`
                    : `Change theme (${activeThemeMeta.nameEn})`
                }
                data-testid="theme-switcher-btn"
                className="min-h-[38px] min-w-[38px] flex items-center justify-center rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--accent-primary-text)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)]"
              >
                <ActiveThemeIcon className="w-4 h-4" aria-hidden="true" />
              </button>

              {themeMenuOpen && (
                <div
                  role="menu"
                  aria-label={isPa ? 'ਰੰਗ ਥੀਮ ਚੁਣੋ' : 'Select visual theme'}
                  data-testid="theme-switcher-menu"
                  className="absolute right-0 mt-2 w-56 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] p-1.5 shadow-xl z-40"
                >
                  {THEME_OPTIONS.map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = theme === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        role="menuitemradio"
                        aria-checked={isSelected}
                        data-testid={`theme-option-${opt.id}`}
                        onClick={() => {
                          onSelectTheme(opt.id);
                          setThemeMenuOpen(false);
                        }}
                        className={`w-full min-h-[44px] flex items-center justify-between gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[var(--bg-surface)] text-[var(--text-heading)]'
                            : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            aria-hidden="true"
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border"
                            style={{
                              backgroundColor: opt.bgSwatch,
                              borderColor: opt.accentSwatch,
                              color: opt.accentSwatch,
                            }}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </span>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold leading-tight truncate">
                              {isPa ? opt.namePa : opt.nameEn}
                            </p>
                            <p className="text-[11px] text-[var(--text-faint)] leading-tight truncate">
                              {isPa ? opt.subtitlePa : opt.subtitleEn}
                            </p>
                          </div>
                        </div>
                        {isSelected && (
                          <Check
                            className="w-4 h-4 text-[var(--accent-primary-text)] shrink-0"
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Clean Language Switch: EN | ਪੰ | Both */}
            <div
              role="group"
              aria-label={isPa ? 'ਭਾਸ਼ਾ ਚੋਣ' : 'Display language mode'}
              className="inline-flex items-center rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface)] p-0.5 shrink-0"
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
                    className={`min-h-[34px] px-2 sm:px-2.5 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--accent-primary)] ${
                      active
                        ? 'bg-[var(--accent-navy)] text-[var(--accent-on-navy)]'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-heading)]'
                    } ${opt.id === 'pa' ? 'font-gurmukhi' : ''}`}
                  >
                    {opt.shortLabel}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Tab Bar (Thumb-Zone Navigation, 58px + 56px top bar = 114px <= 15% cap) */}
      <nav
        aria-label={isPa ? 'ਮੋਬਾਈਲ ਨੇਵੀਗੇਸ਼ਨ' : 'Mobile navigation'}
        className="no-print fixed bottom-0 left-0 right-0 z-30 border-t border-[var(--border-subtle)] bg-[var(--bg-header)] backdrop-blur-xs lg:hidden"
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
                  isActive ? 'text-[var(--text-heading)]' : 'text-[var(--text-muted)]'
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${isActive ? 'text-[var(--accent-primary-text)]' : ''}`}
                  aria-hidden="true"
                />
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
