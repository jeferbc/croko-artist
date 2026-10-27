// All copy, prices and artworks for the landing live here, so Carolina's answers
// can be filled in without touching components.
// Text inside [brackets] is a pending value: it renders highlighted until replaced.
// A price of null renders as "Precio por confirmar".

export const site = {
  brand: 'Croko',
  tagline: 'Retratos de mascotas pintados a mano',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://crokoartista.co',
  whatsappNumber: '573168161717', // Same number as Croko; the prefilled message tells portraits apart from kits
  whatsappDisplay: '+57 316 816 1717',
  mainSiteUrl: 'https://www.croko.co', // belly-painting kits live there
  instagram: null, // e.g. 'https://www.instagram.com/croko'
  tiktok: null,
  carolinaBioUrl: 'https://www.croko.co/carolina-rincon',
  carolinaPersonId: 'https://www.croko.co/carolina-rincon#person',
};

export const hero = {
  eyebrow: 'Impresionismo al impasto · Pintado a mano en Medellín',
  title: 'No es una copia de la foto. Es tu mascota como la sientes.',
  subtitle:
    'Carolina Rincón pinta a tu mascota en acrílico sobre lienzo, con pinceladas gruesas de impasto que atrapan su esencia. Listo en 10 días hábiles y con envío gratis a toda Colombia.',
  cta: 'Pide el retrato de tu mascota',
  microcopy: 'Toma 1 minuto. Te respondemos por WhatsApp y, antes de pintar, apruebas el boceto.',
  artworkId: 'lazy',
};

export const steps = [
  { title: 'Nos escribes', text: 'Por WhatsApp nos mandas sus fotos y nos cuentas cómo es.' },
  { title: 'Apruebas el boceto', text: 'Ahí se definen la pose y el gesto. Pagas el 50 %.' },
  { title: 'Carolina lo pinta', text: 'Colores y fondo según su personalidad.' },
  { title: 'Lo ves terminado', text: 'Te mandamos una foto y tienes una ronda de ajustes.' },
  { title: 'Te llega a casa', text: 'Pagas el otro 50 % y lo enviamos gratis.' },
];

// Gallery: only pieces in the technique being sold.
// `src` is the zoom original; `reference` is the owner's photo (before/after) when available.
// `details` are close-up crops shown as extra slides in the lightbox.
// TODO: re-shoot every piece straight-on with raking light (>= 24 MP) and serve
// thumbnail / 2000px / full-size variants from ImageKit.
export const artworks = [
  {
    id: 'lazy',
    pet: 'Lazy',
    species: 'Perro (pastor de Shetland)',
    format: 'Grande',
    year: 2026,
    note: 'Con sombrero vueltiao: un retrato bien colombiano.',
    src: '/obras/lazy.jpg',
    width: 1004,
    height: 1496,
    alt: 'Cuadro de perro pastor de Shetland con sombrero vueltiao, pintado a mano en impasto sobre fondo naranja',
    reference: null, // [Pendiente: foto de referencia de Lazy]
    details: [],
  },
  {
    id: 'rostintin',
    pet: 'Rostintin',
    species: 'Gato siamés',
    format: 'Mini',
    year: 2026,
    note: 'Lienzo pequeño, pincelada suelta y ojos que te siguen.',
    src: '/obras/rostintin.jpg',
    width: 1167,
    height: 1105,
    alt: 'Cuadro de gato siamés de ojos azules con collar rosado, pintado a mano en impasto sobre fondo azul',
    reference: null, // [Pendiente: foto de referencia de Rostintin]
    details: [],
  },
];

export const essence = {
  quote: 'En el impresionismo atrapamos la esencia, no la exactitud.',
  author: 'Carolina Rincón',
  body: [
    'Una foto guarda cómo se veía tu mascota en un segundo. Un retrato impresionista guarda cómo es: la energía con que corre hacia la puerta, la calma con que se echa al sol.',
    'Carolina no copia cada pelo; pinta lo que tú reconoces de lejos, eso que te hace decir "es ella". Si buscas una réplica fotográfica, este no es tu retrato. Si quieres que tu mascota se sienta en el cuadro, sí lo es.',
  ],
};

// `label` is the size as Carolina names it; `w` x `h` (cm) draw the wall preview to scale.
// `pending: true` highlights a size that is not confirmed yet and keeps it out of the schema.
export const formats = [
  {
    id: 'mini',
    name: 'Mini',
    text: 'Para el escritorio, la mesa de noche o para regalar.',
    maxPets: 1,
    days: 10,
    sizes: [
      { id: 'mini-10x10', label: '10 x 10 cm', w: 10, h: 10, price: 250000 },
      { id: 'mini-12x17', label: '12,5 x 17,5 cm', w: 12.5, h: 17.5, price: 300000 },
    ],
  },
  {
    id: 'mediano',
    name: 'Mediano',
    text: 'El tamaño ideal para una pared de la casa.',
    maxPets: 2,
    days: 10,
    sizes: [
      { id: 'mediano-30x30', label: '30 x 30 cm', w: 30, h: 30, price: 500000 },
    ],
  },
  {
    id: 'grande',
    name: 'Grande',
    text: 'Una pieza protagonista para la sala, con espacio para toda la manada.',
    maxPets: 4,
    days: 20,
    // Vertical (like Lazy) or horizontal, depending on the composition
    sizes: [{ id: 'grande-90x60', label: '90 x 60 cm', w: 60, h: 90, price: 1600000, rotatable: true }],
  },
];

export const extras = [
  { id: 'extra-pet', name: 'Mascota adicional', price: 100000, unit: 'c/u', minPets: 2 },
  { id: 'name', name: 'Nombre pintado a mano', included: true },
];

export const formatsNote =
  'Acrílico sobre lienzo en bastidor (3 cm de grosor en el Mini, 2 cm en Mediano y Grande) con los bordes pintados. Se entrega sin marco. Envío gratis a toda Colombia.';

// "Mini de 10 x 10 cm": used by the picker, the quick start and the WhatsApp message.
export const sizeOption = (format, size) => `${format.name} de ${size.label}`;



export const about = {
  title: 'La artista que pintó más de 800 barrigas ahora pinta a los otros miembros de la familia.',
  body: [
    'Desde 2014, Carolina Rincón ha pintado más de 800 barrigas de embarazo en Medellín con Croko, sin repetir nunca un diseño. Sabe que la familia no siempre llega en coche de bebé: a veces llega con cuatro patas y cola.',
    'Hace tiempo pinta también a las mascotas de sus clientas, y ahora se dedica a hacerlo con la técnica que mejor captura su esencia: el impresionismo al impasto.',
  ],
  credentials: [
    'Aprendiendo impasto con reconocidos maestros de Medellín.',
    'Su obra se ha exhibido en la Galería Duke del Palacio Nacional de Medellín.',
  ],
  // Cut-out PNG (transparent background), resized by ImageKit
  photo: {
    src: 'https://ik.imagekit.io/ge17f66b4ma/MIA-1_gfnS344_D.png?tr=w-500,q-85,f-auto:w-640,c-at_max',
    width: 500,
    height: 637,
    alt: 'Carolina Rincón sonriendo con un pincel en la mano',
  },
  linkLabel: 'Conoce más de Carolina',
};

export const useCases = [
  {
    id: 'regalo',
    title: 'Para regalar',
    text: 'Para tu mamá perruna, para tu amiga que habla de su gata como de una hija, para tu pareja. Un regalo que no se guarda en un cajón: se cuelga.',
    cta: 'Quiero regalar un retrato',
  },
  {
    id: 'memorial',
    title: 'Para recordar',
    text: 'Cuando una mascota parte, deja un silencio en la casa. Si quieres un retrato para honrarla, Carolina lo pinta con calma y con todo el respeto. Puedes contarnos su historia, sin afán. Nos sirven las fotos que tengas, aunque no sean perfectas.',
    cta: 'Cuéntanos de tu mascota',
    quiet: true,
  },
  {
    id: 'familia',
    title: 'Para la familia que crece',
    text: '¿Llega un bebé y tu perro va a ser hermano mayor? Carolina puede pintar a tu mascota para acompañar el retrato de la barriga o de la familia.',
    cta: 'Quiero un retrato familiar',
  },
];

// The section stays hidden until there are at least 3 real testimonials.
export const testimonials = [];
export const MIN_TESTIMONIALS = 3;

export const faqs = [
  {
    q: '¿Qué fotos necesitan?',
    a: 'Fotos nítidas, con luz natural, tomadas a la altura de sus ojos y donde se vea bien su carita. Mándalas desde la galería del celular como documento, no reenviadas, para que no pierdan calidad. Si tienes varias, mándalas todas.',
  },
  {
    q: '¿Se va a ver igual a mi mascota?',
    a: 'Se va a ver como tu mascota, no como una foto de ella. Carolina usa una cuadrícula para mantener las proporciones y pinta su esencia (su expresión, sus colores, su actitud) con pinceladas sueltas y gruesas. Si buscas hiperrealismo, te lo decimos con honestidad: esta técnica no es para eso.',
  },
  {
    q: '¿Puedo pedir cambios?',
    a: 'Sí, en dos momentos. Antes de pintar apruebas el boceto: ahí se definen la pose, el gesto y las facciones. Con el cuadro terminado te mandamos una foto y tienes una ronda de ajustes para agregar algo (una medallita, un accesorio), ajustar colores o intensificar el fondo. Después del boceto ya no se pueden cambiar la pose, el gesto ni las facciones, porque la textura del impasto ya está construida.',
  },
  {
    q: '¿Cuánto se demora?',
    a: '10 días hábiles para Mini y Mediano y 20 para el Grande, desde que apruebas la foto y con el envío incluido. Contamos de lunes a sábado; domingos y festivos no cuentan. Si es para una fecha especial, cuéntanos y te decimos con honestidad si alcanzamos.',
  },
  {
    q: '¿Por qué hay que esperar el secado?',
    a: 'El impasto es pintura en capas gruesas. Dejamos secar el cuadro 2 días antes de empacarlo para que viaje sin marcarse. Ese tiempo ya está incluido en la entrega.',
  },
  {
    q: '¿Hacen envíos a toda Colombia?',
    a: 'Sí, y el envío es gratis a cualquier ciudad del país; tarda de 2 a 3 días según la ciudad. Si estás en Medellín o el Valle de Aburrá, también puedes recogerlo en Envigado: lo coordinamos por WhatsApp. Si llega con algún daño, nosotros nos encargamos del arreglo.',
  },
  {
    q: '¿Viene con marco?',
    a: 'Viene en bastidor (3 cm de grosor en el Mini y 2 cm en Mediano y Grande) con los bordes pintados: la pintura continúa por los lados. No trae marco, gancho ni alambre; si quieres enmarcarlo, lo haces a tu gusto.',
  },
  {
    q: '¿Cómo se paga?',
    a: 'La mitad cuando apruebas el boceto y la otra mitad después de la ronda de ajustes, antes de enviarlo. Puedes pagar con Wompi (tarjeta, Nequi, Daviplata o PSE) o por transferencia. No manejamos contraentrega: cada cuadro es de una sola mascota, la tuya.',
  },
  {
    q: '¿Puede pintar a varias mascotas juntas?',
    a: 'Sí, aunque estén en fotos distintas. El Mediano tiene espacio para 2 mascotas y el Grande para 4; cada mascota adicional cuesta $100.000. El Mini es para una sola: si quieres varias, puedes pedir un Mini por cada una.',
  },
  {
    q: '¿Puede llevar el nombre de mi mascota?',
    a: 'Sí. El nombre pintado a mano va incluido en todos los tamaños.',
  },
  {
    q: 'Mi mascota ya partió. ¿Pueden pintarla?',
    a: 'Sí, con mucho cariño. Mándanos las fotos que tengas y cuéntanos su historia si quieres que esté en el cuadro.',
  },
  {
    q: '¿Es un dibujo o una impresión?',
    a: 'Ninguna de las dos. Es un retrato pintado a mano en lienzo, con acrílico, y va firmado por la artista. Cada cuadro es único.',
  },
];

// Closing section: optional picks that go into the WhatsApp message. No personal data.
export const quickStart = {
  title: 'Empecemos el retrato',
  intro: 'Escríbenos por WhatsApp y por ahí nos mandas las fotos de tu mascota. Si quieres, elige antes el tamaño y para qué es; va en tu mensaje.',
  noFormat: 'Aún no sé',
  // ids match useCases, so those links preselect the purpose
  purposes: [
    { id: 'mi', value: 'para mí', label: 'Para mí' },
    { id: 'regalo', value: 'para regalar', label: 'Para regalar' },
    { id: 'memorial', value: 'en memoria de mi mascota', label: 'En memoria de mi mascota' },
    { id: 'familia', value: 'para la familia (bebé + mascota)', label: 'Familia o bebé + mascota' },
  ],
  cta: 'Escríbenos por WhatsApp',
  note: 'Te responde Carolina. Manda las fotos desde la galería del celular para que lleguen en buena calidad.',
};

export const seo = {
  title: 'Cuadros de mascotas pintados a mano | Croko',
  description:
    'Carolina Rincón pinta a tu perro o gato a mano, en acrílico sobre lienzo con la técnica del impasto. Desde $250.000, listo en 10 días hábiles y con envío gratis a toda Colombia.',
};
