'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { site } from '@/lib/site';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { MenuIcon, CloseIcon, PhoneIcon, ArrowRightIcon } from './icons';

const NAV = [
  { href: '/', key: 'home' },
  { href: '/services', key: 'services' },
  { href: '/how-it-works', key: 'howItWorks' },
  { href: '/service-areas', key: 'serviceAreas' },
  { href: '/about', key: 'about' },
  { href: '/contact', key: 'contact' },
] as const;

export function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-200 ${
        scrolled
          ? 'border-b border-border bg-surface/90 backdrop-blur-md'
          : 'bg-surface'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link href="/" aria-label={site.name} className="shrink-0">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const active =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-surface-2 text-accent'
                    : 'text-fg hover:bg-surface-2'
                }`}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.phoneHref}
            className="hidden shrink-0 items-center gap-2 whitespace-nowrap text-sm font-semibold text-fg hover:text-accent xl:flex"
          >
            <PhoneIcon className="h-4 w-4 shrink-0 text-accent" />
            {site.phone}
          </a>
          <ThemeToggle className="hidden sm:inline-flex" />
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
          <Link href="/quote" className="btn-primary hidden h-10 px-5 py-0 text-sm sm:inline-flex">
            {t('getQuote')}
            <ArrowRightIcon className="h-4 w-4 rtl:rotate-180" />
          </Link>
          <button
            type="button"
            className="btn-ghost p-2 lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden">
          <div
            className="fixed inset-0 top-16 z-40 bg-navy-950/40"
            onClick={() => setOpen(false)}
          />
          <nav className="fixed inset-x-0 top-16 z-50 max-h-[calc(100dvh-4rem)] overflow-auto border-b border-border bg-surface px-4 pb-6 pt-2 shadow-lift">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-1">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
              <button
                type="button"
                className="btn-ghost p-2"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <CloseIcon className="h-6 w-6" />
              </button>
            </div>
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-xl px-4 py-3 text-base font-medium text-fg hover:bg-surface-2"
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="mt-4 grid gap-3">
              <Link href="/quote" className="btn-primary w-full">
                {t('getQuote')}
              </Link>
              <a href={site.phoneHref} className="btn-outline w-full">
                <PhoneIcon className="h-5 w-5 text-accent" />
                {site.phone}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
