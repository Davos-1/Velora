/// <reference types="@cloudflare/workers-types" />

/** Bindings and secrets available to the worker (see wrangler.jsonc / .dev.vars). */
interface CloudflareEnv {
  DB: D1Database;
  ASSETS: Fetcher;
  SITE_URL: string;
  PAYREXX_INSTANCE?: string;
  PAYREXX_API_KEY?: string;
  RESEND_API_KEY?: string;
}
