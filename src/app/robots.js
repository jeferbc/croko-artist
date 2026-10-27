import { site } from '@/content/landing';

// Blocks crawlers until launch, same switch as the noindex meta in layout.js.
export default function robots() {
  const allow = process.env.NEXT_PUBLIC_ALLOW_INDEXING === '1';
  return {
    rules: allow ? { userAgent: '*', allow: '/', disallow: '/api/' } : { userAgent: '*', disallow: '/' },
    ...(allow && { sitemap: `${site.url}/sitemap.xml` }),
  };
}
