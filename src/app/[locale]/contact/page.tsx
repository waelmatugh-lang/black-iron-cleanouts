import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { site } from '@/lib/site';
import { PageHero } from '@/components/PageHero';
import { QuoteForm } from '@/components/QuoteForm';
import {
  PhoneIcon,
  WhatsAppIcon,
  MailIcon,
  MapPinIcon,
  ClockIcon,
} from '@/components/icons';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return { title: t('hero.title'), description: t('hero.subtitle') };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');

  const methods = [
    {
      title: t('methods.callTitle'),
      value: site.phone,
      href: site.phoneHref,
      Icon: PhoneIcon,
      color: 'text-accent',
    },
    {
      title: t('methods.whatsappTitle'),
      value: site.whatsapp,
      href: site.whatsappHref,
      Icon: WhatsAppIcon,
      color: 'text-[#25D366]',
      external: true,
    },
    {
      title: t('methods.emailTitle'),
      value: site.email,
      href: `mailto:${site.email}`,
      Icon: MailIcon,
      color: 'text-accent',
    },
  ];

  return (
    <>
      <PageHero badge={t('hero.badge')} title={t('hero.title')} subtitle={t('hero.subtitle')} />

      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-[20rem_1fr]">
          <div className="space-y-4">
            {methods.map((m) => (
              <a
                key={m.title}
                href={m.href}
                target={m.external ? '_blank' : undefined}
                rel={m.external ? 'noopener noreferrer' : undefined}
                className="card flex items-center gap-4 p-5 transition-shadow hover:shadow-lift"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-surface-2">
                  <m.Icon className={`h-6 w-6 ${m.color}`} />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-muted">
                    {m.title}
                  </span>
                  <span className="block break-all font-semibold text-fg">{m.value}</span>
                </span>
              </a>
            ))}

            <div className="card p-5">
              <div className="flex items-center gap-3">
                <MapPinIcon className="h-5 w-5 text-accent" />
                <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                  {t('methods.areaTitle')}
                </span>
              </div>
              <p className="mt-2 text-sm font-medium text-fg">{site.address.serviceArea}</p>
              <p className="text-sm text-muted">{site.address.full}</p>
            </div>

            <div className="card p-5">
              <div className="flex items-center gap-3">
                <ClockIcon className="h-5 w-5 text-accent" />
                <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                  {t('methods.hoursTitle')}
                </span>
              </div>
              <p className="mt-2 text-sm font-medium text-fg">{site.hours}</p>
            </div>

            <p className="px-1 text-sm text-muted">{t('languagesNote')}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">{t('formTitle')}</h2>
            <div className="mt-5">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
