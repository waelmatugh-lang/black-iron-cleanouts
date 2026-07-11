/**
 * One-time migration: pushes the current site content (from the three
 * message files) and images (from public/images) into Sanity, so the
 * owner starts with everything already filled in — not a blank Studio.
 *
 * Run it once, after the Sanity project exists:
 *
 *   1. Put these in .env.local:
 *        NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxxxx
 *        NEXT_PUBLIC_SANITY_DATASET=production
 *        SANITY_API_WRITE_TOKEN=sk...   (an "Editor" token from sanity.io/manage)
 *   2. node scripts/migrate-to-sanity.mjs
 *
 * It is safe to re-run — it replaces the singleton documents each time.
 */
import { createClient } from '@sanity/client';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

// ---- Load .env.local (simple parser, no dependency) ----
try {
  const env = readFileSync(join(ROOT, '.env.local'), 'utf8');
  for (const line of env.split('\n')) {
    const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
} catch {
  /* no .env.local — rely on real environment variables */
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    '\n❌ Missing config. Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local\n'
  );
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: '2024-10-01', token, useCdn: false });

// ---- Load the three message files ----
const load = (loc) => JSON.parse(readFileSync(join(ROOT, 'src', 'messages', `${loc}.json`), 'utf8'));
const M = { en: load('en'), es: load('es'), ar: load('ar') };

const get = (obj, path) => path.split('.').reduce((a, k) => (a == null ? a : a[k]), obj);

/** Build a localeString / localeText object from a dot-path. */
const L = (path) => ({ _type: 'localeString', en: get(M.en, path), es: get(M.es, path), ar: get(M.ar, path) });
const T = (path) => ({ _type: 'localeText', en: get(M.en, path), es: get(M.es, path), ar: get(M.ar, path) });

/** Build a raw localeString/localeText from three explicit values. */
const mk = (type, en, es, ar, key) => {
  const o = { _type: type, en, es, ar };
  if (key) o._key = key;
  return o;
};

/** Array of localeString from a path pointing at an array of plain strings. */
const Larr = (path, keyPrefix) =>
  (get(M.en, path) || []).map((_, i) =>
    mk('localeString', get(M.en, path)[i], get(M.es, path)[i], get(M.ar, path)[i], `${keyPrefix}${i}`)
  );
const Tarr = (path, keyPrefix) =>
  (get(M.en, path) || []).map((_, i) =>
    mk('localeText', get(M.en, path)[i], get(M.es, path)[i], get(M.ar, path)[i], `${keyPrefix}${i}`)
  );

/** Map an array of objects across locales, applying a per-item builder. */
const mapArr = (path, keyPrefix, build) =>
  (get(M.en, path) || []).map((enIt, i) =>
    build(enIt, get(M.es, path)[i], get(M.ar, path)[i], `${keyPrefix}${i}`)
  );

// ---- Upload images ----
async function uploadImage(filename, altEn, altEs, altAr) {
  const buffer = readFileSync(join(ROOT, 'public', 'images', filename));
  console.log(`  ↑ uploading ${filename} …`);
  const asset = await client.assets.upload('image', buffer, { filename });
  return {
    _type: 'richImage',
    asset: { _type: 'reference', _ref: asset._id },
    alt: mk('localeString', altEn, altEs, altAr),
  };
}

async function run() {
  console.log(`\n🚚 Migrating content into Sanity project ${projectId} / ${dataset}\n`);

  console.log('Uploading images…');
  const heroImage = await uploadImage('truck.jpg', 'Black Iron Cleanouts box truck', 'Camión de Black Iron Cleanouts', 'شاحنة Black Iron Cleanouts');
  const homeFeatureImage = await uploadImage('fleet.jpg', 'Black Iron Cleanouts crew and trucks', 'Equipo y camiones de Black Iron Cleanouts', 'فريق وشاحنات Black Iron Cleanouts');
  const servicesFeatureImage = await uploadImage('cleanout.jpg', 'Crew loading furniture', 'Equipo cargando muebles', 'الفريق يحمّل الأثاث');
  const teamImage = await uploadImage('team.jpg', 'The Black Iron Cleanouts team', 'El equipo de Black Iron Cleanouts', 'فريق Black Iron Cleanouts');

  // ---- siteSettings ----
  const siteSettings = {
    _id: 'siteSettings',
    _type: 'siteSettings',
    phone: '+1 425-501-1822',
    phoneLangs: L('contact.methods.callLangs'),
    whatsapp: '+1 206-822-0181',
    whatsappLangs: L('contact.methods.whatsappLangs'),
    email: 'blackironcleanoutsllc@gmail.com',
    serviceArea: mk('localeString', 'Greater Seattle & Snohomish County', 'Gran Seattle y el condado de Snohomish', 'سياتل الكبرى ومقاطعة سنوهوميش'),
    addressFull: mk('localeString', 'Everett, Washington, United States', 'Everett, Washington, Estados Unidos', 'إيفرت، واشنطن، الولايات المتحدة'),
    hours: mk('localeString', 'Mon–Sat: 7:00 AM – 7:00 PM', 'Lun–Sáb: 7:00 AM – 7:00 PM', 'الإثنين–السبت: 7:00 ص – 7:00 م'),
  };

  // ---- homePage ----
  const homePage = {
    _id: 'homePage',
    _type: 'homePage',
    heroBadge: L('home.hero.badge'),
    heroTitle: L('home.hero.title'),
    heroTitleAccent: L('home.hero.titleAccent'),
    heroSubtitle: T('home.hero.subtitle'),
    heroTrust: Larr('home.hero.trust', 'trust'),
    stats: mapArr('home.stats.items', 'stat', (en, es, ar, key) => ({
      _type: 'statItem', _key: key,
      value: mk('localeString', en.value, es.value, ar.value),
      label: mk('localeString', en.label, es.label, ar.label),
    })),
    heroImage,
    featureImage: homeFeatureImage,
    servicesEyebrow: L('home.services.eyebrow'),
    servicesTitle: L('home.services.title'),
    servicesSubtitle: T('home.services.subtitle'),
    services: mapArr('home.services.items', 'svc', (en, es, ar, key) => ({
      _type: 'serviceItem', _key: key, key: en.key,
      title: mk('localeString', en.title, es.title, ar.title),
      desc: mk('localeText', en.desc, es.desc, ar.desc),
    })),
    whyEyebrow: L('home.why.eyebrow'),
    whyTitle: L('home.why.title'),
    whySubtitle: T('home.why.subtitle'),
    why: mapArr('home.why.items', 'why', (en, es, ar, key) => ({
      _type: 'featureItem', _key: key,
      title: mk('localeString', en.title, es.title, ar.title),
      desc: mk('localeText', en.desc, es.desc, ar.desc),
    })),
    processEyebrow: L('home.process.eyebrow'),
    processTitle: L('home.process.title'),
    processSubtitle: T('home.process.subtitle'),
    process: mapArr('home.process.steps', 'step', (en, es, ar, key) => ({
      _type: 'featureItem', _key: key,
      title: mk('localeString', en.title, es.title, ar.title),
      desc: mk('localeText', en.desc, es.desc, ar.desc),
    })),
    ecoEyebrow: L('home.eco.eyebrow'),
    ecoTitle: L('home.eco.title'),
    ecoSubtitle: T('home.eco.subtitle'),
    eco: mapArr('home.eco.points', 'eco', (en, es, ar, key) => ({
      _type: 'featureItem', _key: key,
      title: mk('localeString', en.title, es.title, ar.title),
      desc: mk('localeText', en.desc, es.desc, ar.desc),
    })),
    areasEyebrow: L('home.areas.eyebrow'),
    areasTitle: L('home.areas.title'),
    areasSubtitle: T('home.areas.subtitle'),
    testimonialsEyebrow: L('home.testimonials.eyebrow'),
    testimonialsTitle: L('home.testimonials.title'),
    testimonials: mapArr('home.testimonials.items', 'tst', (en, es, ar, key) => ({
      _type: 'testimonialItem', _key: key,
      quote: mk('localeText', en.quote, es.quote, ar.quote),
      name: en.name, location: en.location,
    })),
    faqEyebrow: L('home.faq.eyebrow'),
    faqTitle: L('home.faq.title'),
    faq: mapArr('home.faq.items', 'faq', (en, es, ar, key) => ({
      _type: 'faqItem', _key: key,
      q: mk('localeString', en.q, es.q, ar.q),
      a: mk('localeText', en.a, es.a, ar.a),
    })),
    ctaTitle: L('home.cta.title'),
    ctaSubtitle: T('home.cta.subtitle'),
  };

  // ---- servicesPage ----
  const servicesPage = {
    _id: 'servicesPage',
    _type: 'servicesPage',
    hero: { _type: 'pageHero', badge: L('services.hero.badge'), title: L('services.hero.title'), subtitle: T('services.hero.subtitle') },
    items: mapArr('services.items', 'it', (en, es, ar, key) => ({
      _type: 'serviceItem', _key: key, key: en.key,
      title: mk('localeString', en.title, es.title, ar.title),
      desc: mk('localeText', en.desc, es.desc, ar.desc),
      features: en.features.map((f, j) => mk('localeString', f, es.features[j], ar.features[j], `f${j}`)),
    })),
    featureImage: servicesFeatureImage,
    segmentsTitle: L('services.segments.title'),
    residentialTitle: L('services.segments.residential.title'),
    residentialDesc: T('services.segments.residential.desc'),
    commercialTitle: L('services.segments.commercial.title'),
    commercialDesc: T('services.segments.commercial.desc'),
    ctaTitle: L('services.cta.title'),
    ctaSubtitle: T('services.cta.subtitle'),
  };

  // ---- howItWorksPage ----
  const howItWorksPage = {
    _id: 'howItWorksPage',
    _type: 'howItWorksPage',
    hero: { _type: 'pageHero', badge: L('howItWorks.hero.badge'), title: L('howItWorks.hero.title'), subtitle: T('howItWorks.hero.subtitle') },
    steps: mapArr('howItWorks.steps', 'step', (en, es, ar, key) => ({
      _type: 'featureItem', _key: key,
      title: mk('localeString', en.title, es.title, ar.title),
      desc: mk('localeText', en.desc, es.desc, ar.desc),
    })),
    pricingTitle: L('howItWorks.pricing.title'),
    pricingDesc: T('howItWorks.pricing.desc'),
    pricingPoints: Larr('howItWorks.pricing.points', 'pp'),
    ctaTitle: L('howItWorks.cta.title'),
    ctaSubtitle: T('howItWorks.cta.subtitle'),
  };

  // ---- serviceAreasPage ----
  const serviceAreasPage = {
    _id: 'serviceAreasPage',
    _type: 'serviceAreasPage',
    hero: { _type: 'pageHero', badge: L('serviceAreas.hero.badge'), title: L('serviceAreas.hero.title'), subtitle: T('serviceAreas.hero.subtitle') },
    intro: L('serviceAreas.intro'),
    cities: get(M.en, 'serviceAreas.cities'),
    note: T('serviceAreas.note'),
    ctaTitle: L('serviceAreas.cta.title'),
    ctaSubtitle: T('serviceAreas.cta.subtitle'),
  };

  // ---- aboutPage ----
  const aboutPage = {
    _id: 'aboutPage',
    _type: 'aboutPage',
    hero: { _type: 'pageHero', badge: L('about.hero.badge'), title: L('about.hero.title'), subtitle: T('about.hero.subtitle') },
    storyTitle: L('about.story.title'),
    storyParagraphs: Tarr('about.story.paragraphs', 'p'),
    teamImage,
    secondImage: heroImage,
    valuesTitle: L('about.values.title'),
    values: mapArr('about.values.items', 'val', (en, es, ar, key) => ({
      _type: 'featureItem', _key: key,
      title: mk('localeString', en.title, es.title, ar.title),
      desc: mk('localeText', en.desc, es.desc, ar.desc),
    })),
    ecoTitle: L('about.eco.title'),
    ecoDesc: T('about.eco.desc'),
    ctaTitle: L('about.cta.title'),
    ctaSubtitle: T('about.cta.subtitle'),
  };

  // ---- contactPage ----
  const contactPage = {
    _id: 'contactPage',
    _type: 'contactPage',
    hero: { _type: 'pageHero', badge: L('contact.hero.badge'), title: L('contact.hero.title'), subtitle: T('contact.hero.subtitle') },
    languagesNote: T('contact.languagesNote'),
    formTitle: L('contact.formTitle'),
  };

  const docs = [siteSettings, homePage, servicesPage, howItWorksPage, serviceAreasPage, aboutPage, contactPage];

  console.log('\nWriting documents…');
  const tx = client.transaction();
  for (const doc of docs) tx.createOrReplace(doc);
  await tx.commit();

  console.log(`\n✅ Done. ${docs.length} pages + 4 images imported into Sanity.`);
  console.log('   Open /studio to see everything already filled in.\n');
}

run().catch((err) => {
  console.error('\n❌ Migration failed:', err.message || err);
  process.exit(1);
});
