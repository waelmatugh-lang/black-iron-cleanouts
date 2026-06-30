import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { site } from '@/lib/site';
import { PageHero } from '@/components/PageHero';
import { SectionHeading } from '@/components/SectionHeading';
import { CtaBand } from '@/components/CtaBand';
import Image from 'next/image';
import { LeafIcon, ShieldCheckIcon, HeartHandIcon, ClockIcon } from '@/components/icons';

const valueIcons = [ShieldCheckIcon, HeartHandIcon, LeafIcon, ClockIcon];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return { title: t('hero.title'), description: t('hero.subtitle') };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');

  const paragraphs = t.raw('story.paragraphs') as string[];
  const values = t.raw('values.items') as { title: string; desc: string }[];

  return (
    <>
      <PageHero badge={t('hero.badge')} title={t('hero.title')} subtitle={t('hero.subtitle')} />

      <section className="section">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold sm:text-4xl">{t('story.title')}</h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {site.languages.map((l) => (
                <span
                  key={l}
                  className="rounded-full border border-border bg-surface-2 px-3 py-1 text-sm font-medium text-fg"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-lg space-y-4">
            <div className="overflow-hidden rounded-[2rem] shadow-lift ring-1 ring-border">
              <Image
                src="/images/team.jpg"
                alt={`The ${site.name} team`}
                width={1024}
                height={559}
                sizes="(min-width: 1024px) 32rem, 100vw"
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-2xl shadow-soft ring-1 ring-border">
              <Image
                src="/images/truck.jpg"
                alt={`${site.name} box truck`}
                width={1024}
                height={768}
                sizes="(min-width: 1024px) 32rem, 100vw"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-surface-2">
        <div className="container-x">
          <SectionHeading title={t('values.title')} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => {
              const Icon = valueIcons[i] ?? ShieldCheckIcon;
              return (
                <div key={v.title} className="card p-6 text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-forest-50 text-forest-600 dark:bg-forest-500/15 dark:text-forest-300">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-base font-bold">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div className="mx-auto max-w-3xl rounded-card border border-forest-200 bg-forest-50 p-8 text-center dark:border-forest-500/25 dark:bg-forest-500/10 sm:p-12">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-forest-600 text-white">
              <LeafIcon className="h-7 w-7" />
            </span>
            <h2 className="mt-5 text-2xl font-extrabold text-forest-900 dark:text-forest-200">{t('eco.title')}</h2>
            <p className="mt-3 text-base leading-relaxed text-forest-800 dark:text-forest-100">{t('eco.desc')}</p>
          </div>
        </div>
      </section>

      <CtaBand title={t('cta.title')} subtitle={t('cta.subtitle')} button={t('cta.button')} />
    </>
  );
}
