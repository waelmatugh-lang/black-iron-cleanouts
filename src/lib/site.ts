/**
 * Single source of truth for business/contact details.
 * Update these values to change them everywhere on the site.
 */
export const site = {
  name: 'Black Iron Cleanouts, LLC',
  shortName: 'Black Iron Cleanouts',
  tagline: 'Removing Clutter, Restoring Space and Your Peace.',
  url: 'https://www.blackironcleanouts.com',
  email: 'blackironcleanoutsllc@gmail.com',
  // Primary office / call line
  phone: '+1 425-501-1822',
  phoneHref: 'tel:+14255011822',
  // WhatsApp line (their main inbound channel)
  whatsapp: '+1 206-822-0181',
  whatsappNumber: '12068220181',
  whatsappHref: 'https://wa.me/12068220181',
  facebook: 'https://www.facebook.com/people/Black-Iron-Cleanouts-LLC',
  address: {
    region: 'Everett, WA',
    full: 'Everett, Washington, United States',
    serviceArea: 'Greater Seattle & Snohomish County',
    geo: { lat: 47.9789, lng: -122.2021 },
  },
  hours: 'Mon–Sat: 7:00 AM – 7:00 PM',
  languages: ['English', 'Español', 'العربية'],
} as const;

export type SiteConfig = typeof site;
