'use client';

// Attribution capture, adapted from croko.co (src/lib/adsTracking.js).
// About 90% of sales close on WhatsApp, so click IDs and UTMs are stored on the
// first visit and sent with the order form before the WhatsApp handoff.

const STORAGE_KEY = 'croko_artista_attribution';
const TTL_DAYS = 90;

const isBrowser = () => typeof window !== 'undefined';

const getCookie = (name) => {
  if (!isBrowser()) return null;
  const m = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return m ? decodeURIComponent(m[2]) : null;
};

export const getAttribution = () => {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data.first_seen_at && Date.now() - data.first_seen_at > TTL_DAYS * 864e5) {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return data;
  } catch {
    return null;
  }
};

export const captureAttribution = () => {
  if (!isBrowser()) return null;
  try {
    const params = new URLSearchParams(window.location.search);
    const clickIds = ['gclid', 'gbraid', 'wbraid', 'fbclid'];
    const utms = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    const hasNewTouch = [...clickIds, 'utm_source'].some((k) => params.get(k));
    const existing = getAttribution();
    const fbp = getCookie('_fbp');
    const fbc = getCookie('_fbc');

    if (!hasNewTouch && existing) {
      const updated = { ...existing, fbp: fbp || existing.fbp || null, fbc: fbc || existing.fbc || null, last_seen_at: Date.now() };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    }

    const attribution = {};
    [...clickIds, ...utms].forEach((k) => {
      attribution[k] = params.get(k) || existing?.[k] || null;
    });
    Object.assign(attribution, {
      landing_page: window.location.pathname,
      referrer: document.referrer || existing?.referrer || null,
      fbp: fbp || existing?.fbp || null,
      fbc: fbc || existing?.fbc || null,
      first_seen_at: existing?.first_seen_at || Date.now(),
      last_seen_at: Date.now(),
    });
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
    return attribution;
  } catch (e) {
    console.warn('attribution: capture failed', e);
    return null;
  }
};

// Short reference appended to WhatsApp messages so chat sales can be attributed by hand.
export const attributionRef = () => {
  const a = getAttribution();
  if (!a) return null;
  const parts = [];
  if (a.fbclid) parts.push(`fb:${a.fbclid.slice(0, 12)}`);
  else if (a.gclid) parts.push(`ads:${a.gclid.slice(0, 20)}`);
  else if (a.gbraid) parts.push(`gbraid:${a.gbraid.slice(0, 20)}`);
  else if (a.wbraid) parts.push(`wbraid:${a.wbraid.slice(0, 20)}`);
  if (a.utm_campaign) parts.push(`camp:${a.utm_campaign}`);
  else if (a.utm_source) parts.push(`src:${a.utm_source}`);
  return parts.length ? parts.join(' | ') : null;
};

// Push events to GTM's dataLayer. Tracking must never break a click.
export const track = (event, data = {}) => {
  if (!isBrowser()) return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...data });
  } catch {
    // ignore
  }
};
