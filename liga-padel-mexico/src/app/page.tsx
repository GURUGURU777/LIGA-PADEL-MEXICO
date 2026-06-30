import Link from "next/link";
import { SEASON, standings, rounds, getPair } from "@/lib/demo";
import { Crest } from "@/components/Crest";

const steps = [
  ["01", "Inscríbete con tu pareja", "Una cuota por temporada. Sin reembolso, tu lugar queda apartado."],
  ["02", "Carga tus horarios", "La app arma tus partidos sola. Se acabaron los grupos de WhatsApp."],
  ["03", "Juega y escala", "Reporta el resultado y sube en la tabla, jornada tras jornada."],
];

const partners = ["Club Pádel Tepic", "Head", "Gatorade", "Riviera Nayarit"];

const torneoFormats = [
  ["Eliminación directa", "Llaves a un partido. Clásico de fin de semana."],
  ["Grupos + eliminatoria", "Fase de grupos y luego cuadro final."],
  ["Round-robin corto", "Todos contra todos en un día."],
];
const torneoFeatures = [
  "Cuadro y llaves automáticos",
  "Resultados en vivo",
  "Página pública del torneo",
  "Videos por partido",
];

// Líneas de cancha de pádel como textura de fondo (firma de marca)
function CourtLines() {
  return (
    <svg className="court-lines" viewBox="0 0 600 340" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <g fill="none" stroke="var(--cyan)" strokeWidth="1" opacity="0.18">
        {/* perímetro */}
        <rect x="60" y="40" width="480" height="260" />
        {/* línea de red (centro) */}
        <line x1="300" y1="40" x2="300" y2="300" strokeWidth="1.5" />
        {/* líneas de servicio */}
        <line x1="160" y1="40" x2="160" y2="300" />
        <line x1="440" y1="40" x2="440" y2="300" />
        {/* línea central de saque */}
        <line x1="160" y1="170" x2="440" y2="170" />
      </g>
    </svg>
  );
}

export default function Landing() {
  const table = standings();
  const top3 = table.slice(0, 3);

  // Próxima jornada real: primera ronda con partidos sin jugar
  const nextRound = rounds().find((r) => r.matches.some((m) => !m.played));
  const upcoming = nextRound ? nextRound.matches.slice(0, 3) : [];

  return (
    <div style={{ background: "var(--bg-deep)", minHeight: "100dvh" }} className="text-ink">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-line/60" style={{ background: "rgba(3,6,12,0.82)", backdropFilter: "blur(10px)" }}>
        <div className="container-app flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <span className="display w-7 h-7 rounded-lg bg-cyan flex items-center justify-center text-[13px] font-black text-[#03060C]">LP</span>
            <span className="display font-extrabold text-[15px] tracking-tight">LIGA PÁDEL MX</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Link href="/tabla" className="hidden sm:inline text-sm text-ink-muted hover:text-ink px-3 py-1.5 transition-colors">Clasificación</Link>
            <Link href="/jornadas" className="hidden sm:inline text-sm text-ink-muted hover:text-ink px-3 py-1.5 transition-colors">Jornadas</Link>
            <Link href="/torneos" className="hidden sm:inline text-sm text-ink-muted hover:text-ink px-3 py-1.5 transition-colors">Torneos</Link>
            <Link href="/inicio" className="btn-cyan display font-bold text-sm px-4 py-2 rounded-lg">Entrar</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="hero-glow" />
        <div className="absolute inset-0">
          <div className="container-app h-full relative">
            <CourtLines />
          </div>
        </div>

        <div className="container-app relative pt-14 pb-12 md:pt-20 md:pb-16">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.12em] text-white px-3 py-1.5 rounded-full" style={{ background: "rgba(226,87,76,0.16)", border: "1px solid rgba(226,87,76,0.45)", color: "#FF8A80" }}>
                <span className="live-dot w-1.5 h-1.5 rounded-full inline-block" style={{ background: "currentColor" }} />
                JORNADA {SEASON.playedRounds + 1} · MIÉ 8:00 PM
              </span>
              <h1 className="display font-black leading-[0.88] tracking-tight mt-5 text-[3.4rem] md:text-7xl">
                LIGA<br />PÁDEL<br /><span className="brand-gradient">MÉXICO</span>
              </h1>
              <p className="text-ink-muted mt-6 max-w-md leading-relaxed text-[15px]">
                La liga amateur por temporada. Compite cada semana, sube en la tabla y vuélvete leyenda del club. <span className="text-ink">{SEASON.name}.</span>
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link href="/inicio" className="btn-cyan display font-extrabold text-sm px-7 py-3.5 rounded-xl">ÚNETE A LA LIGA</Link>
                <Link href="/tabla" className="btn-ghost display font-bold text-sm px-7 py-3.5 rounded-xl text-ink">Ver clasificación</Link>
              </div>
              <div className="flex items-center gap-3 mt-9">
                <span className="text-[10px] tracking-[0.2em] text-ink-faint font-semibold">PRESENTADA POR</span>
                <span className="display font-black text-lg tracking-tight">OXXO</span>
              </div>
            </div>

            {/* Top 3 card */}
            <div className="accent-top rounded-2xl border border-line overflow-hidden" style={{ background: "linear-gradient(180deg, var(--surface), var(--navy))" }}>
              <div className="px-5 py-4 border-b border-line-soft flex items-center justify-between">
                <span className="display font-extrabold text-sm tracking-wide">LÍDERES · {SEASON.category.split("·")[0].trim()}</span>
                <Link href="/tabla" className="text-[12px] text-cyan-light hover:text-cyan transition-colors">Tabla completa →</Link>
              </div>
              {top3.map((r, i) => {
                const isLeader = i === 0;
                return (
                  <div
                    key={r.pair.id}
                    className="flex items-center gap-3 px-5 py-4 border-b border-line-soft last:border-0"
                    style={isLeader ? { background: "rgba(239,161,39,0.06)" } : undefined}
                  >
                    <span className="display font-black w-5 text-center" style={{ color: isLeader ? "#EFA127" : "var(--cyan-light)" }}>{r.position}</span>
                    <Crest code={r.pair.code} color={r.pair.color} size={34} />
                    <div className="flex-1 min-w-0">
                      <div className="display font-bold text-sm truncate">{r.pair.name}</div>
                      <div className="text-[11px] text-ink-faint">{r.g}G · {r.p}P · {r.dif > 0 ? "+" : ""}{r.dif}</div>
                    </div>
                    {isLeader && <span className="text-[9px] font-bold tracking-wider px-2 py-0.5 rounded" style={{ background: "rgba(239,161,39,0.16)", color: "#EFA127" }}>LÍDER</span>}
                    <span className="display font-black text-xl tabular-nums">{r.pts}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Próxima jornada (broadcast) */}
      {upcoming.length > 0 && (
        <section className="border-y border-line/60" style={{ background: "var(--navy)" }}>
          <div className="container-app py-7">
            <div className="flex items-center justify-between mb-5">
              <h2 className="display font-extrabold text-sm tracking-[0.12em] text-ink-muted">PRÓXIMA JORNADA · J{nextRound!.round}</h2>
              <Link href="/jornadas" className="text-[12px] text-cyan-light hover:text-cyan transition-colors">Todas las jornadas →</Link>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {upcoming.map((m) => {
                const home = getPair(m.homeId)!;
                const away = getPair(m.awayId)!;
                return (
                  <div key={m.id} className="rounded-xl border border-line-soft px-5 py-4 flex items-center justify-between" style={{ background: "var(--bg-deep)" }}>
                    <Crest code={home.code} color={home.color} size={30} />
                    <span className="display font-black text-[11px] text-ink-faint tracking-wider">VS</span>
                    <Crest code={away.code} color={away.color} size={30} />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Stats strip */}
      <section className="border-b border-line/60">
        <div className="container-app grid grid-cols-3 divide-x divide-line/60">
          {[["50", "JUGADORES"], ["11", "JORNADAS"], ["2", "CATEGORÍAS"]].map(([n, l]) => (
            <div key={l} className="text-center py-8 relative accent-top">
              <div className="display font-black text-4xl md:text-5xl tracking-tight">{n}</div>
              <div className="text-[10px] tracking-[0.2em] text-ink-faint mt-1.5">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="container-app py-14">
        <h2 className="display font-extrabold text-2xl mb-2">CÓMO FUNCIONA</h2>
        <p className="text-ink-muted text-sm mb-9">Dos acciones por semana, menos de 30 segundos cada una.</p>
        <div className="grid md:grid-cols-3 gap-7">
          {steps.map(([n, t, d]) => (
            <div key={n} className="relative pl-1">
              <div className="display font-black text-4xl text-cyan/90 leading-none">{n}</div>
              <div className="display font-bold mt-3 text-[15px]">{t}</div>
              <div className="text-sm text-ink-muted mt-1.5 leading-relaxed">{d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Torneos */}
      <section id="torneos" className="border-t border-line/60" style={{ background: "var(--navy)" }}>
        <div className="container-app py-14">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block text-[10px] font-bold tracking-[0.2em] text-cyan-light px-2.5 py-1 rounded" style={{ background: "rgba(59,142,224,0.1)", border: "1px solid rgba(59,142,224,0.3)" }}>
                TAMBIÉN EN LA PLATAFORMA
              </span>
              <h2 className="display font-black text-3xl md:text-4xl tracking-tight mt-4">TORNEOS<br /><span className="text-cyan">EXPRESS</span></h2>
              <p className="text-ink-muted mt-4 max-w-md leading-relaxed text-[15px]">
                ¿Un fin de semana en vez de una temporada? Organizamos tu torneo con cuadro automático, resultados en vivo y video por partido. La misma plataforma, formato corto.
              </p>
              <div className="grid grid-cols-2 gap-x-5 gap-y-2.5 mt-6 max-w-sm">
                {torneoFeatures.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-ink">
                    <span className="text-cyan font-black">✓</span>{f}
                  </div>
                ))}
              </div>
              <Link href="/torneos" className="btn-cyan display inline-block font-extrabold text-sm px-7 py-3.5 rounded-xl mt-7">ORGANIZA TU TORNEO</Link>
            </div>

            <div className="space-y-3">
              {torneoFormats.map(([t, d], i) => (
                <div key={t} className="accent-top rounded-xl border border-line px-5 py-4 flex items-center gap-4" style={{ background: "var(--surface)" }}>
                  <span className="display font-black text-2xl text-cyan-light/70 w-7">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <div className="display font-bold text-[15px]">{t}</div>
                    <div className="text-[12px] text-ink-muted mt-0.5">{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Patrocinadores */}
      <section className="border-t border-line/60 py-12" style={{ background: "var(--navy)" }}>
        <div className="container-app text-center">
          <div className="text-[10px] tracking-[0.2em] text-ink-faint font-semibold mb-2">PRESENTADA POR</div>
          <div className="display font-black text-3xl tracking-tight mb-8">OXXO</div>
          <div className="text-[10px] tracking-[0.2em] text-ink-faint font-semibold mb-5">CON EL APOYO DE</div>
          <div className="flex flex-wrap justify-center gap-3">
            {partners.map((p) => (
              <span key={p} className="display font-bold text-ink-muted border border-line rounded-xl px-5 py-3 text-sm hover:border-cyan/50 transition-colors">{p}</span>
            ))}
          </div>
          <Link href="/inicio" className="inline-block text-[12px] text-cyan-light hover:text-cyan transition-colors mt-8">¿Quieres patrocinar la liga? Hablemos →</Link>
        </div>
      </section>

      {/* CTA + footer */}
      <section className="relative overflow-hidden">
        <div className="hero-glow" />
        <div className="container-app relative py-16 text-center">
          <h2 className="display font-black text-4xl md:text-5xl tracking-tight">¿LISTO PARA<br className="sm:hidden" /> COMPETIR?</h2>
          <p className="text-ink-muted mt-4 max-w-sm mx-auto">Apártate tu lugar en la {SEASON.name}. Cupo limitado por categoría.</p>
          <Link href="/inicio" className="btn-cyan display inline-block font-extrabold text-sm px-9 py-4 rounded-xl mt-7">ÚNETE A LA LIGA</Link>
        </div>
      </section>

      <footer className="border-t border-line/60 py-8">
        <div className="container-app flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px] text-ink-faint">
          <span className="display font-bold text-ink-muted">LIGA PÁDEL MÉXICO</span>
          <span>© 2026 · {SEASON.club} · Tepic, Nayarit</span>
        </div>
      </footer>
    </div>
  );
}
