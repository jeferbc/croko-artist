# Croko · landing de retratos de mascotas (CRO-10)

Landing en español, pensada primero para celular, para los retratos de mascotas pintados por Carolina Rincón (*impresionismo al impasto alla prima*). Su objetivo es convertir tráfico de anuncios en una conversación de WhatsApp y capturar la atribución (UTM, fbclid, gclid) antes de pasar al chat.

## Stack
- Next.js 16 (App Router, Turbopack), React 19
- Bootstrap 5.3 (importación parcial con Sass) + Reactstrap para el acordeón
- PhotoSwipe 5 (`react-photoswipe-gallery`) para el zoom de la galería; cuadrícula CSS con marco uniforme 4:5
- Fuentes: Young Serif (títulos) y Figtree (texto) con `next/font`

## Comandos
```bash
npm install
cp .env.example .env.local   # completar las variables
npm run dev                  # http://localhost:3000
npm run build && npm start
```

## Variables de entorno
| Variable | Uso |
|---|---|
| `N8N_WEBHOOK_URL` | Webhook de n8n que crea el Lead en Frappe. Solo se usa en el servidor. Si está vacío, el formulario igual abre WhatsApp. |
| `NEXT_PUBLIC_SITE_URL` | URL pública, para canonical, Open Graph y los `@id` del schema. |
| `NEXT_PUBLIC_GTM_ID` | Contenedor de Google Tag Manager de la nueva marca (opcional). |

## Dónde se edita el contenido
Todo el texto, los precios, las preguntas frecuentes y las obras están en **`src/content/landing.js`**.
- El texto entre `[corchetes]` aparece resaltado en amarillo como dato pendiente hasta que se reemplaza.
- Un precio `null` se muestra como "Precio por confirmar". Cuando un formato tiene precio, también se agrega su `Product`/`Offer` al schema.
- La sección de testimonios se oculta hasta que haya al menos 3 (`MIN_TESTIMONIALS`).
- Para agregar una obra, se suma un objeto a `artworks` con su `width`/`height` reales. `reference` (la foto del dueño) activa el comparador antes/después en el hero y un botón en la galería; `details` agrega acercamientos como diapositivas extra.

## Flujo de contacto (WhatsApp como canal principal)
No hay formulario: todos los botones abren WhatsApp con un mensaje prellenado. Los botones son el hero, "Quiero el …" de formatos, la galería, los casos de uso, el bloque final `#pedido`, el botón flotante, el header y el footer.
1. `AttributionCapture` guarda los UTM, click IDs, `_fbp`/`_fbc` y el referrer en `localStorage` durante 90 días.
2. El mensaje empieza con "¡Hola Croko! 👋 Quiero un retrato de mi mascota", para distinguirlo de los kits. Luego agrega el tamaño elegido en el selector o en el bloque final, el propósito si se eligió uno y un código `Ref:` con la campaña (`fb:<fbclid> | camp:<utm_campaign>`).
3. Cada clic empuja `whatsapp_click` al `dataLayer` con `whatsapp_source`, `format` y `purpose`. En GTM se mapea a `Contact` del Pixel y a la conversión de Google Ads.

El Lead en Frappe se crea desde la conversación: manualmente, o con n8n si el número usa la API de WhatsApp Business. El código `Ref:` sirve para atribuirlo. El endpoint `POST /api/lead` (envía a `N8N_WEBHOOK_URL`) quedó en el código, sin uso, por si se vuelve a poner un formulario.

Se usa `api.whatsapp.com/send` en lugar de `wa.me`, porque el redirect de `wa.me` cambia los emojis por "�".

## Zoom de la galería
Los niveles de zoom son relativos al tamaño "ajustado a pantalla": un clic o doble toque acerca 2.5×, y el máximo es 5×. El resultado depende de la resolución de la foto. **Las fotos actuales son de WhatsApp (~1000 px) y no muestran la textura al acercar.** Hay que fotografiar cada cuadro de frente, con luz lateral y 24 MP o más, y servirlo desde ImageKit en tres tamaños: 600 px, 2000 px y el original.

## Pendiente antes de lanzar
Ya se incluyeron las respuestas de Carolina del 26 de octubre: precios, medidas, tiempos, ajustes, entrega, pago, marca y credenciales. Falta:
- **Carolina:** la medida 30 x 45 cm del Mediano (se retiró hasta confirmarla); confirmar la transportadora y sus tarifas; comparaciones foto vs. cuadro de Lazy y Rostintin; permisos para publicar las obras nuevas.
- **Jefferson:** el descuento por varios Minis (no se menciona en la página hasta definirlo); confirmar el envío gratis con las tarifas, sobre todo en el Mini.
- Fotos profesionales de las obras, foto de Carolina y testimonios reales.
- Workflow de n8n `/webhook/pet-portrait` y campos de mascota en el Lead de Frappe.
- Dominio final, redes sociales y GTM/Pixel propios.
