import type { Locale } from '@/i18n/routing';

const LOCALE_TYPES = new Set(['localeString', 'localeText']);

/**
 * Recursively flatten a Sanity document for one language: every
 * translated field ({ _type: 'localeString', en, es, ar }) becomes the
 * plain string for `locale`, falling back to English, then to any value.
 * Everything else (images, plain strings, numbers) is left untouched.
 */
export function localize<T = unknown>(value: unknown, locale: Locale): T {
  if (Array.isArray(value)) {
    return value.map((v) => localize(v, locale)) as T;
  }

  if (value && typeof value === 'object') {
    const obj = value as Record<string, unknown>;

    if (typeof obj._type === 'string' && LOCALE_TYPES.has(obj._type)) {
      const localized = obj[locale] ?? obj.en ?? '';
      return localized as T;
    }

    const out: Record<string, unknown> = {};
    for (const [key, v] of Object.entries(obj)) {
      out[key] = localize(v, locale);
    }
    return out as T;
  }

  return value as T;
}
