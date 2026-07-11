import { defineType, defineField } from 'sanity';
import { UsersIcon } from '@sanity/icons';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About page',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({ name: 'hero', title: 'Page header', type: 'pageHero' }),
    defineField({ name: 'storyTitle', title: 'Story — title', type: 'localeString' }),
    defineField({
      name: 'storyParagraphs',
      title: 'Story — paragraphs',
      type: 'array',
      of: [{ type: 'localeText' }],
    }),
    defineField({
      name: 'teamImage',
      title: 'Team / about photo (top)',
      type: 'richImage',
    }),
    defineField({
      name: 'secondImage',
      title: 'Second photo (truck, below the team photo)',
      type: 'richImage',
    }),
    defineField({ name: 'valuesTitle', title: 'Values — title', type: 'localeString' }),
    defineField({
      name: 'values',
      title: 'Values',
      type: 'array',
      of: [{ type: 'featureItem' }],
    }),
    defineField({ name: 'ecoTitle', title: 'Eco — title', type: 'localeString' }),
    defineField({ name: 'ecoDesc', title: 'Eco — description', type: 'localeText' }),
    defineField({ name: 'ctaTitle', title: 'Call-to-action — title', type: 'localeString' }),
    defineField({ name: 'ctaSubtitle', title: 'Call-to-action — subtitle', type: 'localeText' }),
  ],
  preview: { prepare: () => ({ title: 'About page' }) },
});
