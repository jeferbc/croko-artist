import { site } from '@/content/landing';
import WhatsAppButton from './WhatsAppButton';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row g-4 align-items-start">
          <div className="col-md-5">
            <p className="brand brand--footer">
              <span className="brand-name">Croko</span>
              <span className="brand-sub">artista</span>
            </p>
            <p>{site.tagline} por Carolina Rincón. Medellín, Colombia. Envío gratis a todo el país.</p>
            <p className="footer-kits">
              ¿Buscas los kits para pintar barriguitas? Están en <a href={site.mainSiteUrl}>croko.co</a>.
            </p>
          </div>
          <div className="col-md-4">
            <p className="footer-title">Contacto</p>
            <p className="mb-2">
              WhatsApp: <span className="user-select-all">{site.whatsappDisplay}</span>
            </p>
            <WhatsAppButton source="footer" className="btn btn-sm btn-outline-light btn-wa">
              Escríbenos
            </WhatsAppButton>
          </div>
          <div className="col-md-3">
            <p className="footer-title">Más de Carolina</p>
            <ul className="list-unstyled">
              <li>
                <a href={site.carolinaBioUrl} target="_blank" rel="noopener">Su historia en croko.co</a>
              </li>
              {site.instagram && (
                <li>
                  <a href={site.instagram} target="_blank" rel="noopener">Instagram</a>
                </li>
              )}
              {site.tiktok && (
                <li>
                  <a href={site.tiktok} target="_blank" rel="noopener">TikTok</a>
                </li>
              )}
            </ul>
          </div>
        </div>
        <p className="footer-legal">© {year} Croko · Cada retrato es una obra única pintada a mano.</p>
      </div>
    </footer>
  );
}
