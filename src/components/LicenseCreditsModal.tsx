import {ArrowUpRight, BookMarked, Code2, Scale, X} from 'lucide-react';
import React, {useEffect} from 'react';
import type {LanguageMode} from '../data/types';

export const GITHUB_REPO_URL = 'https://github.com/Tatkhalsa-Foundation/tatkhalsa-puratan-jantri';
export const CC_LICENSE_URL = 'https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode';

interface LicenseCreditsModalProps {
  isOpen: boolean;
  lang: LanguageMode;
  onClose: () => void;
}

const MIT_LICENSE_TEXT = `MIT License

Copyright (c) 2027 Tatkhalsa Foundation

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

export const LicenseCreditsModal: React.FC<LicenseCreditsModalProps> = ({
  isOpen,
  lang,
  onClose,
}) => {
  const isPa = lang === 'pa';

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="no-print fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg-backdrop)] backdrop-blur-xs p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="license-credits-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        data-testid="license-credits-modal"
        className="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] px-5 py-4 shrink-0">
          <div>
            <h2
              id="license-credits-title"
              className="font-display text-2xl font-semibold text-[var(--text-heading)] leading-tight"
            >
              {isPa ? 'ਲਾਇਸੈਂਸ, ਸਰੋਤ ਅਤੇ ਸਿਹਰਾ' : 'License & Credits'}
            </h2>
            <p className="mt-0.5 text-xs text-[var(--text-muted)]">
              {isPa
                ? 'ਤੱਤਖ਼ਾਲਸਾ ਫ਼ਾਊਂਡੇਸ਼ਨ · ਓਪਨ-ਸੋਰਸ ਕੋਡ (MIT) ਅਤੇ ਪੁਰਾਤਨ ਜੰਤਰੀ ਡਾਟਾ (CC BY-NC-SA 4.0)'
                : 'Tatkhalsa Foundation · Open-Source Code (MIT) & Puratan Calendar Dataset (CC BY-NC-SA 4.0)'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={isPa ? 'ਬੰਦ ਕਰੋ' : 'Close License & Credits dialog'}
            className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-md text-[var(--text-muted)] hover:bg-[var(--bg-hover)] cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
          {/* 1. App Source Code — MIT License */}
          <section className="space-y-2.5">
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-heading)]">
              <Code2 className="w-4 h-4 text-[var(--accent-primary-text)] shrink-0" aria-hidden="true" />
              <h3>
                {isPa
                  ? '੧. ਐਪ ਸੋਰਸ ਕੋਡ — MIT ਲਾਇਸੈਂਸ'
                  : '1. App Source Code — MIT License'}
              </h3>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {isPa
                ? 'ਇਸ ਵੈੱਬ ਐਪਲੀਕੇਸ਼ਨ ਦਾ ਸੋਰਸ ਕੋਡ MIT ਲਾਇਸੈਂਸ ਅਧੀਨ ਖੁੱਲ੍ਹੇ ਤੌਰ ’ਤੇ ਉਪਲਬਧ ਹੈ, ਜਿਸ ਨਾਲ ਤੱਤਖ਼ਾਲਸਾ ਫ਼ਾਊਂਡੇਸ਼ਨ ਦੇ ਹਵਾਲੇ ਸਮੇਤ ਇਸ ਦੀ ਮੁੜ-ਵਰਤੋਂ ਅਤੇ ਸੁਧਾਰ ਦੀ ਆਗਿਆ ਹੈ।'
                : 'The application source code is open source under the MIT License, permitting reuse, modification, and redistribution with attribution to Tatkhalsa Foundation.'}
            </p>
            <pre className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-soft)] p-3.5 text-[11px] leading-relaxed font-mono-tabular text-[var(--text-primary)] whitespace-pre-wrap overflow-x-auto">
              {MIT_LICENSE_TEXT}
            </pre>
          </section>

          {/* 2. Puratan Calendar Dataset & Historical Notes — CC BY-NC-SA 4.0 */}
          <section className="space-y-2.5 border-t border-[var(--border-subtle)] pt-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-heading)]">
              <Scale className="w-4 h-4 text-[var(--accent-gold-text)] shrink-0" aria-hidden="true" />
              <h3>
                {isPa
                  ? '੨. ਪੁਰਾਤਨ ਕੈਲੰਡਰ ਡਾਟਾ ਅਤੇ ਇਤਿਹਾਸਕ ਨੋਟ — CC BY-NC-SA 4.0'
                  : '2. Puratan Calendar Dataset & Historical Notes — CC BY-NC-SA 4.0'}
              </h3>
            </div>
            <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] p-4 space-y-2.5 text-xs text-[var(--text-primary)] leading-relaxed">
              <p className="font-medium text-[var(--text-heading)]">
                Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0) · Copyright (c) 2027 Tatkhalsa Foundation
              </p>
              <ul className="space-y-1.5 list-disc list-inside text-[var(--text-secondary)]">
                <li>
                  <strong className="text-[var(--text-primary)]">
                    {isPa ? 'ਸਾਂਝਾ ਕਰਨਾ ਅਤੇ ਸੋਧਣਾ (Share & Adapt):' : 'Share & Adapt:'}
                  </strong>{' '}
                  {isPa
                    ? 'ਗੈਰ-ਵਪਾਰਕ ਪੰਥਕ, ਧਾਰਮਿਕ ਅਤੇ ਵਿਦਿਅਕ ਵਰਤੋਂ ਲਈ ਬਿਕ੍ਰਮੀ ਸੰਮਤ ਡਾਟਾ ਅਤੇ ਇਤਿਹਾਸਕ ਨੋਟ ਮੁਫ਼ਤ ਸਾਂਝੇ ਅਤੇ ਅਨੁਕੂਲਿਤ ਕੀਤੇ ਜਾ ਸਕਦੇ ਹਨ।'
                    : 'Free to copy, share, and adapt for non-commercial Panthic, educational, and Sangat use.'}
                </li>
                <li>
                  <strong className="text-[var(--text-primary)]">
                    {isPa ? 'ਸਿਹਰਾ (Attribution):' : 'Attribution:'}
                  </strong>{' '}
                  {isPa
                    ? 'ਤੱਤਖ਼ਾਲਸਾ ਫ਼ਾਊਂਡੇਸ਼ਨ (calendar.tatkhalsa.in) ਨੂੰ ਉਚਿਤ ਸਿਹਰਾ ਅਤੇ ਲਾਇਸੈਂਸ ਦਾ ਲਿੰਕ ਦੇਣਾ ਜ਼ਰੂਰੀ ਹੈ।'
                    : 'Credit Tatkhalsa Foundation (calendar.tatkhalsa.in), link to the license, and indicate any changes.'}
                </li>
                <li>
                  <strong className="text-[var(--text-primary)]">
                    {isPa ? 'ਗੈਰ-ਵਪਾਰਕ (NonCommercial):' : 'NonCommercial:'}
                  </strong>{' '}
                  {isPa
                    ? 'ਕੈਲੰਡਰ ਡਾਟਾ ਜਾਂ ਇਤਿਹਾਸਕ ਨੋਟਾਂ ਦੀ ਵਪਾਰਕ ਵਿਕਰੀ ਜਾਂ ਮੁਨਾਫ਼ੇ ਲਈ ਵਰਤੋਂ ਦੀ ਮਨਾਹੀ ਹੈ।'
                    : 'Commercial resale or commercial exploitation of the curated calendar dataset and notes is prohibited.'}
                </li>
                <li>
                  <strong className="text-[var(--text-primary)]">
                    {isPa ? 'ਸਮਾਨ ਲਾਇਸੈਂਸ (ShareAlike):' : 'ShareAlike:'}
                  </strong>{' '}
                  {isPa
                    ? 'ਸੋਧੇ ਹੋਏ ਡਾਟਾ ਨੂੰ ਇਸੇ CC BY-NC-SA 4.0 ਲਾਇਸੈਂਸ ਅਧੀਨ ਸਾਂਝਾ ਕਰਨਾ ਲਾਜ਼ਮੀ ਹੈ।'
                    : 'Any adapted datasets must be distributed under the same CC BY-NC-SA 4.0 license.'}
                </li>
              </ul>
              <a
                href={CC_LICENSE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-[var(--accent-primary-text)] hover:underline underline-offset-4 pt-1"
              >
                <span>{isPa ? 'CC BY-NC-SA 4.0 ਪੂਰਾ ਕਾਨੂੰਨੀ ਪਾਠ ਵੇਖੋ' : 'Read full CC BY-NC-SA 4.0 legal code'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </section>

          {/* 3. Primary Chronology & Scriptural Sources */}
          <section className="space-y-2.5 border-t border-[var(--border-subtle)] pt-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-heading)]">
              <BookMarked className="w-4 h-4 text-[var(--accent-primary-text)] shrink-0" aria-hidden="true" />
              <h3>
                {isPa
                  ? '੩. ਪ੍ਰਮਾਣਿਕ ਕਾਲ-ਗਣਨਾ ਅਤੇ ਗ੍ਰੰਥ ਸਰੋਤ'
                  : '3. Primary Chronology & Scriptural Sources'}
              </h3>
            </div>
            <ul className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-soft)] p-4 space-y-2 text-xs text-[var(--text-secondary)] leading-relaxed list-disc list-inside">
              <li>
                <strong className="text-[var(--text-primary)]">
                  {isPa ? 'ਪੁਰਾਤਨ ਬਿਕ੍ਰਮੀ ਚੰਦਰ-ਸੂਰਜੀ ਕਾਲ-ਗਣਨਾ:' : 'Traditional Puratan Bikrami Luni-Solar Chronology:'}
                </strong>{' '}
                {isPa
                  ? 'ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ (IST) ਦੇ ਸੂਰਜ-ਉਦੈ ਅਨੁਸਾਰ ਸੂਰਜੀ ਸੰਕ੍ਰਾਂਤੀਆਂ (ਸੰਗਰਾਂਦਾਂ) ਅਤੇ ਪੂਰਨਿਮਾਂਤ ਸੁਦੀ/ਵਦੀ ਤਿਥੀਆਂ।'
                  : 'True sidereal solar Sangrands and Purnimanta Sudhi/Vadhi lunar tithis anchored to Sri Anandpur Sahib (IST) sunrise.'}
              </li>
              <li>
                <strong className="text-[var(--text-primary)]">
                  {isPa ? 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਅਤੇ ਸ੍ਰੀ ਦਸਮ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ:' : 'Sri Guru Granth Sahib Ji & Sri Dasam Granth Sahib Ji:'}
                </strong>{' '}
                {isPa
                  ? 'ਬਾਰਹ ਮਾਹਾ ਮਾਂਝ (ਅੰਗ ੧੩੩–੧੩੬), ਭਗਤ ਬਾਣੀ, ਭੱਟਾਂ ਦੇ ਸਵੱਈਏ (ਅੰਗ ੧੩੮੯–੧੪੦੯) ਅਤੇ ਬੇਨਤੀ ਚੌਪਈ ਕਾਲ-ਲੇਖ (ਸੰਮਤ ੧੭੫੩)।'
                  : 'Barah Maha Majh (Ang 133–136), Bhagat Bani, Bhatt De Swayye (Ang 1389–1409), and Benti Chaupai Sahib colophon (Sambat 1753).'}
              </li>
              <li>
                <strong className="text-[var(--text-primary)]">
                  {isPa ? 'ਪੁਰਾਤਨ ਇਤਿਹਾਸਕ ਗ੍ਰੰਥ:' : 'Primary Historical Chronicles:'}
                </strong>{' '}
                {isPa
                  ? 'ਸ੍ਰੀ ਗੁਰ ਪ੍ਰਤਾਪ ਸੂਰਜ ਗ੍ਰੰਥ (ਮਹਾਂਕਵੀ ਭਾਈ ਸੰਤੋਖ ਸਿੰਘ ਜੀ), ਭਾਈ ਗੁਰਦਾਸ ਜੀ ਦੀਆਂ ਵਾਰਾਂ, ਪ੍ਰਾਚੀਨ ਪੰਥ ਪ੍ਰਕਾਸ਼ (ਭਾਈ ਰਤਨ ਸਿੰਘ ਭੰਗੂ), ਭੱਟ ਵਹੀਆਂ, ਮਹਾਨ ਕੋਸ਼ (ਭਾਈ ਕਾਨ੍ਹ ਸਿੰਘ ਨਾਭਾ) ਅਤੇ ਇਤਿਹਾਸਕ ਹੁਕਮਨਾਮੇ।'
                  : 'Sri Gurpratap Suraj Granth (Mahakavi Bhai Santokh Singh Ji), Bhai Gurdas Ji Vaaran, Prachin Panth Prakash (Bhai Rattan Singh Bhangu), Bhatt Vahis, Mahan Kosh (Bhai Kahn Singh Nabha), and historical Hukamnamas.'}
              </li>
            </ul>
          </section>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] px-5 py-3.5 shrink-0">
          <<iv className="flex flex-wrap items-center gap-4"><a href="https://tatkhalsa.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-primary-text)] hover:underline underline-offset-4"><span>Tatkhalsa Foundation</span><ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" /></a><a href="mailto:info@tatkhalsa.in" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-primary-text)] hover:underline underline-offset-4"><span>info@tatkhalsa.in</span></a>
           <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-primary-text)] hover:underline underline-offset-4"
          >
            <span>GitHub · Tatkhalsa-Foundation/tatkhalsa-puratan-jantri</span>
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
</div>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[40px] px-4 py-2 text-xs font-medium rounded-md bg-[var(--accent-navy)] text-[var(--accent-on-navy)] hover:bg-[var(--accent-navy-hover)] transition-colors cursor-pointer"
          >
            {isPa ? 'ਬੰਦ ਕਰੋ' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
