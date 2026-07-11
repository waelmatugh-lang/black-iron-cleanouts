import { defineType, defineField } from 'sanity';
import { HomeIcon } from '@sanity/icons';

/**
 * The home page. Every section mirrors what visitors see, top to bottom.
 * Images live right next to the text they belong with.
 */
export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  icon: HomeIcon,
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'sections', title: 'Sections' },
    { name: 'faq', title: 'FAQ & reviews' },
  ],
  fields: [
    // ---- Hero ----
    defineField({ name: 'heroBadge', title: 'Hero badge', type: 'localeString', group: 'hero' }),
    defineField({ name: 'heroTitle', title: 'Hero title', type: 'localeString', group: 'hero' }),
    defineField({
      name: 'heroTitleAccent',
      title: 'Hero title (second, highlighted line)',
      type: 'localeString',
      group: 'hero',
    }),
    defineField({ name: 'heroSubtitle', title: 'Hero subtitle', type: 'localeText', group: 'hero' }),
    defineField({
      name: 'heroTrust',
      title: 'Trust badges (short phrases)',
      type: 'array',
      of: [{ type: 'localeString' }],
      group: 'hero',
    }),
    defineField({
      name: 'stats',
      title: 'Stat highlights',
      type: 'array',
      of: [{ type: 'statItem' }],
      group: 'hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero photo (top-right truck image)',
      type: 'richImage',
      group: 'hero',
    }),

    // ---- Feature image band ----
    defineField({
      name: 'featureImage',
      title: 'Feature photo (the wide band on the home page)',
      type: 'richImage',
      group: 'sections',
    }),

    // ---- Services section ----
    defineField({ name: 'servicesEyebrow', title: 'Services — eyebrow', type: 'localeString', group: 'sections' }),
    defineField({ name: 'servicesTitle', title: 'Services — title', type: 'localeString', group: 'sections' }),
    defineField({ name: 'servicesSubtitle', title: 'Services — subtitle', type: 'localeText', group: 'sections' }),
    defineField({
      name: 'services',
      title: 'Services shown on home',
      type: 'array',
      of: [{ type: 'serviceItem' }],
      group: 'sections',
    }),

    // ---- Why us ----
    defineField({ name: 'whyEyebrow', title: 'Why us — eyebrow', type: 'localeString', group: 'sections' }),
    defineField({ name: 'whyTitle', title: 'Why us — title', type: 'localeString', group: 'sections' }),
    defineField({ name: 'whySubtitle', title: 'Why us — subtitle', type: 'localeText', group: 'sections' }),
    defineField({
      name: 'why',
      title: 'Why-us points',
      type: 'array',
      of: [{ type: 'featureItem' }],
      group: 'sections',
    }),

    // ---- Process ----
    defineField({ name: 'processEyebrow', title: 'Process — eyebrow', type: 'localeString', group: 'sections' }),
    defineField({ name: 'processTitle', title: 'Process — title', type: 'localeString', group: 'sections' }),
    defineField({ name: 'processSubtitle', title: 'Process — subtitle', type: 'localeText', group: 'sections' }),
    defineField({
      name: 'process',
      title: 'Steps',
      type: 'array',
      of: [{ type: 'featureItem' }],
      group: 'sections',
    }),

    // ---- Eco ----
    defineField({ name: 'ecoEyebrow', title: 'Eco — eyebrow', type: 'localeString', group: 'sections' }),
    defineField({ name: 'ecoTitle', title: 'Eco — title', type: 'localeString', group: 'sections' }),
    defineField({ name: 'ecoSubtitle', title: 'Eco — subtitle', type: 'localeText', group: 'sections' }),
    defineField({
      name: 'eco',
      title: 'Eco points',
      type: 'array',
      of: [{ type: 'featureItem' }],
      group: 'sections',
    }),

    // ---- Areas teaser ----
    defineField({ name: 'areasEyebrow', title: 'Areas — eyebrow', type: 'localeString', group: 'sections' }),
    defineField({ name: 'areasTitle', title: 'Areas — title', type: 'localeString', group: 'sections' }),
    defineField({ name: 'areasSubtitle', title: 'Areas — subtitle', type: 'localeText', group: 'sections' }),

    // ---- Testimonials ----
    defineField({ name: 'testimonialsEyebrow', title: 'Reviews — eyebrow', type: 'localeString', group: 'faq' }),
    defineField({ name: 'testimonialsTitle', title: 'Reviews — title', type: 'localeString', group: 'faq' }),
    defineField({
      name: 'testimonials',
      title: 'Customer reviews',
      type: 'array',
      of: [{ type: 'testimonialItem' }],
      group: 'faq',
    }),

    // ---- FAQ ----
    defineField({ name: 'faqEyebrow', title: 'FAQ — eyebrow', type: 'localeString', group: 'faq' }),
    defineField({ name: 'faqTitle', title: 'FAQ — title', type: 'localeString', group: 'faq' }),
    defineField({
      name: 'faq',
      title: 'Questions',
      type: 'array',
      of: [{ type: 'faqItem' }],
      group: 'faq',
    }),

    // ---- Final CTA ----
    defineField({ name: 'ctaTitle', title: 'Bottom call-to-action — title', type: 'localeString', group: 'sections' }),
    defineField({ name: 'ctaSubtitle', title: 'Bottom call-to-action — subtitle', type: 'localeText', group: 'sections' }),
  ],
  preview: {
    prepare: () => ({ title: 'Home page' }),
  },
});
