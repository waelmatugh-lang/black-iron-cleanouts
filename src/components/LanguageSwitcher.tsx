'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter, locales, type Locale } from '@/i18n/routing';
import { ChevronDownIcon } from './icons';

const LABELS: Record<Locale, { native: string; short: string }> = {
  en: { native: 'English', short: 'EN' },
  es: { native: 'Español', short: 'ES' },
  ar: { native: 'العربية', short: 'AR' },
};

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  function switchTo(next: Locale) {
    setOpen(false);
    router.replace(pathname, { locale: next });
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="btn-ghost px-3 py-2 text-sm"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language"
      >
        <span className="font-bold">{LABELS[locale].short}</span>
        <ChevronDownIcon className="h-4 w-4" />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute end-0 z-50 mt-2 w-40 overflow-hidden rounded-xl border border-border bg-surface py-1 shadow-lift"
        >
          {locales.map((l) => (
            <li key={l}>
              <button
                type="button"
                role="option"
                aria-selected={l === locale}
                onClick={() => switchTo(l)}
                className={`flex w-full items-center justify-between px-4 py-2.5 text-sm hover:bg-surface-2 ${
                  l === locale ? 'font-semibold text-accent' : 'text-fg'
                }`}
                dir={l === 'ar' ? 'rtl' : 'ltr'}
              >
                <span>{LABELS[l].native}</span>
                <span className="text-xs text-muted">{LABELS[l].short}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
