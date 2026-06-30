"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

// Login con magic link (correo). Supabase envía un enlace de acceso.
// Stub funcional: requiere .env.local con las claves para operar.
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  async function handleLogin() {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (!error) setSent(true);
  }

  return (
    <div className="px-4 py-10 flex flex-col items-center text-center">
      <span className="inline-block w-12 h-12 rounded-full bg-cyan mb-4" />
      <h1 className="text-lg font-medium">Liga Pádel México</h1>
      <p className="text-xs text-ink-muted mt-1 mb-6">Entra con tu correo para ver tu liga.</p>

      {sent ? (
        <p className="text-sm" style={{ color: "#6FB0EE" }}>
          Te enviamos un enlace de acceso. Revisa tu correo.
        </p>
      ) : (
        <div className="w-full max-w-xs">
          <input
            type="email"
            placeholder="tu@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md py-2.5 px-3 text-sm mb-3"
            style={{ background: "#0E2236", color: "#EAF2FB", border: "0.5px solid #1f3f60" }}
          />
          <button onClick={handleLogin} className="w-full rounded-md py-2.5 text-sm font-medium" style={{ background: "#378ADD", color: "#fff" }}>
            Enviar enlace de acceso
          </button>
        </div>
      )}
    </div>
  );
}
