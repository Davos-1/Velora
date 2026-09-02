"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { PaymentMethod } from "@/types/checkout";

export function MockPayment({ orderId, token, method }: { orderId: string; token: string; method: PaymentMethod }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function simulate(outcome: "paid" | "failed") {
    setBusy(true);
    await fetch("/api/webhook/payrexx", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mock: true, orderId, token, outcome, method }),
    });
    router.push(`/checkout/danke?order=${orderId}&t=${token}&result=${outcome === "paid" ? "success" : "failed"}`);
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Button onClick={() => simulate("paid")} disabled={busy}>
        Zahlung erfolgreich
      </Button>
      <Button variant="secondary" onClick={() => simulate("failed")} disabled={busy}>
        Zahlung abgelehnt
      </Button>
    </div>
  );
}
