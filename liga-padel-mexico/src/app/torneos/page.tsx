import Link from "next/link";

const formats = [
  ["01", "Eliminación directa", "Llaves a un partido. El clásico de fin de semana, rápido y emocionante."],
  ["02", "Grupos + eliminatoria", "Fase de grupos y luego cuadro final. Todos juegan varios partidos."],
  ["03", "Round-robin corto", "Todos contra todos en un solo día. Ideal para categorías chicas."],
];

const features = [
  ["Inscripción y pago", "Las parejas se inscriben y pagan en línea. Pase de acceso al confirmar."],
  ["Cuadro automático", "El bracket se arma solo con seeding. Sin hojas de cálculo."],
  ["Resultados en vivo", "Capturas el marcador y el cuadro se actualiza al instante."],
  ["Página pública", "Cada torneo tiene su página estilo broadcast para compartir."],
  ["Video por partido", "Clips automáticos de resultados, listos para redes."],
  ["Comunicación", "Avisos por WhatsApp y push a todos los inscritos."],
];

const tiers = [
  ["Por evento", "$1,500 – 3,000", "Cuota fija por torneo organizado."],
  ["% de inscripciones", "10 – 20%", "Sobre el bruto del torneo."],
  ["Plan mensual", "Desde $3,000/mes", "Uso ilimitado: liga + torneos."],
];

export default function Torneos() {
  return (
    <div style={{ background: "var(--bg-deep)", minHeight: "100dvh" }} className="text-ink">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-line/60" style={{ background: "rgba(3,6,12,0.82)", backdropFilter: "blur(10px)" }}>
        <div className="container-app flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="display w-7 h-7 rounded-lg bg-cyan flex items-center justify-center text-[13px] font-black text-[#03060C]">LP</span>
            <span className="display font-extrabold text-[15px] tracking-tight">LIGA PÁDEL MX</span>
          </Link>
          <div className="flex items-center gap-1.5">
            <Link href="/" className="hidden sm:inline text-sm text-ink-muted hover:text-ink px-3 py-1.5 transition-colors">La liga</Link>
            <Link href="/inicio" className="btn-cyan display font-bold text-sm px-4 py-2 rounded-lg">Entrar</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="hero-glow" />
        <div className="container-app relative pt-14 pb-10 md:pt-18 md:pb-12">
          <span className="inline-block text-[10px] font-bold tracking-[0.2em] text-cyan-light px-2.5 py-1 rounded" style={{ background: "rgba(59,142,224,0.1)", border: "1px solid rgba(59,142,224,0.3)" }}>
            TORNEOS EXPRESS
          </span>
          <h1 className="display font-black leading-[0.9] tracking-tight mt-4 text-5xl md:text-6xl max-w-2xl">
            TU TORNEO,<br /><span className="text-cyan">LLAVE EN MANO</span>
          </h1>
          <p className="text-ink-muted mt-5 max-w-lg leading-relaxed text-[15px]">
            Organiza un torneo de fin de semana con inscripción en línea, cuadro automático, resultados en vivo y video por partido. La misma plataforma de la liga, en formato corto.
          </p>
          <div className="flex flex-wrap gap-3 mt-7">
            <Link href="/inicio" className="btn-cyan display font-extrabold text-sm px-7 py-3.5 rounded-xl">SOLICITAR DEMO</Link>
            <Link href="/" className="btn-ghost display font-bold text-sm px-7 py-3.5 rounded-xl text-ink">Ver la liga</Link>
          </div>
        </div>
      </section>

      {/* Formatos */}
      <section className="border-y border-line/60" style={{ background: "var(--navy)" }}>
        <div className="container-app py-12">
          <h2 className="display font-extrabold text-2xl mb-7">FORMATOS DISPONIBLES</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {formats.map(([n, t, d]) => (
              <div key={n} className="accent-top rounded-xl border border-line px-5 py-5" style={{ background: "var(--surface)" }}>
                <div className="display font-black text-3xl text-cyan/90">{n}</div>
                <div className="display font-bold mt-3 text-[15px]">{t}</div>
                <div className="text-sm text-ink-muted mt-1.5 leading-relaxed">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qué incluye */}
      <section className="container-app py-12">
        <h2 className="display font-extrabold text-2xl mb-7">TODO INCLUIDO</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
          {features.map(([t, d]) => (
            <div key={t} className="flex gap-3">
              <span className="text-cyan font-black mt-0.5">✓</span>
              <div>
                <div className="display font-bold text-[15px]">{t}</div>
                <div className="text-sm text-ink-muted mt-1 leading-relaxed">{d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Precios */}
      <section className="border-t border-line/60" style={{ background: "var(--navy)" }}>
        <div className="container-app py-12">
          <h2 className="display font-extrabold text-2xl mb-2">CÓMO SE COBRA</h2>
          <p className="text-ink-muted text-sm mb-7">Por uso de plataforma. Elige el esquema que le acomode al club.</p>
          <div className="grid md:grid-cols-3 gap-4">
            {tiers.map(([t, price, d]) => (
              <div key={t} className="rounded-xl border border-line px-5 py-5" style={{ background: "var(--surface)" }}>
                <div className="text-[10px] tracking-[0.18em] text-ink-faint font-semibold">{t}</div>
                <div className="display font-black text-2xl text-cyan-light mt-2">{price}</div>
                <div className="text-sm text-ink-muted mt-2 leading-relaxed">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="hero-glow" />
        <div className="container-app relative py-16 text-center">
          <h2 className="display font-black text-4xl md:text-5xl tracking-tight">¿ORGANIZAMOS<br className="sm:hidden" /> TU TORNEO?</h2>
          <p className="text-ink-muted mt-4 max-w-sm mx-auto">Te montamos el primero como demo para que veas la plataforma en vivo.</p>
          <Link href="/inicio" className="btn-cyan display inline-block font-extrabold text-sm px-9 py-4 rounded-xl mt-7">SOLICITAR DEMO</Link>
        </div>
      </section>

      <footer className="border-t border-line/60 py-8">
        <div className="container-app flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px] text-ink-faint">
          <Link href="/" className="display font-bold text-ink-muted hover:text-ink transition-colors">LIGA PÁDEL MÉXICO</Link>
          <span>© 2026 · Tepic, Nayarit</span>
        </div>
      </footer>
    </div>
  );
}
