import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { REGIONS } from './src/regions';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const MAKE_WEBHOOK_URL = process.env.VITE_MAKE_WEBHOOK_URL;

app.set('trust proxy', true);
app.use(express.json());

// Utility: get caller IP (handles proxies).
function getClientIp(req: Request): string | undefined {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  if (typeof forwarded === 'object' && forwarded.length > 0) {
    return forwarded[0].trim();
  }
  return req.ip || req.socket.remoteAddress;
}

// Utility: validate US phone (at least 10 digits, allows common separators).
function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15;
}

// Utility: validate US ZIP (5 digits, optionally ZIP+4).
function isValidZip(zip: string): boolean {
  return /^\d{5}(-\d{4})?$/.test(zip.trim());
}

// Utility: validate name (letters, spaces, hyphens, apostrophes; 2-80 chars).
function isValidName(name: string): boolean {
  return /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,80}$/.test(name.trim());
}

interface IpApiResponse {
  country_code?: string;
  country?: string;
  ip?: string;
  error?: { info?: string };
}

async function getCountryCode(ip: string): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(`https://ipapi.co/${ip}/json/`, {
      signal: controller.signal,
      headers: { 'User-Agent': 'medicare-advisory/1.0' },
    });
    clearTimeout(timeout);
    if (!res.ok) return null;
    const data = (await res.json()) as IpApiResponse;
    return data.country_code || data.country || null;
  } catch {
    return null;
  }
}

// Contact endpoint: validates data, blocks non-US IPs, forwards to Make.
app.post('/api/contact', async (req: Request, res: Response) => {
  if (!MAKE_WEBHOOK_URL) {
    console.error('VITE_MAKE_WEBHOOK_URL is not configured');
    return res.status(500).json({ ok: false, error: 'server_config' });
  }

  const { name, phone, zip, insurances, website } = req.body || {};

  // Honeypot: if the hidden field is filled, treat as bot.
  if (website && typeof website === 'string' && website.trim().length > 0) {
    return res.status(400).json({ ok: false, error: 'invalid_request' });
  }

  if (!isValidName(name) || !isValidPhone(phone) || !isValidZip(zip)) {
    return res.status(400).json({ ok: false, error: 'invalid_data' });
  }

  const clientIp = getClientIp(req);
  if (!clientIp || clientIp === '127.0.0.1' || clientIp.startsWith('192.168.') || clientIp.startsWith('10.')) {
    // Local/private IPs are allowed during development.
  } else {
    const country = await getCountryCode(clientIp);
    if (country && country.toUpperCase() !== 'US') {
      console.warn(`Blocked submission from non-US IP: ${clientIp} (${country})`);
      return res.status(403).json({ ok: false, error: 'not_usa' });
    }
  }

  const payload = {
    name: name.trim(),
    phone: phone.trim(),
    zip: zip.trim(),
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
      const text = await makeRes.text().catch(() => '');
      console.error('Make webhook error:', makeRes.status, text);
      return res.status(502).json({ ok: false, error: 'webhook_error' });
    }

    return res.json({ ok: true });
  } catch (err) {
    console.error('Error forwarding to Make:', err);
    return res.status(502).json({ ok: false, error: 'webhook_error' });
  }
});

// Health check.
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ ok: true });
});

// The build prerenders every language (dist/index.html EN, dist/es/index.html
// ES — see scripts/prerender.mjs), so Google and the AI crawlers that don't
// run JavaScript get full content straight from the static files.

// Normalize the non-canonical URL forms onto their prerendered paths.
// Region pages come from src/regions.ts (same slugs in EN /es/<slug>/ and
// Spanish <slug>/).
const REGION_SLUGS = REGIONS.map((r) => r.slug);
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.path === '/es') return res.redirect(301, '/es/');
  if (req.path === '/index.html') return res.redirect(301, '/');
  for (const slug of REGION_SLUGS) {
    if (req.path === `/${slug}`) return res.redirect(301, `/${slug}/`);
    if (req.path === `/es/${slug}`) return res.redirect(301, `/es/${slug}/`);
  }
  next();
});

// Serve the Vite production build.
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Generic error handler.
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ ok: false, error: 'internal_error' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});