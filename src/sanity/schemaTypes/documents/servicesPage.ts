import { defineType, defineField } from 'sanity';
import { PackageIcon } from '@sanity/icons';

export const servicesPage = defineType({
  name: 'servicesPage',
  title: 'Services page',
  type: 'document',
  icon: PackageIcon,
  fields: [
    defineField({ name: 'hero', title: 'Page header', type: 'pageHero' }),
    defineField({
      name: 'items',
      title: 'Services (full list)',
      type: 'array',
      of: [{ type: 'serviceItem' }],
    }),
    defineField({
      name: 'featureImage',
      title: 'Feature photo (crew at work)',
      type: 'richImage',
    }),
    defineField({ name: 'segmentsTitle', title: 'Homes/Business — title', type: 'localeString' }),
    defineField({ name: 'residentialTitle', title: 'Residential — title', type: 'localeString' }),
    defineField({ name: 'residentialDesc', title: 'Residential — description', type: 'localeText' }),
    defineField({ name: 'commercialTitle', title: 'Commercial — title', type: 'localeString' }),
    defineField({ name: 'commercialDesc', title: 'Commercial — description', type: 'localeText' }),
    defineField({ name: 'ctaTitle', title: 'Call-to-action — title', type: 'localeString' }),
    defineField({ name: 'ctaSubtitle', title: 'Call-to-action — subtitle', type: 'localeText' }),
  ],
  preview: { prepare: () => ({ title: 'Services page' }) },
});
