"use client";

import { useState } from "react";

const dias: { dia: string; slots: string[] }[] = [
  { dia: "Lunes", slots: ["19–21", "21–23"] },
  { dia: "Martes", slots: ["07–09", "19–21"] },
  { dia: "Miércoles", slots: ["20–22"] },
  { dia: "Jueves", slots: ["19–21", "21–23"] },
  { dia: "Viernes", slots: ["18–20", "20–22"] },
  { dia: "Sábado", slots: ["09–11", "11–13"] },
];

export default function DisponibilidadPage() {
  const [sel, setSel] = useState<Set<string>>(new Set(["Lunes-19–21", "Miércoles-20–22", "Viernes-18–20"]));
  const toggle = (k: string) => setSel((p) => { const n = new Set(p); n.has(k) ? n.delete(k) : n.add(k); return n; });

  return (
    <div className="max-w-xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Tu disponibilidad</h1>
        <p className="text-sm text-ink-muted mt-1">Marca tus horarios de esta semana. Te toma menos de 30 segundos.</p>
      </div>

      <div className="rounded-xl border border-line p-2" style={{ background: "var(--surface)" }}>
        {dias.map(({ dia, slots }, i) => (
          <div key={dia} className={`flex items-center gap-3 px-3 py-3 ${i ? "border-t border-line-soft" : ""}`}>
            <span className="w-24 text-sm text-ink-muted">{dia}</span>
            <div className="flex gap-2 flex-wrap">
              {slots.map((s) => {
                const k = `${dia}-${s}`;
                const on = sel.has(k);
                return (
                  <button key={k} onClick={() => toggle(k)}
                    className="text-sm px-3 py-1.5 rounded-lg transition-colors"
                    style={on ? { background: "var(--cyan)", color: "#fff" } : { border: "0.5px solid var(--line)", color: "var(--ink-muted)" }}>
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 rounded-lg py-3 text-sm font-semibold" style={{ background: "var(--cyan)", color: "#fff" }}>
        Guardar disponibilidad
      </button>
      <p className="text-[12px] text-ink-faint mt-3">
        El sistema usa tu disponibilidad para armar los partidos de la siguiente jornada automáticamente.
      </p>
    </div>
  );
}
