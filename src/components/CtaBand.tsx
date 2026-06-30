import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { site } from '@/lib/site';
import { ArrowRightIcon, WhatsAppIcon } from './icons';

export function CtaBand({
  title,
  subtitle,
  button,
}: {
  title: string;
  subtitle: string;
  button: string;
}) {
  const t = useTranslations('nav');
  return (
    <section className="section">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-navy-900 px-6 py-14 text-center shadow-lift sm:px-12 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '22px 22px',
            }}
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{title}</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-steel-200">{subtitle}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/quote" className="btn-primary w-full sm:w-auto">
                {button}
                <ArrowRightIcon className="h-5 w-5 rtl:rotate-180" />
              </Link>
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn w-full bg-[#25D366] text-white hover:bg-[#1faa53] sm:w-auto"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {t('chatWhatsApp')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
