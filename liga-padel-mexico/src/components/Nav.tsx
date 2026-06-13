"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SEASON } from "@/lib/demo";

const tabs = [
  { href: "/tabla", label: "Tabla", icon: "list" },
  { href: "/parejas", label: "Parejas", icon: "users" },
  { href: "/jornadas", label: "Jornadas", icon: "calendar" },
  { href: "/disponibilidad", label: "Horarios", icon: "clock" },
];

function I({ name, size = 20 }: { name: string; size?: number }) {
  const c = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "list") return (<svg {...c}><path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" /></svg>);
  if (name === "users") return (<svg {...c}><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0M16 5.5a3 3 0 0 1 0 5M21 20a6 6 0 0 0-4-5.6" /></svg>);
  if (name === "calendar") return (<svg {...c}><rect x="4" y="5" width="16" height="16" rx="2" /><path d="M16 3v4M8 3v4M4 11h16" /></svg>);
  if (name === "clock") return (<svg {...c}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>);
  return null;
}

export function Nav() {
  const pathname = usePathname();
  const active = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* Barra superior */}
      <header className="border-b border-line/70 sticky top-0 z-20" style={{ background: "rgba(10,22,38,0.85)", backdropFilter: "blur(8px)" }}>
        <div className="container-app flex items-center justify-between h-16">
          <Link href="/tabla" className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-cyan flex items-center justify-center text-[13px] font-bold text-navy">LP</span>
            <div className="leading-tight">
              <div className="text-[15px] font-semibold">Liga Pádel México</div>
              <div className="text-[11px] text-ink-faint hidden sm:block">{SEASON.name}</div>
            </div>
          </Link>

          {/* Links (solo desktop) */}
          <nav className="hidden md:flex items-center gap-1">
            {tabs.map((t) => (
              <Link key={t.href} href={t.href}
                className="px-3.5 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                style={active(t.href) ? { background: "var(--surface-2)", color: "var(--cyan-light)" } : { color: "var(--ink-muted)" }}>
                <I name={t.icon} size={17} /> {t.label}
              </Link>
            ))}
          </nav>

          <Link href="/login" className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-line text-sm font-medium hover:bg-navy-surface transition-colors">
            <span className="w-6 h-6 rounded-full bg-navy-elevated flex items-center justify-center text-[11px] text-cyan-light">JP</span>
            <span className="hidden sm:inline text-ink-muted">Entrar</span>
          </Link>
        </div>
      </header>

      {/* Barra inferior (solo móvil) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-20 border-t border-line flex" style={{ background: "rgba(10,22,38,0.95)", backdropFilter: "blur(8px)" }}>
        {tabs.map((t) => (
          <Link key={t.href} href={t.href} className="flex-1 flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium"
            style={{ color: active(t.href) ? "var(--cyan-light)" : "var(--ink-faint)" }}>
            <I name={t.icon} size={20} /> {t.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
