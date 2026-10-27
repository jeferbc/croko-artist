'use client';

import { useEffect, useState } from 'react';
import { formats, quickStart as copy, sizeOption } from '@/content/landing';
import { setChoice } from '@/lib/whatsapp';
import WhatsAppButton from './WhatsAppButton';

const sizeChips = formats.flatMap((f) => f.sizes.map((s) => ({ value: sizeOption(f, s), label: `${f.name} · ${s.label}` })));

function Chips({ label, options, value, onChange }) {
  return (
    <fieldset className="quick-start__group">
      <legend className="form-label">{label}</legend>
      <div className="chip-options">
        {options.map((o) => (
          <button
            key={o.label}
            type="button"
            aria-pressed={value === o.value}
            className={`chip-option${value === o.value ? ' is-active' : ''}`}
            onClick={() => onChange(value === o.value ? null : o.value)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

// Replaces the long order form: WhatsApp is the main lead channel. The two optional
// picks only shape the prefilled message; personal data is collected in the chat.
export default function QuickStart() {
  const [format, setFormat] = useState(null);
  const [purpose, setPurpose] = useState(null);

  const pickFormat = (value) => {
    setFormat(value);
    setChoice({ format: value });
  };
  const pickPurpose = (value) => {
    setPurpose(value);
    setChoice({ purpose: value });
  };

  // Stay in sync with the format selector and the use-case buttons.
  useEffect(() => {
    const onFormat = (e) => setFormat(e.detail);
    const onPurpose = (e) => setPurpose(e.detail);
    window.addEventListener('format-selected', onFormat);
    window.addEventListener('purpose-selected', onPurpose);
    return () => {
      window.removeEventListener('format-selected', onFormat);
      window.removeEventListener('purpose-selected', onPurpose);
    };
  }, []);

  return (
    <section id="pedido" className="section section--form">
      <div className="container container-narrow">
        <h2 className="section-title">{copy.title}</h2>
        <p className="section-lead">{copy.intro}</p>

        <div className="quick-start">
          <Chips
            label="Tamaño (opcional)"
            options={[...sizeChips, { value: null, label: copy.noFormat }]}
            value={format}
            onChange={pickFormat}
          />
          <Chips label="¿Para qué es? (opcional)" options={copy.purposes} value={purpose} onChange={pickPurpose} />

          <WhatsAppButton source="quick_start" className="btn btn-primary btn-lg w-100 btn-wa" format={format} purpose={purpose}>
            {copy.cta}
          </WhatsAppButton>
          <p className="form-text text-center mt-2 mb-0">{copy.note}</p>
        </div>
      </div>
    </section>
  );
}
