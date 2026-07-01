import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { site } from '@/lib/site';
import type { Locale } from '@/i18n/routing';
import { SectionHeading } from '@/components/SectionHeading';
import { Faq } from '@/components/Faq';
import { CtaBand } from '@/components/CtaBand';
import { serviceIcons } from '@/components/serviceIcons';
import {
  ArrowRightIcon,
  WhatsAppIcon,
  CheckIcon,
  ShieldCheckIcon,
  ClockIcon,
  DollarIcon,
  LeafIcon,
  HomeIcon,
  HeartHandIcon,
  StarIcon,
  RecycleIcon,
  TrashIcon,
  MapPinIcon,
} from '@/components/icons';

const whyIcons = [DollarIcon, ClockIcon, ShieldCheckIcon, LeafIcon, ShieldCheckIcon, HeartHandIcon];
const ecoIcons = [HeartHandIcon, RecycleIcon, TrashIcon];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');

  const services = t.raw('services.items') as { key: string; title: string; desc: string }[];
  const whyItems = t.raw('why.items') as { title: string; desc: string }[];
  const steps = t.raw('process.steps') as { title: string; desc: string }[];
  const ecoPoints = t.raw('eco.points') as { title: string; desc: string }[];
  const stats = t.raw('stats.items') as { value: string; label: string }[];
  const testimonials = t.raw('testimonials.items') as { quote: string; name: string; location: string }[];
  const faqItems = t.raw('faq.items') as { q: string; a: string }[];
  const trust = t.raw('hero.trust') as string[];
  const cities = (await getTranslations('serviceAreas')).raw('cities') as string[];

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -end-24 -top-24 h-96 w-96 rounded-full bg-forest-600/20 blur-3xl"
        />
        <div className="container-x relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-steel-100">
              <MapPinIcon className="h-4 w-4 text-forest-300" />
              {t('hero.badge')}
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
              {t('hero.title')}
              <br />
              <span className="text-forest-300">{t('hero.titleAccent')}</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-steel-200">
              {t('hero.subtitle')}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/quote" className="btn-primary">
                {t('hero.ctaPrimary')}
                <ArrowRightIcon className="h-5 w-5 rtl:rotate-180" />
              </Link>
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-[#25D366] text-white hover:bg-[#1faa53]"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {t('hero.ctaSecondary')}
              </a>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {trust.map((point) => (
                <li key={point} className="flex items-center gap-2 text-sm font-medium text-steel-100">
                  <CheckIcon className="h-5 w-5 text-forest-300" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Hero visual — the real branded truck */}
          <div className="relative mx-auto hidden w-full max-w-xl lg:block">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 shadow-lift">
              <Image
                src="/images/truck.jpg"
                alt={`${site.name} box truck`}
                width={1024}
                height={768}
                priority
                sizes="(min-width: 1024px) 36rem, 100vw"
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              {[HeartHandIcon, RecycleIcon, TrashIcon].map((Icon, i) => (
                <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <Icon className="mx-auto h-6 w-6 text-forest-300" />
                  <span className="mt-1 block text-2xs font-semibold uppercase tracking-wide text-steel-200">
                    {ecoPoints[i].title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="relative border-t border-white/10 bg-navy-950/40">
          <div className="container-x grid grid-cols-2 gap-6 py-8 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center lg:text-start">
                <div className="text-xl font-extrabold text-white sm:text-2xl">{s.value}</div>
                <div className="mt-1 text-sm text-steel-300">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== SERVICES ===================== */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow={t('services.eyebrow')}
            title={t('services.title')}
            subtitle={t('services.subtitle')}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const Icon = serviceIcons[s.key] ?? TrashIcon;
              return (
                <Link
                  key={s.key}
                  href="/services"
                  className="card group flex flex-col p-6 transition-shadow duration-200 hover:shadow-lift"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest-50 text-forest-600 dark:bg-forest-500/15 dark:text-forest-300">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    {t('services.cta')}
                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== WHY US ===================== */}
      <section className="section bg-surface-2">
        <div className="container-x">
          <SectionHeading
            eyebrow={t('why.eyebrow')}
            title={t('why.title')}
            subtitle={t('why.subtitle')}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyItems.map((item, i) => {
              const Icon = whyIcons[i] ?? ShieldCheckIcon;
              return (
                <div key={item.title} className="card p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy-700 dark:bg-navy-400/15 dark:text-navy-200">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-base font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== PROCESS ===================== */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow={t('process.eyebrow')}
            title={t('process.title')}
            subtitle={t('process.subtitle')}
          />
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <li key={step.title} className="relative card p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-base font-extrabold text-accent-fg">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-base font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===================== FEATURE IMAGE ===================== */}
      <section className="pb-4">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-[1.75rem] shadow-lift ring-1 ring-border">
            <Image
              src="/images/fleet.jpg"
              alt={`${site.name} crew and trucks`}
              width={1024}
              height={559}
              sizes="(min-width: 1280px) 80rem, 100vw"
              className="h-auto w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
              <p className="max-w-xl text-lg font-semibold text-white sm:text-2xl">
                {site.tagline}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== ECO ===================== */}
      <section className="section bg-forest-950 text-white">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-forest-300">{t('eco.eyebrow')}</p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">{t('eco.title')}</h2>
            <p className="mt-4 text-lg leading-relaxed text-forest-100">{t('eco.subtitle')}</p>
          </div>
          <div className="grid gap-4">
            {ecoPoints.map((p, i) => {
              const Icon = ecoIcons[i] ?? LeafIcon;
              return (
                <div
                  key={p.title}
                  className="flex items-start gap-4 rounded-card border border-white/10 bg-white/[0.04] p-5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest-500/20 text-forest-200">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-forest-100">{p.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== AREAS ===================== */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow={t('areas.eyebrow')}
            title={t('areas.title')}
            subtitle={t('areas.subtitle')}
          />
          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
            {cities.slice(0, 12).map((city) => (
              <span
                key={city}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-fg"
              >
                <MapPinIcon className="h-4 w-4 text-accent" />
                {city}
              </span>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/service-areas" className="btn-outline">
              {t('areas.cta')}
              <ArrowRightIcon className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== TESTIMONIALS ===================== */}
      <section className="section bg-surface-2">
        <div className="container-x">
          <SectionHeading eyebrow={t('testimonials.eyebrow')} title={t('testimonials.title')} />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.map((tm) => (
              <figure key={tm.name} className="card flex flex-col p-6">
                <div className="flex gap-0.5 text-accent" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-base leading-relaxed text-fg">
                  “{tm.quote}”
                </blockquote>
                <figcaption className="mt-5 border-t border-border pt-4">
                  <span className="block text-sm font-bold">{tm.name}</span>
                  <span className="block text-sm text-muted">{tm.location}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow={t('faq.eyebrow')} title={t('faq.title')} />
          <Faq items={faqItems} />
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <CtaBand
        title={t('cta.title')}
        subtitle={t('cta.subtitle')}
        button={t('cta.primary')}
      />
    </>
  );
}
