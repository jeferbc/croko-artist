'use client';

import { UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionBody } from 'reactstrap';
import { faqs } from '@/content/landing';
import { Pending } from '@/lib/text';

export default function Faq() {
  return (
    <section id="preguntas" className="section section--tinted">
      <div className="container container-narrow">
        <h2 className="section-title">Preguntas frecuentes</h2>
        <UncontrolledAccordion defaultOpen="0" className="faq">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q}>
              <AccordionHeader targetId={String(i)} tag="h3">
                {f.q}
              </AccordionHeader>
              <AccordionBody accordionId={String(i)}>
                <Pending text={f.a} />
              </AccordionBody>
            </AccordionItem>
          ))}
        </UncontrolledAccordion>
      </div>
    </section>
  );
}
