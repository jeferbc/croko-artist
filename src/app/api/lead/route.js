// Receives the order form and forwards it to the n8n webhook, which creates the
// Frappe Lead. The webhook URL stays server-side. If it is not configured, the
// request succeeds with `forwarded: false` so the WhatsApp handoff still works.

const REQUIRED = ['name', 'phone', 'petName', 'species', 'petCount', 'format', 'purpose'];
const MAX_LEN = 2000;

const normalizePhone = (raw) => {
  const digits = String(raw || '').replace(/\D/g, '');
  if (/^3\d{9}$/.test(digits)) return `57${digits}`;
  if (/^573\d{9}$/.test(digits)) return digits;
  return null;
};

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const missing = REQUIRED.filter((k) => !String(body?.[k] ?? '').trim());
  if (missing.length) return Response.json({ ok: false, error: 'missing_fields', fields: missing }, { status: 422 });

  const phone = normalizePhone(body.phone);
  if (!phone) return Response.json({ ok: false, error: 'invalid_phone', fields: ['phone'] }, { status: 422 });

  const clip = (v) => (v == null ? null : String(v).slice(0, MAX_LEN));
  const lead = {
    source: 'croko-artista-landing',
    lead_type: 'pet_portrait',
    name: clip(body.name),
    phone,
    pet_name: clip(body.petName),
    species: clip(body.species),
    pet_count: clip(body.petCount),
    format: clip(body.format),
    purpose: clip(body.purpose),
    needed_by: clip(body.neededBy) || null,
    story: clip(body.story) || null,
    attribution: body.attribution && typeof body.attribution === 'object' ? body.attribution : null,
    page_url: clip(body.pageUrl),
    user_agent: clip(request.headers.get('user-agent')),
    submitted_at: new Date().toISOString(),
  };

  const webhook = process.env.N8N_WEBHOOK_URL;
  if (!webhook) return Response.json({ ok: true, forwarded: false });

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.error('lead: n8n responded', res.status);
      return Response.json({ ok: false, error: 'upstream_error' }, { status: 502 });
    }
    return Response.json({ ok: true, forwarded: true });
  } catch (e) {
    console.error('lead: n8n request failed', e);
    return Response.json({ ok: false, error: 'upstream_unreachable' }, { status: 502 });
  }
}
