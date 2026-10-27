import Image from 'next/image';
import { about, site } from '@/content/landing';

export default function About() {
  return (
    <section id="carolina" className="section section--tinted">
      <div className="container">
        <div className="row align-items-center g-4 g-lg-5">
          <div className="col-md-5">
            {about.photo ? (
              <div className="about-photo about-photo--cutout">
                <Image src={about.photo.src} alt={about.photo.alt} width={about.photo.width} height={about.photo.height} unoptimized />
              </div>
            ) : (
              <div className="about-photo about-photo--empty">
                <mark className="pending">Foto de Carolina pintando</mark>
              </div>
            )}
          </div>
          <div className="col-md-7">
            <p className="eyebrow">Sobre Carolina Rincón</p>
            <h2 className="section-title text-start">{about.title}</h2>
            {about.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <ul className="about-credentials">
              {about.credentials.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <a href={site.carolinaBioUrl} className="link-arrow" target="_blank" rel="noopener">
              {about.linkLabel} →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
