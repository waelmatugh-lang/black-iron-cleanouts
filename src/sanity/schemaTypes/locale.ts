import { defineType, defineField } from 'sanity';

/**
 * The three languages the site supports.
 * `id` must match the next-intl locale codes used across the app.
 */
export const SUPPORTED_LANGUAGES = [
  { id: 'en', title: 'English 🇺🇸' },
  { id: 'es', title: 'Español 🇪🇸' },
  { id: 'ar', title: 'العربية 🇸🇦' },
] as const;

export const BASE_LANGUAGE = SUPPORTED_LANGUAGES[0];

/**
 * A short, single-line translatable string (e.g. a title or button label).
 * Renders one input per language in the Studio.
 */
export const localeString = defineType({
  name: 'localeString',
  title: 'Translated text',
  type: 'object',
  // Group the non-default languages so the editor sees English first.
  fieldsets: [{ name: 'translations', title: 'Translations', options: { collapsible: true } }],
  fields: SUPPORTED_LANGUAGES.map((lang) =>
    defineField({
      name: lang.id,
      title: lang.title,
      type: 'string',
      fieldset: lang.id === BASE_LANGUAGE.id ? undefined : 'translations',
    })
  ),
});

/**
 * A longer, multi-line translatable string (e.g. a paragraph or description).
 */
export const localeText = defineType({
  name: 'localeText',
  title: 'Translated paragraph',
  type: 'object',
  fieldsets: [{ name: 'translations', title: 'Translations', options: { collapsible: true } }],
  fields: SUPPORTED_LANGUAGES.map((lang) =>
    defineField({
      name: lang.id,
      title: lang.title,
      type: 'text',
      rows: 3,
      fieldset: lang.id === BASE_LANGUAGE.id ? undefined : 'translations',
    })
  ),
});
