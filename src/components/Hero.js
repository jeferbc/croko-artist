import Image from 'next/image';
import { artworks, formats, hero } from '@/content/landing';
import { formatPrice } from '@/lib/text';
import BeforeAfter from './BeforeAfter';
import WhatsAppButton from './WhatsAppButton';

export default function Hero() {
  const art = artworks.find((a) => a.id === hero.artworkId);
  const fromPrice = formatPrice(Math.min(...formats.flatMap((f) => f.sizes.map((s) => s.price))));

  return (
    <section id="inicio" className="hero">
      <div className="container">
        <div className="row align-items-center g-4 g-lg-5">
          <div className="col-lg-6 order-2 order-lg-1">
            <p className="eyebrow">{hero.eyebrow}</p>
            <h1 className="hero-title">{hero.title}</h1>
            <p className="hero-sub">{hero.subtitle}</p>
            <p className="hero-price">
              Desde <strong>{fromPrice}</strong> · envío gratis
            </p>
            <WhatsAppButton source="hero" className="btn btn-primary btn-lg btn-wa">
              {hero.cta}
            </WhatsAppButton>
            <p className="hero-micro">{hero.microcopy}</p>
          </div>
          <div className="col-lg-6 order-1 order-lg-2">
            <figure className="hero-art">
              {art.reference ? (
                <BeforeAfter before={art.reference} after={art} priority />
              ) : (
                <div className="hero-art__frame" style={{ aspectRatio: `${art.width} / ${art.height}` }}>
                  <Image src={art.src} alt={art.alt} fill sizes="(min-width: 992px) 40vw, 90vw" priority />
                </div>
              )}
              <figcaption>
                {art.pet} · {art.format} · acrílico sobre lienzo, {art.year}
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
