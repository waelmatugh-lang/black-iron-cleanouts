import { site } from '@/lib/site';
import { WhatsAppIcon } from './icons';

export function WhatsAppButton({ label }: { label: string }) {
  return (
    <a
      href={site.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group fixed bottom-20 end-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg sm:bottom-6 sm:h-16 sm:w-16"
    >
      <WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8" />
      <span className="pointer-events-none absolute end-full me-3 hidden whitespace-nowrap rounded-lg bg-navy-900 px-3 py-1.5 text-sm font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:block">
        {label}
      </span>
    </a>
  );
}
