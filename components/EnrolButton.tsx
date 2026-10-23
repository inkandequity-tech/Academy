"use client";
import { useState } from "react";

type RzpOptions = Record<string, unknown>;
declare global { interface Window { Razorpay?: new (o: RzpOptions) => { open: () => void; on: (e: string, cb: (r: unknown) => void) => void } } }

function loadCheckout(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

export function EnrolButton({ label }: { label: string }) {
  const [msg, setMsg] = useState<{ kind: "bad" | "good"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function pay() {
    setBusy(true); setMsg(null);
    try {
      const res = await fetch("/api/razorpay/order", { method: "POST" });
      const data = await res.json();
      if (res.status === 401) { window.location.href = "/login?next=/fees"; return; }
      if (!res.ok) { setMsg({ kind: "bad", text: data.error }); return; }
      if (!(await loadCheckout()) || !window.Razorpay) { setMsg({ kind: "bad", text: "The payment window could not load. Check your connection and try again." }); return; }
      const rzp = new window.Razorpay({
        key: data.keyId, order_id: data.orderId, amount: data.amount, currency: "INR",
        name: data.name, description: data.description,
        prefill: { email: data.email, name: data.fullName, contact: data.phone },
        theme: { color: "#0a0f2e" },
        handler: async (r: Record<string, string>) => {
          setMsg({ kind: "good", text: "Payment received. Confirming your enrolment." });
          const v = await fetch("/api/razorpay/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(r) });
          if (v.ok) window.location.href = "/dashboard?enrolled=1";
          else setMsg({ kind: "bad", text: (await v.json()).error });
        },
        modal: { ondismiss: () => setBusy(false) },
      });
      rzp.on("payment.failed", () => setMsg({ kind: "bad", text: "The payment did not go through. No enrolment was made; you can try again." }));
      rzp.open();
    } catch {
      setMsg({ kind: "bad", text: "The payment could not be started. Try again in a minute." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <button type="button" className="btn warm" onClick={pay} disabled={busy}>{busy ? "Opening payment" : label}</button>
      {msg && <p className={`form-msg ${msg.kind}`} role={msg.kind === "bad" ? "alert" : "status"}>{msg.text}</p>}
    </div>
  );
}
