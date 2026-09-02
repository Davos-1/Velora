import type { PaymentMethod } from "@/types/checkout";

/**
 * Minimal Payrexx Gateway API client (REST v1.0).
 * Docs: https://developers.payrexx.com/reference
 * Requests are signed with base64(HMAC-SHA256(urlencoded body, apiKey)).
 */
export type PayrexxConfig = { instance: string; apiKey: string };

export function getPayrexxConfig(env: CloudflareEnv): PayrexxConfig | null {
  if (!env.PAYREXX_INSTANCE || !env.PAYREXX_API_KEY) return null;
  return { instance: env.PAYREXX_INSTANCE, apiKey: env.PAYREXX_API_KEY };
}

const BASE_URL = "https://api.payrexx.com/v1.0";

/** Payrexx payment-method identifiers used in `pm[]`. */
const pmForMethod: Record<PaymentMethod, string[]> = {
  twint: ["twint"],
  card: ["visa", "mastercard", "american_express", "apple_pay", "google_pay"],
  invoice: ["invoice"],
};

async function sign(query: string, apiKey: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(apiKey), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(query));
  return btoa(String.fromCharCode(...new Uint8Array(sig)));
}

async function request<T>(cfg: PayrexxConfig, method: "GET" | "POST", path: string, params: URLSearchParams): Promise<T> {
  const query = params.toString();
  const signature = await sign(query, cfg.apiKey);
  const url = `${BASE_URL}/${path}?instance=${encodeURIComponent(cfg.instance)}`;
  const init: RequestInit =
    method === "GET"
      ? { method }
      : { method, headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: `${query}&ApiSignature=${encodeURIComponent(signature)}` };
  const res = await fetch(method === "GET" ? `${url}&${query}&ApiSignature=${encodeURIComponent(signature)}` : url, init);
  const json = (await res.json()) as { status: "success" | "error"; message?: string; data: T[] };
  if (!res.ok || json.status !== "success" || !json.data?.[0]) {
    throw new Error(`Payrexx ${method} ${path} failed: ${json.message ?? res.status}`);
  }
  return json.data[0];
}

export type PayrexxGateway = { id: number; link: string; status: string; referenceId: string };

export async function createGateway(
  cfg: PayrexxConfig,
  input: {
    amountChf: number;
    referenceId: string;
    purpose: string;
    paymentMethod: PaymentMethod;
    successUrl: string;
    failedUrl: string;
    cancelUrl: string;
    customer: { email: string; firstName: string; lastName: string; street: string; zip: string; city: string; phone?: string };
  },
): Promise<PayrexxGateway> {
  const p = new URLSearchParams();
  p.set("amount", String(Math.round(input.amountChf * 100)));
  p.set("currency", "CHF");
  p.set("referenceId", input.referenceId);
  p.set("purpose", input.purpose);
  p.set("successRedirectUrl", input.successUrl);
  p.set("failedRedirectUrl", input.failedUrl);
  p.set("cancelRedirectUrl", input.cancelUrl);
  p.set("skipResultPage", "1");
  for (const pm of pmForMethod[input.paymentMethod]) p.append("pm[]", pm);
  const c = input.customer;
  p.set("fields[email][value]", c.email);
  p.set("fields[forename][value]", c.firstName);
  p.set("fields[surname][value]", c.lastName);
  p.set("fields[street][value]", c.street);
  p.set("fields[postcode][value]", c.zip);
  p.set("fields[place][value]", c.city);
  p.set("fields[country][value]", "CH");
  if (c.phone) p.set("fields[phone][value]", c.phone);
  return request<PayrexxGateway>(cfg, "POST", "Gateway/", p);
}

export type PayrexxTransaction = {
  id: number;
  status: string; // waiting | confirmed | authorized | reserved | cancelled | declined | refunded | ...
  referenceId?: string;
  invoice?: { referenceId?: string; paymentRequestId?: number };
  payment?: { brand?: string };
};

/** Server-side verification of a webhook: fetch the transaction from the API. */
export async function getTransaction(cfg: PayrexxConfig, id: number): Promise<PayrexxTransaction> {
  return request<PayrexxTransaction>(cfg, "GET", `Transaction/${id}/`, new URLSearchParams());
}

export function mapBrandToMethod(brand: string | undefined): PaymentMethod | null {
  if (!brand) return null;
  const b = brand.toLowerCase();
  if (b.includes("twint")) return "twint";
  if (b.includes("invoice") || b.includes("rechnung")) return "invoice";
  return "card";
}
