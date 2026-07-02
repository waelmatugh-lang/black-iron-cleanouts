import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { site } from '@/lib/site';
import type { Locale } from '@/i18n/routing';
import { SectionHeading } from '@/components/SectionHeading';
import { CtaBand } from '@/components/CtaBand';
import { PageHero } from '@/components/PageHero';
import { serviceIcons } from '@/components/serviceIcons';
import { CheckIcon, HomeIcon, BuildingIcon, TrashIcon } from '@/components/icons';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });
  return { title: t('hero.title'), description: t('hero.subtitle') };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('services');

  const items = t.raw('items') as {
    key: string;
    title: string;
    desc: string;
    features: string[];
  }[];

  return (
    <>
      <PageHero badge={t('hero.badge')} title={t('hero.title')} subtitle={t('hero.subtitle')} />

      <section className="section">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          {items.map((s) => {
            const Icon = serviceIcons[s.key] ?? TrashIcon;
            return (
              <div key={s.key} className="card flex flex-col p-7 sm:p-8">
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-forest-50 text-forest-600 dark:bg-forest-500/15 dark:text-forest-300">
                    <Icon className="h-7 w-7" />
                  </span>
                  <h2 className="text-xl font-bold">{s.title}</h2>
                </div>
                <p className="mt-4 text-base leading-relaxed text-muted">{s.desc}</p>
                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-fg">
                      <CheckIcon className="h-5 w-5 shrink-0 text-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Feature image — crew at work */}
      <section className="pb-4">
        <div className="container-x">
          <div className="relative mx-auto aspect-[16/10] max-w-4xl overflow-hidden rounded-[1.75rem] shadow-lift ring-1 ring-border">
            <Image
              src="/images/cleanout.jpg"
              alt={`${site.name} crew loading furniture`}
              fill
              sizes="(min-width: 768px) 56rem, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* Residential vs Commercial */}
      <section className="section bg-surface-2">
        <div className="container-x">
          <SectionHeading title={t('segments.title')} />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {(['residential', 'commercial'] as const).map((seg) => {
              const Icon = seg === 'residential' ? HomeIcon : BuildingIcon;
              return (
                <div key={seg} className="card p-8">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy-700 dark:bg-navy-400/15 dark:text-navy-200">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold">{t(`segments.${seg}.title`)}</h3>
                  <p className="mt-2 text-base leading-relaxed text-muted">
                    {t(`segments.${seg}.desc`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand title={t('cta.title')} subtitle={t('cta.subtitle')} button={t('cta.button')} />
    </>
  );
}
