import type { StandingRow } from "@/lib/types";
import { createClient } from "@/lib/supabase/server";

// Tabla de posiciones en vivo. Lee de la vista `standings` del esquema.
// Si no hay conexión a Supabase todavía, cae a datos de ejemplo para que
// la app corra de inmediato.
const demo: StandingRow[] = [
  { position: 1, pairId: "1", teamName: "Los Halcones", played: 5, points: 15 },
  { position: 2, pairId: "2", teamName: "Tú & Carlos", played: 5, points: 12, isMe: true },
  { position: 3, pairId: "3", teamName: "Las Panteras", played: 5, points: 10 },
  { position: 4, pairId: "4", teamName: "Dúo Riviera", played: 5, points: 7 },
  { position: 5, pairId: "5", teamName: "Smash Bros", played: 5, points: 4 },
];

async function getStandings(): Promise<StandingRow[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("standings")
      .select("pair_id, team_name, played, points")
      .order("points", { ascending: false });
    if (error || !data || data.length === 0) return demo;
    return data.map((r, i) => ({
      position: i + 1,
      pairId: r.pair_id as string,
      teamName: (r.team_name as string) ?? "Sin nombre",
      played: r.played as number,
      points: r.points as number,
    }));
  } catch {
    return demo; // todavía sin .env.local configurado
  }
}

export default async function TablaPage() {
  const rows = await getStandings();
  return (
    <div className="px-4 py-4">
      <h1 className="text-base font-medium">Tabla de posiciones</h1>
      <p className="text-xs text-ink-muted mt-0.5 mb-4">2ª categoría · Zona A · en vivo</p>

      <table className="w-full text-[13px] border-collapse">
        <thead>
          <tr className="text-[11px] text-ink-muted text-left">
            <th className="font-normal py-1.5 px-1">#</th>
            <th className="font-normal py-1.5 px-1">Pareja</th>
            <th className="font-normal py-1.5 px-1 text-center">PJ</th>
            <th className="font-normal py-1.5 px-1 text-right">Pts</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr
              key={r.pairId}
              style={{
                borderTop: "0.5px solid #16324f",
                background: r.isMe ? "#13314e" : "transparent",
                color: r.isMe ? "#6FB0EE" : "#EAF2FB",
              }}
            >
              <td className="py-2.5 px-1" style={{ fontWeight: r.isMe ? 500 : 400 }}>{r.position}</td>
              <td className="py-2.5 px-1" style={{ fontWeight: r.isMe ? 500 : 400 }}>{r.teamName}</td>
              <td className="py-2.5 px-1 text-center" style={{ color: r.isMe ? "#6FB0EE" : "#7CA6D6" }}>{r.played}</td>
              <td className="py-2.5 px-1 text-right font-medium">{r.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
