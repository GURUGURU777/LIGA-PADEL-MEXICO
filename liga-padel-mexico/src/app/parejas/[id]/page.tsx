import Link from "next/link";
import { notFound } from "next/navigation";
import { PAIRS, getPair, standingFor, matchesForPair } from "@/lib/demo";

export function generateStaticParams() {
  return PAIRS.map((p) => ({ id: p.id }));
}

export default function ParejaDetalle({ params }: { params: { id: string } }) {
  const pair = getPair(params.id);
  if (!pair) notFound();
  const st = standingFor(params.id)!;
  const games = matchesForPair(params.id);
  const winPct = st.pj ? Math.round((st.g / st.pj) * 100) : 0;

  const stats = [
    { label: "Posición", value: `#${st.position}` },
    { label: "Puntos", value: st.pts },
    { label: "Ganados / Perdidos", value: `${st.g} - ${st.p}` },
    { label: "% Victorias", value: `${winPct}%` },
    { label: "Games a favor", value: st.gf },
    { label: "Games en contra", value: st.gc },
    { label: "Diferencia", value: st.dif > 0 ? `+${st.dif}` : st.dif },
    { label: "Partidos jugados", value: st.pj },
  ];

  return (
    <div>
      <Link href="/parejas" className="text-sm text-ink-muted hover:text-cyan-light">← Parejas</Link>

      <div className="mt-3 mb-6">
        <h1 className="text-2xl font-semibold">{pair.name}</h1>
        <p className="text-sm text-ink-muted mt-1">{pair.player1} · {pair.player2}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-line p-4" style={{ background: "var(--surface)" }}>
            <div className="text-[11px] text-ink-faint">{s.label}</div>
            <div className="text-xl font-semibold mt-1">{s.value}</div>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-semibold mb-3">Partidos</h2>
      <div className="rounded-xl border border-line overflow-hidden" style={{ background: "var(--surface)" }}>
        {games.map((g, i) => (
          <div key={g.match.id} className={`flex items-center gap-3 px-4 py-3.5 ${i ? "border-t border-line-soft" : ""}`}>
            <span className="text-[11px] text-ink-faint w-12">J{g.match.round}</span>
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">vs {g.opponent.name}</div>
              <div className="text-[12px] text-ink-faint">{g.match.played ? `${g.gamesFor}-${g.gamesAgainst} games` : "Por jugar"}</div>
            </div>
            <span className="text-sm tabular-nums text-ink-muted hidden sm:block">{g.scoreText}</span>
            {g.result && (
              <span className="text-[11px] font-bold w-6 h-6 rounded-md flex items-center justify-center"
                style={g.result === "G" ? { background: "rgba(52,199,123,0.15)", color: "var(--win)" } : { background: "rgba(226,87,76,0.15)", color: "var(--loss)" }}>
                {g.result}
              </span>
            )}
            {!g.result && <span className="text-[11px] text-ink-faint w-6 text-center">·</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
