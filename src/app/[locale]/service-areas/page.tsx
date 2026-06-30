import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { PageHero } from '@/components/PageHero';
import { CtaBand } from '@/components/CtaBand';
import { MapPinIcon } from '@/components/icons';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'serviceAreas' });
  return { title: t('hero.title'), description: t('hero.subtitle') };
}

export default async function ServiceAreasPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('serviceAreas');
  const cities = t.raw('cities') as string[];

  return (
    <>
      <PageHero badge={t('hero.badge')} title={t('hero.title')} subtitle={t('hero.subtitle')} />

      <section className="section">
        <div className="container-x">
          <p className="mx-auto max-w-2xl text-center text-lg text-muted">{t('intro')}</p>
          <ul className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {cities.map((city) => (
              <li
                key={city}
                className="card flex items-center gap-2.5 px-4 py-3.5 text-sm font-semibold text-fg"
              >
                <MapPinIcon className="h-5 w-5 shrink-0 text-accent" />
                {city}
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-8 max-w-xl text-center text-sm text-muted">{t('note')}</p>
        </div>
      </section>

      <CtaBand title={t('cta.title')} subtitle={t('cta.subtitle')} button={t('cta.button')} />
    </>
  );
}
