import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { site } from '@/lib/site';
import { Logo } from './Logo';
import {
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  ClockIcon,
  WhatsAppIcon,
} from './icons';

export function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');

  const links = [
    { href: '/services', key: 'services' },
    { href: '/how-it-works', key: 'howItWorks' },
    { href: '/service-areas', key: 'serviceAreas' },
    { href: '/about', key: 'about' },
    { href: '/contact', key: 'contact' },
    { href: '/quote', key: 'getQuote' },
  ] as const;

  return (
    <footer className="mt-auto border-t border-border bg-surface-2">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            {t('blurb')}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {site.languages.map((l) => (
              <span
                key={l}
                className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted"
              >
                {l}
              </span>
            ))}
          </div>
        </div>

        <nav aria-label={t('quickLinks')}>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-fg">
            {t('quickLinks')}
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-muted hover:text-accent">
                  {nav(l.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-fg">
            {t('contact')}
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={site.phoneHref} className="flex items-center gap-3 text-muted hover:text-accent">
                <PhoneIcon className="h-5 w-5 shrink-0 text-accent" />
                {site.phone}
              </a>
            </li>
            <li>
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted hover:text-accent"
              >
                <WhatsAppIcon className="h-5 w-5 shrink-0 text-[#25D366]" />
                {site.whatsapp}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 break-all text-muted hover:text-accent">
                <MailIcon className="h-5 w-5 shrink-0 text-accent" />
                {site.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-fg">
            {t('visit')}
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li className="flex items-center gap-3">
              <MapPinIcon className="h-5 w-5 shrink-0 text-accent" />
              {site.address.full}
            </li>
            <li className="flex items-center gap-3">
              <ClockIcon className="h-5 w-5 shrink-0 text-accent" />
              {site.hours}
            </li>
          </ul>
          <p className="mt-4 text-sm text-muted">{t('serving')} {site.address.serviceArea}</p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. {t('rights')}
          </p>
          <p>{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
