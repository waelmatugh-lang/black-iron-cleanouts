import { defineType, defineField } from 'sanity';
import { PinIcon } from '@sanity/icons';

export const serviceAreasPage = defineType({
  name: 'serviceAreasPage',
  title: 'Service areas page',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({ name: 'hero', title: 'Page header', type: 'pageHero' }),
    defineField({ name: 'intro', title: 'Intro line', type: 'localeString' }),
    defineField({
      name: 'cities',
      title: 'Cities served',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'City names — usually the same in every language.',
      options: { layout: 'tags' },
    }),
    defineField({ name: 'note', title: 'Closing note', type: 'localeText' }),
    defineField({ name: 'ctaTitle', title: 'Call-to-action — title', type: 'localeString' }),
    defineField({ name: 'ctaSubtitle', title: 'Call-to-action — subtitle', type: 'localeText' }),
  ],
  preview: { prepare: () => ({ title: 'Service areas page' }) },
});
