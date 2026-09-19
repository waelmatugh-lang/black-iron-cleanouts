import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { site } from '@/lib/site';
import { SectionHeading } from '@/components/SectionHeading';
import { PageHero } from '@/components/PageHero';
import { Faq } from '@/components/Faq';
import {
  ArrowRightIcon,
  CheckIcon,
  CloseIcon,
  DollarIcon,
  HeartHandIcon,
  LeafIcon,
  ClockIcon,
  MailIcon,
  PhoneIcon,
  WhatsAppIcon,
  BoxesIcon,
  TruckIcon,
  HomeIcon,
} from '@/components/icons';

const whyIcons = [DollarIcon, HeartHandIcon, LeafIcon, ClockIcon];
const stepIcons = [BoxesIcon, TruckIcon, HomeIcon];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'donation' });
  return { title: t('hero.title'), description: t('hero.subtitle') };
}

export default async function DonationPickupPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('donation');
  const nav = await getTranslations('nav');

  const steps = t.raw('steps.items') as { title: string; desc: string }[];
  const why = t.raw('why.items') as { title: string; desc: string }[];
  const acceptYes = t.raw('accept.yes.items') as string[];
  const acceptNo = t.raw('accept.no.items') as string[];
  const charities = t.raw('charities.items') as string[];
  const points = t.raw('partners.points') as string[];
  const faqItems = t.raw('faq.items') as { q: string; a: string }[];

  const partnerMailto = `mailto:${site.email}?subject=${encodeURIComponent(
    'Donation pickup partnership — ' + site.name,
  )}`;

  return (
    <>
      <PageHero badge={t('hero.badge')} title={t('hero.title')} subtitle={t('hero.subtitle')} />

      {/* ===================== STEPS ===================== */}
      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow={t('steps.eyebrow')} title={t('steps.title')} />
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => {
              const Icon = stepIcons[i] ?? BoxesIcon;
              return (
                <li key={s.title} className="card relative p-7">
                  <span className="absolute end-6 top-6 text-4xl font-black text-border" aria-hidden>
                    {i + 1}
                  </span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest-50 text-forest-600 dark:bg-forest-500/15 dark:text-forest-300">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-muted">{s.desc}</p>
                </li>
              );
            })}
          </ol>
          <div className="mt-8 flex justify-center">
            <Link href={{ pathname: '/quote', query: { service: 'donation' } }} className="btn-primary">
              {t('cta.button')}
              <ArrowRightIcon className="h-5 w-5 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== WHY ===================== */}
      <section className="section bg-surface-2">
        <div className="container-x">
          <SectionHeading eyebrow={t('why.eyebrow')} title={t('why.title')} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {why.map((w, i) => {
              const Icon = whyIcons[i] ?? CheckIcon;
              return (
                <div key={w.title} className="card p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy-700 dark:bg-navy-400/15 dark:text-navy-200">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-bold">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{w.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== ACCEPT / NOT ===================== */}
      <section className="section">
        <div className="container-x">
          <SectionHeading title={t('accept.title')} subtitle={t('accept.note')} />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="card p-7">
              <h3 className="flex items-center gap-2 text-lg font-bold">
                <CheckIcon className="h-6 w-6 text-accent" />
                {t('accept.yes.title')}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {acceptYes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-base text-fg">
                    <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-7">
              <h3 className="flex items-center gap-2 text-lg font-bold">
                <CloseIcon className="h-6 w-6 text-muted" />
                {t('accept.no.title')}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {acceptNo.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-base text-muted">
                    <CloseIcon className="mt-0.5 h-5 w-5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== CHARITIES + PHOTO ===================== */}
      <section className="section bg-surface-2">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow={t('charities.eyebrow')}
              title={t('charities.title')}
              subtitle={t('charities.subtitle')}
              align="start"
            />
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {charities.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-fg"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-lift ring-1 ring-border">
            <Image
              src="/images/truck.jpg"
              alt={`${site.name} truck`}
              fill
              sizes="(min-width: 1024px) 40rem, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* ===================== FOR CHARITIES ===================== */}
      <section className="section">
        <div className="container-x">
          <div className="rounded-[1.75rem] border border-border bg-surface p-8 shadow-lift sm:p-12">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-accent">{t('partners.eyebrow')}</p>
                <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">{t('partners.title')}</h2>
                <p className="mt-4 text-base leading-relaxed text-muted">{t('partners.text')}</p>
                <ul className="mt-6 space-y-2.5">
                  {points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-base text-fg">
                      <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-3">
                <a href={partnerMailto} className="btn-primary w-full">
                  <MailIcon className="h-5 w-5" />
                  {t('partners.button')}
                </a>
                <a href={site.phoneHref} className="btn-outline w-full">
                  <PhoneIcon className="h-5 w-5" />
                  {t('partners.call')} {site.phone}
                </a>
                <a
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn w-full bg-[#25D366] text-white hover:bg-[#1faa53]"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  {nav('chatWhatsApp')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section className="section bg-surface-2">
        <div className="container-x">
          <SectionHeading eyebrow={t('faq.eyebrow')} title={t('faq.title')} />
          <Faq items={faqItems} />
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="section">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-navy-900 px-6 py-14 text-center shadow-lift sm:px-12 sm:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                backgroundSize: '22px 22px',
              }}
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{t('cta.title')}</h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-steel-200">{t('cta.subtitle')}</p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href={{ pathname: '/quote', query: { service: 'donation' } }}
                  className="btn-primary w-full sm:w-auto"
                >
                  {t('cta.button')}
                  <ArrowRightIcon className="h-5 w-5 rtl:rotate-180" />
                </Link>
                <a
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn w-full bg-[#25D366] text-white hover:bg-[#1faa53] sm:w-auto"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  {nav('chatWhatsApp')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
