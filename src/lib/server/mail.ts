import type { Order } from "./orders";

/**
 * Order confirmation (customer) and notification (operator) via Resend.
 * TODO(stage 5): implement HTML templates and Resend API call.
 */
export async function sendOrderMails(env: CloudflareEnv, order: Order): Promise<void> {
  if (!env.RESEND_API_KEY) {
    console.info(`[mail] RESEND_API_KEY missing – skipping mails for ${order.id}`);
    return;
  }
  console.info(`[mail] TODO send confirmation for ${order.id} to ${order.email}`);
}
