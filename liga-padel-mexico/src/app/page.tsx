import Link from "next/link";
import { SEASON, standings } from "@/lib/demo";
import { Crest } from "@/components/Crest";

const steps = [
  ["01", "Inscríbete", "Tú y tu compañero, una cuota por temporada."],
  ["02", "Carga tus horarios", "La app arma tus partidos sola, sin grupos de WhatsApp."],
  ["03", "Juega y sube", "Reporta el resultado y escala en la tabla."],
];

const partners = ["Club Tepic", "Head", "Gatorade"];

export default function Landing() {
  const top3 = standings().slice(0, 3);

  return (
    <div style={{ background: "var(--bg-deep)", minHeight: "100dvh" }} className="text-ink">
      {/* Header */}
      <header className="border-b border-line/60">
        <div className="container-app flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <span className="display w-7 h-7 rounded-lg bg-cyan flex items-center justify-center text-[13px] font-black text-[#03060C]">LP</span>
            <span className="display font-extrabold text-[15px]">LIGA PÁDEL MX</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/tabla" className="hidden sm:inline text-sm text-ink-muted px-3 py-1.5">Clasificación</Link>
            <Link href="/inicio" className="text-sm font-semibold px-4 py-2 rounded-lg" style={{ background: "var(--cyan)", color: "#fff" }}>Entrar</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container-app pt-12 pb-10 md:pt-20 md:pb-14">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-white px-2.5 py-1 rounded" style={{ background: "var(--loss)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" /> JORNADA 6 · MIÉ 8PM
            </span>
            <h1 className="display font-black leading-[0.92] tracking-tight mt-4 text-5xl md:text-6xl">
              LIGA<br />PÁDEL<br /><span className="text-cyan">MÉXICO</span>
            </h1>
            <p className="text-ink-muted mt-5 max-w-md leading-relaxed">
              La liga amateur por temporada. Compite todo el año, sube en la tabla y hazte leyenda. {SEASON.name}.
            </p>
            <div className="flex flex-wrap gap-3 mt-7">
              <Link href="/inicio" className="display font-extrabold text-sm px-6 py-3 rounded-xl" style={{ background: "var(--cyan)", color: "#fff" }}>ÚNETE A LA LIGA</Link>
              <Link href="/tabla" className="text-sm font-semibold px-6 py-3 rounded-xl border border-line text-ink">Ver clasificación</Link>
            </div>
            <div className="flex items-center gap-3 mt-7">
              <span className="text-[10px] tracking-widest text-ink-faint font-semibold">PRESENTADA POR</span>
              <span className="display font-extrabold text-lg">OXXO</span>
            </div>
          </div>

          {/* Top 3 card */}
          <div className="rounded-2xl border border-line overflow-hidden" style={{ background: "var(--surface)" }}>
            <div className="px-5 py-4 border-b border-line-soft flex items-center justify-between">
              <span className="display font-extrabold text-sm">LÍDERES</span>
              <Link href="/tabla" className="text-[12px] text-cyan-light">Tabla completa →</Link>
            </div>
            {top3.map((r) => (
              <div key={r.pair.id} className="flex items-center gap-3 px-5 py-3.5 border-b border-line-soft last:border-0">
                <span className="display font-extrabold text-cyan-light w-4">{r.position}</span>
                <Crest code={r.pair.code} color={r.pair.color} size={32} />
                <span className="display font-bold text-sm flex-1">{r.pair.name}</span>
                <span className="display font-black text-xl">{r.pts}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-line/60">
        <div className="container-app grid grid-cols-3 divide-x divide-line/60">
          {[["160", "JUGADORES"], ["7", "JORNADAS"], ["3", "CATEGORÍAS"]].map(([n, l]) => (
            <div key={l} className="text-center py-7">
              <div className="display font-black text-3xl md:text-4xl">{n}</div>
              <div className="text-[10px] tracking-widest text-ink-faint mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="container-app py-12">
        <h2 className="display font-extrabold text-2xl mb-7">CÓMO FUNCIONA</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map(([n, t, d]) => (
            <div key={n}>
              <div className="display font-black text-3xl text-cyan">{n}</div>
              <div className="font-semibold mt-2">{t}</div>
              <div className="text-sm text-ink-muted mt-1 leading-relaxed">{d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Patrocinadores */}
      <section className="border-t border-line/60 py-10">
        <div className="container-app text-center">
          <div className="text-[10px] tracking-widest text-ink-faint font-semibold mb-5">NUESTROS PATROCINADORES</div>
          <div className="flex flex-wrap justify-center gap-3">
            {partners.map((p) => (
              <span key={p} className="display font-extrabold text-ink-muted border border-line rounded-xl px-5 py-3">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + footer */}
      <section className="container-app py-12 text-center">
        <h2 className="display font-black text-3xl md:text-4xl">¿LISTO PARA COMPETIR?</h2>
        <Link href="/inicio" className="display inline-block font-extrabold text-sm px-8 py-3.5 rounded-xl mt-5" style={{ background: "var(--cyan)", color: "#fff" }}>ÚNETE A LA LIGA</Link>
      </section>

      <footer className="border-t border-line/60 py-7">
        <div className="container-app flex items-center justify-between text-[12px] text-ink-faint">
          <span>© 2026 Liga Pádel México</span>
          <span>{SEASON.club}</span>
        </div>
      </footer>
    </div>
  );
}
