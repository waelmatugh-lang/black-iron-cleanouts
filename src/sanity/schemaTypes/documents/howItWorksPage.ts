import { defineType, defineField } from 'sanity';
import { RocketIcon } from '@sanity/icons';

export const howItWorksPage = defineType({
  name: 'howItWorksPage',
  title: 'How it works page',
  type: 'document',
  icon: RocketIcon,
  fields: [
    defineField({ name: 'hero', title: 'Page header', type: 'pageHero' }),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [{ type: 'featureItem' }],
    }),
    defineField({ name: 'pricingTitle', title: 'Pricing — title', type: 'localeString' }),
    defineField({ name: 'pricingDesc', title: 'Pricing — description', type: 'localeText' }),
    defineField({
      name: 'pricingPoints',
      title: 'Pricing — bullet points',
      type: 'array',
      of: [{ type: 'localeString' }],
    }),
    defineField({ name: 'ctaTitle', title: 'Call-to-action — title', type: 'localeString' }),
    defineField({ name: 'ctaSubtitle', title: 'Call-to-action — subtitle', type: 'localeText' }),
  ],
  preview: { prepare: () => ({ title: 'How it works page' }) },
});
