'use client';

import Image from 'next/image';
import { useId, useState } from 'react';

// Drag-to-compare between the owner's photo and the painting.
// A native range input drives it, so it works with touch, mouse and keyboard.
export default function BeforeAfter({ before, after, priority = false }) {
  const [pos, setPos] = useState(50);
  const id = useId();
  return (
    <div className="before-after" style={{ aspectRatio: `${after.width} / ${after.height}`, '--pos': `${pos}%` }}>
      <Image src={after.src} alt={after.alt} fill sizes="(min-width: 992px) 40vw, 90vw" priority={priority} />
      <div className="before-after__before">
        <Image src={before.src} alt={before.alt} fill sizes="(min-width: 992px) 40vw, 90vw" priority={priority} />
      </div>
      <span className="before-after__label before-after__label--left">Foto</span>
      <span className="before-after__label before-after__label--right">Cuadro</span>
      <div className="before-after__handle" aria-hidden="true" />
      <label htmlFor={id} className="visually-hidden">
        Desliza para comparar la foto con el cuadro
      </label>
      <input
        id={id}
        type="range"
        min="0"
        max="100"
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="before-after__range"
      />
    </div>
  );
}
