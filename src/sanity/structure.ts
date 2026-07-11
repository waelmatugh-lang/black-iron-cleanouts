import type { StructureResolver } from 'sanity/structure';

/**
 * Custom Studio sidebar: each editable page is a single document
 * (a "singleton"), so the owner sees a clean list of pages rather than
 * a "create new" list. Order mirrors the site navigation.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Black Iron Cleanouts')
    .items([
      S.listItem()
        .title('Site settings (contact & hours)')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      S.listItem()
        .title('Home page')
        .id('homePage')
        .child(S.document().schemaType('homePage').documentId('homePage')),
      S.listItem()
        .title('Services page')
        .id('servicesPage')
        .child(S.document().schemaType('servicesPage').documentId('servicesPage')),
      S.listItem()
        .title('How it works page')
        .id('howItWorksPage')
        .child(S.document().schemaType('howItWorksPage').documentId('howItWorksPage')),
      S.listItem()
        .title('Service areas page')
        .id('serviceAreasPage')
        .child(S.document().schemaType('serviceAreasPage').documentId('serviceAreasPage')),
      S.listItem()
        .title('About page')
        .id('aboutPage')
        .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
      S.listItem()
        .title('Contact page')
        .id('contactPage')
        .child(S.document().schemaType('contactPage').documentId('contactPage')),
    ]);
