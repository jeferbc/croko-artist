import { artworks, faqs, formats, seo, site } from '@/content/landing';
import { plain } from '@/lib/text';

// Person reuses Carolina's @id from croko.co. Each format is a Product with one
// Offer per confirmed size, so search engines never see placeholder data.
// Pieces painted in this format; a format without one yet shows the whole portfolio.
const imagesFor = (f) => {
  const own = artworks.filter((a) => a.format === f.name);
  return (own.length ? own : artworks).map((a) => `${site.url}${a.src}`);
};

export default function JsonLd() {
  const graph = [
    {
      '@type': 'Person',
      '@id': site.carolinaPersonId,
      name: 'Carolina Rincón',
      jobTitle: 'Artista',
      url: site.carolinaBioUrl,
    },
    {
      '@type': 'WebPage',
      '@id': `${site.url}/#webpage`,
      url: site.url,
      name: seo.title,
      description: seo.description,
      inLanguage: 'es-CO',
      about: { '@id': site.carolinaPersonId },
    },
    {
      '@type': 'FAQPage',
      '@id': `${site.url}/#faq`,
      mainEntity: faqs
        .filter((f) => !/\[[^\]]+\]/.test(f.a))
        .map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: plain(f.a) } })),
    },
    ...formats
      .map((f) => ({ ...f, sizes: f.sizes.filter((s) => !s.pending) }))
      .filter((f) => f.sizes.length)
      .map((f) => ({
        '@type': 'Product',
        '@id': `${site.url}/#${f.id}`,
        name: `Retrato de mascota pintado a mano · ${f.name}`,
        description: `${plain(f.text)} Acrílico sobre lienzo, impresionismo al impasto.`,
        image: imagesFor(f),
        brand: { '@type': 'Brand', name: site.brand },
        offers: f.sizes.map((s) => ({
          '@type': 'Offer',
          name: `${f.name} ${s.label}`,
          price: s.price,
          priceCurrency: 'COP',
          availability: 'https://schema.org/InStock',
          url: `${site.url}/#formatos`,
          shippingDetails: {
            '@type': 'OfferShippingDetails',
            shippingRate: { '@type': 'MonetaryAmount', value: 0, currency: 'COP' },
            shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'CO' },
          },
        })),
      })),
  ];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }) }}
    />
  );
}
