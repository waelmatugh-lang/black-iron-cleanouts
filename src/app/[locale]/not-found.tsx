import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export default async function NotFound() {
  const t = await getTranslations('nav');
  return (
    <section className="section">
      <div className="container-x text-center">
        <p className="text-7xl font-extrabold text-accent">404</p>
        <h1 className="mt-4 text-2xl font-bold">Page not found</h1>
        <p className="mx-auto mt-3 max-w-md text-muted">
          The page you’re looking for doesn’t exist or has moved.
        </p>
        <Link href="/" className="btn-primary mt-8">
          {t('home')}
        </Link>
      </div>
    </section>
  );
}
