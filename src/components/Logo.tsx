import Image from 'next/image';
import { site } from '@/lib/site';

/**
 * Compact brand mark (shield only, no tagline) for the header/footer.
 * Sits on a white chip so it stays legible on dark backgrounds / dark mode.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center ${className ?? ''}`}>
      <span className="rounded-lg bg-white p-1 ring-1 ring-black/5 dark:ring-white/10">
        <Image
          src="/images/logo-mark.png"
          alt={site.name}
          width={265}
          height={200}
          priority
          className="h-9 w-auto sm:h-10"
        />
      </span>
    </span>
  );
}

/** Full logo (shield + wordmark + tagline) for large hero/about displays. */
export function LogoFull({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/images/logo.png"
      alt={site.name}
      width={1000}
      height={1000}
      priority={priority}
      className={className}
    />
  );
}
