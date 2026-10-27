import { essence } from '@/content/landing';
import ArtGallery from './ArtGallery';

export default function GallerySection() {
  return (
    <section id="galeria" className="section section--tinted">
      <div className="container">
        <h2 className="section-title">Retratos pintados por Carolina</h2>
        <p className="section-lead">
          Cada cuadro empieza con una foto y una historia. Toca una obra y acércate con los dedos: la pintura se ve y casi se toca.
        </p>
        <ArtGallery />

        <figure className="essence">
          <blockquote>
            <p>“{essence.quote}”</p>
          </blockquote>
          <figcaption>— {essence.author}</figcaption>
          <div className="essence__body">
            {essence.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </figure>
      </div>
    </section>
  );
}
