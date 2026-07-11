/**
 * Sanity connection settings, read from environment variables.
 * Fill these in `.env.local` (and in Vercel's project settings) once the
 * Sanity project exists. `projectId` is the only value that must be set.
 */
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-01';

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';

/** True when a real Sanity project has been configured. */
export const sanityEnabled = projectId.length > 0;
