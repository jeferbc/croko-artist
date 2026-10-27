import { Figtree, Young_Serif } from 'next/font/google';
import Script from 'next/script';
import { seo, site } from '@/content/landing';
import '@/styles/globals.scss';

const display = Young_Serif({ subsets: ['latin'], weight: '400', variable: '--font-display', display: 'swap' });
const body = Figtree({ subsets: ['latin'], variable: '--font-body', display: 'swap' });

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export const metadata = {
  metadataBase: new URL(site.url),
  title: seo.title,
  description: seo.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: '/',
    siteName: site.brand,
    title: seo.title,
    description: seo.description,
    images: [{ url: '/obras/lazy.jpg', width: 1004, height: 1496, alt: 'Retrato de Lazy pintado a mano por Carolina Rincón' }],
  },
  // Keep the preview out of search engines until launch
  robots: process.env.NEXT_PUBLIC_ALLOW_INDEXING === '1' ? undefined : { index: false, follow: false },
};

export const viewport = {
  themeColor: '#fbf8f4',
  viewportFit: 'cover',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-CO" className={`${display.variable} ${body.variable}`}>
      <body>
        {GTM_ID && (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}
        {children}
      </body>
    </html>
  );
}
