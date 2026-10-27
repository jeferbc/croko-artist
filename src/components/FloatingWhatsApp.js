'use client';

import { useEffect, useState } from 'react';
import WhatsAppButton from './WhatsAppButton';

// Floating WhatsApp button on every screen size. Appears once the visitor starts
// scrolling and hides while the closing section (which has its own big button) is on screen.
export default function FloatingWhatsApp() {
  const [scrolled, setScrolled] = useState(false);
  const [closingVisible, setClosingVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 300);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const closing = document.getElementById('pedido');
    const io = closing ? new IntersectionObserver(([entry]) => setClosingVisible(entry.isIntersecting), { threshold: 0.2 }) : null;
    if (closing) io.observe(closing);

    return () => {
      window.removeEventListener('scroll', onScroll);
      io?.disconnect();
    };
  }, []);

  const visible = scrolled && !closingVisible;
  return (
    <div className={`wa-float${visible ? ' is-visible' : ''}`} aria-hidden={!visible}>
      <WhatsAppButton source="floating" className="wa-float__btn" aria-label="Escríbenos por WhatsApp" tabIndex={visible ? 0 : -1}>
        <span className="wa-float__label">Escríbenos</span>
      </WhatsAppButton>
    </div>
  );
}
