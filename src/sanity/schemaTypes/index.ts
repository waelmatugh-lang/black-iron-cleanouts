import type { SchemaTypeDefinition } from 'sanity';

import { localeString, localeText } from './locale';
import {
  pageHero,
  featureItem,
  statItem,
  serviceItem,
  testimonialItem,
  faqItem,
  richImage,
} from './objects';

import { siteSettings } from './documents/siteSettings';
import { homePage } from './documents/homePage';
import { servicesPage } from './documents/servicesPage';
import { howItWorksPage } from './documents/howItWorksPage';
import { serviceAreasPage } from './documents/serviceAreasPage';
import { aboutPage } from './documents/aboutPage';
import { contactPage } from './documents/contactPage';

export const schemaTypes: SchemaTypeDefinition[] = [
  // Reusable field types
  localeString,
  localeText,
  // Reusable objects
  pageHero,
  featureItem,
  statItem,
  serviceItem,
  testimonialItem,
  faqItem,
  richImage,
  // Editable pages (singletons)
  siteSettings,
  homePage,
  servicesPage,
  howItWorksPage,
  serviceAreasPage,
  aboutPage,
  contactPage,
];

/** Document types that should exist only once (singletons). */
export const SINGLETON_TYPES = new Set([
  'siteSettings',
  'homePage',
  'servicesPage',
  'howItWorksPage',
  'serviceAreasPage',
  'aboutPage',
  'contactPage',
]);
