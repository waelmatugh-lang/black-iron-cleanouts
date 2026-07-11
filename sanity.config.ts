'use client';

/**
 * Configuration for the embedded Sanity Studio, mounted at `/studio`.
 * The site owner uses this to edit all page content and images.
 */
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';

import { apiVersion, dataset, projectId } from './src/sanity/env';
import { schemaTypes, SINGLETON_TYPES } from './src/sanity/schemaTypes';
import { structure } from './src/sanity/structure';

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'Black Iron Cleanouts',
  schema: {
    types: schemaTypes,
    // Hide singletons from the global "create new document" menu.
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
  },
  document: {
    // Remove "delete" / "duplicate" actions on singletons.
    actions: (input, context) =>
      SINGLETON_TYPES.has(context.schemaType)
        ? input.filter(({ action }) =>
            ['publish', 'discardChanges', 'restore'].includes(action ?? '')
          )
        : input,
  },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
