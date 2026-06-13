import Link from "next/link";
import { SEASON, myPair, myNextMatch, standingFor, myRecentForm, getPair, ME_PAIR_ID } from "@/lib/demo";

export default function Home() {
  const pair = myPair();
  const me = standingFor(ME_PAIR_ID)!;
  const next = myNextMatch();
  const nextOpp = next ? getPair(next.homeId === ME_PAIR_ID ? next.awayId : next.homeId)! : null;
  const form = myRecentForm();
  const firstName = pair.player1.split(" ")[0];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Hola, {firstName}</h1>
        <p className="text-sm text-ink-muted mt-1">{pair.name} · {SEASON.category}</p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="md:col-span-2 rounded-2xl border border-line p-5" style={{ background: "var(--surface)" }}>
          <div className="text-[11px] uppercase tracking-wide font-medium" style={{ color: "var(--cyan-light)" }}>Tu próximo partido</div>
          {next && nextOpp ? (
            <>
              <div className="text-xl font-semibold mt-2.5">
                {pair.name} <span className="text-ink-faint font-normal text-base">vs</span> {nextOpp.name}
              </div>
              <div className="text-sm text-ink-muted mt-1.5">Jornada {next.round} · Mié 18 jun, 20:00 · Cancha 2</div>
              <div className="flex flex-wrap gap-2 mt-4">
                <Link href="/partidos" className="px-4 py-2 rounded-lg text-sm font-semibold" style={{ background: "var(--cyan)", color: "#fff" }}>Confirmar horario</Link>
                <Link href="/disponibilidad" className="px-4 py-2 rounded-lg text-sm font-medium border border-line text-ink-muted">Editar disponibilidad</Link>
              </div>
            </>
          ) : (
            <p className="text-sm text-ink-muted mt-2.5">No tienes partidos próximos. Carga tu disponibilidad para la siguiente jornada.</p>
          )}
        </div>

        <Link href="/tabla" className="rounded-2xl border border-line p-5 hover:border-cyan/60 transition-colors" style={{ background: "var(--surface)" }}>
          <div className="text-[11px] uppercase tracking-wide text-ink-faint font-medium">Tu posición</div>
          <div className="flex items-baseline gap-2 mt-2.5">
            <span className="text-3xl font-bold" style={{ color: "var(--cyan-light)" }}>#{me.position}</span>
            <span className="text-sm text-ink-muted">de 8</span>
          </div>
          <div className="text-sm text-ink-muted mt-2">{me.pts} pts · {me.g}G {me.p}P · {me.dif > 0 ? `+${me.dif}` : me.dif}</div>
        </Link>
      </div>

      <Link href="/disponibilidad" className="mt-3 rounded-2xl border border-line p-4 flex items-center justify-between hover:border-cyan/60 transition-colors" style={{ background: "var(--surface)" }}>
        <div>
          <div className="font-medium">Tu disponibilidad de esta semana</div>
          <div className="text-[12px] text-ink-faint mt-0.5">Cargaste 3 franjas · edítalas antes del miércoles</div>
        </div>
        <span className="text-sm font-medium whitespace-nowrap" style={{ color: "var(--cyan-light)" }}>Editar →</span>
      </Link>

      <div className="mt-3 rounded-2xl border border-line p-5" style={{ background: "var(--surface)" }}>
        <div className="flex items-center justify-between mb-3">
          <div className="text-[11px] uppercase tracking-wide text-ink-faint font-medium">Tu forma · últimos 5</div>
          <Link href={`/parejas/${ME_PAIR_ID}`} className="text-[12px]" style={{ color: "var(--cyan-light)" }}>Ver ficha →</Link>
        </div>
        <div className="flex gap-2">
          {form.map((g, i) => (
            <span key={i} className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
              style={g.result === "G" ? { background: "rgba(52,199,123,0.15)", color: "var(--win)" } : { background: "rgba(226,87,76,0.15)", color: "var(--loss)" }}>
              {g.result}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
