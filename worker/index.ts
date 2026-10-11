// Cloudflare Worker that guards /diegetic with HTTP Basic Auth.
//
// wrangler.jsonc routes only /diegetic and /diegetic/* through this Worker
// (assets.run_worker_first); every other path is served straight from the static
// build and never reaches this code. Credentials come from the DIEGETIC_USER and
// DIEGETIC_PASSWORD secrets. If either is missing, access is denied (fail closed).

import { brand } from '../src/config/diegetic';

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  DIEGETIC_USER?: string;
  DIEGETIC_PASSWORD?: string;
}

const REALM = brand.name;

const PRIVATE_HEADERS = {
  'Cache-Control': 'private, no-store',
  'X-Robots-Tag': 'noindex, nofollow',
};

const isProtected = (pathname: string) => pathname === '/diegetic' || pathname.startsWith('/diegetic/');

const isLocal = (hostname: string) => hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]';

function deny(status: 401 | 403, body: string): Response {
  const headers = new Headers({ ...PRIVATE_HEADERS, 'Content-Type': 'text/plain; charset=utf-8' });
  if (status === 401) headers.set('WWW-Authenticate', `Basic realm="${REALM}", charset="UTF-8"`);
  return new Response(body, { status, headers });
}

function parseBasicAuth(header: string | null): { user: string; pass: string } | null {
  const match = header?.match(/^Basic\s+([A-Za-z0-9+/]+=*)\s*$/i);
  if (!match) return null;
  try {
    const bytes = Uint8Array.from(atob(match[1]), (c) => c.charCodeAt(0));
    const decoded = new TextDecoder().decode(bytes);
    const sep = decoded.indexOf(':');
    if (sep === -1) return null;
    return { user: decoded.slice(0, sep), pass: decoded.slice(sep + 1) };
  } catch {
    return null;
  }
}

// Compare SHA-256 digests so the comparison is constant-time and length-independent.
async function safeEqual(a: string, b: string): Promise<boolean> {
  const enc = new TextEncoder();
  const [da, db] = await Promise.all([
    crypto.subtle.digest('SHA-256', enc.encode(a)),
    crypto.subtle.digest('SHA-256', enc.encode(b)),
  ]);
  const subtle = crypto.subtle as SubtleCrypto & { timingSafeEqual?: (x: ArrayBuffer, y: ArrayBuffer) => boolean };
  if (subtle.timingSafeEqual) return subtle.timingSafeEqual(da, db);
  const x = new Uint8Array(da);
  const y = new Uint8Array(db);
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
  return diff === 0;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (!isProtected(url.pathname)) return env.ASSETS.fetch(request);

    // Never accept credentials over plain HTTP.
    if (url.protocol === 'http:' && !isLocal(url.hostname)) {
      url.protocol = 'https:';
      return Response.redirect(url.toString(), 301);
    }

    if (!env.DIEGETIC_USER || !env.DIEGETIC_PASSWORD) return deny(403, 'Forbidden');

    const creds = parseBasicAuth(request.headers.get('Authorization'));
    if (!creds) return deny(401, 'Authentication required');

    const [userOk, passOk] = await Promise.all([
      safeEqual(creds.user, env.DIEGETIC_USER),
      safeEqual(creds.pass, env.DIEGETIC_PASSWORD),
    ]);
    if (!(userOk && passOk)) return deny(401, 'Authentication required');

    const asset = await env.ASSETS.fetch(request);
    const response = new Response(asset.body, asset);
    for (const [k, v] of Object.entries(PRIVATE_HEADERS)) response.headers.set(k, v);
    return response;
  },
};
