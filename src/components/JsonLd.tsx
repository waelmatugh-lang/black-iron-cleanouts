import { site } from '@/lib/site';

/** LocalBusiness / MovingCompany structured data for local SEO. */
export function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': ['MovingCompany', 'LocalBusiness'],
    name: site.name,
    description:
      'Junk removal, furniture moving and responsible disposal for homes and businesses in the greater Seattle & Everett, WA area.',
    url: site.url,
    telephone: site.phone,
    email: site.email,
    slogan: site.tagline,
    image: `${site.url}/images/og.png`,
    logo: `${site.url}/images/logo.png`,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Everett',
      addressRegion: 'WA',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.address.geo.lat,
      longitude: site.address.geo.lng,
    },
    areaServed: site.address.serviceArea,
    openingHours: 'Mo-Sa 07:00-19:00',
    knowsLanguage: ['en', 'es', 'ar'],
    sameAs: [site.facebook],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
