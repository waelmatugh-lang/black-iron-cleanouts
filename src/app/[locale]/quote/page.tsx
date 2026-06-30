import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { site } from '@/lib/site';
import { PageHero } from '@/components/PageHero';
import { QuoteForm } from '@/components/QuoteForm';
import { PhoneIcon, WhatsAppIcon, ClockIcon, ShieldCheckIcon } from '@/components/icons';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'quote' });
  return { title: t('hero.title'), description: t('hero.subtitle') };
}

export default async function QuotePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('quote');
  const tc = await getTranslations('common');

  return (
    <>
      <PageHero badge={t('hero.badge')} title={t('hero.title')} subtitle={t('hero.subtitle')} />

      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_22rem]">
          <QuoteForm />

          <aside className="space-y-4 lg:order-last">
            <div className="card p-6">
              <h2 className="text-base font-bold">{tc('callUs')}</h2>
              <a href={site.phoneHref} className="mt-3 flex items-center gap-3 text-fg hover:text-accent">
                <PhoneIcon className="h-5 w-5 text-accent" />
                <span className="font-semibold">{site.phone}</span>
              </a>
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center gap-3 text-fg hover:text-accent"
              >
                <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
                <span className="font-semibold">{site.whatsapp}</span>
              </a>
              <div className="mt-4 flex items-center gap-3 text-sm text-muted">
                <ClockIcon className="h-5 w-5 text-accent" />
                {site.hours}
              </div>
            </div>

            <div className="card flex items-start gap-3 p-6">
              <ShieldCheckIcon className="h-6 w-6 shrink-0 text-accent" />
              <p className="text-sm leading-relaxed text-muted">
                <strong className="text-fg">{tc('licensed')}.</strong> {site.languages.join(' · ')}
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
