import { site } from '@/content/landing';
import WhatsAppButton from './WhatsAppButton';

export default function Header() {
  return (
    <header className="site-header">
      <div className="container d-flex align-items-center justify-content-between gap-3">
        <a href="#inicio" className="brand" aria-label={`${site.brand}, inicio`}>
          <span className="brand-name">Croko</span>
          <span className="brand-sub">artista</span>
        </a>
        <WhatsAppButton source="header" className="btn btn-sm btn-outline-primary btn-wa">
          Escríbenos
        </WhatsAppButton>
      </div>
    </header>
  );
}
