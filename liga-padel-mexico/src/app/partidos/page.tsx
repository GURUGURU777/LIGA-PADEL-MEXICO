"use client";

import { useState } from "react";
import { myPair, myNextMatch, matchesForPair, getPair, ME_PAIR_ID } from "@/lib/demo";

export default function PartidosPage() {
  const pair = myPair();
  const next = myNextMatch();
  const nextOpp = next ? getPair(next.homeId === ME_PAIR_ID ? next.awayId : next.homeId) : null;
  const played = matchesForPair(ME_PAIR_ID).filter((g) => g.result);

  const [confirmed, setConfirmed] = useState(false);
  const [sets, setSets] = useState(["", "", "", ""]);
  const [reported, setReported] = useState(false);

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Mis partidos</h1>
        <p className="text-sm text-ink-muted mt-1">{pair.name}</p>
      </div>

      {/* Próximo partido */}
      {next && nextOpp && (
        <div className="rounded-2xl border border-line p-5 mb-4" style={{ background: "var(--surface)" }}>
          <div className="text-[11px] uppercase tracking-wide font-medium" style={{ color: "var(--cyan-light)" }}>Programado · Jornada {next.round}</div>
          <div className="text-lg font-semibold mt-2">vs {nextOpp.name}</div>
          <div className="text-sm text-ink-muted mt-1">Mié 18 jun, 20:00 · Cancha 2 · Club Tepic</div>
          <button onClick={() => setConfirmed(true)} disabled={confirmed}
            className="w-full mt-4 rounded-lg py-2.5 text-sm font-semibold transition-colors"
            style={confirmed ? { background: "rgba(52,199,123,0.15)", color: "var(--win)" } : { background: "var(--cyan)", color: "#fff" }}>
            {confirmed ? "✓ Horario confirmado" : "Confirmar horario"}
          </button>
        </div>
      )}

      {/* Cargar resultado (doble confirmación) */}
      <div className="rounded-2xl border border-line p-5 mb-8" style={{ background: "var(--surface)" }}>
        <div className="text-[11px] uppercase tracking-wide text-ink-faint font-medium">Cargar resultado · Jornada 5</div>
        <div className="text-base font-medium mt-2 mb-3">vs Los Cracks</div>
        {reported ? (
          <p className="text-sm" style={{ color: "var(--win)" }}>✓ Resultado enviado. Falta que la pareja rival lo confirme.</p>
        ) : (
          <>
            <div className="flex items-center gap-2">
              {sets.map((v, i) => (
                <span key={i} className="flex items-center gap-2">
                  <input value={v} onChange={(e) => setSets((s) => s.map((x, j) => (j === i ? e.target.value.replace(/\D/g, "").slice(0, 1) : x)))}
                    inputMode="numeric" placeholder="-" className="w-11 text-center rounded-lg py-2 outline-none"
                    style={{ background: "var(--navy)", color: "var(--ink)", border: "0.5px solid var(--line)" }} />
                  {i === 1 ? <span className="w-2" /> : i % 2 === 0 ? <span className="text-ink-faint">-</span> : null}
                </span>
              ))}
            </div>
            <button onClick={() => setReported(true)} className="w-full mt-4 rounded-lg py-2.5 text-sm font-semibold border border-line text-ink hover:bg-navy-elevated transition-colors">
              Enviar resultado
            </button>
            <p className="text-[11px] text-ink-faint mt-2">El resultado se valida con doble confirmación: ambas parejas deben aprobarlo.</p>
          </>
        )}
      </div>

      {/* Historial */}
      <h2 className="text-lg font-semibold mb-3">Historial</h2>
      <div className="rounded-2xl border border-line overflow-hidden" style={{ background: "var(--surface)" }}>
        {played.map((g, i) => (
          <div key={g.match.id} className={`flex items-center gap-3 px-4 py-3.5 ${i ? "border-t border-line-soft" : ""}`}>
            <span className="text-[11px] text-ink-faint w-10">J{g.match.round}</span>
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">vs {g.opponent.name}</div>
              <div className="text-[12px] text-ink-faint">{g.gamesFor}-{g.gamesAgainst} games</div>
            </div>
            <span className="text-sm tabular-nums text-ink-muted hidden sm:block">{g.scoreText}</span>
            <span className="text-[11px] font-bold w-6 h-6 rounded-md flex items-center justify-center"
              style={g.result === "G" ? { background: "rgba(52,199,123,0.15)", color: "var(--win)" } : { background: "rgba(226,87,76,0.15)", color: "var(--loss)" }}>
              {g.result}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
