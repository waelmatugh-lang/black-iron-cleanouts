import { defineType, defineField } from 'sanity';
import { EnvelopeIcon } from '@sanity/icons';

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact page',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({ name: 'hero', title: 'Page header', type: 'pageHero' }),
    defineField({ name: 'languagesNote', title: 'Languages note', type: 'localeText' }),
    defineField({ name: 'formTitle', title: 'Form title', type: 'localeString' }),
  ],
  preview: { prepare: () => ({ title: 'Contact page' }) },
});
