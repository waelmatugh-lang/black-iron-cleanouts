import type { Locale } from '@/i18n/routing';
import { sanityEnabled } from '../env';
import { client } from './client';
import { localize } from './localize';

/**
 * Fetch a singleton page document and flatten it to one language.
 * Returns `null` when Sanity isn't configured yet OR the document
 * doesn't exist — callers then fall back to the built-in content, so
 * the site never breaks while the CMS is being set up or populated.
 */
export async function getPage<T = Record<string, unknown>>(
  type: string,
  locale: Locale
): Promise<T | null> {
  if (!sanityEnabled || !client) return null;

  try {
    const doc = await client.fetch(
      `*[_type == $type][0]`,
      { type },
      { next: { revalidate: 60 } }
    );
    if (!doc) return null;
    return localize<T>(doc, locale);
  } catch {
    // Network / config error — fall back to built-in content.
    return null;
  }
}
