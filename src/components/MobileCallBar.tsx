import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { site } from '@/lib/site';
import { PhoneIcon, ArrowRightIcon } from './icons';

/** Sticky bottom action bar — phones only. Reserve space via padding in layout. */
export function MobileCallBar() {
  const t = useTranslations('nav');
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-border bg-surface/95 px-3 py-2.5 backdrop-blur-md sm:hidden">
      <a href={site.phoneHref} className="btn-outline py-2.5 text-sm">
        <PhoneIcon className="h-5 w-5 text-accent" />
        {t('callNow')}
      </a>
      <Link href="/quote" className="btn-primary py-2.5 text-sm">
        {t('getQuote')}
        <ArrowRightIcon className="h-4 w-4 rtl:rotate-180" />
      </Link>
    </div>
  );
}
