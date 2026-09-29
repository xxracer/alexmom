/**
 * Vercel Serverless Function — keeps the contact form working on the
 * static deployment (mirrors the /api/contact route in server.ts).
 * Requires the env var VITE_MAKE_WEBHOOK_URL in the Vercel project.
 */
const MAKE_WEBHOOK_URL = process.env.VITE_MAKE_WEBHOOK_URL || process.env.MAKE_WEBHOOK_URL;

async function getCountryCode(ip) {
  if (!ip) return null;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(`https://ipapi.co/${ip}/json/`, {
      signal: controller.signal,
      headers: { 'User-Agent': 'medicare-advisory/1.0' },
    });
    clearTimeout(timeout);
    if (!res.ok) return null;
    const data = await res.json();
    return data.country_code || data.country || null;
  } catch {
    return null;
  }
}

const isValidPhone = (phone) => {
  const digits = String(phone).replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15;
};
const isValidZip = (zip) => /^\d{5}(-\d{4})?$/.test(String(zip).trim());
const isValidName = (name) => /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,80}$/.test(String(name).trim());

const json = (res, status, payload) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    json(res, 405, { ok: false, error: 'method_not_allowed' });
    return;
  }
  if (!MAKE_WEBHOOK_URL) {
    console.error('VITE_MAKE_WEBHOOK_URL is not configured');
    json(res, 500, { ok: false, error: 'server_config' });
    return;
  }

  let body = req.body || {};
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }

  const { name, phone, zip, insurances, website } = body;

  // Honeypot: filled hidden field = bot.
  if (website && typeof website === 'string' && website.trim().length > 0) {
    json(res, 400, { ok: false, error: 'invalid_request' });
    return;
  }

  if (!isValidName(name) || !isValidPhone(phone) || !isValidZip(zip)) {
    json(res, 400, { ok: false, error: 'invalid_data' });
    return;
  }

  const clientIp = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  if (clientIp && clientIp !== '127.0.0.1' && !clientIp.startsWith('192.168.') && !clientIp.startsWith('10.')) {
    const country = await getCountryCode(clientIp);
    if (country && String(country).toUpperCase() !== 'US') {
      json(res, 403, { ok: false, error: 'not_usa' });
      return;
    }
  }

  const payload = {
    name: String(name).trim(),
    phone: String(phone).trim(),
    zip: String(zip).trim(),
    insurances: Array.isArray(insurances) ? insurances : [],
    ip: clientIp,
    submittedAt: new Date().toISOString(),
  };

  try {
    const makeRes = await fetch(MAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!makeRes.ok) {
      console.error('Make webhook error:', makeRes.status);
      json(res, 502, { ok: false, error: 'webhook_error' });
      return;
    }
    json(res, 200, { ok: true });
  } catch (err) {
    console.error('Error forwarding to Make:', err);
    json(res, 502, { ok: false, error: 'webhook_error' });
  }
}