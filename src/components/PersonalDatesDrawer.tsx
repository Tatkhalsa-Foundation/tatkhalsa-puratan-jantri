import {CalendarHeart, CalendarPlus, Plus, Trash2, X} from 'lucide-react';
import React, {useEffect, useState} from 'react';
import {BIKRAMI_MONTHS} from '../data/sambatData';
import type {LanguageMode, PersonalDateKind, PersonalDesiDate} from '../data/types';
import {formatGregorianDate, toGurmukhiNumerals} from '../utils/bikramiEngine';
import {
  formatPersonalDesiDateLabel,
  getMaxDaysForBikramiMonth,
  getPersonalDateKindLabel,
  PERSONAL_DATE_KINDS,
  resolveNextOccurrenceForPersonalDate,
} from '../utils/personalDates';

interface PersonalDatesDrawerProps {
  isOpen: boolean;
  lang: LanguageMode;
  todayIso: string;
  initialMonthId: number;
  initialDay: number;
  personalDates: PersonalDesiDate[];
  onAddPersonalDate: (entry: Omit<PersonalDesiDate, 'id' | 'createdAt'>) => void;
  onDeletePersonalDate: (id: string) => void;
  onJumpToDate: (isoDate: string) => void;
  onOpenIcsModal: () => void;
  onClose: () => void;
}

export const PersonalDatesDrawer: React.FC<PersonalDatesDrawerProps> = ({
  isOpen,
  lang,
  todayIso,
  initialMonthId,
  initialDay,
  personalDates,
  onAddPersonalDate,
  onDeletePersonalDate,
  onJumpToDate,
  onOpenIcsModal,
  onClose,
}) => {
  const isPa = lang === 'pa';
  const [title, setTitle] = useState('');
  const [kind, setKind] = useState<PersonalDateKind>('janam-din');
  const [monthId, setMonthId] = useState<number>(initialMonthId);
  const [day, setDay] = useState<number>(initialDay);
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setMonthId(initialMonthId);
    const maxD = getMaxDaysForBikramiMonth(initialMonthId);
    setDay(Math.min(Math.max(1, initialDay), maxD));
    setFormError(null);
  }, [isOpen, initialMonthId, initialDay]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxDayForMonth = getMaxDaysForBikramiMonth(monthId);
  const dayOptions = Array.from({length: maxDayForMonth}, (_, idx) => idx + 1);

  const handleMonthChange = (newMonthId: number) => {
    setMonthId(newMonthId);
    const newMax = getMaxDaysForBikramiMonth(newMonthId);
    if (day > newMax) setDay(newMax);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedTitle = title.trim();
    if (!cleanedTitle) {
      setFormError(
        isPa
          ? 'ਕਿਰਪਾ ਕਰਕੇ ਪਰਿਵਾਰਕ ਦਿਹਾੜੇ ਦਾ ਨਾਮ ਲਿਖੋ।'
          : 'Please enter a name for this personal Desi date.',
      );
      return;
    }
    onAddPersonalDate({
      title: cleanedTitle,
      kind,
      monthId,
      day,
      notes: notes.trim() || undefined,
    });
    setTitle('');
    setNotes('');
    setFormError(null);
  };

  return (
    <div
      className="no-print fixed inset-0 z-50 flex justify-end bg-[var(--bg-backdrop)] backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="personal-dates-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative flex h-full w-full max-w-md flex-col bg-[var(--bg-canvas)] border-l border-[var(--border-subtle)] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] px-5 py-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <CalendarHeart
                className="w-4 h-4 text-[var(--accent-personal)] shrink-0"
                aria-hidden="true"
              />
              <h2
                id="personal-dates-title"
                className="font-display text-2xl font-semibold text-[var(--text-heading)] leading-tight"
              >
                {isPa ? 'ਮੇਰੀਆਂ ਦੇਸੀ ਤਾਰੀਖ਼ਾਂ' : 'My Desi Dates'}
              </h2>
            </div>
            <p className="mt-0.5 text-xs text-[var(--text-muted)]">
              {isPa
                ? 'ਪਰਿਵਾਰਕ ਜਨਮ ਦਿਨ, ਅਨੰਦ ਕਾਰਜ, ਬਰਸੀ ਜਾਂ ਅਰਦਾਸ ਦੇਸੀ ਮਹੀਨੇ ਅਨੁਸਾਰ ਸੰਭਾਲੋ (ਸਿਰਫ਼ ਤੁਹਾਡੇ ਫ਼ੋਨ ’ਤੇ)।'
                : 'Save family Janam Din, Anand Karaj, Barsi, or Ardaas dates by Desi Month & Day — stored privately on your device.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={isPa ? 'ਬੰਦ ਕਰੋ' : 'Close My Desi Dates drawer'}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
          {/* Add Personal Date Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-soft)] p-4 space-y-3.5"
            noValidate
          >
            <h3 className="text-xs font-semibold text-[var(--text-heading)]">
              {isPa ? 'ਨਵੀਂ ਦੇਸੀ ਤਾਰੀਖ਼ ਜੋੜੋ' : 'Add a Personal Desi Date'}
            </h3>

            <div className="space-y-1">
              <label
                htmlFor="personal-date-title"
                className="block text-xs font-medium text-[var(--text-secondary)]"
              >
                {isPa ? 'ਨਾਮ / ਵੇਰਵਾ' : 'Event Name'}
              </label>
              <input
                id="personal-date-title"
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (formError) setFormError(null);
                }}
                maxLength={80}
                placeholder={
                  isPa ? 'ਉਦਾਹਰਨ: ਮਾਤਾ ਜੀ ਦਾ ਜਨਮ ਦਿਨ' : 'e.g. Mata Ji Janam Din'
                }
                className="w-full min-h-[44px] rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface-elevated)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-faint)] focus:outline-2 focus:outline-[var(--accent-primary)]"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="personal-date-kind"
                className="block text-xs font-medium text-[var(--text-secondary)]"
              >
                {isPa ? 'ਕਿਸਮ' : 'Occasion'}
              </label>
              <select
                id="personal-date-kind"
                value={kind}
                onChange={(e) => setKind(e.target.value as PersonalDateKind)}
                className="w-full min-h-[44px] rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface-elevated)] px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-2 focus:outline-[var(--accent-primary)] cursor-pointer"
              >
                {PERSONAL_DATE_KINDS.map((k) => (
                  <option key={k.id} value={k.id}>
                    {isPa ? k.labelPa : k.labelEn}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2 space-y-1">
                <label
                  htmlFor="personal-date-month"
                  className="block text-xs font-medium text-[var(--text-secondary)]"
                >
                  {isPa ? 'ਦੇਸੀ ਮਹੀਨਾ' : 'Desi Month'}
                </label>
                <select
                  id="personal-date-month"
                  value={monthId}
                  onChange={(e) => handleMonthChange(Number(e.target.value))}
                  className="w-full min-h-[44px] rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface-elevated)] px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-2 focus:outline-[var(--accent-primary)] cursor-pointer"
                >
                  {BIKRAMI_MONTHS.map((m) => (
                    <option key={m.id} value={m.id}>
                      {isPa ? m.namePa : m.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-1 space-y-1">
                <label
                  htmlFor="personal-date-day"
                  className="block text-xs font-medium text-[var(--text-secondary)]"
                >
                  {isPa ? 'ਤਾਰੀਖ਼' : 'Day'}
                </label>
                <select
                  id="personal-date-day"
                  value={day}
                  onChange={(e) => setDay(Number(e.target.value))}
                  className="w-full min-h-[44px] rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface-elevated)] px-2.5 py-2 text-sm font-mono-tabular text-[var(--text-primary)] focus:outline-2 focus:outline-[var(--accent-primary)] cursor-pointer"
                >
                  {dayOptions.map((d) => (
                    <option key={d} value={d}>
                      {isPa ? toGurmukhiNumerals(d) : d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="personal-date-notes"
                className="block text-xs font-medium text-[var(--text-secondary)]"
              >
                {isPa ? 'ਨੋਟ (ਵਿਕਲਪਿਕ)' : 'Note (optional)'}
              </label>
              <input
                id="personal-date-notes"
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                maxLength={160}
                placeholder={
                  isPa ? 'ਉਦਾਹਰਨ: ਸ੍ਰੀ ਸੁਖਮਨੀ ਸਾਹਿਬ ਪਾਠ' : 'e.g. Sri Sukhmani Sahib Path'
                }
                className="w-full min-h-[42px] rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface-elevated)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-faint)] focus:outline-2 focus:outline-[var(--accent-primary)]"
              />
            </div>

            {formError && (
              <p role="alert" className="text-xs font-medium text-[var(--accent-shaheedi)]">
                {formError}
              </p>
            )}

            <button
              type="submit"
              data-testid="save-personal-date-btn"
              className="w-full inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 text-sm font-medium rounded-md bg-[var(--accent-primary)] text-[var(--accent-on-primary)] hover:bg-[var(--accent-primary-hover)] transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              <span>{isPa ? 'ਦੇਸੀ ਤਾਰੀਖ਼ ਸੰਭਾਲੋ' : 'Save Desi Date'}</span>
            </button>
          </form>

          {/* Saved Family Desi Dates List */}
          <div className="space-y-3">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="text-xs font-semibold text-[var(--text-heading)]">
                {isPa ? 'ਸੰਭਾਲੀਆਂ ਗਈਆਂ ਤਾਰੀਖ਼ਾਂ' : 'Saved Family Dates'}
              </h3>
              <span className="text-xs font-mono-tabular text-[var(--text-faint)]">
                {isPa ? toGurmukhiNumerals(personalDates.length) : personalDates.length}
              </span>
            </div>

            {personalDates.length === 0 ? (
              <div className="rounded-lg border border-dashed border-[var(--border-strong)] p-5 text-center space-y-1">
                <p className="text-sm font-medium text-[var(--text-secondary)]">
                  {isPa ? 'ਹਾਲੇ ਕੋਈ ਨਿੱਜੀ ਦੇਸੀ ਤਾਰੀਖ਼ ਨਹੀਂ ਜੋੜੀ ਗਈ।' : 'No personal Desi dates saved yet.'}
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  {isPa
                    ? 'ਉੱਪਰ ਦਿੱਤੇ ਫਾਰਮ ਵਿੱਚ ਪਰਿਵਾਰਕ ਦਿਹਾੜੇ ਜੋੜੋ — ਇਹ ਜੰਤਰੀ ਗ੍ਰਿੱਡ ਅਤੇ .ics ਐਕਸਪੋਰਟ ਵਿੱਚ ਦਿਖਾਈ ਦੇਣਗੇ।'
                    : 'Add family milestones above to see subtle badges on the calendar grid, 1-day-before reminders, and .ics exports.'}
                </p>
              </div>
            ) : (
              <ul className="space-y-2.5" data-testid="personal-dates-list">
                {personalDates.map((pd) => {
                  const nextOcc = resolveNextOccurrenceForPersonalDate(pd, todayIso);
                  const desiEn = formatPersonalDesiDateLabel(pd.monthId, pd.day, false);
                  const desiPa = formatPersonalDesiDateLabel(pd.monthId, pd.day, true);
                  return (
                    <li
                      key={pd.id}
                      className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] p-3.5 flex items-start justify-between gap-3"
                    >
                      <div className="min-w-0 space-y-1">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs">
                          <span className="font-semibold text-[var(--accent-personal)]">
                            {isPa ? desiPa : `${desiEn} · ${desiPa}`}
                          </span>
                          <span aria-hidden="true" className="text-[var(--accent-gold)]">
                            ·
                          </span>
                          <span className="text-[var(--text-muted)]">
                            {getPersonalDateKindLabel(pd.kind, isPa)}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-[var(--text-primary)] leading-snug">
                          {pd.title}
                        </p>
                        {pd.notes && (
                          <p className="text-xs text-[var(--text-muted)]">{pd.notes}</p>
                        )}
                        {nextOcc && (
                          <button
                            type="button"
                            onClick={() => {
                              onJumpToDate(nextOcc.isoDate);
                              onClose();
                            }}
                            className="inline-block pt-0.5 text-xs font-medium text-[var(--accent-primary-text)] hover:underline underline-offset-4 cursor-pointer"
                          >
                            {isPa
                              ? `ਅਗਲੀ ਵਾਰ: ${formatGregorianDate(nextOcc.isoDate, 'pa', false)} →`
                              : `Next: ${formatGregorianDate(nextOcc.isoDate, 'en', false)} (Sambat ${nextOcc.sambat}) →`}
                          </button>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => onDeletePersonalDate(pd.id)}
                        aria-label={isPa ? `'${pd.title}' ਹਟਾਓ` : `Delete '${pd.title}'`}
                        className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-md text-[var(--text-faint)] hover:text-[var(--accent-shaheedi)] hover:bg-[var(--bg-hover)] transition-colors shrink-0 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] px-5 py-3.5">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenIcsModal();
            }}
            className="inline-flex items-center gap-1.5 min-h-[42px] px-3.5 py-2 text-xs font-medium rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors whitespace-nowrap cursor-pointer"
          >
            <CalendarPlus className="w-3.5 h-3.5 text-[var(--accent-primary-text)]" aria-hidden="true" />
            <span>{isPa ? '.ics ਵਿੱਚ ਐਕਸਪੋਰਟ ਕਰੋ' : 'Export in .ics'}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="min-h-[42px] px-4 py-2 text-xs font-medium rounded-md bg-[var(--accent-navy)] text-[var(--accent-on-navy)] hover:bg-[var(--accent-navy-hover)] transition-colors whitespace-nowrap cursor-pointer"
          >
            {isPa ? 'ਮੁਕੰਮਲ' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
};
