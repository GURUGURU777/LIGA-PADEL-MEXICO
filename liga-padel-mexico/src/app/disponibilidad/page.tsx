"use client";

import { useState } from "react";

// La pantalla más importante: el jugador carga sus horarios de la semana.
// Datos de ejemplo. Para conectarlos a Supabase, lee/escribe en la tabla
// `pair_availability` con el cliente de @/lib/supabase/client.
const dias: { dia: string; slots: string[] }[] = [
  { dia: "Lun", slots: ["19–21", "21–23"] },
  { dia: "Mar", slots: ["07–09", "19–21"] },
  { dia: "Mié", slots: ["20–22"] },
  { dia: "Jue", slots: ["19–21", "21–23"] },
  { dia: "Vie", slots: ["18–20", "20–22"] },
  { dia: "Sáb", slots: ["09–11", "11–13"] },
];

export default function DisponibilidadPage() {
  const [sel, setSel] = useState<Set<string>>(
    new Set(["Lun-19–21", "Mié-20–22", "Vie-18–20"])
  );

  const toggle = (key: string) =>
    setSel((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });

  return (
    <div className="px-4 py-4">
      <h1 className="text-base font-medium">Tu disponibilidad</h1>
      <p className="text-xs text-ink-muted mt-0.5 mb-4 leading-relaxed">
        Toca tus horarios de esta semana. Menos de 30 segundos.
      </p>

      <div className="space-y-2.5">
        {dias.map(({ dia, slots }) => (
          <div key={dia} className="flex items-center gap-2">
            <span className="w-8 text-xs text-ink-muted">{dia}</span>
            <div className="flex gap-1.5 flex-wrap">
              {slots.map((s) => {
                const key = `${dia}-${s}`;
                const on = sel.has(key);
                return (
                  <button
                    key={key}
                    onClick={() => toggle(key)}
                    className="text-xs px-2.5 py-1.5 rounded-md transition-colors"
                    style={
                      on
                        ? { background: "#378ADD", color: "#fff" }
                        : { border: "0.5px solid #1f3f60", color: "#9DBEE2" }
                    }
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-5 rounded-md py-3 text-sm font-medium" style={{ background: "#378ADD", color: "#fff" }}>
        Guardar disponibilidad
      </button>
    </div>
  );
}
