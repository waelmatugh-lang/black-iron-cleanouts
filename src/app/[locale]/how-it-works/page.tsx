import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { PageHero } from '@/components/PageHero';
import { SectionHeading } from '@/components/SectionHeading';
import { CtaBand } from '@/components/CtaBand';
import { CheckIcon } from '@/components/icons';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'howItWorks' });
  return { title: t('hero.title'), description: t('hero.subtitle') };
}

export default async function HowItWorksPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('howItWorks');

  const steps = t.raw('steps') as { title: string; desc: string }[];
  const points = t.raw('pricing.points') as string[];

  return (
    <>
      <PageHero badge={t('hero.badge')} title={t('hero.title')} subtitle={t('hero.subtitle')} />

      <section className="section">
        <div className="container-x">
          <ol className="mx-auto max-w-3xl space-y-6">
            {steps.map((step, i) => (
              <li key={step.title} className="card flex gap-5 p-6 sm:p-7">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-lg font-extrabold text-accent-fg">
                  {i + 1}
                </span>
                <div>
                  <h2 className="text-lg font-bold">{step.title}</h2>
                  <p className="mt-2 text-base leading-relaxed text-muted">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-surface-2">
        <div className="container-x">
          <SectionHeading title={t('pricing.title')} subtitle={t('pricing.desc')} />
          <ul className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
            {points.map((p) => (
              <li key={p} className="card flex items-center gap-3 p-5">
                <CheckIcon className="h-6 w-6 shrink-0 text-accent" />
                <span className="text-base font-medium text-fg">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title={t('cta.title')} subtitle={t('cta.subtitle')} button={t('cta.button')} />
    </>
  );
}
