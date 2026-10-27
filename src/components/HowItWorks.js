import { steps } from '@/content/landing';
import { Pending } from '@/lib/text';

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="section">
      <div className="container">
        <h2 className="section-title">Cómo funciona</h2>
        <ol className="steps">
          {steps.map((s, i) => (
            <li key={s.title} className="step">
              <div className="step-head">
                <span className="step-num" aria-hidden="true">
                  {i + 1}
                </span>
                <h3>{s.title}</h3>
              </div>
              <p>
                <Pending text={s.text} />
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
