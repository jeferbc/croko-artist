'use client';

import Image from 'next/image';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
import { artworks } from '@/content/landing';
import { track } from '@/lib/attribution';
import WhatsAppButton from './WhatsAppButton';

// Zoom levels are relative to the image's real pixels (1 = 100%).
// Relative to "fit" so double tap always zooms in noticeably, and with
// high-resolution photos the max level reaches the paint texture.
const options = {
  initialZoomLevel: 'fit',
  secondaryZoomLevel: (z) => Math.max(z.fit * 2.5, 1),
  maxZoomLevel: (z) => Math.max(z.fit * 5, 2),
  wheelToZoom: true,
  bgOpacity: 0.96,
  preload: [1, 2],
  showHideAnimationType: 'zoom',
};

function Slide({ image, caption, label }) {
  return (
    <Item original={image.src} thumbnail={image.src} width={image.width} height={image.height} alt={image.alt} caption={caption}>
      {({ ref, open }) => (
        <button type="button" ref={ref} onClick={open} className="chip">
          {label}
        </button>
      )}
    </Item>
  );
}

export default function ArtGallery() {
  return (
    <Gallery options={options} withCaption onOpen={() => track('gallery_open')}>
      <div className="art-grid">
        {artworks.map((art) => {
          const caption = `${art.pet} · ${art.species} · ${art.format} · ${art.year}`;
          return (
            <article key={art.id} className="art-card">
              <Item original={art.src} thumbnail={art.src} width={art.width} height={art.height} alt={art.alt} caption={caption}>
                {({ ref, open }) => (
                  <button
                    type="button"
                    ref={ref}
                    onClick={open}
                    className="art-card__img"
                    aria-label={`Ampliar el retrato de ${art.pet}`}
                  >
                    <Image src={art.src} alt={art.alt} fill sizes="(min-width: 992px) 30vw, 50vw" />
                    <span className="art-card__zoom" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="7" />
                        <path d="M11 8v6M8 11h6M20 20l-4-4" />
                      </svg>
                    </span>
                  </button>
                )}
              </Item>
              <div className="art-card__body">
                <h3>{art.pet}</h3>
                <p className="art-card__meta">
                  {art.species} · {art.format}
                </p>
                <p>{art.note}</p>
                {(art.reference || art.details.length > 0) && (
                  <div className="d-flex flex-wrap gap-2">
                    {art.reference && <Slide image={art.reference} caption={`Foto original de ${art.pet}`} label="Ver la foto original" />}
                    {art.details.map((d, i) => (
                      <Slide key={d.src} image={d} caption={`${art.pet} · detalle ${i + 1}`} label={`Detalle ${i + 1}`} />
                    ))}
                  </div>
                )}
              </div>
            </article>
          );
        })}
        <article className="art-card art-card--next">
          <p className="art-card__next-title">Tu mascota puede ser la siguiente.</p>
          <WhatsAppButton source="gallery" className="btn btn-primary btn-wa">
            Pide su retrato
          </WhatsAppButton>
        </article>
      </div>
    </Gallery>
  );
}
