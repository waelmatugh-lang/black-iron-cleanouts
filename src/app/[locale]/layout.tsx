import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations, getMessages, setRequestLocale } from 'next-intl/server';
import { Inter, Sora, Cairo } from 'next/font/google';
import { routing, type Locale } from '@/i18n/routing';
import { site } from '@/lib/site';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { MobileCallBar } from '@/components/MobileCallBar';
import { JsonLd } from '@/components/JsonLd';
import { ThemeScript } from '@/components/ThemeScript';
import '../globals.css';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a1626' },
  ],
};

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const sora = Sora({ subsets: ['latin'], variable: '--font-sora', display: 'swap' });
const cairo = Cairo({ subsets: ['arabic', 'latin'], variable: '--font-cairo', display: 'swap' });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    metadataBase: new URL(site.url),
    title: { default: `${site.name} — ${t('titleSuffix')}`, template: `%s · ${site.shortName}` },
    description: t('description'),
    alternates: {
      canonical: `/${locale}`,
      languages: { en: '/en', es: '/es', ar: '/ar' },
    },
    openGraph: {
      type: 'website',
      siteName: site.name,
      title: `${site.name} — ${t('titleSuffix')}`,
      description: t('description'),
      locale,
      images: [{ url: '/images/og.png', width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${site.name} — ${t('titleSuffix')}`,
      description: t('description'),
      images: ['/images/og.png'],
    },
    icons: {
      icon: [
        { url: '/images/favicon-256.png', type: 'image/png', sizes: '512x512' },
        { url: '/favicon.svg', type: 'image/svg+xml' },
      ],
      apple: '/images/favicon-256.png',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'nav' });
  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const fontVars =
    locale === 'ar'
      ? { ['--font-body' as string]: 'var(--font-cairo)', ['--font-display' as string]: 'var(--font-cairo)' }
      : { ['--font-body' as string]: 'var(--font-inter)', ['--font-display' as string]: 'var(--font-sora)' };

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${inter.variable} ${sora.variable} ${cairo.variable}`}
      style={fontVars}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col pb-16 sm:pb-0" suppressHydrationWarning>
        <ThemeScript />
        <JsonLd />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
          >
            {t('skipToContent')}
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppButton label={t('chatWhatsApp')} />
          <MobileCallBar />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
