import Link from "next/link";
import { SEASON, standings } from "@/lib/demo";
import { LigaTabs } from "@/components/LigaTabs";
import { Crest } from "@/components/Crest";

export default function TablaPage() {
  const rows = standings();

  return (
    <div>
      <LigaTabs />
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Tabla de posiciones</h1>
        <p className="text-sm text-ink-muted mt-1">
          {SEASON.category} · {SEASON.playedRounds} de {SEASON.totalRounds} jornadas jugadas
        </p>
      </div>

      <div className="rounded-xl border border-line overflow-hidden" style={{ background: "var(--surface)" }}>
        <div className="scroll-x">
          <table className="w-full text-sm" style={{ minWidth: 620 }}>
            <thead>
              <tr className="text-[11px] uppercase tracking-wide text-ink-faint" style={{ background: "var(--navy)" }}>
                <th className="text-left font-medium py-3 pl-4 w-10">#</th>
                <th className="text-left font-medium py-3">Pareja</th>
                <th className="text-center font-medium py-3 w-12">PJ</th>
                <th className="text-center font-medium py-3 w-12">G</th>
                <th className="text-center font-medium py-3 w-12">P</th>
                <th className="text-center font-medium py-3 w-14">GF</th>
                <th className="text-center font-medium py-3 w-14">GC</th>
                <th className="text-center font-medium py-3 w-14">DIF</th>
                <th className="text-center font-medium py-3 w-14 pr-4">Pts</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const top = r.position <= 4;
                return (
                  <tr key={r.pair.id} className="border-t border-line-soft hover:bg-navy-elevated/40 transition-colors">
                    <td className="py-3.5 pl-4">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-md text-xs font-semibold"
                        style={top ? { background: "rgba(59,142,224,0.15)", color: "var(--cyan-light)" } : { color: "var(--ink-faint)" }}>
                        {r.position}
                      </span>
                    </td>
                    <td className="py-3.5">
                      <div className="flex items-center gap-3">
                        <Crest code={r.pair.code} color={r.pair.color} size={32} />
                        <div>
                          <Link href={`/parejas/${r.pair.id}`} className="font-medium hover:text-cyan-light transition-colors">
                            {r.pair.name}
                          </Link>
                          <div className="text-[11px] text-ink-faint">{r.pair.player1} · {r.pair.player2}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center text-ink-muted">{r.pj}</td>
                    <td className="text-center" style={{ color: "var(--win)" }}>{r.g}</td>
                    <td className="text-center" style={{ color: "var(--loss)" }}>{r.p}</td>
                    <td className="text-center text-ink-muted">{r.gf}</td>
                    <td className="text-center text-ink-muted">{r.gc}</td>
                    <td className="text-center text-ink-muted">{r.dif > 0 ? `+${r.dif}` : r.dif}</td>
                    <td className="text-center pr-4 font-semibold text-base">{r.pts}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-[11px] text-ink-faint mt-3 leading-relaxed">
        PJ jugados · G ganados · P perdidos · GF games a favor · GC games en contra · DIF diferencia · Pts puntos (3 por victoria).
        Toca una pareja para ver sus partidos y estadísticas.
      </p>
    </div>
  );
}
