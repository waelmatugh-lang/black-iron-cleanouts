'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { SunIcon, MoonIcon } from './icons';

export function ThemeToggle({ className }: { className?: string }) {
  const t = useTranslations('nav');
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      /* ignore */
    }
    setDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t('toggleTheme')}
      title={t('toggleTheme')}
      className={`btn-ghost p-2 ${className ?? ''}`}
    >
      {/* Until mounted, render a stable icon to avoid hydration mismatch */}
      {mounted && dark ? (
        <SunIcon className="h-5 w-5" />
      ) : (
        <MoonIcon className="h-5 w-5" />
      )}
    </button>
  );
}
