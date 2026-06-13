import Link from "next/link";
import { standings, SEASON } from "@/lib/demo";

export default function ParejasPage() {
  const rows = standings();
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Parejas</h1>
        <p className="text-sm text-ink-muted mt-1">{rows.length} parejas inscritas · {SEASON.category}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((r) => (
          <Link key={r.pair.id} href={`/parejas/${r.pair.id}`}
            className="rounded-xl border border-line p-4 hover:border-cyan/60 transition-colors block"
            style={{ background: "var(--surface)" }}>
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold">{r.pair.name}</div>
                <div className="text-[12px] text-ink-faint mt-0.5">{r.pair.player1} · {r.pair.player2}</div>
              </div>
              <span className="text-[11px] font-semibold px-2 py-1 rounded-md" style={{ background: "rgba(59,142,224,0.15)", color: "var(--cyan-light)" }}>
                #{r.position}
              </span>
            </div>
            <div className="flex gap-4 mt-4 text-[13px]">
              <span className="text-ink-muted">{r.pj} PJ</span>
              <span style={{ color: "var(--win)" }}>{r.g} G</span>
              <span style={{ color: "var(--loss)" }}>{r.p} P</span>
              <span className="ml-auto font-semibold text-ink">{r.pts} pts</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
