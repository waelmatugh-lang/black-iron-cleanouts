import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { site } from '@/lib/site';
import { PRICES_CONFIRMED } from '@/lib/pricing';
import { PageHero } from '@/components/PageHero';
import { EstimateCalculator } from '@/components/EstimateCalculator';
import { WhatsAppIcon } from '@/components/icons';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'estimate' });
  return {
    title: t('hero.title'),
    description: t('hero.subtitle'),
    // Keep search engines away until the owners have confirmed the real prices.
    robots: PRICES_CONFIRMED ? undefined : { index: false, follow: false },
  };
}

export default async function EstimatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('estimate');

  return (
    <>
      <PageHero badge={t('hero.badge')} title={t('hero.title')} subtitle={t('hero.subtitle')} />

      <section className="section">
        <div className="container-x">
          {!PRICES_CONFIRMED && (
            <p
              role="note"
              className="mb-8 rounded-xl border border-amber-300/60 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-200"
            >
              {t('preliminary')}
            </p>
          )}

          {/* useSearchParams inside the calculator needs a Suspense boundary on a static page */}
          <Suspense>
            <EstimateCalculator />
          </Suspense>

          <div className="mt-14 flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-surface-2 p-6 text-center sm:flex-row sm:text-start">
            <div>
              <h2 className="text-lg font-bold">{t('help.title')}</h2>
              <p className="mt-1 text-sm text-muted">{t('help.text')}</p>
            </div>
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn shrink-0 bg-[#25D366] text-white hover:bg-[#1faa53]"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {site.whatsapp}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
