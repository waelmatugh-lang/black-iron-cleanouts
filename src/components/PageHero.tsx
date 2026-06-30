import { MapPinIcon } from './icons';

export function PageHero({
  badge,
  title,
  subtitle,
}: {
  badge?: string;
  title: string;
  subtitle?: string;
}) {
  return (
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
        className="pointer-events-none absolute -end-20 -top-24 h-80 w-80 rounded-full bg-forest-600/20 blur-3xl"
      />
      <div className="container-x relative py-16 text-center sm:py-20">
        {badge && (
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-steel-100">
            <MapPinIcon className="h-4 w-4 text-forest-300" />
            {badge}
          </span>
        )}
        <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-steel-200">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
