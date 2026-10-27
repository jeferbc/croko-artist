import { quickStart, useCases } from '@/content/landing';
import WhatsAppButton from './WhatsAppButton';

const purposeOf = (id) => quickStart.purposes.find((p) => p.id === id)?.value;

export default function UseCases() {
  return (
    <section id="para-quien" className="section">
      <div className="container">
        <h2 className="section-title">Un retrato para cada historia</h2>
        <div className="row g-3 g-lg-4">
          {useCases.map((u) => (
            <div key={u.id} className="col-md-4">
              <article className={`use-case${u.quiet ? ' use-case--quiet' : ''}`}>
                <h3>{u.title}</h3>
                <p>{u.text}</p>
                <WhatsAppButton source={`use_case_${u.id}`} className="link-arrow link-button" purpose={purposeOf(u.id)} icon={false}>
                  {u.cta} →
                </WhatsAppButton>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
