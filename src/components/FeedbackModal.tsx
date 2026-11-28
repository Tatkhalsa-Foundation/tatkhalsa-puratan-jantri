import {Check, Copy, Mail, MessageSquareText, X} from 'lucide-react';
import React, {useEffect, useMemo, useState} from 'react';
import type {LanguageMode} from '../data/types';

export const OFFICIAL_CONTACT_EMAIL = 'info@tatkhalsa.in';

export type FeedbackCategoryId = 'tithi-correction' | 'historical-colophon' | 'bug-ui' | 'general';

interface FeedbackModalProps {
  isOpen: boolean;
  lang: LanguageMode;
  activeDateIso: string;
  activeSambat: number;
  activeMonthNameEn: string;
  activeMonthNamePa: string;
  onClose: () => void;
}

const FEEDBACK_CATEGORIES: readonly {id: FeedbackCategoryId; en: string; pa: string}[] = [
  {id: 'tithi-correction', en: 'Tithi / Date Correction', pa: 'ਤਿਥੀ / ਤਾਰੀਖ਼ ਸੁਧਾਰ'},
  {id: 'historical-colophon', en: 'Historical Note / Colophon', pa: 'ਇਤਿਹਾਸਕ ਨੋਟ / ਗ੍ਰੰਥ ਹਵਾਲਾ'},
  {id: 'bug-ui', en: 'Bug / UI Issue', pa: 'ਤਕਨੀਕੀ / UI ਸਮੱਸਿਆ'},
  {id: 'general', en: 'General Feedback', pa: 'ਆਮ ਸੁਝਾਅ'},
];

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  lang,
  activeDateIso,
  activeSambat,
  activeMonthNameEn,
  activeMonthNamePa,
  onClose,
}) => {
  const isPa = lang === 'pa';
  const [category, setCategory] = useState<FeedbackCategoryId>('tithi-correction');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCopied(false);
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const selectedCategoryMeta =
    FEEDBACK_CATEGORIES.find((c) => c.id === category) ?? FEEDBACK_CATEGORIES[0];

  const contextSummary = `${activeDateIso} · ${activeMonthNameEn} (${activeMonthNamePa}), Sambat ${activeSambat}`;

  const composedSubject = `[Puratan Jantri Feedback] ${selectedCategoryMeta.en} (${activeMonthNameEn}, Sambat ${activeSambat})`;

  const composedBody = useMemo(() => {
    const trimmed = message.trim();
    const lines = [
      'Waheguru Ji Ka Khalsa, Waheguru Ji Ki Fateh,',
      '',
      `Category: ${selectedCategoryMeta.en}`,
      `Active Calendar Context: ${contextSummary}`,
      'Page: https://calendar.tatkhalsa.in/',
      '',
      'Feedback / Details:',
      trimmed || '(Please enter your suggestion, tithi correction, or source reference here)',
    ];
    return lines.join('\n');
  }, [selectedCategoryMeta.en, contextSummary, message]);

  const mailtoHref = useMemo(() => {
    const params = new URLSearchParams({
      subject: composedSubject,
      body: composedBody,
    });
    return `mailto:${OFFICIAL_CONTACT_EMAIL}?${params.toString().replace(/\+/g, '%20')}`;
  }, [composedSubject, composedBody]);

  if (!isOpen) return null;

  const handleCopyText = async () => {
    const fullText = `To: ${OFFICIAL_CONTACT_EMAIL}\nSubject: ${composedSubject}\n\n${composedBody}`;
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(fullText);
      } else {
        const area = document.createElement('textarea');
        area.value = fullText;
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        document.execCommand('copy');
        document.body.removeChild(area);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className="no-print fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg-backdrop)] backdrop-blur-xs p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        data-testid="feedback-modal"
        className="flex max-h-[90vh] w-full max-w-lg flex-col rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] px-5 py-4 shrink-0">
          <div>
            <h2
              id="feedback-modal-title"
              className="font-display text-2xl font-semibold text-[var(--text-heading)] leading-tight flex items-center gap-2"
            >
              <MessageSquareText
                className="w-5 h-5 text-[var(--accent-primary-text)] shrink-0"
                aria-hidden="true"
              />
              <span>{isPa ? 'ਸੁਝਾਅ ਅਤੇ ਸੁਧਾਰ ਭੇਜੋ' : 'Send Feedback & Corrections'}</span>
            </h2>
            <p className="mt-0.5 text-xs text-[var(--text-muted)]">
              {isPa
                ? `ਤੱਤਖ਼ਾਲਸਾ ਫ਼ਾਊਂਡੇਸ਼ਨ (${OFFICIAL_CONTACT_EMAIL}) ਨੂੰ ਸਿੱਧਾ ਸੁਨੇਹਾ ਭੇਜੋ`
                : `Share tithi corrections, historical citations, or suggestions with ${OFFICIAL_CONTACT_EMAIL}`}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={isPa ? 'ਬੰਦ ਕਰੋ' : 'Close feedback dialog'}
            className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-md text-[var(--text-muted)] hover:bg-[var(--bg-hover)] cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Active Context Pill */}
          <div
            data-testid="feedback-context"
            className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-soft)] px-3.5 py-2.5 text-xs text-[var(--text-secondary)]"
          >
            <span className="font-semibold text-[var(--text-heading)]">
              {isPa ? 'ਮੌਜੂਦਾ ਕੈਲੰਡਰ ਪ੍ਰਸੰਗ: ' : 'Attached Calendar Context: '}
            </span>
            <span className="font-mono-tabular">{contextSummary}</span>
          </div>

          {/* Category Selector */}
          <div className="space-y-1.5">
            <label
              htmlFor="feedback-category"
              className="block text-xs font-semibold text-[var(--text-heading)]"
            >
              {isPa ? 'ਵਿਸ਼ਾ ਚੁਣੋ' : 'Feedback Category'}
            </label>
            <select
              id="feedback-category"
              data-testid="feedback-category-select"
              value={category}
              onChange={(e) => setCategory(e.target.value as FeedbackCategoryId)}
              className="w-full min-h-[44px] rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface-elevated)] px-3 text-sm text-[var(--text-primary)] focus:outline-2 focus:outline-[var(--accent-primary)] cursor-pointer"
            >
              {FEEDBACK_CATEGORIES.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {isPa ? opt.pa : opt.en}
                </option>
              ))}
            </select>
          </div>

          {/* Message Textarea */}
          <div className="space-y-1.5">
            <label
              htmlFor="feedback-message"
              className="block text-xs font-semibold text-[var(--text-heading)]"
            >
              {isPa ? 'ਤੁਹਾਡਾ ਸੁਨੇਹਾ / ਵੇਰਵਾ' : 'Your Message or Source Reference'}
            </label>
            <textarea
              id="feedback-message"
              data-testid="feedback-message-input"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                isPa
                  ? 'ਕਿਰਪਾ ਕਰਕੇ ਤਾਰੀਖ਼, ਤਿਥੀ, ਇਤਿਹਾਸਕ ਹਵਾਲਾ ਜਾਂ ਸੁਝਾਅ ਲਿਖੋ...'
                  : 'Describe the tithi or historical note correction, citation reference, or UI suggestion...'
              }
              className="w-full rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface-elevated)] p-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-faint)] focus:outline-2 focus:outline-[var(--accent-primary)] resize-y"
            />
          </div>

          <p className="text-[11px] leading-relaxed text-[var(--text-muted)]">
            {isPa
              ? 'ਕੋਈ ਨਿੱਜੀ ਡਾਟਾ ਸਰਵਰ ’ਤੇ ਸੁਰੱਖਿਅਤ ਨਹੀਂ ਕੀਤਾ ਜਾਂਦਾ। "ਈਮੇਲ ਖੋਲ੍ਹੋ" ਤੁਹਾਡੇ ਈਮੇਲ ਐਪ ਵਿੱਚ info@tatkhalsa.in ਲਈ ਤਿਆਰ ਸੁਨੇਹਾ ਖੋਲ੍ਹਦਾ ਹੈ, ਜਾਂ ਤੁਸੀਂ ਟੈਕਸਟ ਕਾਪੀ ਕਰ ਸਕਦੇ ਹੋ।'
              : 'No personal data is stored on any server. Opening your email app drafts a message directly to info@tatkhalsa.in, or copy the formatted text to send from any email client.'}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] px-5 py-3.5 shrink-0">
          <button
            type="button"
            onClick={handleCopyText}
            data-testid="copy-feedback-btn"
            className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 text-xs font-semibold rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface-elevated)] text-[var(--text-heading)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[var(--accent-personal)]" aria-hidden="true" />
                <span>{isPa ? 'ਟੈਕਸਟ ਕਾਪੀ ਹੋ ਗਿਆ!' : 'Copied Feedback Text!'}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[var(--accent-primary-text)]" aria-hidden="true" />
                <span>{isPa ? 'ਸੁਨੇਹਾ ਕਾਪੀ ਕਰੋ' : 'Copy Feedback Text'}</span>
              </>
            )}
          </button>

          <a
            href={mailtoHref}
            data-testid="feedback-mailto-link"
            className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 text-xs font-semibold rounded-md bg-[var(--accent-navy)] text-[var(--accent-on-navy)] hover:bg-[var(--accent-navy-hover)] transition-colors whitespace-nowrap"
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
            <span>{isPa ? 'info@tatkhalsa.in ’ਤੇ ਈਮੇਲ ਖੋਲ੍ਹੋ' : 'Email info@tatkhalsa.in'}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
