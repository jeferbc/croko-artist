'use client';

import { useState } from 'react';
import { extras, formats, formatsNote, sizeOption } from '@/content/landing';
import { formatPrice } from '@/lib/text';
import { track } from '@/lib/attribution';
import { setChoice } from '@/lib/whatsapp';
import WhatsAppButton from './WhatsAppButton';

// The wall in the preview represents 260 cm (with a 150 cm sofa), so every size is drawn to scale.
const WALL_CM = 260;

// Simple 150 x 80 cm sofa silhouette for scale.
const Sofa = () => (
  <svg viewBox="0 0 150 80" aria-hidden="true">
    <rect x="8" y="6" width="134" height="44" rx="9" fill="#c9b49b" />
    <rect x="0" y="30" width="20" height="42" rx="7" fill="#bda587" />
    <rect x="130" y="30" width="20" height="42" rx="7" fill="#bda587" />
    <rect x="16" y="44" width="118" height="22" rx="5" fill="#d4c1aa" />
    <rect x="6" y="64" width="138" height="9" rx="3" fill="#bda587" />
    <rect x="12" y="73" width="5" height="7" fill="#8f7a62" />
    <rect x="133" y="73" width="5" height="7" fill="#8f7a62" />
  </svg>
);

const fromPrice = (f) => Math.min(...f.sizes.map((s) => s.price));

const SizeLabel = ({ size }) =>
  size.pending ? (
    <mark className="pending" title="Medida por confirmar">
      {size.label}
    </mark>
  ) : (
    size.label
  );

// Size selector in the spirit of the Cocoa template: pick a format and a size,
// the price and a wall preview update. The choice is shared with the order form.
export default function FormatPicker() {
  const [formatId, setFormatId] = useState(formats[1].id);
  const format = formats.find((f) => f.id === formatId);
  const [sizeId, setSizeId] = useState(format.sizes[0].id);
  const size = format.sizes.find((s) => s.id === sizeId) || format.sizes[0];
  const [horizontal, setHorizontal] = useState(false);
  const [w, h] = size.rotatable && horizontal ? [size.h, size.w] : [size.w, size.h];

  const announce = (f, s) => {
    const option = sizeOption(f, s);
    track('format_select', { format: f.id, size: s.id });
    setChoice({ format: option });
    window.dispatchEvent(new CustomEvent('format-selected', { detail: option }));
  };

  const chooseFormat = (f) => {
    setFormatId(f.id);
    setSizeId(f.sizes[0].id);
    announce(f, f.sizes[0]);
  };

  const chooseSize = (s) => {
    setSizeId(s.id);
    announce(format, s);
  };

  const visibleExtras = extras.filter((e) => (!e.minPets || format.maxPets >= e.minPets) && !e.notIn?.includes(format.id));

  return (
    <div className="format-picker">
      <div className="format-options" role="radiogroup" aria-label="Tamaño del cuadro">
        {formats.map((f) => (
          <button
            key={f.id}
            type="button"
            role="radio"
            aria-checked={f.id === formatId}
            className={`format-option${f.id === formatId ? ' is-active' : ''}`}
            onClick={() => chooseFormat(f)}
          >
            <span className="format-option__name">{f.name}</span>
            <span className="format-option__size">Desde {formatPrice(fromPrice(f))}</span>
          </button>
        ))}
      </div>

      <div className="format-detail">
        <figure className="m-0">
          <div className="wall" aria-hidden="true">
            <div className="wall__canvas" style={{ '--w': `${(w / WALL_CM) * 100}%`, '--ar': `${w} / ${h}` }} />
            <div className="wall__sofa">
              <Sofa />
            </div>
          </div>
          <figcaption className="wall-caption">Vista a escala sobre un sofá de 150 cm</figcaption>
        </figure>
        <div className="format-detail__text">
          <h3>{format.name}</h3>
          {format.sizes.length > 1 && (
            <div className="size-options" role="radiogroup" aria-label={`Medida del ${format.name}`}>
              {format.sizes.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  role="radio"
                  aria-checked={s.id === size.id}
                  className={`size-option${s.id === size.id ? ' is-active' : ''}`}
                  onClick={() => chooseSize(s)}
                >
                  <SizeLabel size={s} />
                </button>
              ))}
            </div>
          )}
          {size.rotatable && (
            <div className="size-options" role="radiogroup" aria-label="Orientación">
              {[
                [false, 'Vertical'],
                [true, 'Horizontal'],
              ].map(([value, label]) => (
                <button
                  key={label}
                  type="button"
                  role="radio"
                  aria-checked={horizontal === value}
                  className={`size-option${horizontal === value ? ' is-active' : ''}`}
                  onClick={() => setHorizontal(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
          <p className="format-detail__price">
            {formatPrice(size.price)}
            {format.sizes.length === 1 && (
              <span className="format-detail__size">
                {' '}
                · <SizeLabel size={size} />
              </span>
            )}
          </p>
          <p>{format.text}</p>
          <ul className="format-facts">
            <li>{format.maxPets === 1 ? 'Para 1 mascota' : `Hasta ${format.maxPets} mascotas en el mismo lienzo`}</li>
            {size.rotatable && <li>Vertical u horizontal, según la composición</li>}
            <li>Listo en {format.days} días hábiles, envío incluido</li>
          </ul>
          <ul className="extras">
            {visibleExtras.map((e) => (
              <li key={e.id}>
                <span>{e.name}</span>
                <span>{e.included ? 'Incluido' : `+${formatPrice(e.price)}${e.unit ? ` ${e.unit}` : ''}`}</span>
              </li>
            ))}
          </ul>
          <p className="small text-muted-warm">{formatsNote}</p>
          <WhatsAppButton source="formats" className="btn btn-primary btn-wa" format={sizeOption(format, size)}>
            Quiero el {format.name}
          </WhatsAppButton>
        </div>
      </div>
    </div>
  );
}
