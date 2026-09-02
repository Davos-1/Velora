"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { ButtonLink } from "@/components/ui/Button";
import { formatChf } from "@/lib/format";
import { paymentMethodLabel, type OrderStatus as Status, type PaymentMethod } from "@/types/checkout";

type Props = { orderId: string; token: string; initialStatus: Status; total: number; paymentMethod: PaymentMethod | null };

const POLL_MS = 2500;
const POLL_MAX = 24; // ~1 minute

/** Shows the order state and polls while the webhook is still outstanding. */
export function OrderStatus({ orderId, token, initialStatus, total, paymentMethod }: Props) {
  const [status, setStatus] = useState<Status>(initialStatus);
  const [method, setMethod] = useState(paymentMethod);
  const [timedOut, setTimedOut] = useState(false);
  const cart = useCart();

  // A paid order means the cart has been converted – clear it once.
  useEffect(() => {
    if (status === "paid") cart.clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    if (status !== "pending") return;
    let attempts = 0;
    const id = window.setInterval(async () => {
      attempts += 1;
      try {
        const res = await fetch(`/api/orders/${orderId}?t=${token}`, { cache: "no-store" });
        if (res.ok) {
          const data = (await res.json()) as { status: Status; paymentMethod: PaymentMethod | null };
          setMethod(data.paymentMethod);
          if (data.status !== "pending") {
            setStatus(data.status);
            window.clearInterval(id);
            return;
          }
        }
      } catch {
        // transient – keep polling
      }
      if (attempts >= POLL_MAX) {
        setTimedOut(true);
        window.clearInterval(id);
      }
    }, POLL_MS);
    return () => window.clearInterval(id);
  }, [status, orderId, token]);

  if (status === "paid" || status === "shipped") {
    return (
      <div className="card p-6">
        <p className="text-sm font-medium text-success">Zahlung bestätigt</p>
        <h2 className="mt-2">Danke für deine Bestellung!</h2>
        <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-sm">
          <dt className="text-neutral">Bestellnummer</dt>
          <dd className="font-medium">{orderId}</dd>
          <dt className="text-neutral">Total</dt>
          <dd>{formatChf(total)}</dd>
          {method && (
            <>
              <dt className="text-neutral">Zahlung</dt>
              <dd>{paymentMethodLabel[method]}</dd>
            </>
          )}
        </dl>
        <p className="mt-4 text-sm text-neutral">Du erhältst eine Bestätigung per E-Mail. Wir melden uns, sobald das Paket unterwegs ist.</p>
        <ButtonLink href="/shop" variant="secondary" className="mt-6">
          Weiter einkaufen
        </ButtonLink>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="card p-6">
        <p className="text-sm font-medium text-error">Zahlung nicht erfolgreich</p>
        <h2 className="mt-2">Die Zahlung wurde abgebrochen oder abgelehnt.</h2>
        <p className="mt-3 text-sm text-neutral">
          Bestellung {orderId} wurde nicht belastet. Dein Warenkorb ist noch da, du kannst es erneut versuchen.
        </p>
        <ButtonLink href="/checkout" className="mt-6">
          Erneut zur Kasse
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="card p-6" aria-live="polite">
      <p className="text-sm font-medium text-brand-dark">{timedOut ? "Noch keine Bestätigung" : "Zahlung wird bestätigt …"}</p>
      <h2 className="mt-2">Bestellung {orderId}</h2>
      <p className="mt-3 text-sm text-neutral">
        {timedOut
          ? "Die Bestätigung des Zahlungsanbieters steht noch aus. Sobald sie eintrifft, erhältst du eine E-Mail. Bei Fragen: Bestellnummer angeben."
          : "Einen Moment, wir warten auf die Rückmeldung des Zahlungsanbieters."}
      </p>
    </div>
  );
}
