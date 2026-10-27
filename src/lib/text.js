import { Fragment } from 'react';

const COP = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });

export const formatPrice = (value) => (value == null ? null : COP.format(value));

// Renders text with [pending values] highlighted, so missing data is obvious in previews.
export function Pending({ text }) {
  const parts = text.split(/(\[[^\]]+\])/g);
  return parts.map((part, i) =>
    part.startsWith('[') && part.endsWith(']') ? (
      <mark key={i} className="pending" title="Dato pendiente">
        {part.slice(1, -1)}
      </mark>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

// Plain-text version for metadata and JSON-LD: drops pending markers.
export const plain = (text) => text.replace(/\s*\[[^\]]+\]\s*/g, ' ').replace(/\s+/g, ' ').trim();
