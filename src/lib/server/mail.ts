import { customerConfirmation, mailFrom, operatorEmail, operatorNotification } from "./mail-templates";
import type { Order } from "./orders";

/**
 * Sends the order confirmation (customer) and the notification (operator)
 * through the Resend REST API. Called once per order from the webhook after
 * the pending -> paid transition; failures are logged, never block the order.
 */
type ResendMail = { from: string; to: string[]; reply_to?: string; subject: string; html: string; text: string };

async function send(apiKey: string, mail: ResendMail): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(mail),
  });
  if (!res.ok) {
    throw new Error(`Resend ${res.status}: ${await res.text()}`);
  }
}

export async function sendOrderMails(env: CloudflareEnv, order: Order): Promise<void> {
  if (!env.RESEND_API_KEY) {
    console.info(`[mail] RESEND_API_KEY missing – skipping mails for ${order.id}`);
    return;
  }
  const customer = customerConfirmation(order);
  const operator = operatorNotification(order);
  const results = await Promise.allSettled([
    send(env.RESEND_API_KEY, { from: mailFrom, to: [order.email], reply_to: operatorEmail, subject: customer.subject, html: customer.html, text: customer.text }),
    send(env.RESEND_API_KEY, { from: mailFrom, to: [operatorEmail], reply_to: order.email, subject: operator.subject, html: operator.html, text: operator.text }),
  ]);
  for (const r of results) {
    if (r.status === "rejected") console.error(`[mail] ${order.id}:`, r.reason);
  }
}
