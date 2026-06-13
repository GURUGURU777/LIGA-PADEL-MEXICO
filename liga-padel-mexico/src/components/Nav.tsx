"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SEASON } from "@/lib/demo";

const tabs = [
  { href: "/", label: "Inicio", icon: "home" },
  { href: "/partidos", label: "Partidos", icon: "ball" },
  { href: "/disponibilidad", label: "Horarios", icon: "clock" },
  { href: "/tabla", label: "Liga", icon: "trophy" },
];

const LIGA = ["/tabla", "/parejas", "/jornadas"];

function I({ name, size = 20 }: { name: string; size?: number }) {
  const c = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "home") return (<svg {...c}><path d="M4 11l8-7 8 7M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9" /></svg>);
  if (name === "ball") return (<svg {...c}><circle cx="12" cy="12" r="9" /><path d="M5.6 5.6a9 9 0 0 1 12.8 12.8M18.4 5.6a9 9 0 0 0-12.8 12.8" /></svg>);
  if (name === "clock") return (<svg {...c}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>);
  if (name === "trophy") return (<svg {...c}><path d="M8 4h8v4a4 4 0 0 1-8 0V4zM8 5H5v2a3 3 0 0 0 3 3M16 5h3v2a3 3 0 0 1-3 3M9 16h6M10 20h4M12 12v4" /></svg>);
  return null;
}

export function Nav() {
  const pathname = usePathname();
  const isLiga = LIGA.some((p) => pathname === p || pathname.startsWith(p + "/"));
  const active = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/tabla") return isLiga;
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      <header className="border-b border-line/70 sticky top-0 z-20" style={{ background: "rgba(10,22,38,0.85)", backdropFilter: "blur(8px)" }}>
        <div className="container-app flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-cyan flex items-center justify-center text-[13px] font-bold text-navy">LP</span>
            <div className="leading-tight">
              <div className="text-[15px] font-semibold">Liga Pádel México</div>
              <div className="text-[11px] text-ink-faint hidden sm:block">{SEASON.name}</div>
            </div>
          </Link>

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
            <span className="w-6 h-6 rounded-full bg-navy-elevated flex items-center justify-center text-[11px] text-cyan-light">AG</span>
            <span className="hidden sm:inline text-ink-muted">Andrés</span>
          </Link>
        </div>
      </header>

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
