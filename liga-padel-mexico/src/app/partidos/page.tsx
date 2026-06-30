"use client";

// Pantalla de partidos: confirmar el horario asignado por el motor
// y subir el resultado (doble confirmación). Datos de ejemplo;
// conéctalos a las tablas `matches` y `match_results`.
export default function PartidosPage() {
  return (
    <div className="px-4 py-4">
      <h1 className="text-base font-medium mb-4">Tus partidos</h1>

      <div className="rounded-lg p-3.5 mb-3" style={{ border: "0.5px solid #1f3f60", background: "#0E2236" }}>
        <span className="text-[11px] font-medium" style={{ color: "#378ADD" }}>
          Programado · Fecha 4
        </span>
        <p className="text-[15px] font-medium mt-1.5 mb-2">Tú &amp; Carlos vs Los Halcones</p>
        <p className="text-xs text-ink-muted">Mié 18 jun · 20:00</p>
        <p className="text-xs text-ink-muted">Cancha 2 · Club Tepic</p>
        <button className="w-full mt-3 rounded-md py-2.5 text-[13px] font-medium" style={{ background: "#378ADD", color: "#fff" }}>
          Confirmar horario
        </button>
      </div>

      <div className="rounded-lg p-3.5" style={{ border: "0.5px solid #1f3f60", background: "#0E2236" }}>
        <span className="text-[11px] font-medium text-ink-muted">Resultado pendiente · Fecha 3</span>
        <p className="text-sm font-medium mt-1.5 mb-2.5">vs Las Panteras</p>
        <div className="flex items-center gap-2">
          {["6", "4", "6", "3"].map((v, i) => (
            <span key={i} className="flex items-center gap-2">
              <input
                defaultValue={v}
                className="w-10 text-center rounded-md py-1.5"
                style={{ background: "#0B1B2E", color: "#EAF2FB", border: "0.5px solid #1f3f60" }}
              />
              {i === 1 ? null : i % 2 === 0 ? <span className="text-ink-muted">–</span> : null}
            </span>
          ))}
        </div>
        <button className="w-full mt-3 rounded-md py-2.5 text-[13px] font-medium" style={{ background: "transparent", color: "#EAF2FB", border: "0.5px solid #2b5a86" }}>
          Enviar resultado
        </button>
      </div>
    </div>
  );
}
