"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="max-w-sm mx-auto pt-10 text-center">
      <span className="inline-flex w-14 h-14 rounded-2xl bg-cyan items-center justify-center text-lg font-bold text-navy mb-5">LP</span>
      <h1 className="text-xl font-semibold">Liga Pádel México</h1>
      <p className="text-sm text-ink-muted mt-1 mb-7">Entra con tu correo para ver tu liga.</p>

      {sent ? (
        <p className="text-sm" style={{ color: "var(--cyan-light)" }}>Te enviamos un enlace de acceso. Revisa tu correo.</p>
      ) : (
        <div className="space-y-3 text-left">
          <input type="email" placeholder="tu@correo.com" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg py-3 px-4 text-sm outline-none"
            style={{ background: "var(--surface)", color: "var(--ink)", border: "0.5px solid var(--line)" }} />
          <button onClick={() => email && setSent(true)} className="w-full rounded-lg py-3 text-sm font-semibold" style={{ background: "var(--cyan)", color: "#fff" }}>
            Enviar enlace de acceso
          </button>
          <p className="text-[11px] text-ink-faint text-center pt-2">
            Demo: el envío real de correo se activa al conectar Supabase.
          </p>
        </div>
      )}
    </div>
  );
}
