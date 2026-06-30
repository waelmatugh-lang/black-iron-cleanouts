import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

/** Lucide-style line icons (1.75 stroke), inlined to avoid a runtime dependency. */
const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

export const TruckIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M14 18V6a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h2" />
    <path d="M14 9h4l4 4v4a1 1 0 0 1-1 1h-2" />
    <circle cx="7.5" cy="18.5" r="2" />
    <circle cx="17.5" cy="18.5" r="2" />
  </svg>
);

export const SofaIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 11V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4" />
    <path d="M3 13a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4H3z" />
    <path d="M5 17v2M19 17v2" />
  </svg>
);

export const RecycleIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M7 19H4.8a1.8 1.8 0 0 1-1.55-2.7l1.6-2.75" />
    <path d="m8.5 14-3.25-.7L4 16.3" />
    <path d="M12.5 5.5 11 3a1.8 1.8 0 0 0-3.1 0L6.3 5.8" />
    <path d="m11 8 .9-3.2L8.7 4" />
    <path d="M19.2 14.3 20.75 17a1.8 1.8 0 0 1-1.55 2.7H16" />
    <path d="m13.5 16 3 .8-.85 3.2" />
    <path d="M16.5 5.8 15 8.3" />
  </svg>
);

export const LeafIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6" />
  </svg>
);

export const BuildingIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="4" y="3" width="16" height="18" rx="1" />
    <path d="M9 21v-4h6v4M8 7h.01M12 7h.01M16 7h.01M8 11h.01M12 11h.01M16 11h.01" />
  </svg>
);

export const HomeIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.5V21h14V9.5" />
    <path d="M9.5 21v-6h5v6" />
  </svg>
);

export const TrashIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
    <path d="M19 6 18 20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1L5 6" />
    <path d="M10 11v6M14 11v6" />
  </svg>
);

export const BoxesIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 1.03 1.75l3 1.65a2 2 0 0 0 1.94 0L10 20" />
    <path d="m7 16.5-4.74-2.85M7 16.5l5-3M7 16.5v5.17" />
    <path d="M12 13.5V8.34a2 2 0 0 1 1.03-1.75l3-1.65a2 2 0 0 1 1.94 0l3 1.65A2 2 0 0 1 22 8.34v3.24a2 2 0 0 1-1.03 1.75l-3 1.65a2 2 0 0 1-1.94 0L12 13.5Z" />
  </svg>
);

export const ClockIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const ShieldCheckIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const DollarIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 2v20M17 6.5C17 4.6 14.8 3 12 3S7 4.6 7 6.5 9.2 10 12 10s5 1.6 5 3.5S14.8 17 12 17s-5-1.6-5-3.5" />
  </svg>
);

export const StarIcon = (p: IconProps) => (
  <svg {...base} {...p} fill="currentColor" stroke="none">
    <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.1 6.47L12 17.4l-5.8 3.07 1.1-6.47L2.6 9.35l6.5-.95L12 2.5Z" />
  </svg>
);

export const PhoneIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6.5 3h-2A1.5 1.5 0 0 0 3 4.6C3 13 11 21 19.4 21a1.5 1.5 0 0 0 1.6-1.5v-2a1.5 1.5 0 0 0-1.3-1.5l-2.5-.4a1.5 1.5 0 0 0-1.4.6l-.8 1a12 12 0 0 1-4.9-4.9l1-.8a1.5 1.5 0 0 0 .6-1.4L11 5.8A1.5 1.5 0 0 0 9.5 4.5L6.5 3Z" />
  </svg>
);

export const MailIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export const MapPinIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const WhatsAppIcon = (p: IconProps) => (
  <svg {...p} viewBox="0 0 24 24" fill="currentColor" aria-hidden width={p.width ?? 24} height={p.height ?? 24}>
    <path d="M.06 24l1.68-6.13A11.86 11.86 0 0 1 .16 11.9C.16 5.33 5.5 0 12.06 0a11.82 11.82 0 0 1 8.42 3.49 11.82 11.82 0 0 1 3.48 8.42c0 6.56-5.34 11.9-11.9 11.9a11.9 11.9 0 0 1-5.7-1.45L.06 24Zm6.6-3.8c1.68.99 3.28 1.59 5.4 1.59 5.45 0 9.89-4.43 9.89-9.88 0-2.64-1.03-5.12-2.9-6.99a9.82 9.82 0 0 0-6.98-2.9c-5.46 0-9.9 4.44-9.9 9.89 0 2.1.65 3.66 1.74 5.41l-.99 3.62 3.74-.74Zm11.4-5.46c-.07-.12-.27-.2-.56-.34-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41Z" />
  </svg>
);

export const MenuIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const CloseIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const CheckIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const ArrowRightIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ChevronDownIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const SunIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const MoonIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
  </svg>
);

export const HeartHandIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M11 14 9.2 12.2a2.1 2.1 0 0 1 3-3l.8.8.8-.8a2.1 2.1 0 0 1 3 3L14 15" />
    <path d="M3 12.5 7 16l3.5 3a2 2 0 0 0 2.4.1l6.1-4.6a1.8 1.8 0 0 0 .2-2.7" />
    <path d="M3 9v6M18 4l-4 2-3-1.2a2 2 0 0 0-1.6 0L5 6.5" />
  </svg>
);
