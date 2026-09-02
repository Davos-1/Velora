import { getCloudflareContext } from "@opennextjs/cloudflare";

/** Cloudflare env (bindings + secrets) for the current request. */
export async function getEnv(): Promise<CloudflareEnv> {
  const { env } = await getCloudflareContext({ async: true });
  return env as unknown as CloudflareEnv;
}

export async function getDb(): Promise<D1Database> {
  const env = await getEnv();
  if (!env.DB) throw new Error("D1 binding DB is not configured");
  return env.DB;
}

export function nowIso(): string {
  return new Date().toISOString();
}

export function randomToken(bytes = 16): string {
  const buf = new Uint8Array(bytes);
  crypto.getRandomValues(buf);
  return Array.from(buf, (b) => b.toString(16).padStart(2, "0")).join("");
}
