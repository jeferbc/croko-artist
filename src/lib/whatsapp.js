import { site } from '@/content/landing';
import { attributionRef } from '@/lib/attribution';

// api.whatsapp.com directly: the wa.me redirect turns emojis into "�".
export const whatsappUrl = (message) =>
  `https://api.whatsapp.com/send?phone=${site.whatsappNumber}&text=${encodeURIComponent(message)}`;

export const withRef = (message) => {
  const ref = attributionRef();
  return ref ? `${message}\n\n_Ref: ${ref}_` : message;
};

// Size and purpose picked on the page (format selector, quick start), so every
// WhatsApp button on the page sends them.
const choice = { format: null, purpose: null };
export const setChoice = (patch) => Object.assign(choice, patch);
export const getChoice = () => ({ ...choice });

// Portraits share Croko's number with the belly-painting kits; the opening line tells them apart.
export const portraitMessage = ({ format, purpose } = choice) => {
  const lines = [`¡Hola Croko! 👋 Quiero un retrato de mi mascota${format ? ` en tamaño ${format}` : ''}.`];
  if (purpose) lines.push(`Es ${purpose}.`);
  return withRef(lines.join('\n'));
};
