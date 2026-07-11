import { defineType, defineField } from 'sanity';

/** A page hero: small badge, title, subtitle. Used at the top of every page. */
export const pageHero = defineType({
  name: 'pageHero',
  title: 'Page header',
  type: 'object',
  fields: [
    defineField({ name: 'badge', title: 'Small badge text', type: 'localeString' }),
    defineField({ name: 'title', title: 'Title', type: 'localeString' }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'localeText' }),
  ],
});

/** A title + description pair — reused in "why us", values, eco, process steps. */
export const featureItem = defineType({
  name: 'featureItem',
  title: 'Item',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'localeString' }),
    defineField({ name: 'desc', title: 'Description', type: 'localeText' }),
  ],
  preview: {
    select: { title: 'title.en' },
    prepare: ({ title }) => ({ title: title || 'Item' }),
  },
});

/** A big number/stat with a label. */
export const statItem = defineType({
  name: 'statItem',
  title: 'Stat',
  type: 'object',
  fields: [
    defineField({ name: 'value', title: 'Big value', type: 'localeString' }),
    defineField({ name: 'label', title: 'Label under it', type: 'localeString' }),
  ],
  preview: {
    select: { title: 'value.en', subtitle: 'label.en' },
  },
});

/** A service card: icon key + title + description + bullet features. */
export const serviceItem = defineType({
  name: 'serviceItem',
  title: 'Service',
  type: 'object',
  fields: [
    defineField({
      name: 'key',
      title: 'Icon',
      type: 'string',
      description: 'Which icon to show for this service.',
      options: {
        list: [
          { title: 'Junk removal', value: 'junk' },
          { title: 'Moving', value: 'moving' },
          { title: 'Hauling', value: 'hauling' },
          { title: 'Cleanout', value: 'cleanout' },
          { title: 'Appliance / disposal', value: 'appliance' },
          { title: 'Commercial', value: 'commercial' },
        ],
      },
    }),
    defineField({ name: 'title', title: 'Title', type: 'localeString' }),
    defineField({ name: 'desc', title: 'Description', type: 'localeText' }),
    defineField({
      name: 'features',
      title: 'Bullet features (optional)',
      type: 'array',
      of: [{ type: 'localeString' }],
    }),
  ],
  preview: {
    select: { title: 'title.en', subtitle: 'key' },
  },
});

/** A customer testimonial. */
export const testimonialItem = defineType({
  name: 'testimonialItem',
  title: 'Testimonial',
  type: 'object',
  fields: [
    defineField({ name: 'quote', title: 'Quote', type: 'localeText' }),
    defineField({ name: 'name', title: 'Customer name', type: 'string' }),
    defineField({ name: 'location', title: 'City', type: 'string' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'location' },
  },
});

/** A question + answer for the FAQ. */
export const faqItem = defineType({
  name: 'faqItem',
  title: 'Question',
  type: 'object',
  fields: [
    defineField({ name: 'q', title: 'Question', type: 'localeString' }),
    defineField({ name: 'a', title: 'Answer', type: 'localeText' }),
  ],
  preview: {
    select: { title: 'q.en' },
  },
});

/** An image with translated alt text for accessibility/SEO. */
export const richImage = defineType({
  name: 'richImage',
  title: 'Image',
  type: 'image',
  options: { hotspot: true },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alt text (describes the image)',
      type: 'localeString',
    }),
  ],
});
