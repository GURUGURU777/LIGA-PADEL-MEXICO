import { SEASON, rounds, getPair } from "@/lib/demo";
import { LigaTabs } from "@/components/LigaTabs";

export default function JornadasPage() {
  const data = rounds();
  return (
    <div>
      <LigaTabs />
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Jornadas</h1>
        <p className="text-sm text-ink-muted mt-1">Calendario y cruces fijos · {SEASON.category}</p>
      </div>

      <div className="space-y-6">
        {data.map(({ round, matches }) => {
          const played = matches.every((m) => m.played);
          return (
            <div key={round}>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-sm font-semibold">Jornada {round}</h2>
                <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded"
                  style={played ? { background: "rgba(52,199,123,0.12)", color: "var(--win)" } : { background: "var(--surface-2)", color: "var(--ink-faint)" }}>
                  {played ? "Jugada" : "Programada"}
                </span>
              </div>
              <div className="rounded-xl border border-line overflow-hidden" style={{ background: "var(--surface)" }}>
                {matches.map((m, i) => {
                  const home = getPair(m.homeId)!;
                  const away = getPair(m.awayId)!;
                  const hg = m.sets.reduce((s, x) => s + x.home, 0);
                  const ag = m.sets.reduce((s, x) => s + x.away, 0);
                  const homeWon = m.winnerId === m.homeId;
                  return (
                    <div key={m.id} className={`flex items-center px-4 py-3 ${i ? "border-t border-line-soft" : ""}`}>
                      <span className={`flex-1 text-sm text-right pr-3 ${m.played && homeWon ? "font-semibold" : ""}`}
                        style={{ color: m.played && !homeWon ? "var(--ink-muted)" : "var(--ink)" }}>
                        {home.name}
                      </span>
                      <span className="text-sm tabular-nums px-3 py-1 rounded-md min-w-[58px] text-center"
                        style={{ background: m.played ? "var(--navy)" : "transparent", color: m.played ? "var(--ink)" : "var(--ink-faint)" }}>
                        {m.played ? `${hg}-${ag}` : "vs"}
                      </span>
                      <span className={`flex-1 text-sm pl-3 ${m.played && !homeWon ? "font-semibold" : ""}`}
                        style={{ color: m.played && homeWon ? "var(--ink-muted)" : "var(--ink)" }}>
                        {away.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
