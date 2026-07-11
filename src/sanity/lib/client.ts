import { createClient, type SanityClient } from 'next-sanity';
import { apiVersion, dataset, projectId, sanityEnabled } from '../env';

/**
 * Read-only client used by the website to fetch published content.
 * `useCdn` serves cached, published documents — fast and free.
 *
 * It is only created once a real `projectId` is configured; until then
 * it stays `null` and the fetch layer falls back to built-in content.
 */
export const client: SanityClient | null = sanityEnabled
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;
