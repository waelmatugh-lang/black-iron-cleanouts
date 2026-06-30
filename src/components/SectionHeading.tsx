export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'start';
  className?: string;
}) {
  const alignCls = align === 'center' ? 'mx-auto text-center' : 'text-start';
  return (
    <div className={`max-w-2xl ${alignCls} ${className ?? ''}`}>
      {eyebrow && <p className="eyebrow justify-center">{eyebrow}</p>}
      <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-lg leading-relaxed text-muted">{subtitle}</p>}
    </div>
  );
}
