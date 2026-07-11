import { defineType, defineField } from 'sanity';
import { CogIcon } from '@sanity/icons';

/**
 * Global settings shown across the whole site: business contact details,
 * hours and service area. Editing these updates the header, footer and
 * contact page everywhere at once.
 */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings (contact & hours)',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'contact', title: 'Contact', default: true },
    { name: 'area', title: 'Area & hours' },
  ],
  fields: [
    defineField({
      name: 'phone',
      title: 'Phone (call or text)',
      type: 'string',
      description: 'Displayed number, e.g. +1 425-501-1822',
      group: 'contact',
    }),
    defineField({
      name: 'phoneLangs',
      title: 'Languages on the phone line',
      type: 'localeString',
      description: 'e.g. Spanish & English',
      group: 'contact',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp number',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'whatsappLangs',
      title: 'Languages on WhatsApp',
      type: 'localeString',
      description: 'e.g. Arabic & English',
      group: 'contact',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'serviceArea',
      title: 'Service area (short)',
      type: 'localeString',
      description: 'e.g. Greater Seattle & Snohomish County',
      group: 'area',
    }),
    defineField({
      name: 'addressFull',
      title: 'City / region line',
      type: 'localeString',
      description: 'e.g. Everett, Washington, United States',
      group: 'area',
    }),
    defineField({
      name: 'hours',
      title: 'Hours',
      type: 'localeString',
      description: 'e.g. Mon–Sat: 7:00 AM – 7:00 PM',
      group: 'area',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site settings (contact & hours)' }),
  },
});
