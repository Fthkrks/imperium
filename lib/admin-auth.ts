// Uses Web Crypto only so it also runs in middleware.
export const ADMIN_COOKIE = "admin_token";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

const encoder = new TextEncoder();

function getSigningSecret(): string | null {
  return process.env.ADMIN_SESSION_SECRET?.trim() || process.env.ADMIN_PASSWORD?.trim() || null;
}

async function hmac(secret: string, message: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(message)));
}

function toHex(bytes: Uint8Array): string {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a[i] ^ b[i];
  return diff === 0;
}

export function isAdminPasswordConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD?.trim());
}

export async function isValidAdminPassword(candidate: unknown): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD?.trim();
  if (!expected || typeof candidate !== "string") return false;
  // Compare fixed-length digests so timing does not reveal the password.
  const label = "admin-password-check";
  return constantTimeEqual(await hmac(label, candidate), await hmac(label, expected));
}

export async function createAdminSessionToken(): Promise<string> {
  const secret = getSigningSecret();
  if (!secret) throw new Error("ADMIN_PASSWORD is not configured.");
  const expiresAt = String(Date.now() + SESSION_MAX_AGE_SECONDS * 1000);
  return `${expiresAt}.${toHex(await hmac(secret, expiresAt))}`;
}

export async function isValidAdminSessionToken(token: string | undefined | null): Promise<boolean> {
  const secret = getSigningSecret();
  if (!secret || !token) return false;

  const [expiresAt, signature, ...rest] = token.split(".");
  if (!expiresAt || !signature || rest.length > 0) return false;
  if (!/^\d+$/.test(expiresAt) || Number(expiresAt) <= Date.now()) return false;

  const expected = toHex(await hmac(secret, expiresAt));
  return constantTimeEqual(encoder.encode(signature), encoder.encode(expected));
}
