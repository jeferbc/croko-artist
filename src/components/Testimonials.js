import Image from 'next/image';
import { MIN_TESTIMONIALS, testimonials } from '@/content/landing';

// Hidden until there are enough real testimonials (photo of the pet next to its portrait).
export default function Testimonials() {
  if (testimonials.length < MIN_TESTIMONIALS) return null;
  return (
    <section id="testimonios" className="section section--tinted">
      <div className="container">
        <h2 className="section-title">Lo que dicen sus familias</h2>
        <div className="row g-3 g-lg-4">
          {testimonials.map((t) => (
            <div key={t.name} className="col-md-4">
              <figure className="testimonial">
                {t.photo && (
                  <div className="testimonial__photo">
                    <Image src={t.photo.src} alt={t.photo.alt} fill sizes="(min-width: 768px) 30vw, 90vw" />
                  </div>
                )}
                <blockquote>
                  <p>{t.text}</p>
                </blockquote>
                <figcaption>
                  {t.name} · {t.pet}
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
